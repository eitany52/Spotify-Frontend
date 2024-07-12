import React, { useState } from "react";

import { updateStationDetails } from "../store/actions/station.actions.js";
import { onToggleModal } from "../store/actions/app.actions.js";
import { ImgUploader } from "./ImgUploader.jsx";

export const EditStationDetails = ({ stationToEdit }) => {
  //console.log("stationToEdit:", stationToEdit);

  let stationToSave = stationToEdit;

  function onSubmitDetails(event) {
    //console.log("stationToUpdate:-----------", stationToSave);
    event.preventDefault();
    updateStationDetails(stationToSave);
    onToggleModal(null);
  }

  function handleChange({ target }) {
    let { name: field, value, type } = target;
    switch (type) {
      case "number":
      case "range":
        value = +value;
        break;
      case "checkbox":
        value = target.checked;
      default:
        break;
    }

    stationToSave = { ...stationToSave, [field]: value };
    //console.log("stationToSave:", stationToSave);
  }

  function onUploaded(imgUrl1) {
    console.log("imgUrl:", imgUrl1);
    stationToSave = { ...stationToSave, imgUrl: imgUrl1 };
  }

  return (
    <div className="edit-station-details">
      <span>Edit Details</span>
      <form onSubmit={onSubmitDetails}>
        <input
          className="fieldName"
          name="name"
          type="text"
          placeholder="name"
          defaultValue={stationToEdit.name}
          onChange={handleChange}
        ></input>
        <input
          className="fieldDescription"
          name="description"
          type="text"
          placeholder="Description"
          defaultValue={stationToEdit.description}
          onChange={handleChange}
        ></input>
        {/* <input name="thumbnail" type="file" onChange={handleChange}></input> */}
        <span className="upload">
          {/* <img src={stationToEdit.imgUrl} /> */}
          <ImgUploader
            onUploaded={onUploaded}
            background={stationToEdit.imgUrl}
          />
        </span>

        <button className="send">save</button>
      </form>
    </div>
  );
};
