
// import { storageService } from './async-storage.service'
import { httpService } from '../http.service'
import { utilService } from '../util.service'


const STORAGE_KEY = 'station'

export const stationService = {
    query,
    getById,
    save,
    remove,
    getLikedSongsStation
    // getEmptyCar,
    // addCarMsg
}
window.ss = stationService


async function query(filterBy = { txt: '', price: 0 }) {
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
        savedStation = await httpService.put(`station/${station._id}`, station)

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





