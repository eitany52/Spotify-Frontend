import { useNavigate } from "react-router"

export const StationPreview = ({ station }) => {
    const navigate = useNavigate()


    function onGoToDetails() {
        navigate(`/station/${station._id}`)
    }

    const numOfSongs = station.songs.length
    const profileName = station.createdBy.fullname

    return (
        <li onClick={onGoToDetails} className="station-preview">
            {/* <img src={station.img}/> */}
            <h5>{station.name}</h5>
            <span>
                Playlist · {station.name === "Liked Songs" ? `${numOfSongs} songs` : profileName}
            </span>
        </li>
    )
}
