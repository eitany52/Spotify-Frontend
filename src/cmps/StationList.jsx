import { useSelector } from "react-redux"
import { StationPreview } from "./StationPreview"
import { useEffect } from "react"
import { loadStations } from "../store/actions/station.actions"
import { getLoggedOnUser } from "../store/actions/user.actions"

export const StationList = ({ location }) => {
    const stations = useSelector(storeState => storeState.stationModule.stations)

    useEffect(() => {
        loadStations()
    }, [])

    if (!stations) return
    return (
        <>
            {location === "main" && <h3>Made for {getLoggedOnUser().name}</h3>}
            <ul className="station-list">
                {stations.map(station =>
                    <StationPreview key={station._id} station={station} location={location} />
                )}
            </ul>
        </>
    )
}
