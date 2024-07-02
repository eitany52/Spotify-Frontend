
export const ADD_STATION = 'ADD_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'
export const SET_STATIONS = 'SET_STATIONS'
export const UPDATE_STATION = 'UPDATE_STATION'
export const SET_STATION = 'SET_STATION'
export const SET_CURRENT_SONG = 'SET_CURRENT_SONG'
export const SET_PLAY_PAUSE = 'SET_PLAY_PAUSE'


// export const SET_CARS = 'SET_CARS'
// export const UPDATE_CAR = 'UPDATE_CAR'
// export const ADD_CAR_MSG = 'ADD_CAR_MSG'



const initialState = {
    stations: [],
    station : null,
    likedSongsStation: null,
    currentSong: {'id': null},
    isPlaying: false
}

export function stationReducer(state = initialState, action) {
    let newState = state
    let stations
    switch (action.type) {
     
        case SET_STATION:
            newState = { ...state, station: action.station }
            break
        case SET_STATIONS:
            newState = { ...state, stations: action.stations }
            break
        case ADD_STATION:
            newState = { ...state, stations: [...state.stations, action.savedStation] }
            break
        case REMOVE_STATION:
            const lastRemovedStation = state.stations.find(station => station._id === action.stationId)
            stations = state.stations.filter(station => station._id !== action.stationId)
            newState = { ...state, stations, lastRemovedStation }
            break
        case UPDATE_STATION:
            stations = state.stations.map(station => station._id === action.station._id ? action.station : station)
            newState = { ...state, stations }
            break
        case SET_CURRENT_SONG:
            newState = { ...state, currentSong: action.song }
            break
        case SET_PLAY_PAUSE:
            newState = { ...state, isPlaying: action.ip }
            break
        
        default:
    }
    return newState
}

// unitTestReducer()

// function unitTestReducer() {
//     var state = initialState
//     const car1 = { _id: 'b101', vendor: 'Car ' + parseInt(Math.random() * 10), msgs: [] }
//     const car2 = { _id: 'b102', vendor: 'Car ' + parseInt(Math.random() * 10), msgs: [] }

//     state = carReducer(state, { type: SET_CARS, cars: [car1] })
//     console.log('After SET_CARS:', state)

//     state = carReducer(state, { type: ADD_CAR, car: car2 })
//     console.log('After ADD_CAR:', state)

//     state = carReducer(state, { type: UPDATE_CAR, car: { ...car2, vendor: 'Good' } })
//     console.log('After UPDATE_CAR:', state)

//     state = carReducer(state, { type: REMOVE_CAR, carId: car2._id })
//     console.log('After REMOVE_CAR:', state)

//     const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
//     state = carReducer(state, { type: ADD_CAR_MSG, carId: car1._id, msg })
//     console.log('After ADD_CAR_MSG:', state)

//     state = carReducer(state, { type: REMOVE_CAR, carId: car1._id })
//     console.log('After REMOVE_CAR:', state)
// }

