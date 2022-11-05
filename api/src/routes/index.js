const { Router } = require("express");
// Importar todos los routers;
const routerRecipes = require("./Routers/routerRecipes");
const routerDiets = require("./Routers/routerDiets");
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", routerRecipes);
router.use("/diets", routerDiets);

module.exports = router;
