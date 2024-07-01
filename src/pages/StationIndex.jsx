import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useSearchParams } from "react-router-dom";
import { AppSearch } from "../cmps/AppSearch";
import { AppPlayer } from "../cmps/AppPlayer";
import { StationList } from "../cmps/StationList";
import { SvgIcon } from "../cmps/SvgIcon";

export const StationIndex = () => {
  const location = useLocation();
  const [isSearchDisplayed, setIsSearchDisplayed] = useState(false);
  const [isHomePageDisplayed, setIsHomePageDisplayed] = useState(true);



  useEffect(() => {
    getLocation();
  }, [location]);

  function getLocation() {
    if (location.pathname.includes("search")) {
      setIsSearchDisplayed(true)
    } else {
      setIsSearchDisplayed(false)
    }
    if (location.pathname === "/") {
      setIsHomePageDisplayed(true)
    }
    else {
      setIsHomePageDisplayed(false)
    }
  }

  return (
    <div className="station-index">
      {console.log("rendered")}
      <header>
        <section className="icons-back-forward">
          <SvgIcon iconName={"back"} />
          <SvgIcon iconName={"forward"} />
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
          <Link to="/" className="btn">
            Home
          </Link>
          <Link to="/search" className="btn active">
            Search
          </Link>
        </nav>
        <section className="library">
          <div>
            <button title="Collapse Your Library">Your Library</button>
            <button title="Create playlist or folder">Create</button>
            <button title="Show more">Show more</button>
          </div>
          <div>
            <button>Playlists</button>
            <button>Artists</button>
            <button>Albums</button>
          </div>
          <div>
            <form>
              <label>Search</label>
              <input type="text" />
            </form>
            <button>Recents</button>
          </div>
          <StationList location="library" />
        </section>
      </aside>
      <main>
        {isHomePageDisplayed && <StationList location="main" />}
        {!isHomePageDisplayed && <Outlet />}
      </main>
      <footer>{<AppPlayer />}</footer>
    </div>
  );
};
