import { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import { addSongToStation, isSongSavedAtStation, loadStation, removeSongFromStation } from "../store/actions/station.actions.js";
// import { utilService } from "../services/util.service.js";
import { SvgIcon } from "./SvgIcon.jsx";
import { getLoggedOnUser } from "../store/actions/user.actions.js";
import { AppSearch } from "./AppSearch.jsx";
import { SongList } from "./SongList.jsx";

//Checked - All looks good.

export function StationDetails() {
  const { stationId } = useParams();
  const station = useSelector(storeState => storeState.stationModule.station)
  const stations = useSelector(storeState => storeState.stationModule.stations)
  const { onAddToLikedSongs, isSongSavedAtSomeUserStation } = useOutletContext()


  useEffect(() => {
    loadStation(stationId);
  }, [stationId, stations]);


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

  if (!station) return <div>Loading...</div>;

  const isUserStation = getLoggedOnUser()._id === station.createdBy.id;

  return (
    <section className="station-details">
      {/* <Link to="/" className="btn">
        Back Home
      </Link> */}

      {/* <AllIcons /> */}
      {station && (
        <div>
          <header>
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
          </header>
          <section className="svg-big bigger">
            <SvgIcon iconName="play" style="dark" />
          </section>

          <SongList
            songs={station.songs}
            onAddToStation={song => !isUserStation ? onAddToLikedSongs(song) : null}
            isSongSavedAtStation={song => !isUserStation ? isSongSavedAtSomeUserStation(song) : true}
            isUserStation={isUserStation}
            type="station"
          />
          {isUserStation && station.type === "normal" &&
            <AppSearch
              onAddToStation={onToggleAddToStation}
              isSongSavedAtStation={isSongSavedAtCurrentStation} />}
        </div>
      )}
    </section>
  );
}
