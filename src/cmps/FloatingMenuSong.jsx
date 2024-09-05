import { StationList } from "./StationList.jsx";
import {
  addSongToStation,
  getUserStations,
  isSongSavedAtStation,
  loadLikedSongsStation,
  removeSongFromStation,
} from "../store/actions/station.actions.js";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getLoggedInUser } from "../store/actions/user.actions.js";
import { SvgIcon } from "./SvgIcon.jsx";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

export const FloatingMenuSong = ({ onDone, song }) => {
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  );
  const station = useSelector((storeState) => storeState.stationModule.station);
  const likedSongsStation = useSelector(
    (storeState) => storeState.stationModule.likedSongsStation
  );
  const user = useSelector(storeState => storeState.userModule.user)

  function onRemoveSongFromStation() {
    onDone();
    try {
      removeSongFromStation(station._id, song.id);
    } catch (err) {
      console.log("Having issues with removing song from station", err);
      showErrorMsg("Failed to remove song");
    }
  }

  function isSongSavedAtLikedSongs() {
    return isSongSavedAtStation(likedSongsStation, song.id);
  }

  async function onToggleAddToLikedSongs() {
    onDone();
    let isSongAdded = false; // is song added or removed from liked songs station
    try {
      if (isSongSavedAtLikedSongs()) {
        await removeSongFromStation(likedSongsStation._id, song.id);
      } else {
        await addSongToStation(likedSongsStation._id, {
          ...song,
          addedAt: Date.now(),
        });
        isSongAdded = true;
      }
      showSuccessMsg(
        `${isSongAdded ? "Added to" : "Removed from"} Liked Songs`
      );
    } catch (err) {
      console.log(
        "Having issues with adding/removing song from liked songs station",
        err
      );
      showErrorMsg("Failed to add/remove song from Liked Songs");
    }
  }

  async function onAddSongToStation(station) {
    onDone();
    try {
      if (!isSongSavedAtStation(station, song.id)) {
        await addSongToStation(station._id, { ...song, addedAt: Date.now() });
        showSuccessMsg(`Added to ${station.name}`);
      } else {
        showErrorMsg(
          `Already added: This is already in your '${station.name}' playlist.`
        );
      }
    } catch (err) {
      console.log("Having issues with adding this song to station", err);
      showErrorMsg("Failed to add song");
    }
  }
  // if (!likedSongsStation) return <div>loading...</div>;
  const userStations = user ? getUserStations(stations) : []
  const isUserStation = user && station && user._id === station.createdBy.id;
  const isSongToMark = user && isSongSavedAtLikedSongs();
  return (
    <div className="song-floating-menu">
      <ul>
        <li>
          <span className="btn-type-2">
            <SvgIcon iconName="plus" /> Add To Playlist
          </span>
          <StationList
            stations={userStations}
            location="modal-more"
            onAddSongToStation={onAddSongToStation}
          />
        </li>
        {station && station.type === "normal" && isUserStation && (
          <li onClick={onRemoveSongFromStation}>
            <span className="btn-type-2">
              <SvgIcon iconName="bin" /> Remove From This Playlist
            </span>
          </li>
        )}
        {/* <li onClick={onToggleAddToLikedSongs}>
          {`${
            isSongSavedAtLikedSongs() ? "Remove From" : "Save to"
          } Your Liked Songs`}
        </li> */}

        <li onClick={onToggleAddToLikedSongs}>
          {isSongToMark ? (
            <>
              <span className="btn-type-2 active">
                <SvgIcon iconName="tick" />
                Remove From Your Liked Songs{" "}
              </span>
            </>
          ) : (
            <>
              <span className="btn-type-2">
                <SvgIcon iconName="add" />
                Save To Your Liked Songs{" "}
              </span>
            </>
          )}
        </li>
      </ul>
    </div>
  );
};
