import React, { useEffect, useState } from "react";

//import { stationService } from "../services/station.service.local";
import { stationService } from "../services/station";

import {
  removeStation,
  saveStationByUser,
  removeStationByUser,
} from "../store/actions/station.actions.js";
import { getLoggedInUser } from "../store/actions/user.actions.js";

import { SvgIcon } from "./SvgIcon.jsx";

export const FloatingMenuStation = ({
  station,
  location,
  onDone,
  onOpenStationDetails,
  onCreateEmptyStation,
}) => {
  const isLikedSongStation = station.type === "liked" ? true : false;
  const isUserStation = getLoggedInUser()._id === station?.createdBy.id;

  function onDeleteStation() {
    removeStation(station._id);
    onDone();
  }

  function onEditStationDetails() {
    onOpenStationDetails(station._id);
  }

  async function onSaveStation() {
    console.log("FloatingMenuStation onSaveStation");
    const savedStation = await saveStationByUser(station);
    //saveStationByUser(station);
    onDone();
  }

  function onRemoveStation() {
    removeStationByUser(station._id);
    onDone();
  }

  function onCreateEmptyStation1() {
    onCreateEmptyStation();
    onDone();
  }

  return (
    <ul>
      {location === "library" && isUserStation && !isLikedSongStation && (
        <li onClick={onDeleteStation}>
          <span className="btn-type-2">
            <SvgIcon iconName="delete" /> Delete Station
          </span>
        </li>
      )}
      {location === "library" && isUserStation && !isLikedSongStation && (
        <li onClick={onEditStationDetails} className="lastInGroup">
          <span className="btn-type-2">
            <SvgIcon iconName="edit" /> Edit Details
          </span>
        </li>
      )}
      {(location === "main" || location === "station-details") && (
        <li onClick={onSaveStation} className="lastInGroup">
          <span className="btn-type-2">
            <SvgIcon iconName="add" /> Save To your library
          </span>
        </li>
      )}
      {location === "library" && !isUserStation && (
        <li onClick={onRemoveStation} className="lastInGroup">
          <span className="btn-type-2 active">
            <SvgIcon iconName="tick" /> Remove From your library
          </span>
        </li>
      )}

      {location !== "station-details" && (
        <li>
          <span className="btn-type-2" onClick={onCreateEmptyStation1}>
            <SvgIcon iconName="create" /> Create Playlist
          </span>
        </li>
      )}
    </ul>
  );
};
