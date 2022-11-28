import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./RecipesList.css";

// Redux actions
import * as actions from "../../redux/actions/actions";

// Components
import RecipeCard from "../RecipeCard/RecipeCard";
import RecipeListFilter from "./FilterForm/FilterForm";
import LoadingOthers from "../Loading/LoadingOthers/LoadingOthers";
import FilterButons from "./FilterButtons/FilterButtons";

const RecipesList = () => {
  // ReduxHooks
  const dispatch = useDispatch();
  const {
    recipes,
    currentPage,
    displayRecipes,
    limitRecipes,
    filteredRecipes,
    loading,
  } = useSelector((state) => state);

  // No olvidar intentar modularizar los hooks
  // QUIERO CUSTOM HOOKS

  useEffect(() => {
    dispatch(actions.getDisplayRec());
  }, [recipes, filteredRecipes, currentPage, limitRecipes, dispatch]);

  if (loading)
    return (
      <div className="recipeList-loader">
        <LoadingOthers />
      </div>
    );

  return (
    <div className="all-recipes-container">
      <div className="recipelist-filter">
        <RecipeListFilter />
      </div>
      <div className="recipelist-filterbuttons">
        <FilterButons
          filteredRecipes={filteredRecipes}
          currentPage={currentPage}
          displayRecipes={displayRecipes}
          limitRecipes={limitRecipes}
        />
      </div>
      <div className="recipes-container">
        {displayRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.ID}
            ID={recipe.ID}
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
