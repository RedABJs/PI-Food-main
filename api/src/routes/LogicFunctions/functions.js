const { Diet, Recipe, Op } = require("../../db");

const postRecipe = async (querys) => {
  const { name, summary, healt_score, steps } = querys;

  if (!name || !summary) throw new Error("Error, insufficient data");
  try {
    const newR = await Recipe.create({
      name,
      summary,
      healt_score,
      steps,
    });
    return newR;
  } catch (error) {
    throw error;
  }
};
const postRecipePrueba = async (querys) => {
  const { name, summary, healt_score, steps, diets } = querys;

  if (!name || !summary) throw new Error("Error, insufficient data");
  try {
    const newR = await Recipe.create({
      name,
      summary,
      healt_score,
      steps,
    });

    // Hasta ahora Diets tiene que tener strings iguales

    const fDiets = await Diet.findAll({
      where: {
        name: {
          [Op.or]: [...diets],
        },
      },
    });
    await newR.setDiets(fDiets);

    return newR;
  } catch (error) {
    throw error;
  }
};

const getPrueba = async () => {
  try {
    const all = await Recipe.findAll({
      include: [
        {
          model: Diet,
          through: { attributes: [] },
        },
      ],
    });
    return all;
  } catch (error) {
    throw error;
  }
};

const getRecipes = async (name) => {
  try {
    if (name) {
      name = name.toLowerCase().trim();
      const recipe = await Recipe.findAll({
        where: {
          name: {
            [Op.substring]: name,
          },
        },
      });
      if (recipe.length == 0) throw new Error(`${name} didn't found`);
      return recipe;
    } else {
      const recipes = await Recipe.findAll();
      return recipes;
    }
  } catch (error) {
    throw error;
  }
};

const getRecipesComplex = async (ID, querys) => {
  try {
    if (!ID) throw new Error("ID not specified");
    let attributes = Object.keys(querys);
    if (attributes.length > 0) {
      const search = await Recipe.findByPk(ID, {
        attributes: attributes,
      });
      return search;
    } else {
      const search = await Recipe.findByPk(ID);
      return search;
    }
  } catch (error) {
    throw error;
  }
};

const getDiets = async () => {
  const dietsInitial = [
    "Gluten Free",
    "Ketegonic",
    "Vegetarian",
    "Lacto-Vegetarian",
    "Ovo-Vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Primal",
    "Low FODMAP",
    "Whole30",
  ].map((name, idx) => {
    return { name: name };
  });
  try {
    let diets = Diet.findAll();
    if (diets.length > 0) return diets;
    else {
      diets = await Diet.bulkCreate(dietsInitial);
      return diets;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  postRecipe,
  getRecipes,
  getRecipesComplex,
  getDiets,
  postRecipePrueba,
  getPrueba,
};
