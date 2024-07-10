import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { AppSearch } from "../cmps/AppSearch";
import { AppPlayer } from "../cmps/AppPlayer";
import { StationList } from "../cmps/StationList";
import { CurrentSongDetails } from "../cmps/CurrentSongDetails";
import { SvgIcon } from "../cmps/SvgIcon";
import { createEmptyStation } from "../store/actions/station.actions";

export const StationIndex = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isSearchDisplayed, setIsSearchDisplayed] = useState(false);
  const [isHomePageDisplayed, setIsHomePageDisplayed] = useState(true);

  const displayCard = useSelector(
    (storeState) => storeState.stationModule.displayCard
  );

  useEffect(() => {
    getLocation();
  }, [location]);

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

  async function onCreateEmptyStation() {
    try {
      const emptyStation = await createEmptyStation();
      navigate(`/station/${emptyStation._id}`);
    } catch (err) {
      console.log("Creating new playlist failed, please try again later", err);
    }
  }

  return (
    <div className={`station-index  ${displayCard ? "display-card" : null}  `}>
      {console.log("rendered")}
      <header>
        {/* <section className="icons-back-forward"> */}
        <section>
          <button className="icon-type-1 big">
            <SvgIcon iconName={"back"} />
          </button>
          <button className="icon-type-1 big">
            <SvgIcon iconName={"forward"} />
          </button>
        </section>
        {isSearchDisplayed && <AppSearch />}
        {/* <button>Back</button>
        <button>Forward</button> */}
        {/* <div>
          <button>Settings</button>
          <button>More</button>
          <UserPreview/>
        </div> */}
      </header>
      <aside>
        <nav>
          {/* <section className="all-buttons">
            <span className="btn-type-2">
              <SvgIcon iconName="home" /> Home{" "}
            </span>

            <span className="btn-type-1">Playlist</span>

            <span className="btn-type-3">Add</span>
            <span className="btn-type-3">Added</span> 
            <span>---</span>
            <span className="icon-type-1">
              <SvgIcon iconName="plus" />
            </span>

            <span className="icon-type-2">
              <SvgIcon iconName="skipforward" />
            </span>

            <span className="icon-type-3">
              <SvgIcon iconName="play" />
            </span>
          </section> */}

          <Link to="/" className="btn-type-2">
            <SvgIcon iconName="home" /> Home
          </Link>
          <Link to="/search" className="btn-type-2">
            <SvgIcon iconName="search" /> Search
          </Link>
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
            <button title="Show more" className="icon-type-1">
              <SvgIcon iconName="more" />
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
            <form>
              {/* <label>Search</label> */}
              <input
                type="text"
                class="search-field"
                placeholder="Search in your Library"
              />
            </form>
            {/* <button>Recents</button> */}
          </div>
          <StationList location="library" />
        </section>
      </aside>
      <main>
        {isHomePageDisplayed && <StationList location="main" />}
        {!isHomePageDisplayed && <Outlet />}
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
