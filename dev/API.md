# Documentation API Pokedex

## Base URL
```
http://localhost:3000/api
```

## Authentification
La plupart des endpoints nécessitent une authentification via JWT token.

### Header Authorization
```
Authorization: Bearer <token>
```

Le token est obtenu via l'endpoint de login et est valide pendant 24h.

---

## Endpoints

### 1. Login - Connexion utilisateur
**Endpoint** : `POST /api/login`

**Description** : Authentifie un utilisateur et retourne un token JWT.

**Headers** :
```
Content-Type: application/json
```

**Body** :
```json
{
  "username": "string",
  "password": "string"
}
```

**Réponse succès (200)** :
```json
{
  "message": "Connexion réussie",
  "user": {
    "id": number,
    "username": "string"
  },
  "token": "string"
}
```

**Réponses erreur** :
- `404` : Utilisateur non trouvé
- `401` : Mot de passe incorrect
- `500` : Erreur serveur

---

### 2. Récupérer tous les pokémons
**Endpoint** : `GET /api/pokemons`

**Description** : Récupère la liste des pokémons avec filtrage optionnel.

**Headers** :
```
Authorization: Bearer <token>
```

**Query Parameters** (optionnels) :
- `name` : string - Filtre par nom (recherche partielle, minimum 2 caractères)
- `limit` : number - Limite le nombre de résultats (défaut: 5)

**Réponse succès (200)** :
```json
{
  "message": "La liste des pokémons a bien été récupérée.",
  "data": [
    {
      "id": number,
      "name": "string",
      "hp": number,
      "cp": number,
      "picture": "string",
      "types": ["string"],
      "created": "date"
    }
  ]
}
```

**Réponse avec filtre (200)** :
```json
{
  "message": "Il y a X pokémon(s) qui correspondent au terme de recherche {name}",
  "data": [...]
}
```

**Réponses erreur** :
- `400` : Terme de recherche trop court (< 2 caractères)
- `401` : Token manquant ou invalide
- `500` : Erreur serveur

---

### 3. Récupérer un pokémon par ID
**Endpoint** : `GET /api/pokemons/:id`

**Description** : Récupère un pokémon spécifique par son identifiant.

**Paramètres URL** :
- `id` : number - Identifiant du pokémon

**Réponse succès (200)** :
```json
{
  "message": "voici le pokemon {name}",
  "data": {
    "id": number,
    "name": "string",
    "hp": number,
    "cp": number,
    "picture": "string",
    "types": ["string"],
    "created": "date"
  }
}
```

**Réponses erreur** :
- `404` : Pokémon non trouvé

---

### 4. Créer un pokémon
**Endpoint** : `POST /api/pokemons`

**Description** : Crée un nouveau pokémon dans la base de données.

**Headers** :
```
Content-Type: application/json
```

**Body** :
```json
{
  "name": "string",
  "hp": number,
  "cp": number,
  "picture": "string",
  "types": ["string"]
}
```

**Validation des données** :
- `name` : string, unique, max 10 caractères, requis
- `hp` : integer, 0-999, requis
- `cp` : integer, 0-99, requis
- `picture` : URL valide, requis
- `types` : array de strings, 1-3 types max, types valides requis

**Types valides** :
Feu, Eau, Plante, Poison, Fée, Psy, Vol, Insecte, Roche, Acier, Tenebres, Combat, Normal, Glace, Dragon, Spectre, Sol

**Réponse succès (200)** :
```json
{
  "message": "pokemon {name} créé avec success",
  "data": {
    "id": number,
    "name": "string",
    "hp": number,
    "cp": number,
    "picture": "string",
    "types": ["string"],
    "created": "date"
  }
}
```

**Réponses erreur** :
- `400` : Erreur de validation des données
- `409` : Conflit (nom déjà utilisé)
- `500` : Erreur serveur

---

### 5. Modifier un pokémon
**Endpoint** : `PUT /api/pokemons/:id`

**Description** : Modifie un pokémon existant.

**Paramètres URL** :
- `id` : number - Identifiant du pokémon

**Headers** :
```
Content-Type: application/json
```

**Body** (champs optionnels) :
```json
{
  "name": "string",
  "hp": number,
  "cp": number,
  "picture": "string",
  "types": ["string"]
}
```

**Réponse succès (200)** :
```json
{
  "message": "Le pokémon {name} a bien été modifié.",
  "data": {
    "id": number,
    "name": "string",
    "hp": number,
    "cp": number,
    "picture": "string",
    "types": ["string"],
    "created": "date"
  }
}
```

**Réponses erreur** :
- `400` : Erreur de validation des données
- `404` : Pokémon non trouvé
- `500` : Erreur serveur

---

### 6. Supprimer un pokémon
**Endpoint** : `DELETE /api/pokemons/:id`

**Description** : Supprime un pokémon de la base de données.

**Paramètres URL** :
- `id` : number - Identifiant du pokémon

**Réponse succès (200)** :
```json
{
  "message": "Le pokémon avec l'id n°{id} a bien été supprimé.",
  "data": {
    "id": number,
    "name": "string",
    "hp": number,
    "cp": number,
    "picture": "string",
    "types": ["string"],
    "created": "date"
  }
}
```

**Réponses erreur** :
- `404` : Pokémon non trouvé
- `500` : Erreur serveur

---

## Modèles de données

### Pokémon
```typescript
{
  id: number;           // Identifiant unique (auto-incrément)
  name: string;         // Nom du pokémon (max 10 caractères, unique)
  hp: number;           // Points de vie (0-999)
  cp: number;           // Points de combat (0-99)
  picture: string;      // URL de l'image
  types: string[];      // Types (1-3 types max)
  created: date;        // Date de création
}
```

### User
```typescript
{
  id: number;           // Identifiant unique (auto-incrément)
  username: string;     // Nom d'utilisateur (unique, max 50 caractères)
  password: string;     // Mot de passe (hashé avec bcrypt)
}
```

---

## Codes d'erreur HTTP

| Code | Description |
|------|-------------|
| 200  | Succès |
| 400  | Requête invalide (erreur de validation) |
| 401  | Non autorisé (token manquant ou invalide) |
| 404  | Ressource non trouvée |
| 409  | Conflit (données déjà existantes) |
| 500  | Erreur interne du serveur |

---

## Configuration

### Variables d'environnement
```env
PORT=3000
MYSQLHOST=localhost
MYSQLPORT=3306
MYSQLDATABASE=pokedex
MYSQLUSER=root
MYSQLPASSWORD=''
```

### Démarrage du serveur
```bash
npm install
npm start
```

Le serveur démarre sur le port défini dans la variable d'environnement `PORT` (défaut: 3000).
