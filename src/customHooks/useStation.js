import { onToggleModal } from "../store/actions/app.actions.js";
import { FloatingMenuStation } from "../cmps/FloatingMenuStation";
import { useNavigate } from "react-router";
import { EditStationDetails } from "../cmps/EditStationDetails";




export const useStation = ({ station, stationId, location, onCreateEmptyStation }) => {
   
    const navigate = useNavigate();

    function handleRightClick(event) {
        if (location === "modal-add" || location === "modal-more") return;
        event.preventDefault();
        onToggleModal({
          cmp: FloatingMenuStation,
          props: {
            station: station,
            location: location,
            onDone() {
              if ((station._id === stationId) && (location !== 'station-details')) navigate(`/`);
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
    

      return { handleRightClick };
    
}