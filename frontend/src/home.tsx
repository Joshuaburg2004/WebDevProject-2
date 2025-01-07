import React from "react"

// Extend when necessary for another case in the render for HomePage
export type HomeView = 
    'home' |
    'registration' |
    'login' |
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
    setView: (view: HomeView) => (state: HomeState) => HomeState
    setCurrUser: (user: User) => (state: HomeState) => HomeState
    emptyCurrUser: (state: HomeState) => HomeState
}

export const initHomeState = (): HomeState => ({
    view: "home",
    currUser: undefined,
    loggedIn: false,
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
    
}