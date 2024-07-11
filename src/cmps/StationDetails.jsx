import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

// import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import { loadStation } from "../store/actions/station.actions.js";
import { utilService } from "../services/util.service.js";
import { SvgIcon, AllIcons } from "./SvgIcon.jsx";
import { getLoggedOnUser } from "../store/actions/user.actions.js";
import { AppSearch } from "./AppSearch.jsx";
import { SongList } from "./SongList.jsx";
import { FloatingMenuSongAdd } from "./FloatingMenuSongAdd.jsx";
import { onToggleModal } from "../store/actions/app.actions.js";
import { FloatingMenuSong } from "./FloatingMenuSong.jsx";
import { AppHeader } from "../cmps/AppHeader";
import ImageColorComponent from "../cmps/ImageColorComponent";

//Checked - All looks good.

export function StationDetails() {
  const { stationId } = useParams();
  const station = useSelector((storeState) => storeState.stationModule.station);
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  );
  const [colors, setColors] = useState({ backgroundColor: "", color: "" });
  const [style1, setStyle1] = useState(null);
  const [style2, setStyle2] = useState(null);

  useEffect(() => {
    loadStation(stationId);
  }, [stationId, stations, colors]);

  function onMoreOptions(ev, song) {
    console.log("song:", song);
    console.log("ev:", ev);
    console.log("more.......");
    onToggleModal({
      cmp: FloatingMenuSong,
      props: {
        stationId: station._id,
        songId: song.id,
        onDone() {
          onToggleModal(null);
        },
        song: song,
        class: "floating-menu-song",
      },
      style: {
        left: `${ev.clientX - 300}px`,
        top: `${ev.clientY - 200}px`,
      },
    });
  }

  function onAddToStation(ev, song) {
    console.log("Add.......");
    onToggleModal({
      cmp: FloatingMenuSongAdd,
      props: {
        stationId: station._id,
        songId: song.id,
        onDone() {
          onToggleModal(null);
        },
        class: "floating-menu-song-add",
      },
      style: {
        left: `${ev.clientX - 300}px`,
        top: `${ev.clientY - 200}px`,
      },
    });
  }

  const handleColorChange = (newColors) => {
    console.log("newColors:", newColors);
    const styles = utilService.createGradientColors(newColors.backgroundColor);

    console.log("styles:", styles);
    setStyle1(styles.style1);
    setStyle2(styles.style2);
    setColors(newColors);
  };

  if (!station) return <div>Loading...</div>;

  const isUserStation = getLoggedOnUser()._id === station.createdBy.id;

  return (
    <section className="station-details">
      {/* <Link to="/" className="btn">
        Back Home
      </Link> */}

      {/* <AllIcons /> */}
      {station && (
        <>
          <AppHeader backgroundColor={colors.backgroundColor} />
          <section className="header" style={{ ...style1 }}>
            <span>playlist</span>
            <section className="intro-outer">
              <img src={station.imgUrl} />
              <section className="intro-inner sb">
                <h2>{station.name}</h2>
                <h3>
                  {station.createdBy.fullname} |{" "}
                  {station.songs && station.songs.length} songs{" "}
                </h3>
              </section>
            </section>
          </section>
          <section className="station-details-play" style={{ ...style2 }}>
            <section className="svg-big bigger">
              <SvgIcon iconName="play" style="dark" />
            </section>
          </section>

          <div style={{ width: "50px", height: "50px" }}>
            <ImageColorComponent
              imageUrl={station.imgUrl}
              onColorChange={handleColorChange}
            />
          </div>

          <SongList
            songs={station.songs}
            onAddToStation={onAddToStation}
            onMoreOptions={onMoreOptions}
            type="station"
          />
          {isUserStation && station.type === "normal" && <AppSearch />}
        </>
      )}
    </section>
  );
}
