const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
module.exports = (app) => {
  app.post("/api/register", async (req, res) => {
    const { username, password } = req.body;
    const passwordHashed = await bcrypt.hash(password, 12);
    // TODO: Implement registration logic
    User.create({ username, password: passwordHashed })
      .then((user) => {
        res.status(201).json({
          message: "User created successfully",
          user: {
            id: user.id,
            username: user.username,
            password: user.password
          },
        });
      })
      .catch((error) => {
        res.status(500).json({
          message:
            "Impossible d'enregistrer le user. Réessayer dans quelque instants",
          error,
        });
      });
  });
};
