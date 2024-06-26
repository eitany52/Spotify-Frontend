<<<<<<< HEAD
import searchRes from '../../data/search.json'
=======
import searchRes from "./../../data/search.json";
>>>>>>> 64ef7d877be9f6adeff41710c86a40b775ac3c2c

import { stationService } from "../services/station.service.local";
import { userService } from "../services/user.service.local";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { loadStations, addStation } from "../store/actions/station.actions";

export const AppSearch = () => {
  //   const [stations, setStations] = useState(null);

  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  );

  useEffect(() => {
    loadStations();
  }, []);

  //   async function loadStations() {
  //     try {
  //       const stations = await stationService.query();
  //       console.log("AppSearch stations:", stations);
  //       setStations(stations);
  //     } catch (error) {
  //       console.log("Having issues with loading stations:", error);
  //       showUserMsg("Problem!");
  //     }
  //   }

  console.log(searchRes);
  const currentUser = userService.getLogedonUser();

  async function onSearch(ev) {
    ev.preventDefault();
    console.log("AppSearch searchRes:", searchRes);
    // const searchTerm = 'rap-song'
    // const res = await fetch(`https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&part=snippet&key=AIzaSyCUE7BdmEO9uF_gWcV5yY5O3eqyINxdavo`)
    // const data = await res.json()
    // console.log(data);
  }

  function onAddStation() {
    addStation({
      name: "bluz",
      tags: ["bluz", "Happy"],
      createdBy: {
        _id: "u101",
        fullname: "Puki Ben Meir",
        imgUrl: "http://some-photo/",
      },
      likedByUsers: [],
      songs: [
        {
          id: "j4jtIDaeaWI",
          title: "The Meters - Cissy Strut",
          url: "youtube/song.mp4",
          imgUrl: "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
          addedBy: {},
          addedAt: 162521765262,
        },
        {
          id: "mUkfiLjooxs",
          title: "The JB's - Pass The Peas",
          url: "youtube/song.mp4",
          imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",

          addedBy: {},
        },
      ],
    });
  }

  if (!stations) return <div>Loading...</div>;
  return (
    <div>
      <header>
        {currentUser.name}
        <form className="search-form" onSubmit={onSearch}>
          <label className="icon-search"></label>
          <input type="text" placeholder="What do you want to play?" />
        </form>
        <button onClick={onAddStation}>add station</button>

<<<<<<< HEAD
    console.log(searchRes);


    async function onSearch(ev) {
        ev.preventDefault()
        console.log(searchRes);
        // const searchTerm = 'rap-song'
        // const res = await fetch(`https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&part=snippet&key=AIzaSyCUE7BdmEO9uF_gWcV5yY5O3eqyINxdavo`)
        // const data = await res.json()
        // console.log(data);
    }

    return (
        <header>
            <form className="search-form" onSubmit={onSearch}>
                <label className="icon-search"></label>
                <input
                    type="text"
                    placeholder="What do you want to play?" />
            </form>
        </header>
    )
}
=======
        <ul>
          {stations.map((station) => (
            <li key={station._id}>{station.name}</li>
          ))}
        </ul>
      </header>
      {/* <RecentSearches/> */}
      {/* Browse all */}
    </div>
  );
};
>>>>>>> 64ef7d877be9f6adeff41710c86a40b775ac3c2c
