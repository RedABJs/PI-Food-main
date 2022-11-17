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
  }, [dispatch]);

  // if (recipes.length <= 0)
  //   return (
  //     <div className="loader-home-container">
  //       <LoadingHome />
  //     </div>
  //   );

  return (
    <div className="home-container">
      <div className="main-title">
        <h1>Henry Food</h1>
      </div>
      <div className="recipes-title">
        <h2 className="recipes-title">All Henry Food Recipes</h2>
      </div>
      <hr></hr>
      <RecipesList />
    </div>
  );
};

export default Home;
