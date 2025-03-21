import { userService } from '../../services/user.service.remote.js'
import { socketService } from '../../services/socket.service'
import { store } from '../store'

import { showErrorMsg } from '../../services/event-bus.service'
import { REMOVE_USER, SET_USER, SET_USERS, SET_WATCHED_USER } from '../reducers/user.reducer'
import { SET_LIKED_SONGS_STATION, SET_STATIONS } from '../reducers/station.reducer'
// import { LOADING_DONE, LOADING_START } from '../reducers/system.reducer'

export async function loadUsers() {
    try {
        // store.dispatch({ type: LOADING_START })
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } // finally {
    //     store.dispatch({ type: LOADING_DONE })
    // }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
        throw err
    }
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })
        socketService.login(user._id)
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        socketService.login(user._id)
        return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({ type: SET_USER, user: null })
        store.dispatch({ type: SET_LIKED_SONGS_STATION, likedSongsStation: null })
        store.dispatch({ type: SET_STATIONS, stations: [] })
        socketService.logout()
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId)
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        console.log('Cannot load user', err)
        showErrorMsg('Cannot load user')
    }
}

export function getLoggedInUser() {
    return userService.getLoggedInUser()
}