import { useEffect, useState } from "react";
import {
  addSongToMultipleStations,
  addSongToStation,
  getUserStations,
  isSongSavedAtStation,
  removeSongFromMultipleStations,
  removeSongFromStation
} from "../store/actions/station.actions.js";
import { StationList } from "./StationList.jsx";
import { useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

export const FloatingMenuSongAdd = ({ song, onDone }) => {
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  );
  const currentStation = useSelector(storeState => storeState.stationModule.station)
  const [stationsToMark, setStationsToMark] = useState([])
  const [stationsToAddSong, setStationsToAddSong] = useState([])
  const [stationsToRemoveSong, setStationsToRemoveSong] = useState([])

  useEffect(() => {
    initializeStationsToMark()
  }, [])

  function initializeStationsToMark() {
    const userStations = getUserStations(stations)
    userStations.forEach((station) => {
      if (isSongSavedAtStation(station, song.id)) {
        addStation(setStationsToMark, station)
      }
    })
  }

  function onToggleMarkStation(station) {
    if (isStationIncluded(stationsToMark, station._id)) {
      unMarkStation(station)
    } else {
      markStation(station)
    }
    // If the user clicked the same station twice then we want to reset the change
    if (isStationIncluded(stationsToAddSong, station._id) &&
      isStationIncluded(stationsToRemoveSong, station._id)) {
      removeStation(setStationsToAddSong, station._id)
      removeStation(setStationsToRemoveSong, station._id)
    }
  }

  function isStationIncluded(stations, stationId) {
    return stations.some((station) => station._id === stationId)
  }

  function addStation(setStations, stationToAdd) {
    setStations((stations) => [...stations, stationToAdd])
  }

  function removeStation(setStations, stationId) {
    setStations((stations) =>
      stations.filter((station) => station._id !== stationId)
    );
  }

  function unMarkStation(station) {
    removeStation(setStationsToMark, station._id)
    addStation(setStationsToRemoveSong, station)
  }

  function markStation(station) {
    addStation(setStationsToMark, station)
    addStation(setStationsToAddSong, station)
  }

  async function onSaveChanges(ev) {
    ev.preventDefault()
    onDone()
    try {
      await handleStations(stationsToAddSong,
        addSongToStation,
        addSongToMultipleStations,
        song)
      await handleStations(stationsToRemoveSong,
        removeSongFromStation,
        removeSongFromMultipleStations,
        song.id,
        currentStation?._id)
      showSuccessMsg("Changes saved")
    } catch (err) {
      console.log("Having issues with adding/removing song", err)
      showErrorMsg("Failed to save changes")
    }
  }

  async function handleStations(stations,
    handleSingleStation,
    handleMultipleStations, ...args) {
    if (stations.length === 1)
      await handleSingleStation(stations[0], ...args)
    else if (stations.length > 1)
      await handleMultipleStations(stations, ...args)
  }

  function isStationToMark(stationId) {
    return isStationIncluded(stationsToMark, stationId)
  }

  const userStations = getUserStations(stations)

  return (
    <form
      onSubmit={onSaveChanges}
      className="floating-menu-song-add"
    >
      <StationList
        stations={userStations}
        location="modal-add"
        onToggleMarkStation={onToggleMarkStation}
        isStationToMark={isStationToMark}
      />
      <section className="cancel-done-btns">
        <button onClick={onDone} type="button">
          Cancel
        </button>
        {(!!stationsToAddSong.length || !!stationsToRemoveSong.length) && (
          <button type="submit" className="done">
            Done
          </button>
        )}
      </section>
    </form>
  );
};
