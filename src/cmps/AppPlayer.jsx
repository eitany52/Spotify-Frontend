import { useState, useRef, useEffect } from "react";
import YouTube from "react-youtube";

import { SvgIcon } from "./SvgIcon.jsx";
import { useSelector } from "react-redux";
import { setCurrentSong } from "../store/actions/station.actions";

export const AppPlayer = () => {
  const playerRef = useRef(null);

  const [isSongLoaded, setIsSongLoaded] = useState(false);

  const stationModul = useSelector((storeState) => storeState.stationModule);

  const { currentSong, isPlaying, station } = stationModul;

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
    if (playerRef.current) {
      playerRef.current.playVideo();
    }
  };

  const pauseVideo = () => {
    //console.log("pauseVideo");
    if (playerRef.current) {
      playerRef.current.pauseVideo();
    }
  };

  const onStateChange = (event) => {
    if (event.data === window.YT.PlayerState.CUED) {
      setIsSongLoaded(true);
    }
  };

  const onNext = () => {
    //console.log("station.songs:", station.songs);
    const currentIndex = station.songs.findIndex(
      (song) => song.id === currentSong.id
    );

    //console.log("currentIndex:", currentIndex);
    if (currentIndex === -1) {
      console.log("error onNext");
      return null;
    }
    const nextIndex = (currentIndex + 1) % station.songs.length;
    //console.log("nextIndex:", nextIndex);
    setCurrentSong(station.songs[nextIndex]);
    setIsSongLoaded(false);
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
      <button onClick={playVideo}>
        {" "}
        <SvgIcon iconName="play" />
      </button>
      <button onClick={pauseVideo}>
        {" "}
        <SvgIcon iconName="pause" />
      </button>

      <button onClick={onNext}>
        {" "}
        <SvgIcon iconName="forward" />
      </button>
    </div>
  );
};

export default AppPlayer;
