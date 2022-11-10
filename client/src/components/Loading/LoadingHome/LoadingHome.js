import React from "react";
import "./LoadingHome.css";

import gif1 from "../../../assets/giphy_1.gif";
import gif2 from "../../../assets/giphy_2.gif";
import gif3 from "../../../assets/giphy_3.gif";
import gif4 from "../../../assets/giphy_4.gif";

const gifs = [gif1, gif2, gif3, gif4];

const LoadingHome = () => {
  const randomGif = Math.floor(Math.random() * 4);
  return (
    <div className="loader-home">
      <img src={gifs[randomGif]} alt="giphy" />
      <div className="loader-home-text"></div>
    </div>
  );
};

export default LoadingHome;
