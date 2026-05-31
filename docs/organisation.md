# Organisation

Cette étape consistais à séparer chaque logique du code afin d'avoir une application cohérente et maintenable , facile à debbuger

server.js - le point d'entré
src-

- db : dossier contenant toute la logique sur la base
  - sequelize: création , authentification/connexion , syncronisation  à la base de données
  - mock-pokemons: contient les données par défaut des pokemons

- models : dossier contenant la logique de crétion de models/table dans la base de données

- routes: dossier contenant les fichiers de logique de chaque route de l'application
