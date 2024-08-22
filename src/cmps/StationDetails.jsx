import { useEffect } from "react";
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
} from "../store/actions/station.actions.js";

// import { utilService } from "../services/util.service.js";
import { getLoggedOnUser } from "../store/actions/user.actions.js";
import { utilService } from "../services/util.service.js";
import { SvgIcon, AllIcons } from "./SvgIcon.jsx";
import { AppSearch } from "./AppSearch.jsx";
import { SongList } from "./SongList.jsx";
import { AppHeader } from "../cmps/AppHeader";
import ImageColorComponent from "../cmps/ImageColorComponent";
import { useStation } from "../customHooks/useStation.js";

//Checked - All looks good.

export function StationDetails() {
  const { stationId } = useParams();
  const station = useSelector((storeState) => storeState.stationModule.station);
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  );
  const isPlaying = useSelector(
    (storeState) => storeState.stationModule.isPlaying
  );
  const currentSong = useSelector(
    (storeState) => storeState.stationModule.currentSong
  );
  const { onAddToLikedSongs, isSongSavedAtSomeUserStation, isDemoStation } =
    useOutletContext();
  const [colors, setColors] = useState({
    backgroundColor: "",
    color: "",
  });
  const [style1, setStyle1] = useState(null);
  const [style2, setStyle2] = useState(null);

  const location = "station-details";
  const { handleRightClick } = useStation({ station, stationId, location });

  useEffect(() => {
    const isDemoOnly = isDemoStation(stationId);
    if (!isDemoOnly) {
      loadStation(stationId);
    }
    //loadStation(stationId);
  }, [stationId, stations, colors]);

  function isSongSavedAtCurrentStation(song) {
    return isSongSavedAtStation(station, song.id);
  }

  function onToggleAddToStation(song) {
    try {
      if (isSongSavedAtCurrentStation(song)) {
        removeSongFromStation(station._id, song.id);
      } else {
        addSongToStation(station._id, song);
      }
    } catch (err) {
      console.log(
        "Having issues with removing or saving the song to this station",
        err
      );
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

  if (!station) return <div>Loading...</div>;

  const isUserStation = getLoggedOnUser()._id === station.createdBy.id;
  const isCurrentSongSavedAtStation = isSongSavedAtStation(
    station,
    currentSong.id
  );

  // if (colors.backgroundColor === "") return <div>Loading...</div>;
  return (
    <section className="station-details main-layout">
      {/* <AllIcons /> */}
      {station && (
        <>
          <section className="app-header-continer full">
            <AppHeader backgroundColor={colors.backgroundColor} />
          </section>
          <section className="header full" style={{ ...style1 }}>
            <section className="intro-outer">
              <img src={station.imgUrl} />
              <section className="intro-inner sb">
                <span>Playlist</span>
                <h2>{station.name}</h2>
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
            <section
              // onClick={() => {
              //   console.log("now you should open modal");
              // }}
              onClick={handleRightClick}
              className="svg-big bigger regular-color"
            >
              <SvgIcon iconName="more" />
            </section>
          </section>

          <div
            className="color-component "
            style={{ width: "50px", height: "50px" }}
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
            />
          </section>

          <section>
            {isUserStation && station.type === "normal" && (
              <AppSearch
                onAddToStation={onToggleAddToStation}
                isSongSavedAtStation={isSongSavedAtCurrentStation}
              />
            )}
          </section>
        </>
      )}
    </section>
  );
}
