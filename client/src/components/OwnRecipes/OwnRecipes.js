import React from "react";
import "./OwnRecipes.css";

import OwnRecipeList from "../OwnRecipeList/OwnRecipeList";

const OwnRecipes = () => {
  return (
    <div className="ownRecipes-container">
      <h1> All your Recipes</h1>
      <hr className="hr-container" />
      <OwnRecipeList ownCard={true} />
    </div>
  );
};

export default OwnRecipes;
