import React, { useEffect, useState } from "react";
import "./UptdDiets.css";
import * as actions from "../../../redux/actions/actions";

import { useDispatch, useSelector } from "react-redux";

import DietCard from "../../CreateRecipe/DietCard/DietCard";

const UptdDiets = ({ initialDiets, id, edit }) => {
  const dispatch = useDispatch();
  const allDiets = useSelector((state) => state.diets);

  useEffect(() => {
    dispatch(actions.getDiets());
  }, [dispatch]);

  const [diets, setDiets] = useState([...initialDiets]);

  const [diet, setDiet] = useState("");

  const handleDietChange = (e) => {
    setDiet(e.target.value);
  };

  const addDiet = (e) => {
    e.preventDefault();
    if (diet === "") alert("Select a diet please");
    else {
      let idxDiet = diets.indexOf(diet);
      if (idxDiet < 0 && diet !== "") {
        setDiets([...diets, diet]);
        setDiet("");
      } else {
        setDiet("");
        alert("La dieta ya fue seleccionada");
      }
    }
  };

  const deleteDiet = (dietName) => {
    let filtered = diets.filter((dt) => dt !== dietName);
    setDiets(filtered);
  };

  const updateDiets = (e) => {
    dispatch(actions.updateRecipe(id, { diets: diets }));
    edit(e);
  };

  return (
    <div className="select-container">
      <select onChange={handleDietChange} value={diet}>
        <option value="">--Diets--</option>
        {allDiets.map((dt) => (
          <option key={`dtOp${dt.name}`} value={dt.name}>
            {dt.name}
          </option>
        ))}
      </select>
      <button
        className="add-diets-button"
        onClick={addDiet}
        disabled={diet === ""}
      >
        Add Diet
      </button>
      <DietCard diets={diets} deleteFunction={deleteDiet} />
      <div className="edit-button">
        <button name="diets" onClick={updateDiets}>
          Update
        </button>
      </div>
    </div>
  );
};

export default UptdDiets;
