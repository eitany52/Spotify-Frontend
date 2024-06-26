
import { storageService } from './async-storage.service'
import { utilService } from './util.service'


const STORAGE_KEY = 'user'
const STORAGE_KEY_LOGEDON_USER = 'logedon_user'


export const userService = {
    query,
    getById,
    save,
    remove,
    getLogedonUser,
    login
    // logout,
    // signup,
    // getLoggedinUser,
    // saveLocalUser,
    // getUsers,
    // update,
    // changeScore
   
}
window.us = userService


async function query() {
    var users = await storageService.query(STORAGE_KEY)
    console.log('users:', users)
   
    return users
}

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

async function remove(userId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, userId)
}

async function save(user) {
    var savedUser
    if (user._id) {
        const userToSave = {
            _id : user._id,
            name : user.name
        }
        savedUser = await storageService.put(STORAGE_KEY, userToSave)
    } else {
        // Later, owner is set by the backend
        const userToSave = {
            name : user.name,
        }
        savedUser = await storageService.post(STORAGE_KEY, userToSave)
    }
    return savedUser
}



async function login(userCred) {
    // const users = await storageService.query(STORAGE_KEY)
    // const user = users.find(user => user.username === userCred.username)
    // // const user = await httpService.post('auth/login', userCred)
    // if (user) return saveLocalUser(user)
}

const defaultLogedOnUser = {  _id: 'u1001',    name: 'avi', }

const userArray = [defaultLogedOnUser,
    {  _id: 'u1002',name: 'haim' },
    {  _id: 'u1003',name: 'yossi' }, 
]

function getLogedonUser() {
    return utilService.loadFromStorage(STORAGE_KEY_LOGEDON_USER)
}


// utilService.saveToStorage(STORAGE_KEY, userArray)
// utilService.saveToStorage(STORAGE_KEY_LOGEDON_USER, defaultLogedOnUser)

_createUsers()

function _createUsers() {
    let users = utilService.loadFromStorage(STORAGE_KEY)
    if (!users || !users.length) {
        utilService.saveToStorage(STORAGE_KEY, userArray)
        utilService.saveToStorage(STORAGE_KEY_LOGEDON_USER, defaultLogedOnUser)
    } 
}

// TEST DATA
// (() => {
//     utilService.saveToStorage('station', station)
// })()









