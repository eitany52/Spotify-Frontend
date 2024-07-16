import React, { useEffect, useState } from "react";

import { stationService } from "../services/station.service.local";

import {
  removeStation,
  saveStationByUser,
  removeStationByUser,
} from "../store/actions/station.actions.js";
import { getLoggedOnUser } from "../store/actions/user.actions.js";

import { SvgIcon } from "./SvgIcon.jsx";

export const FloatingMenuStation = ({
  station,
  location,
  onDone,
  onOpenStationDetails,
  onCreateEmptyStation,
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

  function onCreateEmptyStation1() {
    onCreateEmptyStation();
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
      {location === "main" && (
        <li onClick={onSaveStation}>
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

      <li>
        <span className="btn-type-2" onClick={onCreateEmptyStation1}>
          <SvgIcon iconName="create" /> Create Playlist
        </span>
      </li>
    </ul>
  );
};
