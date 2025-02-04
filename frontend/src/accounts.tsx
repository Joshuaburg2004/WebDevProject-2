import { Loader, User } from './home'
import React from 'react';

type UserView = 
    'login' |
    'register'

export interface UserState{
    email: string
    firstName: string
    lastName: string
    password: string
    message: string
    view: UserView
    setUserView: (view: UserView) => (state: UserState) => UserState
    updateEmail: (email: string) => (state: UserState) => UserState
    updateFirstName: (firstName: string) => (state: UserState) => UserState
    updateLastName: (lastName: string) => (state: UserState) => UserState
    updatePassword: (password: string) => (state: UserState) => UserState
    updateMessage: (message: string) => (state: UserState) => UserState
}

export const initUserState: UserState = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    message: "",
    view: 'login',
    setUserView: (view: UserView) => (state: UserState) => ({
        ...state,
        view: view
    }),
    updateEmail: (email: string) => (state: UserState) => ({
        ...state,
        email: email.toLowerCase()
    }),
    updateFirstName: (firstName: string) => (state: UserState) => ({
        ...state,
        firstName: firstName
    }),
    updateLastName: (lastName: string) => (state: UserState) => ({
        ...state,
        lastName: lastName
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
    insertUser: (_: User) => Promise<boolean>
    emailUsed: (email: string) => Promise<boolean>
    logIn: (email: string) => (password: string) => Promise<boolean>
    loadUpdate: (loader: Loader) => void
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
                            First Name:
                            <input
                                value={this.state.firstName}
                                onChange={e => {
                                    this.setState(this.state.updateFirstName(e.currentTarget.value));
                                    this.setState(this.state.updateMessage(""))
                                }}
                            />
                        </div>
                        <div>
                            Last Name:
                            <input
                                value={this.state.lastName}
                                onChange={e => {
                                    this.setState(this.state.updateLastName(e.currentTarget.value));
                                    this.setState(this.state.updateMessage(""))
                                }}
                            />
                        </div>
                        <div>
                            Email: 
                            <input 
                                value={this.state.email}
                                onChange={e => {
                                    this.setState(this.state.updateEmail(e.currentTarget.value)); 
                                    this.setState(this.state.updateMessage(""))
                                }}
                            />
                        </div>
                        <div>
                            Password:
                            <input
                                type="password"
                                value={this.state.password}
                                onChange={e => {
                                    this.setState(this.state.updatePassword(e.currentTarget.value)); 
                                    this.setState(this.state.updateMessage(""))
                                }}
                            />
                        </div>
                        <button onClick={e => {
                                this.props.emailUsed(this.state.email).then(result => {
                                    if(result){
                                        this.setState(this.state.updateMessage("This email is already in use for an account, please use another."), () => {
                                            alert(this.state.message);
                                        });
                                    }
                                    else{
                                        this.props.insertUser({
                                            firstName: this.state.firstName,
                                            lastName: this.state.lastName,
                                            email: this.state.email,
                                            password: this.state.password
                                        }).then(result => {
                                            if(result){
                                                this.setState(this.state.updateMessage(`Created account with full name ${this.state.firstName} ${this.state.lastName}, email ${this.state.email} and your choice of password!`), () => {
                                                    alert(this.state.message);
                                                });
                                            }
                                            else{
                                                this.setState(this.state.updateMessage("Error creating account"), () => {
                                                    alert(this.state.message);
                                                });
                                            }
                                        }).catch(err => {
                                            this.setState(this.state.updateMessage("Error creating account"), () => {
                                                alert(this.state.message);
                                            });
                                            console.error(err)
                                        })
                                    }
                                })
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
                                    this.setState(this.state.updateEmail(e.currentTarget.value)); 
                                    this.setState(this.state.updateMessage(""))
                                }}
                            />
                        </div>
                        <div>
                            Password:
                            <input
                                type="password"
                                value={this.state.password}
                                onChange={e => {
                                    this.setState(this.state.updatePassword(e.currentTarget.value)); 
                                    this.setState(this.state.updateMessage(""))
                                }}
                            />
                        </div>
                        <button onClick={_ => {
                                this.props.loadUpdate('loading');
                                this.props.logIn(this.state.email)(this.state.password).then(result => {
                                    if(result)
                                    {
                                        this.setState(this.state.updateMessage("Logged in!"), () => {
                                            alert(this.state.message);
                                        });
                                    }
                                    else
                                    {
                                        this.setState(this.state.updateMessage("Not logged in, combination of email and password not found"), () => {
                                            alert(this.state.message);
                                        });
                                    }
                                }).finally(() => this.props.loadUpdate('loaded'));
                            }}>Log in</button>
                        <div><button onClick={_ => this.setState(this.state.setUserView('register'))}>Register</button></div>
                    </div>
                )
        }
    }
} 