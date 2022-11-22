const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      ID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
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
        type: DataTypes.TEXT,
        allowNull: false,
      },
      health_score: {
        type: DataTypes.INTEGER,
      },
      steps: {
        type: DataTypes.ARRAY(DataTypes.JSON),
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue:
          "https://cdn.dribbble.com/users/2460221/screenshots/8429684/media/225b2f10d124b2024b90a8e2348a78ee.jpg?compress=1&resize=400x300",
      },
    },
    {
      timestamps: false,
    }
  );
};
