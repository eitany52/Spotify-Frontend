import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import { loadStation } from "../store/actions/station.actions.js";
// import { utilService } from "../services/util.service.js";
import { SvgIcon, AllIcons } from "./SvgIcon.jsx";
import { getLoggedOnUser } from "../store/actions/user.actions.js";
import { AppSearch } from "./AppSearch.jsx";
import { SongList } from "./SongList.jsx";
import { FloatingMenuSongAdd } from "./FloatingMenuSongAdd.jsx";
import { onToggleModal } from "../store/actions/app.actions.js";
import { FloatingMenuSong } from "./FloatingMenuSong.jsx";

//Checked - All looks good.

export function StationDetails() {
  const { stationId } = useParams();
  const station = useSelector((storeState) => storeState.stationModule.station);
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  );

  useEffect(() => {
    loadStation(stationId);
  }, [stationId, stations]);


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
        song:song,
        class:"floating-menu-song"
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
        class:"floating-menu-song-add"
      },
      style: {
        left: `${ev.clientX - 300}px`,
        top: `${ev.clientY - 200}px`,
      },
    });
  }


  function onClickMore(event) {
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
        left: `${event.clientX - 300}px`,
        top: `${event.clientY - 200}px`,
      },
    });
  }

  function onClickAdd(event) {
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
        left: `${event.clientX - 300}px`,
        top: `${event.clientY - 200}px`,
      },
    });
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
            <section className="intro">
              <img src={station.imgUrl} />
              <section>
                <h2>{station.name}</h2>
                <h3>
                  {station.createdBy.fullname} |{" "}
                  {station.songs && station.songs.length} songs{" "}
                </h3>
              </section>
            </section>

            {/* {station.songs && station.songs.length && (
            <img src={station.songs[0].imgUrl} />
          )} */}
          </header>
          <section className="svg-big bigger">
            <SvgIcon iconName="play" style="dark" />
          </section>

          <SongList
            songs={station.songs}
            onAddToStation={onAddToStation}
            onMoreOptions={onMoreOptions}
            type='station' />
          {isUserStation && station.type === 'normal' &&
            <AppSearch />}
        </div>
      )}
    </section>
  );
}
