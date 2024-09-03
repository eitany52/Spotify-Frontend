import { SongPreview } from "./SongPreview.jsx";
import { formatSong } from "../store/actions/station.actions.js";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export const SongList = ({
  songs,
  onAddToStation,
  isSongSavedAtStation,
  isUserStation,
  type,
  onDragEnd,
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="songs-list">
        {(provided) => (
          <ul
            className="song-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {type === "station" && songs.length ? (
              <li className="song-preview-station-grid">
                <label>#</label>
                <label>Title</label>
                <label>Date added</label>
                <label></label>
              </li>
            ) : null}

            {songs.map((song, index) => (
              <Draggable key={song.id} draggableId={song.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <SongPreview
                      song={song}
                      onAddToStation={onAddToStation}
                      isSongSavedAtStation={isSongSavedAtStation}
                      isUserStation={isUserStation}
                      type={type}
                      index={index}
                    />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};
