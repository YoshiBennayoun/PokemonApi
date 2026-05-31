require("dotenv/config");
const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
const pokemons = require("./mock-pokemon");

const dbname = process.env.DB_NAME;
const dbuser = process.env.DB_USER;
const dbpassword = process.env.DB_PASSWORD;
const dbhost = process.env.DB_HOST;

const sequelize = new Sequelize(dbname, dbuser, dbpassword, {
  host: dbhost,
  dialect: "mariadb",
  timezone: "+02:00",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

/**
 * @type {import('sequelize').ModelStatic<import('../models/pokemon').Pokemon>}
 */
const Pokemon = PokemonModel(sequelize, DataTypes);

/**
 * Initialise la base de données en créant les tables et en insérant les données mockées
 * @type {() => Promise<void>}
 * @returns {Promise<void>}
 */
const initDb = async () => {
  await sequelize.sync({ force: true });
  pokemons.map((pokemon) => {
    Pokemon.create({
      name: pokemon.name,
      hp: pokemon.hp,
      cp: pokemon.cp,
      picture: pokemon.picture,
      types: pokemon.types,
    }).then((pokemon) => console.log(pokemon.toJSON()));
  });
  console.log("La base de donnée a bien été initialisée !");
};

module.exports = {
  initDb,
  Pokemon,
};
