const express = require("express");

const routerDiets = express.Router();

routerDiets.get("/", (req, res) => {
  // Código aqí
  // Obtener todos los tipos de dieta posibles
  // En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá
});

module.exports = routerDiets;
