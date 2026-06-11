# Backend Express - Pokedex API

## Vision globale

Ce projet constitue le backend d'une application web de type Pokédex. Il s'agit d'une API RESTful construite avec Node.js et Express, permettant de gérer une collection de pokémons via une base de données MySQL. L'API offre des fonctionnalités complètes de CRUD (Create, Read, Update, Delete) ainsi qu'un système d'authentification sécurisé basé sur des tokens JWT.

## Description

L'API Pokedex fournit une interface robuste pour :
- **Gestion des pokémons** : Création, lecture, modification et suppression de pokémons
- **Authentification utilisateur** : Système de login sécurisé avec tokens JWT
- **Filtrage et recherche** : Recherche de pokémons par nom avec pagination
- **Validation des données** : Contrôles stricts sur les données entrantes
- **Base de données relationnelle** : Persistance des données via MySQL et Sequelize ORM

### Fonctionnalités principales

- 🔐 **Authentification JWT** : Tokens sécurisés valides 24h
- 📊 **CRUD complet** : Gestion complète des pokémons
- 🔍 **Recherche avancée** : Filtrage par nom avec pagination
- ✅ **Validation robuste** : Contraintes de données intégrées
- 🗄️ **Base de données MySQL** : Persistance relationnelle avec Sequelize
- 🚀 **API RESTful** : Architecture standard et intuitive

## Stack technique

- **Runtime** : Node.js
- **Framework** : Express.js
- **Base de données** : MySQL
- **ORM** : Sequelize
- **Authentification** : JWT (jsonwebtoken)
- **Hashage** : bcrypt
- **Gestion d'environnement** : dotenv
- **Logger** : morgan
- **Package manager** : pnpm

## Installation

```bash
# Cloner le repository
git clone <repository-url>

# Installer les dépendances
pnpm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos credentials MySQL
```


## Démarrage

```bash
# Mode développement avec hot-reload
pnpm dev

# Mode production
node server.js
```

Le serveur démarre sur le port configuré (défaut: 3000).

## Documentation API

La documentation complète de l'API est disponible dans [`docs/API.md`](docs/API.md).

### Endpoints principaux

- `POST /api/login` - Connexion utilisateur
- `GET /api/pokemons` - Liste des pokémons (avec filtres)
- `GET /api/pokemons/:id` - Détail d'un pokémon
- `POST /api/pokemons` - Créer un pokémon
- `PUT /api/pokemons/:id` - Modifier un pokémon
- `DELETE /api/pokemons/:id` - Supprimer un pokémon

## Structure du projet

```
Backend/
├── src/
│   ├── auth/           # Authentification (JWT, middleware)
│   ├── db/             # Configuration base de données
│   ├── models/         # Modèles Sequelize (Pokemon, User)
│   └── routes/         # Routes API
├── docs/               # Documentation
├── public/             # Fichiers statiques
├── .env                # Variables d'environnement
├── .http               # Fichier de tests HTTP
└── server.js           # Point d'entrée
```

## Auteur

Orssi Mp

## Licence

ISC