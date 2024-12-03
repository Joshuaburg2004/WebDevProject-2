import { Map } from 'immutable';

type UserView = 
    'login' |
    'register' |
    'profile' |
    'edit' |
    'logout'

export interface User{
    id: number
    username: string
    email: string
    password: string
}

export interface UserState{
    storage: Map<number, User>
    currentId: number
    view: UserView
    setUserView: (view: UserView) => (state: UserState) => UserState
    setStorage: (storage: Map<number, User>) => (state: UserState) => void
    insertUser: (user: User) => (state: UserState) => void
    logIn: (email: string, password: string) => (state: UserState) => boolean
}

export const initUserState: UserState = {
    storage: Map(),
    currentId: 0,
    view: 'register',
    setUserView: (view: UserView) => (state: UserState) => ({
        ...state,
        view: view
    }),
    setStorage: (storage: Map<number, User>) => (state: UserState) => ({
        ...state,
        storage: storage
    }),
    insertUser: (user: User) => (state: UserState) => ({
        ...state,
        storage: state.storage.set(state.currentId, ({
            ...user,
            id: state.currentId
        }))
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