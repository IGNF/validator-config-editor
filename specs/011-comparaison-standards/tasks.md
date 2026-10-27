# Tâches : comparaison de standards

**Spec** : [spec.md](spec.md) | **Plan** : [plan.md](plan.md) | **Issue parente** : à créer

Une phase correspond à une issue, une branche et une PR ciblant `main`. Les tests précèdent le
code.

## Phase 1 : US1, comparer deux modèles — branche `011-comparaison-standards/us1`

- [ ] T001 [P] Tests `previousVersion` : `cnig_PLU_2024` → `cnig_PLU_2022`, `cnig_SUP_A1_2016` → `cnig_SUP_A1_2013`, pas d'année ou pas de version antérieure → `undefined`, jamais le modèle lui-même
- [ ] T002 [P] Tests `compareModels` sur les fixtures, avec une copie en mémoire de `cnig_PLU_2017` modifiée : fichier ajouté, retiré, modifié (chaque champ de R3) ; table et colonne ajoutées, retirées, modifiées ; `enum` et `foreignKeys` en `removed` / `added` sans tenir compte de l'ordre ; liste ajoutée, retirée ; `id`, titres et ordre ignorés ; table illisible dans `unreadable` ; modèles identiques → `total` 0
- [ ] T003 [US1] `src/core/compare.ts` (R1 à R4), contrat `contracts/compare.md`
- [ ] T004 [US1] Test sur la configuration complète (`VCE_CONFIG_DIR`) : les nombres du tableau du contexte de la spec (SC-001)
- [ ] T005 [US1] `router.ts` (R6), `CompareView.vue`, bouton « Comparer » de `ModelView`, `App.vue` (R7)
- [ ] T006 [US1] e2e : bouton « Comparer » et référence par défaut, choix d'une autre référence, inversion, lien vers un élément, « Aucune différence », adresse rouverte ; modification non enregistrée prise en compte ; axe

## Phase 2 : US2, contenu des listes de codes — branche `011-comparaison-standards/us2`

- [ ] T007 [P] Tests R5 : rapprochement par les colonnes de la clé étrangère (`LIBELLE` changé → ligne modifiée), par la première colonne sans clé, clés en double → ligne entière ; colonnes ajoutées et retirées ; contenu identique sous deux chemins `data` → rien
- [ ] T008 [US2] `compareModels` : `codes.content`
- [ ] T009 [US2] `CompareView` : section « Contenu des listes » ; e2e : liste de codes modifiée dans la session

## Phase 3 : US3, `vce compare` — branche `011-comparaison-standards/us3`

- [ ] T010 [P] Tests CLI : texte, `--format json` conforme au contrat, deux parents différents, dossier sans `files.json` → code 2, option inconnue → code 2
- [ ] T011 [US3] `src/cli/compare.ts`, `main.ts`, `HELP`, `docs/utilisation.md`, CHANGELOG
