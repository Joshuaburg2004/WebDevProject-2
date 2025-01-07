import { Map } from 'immutable';
import { User } from './home'
import React from 'react';

type UserView = 
    'login' |
    'register'

export interface UserState{
    email: string
    username: string
    password: string
    storage: Map<number, User>
    message: string
    currentId: number
    view: UserView
    setUserView: (view: UserView) => (state: UserState) => UserState
    insertPerson: (state: UserState) => UserState
    updateEmail: (email: string) => (state: UserState) => UserState
    updateUsername: (username: string) => (state: UserState) => UserState
    updatePassword: (password: string) => (state: UserState) => UserState
    updateMessage: (message: string) => (state: UserState) => UserState
    logIn: (email: string, password: string) => (state: UserState) => boolean
}

export const initUserState: UserState = {
    email: "",
    username: "",
    password: "",
    storage: Map(),
    message: "",
    currentId: 0,
    view: 'register',
    setUserView: (view: UserView) => (state: UserState) => ({
        ...state,
        view: view
    }),
    insertPerson: (state: UserState): UserState => ({
        ...state,
        currentId: state.currentId + 1,
        storage: state.storage.set(state.currentId, {
            id: state.currentId,
            username: state.username,
            email: state.email,
            password: state.password
        })
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
    }),
    logIn: (email: string, password: string) => (state: UserState) => {
        for (const user of state.storage.values()){
            if (user.email === email && user.password === password){
                return true
            }
        }
        return false
    }
}

export interface UserProps{
    insertUser: (_: User) => void
    updateName: (name: string) => void
    updateEmail: (email: string) => void
    updatePassword: (password: string) => void
    updateMessage: (message: string) => void
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
                        <div>
                            Username:
                            <input
                                value={this.state.username}
                                onChange={e => {
                                    this.props.updateName(e.currentTarget.value);
                                    this.props.updateMessage("")
                                }}
                            />
                        </div>
                        <div>
                            Email: 
                            <input 
                                value={this.state.email}
                                onChange={e => {
                                    this.props.updateEmail(e.currentTarget.value); 
                                    this.props.updateMessage("")
                                }}
                            />
                        </div>
                        <div>
                            Password:
                            <input
                                value={this.state.password}
                                onChange={e => {
                                    this.props.updatePassword(e.currentTarget.value); 
                                    this.props.updateMessage("")
                                }}                                
                            />
                        </div>
                        <button onClick={e => {
                                if(this.state.storage.filter(u => u.email == this.state.email).count() > 0)
                                    this.props.updateMessage("This email is already used for an account, please use another.")
                                else
                                {
                                    this.setState(this.state.insertPerson(this.state))
                                    this.props.updateMessage(`Created account with username ${this.state.username}, email ${this.state.email} and password ${this.state.password}`)
                                }
                                alert(this.state.message)
                            }}>Log in</button>
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
                                    this.props.updateEmail(e.currentTarget.value); 
                                    this.props.updateMessage("")
                                }}
                            />
                        </div>
                        <div>
                            Password:
                            <input
                                value={this.state.password}
                                onChange={e => {
                                    this.props.updatePassword(e.currentTarget.value); 
                                    this.props.updateMessage("")
                                }}                                
                            />
                        </div>
                        <button onClick={e => {
                                if(this.state.logIn(this.state.email, this.state.password))
                                    this.props.updateMessage("Logged in!")
                                else
                                    this.props.updateMessage("Not logged in, combination of email and password not found")
                                alert(this.state.message)
                            }}>Log in</button>
                    </div>
                )
        }
    }
} 