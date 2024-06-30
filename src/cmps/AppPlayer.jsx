import { useState, useRef, useEffect } from "react";
import YouTube from "react-youtube";

import { SvgIcon } from "./SvgIcon.jsx";
import { useSelector } from "react-redux";

export const AppPlayer = () => {
  const playerRef = useRef(null);
  // const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isSongLoaded, setIsSongLoaded] = useState(false);

  const currentSong = useSelector(
    (storeState) => storeState.stationModule.currentSong
  );

  console.log("AppPlayer currentSong:", currentSong);

  const isPlaying = useSelector(
    (storeState) => storeState.stationModule.isPlaying
  );

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
    console.log("playVideo");
    if (playerRef.current) {
      playerRef.current.playVideo();
    }
  };

  const pauseVideo = () => {
    console.log("pauseVideo");
    if (playerRef.current) {
      playerRef.current.pauseVideo();
    }
  };

  const onStateChange = (event) => {
    if (event.data === window.YT.PlayerState.CUED) {
      setIsSongLoaded(true);
    }
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
        videoId={currentSong}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
      />

      <span>{currentSong}</span>
      <button onClick={playVideo}>
        {" "}
        <SvgIcon iconName="play" />
      </button>
      <button onClick={pauseVideo}>
        {" "}
        <SvgIcon iconName="pause" />
      </button>
    </div>
  );
};

export default AppPlayer;
