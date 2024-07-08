import { storageService } from './async-storage.service'
import { utilService } from './util.service'
import { userService } from './user.service.local'
import initialStations from '../../data/stations.json'
import searchRes from "../../data/search.json"
import { getLoggedOnUser } from '../store/actions/user.actions'

//Checked - All looks good.

export const stationService = {
    query,
    getById,
    save,
    remove,
    getStations,
    addSongToStation,
    removeSongFromStation,
    addUserLikedToStation,
    removeUserLikedFromStation,
    getLikedSongsStation,
    isLikedSongStation,
    formatSong,
    createEmptyStation,
    getSongsFromYoutube,
    updateStationDetails
    // getEmptyCar,
    // addCarMsg
}
window.ss = stationService
const STORAGE_KEY = 'station_db'
_createStations()


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

async function getLikedSongsStation() {
    const stations = await getStations()
    const likedSongsStation = stations.find(station => station.type === 'liked')
    return likedSongsStation
}

async function isLikedSongStation(stationId){
    console.log('stationId:', stationId)
    const station = await getById(stationId)
    console.log('station:', station)
    const islikedSongsStation = (station.type === 'liked')
    console.log('islikedSongsStation:', islikedSongsStation)
    
    return islikedSongsStation
}

async function getById(stationId) {
    return await storageService.get(STORAGE_KEY, stationId)
}

async function remove(stationId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, stationId)
}

function createEmptyStation() {
    return {
        _id: "",
        name: "My Playlist",
        type: "normal",
        description: null,
        imgUrl: null,
        tags: [],
        createdBy: {},
        savedBy: [],
        songs: []
    }
}

async function save(station) {
    let savedStation
    if (station._id) {
        // const stationToSave = {
        //     _id: station._id,
        //     name: station.name,
        //     tags: station.tags,
        //     createdBy: station.createdBy,
        //     likedByUsers: station.likedByUsers,
        //     songs: station.songs
        // }
        savedStation = await storageService.put(STORAGE_KEY, station)
    } else {
        // Later, owner is set by the backend
        const user = {
            id: getLoggedOnUser()._id,
            name: getLoggedOnUser().name
        }
        const stationToSave = {
            ...station, createdBy: user
        }
        savedStation = await storageService.post(STORAGE_KEY, stationToSave)
    }
    return savedStation
}

function getSongsFromYoutube() {
    return searchRes[0].items
    // const searchTerm = 'rap-song'
    // const res = await fetch(`https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&part=snippet&key=AIzaSyCUE7BdmEO9uF_gWcV5yY5O3eqyINxdavo`)
    // const data = await res.json()
    // console.log(data);
}



async function addSongToStation(stationId, song) {
    // Later, this is all done by the backend
    const station = await getById(stationId)

    station.songs.push(song)
    await storageService.put(STORAGE_KEY, station)

    return station // ?
}


async function removeSongFromStation(stationId, songId) {
    console.log('station.service removeSongFromStation stationId:', stationId)
    console.log('station.service removeSongFromStation songId:', songId)

    const station = await getById(stationId)
    console.log('station.service removeSongFromStation station:', station)
    station.songs = station.songs.filter((song) => song.id !== songId)
    console.log('station.service removeSongFromStation updatedStation after filter:', station)
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


async function updateStationDetails(stationToSave) {

    const station = await getById(stationToSave._id)

    station.name = stationToSave.name;
    station.description = stationToSave.description;
    await storageService.put(STORAGE_KEY, station)

    return station // ?)
   
}



function formatSong(song) {
    const user = {
        id: getLoggedOnUser()._id,
        name: getLoggedOnUser().name
    }
    return {
        id: song.id.videoId,
        title: song.snippet.title,
        channelTitle: song.snippet.channelTitle,
        url: `https://youtube.com/watch?v=${song.id.videoId}`,
        imgUrl: song.snippet.thumbnails.default.url,
        addedBy: user,
        addedAt: Date.now()
    }
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





function _createStations() {
    let stations = utilService.loadFromStorage(STORAGE_KEY)
    if (!stations || !stations.length) {
        utilService.saveToStorage(STORAGE_KEY, initialStations)
    }
}


// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))

