import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppHeader } from "../cmps/AppHeader";
import { AppPlayer } from "../cmps/AppPlayer";
import { StationList } from "../cmps/StationList";
import { CurrentSongDetails } from "../cmps/CurrentSongDetails";
import { SvgIcon } from "../cmps/SvgIcon";
import { stationService } from "../services/station";
import { useScreenCategory } from "../customHooks/useBreakpoint";

import {
  addSongToStation,
  createEmptyStation,
  getUserStations,
  isSongSavedAtSomeStation,
  loadLikedSongsStation,
  loadLibraryStations as loadLibraryStations,
  // setStationFromDemo,
  setExpandLib,
} from "../store/actions/station.actions";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";

export const StationIndex = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const screenCategory = useScreenCategory();
  const [isHome, setHomeLib] = useState(true);

  const [isSearchDisplayed, setIsSearchDisplayed] = useState(false);
  const [isHomePageDisplayed, setIsHomePageDisplayed] = useState(true);

  const [homeStations, setHomeStations] = useState([]);

  const libraryStations = useSelector(
    (storeState) => storeState.stationModule.stations
  );
  const likedSongsStation = useSelector(
    (storeState) => storeState.stationModule.likedSongsStation
  );
  const displayCard = useSelector(
    (storeState) => storeState.stationModule.displayCard
  );

  const expendLib = useSelector(
    (storeState) => storeState.stationModule.expendLib
  );

  const user = useSelector((storeState) => storeState.userModule.user);

  //local
  //const demoStations = stationService.getDemoStations();

  useEffect(() => {
    if (user) {
      loadLibraryStations({ location: "library", userId: user._id });
      loadHomeStations({ location: "home", userId: user._id });
    }
    else {
      loadHomeStations({ location: "home", userId: null });
    }
    if (user) {
      loadLikedSongsStation();
    }
  }, [user]);

  useEffect(() => {
    getLocation();
  }, [location]);

  async function loadHomeStations(filterBy) {
    //remote
    try {
      const homeStations = await stationService.query(filterBy);
      setHomeStations(homeStations);
    } catch (err) {
      console.error("error getting demo stations", err);
    }
  }

  function getLocation() {
    if (location.pathname.includes("search")) {
      setIsSearchDisplayed(true);
    } else {
      setIsSearchDisplayed(false);
    }
    if (location.pathname === "/") {
      setIsHomePageDisplayed(true);
    } else {
      setIsHomePageDisplayed(false);
    }
  }

  function toggleDemoLib() {
    setHomeLib(false);
    navigate("/");
  }
  function goToHome() {
    setHomeLib(true);
    navigate("/");
  }

  async function onAddToLikedSongs(songToAdd) {
    try {
      if (user) {
        await addSongToStation(likedSongsStation._id, songToAdd);
        showSuccessMsg("Added to Liked Songs")
      }
      else {
        showErrorMsg("Log in to add this to your Liked Songs")
      }
    } catch (err) {
      console.log("Having issues with saving this song", err);
    }
  }

  // function setStationFromSearch(station) {
  //   setStationFromDemo(station);
  // }

  async function onCreateEmptyStation() {
    try {
      const emptyStation = await createEmptyStation();
      navigate(`/station/${emptyStation._id}`);
    } catch (err) {
      console.log("Creating new playlist failed, please try again later", err);
    }
  }

  function onSetExpandLib() {
    setExpandLib(!expendLib);
  }

  function isSongSavedAtSomeUserStation(song) {
    const userStations = user ? getUserStations(libraryStations) : []
    return isSongSavedAtSomeStation(userStations, song.id);
  }

  // function isDemoStation(stationId) {
  //   const isInDemo = demoStations.some((_station) => {
  //     return _station._id === stationId;
  //   });

  //   const isInStations = stations.some((_station) => {
  //     return _station._id === stationId;
  //   });
  //   // console.log("isInDemo:", isInDemo);
  //   // console.log("isInStations:", isInStations);
  //   // console.log("is only demo:", isInDemo && !isInStations);
  //   return isInDemo && !isInStations;
  // }

  return (
    <div
      className={`station-index  ${displayCard ? "display-card" : ""}  ${expendLib ? "expend-lib" : ""
        } `}
    >
      {/* <p>Current screen category: {screenCategory}</p> */}
      {/* {isHome ? "home" : "library"} */}
      {/* {console.log("rendered")} */}
      <aside>
        <nav>
          {((screenCategory !== "mobile" && !isHomePageDisplayed) ||
            (screenCategory === "mobile" && !isHome)) && (
              <button onClick={goToHome} className="btn-type-2">
                {" "}
                <SvgIcon iconName="home" /> Home{" "}
              </button>
            )}
          {((screenCategory !== "mobile" && isHomePageDisplayed) ||
            (screenCategory === "mobile" && isHome)) && (
              <button onClick={goToHome} className="btn-type-2 current">
                {" "}
                <SvgIcon iconName="homeActive" /> Home{" "}
              </button>
            )}

          {!isSearchDisplayed && (
            <Link to="/search" className="btn-type-2 ">
              {" "}
              <SvgIcon iconName="search" /> Search
            </Link>
          )}
          {isSearchDisplayed && (
            <Link to="/search" className="btn-type-2 current">
              {" "}
              <SvgIcon iconName="searchActive" /> Search
            </Link>
          )}

          {screenCategory === "mobile" && isHome && (
            <button className="btn-type-2" onClick={toggleDemoLib}>
              {" "}
              <SvgIcon iconName="library" /> Your Library
            </button>
          )}

          {screenCategory === "mobile" && !isHome && (
            <button className="btn-type-2 current" onClick={toggleDemoLib}>
              {" "}
              <SvgIcon iconName="library" /> Your Library
            </button>
          )}

          {screenCategory === "mobile" && (
            <Link
              to="https://open.spotify.com/download"
              className="btn-type-2 "
            >
              {" "}
              <SvgIcon iconName="arrowDown" /> Install now
            </Link>
          )}
        </nav>

        <section className="library">
          <div className="library-pannel">
            <button title="Collapse Your Library" className="btn-type-2">
              {" "}
              <SvgIcon iconName="library" />
              Your Library
            </button>
            <button
              onClick={onCreateEmptyStation}
              title="Create playlist"
              className="icon-type-1"
            >
              <SvgIcon iconName="plus" />
            </button>
            <button
              title="Show more"
              className="icon-type-1"
              onClick={onSetExpandLib}
            >
              <>
                {expendLib && <SvgIcon iconName="arrowLeft" />}
                {!expendLib && <SvgIcon iconName="arrowRight" />}
              </>
            </button>
          </div>
          <div className="library-types">
            <button className="btn-type-1">Playlists</button>
            <button className="btn-type-1">Artists</button>
            <button className="btn-type-1">Albums</button>
          </div>
          <div className="search-in-lib">
            {/* <button title="Search in your Library" className="btn btn-icon"> */}

            <button title="Search in your Library" className="icon-type-1">
              {" "}
              <SvgIcon iconName="search" />
            </button>
            <input
              type="text"
              className="search-field"
              placeholder="Search in your Library"
            />
            {/* <button>Recents</button> */}
          </div>
          <div className="station-list-wrapper">
            {user && (
              <StationList
                stations={libraryStations}
                location="library"
                onCreateEmptyStation={onCreateEmptyStation}
              />
            )}
          </div>
        </section>
      </aside>
      <main>
        {(isHomePageDisplayed || isSearchDisplayed) && <AppHeader />}

        {((isHomePageDisplayed && screenCategory !== "mobile") ||
          (isHomePageDisplayed && isHome && screenCategory === "mobile")) && (
            <StationList
              stations={homeStations}
              location="main"
              onCreateEmptyStation={onCreateEmptyStation}
            // setStationFromSearch={setStationFromSearch}
            />
          )}

        {isHomePageDisplayed && screenCategory === "mobile" && !isHome && (
          <div className="station-list-wrapper">
            <StationList
              stations={libraryStations}
              location="library"
              onCreateEmptyStation={onCreateEmptyStation}
            />
          </div>
        )}

        {!isHomePageDisplayed && (
          <Outlet
            context={{
              onAddToLikedSongs,
              isSongSavedAtSomeUserStation
              // isDemoStation,
            }}
          />
        )}
      </main>
      {displayCard && (
        <section className="card">
          <CurrentSongDetails />
        </section>
      )}
      <footer>{<AppPlayer />}</footer>
    </div>
  );
};
