# Validateurs et Contraintes

## Définition

### Validateur

Un **validateur** est un mécanisme chargé de vérifier qu'une donnée respecte une ou plusieurs règles définies par l'application.

Il permet de contrôler les informations saisies par l'utilisateur avant leur traitement ou leur enregistrement.

Les validateurs peuvent être implémentés côté client (JavaScript) ou côté serveur (PHP, Node.js, Python, Java, etc.).

### Exemples de validation

* Vérifier qu'un champ n'est pas vide.
* Vérifier qu'une adresse e-mail est valide.
* Vérifier qu'un mot de passe contient au moins 8 caractères.
* Vérifier qu'un âge est supérieur ou égal à 18 ans.
* Vérifier qu'un numéro de téléphone respecte un format donné.

```js
function validerEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

---

## Contrainte

Une **contrainte** est une règle que les données doivent obligatoirement respecter.

Les validateurs utilisent ces contraintes pour déterminer si une donnée est valide ou non.

### Exemples de contraintes

* Champ obligatoire.
* Longueur minimale de 8 caractères.
* Valeur numérique positive.
* Adresse e-mail valide.
* Date supérieure à aujourd'hui.
* Unicité d'un nom d'utilisateur.

```js
const contraintes = {
    required: true,
    minLength: 8
};
```

---

## Relation entre Validateur et Contrainte

La contrainte définit **la règle**.

Le validateur applique cette règle et vérifie que la donnée la respecte.

### Exemple

Contrainte :

> Le mot de passe doit contenir au moins 8 caractères.

Validateur :

```js
function validerMotDePasse(password) {
    return password.length >= 8;
}
```

Donnée :

```txt
123456
```

Résultat :

```txt
❌ Validation échouée
```

Donnée :

```txt
12345678
```

Résultat :

```txt
✅ Validation réussie
```

---

## Où trouve-t-on les validateurs ?

### Côté client

Utilisés pour fournir un retour immédiat à l'utilisateur.

Technologies :

* JavaScript
* Vue.js
* React
* Angular
* Flutter

### Côté serveur

Utilisés pour garantir la sécurité des données, même si le client contourne les vérifications.

Technologies :

* PHP
* Laravel
* Symfony
* Express.js
* NestJS
* Django
* Spring Boot

---

## Important

La validation côté client améliore l'expérience utilisateur mais n'est jamais suffisante.

Un utilisateur peut modifier le code JavaScript ou envoyer directement des requêtes à l'API.

Les données doivent toujours être validées à nouveau côté serveur.

### Bonne pratique

```txt
Client → Validation JavaScript
        ↓
Serveur → Validation Backend
        ↓
Base de données
```

---

## Résumé

* **Contrainte** : règle à respecter.
* **Validateur** : mécanisme qui vérifie le respect de cette règle.
* La validation doit être effectuée côté client et côté serveur.
* Les contraintes garantissent l'intégrité et la cohérence des données.
* Les validateurs appliquent concrètement ces contraintes.

# Validateurs et Contraintes

## Définition

### Validateur

Un **validateur** est un mécanisme chargé de vérifier qu'une donnée respecte une ou plusieurs règles définies par l'application.

Il permet de contrôler les informations saisies par l'utilisateur avant leur traitement ou leur enregistrement.

Les validateurs peuvent être implémentés côté client (JavaScript) ou côté serveur (PHP, Node.js, Python, Java, etc.).

### Exemples de validation

* Vérifier qu'un champ n'est pas vide.
* Vérifier qu'une adresse e-mail est valide.
* Vérifier qu'un mot de passe contient au moins 8 caractères.
* Vérifier qu'un âge est supérieur ou égal à 18 ans.
* Vérifier qu'un numéro de téléphone respecte un format donné.

```js
function validerEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

---

## Contrainte

Une **contrainte** est une règle que les données doivent obligatoirement respecter.

Les validateurs utilisent ces contraintes pour déterminer si une donnée est valide ou non.

### Exemples de contraintes

* Champ obligatoire.
* Longueur minimale de 8 caractères.
* Valeur numérique positive.
* Adresse e-mail valide.
* Date supérieure à aujourd'hui.
* Unicité d'un nom d'utilisateur.

```js
const contraintes = {
    required: true,
    minLength: 8
};
```

---

## Relation entre Validateur et Contrainte

La contrainte définit **la règle**.

Le validateur applique cette règle et vérifie que la donnée la respecte.

### Exemple

Contrainte :

> Le mot de passe doit contenir au moins 8 caractères.

Validateur :

```js
function validerMotDePasse(password) {
    return password.length >= 8;
}
```

Donnée :

```txt
123456
```

Résultat :

```txt
❌ Validation échouée
```

Donnée :

```txt
12345678
```

Résultat :

```txt
✅ Validation réussie
```

---

## Où trouve-t-on les validateurs ?

### Côté client

Utilisés pour fournir un retour immédiat à l'utilisateur.

Technologies :

* JavaScript
* Vue.js
* React
* Angular
* Flutter

### Côté serveur

Utilisés pour garantir la sécurité des données, même si le client contourne les vérifications.

Technologies :

* PHP
* Laravel
* Symfony
* Express.js
* NestJS
* Django
* Spring Boot

---

## Important

La validation côté client améliore l'expérience utilisateur mais n'est jamais suffisante.

Un utilisateur peut modifier le code JavaScript ou envoyer directement des requêtes à l'API.

Les données doivent toujours être validées à nouveau côté serveur.

### Bonne pratique

```txt
Client → Validation JavaScript
        ↓
Serveur → Validation Backend
        ↓
Base de données
```

---

## Résumé

* **Contrainte** : règle à respecter.
* **Validateur** : mécanisme qui vérifie le respect de cette règle.
* La validation doit être effectuée côté client et côté serveur.
* Les contraintes garantissent l'intégrité et la cohérence des données.
* Les validateurs appliquent concrètement ces contraintes.

Formulation courte à retenir :

> **Une contrainte définit ce qui est autorisé, un validateur vérifie que les données respectent cette contrainte.**
