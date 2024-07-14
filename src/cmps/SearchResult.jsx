import { useState } from "react";
import { useOutletContext, useParams } from "react-router";
import { getSongsFromYoutube } from "../store/actions/station.actions";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { SongList } from "./SongList";

//Checked - All looks good.

export const SearchResult = () => {
    const params = useParams();
    const [songs, setSongs] = useState(null);
    const { onAddToLikedSongs, isSongSavedAtSomeUserStation } = useOutletContext()

    useEffectUpdate(() => {
        loadSongs()
    }, [params])

    function loadSongs() {
        setSongs(getSongsFromYoutube());
    }

    return (
        <div className="search-result">
            {/* <RecentSearches/> */}
            {params.userInput && songs && (
                <>

                    {/* <section className="search-result-container">
                    <div className="btns-container">
                        <button>All</button>
                        <button>Playlists</button>
                        <button>Songs</button>
                        <button>Artists</button>
                        <button>Genres</button>
                    </div>
                    <h2 className="top-res">Top result</h2>
                    <div className="top-result-container">
                        <img style={{ width: '80px', height: '80px' }} src="../../public/img/Rap.PNG" />
                        <h1>Hip-Hop</h1>
                        <span>Genre</span>
                    </div>
                    <h2 className="songs">Songs</h2>
                    <SongList
                        songs={songs}
                        onAddToStation={onAddToLikedSongs}
                        onMoreOptions={onMoreOptions}
                        isSongSavedAtStation={isSongSavedAtLikedSongs}
                        type="search" />
                </section> */}
                    <div className="btns-container">
                        <button>All</button>
                        <button>Playlists</button>
                        <button>Songs</button>
                        <button>Artists</button>
                        <button>Genres</button>
                    </div>
                    <section className="search-result-container1">
                        <section className="top-result1 inner-grid">
                            <h2 className="top-res">Top result</h2>
                            <div className="top-result-container1">
                                <img src="../../public/img/Rap.PNG" />
                                <h3>Hip-Hop</h3>
                                <span>Genre</span>
                            </div>
                        </section>
                        <section className="songs-result1 inner-grid">
                            <h2 className="songs">Songs</h2>
                            <SongList
                                songs={songs}
                                onAddToStation={onAddToLikedSongs}
                                isSongSavedAtStation={isSongSavedAtSomeUserStation}
                                isUserStation={false}
                                type="search" />
                        </section>
                    </section>
                </>
            )}
            {!params.userInput && <h1>Suggestions</h1>}
        </div>
    );
};
