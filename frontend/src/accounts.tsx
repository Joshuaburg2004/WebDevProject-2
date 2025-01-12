import { User } from './home'
import React from 'react';

type UserView = 
    'login' |
    'register'

export interface UserState{
    email: string
    username: string
    password: string
    message: string
    currentId: number
    view: UserView
    setUserView: (view: UserView) => (state: UserState) => UserState
    updateEmail: (email: string) => (state: UserState) => UserState
    updateUsername: (username: string) => (state: UserState) => UserState
    updatePassword: (password: string) => (state: UserState) => UserState
    updateMessage: (message: string) => (state: UserState) => UserState
}

export const initUserState: UserState = {
    email: "",
    username: "",
    password: "",
    message: "",
    currentId: 0,
    view: 'login',
    setUserView: (view: UserView) => (state: UserState) => ({
        ...state,
        view: view
    }),
    updateEmail: (email: string) => (state: UserState) => ({
        ...state,
        email: email
    }),
    updateUsername: (username: string) => (state: UserState) => ({
        ...state,
        username: username
    }),
    updatePassword: (password: string) => (state: UserState) => ({
        ...state,
        password: password
    }),
    updateMessage: (message: string) => (state: UserState) => ({
        ...state,
        message: message
    })
}

export interface UserProps{
    insertUser: (_: User) => void
    emailUsed: (email: string) => boolean
    logIn: (email: string) => (password: string) => boolean
}

export class Users extends React.Component<UserProps, UserState>{
    constructor(props: UserProps){
        super(props)
        this.state = initUserState
    }
    render(): JSX.Element {
        switch(this.state.view){
            case 'register':
                return (
                    <div>
                        Enter your information below to create your account:
                        If you already have an account, click "Log in" below.
                        <div>
                            Username:
                            <input
                                value={this.state.username}
                                onChange={e => {
                                    this.state.updateUsername(e.currentTarget.value);
                                    this.state.updateMessage("")
                                }}
                            />
                        </div>
                        <div>
                            Email: 
                            <input 
                                value={this.state.email}
                                onChange={e => {
                                    this.state.updateEmail(e.currentTarget.value); 
                                    this.state.updateMessage("")
                                }}
                            />
                        </div>
                        <div>
                            Password:
                            <input
                                value={this.state.password}
                                onChange={e => {
                                    this.state.updatePassword(e.currentTarget.value); 
                                    this.state.updateMessage("")
                                }}                                
                            />
                        </div>
                        <button onClick={e => {
                                if(this.props.emailUsed(this.state.email))
                                    this.state.updateMessage("This email is already in use for an account, please use another.")
                                else
                                {
                                    this.setState({
                                        ...this.state, currentId: this.state.currentId + 1
                                    })
                                    this.props.insertUser({
                                        id: this.state.currentId,
                                        username: this.state.username,
                                        email: this.state.email,
                                        password: this.state.password
                                    })
                                    this.state.updateMessage(`Created account with username ${this.state.username}, email ${this.state.email} and password ${this.state.password}`)
                                }
                                alert(this.state.message)
                            }}>Create account</button>
                        <div><button onClick={_ => this.setState(this.state.setUserView('login'))}>Log in</button></div>
                    </div>
                )       
            case 'login':
                return (
                    <div>
                        Please log in below to use Calendify.
                        If you do not yet have an account, click "Register" below.
                        <div>
                            Email:
                            <input 
                                value={this.state.email}
                                onChange={e => {
                                    this.state.updateEmail(e.currentTarget.value); 
                                    this.state.updateMessage("")
                                }}
                            />
                        </div>
                        <div>
                            Password:
                            <input
                                value={this.state.password}
                                onChange={e => {
                                    this.state.updatePassword(e.currentTarget.value); 
                                    this.state.updateMessage("")
                                }}                                
                            />
                        </div>
                        <button onClick={_ => {
                                if(this.props.logIn(this.state.email)(this.state.password))
                                    this.state.updateMessage("Logged in!")
                                else
                                    this.state.updateMessage("Not logged in, combination of email and password not found")
                                alert(this.state.message)
                            }}>Log in</button>
                        <div><button onClick={_ => this.setState(this.state.setUserView('register'))}>Register</button></div>
                    </div>
                )
        }
    }
} 