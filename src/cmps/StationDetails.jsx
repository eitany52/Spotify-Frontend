import { useEffect, useRef } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

// import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import {
  addSongToStation,
  isSongSavedAtStation,
  loadStation,
  removeSongFromStation,
  setCurrentSong,
  setPlayPause,
  setNewSongOrder,
  resetStation,
} from "../store/actions/station.actions.js";

import { utilService } from "../services/util.service.js";
import { SvgIcon, AllIcons } from "./SvgIcon.jsx";
import { AppSearch } from "./AppSearch.jsx";
import { SongList } from "./SongList.jsx";
import { AppHeader } from "../cmps/AppHeader";
import ImageColorComponent from "../cmps/ImageColorComponent";
import { useStation } from "../customHooks/useStation.js";
import { useScreenCategory } from "../customHooks/useBreakpoint.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

export function StationDetails() {
  const { stationId } = useParams();
  const station = useSelector((storeState) => storeState.stationModule.station);
  const isPlaying = useSelector(
    (storeState) => storeState.stationModule.isPlaying
  );
  const currentSong = useSelector(
    (storeState) => storeState.stationModule.currentSong
  );
  const user = useSelector(storeState => storeState.userModule.user)
  const { onAddToLikedSongs, isSongSavedAtSomeUserStation } =
    useOutletContext();
  const [colors, setColors] = useState({
    backgroundColor: "",
    color: "",
  });
  const [style1, setStyle1] = useState(null);
  const [style2, setStyle2] = useState(null);

  const location = "station-details";
  const { handleClick } = useStation({ station, location });

  const screenCategory = useScreenCategory();

  useEffect(() => {
    loadStation(stationId);
    return () => resetStation();
  }, [stationId]);

  // const [localSongs, setLocalSongs] = useState(songs);
  const [fontSize, setFontSize] = useState("1em");
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  // useEffect(() => {
  //   const isDemoOnly = isDemoStation(stationId);
  //   if (!isDemoOnly) {
  //     loadStation(stationId);
  //   }
  //   //loadStation(stationId);
  // }, [stationId, stations, colors]);

  useEffect(() => {
    console.log(1111111);
    const resizeFont = () => {
      const container = containerRef.current;
      const img = imgRef.current;
      if (!container || !img) return;
      console.log(2222);

      let currentFontSize = 150; // Start with the initial font size
      const { width: maxWidth, height: maxHeight } =
        container.getBoundingClientRect();
      console.log("maxWidth:", maxWidth);
      console.log("maxHeight:", maxHeight);

      // Create a temporary element to measure text size
      const tempEl = document.createElement("span");
      tempEl.style.visibility = "hidden";
      tempEl.style.whiteSpace = "nowrap";
      tempEl.style.fontSize = `${currentFontSize}px`;
      tempEl.textContent = station.name;
      document.body.appendChild(tempEl);
      console.log(33333);
      // Adjust font size until the text fits within the container
      while (
        (tempEl.getBoundingClientRect().width > maxWidth ||
          tempEl.getBoundingClientRect().height > maxHeight) &&
        currentFontSize > 0
      ) {
        console.log(44444);
        currentFontSize -= 1;
        tempEl.style.fontSize = `${currentFontSize}px`;
      }
      console.log(5555);
      document.body.removeChild(tempEl);
      setFontSize(currentFontSize);
    };

    resizeFont();
    window.addEventListener("resize", resizeFont);

    return () => {
      window.removeEventListener("resize", resizeFont);
    };
  }, [station]);

  function isSongSavedAtCurrentStation(song) {
    return isSongSavedAtStation(station, song.id);
  }

  async function onToggleAddToStation(song) {
    let isSongAdded = false
    try {
      if (isSongSavedAtCurrentStation(song)) {
        await removeSongFromStation(station._id, song.id, station._id);
      } else {
        await addSongToStation(station._id, song, station._id);
        isSongAdded = true
      }
      showSuccessMsg(`${isSongAdded ? "Added to" : "Removed from"}${station.name}`)
    } catch (err) {
      console.log("Cannot remove or save the song to this station", err)
      showErrorMsg(`Failed to Add/Remove from ${station.name}`)
    }
  }

  function playPauseStation() {
    if (currentSong.id !== null && !isCurrentSongSavedAtStation) {
      setCurrentSong(station.songs[0]);
      setPlayPause(true);
    }

    if (currentSong.id !== null && isCurrentSongSavedAtStation) {
      if (isPlaying) {
        setPlayPause(false);
      } else {
        setPlayPause(true);
      }
    }

    if (currentSong.id === null) {
      setCurrentSong(station.songs[0]);
      setPlayPause(true);
    }
  }

  const handleColorChange = (newColors) => {
    const styles = utilService.createGradientColors(newColors.backgroundColor);
    setStyle1(styles.style1);
    setStyle2(styles.style2);
    setColors(newColors);
  };

  function onDragEnd(result) {
    const { destination, source } = result;
    if (!destination) return;

    const reorderedSongs = Array.from(station.songs);
    const [removed] = reorderedSongs.splice(source.index, 1);
    reorderedSongs.splice(destination.index, 0, removed);

    setNewSongOrder(station, reorderedSongs);
  }

  if (!station)
    return (
      <div className="loading-wrapper">
        <div className="loading"></div>{" "}
      </div>
    );

  const isUserStation = user && user._id === station.createdBy.id;
  const isCurrentSongSavedAtStation = isSongSavedAtStation(
    station,
    currentSong.id
  );

  // if (colors.backgroundColor === "") return <div>Loading...</div>;
  return (
    <section className="station-details main-layout">
      {/* <AllIcons /> */}
      <>
        <section className="app-header-continer full">
          <AppHeader backgroundColor={colors.backgroundColor} />
        </section>
        <section className="header full" style={{ ...style1 }}>
          <section className="intro-outer">
            <img src={station.imgUrl} ref={imgRef} />
            <section className="intro-inner sb">
              <span>Playlist</span>
              {/* <h2>{station.name}</h2> */}
              <div
                ref={containerRef}
                style={{
                  width: "100%",
                  height: "150px",
                }}
              >
                <h2 style={{ fontSize: `${fontSize}px`, margin: 0 }}>
                  {station.name}
                </h2>
              </div>
              <h3>
                {station.createdBy.fullname} |{" "}
                {station.songs && station.songs.length} songs{" "}
              </h3>
            </section>
          </section>
        </section>
        <section className="station-details-play full" style={{ ...style2 }}>
          {station.songs.length > 0 && (
            <section onClick={playPauseStation} className="svg-big bigger">
              {(!isPlaying ||
                (isPlaying && !isCurrentSongSavedAtStation)) && (
                  <SvgIcon iconName="play" style="dark" />
                )}
              {isPlaying && isCurrentSongSavedAtStation && (
                <SvgIcon iconName="pause" style="dark" />
              )}
            </section>
          )}
          {station.type === "normal" &&
            <section
              // onClick={() => {
              //   console.log("now you should open modal");
              // }}
              onClick={handleClick}
              className="svg-big bigger regular-color"
            >
              <SvgIcon iconName="more" />
            </section>}
        </section>

        <div
          className="color-component "
          style={{ width: "10px", height: "10px" }}
        >
          <ImageColorComponent
            imageUrl={station.imgUrl}
            onColorChange={handleColorChange}
          />
        </div>

        <section>
          <SongList
            songs={station.songs}
            onAddToStation={(song) =>
              !isUserStation ? onAddToLikedSongs(song) : null
            }
            isSongSavedAtStation={(song) =>
              !isUserStation ? isSongSavedAtSomeUserStation(song) : true
            }
            isUserStation={isUserStation}
            type="station"
            onDragEnd={onDragEnd}
          />
        </section>

        <section className="app-search-wrapper">
          {isUserStation &&
            station.type === "normal" &&
            screenCategory !== "mobile" && (
              <AppSearch
                onAddToStation={onToggleAddToStation}
                isSongSavedAtStation={isSongSavedAtCurrentStation}
              />
            )}
        </section>
      </>
    </section>
  );
}
