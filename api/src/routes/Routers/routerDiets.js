const express = require("express");
const Functions = require("../LogicFunctions/functions");

const routerDiets = express.Router();

routerDiets.get("/", async (req, res) => {
  // Código aqí
  // Obtener todos los tipos de dieta posibles
  // En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá
  try {
    const diets = await Functions.getDiets();
    res.status(200).json(diets);
  } catch (error) {
    console.log(error)
    res.status(404).json(error.message || error);
  }
});

module.exports = routerDiets;
