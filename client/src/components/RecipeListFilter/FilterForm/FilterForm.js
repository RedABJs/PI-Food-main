import React, { useState } from "react";
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
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="limit">Show: </label>
        <select name="limit" onChange={handleChange} value={form.limit}>
          <option value={""}>--Show--</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        <label htmlFor="diet">Diets: </label>
        <select name="diet" onChange={handleChange} value={form.diet}>
          <option value="">--Diets--</option>
          {diets.map((diet) => (
            <option key={`OpD${diet.name}`} value={diet.name}>
              {diet.name}
            </option>
          ))}
        </select>
        <label htmlFor="order">Order: </label>
        <select name="order" onChange={handleChange} value={form.order}>
          <option value="">--Order--</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="health">Health Score</option>
        </select>
        <button>Aplicar</button>
      </form>
    </div>
  );
};

export default FilterForm;
