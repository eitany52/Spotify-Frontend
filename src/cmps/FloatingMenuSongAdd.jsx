import { addSongToStation, getUserStations, removeSongFromStation } from "../store/actions/station.actions.js";
import { StationList } from "./StationList.jsx";
import { useSelector } from "react-redux";

export const FloatingMenuSongAdd = ({ song, onDone }) => {
  const stationId = useSelector((storeState) => storeState.stationModule.station?._id)
  const stations = useSelector((storeState) => storeState.stationModule.stations)
  let stationsTemp = []

  function onRemove() {
    removeSongFromStation(stationId, song.id);
    onDone();
  }

  function isStationAlreadyAdded(station) {
    return stationsTemp.some(_station => _station._id === station._id)
  }

  function onToggleAddStation(station) {
    if (isStationAlreadyAdded) {
      stationsTemp = stationsTemp.filter(_station => _station._id !== station._id)
    }
    else {
      stationsTemp.push(station)
    }
  }

  function onAddSongToStations() {
    stationsTemp.forEach(station => {
      addSongToStation(station.id, song)
    })
    onDone()
  }

  const userStations = getUserStations(stations);
  // const isUserStation = getLoggedOnUser()._id === station?.createdBy.id;
  return (
    <form onSubmit={onAddSongToStations} className="floating-menu-song-add">
      <ul>
        {/* <li>Add To playlist</li> */}
        {/* <li><AppSearch/></li> */}
        {/* <button> + New playlist</button> */}
        <StationList
          stations={userStations}
          location="modal-add"
          onAddStation={onToggleAddStation}
        />
      </ul>
      <section className="cancel-done-btns">
        <button>Cancel</button>
        <button>Done</button>
      </section>
    </form>
  );
};
