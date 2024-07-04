import { useState, useRef, useEffect } from "react";
import YouTube from "react-youtube";

import { SvgIcon } from "./SvgIcon.jsx";
import { utilService } from "../services/util.service.js";

import { useSelector } from "react-redux";
import {
  setCurrentSong,
  setPlayPause,
  setIsShuffle,
  setDisplayHideCard,
} from "../store/actions/station.actions";

export const AppPlayer = () => {
  const playerRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(0);

  const [isSongLoaded, setIsSongLoaded] = useState(false);
  // const [isShuffleLocal, setIsShuffleLocal] = useState(false);

  const stationModul = useSelector((storeState) => storeState.stationModule);

  const { currentSong, isPlaying, station, isShuffle, displayCard } =
    stationModul;

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
    setCurrentTime(playerRef.current.getCurrentTime());
    if (event.data === window.YT.PlayerState.CUED) {
      setIsSongLoaded(true);
    }
  };

  const handleRangeChange = (event) => {
    const time = parseFloat(event.target.value);
    setCurrentTime(time);
    if (playerRef.current) {
      playerRef.current.seekTo(time, true);
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
    setIsShuffle(!isShuffle);
  };

  const onDisplayCard = () => {
    setDisplayHideCard(!displayCard);
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
    <div className="app-player">
      <YouTube
        videoId={currentSong.id}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
      />

      <section className="current-song-details">
        <img src={currentSong.imgUrl} />
        <span>{currentSong.title}</span>
      </section>

      <section className="control-pannel">
        <section className="controls">
          <span onClick={onShuffle}>
            {" "}
            <SvgIcon
              iconName="shuffle"
              style={`${isShuffle ? "active" : null}`}
            />
          </span>

          <span onClick={onPrev}>
            {" "}
            <SvgIcon iconName="skipback" />
          </span>

          {isPlaying ? (
            <span onClick={pauseVideo}>
              {" "}
              <SvgIcon iconName="pause" />
            </span>
          ) : (
            <span onClick={playVideo}>
              {" "}
              <SvgIcon iconName="play" />
            </span>
          )}

          <span onClick={onNext}>
            {" "}
            <SvgIcon iconName="skipforward" />
          </span>
        </section>
        <section className="trace">
          <input
            type="range"
            min="0"
            max={playerRef.current ? playerRef.current.getDuration() : 100}
            step="0.1"
            value={currentTime}
            onChange={handleRangeChange}
          />
        </section>
      </section>

      <section className="extra-controls">
        <span onClick={onDisplayCard}>
          <SvgIcon iconName="nowPlaying" />
        </span>
      </section>
    </div>
  );
};

export default AppPlayer;
