import { onToggleModal } from "../store/actions/app.actions.js";
import { FloatingMenuStation } from "../cmps/FloatingMenuStation";
import { useNavigate } from "react-router";
import { EditStationDetails } from "../cmps/EditStationDetails";




export const useStation = ({ station, stationId, location, onCreateEmptyStation }) => {
   
    const navigate = useNavigate();

    function handleRightClick(event) {
      const element = event.currentTarget;
      const rect = element.getBoundingClientRect();
      let style;
      console.log('location:', location)
      switch (location) {
        case "library" :
          style = { 
            left: `${rect.left + 230}px`,
           top: `${rect.top }px`
          }
        break
        case "station-details" : 
          style = {
            left: `${rect.left + 50}px`,
            top: `${rect.top + 20 }px`
          }
        break;
        case "main" :
          style = {  
            left: `${rect.left}px`,
            top: `${rect.top + 20 }px`
          }
        break;

      }
      // const style =  location === "library" ?  { 
      //   left: `${rect.left + 230}px`,
      //  top: `${rect.top }px`
      // } : { 
      //   left: `${rect.left + 50}px`,
      //  top: `${rect.top + 20 }px`
      // }

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
          style: style,
        });
      }
    

      return { handleRightClick };
    
}