import { useSelector } from "react-redux";
import { StationPreview } from "./StationPreview";
import { useEffect } from "react";
import { loadStations } from "../store/actions/station.actions";
import { getLoggedOnUser } from "../store/actions/user.actions";

// Checked - All looks good.

export const StationList = ({ location, songToAdd = {} }) => {
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  );

  useEffect(() => {
    loadStations();
  }, []);

  if (!stations) return;
  return (
    <>
      {/* {location === "main" && <h3>Made for {getLoggedOnUser().name}</h3>} */}
      <ul className={`station-list ${location}`}>
        {stations.map((station) => (
          <StationPreview
            key={station._id}
            station={station}
            location={location}
            songToAdd={songToAdd}
          />
        ))}
      </ul>
    </>
  );
};
