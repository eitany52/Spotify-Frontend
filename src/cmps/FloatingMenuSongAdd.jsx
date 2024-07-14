import { removeSongFromStation } from "../store/actions/station.actions.js";
import { StationList } from "./StationList.jsx";
import { useSelector } from "react-redux";

export const FloatingMenuSongAdd = ({ song, onDone }) => {
  const stationId = useSelector(
    (storeState) => storeState.stationModule.station?._id
  );
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  );

  function onRemove() {
    removeSongFromStation(stationId, song.id);
    onDone();
  }
  return (
    <div className="floating-menu-song-add">
      <ul>
        {/* <li>Add To playlist</li> */}
        {/* <li><AppSearch/></li> */}

        <StationList
          stations={stations}
          location="modal-add"
          // onAddSongToStation={onAddSongToStation}
        />

        {/* <li>Remove From Your Liked Songs</li> */}
      </ul>
    </div>
  );
};
