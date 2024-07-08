import { utilService } from "../services/util.service.js";
import { SvgIcon } from "./SvgIcon.jsx";
import { useSelector } from "react-redux";
import { PlayBtn } from "./PlayBtn.jsx";


export function SongPreview({ song, onAddToStation, onMoreOptions, isSongSavedAtStation, type, index }) {
  const currentSong = useSelector(storeState =>
    storeState.stationModule.currentSong)
 

  const songImg = song.imgUrl;
  const songName = song.title;
  const artistName = song.channelTitle;

  return (
    <li className="song-preview song-preview-grid">
      {type === 'search' &&
        <section>
          <img
            style={{ width: "40px", height: "40px" }}
            src={songImg}
          />
          <span>{songName}</span>
          <span>{artistName}</span>
          <button
            title="Add to Liked Songs"
            onClick={() => onAddToStation(song)}
          >
            {isSongSavedAtStation(song) ? "Added" : "Add"}
          </button>
        </section>}
      {type === 'station' &&
        <section>
          <div>
            <span>{index + 1}</span> {<PlayBtn song={song} />}
          </div>
          <img src={songImg} />
          <span>{songName}</span>
          <span onClick={ev => onAddToStation(ev, song)}>
            <SvgIcon iconName="tick" style="active" />
          </span>
          <span>{utilService.formatDate(song.addedAt)}</span>
          <span onClick={ev => onMoreOptions(ev, song)}>
            <SvgIcon iconName="more" />
          </span>
        </section>}
      {type === 'searchAtStation' &&
        <section>
          <img
            style={{ width: "40px", height: "40px" }}
            src={songImg}
          />
          <span>{songName}</span>
          <span>{artistName}</span>
          <button
            onClick={() => onAddToStation(song)}
          >
            {isSongSavedAtStation(song) ? "Added" : "Add"}
          </button>
        </section>}
    </li>
  );
}
