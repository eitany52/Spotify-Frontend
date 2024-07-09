import searchRes from "../../data/search.json";

// import { stationService } from "../services/station.service.local";
// import { userService } from "../services/user.service.local";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { loadStations, addStation } from "../store/actions/station.actions";
import { SvgIcon } from "./SvgIcon";
import { useLocation, useNavigate } from "react-router";
import {
  addSongToStation,
  getSongsFromYoutube,
  removeSongFromStation,
} from "../store/actions/station.actions";
import { SongList } from "./SongList";

// Checked - All looks good.

export const AppSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isUserAtStation, setIsUserAtStation] = useState(false);
  const [userInput, setUserInput] = useState(null);
  const [songs, setSongs] = useState(null);
  const station = useSelector((storeState) => storeState.stationModule.station);

  useEffect(() => {
    getLocation();
  }, [location]);

  useEffect(() => {
    if (!userInput) return;

    if (isUserAtStation) {
      setSongs(getSongsFromYoutube());
    } else {
      navigate(`/search/${userInput}`);
    }
  }, [userInput]);

  function getLocation() {
    if (location.pathname.includes("station")) {
      setIsUserAtStation(true);
    } else {
      setIsUserAtStation(false);
    }
  }

  async function onSearch(ev) {
    ev.preventDefault();
    setUserInput(ev.target.txt.value);
  }

  function onToggleAddToStation(song) {
    if (isSongSavedAtStation(song)) {
      removeSongFromStation(station._id, song.id);
    } else {
      addSongToStation(station._id, song);
    }
  }

  function isSongSavedAtStation(song) {
    return station.songs.some((_song) => _song.id === song.id);
  }

  return (
    <div className="app-search">
      <form className="search-form" onSubmit={onSearch}>
        <span className="icon-search">
          <SvgIcon iconName={"search"} />
        </span>
        <input
          type="text"
          name="txt"
          placeholder={
            isUserAtStation ? "Search for songs" : "What do you want to play?"
          }
        />
      </form>
      {isUserAtStation && userInput && songs && (
        <SongList
          songs={songs}
          onAddToStation={onToggleAddToStation}
          isSongSavedAtStation={isSongSavedAtStation}
          type="search-at-station"
        />
      )}
    </div>
  );
};
