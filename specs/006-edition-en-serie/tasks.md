# Tâches : modification en série

**Spec** : [spec.md](spec.md) | **Plan** : [plan.md](plan.md) | **Issue parente** : #58

Une phase correspond à une issue, une branche et une PR ciblant `main`. Les tests précèdent le
code.

## Phase 1 : US1, colonnes en série — branche `006-edition-en-serie/us1` (#55)

- [ ] T001 [P] Tests `baseTableName` : préfixe égal à un segment du modèle retiré (`A1_ASSIETTE_SUP_S`), sinon nom inchangé (`ZONE_URBA`, `SERVITUDE`)
- [ ] T002 [P] Tests `findEquivalents` (colonne) sur les fixtures avec des copies de `cnig_SUP_A1_2016` (`cnig_SUP_A2_2016`, préfixe de table renommé ; `cnig_PLU_*` hors famille) : famille, toute la configuration, modèle sans la colonne → `absent`, table non conforme → `editable: false`, modifications de la session prises en compte
- [ ] T003 [P] Tests `applyToEquivalents` : seule la propriété est recopiée ; propriété absente de la source → retirée ; cibles non modifiables ignorées ; plusieurs cibles d'un fichier → un changement ; une étape d'annulation ; une ligne de diff par fichier (SC-002) ; `id` et `parent` inchangés
- [ ] T004 [US1] `src/core/equivalents.ts` (R1 à R5)
- [ ] T005 [US1] Test sur la configuration complète (`VCE_CONFIG_DIR`) : `GESTIONNAIRE_SUP.NOMGEST` de `cnig_SUP_A1_2016` a 122 équivalents dans la famille `cnig_SUP` (123 modèles 2013 et 2016), aucun absent ; recherche et application < 1 s (SC-003)
- [ ] T006 [US1] `EquivalentsDialog.vue` (partie « Appliquer »), bouton « Équivalents » des colonnes de `TableView`
- [ ] T007 [US1] e2e : `maxLength` modifié puis appliqué en série, valeurs vérifiées, annulation en une fois ; colonne décochée non modifiée ; « déjà à jour » ; axe

## Phase 2 : US3, comparer les équivalents — branche `006-edition-en-serie/us3` (#57)

- [ ] T008 [US3] Fenêtre : tableau de comparaison (modèles × propriétés), différences mises en évidence, liens, modèles absents, portée
- [ ] T009 [US3] e2e : tableau des motifs d'une colonne, valeur divergente signalée, modèle absent

## Phase 3 : US2, fichiers attendus et listes — branche `006-edition-en-serie/us2` (#56)

- [ ] T010 [P] Tests `findEquivalents` et `applyToEquivalents` pour `file` et `code`
- [ ] T011 [US2] Boutons « Équivalents » des fichiers attendus et des déclarations de listes dans `ModelView`
- [ ] T012 [US2] e2e : `REGLEMENT` passé en « Obligatoire » et appliqué en série, puis annulé
