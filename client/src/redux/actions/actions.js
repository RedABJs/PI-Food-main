export const GET_RECIPES = "GET_RECIPES";
export const FILTER_RECIPES = "FILTER_RECIPES";
export const GET_DISPLAY_REC = "GET_DISPLAY_REC";
export const GET_DIETS = "GET_DIETS";
export const GET_OWN_RECIPES = "GET_OWN_RECIPES";

export const GET_RECIPE_DETAILS = "GET_RECIPE_DETAILS";
export const UPDATE_RECIPE = "UPDATE_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const CREATED = "CREATED";

export const LOADING = "LOADING";
export const NOT_FOUND = "NOT_FOUND";

export const UPDATE_CP = "UPDATE_CP";
export const INCREMENT_CP = "INCREMENT_CP";
export const DECREMENT_CP = "DECREMENT_CP";

export const notFound = () => {
  return { type: NOT_FOUND };
};

export const getOwnRecipes = () => {
  return async function (dispatch) {
    dispatch({ type: LOADING });
    await fetch("http://localhost:3001/recipes/own")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        dispatch({
          type: GET_OWN_RECIPES,
          payload: data,
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_OWN_RECIPES,
          payload: [],
        });
      });
    dispatch({ type: LOADING });
  };
};

export const deleteRecipe = (id) => {
  return async function (dispatch) {
    dispatch({ type: LOADING });

    await fetch(`http://localhost:3001/recipes/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error.message);
        dispatch({
          type: DELETE_RECIPE,
          payload: id,
        });
        alert(data.message);
      })
      .catch((e) => alert(e.message));

    dispatch({ type: LOADING });
  };
};

export const updateRecipe = (id, data) => {
  return async function (dispatch) {
    dispatch({ type: LOADING });
    await fetch(`http://localhost:3001/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        else dispatch({ type: GET_RECIPE_DETAILS, payload: data });
      })
      .catch((e) => alert(e.message));
    dispatch({ type: LOADING });
  };
};

export const getRecipes = (name) => {
  if (name) {
    return async function (dispatch) {
      dispatch({ type: NOT_FOUND, payload: false });
      dispatch({ type: LOADING });
      await fetch(`http://localhost:3001/recipes?name=${name}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) throw new Error(data.error);
          else {
            dispatch({
              type: GET_RECIPES,
              payload: data,
            });
          }
        })
        .catch((e) => {
          dispatch({ type: NOT_FOUND, payload: true });
          dispatch({
            type: GET_RECIPES,
            payload: [],
          });
        });

      dispatch({ type: LOADING });
    };
  } else {
    return async function (dispatch) {
      dispatch({ type: NOT_FOUND, payload: false });
      dispatch({ type: LOADING });

      await fetch("http://localhost:3001/recipes")
        .then((res) => res.json())
        .then((data) => {
          if (data.error) throw new Error(data.error);
          else {
            dispatch({
              type: GET_RECIPES,
              payload: data,
            });
          }
        })
        .catch((e) => {
          dispatch({ type: NOT_FOUND, payload: true });
          dispatch({
            type: GET_RECIPES,
            payload: [],
          });
        });

      dispatch({ type: LOADING });
    };
  }
};

export const getRecipeDetails = (id) => {
  return async function (dispatch) {
    dispatch({ type: NOT_FOUND, payload: false });
    dispatch({ type: LOADING });
    await fetch(`http://localhost:3001/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error("Not Found");
        dispatch({
          type: GET_RECIPE_DETAILS,
          payload: data,
        });
      })
      .catch((e) => {
        dispatch({ type: NOT_FOUND, payload: true });
      });
    dispatch({ type: LOADING });
  };
};

export const createRecipe = (recipe) => {
  return async function (dispatch) {
    dispatch({ type: LOADING });

    await fetch("http://localhost:3001/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(recipe),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        else {
          dispatch({
            type: CREATE_RECIPE,
            payload: data,
          });
          dispatch({
            type: CREATED,
            payload: true,
          });
        }
      })
      .catch((e) => {
        alert(e.message);
        dispatch({
          type: CREATED,
          payload: false,
        });
      });

    dispatch({ type: LOADING });
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
    dispatch({ type: NOT_FOUND, payload: false });
    dispatch({ type: LOADING });
    const data = await fetch("http://localhost:3001/diets")
      .then((res) => res.json())
      .catch((e) => {
        dispatch({ type: NOT_FOUND, payload: true });
        alert(e.message);
      });

    dispatch({
      type: GET_DIETS,
      payload: data,
    });
    dispatch({ type: LOADING });
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
