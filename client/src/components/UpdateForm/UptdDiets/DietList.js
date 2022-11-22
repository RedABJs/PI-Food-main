import React, { useEffect } from "react";

const DietList = ({ diets }) => {
  return (
    <p>
      {diets.map((dt, idx, ar) => (
        <>{` ${dt}${idx === ar.length - 1 ? "." : ","}`}</>
      ))}
    </p>
  );
};

export default DietList;
