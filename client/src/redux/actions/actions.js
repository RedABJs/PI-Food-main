export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_DETAILS = "GET_RECIPE_DETAILS";
export const CREATE_RECIPE = "CREATE_RECIPE";

export const getRecipes = () => {
  return async function (dispatch) {
    const data = await fetch("http://localhost:3001/recipes").then((data) =>
      data.json()
    );
    dispatch({
      type: GET_RECIPES,
      payload: data,
    });
  };
};
