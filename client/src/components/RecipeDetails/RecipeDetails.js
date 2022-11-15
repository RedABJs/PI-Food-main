import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./RecipeDetails.css";

import { useParams } from "react-router-dom";
import * as actions from "../../redux/actions/actions";

const RecipeDetails = () => {
  let { id } = useParams();

  //   ID: apiSearch.id,
  //   name: apiSearch.title,
  //   summary: apiSearch.summary,
  //   health_score: apiSearch.healthScore,
  //   image: apiSearch.image,
  //   diets: apiSearch.diets,
  //   steps: [...apiSearch.analyzedInstructions]

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getRecipeDetails(id));
  }, [dispatch]);

  const recipeDetails = useSelector((state) => state.recipeDetails);
  let { image, name, health_score, summary, diets, steps } = recipeDetails;
  console.log(recipeDetails);

  if (Object.keys(recipeDetails).length == 0) return <p>Loading ...</p>;

  return (
    <div>
      <img src={image} />
      <h2>{name}</h2>
      <h3>Health Score: {health_score}</h3>
      <hr></hr>
      {summary}
      <br />
      <h3>Diets</h3>
      <ul>
        {diets.map((dt) => (
          <li>{dt}</li>
        ))}
      </ul>
      <br />
      <h3>Steps</h3>
      {steps.map((stp) => (
        <div>
          <h4>Step {stp.number}</h4>
          <p>{stp.step}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeDetails;
