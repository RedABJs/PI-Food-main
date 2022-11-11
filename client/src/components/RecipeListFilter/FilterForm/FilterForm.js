import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions/actions";

const FilterForm = () => {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);

  useEffect(() => {
    dispatch(actions.getDiets());
  }, []);

  const dispatchChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  return (
    <div>
      <form>
        <label htmlFor="diets-selec">Diets: </label>
        <select name="diet-selec" onChange={dispatchChange}>
          <option value="">--Diets--</option>
          {diets.map((diet) => (
            <option key={`OpD${diet.name}`} value={diet.name}>
              {diet.name}
            </option>
          ))}
        </select>
        <label htmlFor="order-select">Order: </label>
        <select name="order-select" onChange={dispatchChange}>
          <option value="">--Order--</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
      </form>
    </div>
  );
};

export default FilterForm;
