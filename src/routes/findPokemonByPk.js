const auth = require("../auth/auth");
const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/api/pokemons/:id",auth, async (req, res) => {
    const id = req.params.id;
    await Pokemon.findByPk(id)
      .then((pokemon) => {
        if (!pokemon) {
          return res.status(404).json({ message: "The pokemon does not exist" });
        }
        res.json({
          message: `Here is the pokemon ${pokemon.name}`,
          data: pokemon,
        });
      })
      
  });
};
