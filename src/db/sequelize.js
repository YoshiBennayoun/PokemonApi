require("dotenv/config");
const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
const UserModel = require("../models/user");
const pokemons = require("./mock-pokemon");
const bcrypt = require("bcrypt");

const dbname = process.env.MYSQLDATABASE;
const dbuser = process.env.MYSQLUSER;
const dbpassword = process.env.MYSQLPASSWORD;
const dbhost = process.env.MYSQLHOST;


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
 * @type {import('sequelize').ModelStatic<import('../models/user').User>}
 */
const User = UserModel(sequelize, DataTypes);
/**
 * Initialise la base de données en créant les tables et en insérant les données mockées
 * @type {() => Promise<void>}
 * @returns {Promise<void>}
 */
const initDb = async () => {
  await sequelize.sync({force: true });
  console.log("Init Db");

  pokemons.map((pokemon) => {
    Pokemon.create({
      name: pokemon.name,
      hp: pokemon.hp,
      cp: pokemon.cp,
      picture: pokemon.picture,
      types: pokemon.types,
    }).then((pokemon) => console.log(pokemon.toJSON()));
  }); 
  console.log("Database initialized!");
  User.create({
    username: "orssi",
    password: await bcrypt.hash("admin", 12),
  }).then((user) => console.log(user.toJSON()));
};

module.exports = {
  initDb,
  Pokemon,
  User,
};
