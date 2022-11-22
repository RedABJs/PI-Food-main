import React, { useState } from "react";
import { useEffect } from "react";
import "./UpdateForm.css";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/actions";

import { useParams } from "react-router-dom";

import LoadingPages from "../Loading/LoadingPages/LoadingPages";
import UptdSteps from "./UptdSteps/UptdSteps";
import UptdDiets from "./UptdDiets/UptdDiets";
import UptdInfo from "./UptdInfo/UptdInfo";

const UpdateForm = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { recipeDetails } = useSelector((state) => state);

  useEffect(() => {
    dispatch(actions.getRecipeDetails(id));
  }, [dispatch, id]);

  const [editable, setEditable] = useState({
    info: false,
    diets: false,
    steps: false,
  });

  const edit = (e) => {
    e.preventDefault();
    setEditable({
      ...editable,
      [e.target.name]: !editable[e.target.name],
    });
  };

  if (Object.keys(recipeDetails).length === 0) return <LoadingPages />;
  return (
    <div className="edit-container">
      <div className="info-edit">
        <h3>Info</h3>
        {editable.info ? (
          <UptdInfo
            recName={recipeDetails.name}
            summary={recipeDetails.summary}
            health_score={recipeDetails.health_score}
            edit={edit}
            id={id}
          />
        ) : (
          <div className="info-edit-inicial">
            <label>Name: </label>
            <input disabled={true} value={recipeDetails.name} />

            <label>Summary: </label>
            <textarea disabled={true} value={recipeDetails.summary} />

            <label>Health Score: </label>
            <input disabled={true} value={recipeDetails.health_score} />

            <div className="edit-button">
              <button name="info" onClick={edit}>
                Edit ✏️
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="diets-edit">
        <h3>Diets</h3>
        {editable.diets ? (
          <UptdDiets id={id} initialDiets={recipeDetails.diets} edit={edit} />
        ) : (
          <div className="diets-edit-initial">
            <p>
              {recipeDetails.diets.map((dt, idx, ar) => (
                <span key={`spanDt${idx}`}>{` ${dt}${
                  idx === ar.length - 1 ? "." : ","
                }`}</span>
              ))}
            </p>
            <div className="edit-button">
              <button name="diets" onClick={edit}>
                Edit ✏️
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="steps-edit">
        <h3>Steps</h3>
        {editable.steps ? (
          <UptdSteps
            edit={edit}
            steps={recipeDetails.steps}
            id={recipeDetails.ID}
          />
        ) : (
          <div className="steps-edit-initial">
            {recipeDetails.steps.map((stp) => (
              <p key={`pStp${stp.number}`}>
                <strong>{stp.number}. </strong>
                {stp.step}
              </p>
            ))}
            <div className="edit-button">
              <button name="steps" onClick={edit}>
                Edit ✏️
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateForm;
