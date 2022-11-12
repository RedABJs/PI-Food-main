import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/actions";
import "./Home.css";

// Recipes List
import RecipesList from "../RecipesList/RecipesList";
import LoadingHome from "../Loading/LoadingHome/LoadingHome";

const Home = () => {
  const dispatch = useDispatch();

  const { recipes } = useSelector((state) => state);

  useEffect(() => {
    dispatch(actions.getRecipes());
    dispatch(actions.getDiets());
  }, []);

  if (recipes.length <= 0)
    return (
      <div className="loader-home-container">
        <LoadingHome />
      </div>
    );

  return (
    <div className="home-container">
      <h1 className="main-title">Henry Food</h1>

      <h2 className="recipes-title">All Henry Food Recipes</h2>
      <RecipesList />
    </div>
  );
};

export default Home;
