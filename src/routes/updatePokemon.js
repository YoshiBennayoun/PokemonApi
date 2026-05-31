const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.put("/api/pokemons/:id", async (req, res) => {
    await Pokemon.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then((_) => {
        Pokemon.findByPk(req.params.id).then((pokemon) => {
          res.json({
            message: `Le pokémon avec l'id ${req.params.id}-${pokemon.name} a bien été modifié.`,
            data: pokemon,
          });
        });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  });
};
