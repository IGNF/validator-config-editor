# Spécification : conseils et nouvelles vérifications de cohérence

**Feature** : `009-conseils-coherence`

**Créée le** : 2026-10-26

**Statut** : brouillon

**Demande** :

- « Identifier d'autres incohérences : champs de table de codes pas utilisés (ex.
  `PrescriptionUrbaType.REFLOI`), détecter les doublons de foreignKey, doublons condition + clé
  étrangère, identifier les listes de codes identiques. »
- « Ajouter des conseils d'amélioration qui ne sont pas des erreurs. »

## Contexte

La validation (feature 001) classe chaque problème en **erreur** (le validator échoue ou
contrôle mal) ou en **avertissement** (probable erreur de saisie). Certaines remarques ne sont
ni l'un ni l'autre : la configuration est correcte, mais elle pourrait être plus simple ou
plus cohérente. Cette feature ajoute un troisième niveau, le **conseil**, et quatre vérifications.

Mesures sur `validator-config-gpu` (`json-source`, commit `823d71e` : 151 modèles, 1 174 listes
de codes), aujourd'hui sans erreur ni avertissement :

| Vérification | Cas trouvés |
|---|---|
| Colonne de liste de codes ciblée par aucune clé étrangère | 111 : `LIBELLE` (37), `REFDEF` (21), `REFANNEX` (21), `REFLOI` (16), `REFREGLE` (16) |
| Clé étrangère en double dans une table | 0 |
| Condition qui répète la liste de codes d'une clé étrangère | 0 (les 3 conditions sur des colonnes en clé étrangère sont des règles conditionnelles, ex. `DATEFIN IS NOT NULL OR ETAT NOT IN ('04', '05')`) |
| Listes au contenu identique sous des noms différents | 7 groupes, ex. `ListeEtatCC`, `ListeEtatPLU`, `ListeEtatPLUi`, `ListeEtatPSMV` |

Exemple : dans `cnig_PLU_2017`, `PrescriptionUrbaType.csv` a les colonnes `TYPEPSC`, `STYPEPSC`,
`LIBELLE`, `REFLOI`, `REFREGLE`. Les tables `PRESCRIPTION_*` n'y font référence que par
`(TYPEPSC, STYPEPSC)`. Le validator ne lit donc jamais `REFLOI` ni `REFREGLE`.

## Scénarios utilisateur et tests

### User Story 1 - Niveau « conseil » (Priorité : P1)

Les remarques d'amélioration apparaissent à part, sans compter comme des erreurs ou des
avertissements.

**Pourquoi cette priorité** : les vérifications des US2 à US4 en dépendent. Sans ce niveau,
elles ajouteraient plus de 100 avertissements à une configuration correcte.

**Test indépendant** : sur la configuration gpu, constater « 0 erreur, 0 avertissement » et un
nombre de conseils, avec un code de sortie 0, y compris avec `--strict`.

**Scénarios d'acceptation** :

1. **Given** une configuration avec seulement des conseils, **When** `vce check` (avec ou sans
   `--strict`) la valide, **Then** le code de sortie est 0, et le résumé indique le nombre de
   conseils à part.
2. **Given** `vce check`, **When** il affiche les problèmes, **Then** les conseils ne sont listés
   qu'avec l'option `--info` (texte) ; en JSON, ils sont toujours présents, avec la sévérité
   `info`.
3. **Given** l'interface, **When** le panneau des problèmes s'affiche, **Then** les conseils ont
   leur propre icône, leur propre compteur et leur filtre de sévérité. Ils sont masqués par
   défaut, et un clic sur le compteur les affiche.
4. **Given** un conseil, **When** il est affiché, **Then** il a un titre, un message et un
   conseil de correction en français, comme les autres problèmes (feature 004), et mène d'un
   clic à l'élément concerné.

---

### User Story 2 - Colonnes de listes de codes jamais utilisées (Priorité : P2)

Une colonne d'une liste de codes CSV qu'aucune clé étrangère ni `reference` ne cible est
signalée.

**Pourquoi cette priorité** : c'est l'exemple de la demande (`REFLOI`). Ces colonnes alourdissent
les listes sans être contrôlées.

**Test indépendant** : sur `cnig_PLU_2017`, constater un conseil pour `LIBELLE`, `REFLOI` et
`REFREGLE` de `PrescriptionUrbaType`, et aucun pour `TYPEPSC` ni `STYPEPSC`.

**Scénarios d'acceptation** :

1. **Given** une liste de codes déclarée dans `files.json`, **When** aucune clé étrangère ni
   `reference` d'une table du modèle ne cible une de ses colonnes, **Then** un conseil
   `INFO-CODE-COLUMN-UNUSED` est émis sur cette colonne (fichier CSV, ligne d'en-tête).
2. **Given** une liste dont aucune colonne n'est ciblée, **When** la configuration est validée,
   **Then** un seul conseil est émis pour la liste, et non un par colonne.
3. **Given** une liste non déclarée, **When** la configuration est validée, **Then** seul
   l'avertissement existant `WARN-UNREFERENCED-FILE` est émis.

---

### User Story 3 - Clés étrangères et conditions redondantes (Priorité : P2)

Une clé étrangère écrite deux fois, ou une condition qui ne fait que répéter la liste de codes
d'une clé étrangère, est signalée.

**Pourquoi cette priorité** : ce sont des contrôles faits deux fois. Si l'un est modifié et pas
l'autre, la règle devient incohérente.

**Test indépendant** : ajouter à `ZONE_URBA` une copie de sa clé étrangère vers
`ListeTypezonePLU`, puis une condition `TYPEZONE IN ('U', 'AUc', 'AUs', 'A', 'N')`. Constater un
problème pour chacune et une correction en un clic pour le doublon.

**Scénarios d'acceptation** :

1. **Given** deux clés étrangères identiques dans une table (aux espaces et à la casse des
   mots-clés près), **When** la table est validée, **Then** un avertissement
   `WARN-FK-DUPLICATE` est émis sur la seconde, avec la correction « Supprimer le doublon ».
2. **Given** une condition qui ne porte que sur une colonne (`COL IN (…)`, ou `COL = '…'` /
   `COL LIKE '…'` reliés par `OR`), et une clé étrangère de cette colonne vers une liste de
   codes, **When** les valeurs de la condition sont exactement celles de la liste, **Then** un
   conseil `INFO-CONDITION-REPEATS-FK` est émis sur la condition, avec la correction
   « Supprimer la condition ».
3. **Given** le même cas, **When** la condition autorise une valeur absente de la liste,
   **Then** un avertissement `WARN-CONDITION-VALUE-NOT-IN-LIST` indique la valeur, qui sera
   toujours refusée par la clé étrangère.
4. **Given** le même cas, **When** la condition n'autorise qu'une partie des valeurs de la liste,
   **Then** rien n'est signalé (la condition restreint la liste, c'est voulu).
5. **Given** une condition qui porte sur plusieurs colonnes (ex. `DATEFIN IS NOT NULL OR ETAT
   NOT IN ('04', '05')`), **When** la table est validée, **Then** rien n'est signalé.

---

### User Story 4 - Listes de codes identiques sous des noms différents (Priorité : P3)

Des listes de codes au contenu identique, mais de noms différents, sont signalées.

**Pourquoi cette priorité** : utile pour harmoniser les standards (une même liste maintenue
sous plusieurs noms), mais sans effet sur la validation.

**Test indépendant** : sur la configuration gpu, constater 7 groupes, dont `ListeEtatCC`,
`ListeEtatPLU`, `ListeEtatPLUi` et `ListeEtatPSMV`.

**Scénarios d'acceptation** :

1. **Given** deux listes de codes CSV de noms différents, dans un même modèle ou dans deux
   modèles, **When** leur contenu est identique (à l'encodage, au BOM et aux fins de ligne
   près), **Then** un conseil `INFO-CODE-LIST-IDENTICAL` est émis, qui nomme les autres listes
   du groupe.
2. **Given** des listes de **même nom** et de même contenu dans plusieurs modèles (cas courant
   des modèles aplatis), **When** la configuration est validée, **Then** rien n'est signalé.
3. **Given** un groupe présent dans de nombreux modèles, **When** il est signalé, **Then** un
   seul conseil est émis par nom de liste, sur sa première déclaration, et non un par modèle.

---

### Cas limites

- **Listes de codes `.json`** (ex. `InformationUrbaType.json`) : traitées comme les CSV
  (colonnes = propriétés), si leur format le permet ; sinon ignorées.
- **Listes de codes par URL** : ignorées (non lues).
- **Fichier non conforme** (table ou CSV illisible) : les vérifications de cette feature ne
  s'appliquent pas à ce fichier ; seules ses erreurs existantes sont émises.
- **Clé étrangère vers une table** (et non vers une liste de codes) : US3, scénarios 2 à 4, ne
  s'appliquent pas.
- **Condition non analysable** : ignorée, sans problème émis (pas de faux positif).

## Exigences

### Exigences fonctionnelles

- **FR-001** : la validation DOIT distinguer trois sévérités : erreur, avertissement et conseil
  (`info`).
- **FR-002** : les conseils NE DOIVENT pas modifier le code de sortie de `vce check`, y compris
  avec `--strict`. Le résumé DOIT les compter à part.
- **FR-003** : `vce check` NE DOIT lister les conseils en texte qu'avec `--info`. Le format
  JSON DOIT toujours les inclure.
- **FR-004** : le panneau des problèmes DOIT afficher les conseils avec leur icône, leur
  compteur et leur filtre, masqués par défaut.
- **FR-005** : les nouveaux codes DOIVENT être ajoutés au contrat
  `specs/001-validation-globale/contracts/problem-codes.md`, avec titre, message et conseil en
  français :

  | Code | Sévérité |
  |---|---|
  | `INFO-CODE-COLUMN-UNUSED` | conseil |
  | `WARN-FK-DUPLICATE` | avertissement |
  | `INFO-CONDITION-REPEATS-FK` | conseil |
  | `WARN-CONDITION-VALUE-NOT-IN-LIST` | avertissement |
  | `INFO-CODE-LIST-IDENTICAL` | conseil |

- **FR-006** : `WARN-FK-DUPLICATE` et `INFO-CONDITION-REPEATS-FK` DOIVENT proposer une correction
  en un clic, annulable (feature 004).
- **FR-007** : les vérifications DOIVENT reposer sur les seules règles du validator : une
  colonne de liste est « utilisée » si elle est la cible d'une clé étrangère ou d'une
  `reference` d'une table du même modèle.

### Entités clés

- **Sévérité** : erreur, avertissement, conseil.
- **Groupe de listes identiques** : contenu normalisé, noms et déclarations concernés.

## Critères de succès

- **SC-001** : sur `validator-config-gpu` (`json-source`), la validation reste à 0 erreur et 0
  avertissement, et donne 111 conseils de colonnes non utilisées (ou moins selon US2,
  scénario 2) et 7 groupes de listes identiques.
- **SC-002** : sur les fixtures dgpr, naviforest et ppr, aucune nouvelle erreur ni aucun nouvel
  avertissement.
- **SC-003** : les nouvelles vérifications ajoutent moins de 0,5 seconde à la validation de
  `validator-config-gpu`.
- **SC-004** : aucun faux positif sur les conditions de `validator-config-gpu` (US3,
  scénario 5).

## Hypothèses

- Le validator ne lit, dans une liste de codes, que les colonnes ciblées par une clé étrangère
  ou une `reference`. Les autres colonnes (`LIBELLE`, références réglementaires) sont
  documentaires.
- La syntaxe des conditions reste celle des fichiers de `validator-config-gpu` ; seules les
  formes simples des scénarios de l'US3 sont analysées.

## Hors périmètre

- Suppression automatique des colonnes non utilisées ou fusion des listes identiques.
- Analyse complète du langage des conditions.
- Conseils sur d'autres sujets (nommage, descriptions manquantes…) : à proposer dans une
  feature ultérieure, à partir de ce niveau « conseil ».
