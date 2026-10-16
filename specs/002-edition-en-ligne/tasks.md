# Tâches : édition des modèles et éditeur en ligne

**Spec** : [spec.md](spec.md) | **Plan** : [plan.md](plan.md) | **Issue parente** : #17

Les conventions sont celles de la feature 001 :

- `[P]` : la tâche peut être menée en parallèle ;
- `[USk]` : la tâche relève de la user story k ;
- une phase correspond à une issue, une branche et une PR ciblant `main` ;
- dans chaque phase, les tests précèdent le code.

## Phase 1 : socle d'édition — branche `002-edition-en-ligne/socle` (#17)

- [ ] T001 [P] Tests `edit/pointer` : `getAt`, `setAt` (position des clés conservée, nouvelle clé en fin), `removeAt`, `insertAt`, `moveAt`, immutabilité et partage structurel
- [ ] T002 [P] Tests `serialize` : `detectStyle` (2, 4 espaces, tabulation ; LF, CRLF ; saut final), `serialize`, `isReproducible`. Aller-retour octet pour octet sur toutes les fixtures (`config/`, `known/`), plus les 2 fichiers non reproductibles connus (mis en forme à la main)
- [ ] T003 [P] Tests `edit/history` (pas, fusion d'un même champ < 1 s, limite de 100, annuler/rétablir exacts) et `edit/ids` (format, unicité, aléa injecté)
- [ ] T004 `src/core/edit/pointer.ts` (repris de tableschema-editor), `history.ts`, `ids.ts`, `src/core/serialize.ts`
- [ ] T005 Test et code `revalidate(project, chemin, donnée)` : même résultat que `checkConfig` sur la configuration modifiée ; mesure < 1 s sur `VCE_CONFIG_DIR`
- [ ] T006 `src/ui/io/source.ts` (`ConfigSource`) ; `ServerSource` (lecture seule à ce stade) ; store : `originals`, `edited`, `edit()`, `undo()`, `redo()`, `dirty` ; barre : Annuler et Rétablir, raccourcis, marque `●` des fichiers modifiés ; `beforeunload`

## Phase 2 : US2, éditer un modèle de table — branche `002-edition-en-ligne/us2` (#12)

- [ ] T007 [P] [US2] Tests `edit/operations` (table) : propriétés, `addColumn` (id si le modèle en utilise, type `String`), `removeColumn`, `moveColumn`, `setConstraint` (une valeur vide retire la contrainte), clés étrangères et conditions (ajout, modification, suppression), propriétés inconnues conservées
- [ ] T008 [US2] `src/core/edit/operations.ts` (table)
- [ ] T009 [US2] Champs réutilisables `src/ui/components/fields/` ; `TableView` éditable (colonnes repliées, détail à l'ouverture)
- [ ] T010 [US2] e2e `us2-table.spec.ts` (scénarios 1 à 6, dont problème affiché et corrigé en moins d'1 s)

## Phase 3 : US3, éditer un modèle de document — branche `002-edition-en-ligne/us3` (#13)

- [ ] T011 [P] [US3] Tests `edit/operations` (document) : propriétés, contraintes, fichiers (ajout, suppression, déplacement ; type, chemin, présence, `tableModel`), codes ; `/parent` jamais modifié
- [ ] T012 [US3] `operations.ts` (document) ; `ModelView` éditable (choix du modèle de table parmi les tables du modèle, choix d'un CSV de `codes/`), parent en lecture seule
- [ ] T013 [US3] e2e `us3-document.spec.ts`

## Phase 4 : US1, ouvrir un dossier dans l'éditeur en ligne — branche `002-edition-en-ligne/us1` (#11)

- [ ] T014 [P] [US1] Tests de la détection de la racine (`config/`, dossiers cachés, `node_modules/`), en fonction pure sur une liste de chemins
- [ ] T015 [US1] `src/ui/io/folder.ts` (`FolderSource`) ; mode `pages` (`vite build --mode pages`, CSP en `<meta>`) ; `Home.vue` (ouvrir un dossier, fichiers restant sur le poste, message si aucun modèle ou navigateur incompatible)
- [ ] T016 [US1] e2e `us1-folder.spec.ts` sur le build `pages` (`setInputFiles` avec un dossier) : mêmes problèmes que `vce check`, racine de dépôt, dossier vide, aucune requête vers une autre origine

## Phase 5 : US4, télécharger toute la configuration en ZIP — branche `002-edition-en-ligne/us4` (#14)

- [ ] T017 [P] [US4] Tests `zip` : CRC-32 (vecteurs connus), archive relue par `unzip -t` (ou `python3 -m zipfile -t`), noms UTF-8, contenus identiques octet pour octet
- [ ] T018 [US4] `src/core/zip.ts` ; `download.ts` ; bouton « Télécharger (ZIP) » (rappel du nombre d'erreurs ; avertissement si fichier réindenté)
- [ ] T019 [US4] e2e `us4-zip.spec.ts` : modifier, télécharger, décompresser, comparer au dossier d'origine (seul le fichier modifié diffère), `vce check` sur le résultat

## Phase 6 : US5, enregistrer sur disque — branche `002-edition-en-ligne/us5` (#15)

- [ ] T020 [P] [US5] Tests `PUT /api/file` : 204, 400, 403 (hors dossier, lien sortant, extension, fichier inexistant, `Host`), 409 (conflit), 413, écriture atomique
- [ ] T021 [US5] `server.ts` (`PUT /api/file`) ; `ServerSource.save` ; bouton « Enregistrer » et Ctrl+S, résultat par fichier, conflit sans perte
- [ ] T022 [US5] e2e `us5-save.spec.ts` (copie temporaire des fixtures : `git diff` d'un seul fichier, conflit détecté)

## Phase 7 : US6, publication sur GitHub Pages — branche `002-edition-en-ligne/us6` (#16)

- [ ] T023 [US6] `.github/workflows/pages.yml` (build `pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`, sur `main` après la CI)
- [ ] T024 [US6] README (lien vers l'éditeur en ligne, différences avec `vce serve`), `docs/utilisation.md` ; CHANGELOG
- [ ] T025 [US6] Vérifier sur le site publié : US1, CSP, aucune requête distante (activation de Pages par un administrateur du dépôt)
