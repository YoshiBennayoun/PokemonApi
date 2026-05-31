const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/api/pokemons/:id", async (req, res) => {
    const id = req.params.id;
    await Pokemon.findByPk(id).then((pokemon) => {
      res.json({
        message: `voici le pokemon ${pokemon.name}`,
        data: pokemon,
      });
    });
  });
};
