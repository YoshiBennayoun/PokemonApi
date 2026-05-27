require("dotenv/config");
const express = require("express");
let pokemons = require("./data.js");
const morgan = require("morgan");
const favicon = require("serve-favicon");

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(morgan("dev"));
// app.use(express.static("public"));
app.use(favicon(__dirname + "/public/favicon.svg"));
app.get("/", (req, res) => {
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
