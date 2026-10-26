# Plan : navigation et validation globale d'une configuration validator

**Feature** : `001-validation-globale` | **Spec** : [spec.md](spec.md) | **Date** : 2026-10-16

> **Mise à jour du 2026-10-26** : l'héritage (`parent`, modèles abstraits `cnig_SUP_XXX_*`,
> `ERR-PARENT-MISSING`) n'est plus géré par l'éditeur : `parent` est toléré sans être vérifié, un
> dossier sans `files.json` donne `WARN-MODEL-NO-DOCUMENT`. Les passages sur l'héritage
> ci-dessous sont caducs.

## Résumé

L'outil est un paquet Node unique, qui fournit la commande `vce` :

- `vce check <dossier>` charge la configuration via une abstraction de système de fichiers, la
  valide (JSON Schema compilés à l'avance + références croisées) et affiche un rapport ;
- `vce serve <dossier>` sert une interface Vue/Vuetify construite statiquement, plus une API
  locale en lecture. L'interface exécute le **même** cœur de validation dans le navigateur.

Les dépôts de configuration installent l'outil depuis un tag git. Ce tag contient le build, si
bien que l'installation ne compile rien et n'installe aucune dépendance.

## Contexte technique

| | |
|---|---|
| Langage | TypeScript 5.9 strict (`noUncheckedIndexedAccess`), ESM, cible ES2022 |
| Exécution | Node.js ≥ 22 pour la CLI ; navigateurs récents (Chromium, Firefox) pour l'interface |
| Interface | Vue 3, Vuetify 4 (locale FR, icônes SVG `@mdi/js`), Pinia |
| Validation | Ajv 8, draft-07, code autonome généré (`scripts/compile-schemas.ts`) |
| Build | Vite : `vite.config.ts` (interface → `dist/ui/`) et `vite.cli.config.ts` (CLI → `dist/cli.js`, tout embarqué, cible node22) |
| Tests | Vitest (unitaires, couverture v8 ≥ 90 % sur `src/core`), Playwright (Chromium, Firefox, axe) |
| Qualité | ESLint 10 + typescript-eslint, `vue-tsc --noEmit` |
| Données de référence | `IGNF/validator-config-gpu`, branche `json-source` : 151 modèles, 1 097 tables, 1 213 CSV, ≈ 2 600 fichiers |
| Objectifs de performance | `check` < 5 s sur la config de référence ; ouverture de l'interface < 3 s |

## Vérification des principes

| Principe | Respect |
|---|---|
| I. Format validator source de vérité | Oui. Les schémas sont dérivés de l'inventaire des fichiers réels (R2), et aucun format intermédiaire n'est écrit. |
| II. Aucune perte silencieuse | Oui. La feature est en lecture seule (FR-014) et les propriétés inconnues sont acceptées par les schémas (`additionalProperties` non fermé). |
| III. Cœur pur | Oui. `src/core` n'importe ni `node:*` ni Vue, ce qu'impose une règle ESLint. Le chargement passe par l'interface `ConfigFs`. |
| IV. Tests d'abord, données réelles | Oui. Les fixtures sont copiées de `validator-config-gpu`, avec un cas `invalid/` par code et un test optionnel sur la config complète (`VCE_CONFIG_DIR`). |
| V. Local et hors ligne | Oui. Le serveur écoute sur `127.0.0.1`, contrôle l'en-tête `Host`, confine les chemins, et la CSP `default-src 'self'` s'applique. |
| VI. Dépendances minimales | Oui. `dependencies` est vide : la CLI et l'interface sont des bundles autonomes. Les dépendances de développement sont alignées sur tableschema-editor. |
| VII. Français | Oui. Les messages sont centralisés dans `src/core/validation/messages.ts`. |

## Décisions

- **R1 – Distribution par tag git contenant le build.**
  - Le workflow `release.yml` (déclenché à la main avec une version `X.Y.Z`) lance les tests et
    le build. Il crée ensuite un commit détaché qui ajoute `dist/` au contenu de `main`, puis
    pose et pousse le tag `vX.Y.Z` sur ce commit et crée la release GitHub.
  - Les dépôts de configuration dépendent de `github:IGNF/validator-config-editor#vX.Y.Z` :
    `npm ci` ne fait que copier les fichiers, sans `prepare`, sans build et sans dépendance.
    Dependabot sait suivre les tags semver d'une dépendance git.
  - Alternative écartée : un script `prepare` qui builde à l'installation. Il installerait
    Vite, Vue et Playwright chez chaque contributeur du dépôt de configuration.
  - Repli possible sans changer l'usage : publication sur npmjs (`@ignf/validator-config-editor`).
- **R2 – JSON Schema propres, dérivés de l'inventaire réel.**
  - Les schémas `document.json`, `table.json` et `gpu.json` (draft-07) sont dans
    `src/core/schemas/`, avec un `README.md` qui documente leur origine : l'inventaire de la
    config de référence, `validator/doc/document_model.md` et le modèle Java
    `fr.ign.validator.model`.
  - Ce qu'ils retiennent :
    - types de colonne : les 16 types Java (`Boolean`, `Date`, `Double`, `Filename`,
      `Geometry`, `GeometryCollection`, `Integer`, `LineString`, `MultiLineString`,
      `MultiPoint`, `MultiPolygon`, `Path`, `Point`, `Polygon`, `String`, `Url`) ;
    - types de fichier : `table`, `multi_table`, `pdf`, `metadata`, `directory` ;
    - `mandatory` : `ERROR`, `WARN`, `OPTIONAL` ;
    - `id` : `^[0-9a-f]{32}$` ;
    - `parent` : un modèle de document complet, avec `abstract: true`.
  - Les objets restent ouverts (propriétés inconnues acceptées) : on signale les erreurs de
    forme, pas les extensions.
- **R3 – Ajv compilé à l'avance**, comme `tableschema-editor/scripts/compile-profiles.ts`.
  - On génère `src/core/schemas/generated/validate.js`, qui exporte `validateDocument`,
    `validateTable` et `validateGpu`, et l'on y réécrit les `require` en imports statiques.
  - Le fichier est versionné, et la CI vérifie qu'il est à jour (`git diff --exit-code`).
  - Ajv n'est donc jamais compilé à l'exécution, et la CSP n'a pas besoin de `unsafe-eval`.
- **R4 – Abstraction `ConfigFs`.**
  - `interface ConfigFs { listFiles(): Promise<string[]>; readText(path: string): Promise<string> }`,
    où les chemins sont relatifs au dossier, séparés par `/`.
  - Deux implémentations, toutes deux hors du cœur :
    - `NodeConfigFs` (`src/cli/fs.ts`), qui lit le disque ;
    - `SnapshotConfigFs` (`src/ui/io/snapshot.ts`), qui lit l'instantané renvoyé par l'API.
  - Les tests utilisent un `MemoryConfigFs` (`tests/support`).
- **R5 – API locale minimale et instantané unique.**
  - `GET /api/snapshot` renvoie `{ root, files: { "<chemin>": "<texte>" } }` pour tous les
    `*.json` et `*.csv` du dossier, soit environ 8 Mo pour la config de référence, en local.
  - Une seule requête suffit, et « Recharger » refait la même.
  - Le reste (`/`, `/assets/*`) sert `dist/ui/`.
  - Détails dans [contracts/cli.md](contracts/cli.md).
- **R6 – Sécurité du serveur.**
  - Écoute sur `127.0.0.1` uniquement, port 5174 par défaut, ou le port libre suivant.
  - En-tête `Host` exigé égal à `127.0.0.1:<port>` ou `localhost:<port>`, contre le DNS
    rebinding.
  - Méthode `GET` uniquement.
  - Lecture limitée aux fichiers listés depuis la racine, après `realpath`, si bien qu'un lien
    symbolique sortant est ignoré.
  - Pas de CORS.
  - En-têtes de sécurité : `Content-Security-Policy`, `X-Content-Type-Options: nosniff`.
- **R7 – Parseur CSV maison** (`src/core/load/csv.ts`, environ 60 lignes, RFC 4180).
  - Il gère les guillemets, les virgules et les sauts de ligne entre guillemets, `\r\n` et le
    BOM UTF-8.
  - Il renvoie `{ header, rows }` ou une erreur localisée par ligne.
  - Pas de dépendance, conformément au principe VI.
- **R8 – Clés étrangères.**
  - Analyse identique au validator (`ForeignKeyConstraint.parseForeignKey`) : on supprime les
    espaces autour de `(`, `)` et `,`, puis on applique
    `^\(\w+(,\w+)*\)REFERENCES *\w+\(\w+(,\w+)*\)$`, avec des listes de même longueur.
  - Les clés multi-colonnes sont prises en charge, par exemple
    `(TYPEINF, STYPEINF) REFERENCES InformationUrbaType(TYPEINF, STYPEINF)`.
  - La cible est cherchée dans `codes[]` du modèle, puis parmi les tables du modèle, comme le
    validator (qui ignore `parent`).
  - Modèle de table d'un fichier : `tableModel`, sinon `./types/<name>.json`
    (`AbstractModelReader.resolveFeatureTypeUrl`). `auto` et les URL ne sont pas vérifiés.
- **R9 – Modèles abstraits et héritage SUP.**
  - Un dossier sans `files.json` est un modèle abstrait s'il est désigné comme `parent.name`
    par au moins un modèle. Sinon, on émet l'avertissement `WARN-MODEL-NO-DOCUMENT`.
  - Le `parent` embarqué est propre au GpU : le validator l'ignore. Il ne sert ni à résoudre les
    références ni à l'unicité des `id`. Seuls ses `id` alimentent les `id` connus de `gpu.json`
    (R10).
- **R10 – Ensemble des `id` connus pour `gpu.json`.** Une clé de section est connue si elle
  figure dans l'un de ces ensembles :
  - les `id` des objets du modèle (`files.json` avec son parent embarqué, et `types/*.json`) ;
  - les `id` définis dans le `gpu.json` du modèle parent abstrait (entrées de définition) ;
  - les entrées du `gpu.json` courant qui sont elles-mêmes des définitions (avec `name`,
    `feature_type_id` ou `document_model_id`).

  Toute autre clé est un `id` orphelin (`WARN-GPU-ORPHAN-ID`). La règle sera ajustée sur les
  données réelles (SC-002).
- **R11 – Un problème a une seule sévérité.** Il n'y a pas de mode strict ou permissif ici.
  L'option `--strict` de la CLI change seulement le code de sortie.
- **R12 – Interface.**
  - Un seul store Pinia `project` : instantané, résultat de chargement, problèmes, sélection,
    filtres.
  - La sélection est encodée dans le fragment d'URL (`#/<modèle>/types/<TABLE>?col=<NOM>`),
    ce qui permet le retour arrière et les liens.
  - Trois zones :
    - à gauche, l'arbre des modèles filtrable, avec des compteurs de problèmes ;
    - au centre, la vue de l'élément ;
    - en bas, le panneau des problèmes, repliable.

## Structure du code

```
bin/vce.js                         #!/usr/bin/env node ; import('../dist/cli.js')
src/core/                          pur (ESLint : pas de node:*, vue, vuetify, pinia, @ui, @cli)
  model/types.ts                   DocumentModel, FileModel, StaticTable, TableModel, Column, GpuFile, LoadedModel, Project
  load/fs.ts                       interface ConfigFs
  load/json.ts                     parseJson(text) → valeur | problème ERR-JSON-SYNTAX (ligne, colonne)
  load/csv.ts                      parseCsv(text) → { header, rows } | problème
  load/project.ts                  loadProject(fs) → Project (modèles, tables, codes, gpu, problèmes de chargement)
  schemas/{document,table,gpu}.json, README.md
  schemas/generated/validate.{js,d.ts}
  validation/schema.ts             erreurs Ajv → Problem (ERR-SCHEMA)
  validation/refs.ts               références croisées (codes ERR-/WARN- du contrat)
  validation/foreign-key.ts        parseForeignKey (R8)
  validation/validate.ts           validateProject(project) → Problem[] trié (modèle, fichier, pointeur)
  validation/problems.ts           type Problem, summarize()
  validation/messages.ts           messages FR par code
  pointer.ts                       échappement et parcours de pointeurs JSON
src/cli/                           Node (bibliothèque standard uniquement)
  main.ts                          analyse argv, aide, codes de sortie
  fs.ts                            NodeConfigFs (readdir récursif, realpath confiné)
  check.ts                         rapport texte ou JSON
  server.ts                        serveur http, API, fichiers statiques, contrôles R6
src/ui/
  main.ts, App.vue, vuetify.ts, router.ts (fragment d'URL)
  io/snapshot.ts                   fetch /api/snapshot → SnapshotConfigFs
  stores/project.ts
  components/ModelTree.vue, ModelView.vue, TableView.vue, CodeListView.vue,
             GpuView.vue, SourceView.vue, ProblemsPanel.vue
scripts/compile-schemas.ts
tests/
  support/memory-fs.ts, support/fixtures.ts
  fixtures/config/                 extrait réel : cnig_PLU_2017, cnig_SUP_XXX_2016, cnig_SUP_A1_2016, GPU_MEC_2025
  fixtures/invalid/<CODE>/         une mini-configuration par code de problème
  unit/**                          un fichier par module de src/core et src/cli
  e2e/us2-navigation.spec.ts, us3-problems.spec.ts, a11y.spec.ts, no-remote.spec.ts
.github/workflows/ci.yml, release.yml
```

## Contrats

- [contracts/problem-codes.md](contracts/problem-codes.md) : codes, sévérités et messages.
- [contracts/cli.md](contracts/cli.md) : commandes, options, sorties, codes de sortie et API du
  serveur local.

## Risques

- **Faux positifs sur la config réelle** (`id` dupliqués, `id` orphelins de `gpu.json`). On les
  analyse un par un pendant l'US1 ; chaque règle douteuse démarre en avertissement.
- **Taille de l'instantané.** Si l'ouverture dépasse 3 s, on passera à un chargement par modèle.
  L'API est conçue pour que ce soit un ajout.
- **Dérive du format.** Si une nouvelle propriété apparaît dans la config, les schémas ouverts
  évitent les erreurs bloquantes, et le test sur données réelles la révèle.

## Dérogations

Aucune.
