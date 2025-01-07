import React from "react"

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
    currUser: User
    loggedIn: boolean
    setView: (view: HomeView) => (state: HomeState) => HomeState

}

export class HomePage extends React.Component<{}, HomeState> {
    
}