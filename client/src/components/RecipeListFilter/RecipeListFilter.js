import React from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";

//Components
// import FilterButons from "./FilterButtons/FilterButtons";
import FilterForm from "./FilterForm/FilterForm";

const RecipeListFilter = () => {
  //Hooks
  const dispatch = useDispatch();

  const {
    recipes,
    filteredRecipes,
    currentPage,
    displayRecipes,
    limitRecipes,
  } = useSelector((state) => state);

  return (
    <div>
      <FilterForm recipes={filteredRecipes} />
    </div>
  );
};

export default RecipeListFilter;
