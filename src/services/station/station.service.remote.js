import { httpService } from '../http.service'
import { getLoggedInUser } from '../../store/actions/user.actions'

export const stationService = {
    query,
    getById,
    save,
    remove,
    addSongToStation,
    getUserLikedSongs,
    removeSongFromStation,
    addStationToLibrary,
    removeStationFromLibrary
    // reorderSongInStation,
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
async function save(station, updateSavedByOnly = false) {
    let savedStation

    if (station._id) {

        if (updateSavedByOnly) {
            savedStation = await httpService.put(`station/savedby`, station)
        } else {
            savedStation = await httpService.put(`station`, station)
        }

    } else {
        savedStation = await httpService.post('station', station)
    }
    return savedStation
}


async function addSongToStation(stationId, song) {
    const station = await getById(stationId)
    const user = {
        id: getLoggedInUser()._id,
        name: getLoggedInUser().name
    }

    song.addedAt = Date.now()
    song.addedBy = user
    station.songs.push(song)
    await save(station)

    return station
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

async function addStationToLibrary(station) {
    const stationToSave = {
        ...station,
        savedBy: [...station.savedBy, getLoggedInUser()._id]
    }

    const savedStation = await save(stationToSave, true)
    return savedStation
}

async function removeStationFromLibrary(station) {
    const stationToRemove = {
        ...station,
        savedBy: station.savedBy.filter(userId => userId !== getLoggedInUser()._id)
    }

    const removedStation = await save(stationToRemove, true)
    return removedStation
}




