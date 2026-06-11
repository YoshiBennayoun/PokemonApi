require("dotenv/config");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const favicon = require("serve-favicon");
const sequelize = require("./src/db/sequelize");

const app = express();
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});
const port = process.env.PORT || 3000;
app
  .use(cors())
  .use(express.json())
  .use(morgan("dev"))
  .use(express.static("public"))
  .use(favicon(__dirname + "/public/favicon.svg"));

// la base de données
sequelize.initDb();

require("./src/routes/findAllpokemons")(app);
require("./src/routes/findPokemonByPk")(app);
require("./src/routes/createPokemon")(app);
require("./src/routes/updatePokemon")(app);
require("./src/routes/deletePokemon")(app);
require("./src/routes/register")(app);
require("./src/routes/login")(app);

// gestion des erreurs 404

app.use(({ res }) => {
  const message =
    "impossible de trouver la ressource demandé vous pouvez essayer une autre URL.";
  res.status(404).json({ message });
});

app.listen(port, () => {
  console.log(`
\x1b[93m\x1b[3m
╔══════════════════════════════════════╗
║         ⚡ ExpressJS Server ⚡       ║
╚══════════════════════════════════════╝
\x1b[0m

\x1b[36m➜ Server running on port:\x1b[0m \x1b[33m${port}\x1b[0m
\x1b[32m➜ Local:\x1b[0m \x1b[4mhttp://localhost:${port}\x1b[0m`);
});
