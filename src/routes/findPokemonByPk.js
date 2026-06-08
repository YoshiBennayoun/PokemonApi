const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/api/pokemons/:id", async (req, res) => {
    const id = req.params.id;
    await Pokemon.findByPk(id)
      .then((pokemon) => {
        if (!pokemon) {
          return res.status(404).json({ message: "Le pokemon n'existe pas" });
        }
        res.json({
          message: `voici le pokemon ${pokemon.name}`,
          data: pokemon,
        });
      })
      
  });
};
