import React, { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <label htmlFor="search">
        <input onChange={handleChange} name="search" value={name} />
      </label>
      <button>Search</button>
    </form>
  );
};

export default SearchBar;
