import React, { useState } from "react";

import { updateStationDetails } from "../store/actions/station.actions.js";
import { onToggleModal } from "../store/actions/app.actions.js";

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
        break;
    }

    stationToSave = { ...stationToSave, [field]: value };
    //console.log("stationToSave:", stationToSave);
  }

  return (
    <div>
      EditStationDetails
      <form onSubmit={onSubmitDetails}>
        <input
          name="name"
          type="text"
          placeholder="name"
          defaultValue={stationToEdit.name}
          onChange={handleChange}
        ></input>
        <input
          name="description"
          type="text"
          placeholder="Description"
          defaultValue={stationToEdit.description}
          onChange={handleChange}
        ></input>
        {/* <input name="thumbnail" type="file" onChange={handleChange}></input> */}

        <button className="send">save</button>
      </form>
    </div>
  );
};
