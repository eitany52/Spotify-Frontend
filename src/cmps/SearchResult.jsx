import { useEffect, useState } from "react"
import { useParams } from "react-router"
import searchRes from "../../data/search.json"
import { getLoggedOnUser } from "../store/actions/user.actions"
import { addSongToStation } from "../store/actions/station.actions"
import { useSelector } from "react-redux"

export const SearchResult = () => {
    const params = useParams()
    const [songs, setSongs] = useState(null)
    // const likedSongsStationId = useSelector(storeState =>
    //     storeState.stationModule.likedSongsStation._id)

    useEffect(() => {
        loadSongsFromYoutube()
    }, [params])

    function loadSongsFromYoutube() {
        setSongs(searchRes[0].items)
        // const searchTerm = 'rap-song'
        // const res = await fetch(`https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&part=snippet&key=AIzaSyCUE7BdmEO9uF_gWcV5yY5O3eqyINxdavo`)
        // const data = await res.json()
    }

    // function onAddToLikedSongs(song) {
    //     // "id": "j4jtIDaeaWI",
    //     // "title": "The Meters - Cissy Strut",
    //     // "url": "youtube/song.mp4",
    //     // "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
    //     // "addedBy": {},
    //     // "addedAt": 1719168000000
    //     const songToAdd = {
    //         id: song.video.id,
    //         title: song.snippet.title,
    //         url: `https://youtube.com/watch?v=${song.id.videoId}`,
    //         imgUrl: song.snippet.thumbnails.default.url,
    //         addedBy: getLoggedOnUser(),
    //         addedAt: Date.now()
    //     }
    //     addSongToStation(likedSongsStationId, songToAdd)
    // }


    return (
        <div>
            {/* <RecentSearches/> */}
            {params.userInput && songs &&
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
                            {songs.map(song => {
                                const songImg = song.snippet.thumbnails.default.url
                                const songName = song.snippet.title
                                const artistName = song.snippet.channelTitle
                                return (
                                    <li key={song.id.videoId}>
                                        <img
                                            style={{ width: "40px", height: "40px" }}
                                            src={songImg} />
                                        <span>{songName}</span>
                                        <span>{artistName}</span>
                                        <button
                                            title="Add to Liked Songs"
                                            onClick={() => onAddToLikedSongs(song)}>
                                            Add
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
