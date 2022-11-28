import React, { useState } from "react";
import "./SearchBar.css";

import { Link } from "react-router-dom";

// import { useDispatch } from "react-redux";
// import * as actions from "../../../redux/actions/actions";

const SearchBar = () => {
  // const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(actions.getRecipes(name));
  // };

  return (
    <form className="searchbar-form">
      <input
        onChange={handleChange}
        name="search"
        value={name}
        placeholder="Search your recipe here"
      />
      <Link to={`/app/search/${name}`}>
        <button onClick={() => setName("")}>Search</button>
      </Link>
    </form>
  );
};

export default SearchBar;
