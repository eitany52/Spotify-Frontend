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

  useEffect(() => {
    loadStation(id);
  }, [id, location]);

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
          {station.songs && <img src={station.songs[0].imgUrl} />}

          <section className="svg-big bigger">
            <SvgIcon iconName="play" style="dark" />
          </section>

          {
            <ul>
              <li
                style={{
                  display: "grid",
                  gridTemplateColumns: "0.5fr 1fr 2fr 1fr",
                  alignItems: "start",
                }}
              >
                <label>#</label>
                <label>img</label>
                <label>name</label>
                <label>Date added</label>
              </li>
            </ul>
          }

          <ul>
            {station.songs &&
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
