import { stationService } from '../../services/station.service.local'
import { store } from '../store'
import { LOADING_DONE, LOADING_START } from '../reducers/system.reducer'

import { ADD_STATION, REMOVE_STATION, UPDATE_STATION, SET_STATION, SET_STATIONS, SET_CURRENT_SONG, SET_PLAY_PAUSE, SET_SHUFFLE, DISPLAY_HIDE_CARD, SET_LIKED_SONGS_STATION, EXPEND_LIB } from '../reducers/station.reducer'

//Checked - All looks good.


export async function loadStations() {
    try {
        // store.dispatch({ type: LOADING_START })
        const stations = await stationService.getStations()
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
        store.dispatch({ type: SET_STATION, station })
    } catch (err) {
        console.log('Cannot load station', err)
        throw err
    }
}



export function getSongsFromYoutube() {
    return stationService.getSongsFromYoutube()
}

export async function createEmptyStation() {
    try {
        const station = stationService.createEmptyStation()
        const savedStation = await stationService.save(station)
        store.dispatch({ type: ADD_STATION, savedStation })
        return savedStation
    } catch (err) {
        console.log("Having issues with saving this station", err)
        throw err
    }

}

export function getUserStations(stations) {
return stationService.getUserStations(stations)
}

export async function loadLikedSongsStation() {
    try {
        const likedSongsStation = await stationService.getLikedSongsStation()
        store.dispatch({ type: SET_LIKED_SONGS_STATION, likedSongsStation })
    } catch (err) {
        console.log("Cannot load Liked Songs Station", err)
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


export async function saveStationByUser(station){
    try {
        const savedStation = await stationService.saveStationByUser(station)
        console.log('savedStation: 111111111',savedStation);
        if (savedStation !== "already exist" ){
            store.dispatch({ type: ADD_STATION, savedStation })
           // store.dispatch({ type: SET_STATION, savedStation })
        } 
    } catch (err) {
        console.log('Cannot save station by user', err)
        throw err
    }
}

export async function removeStationByUser(stationId){
    try {
        await stationService.remove(stationId)

        store.dispatch({ type: REMOVE_STATION, stationId })
    } catch (err) {
        console.log('Cannot remove station by user', err)
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

export function isSongSavedAtStation(station, songId) {
    return stationService.isSongSavedAtStation(station, songId)
}

export function isSongSavedAtSomeStation(stations, songId) {
    return stationService.isSongSavedAtSomeStation(stations, songId)
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
        console.log('Cannot remove user liked from station', err)
        throw err
    }
}



export async function updateStationDetails(station) {
    try {
        const updatedStation = await stationService.updateStationDetails(station)
        store.dispatch({ type: UPDATE_STATION, updatedStation })
    } catch (err) {
        console.log('Cannot update station details', err)
        throw err
    }
}




export async function setCurrentSong(song) {
    try {
        //console.log('actions setCurrentSong songId:', song.id)
        store.dispatch({ type: SET_CURRENT_SONG, song })
    } catch (err) {
        console.log('Cannot set current song', err)
        throw err
    }
}



export async function setPlayPause(ip) {
    try {
        // console.log('actions setPlayPause:', ip)
        store.dispatch({ type: SET_PLAY_PAUSE, ip })
    } catch (err) {
        console.log('Cannot set play pause', err)
        throw err
    }
}





export async function setIsShuffle(isShuffle) {
    try {
        // console.log('actions setIsShuffle:', isShuffle)
        store.dispatch({ type: SET_SHUFFLE, isShuffle })
    } catch (err) {
        console.log('Cannot set shuffle', err)
        throw err
    }
}


export async function setDisplayHideCard(cardStatus) {
    try {
        store.dispatch({ type: DISPLAY_HIDE_CARD, cardStatus })
    } catch (err) {
        console.log('Cannot set display hide card', err)
        throw err
    }
}



export async function setExpandLib(libStatus) {
    try {
        store.dispatch({ type: EXPEND_LIB, libStatus })
    } catch (err) {
        console.log('Cannot set expand library', err)
        throw err
    }
}
export function setStationFromDemo(station){
    try {
       
       store.dispatch({ type: SET_STATION, station })
    } catch (err) {
        console.log('Cannot load station from search', err)
        throw err
    }

}

export function formatSong(song) {
    return stationService.formatSong(song)
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