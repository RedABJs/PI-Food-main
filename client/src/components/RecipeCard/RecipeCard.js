import React from "react";

const recipeCard = ({ title, diets, image }) => {
  return (
    <div className="card-container">
      <img src={image} alt="card" />
      <h5>{title}</h5>
      <ul>
        {diets.map((diet) => (
          <li>{diet}</li>
        ))}
      </ul>
    </div>
  );
};

export default recipeCard;
