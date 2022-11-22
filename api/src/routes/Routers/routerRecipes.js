const express = require("express");
const Functions = require("../LogicFunctions/functions");

const routerRecipes = express.Router();

routerRecipes.get("/own", async (req, res) => {
  try {
    const recipes = await Functions.getOwnRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(404).json({ error: error.message || error });
  }
});

routerRecipes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRecipe = await Functions.deleteRecipe(id);
    res.status(200).json({ message: deletedRecipe });
  } catch (error) {
    res.status(404).json({ error: error.message || error });
  }
});

routerRecipes.post("/", async (req, res) => {
  //Código aquí
  // Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
  // Crea una receta en la base de datos relacionada con sus tipos de dietas
  try {
    const newRecipe = await Functions.postRecipe(req.body);
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
});

routerRecipes.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRecipe = await Functions.updateRecipe(id, req.body);
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

routerRecipes.get("/", async (req, res) => {
  //Código aquí:
  // Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
  // Si no existe ninguna receta mostrar un mensaje adecuado
  const { name } = req.query;
  try {
    const search = await Functions.getRecipes(name);
    res.status(200).json(search);
  } catch (error) {
    res.status(404).send({ error: error.message || error });
  }
});

routerRecipes.get("/:idReceta", async (req, res) => {
  // Código aquí
  // Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
  // Crea una receta en la base de datos relacionada con sus tipos de dietas
  const { idReceta } = req.params;
  try {
    const search = await Functions.getRecipesComplex(idReceta, req.query);
    if (search) return res.status(200).json(search);
    throw new Error("Recipe not found");
  } catch (error) {
    res.status(404).send({ error: error.message || error });
  }
});

module.exports = routerRecipes;
