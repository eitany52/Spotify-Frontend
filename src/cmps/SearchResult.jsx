import { useEffect, useState } from "react"
import { useParams } from "react-router"
import searchRes from "../../data/search.json"
import { addSongToStation, formatSong, loadLikedSongsStation, loadStation } from "../store/actions/station.actions"
import { useSelector } from "react-redux"
import { useEffectUpdate } from "../customHooks/useEffectUpdate"
// import { getLoggedOnUser } from "../store/actions/user.actions"
// import { addSongToStation } from "../store/actions/station.actions"

export const SearchResult = () => {
    const params = useParams()
    const [songs, setSongs] = useState(null)
    const likedSongsStation = useSelector(storeState =>
        storeState.stationModule.station)


    useEffect(() => {
        loadLikedSongsStation()
    }, [])

    // useEffect(() => {
    //     setIsSongAdded(false)
    // }, [isSongAdded])


    useEffectUpdate(() => {
        loadSongsFromYoutube()
    }, [params])

    function loadSongsFromYoutube() {
        setSongs(searchRes[0].items)
        // const searchTerm = 'rap-song'
        // const res = await fetch(`https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&part=snippet&key=AIzaSyCUE7BdmEO9uF_gWcV5yY5O3eqyINxdavo`)
        // const data = await res.json()
    }

    function isSongSavedInStation(song) {
        return likedSongsStation.songs.some(_song => _song.id === song.id)
    }

    async function onAddToLikedSongs(songToAdd) {
        try {
            await addSongToStation(likedSongsStation._id, songToAdd)
            loadLikedSongsStation()
        } catch (error) {
            console.log("Having issues with saving this song")
        }
    }

    return (
        <div>
            {console.log("SearchResult rendered")}
            {/* <RecentSearches/> */}
            {params.name &&
                <section>
                    <div>
                        <button>All</button>
                        <button>Playlists</button>
                        <button>Songs</button>
                        <button>Artists</button>
                        <button>Genres</button>
                    </div>
                    <div>
                        <h2>Top result</h2>
                        <img src="" />
                        <h1>Hip-Hop</h1>
                        <span>Genre</span>
                    </div>
                    <div>
                        <h2>Songs</h2>
                        <ul>
                            {songs.map(_song => {
                                const song = formatSong(_song)
                                const songImg = song.imgUrl
                                const songName = song.title
                                const artistName = song.channelTitle
                                return (
                                    <li key={song.id}>
                                        <img
                                            style={{ width: "40px", height: "40px" }}
                                            src={songImg} />
                                        <span>{songName}</span>
                                        <span>{artistName}</span>
                                        <button
                                            title="Add to Liked Songs"
                                            onClick={() => onAddToLikedSongs(song)}>
                                            {isSongSavedInStation(song) ? "Added" : "Add"}
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </section>}
            <h1>Suggestions</h1>
        </div>
    )
}
