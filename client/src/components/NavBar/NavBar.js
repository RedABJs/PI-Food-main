import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/RECETAS.png";

import "./NavBar.css";

import SearchBar from "./SearchBar/SearchBar";

const NavBar = () => {
  const location = useLocation();

  return (
    <nav id="nav-container" className="nav-container">
      <Link className="nav-link" to="/app/home">
        <div className="nav-img">
          <img src={logo} alt="logo" />
          <h3>Henry-Food</h3>
        </div>
      </Link>
      <div className="search-bar">
        <Link
          className={`nav-link ${
            location.pathname === "/app/home" ? "selected-link" : ""
          }`}
          to="/app/home"
        >
          <h4>Home</h4>
        </Link>
        <Link
          className={`nav-link ${
            location.pathname === "/app/ownRecipes" ? "selected-link" : ""
          }`}
          to="/app/ownRecipes"
        >
          <h4>Your Recipes</h4>
        </Link>
        <Link
          className={`nav-link ${
            location.pathname === "/app/create" ? "selected-link" : ""
          }`}
          to="/app/create"
        >
          <h4>Create</h4>
        </Link>
        <SearchBar />
      </div>
    </nav>
  );
};

export default NavBar;
