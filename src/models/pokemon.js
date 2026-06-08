const validTypes = [
  "Feu",
  "Eau",
  "Plante",
  "Poison",
  "Fée",
  "Psy",
  "Vol",
  "Insecte",
  "Roche",
  "Acier",
  "Tenebres",
  "Combat",
  "Normal",
  "Glace",
  "Dragon",
  "Spectre",
  "Sol",
];
/**
 *
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import("sequelize").DataTypes} DataTypes
 * @returns
 *
 * @description
 * Cette fonction crée un modèle Pokemon dans la base de données.
 * Elle définit les colonnes de la table pokemon et les options de synchronisation.
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
          msg: "Le nom doit être unique",
        },
        validate: {
          max: {
            args: [10],
            msg: "La taille du nom ne doit faire que 10 caractères",
          },
          notEmpty: { msg: "le nom ne peut pas être vide" },
          notNull: { msg: "le nom est obligatoire" },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          max: {
            args: [999],
            msg: "Les poinst de vie doivent être à l'intervalle de 0 à 999",
          },
          min: {
            args: [0],
            msg: "Les poinst HP doivent être à l'intervalle de 0 à 999",
          },
          isInt: { msg: "Les points doivent être des entiers" },
          notNull: { msg: "les points de vie sont obligatoire" },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          max: {
            args: [99],
            msg: "Les poinst de dégâts doivent être à l'intervalle de 0 à 99",
          },
          min: {
            args: [0],
            msg: "Les poinst CP doivent être à l'intervalle de 0 à 99",
          },
          isInt: { msg: "Les points doivent être des entiers" },
          notNull: { msg: "les points de combat sont obligatoire" },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: "L'URL de l'image est invalide" },
          notNull: { msg: "l'image est obligatoire" },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "le type est obligatoire" },
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
            throw new Error("Un pokémon doit avoir un type !");
          }
          if (value.split(",").length > 3) {
            throw new Error("Un pokémon ne peut avoir que 3 types maximum !");
          }
          value.split(",").forEach((element) => {
            if (!validTypes.includes(element)) {
              throw new Error("Le type du pokémon est invalide !");
            }
          });
        },
      },
    },
    {
      timestamps: true, //ajoute les colonnes createdAt et updatedAt
      createdAt: "created",
      updatedAt: false,
    },
  );
};
