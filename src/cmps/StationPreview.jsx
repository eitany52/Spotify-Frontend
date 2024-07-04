import { useNavigate } from "react-router"
import { getLoggedOnUser } from "../store/actions/user.actions"


// Checked - All looks good.

export const StationPreview = ({ station, location }) => {
    const navigate = useNavigate()


    function onGoToStationDetails() {
        navigate(`/station/${station._id}`)
    }
    const numOfSongs = station.songs.length
    const profileName = station.createdBy.fullname
    const isUserStation = getLoggedOnUser()._id === station.createdBy.id
    const isSavedStation = station.savedBy.some(user => user.id === getLoggedOnUser()._id)
    return (
        <li onClick={onGoToStationDetails} className="station-preview">
            {location === "library" && (isUserStation || isSavedStation) &&
                <section>
                    {/* <img src={station.img}/> */}
                    <h5>{station.name}</h5>
                    <span>
                        Playlist · {station.type === "liked" ? `${numOfSongs} songs` : profileName}
                    </span>
                </section>}
            {location === "main" &&
                <section>
                    {/* <img src={station.img}/> */}
                    <h5>{station.name}</h5>
                    <span>{station.description}</span>
                </section>}
        </li>
    )
}