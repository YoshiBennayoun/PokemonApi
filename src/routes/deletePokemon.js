const { Pokemon } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.delete("/api/pokemons/:id", auth, async (req, res) => {
    await Pokemon.findByPk(req.params.id).then(async (pokemon) => {
      if (!pokemon) {
        return res
          .status(404)
          .json({ message: "The pokemon you are looking for does not exist." });
      }
      const pokemonDeleted = pokemon;
      await Pokemon.destroy({
        where: {
          id: pokemon.id,
        },
      })
        .then(() => {
          if (!pokemonDeleted) {
            return res
              .status(404)
              .json({ message: "The pokemon you are looking for does not exist." });
          }
          res.json({
            message: `The pokemon with id n°${pokemonDeleted.id} has been successfully deleted.`,
            data: pokemonDeleted,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message:
              "The pokemon could not be deleted. Please try again in a few moments.",
            data: error,
          });
        });
    });
  });
};
