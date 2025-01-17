import React from "react"
import { Users } from "./accounts"
import { Map } from "immutable"
import UserPlanning from "./userplanning"
import Eventsreact from "./eventsreact"
import * as Bootstrap from 'react-bootstrap';
import { randomUUID, UUID } from "crypto"
import { get } from "http"

// Extend when necessary for another case in the render for HomePage
export type HomeView = 
    'home' |
    'registration/login' |
    'userattendance' |
    'events'

export interface User{
    id: number
    username: string
    email: string
    password: string
}

export const register = async (user: User) : Promise<Response> => {
    return await fetch("api/v1/create/user", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
}

export const login = async (email: string, password: string) : Promise<Response> => {
    return await fetch("api/v1/login/user", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
}

export const getAllUsers = async () : Promise<Response> => {
    return await fetch("api/v1/get/allusers", {
        method: "GET"
    })
}

export const isEmailUsed = async (email: string) : Promise<boolean> => {
    const res = await getAllUsers()
    if(res.ok){
        const users = await res.json()
        return users.some((user: User) => user.email === email)
    }
    return false
}

export type Loader = 
    'loading' |
    'loaded' |
    'unloaded'

export interface HomeState{
    loader: Loader
    view: HomeView
    currUser: User | undefined
    loggedIn: boolean
    setView: (view: HomeView) => (state: HomeState) => HomeState
    setCurrUser: (user: User) => (state: HomeState) => HomeState
    emptyCurrUser: (state: HomeState) => HomeState
    addUser: (user: User) => (state: HomeState) => Promise<boolean>
    updateLoader: (loader: Loader) => (state: HomeState) => HomeState
}

export const initHomeState: HomeState = ({
    loader: 'unloaded',
    view: "home",
    currUser: undefined,
    loggedIn: false,
    setView: (view: HomeView) => (state: HomeState) => ({
        ...state,
        view: view
    }),
    setCurrUser: (user: User) => (state: HomeState) => ({
        ...state,
        user: user,
        loggedIn: true
    }),
    emptyCurrUser: (state: HomeState) => ({
        ...state,
        user: undefined,
        loggedIn: false
    }),
    addUser: (user: User) => async (state: HomeState) => {
        try {
            const res = await register(user);
            if (res.ok) { 
                console.log("User registered successfully");
                return true
            } else {
                console.error("Registration failed");
                return false
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return false
        }
    },
    updateLoader: (loader: Loader) => (state: HomeState) => ({
        ...state,
        loader: loader
    })
})

export class HomePage extends React.Component<{}, HomeState> {
    constructor(props: {}){
        super(props)
        this.state = initHomeState
    }
    render(): JSX.Element {
        return (
            <div>
                <Bootstrap.Navbar expand="lg" className="bg-white flex-column mb-4" style={{ fontFamily: 'Apercu-Mono' }}>
                    <Bootstrap.Container>
                        <Bootstrap.Navbar.Collapse id="basic-navbar-nav">
                            <Bootstrap.Nav className="me-auto">
                                {!this.state.loggedIn ? 
                                    <Bootstrap.Nav.Link onClick={() => this.setState(this.state.setView('registration/login'))}> Log in </Bootstrap.Nav.Link> : 
                                    <Bootstrap.Nav.Link onClick={() => this.setState(this.state.emptyCurrUser(this.state))}> Log out </Bootstrap.Nav.Link>}
                                {this.state.loggedIn ? 
                                <>
                                    <Bootstrap.Nav.Link onClick={() => this.setState(this.state.setView('userattendance'))}> UserPlanning </Bootstrap.Nav.Link>
                                    <Bootstrap.Nav.Link onClick={() => this.setState(this.state.setView('events'))}> Events </Bootstrap.Nav.Link>
                                </> 
                                : <></>}
                            </Bootstrap.Nav>
                        </Bootstrap.Navbar.Collapse>
                    </Bootstrap.Container>
                </Bootstrap.Navbar>
                {this.renderContent()}
                {this.state.view !== 'home' ? 
                    <button onClick={() => this.setState(this.state.setView('home'))}> Back to home </button>
                    : <></>}
            </div>
        )
    }

    renderContent(): JSX.Element {
        switch(this.state.view){
            case 'home':
                return (
                    <div>
                        <div>
                            Welcome to the home page of Calendify
                        </div>
                    </div>
                )
            case 'registration/login':
                return (
                    <div>
                        <Users 
                            insertUser={(user: User) => this.setState(this.state.updateLoader('loading'), () => register(user).then(() => this.state.addUser(user), () => this.setState(this.state.updateLoader('loaded'))))}
                            emailUsed={async (email: string) => {
                                this.setState(this.state.updateLoader('loading'));
                                const result = await isEmailUsed(email);
                                this.setState(this.state.updateLoader('loaded'));
                                return result;
                            }}
                            logIn={
                                (email: string) => (password: string) => 
                                {
                                    const user = this.state.storage.find((user: User) => user.email === email && user.password === password)
                                    if(user !== undefined)
                                    {
                                        this.setState(this.state.setCurrUser(user))
                                        return true
                                    }
                                    return false
                                }
                            } 
                        />
                    </div>
                )
            case 'userattendance':
                return (
                    <div>
                        <UserPlanning />
                    </div>
                )
            case 'events':
                return (
                    <div>
                        <Eventsreact />
                    </div>
                )
        }
    }
}