import { StationList } from "./StationList.jsx";
import { addSongToStation, getUserStations, isSongSavedAtStation, loadLikedSongsStation, removeSongFromStation } from "../store/actions/station.actions.js";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getLoggedOnUser } from "../store/actions/user.actions.js";
import { onToggleModal } from "../store/actions/app.actions.js";

export const FloatingMenuSong = ({ onDone, song }) => {
  // console.log("SongFloatingMenu stationId:", stationId);
  // console.log("SongFloatingMenu songId:", songId);
  const stations = useSelector(storeState => storeState.stationModule.stations)
  const station = useSelector(storeState => storeState.stationModule.station)
  const likedSongsStation = useSelector(storeState => storeState.stationModule.likedSongsStation)

  useEffect(() => {
    loadLikedSongsStation()
  }, [])

  function onRemoveSongFromStation() {
    removeSongFromStation(station._id, song.id);
    onDone();
  }

  function isSongSavedAtLikedSongs() {
    return isSongSavedAtStation(likedSongsStation, song.id)
  }

  function onToggleAddToLikedSongs() {
    try {
      if (isSongSavedAtLikedSongs()) {
        removeSongFromStation(likedSongsStation._id, song.id)
      }
      else {
        addSongToStation(likedSongsStation._id, { ...song, addedAt: Date.now() })
      }
      onDone()
    } catch (err) {
      console.log("Having issues with removing or adding song to station", err)
    }
  }

  function onAddSongToStation(station) {
    try {
      if (!isSongSavedAtStation(station, song.id)) {
        addSongToStation(station._id, { ...song, addedAt: Date.now() });
      }
      //Should present user message
      else {
        console.log(`This is already in your ${station.name} playlist`);
      }
      onDone()
    } catch (err) {
      console.log("Having issues with saving this song to station", err)
    }
  }
  if (!likedSongsStation) return
  const userStations = getUserStations(stations)
  const isUserStation = getLoggedOnUser()._id === station?.createdBy.id;
  return (
    <div className="song-floating-menu">
      <ul>
        <li>
          Add To Playlist
          <StationList
            stations={userStations}
            location="modal"
            onAddSongToStation={onAddSongToStation} />
        </li>
        {station && station.type === "normal" && isUserStation &&
          <li onClick={onRemoveSongFromStation}>Remove From This Playlist</li>}
        <li onClick={onToggleAddToLikedSongs}>{`${isSongSavedAtLikedSongs() ? "Remove From" : "Save to"} Your Liked Songs`}</li>
      </ul>
    </div>
  );
};
