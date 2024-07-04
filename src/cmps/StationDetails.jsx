import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import { loadStation } from "../store/actions/station.actions.js";
import { utilService } from "../services/util.service.js";
import { SongDetails } from "./SongDetails.jsx";

import { SvgIcon, AllIcons } from "./SvgIcon.jsx";

export function StationDetails() {
  const { id } = useParams();
  const station = useSelector((storeState) => storeState.stationModule.station);
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  );

  useEffect(() => {
    loadStation(id);
  }, [id, location, stations]);

  if (!station) return <div>Loading...</div>;
  return (
    <section className="station-details">
      <Link to="/" className="btn">
        Back Home
      </Link>

      {/* <AllIcons /> */}
      {station && (
        <div>
          <span>playlist</span>
          <h3>{station.name}</h3>
          <h4>
            {station.createdBy.fullname} |{" "}
            {station.songs && station.songs.length} songs{" "}
          </h4>
          {station.songs && station.songs.length && (
            <img src={station.songs[0].imgUrl} />
          )}

          <section className="svg-big bigger">
            <SvgIcon iconName="play" style="dark" />
          </section>

          {
            <ul>
              <li className="song-details-grid">
                <label>#</label>
                <label>img</label>
                <label>name</label>
                <label>add</label>
                <label>Date added</label>
                <label></label>
              </li>
            </ul>
          }

          <ul>
            {station.songs &&
              station.songs.length &&
              station.songs.map((song, index) => (
                <li key={song.id}>
                  <SongDetails song={song} index={index} />
                </li>
              ))}
          </ul>

          {/* <pre> {JSON.stringify(car, null, 2)} </pre> */}
        </div>
      )}
      {/* <button onClick={() => { onAddCarMsg(car._id) }}>Add car msg</button> */}
    </section>
  );
}
