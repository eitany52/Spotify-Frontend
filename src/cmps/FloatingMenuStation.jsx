import React, { useEffect, useState } from "react";

import { stationService } from "../services/station.service.local";

import {
  removeStation,
  saveStationByUser,
  removeStationByUser,
} from "../store/actions/station.actions.js";
import { getLoggedOnUser } from "../store/actions/user.actions.js";

export const FloatingMenuStation = ({
  station,
  location,
  onDone,
  onOpenStationDetails,
}) => {
  const isLikedSongStation = station.type === "liked" ? true : false;
  const isUserStation = getLoggedOnUser()._id === station?.createdBy.id;

  function onDeleteStation() {
    removeStation(station._id);
    onDone();
  }

  function onEditStationDetails() {
    onOpenStationDetails(station._id);
  }

  function onSaveStation() {
    saveStationByUser(station);
  }

  function onRemoveStation() {
    removeStationByUser(station._id);
  }

  return (
    <div>
      {!isLikedSongStation ? (
        <ul>
          {location === "library" && isUserStation && (
            <li onClick={onDeleteStation}> Delete Station</li>
          )}
          {location === "library" && isUserStation && (
            <li onClick={onEditStationDetails}> Edit Details </li>
          )}
          {location === "main" && (
            <li onClick={onSaveStation}> Save Station </li>
          )}
          {location === "library" && !isUserStation && (
            <li onClick={onRemoveStation}> Remove From Saved Stations </li>
          )}
        </ul>
      ) : (
        <ul>
          <li> you can't delete LikedSong station </li>
        </ul>
      )}
    </div>
  );
};
