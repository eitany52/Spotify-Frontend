
// import { storageService } from './async-storage.service'
import { httpService } from '../http.service'
import { utilService } from '../util.service'
import { getLoggedInUser } from '../../store/actions/user.actions'


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
    removeSongFromStation,
    saveStationByUser,
    isLikedSongStation
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
async function save(station, updateSavedByOnly = false) {
    var savedStation
   
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




async function removeSongFromStation(stationId, songId) {

    const station = await getById(stationId)
    station.songs = station.songs.filter((song) => song.id !== songId)
    await save(station)

    return station // ?
}



async function saveStationByUser(station) {


    console.log('remote saveStationByUser')
    const stationToSave = {
        ...station, savedBy: [...station.savedBy, getLoggedInUser()._id]
    }

    const stations = await query()
    console.log('remote saveStationByUser stations:', stations)
    console.log('remote saveStationByUser station._id:', station._id)
    console.log('remote saveStationByUser getLoggedInUser()._id:', getLoggedInUser()._id)

    //const isExists = stations.some(_station => _station._id === station._id)

    const isExists = stations.some(_station => 
        _station._id === station._id && 
        _station.savedBy.includes(getLoggedInUser()._id)
      );
    if (isExists) {
        return Promise.resolve('already exists');
    }
    const savedStation = await save(stationToSave, true)
    console.log('remote saveStationByUser savedStations:', savedStation)
    return savedStation
}


async function isLikedSongStation(stationId) {
    const station = await getById(stationId)
    const islikedSongsStation = (station.type === 'liked')
    return islikedSongsStation
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





