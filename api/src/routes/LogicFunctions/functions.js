const { Diet, Recipe, Op } = require("../../db");
const { API_KEY } = process.env;
const { fetch } = require("cross-fetch");

const updateRecipe = async (id, body) => {
  const { name, summary, health_score, diets, steps } = body;

  let setterObj = {};

  try {
    const selectedRecipeforDiets = await Recipe.findByPk(id);

    if (!selectedRecipeforDiets) throw new Error("Recipe not found");

    if (diets) {
      const foundDiets = await Diet.findAll({
        where: {
          name: [...diets],
        },
      });

      await selectedRecipeforDiets.setDiets(foundDiets);
    }
    let selectedRecipe = await Recipe.findByPk(id, {
      include: [
        {
          model: Diet,
          through: { attributes: [] },
        },
      ],
    });

    if (!selectedRecipe) throw new Error("Recipe not found");
    if (name) setterObj = { ...setterObj, name: name };
    if (summary) setterObj = { ...setterObj, summary: summary };
    if (health_score) setterObj = { ...setterObj, health_score: health_score };
    if (steps) setterObj = { ...setterObj, steps: steps };

    selectedRecipe.set(setterObj);

    await selectedRecipe.save();

    selectedRecipe = {
      name: selectedRecipe.name,
      ID: selectedRecipe.ID,
      summary: selectedRecipe.summary,
      health_score: selectedRecipe.health_score,
      steps: selectedRecipe.steps,
      diets: selectedRecipe.diets.map((dt) => dt.name),
    };

    return selectedRecipe;
  } catch (error) {
    throw error;
  }
};

const deleteRecipe = async (id) => {
  try {
    if (!id) throw new Error("Id not specified");

    const selectedRecipe = await Recipe.findByPk(id);

    if (!selectedRecipe) throw new Error("Recipe not found");
    else {
      await selectedRecipe.destroy();
      return "Done";
    }
  } catch (error) {
    throw error;
  }
};

const postRecipe = async (properties) => {
  const { name, summary, health_score, steps, diets, image } = properties;

  if (!name || !summary || !diets) throw new Error("Insufficient data");
  try {
    const newR = await Recipe.create({
      name,
      summary,
      health_score,
      steps,
      image,
    });
    let promises = diets.map((diet) =>
      Diet.findOrCreate({
        where: {
          name: diet.toLowerCase(),
        },
        default: { name: diet.toLowerCase() },
      }).then(([dt, created]) => dt)
    );

    let createdDiets = await Promise.all(promises);

    await newR.addDiets(createdDiets);
    return newR;
  } catch (error) {
    throw error;
  }
};

const getOwnRecipes = async () => {
  try {
    let recipes = await Recipe.findAll({
      include: [
        {
          model: Diet,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });

    if (recipes.length === 0) throw new Error("Recipes not Found");

    recipes = recipes.map((rec) => {
      return {
        name: rec.name,
        ID: rec.ID,
        summary: rec.summary,
        health_score: rec.health_score,
        steps: rec.steps,
        diets: rec.diets.map((dt) => dt.name),
        image: rec.image,
      };
    });
    return recipes;
  } catch (error) {
    throw error;
  }
};

const getRecipes = async (name) => {
  try {
    if (name) {
      name = name.toLowerCase().trim();

      // Buscando y editando los valores de la BD

      let recipe = await Recipe.findAll({
        where: {
          name: {
            [Op.substring]: name,
          },
        },
        include: {
          model: Diet,
          attributes: ["name"],
          through: { attributes: [] },
        },
      });

      recipe = recipe.map((rec) => {
        return {
          name: rec.name,
          ID: rec.ID,
          summary: rec.summary,
          health_score: rec.health_score,
          steps: rec.steps,
          diets: rec.diets.map((dt) => dt.name),
          image: rec.image,
        };
      });

      // Buscando y editando los valores de la API

      let apiRecipes = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`
      ).then((res) => res.json());

      apiRecipes = apiRecipes.results
        .map((rec) => {
          return {
            ID: rec.id,
            name: rec.title,
            summary: rec.summary,
            health_score: rec.healthScore,
            image: rec.image,
            diets: rec.diets,
            steps: [...rec.analyzedInstructions]
              .map((x) => x.steps)
              .flat()
              .map((st) => {
                return {
                  number: st.number,
                  step: st.step,
                };
              }),
          };
        })
        .filter((rec) => rec.name.toLowerCase().includes(name.toLowerCase()));

      // Crear las dietas en la BD

      let apiDiets = apiRecipes
        .map((dt) => dt.diets)
        .flat()
        .reduce((ac, a) => {
          if (ac.includes(a)) return ac;
          else {
            ac.push(a);
            return ac;
          }
        }, []);

      let promises = apiDiets.map((diet) =>
        Diet.findOrCreate({
          where: {
            name: diet.toLowerCase(),
          },
          default: { name: diet.toLowerCase() },
        }).then(([dt, created]) => dt)
      );

      await Promise.all(promises);

      // Uniendo las dos busquedas en una sola variable

      const allRecipes = [...recipe, ...apiRecipes];

      if (allRecipes.length == 0) throw new Error(`${name} didn't found`);

      return allRecipes;
    } else {
      // Buscando y editando los valores de la API

      let apiRecipes = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`
      ).then((res) => res.json());

      apiRecipes = apiRecipes.results.map((rec) => {
        return {
          ID: rec.id,
          name: rec.title,
          summary: rec.summary,
          health_score: rec.healthScore,
          image: rec.image,
          diets: rec.diets,
          steps: [...rec.analyzedInstructions]
            .map((x) => x.steps)
            .flat()
            .map((st) => {
              return {
                number: st.number,
                step: st.step,
              };
            }),
        };
      });

      // Crear las dietas en la BD

      let apiDiets = apiRecipes
        .map((dt) => dt.diets)
        .flat()
        .reduce((ac, a) => {
          if (ac.includes(a)) return ac;
          else {
            ac.push(a);
            return ac;
          }
        }, []);

      let promises = apiDiets.map((diet) =>
        Diet.findOrCreate({
          where: {
            name: diet.toLowerCase(),
          },
          default: { name: diet.toLowerCase() },
        }).then(([dt, created]) => dt)
      );

      await Promise.all(promises);

      // Buscando y editando los valores de la BD

      let recipes = await Recipe.findAll({
        include: [
          {
            model: Diet,
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
      });

      recipes = recipes.map((rec) => {
        return {
          name: rec.name,
          ID: rec.ID,
          summary: rec.summary,
          health_score: rec.health_score,
          steps: rec.steps,
          diets: rec.diets.map((dt) => dt.name),
          image: rec.image,
        };
      });

      // Uniendo los valores en una sola constante para retornar

      const allRecipes = [...recipes, ...apiRecipes];

      if (allRecipes.length == 0) throw new Error(`Recipes not found`);

      return allRecipes;
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
      let search = await Recipe.findByPk(ID, {
        attributes: attributes,
        include: [
          {
            model: Diet,
            through: { attributes: [] },
          },
        ],
      });

      if (!search) throw new Error("Recipe not found");

      search = {
        name: search.name,
        ID: search.ID,
        summary: search.summary,
        health_score: search.health_score,
        steps: search.steps,
        diets: search.diets.map((dt) => dt.name),
        image: search.image,
      };

      return search;
    } else {
      let search = await Recipe.findByPk(ID, {
        include: [
          {
            model: Diet,
            through: { attributes: [] },
          },
        ],
      });

      if (!search) throw new Error("Recipe not found");

      search = {
        name: search.name,
        ID: search.ID,
        summary: search.summary,
        health_score: search.health_score,
        steps: search.steps,
        diets: search.diets.map((dt) => dt.name),
        image: search.image,
      };

      return search;
    }
  } catch (error) {
    if (
      error.message === "ID not specified" ||
      error.message === "Recipe not found"
    )
      throw error;
    else {
      try {
        let apiSearch = await fetch(
          `https://api.spoonacular.com/recipes/${ID}/information?apiKey=${API_KEY}`
        ).then((res) => res.json());

        apiSearch = {
          ID: apiSearch.id,
          name: apiSearch.title,
          summary: apiSearch.summary,
          health_score: apiSearch.healthScore,
          image: apiSearch.image,
          diets: apiSearch.diets,
          steps: [...apiSearch.analyzedInstructions]
            .map((x) => x.steps)
            .flat()
            .map((st) => {
              return {
                number: st.number,
                step: st.step,
              };
            }),
        };

        let attributes = Object.keys(querys);
        if (attributes.length > 0) {
          let ans = { diets: apiSearch.diets };
          attributes.forEach((el) => {
            ans[el] = apiSearch[el];
          });
          return ans;
        }

        return apiSearch;
      } catch (error) {
        throw error;
      }
    }
  }
};

const getDiets = async () => {
  const dietsInitial = [
    "gluten free",
    "ketogenic",
    "vegetarian",
    "lacto-vegetarian",
    "ovo-vegetarian",
    "vegan",
    "pescetarian",
    "paleo",
    "primal",
    "low fodmap",
    "whole 30",
  ].map((name, idx) => {
    return { name: name };
  });
  try {
    let diets = await Diet.findAll();
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
  getOwnRecipes,
  updateRecipe,
  deleteRecipe,
  postRecipe,
  getRecipes,
  getRecipesComplex,
  getDiets,
};
