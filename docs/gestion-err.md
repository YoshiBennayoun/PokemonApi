# Gestion des erreurs

La gestion des erreurs est une partie essentielle d'une API. Elle permet de contrôler les comportements inattendus et de renvoyer des réponses claires au client.

Dans une application comme un Pokédex, elle permet de gérer les problèmes liés aux opérations CRUD (Create, Read, Update, Delete).

---

# Exemple : création d’un Pokémon

Voici une route `POST` avec gestion d’erreur :

```js
app.post("/api/pokemons", async (req, res) => {
    try {
        const pokemonCreated = await Pokemon.create(req.body);

        return res.status(201).json({
            message: `Pokémon ${pokemonCreated.name} créé avec succès`,
            data: pokemonCreated
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Erreur serveur : le Pokémon n'a pas pu être ajouté",
            data: err.message
        });
    }
});
```

---

# Autres cas importants

## 1. Récupérer tous les Pokémon

```js
app.get("/api/pokemons", async (req, res) => {
    try {
        const pokemons = await Pokemon.findAll();

        return res.status(200).json({
            message: "Liste des Pokémon récupérée",
            data: pokemons
        });

    } catch (err) {
        return res.status(500).json({
            message: "Erreur lors de la récupération des Pokémon",
            data: err.message
        });
    }
});
```

---

## 2. Récupérer un Pokémon par ID

```js
app.get("/api/pokemons/:id", async (req, res) => {
    try {
        const pokemon = await Pokemon.findByPk(req.params.id);

        if (!pokemon) {
            return res.status(404).json({
                message: "Pokémon introuvable"
            });
        }

        return res.status(200).json({
            message: "Pokémon trouvé",
            data: pokemon
        });

    } catch (err) {
        return res.status(500).json({
            message: "Erreur serveur lors de la recherche",
            data: err.message
        });
    }
});
```

---

## 3. Mise à jour d’un Pokémon

```js
app.put("/api/pokemons/:id", async (req, res) => {
    try {
        const pokemon = await Pokemon.findByPk(req.params.id);

        if (!pokemon) {
            return res.status(404).json({
                message: "Pokémon introuvable"
            });
        }

        await pokemon.update(req.body);

        return res.status(200).json({
            message: "Pokémon mis à jour avec succès",
            data: pokemon
        });

    } catch (err) {
        return res.status(500).json({
            message: "Erreur lors de la mise à jour",
            data: err.message
        });
    }
});
```

---

## 4. Suppression d’un Pokémon

```js
app.delete("/api/pokemons/:id", async (req, res) => {
    try {
        const pokemon = await Pokemon.findByPk(req.params.id);

        if (!pokemon) {
            return res.status(404).json({
                message: "Pokémon introuvable"
            });
        }

        await pokemon.destroy();

        return res.status(200).json({
            message: "Pokémon supprimé avec succès"
        });

    } catch (err) {
        return res.status(500).json({
            message: "Erreur lors de la suppression",
            data: err.message
        });
    }
});
```

---

# Types de codes utilisés dans une API

## Succès

* `200 OK` → requête réussie
* `201 Created` → création réussie
* `204 No Content` → suppression réussie sans contenu

## Erreurs client

* `400 Bad Request` → données invalides
* `401 Unauthorized` → non authentifié
* `403 Forbidden` → accès interdit
* `404 Not Found` → ressource inexistante

## Erreurs serveur

* `500 Internal Server Error` → erreur inattendue
* `502 Bad Gateway` → problème proxy / service externe
* `503 Service Unavailable` → serveur indisponible

---

# Bonnes pratiques

## 1. Toujours utiliser try/catch

Évite les crashs silencieux et rend les erreurs contrôlées.

## 2. Retourner des statuts HTTP cohérents

Une API propre ne renvoie pas toujours `200 OK` pour tout.

## 3. Vérifier les données avant traitement

Exemple :

```js
if (!req.body.name) {
    return res.status(400).json({
        message: "Le champ name est obligatoire"
    });
}
```

---

## Résumé

* `200` → succès
* `201` → création réussie
* `400` → erreur de données
* `404` → ressource inexistante
* `500` → erreur serveur

Une bonne gestion d’erreur transforme une API fragile en système robuste capable de survivre aux requêtes imprévisibles des utilisateurs.
