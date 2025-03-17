const { DEV } = import.meta.env

import { getLoggedInUser } from '../store/actions/user.actions.js'
import { httpService } from './http.service.js'

export const stationService = {
    createEmptyStation,
    isSongSavedAtStation,
    getUserStations,
    isSongSavedAtSomeStation,
    getLoggedInUser,
    query,
    getById,
    save,
    remove,
    addSongToStation,
    addSongToMultipleStations,
    getUserLikedSongs,
    removeSongFromStation,
    removeSongFromMultipleStations,
    addStationToLibrary,
    removeStationFromLibrary,
    // getDemoStations, 
    // reorderSongInStation
}

window.ss = stationService

function createEmptyStation() {
    return {
        // _id: "",
        name: "My Playlist",
        type: "normal",
        description: '',
        imgUrl: 'https://www.greencode.co.il/wp-content/uploads/2024/07/station-thumb-default.jpg',
        tags: [],
        createdBy: {},
        savedBy: [],
        songs: []
    }
}

function isSongSavedAtStation(station, songId) {
    return station.songs.some(song => song.id === songId)
}

function getUserStations(stations) {
    return stations.filter(station => station.createdBy.id === getLoggedInUser()._id)
}

function isSongSavedAtSomeStation(stations, songId) {
    let isSongSavedAtSomeStation = false
    stations.forEach(station => {
        if (station.songs.some(song => song.id === songId)) {
            isSongSavedAtSomeStation = true
        }
    })
    return isSongSavedAtSomeStation
}

async function query(filterBy = {}) {
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
            savedStation = await httpService.put('station/savedby', station)
        } else {
            savedStation = await httpService.put('station', station)
        }

    } else {
        savedStation = await httpService.post('station', station)
    }
    return savedStation
}


async function addSongToStation(station, song) {
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

async function addSongToMultipleStations(stations, song) {
    const user = {
        id: getLoggedInUser()._id,
        name: getLoggedInUser().name
    }

    song.addedAt = Date.now()
    song.addedBy = user
    for (const station of stations) {
        station.songs.push(song)
    }
    await updateMultipleStations(stations)

    return stations
}

async function updateMultipleStations(stations) {
    return httpService.put('station', stations)
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


async function removeSongFromStation(station, songId) {
    station.songs = station.songs.filter((song) => song.id !== songId)
    await save(station)

    return station
}

async function removeSongFromMultipleStations(stations, songId) {
    for (const station of stations) {
        station.songs = station.songs.filter((song) => song.id !== songId)
    }
    await updateMultipleStations(stations)

    return stations
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

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.stationService = stationService
