export const GET_RECIPES = "GET_RECIPES";
export const GET_DISPLAY_REC = "GET_DISPLAY_REC";
export const GET_RECIPE_DETAILS = "GET_RECIPE_DETAILS";
export const CREATE_RECIPE = "CREATE_RECIPE";

export const INCREMENT_CP = "INCREMENT_CP";
export const DECREMENT_CP = "DECREMENT_CP";

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

export const getDisplayRec = () => {
  return {
    type: GET_DISPLAY_REC,
  };
};

export const incrementCp = () => {
  return {
    type: INCREMENT_CP,
  };
};

export const decrementCp = () => {
  return {
    type: DECREMENT_CP,
  };
};
