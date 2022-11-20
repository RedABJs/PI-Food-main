import React from "react";
import "./LoadingPages.css";
import icon from "../../../assets/bowlicon.png";

const LoadingPages = () => {
  return (
    <div className="page-load-container">
      <div className="page-load-img">
        <img src={icon} />
      </div>
      <div className="page-load-txt">
        <p className="p1">L</p>
        <p className="p2">o</p>
        <p className="p3">a</p>
        <p className="p4">d</p>
        <p className="p5">i</p>
        <p className="p6">n</p>
        <p className="p7">g</p>
      </div>
    </div>
  );
};

export default LoadingPages;
