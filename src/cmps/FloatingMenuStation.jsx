import React from "react";
import { removeStation } from "../store/actions/station.actions.js";

export const FloatingMenuStation = ({
  stationId,
  onDone,
  onOpenStationDetails,
}) => {
  function onRemoveStation() {
    removeStation(stationId);
    onDone();
  }

  function onEditStationDetails() {
    onOpenStationDetails(stationId);
  }

  return (
    <div>
      <ul>
        <li onClick={onRemoveStation}> Delete Station</li>
        <li onClick={onEditStationDetails}> Edit Details </li>
      </ul>
    </div>
  );
};
