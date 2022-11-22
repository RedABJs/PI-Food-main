import React, { useEffect } from "react";
import "./OwnRecipeList.css";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/actions";

import RecipeCard from "../RecipeCard/RecipeCard";
import OwnRecipeCard from "../OwnRecipeCard/OwnRecipeCard";
import LoadingOthers from "../Loading/LoadingOthers/LoadingOthers";

const OwnRecipeList = ({ ownCard }) => {
  const { ownRecipes, loading } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getOwnRecipes());
  }, [dispatch]);

  const deleteFunction = (e, id) => {
    e.preventDefault();
    dispatch(actions.deleteRecipe(id));
  };

  if (loading) return <LoadingOthers />;

  if (ownRecipes.length === 0)
    return (
      <div className="emptyOwnRecipes">
        <p>You dont have created recipes yet..</p>
      </div>
    );
  if (ownCard)
    return (
      <div className="all-OwnrecipesPage-container">
        {ownRecipes.map((rec) => (
          <OwnRecipeCard
            key={rec.ID}
            id={rec.ID}
            image={rec.image}
            name={rec.name}
            diets={rec.diets}
            health_score={rec.health_score}
            deleteFunction={deleteFunction}
          />
        ))}
      </div>
    );
  return (
    <div className="all-ownRecipes-container">
      {ownRecipes.map((recipe) => (
        <RecipeCard
          key={recipe.ID}
          ID={recipe.ID}
          title={recipe.name}
          image={recipe.image}
          diets={recipe.diets}
        />
      ))}
    </div>
  );
};

export default OwnRecipeList;
