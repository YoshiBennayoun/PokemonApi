const validTypes = [
  "Fire",
  "Water",
  "Grass",
  "Poison",
  "Fairy",
  "Psychic",
  "Flying",
  "Bug",
  "Rock",
  "Steel",
  "Dark",
  "Fighting",
  "Normal",
  "Ice",
  "Dragon",
  "Ghost",
  "Ground",
];
/**
 *
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import("sequelize").DataTypes} DataTypes
 * @returns
 *
 * @description
 * This function creates a Pokemon model in the database.
 * It defines the columns of the pokemon table and the synchronization options.
 *
 * @example
 * const Pokemon = sequelize.define("user", {
 *   id: {
 *     type: DataTypes.INTEGER,
 *     primaryKey: true,
 *     autoIncrement: true,
 *   },
 *   name: {
 *     type: DataTypes.STRING,
 *     allowNull: false,
 *   },
 *   picture: {
 *     type: DataTypes.STRING,
 *     allowNull: false,
 *   },
 *   types: {
 *     type: DataTypes.STRING,
 *     allowNull: false,
 *   }
 * },{
 *   timestamps: true,//ajoute les colonnes createdAt et updatedAt
 *   createdAt: "created",
 *   updatedAt: false,
 * });
 */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "the name must be unique",
        },
        validate: {
          max: {
            args: [10],
            msg: "The name size must be 10 characters long",
          },
          notEmpty: { msg: "The name cannot be empty" },
          notNull: { msg: "The name is required" },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          max: {
            args: [999],
            msg: "The health points must be in the interval of 0 to 999",
          },
          min: {
            args: [0],
            msg: "The HP points must be in the interval of 0 to 999",
          },
          isInt: { msg: "The points must be integers" },
          notNull: { msg: "The health points are required" },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          max: {
            args: [99],
            msg: "The damage points must be in the interval of 0 to 99",
          },
          min: {
            args: [0],
            msg: "The CP points must be in the interval of 0 to 99",
          },
          isInt: { msg: "The points must be integers" },
          notNull: { msg: "The combat points are required" },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: "The image URL is invalid" },
          notNull: { msg: "The image is required" },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "The type is required" },
        },
        get() {
          return this.getDataValue("types")?.split(",") || [];
        },
        set(types) {
          this.setDataValue(
            "types",
            Array.isArray(types) ? types.join(",") : types,
          );
        },

        isTypesValid(value) {
          if (!value) {
            throw new Error("A pokemon must have a type !");
          }
          if (value.split(",").length > 3) {
            throw new Error("A pokemon can have only 3 types maximum !");
          }
          value.split(",").forEach((element) => {
            if (!validTypes.includes(element)) {
              throw new Error("The type of the pokemon is invalid !");
            }
          });
        },
      },
    },
    {
      timestamps: true, //Add created and updatedAt columns
      createdAt: "created",
      updatedAt: false,
    },
  );
};
