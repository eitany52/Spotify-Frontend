import { utilService } from "../services/util.service.js";
import { SvgIcon } from "./SvgIcon.jsx";
import { useSelector } from "react-redux";
import { PlayBtn } from "./PlayBtn.jsx";

export function SongPreview({
  song,
  onAddToStation,
  onMoreOptions,
  isSongSavedAtStation,
  type,
  index,
}) {
  const currentSong = useSelector(
    (storeState) => storeState.stationModule.currentSong
  );

  const songImg = song.imgUrl;
  const songName = song.title;
  const artistName = song.channelTitle;

  return (
    <li className={`song-preview  ${type}`}>
      {type === "search" && (
        <section>
          <img style={{ width: "40px", height: "40px" }} src={songImg} />
          <span>{songName}</span>
          <span>{artistName}</span>
          <button
            title="Add to Liked Songs"
            onClick={() => onAddToStation(song)}
          >
            {isSongSavedAtStation(song) ? "Added" : "Add"}
          </button>
        </section>
      )}
      {type === "station" && (
        <section className="song-preview-grid">
          <div className="number">
            <span className="num">{index + 1}</span>
            <span className="play"> {<PlayBtn song={song} />}</span>
          </div>
          <section className="song-details-col1">
            <div className="square-ratio">
              {" "}
              <img src={songImg} />
            </div>

            <span className="song-details-inner">{songName}</span>
          </section>

          <span>{utilService.formatDate(song.addedAt)}</span>
          <span onClick={(ev) => onAddToStation(ev, song)} className="add">
            <SvgIcon iconName="tick" style="active" />
          </span>
          <span onClick={(ev) => onMoreOptions(ev, song)} className="more">
            <SvgIcon iconName="more" />
          </span>
        </section>
      )}
      {type === "searchAtStation" && (
        <>
          <section className="song-details-col1">
            <div className="square-ratio">
              {" "}
              <img src={songImg} />
              <span className="play"> {<PlayBtn song={song} />}</span>
            </div>
            <div className="song-details-inner">
              <span>{songName}</span>
              <span>{artistName}</span>
            </div>
          </section>
          <section>album</section>
          <button onClick={() => onAddToStation(song)}>
            {isSongSavedAtStation(song) ? "Added" : "Add"}
          </button>
        </>
      )}
    </li>
  );
}
