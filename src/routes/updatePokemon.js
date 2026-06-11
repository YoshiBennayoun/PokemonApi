const { ValidationError } = require("sequelize");
const { Pokemon } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.put("/api/pokemons/:id",auth, async (req, res) => {
    await Pokemon.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then((_) => {
        return Pokemon.findByPk(req.params.id).then((pokemon) => {
          if (!pokemon) {
            return res.status(404).json({
              message:
                "The pokemon does not exist. Please try with another identifier",
            });
          }
          res.json({
            message: `The pokemon ${pokemon.name} has been successfully modified.`,
            data: pokemon,
          });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        res
          .status(500)
          .json({ message: "The pokemon could not be modified", data: error });
      });
  });
};
