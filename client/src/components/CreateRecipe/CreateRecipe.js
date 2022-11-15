import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CreateRecipe.css";

import * as actions from "../../redux/actions/actions";

// Components
import StepCard from "./StepCard/StepCard";
import DietCard from "./DietCard/DietCard";

const CreateRecipe = () => {
  // Hooks

  const diets = useSelector((state) => state.diets);

  const [form, setForm] = useState({
    name: "",
    summary: "",
    health_score: "",
    steps: [],
    diets: [],
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getDiets());
  }, [dispatch]);

  const [step, setStep] = useState("");

  const [diet, setDiet] = useState("");

  // const [validered, setValidated] = useState();

  //Functions

  // --- Step functions --

  const handleRecipeInfChange = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleStepChange = (e) => {
    setStep(e.target.value);
  };

  const handleDietChange = (e) => {
    setDiet(e.target.value);
  };

  const addStep = (e) => {
    e.preventDefault();
    if (step === "") alert("Está vacío");
    else {
      setForm({
        ...form,
        steps: [...form.steps, step],
      });
      setStep("");
    }
  };

  const deleteStep = (step) => {
    let filtered = form.steps.filter((stp) => stp !== step);
    setForm({
      ...form,
      steps: filtered,
    });
  };

  const addDiet = (e) => {
    e.preventDefault();
    if (diet === "") alert("Select a diet please");
    else {
      let idxDiet = form.diets.indexOf(diet);
      if (idxDiet < 0 && diet !== "") {
        setForm({
          ...form,
          diets: [...form.diets, diet],
        });
        setDiet("");
      } else {
        setDiet("");
        alert("La dieta ya fue seleccionada");
      }
    }
  };

  const deleteDiet = (dietName) => {
    let filtered = form.diets.filter((dt) => dt !== dietName);
    setForm({
      ...form,
      diets: filtered,
    });
  };

  // --- Other Functions

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createdSteps = form.steps.map((stp, idx) => {
      return {
        number: idx + 1,
        step: stp,
      };
    });

    const body = {
      ...form,
      health_score: Number(form.health_score),
      steps: createdSteps,
    };

    dispatch(actions.createRecipe(body));
  };

  return (
    <div className="general-create-container">
      <form className="container-form" onSubmit={handleSubmit}>
        <fieldset className="info-fielset">
          <h3>Recipe Info</h3>
          <label htmlFor="name">
            Name:
            <input
              name="name"
              type="text"
              onChange={handleRecipeInfChange}
              placeholder="Canadian Cheese Buger..."
              value={form.name}
            />
          </label>

          <label htmlFor="summary">Summary: </label>
          <textarea
            name="summary"
            type="text"
            onChange={handleRecipeInfChange}
            placeholder="Canadian style burger..."
            value={form.summary}
          />

          <label htmlFor="health_score">Health Score: </label>
          <input
            name="health_score"
            type="number"
            onChange={handleRecipeInfChange}
            placeholder="0 - 100"
            value={form.health_score}
          />
        </fieldset>

        <fieldset className="steps-fieldset">
          <h3>Recipe Steps</h3>
          <StepCard steps={form.steps} deleteFunction={deleteStep} />
          <textarea
            name="step"
            onChange={handleStepChange}
            value={step}
            placeholder="Write the step here..."
          />
          <p>Please, add the steps one by one</p>
          <button onClick={addStep}>Add Step</button>
          <button onClick={deleteStep}>Delete Step</button>
        </fieldset>

        <fieldset className="diets-fieldset">
          <h3>Recipe Diets</h3>
          <select onChange={handleDietChange} value={diet}>
            <option value="">--Diets--</option>
            {diets.map((dt) => (
              <option value={dt.name}>{dt.name}</option>
            ))}
          </select>
          <button onClick={addDiet}>Add Diet</button>
          <DietCard diets={form.diets} deleteFunction={deleteDiet} />
        </fieldset>

        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
};

export default CreateRecipe;
