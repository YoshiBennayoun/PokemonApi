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
          message: "The search term must contain at least 2 characters",
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
         * @description order of results
         */
        order: ["name"],
      }).then(({ count, rows }) => {
        const message = `There are ${count} pokémon(s) that match the search term ${name}`;
        res.json({ message, data: rows });
      });
    } else {
      Pokemon.findAll({ order: ["name"], limit: limitParsed || 5 })
        .then((pokemons) => {
          const message = "The list of pokémons has been successfully retrieved.";
          res.json({ message, data: pokemons });
        })
        .catch((error) => {
          const message =
            "The list of pokémons could not be retrieved. Please try again in a few moments.";
          res.status(500).json({ message, data: error });
        });
    }
  });
};
