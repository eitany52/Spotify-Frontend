import { useState } from "react";
import { useOutletContext, useParams } from "react-router";
import { getSongsFromYoutube, setStationFromDemo } from "../store/actions/station.actions";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { SongList } from "./SongList";
import { StationList } from "./StationList";
import demoStations from "../../data/demo-stations.json";

export const SearchResult = () => {
  const params = useParams();
  const [songs, setSongs] = useState(null);
  const { onAddToLikedSongs, isSongSavedAtSomeUserStation } =
    useOutletContext();

  useEffectUpdate(() => {
    loadSongs();
  }, [params]);

  async function loadSongs() {
    const songs = await getSongsFromYoutube(params.userInput)
    setSongs(songs);
  }

  function setStationFromSearch(station) {
    setStationFromDemo(station)
  }

  function filterStationsByUserInput() {
    let stations = structuredClone(demoStations)

    stations = stations.filter(station => station.tags.some(tag => {
      const regExp = new RegExp(tag, 'i')
      return regExp.test(params.userInput)
    }))

    return stations
  }

  const stations = filterStationsByUserInput()
  const firstSongImg = songs ? songs[0].imgUrl : null
  return (
    <div className="search-result">
      {/* <RecentSearches/> */}
      {params.userInput && songs && (
        <>
          <div className="btns-container">
            <button className="btn-type-1">All</button>
            <button className="btn-type-1">Playlists</button>
            <button className="btn-type-1">Songs</button>
            <button className="btn-type-1">Artists</button>
            <button className="btn-type-1">Genres</button>
          </div>
          <section className="search-result-container">
            <section className="inner-grid">
              <h2 className="top-res">Top result</h2>
              <div className="top-result-container">
                <img src={firstSongImg} />
                {/* <h3>Hip-Hop</h3> */}
                {/* <span>Genre</span> */}
              </div>
            </section>
            <section className="inner-grid">
              <h2 className="songs">Songs</h2>
              <SongList
                songs={songs}
                onAddToStation={onAddToLikedSongs}
                isSongSavedAtStation={isSongSavedAtSomeUserStation}
                isUserStation={false}
                type="search"
              />
            </section>
            <h2>Playlists result</h2>
            {!!stations.length &&
              <StationList
                stations={stations}
                location="search"
                setStationFromSearch={setStationFromSearch} />}
            {!stations.length &&
              <span className="span-no-results">No results</span>}
          </section>
        </>
      )}
      {/* {!params.userInput && <h1>Suggestions</h1>} */}
    </div>
  );
};
