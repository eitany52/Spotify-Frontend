
import { storageService } from './async-storage.service'
import { utilService } from './util.service'
import { userService } from './user.service.local'
import  initialStations  from '../../data/station.json'


const STORAGE_KEY = 'station_db'

export const stationService = {
    query,
    getById,
    save,
    remove,
    getStations,
    addSongToStation,
    removeSongFromStation,
    addUserLikedToStation,
    removeUserLikedFromStation
    // getEmptyCar,
    // addCarMsg
}
window.ss = stationService


async function query(filterBy = { txt: '', price: 0 }) {
    var stations = await storageService.query(STORAGE_KEY)
    console.log('stations:', stations)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     cars = cars.filter(car => regex.test(car.vendor) || regex.test(car.description))
    // }
    // if (filterBy.price) {
    //     cars = cars.filter(car => car.price <= filterBy.price)
    // }
    
    // Return just preview info about the boards
    // cars = cars.map(({ _id, vendor, price, owner }) => ({ _id, vendor, price, owner }))
    return stations
}


function getStations() {
    return storageService.query(STORAGE_KEY)
}

function getById(stationId) {
    return storageService.get(STORAGE_KEY, stationId)
}

async function remove(stationId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, stationId)
}

async function save(station) {
    
    var savedStation
    if (station._id) {
        const stationToSave = {
            _id : station._id,
            name : station.name,
            tags : station.tags,
            createdBy : station.createdBy,
            likedByUsers : station.likedByUsers,
            songs: station.songs
        }
        savedStation = await storageService.put(STORAGE_KEY, stationToSave)
    } else {
        // Later, owner is set by the backend
        const stationToSave = {
            name : station.name,
            createdBy : userService.getLogedonUser(),
        }
        savedStation = await storageService.post(STORAGE_KEY, stationToSave)
    }
    return savedStation
}



async function addSongToStation(stationId, song) {
    // Later, this is all done by the backend
    const station = await getById(stationId)

    station.songs.push(song)
    await storageService.put(STORAGE_KEY, station)

    return station // ?
}


async function removeSongFromStation(stationId, songId) {
    const station = await getById(stationId)

    station.songs.filter((song) => song.id == songId)
    await storageService.put(STORAGE_KEY, station)

    return station // ?
}

async function addUserLikedToStation(stationId, userId) {
    const station = await getById(stationId)

    station.likedByUsers.push(userId)
    await storageService.put(STORAGE_KEY, station)

    return station // ?
}

async function removeUserLikedFromStation(stationId, userId) {
    const station = await getById(stationId)

    station.likedByUsers.filter((user) => user.id == userId)
    await storageService.put(STORAGE_KEY, station)

    return station // ?
}

// async function addCarMsg(carId, txt) {
//     // Later, this is all done by the backend
//     const car = await getById(carId)

//     const msg = {
//         id: utilService.makeId(),
//         by: userService.getLoggedinUser(),
//         txt
//     }
//     car.msgs.push(msg)
//     await storageService.put(STORAGE_KEY, car)

//     return msg
// }

// function getEmptyCar() {
//     return {
//         vendor: 'Susita-' + utilService.makeId(),
//         price: utilService.getRandomIntInclusive(1000, 9000),
//         msgs: []
//     }
// }



// TEST DATA
// (() => {
//     utilService.saveToStorage('station', station)
// })()

_createStations()

function _createStations() {
    let stations = utilService.loadFromStorage(STORAGE_KEY)
    if (!stations || !stations.length) {
        utilService.saveToStorage(STORAGE_KEY, initialStations)
    } 
}



// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




