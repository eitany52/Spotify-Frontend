import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import { loadStation } from "../store/actions/station.actions.js";
import { utilService } from "../services/util.service.js";
import { SvgIcon } from "./SvgIcon.jsx";

export function StationDetails() {
  const { id } = useParams();
  const station = useSelector((storeState) => storeState.stationModule.station);

  useEffect(() => {
    loadStation(id);
  }, [id, location]);

  //   async function onAddCarMsg(carId) {
  //     try {
  //         await addCarMsg(carId, 'bla bla ' + parseInt(Math.random()*10))
  //         showSuccessMsg(`Car msg added`)
  //     } catch (err) {
  //         showErrorMsg('Cannot add car msg')
  //     }

  // }

  if (!station) return <div>Loading...</div>;
  return (
    <section className="station-details">
      <Link to="/">Back Home</Link>

      {station && (
        <div>
          <span>playlist</span>
          <h3>{station.name}</h3>
          <h4>
            {station.createdBy.fullname} |{" "}
            {station.songs && station.songs.length} songs{" "}
          </h4>
          {station.songs && <img src={station.songs[0].imgUrl} />}

          <section
            style={{
              maxWidth: "100px",
              maxHeight: "100px",
              display: "block",
              fill: "green",
            }}
          >
            <SvgIcon iconName="play" />
          </section>

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
              <label>dateAdded</label>
            </li>
          </ul>
          <ul>
            {station.songs &&
              station.songs.map((song, index) => (
                <li
                  key={song.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "0.5fr 1fr 2fr 1fr",
                    alignItems: "start",
                  }}
                >
                  <span>{index + 1}</span>
                  <img
                    src={song.imgUrl}
                    style={{
                      maxWidth: "100px",
                      maxHeight: "100px",
                      display: "block",
                    }}
                  />
                  <span>{song.title}</span>
                  <span>{utilService.formatDate(song.addedAt)}</span>
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
