/* Authentification : Créer un modèle User avec Sequelize */
const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");

const private_key = process.env.JWT_SECRET;

module.exports = (app) => {
  app.post("/api/login", auth, async (req, res) => {
    const bodyRequest = req.body;
    const user = await User.findOne({
      where: { username: bodyRequest.username },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    bcrypt
      .compare(bodyRequest.password, user.password)
      .then((isPasswordValid) => {
        if (!isPasswordValid) {
          return res.status(401).json({ message: "Password incorrect" });
        }
        const token = jwt.sign({ userId: user.id }, private_key, {
          expiresIn: "24h",
        });
        const message = `The user has been successfully logged in`;
        return res.json({ message, data: user, token });
      })
      .catch((error) => {
        return res.status(500).json({
          message:
            "The user could not be logged in. Please try again in a few moments",
          error,
        });
      });
  });
};
