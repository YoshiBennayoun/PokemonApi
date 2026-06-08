const { ValidationError } = require("sequelize");
const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.put("/api/pokemons/:id", async (req, res) => {
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
                "Le pokémon n'existe pas. Réessayer avec un autre identifiant",
            });
          }
          res.json({
            message: `Le pokémon ${pokemon.name} a bien été modifié.`,
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
          .json({ message: "le pokemon n'a pas pu être modifié", data: error });
      });
  });
};
