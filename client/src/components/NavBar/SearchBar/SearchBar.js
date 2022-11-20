import React, { useState } from "react";
import "./SearchBar.css";

import { useDispatch } from "react-redux";
import * as actions from "../../../redux/actions/actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.getRecipes(name));
  };

  return (
    <form className="searchbar-form" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        name="search"
        value={name}
        placeholder="Search your recipe here"
      />
      <button>Search</button>
    </form>
  );
};

export default SearchBar;
