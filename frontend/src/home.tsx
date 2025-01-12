import React from "react"
import { Users } from "./accounts"
import { Map } from "immutable"
import Userattendance from "./userattendance"
import * as Bootstrap from 'react-bootstrap';

// Extend when necessary for another case in the render for HomePage
export type HomeView = 
    'home' |
    'registration/login' |
    'userattendance'

export interface User{
    id: number
    username: string
    email: string
    password: string
}

export interface HomeState{
    view: HomeView
    currUser: User | undefined
    loggedIn: boolean
    storage: Map<number, User>
    setView: (view: HomeView) => (state: HomeState) => HomeState
    setCurrUser: (user: User) => (state: HomeState) => HomeState
    emptyCurrUser: (state: HomeState) => HomeState
}

export const initHomeState: HomeState = ({
    view: "home",
    currUser: undefined,
    loggedIn: false,
    storage: Map(),
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
                                    <Bootstrap.Nav.Link onClick={() => this.setState(this.state.setView('userattendance'))}> Userattendance </Bootstrap.Nav.Link> : 
                                    <></>}
                            </Bootstrap.Nav>
                        </Bootstrap.Navbar.Collapse>
                    </Bootstrap.Container>
                </Bootstrap.Navbar>
                {this.renderContent()}
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
                            insertUser={(user: User) => this.setState(this.state.setCurrUser(user))}
                            emailUsed={(email: string) => this.state.storage.some((user: User) => user.email === email)}
                            logIn={
                                (email: string) => (password: string) => 
                                {
                                    let user = this.state.storage.find((user: User) => user.email === email && user.password === password)
                                    if(user !== undefined)
                                    {
                                        this.setState(this.state.setCurrUser(user))
                                        return true
                                    }
                                    return false
                                }
                            } 
                        />
                        <button onClick={() => this.setState(this.state.setView('home'))}> Back </button>
                    </div>
                )
            case 'userattendance':
                return (
                    <div>

                    </div>
                )
        }
    }
}