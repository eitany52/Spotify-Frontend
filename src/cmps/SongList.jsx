import { SongPreview } from "./SongPreview.jsx";
import { formatSong } from "../store/actions/station.actions.js";

export const SongList = ({
  songs,
  onAddToStation,
  onMoreOptions,
  isSongSavedAtStation,
  type,
}) => {
  console.log(type);
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
      {type === "search" && <h2>Songs</h2>}
      {songs.map((_song, index) => {
        const song = type === "station" ? _song : formatSong(_song);
        return (
          <SongPreview
            key={song.id}
            song={song}
            onAddToStation={onAddToStation}
            onMoreOptions={onMoreOptions}
            isSongSavedAtStation={isSongSavedAtStation}
            type={type}
            index={index}
          />
        );
      })}
    </ul>
  );
};
