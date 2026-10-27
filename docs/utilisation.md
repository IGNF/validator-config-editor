# Utilisation

## Éditeur en ligne ou éditeur local

| | [Éditeur en ligne](https://ignf.github.io/validator-config-editor/) | `vce serve` (éditeur local) |
|---|---|---|
| Installation | aucune | Node.js ≥ 22, dépendance du dépôt de configuration |
| Ouverture | dossier choisi dans le navigateur | dossier passé en argument |
| Enregistrement | téléchargement ZIP de toute la configuration | écriture directe des fichiers modifiés (Ctrl+S) |
| Validation, navigation, édition | identiques | identiques |

Dans l'éditeur en ligne, les fichiers sont lus par le navigateur : rien n'est envoyé sur le
réseau. Le site est publié par le workflow `pages.yml` à chaque merge sur `main`.

## Installation dans un dépôt de configuration

L'outil s'installe depuis un tag de version de ce dépôt (voir le [README](../README.md)) :
aucune publication npm, aucun build à l'installation, aucune dépendance d'exécution.

Après `npm install`, versionner `package.json` et `package-lock.json`, et ignorer
`node_modules/` :

```sh
echo node_modules/ >> .gitignore
git add package.json package-lock.json .gitignore
```

Pour passer à une nouvelle version : `npm install github:IGNF/validator-config-editor#vX.Y.Z`
(ou laisser Dependabot proposer la mise à jour). Les versions publiées sont les
[tags du dépôt](https://github.com/IGNF/validator-config-editor/tags).

Pour valider chaque PR du dépôt de configuration, `.github/workflows/check.yml` :

```yaml
name: Validation de la configuration
on: [pull_request, push]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npm run check
```

## `vce check`

```
vce check <dossier> [--format text|json] [--strict]
```

Valide tous les modèles du dossier :

- conformité de `files.json` et `types/*.json` à leur [JSON Schema](../src/core/schemas/) ;
- lisibilité des CSV de `codes/` (en-tête, nombre de colonnes) ;
- références croisées : modèle de table de chaque fichier (`tableModel`, ou `./types/<name>.json`
  par convention), fichiers des listes de codes, clés étrangères, `reference`, unicité des `id`, fichiers non référencés.

Chaque problème est affiché sous la forme `<fichier>:<pointeur JSON> <CODE> <message>` (voir la
[liste des codes](../specs/001-validation-globale/contracts/problem-codes.md)). `--format json`
produit un document JSON exploitable par un autre outil.

| Code de sortie | Cas |
|---|---|
| 0 | aucune erreur (et, avec `--strict`, aucun avertissement) |
| 1 | au moins une erreur (ou, avec `--strict`, au moins un avertissement) |
| 2 | usage incorrect ou dossier sans modèle |

## `vce site` : site en lecture seule

```
vce site <dossier> <sortie> [--title <titre>] [--force]
```

Écrit dans `<sortie>` un site statique de la configuration, en lecture seule, à publier sur
GitHub Pages ou sur n'importe quel serveur statique. Il contient l'interface de l'éditeur (celle de
la version installée) et un instantané de la configuration (`api/snapshot.json`). Il fonctionne
depuis un sous-chemin, sans aucune ressource distante.

Sur le site, on navigue, on consulte les problèmes, on compare des standards (« Comparer ») et les
éléments équivalents (onglet « Comparer »), et on télécharge des fichiers ; aucun champ n'est
modifiable et un bandeau l'indique. La configuration est validée et son résumé affiché, mais les
erreurs ne bloquent pas : le site les montre (le blocage reste le rôle de `vce check`).

- `--title` : titre affiché à la place du nom du dossier, par exemple
  `--title "validator-config-gpu (json-source)"` ;
- `--force` : remplace une sortie qui n'est ni vide ni un site déjà produit par `vce site`.

Code de sortie 0, ou 2 en cas d'usage incorrect (dossier inexistant ou sans modèle, sortie refusée).
Sur `validator-config-gpu`, le site pèse 8,5 Mo, se produit en moins d'une seconde et s'ouvre en
moins de deux.

### Publier sur GitHub Pages

Dans le dépôt de configuration :

1. **Settings → Pages → Source** : « GitHub Actions ».
2. Ajouter `.github/workflows/pages.yml` :

```yaml
name: Site de la configuration
on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npx vce site config _site --title "${{ github.event.repository.name }} (${{ github.ref_name }})"
      - uses: actions/upload-pages-artifact@v3
        with:
          path: _site

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Adapter `branches` (par exemple `json-source`) et le dossier `config`. Le site est publié à
`https://<organisation>.github.io/<dépôt>/`. Pour un dépôt interne, GitHub Pages limite l'accès
aux membres de l'organisation, selon les réglages de celle-ci.

## `vce compare`

```
vce compare <référence> <modèle> [--format text|json]
```

Compare deux dossiers de modèle, par exemple `config/cnig_PLU_2022` et `config/cnig_PLU_2024`,
comme le bouton « Comparer » de l'éditeur : dossier, fichiers attendus, tables, colonnes, listes de
codes et leur contenu. Le texte liste les éléments ajoutés (`+`), retirés (`-`) et modifiés (`~`),
puis le total ; `--format json` suit le contrat
[compare.md](../specs/011-comparaison-standards/contracts/compare.md). Code de sortie 0, ou 2 en
cas d'usage incorrect (dossier inexistant ou sans `files.json`). Utile pour relire une PR d'un dépôt
de configuration.

## `vce serve`

```
vce serve <dossier> [--port <n>] [--open]
```

Ouvre un éditeur local sur `http://127.0.0.1:5174/` (ou le port libre suivant ; `--port` impose
le port, `--open` ouvre le navigateur). Il permet de :

- filtrer et parcourir les modèles : sous chaque modèle, ses fichiers attendus (une table s'ouvre depuis son fichier) ; le modèle et l'élément affichés sont mis en évidence ; les listes de codes s'ouvrent depuis la vue du modèle (« Listes de codes (N) ») ;
- consulter un modèle (propriétés, fichiers, listes de codes), une table (colonnes, contraintes,
  clés étrangères, conditions), une liste de codes, en suivant les liens
  entre eux ;
- afficher le contenu exact de chaque fichier (onglet « Source ») ;
- appliquer une modification de colonne, de fichier attendu ou de déclaration de liste aux
  éléments équivalents des autres modèles (« Équivalents ») ; pour une colonne : même nom dans les tables équivalentes de la famille du
  modèle (`A1_ASSIETTE_SUP_S` ↔ `A2_ASSIETTE_SUP_S`) ou de toute la configuration, aperçu des
  valeurs actuelles, éléments à cocher, une seule étape d'annulation ; l'onglet « Comparer »
  montre les propriétés principales de chaque équivalent et marque « ≠ » les écarts ;
- comparer un modèle à un autre (« Comparer » dans la vue du modèle), par défaut à la version
  précédente du même standard : dossier, fichiers attendus, tables, colonnes et listes de codes
  ajoutés, retirés ou modifiés, avec l'ancienne et la nouvelle valeur, et codes ajoutés, retirés
  ou modifiés dans chaque liste. L'adresse
  (`#/cnig_PLU_2024/?compare=cnig_PLU_2022`) rouvre la même comparaison ;
- consulter les problèmes (les mêmes que `vce check`), les filtrer par sévérité, code ou modèle,
  et aller d'un clic à l'élément concerné ;
- corriger d'un clic les problèmes courants (« Corriger » dans le panneau des problèmes) :
  liste non déclarée ou à copier depuis un autre modèle, identifiant en
  double, nom mal saisi, valeur CSV contenant une virgule… ;
- modifier tables et modèles de document (annuler/rétablir), puis enregistrer les fichiers
  modifiés (« Enregistrer » ou Ctrl+S) : seuls ces fichiers sont réécrits, dans leur mise en forme
  d'origine, et un fichier modifié sur disque entre-temps n'est pas écrasé ;
- relire la configuration après une modification faite dans un autre outil (« Recharger »).

Le serveur n'écoute que sur `127.0.0.1` et ne sert que le dossier indiqué ; il n'écrit que des
fichiers `*.json` et `*.csv` existants de ce dossier.

## Configurations connues

| Dépôt | Modèles |
|---|---|
| [IGNF/validator-config-gpu](https://github.com/IGNF/validator-config-gpu) | standards CNIG du Géoportail de l'Urbanisme (PLU, CC, PSMV, SCoT, SUP…) |
| [IGNF/validator-config-dgpr](https://github.com/IGNF/validator-config-dgpr) | directive inondation, COVADIS, canalisations |
| [IGNF/validator-config-naviforest](https://github.com/IGNF/validator-config-naviforest) | dessertes forestières (SNDD) |
| [IGNF/validator-config-ppr](https://github.com/IGNF/validator-config-ppr) | plans de prévention des risques (PPR) |

Chacune est testée sur un extrait réel ([tests/fixtures/](../tests/fixtures/README.md)).
