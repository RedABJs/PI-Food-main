import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/RECETAS.png"

import "./NavBar.css";

import SearchBar from "./SearchBar/SearchBar";

const NavBar = () => {

  // useEffect(()=>{
  //   const nav = document.getElementById("nav-container")
  //   window.addEventListener("scroll", function(){
  //     nav.classList.toggle("active", window.scrollY > 0)
  //   })
  // },[])

  return (
    <nav id="nav-container" className="nav-container">
      <Link className="nav-link" to="/app/home" >
        <div className="nav-img">
          <img src={logo}  alt="logo" />
          <h3>Henry-Food</h3>
        </div>
      </Link>
      <div className="search-bar">
        <Link className="nav-link create-link" to="/app/create"><h4>Create</h4></Link>
        <SearchBar />
      </div>
    </nav>
  );
};

export default NavBar;
