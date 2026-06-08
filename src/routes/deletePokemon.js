const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.delete("/api/pokemons/:id", async (req, res) => {
    await Pokemon.findByPk(req.params.id).then(async (pokemon) => {
      if (!pokemon) {
        return res
          .status(404)
          .json({ message: "Le pokémon demandé n'existe pas." });
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
              .json({ message: "Le pokémon demandé n'existe pas." });
          }
          res.json({
            message: `Le pokémon avec l'id  n°${pokemonDeleted.id} a bien été supprimé.`,
            data: pokemonDeleted,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message:
              "le pokmémon n'a pas pu être supprimé. Réessayez dans quelques instants.",
            data: error,
          });
        });
    });
  });
};
