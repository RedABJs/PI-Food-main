const { Recipe, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Recipe model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Recipe.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should not work when theres not a summary", async () => {
        try {
          const newRecipe = await Recipe.create({
            name: "Milanesa a la napolitana",
          });
        } catch (e) {
          expect(e.message).equal(
            "notNull Violation: recipe.summary cannot be null"
          );
        }
      });
      it("Should have a default image", async () => {
        const newRec = await Recipe.create({
          name: "Milanesa a la napolitana",
          summary: "Domi sol do sol mi do",
        });
        expect(newRec.image).to.equal(
          "https://cdn.dribbble.com/users/2460221/screenshots/8429684/media/225b2f10d124b2024b90a8e2348a78ee.jpg?compress=1&resize=400x300"
        );
      });
    });
  });
});
