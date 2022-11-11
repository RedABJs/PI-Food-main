export const GET_RECIPES = "GET_RECIPES";
export const FILTER_RECIPES = "FILTER_RECIPES";
export const GET_DISPLAY_REC = "GET_DISPLAY_REC";
export const GET_RECIPE_DETAILS = "GET_RECIPE_DETAILS";
export const GET_DIETS = "GET_DIETS";
export const CREATE_RECIPE = "CREATE_RECIPE";

export const UPDATE_CP = "UPDATE_CP";
export const INCREMENT_CP = "INCREMENT_CP";
export const DECREMENT_CP = "DECREMENT_CP";

export const getRecipes = () => {
  return async function (dispatch) {
    const data = await fetch("http://localhost:3001/recipes").then((data) =>
      data.json().catch((e) => console.log(e))
    );
    dispatch({
      type: GET_RECIPES,
      payload: data,
    });
  };
};

export const filterRecipes = (filters) => {
  return {
    type: FILTER_RECIPES,
    payload: filters,
  };
};

export const getDisplayRec = () => {
  return {
    type: GET_DISPLAY_REC,
  };
};

export const getDiets = () => {
  return async function (dispatch) {
    const data = await fetch("http://localhost:3001/diets").then((res) =>
      res.json().catch((e) => console.log(e))
    );
    dispatch({
      type: GET_DIETS,
      payload: data,
    });
  };
};

export const updateCp = (idx) => {
  return {
    type: UPDATE_CP,
    payload: idx,
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
