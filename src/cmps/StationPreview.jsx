import { useNavigate, useParams } from "react-router";
import { getLoggedOnUser } from "../store/actions/user.actions";
import { onToggleModal } from "../store/actions/app.actions.js";
import { FloatingMenuStation } from "../cmps/FloatingMenuStation";
import { EditStationDetails } from "../cmps/EditStationDetails";
import { SvgIcon } from "./SvgIcon.jsx";

// Checked - All looks good.

export const StationPreview = ({
  station,
  location,
  onAddSongToStation,
  setStationFromSearch,
  onCreateEmptyStation,
  onToggleMarkStation,
  isStationToMark
}) => {
  const navigate = useNavigate();
  const { stationId } = useParams();

  async function onClickStation() {
    if (location === "modal-more") {
      onAddSongToStation(station);
    }
    else if (location === "main") {
      setStationFromSearch(station);
      onGoToStationDetails()
    }
    else if (location === "modal-add") {
      onToggleMarkStation(station)
    }
    else {
      onGoToStationDetails();
    }
  }

  function onGoToStationDetails() {
    navigate(`/station/${station._id}`);
  }

  function handleRightClick(event) {
    if (location === "modal-add" || location === "modal-more") return;
    event.preventDefault();
    onToggleModal({
      cmp: FloatingMenuStation,
      props: {
        station: station,
        location: location,
        onDone() {
          if (station._id === stationId) navigate(`/`);
          onToggleModal(null);
        },
        class: "floating-menu-station",
        onCreateEmptyStation: onCreateEmptyStation,
        onOpenStationDetails() {
          onToggleModal(null);
          onToggleModal({
            cmp: EditStationDetails,
            props: {
              stationToEdit: station,
              class: "floating-edit-station-details",
            },
          });
        },
      },
      style: {
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
      onClick={onClickStation}
      onContextMenu={handleRightClick}
      className={`station-preview ${location}`}
    >
      <section
        className={`station-container ${
          location === "library" || location === "modal-add"
            ? "intro-outer"
            : ""
        }`}
      >
        <img src={station.imgUrl} />
        <section
          className={`${
            location === "library" || location === "modal-add"
              ? "intro-inner"
              : ""
          }`}
        >
          <h5>{station.name}</h5>
          {location === "library" && station.type === "liked" && (
            <span> {numOfSongs} songs </span>
          )}
          {location === "library" && station.type === "normal" && (
            <span> {profileName} </span>
          )}
          {location === "main" && <span>{station.description}</span>}
          {location === "modal-add" && 
            <span className="empty-circle">
              {isStationToMark(station._id) && <SvgIcon iconName="tick" style="active" />}
            </span>}
        </section>
      </section>
    </li>
  );
};

{
  /* <li
onClick={onClickStation}
onContextMenu={handleRightClick}
className={`station-preview ${location}`}
>
{station.type === "liked" ? (
  <section className={` ${location === "library" ? "intro-outer" : ""} `}>
    <img src={station.imgUrl} />
    <section
      className={`${location === "library" ? "intro-inner" : ""} `}
    >
      <h5>{station.name}</h5>
      {location === "library" && <span> {numOfSongs} songs </span>}
      {location === "modal-add" && <span className="empty-circle"></span>}
    </section>
  </section>
) : (
  <section className={` ${location === "library" ? "intro-outer" : ""} `}>
    <img src={station.imgUrl} />
    <section
      className={` ${location === "library" ? "intro-inner" : ""} `}
    >
      <h5>{station.name}</h5>
      {location === "library" && <span> {profileName} </span>}
      {location === "main" && <span>{station.description}</span>}
      {location === "modal-add" && <span className="empty-circle"></span>}
    </section>
  </section>
)}
</li> */
}

// <li
//   onClick={onClickStation}
//   onContextMenu={handleRightClick}
//   className="station-preview"
// >
//   {location === "library" && (isUserStation || isSavedStation) && (
//     <section>
//       <img src={station.img} />
//       <h5>{station.name}</h5>
//       <span>
//         {/* Playlist ·{" "} */}
//         {station.type === "liked" ? `${numOfSongs} songs` : profileName}
//       </span>
//     </section>
//   )}
//   {/* {location !== "main" && ( */}
//   <section>
//     <img src={station.imgUrl} />
//     <h5>{station.name}</h5>
//     {location === "main" && <span>{station.description}</span>}
//   </section>
//   {/* )} */}
// </li>
