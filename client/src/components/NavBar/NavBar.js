import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";

import SearchBar from "./SearchBar/SearchBar";

const NavBar = () => {
  return (
    <nav className="nav-container">
      <Link to="/home">Home</Link>
      <Link to="/create">Create</Link>
      <SearchBar />
    </nav>
  );
};

export default NavBar;
