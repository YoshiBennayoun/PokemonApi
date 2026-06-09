# Login , bcrypt

Le login , est une opération qui permet de vérifier si un utilisateur existe et si son mot de passe est correct.
Grâce à bcrypt, on peut vérifier si le mot de passe est correct.
Comment procède t-on ?
La meilleure de l'expliquer est de procéder via la méthode BMAB (Besoin ,Modèle ,Action , Bilan)

## Besoin

Connecter un utilisateur via ses informations de connexion (email et mot de passe), dans notre cas username et password.

Après avoir vérifié que l'utilisateur existe et que le mot de passe est correct, on génère un token JWT pour l'utilisateur.

## Modèle

Le modèle , est une étape qui donne une représentation de l'objet qui va être utilisé dans l'action.
Dans notre cas, le modèle est l'objet user qui contient les informations `username` et `password`, c'est on se basant du modèle qu'on peut procéder à l'action.

**modèle**`user`
```json
{
    "username": "string",
    "password": "string"
}
```

## Action

L'action , est une étape qui consiste à la réalisation du besoin(login,pour nous).
Dans notre cas, l'action est la fonction `login` qui permet de vérifier si l'utilisateur existe et si son mot de passe est correct.

```javascript
const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Mot de passe incorrect' });
    }
    return res.json({ message: 'Utilisateur connecté avec succès' });
 
};
```
