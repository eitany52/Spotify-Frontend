import { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState} from "react";

// import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import { addSongToStation, isSongSavedAtStation, loadStation, removeSongFromStation } from "../store/actions/station.actions.js";
// import { utilService } from "../services/util.service.js";
import { getLoggedOnUser } from "../store/actions/user.actions.js";
import { utilService } from "../services/util.service.js";
import { SvgIcon, AllIcons } from "./SvgIcon.jsx";
import { AppSearch } from "./AppSearch.jsx";
import { SongList } from "./SongList.jsx";
import { AppHeader } from "../cmps/AppHeader";
import ImageColorComponent from "../cmps/ImageColorComponent";

//Checked - All looks good.

export function StationDetails() {
  const { stationId } = useParams();
  const station = useSelector((storeState) => storeState.stationModule.station);
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  );
  const { onAddToLikedSongs, isSongSavedAtSomeUserStation } = useOutletContext()
  const [colors, setColors] = useState({ backgroundColor: "", color: "" });
  const [style1, setStyle1] = useState(null);
  const [style2, setStyle2] = useState(null);

  useEffect(() => {
    loadStation(stationId);
  }, [stationId, stations, colors]);


  function isSongSavedAtCurrentStation(song) {
    return isSongSavedAtStation(station, song.id)
  }

  function onToggleAddToStation(song) {
    try {
      if (isSongSavedAtCurrentStation(song)) {
        removeSongFromStation(station._id, song.id);
      } else {
        addSongToStation(station._id, song);
      }
    } catch (err) {
      console.log("Having issues with removing or saving the song to this station", err)
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
                <span>playlist</span>
                <h2>{station.name}</h2>
                <h3>
                  {station.createdBy.fullname} |{" "}
                  {station.songs && station.songs.length} songs{" "}
                </h3>
              </section>
            </section>
          </section>
          <section className="station-details-play full" style={{ ...style2 }}>
            <section className="svg-big bigger">
              <SvgIcon iconName="play" style="dark" />
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
            onAddToStation={song => !isUserStation ? onAddToLikedSongs(song) : null}
            isSongSavedAtStation={song => !isUserStation ? isSongSavedAtSomeUserStation(song) : true}
            isUserStation={isUserStation}
            type="station"
          />
          </section>

          <section>
            {isUserStation && station.type === "normal" &&
             <AppSearch
             onAddToStation={onToggleAddToStation}
             isSongSavedAtStation={isSongSavedAtCurrentStation} />}
          </section>
        </>
      )}
    </section>
  );
}
