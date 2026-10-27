# Spécification : lisibilité de l'interface

**Feature** : `012-lisibilite-interface`

**Créée le** : 2026-10-27

**Statut** : brouillon

**Demande** :

- « Dans le menu de gauche, mettre en valeur la config courante. »
- « Proposer un affichage plus lisible entre le menu gauche et le panel principal. »
- « Ne pas afficher les tables en plus des fichiers à gauche. »
- « Ne pas afficher à gauche les listes de codes ; dans le détail, juste un bouton listes de codes. »
- « Utiliser des polices et des couleurs plus lisibles, voir le design de `validator-api-client`. »
- « Possible de simplifier pour que le nom de la liste soit toujours le nom du fichier ? On limite
  ainsi les champs à remplir et les erreurs possibles. »

## Contexte

L'arbre de gauche liste, sous chaque modèle :
- le modèle lui-même (`files.json`) ;
- les fichiers attendus, rangés selon leur arborescence ;
- les tables (`types/*.json`) ;
- les listes de codes (`codes/*.csv`) ;
- les surcharges GpU (`gpu.json`) et une action de téléchargement.

Les tables apparaissent donc deux fois : comme fichiers attendus de type `table`, et dans
« Tables ». Un modèle SUP 2016 a ainsi 11 fichiers attendus, 6 tables et 8 listes, soit plus de 25
lignes par modèle.

L'arbre, le panneau principal et le panneau des problèmes ont le même fond blanc. Seule une
ligne fine les sépare. Le thème utilise la police par défaut de Vuetify (Roboto) et un bleu
`#1f4e79`.

`validator-api-client` (application web du validateur, même équipe) utilise la feuille IGN
`style-carto.css` :
- polices : Open Sans pour le texte, Fira Sans pour les titres ;
- texte bleu nuit `#091625`, bleu `#3993f3`, gris `#788089` et `#3f4a55` ;
- bordures `#dde1e6`, fonds clairs `#f4f6f8` ;
- en-tête blanc avec une bordure basse.

Contrastes sur fond blanc (WCAG AA : 4,5:1 pour le texte) :

| Couleur | Contraste | Usage possible |
|---|---|---|
| `#091625` | 18,2 | texte |
| `#3f4a55` | 9,0 | texte secondaire |
| `#1a5fb4` | 6,3 | liens, boutons (bleu foncé de `validator-api-client`) |
| `#788089` | 4,0 | bordures, icônes ; pas de texte |
| `#3993f3` | 3,2 | accents, bordures ; pas de texte |

Listes de codes : dans toutes les configurations connues, le nom d'une liste est le nom de son
fichier CSV, et le fichier est dans `./codes/`. C'est le cas pour 1 175 déclarations sur gpu
(`json-source`, `aac59718`), 1 sur dgpr et 15 sur ppr ; naviforest n'en a aucune. Le format du
validator garde deux champs (`name`, `data`), mais l'éditeur peut n'en demander qu'un.

## Scénarios utilisateur et tests

### User Story 1 - Arbre de gauche allégé (Priorité : P1)

Sous chaque modèle, l'arbre ne montre que le modèle et ses fichiers attendus. L'élément affiché
dans le panneau principal est mis en évidence.

**Pourquoi cette priorité** : c'est la demande principale. L'arbre est deux fois plus court, et
on voit où l'on est.

**Test indépendant** : ouvrir `cnig_SUP_A1_2016`. L'arbre ne contient ni « Tables » ni « Listes de
codes ». Un clic sur le fichier attendu `GESTIONNAIRE_SUP` ouvre sa table, et la ligne est mise
en évidence.

**Scénarios d'acceptation** :

1. **Given** un modèle ouvert dans l'arbre, **When** il s'affiche, **Then** il ne contient que
   « Modèle (files.json) », les fichiers attendus, les surcharges GpU si elles existent, et le
   téléchargement. Les sections « Tables » et « Listes de codes » ont disparu.
2. **Given** un fichier attendu de type `table`, **When** l'utilisateur clique dessus, **Then**
   sa table s'ouvre (`types/<nom>.json`, selon `tableModel`). Les autres fichiers attendus
   s'ouvrent dans la vue du modèle, comme aujourd'hui.
3. **Given** un fichier affiché dans le panneau principal (modèle, table, liste, surcharges),
   **When** l'arbre s'affiche, **Then** son modèle est mis en évidence (fond, barre latérale,
   texte en gras) et la ligne de l'élément affiché aussi. Le modèle est déplié et la ligne est
   visible (défilement).
4. **Given** une table qu'aucun fichier attendu ne référence, **When** l'utilisateur la cherche,
   **Then** elle reste accessible : depuis le problème `WARN-UNREFERENCED-FILE`, depuis la vue du
   modèle (« Tables non référencées »), ou par son adresse.

---

### User Story 2 - Listes de codes depuis la vue du modèle (Priorité : P1)

Les listes de codes ne sont plus dans l'arbre. La vue du modèle a un bouton « Listes de codes (N) »
qui mène à leur liste.

**Pourquoi cette priorité** : elle accompagne l'US1. Sans elle, les listes ne seraient plus
accessibles.

**Test indépendant** : dans la vue de `cnig_PLU_2017`, cliquer sur « Listes de codes (7) » ;
ouvrir `ListeEtatPLU`.

**Scénarios d'acceptation** :

1. **Given** la vue d'un modèle, **When** elle s'affiche, **Then** un bouton « Listes de codes (N) »
   est en tête de la vue, à côté de « Télécharger le modèle » et de « Comparer ».
2. **Given** ce bouton, **When** l'utilisateur clique dessus, **Then** la section des listes du
   modèle s'affiche : nom, nombre de valeurs, problèmes, lien vers chaque liste, création et copie
   (feature 005).
3. **Given** une liste de codes ouverte, **When** l'arbre s'affiche, **Then** son modèle est mis
   en évidence (US1, scénario 3).

---

### User Story 3 - Séparation des zones, polices et couleurs (Priorité : P2)

L'interface reprend les polices et les couleurs de `validator-api-client`, avec les contrastes du
tableau du contexte. Les trois zones (arbre, panneau principal, problèmes) se distinguent nettement.

**Pourquoi cette priorité** : la lisibilité générale, et un aspect commun avec les autres outils
du validateur.

**Test indépendant** : ouvrir l'éditeur, constater les polices Open Sans et Fira Sans et les fonds
distincts, puis passer axe sur chaque vue : aucune violation de contraste, en thème clair et en
thème sombre.

**Scénarios d'acceptation** :

1. **Given** l'interface, **When** elle s'affiche, **Then** le texte est en Open Sans et les
   titres en Fira Sans. Les polices sont servies par l'application, sans ressource distante
   (principe V).
2. **Given** l'interface, **When** elle s'affiche, **Then** l'arbre et le panneau des problèmes
   ont un fond clair (`#f4f6f8`) distinct du panneau principal (blanc). Une bordure `#dde1e6` les
   sépare, et l'en-tête est blanc avec une bordure basse.
3. **Given** un texte, un lien ou un bouton, **When** axe vérifie la page, **Then** aucun contraste
   n'est inférieur à 4,5:1. Les bleus `#3993f3` et le gris `#788089` ne servent qu'aux bordures et
   aux accents.
4. **Given** le thème sombre du système, **When** l'interface s'affiche, **Then** elle garde des
   zones distinctes et des contrastes conformes.

---

### User Story 4 - Nom de la liste égal au nom du fichier (Priorité : P2)

Une liste de codes se déclare en choisissant son fichier CSV ; son nom est celui du fichier. Un écart
est signalé.

**Pourquoi cette priorité** : un champ de moins à remplir, et des noms toujours cohérents avec les
fichiers.

**Test indépendant** : déclarer une liste en choisissant `codes/ListeEtatPLU.csv` ; constater
`name: "ListeEtatPLU"`. Modifier `name` à la main dans la source ; constater un avertissement et sa
correction.

**Scénarios d'acceptation** :

1. **Given** la déclaration d'une liste dans la vue du modèle, **When** elle s'affiche, **Then**
   seul le fichier CSV se choisit ; le nom affiché est celui du fichier, sans champ de saisie.
2. **Given** un fichier choisi ou changé, **When** la déclaration est enregistrée, **Then** `name`
   vaut le nom du fichier sans `.csv`. Le titre, s'il était égal à l'ancien nom, suit aussi.
3. **Given** une déclaration dont `name` diffère du nom de son fichier, **When** la configuration est
   validée, **Then** un avertissement le signale, avec la correction « Renommer la liste en
   <nom du fichier> ».
4. **Given** un renommage de liste (scénario 2 ou correction du scénario 3), **When** des clés
   étrangères ou des références visent l'ancien nom, **Then** elles sont mises à jour dans la même
   étape d'annulation, ou le renommage est refusé avec la liste des références.
5. **Given** la copie ou la création d'une liste (feature 005), **When** elle s'exécute, **Then**
   le nom saisi est à la fois le nom de la liste et celui du fichier, comme aujourd'hui.

---

### Cas limites

- **Modèle sans `files.json`** : l'arbre garde « Dossier sans files.json ».
- **Fichier attendu de type `table` sans modèle de table** (`tableModel` introuvable, `auto`,
  URL) : il s'ouvre dans la vue du modèle, comme les autres fichiers.
- **Liste hors de `./codes/`** : aucune configuration connue n'en a. Le nom suit quand même le nom
  du fichier.
- **Thème sombre** : les couleurs de `validator-api-client` n'existent qu'en clair ; les
  équivalents sombres sont à définir au plan.

## Exigences

### Exigences fonctionnelles

- **FR-001** : l'arbre de gauche NE DOIT afficher, sous un modèle, que le modèle, ses fichiers
  attendus, ses surcharges GpU et le téléchargement.
- **FR-002** : un fichier attendu de type `table` DOIT ouvrir son modèle de table quand il est
  trouvé.
- **FR-003** : le modèle et l'élément affichés DOIVENT être mis en évidence dans l'arbre, sans
  reposer sur la seule couleur.
- **FR-004** : la vue du modèle DOIT donner accès à ses listes de codes (bouton « Listes de codes (N) »)
  et à ses tables non référencées.
- **FR-005** : l'interface DOIT utiliser Open Sans et Fira Sans, servies localement, et les couleurs
  de `validator-api-client` avec un contraste d'au moins 4,5:1 pour le texte.
- **FR-006** : l'éditeur DOIT dériver le nom d'une liste de codes de son fichier ; un écart entre
  `name` et le nom du fichier DOIT être un avertissement, avec une correction.
- **FR-007** : un renommage de liste NE DOIT pas laisser de clé étrangère vers l'ancien nom.

## Critères de succès

- **SC-001** : l'arbre d'un modèle SUP 2016 passe de plus de 25 lignes à 13 (modèle, 11 fichiers
  attendus, téléchargement).
- **SC-002** : axe ne signale aucune violation sur les vues existantes, en thème clair et sombre.
- **SC-003** : sur les configurations connues, l'avertissement de FR-006 n'apparaît pas (0 écart sur
  1 191 déclarations).

## Hypothèses

- « La config courante » désigne l'élément affiché dans le panneau principal et son modèle. Si
  c'est le nom de la configuration chargée (dossier racine), il est affiché en tête de l'arbre.
- Les polices Open Sans et Fira Sans (licence SIL OFL) peuvent être embarquées dans l'application.

## Hors périmètre

- Refonte des vues elles-mêmes (modèle, table, liste), en dehors des polices et des couleurs.
- Thème DSFR ou charte de l'État : on reprend `validator-api-client`.
