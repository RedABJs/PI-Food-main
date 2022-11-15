import React from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

const recipeCard = ({ ID, title, diets, image }) => {
  return (
    <Link to={`/recipes/${ID}`}>
      <div className="card-container">
        <img className="recipe-image" src={image} alt="card" />
        <h4 className="recipe-title">{title}</h4>
        <hr />
        <ul className="recipe-diets">
          {diets.map((diet) => (
            <li key={`ditem${diet}`}>{diet}</li>
          ))}
        </ul>
      </div>
    </Link>
  );
};

export default recipeCard;
