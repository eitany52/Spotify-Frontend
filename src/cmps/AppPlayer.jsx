import { useRef, useEffect } from "react";
import YouTube2 from "react-youtube";

import { SvgIcon } from "./SvgIcon.jsx";
import { useSelector } from "react-redux";
import { setPlayPause } from "../store/actions/station.actions";

export function AppPlayer() {
  return (
    <div>
      AppPlayer
      <SvgIcon iconName="play" />
      <SvgIcon iconName="pause" />
      <YouTubePlayer2 />
    </div>
  );
}

const YouTubePlayer2 = () => {
  const playerRef = useRef(null);

  const currentSong = useSelector(
    (storeState) => storeState.stationModule.currentSong
  );

  const isPlaying = useSelector(
    (storeState) => storeState.stationModule.isPlaying
  );

  useEffect(() => {
    if (isPlaying == true) {
      playVideo();
    }
    if (isPlaying == false) {
      pauseVideo();
    }
  }, [isPlaying]);

  // console.log("YouTubePlayer2 isPlaying", isPlaying);

  const onReady = (event) => {
    // שומר את רפרנס ה-Player instance
    playerRef.current = event.target;
    playerRef.current.setPlaybackQuality("small"); // מגדיר איכות נמוכה כדי להפחית את הצריכה
    //playerRef.current.mute(); // משתיק את הווידאו כדי שיהיה רק שמע
  };

  const playVideo = () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
    }
  };

  const pauseVideo = () => {
    if (playerRef.current) {
      playerRef.current.pauseVideo();
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
      <YouTube2 videoId={currentSong} opts={opts} onReady={onReady} />
      <button onClick={playVideo}>Play</button>
      <button onClick={pauseVideo}>Pause</button>
    </div>
  );
};

export default YouTubePlayer2;
