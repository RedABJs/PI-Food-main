import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./RecipesList.css";

// Redux actions
import * as actions from "../../redux/actions/actions";

// Components
import RecipeCard from "../RecipeCard/RecipeCard";
import RecipeListFilter from "../RecipeListFilter/RecipeListFilter";
import LoadingOthers from "../Loading/LoadingOthers/LoadingOthers";
import FilterButons from "./FilterButtons/FilterButtons";

const RecipesList = () => {
  // ReduxHooks
  const dispatch = useDispatch();
  const { recipes, currentPage, displayRecipes, limitRecipes } = useSelector(
    (state) => state
  );

  // No olvidar intentar modularizar los hooks
  // QUIERO CUSTOM HOOKS

  useEffect(() => {
    dispatch(actions.getDisplayRec());
  }, [recipes, currentPage, limitRecipes]);

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
      <FilterButons
        recipes={recipes}
        currentPage={currentPage}
        limitRecipes={limitRecipes}
        displayRecipes={displayRecipes}
      />
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
      <FilterButons
        recipes={recipes}
        currentPage={currentPage}
        limitRecipes={limitRecipes}
        displayRecipes={displayRecipes}
      />
    </div>
  );
};

export default RecipesList;
