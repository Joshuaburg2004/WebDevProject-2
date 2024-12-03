export type HomeView = 
    'home' |
    'registration' |
    'login'

export interface User{
    id: number
    username: string
    email: string
    password: string
}