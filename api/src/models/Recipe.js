const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue(
            "name",
            value
              .split("")
              .map((let) => let.toLowerCase())
              .join("")
          );
        },
        get() {
          let value = this.getDataValue("name");
          return value
            .split(" ")
            .map((el) =>
              el
                .split("")
                .map((let, idx) => (idx == 0 ? let.toUpperCase() : let))
                .join("")
            )
            .join(" ");
        },
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      healt_score: {
        type: DataTypes.FLOAT,
      },
      steps: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};