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
  let { recipes, currentPage, displayRecipes, limitRecipes, filteredRecipes } =
    useSelector((state) => state);

  // No olvidar intentar modularizar los hooks
  // QUIERO CUSTOM HOOKS

  useEffect(() => {
    dispatch(actions.getDisplayRec());
  }, [recipes, filteredRecipes, currentPage, limitRecipes]);

  if (displayRecipes.length <= 0)
    return (
      <>
        <LoadingOthers />;
      </>
    );

  return (
    <div className="all-recipes-container">
      <RecipeListFilter />
      <FilterButons
        filteredRecipes={filteredRecipes}
        currentPage={currentPage}
        displayRecipes={displayRecipes}
        limitRecipes={limitRecipes}
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
    </div>
  );
};

export default RecipesList;
