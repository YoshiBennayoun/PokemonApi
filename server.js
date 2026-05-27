require("dotenv/config");
const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const pokemonModel = require("./src/models/pokemon");
let pokemons = require("./data.js");
const morgan = require("morgan");
const favicon = require("serve-favicon");

const app = express();
const port = process.env.PORT;
const dbname = process.env.DB_NAME;
const dbuser = process.env.DB_USER;
const dbpassword = process.env.DB_PASSWORD;
const dbhost = process.env.DB_HOST;
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(favicon(__dirname + "/public/favicon.svg"));
// db configuration

const sequelize = new Sequelize(dbname, dbuser, dbpassword, {
  host: dbhost,
  dialect: "mariadb",
  timezone: "+02:00",
  logging: false,
});

sequelize
  .authenticate()
  .then((_) =>
    console.log(
      "\x1b[42m\nLa Connexion à la base de donnéez a bien été établie.\x1b[0m",
    ),
  )
  .catch((error) =>
    console.error(
      "\x1b[41m\nImpossible de se connecter à la base de donées\x1b[0m",
      error,
    ),
  );

// création du modèle sequelize
const Pokemon = pokemonModel(sequelize, DataTypes);

sequelize.sync({ force: true }).then(() => {
  console.log("La base de données a été synchronisée.");
  pokemons.map((pokemon) => {
    Pokemon.create({
      name: pokemon.name,
      hp: pokemon.hp,
      cp: pokemon.cp,
      picture: pokemon.picture,
      types: pokemon.types.join(),
    }).then((pokemon) => {
      console.log(pokemon.toJSON());
    });
  });
});

app.get("/pokemons", (req, res) => {
  res.send({ message: "voici la liste complète des pokémons", data: pokemons });
});

app.get("/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const pokemon = pokemons.find((pokemon) => pokemon.id == id);
  res.send({ message: `voici le pokémon ${pokemon.name}`, data: pokemon });
});
app.post("/pokemons", (req, res) => {
  const NewPokemon = {
    id: pokemons.length + 1,
    ...req.body,
    created: new Date(),
  };
  pokemons.push(NewPokemon);
  res.send({
    message: "Pokémon ajouté avec succès",
    data: NewPokemon,
  });
});

app.put("/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let pokemon = pokemons.find((pokemon) => pokemon.id === id);
  const pokemonUpdate = { ...req.body, ...{ id, updateAt: new Date() } };
  pokemons = pokemons.map((pokemon) => {
    return pokemon.id === id ? pokemonUpdate : pokemon;
  });
  console.log();

  res.send({
    message: `pokemon N°${id} modifié avec succès`,
    data: pokemons,
  });
});

app.delete("/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonDeleted = pokemons.find((pokemon) => pokemon.id === id);
  pokemons = pokemons.filter((pokemon) => pokemon.id !== id);
  console.log(pokemons);

  res.send({ msg: "pokemon delete", data: pokemonDeleted.name });
});

app.listen(port, () => {
  console.log(`
\x1b[93m\x1b[3m
╔══════════════════════════════════════╗
║         ⚡ ExpressJS Server ⚡       ║
╚══════════════════════════════════════╝
\x1b[0m

\x1b[36m➜ Server running on port:\x1b[0m \x1b[33m${port}\x1b[0m
\x1b[32m➜ Local:\x1b[0m \x1b[4mhttp://localhost:${port}\x1b[0m`);
});
