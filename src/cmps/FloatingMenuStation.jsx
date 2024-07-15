import React, { useEffect, useState } from "react";
import { stationService } from "../services/station.service.local";

import { removeStation } from "../store/actions/station.actions.js";

export const FloatingMenuStation = ({
  station,
  onDone,
  onOpenStationDetails,
}) => {
  const isLikedSongStation = station.type === "liked" ? true : false;

  function onRemoveStation() {
    removeStation(station._id);
    onDone();
  }

  function onEditStationDetails() {
    onOpenStationDetails(station._id);
  }

  return (
    <div>
      {!isLikedSongStation ? (
        <ul>
          <li onClick={onRemoveStation}> Delete Station</li>
          <li onClick={onEditStationDetails}> Edit Details </li>
        </ul>
      ) : (
        <ul>
          <li> you can't delete LikedSong station </li>
        </ul>
      )}
    </div>
  );
};
