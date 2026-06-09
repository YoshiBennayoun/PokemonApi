# Authentication

L'authentification est une étape qui consiste à vérifier si l'utilisateur existe et si son mot de passe est correct.

Elle s'éffectue en 4 étapes :
1. La requête HTTP est envoyée par le client afin de s'authentifier
2. Le serveur vérifie si l'utilisateur existe (si ses identifiants sont corrects) Le serveur génère un token JWT
3. Transmission à chaque requête par le client ,de son token JWT
4. Validité du token (son expiration) par le serveur 