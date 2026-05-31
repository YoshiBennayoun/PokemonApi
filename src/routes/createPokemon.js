const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.post("/api/pokemons", async (req, res) => {
    await Pokemon.create(req.body)
      .then((pokemonCreated) => {
        console.log(pokemonCreated.toJSON())
        res.json({
          message: `pokemon ${pokemonCreated.name} créé avec success`,
          data: pokemonCreated,
        });
      })
      .catch((err) => {
        console.log({ err });
        res.json({ err });
      });
  });
};
