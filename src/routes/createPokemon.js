const { ValidationError, UniqueConstraintError } = require("sequelize");
const { Pokemon } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.post("/api/pokemons",auth, async (req, res) => {
    await Pokemon.create(req.body)
      .then((pokemonCreated) => {
        console.log(pokemonCreated.toJSON());
        res.json({
          message: `pokemon ${pokemonCreated.name} created successfully`,
          data: pokemonCreated,
        });
      })
      .catch((err) => {
        if (err instanceof ValidationError) {
          res.status(400).json({ message: err.message, data: err });
        } else if (err instanceof UniqueConstraintError) {
          res.status(409).json({ message: err.message, data: err });
        } else {
          res
            .status(500)
            .json({ message: "The pokemon could not be added", data: err });
        }
      });
  });
};
