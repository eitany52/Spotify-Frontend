import React, { useState } from "react";

import { utilService } from "../services/util.service.js";
import { SvgIcon } from "./SvgIcon.jsx";
import { useSelector } from "react-redux";
import { PlayBtn } from "./PlayBtn.jsx";
import { SongFloatingMenu } from "./FloatingMenuSong.jsx";
import { AddFloatingMenu } from "./FloatingMenuSongAdd.jsx";

import { onToggleModal } from "../store/actions/app.actions.js";

export function SongDetails({ song, index }) {
  const currentSong = useSelector(
    (storeState) => storeState.stationModule.currentSong
  );

  const station = useSelector((storeState) => storeState.stationModule.station);

  function onClickMore(event) {
    console.log("more.......");
    onToggleModal({
      cmp: SongFloatingMenu,
      props: {
        stationId: station._id,
        songId: song.id,
        onDone() {
          onToggleModal(null);
        },
        song: song,
      },
      style: {
        alignItems: "start",
        width: "20vw",
        left: `${event.clientX - 300}px`,
        top: `${event.clientY - 200}px`,
      },
    });
  }

  function onClickAdd() {
    console.log("Add.......");
    onToggleModal({
      cmp: AddFloatingMenu,
      props: {
        stationId: station._id,
        songId: song.id,
        onDone() {
          onToggleModal(null);
        },
      },
    });
  }

  return (
    <div className="song-details song-details-grid">
      <section>
        <span>{index + 1}</span> {<PlayBtn song={song} />}
      </section>
      <img src={song.imgUrl} />
      <span>{song.title}</span>
      <span onClick={onClickAdd}>
        <SvgIcon iconName="tick" style="active" />
      </span>

      <span>{utilService.formatDate(song.addedAt)}</span>
      <span onClick={onClickMore}>
        <SvgIcon iconName="more" />
      </span>
    </div>
  );
}
