/* Authentification : Créer un modèle User avec Sequelize */
const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const private_key = require("../auth/private_key");

module.exports = (app) => {
  app.post("/api/login", async (req, res) => {
    const bodyRequest = req.body;
    const user = await User.findOne({
      where: { username: bodyRequest.username },
    });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    bcrypt
      .compare(bodyRequest.password, user.password)
      .then((isPasswordValid) => {
        if (!isPasswordValid) {
          return res.status(401).json({ message: "Mot de passe incorrect" });
        }
        const token = jwt.sign({ userId: user.id }, private_key, {
          expiresIn: "24h",
        });
        const message = `L'utilisateur a été connecté avec succès`;
        return res.json({ message, data: user, token });
      })
      .catch((error) => {
        return res.status(500).json({
          message:
            "L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants",
          error,
        });
      });
  });
};
