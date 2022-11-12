import "./App.css";

// React-router-Dom
import { Switch, Route } from "react-router-dom";

// Components
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import FilterForm from "./components/RecipeListFilter/FilterForm/FilterForm";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/pruebas">
          <FilterForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
