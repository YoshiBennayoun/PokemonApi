# Organisation du projet

L'organisation du code consiste à séparer les différentes responsabilités de l'application dans des dossiers et fichiers dédiés.

Cette approche permet de :

* améliorer la lisibilité du code ;
* faciliter la maintenance ;
* réduire la complexité du projet ;
* simplifier le débogage ;
* favoriser la réutilisation du code ;
* permettre à plusieurs développeurs de travailler simultanément sur le même projet.

Une bonne organisation est essentielle dès les premiers jours d'un projet afin d'éviter de transformer le fichier principal en une gigantesque accumulation de code difficile à comprendre et à maintenir.

## Structure du projet

```txt
project/
│
├── server.js
│
└── src/
    │
    ├── db/
    │   ├── sequelize.js
    │   └── mock-pokemons.js
    │
    ├── models/
    │
    └── routes/
```

---

## server.js

Le fichier `server.js` constitue le point d'entrée de l'application.

Il est responsable du démarrage du serveur et de l'initialisation des principaux composants :

* connexion à la base de données ;
* chargement des middlewares ;
* enregistrement des routes ;
* démarrage du serveur HTTP.

Exemple :

```js
app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
});
```

---

## src/

Le dossier `src` (source) contient l'ensemble du code métier de l'application.

Son rôle est de centraliser les différents modules du projet afin de maintenir une structure claire et évolutive.

---

## db/

Le dossier `db` regroupe tout ce qui concerne la gestion de la base de données.

### sequelize.js

Ce fichier contient la configuration de Sequelize ainsi que :

* la connexion à la base de données ;
* l'authentification ;
* la synchronisation des modèles ;
* les paramètres globaux de l'ORM.

Responsabilités :

```txt
Connexion
Authentification
Configuration Sequelize
Synchronisation des tables
```

### mock-pokemons.js

Ce fichier contient des données fictives (mock data) utilisées pour :

* alimenter la base lors des tests ;
* initialiser l'application ;
* simuler des données réelles pendant le développement.

Exemple :

```js
{
    name: "Pikachu",
    hp: 35,
    cp: 55
}
```

---

## models/

Le dossier `models` contient la définition des modèles Sequelize.

Un modèle représente généralement une table de la base de données.

Chaque modèle définit :

* les colonnes ;
* les types de données ;
* les contraintes ;
* les relations avec d'autres tables.

Exemple :

```js
const Pokemon = sequelize.define("Pokemon", {
    name: DataTypes.STRING,
    hp: DataTypes.INTEGER,
    cp: DataTypes.INTEGER
});
```

Correspondance :

```txt
Model Pokemon
        ↓
Table Pokemon
        ↓
Enregistrements Pokémon
```

---

## routes/

Le dossier `routes` contient la définition des routes de l'application.

Chaque fichier regroupe les endpoints liés à une ressource spécifique.

Exemple :

```txt
GET    /pokemons
GET    /pokemons/:id
POST   /pokemons
PUT    /pokemons/:id
DELETE /pokemons/:id
```

Cette séparation permet d'éviter de placer toutes les routes dans le fichier principal et facilite l'évolution de l'API.

---

# Résumé

| Élément          | Rôle                                 |
| ---------------- | ------------------------------------ |
| server.js        | Point d'entrée de l'application      |
| src/             | Contient le code source              |
| db/              | Gestion de la base de données        |
| sequelize.js     | Configuration et connexion Sequelize |
| mock-pokemons.js | Données fictives de test             |
| models/          | Définition des tables et relations   |
| routes/          | Gestion des routes et endpoints      |

## Principe fondamental

Une responsabilité = un dossier ou un fichier spécialisé.

Plus les responsabilités sont séparées, plus l'application est facile à comprendre, tester, maintenir et faire évoluer.


Cas grand projet:

src/
├── controllers/
├── services/
├── repositories/
├── middlewares/
├── validators/
├── models/
├── routes/
└── db/