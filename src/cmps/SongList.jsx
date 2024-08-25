import { SongPreview } from "./SongPreview.jsx";
import { formatSong } from "../store/actions/station.actions.js";

export const SongList = ({
  songs,
  onAddToStation,
  isSongSavedAtStation,
  isUserStation,
  type,
}) => {
  return (
    <ul className="song-list">
      {type === "station" && songs.length ? (
        <li className="song-preview-station-grid">
          <label>#</label>
          <label>Title</label>
          <label>Date added</label>
          <label></label>
        </li>
      ) : null}

      {songs.map((song, index) => {
        // const song = type === "station" ? _song : formatSong(_song);
        return (
          <SongPreview
            key={song.id}
            song={song}
            onAddToStation={onAddToStation}
            isSongSavedAtStation={isSongSavedAtStation}
            isUserStation={isUserStation}
            type={type}
            index={index}
          />
        );
      })}
    </ul>
  );
};
