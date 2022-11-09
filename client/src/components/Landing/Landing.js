import React from "react";
import "./Landing.css";

// React-Router-Dom
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="containerLanding">
      <div className="logo-start-background ">
        <div className="logo-start">
          <h1 className="start">Bienvenidos</h1>
          <Link to="/home">
            <button>Let's cook!</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
