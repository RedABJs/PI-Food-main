const { Diet, Recipe, Op } = require("../../db");
const { API_KEY } = process.env;
const { fetch } = require("cross-fetch");

const postRecipe = async (properties) => {
  const { name, summary, health_score, steps, diets } = properties;

  if (!name || !summary || !diets) throw new Error("Error, insufficient data");
  try {
    const newR = await Recipe.create({
      name,
      summary,
      health_score,
      steps,
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
        };
      });

      // Uniendo los valores en una sola constante para retornar

      const allRecipes = [...recipes, ...apiRecipes];
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

      search = {
        name: search.name,
        ID: search.ID,
        summary: search.summary,
        health_score: search.health_score,
        steps: search.steps,
        diets: search.diets.map((dt) => dt.name),
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

      search = {
        name: search.name,
        ID: search.ID,
        summary: search.summary,
        health_score: search.health_score,
        steps: search.steps,
        diets: search.diets.map((dt) => dt.name),
      };

      return search;
    }
  } catch (error) {
    if (error.message == "ID not specified") throw error;
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
  postRecipe,
  getRecipes,
  getRecipesComplex,
  getDiets,
};
