import React from "react";

const StepCard = ({ steps, deleteFunction }) => {
  // Functions
  const deleteStep = (e, step) => {
    e.preventDefault();
    deleteFunction(step);
  };

  if (steps.length === 0) return <i>No steps added yet...</i>;
  return (
    <div>
      {steps.map((stp, idx) => (
        <div key={`stp${idx}`}>
          <h6>Step {idx + 1}</h6>
          <span onClick={(e) => deleteStep(e, stp)}> X</span>
          <p>
            {stp.split(" ").length >= 5
              ? `${stp.split(" ", 4).join(" ")}...`
              : stp}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StepCard;
