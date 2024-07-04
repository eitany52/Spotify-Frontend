import React, { useState } from "react";

import { utilService } from "../services/util.service.js";
import { SvgIcon } from "./SvgIcon";
import { useSelector } from "react-redux";
import { PlayBtn } from "../cmps/PlayBtn";

export function SongDetails({ song, index }) {
  const currentSong = useSelector(
    (storeState) => storeState.stationModule.currentSong
  );

  return (
    <div className="song-details song-details-grid">
      <section>
        <span>{index + 1}</span> {<PlayBtn song={song} />}
      </section>
      <img src={song.imgUrl} />
      <span>{song.title}</span>
      <SvgIcon iconName="plus" />
      <span>{utilService.formatDate(song.addedAt)}</span>
    </div>
  );
}
