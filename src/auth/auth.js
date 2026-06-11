const jwt = require("jsonwebtoken");
const privateKey = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({
      message:
        "You have not provided an authentication token."
    });
  }

  const token = authorizationHeader.split(" ")[1];

  jwt.verify(token, privateKey, (error, decodedToken) => {
    if (error) {
      return res.status(401).json({
        message:
          "The user is not authorized to access this resource.",
        error
      });
    }

    req.userId = decodedToken.userId;

    next();
  });
};