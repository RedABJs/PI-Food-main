import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./RecipeDetails.css";

// Components
import Details from "./Details/Details";
import LoadingOthers from "../Loading/LoadingOthers/LoadingOthers";
import NotFound from "../Not-Found/Not-Found";

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

  const { recipeDetails, not_found } = useSelector((state) => state);

  useEffect(() => {
    dispatch(actions.getRecipeDetails(id));
  }, [dispatch]);

  if (not_found)
    return (
      <div className="recipeDetails-container">
        <NotFound />
      </div>
    );
  else if (Object.keys(recipeDetails).length === 0)
    return (
      <div className="recipeDetails-container">
        <LoadingOthers />
      </div>
    );
  else
    return (
      <div className="recipeDetails-container">
        <Details
          image={recipeDetails.image}
          name={recipeDetails.name}
          health_score={recipeDetails.health_score}
          summary={recipeDetails.summary}
          diets={recipeDetails.diets}
          steps={recipeDetails.steps}
          not_found={not_found}
        />
      </div>
    );
};

export default RecipeDetails;
