import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./RecipesList.css";

// Redux actions
import * as actions from "../../redux/actions/actions";

// Components
import RecipeCard from "../RecipeCard/RecipeCard";
import RecipeListFilter from "../RecipeListFilter/RecipeListFilter";
import LoadingOthers from "../Loading/LoadingOthers/LoadingOthers";

const RecipesList = () => {
  // ReduxHooks
  const dispatch = useDispatch();
  const { recipes, currentPage, displayRecipes, limiteRecipes } = useSelector(
    (state) => state
  );

  // No olvidar intentar modularizar los hooks
  // QUIERO CUSTOM HOOKS

  useEffect(() => {
    setTimeout(() => {
      dispatch(actions.getDisplayRec());
    }, 2000);
  }, [recipes, currentPage, limiteRecipes]);

  const onClick = (e) => {
    e.preventDefault();
    console.log(displayRecipes, recipes, currentPage);
  };

  if (displayRecipes.length <= 0)
    return (
      <>
        <RecipeListFilter />
        <LoadingOthers />;
      </>
    );

  return (
    <div className="all-recipes-container">
      <RecipeListFilter />
      <div className="recipes-container">
        {displayRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.ID}
            title={recipe.name}
            image={recipe.image}
            diets={recipe.diets}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipesList;
