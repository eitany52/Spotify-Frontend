import { useState, useRef, useEffect } from "react";
import YouTube from "react-youtube";

import { SvgIcon } from "./SvgIcon.jsx";
import { utilService } from "../services/util.service.js";

import { useSelector } from "react-redux";
import {
  setCurrentSong,
  setPlayPause,
  setIsShuffle,
} from "../store/actions/station.actions";

export const AppPlayer = () => {
  const playerRef = useRef(null);

  const [isSongLoaded, setIsSongLoaded] = useState(false);
  // const [isShuffleLocal, setIsShuffleLocal] = useState(false);

  const stationModul = useSelector((storeState) => storeState.stationModule);

  const { currentSong, isPlaying, station, isShuffle } = stationModul;

  useEffect(() => {
    if (isSongLoaded) {
      if (isPlaying == true) {
        playVideo();
      }
      if (isPlaying == false) {
        pauseVideo();
      }
    }
  }, [isPlaying, isSongLoaded]);

  useEffect(() => {
    setIsSongLoaded(false);
  }, [currentSong]);

  const onReady = (event) => {
    // שומר את רפרנס ה-Player instance
    playerRef.current = event.target;
    playerRef.current.setPlaybackQuality("small"); // מגדיר איכות נמוכה כדי להפחית את הצריכה
    // setIsPlayerReady(true);
  };

  const playVideo = () => {
    //console.log("playVideo");
    if (playerRef.current && currentSong.id) {
      playerRef.current.playVideo();
      if (isPlaying == false) {
        setPlayPause(true);
      }
    }
  };

  const pauseVideo = () => {
    //console.log("pauseVideo");
    if (playerRef.current) {
      playerRef.current.pauseVideo();
      if (isPlaying == true) {
        setPlayPause(false);
      }
    }
  };

  const onStateChange = (event) => {
    if (event.data === window.YT.PlayerState.CUED) {
      setIsSongLoaded(true);
    }
  };

  const onNext = () => {
    let nextIndex;
    const currentIndex = station.songs.findIndex(
      (song) => song.id === currentSong.id
    );

    if (isShuffle) {
      nextIndex = utilService.getRandomExcludingY(
        station.songs.length - 1,
        currentIndex
      );
      console.log("onNext Shuffle nextIndex:", nextIndex);
    } else {
      if (currentIndex === -1) {
        console.log("error onNext");
        return null;
      }
      nextIndex = (currentIndex + 1) % station.songs.length;
    }

    setCurrentSong(station.songs[nextIndex]);
    setIsSongLoaded(false);
  };

  const onPrev = () => {
    let prevIndex;
    const currentIndex = station.songs.findIndex(
      (song) => song.id === currentSong.id
    );

    if (isShuffle) {
      prevIndex = utilService.getRandomExcludingY(
        station.songs.length - 1,
        currentIndex
      );
    } else {
      if (currentIndex === -1) {
        console.log("error onPrev");
        return null;
      }

      prevIndex =
        currentIndex == 0 ? station.songs.length - 1 : currentIndex - 1;
    }
    setCurrentSong(station.songs[prevIndex]);
    setIsSongLoaded(false);
  };

  const onShuffle = () => {
    //setIsShuffle((prevShuffle) => !prevShuffle);
    setIsShuffle(!isShuffle);
  };

  const opts = {
    height: "100", // גובה ורוחב אפס כדי להסתיר את הוידאו
    width: "100",
    playerVars: {
      autoplay: 0,
      controls: 0,
      origin: window.location.origin, // מגדיר את המקור ל-URL הנוכחי של הדפדפן
    },
  };

  return (
    <div>
      <YouTube
        videoId={currentSong.id}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
      />

      <span>{currentSong.title}</span>
      <img
        src={currentSong.imgUrl}
        style={{
          maxWidth: "100px",
          maxHeight: "100px",
          display: "block",
        }}
      />

      <button onClick={onShuffle}>
        {" "}
        <SvgIcon iconName="shuffle" style={`${isShuffle ? "active" : null}`} />
      </button>

      <button onClick={onPrev}>
        {" "}
        <SvgIcon iconName="skipback" />
      </button>

      {isPlaying ? (
        <button onClick={pauseVideo}>
          {" "}
          <SvgIcon iconName="pause" />
        </button>
      ) : (
        <button onClick={playVideo}>
          {" "}
          <SvgIcon iconName="play" />
        </button>
      )}

      <button onClick={onNext}>
        {" "}
        <SvgIcon iconName="skipforward" />
      </button>
    </div>
  );
};

export default AppPlayer;
