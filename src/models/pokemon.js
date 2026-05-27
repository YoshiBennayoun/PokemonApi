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
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true, //ajoute les colonnes createdAt et updatedAt
      createdAt: "created",
      updatedAt: false,
    },
  );
};
