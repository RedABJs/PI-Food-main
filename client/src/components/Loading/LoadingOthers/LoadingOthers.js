import React from "react";
import "./LoadingOthers.css";

const LoadingOthers = ({ small }) => {
  return <span className={`${small ? "loader-small" : "loader"}`}></span>;
};

export default LoadingOthers;
