# Plan : édition des modèles et éditeur en ligne

**Feature** : `002-edition-en-ligne` | **Spec** : [spec.md](spec.md) | **Date** : 2026-10-16

## Résumé

L'interface de la feature 001 devient éditable. Les modifications sont des fonctions pures du
cœur, appliquées à la donnée JSON d'un fichier par pointeur, et revalidées à chaque pas. L'interface est
alimentée par une **source de configuration** interchangeable :

- `ServerSource` (`vce serve`) : instantané, puis enregistrement des fichiers modifiés sur disque
  (`PUT /api/file`) ;
- `FolderSource` (éditeur en ligne) : dossier choisi dans le navigateur, téléchargement ZIP.

L'éditeur en ligne est le même code, construit en mode `pages` et publié sur GitHub Pages par un
workflow.

## Contexte technique

Le contexte technique est celui de la feature 001 ([plan 001](../001-validation-globale/plan.md)),
sans nouvelle dépendance.

| | |
|---|---|
| Nouveaux modules du cœur | `edit/` (pointeurs, opérations, historique, identifiants), `serialize.ts`, `zip.ts` |
| Nouvelles API navigateur | `<input webkitdirectory>`, `Blob` et `URL.createObjectURL`, `crypto.getRandomValues`, `crypto.subtle.digest` |
| Build | `vite build --mode pages` → `dist/pages/` (CSP en `<meta>`, aucun appel à `api/`) |
| Données de référence | les 4 configurations connues : 1 610 JSON, indentés de 2 ou 4 espaces, LF ou CRLF, avec ou sans saut de ligne final |
| Objectifs | revalidation < 1 s sur `validator-config-gpu` ; ouverture d'un dossier < 3 s |

## Vérification des principes

| Principe | Respect |
|---|---|
| I. Format validator | Oui. Les fichiers sont écrits au format d'origine (R4), et aucun format intermédiaire n'est écrit. |
| II. Aucune perte silencieuse | Oui. Les éditions se font par pointeur et conservent les propriétés inconnues et l'ordre des clés. Un fichier non modifié n'est jamais réécrit, un fichier non reproductible est signalé (R4), et l'enregistrement sur disque est refusé en cas de conflit (R8). |
| III. Cœur pur | Oui. Les éditions, la sérialisation, le ZIP et l'historique sont dans `src/core`. Les sources sont dans `src/ui/io` et `src/cli`. |
| IV. Tests d'abord, données réelles | Oui. Aller-retour octet pour octet testé sur les fixtures des 4 configurations, ZIP relu par un lecteur indépendant (`unzip` ou Python `zipfile` en test). |
| V. Local et hors ligne | Oui. L'éditeur en ligne lit le dossier dans le navigateur et n'émet aucune requête de données. Le serveur reste sur `127.0.0.1`, et l'écriture est limitée aux `*.json` et `*.csv` existants. |
| VI. Dépendances minimales | Oui. ZIP (stockage, CRC-32) et génération d'`id` écrits en interne, environ 80 lignes, sans dépendance. |
| VII. Français | Oui. |

## Décisions

- **R1 – Sources de configuration.** L'interface ne dépend que de ce contrat :

  ```ts
  interface ConfigSource {
    kind: 'server' | 'folder'
    label: string
    load(onProgress?): Promise<Map<string, string>>
    save?(changes: Map<string, string>, originals: Map<string, string>): Promise<SaveResult>
  }
  ```

  - `ServerSource` fournit `save` ; `FolderSource` n'en a pas, et propose le téléchargement
    ZIP.
  - La feature 003 ajoutera `GitHubSource` sur le même contrat.

- **R2 – Modèle d'édition.**
  - Le store garde trois choses : les textes d'origine (`originals`), la donnée courante des
    fichiers modifiés (`edited: Map<chemin, Json>`) et le résultat de validation.
  - Une édition est une fonction pure `(données) → données` appliquée à un fichier.
  - Le projet chargé n'est pas re-parsé : seul `JsonFile.data` du fichier édité est remplacé,
    puis `validateProject` est relancé. La lecture des 2 600 fichiers n'a lieu qu'au chargement.
  - Mesure 001 : 115 ms pour lire et valider `validator-config-gpu`. L'objectif est < 1 s par
    édition.

- **R3 – Opérations d'édition** (`src/core/edit/`).
  - `pointer.ts` est repris de tableschema-editor : `getAt`, `setAt`, `removeAt`, en immuable
    avec partage structurel. `setAt` sur une clé existante garde sa position, et une nouvelle
    clé est ajoutée en fin d'objet.
  - Opérations de liste : `insertAt`, `moveAt`.
  - Opérations métier en fonctions pures, testées : `addColumn`, `removeColumn`, `moveColumn`,
    `setConstraint` (une valeur vide retire la contrainte), `addFile`, `addCode`, etc.
  - Le parent embarqué (`/parent/...`) est refusé par l'interface : l'édition par pointeur ne
    propose aucun champ sous `/parent`.

- **R4 – Sérialisation fidèle** (`src/core/serialize.ts`).
  - `detectStyle(texte)` donne l'indentation (première indentation d'une clé, 2 ou 4 espaces,
    ou tabulation), la fin de ligne (LF ou CRLF) et le saut de ligne final.
  - `serialize(donnée, style)` produit `JSON.stringify(donnée, null, indentation)` avec la fin
    de ligne et le saut final du style.
  - `isReproducible(texte)` vérifie que `serialize(parse(texte), detectStyle(texte)) === texte`.
  - Mesure sur les 4 configurations : 1 604 fichiers sur 1 610 sont reproductibles. Les 6
    autres sont mis en forme à la main (objet vide sur plusieurs lignes, lignes vides). Leur
    première modification affiche « Ce fichier sera réindenté ».
  - La spec (US4, scénario 3) est ainsi précisée : on conserve le **style du fichier**, pas une
    mise en forme fixe.

- **R5 – Historique** (`src/core/edit/history.ts`). C'est une pile de pas
  `{ chemin, avant, après }`. On ne garde que la donnée du fichier touché, pas une copie de
  toute la configuration. La pile est limitée à 100 pas, et les saisies successives d'un même
  champ en moins d'1 s sont fusionnées (comme tableschema-editor).

- **R6 – Identifiants** (`src/core/edit/ids.ts`).
  - `newId(existants, aléa)` produit 32 caractères hexadécimaux, à partir de 16 octets de
    `crypto.getRandomValues`, et les retire tant qu'ils figurent déjà dans `existants` (index
    des `id` de toute la configuration).
  - `aléa` est injecté pour les tests.
  - Un nouvel objet ne reçoit un `id` que si son modèle en utilise : dans ppr, aucun objet n'a
    d'`id`, et on n'en ajoute pas.

- **R7 – ZIP** (`src/core/zip.ts`). `zip(entrées) → Uint8Array` :
  - méthode « stockage » (pas de compression), CRC-32 par table, noms en UTF-8 (bit 11),
    en-têtes locaux et répertoire central, sans ZIP64 (limite de 4 Go, très au-delà des 8 Mo de
    `validator-config-gpu`) ;
  - les fichiers non modifiés sont écrits avec leur texte d'origine, octet pour octet ;
  - nom de l'archive : `<nom du dossier choisi>.zip`, avec les chemins relatifs à la
    configuration et préfixés par ce nom, ce qui donne un seul dossier à la décompression.

- **R8 – Écriture dans `vce serve`.**
  - `PUT /api/file?path=<chemin>` avec le corps du texte et l'en-tête
    `If-Match: "<sha256 du texte d'origine>"`.
  - Le serveur refuse avec 409 si le contenu courant sur disque a une autre empreinte, et avec
    403 si le chemin est hors du dossier ou si le fichier n'est pas un `*.json` ou `*.csv`
    existant.
  - Il écrit de façon atomique (fichier temporaire puis `rename`).
  - Le contrôle de `Host` (001) s'applique toujours. Un `PUT` venant d'un autre site exige un
    pré-contrôle CORS, auquel le serveur ne répond pas, donc la requête est bloquée par le
    navigateur.
  - `Ctrl+S` enregistre tous les fichiers modifiés, et le résultat est donné fichier par
    fichier.

- **R9 – Ouverture d'un dossier** (`src/ui/io/folder.ts`).
  - `<input type="file" webkitdirectory>` donne les `File` avec `webkitRelativePath`.
  - On ignore les dossiers cachés, `node_modules/` et les fichiers autres que `*.json` et
    `*.csv`.
  - Si le dossier contient `config/` avec au moins un `files.json` ou `gpu.json` de modèle, la
    racine devient `config/`.
  - Les fichiers sont lus en parallèle (`file.text()`).

- **R10 – Mode `pages`.**
  - `vite build --mode pages` produit `dist/pages/`, avec `base: './'` et
    `import.meta.env.MODE === 'pages'`. L'application démarre alors sur l'accueil « Ouvrir un
    dossier » au lieu de lire `api/snapshot`.
  - La CSP est mise en `<meta>`, car GitHub Pages n'envoie pas d'en-têtes.
  - Le workflow `pages.yml` construit et publie sur `main` après la CI (`actions/deploy-pages`).
  - Avertissement `beforeunload` s'il reste des modifications non téléchargées ou non
    enregistrées.

- **R11 – Formulaires.**
  - Les vues de la 001 deviennent éditables sur place : champs Vuetify liés à
    `edit(chemin, pointeur, valeur)`.
  - On garde une seule vue par élément, sans mode « édition » séparé.
  - L'arbre et le titre marquent les fichiers modifiés (`●`).
  - Les boutons Annuler et Rétablir sont dans la barre, avec Ctrl+Z, Ctrl+Maj+Z et Ctrl+Y.
  - Un fichier non conforme à son schéma reste en lecture (onglet « Source »).

## Structure du code (ajouts)

```
src/core/edit/{pointer,operations,history,ids}.ts
src/core/serialize.ts                detectStyle, serialize, isReproducible
src/core/zip.ts                      zip, crc32
src/core/validation/validate.ts      + revalidate(project, chemin, donnée)
src/cli/server.ts                    + PUT /api/file
src/ui/io/source.ts                  interface ConfigSource
src/ui/io/{server,folder}.ts         ServerSource, FolderSource
src/ui/io/download.ts                téléchargement d'un Blob
src/ui/stores/project.ts             + originals, edited, history, edit(), undo(), redo(), save(), download()
src/ui/components/Home.vue           accueil du mode pages
src/ui/components/fields/*.vue       champs réutilisables (texte, nombre, booléen, liste, select)
.github/workflows/pages.yml
tests/unit/edit/*, serialize.test.ts, zip.test.ts, cli/server-write.test.ts
tests/e2e/us1-folder.spec.ts … us5-save.spec.ts
```

## Contrats

- [contracts/source-et-ecriture.md](contracts/source-et-ecriture.md) : `ConfigSource`,
  `PUT /api/file`, format du ZIP, règles de sérialisation.

## Risques

- **Formulaires nombreux.** La table la plus large compte environ 40 colonnes, chacune avec
  environ 8 contraintes. On rend les formulaires de colonne repliés (une ligne, détail à
  l'ouverture) pour garder une vue fluide.
- **Navigateurs sans `webkitdirectory`** : message explicite, sans solution de repli dans cette
  feature.
- **Activation de GitHub Pages** : il faut un dépôt public ou Pages privé, et un réglage du
  dépôt (Settings → Pages → GitHub Actions) à faire par un administrateur.

## Dérogations

Aucune.
