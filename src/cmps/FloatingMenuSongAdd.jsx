import React from "react";
import { removeSongFromStation } from "../store/actions/station.actions.js";
import { StationList } from "./StationList.jsx";

export const FloatingMenuSongAdd = ({ stationId, songId, onDone }) => {
  // console.log("SongFloatingMenu stationId:", stationId);
  // console.log("SongFloatingMenu songId:", songId);

  function onRemove() {
    // console.log("i am about to delete song");
    removeSongFromStation(stationId, songId);
    onDone();
  }
  return (
    <div className="floating-menu-song-add">
      <ul>
        {/* <li>Add To Playlist</li> */}

        <StationList location="modal" />
        {/* <li>Remove From Your Liked Songs</li> */}
      </ul>
    </div>
  );
};
