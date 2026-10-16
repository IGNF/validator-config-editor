# Tâches : navigation et validation globale d'une configuration validator

**Spec** : [spec.md](spec.md) | **Plan** : [plan.md](plan.md) | **Issue parente** : #6

Notation :

- `[P]` : la tâche peut être menée en parallèle des autres tâches `[P]` de la même phase ;
- `[USk]` : la tâche relève de la user story k ;
- une phase correspond à une issue, une branche et une PR ;
- dans chaque phase, les tests sont écrits et échouent avant le code correspondant.

## Phase 1 : socle — branche `001-validation-globale/socle` (#6)

- [x] T001 `package.json` : nom `validator-config-editor`, `type: module`, `bin: { vce: bin/vce.js }`, `engines.node >= 22`, `files: [bin, dist]`, `dependencies` vide, `devDependencies` figées et alignées sur tableschema-editor (ajv, vue, vuetify, pinia, @mdi/js, vite, @vitejs/plugin-vue, vite-plugin-vuetify, vue-tsc, typescript, tsx, vitest, @vitest/coverage-v8, @playwright/test, @axe-core/playwright, eslint, typescript-eslint, @types/node). Scripts : `dev`, `build`, `build:ui`, `build:cli`, `schemas`, `typecheck`, `lint`, `test`, `test:coverage`, `test:e2e`
- [x] T002 [P] `tsconfig.json` strict (`noUncheckedIndexedAccess`), alias `@core`, `@ui`, `@cli` ; `.gitignore` (node_modules, dist, coverage, test-results, playwright-report)
- [x] T003 [P] `eslint.config.js` : `src/core` ne peut importer ni `node:*`, ni `vue`, `vuetify`, `pinia`, `@ui`, `@cli` (principe III)
- [x] T004 [P] `vite.config.ts` (interface → `dist/ui`, `base: './'`, configuration Vitest et couverture ≥ 90 % sur `src/core`, hors `generated`) et `vite.cli.config.ts` (`src/cli/main.ts` → `dist/cli.js`, ssr, cible node22, tout embarqué)
- [x] T005 [P] `bin/vce.js` : shebang, import de `../dist/cli.js`
- [x] T006 Fixtures réelles `tests/fixtures/config/` : copier `cnig_PLU_2017`, `cnig_SUP_XXX_2016`, `cnig_SUP_A1_2016`, `GPU_MEC_2025` depuis `validator-config-gpu` (branche `json-source`), avec `tests/fixtures/README.md` (origine et commit)
- [x] T007 Test : les schémas acceptent tous les fichiers des fixtures réelles, et refusent des cas minimaux invalides (type de colonne inconnu, `mandatory` inconnu, `id` mal formé, `columns` absent, section `gpu.json` inconnue)
- [x] T008 `src/core/schemas/document.json`, `table.json`, `gpu.json` (draft-07, plan R2) et `README.md` (origine, écarts avec les schémas du validator)
- [x] T009 `scripts/compile-schemas.ts` → `src/core/schemas/generated/validate.{js,d.ts}` (plan R3, adapté de `tableschema-editor/scripts/compile-profiles.ts`)
- [x] T010 [P] Test optionnel sur données complètes : si `VCE_CONFIG_DIR` est défini, tous les `files.json`, `types/*.json` et `gpu.json` sont conformes aux schémas
- [x] T011 `.github/workflows/ci.yml` : sur PR et push `main`, Node 22, `npm ci`, `npm run schemas` + `git diff --exit-code`, typecheck, lint, `test:coverage`, build, `test:e2e` (Chromium, Firefox)
- [x] T012 `.github/workflows/release.yml` : déclenchement manuel (version `X.Y.Z`), tests et build, commit détaché ajoutant `dist/`, tag `vX.Y.Z`, release GitHub (plan R1) ; documenter la procédure dans `docs/developper/workflow.md`

## Phase 2 : US1, valider toute la configuration en ligne de commande — branche `001-validation-globale/us1` (#2)

- [x] T013 [P] [US1] `tests/support/memory-fs.ts` (`MemoryConfigFs`) et `tests/support/fixtures.ts` (chargement d'un dossier de fixtures en mémoire)
- [x] T014 [P] [US1] Tests `load/json.ts` : JSON valide, erreur avec ligne et colonne (formats de message V8)
- [x] T015 [P] [US1] Tests `load/csv.ts` : simple, multi-colonnes, guillemets avec virgules et sauts de ligne, `\r\n`, BOM, guillemet non fermé, en-tête vide ou dupliqué, ligne de longueur différente
- [x] T016 [P] [US1] Tests `validation/foreign-key.ts` : clé simple, clé multi-colonnes avec espaces, `REFERENCE` mal écrit, listes de longueurs différentes
- [x] T017 [US1] Un cas par code du [contrat](contracts/problem-codes.md), construit en mémoire en modifiant les fixtures réelles (plus lisible que des copies de dossiers), et un test qui vérifie que tout le catalogue est couvert
- [x] T018 [US1] Tests `load/project.ts` : modèles, tables, listes de codes et gpu des fixtures réelles ; modèle abstrait reconnu (R9) ; `WARN-MODEL-NO-DOCUMENT`
- [x] T019 [US1] Tests `validation/validate.ts` : fixtures réelles → 0 erreur ; chaque `invalid/<CODE>` produit exactement ce code au bon fichier et au bon pointeur ; ordre de tri du contrat
- [x] T020 [P] [US1] `src/core/model/types.ts`, `src/core/load/fs.ts`, `src/core/pointer.ts`
- [x] T021 [P] [US1] `src/core/load/json.ts`, `src/core/load/csv.ts` (R7)
- [x] T022 [P] [US1] `src/core/validation/foreign-key.ts` (R8)
- [x] T023 [US1] `src/core/load/project.ts` (R9)
- [x] T024 [US1] `src/core/validation/{problems,messages,schema,refs,validate}.ts` (R10, R11)
- [x] T025 [US1] Tests CLI (`tests/unit/cli/*.test.ts`) : `NodeConfigFs` (lien symbolique sortant ignoré), sortie texte, sortie JSON, codes de sortie 0, 1 et 2, `--strict`, `--help`
- [x] T026 [US1] `src/cli/fs.ts`, `src/cli/check.ts`, `src/cli/main.ts` (contrat [cli.md](contracts/cli.md))
- [x] T027 [US1] Test de performance : `check` sur `VCE_CONFIG_DIR` en moins de 5 s (SC-001)
- [x] T028 [US1] Lancer `vce check` sur `validator-config-gpu/config` et analyser chaque problème (SC-002) : corriger les faux positifs dans l'outil, lister les vraies anomalies dans la PR (pour une PR sur le dépôt de configuration)
- [x] T029 [US1] README : section `vce check`

## Phase 3 : US2, parcourir la configuration dans le navigateur — branche `001-validation-globale/us2` (#3)

- [ ] T030 [P] [US2] Tests `src/cli/server.ts` : `/api/snapshot`, fichiers statiques, `405`, `403` (en-tête `Host`), `404`, chemin sortant, en-têtes de sécurité, port suivant si occupé
- [ ] T031 [US2] `src/cli/server.ts` et commande `serve` (`--port`, `--open`) (R5, R6)
- [ ] T032 [P] [US2] Test e2e `tests/e2e/us2-navigation.spec.ts` (scénarios 1 à 7) et `playwright.config.ts` (webServer : `node bin/vce.js serve tests/fixtures/config --port 4173`)
- [ ] T033 [P] [US2] `index.html` (lang `fr`, CSP), `src/ui/main.ts`, `src/ui/vuetify.ts` (repris de tableschema-editor), `src/ui/App.vue` (mise en page R12)
- [ ] T034 [US2] `src/ui/io/snapshot.ts` (`SnapshotConfigFs`), `src/ui/stores/project.ts`, `src/ui/router.ts` (sélection dans le fragment d'URL)
- [ ] T035 [US2] `ModelTree.vue` (filtre par nom, modèles abstraits distingués)
- [ ] T036 [P] [US2] `ModelView.vue` (propriétés, parent, fichiers, codes, liens vers tables et listes)
- [ ] T037 [P] [US2] `TableView.vue` (colonnes, contraintes, conditions, clés étrangères avec liens)
- [ ] T038 [P] [US2] `CodeListView.vue`, `GpuView.vue` (surcharges rattachées à leur objet), `SourceView.vue`
- [ ] T039 [US2] Tests e2e `a11y.spec.ts` (axe, aucune violation sérieuse ou critique) et `no-remote.spec.ts` (aucune requête vers une autre origine)
- [ ] T040 [US2] README : section `vce serve`

## Phase 4 : US3, panneau des problèmes — branche `001-validation-globale/us3` (#4)

- [ ] T041 [P] [US3] Test e2e `tests/e2e/us3-problems.spec.ts` (scénarios 1 à 5, sur une copie temporaire des fixtures avec erreur, modifiée sur disque pendant le test)
- [ ] T042 [P] [US3] Test unitaire : filtrage et décompte des problèmes par modèle (fonctions pures dans `src/core/validation/problems.ts`)
- [ ] T043 [US3] `ProblemsPanel.vue` (filtres sévérité, code, modèle ; compteurs ; navigation vers `file` + `pointer`)
- [ ] T044 [US3] Mise en évidence de l'élément ciblé dans `TableView`, `ModelView`, `CodeListView`, `GpuView`
- [ ] T045 [US3] Compteurs dans `ModelTree.vue` ; bouton « Recharger » (nouvel instantané, revalidation, sélection conservée si elle existe encore)

## Phase 5 : US4, intégration au dépôt de configuration — branche `001-validation-globale/us4` (#5), puis PR sur `IGNF/validator-config-gpu`

- [ ] T046 [US4] Publier `v0.1.0` avec `release.yml` ; vérifier que `npm i github:IGNF/validator-config-editor#v0.1.0` dans un dossier vide fournit `vce` sans installer de dépendance (SC-005)
- [ ] T047 [US4] Dépôt de configuration (branche depuis `json-source`) : `package.json` (`private`, devDependency sur le tag, scripts `edit` et `check`), `package-lock.json`, `.gitignore` (`node_modules/`)
- [ ] T048 [US4] Dépôt de configuration : `.github/workflows/check.yml` (`npm ci && npm run check` sur PR et push) et `.github/dependabot.yml` (écosystème npm)
- [ ] T049 [US4] Dépôt de configuration : README, section « Éditer et valider la configuration »
- [ ] T050 [US4] Vérifier : workflow vert sur la PR du dépôt de configuration ; workflow rouge sur un commit de test qui casse un `tableModel` (commit ensuite retiré)
- [ ] T051 [US4] Éditeur : `docs/utilisation.md` (installation, mise à jour de version, usage en CI) ; CHANGELOG `0.1.0`
