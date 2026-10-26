# validator-config-editor

Outil de validation et d'édition des configurations
[IGNF/validator](https://github.com/IGNF/validator). Il travaille sur tout le dossier de
configuration à la fois :

- `vce check <dossier>` valide tous les modèles et leurs références croisées ;
- `vce serve <dossier>` ouvre un éditeur local dans le navigateur.

## Éditeur en ligne

**https://ignf.github.io/validator-config-editor/**

Sans installation : ouvrez le dossier `config/` d'un dépôt de configuration, parcourez,
validez et modifiez les modèles, puis téléchargez la configuration en ZIP. Les fichiers restent
sur votre poste.

## Utilisation dans un dépôt de configuration

À la racine du dépôt de configuration, créer `package.json` :

```json
{
  "private": true,
  "devDependencies": {
    "validator-config-editor": "github:IGNF/validator-config-editor#v0.1.0"
  },
  "scripts": {
    "edit": "vce serve config",
    "check": "vce check config"
  }
}
```

Puis, avec Node.js ≥ 22 :

```sh
npm install
npm run check   # valide config/ (code de sortie 1 en cas d'erreur)
npm run edit    # ouvre l'éditeur local sur http://127.0.0.1:5174/
```

Options, codes de sortie et fonctions de l'éditeur : [docs/utilisation.md](docs/utilisation.md).

## Contribuer

Voir [docs/](docs/README.md) : développement, principes, workflow spec → issue → PR.
