# Tâches : créer et copier des listes de codes

**Spec** : [spec.md](spec.md) | **Plan** : [plan.md](plan.md) | **Issue parente** : à créer

Une phase correspond à une issue, une branche et une PR ciblant `main`. Les tests précèdent le
code.

## Phase 1 : US1, copier une liste existante — branche `005-listes-codes/us1`

- [ ] T001 [P] Tests `codeLists` (listes lisibles seulement, URL exclues, tri) et `checkNewName` (nom invalide, déjà déclaré, fichier présent non déclaré)
- [ ] T002 [P] Tests `copyCodeList` : `ListeEtatPLU` de `cnig_PLU_2017` vers `GPU_MEC_2025`, texte identique, déclaration (`title` d'origine, nouvel `id`), aucun nouveau problème, annulation en un pas ; duplication dans le même modèle sous un autre nom ; contenu courant d'une liste modifiée
- [ ] T003 [US1] `operations.ts` (`addCode` avec `title`), `codelists.ts` (`codeLists`, `checkNewName`, `copyCodeList`)
- [ ] T004 [US1] Store : `applyChanges` ; `CodeListDialog` (mode copie) ; bouton dans `ModelView`, ouverture de la liste copiée
- [ ] T005 [US1] e2e éditeur en ligne : copie vers `GPU_MEC_2025`, CSV du ZIP identique octet pour octet à l'original, refus d'un nom existant, Ctrl+Z ; e2e `vce serve` : l'enregistrement crée le fichier ; axe

## Phase 2 : US2, créer une liste vide — branche `005-listes-codes/us2`

- [ ] T006 [P] Tests `createCodeList` : en-tête seul, déclaration, refus (colonnes vides, en double, avec virgule)
- [ ] T007 [US2] `createCodeList`
- [ ] T008 [US2] `CodeListDialog` (mode création), bouton dans `ModelView`
- [ ] T009 [US2] e2e : `ListeTest` (`CODE,LIBELLE`) dans `GPU_MEC_2025`, aucune erreur, liste affichée ; axe
