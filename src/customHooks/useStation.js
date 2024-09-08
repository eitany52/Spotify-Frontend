import { onToggleModal } from "../store/actions/app.actions.js";
import { FloatingMenuStation } from "../cmps/FloatingMenuStation";
import { useNavigate } from "react-router";
import { EditStationDetails } from "../cmps/EditStationDetails";




export const useStation = ({ station, location, onCreateEmptyStation }) => {

  // const navigate = useNavigate();

  function handleClick(ev) {
    ev.preventDefault();
    if (location === "modal-add" || location === "modal-more") return;
    onToggleModal({
      cmp: FloatingMenuStation,
      props: {
        station,
        location,
        onDone() {
          onToggleModal(null);
        },
        class: "floating-menu-station",
        onCreateEmptyStation: onCreateEmptyStation,
        onOpenStationDetails() {
          onToggleModal(null)
          onToggleModal({
            cmp: EditStationDetails,
            props: {
              stationToEdit: station,
              onDone() {
                onToggleModal(null);
              },
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

  return { handleClick };
}