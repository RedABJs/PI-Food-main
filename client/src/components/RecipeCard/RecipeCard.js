import React from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

const recipeCard = ({ ID, title, diets, image }) => {
  return (
    <Link className="card-link" to={`/app/recipes/${ID}`}>
      <div className="card-container">
        <div className="recipe-image">
          <img  src={image} alt="card" />
        </div>
        <div className="recipe-title">
          <h5 >{title}</h5>
        </div>
        <hr></hr>
        <div className="recipe-diets">
          <ul >
            {diets.map((diet) => (
              <li key={`ditem${diet}`}>{diet}</li>
              ))}
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default recipeCard;
