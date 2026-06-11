require("dotenv/config");
const favicon = require("serve-favicon");
const express = require("express");
const sequelize = require("./src/db/sequelize");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3000;
app
  .use(express.json())
  .use(express.static("public"))
  .use(cors());

// Database initialization
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
    "Unable to find the requested resource, you can try another URL.";
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
\x1b[32m➜ Local:\x1b[0m \x1b[4mhttp://localhost:${port}\x1b[0m\n`);
});
