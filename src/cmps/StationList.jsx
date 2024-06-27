import { useSelector } from "react-redux"
import { StationPreview } from "./StationPreview"
import { useEffect } from "react"
import { loadStations } from "../store/actions/station.actions"

export const StationList = () => {
    const stations = useSelector(storeState => storeState.stations)

    useEffect(() => {
        console.log("Entered useEffect in StationList");
        loadStations()
    }, [stations])

    console.log("stations in StationList:", stations);
    if (!stations) return
    return (
        <ul className="station-list">
            {stations.map(station =>
                <StationPreview key={station._id} station={station} />
            )}
        </ul>
    )
}
