import {
  GET_RECIPES,
  GET_RECIPE_DETAILS,
  GET_DISPLAY_REC,
  CREATE_RECIPE,
  INCREMENT_CP,
  DECREMENT_CP,
  FILTER_RECIPES,
  GET_DIETS,
  UPDATE_CP,
} from "../actions/actions";

const initialState = {
  recipes: [],
  filteredRecipes: [],
  displayRecipes: [],
  recipeDetails: {},
  diets: [],
  currentPage: 0,
  limitRecipes: 20,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        filteredRecipes: action.payload,
      };
    case FILTER_RECIPES:
      let { diet, order } = action.payload;
      if (order && diet) {
        let filtered = [...state.filteredRecipes]
          .filter((recipe) => recipe.diets.include(diet))
          .sort();

        if (order == "z-a") {
          filtered = filtered.reverse();
        }

        return {
          ...state,
          filteredRecipes: filtered,
        };
      } else if (order && !diet) {
        let filtered = [...state.filteredRecipes].sort();
        if (order == "z-a") filtered = filtered.reverse();
        return {
          ...state,
          filteredRecipes: filtered,
        };
      }

    case GET_DISPLAY_REC:
      let sliced = [...state.filteredRecipes].slice(
        state.currentPage * state.limitRecipes,
        state.currentPage * state.limitRecipes + state.limitRecipes
      );
      return {
        ...state,
        displayRecipes: sliced,
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case UPDATE_CP:
      return {
        ...state,
        currentPage: action.payload,
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
