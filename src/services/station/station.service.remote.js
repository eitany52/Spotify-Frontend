
// import { storageService } from './async-storage.service'
import { httpService } from '../http.service'
import { utilService } from '../util.service'

export const stationService = {
    query,
    getById,
    save,
    remove,
    addSongToStation,
    updateStationDetails,
    getUserLikedSongs,
    removeSongFromStation
    // reorderSongInStation,
    // getEmptyCar,
    // addCarMsg
}
window.ss = stationService


async function query(filterBy = {}) {
    console.log('remote')
    return httpService.get('station', filterBy)
}

function getById(stationId) {
    return httpService.get(`station/${stationId}`)
}

async function remove(stationId) {
    return httpService.delete(`station/${stationId}`)
}
async function save(station) {
    let savedStation
    if (station._id) {
        //   savedStation = await httpService.put(`station/${station._id}`, station)
        savedStation = await httpService.put(`station`, station)

    } else {
        savedStation = await httpService.post('station', station)
    }
    return savedStation
}


async function addSongToStation(stationId, song) {
    const station = await getById(stationId)

    station.songs.push(song)
    await save(station)

    return station
}


async function updateStationDetails(stationToSave) {

    const station = await getById(stationToSave._id)

    // station.name = stationToSave.name;
    // station.description = stationToSave.description;
    // station.imgUrl = stationToSave.imgUrl;

    Object.assign(station, stationToSave);

    await save(station)

    return station // ?)

}

async function getUserLikedSongs() {
    const userLikedSongs = await httpService.get('station/user-liked-songs')
    return userLikedSongs
}

// async function reorderSongInStation(stationId, songs) {
//     const station = await getById(stationId)

//     station.songs = songs

//     await save(station)

//     return station // ?
// }


async function removeSongFromStation(stationId, songId) {
    const station = await getById(stationId)
    station.songs = station.songs.filter((song) => song.id !== songId)
    await save(station)

    return station
}


async function addCarMsg(carId, txt) {
    const savedMsg = await httpService.post(`car/${carId}/msg`, { txt })
    return savedMsg
}


function getEmptyCar() {
    return {
        vendor: 'Susita-' + utilService.makeId(),
        price: utilService.getRandomIntInclusive(1000, 9000),
        msgs: []
    }
}





