import React from "react";
import "./StepCard.css"

const StepCard = ({ steps, deleteFunction }) => {
  // Functions
  const deleteStep = (e, step) => {
    e.preventDefault();
    deleteFunction(step);
  };

  if (steps.length === 0) return <i>No steps added yet...</i>;
  return (
    <div className="crate-steps-list-container">
      {steps.map((stp, idx) => (
        <div className="create-step-container" key={`stp${idx}`}>
          <div className="create-step-title" >
            <h5>Step {idx + 1}</h5>
            <span onClick={(e) => deleteStep(e, stp)}> X</span>
          </div>
          <div className="create-step-content">
            <p>
              {stp.length >= 40
                ? `${stp.split("", 40).join("")} ...`
                : stp}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepCard;
