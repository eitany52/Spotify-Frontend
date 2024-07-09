import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  addSongToStation,
  getSongsFromYoutube,
  loadLikedSongsStation,
} from "../store/actions/station.actions";
import { useSelector } from "react-redux";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { SongList } from "./SongList";

//Checked - All looks good.

export const SearchResult = () => {
  const params = useParams();
  const [songs, setSongs] = useState(null);
  const likedSongsStation = useSelector(
    (storeState) => storeState.stationModule.station
  );

  useEffect(() => {
    loadLikedSongsStation();
  }, []);

  useEffectUpdate(() => {
    loadSongs();
  }, [params]);

  function loadSongs() {
    setSongs(getSongsFromYoutube());
  }

  function isSongSavedAtLikedSongs(song) {
    return likedSongsStation.songs.some((_song) => _song.id === song.id);
  }

  async function onAddToLikedSongs(songToAdd) {
    try {
      await addSongToStation(likedSongsStation._id, songToAdd);
      loadLikedSongsStation();
    } catch (error) {
      console.log("Having issues with saving this song");
    }
  }

  function onMoreOptions() {}

    console.log("SearchResult rendered");
    return (
        <div className="search-result">
            {/* <RecentSearches/> */}
            {params.userInput && songs && (
                <section className="search-result-container">
                    <div className="btns-container">
                        <button>All</button>
                        <button>Playlists</button>
                        <button>Songs</button>
                        <button>Artists</button>
                        <button>Genres</button>
                    </div>
                    <div className="top-result-container">
                        <h2>Top result</h2>
                        <img style={{width: '80px', height: '80px'}} src="../../public/img/Rap.PNG" />
                        <h1>Hip-Hop</h1>
                        <span>Genre</span>
                    </div>
                    <SongList
                        songs={songs}
                        onAddToStation={onAddToLikedSongs}
                        onMoreOptions={onMoreOptions}
                        isSongSavedAtStation={isSongSavedAtLikedSongs}
                        type="search" />
                </section>
            )}
            <h1>Suggestions</h1>
        </div>
    );
};
