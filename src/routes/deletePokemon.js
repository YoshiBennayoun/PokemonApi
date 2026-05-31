const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.delete("/api/pokemons/:id", async (req, res) => {
    await Pokemon.findByPk(req.params.id).then(async (pokemon) => {
      const pokemonDeleted = pokemon;
      await Pokemon.destroy({
        where: {
          id: req.params.id,
        },
      }).then(() => {
        res.json({
          message: "Le pokémon" + pokemonDeleted.name + " a bien été supprimé.",
          data: pokemonDeleted,
        });
      }).catch((error) => {
        res.status(500).json({ message: error.message });
      });
    });
  });
};
