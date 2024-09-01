import { StationPreview } from "./StationPreview";
import { getLoggedInUser } from "../store/actions/user.actions";

// Checked - All looks good.

export const StationList = ({
  stations,
  location,
  onAddSongToStation,
  songToAdd = {},
  setStationFromSearch = {},
  onCreateEmptyStation = {},
  onToggleMarkStation,
  isStationToMark
}) => {
  return (
    <>
      {/* {location === "main" && <h3>Made for {getLoggedInUser().name}</h3>} */}
      <ul className={`station-list ${location}`}>
        {stations.map((station) => (
          <StationPreview
            key={station._id}
            station={station}
            location={location}
            setStationFromSearch={setStationFromSearch}
            onCreateEmptyStation={onCreateEmptyStation}
            onAddSongToStation={onAddSongToStation}
            songToAdd={songToAdd}
            onToggleMarkStation={onToggleMarkStation}
            isStationToMark={isStationToMark}
          />
        ))}
      </ul>
    </>
  );
};
