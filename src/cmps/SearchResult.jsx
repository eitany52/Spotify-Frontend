import { useState } from "react";
import { useOutletContext, useParams } from "react-router";
import { getSongsFromYoutube } from "../store/actions/station.actions";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { SongList } from "./SongList";
import { StationList } from "./StationList";
// import demoStations from "../../data/demo-stations.json";
import { stationService } from "../services/station";
import { showErrorMsg } from "../services/event-bus.service";
import { useScreenCategory } from "../customHooks/useBreakpoint";

export const SearchResult = () => {
  const params = useParams();
  const [songs, setSongs] = useState(null);
  const [stationsByUserInput, setStationsByUserInput] = useState([]);
  const { onAddToLikedSongs, isSongSavedAtSomeUserStation } =
    useOutletContext();

  const screenCategory = useScreenCategory();

  useEffectUpdate(() => {
    loadSongs();
    loadStationsByUserInput();
  }, [params]);

  async function loadSongs() {
    try {
      const songs = await getSongsFromYoutube(params.userInput);
      setSongs(songs);
    } catch (error) {
      console.log("Cannot load songs", error);
      showErrorMsg("Failed to find songs");
    }
  }

  async function loadStationsByUserInput() {
    try {
      const stationsByUserInput = await stationService.query({
        location: "search",
        userInput: params.userInput,
      });

      setStationsByUserInput(stationsByUserInput);
    } catch (error) {
      console.log("Cannot load stations by user input", error);
    }
  }

  // function setStationFromSearch(station) {
  //   setStationFromDemo(station)
  // }

  const firstSongImg = songs ? songs[0].imgUrl : null;
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
            {screenCategory !== "mobile" && (
              <section className="inner-grid">
                <h2 className="top-res">Top result</h2>
                <div className="top-result-container">
                  <img src={firstSongImg} />
                  {/* <h3>Hip-Hop</h3> */}
                  {/* <span>Genre</span> */}
                </div>
              </section>
            )}

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
            {!!stationsByUserInput.length && (
              <StationList stations={stationsByUserInput} location="search" />
            )}
            {/* setStationFromSearch={setStationFromSearch} />} */}
            {!stationsByUserInput.length && (
              <span className="span-no-results">No results</span>
            )}
          </section>
        </>
      )}
      {/* {!params.userInput && <h1>Suggestions</h1>} */}
    </div>
  );
};
