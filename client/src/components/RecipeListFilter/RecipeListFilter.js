import React from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/actions";

//Components
import FilterButons from "./FilterButtons/FilterButtons";

const RecipeListFilter = () => {
  //Hooks
  const dispatch = useDispatch();

  const { recipes, currentPage, displayRecipes, limitRecipes } = useSelector(
    (state) => state
  );

  return (
    <div>
      <FilterButons
        recipes={recipes}
        currentPage={currentPage}
        limitRecipes={limitRecipes}
        displayRecipes={displayRecipes}
      />
    </div>
  );
};

export default RecipeListFilter;
