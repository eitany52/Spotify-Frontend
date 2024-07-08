import { SongPreview } from './SongPreview.jsx'
import { formatSong } from '../store/actions/station.actions.js'

export const SongList = ({ songs, onAddToStation, onMoreOptions, isSongSavedAtStation, type }) => {

    return (
        <ul className="song-list">
            {type === 'station' &&
                <li className="song-preview-grid">
                    <label>#</label>
                    <label>img</label>
                    <label>name</label>
                    <label>add</label>
                    <label>Date added</label>
                </li>}
            {type === 'search' && <h2>Songs</h2>}
            {songs.map((_song, index) => {
                const song = type === 'station' ? _song : formatSong(_song)
                return (
                    <SongPreview
                        key={song.id}
                        song={song}
                        onAddToStation={onAddToStation}
                        onMoreOptions={onMoreOptions}
                        isSongSavedAtStation={isSongSavedAtStation}
                        type={type}
                        index={index} />
                )
            })}
        </ul>
    )
}
