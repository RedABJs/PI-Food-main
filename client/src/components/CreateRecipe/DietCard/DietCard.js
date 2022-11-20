import React from "react";
import "./DietCard.css"

const DietCard = ({ diets, deleteFunction }) => {
  const deleteDiet = (e, dietName) => {
    e.preventDefault();
    deleteFunction(dietName);
  };

  return (
    <div className="createRecipe-dietlist">
      {diets.map((dt, idx) => (
        <div className="dietlist-diet" key={`pdt${idx}`}>
          <p>{dt}</p><span onClick={(e) => deleteDiet(e, dt)}> X </span> 
        </div>
      ))}
    </div>
  );
};

export default DietCard;
