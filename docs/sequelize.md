# Sequelize

## Initialisation

```bash
npm install sequelize

npm install mariadb 
```

```js

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    'pokedex',//nom de la base de donnée
    'root',// identifiant ou nom utilisateur
    '',//votre mot passe 
    {//options, configuration
        host : 'localhost',//indique où se trouve la db sur votre machine
        dialect : 'mariadb',//votre moteur de base de données
        dialectOptions :{
            timezone : 'Etc/GMT-2'
        },
        logging: false// évite les affichages d'avertissement sur la console
    }
)
```

On passe quatre paramètre à notre constructeur sequelize

1. - Nom de la base de données:
le premier est tout simplement de la base de données avec lequel vous vous connecter

exemple : pokedex

2. - ID, nom de l'utilisateur: Le deuxième paramètre s'agit de votre nom utilisateur , par défaut mariadb et même autre attribut le nom `root`, libre à vous d'en mettre un autre si vous en avez definis.

3. - password: le troisième paramètre s'agit de votre mot de passe si non définis vous devez passer une chaîne vide 

**paramètre à passer dans un Objet**

4. - host: Le quatrième paramètre de décrire où se trouve la base de donées , sur votre machine par exemple .

Exemple: `localhost`.

Le host sera différent si votre db n'est pas en local.

5. - dialect: le cinquième  paramètre permet de `indiquer votre moteur/driver de votre base de données`.

Exemple: mariadb .

Cela peut être mysql ou pgsql.

**optionnel**


6. - dialectOptions et timezone


## Connexion

```js

sequelize.authenticate()
    .then(_=>console.log('La Connexion à la base de donnéez a bien été établie.'))
    .catch(error=>console.error('Impossible de se connecter à la base de donées',error))

```

la Méthode `authenticate()` permet de nous connecter à la base de données , en exploitant notre configuration dans l'instance

