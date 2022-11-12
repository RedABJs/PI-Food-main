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
      console.log(action.payload);
      let { limit, diet, order } = action.payload;
      let parcialAns = {
        ...state,
        currentPage: 0,
      };
      if (limit) {
        parcialAns = {
          ...parcialAns,
          limitRecipes: limit,
        };
      } else {
        parcialAns = {
          ...parcialAns,
          limitRecipes: 20,
        };
      }
      if (diet) {
        let filteredDiet = [...state.recipes].filter((recipe) =>
          recipe.diets.includes(diet)
        );

        parcialAns = {
          ...parcialAns,
          filteredRecipes: filteredDiet,
        };
      } else {
        parcialAns = {
          ...parcialAns,
          filteredRecipes: [...state.recipes],
        };
      }
      if (order) {
        if (order === "health") {
          let ordered = [...parcialAns.filteredRecipes].sort(
            (a, b) => b.health_score - a.health_score
          );
          parcialAns = {
            ...parcialAns,
            filteredRecipes: ordered,
          };
        } else {
          let ordered = [...parcialAns.filteredRecipes].sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          if (order == "z-a") ordered = ordered.reverse();
          parcialAns = {
            ...parcialAns,
            filteredRecipes: ordered,
          };
        }
      }
      console.log(parcialAns);
      return parcialAns;

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
        currentPage: Number(action.payload),
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
