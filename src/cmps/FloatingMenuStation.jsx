import React, { useEffect, useState } from "react";
import { stationService } from "../services/station.service.local";

import { removeStation } from "../store/actions/station.actions.js";

export const FloatingMenuStation = ({
  stationId,
  onDone,
  onOpenStationDetails,
}) => {
  const [isLikedSongStation, setIsLikedSongStation] = useState(null);

  useEffect(() => {
    checkIfLikedSong();
  }, []);

  async function checkIfLikedSong() {
    console.log("in checkIfLikedSong");
    setIsLikedSongStation(await stationService.isLikedSongStation(stationId));
  }

  //const isLikedSongStation = stationService.isLikedSongStation(stationId);

  function onRemoveStation() {
    removeStation(stationId);
    onDone();
  }

  function onEditStationDetails() {
    onOpenStationDetails(stationId);
  }

  if (isLikedSongStation == null) return <div>Loading...</div>;
  console.log("isLikedSongStation", isLikedSongStation);
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
