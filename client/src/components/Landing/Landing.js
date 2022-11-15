import React from "react";
import "./Landing.css";

import logo from "../../assets/RECETAS.png";

// React-Router-Dom
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="containerLanding">
      <Link to="/app/home">
        <section className="logo-start">
          <img src={logo} alt="Holi" />
          <p>Let's cook!</p>
        </section>
      </Link>
    </div>
  );
};

export default Landing;
