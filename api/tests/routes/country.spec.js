/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Recipe, conn } = require("../../src/db.js");

const agent = session(app);

const recipe_1 = {
  name: "Pizza napolitana",
  summary: "La pizza mas tradicional del mundo",
  diets: ["primal", "paleo"],
};
const recipe_2 = {
  name: "Asado de carne a la llanera",
  summary: "Asado de carne de chiguiro",
};
const recipe_3 = {
  name: "Milanea a la napolitana",
  summary: "corte de carne apanado al gusto",
};
const recipes = [recipe_1, recipe_2, recipe_3];

describe("Recipe routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Recipe.sync({ force: true }).then(() => Recipe.bulkCreate(recipes))
  );
  describe("GET /recipes", () => {
    it("should get 404", () => agent.get("/recipes").expect(200));

    it("should get all recipes", () =>
      agent.get("/recipes").then((res) => {
        expect(res.body).to.have.lengthOf(3);
      }));
  });
  describe("GET /recipes?name", () => {
    it("should get recipes by name", () => {
      agent.get(`/recipes?name=napolitana`).then((res) => {
        expect(res.body[0].name).equal("Milanea a la napolitana");
      });
    });

    it("should get all recipes with substring name", () => {
      agent.get("/recipes?name=napolitana").then((res) => {
        expect(res.body).to.have.lengthOf(2);
      });
    });
  });

  describe("GET /recipes complex", () => {
    it("should get 200", () =>
      agent
        .get("/recipes?name=napolitana")
        .then((res) => {
          return res.body[0].ID;
        })
        .then((ID) => agent.get(`/recipes/${ID}`).expect(200)));

    it("should get all atributes", async function () {
      const recipes = await agent
        .get("/recipes?name=napolitana")
        .then((res) => res.body);

      const fRecipe = await agent
        .get(`/recipes/${recipes[0].ID}?summary&diets&name`)
        .then((res) => res.body);

      expect(fRecipe).to.have.property("summary");
      expect(fRecipe).to.have.property("diets");
      expect(fRecipe).to.have.property("name");
    });

    it("should get the expected atribute", async () => {
      const recipe = await agent
        .get("/recipes?name=Pizza napolitana")
        .then((res) => res.body);

      const fRecipe = await agent
        .get(`/recipes/${recipe[0].ID}?name`)
        .then((res) => res.body);

      expect(fRecipe).to.have.property("name");
      expect(fRecipe.name).to.equal("Pizza Napolitana");
    });
  });

  describe("DELETE /recipes", () => {
    it("Should return 404", async () => {
      await agent.delete("/recipes").expect(404);
    });
    it("Should return 404, RECIPE NOT FOUND", async () => {
      const answer = await agent
        .delete("/recipes/1234c5e6-7b8f-91ed-ae0c-1112131415f2")
        .then((res) => res.body);
      expect(answer).to.have.property("error");
      expect(answer.error).to.equal("Recipe not found");
    });

    it("Should return 200", async () => {
      const recipes = await agent.get("/recipes").then((res) => res.body);

      const random = Math.floor(Math.random() * 3);

      await agent.delete(`/recipes/${recipes[random].ID}`).expect(200);
    });

    it("Should return {message:Done}", async () => {
      const recipes = await agent.get("/recipes").then((res) => res.body);

      const random = Math.floor(Math.random() * 3);

      const deleteFunc = await agent
        .delete(`/recipes/${recipes[random].ID}`)
        .then((res) => res.body);

      expect(deleteFunc).to.have.property("message");
      expect(deleteFunc.message).to.equal("Done");
    });
  });

  describe("PUT /recipes", () => {
    it("Should return 404", async () => {
      await agent
        .put("/recipes/1234c5e6-7b8f-91ed-ae0c-1112131415f2")
        .expect(404);
    });

    it("Should return an error message", async () => {
      const answer = await agent
        .put("/recipes/1234c5e6-7b8f-91ed-ae0c-1112131415f2")
        .then((res) => res.body);
      expect(answer).to.have.property("error");
      expect(answer.error).to.equal("Recipe not found");
    });

    it("Should return a recipe including diets", async () => {
      const recipes = await agent.get("/recipes").then((res) => res.body);

      const random = Math.floor(Math.random() * 3);

      const answer = await agent
        .put(`/recipes/${recipes[random].ID}`)
        .then((res) => res.body);

      expect(answer).to.have.property("name");
      expect(answer).to.have.property("summary");
      expect(answer).to.have.property("health_score");
      expect(answer).to.have.property("steps");
      expect(answer).to.have.property("diets");
    });

    it("Should update the recipe", async () => {
      const recipes = await agent.get("/recipes").then((res) => res.body);

      const random = Math.floor(Math.random() * 3);

      const UptdRecipe = await agent
        .put(`/recipes/${recipes[random].ID}`)
        .send({
          name: "Empanada colombiana",
          health_score: 30,
        })
        .then((res) => res.body);

      expect(UptdRecipe.name).to.equal("Empanada Colombiana");
      expect(UptdRecipe.health_score).to.equal(30);
    });

    it("Should update diets", async () => {
      const recipes = await agent.get("/recipes").then((res) => res.body);

      const random = Math.floor(Math.random() * 3);

      const UptdRecipe = await agent
        .put(`/recipes/${recipes[random].ID}`)
        .send({
          name: "Empanada colombiana",
          diets: ["paleo", "vegetarian", "primal"],
        })
        .then((res) => res.body);

      expect(UptdRecipe.name).to.equal("Empanada Colombiana");
      expect(UptdRecipe.diets).to.be.a("array");
      expect(UptdRecipe.diets).to.have.lengthOf(3);
      expect(UptdRecipe.diets.includes("paleo")).to.equal(true);
      expect(UptdRecipe.diets.includes("vegetarian")).to.equal(true);
      expect(UptdRecipe.diets.includes("primal")).to.equal(true);
    });
  });
});
