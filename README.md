# validator-config-editor

Outil de validation et d'édition des configurations
[IGNF/validator](https://github.com/IGNF/validator), par exemple
[IGNF/validator-config-gpu](https://github.com/IGNF/validator-config-gpu).

Il travaille sur tout le dossier de configuration à la fois :

- `vce check <dossier>` valide tous les modèles (`files.json`, `types/*.json`,
  `codes/*.csv`, `gpu.json`) et leurs références croisées, en local ou en intégration continue ;
- `vce serve <dossier>` ouvre un éditeur local dans le navigateur.

> Projet en cours de spécification : voir [specs/](specs/).

## Éditeur en ligne

**https://ignf.github.io/validator-config-editor/**

Sans installation : ouvrez le dossier `config/` (ou la racine d'un clone de dépôt de
configuration), parcourez et validez les modèles, modifiez tables et modèles de document, puis
téléchargez toute la configuration en ZIP. Les fichiers restent sur votre poste : ils sont lus par
le navigateur, rien n'est envoyé sur le réseau.

| | Éditeur en ligne | `vce serve` (éditeur local) |
|---|---|---|
| Installation | aucune | Node.js ≥ 22, dépendance du dépôt de configuration |
| Ouverture | dossier choisi dans le navigateur | dossier passé en argument |
| Enregistrement | téléchargement ZIP de toute la configuration | écriture directe des fichiers modifiés (Ctrl+S) |
| Validation, navigation, édition | identiques | identiques |

Le site est publié par le workflow `pages.yml` à chaque merge sur `main`.

## Configurations connues

| Dépôt | Modèles |
|---|---|
| [IGNF/validator-config-gpu](https://github.com/IGNF/validator-config-gpu) | standards CNIG du Géoportail de l'Urbanisme (PLU, CC, PSMV, SCoT, SUP…) |
| [IGNF/validator-config-dgpr](https://github.com/IGNF/validator-config-dgpr) | directive inondation, COVADIS, canalisations |
| [IGNF/validator-config-naviforest](https://github.com/IGNF/validator-config-naviforest) | dessertes forestières (SNDD) |
| [IGNF/validator-config-ppr](https://github.com/IGNF/validator-config-ppr) | plans de prévention des risques (PPR) |

Chacune est testée sur un extrait réel (`tests/fixtures/`).

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

## `vce check`

```
vce check <dossier> [--format text|json] [--strict]
```

Valide tous les modèles du dossier :

- conformité de `files.json`, `types/*.json` et `gpu.json` à leur [JSON Schema](src/core/schemas/) ;
- lisibilité des CSV de `codes/` (en-tête, nombre de colonnes) ;
- références croisées : modèle de table de chaque fichier (`tableModel`, ou `./types/<name>.json`
  par convention), fichiers des listes de codes, clés étrangères, `reference`, modèle parent,
  unicité des `id`, `id` de `gpu.json`, fichiers non référencés.

Chaque problème est affiché sous la forme `<fichier>:<pointeur JSON> <CODE> <message>` (voir la
[liste des codes](specs/001-validation-globale/contracts/problem-codes.md)). `--format json`
produit un document JSON exploitable par un autre outil.

| Code de sortie | Cas |
|---|---|
| 0 | aucune erreur (et, avec `--strict`, aucun avertissement) |
| 1 | au moins une erreur (ou, avec `--strict`, au moins un avertissement) |
| 2 | usage incorrect ou dossier sans modèle |

## `vce serve`

```
vce serve <dossier> [--port <n>] [--open]
```

Ouvre un éditeur local sur `http://127.0.0.1:5174/` (ou le port libre suivant ; `--port` impose
le port, `--open` ouvre le navigateur). Il permet de :

- filtrer et parcourir les modèles ;
- consulter un modèle (propriétés, parent, fichiers, listes de codes), une table (colonnes,
  contraintes, clés étrangères, conditions), une liste de codes et les surcharges GpU, en suivant
  les liens entre eux ;
- afficher le contenu exact de chaque fichier (onglet « Source ») ;
- consulter les problèmes (les mêmes que `vce check`), les filtrer par sévérité, code ou modèle,
  et aller d'un clic à l'élément concerné ;
- relire la configuration après une modification faite dans un autre outil (« Recharger ») ;
- corriger d'un clic les problèmes courants (« Corriger » dans le panneau des problèmes) :
  surcharge GpU orpheline, liste non déclarée ou à copier depuis un autre modèle, identifiant en
  double, nom mal saisi, valeur CSV contenant une virgule…

- modifier tables et modèles de document (annuler/rétablir), puis enregistrer les fichiers
  modifiés (« Enregistrer » ou Ctrl+S) : seuls ces fichiers sont réécrits, dans leur mise en forme
  d'origine, et un fichier modifié sur disque entre-temps n'est pas écrasé.

Le serveur n'écoute que sur `127.0.0.1` et ne sert que le dossier indiqué ; il n'écrit que des
fichiers `*.json` et `*.csv` existants de ce dossier.

## Développement

```sh
npm ci
npm test                 # tests unitaires
npm run build            # dist/ui (interface) et dist/cli.js (CLI)
npm run test:e2e         # tests de bout en bout (Chromium, Firefox)
node bin/vce.js check tests/fixtures/config
VCE_CONFIG_DIR=~/gpu/validator-config-gpu/config npm test   # + configuration complète
```

## Documentation développeurs

- [Principes du projet](docs/principes.md)
- [Workflow spec → issue → PR](docs/developper/workflow.md)
- [Conventions de commit](docs/developper/Doc_commit.md)

## Arborescence

- `specs/` : spécifications, plans et tâches, une feature par dossier ;
- `docs/` : principes et documentation développeurs ;
- `.github/` : modèles d'issues et de PR, workflows ;
- `tests/` : tests unitaires et de bout en bout.
