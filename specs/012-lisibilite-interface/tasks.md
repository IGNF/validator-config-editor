# Tâches : lisibilité de l'interface

**Spec** : [spec.md](spec.md) | **Plan** : [plan.md](plan.md) | **Issue parente** : à créer

Une phase correspond à une issue, une branche et une PR ciblant `main`. Les tests précèdent le
code.

## Phase 1 : US1 et US2, arbre allégé et listes depuis la vue du modèle — branche `012-lisibilite-interface/us1`

Les deux stories sont livrées ensemble : sans l'US2, les listes de codes ne seraient plus accessibles.

- [ ] T001 e2e : arbre d'un modèle sans « Tables » ni « Listes de codes » ; fichier attendu `table` → sa table ; modèle et élément courants mis en évidence (`aria-current`) et visibles ; tables non référencées accessibles depuis la vue du modèle
- [ ] T002 e2e : bouton « Listes de codes (N) » de la vue du modèle, section des listes, ouverture d'une liste
- [ ] T003 [US1] `ModelNode`, `FileTreeNode` (R1) ; adaptation des e2e existants qui ouvraient tables et listes depuis l'arbre
- [ ] T004 [US2] `ModelView` : bouton, `data-pointer="/codes"`, nombre de valeurs, tables non référencées (R2)

## Phase 2 : US3, polices, couleurs et zones — branche `012-lisibilite-interface/us3`

- [ ] T005 [P] e2e : polices calculées (Open Sans, Fira Sans), fonds des panneaux ; axe sur chaque vue en clair et en sombre (SC-002)
- [ ] T006 [US3] `@fontsource/*` (R4), `vuetify.ts`, `App.vue` (R3), justification de la dérogation dans le CHANGELOG

## Phase 3 : US4, nom de la liste égal au nom du fichier — branche `012-lisibilite-interface/us4`

- [ ] T007 [P] Tests `listNameOf`, `renameCodeList` (nom, titre qui suit, clés étrangères réécrites, une étape, refus si nom déjà déclaré)
- [ ] T008 [P] Tests `WARN-CODE-NAME-FILE` et sa correction ; catalogue ; configurations connues et `VCE_CONFIG_DIR` sans avertissement (SC-003)
- [ ] T009 [US4] `codelists.ts`, validation, messages, correction, contrat `problem-codes.md`
- [ ] T010 [US4] `ModelView` : déclaration par le fichier, nom affiché ; e2e
