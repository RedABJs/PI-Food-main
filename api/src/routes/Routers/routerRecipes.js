const express = require("express");

const routerRecipes = express.Router();

routerRecipes.post("/", (req, res) => {
  //Código aquí
  // Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
  // Crea una receta en la base de datos relacionada con sus tipos de dietas
});

routerRecipes.get("/", (req, res) => {
  //Código aquí:
  // Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
  // Si no existe ninguna receta mostrar un mensaje adecuado
});

routerRecipes.get("/:idReceta", (req, res) => {
  // Código aquí
  // Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
  // Crea una receta en la base de datos relacionada con sus tipos de dietas
});

module.exports = routerRecipes;
