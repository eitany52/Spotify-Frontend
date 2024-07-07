import { useNavigate } from "react-router";
import { getLoggedOnUser } from "../store/actions/user.actions";
import { onToggleModal } from "../store/actions/app.actions.js";
import { FloatingMenuStation } from "../cmps/FloatingMenuStation";
import { EditStationDetails } from "../cmps/EditStationDetails";

// Checked - All looks good.

export const StationPreview = ({ station, location }) => {
  const navigate = useNavigate();

  function onGoToStationDetails() {
    navigate(`/station/${station._id}`);
  }

  function handleRightClick(event) {
    event.preventDefault();
    onToggleModal({
      cmp: FloatingMenuStation,
      props: {
        stationId: station._id,
        onDone() {
          onToggleModal(null);
        },
        onOpenStationDetails() {
          onToggleModal(null);
          onToggleModal({
            cmp: EditStationDetails,
            props: { stationToEdit: station },
            style: {
              border: "2px solid red",
              margin: "auto",
              width: "25vw",
            },
          });
        },
      },
      style: {
        border: "2px solid green",
        width: "25vw",
        left: `${event.clientX}px`,
        top: `${event.clientY}px`,
      },
    });
  }

  const numOfSongs = station.songs.length;
  const profileName = station.createdBy.fullname;
  const isUserStation = getLoggedOnUser()._id === station.createdBy.id;
  const isSavedStation = station.savedBy.some(
    (user) => user.id === getLoggedOnUser()._id
  );
  return (
    <li
      onClick={onGoToStationDetails}
      onContextMenu={handleRightClick}
      className="station-preview"
    >
      {location === "library" && (isUserStation || isSavedStation) && (
        <section>
          {/* <img src={station.img}/> */}
          <h5>{station.name}</h5>
          <span>
            Playlist ·{" "}
            {station.type === "liked" ? `${numOfSongs} songs` : profileName}
          </span>
        </section>
      )}
      {/* {location === "main" && ( */}
      <section>
        <img src={station.imgUrl} />
        <h5>{station.name}</h5>
        {location === "main" && <span>{station.description}</span>}
      </section>
      {/* )} */}
    </li>
  );
};
