import React, { useState } from "react";
import "./FilterForm.css"

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions/actions";


const FilterForm = () => {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);

  const [form, setForm] = useState({
    limit: 0,
    diet: "",
    order: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.filterRecipes(form));
  };

  return (
      <form className="form-container" onSubmit={onSubmit}>
        <label className="custom-selector" htmlFor="limit">Show: 
          <select name="limit" onChange={handleChange} value={form.limit}>
            <option className="select-item" value={""}>--Show--</option>
            <option className="select-item" value={5}>5</option>
            <option className="select-item" value={10}>10</option>
            <option className="select-item" value={20}>20</option>
          </select>
        </label>
        <label className="custom-selector" htmlFor="diet">Diets: 
          <select name="diet" onChange={handleChange} value={form.diet}>
            <option value="">--Diets--</option>
            {diets.map((diet) => (
              <option key={`OpD${diet.name}`} value={diet.name}>
                {diet.name}
              </option>
            ))}
          </select>
        </label>
        <label className="custom-selector" htmlFor="order">Order: 
          <select name="order" onChange={handleChange} value={form.order}>
            <option value="">--Order--</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
            <option value="health">Health Score</option>
          </select>
        </label>
        <button>Filter</button>
      </form>
  );
};

export default FilterForm;
