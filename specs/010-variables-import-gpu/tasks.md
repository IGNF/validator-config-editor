# Tâches : variables d'affichage et conformité à l'import GpU

**Spec** : [spec.md](spec.md) | **Plan** : [plan.md](plan.md) | **Issue parente** : #88

Une phase correspond à une issue, une branche et une PR ciblant `main`. Les tests précèdent le
code.

## Phase 1 : US1, afficher les regex avec les variables — branche `010-variables-import-gpu/us1` (#85)

- [x] T001 [P] Tests `readVariables` (valide, JSON illisible, format inattendu, deux variables de même regex) ; `toVariables` (plus longue d'abord, regex sans variable inchangée) ; `fromVariables` (`<NOM>` connu remplacé, inconnu conservé) ; aller-retour sur des formes réelles (SC-001 : les formes à variables ont été retirées des `gpu.json`, la mesure sur `VCE_CONFIG_DIR` n'est plus possible)
- [x] T002 [P] Tests `loadProject` : `variables.json` à la racine retenu, autres fichiers de la racine ignorés ; présent dans le ZIP
- [x] T003 [US1] `variables.ts`, `project.ts` (R1), problèmes `ERR-VARIABLES-*` dans `messages.ts` et `validate.ts`
- [x] T004 [US1] Store (`variables`), `RegexText`, `ModelView` et `TableView` (affichage, aide sous les champs, saisie convertie)
- [x] T005 [US1] e2e : fixtures + `variables.json` (affichage, survol, saisie de `<YYYYMMDD>`), sans `variables.json` (inchangé) ; axe

## Phase 2 : US2, conformité à l'import GpU — branche `010-variables-import-gpu/us2` (#86)

- [ ] T006 [P] Tests `gpu-import` : un cas par règle de R4 (dont doublons entre modèles et entre tables, sans double signalement ; aucune règle sans `variables.json`) ; fixtures dgpr, naviforest, ppr inchangées (SC-003)
- [ ] T007 [P] Tests `catalog` : `ERR-GPU-ID-MISSING` corrigé par un nouvel `id`, annulable
- [ ] T008 [US2] `gpu-import.ts`, branchement dans `validateProject`, messages, contrat `problem-codes.md`, correction
- [ ] T009 [US2] Test sur la configuration complète (`VCE_CONFIG_DIR`) : aucune nouvelle erreur (SC-002) ; e2e : doublon d'`id` entre deux modèles signalé, `vce check` code 1

## Phase 3 : US3, identifiants des créations — branche `010-variables-import-gpu/us3` (#87)

- [ ] T010 [US3] Tests : copie et création de liste (005), ajouts de fichier et de colonne (002) sur une configuration GpU, aucune erreur US2
