import { StationPreview } from "./StationPreview";
import { getLoggedOnUser } from "../store/actions/user.actions";

// Checked - All looks good.

export const StationList = ({
  stations,
  location,
  onAddSongToStation,
  songToAdd = {},
  setStationFromSearch = {},
}) => {
  return (
    <>
      {/* {location === "main" && <h3>Made for {getLoggedOnUser().name}</h3>} */}
      <ul className={`station-list ${location}`}>
        {stations.map((station) => (
          <StationPreview
            key={station._id}
            station={station}
            location={location}
            setStationFromSearch={setStationFromSearch}
            onAddSongToStation={onAddSongToStation}
            songToAdd={songToAdd}
          />
        ))}
      </ul>
    </>
  );
};
