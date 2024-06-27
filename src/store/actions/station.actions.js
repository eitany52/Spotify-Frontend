import { stationService } from '../../services/station.service.local'
import { store } from '../store'
import { LOADING_DONE, LOADING_START } from '../reducers/system.reducer'

// import { ADD_CAR, REMOVE_CAR, SET_CARS, SET_CAR, UPDATE_CAR, ADD_CAR_MSG } from './station.reducer'
import { ADD_STATION, REMOVE_STATION, UPDATE_STATION, SET_STATION, SET_STATIONS} from '../reducers/station.reducer'




export async function loadStations() {
    try {
        // store.dispatch({ type: LOADING_START })
        const stations = await stationService.getStations()
        console.log("stations in loadStations:", stations);
        store.dispatch({ type: SET_STATIONS, stations })
    } catch (err) {
        console.log('UserActions: err in loadStations', err)
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
    // finally {
    //     store.dispatch({ type: LOADING_DONE })
    // }
}


export async function loadStation(stationId) {
    try {
        const station = await stationService.getById(stationId)
        console.log('Station from DB:', station)
        store.dispatch({ type: SET_STATION, station })
    } catch (err) {
        console.log('Cannot load station', err)
        throw err
    }
}

export async function addStation(station) {
    try {
        const savedStation = await stationService.save(station)
        console.log('Added Station', savedStation)
        store.dispatch({ type: ADD_STATION, savedStation })
        return savedStation
    } catch (err) {
        console.log('Cannot add station', err)
        throw err
    }
}


export async function removeStation(stationId) {
    try {
        await stationService.remove(stationId)
        store.dispatch({ type: REMOVE_STATION, stationId })
    } catch (err) {
        console.log('Cannot remove station', err)
        throw err
    }
}


export async function addSongToStation(stationId, song) {
    try {
        const updatedStation = await stationService.addSongToStation(stationId, song)
        store.dispatch({ type: UPDATE_STATION, updatedStation })
    } catch (err) {
        console.log('Cannot add song to station', err)
        throw err
    }
}


export async function removeSongFromStation(stationId, songId) {
    try {
        const updatedStation = await stationService.removeSongFromStation(stationId, songId)
        store.dispatch({ type: UPDATE_STATION, updatedStation })
    } catch (err) {
        console.log('Cannot remove song from station', err)
        throw err
    }
}

export async function addUserLikedToStation(stationId, userId) {
    try {
        const updatedStation = await stationService.addUserLikedToStation(stationId, userId)
        store.dispatch({ type: UPDATE_STATION, updatedStation })
    } catch (err) {
        console.log('Cannot add user liked to station', err)
        throw err
    }
}


export async function removeUserLikedFromStation(stationId, userId) {
    try {
        const updatedStation = await stationService.removeUserLikedFromStation(stationId, userId)
        store.dispatch({ type: UPDATE_STATION, updatedStation })
    } catch (err) {
        console.log('Cannot add user liked to station', err)
        throw err
    }
}




// export async function loadCars() {
//     try {
//         const cars = await stationService.query()
//         console.log('Cars from DB:', cars)
//         store.dispatch(getCmdSetCars(cars))
//     } catch (err) {
//         console.log('Cannot load cars', err)
//         throw err
//     }
// }

// export async function loadCar(carId) {
//     try {
//         const car = await stationService.getById(carId)
//         console.log('Car from DB:', car)
//         store.dispatch(getCmdSetCar(car))
//     } catch (err) {
//         console.log('Cannot load car', err)
//         throw err
//     }
// }


// export async function removeCar(carId) {
//     try {
//         await stationService.remove(carId)
//         store.dispatch(getCmdRemoveCar(carId))
//     } catch (err) {
//         console.log('Cannot remove car', err)
//         throw err
//     }
// }

// export async function addCar(car) {
//     try {
//         const savedCar = await stationService.save(car)
//         console.log('Added Car', savedCar)
//         store.dispatch(getCmdAddCar(savedCar))
//         return savedCar
//     } catch (err) {
//         console.log('Cannot add car', err)
//         throw err
//     }
// }

// export async function updateCar(car) {
//     try {
//         const savedCar = await stationService.save(car)
//         console.log('Updated Car:', savedCar)
//         store.dispatch(getCmdUpdateCar(savedCar))
//         return savedCar
//     } catch (err) {
//         console.log('Cannot save car', err)
//         throw err
//     }
// }

// export async function addCarMsg(carId, txt) {
//     try {
//         const msg = await stationService.addCarMsg(carId, txt)
//         console.log('Added Car message', msg)
//         store.dispatch(getCmdAddCarMsg(msg))
//         return msg
//     } catch (err) {
//         console.log('Cannot add car msg', err)
//         throw err
//     }
// }

// Command Creators:
// function getCmdAddStation(station) {
//     return {
//         type: ADD_STATION,
//         station
//     }
// }
// function getCmdRemoveStation(stationId) {
//     return {
//         type: REMOVE_STATION,
//         stationId
//     }
// }







// function getCmdSetCars(cars) {
//     return {
//         type: SET_CARS,
//         cars
//     }
// }
// function getCmdSetCar(car) {
//     return {
//         type: SET_CAR,
//         car
//     }
// }
// function getCmdRemoveCar(carId) {
//     return {
//         type: REMOVE_CAR,
//         carId
//     }
// }
// function getCmdAddCar(car) {
//     return {
//         type: ADD_CAR,
//         car
//     }
// }
// function getCmdUpdateCar(car) {
//     return {
//         type: UPDATE_CAR,
//         car
//     }
// }
// function getCmdAddCarMsg(msg) {
//     return {
//         type: ADD_CAR_MSG,
//         msg
//     }
// }

// unitTestActions()
// async function unitTestActions() {
//     await loadCars()
//     await addCar(stationService.getEmptyCar())
//     await updateCar({
//         _id: 'm1oC7',
//         title: 'Car-Good',
//     })
//     await removeCar('m1oC7')
//     // TODO unit test addCarMsg
// }
