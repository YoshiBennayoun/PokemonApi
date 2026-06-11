const jwt = require("jsonwebtoken");
const privateKey = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({
      message:
        "Vous n'avez pas fourni de jeton d'authentification."
    });
  }

  const token = authorizationHeader.split(" ")[1];

  jwt.verify(token, privateKey, (error, decodedToken) => {
    if (error) {
      return res.status(401).json({
        message:
          "L'utilisateur n'est pas autorisé à accéder à cette ressource.",
        error
      });
    }

    req.userId = decodedToken.userId;

    next();
  });
};