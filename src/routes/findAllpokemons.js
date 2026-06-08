const { Op } = require("sequelize");
const { Pokemon } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/pokemons", auth, (req, res) => {
    const { name, limit } = req.query;
    const limitParsed = parseInt(limit);

    if (name) {
      if (name.length < 2) {
        return res.status(400).json({
          message: "Le terme de recherche doit contenir au moins 2 caractères",
        });
      }
      return Pokemon.findAndCountAll({
        where: {
          /**
           * @type {import("sequelize").WhereOptions}
           * @description proprété nom dans la table
           */
          name: {
            /**
             * @type {import("sequelize").WhereOptions}
             * @description opérateur d'égalité
             */
            [Op.like]: `%${name}%`, //query de l'url pour le filtrage
          },
        },
        /**
         * @type {import("sequelize").FindOptions}
         * @description limite le nombre de résultats
         */
        limit: limitParsed || 5,
        /**
         * @type {import("sequelize").FindOptions}
         * @description ordre des résultats
         */
        order: ["name"],
      }).then(({ count, rows }) => {
        const message = `Il y a ${count} pokémon(s) qui correspondent au terme de recherche ${name}`;
        res.json({ message, data: rows });
      });
    } else {
      Pokemon.findAll({ order: ["name"], limit: limitParsed || 5 })
        .then((pokemons) => {
          const message = "La liste des pokémons a bien été récupérée.";
          res.json({ message, data: pokemons });
        })
        .catch((error) => {
          const message =
            "La liste des pokémons n a pas pu être récupérée. Réessayez dans quelques instants.";
          res.status(500).json({ message, data: error });
        });
    }
  });
};
