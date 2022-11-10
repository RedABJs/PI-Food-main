import React from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../redux/actions/actions";

const FilterButons = ({
  recipes,
  currentPage,
  displayRecipes,
  limitRecipes,
}) => {
  //Hooks
  const dispatch = useDispatch();

  // Functions
  const onClick = (e) => {
    e.target.name == "plus"
      ? dispatch(actions.incrementCp())
      : dispatch(actions.decrementCp());
  };

  //  consts
  const pageNumbers = new Array(recipes.length / limitRecipes).fill(1);

  return (
    <div>
      <button name="less" onClick={onClick} disabled={currentPage <= 0}>
        {"<"}
      </button>
      {pageNumbers.map((el, idx) => (
        <button name={idx}>{idx}</button>
      ))}
      <button
        name="plus"
        onClick={onClick}
        disabled={displayRecipes.length * currentPage >= recipes.length}
      >
        {">"}
      </button>
    </div>
  );
};

export default FilterButons;
