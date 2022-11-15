import React from "react";

const DietCard = ({ diets, deleteFunction }) => {
  const deleteDiet = (e, dietName) => {
    e.preventDefault();
    deleteFunction(dietName);
  };

  return (
    <div>
      {diets.map((dt, idx) => (
        <p key={`pdt${idx}`}>
          {dt}
          <span onClick={(e) => deleteDiet(e, dt)}> x </span>
        </p>
      ))}
    </div>
  );
};

export default DietCard;
