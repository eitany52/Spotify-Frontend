import React from "react";
import { removeStation } from "../store/actions/station.actions.js";

export const FloatingMenuStation = ({ stationId, onDone }) => {
  function onRemoveStation() {
    removeStation(stationId);
    onDone();
  }

  return (
    <div>
      <ul>
        <li onClick={onRemoveStation}> Delete Station</li>
      </ul>
    </div>
  );
};
