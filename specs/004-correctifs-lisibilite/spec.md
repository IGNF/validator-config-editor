# Spécification : correctifs proposés et lisibilité de l'interface

**Feature** : `004-correctifs-lisibilite`

**Créée le** : 2026-10-16

**Statut** : brouillon

**Demande** : « Proposer des corrections pour les problèmes identifiés » (dans l'éditeur) et
« améliorer la lisibilité générale » (de l'interface).

## Contexte

Les features 001 et 002 signalent les problèmes d'une configuration et permettent de l'éditer.
Mais corriger reste manuel : il faut comprendre un code (`WARN-GPU-ORPHAN-ID`), lire un pointeur
JSON (`/columns/7/constraints/reference`), trouver l'élément, puis savoir quoi modifier.

Problèmes relevés sur les configurations connues :

| Configuration | Problèmes |
|---|---|
| validator-config-gpu (`json-source`) | 35 `WARN-UNREFERENCED-FILE` (25 listes, 10 tables), 21 `ERR-CSV-ROW-LENGTH`, 6 `ERR-ID-DUPLICATE`, 1 `ERR-FK-TARGET-LIST` (`ListeHrefSUP`, déclarée dans d'autres modèles SUP mais absente de `cnig_SUP_T5bis_2016`) |
| validator-config-dgpr | 1 `WARN-MODEL-NAME` |
| validator-config-ppr | 33 `WARN-UNREFERENCED-FILE`, 1 `WARN-MODEL-NAME` |

Pour la plupart, la correction est mécanique : retirer une surcharge orpheline, déclarer une
liste présente sur disque, attribuer un nouvel identifiant, protéger une valeur CSV par des
guillemets, remplacer un nom mal saisi par le nom existant le plus proche. L'éditeur peut la
proposer et l'appliquer, de façon réversible.

Par ailleurs, l'interface de la 001 et de la 002 reste proche des fichiers :

- 153 modèles en liste plate ;
- codes et pointeurs JSON dans le panneau des problèmes ;
- valeurs brutes (`ERROR`, `multi_table`) ;
- aucune vue d'ensemble d'un modèle.

## Scénarios utilisateur et tests

### User Story 1 - Corriger un problème en un clic (Priorité : P1)

Pour un problème qui a une correction connue, l'éditeur propose une ou plusieurs actions
« Corriger », décrites en clair. L'utilisateur en choisit une, la modification est appliquée,
revalidée et annulable comme une édition normale.

**Pourquoi cette priorité** : c'est la demande principale, et elle couvre la majorité des
problèmes réels.

**Test indépendant** : dans une copie des fixtures où une surcharge GpU est orpheline, cliquer
sur « Corriger » → « Retirer la surcharge », constater la disparition du problème, puis annuler
et constater son retour.

**Scénarios d'acceptation** :

1. **Given** un problème corrigeable, **When** l'utilisateur l'affiche dans le panneau,
   **Then** un bouton « Corriger » propose les corrections possibles, chacune avec un libellé
   qui dit ce qui sera modifié (ex. « Retirer la surcharge de la colonne ZONE_URBA.TYPEZONE de
   gpu.json »).
2. **Given** une correction choisie, **When** elle est appliquée, **Then** les fichiers
   concernés sont modifiés, le problème disparaît, et l'édition apparaît dans l'historique
   (annuler et rétablir).
3. **Given** une correction qui crée un problème (ex. nom remplacé par un autre qui n'existe
   pas), **When** elle est appliquée, **Then** ce problème est signalé comme pour toute
   édition.
4. **Given** un problème sans correction connue (ex. JSON illisible), **When** il est affiché,
   **Then** aucun bouton « Corriger » n'apparaît, et le libellé du problème indique quoi faire.

Corrections attendues :

| Problème | Corrections proposées |
|---|---|
| `WARN-MODEL-NAME` | Renommer le modèle comme son dossier |
| `ERR-ID-DUPLICATE` | Attribuer un nouvel identifiant à l'objet en double |
| `WARN-GPU-ORPHAN-ID` | Retirer la surcharge orpheline de `gpu.json` |
| `WARN-UNREFERENCED-FILE` (`codes/*.csv`) | Déclarer la liste dans `files.json` |
| `WARN-UNREFERENCED-FILE` (`types/*.json`) | Déclarer un fichier `table` qui utilise ce modèle de table (chemin à compléter) |
| `ERR-FK-TARGET-LIST` | Déclarer la liste si son CSV existe dans le modèle ; sinon la copier depuis un autre modèle qui la déclare (CSV copié, liste déclarée) ; ou remplacer par la liste déclarée au nom le plus proche |
| `ERR-FK-SOURCE-COLUMN`, `ERR-FK-TARGET-COLUMN`, `ERR-REFERENCE-TARGET`, `ERR-TABLE-MODEL-MISSING`, `ERR-CODE-DATA-MISSING`, `ERR-PARENT-MISSING` | Remplacer par l'un des 3 noms existants les plus proches (colonne, table, fichier, modèle) |
| `ERR-CSV-ROW-LENGTH` (trop de valeurs) | Protéger par des guillemets la valeur d'une colonne qui contient des virgules, avec un aperçu de la ligne corrigée |

---

### User Story 2 - Corriger tous les problèmes d'un même type (Priorité : P2)

Quand plusieurs problèmes d'un même code ont une correction unique et sûre (ex. 33 surcharges
orphelines), l'utilisateur les corrige en une fois. Une seule annulation suffit pour tout
défaire.

**Pourquoi cette priorité** : c'est un gain de temps sur les gros volumes (dizaines
d'avertissements), mais la correction un par un (US1) suffit déjà.

**Test indépendant** : avec 3 surcharges orphelines, « Corriger les 3 » → 0 problème ; une
annulation → 3 problèmes.

**Scénarios d'acceptation** :

1. **Given** le panneau filtré sur un code dont les problèmes ont une correction sûre, **When**
   l'utilisateur affiche les actions, **Then** « Corriger les N problèmes » est proposé, avec la
   liste des fichiers modifiés.
2. **Given** la correction groupée appliquée, **When** l'utilisateur annule, **Then** tous les
   fichiers reviennent à l'état précédent en un pas.
3. **Given** des corrections à choix multiple (noms proches), **When** le code est affiché,
   **Then** aucune correction groupée n'est proposée.

---

### User Story 3 - Panneau des problèmes lisible (Priorité : P1)

Les problèmes sont regroupés par fichier, décrits en français courant, et localisés par le nom
de l'élément plutôt que par un pointeur JSON.

**Pourquoi cette priorité** : c'est la première chose lue, et la correction (US1) s'y fait.

**Test indépendant** : avec un problème sur une colonne, le panneau affiche « Table ZONE_URBA »
puis « Colonne TYPEZONE · référence » et un titre en clair, le code restant visible en second
plan.

**Scénarios d'acceptation** :

1. **Given** des problèmes, **When** le panneau s'affiche, **Then** ils sont groupés par fichier
   (nom lisible : « Modèle cnig_PLU_2017 », « Table ZONE_URBA », « Liste ListeEtatPLU »,
   « Surcharges GpU »), avec le nombre d'erreurs et d'avertissements de chaque groupe, et les
   groupes sont repliables.
2. **Given** un problème, **When** il est affiché, **Then** il montre :
   - un titre en clair propre au code (ex. « Liste de codes non déclarée ») ;
   - sa localisation lisible (ex. « Colonne TYPEZONE · clé étrangère 1 ») ;
   - le message détaillé ;
   - le code, en second plan.
3. **Given** une erreur et un avertissement, **When** ils sont affichés, **Then** la sévérité
   est distinguée par une icône et un libellé, pas seulement par la couleur.

---

### User Story 4 - Navigation et vues lisibles (Priorité : P2)

L'arbre regroupe les modèles par famille, distingue les types d'éléments par des icônes, et
chaque vue commence par une synthèse. Les valeurs techniques sont affichées avec des libellés
métier.

**Pourquoi cette priorité** : c'est un confort de lecture, utile sur les grosses configurations
(153 modèles dans gpu, dont 125 SUP).

**Test indépendant** : ouvrir `validator-config-gpu`, constater les familles (`cnig_PLU`,
`cnig_SUP`…) repliées avec leurs compteurs, ouvrir `cnig_PLU_2017` et lire sa synthèse.

**Scénarios d'acceptation** :

1. **Given** une configuration, **When** l'arbre s'affiche, **Then** les modèles sont groupés
   par famille (préfixe du nom sans millésime ni catégorie : `cnig_PLU`, `cnig_SUP`, `cnig_PPR`…),
   chaque famille indiquant son nombre de modèles et de problèmes. Une famille d'un seul modèle
   n'est pas regroupée, et le filtre par nom ouvre les familles concernées.
2. **Given** l'arbre, **When** un modèle est ouvert, **Then** ses éléments ont une icône par
   nature (modèle, table, liste de codes, surcharges GpU) et un indicateur de problèmes.
3. **Given** la vue d'un modèle, **When** elle s'affiche, **Then** une synthèse donne le nombre
   de fichiers par type, de tables, de listes et de problèmes, avec un lien vers les problèmes
   du modèle.
4. **Given** des valeurs techniques, **When** elles sont affichées, **Then** des libellés métier
   les accompagnent :
   - `ERROR` → « Obligatoire », `WARN` → « Recommandé », `OPTIONAL` → « Facultatif » ;
   - `table` → « Table », `multi_table` → « Base multi-tables (GeoPackage…) », `pdf` → « PDF »,
     `directory` → « Dossier », `metadata` → « Fiche de métadonnées » ;
   - types de colonne regroupés par famille (texte, nombre, date, géométrie, fichier).
5. **Given** un élément qui a des problèmes (colonne, fichier, liste), **When** sa vue est
   affichée, **Then** l'élément porte un indicateur de problème, et son survol ou sa sélection
   donne les messages.

---

### Cas limites

- **Corrections concurrentes** : deux corrections portent sur le même fichier. Chacune
  s'applique à l'état courant : les problèmes et les corrections proposées sont recalculés après
  chaque application.
- **Fichiers créés** : une correction qui crée un fichier (copie d'une liste de codes) l'ajoute
  à la configuration. Il figure dans le ZIP, est créé sur disque par « Enregistrer » dans
  `vce serve`, et l'annulation le retire.
- **Configuration non éditable** : les corrections qui portent sur un fichier non conforme à son
  schéma ne sont pas proposées.
- **Noms proches** : seuls les candidats suffisamment proches sont proposés (distance d'édition
  au plus égale au tiers de la longueur du nom), au plus 3, du plus proche au plus lointain.

## Exigences

### Exigences fonctionnelles

- **FR-001** : le cœur DOIT fournir, pour un problème et l'état courant de la configuration, la
  liste des corrections possibles. Chaque correction a un libellé en français et un ensemble de
  modifications de fichiers.
- **FR-002** : une correction appliquée DOIT être une édition comme une autre : revalidée,
  marquée, annulable et rétablissable en un pas, y compris quand elle touche plusieurs fichiers.
- **FR-003** : les corrections du tableau de l'US1 DOIVENT être proposées.
- **FR-004** : une correction groupée DOIT être proposée pour un code quand chacun de ses
  problèmes affichés a exactement une correction.
- **FR-005** : une correction PEUT créer un fichier `*.csv` ou `*.json` dans le dossier d'un
  modèle existant. Le ZIP l'inclut, et `vce serve` l'écrit (création refusée si le fichier existe
  déjà).
- **FR-006** : chaque code de problème DOIT avoir un titre en clair et une indication de ce qu'il
  faut faire, rédigés pour un mainteneur de configuration.
- **FR-007** : la localisation d'un problème DOIT être exprimée avec les noms des éléments (table,
  colonne, fichier, liste, surcharge) déduits de la donnée.
- **FR-008** : le panneau des problèmes DOIT grouper par fichier et distinguer la sévérité par une
  icône et un libellé, pas seulement par la couleur.
- **FR-009** : l'arbre DOIT grouper les modèles par famille, et afficher icônes et compteurs.
- **FR-010** : les vues DOIVENT afficher les libellés métier de l'US4 et une synthèse de modèle.
- **FR-011** : l'accessibilité (WCAG 2.1 AA, vérifiée par axe) DOIT être conservée.

### Entités clés

- **Correction** : libellé, problème corrigé, modifications (fichier, nouvelle donnée ou nouveau
  texte, création éventuelle).
- **Famille de modèles** : préfixe commun, modèles, compteurs.

## Critères de succès

- **SC-001** : sur `validator-config-gpu` (`json-source`), au moins 60 des 63 problèmes
  relevés ont une correction proposée, et l'application des corrections laisse 0 erreur.
- **SC-002** : sur dgpr et ppr, toutes les erreurs et tous les avertissements `WARN-MODEL-NAME`
  ont une correction.
- **SC-003** : un problème courant (surcharge orpheline, liste non déclarée) se corrige en
  2 clics au plus depuis le panneau.
- **SC-004** : un utilisateur qui ne connaît pas les codes identifie l'élément en cause et la
  correction à faire sans lire de pointeur JSON (vérifié en relecture de l'interface).

## Hypothèses

- Les corrections portent sur les fichiers éditables (`files.json`, `types/*.json`, `gpu.json`
  et, pour `ERR-CSV-ROW-LENGTH`, la ligne CSV concernée). L'édition libre des CSV et de
  `gpu.json` reste dans les features 005 et 006.
- Un fichier non référencé de `types/` peut aussi être volontaire (ex. ppr : modèles de table des
  listes de codes, inutilisés par le validator). La correction proposée est une option, pas une
  obligation.

## Hors périmètre

- Suppression de fichiers sur disque.
- Masquer ou ignorer durablement un avertissement.
- Corrections automatiques sans confirmation de l'utilisateur.
- Corrections d'`ERR-SCHEMA` (valeurs hors énumération…) et d'`ERR-JSON-SYNTAX`.
