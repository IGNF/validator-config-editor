# validator-config-editor

Outil de validation et d'édition des configurations
[IGNF/validator](https://github.com/IGNF/validator), par exemple
[IGNF/validator-config-gpu](https://github.com/IGNF/validator-config-gpu).

Il travaille sur tout le dossier de configuration à la fois :

- `vce check <dossier>` valide tous les modèles (`files.json`, `types/*.json`,
  `codes/*.csv`, `gpu.json`) et leurs références croisées, en local ou en intégration continue ;
- `vce serve <dossier>` ouvre un éditeur local dans le navigateur.

> Projet en cours de spécification : voir [specs/](specs/).

## Utilisation dans un dépôt de configuration

```json
{
  "private": true,
  "devDependencies": {
    "validator-config-editor": "github:IGNF/validator-config-editor#v1.0.0"
  },
  "scripts": {
    "edit": "vce serve config",
    "check": "vce check config"
  }
}
```

```sh
npm ci
npm run check   # valide config/
npm run edit    # ouvre l'éditeur local
```

Les modifications sont ensuite versionnées avec git, comme d'habitude.

## Documentation développeurs

- [Principes du projet](docs/principes.md)
- [Workflow spec → issue → PR](docs/developper/workflow.md)
- [Conventions de commit](docs/developper/Doc_commit.md)

## Arborescence

- `specs/` : spécifications, plans et tâches, une feature par dossier ;
- `docs/` : principes et documentation développeurs ;
- `.github/` : modèles d'issues et de PR, workflows ;
- `tests/` : tests unitaires et de bout en bout.

## Contacts

|Nom|Prénom|mail|fonction|
|---|---|---|---|
|Cerizay|Florian|florian.cerizay@ign.fr|   |
