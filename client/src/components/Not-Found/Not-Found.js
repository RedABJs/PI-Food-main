import React from "react";
import "./Not-Found.css";

import icon from "../../assets/bowlicon.png";

const NotFound = ({ recipes }) => {
  return (
    <div className="not-found-container">
      <div className="not-found-img">
        <img src={icon} alt="bowlIcon" />
      </div>
      <div className="not-found-text">
        <h1>404</h1>
        <h2>Recipe{`${recipes ? "s" : ""}`} not Found</h2>
      </div>
    </div>
  );
};

export default NotFound;
