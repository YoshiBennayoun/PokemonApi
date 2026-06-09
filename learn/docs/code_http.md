# HTTP - Guide complet des codes de statut

Les codes de statut HTTP permettent à un serveur d'informer un client (navigateur, application mobile, API, etc.) du résultat d'une requête.

Les codes sont répartis en cinq grandes familles :

| Famille | Signification     |
| ------- | ----------------- |
| 1xx     | Information       |
| 2xx     | Succès            |
| 3xx     | Redirection       |
| 4xx     | Erreur du client  |
| 5xx     | Erreur du serveur |

---

# 1xx - Informations

Ces codes indiquent que la requête a été reçue et que le traitement est en cours.

| Code | Signification       |
| ---- | ------------------- |
| 100  | Continue            |
| 101  | Switching Protocols |
| 102  | Processing          |
| 103  | Early Hints         |

---

# 2xx - Succès

Ces codes indiquent que la requête a été traitée avec succès.

| Code | Signification                 |
| ---- | ----------------------------- |
| 200  | OK                            |
| 201  | Created                       |
| 202  | Accepted                      |
| 203  | Non-Authoritative Information |
| 204  | No Content                    |
| 205  | Reset Content                 |
| 206  | Partial Content               |
| 207  | Multi-Status                  |
| 208  | Already Reported              |
| 226  | IM Used                       |

---

# 3xx - Redirections

Ces codes indiquent qu'une action supplémentaire doit être effectuée pour accéder à la ressource.

| Code | Signification        |
| ---- | -------------------- |
| 300  | Multiple Choices     |
| 301  | Moved Permanently    |
| 302  | Found                |
| 303  | See Other            |
| 304  | Not Modified         |
| 305  | Use Proxy (obsolète) |
| 306  | Reserved             |
| 307  | Temporary Redirect   |
| 308  | Permanent Redirect   |

---

# 4xx - Erreurs du client

Ces codes indiquent que la requête envoyée par le client est incorrecte ou non autorisée.

| Code | Signification                   |
| ---- | ------------------------------- |
| 400  | Bad Request                     |
| 401  | Unauthorized                    |
| 402  | Payment Required                |
| 403  | Forbidden                       |
| 404  | Not Found                       |
| 405  | Method Not Allowed              |
| 406  | Not Acceptable                  |
| 407  | Proxy Authentication Required   |
| 408  | Request Timeout                 |
| 409  | Conflict                        |
| 410  | Gone                            |
| 411  | Length Required                 |
| 412  | Precondition Failed             |
| 413  | Payload Too Large               |
| 414  | URI Too Long                    |
| 415  | Unsupported Media Type          |
| 416  | Range Not Satisfiable           |
| 417  | Expectation Failed              |
| 418  | I'm a Teapot                    |
| 421  | Misdirected Request             |
| 422  | Unprocessable Content           |
| 423  | Locked                          |
| 424  | Failed Dependency               |
| 425  | Too Early                       |
| 426  | Upgrade Required                |
| 428  | Precondition Required           |
| 429  | Too Many Requests               |
| 431  | Request Header Fields Too Large |
| 451  | Unavailable For Legal Reasons   |

---

# 5xx - Erreurs du serveur

Ces codes indiquent que le serveur a rencontré un problème lors du traitement de la requête.

| Code | Signification                   |
| ---- | ------------------------------- |
| 500  | Internal Server Error           |
| 501  | Not Implemented                 |
| 502  | Bad Gateway                     |
| 503  | Service Unavailable             |
| 504  | Gateway Timeout                 |
| 505  | HTTP Version Not Supported      |
| 506  | Variant Also Negotiates         |
| 507  | Insufficient Storage            |
| 508  | Loop Detected                   |
| 510  | Not Extended                    |
| 511  | Network Authentication Required |

---

# Les codes les plus utilisés en développement Web et API

## Succès

* 200 OK
* 201 Created
* 204 No Content

## Redirections

* 301 Moved Permanently
* 302 Found
* 304 Not Modified
* 307 Temporary Redirect
* 308 Permanent Redirect

## Erreurs client

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found
* 405 Method Not Allowed
* 409 Conflict
* 422 Unprocessable Content
* 429 Too Many Requests

## Erreurs serveur

* 500 Internal Server Error
* 502 Bad Gateway
* 503 Service Unavailable
* 504 Gateway Timeout

---

# Astuce de mémorisation

* 1xx → « J'ai reçu ton message »
* 2xx → « Tout s'est bien passé »
* 3xx → « Va chercher la ressource ailleurs »
* 4xx → « Le problème vient du client »
* 5xx → « Le problème vient du serveur »

Exemple :

Utilisateur → GET /users/1

Réponse :
HTTP/1.1 200 OK

Utilisateur → GET /users/9999

Réponse :
HTTP/1.1 404 Not Found

Utilisateur → POST /login avec un mot de passe incorrect

Réponse :
HTTP/1.1 401 Unauthorized

Utilisateur → GET /admin sans permission

Réponse :
HTTP/1.1 403 Forbidden

Serveur en panne

Réponse :
HTTP/1.1 500 Internal Server Error
