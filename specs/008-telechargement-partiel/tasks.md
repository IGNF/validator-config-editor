# Tâches : télécharger un fichier ou un modèle

**Spec** : [spec.md](spec.md) | **Plan** : [plan.md](plan.md) | **Issue parente** : à créer

Une phase correspond à une issue, une branche et une PR ciblant `main`. Les tests précèdent le
code.

## Phase 1 : US1, télécharger le fichier affiché — branche `008-telechargement-partiel/us1`

- [ ] T001 [P] Tests `scopeFiles` : portées `all` et `file`, fichier créé dans la session
- [ ] T002 [US1] `src/core/export.ts` (`ExportScope`, `scopeFiles`)
- [ ] T003 [US1] Store : `download(scope)` et `notice` (R2, R3, R4) ; `App.vue` passe à `download({ kind: 'all' })` sans changement visible
- [ ] T004 [US1] `FileFrame` : bouton « Télécharger ce fichier »
- [ ] T005 [US1] e2e éditeur en ligne : fichier non modifié identique octet pour octet, fichier modifié (diff d'une ligne), erreurs restantes dans le message ; e2e `vce serve` : l'état « modifié » est conservé ; axe

## Phase 2 : US2, télécharger un modèle — branche `008-telechargement-partiel/us2`

- [ ] T006 [P] Tests `scopeFiles` portée `model` (rien hors du dossier, dossier sans `files.json`) et `outgoingRefs` (`../`, URL ignorées)
- [ ] T007 [US2] `scopeFiles` (`model`), `outgoingRefs`
- [ ] T008 [US2] Store : portée `model`, message avec erreurs et références sortantes
- [ ] T009 [US2] `ModelView` et `ModelNode` : « Télécharger le modèle »
- [ ] T010 [US2] e2e : ZIP de `cnig_PLU_2017` décompressé (dossier `cnig_PLU_2017/` seul), `vce check` sur l'extrait (SC-003), ZIP depuis l'arbre ; axe
