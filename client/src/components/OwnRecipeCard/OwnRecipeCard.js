import React from "react";
import { Link } from "react-router-dom";
import "./OwnRecipeCard.css";

const OwnRecipeCard = ({
  id,
  name,
  image,
  diets,
  health_score,
  deleteFunction,
}) => {
  return (
    <div className="OwnCard-container">
      <div className="OwnCard-img-container">
        <img src={image} alt="own-recipe-img" />
        <p>Health Score: {health_score}</p>
      </div>
      <div className="OwnCard-info-container">
        <h2>{name}</h2>
        <hr />
        <h3>Diets: </h3>
        <p>
          {diets.map((dt, idx, ar) => (
            <span key={`ownDt${idx}`}>{` ${dt}${
              idx === ar.length - 1 ? "." : ","
            }`}</span>
          ))}
        </p>
      </div>
      <div className="ownCard-over">
        <h3>{name}</h3>
        <div className="ownCard-Links">
          <Link to={`/app/update/${id}`}>
            <button className="ownCard-Link">Update</button>
          </Link>
          <button
            onClick={(e) => deleteFunction(e, id)}
            className="ownCard-Link"
          >
            Delete
          </button>
          <Link to={`/app/recipes/${id}`}>
            <button className="ownCard-Link">Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OwnRecipeCard;
