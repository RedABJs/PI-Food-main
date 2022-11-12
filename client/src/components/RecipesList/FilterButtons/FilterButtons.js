import React from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../redux/actions/actions";

const FilterButons = ({
  filteredRecipes,
  currentPage,
  displayRecipes,
  limitRecipes,
}) => {
  // //Hooks

  const dispatch = useDispatch();

  // Functions
  const onClick = (e) => {
    e.target.name == "plus"
      ? dispatch(actions.incrementCp())
      : dispatch(actions.decrementCp());
  };

  const onPageCLick = (e) => {
    dispatch(actions.updateCp(e.target.name));
  };

  //  consts
  const pageNumbers = new Array(
    Math.ceil(filteredRecipes.length / limitRecipes)
  ).fill(1);

  return (
    <div>
      <button name="less" onClick={onClick} disabled={currentPage <= 0}>
        {"<"}
      </button>
      {pageNumbers.map((el, idx) => (
        <button key={`pageB${idx}`} name={idx} onClick={onPageCLick}>
          {idx + 1}
        </button>
      ))}
      <button
        name="plus"
        onClick={onClick}
        disabled={
          displayRecipes.length * currentPage + limitRecipes >=
          filteredRecipes.length
        }
      >
        {">"}
      </button>
    </div>
  );
};

export default FilterButons;
