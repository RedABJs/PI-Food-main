import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux actions
import * as actions from "../../redux/actions/actions";

// Card de receta
import RecipeCard from "../RecipeCard/RecipeCard";

const RecipesList = () => {
  // ReduxHooks
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(actions.getRecipes());
  }, []);

  if (recipes.length <= 0) return <h1>Loading ......</h1>;

  return (
    <div>
      <h1>Soy recipesList</h1>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.ID}
          title={recipe.name}
          image={recipe.image}
          diets={recipe.diets}
        />
      ))}
    </div>
  );
};

export default RecipesList;
