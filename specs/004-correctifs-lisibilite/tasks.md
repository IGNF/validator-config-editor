# Tâches : correctifs proposés et lisibilité de l'interface

**Spec** : [spec.md](spec.md) | **Plan** : [plan.md](plan.md) | **Issue parente** : #41

Les conventions sont celles des features 001 et 002 : une phase correspond à une issue, une branche et une PR ciblant `main`, et les tests précèdent le code.

## Phase 1 : US3, panneau des problèmes lisible — branche `004-correctifs-lisibilite/us3` (#39)

- [ ] T001 [P] Tests `messages` : chaque code a `title` et `hint` non vides
- [ ] T002 [P] Tests `describeLocation` : un cas par forme de pointeur (modèle, fichier, code, colonne et contrainte, clé étrangère, condition, ligne CSV, surcharge GpU, sans pointeur)
- [ ] T003 [US3] `messages.ts` (`title`, `hint`), `location.ts`
- [ ] T004 [US3] `ProblemsPanel` groupé par fichier, `ProblemItem` (icône et libellé de sévérité, titre, localisation, message, code)
- [ ] T005 [US3] e2e : groupes, titres, localisation, sévérité non portée par la seule couleur ; axe

## Phase 2 : US1, corriger un problème en un clic — branche `004-correctifs-lisibilite/us1` (#37)

- [ ] T006 [P] Tests `similar` (distance, seuil, tri, limite de 3)
- [ ] T007 [P] Tests `csv` : toutes les lignes en erreur signalées
- [ ] T008 [P] Tests `session` : pas multi-fichiers, texte CSV, création, annulation d'une création, ZIP et `changedFiles` avec créations
- [ ] T009 [P] Tests `catalog` : une correction par ligne du tableau R4, appliquée sur les fixtures puis revalidée (le problème disparaît)
- [ ] T010 [P] Tests `PUT /api/file` en création (`If-None-Match: *`) : créé, 412 si existe, 403 hors `codes/` ou `types/` d'un modèle existant
- [ ] T011 [US1] `similar.ts`, `csv.ts`, `history.ts` et `session.ts` (R2), `fixes/catalog.ts`
- [ ] T012 [US1] `server.ts` (création), `ServerSource.save` (création)
- [ ] T013 [US1] `FixMenu` dans `ProblemItem`, application par le store
- [ ] T014 [US1] Test sur la configuration complète (`VCE_CONFIG_DIR`) : au moins 60 problèmes de gpu sur 63 ont une correction, et appliquer la première correction de chacun laisse 0 erreur (SC-001)
- [ ] T015 [US1] e2e : surcharge orpheline, liste copiée depuis un autre modèle (ZIP et enregistrement), ligne CSV protégée, nom proche

## Phase 3 : US2, corriger tous les problèmes d'un même type — branche `004-correctifs-lisibilite/us2` (#38)

- [ ] T016 [US2] Tests et code : `bulkFix(session, problems)` (toutes `safe` et uniques, sinon rien) en un pas
- [ ] T017 [US2] Panneau : « Corriger les N problèmes » quand le filtre de code est actif ; e2e (une annulation défait tout)

## Phase 4 : US4, navigation et vues lisibles — branche `004-correctifs-lisibilite/us4` (#40)

- [ ] T018 [P] Tests `labels` (`modelFamily` sur les noms des 4 configurations connues, libellés)
- [ ] T019 [US4] `labels.ts` ; `ModelTree` (familles, icônes, compteurs, filtre ouvrant les familles)
- [ ] T020 [US4] `ModelSummary` dans `ModelView` ; libellés métier dans `ModelView` et `TableView` ; `ProblemBadge` sur colonnes, fichiers et listes
- [ ] T021 [US4] e2e et axe ; capture de contrôle sur validator-config-gpu
