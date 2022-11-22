import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as actions from "../../redux/actions/actions";
import "./Search.css";

import RecipesList from "../RecipesList/RecipesList";
import NotFound from "../Not-Found/Not-Found";
import LoadingPages from "../Loading/LoadingPages/LoadingPages";

const HistoryButton = () => {
  const { name } = useParams();

  const dispatch = useDispatch();

  const { not_found, recipes, loading } = useSelector((state) => state);

  useEffect(() => {
    dispatch(actions.getRecipes(name));
  }, [name, dispatch]);

  if (not_found) {
    return (
      <div className="loader-home-container">
        <NotFound recipes={true} />
      </div>
    );
  } else if (loading || recipes.length === 0) {
    return (
      <div className="loader-home-container">
        <LoadingPages />
      </div>
    );
  } else {
    return (
      <div className="search-container">
        <div className="search-title">
          <h1>Found Recipes</h1>
        </div>
        <div className="search-recipes">
          <RecipesList />
        </div>
      </div>
    );
  }
};

export default HistoryButton;
