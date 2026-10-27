# Spécification : variables d'affichage et conformité à l'import GpU

**Feature** : `010-variables-import-gpu`

**Créée le** : 2026-10-26

**Statut** : brouillon

**Demande** :

- « On a vraiment besoin de garder les `id` ? Est-ce qu'on peut se passer de la partie surcharge GpU ? »
- « Modifier la gestion des variables : elles ne servent qu'à l'affichage. Les stocker côté GpU et éditeur pour l'affichage, et garder les regex pures dans les configurations. »

## Contexte

GpU importe `validator-config-gpu` avec `ign_validator:config:restore`
(`JsonConfigReader`, dépôt GpU). L'import impose des règles que l'éditeur ne vérifie pas :

- chaque `id` (modèle, fichier, liste de codes, table, colonne) est une clé en base. Il est
  obligatoire et unique dans **toute** la configuration, par type d'objet. Sinon, l'import
  échoue (« Identifiant en double ») ;
- `parent` dans `files.json`, ou `parent_id` / `abstract` dans `gpu.json`, fait échouer
  l'import (pas d'héritage) ;
- une entrée de `gpu.json` est fusionnée avec l'objet de même `id`. Une entrée sans objet
  produit une ligne incomplète.

L'éditeur ne contrôle l'unicité des `id` que dans un modèle, et celle des `id` de colonnes que
dans une table. Il accepte même deux colonnes de même `id` dans deux tables d'un modèle.

Par ailleurs, `gpu.json` porte surtout des formes à variables (`<MAILLAGE>_PLU_<YYYYMMDD>`) des
regex déjà présentes, pures, dans `files.json` et `types/*.json` : 4 210 entrées sur 5 449 sur
`json-source`. Elles ne servent qu'à l'affichage. Décisions :

- les configurations ne contiennent que les regex pures ;
- un dictionnaire `config/variables.json` (nom → regex, une regex par variable, toutes
  distinctes) est partagé par GpU et l'éditeur, qui calculent l'affichage à partir des regex.

Côté GpU (branche `dsfr`) et `validator-config-gpu` (branche `json-source`), réalisé le
2026-10-26 : dictionnaire `config/variables.json`, affichage calculé, `gpu.json` facultatif,
listes de codes lues par `data` (dossier `codes/` racine supprimé). Il ne reste qu'un `gpu.json`
(`enabled` de `cnig_SCoT_2013`). À terme, l'édition de la configuration dans GpU (export, pages
d'édition) est retirée : **l'éditeur devient le seul outil d'édition**, GpU ne fait plus qu'importer
et afficher. L'éditeur doit donc garantir à lui seul les règles de l'import. Cette feature ne
couvre que l'éditeur.

Avec le dictionnaire de `variables.json`, la conversion inverse redonne 4 186 formes sur
4 210. Les 24 autres sont des `[0-9]{8}` écrits en dur, affichés `<YYYYMMDD>`.

## Scénarios utilisateur et tests

### User Story 1 - Afficher les regex avec les variables (Priorité : P1)

Quand la configuration contient `variables.json`, chaque regex (nom du dossier, chemin d'un
fichier attendu, motif d'une colonne) s'affiche avec ses variables. La regex pure reste
accessible et seule modifiable.

**Pourquoi cette priorité** : c'est ce qui permet de ne plus stocker les formes à variables
dans `gpu.json`.

**Test indépendant** : ouvrir une configuration avec `variables.json` ; le chemin
`Pieces_ecrites/[AB0-9]{5}_reglement_[0-9]{8}.pdf` s'affiche
`Pieces_ecrites/<INSEE_COMMUNE>_reglement_<YYYYMMDD>.pdf`.

**Scénarios d'acceptation** :

1. **Given** `config/variables.json`, **When** une regex s'affiche (en-tête de fichier attendu,
   résumé de colonne, nom du dossier), **Then** chaque regex de variable est remplacée par
   `<NOM>`, de la plus longue à la plus courte, et la regex pure s'affiche au survol.
2. **Given** un champ de saisie de regex, **When** il est affiché, **Then** il contient la regex
   pure ; la forme à variables s'affiche sous le champ.
3. **Given** un champ de saisie, **When** l'utilisateur tape `<NOM>` d'une variable connue,
   **Then** la regex enregistrée est la regex pure (variable remplacée).
4. **Given** une configuration sans `variables.json`, **When** une regex s'affiche, **Then**
   elle s'affiche telle quelle, sans erreur.
5. **Given** un `variables.json` invalide (JSON illisible, format inattendu, deux variables de
   même regex), **When** la configuration est ouverte, **Then** un problème le signale et les
   regex s'affichent telles quelles.
6. **Given** une variable dont le nom finit par `_OPT` (partie facultative, ex. `_PART_OPT`),
   **When** une regex qui la contient s'affiche, **Then** la variable est surlignée en jaune,
   comme dans GpU (`<INSEE_COMMUNE>_PSMV_<DATE><_PART_OPT>`). Un avertissement signale un nom
   qui ne suit pas la convention : suffixe `_OPT` si et seulement si la regex est de la forme
   `(…)?`, préfixe `_` si et seulement si la regex commence par `_` (`ENTIER_OPT` :
   `([0-9]+)?`).

---

### User Story 2 - Conformité à l'import GpU (Priorité : P1)

Une configuration destinée à GpU est vérifiée selon les règles de l'import.

**Pourquoi cette priorité** : un import qui échoue en production est aujourd'hui découvert
après coup.

**Test indépendant** : dans les fixtures, donner à une colonne de `GPU_MEC_2025` l'`id` d'une
colonne de `cnig_PLU_2017` ; constater une erreur.

**Scénarios d'acceptation** :

1. **Given** une configuration GpU (`config/variables.json` présent), **When** deux objets de même type
   (modèle, fichier, liste, table, colonne) ont le même `id`, dans un même modèle ou non,
   **Then** l'erreur `ERR-ID-DUPLICATE` est émise, avec l'autre objet nommé.
2. **Given** une configuration GpU, **When** un objet n'a pas d'`id`, **Then** l'erreur
   `ERR-GPU-ID-MISSING` est émise, avec la correction « Attribuer un identifiant ».
3. **Given** une configuration GpU, **When** `files.json` contient `parent`, ou `gpu.json`
   contient `parent_id` ou `abstract`, **Then** l'erreur `ERR-GPU-INHERITANCE` est émise.
4. **Given** une configuration GpU, **When** une entrée de `gpu.json` ne correspond à aucun
   objet du modèle, **Then** `WARN-GPU-ORPHAN-ID` devient une erreur (`ERR-GPU-ORPHAN-ID`).
5. **Given** une configuration sans `variables.json` (dgpr, naviforest, ppr), **When** elle est
   validée, **Then** seules les règles actuelles s'appliquent : `id` facultatifs, unicité dans
   le modèle.

---

### User Story 3 - Copie de liste et identifiants (Priorité : P2)

Les créations de l'éditeur respectent l'unicité globale des `id`.

**Pourquoi cette priorité** : la copie de liste (005) et les ajouts (002) génèrent déjà des
`id` aléatoires, uniques dans toute la configuration. Cette story le garantit par des tests.

**Scénarios d'acceptation** :

1. **Given** une configuration GpU, **When** une liste est copiée ou un objet ajouté, **Then**
   son nouvel `id` n'existe nulle part dans la configuration, et aucune erreur US2 n'apparaît.

---

### Cas limites

- **Configuration GpU** : `config/variables.json` est présent (les `gpu.json` ont presque tous
  disparu et ne peuvent plus servir de critère). Le critère se recalcule à chaque validation.
- **Variable dans une variable** : la conversion inverse prend la plus longue regex d'abord
  (`DATE` avant `INT_2`).
- **Regex qui contient une regex de variable par hasard** : elle s'affiche avec la variable.
  C'est voulu, l'affichage est indicatif.
- **Validator Java** : un fichier `variables.json` à la racine de `config/` ne doit pas gêner
  le validator. À vérifier avant de livrer le fichier dans `validator-config-gpu`.

## Exigences

### Exigences fonctionnelles

- **FR-001** : l'éditeur DOIT lire `variables.json` à la racine du dossier de configuration,
  dans l'éditeur en ligne et dans `vce serve`, et le valider (objet `variables` nom → regex,
  regex distinctes).
- **FR-002** : l'affichage des regex DOIT remplacer les regex des variables par `<NOM>` (la plus
  longue d'abord). La regex pure DOIT rester visible au survol et seule enregistrée. Un alias de
  famille (`aliases` de `variables.json`, ex. `cnig_SUP` : `DIGIT_9` → `IDGEST`, `cnig_PLUi` et
  `cnig_SCoT` : `DIGIT_9` → `SIREN`) DOIT remplacer le nom de la variable pour les modèles dont le
  nom commence par `<famille>_`, à l'affichage comme à la saisie. Une variable de suffixe `_OPT`
  (regex `(…)?`) DOIT être surlignée en jaune ; le nom d'une variable dont la regex commence par
  `_` DOIT commencer par `_` ; un écart à ces deux règles DOIT être un avertissement
  (`WARN-VARIABLES-OPT`).
- **FR-003** : une saisie contenant `<NOM>` d'une variable connue DOIT enregistrer la regex pure.
- **FR-004** : sur une configuration GpU, les `id` DOIVENT être présents et uniques par type
  d'objet dans toute la configuration ; `parent`, `parent_id` et `abstract` DOIVENT être des
  erreurs ; une entrée de `gpu.json` sans objet DOIT être une erreur.
- **FR-005** : les règles de FR-004 NE DOIVENT pas s'appliquer à une configuration sans
  `variables.json`.
- **FR-006** : les nouveaux codes (`ERR-GPU-ID-MISSING`, `ERR-GPU-INHERITANCE`,
  `ERR-GPU-ORPHAN-ID`, problème de `variables.json`) et l'extension d'`ERR-ID-DUPLICATE` DOIVENT
  être ajoutés au contrat `problem-codes.md`.
- **FR-007** : `vce check` DOIT appliquer les mêmes règles que l'interface.

### Entités clés

- **Dictionnaire de variables** : nom, regex.
- **Configuration GpU** : configuration qui contient `config/variables.json`.

## Critères de succès

- **SC-001** : sur `validator-config-gpu` après migration, l'affichage calculé redonne au moins
  4 186 des 4 210 formes à variables de `gpu.json`.
- **SC-002** : sur `validator-config-gpu` (avant et après migration), aucune nouvelle erreur.
  L'import GpU réussit sur toute configuration que l'éditeur valide sans erreur.
- **SC-003** : sur les fixtures dgpr, naviforest et ppr, aucun nouveau problème.

## Hypothèses

- GpU lit `config/variables.json` et n'écrit plus de formes à variables dans `gpu.json` (fait).
- Les `id` restent dans les configurations : ce sont les clés de la base GpU.

## Hors périmètre

- Suppression de la vue des surcharges GpU : quand `gpu.json` aura disparu, elle ne
  s'affichera plus d'elle-même (elle n'apparaît que si le fichier existe).
- Édition de `variables.json` dans l'éditeur.
- Migration de `validator-config-gpu` : script fourni à part, appliqué dans ce dépôt.
