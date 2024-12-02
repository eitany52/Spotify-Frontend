export const ADD_STATION = 'ADD_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'
export const SET_STATIONS = 'SET_STATIONS'
export const SET_HOME_STATIONS = 'SET_HOME_STATIONS'
export const UPDATE_STATION = 'UPDATE_STATION'
export const UPDATE_HOME_STATION = 'UPDATE_HOME_STATION'
export const SET_STATION = 'SET_STATION'
export const SET_LIKED_SONGS_STATION = 'SET_LIKED_SONGS_STATION'
export const SET_CURRENT_SONG = 'SET_CURRENT_SONG'
export const SET_PLAY_PAUSE = 'SET_PLAY_PAUSE'
export const SET_SHUFFLE = 'SET_SHUFFLE'
export const DISPLAY_HIDE_CARD = 'DISPLAY_HIDE_CARD'
export const EXPEND_LIB = 'EXPEND_LIB'
export const UNDO_UPDATE_STATION = 'UNDO_UPDATE_STATION'


//Checked - All looks good.


// export const SET_CARS = 'SET_CARS'
// export const UPDATE_CAR = 'UPDATE_CAR'
// export const ADD_CAR_MSG = 'ADD_CAR_MSG'



const initialState = {
    stations: [],
    homeStations: [],
    station: null,
    likedSongsStation: null,
    currentSong: { 'id': null },
    isPlaying: false,
    isShuffle: false,
    displayCard: false,
    expendLib: false,
    lastStation: null
}

export function stationReducer(state = initialState, action) {
    let newState = state
    let stations
    let station
    switch (action.type) {
        case SET_STATION:
            newState = { ...state, station: action.station }
            break
        case SET_LIKED_SONGS_STATION:
            newState = { ...state, likedSongsStation: action.likedSongsStation }
            break
        case SET_STATIONS:
            newState = { ...state, stations: action.stations }
            break
        case SET_HOME_STATIONS:
            newState = { ...state, homeStations: action.homeStations }
            break
        case ADD_STATION:
            newState = { ...state, stations: [...state.stations, action.savedStation] }
            break
        case REMOVE_STATION:
            stations = state.stations.filter(station => station._id !== action.stationId)
            newState = { ...state, stations }
            break
        case UPDATE_STATION:
            station = state.stations.find(station => station._id === action.updatedStation._id)
            stations = state.stations.map(station => station._id === action.updatedStation._id ? action.updatedStation : station)
            newState = { ...state, stations, lastStation: station }
            break
        case UPDATE_HOME_STATION:
            stations = state.homeStations.map(station => station._id === action.updatedStation._id ? action.updatedStation : station)
            newState = { ...state, homeStations: stations }
            break
        case SET_CURRENT_SONG:
            newState = { ...state, currentSong: action.song }
            break
        case SET_PLAY_PAUSE:
            newState = { ...state, isPlaying: action.ip }
            break
        case SET_SHUFFLE:
            newState = { ...state, isShuffle: action.isShuffle }
            break
        case DISPLAY_HIDE_CARD:
            newState = { ...state, displayCard: action.cardStatus }
            break
        case EXPEND_LIB:
            newState = { ...state, expendLib: action.libStatus }
            break
        case UNDO_UPDATE_STATION:
            stations = state.stations.map(station => station._id === newState.lastStation._id ? newState.lastStation : station)
            newState = { ...state, stations }
            break
        default:
    }
    return newState
}
