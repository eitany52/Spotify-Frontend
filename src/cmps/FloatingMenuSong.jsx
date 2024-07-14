import { StationList } from "./StationList.jsx";

import { removeSongFromStation } from "../store/actions/station.actions.js";
import { SvgIcon } from "../cmps/SvgIcon";
import { useState, useEffect } from "react";
import { stationService } from "../services/station.service.local";

export const FloatingMenuSong = ({ stationId, songId, onDone, song }) => {
  const [isInLikedSong, setIsInLikedSong] = useState(null);

  useEffect(() => {
    checkIfInLikedSong();
  }, []);

  async function checkIfInLikedSong() {
    console.log("in checkIfInLikedSong");
    setIsInLikedSong(await stationService.isSongInLikedSong(songId));
  }

  function onRemove() {
    // console.log("i am about to delete song");
    removeSongFromStation(stationId, songId);
    onDone();
  }

  if (isInLikedSong === null) return <div>loading...</div>;

  return (
    <div className="song-floating-menu">
      <ul>
        <li>
          <span className="btn-type-2">
            <SvgIcon iconName="plus" /> Add To Playlist
          </span>
          <StationList location="modal" songToAdd={song} />
        </li>

        <li onClick={onRemove}>
          <span className="btn-type-2">
            <SvgIcon iconName="bin" /> Remove From This Playlist
          </span>
        </li>
        <li>
          {isInLikedSong ? (
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
        {/* <li>
          <SvgIcon iconName="add" />
          Save To Your Liked Songs
        </li> */}
      </ul>
    </div>
  );
};
