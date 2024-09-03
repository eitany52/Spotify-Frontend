
// import { storageService } from './async-storage.service'
import { httpService } from '../http.service'
import { utilService } from '../util.service'


const STORAGE_KEY = 'station'

export const stationService = {
    query,
    getById,
    save,
    remove,
    getLikedSongsStation,
    addSongToStation,
    updateStationDetails,
    getDemoStations,
    // reorderSongInStation,
    removeSongFromStation
    // getEmptyCar,
    // addCarMsg
}
window.ss = stationService


async function query(filterBy = {}) {
    console.log('remote')
    return httpService.get(STORAGE_KEY, filterBy)
}

function getById(stationId) {
    return httpService.get(`station/${stationId}`)
}

async function remove(stationId) {
    return httpService.delete(`station/${stationId}`)
}
async function save(station) {
    var savedStation

    if (station._id) {
     //   savedStation = await httpService.put(`station/${station._id}`, station)
        savedStation = await httpService.put(`station`, station)

    } else {
        savedStation = await httpService.post('station', station)
    }
    return savedStation
}

async function getLikedSongsStation() {
    const stations = await query()
    const likedSongsStation = stations.find(station => station.type === 'liked')
    return likedSongsStation
}


async function addSongToStation(stationId, song) {
  
    // Later, this is all done by the backend
    const station = await getById(stationId)

    station.songs.push(song)


    await save(station)

    return station // ?
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

function getDemoStations(loggedInUserId) {
    return query({ notCreatedBy : loggedInUserId }) 
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

    return station // ?
}


async function addCarMsg(carId, txt) {
    const savedMsg = await httpService.post(`car/${carId}/msg`, {txt})
    return savedMsg
}


function getEmptyCar() {
    return {
        vendor: 'Susita-' + utilService.makeId(),
        price: utilService.getRandomIntInclusive(1000, 9000),
        msgs: []
    }
}





