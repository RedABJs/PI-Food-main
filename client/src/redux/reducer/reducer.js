import {
  GET_RECIPES,
  GET_RECIPE_DETAILS,
  CREATE_RECIPE,
} from "../actions/actions";

const initialState = {
  recipes: [],
  recipeDetails: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
