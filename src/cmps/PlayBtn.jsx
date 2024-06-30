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

  console.log("playBtn songId:", songId.songId);
  // console.log("playBtn currentSong:", currentSong);
  console.log("playBtn isPlaying:", isPlaying);

  function playSong() {
    console.log("PlayBtn playSong --------");
    if (currentSong !== songId) {
      console.log("change song");
      setCurrentSong(songId.songId);
    }
    setPlayPause(true);
  }

  function pauseSong() {
    console.log("PlayBtn pauseSong");
    //setCurrentSong(songId.songId);
    setPlayPause(false);
  }

  const pauseDisplay =
    currentSong === songId.songId && isPlaying ? true : false;

  return (
    <>
      {pauseDisplay == true ? (
        <button onClick={pauseSong}>
          <SvgIcon iconName="pause" />
        </button>
      ) : (
        <button onClick={playSong}>
          <SvgIcon iconName="play" />
        </button>
      )}
    </>
  );
}
