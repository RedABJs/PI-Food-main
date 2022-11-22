import "./App.css";

// React-router-Dom
import { Route } from "react-router-dom";

// Components
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import CreateRecipe from "./components/CreateRecipe/CreateRecipe";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import UpdateForm from "./components/UpdateForm/UpdateForm";
import OwnRecipes from "./components/OwnRecipes/OwnRecipes";
import Search from "./components/Search/Search";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Landing />
      </Route>
      <Route path="/app">
        <NavBar />
      </Route>
      <Route exact path="/app/home">
        <Home />
      </Route>
      <Route exact path="/app/create">
        <CreateRecipe />
      </Route>
      <Route exact path="/app/recipes/:id">
        <RecipeDetails />
      </Route>
      <Route exact path="/app/update/:id">
        <UpdateForm />
      </Route>
      <Route exact path="/app/ownrecipes">
        <OwnRecipes />
      </Route>
      <Route exact path="/app/search/:name">
        <Search />
      </Route>
    </div>
  );
}

export default App;
