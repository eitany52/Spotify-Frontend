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
  const myClassName = type === "station" ? "song-preview-station-grid" : type;

  return (
    <li className={`song-preview  ${myClassName}`}>
      {/* col 1 only in station view */}
      {type === "station" && (
        <div className="number">
          <span className="num">{index + 1}</span>
          <span className="play"> {<PlayBtn song={song} />}</span>
        </div>
      )}

      {/* col 2 song image and name */}
      {(type === "search-at-station" || type === "search") && (
        <section className="intro-outer">
          <div className="square-ratio">
            {" "}
            <img src={songImg} />
            <span className="play"> {<PlayBtn song={song} />}</span>
          </div>
          <div className="intro-inner">
            <span>{songName}</span>
            <span>{artistName}</span>
          </div>
        </section>
      )}
      {type === "station" && (
        <section className="intro-outer">
          <div className="square-ratio">
            {" "}
            <img src={songImg} />
          </div>
          <div className="intro-inner">
            <span>{songName}</span>
            <span>{artistName}</span>
          </div>
        </section>
      )}

      {/* col 3 album */}
      {type === "search-at-station" && <section>album</section>}

      {/* col 4 date */}
      {type === "station" && (
        <span>{utilService.formatDate(song.addedAt)}</span>
      )}

      {/* col 5 tick */}
      {type === "station" && (
        <span onClick={(ev) => onAddToStation(ev, song)} className="add">
          <SvgIcon iconName="tick" style="active" />
        </span>
      )}

      {/* need to be fix - should be general add */}
      {type === "search" && (
        <span title="Add to Liked Songs" onClick={() => onAddToStation(song)}>
          {isSongSavedAtStation(song) ? (
            <SvgIcon iconName="tick" style="active" />
          ) : (
            <SvgIcon iconName="add" />
          )}
        </span>
      )}

      {/* col 6 more */}
      {/* need to be fix - more not working in search becuse function not exist*/}
      {(type === "station" || type === "search") && (
        <span onClick={(ev) => onMoreOptions(ev, song)} className="more">
          <SvgIcon iconName="more" />
        </span>
      )}

      {/* col 7 more */}
      {type === "search-at-station" && (
        <button onClick={() => onAddToStation(song)} className="btn">
          {isSongSavedAtStation(song) ? "Added" : "Add"}
        </button>
      )}
      {/* 
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
          <section className="intro-outer">
            <div className="square-ratio">
              {" "}
              <img src={songImg} />
            </div>
            <div className="intro-inner">
              <span>{songName}</span>
              <span>{artistName}</span>
            </div>
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
      {type === "search-at-station" && (
        <>
          <section className="intro-outer">
            <div className="square-ratio">
              {" "}
              <img src={songImg} />
              <span className="play"> {<PlayBtn song={song} />}</span>
            </div>
            <div className="intro-inner">
              <span>{songName}</span>
              <span>{artistName}</span>
            </div>
          </section>
          <section>album</section>
          <button onClick={() => onAddToStation(song)} className="btn">
            {isSongSavedAtStation(song) ? "Added" : "Add"}
          </button>
        </>
      )} */}
    </li>
  );
}
