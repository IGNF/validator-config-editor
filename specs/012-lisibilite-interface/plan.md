# Plan : lisibilité de l'interface

**Feature** : `012-lisibilite-interface` | **Spec** : [spec.md](spec.md) | **Date** : 2026-10-27

## Résumé

- **Arbre allégé** : `ModelNode` ne garde que le modèle, les fichiers attendus, les surcharges
  GpU et le téléchargement. Un fichier attendu de type `table` mène à sa table. Le modèle et
  l'élément affichés sont mis en évidence.
- **Vue du modèle** : un bouton « Listes de codes (N) » et une section « Tables non référencées ».
- **Thème** : polices Open Sans et Fira Sans (`@fontsource`, intégrées au build), couleurs de
  `validator-api-client` aux contrastes AA, fond clair pour l'arbre et le panneau des problèmes.
- **Listes de codes** : la déclaration se fait par le fichier ; le nom en découle. Un nouvel
  avertissement, avec sa correction, signale un écart, et les clés étrangères suivent un
  renommage.

## Vérification des principes

| Principe | Respect |
|---|---|
| I. Format validator | Oui. `name` et `data` restent écrits tous les deux ; seul l'éditeur les lie. |
| II. Aucune perte silencieuse | Oui. Un renommage met à jour les clés étrangères dans la même étape ; rien n'est renommé sans action. |
| III. Cœur pur | Oui. Nom dérivé, avertissement, correction et renommage dans `src/core` ; l'arbre et le thème sont de l'interface. |
| IV. Tests d'abord, données réelles | Oui. SC-003 mesuré sur `VCE_CONFIG_DIR` et les configurations connues. |
| V. Local | Oui. Les polices sont dans le build, aucune ressource distante. |
| VI. Dépendances minimales | Dérogation justifiée (R4) : deux dépendances de **développement**. |
| VII. Français | Oui. |

## Décisions

- **R1 – Arbre** (`ModelNode`, `FileTreeNode`) :
  - **Sections retirées** : « Tables » et « Listes de codes ».
  - **Fichier attendu de type `table`** : lien vers sa table (`tableModelRef` puis
    `resolvePath`), si la table existe dans la session. Sinon, le lien mène au fichier dans la
    vue du modèle, comme aujourd'hui.
  - **Modèle courant** (celui du fichier affiché, `modelOf(route.file)`) : classe `current` sur
    son en-tête, avec texte en gras, barre latérale de 4 px (`primary`) et fond `primary` à 8 %.
  - **Élément affiché** : actif (`active` de Vuetify), en gras. Il est rendu visible par
    `scrollIntoView({ block: 'nearest' })` à chaque changement de route.

  Les éléments actifs portent `aria-current="page"`, qui ne repose pas sur la couleur (FR-003).

- **R2 – Vue du modèle** (`ModelView`) :
  - **Bouton « Listes de codes (N) »** dans l'en-tête, avec « Télécharger le modèle » et
    « Comparer ». Il mène à `href(files.json, '/codes')`, et la section des listes reçoit
    `data-pointer="/codes"`. Le cadre existant met en évidence et fait défiler l'élément désigné
    par le pointeur.
  - **Liste de chaque liste de codes** : son nombre de valeurs s'ajoute à son lien.
  - **Section « Tables non référencées »** : modèles de table du modèle qu'aucun fichier attendu
    ne désigne (même calcul que `WARN-UNREFERENCED-FILE`), avec un lien vers chacune. Elle
    n'apparaît que s'il y en a.

- **R3 – Couleurs** (`vuetify.ts`) :

  | Rôle | Thème clair | Thème sombre |
  |---|---|---|
  | `primary` (liens, boutons) | `#1a5fb4` (6,3:1) | `#8ab4e0` |
  | `secondary` (texte secondaire) | `#3f4a55` (9,0:1) | `#a3b4c6` |
  | `on-background`, `on-surface` (texte) | `#091625` | défaut |
  | `surface-light` (arbre, problèmes) | `#f4f6f8` | `#1b222b` |
  | `divider` (bordures) | `#dde1e6` | `#3f4a55` |
  | `accent` (décor seulement) | `#3993f3` | `#3993f3` |

  - **Panneaux latéraux** (`v-navigation-drawer`) : fond `surface-light`, bordure `divider`.
  - **En-tête** (`v-app-bar`) : blanc, bordure basse `divider`, texte `on-surface`. Il n'a plus
    le fond `primary`.
  - **Contrôle** : axe sur toutes les vues, en clair et en sombre (SC-002).

- **R4 – Polices.** `@fontsource/open-sans` et `@fontsource/fira-sans`, en version 5.3.0
  figée, sous licence OFL-1.1, avec leurs fichiers de licence.
  - **Chargement** : `main.ts` importe les graisses 400, 600 et 700 d'Open Sans, et 500 et 600
    de Fira Sans, sous-ensemble latin.
  - **Variables CSS** : `--v-font-body: 'Open Sans', …` et `--v-font-heading: 'Fira Sans', …`,
    que les classes de typographie de Vuetify lisent.
  - **Dérogation au principe VI**, deux dépendances de développement :
    - pourquoi : les polices doivent être servies localement (principe V), avec des versions et
      des mentions de licence exactes, que les fichiers de `validator-api-client` n'ont pas ;
    - effet : le paquet publié reste sans dépendance d'exécution, puisque Vite intègre les
      polices au build.

- **R5 – Nom d'une liste** (`src/core/edit/codelists.ts`, validation) :
  - **`listNameOf(data)`** : nom du fichier sans `.csv` (`./codes/ListeEtatPLU.csv` →
    `ListeEtatPLU`).
  - **Vue du modèle** : le champ « Nom de la liste » disparaît, le nom est affiché en texte.
    Choisir un fichier passe par **`renameCodeList(session, modèle, index, data)`**, qui :
    - écrit `data` ;
    - écrit `name = listNameOf(data)` ;
    - écrit `title` si le titre était égal à l'ancien nom ;
    - réécrit les clés étrangères `REFERENCES <ancien>(` des tables du modèle ;
    - le tout en une étape d'annulation (`applyChanges`).

    Le renommage est refusé si le nouveau nom est déjà déclaré dans le modèle.
  - **`WARN-CODE-NAME-FILE`** (avertissement, pointeur `/codes/<i>/name`) : `name` ≠
    `listNameOf(data)`. Correction « Renommer la liste en <nom> » (`renameCodeList` avec le
    `data` actuel). Il s'ajoute au contrat `problem-codes.md`.
  - **Création et copie** (feature 005) : inchangées, elles écrivent déjà
    `./codes/<nom>.csv` et `name = <nom>`.

## Structure du code

```
src/ui/main.ts, src/ui/vuetify.ts, src/ui/App.vue        polices, couleurs, en-tête, panneaux (R3, R4)
src/ui/components/ModelNode.vue, FileTreeNode.vue         arbre (R1)
src/ui/components/ModelView.vue                           bouton des listes, tables non référencées, déclaration par fichier (R2, R5)
src/core/edit/codelists.ts                                listNameOf, renameCodeList (R5)
src/core/validation/refs.ts, messages.ts, fixes/catalog.ts  WARN-CODE-NAME-FILE et sa correction
tests/unit/edit/codelists.test.ts, tests/unit/validation/validate.test.ts
tests/e2e/012-*.spec.ts, tests/e2e/a11y.spec.ts
```

## Dérogations

- **Principe VI** : `@fontsource/open-sans` et `@fontsource/fira-sans` en dépendances de
  développement (R4).
