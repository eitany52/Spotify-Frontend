import React, { useRef } from "react";

import { useSelector } from "react-redux";
// import YouTube from "react-youtube";

import { SvgIcon } from "./SvgIcon";
import { setCurrentSong, setPlayPause } from "../store/actions/station.actions";

export function PlayBtn(songId) {
  const currentSong = useSelector(
    (storeState) => storeState.stationModule.currentSong
  );

  const isPlaying = useSelector(
    (storeState) => storeState.stationModule.isPlaying
  );

  // console.log("playBtn songId:", songId.songId);
  // console.log("playBtn currentSong:", currentSong);

  function playSong() {
    console.log("PlayBtn playSong");
    setCurrentSong(songId.songId);
    setPlayPause();
  }

  function pauseSong() {
    console.log("PlayBtn pauseSong");
    setCurrentSong(songId.songId);
    setPlayPause();
  }
  return (
    <>
      <button onClick={playSong}>
        <SvgIcon iconName="play" />
      </button>

      <button onClick={pauseSong}>
        <SvgIcon iconName="pause" />
      </button>
    </>
  );
}
