import React, { useState } from "react";
import "./UptdSteps.css";

import * as actions from "../../../redux/actions/actions";
import { useDispatch } from "react-redux";

import StepCard from "../../CreateRecipe/StepCard/StepCard";

const UptdSteps = ({ steps, id, edit }) => {
  // Hooks

  const dispatch = useDispatch();

  const [validated, setValidated] = useState({
    valid: false,
    reason: "Summary can't be empty ❌",
  });

  const [formSteps, setFormSteps] = useState({
    steps: steps.map((stp) => stp.step),
  });

  const [step, setStep] = useState("");

  // Functions

  const validateFunction = (value) => {
    if (value === "") {
      setValidated({ valid: false, reason: "Summary can't be empty ❌" });
    } else if (/(^\s)|(\s$)/.test(value)) {
      setValidated({
        valid: false,
        reason: "Empty space at the beggining or at the end ❌",
      });
    } else {
      setValidated({ valid: true, reason: "Validated ✅" });
    }
  };

  const handleStepChange = (e) => {
    setStep(e.target.value);
    validateFunction(e.target.value);
  };

  const addStep = (e) => {
    e.preventDefault();
    setFormSteps({
      ...formSteps,
      steps: [...formSteps.steps, step],
    });
    setStep("");
  };
  const deleteStep = (step) => {
    let filtered = formSteps.steps.filter((stp) => stp !== step);
    setFormSteps({
      ...formSteps,
      steps: filtered,
    });
  };

  const updateRecipe = (e) => {
    const stepsUpdated = formSteps.steps.map((stp, idx) => {
      return {
        number: idx + 1,
        step: stp,
      };
    });
    dispatch(actions.updateRecipe(id, { steps: stepsUpdated }));
    edit(e);
  };

  return (
    <div className="steps-edit-editable">
      <div className="steps-edit-textarea">
        <textarea
          name="step"
          onChange={handleStepChange}
          value={step}
          placeholder="Write the step here..."
        />
        <i>{validated.reason}</i>
        <button disabled={!validated.valid} onClick={addStep}>
          Add Step
        </button>
      </div>
      <StepCard steps={formSteps.steps} deleteFunction={deleteStep} />
      <div className=""></div>

      <div className="edit-button">
        <button name="steps" onClick={updateRecipe}>
          Update
        </button>
      </div>
    </div>
  );
};

export default UptdSteps;
