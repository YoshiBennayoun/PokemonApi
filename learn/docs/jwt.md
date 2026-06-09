# JWT (JSON Web Token)

Le JWT (JSON Web Token) est un standard permettant d'échanger des informations de manière sécurisée entre un client et un serveur.

Après l'authentification d'un utilisateur, le serveur génère un jeton (token) qui sera envoyé au client. Ce jeton permettra ensuite au serveur de reconnaître l'utilisateur sans lui demander de se reconnecter à chaque requête.

## Les informations de l'utilisateur

Pour générer un JWT, il est nécessaire de fournir des informations permettant d'identifier l'utilisateur.

La donnée la plus couramment utilisée est l'identifiant unique de l'utilisateur (`id`).

Exemple :

```js
{
  userId: 1
}
```

Ces informations constituent le contenu (payload) du jeton.

## La clé secrète

Une clé secrète est nécessaire pour signer le jeton.

Cette clé n'est connue que par le serveur et permet de garantir que le JWT n'a pas été modifié.

Exemple :

```js
const secretKey = "MON_SECRET_JWT";
```

Dans une application réelle, cette clé est généralement stockée dans une variable d'environnement afin d'éviter qu'elle ne soit exposée dans le code source.

## La durée de validité

Un JWT possède généralement une date d'expiration.

Cela permet de limiter les risques en cas de vol du jeton.

Exemple :

```js
{
  expiresIn: "24h"
}
```

Ici, le jeton expirera 24 heures après sa création.

---

# La méthode sign()

La méthode `sign()` permet de créer un JWT.

Syntaxe :

```js
jwt.sign(payload, secretKey, options);
```

Exemple :

```js
const jwt = require("jsonwebtoken");

const token = jwt.sign(
  { userId: user.id },
  "MON_SECRET_JWT",
  { expiresIn: "24h" }
);

console.log(token);
```

Dans cet exemple :

* `userId` représente les données à stocker dans le jeton ;
* `"MON_SECRET_JWT"` est la clé secrète ;
* `expiresIn` définit la durée de validité du jeton.

Le résultat est une chaîne de caractères ressemblant à ceci :

```txt
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Ce jeton sera envoyé au client après une connexion réussie.

---

# La méthode verify()

La méthode `verify()` permet de vérifier qu'un JWT est valide.

Elle contrôle :

* que le jeton a bien été signé avec la bonne clé secrète ;
* que le jeton n'a pas été modifié ;
* que le jeton n'est pas expiré.

Syntaxe :

```js
jwt.verify(token, secretKey);
```

Exemple :

```js
const jwt = require("jsonwebtoken");

try {
  const decodedToken = jwt.verify(
    token,
    "MON_SECRET_JWT"
  );

  console.log(decodedToken);

} catch (error) {
  console.log("Jeton invalide");
}
```

Si le jeton est valide, `verify()` retourne les informations contenues dans son payload :

```js
{
  userId: 1,
  iat: 1710000000,
  exp: 1710086400
}
```

Si le jeton est expiré, falsifié ou signé avec une mauvaise clé, une erreur est générée.

---

# Cycle de vie d'un JWT

1. L'utilisateur saisit ses identifiants.
2. Le serveur vérifie les informations de connexion.
3. Le serveur génère un JWT avec `sign()`.
4. Le JWT est envoyé au client.
5. Le client stocke le jeton.
6. Le client envoie le jeton dans les requêtes protégées.
7. Le serveur vérifie le jeton avec `verify()`.
8. Si le jeton est valide, l'accès est autorisé.

Le JWT permet ainsi de maintenir l'authentification d'un utilisateur sans avoir à stocker une session sur le serveur.

Le **payload** et la **clé secrète** sont les deux éléments les plus importants d'un JWT. Sans eux, le JWT n'a pratiquement aucun intérêt.

## Le payload

Le payload est la partie du JWT qui contient les informations que tu souhaites transporter.

Par exemple :

```js
{
  userId: 1
}
```

ou

```js
{
  userId: 1,
  username: "orssi",
  role: "admin"
}
```

Lors de la création du token :

```js
const token = jwt.sign(
  {
    userId: user.id,
    username: user.username
  },
  secretKey
);
```

ce morceau :

```js
{
  userId: user.id,
  username: user.username
}
```

est le payload.

Le serveur l'insère dans le JWT.

## À quoi sert le payload ?

Quand le client renvoie le token :

```txt
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

le serveur peut le décoder et récupérer :

```js
{
  userId: 1,
  username: "orssi"
}
```

Il sait alors quel utilisateur effectue la requête.

C'est pour cette raison qu'on met souvent :

* l'id de l'utilisateur ;
* son rôle ;
* parfois son email.

## Ce qu'il ne faut jamais mettre dans le payload

Le JWT est **lisible**.

Un utilisateur peut aller sur un site comme jwt.io et voir le contenu du payload.

Il ne faut donc jamais stocker :

```js
{
  password: "123456"
}
```

ou

```js
{
  creditCard: "1234-5678-9012"
}
```

ou toute autre information sensible.

Le payload sert à identifier, pas à cacher des secrets.

---

# La clé secrète

La clé secrète est utilisée pour signer le JWT.

Imagine que tu écrives une lettre et que tu apposes un sceau unique connu uniquement de toi.

Quand quelqu'un reçoit la lettre, il peut vérifier que le sceau est authentique.

Le JWT fonctionne de la même manière.

Exemple :

```js
const secretKey = "monSuperSecret";
```

Création du token :

```js
const token = jwt.sign(
  {
    userId: 1
  },
  secretKey
);
```

Vérification :

```js
jwt.verify(token, secretKey);
```

Si la clé utilisée lors de la vérification est différente :

```js
jwt.verify(token, "mauvaiseCle");
```

alors le token est rejeté.

---

# Pourquoi la clé secrète est-elle indispensable ?

Imagine qu'un utilisateur possède ce token :

```js
{
  userId: 5,
  role: "user"
}
```

S'il pouvait modifier librement le payload, il pourrait écrire :

```js
{
  userId: 5,
  role: "admin"
}
```

et devenir administrateur.

Ce serait un peu gênant. Les systèmes informatiques ont déjà suffisamment de problèmes sans distribuer les droits administrateur comme des bonbons.

La signature créée grâce à la clé secrète empêche cela.

Dès qu'un caractère du payload est modifié :

```js
{
  userId: 5,
  role: "admin"
}
```

la signature ne correspond plus.

Lors du :

```js
jwt.verify(token, secretKey);
```

le serveur détecte immédiatement la falsification et refuse le token.

---

# Résumé

**Payload**

* Contient les informations de l'utilisateur.
* Sert à identifier l'utilisateur.
* Est lisible par le client.
* Ne doit jamais contenir de données sensibles.

**Clé secrète**

* Connue uniquement du serveur.
* Sert à signer le JWT.
* Permet de détecter toute modification du token.
* Doit rester confidentielle.

La façon la plus simple de voir les choses est :

> Le payload est le contenu de la carte d'identité. La clé secrète est le cachet officiel qui prouve que la carte a bien été délivrée par l'autorité compétente. Sans le cachet, n'importe qui pourrait fabriquer sa propre carte.

>Lorsqu’un serveur reçoit un JWT, il sépare le header, le payload et la signature. Le payload contient les informations de l’utilisateur comme son userId. Le serveur prend ensuite le header et le payload, les combine avec sa clé secrète et génère une nouvelle signature. Il compare cette signature avec celle reçue dans le token. Si elles correspondent, le token est valide et le payload est accepté. Sinon, le token est rejeté.
