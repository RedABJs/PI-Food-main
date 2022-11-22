import React, { useState } from "react";
import "./UptdInfo.css";

import * as actions from "../../../redux/actions/actions";
import { useDispatch } from "react-redux";

const UptdInfo = ({ recName, summary, health_score, edit, id }) => {
  const dispatch = useDispatch();

  const [info, setInfo] = useState({
    recName: recName,
    summary: summary,
    health_score: health_score,
  });

  const [validated, setValidated] = useState({
    recName: { valid: true, reason: "Validated ✅" },
    summary: { valid: true, reason: "Validated ✅" },
    health_score: { valid: true, reason: "Validated ✅" },
  });

  const validateFunction = (prop, value) => {
    if (prop === "recName") {
      // NAME VALIDATIONS
      if (value === "") {
        setValidated({
          ...validated,
          recName: { valid: false, reason: "Name can't be empty ❌" },
        });
      } else if (/(^\s)|(\s$)/.test(value)) {
        setValidated({
          ...validated,
          recName: {
            valid: false,
            reason: "Empty space at the beggining or at the end ❌",
          },
        });
      } else if (/\W/.test(value.split(" ").join(""))) {
        setValidated({
          ...validated,
          recName: { valid: false, reason: "Name can't have any symbols ❌" },
        });
      } else {
        setValidated({
          ...validated,
          recName: { valid: true, reason: "Validated ✅" },
        });
      }
    } else if (prop === "summary") {
      // SUMMARY VALIDATIONS
      if (value === "") {
        setValidated({
          ...validated,
          summary: { valid: false, reason: "Summary can't be empty ❌" },
        });
      } else if (/(^\s)|(\s$)/.test(value)) {
        setValidated({
          ...validated,
          summary: {
            valid: false,
            reason: "Empty space at the beggining or at the end ❌",
          },
        });
      } else {
        setValidated({
          ...validated,
          summary: { valid: true, reason: "Validated ✅" },
        });
      }
    } else if (prop === "health_score") {
      // HEALTH SCORE VALIDATIONS
      if (value === "") {
        setValidated({
          ...validated,
          health_score: {
            valid: false,
            reason: "Health Score can't be empty ❌",
          },
        });
      } else if (!/^[0-9][0-9]?$|^100$/.test(value)) {
        setValidated({
          ...validated,
          health_score: {
            valid: false,
            reason: "Health Score must be an integer between 0-100 ❌",
          },
        });
      } else {
        setValidated({
          ...validated,
          health_score: { valid: true, reason: "Validated ✅" },
        });
      }
    }
  };

  const handleInfoChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
    validateFunction(e.target.name, e.target.value);
  };

  const updateInfo = (e) => {
    let infoUpdate = {
      ...info,
      name: info.recName,
      health_score: Number(info.health_score),
    };
    dispatch(actions.updateRecipe(id, infoUpdate));
    edit(e);
  };

  return (
    <div className="info-edit-editable">
      <label>Name: </label>
      <input onChange={handleInfoChange} name="recName" value={info.recName} />
      <i>* {validated.recName.reason}</i>

      <label>Summary: </label>
      <textarea
        onChange={handleInfoChange}
        name="summary"
        value={info.summary}
      />
      <i>* {validated.summary.reason}</i>

      <label>Health Score: </label>
      <input
        type="number"
        onChange={handleInfoChange}
        name="health_score"
        value={info.health_score}
      />
      <i>* {validated.health_score.reason}</i>

      <div className="edit-button">
        <button
          name="info"
          onClick={updateInfo}
          disabled={
            !(
              validated.recName.valid &&
              validated.summary.valid &&
              validated.health_score.valid
            )
          }
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UptdInfo;
