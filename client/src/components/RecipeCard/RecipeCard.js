import React from "react";
import "./RecipeCard.css";

const recipeCard = ({ title, diets, image }) => {
  return (
    <div className="card-container">
      <img className="recipe-image" src={image} alt="card" />
      <h4 className="recipe-title">{title}</h4>
      <hr />
      <ul className="recipe-diets">
        {diets.map((diet) => (
          <li>{diet}</li>
        ))}
      </ul>
    </div>
  );
};

export default recipeCard;
