# Gestion des erreurs avec Sequelize et Express

Lorsqu'une requête est envoyée à une API, plusieurs types d'erreurs peuvent survenir. Certaines erreurs proviennent du serveur tandis que d'autres sont causées par des données invalides envoyées par le client.

Par défaut, lorsqu'une erreur n'est pas gérée correctement, Express peut retourner une réponse générique avec le code HTTP 500 (Internal Server Error). Cependant, toutes les erreurs ne correspondent pas à un problème serveur. Il est donc important d'identifier le type d'erreur afin de retourner une réponse adaptée.

Sequelize fournit plusieurs classes d'erreurs permettant de distinguer les différents problèmes rencontrés lors des opérations sur la base de données.

## La ValidationError

La classe ValidationError est l'une des erreurs les plus courantes lors du développement avec Sequelize. Elle est déclenchée lorsqu'une donnée ne respecte pas les règles de validation définies dans un modèle.

Par exemple, si un champ doit obligatoirement contenir un entier positif mais qu'une chaîne de caractères ou une valeur négative est envoyée, Sequelize peut générer une ValidationError.

Dans ce cas, le serveur fonctionne correctement. Le problème provient des données fournies par le client. La réponse HTTP appropriée est donc généralement :

400 Bad Request

Plutôt que :

500 Internal Server Error

En identifiant une ValidationError, nous pouvons fournir un message plus précis au client et faciliter le débogage de l'application.

```js
const { ValidationError } = require("sequelize");

try {
  const pokemon = await Pokemon.create(req.body);

  res.json({
    message: "Pokémon créé avec succès",
    data: pokemon
  });

} catch (err) {

  if (err instanceof ValidationError) {
    return res.status(400).json({
      message: err.message
    });
  }

  res.status(500).json({
    message: "Une erreur interne est survenue."
  });

}
```

Grâce à cette approche, les erreurs de validation sont clairement séparées des erreurs internes du serveur.

## Pourquoi gérer les erreurs explicitement ?

La gestion des erreurs permet :

* d'améliorer l'expérience utilisateur ;
* de faciliter le débogage ;
* de retourner des codes HTTP cohérents ;
* de sécuriser les informations renvoyées par l'API ;
* de rendre l'application plus robuste.

Une bonne API ne se contente pas de fonctionner lorsque tout se passe bien. Elle doit également être capable de répondre correctement lorsqu'une erreur survient.



# Les validations et contraintes Sequelize

Les validations permettent de vérifier qu'une donnée respecte certaines règles avant son enregistrement dans la base de données.

Sequelize propose plusieurs mécanismes de validation directement dans les modèles.

Par exemple :

```js
hp: {
  type: DataTypes.INTEGER,
  allowNull: false,
  validate: {
    isInt: true,
    min: 0
  }
}
```

Dans cet exemple :

* allowNull: false interdit les valeurs nulles ;
* isInt: true exige un nombre entier ;
* min: 0 impose une valeur minimale de zéro.

Si une de ces contraintes n'est pas respectée, Sequelize interrompt l'opération et génère une ValidationError.

Les validations constituent une première ligne de défense contre les données invalides. Elles permettent de protéger la cohérence des informations stockées dans la base de données et d'éviter de nombreux problèmes applicatifs.

Il est recommandé de définir les validations directement dans les modèles afin que toutes les opérations utilisant Sequelize bénéficient automatiquement des mêmes règles de contrôle.


# UniqueConstraintError avec Sequelize

En plus des validations classiques, Sequelize permet de gérer des contraintes au niveau de la base de données. L’une des plus importantes est la contrainte d’unicité.

Une contrainte d’unicité garantit qu’une valeur ne peut pas être dupliquée dans une colonne. Par exemple, un email d’utilisateur ou un identifiant de Pokémon ne doit pas apparaître deux fois dans la base de données.

## Exemple de contrainte UNIQUE

Dans un modèle Sequelize, on peut définir une colonne comme unique :

```js id="u1x9k2"
email: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true
}
```

Ici, Sequelize et la base de données s’assurent qu’aucun deux enregistrements ne possèdent le même email.

## Qu’est-ce que UniqueConstraintError ?

Lorsqu’une tentative d’insertion viole cette règle, Sequelize déclenche une erreur appelée `UniqueConstraintError`.

Cela se produit par exemple si on essaie de créer deux utilisateurs avec le même email :

```js id="k3p8lm"
await User.create({
  email: "test@gmail.com"
});
```

Puis une deuxième requête identique :

```js id="q7d2xv"
await User.create({
  email: "test@gmail.com"
});
```

La deuxième requête échoue et Sequelize renvoie une `UniqueConstraintError`.

## Gestion de l’erreur dans Express

On peut intercepter cette erreur et renvoyer un code HTTP adapté :

```js id="r8f4aa"
const { ValidationError, UniqueConstraintError } = require("sequelize");

try {
  const user = await User.create(req.body);

  res.json({
    message: "Utilisateur créé avec succès",
    data: user
  });

} catch (err) {

  if (err instanceof UniqueConstraintError) {
    return res.status(409).json({
      message: "Cette valeur existe déjà en base de données"
    });
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({
      message: err.message
    });
  }

  res.status(500).json({
    message: "Erreur interne du serveur"
  });

}
```

## Pourquoi utiliser le code 409 ?

Le code HTTP `409 Conflict` est utilisé lorsqu’une requête entre en conflit avec l’état actuel de la base de données.

Dans ce cas, la ressource existe déjà, donc il y a un conflit logique.

## Résumé

* `ValidationError` → données invalides → 400 Bad Request
* `UniqueConstraintError` → doublon en base → 409 Conflict
* Autres erreurs → problème serveur → 500 Internal Server Error

Une bonne API ne laisse pas ces erreurs remonter brutes. Elle les transforme en réponses claires, compréhensibles et exploitables par le client.
