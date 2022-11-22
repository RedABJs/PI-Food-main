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
  LOADING,
  CREATED,
  NOT_FOUND,
  GET_OWN_RECIPES,
  DELETE_RECIPE,
} from "../actions/actions";

const initialState = {
  recipes: [],
  ownRecipes: [],
  filteredRecipes: [],
  displayRecipes: [],
  recipeDetails: {},
  diets: [],
  currentPage: 0,
  limitRecipes: 20,
  loading: false,
  created: false,
  not_found: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOT_FOUND:
      return {
        ...state,
        not_found: action.payload,
      };

    case DELETE_RECIPE:
      let filtered = state.ownRecipes.filter(
        (rec) => rec.ID !== action.payload
      );
      return {
        ...state,
        ownRecipes: filtered,
      };
    case GET_OWN_RECIPES:
      return {
        ...state,
        ownRecipes: action.payload,
      };
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        filteredRecipes: action.payload,
      };
    case GET_RECIPE_DETAILS:
      return {
        ...state,
        recipeDetails: action.payload,
      };
    case CREATE_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case CREATED:
      return {
        ...state,
        created: action.payload,
      };
    case FILTER_RECIPES:
      let { limit, diet, order } = action.payload;

      let parcialAns = {
        ...state,
        currentPage: 0,
      };

      if (limit) {
        parcialAns = {
          ...parcialAns,
          limitRecipes: Number(limit),
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
          if (order === "z-a") ordered = ordered.reverse();
          parcialAns = {
            ...parcialAns,
            filteredRecipes: ordered,
          };
        }
      }
      return parcialAns;

    case GET_DISPLAY_REC:
      let sliced = /* [...state.filteredRecipes] */ state.filteredRecipes.slice(
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
    case LOADING:
      return {
        ...state,
        loading: !state.loading,
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
