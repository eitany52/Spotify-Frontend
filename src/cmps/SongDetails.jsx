import React, { useState } from "react";

import { utilService } from "../services/util.service.js";
import { SvgIcon } from "./SvgIcon";
import { useSelector } from "react-redux";
import { PlayBtn } from "../cmps/PlayBtn";

export function SongDetails({ song, index }) {
  const currentSong = useSelector(
    (storeState) => storeState.stationModule.currentSong
  );

  //console.log("currentSong:", currentSong);

  return (
    <div
      className="song-details"
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
      <SvgIcon iconName="plus" />
      <section>{<PlayBtn songId={song.id} />}</section>
    </div>
  );
}
