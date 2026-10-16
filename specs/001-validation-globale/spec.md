# Spécification : navigation et validation globale d'une configuration validator

**Feature** : `001-validation-globale`

**Créée le** : 2026-10-16

**Statut** : brouillon

**Demande** : « Un éditeur, sur le modèle de tableschema-editor, uniquement pour éditer des
configurations IGNF/validator (ex. `IGNF/validator-config-gpu`), en travaillant sur tout le
dossier de configuration en même temps. » Cette première feature couvre la lecture et la
validation. L'édition fait l'objet des features suivantes (voir « Hors périmètre »).

## Contexte

Une configuration validator est un dossier `config/` qui contient un sous-dossier par modèle
de document. Dans `validator-config-gpu`, on compte 151 modèles concrets et 2 modèles abstraits
`cnig_SUP_XXX_*`. Chaque modèle contient :

- `files.json` : le modèle de document (fichiers attendus, listes de codes, contraintes, parent
  éventuel) ;
- `types/*.json` : les modèles de table (colonnes, contraintes de colonne, conditions, clés
  étrangères) ;
- `codes/*.csv` : les listes de codes (en-tête + lignes) ;
- `gpu.json` : les surcharges propres au Géoportail de l'Urbanisme, indexées par `id` d'objet.

Aujourd'hui, ces fichiers sont édités à la main. Aucun outil ne vérifie leur cohérence avant le
déploiement : chemin `tableModel` cassé, liste de codes absente, clé étrangère vers une colonne
inexistante, `id` orphelin dans `gpu.json`… Par ailleurs, les JSON Schema publiés dans le dépôt
du validator ne correspondent plus au format réel des fichiers.

## Scénarios utilisateur et tests

### User Story 1 - Valider toute la configuration en ligne de commande (Priorité : P1)

Un mainteneur de la configuration lance une commande sur le dossier `config/`. Il obtient la
liste de tous les problèmes, chacun localisé par fichier et par élément. La commande échoue
(code de sortie non nul) s'il existe au moins une erreur, ce qui permet de l'utiliser en
intégration continue.

**Pourquoi cette priorité** : c'est la valeur principale et immédiate. Elle détecte les
incohérences avant le déploiement, sans interface graphique.

**Test indépendant** : lancer la commande sur une copie de `validator-config-gpu/config`, puis
sur une copie où l'on a cassé un `tableModel`. Le second lancement signale le problème avec son
fichier et échoue.

**Scénarios d'acceptation** :

1. **Given** un dossier de configuration sans erreur, **When** l'utilisateur lance
   `vce check <dossier>`, **Then** la commande affiche un résumé (nombre de modèles, de tables,
   de listes de codes, d'avertissements) et se termine avec le code 0.
2. **Given** un `files.json` dont un `tableModel` pointe vers un fichier absent, **When** la
   commande est lancée, **Then** elle affiche une erreur au format
   `<chemin du fichier>:<pointeur JSON> <CODE> <message>` et se termine avec le code 1.
3. **Given** un fichier JSON syntaxiquement invalide, **When** la commande est lancée, **Then**
   l'erreur indique la ligne et la colonne, et les autres modèles sont quand même validés.
4. **Given** l'option `--format json`, **When** la commande est lancée, **Then** la sortie
   standard contient uniquement un document JSON listant les problèmes, exploitable par un
   autre outil.
5. **Given** uniquement des avertissements, **When** la commande est lancée, **Then** elle se
   termine avec le code 0. Avec l'option `--strict`, elle se termine avec le code 1.

---

### User Story 2 - Parcourir la configuration dans le navigateur (Priorité : P1)

Le mainteneur lance l'éditeur local sur le dossier `config/`. Il parcourt l'arborescence des
modèles et consulte, dans des vues lisibles, un modèle de document, une table (colonnes et
contraintes), une liste de codes et les surcharges `gpu.json`.

**Pourquoi cette priorité** : la navigation est le socle de l'édition à venir. Elle apporte déjà
une lecture plus confortable que les fichiers bruts (151 dossiers, plus de 2 000 fichiers).

**Test indépendant** : lancer `vce serve` sur les fixtures, ouvrir l'URL affichée, naviguer
jusqu'à la table `ZONE_URBA` de `cnig_PLU_2017` et vérifier que ses colonnes et contraintes
s'affichent.

**Scénarios d'acceptation** :

1. **Given** un dossier de configuration, **When** l'utilisateur lance `vce serve <dossier>`,
   **Then** la commande affiche une adresse locale (`http://127.0.0.1:<port>`), éventuellement
   ouverte dans le navigateur avec `--open`.
2. **Given** l'éditeur ouvert, **When** l'utilisateur filtre la liste des modèles par une
   partie de leur nom (ex. `PLU_2017`), **Then** seuls les modèles correspondants restent
   affichés.
3. **Given** un modèle sélectionné, **When** l'utilisateur l'ouvre, **Then** il voit ses
   propriétés (nom, titre, description, contraintes, parent), la liste de ses fichiers (type,
   chemin, caractère obligatoire, table liée) et la liste de ses codes.
4. **Given** un fichier de type `table`, **When** l'utilisateur suit le lien vers son modèle de
   table, **Then** il voit les colonnes (nom, type, description, contraintes), les conditions
   et les clés étrangères, chaque clé étrangère menant à la liste de codes ciblée.
5. **Given** une liste de codes, **When** l'utilisateur l'ouvre, **Then** il voit un tableau
   avec l'en-tête et les lignes du CSV.
6. **Given** un modèle avec `gpu.json`, **When** l'utilisateur ouvre les surcharges GpU,
   **Then** chaque surcharge est rattachée à l'objet qu'elle concerne (nom du fichier, de la
   table ou de la colonne).
7. **Given** n'importe quelle vue, **When** l'utilisateur affiche le JSON source, **Then** le
   contenu exact du fichier sur disque est affiché.

---

### User Story 3 - Panneau des problèmes (Priorité : P2)

Dans l'éditeur, l'utilisateur voit les mêmes problèmes que la commande `check`. Il peut les
filtrer et, d'un clic, aller à l'élément concerné. Il relance la validation après avoir modifié
les fichiers dans un autre outil.

**Pourquoi cette priorité** : ce panneau relie la validation à la navigation. Il prépare
l'édition, mais la commande `check` couvre déjà le besoin minimal.

**Test indépendant** : ouvrir les fixtures contenant une erreur connue, cliquer sur l'erreur,
constater l'ouverture de l'élément, corriger le fichier sur disque, cliquer sur « Recharger » et
constater la disparition de l'erreur.

**Scénarios d'acceptation** :

1. **Given** une configuration avec des problèmes, **When** l'éditeur s'ouvre, **Then** le
   panneau affiche les mêmes problèmes (codes, fichiers, messages) que `vce check` sur le même
   dossier.
2. **Given** le panneau ouvert, **When** l'utilisateur filtre par sévérité, par code ou par
   modèle, **Then** seuls les problèmes correspondants restent affichés, avec leur nombre.
3. **Given** un problème sur une colonne de table, **When** l'utilisateur clique dessus,
   **Then** la vue de la table s'ouvre et la colonne concernée est mise en évidence.
4. **Given** l'arborescence des modèles, **When** un modèle contient des erreurs, **Then** un
   indicateur (nombre d'erreurs et d'avertissements) est visible à côté de son nom.
5. **Given** un fichier corrigé dans un autre outil, **When** l'utilisateur clique sur
   « Recharger », **Then** la configuration est relue et la validation est relancée, sans
   recharger la page.

---

### User Story 4 - Intégration au dépôt de configuration (Priorité : P2)

Le dépôt `IGNF/validator-config-gpu` déclare l'éditeur comme dépendance de développement. Tout
contributeur lance `npm run edit` et `npm run check`, et chaque PR du dépôt de configuration est
validée automatiquement.

**Pourquoi cette priorité** : c'est ce qui rend l'outil utile au quotidien et qui permet de
travailler sur tout le dossier de configuration. Elle dépend des US1 et US2.

**Test indépendant** : sur une branche du dépôt de configuration, `npm ci && npm run check`
passe. Une PR qui casse une référence fait échouer le workflow.

**Scénarios d'acceptation** :

1. **Given** le dépôt de configuration, **When** un contributeur lance `npm ci` puis
   `npm run check`, **Then** l'éditeur est installé depuis un tag git de
   `IGNF/validator-config-editor` et la validation s'exécute sur `config/`.
2. **Given** une PR sur le dépôt de configuration, **When** le workflow GitHub s'exécute,
   **Then** il échoue si et seulement si `npm run check` signale une erreur.
3. **Given** une nouvelle version taguée de l'éditeur, **When** la dépendance est mise à jour
   (à la main ou par Dependabot), **Then** seule la ligne de version change dans `package.json`
   et `package-lock.json`.
4. **Given** le README du dépôt de configuration, **When** un contributeur le lit, **Then** il y
   trouve les commandes `npm run edit` et `npm run check`.

---

### Cas limites

- Un modèle abstrait (`cnig_SUP_XXX_*`) ne contient que `gpu.json`. Il est affiché comme modèle
  abstrait et n'est pas signalé comme incomplet.
- Un `files.json` SUP embarque son parent complet dans `parent`. Les objets du parent ne sont
  pas comptés comme doublons du modèle enfant.
- Les mêmes `id` apparaissent dans plusieurs modèles (objets hérités d'un même parent). Ce n'est
  pas une erreur : l'unicité des `id` est vérifiée par modèle.
- Une liste de codes est présente en `.csv` et en `.json` (`cnig_PLU_2017/codes/*.json`). Le
  `.json` est lu comme une entrée `codes[]` isolée et n'est pas signalé comme fichier inconnu.
- Un CSV contient des virgules entre guillemets, des caractères accentués ou une fin de ligne
  `\r\n`. Il est lu sans erreur.
- Un dossier `codes/` est vide (`GPU_MEC_2025`). Ce n'est pas une erreur.
- Le dossier passé en argument n'existe pas ou ne contient aucun modèle. La commande affiche un
  message explicite et se termine avec le code 2.
- Le serveur local reçoit une requête de fichier hors du dossier (`../`, lien symbolique sortant).
  La requête est refusée.

## Exigences

### Exigences fonctionnelles

- **FR-001** : la commande `vce check <dossier>` DOIT valider l'ensemble des modèles du dossier
  et lister tous les problèmes trouvés, sans s'arrêter au premier.
- **FR-002** : chaque problème DOIT porter un code stable, une sévérité (`erreur` ou
  `avertissement`), le modèle, le chemin du fichier relatif au dossier, un pointeur JSON quand il
  s'applique, et un message en français.
- **FR-003** : `files.json` et `types/*.json` DOIVENT être validés par des JSON Schema propres à
  l'éditeur, conformes au format réel des fichiers (`id`, `title`, `abstract`, `parent`, `codes`,
  `constraints.folderName`, `constraints.conditions`, `constraints.foreignKeys`,
  `presenceRequired`, `reference`, types `String`, `Integer`, `Double`, `Boolean`, `Url`,
  `Filename`, `MultiPolygon`, `MultiLineString`, `MultiPoint`, etc.).
- **FR-004** : la structure de `gpu.json` DOIT être validée : sections connues
  (`validator_document_model`, `validator_file_model`, `validator_feature_type`,
  `validator_attribute_type`, `validator_static_table`), clés au format `id`.
- **FR-005** : les références croisées suivantes DOIVENT être vérifiées :
  - `files[].tableModel` désigne un fichier existant du modèle ;
  - `codes[].data` désigne un fichier CSV existant ;
  - chaque clé étrangère `(COL) REFERENCES Liste(COL2)` porte sur une colonne existante de la
    table, cible une liste déclarée dans `codes[]`, dont le CSV contient la colonne `COL2` ;
  - chaque `constraints.reference` `TABLE.COLONNE` désigne une table et une colonne du modèle ;
  - le `name` du modèle est égal au nom de son dossier ;
  - le modèle `parent` éventuel existe dans le dossier ;
  - chaque `id` de `gpu.json` désigne un objet du modèle, ou de son parent abstrait pour un
    modèle hérité (`id` orphelin sinon) ;
  - les `id` sont uniques au sein d'un modèle (hors objets embarqués du parent).
- **FR-006** : les fichiers de `types/` et `codes/` qui ne sont référencés par aucun objet
  DOIVENT être signalés en avertissement.
- **FR-007** : chaque CSV DOIT avoir un en-tête non vide et le même nombre de colonnes sur
  chaque ligne.
- **FR-008** : la commande DOIT proposer une sortie texte (par défaut) et une sortie JSON
  (`--format json`). Codes de sortie : 0 sans erreur, 1 avec au moins une erreur (ou au moins un
  avertissement avec `--strict`), 2 pour un usage incorrect ou un dossier illisible.
- **FR-009** : la commande `vce serve <dossier>` DOIT servir l'interface et l'accès en lecture
  aux fichiers du dossier, uniquement sur `127.0.0.1`. Elle DOIT refuser tout accès à un chemin
  hors du dossier, et toute requête dont l'en-tête `Host` n'est pas l'adresse locale.
- **FR-010** : l'interface DOIT permettre de naviguer entre modèles, fichiers, tables, colonnes,
  listes de codes et surcharges GpU, en suivant les références (fichier → table, clé étrangère →
  liste de codes, surcharge → objet).
- **FR-011** : l'interface DOIT afficher les mêmes problèmes que la commande `check`, calculés
  par le même code, filtrables et reliés aux éléments concernés.
- **FR-012** : l'interface DOIT permettre de relire la configuration depuis le disque et de
  relancer la validation sans redémarrer le serveur.
- **FR-013** : l'interface, les messages et la documentation DOIVENT être en français.
- **FR-014** : l'outil NE DOIT modifier aucun fichier de la configuration dans cette feature.
- **FR-015** : l'outil DOIT être installable depuis un tag git (`github:IGNF/validator-config-editor#vX.Y.Z`)
  et fournir une commande `vce`, sans dépendance d'exécution.

### Entités clés

- **Configuration** : le dossier racine, contenant un ensemble de modèles.
- **Modèle de document** (`files.json`) : `id`, `name`, `title`, `description`, `abstract`,
  `parent` éventuel, `files[]`, `codes[]`, `constraints` (`folderName`, `metadataSpecification`).
- **Modèle de fichier** (`files[]`) : `id`, `name`, `title`, `type` (`table`, `pdf`,
  `directory`, `metadata`), `path`, `mandatory` (`ERROR`, `WARN`, `OPTIONAL`), `tableModel`
  éventuel.
- **Liste de codes** (`codes[]` + CSV) : `id`, `name`, `title`, `data` (chemin du CSV), en-tête
  et lignes.
- **Modèle de table** (`types/*.json`) : `id`, `name`, `title`, `description`, `columns[]`,
  `constraints` (`conditions[]`, `foreignKeys[]`).
- **Colonne** : `id`, `name`, `title`, `type`, `description`, `constraints` (`required`,
  `presenceRequired`, `unique`, `pattern`, `minLength`, `maxLength`, `enum`, `reference`).
- **Surcharges GpU** (`gpu.json`) : par section, un dictionnaire `id → propriétés`.
- **Problème** : `code`, `severity`, `model`, `file`, `pointer`, `message`.

## Critères de succès

- **SC-001** : `vce check` sur `validator-config-gpu/config` (branche `json-source`, 151 modèles)
  s'exécute en moins de 5 secondes sur un poste de développement.
- **SC-002** : chaque erreur que l'outil signale sur `validator-config-gpu/config` est soit
  corrigée dans le dépôt de configuration, soit reconnue comme un faux positif et corrigée dans
  l'outil. Objectif : 0 faux positif.
- **SC-003** : chaque code de problème est couvert par au moins un cas de test dédié.
- **SC-004** : un utilisateur trouve une colonne donnée d'une table donnée en 3 clics au plus
  depuis l'ouverture de l'éditeur (après filtrage par nom du modèle).
- **SC-005** : le paquet installé ne déclare aucune dépendance d'exécution (`dependencies`
  vide).
- **SC-006** : le dépôt `validator-config-gpu` exécute `npm run check` sur chaque PR.

## Hypothèses

- Les utilisateurs sont des mainteneurs de configuration, à l'aise avec git, Node.js (≥ 22) et
  un terminal. Le versionnement, les branches et les PR restent faits avec git, hors de l'outil.
- Le format de référence est celui de la branche `json-source` de `validator-config-gpu`. Les
  autres dépôts de configuration au même format sont pris en charge sans adaptation.
- Les fichiers `config-backup/` du dépôt de configuration sont hors périmètre.
- Les JSON Schema de l'éditeur pourront être proposés plus tard au dépôt du validator, mais
  cette feature n'en dépend pas.

## Hors périmètre (features suivantes)

- **002-edition-en-ligne** : édition de `files.json` et `types/*.json` (formulaires,
  annuler/rétablir, enregistrement sans perte), éditeur en ligne sur GitHub Pages avec
  téléchargement ZIP.
- **003-ouverture-depot** : ouverture de la configuration d'un dépôt GitHub par son URL.
- **004-listes-codes** : édition des listes de codes CSV.
- **005-gpu-heritage** : édition de `gpu.json` (surcharges, variables `<INSEE_COMMUNE>`…) et
  gestion de l'héritage des modèles SUP.
