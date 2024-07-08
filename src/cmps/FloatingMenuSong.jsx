import React from "react";
import { StationList } from "./StationList.jsx";

import { removeSongFromStation } from "../store/actions/station.actions.js";

export const FloatingMenuSong = ({ stationId, songId, onDone, song }) => {
  // console.log("SongFloatingMenu stationId:", stationId);
  // console.log("SongFloatingMenu songId:", songId);

  function onRemove() {
    // console.log("i am about to delete song");
    removeSongFromStation(stationId, songId);
    onDone();
  }
  return (
    <div className="song-floating-menu">
      <ul>
        <li>
          Add To Playlist
          <StationList location="modal" songToAdd={song} />
        </li>
        <li onClick={onRemove}>Remove From This Playlist</li>
        <li>Remove From Your Liked Songs</li>
      </ul>
    </div>
  );
};
