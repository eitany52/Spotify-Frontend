import searchRes from "../../data/search.json";

// import { stationService } from "../services/station.service.local";
// import { userService } from "../services/user.service.local";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { loadStations, addStation } from "../store/actions/station.actions";
import { SvgIcon } from "./SvgIcon";
import { useLocation, useNavigate } from "react-router";
import { getSongsFromYoutube } from "../store/actions/station.actions";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { SongList } from "./SongList";


// Checked - All looks good.

export const AppSearch = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isUserAtStation, setIsUserAtStation] = useState(false)
  const [userInput, setUserInput] = useState(null)
  const [songs, setSongs] = useState(null)


  useEffect(() => {
    getLocation()
  }, [location])

  useEffect(() => {
    if (!userInput) return

    if (isUserAtStation) {
      setSongs(getSongsFromYoutube())
    }
    else {
      navigate(`/search/${userInput}`)
    }
  }, [userInput])


  function getLocation() {
    if (location.pathname.includes('station')) {
      setIsUserAtStation(true)
    }
    else {
      setIsUserAtStation(false)
    }
  }

  async function onSearch(ev) {
    ev.preventDefault()
    setUserInput(ev.target.txt.value)
    // const searchTerm = 'rap-song'
    // const res = await fetch(`https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&part=snippet&key=AIzaSyCUE7BdmEO9uF_gWcV5yY5O3eqyINxdavo`)
    // const data = await res.json()
    // console.log(data);
    //
  }


  return (
    <div className="app-search">
      <form className="search-form" onSubmit={onSearch}>
        <span className="icon-search"><SvgIcon iconName={"search"} /></span>
        <input
          type="text"
          name="txt"
          placeholder={isUserAtStation ? "Search for songs" : "What do you want to play?"} />
      </form>
      {isUserAtStation && userInput && songs && <SongList songs={songs}/>}
    </div>
  );
};
