import React from "react"
import { Users } from "./accounts"
import { Map } from "immutable"

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
        user: user
    }),
    emptyCurrUser: (state: HomeState) => ({
        ...state,
        user: undefined
    })
})

export class HomePage extends React.Component<{}, HomeState> {
    constructor(props: {}){
        super(props)
        this.state = initHomeState
    }
    render(): JSX.Element {
        switch(this.state.view){
            case 'home':
                return (
                    <div>
                        Welcome to the home page of Calendify
                        <button onClick={() => this.setState(this.state.setView('registration/login'))}>Login</button>
                    </div>
                )
            case 'registration/login':
                return (
                    <div>
                        
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