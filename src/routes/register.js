const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");
const private_key = process.env.JWT_SECRET;

module.exports = (app) => {
  app.post("/api/register", auth, async (req, res) => {
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
            token: jwt.sign({ userId: user.id }, private_key, {
              expiresIn: "24h",
            }),
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
