import {
  GET_RECIPES,
  GET_RECIPE_DETAILS,
  GET_DISPLAY_REC,
  CREATE_RECIPE,
  INCREMENT_CP,
  DECREMENT_CP,
} from "../actions/actions";

const initialState = {
  recipes: [],
  displayRecipes: [],
  recipeDetails: {},
  currentPage: 0,
  limitRecipes: 20,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
    case GET_DISPLAY_REC:
      let filtered = [...state.recipes].slice(
        state.currentPage * state.limitRecipes,
        state.currentPage * state.limitRecipes + state.limitRecipes
      );
      return {
        ...state,
        displayRecipes: filtered,
      };
    case INCREMENT_CP:
      return {
        ...state,
        currentPage: ++state.currentPage,
      };
    case DECREMENT_CP:
      return {
        ...state,
        currentPage: --state.currentPage,
      };

    default:
      return state;
  }
};

export default rootReducer;
