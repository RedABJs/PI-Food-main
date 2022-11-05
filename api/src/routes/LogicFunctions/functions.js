const { Recipe, Op } = require("../../db");

const postRecipe = async (querys) => {
  const { ID, name, summary, healt_score, steps } = querys;

  if (!ID || !name || !summary) throw new Error("Error, insufficient data");
  try {
    const newR = Recipe.create({
      ID,
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

module.exports = {
  postRecipe,
  getRecipes,
  getRecipesComplex,
};
