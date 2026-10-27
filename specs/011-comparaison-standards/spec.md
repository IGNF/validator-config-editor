# Spécification : comparaison de standards

**Feature** : `011-comparaison-standards`

**Créée le** : 2026-10-27

**Statut** : brouillon

**Demande** :

- « Ajouter un outil de comparaison de standards. »

## Contexte

Une configuration contient plusieurs versions d'un même standard : `cnig_PLU_2013` à
`cnig_PLU_2024`, `cnig_SUP_A1_2013` et `cnig_SUP_A1_2016`… Pour créer une nouvelle version, ou
relire celle d'un tiers, il faut savoir ce qui change d'une version à l'autre. Aujourd'hui, il
faut ouvrir les fichiers un par un.

GpU a déjà une page de comparaison (`/standard/{modèle}/compare/`, `StandardComparator`,
branche `dsfr`). Elle rapproche fichiers, tables, attributs et listes de codes **par nom**, et
compare par défaut avec la version précédente du même standard. Cette page disparaîtra avec
l'édition dans GpU ; l'éditeur reprend ses règles et ajoute le contenu des listes de codes.

Mesures sur `validator-config-gpu` (`json-source`, commit `976b9fce`), avec les champs de
FR-003, sans les `id`. Chaque case donne ajoutés / retirés / modifiés :

| Comparaison | Dossier ~ | Fichiers | Tables | Colonnes | Listes (+ / −) | Listes au contenu modifié |
|---|---|---|---|---|---|---|
| `cnig_PLU_2017` → `cnig_PLU_2022` | 1 | 2 / 0 / 1 | 0 / 0 / 1 | 14 / 0 / 1 | 1 / 0 | 3 |
| `cnig_PLU_2022` → `cnig_PLU_2024` | 1 | 21 / 2 / 1 | 0 / 0 / 7 | 2 / 0 / 4 | 6 / 2 | 1 |
| `cnig_PLUi_2022` → `cnig_PLUi_2024` | 1 | 24 / 5 / 14 | 0 / 0 / 7 | 2 / 0 / 5 | 7 / 3 | 1 |
| `cnig_SUP_A1_2013` → `cnig_SUP_A1_2016` | 1 | 1 / 0 / 7 | 0 / 0 / 3 | 2 / 1 / 17 | 0 / 0 | 0 |

## Scénarios utilisateur et tests

### User Story 1 - Comparer deux modèles (Priorité : P1)

Depuis la vue d'un modèle, l'utilisateur affiche ce qui le distingue d'un autre modèle de la
configuration, par défaut la version précédente du même standard.

**Pourquoi cette priorité** : c'est le besoin exprimé ; les autres stories l'enrichissent.

**Test indépendant** : ouvrir `cnig_PLU_2024`, lancer la comparaison ; la référence proposée est
`cnig_PLU_2022`, et les fichiers ajoutés, retirés et modifiés s'affichent avec leurs nombres.

**Scénarios d'acceptation** :

1. **Given** la vue d'un modèle, **When** l'utilisateur clique sur « Comparer », **Then** la
   comparaison s'ouvre avec, comme référence, la version précédente du même standard : même nom
   à l'année près (`cnig_PLU_2024` → `cnig_PLU_2022`, `cnig_SUP_A1_2016` → `cnig_SUP_A1_2013`).
   Sans version précédente, l'utilisateur choisit la référence.
2. **Given** la comparaison, **When** l'utilisateur choisit une autre référence (n'importe quel
   modèle de la configuration) ou inverse le sens, **Then** la comparaison se met à jour.
3. **Given** deux modèles, **When** la comparaison s'affiche, **Then** elle liste, par section :
   - **fichiers attendus** ajoutés, retirés, modifiés (type, présence, chemin, modèle de table) ;
   - **tables** ajoutées, retirées, modifiées (conditions, clés étrangères) ;
   - **colonnes** de chaque table modifiée : ajoutées, retirées, modifiées (description, type,
     contraintes) ;
   - **listes de codes** ajoutées, retirées ;
   - **dossier** : nom du dossier (regex) et spécification des métadonnées.
4. **Given** un champ modifié, **When** il s'affiche, **Then** l'ancienne et la nouvelle valeur
   sont visibles ; pour une liste (conditions, clés étrangères, valeurs possibles), les éléments
   retirés et ajoutés. Les regex s'affichent avec leurs variables (feature 010).
5. **Given** un élément de la comparaison, **When** l'utilisateur clique dessus, **Then**
   l'éditeur ouvre l'élément dans le modèle comparé (ou la référence s'il a été retiré).
6. **Given** deux modèles identiques au sens de la comparaison, **When** elle s'affiche,
   **Then** elle indique « Aucune différence ».
7. **Given** une comparaison, **When** l'utilisateur copie l'adresse de la page, **Then**
   l'adresse rouvre la même comparaison.

---

### User Story 2 - Contenu des listes de codes (Priorité : P2)

Pour une liste de codes présente des deux côtés, la comparaison montre les codes ajoutés,
retirés et modifiés.

**Pourquoi cette priorité** : GpU ne compare que les noms des listes ; ce sont pourtant les
nouvelles valeurs de codes qui changent le plus souvent d'une version à l'autre (3 listes entre
`cnig_PLU_2017` et `cnig_PLU_2022`).

**Test indépendant** : comparer `cnig_PLU_2017` et `cnig_PLU_2022` ; les trois listes au contenu
modifié sont listées avec leurs lignes ajoutées et retirées.

**Scénarios d'acceptation** :

1. **Given** une liste de même nom des deux côtés, **When** son contenu diffère, **Then** la
   comparaison liste les colonnes ajoutées ou retirées et les lignes ajoutées, retirées ou
   modifiées.
2. **Given** une liste ciblée par une clé étrangère, **When** ses lignes sont comparées,
   **Then** elles sont rapprochées par les colonnes de la clé (ex. `TYPEPSC`, `STYPEPSC`) : une
   ligne dont seul le `LIBELLE` change est « modifiée », pas retirée puis ajoutée. Sans clé
   étrangère, les lignes sont rapprochées par la première colonne.
3. **Given** deux listes de contenu identique mais de fichiers différents (chemins `data`
   distincts), **When** la comparaison s'affiche, **Then** elles ne sont pas signalées.

---

### User Story 3 - Comparaison en ligne de commande (Priorité : P3)

`vce compare` affiche la même comparaison dans un terminal, pour relire une PR d'un dépôt de
configuration.

**Pourquoi cette priorité** : utile en revue, mais l'interface couvre le besoin principal.

**Test indépendant** : `vce compare config/cnig_PLU_2022 config/cnig_PLU_2024` affiche les mêmes
nombres que l'interface ; `--format json` produit un JSON conforme au contrat.

**Scénarios d'acceptation** :

1. **Given** deux dossiers de modèles, **When** `vce compare <référence> <modèle>` est lancé,
   **Then** la comparaison s'affiche en texte, section par section, et le code de sortie est 0.
2. **Given** l'option `--format json` (comme `vce check`), **When** la commande est lancée, **Then** la comparaison est
   écrite en JSON (contrat `contracts/compare.md`).
3. **Given** un dossier sans `files.json`, **When** la commande est lancée, **Then** un message
   l'indique et le code de sortie est 2.

---

### Cas limites

- **Renommage** : un fichier, une table ou une colonne renommés apparaissent retirés puis
  ajoutés. Le rapprochement se fait par nom, comme dans GpU ; les `id` diffèrent d'un modèle à
  l'autre et ne servent pas au rapprochement.
- **`id`** : jamais comparés (clés de la base GpU, propres à chaque modèle).
- **Ordre** : l'ordre des fichiers, des colonnes et des lignes de codes n'est pas une
  différence. L'ordre des colonnes d'une table n'est pas comparé non plus.
- **Fichier en erreur** : un fichier illisible (JSON ou CSV) d'un des deux modèles est signalé
  dans sa section, sans empêcher le reste de la comparaison.
- **Modifications non enregistrées** : la comparaison porte sur l'état courant de la session,
  modifications comprises.
- **Même modèle** : comparer un modèle à lui-même est refusé (il n'est pas proposé comme
  référence).
- **Configuration sans variables** (dgpr, naviforest, ppr) : regex affichées telles quelles.

## Exigences

### Exigences fonctionnelles

- **FR-001** : l'éditeur DOIT comparer deux modèles quelconques de la configuration chargée, en
  rapprochant fichiers attendus, tables, colonnes et listes de codes par nom.
- **FR-002** : la référence par défaut DOIT être la version précédente du même standard (même
  nom à l'année finale près, année immédiatement inférieure présente dans la configuration).
- **FR-003** : les champs comparés DOIVENT être, au minimum, ceux de `StandardComparator` (GpU) :
  fichiers `type`, `mandatory`, `path` ; tables `conditions`, `foreignKeys` ;
  colonnes `description`, `type`, `minLength`, `maxLength`, `required`, `presenceRequired`,
  `unique`, `enum`, `pattern`. S'y ajoutent `tableModel`, le nom du dossier et la spécification
  des métadonnées. `primaryKey` (GpU) n'existe pas dans le format du validator. Les `id` NE
  DOIVENT PAS être comparés.
- **FR-004** : la comparaison DOIT être un module pur du cœur, partagé par l'interface et la CLI.
- **FR-005** : la comparaison NE DOIT rien modifier dans la session.
- **FR-006** : l'adresse de la page DOIT encoder les deux modèles comparés.
- **FR-007** : les lignes des listes de codes DOIVENT être rapprochées par les colonnes ciblées
  par les clés étrangères du modèle, sinon par la première colonne.
- **FR-008** : `vce compare` DOIT produire en texte et en JSON la même comparaison que
  l'interface.

### Entités clés

- **Comparaison** : référence, modèle comparé, sections (dossier, fichiers, tables, colonnes,
  listes, contenu des listes), total des différences.
- **Changement** : champ, ancienne et nouvelle valeur, ou éléments retirés et ajoutés.

## Critères de succès

- **SC-001** : sur `validator-config-gpu`, les nombres de fichiers, tables, colonnes et listes
  ajoutés, retirés et modifiés sont ceux du tableau du contexte.
- **SC-002** : sur les fixtures, la comparaison de deux versions s'affiche en moins d'une
  seconde.
- **SC-003** : sur les comparaisons du tableau, les différences de champs coïncident avec
  celles de la page de comparaison de GpU.

## Hypothèses

- Le nom d'un modèle se termine par son année (`_AAAA`) ; sinon il n'a pas de version
  précédente et la référence est choisie à la main.
- La comparaison se fait dans une configuration ; les deux modèles sont chargés ensemble.

## Hors périmètre

- Comparaison de deux configurations différentes, ou de deux versions git d'une configuration.
- Liste des modifications de la session avant téléchargement (feature à part).
- Report d'une différence d'un modèle vers l'autre (« appliquer ce changement »).
- Détection des renommages.
