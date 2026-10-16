# Spécification : édition des modèles et éditeur en ligne

**Feature** : `002-edition-en-ligne`

**Créée le** : 2026-10-16

**Statut** : brouillon

**Demande** : « Une GitHub Pages pour pouvoir tester d'éditer une configuration et la
télécharger. » Il faut pour cela l'édition des modèles, qui est donc intégrée à cette feature,
et aussi rendue disponible dans l'éditeur local `vce serve`.

## Contexte

La feature 001 permet de valider une configuration (`vce check`) et de la parcourir en lecture
(`vce serve`), à condition d'avoir Node.js et un clone du dépôt de configuration.

Cette feature apporte deux choses :

- **l'édition** des modèles de document (`files.json`) et des modèles de table
  (`types/*.json`), avec validation en direct, par le même cœur que `vce check` ;
- **un éditeur en ligne** publié sur GitHub Pages. Sans installation, l'utilisateur ouvre le
  dossier de configuration de son poste, l'édite dans le navigateur et télécharge la
  configuration complète en ZIP. Aucun fichier n'est envoyé sur le réseau.

Dans l'éditeur local `vce serve`, les modifications sont enregistrées directement sur disque.

Les listes de codes (CSV) et `gpu.json` restent en lecture. Leur édition fait l'objet des
features 004 et 005.

## Scénarios utilisateur et tests

### User Story 1 - Ouvrir un dossier de configuration dans l'éditeur en ligne (Priorité : P1)

Un contributeur ouvre l'éditeur publié sur GitHub Pages et choisit le dossier de configuration
de son poste, par exemple un clone de `validator-config-gpu`. Il retrouve la navigation et la
validation de l'éditeur local. Rien n'est envoyé sur le réseau.

**Pourquoi cette priorité** : c'est la porte d'entrée de l'éditeur en ligne. Sans elle, il n'y
a rien à éditer ni à télécharger.

**Test indépendant** : ouvrir le site, choisir le dossier des fixtures, constater le même
résumé et les mêmes problèmes qu'avec `vce check` sur ce dossier.

**Scénarios d'acceptation** :

1. **Given** l'éditeur en ligne sans configuration ouverte, **When** l'utilisateur l'affiche,
   **Then** une page d'accueil explique l'outil et propose « Ouvrir un dossier de
   configuration », avec la mention que les fichiers restent sur son poste.
2. **Given** l'accueil, **When** l'utilisateur choisit un dossier contenant des modèles,
   **Then** la configuration est chargée, avec l'arbre des modèles, les vues et les problèmes
   identiques à l'éditeur local.
3. **Given** l'accueil, **When** l'utilisateur choisit la racine d'un dépôt de configuration
   (qui contient `config/`), **Then** le dossier `config/` est utilisé comme configuration.
4. **Given** un dossier sans aucun modèle, **When** l'utilisateur le choisit, **Then** un
   message explicite l'indique et l'accueil reste affiché.
5. **Given** une configuration ouverte, **When** l'utilisateur parcourt et édite, **Then**
   aucune requête n'est émise vers une autre origine que le site.

---

### User Story 2 - Éditer un modèle de table (Priorité : P1)

L'utilisateur modifie une table : propriétés (nom, titre, description), colonnes (ajout,
suppression, réordonnancement ; nom, titre, type, description), contraintes de colonne
(valeur obligatoire, colonne obligatoire, unique, longueurs, motif, liste de valeurs,
référence), clés étrangères et conditions. Les problèmes se mettent à jour en direct, et il peut
annuler et rétablir.

**Pourquoi cette priorité** : les tables représentent l'essentiel des modifications des
configurations (1 097 tables, plus de 9 000 colonnes dans `validator-config-gpu`).

**Test indépendant** : dans la table `ZONE_URBA`, passer `maxLength` de `TYPEZONE` à 5,
ajouter une colonne, constater l'aperçu et l'absence d'erreur, annuler puis rétablir.

**Scénarios d'acceptation** :

1. **Given** une table ouverte, **When** l'utilisateur modifie une propriété ou une contrainte
   de colonne, **Then** la vue et l'onglet « Source » reflètent la modification, et la table
   est marquée comme modifiée.
2. **Given** une table ouverte, **When** l'utilisateur ajoute une colonne, **Then** elle reçoit
   un nouvel `id` de 32 caractères hexadécimaux, unique dans la configuration, et un type par
   défaut `String`.
3. **Given** une table, **When** l'utilisateur supprime ou déplace une colonne, **Then** l'ordre
   et le contenu des autres colonnes sont conservés.
4. **Given** une modification qui crée un problème (ex. clé étrangère vers une colonne
   inexistante), **When** elle est saisie, **Then** le problème apparaît en moins d'une seconde
   sur l'élément concerné, et disparaît quand il est corrigé.
5. **Given** plusieurs modifications successives, **When** l'utilisateur annule puis rétablit
   (boutons ou Ctrl+Z, Ctrl+Maj+Z), **Then** la configuration revient exactement à chaque état
   précédent ou suivant.
6. **Given** une colonne avec une propriété inconnue de l'éditeur, **When** l'utilisateur
   modifie une autre propriété, **Then** la propriété inconnue est conservée.

---

### User Story 3 - Éditer un modèle de document (Priorité : P1)

L'utilisateur modifie `files.json` : propriétés (titre, description, nom de dossier attendu,
spécification des métadonnées), fichiers (ajout, suppression, réordonnancement ; nom, type,
chemin, présence, modèle de table) et déclarations de listes de codes (nom, fichier).

**Pourquoi cette priorité** : ajouter ou retirer un fichier attendu est la seconde modification
la plus courante, et le modèle relie tables et listes de codes.

**Test indépendant** : dans `cnig_PLU_2017`, passer le fichier `HABILLAGE_TXT` de facultatif
à obligatoire, ajouter un fichier PDF, constater l'absence d'erreur.

**Scénarios d'acceptation** :

1. **Given** un modèle ouvert, **When** l'utilisateur modifie une propriété ou un fichier,
   **Then** la vue, la source et les problèmes sont mis à jour.
2. **Given** un modèle, **When** l'utilisateur ajoute un fichier de type `table`, **Then** il
   peut choisir son modèle de table parmi les tables du modèle (ou saisir un chemin), et un
   modèle de table absent est signalé.
3. **Given** un modèle hérité (avec `parent`), **When** il est affiché en édition, **Then** le
   parent embarqué est en lecture seule et conservé tel quel.
4. **Given** les déclarations de listes de codes, **When** l'utilisateur en ajoute une,
   **Then** il choisit un CSV du dossier `codes/` du modèle.

---

### User Story 4 - Télécharger toute la configuration en ZIP (Priorité : P1)

Après édition dans l'éditeur en ligne, l'utilisateur télécharge une archive ZIP de toute la
configuration, qu'il décompresse à la place de son dossier pour versionner les modifications
avec git.

**Pourquoi cette priorité** : c'est la sortie de l'éditeur en ligne. Sans elle, les
modifications sont perdues.

**Test indépendant** : modifier une table, télécharger le ZIP, le décompresser, constater avec
`git diff` que seul le fichier modifié diffère, puis que `vce check` donne les mêmes problèmes
que l'éditeur.

**Scénarios d'acceptation** :

1. **Given** une configuration ouverte, **When** l'utilisateur clique « Télécharger (ZIP) »,
   **Then** il obtient `<nom du dossier>.zip`, qui contient tous les fichiers `*.json` et
   `*.csv` de la configuration sous leur chemin d'origine.
2. **Given** l'archive, **When** on la compare au dossier d'origine, **Then** les fichiers non
   modifiés sont identiques octet pour octet.
3. **Given** un fichier modifié, **When** il est écrit dans l'archive, **Then** il conserve
   l'ordre des propriétés, les propriétés inconnues et la mise en forme des fichiers existants
   (indentation de 4 espaces, sans saut de ligne final), si bien que `git diff` ne montre que
   les lignes réellement changées.
4. **Given** des modifications non téléchargées, **When** l'utilisateur ferme l'onglet ou ouvre
   un autre dossier, **Then** il est averti et peut annuler.
5. **Given** une configuration qui contient des erreurs, **When** l'utilisateur télécharge,
   **Then** le téléchargement est permis, avec un rappel du nombre d'erreurs.

---

### User Story 5 - Enregistrer sur disque dans l'éditeur local (Priorité : P2)

Avec `vce serve`, l'utilisateur édite comme dans l'éditeur en ligne. Il enregistre les fichiers
modifiés directement dans le dossier de configuration, puis versionne avec git.

**Pourquoi cette priorité** : c'est le mode de travail quotidien des mainteneurs. Il réutilise
toute l'édition des US2 et US3 et ne demande qu'une écriture locale.

**Test indépendant** : avec `vce serve` sur une copie des fixtures, modifier une table,
enregistrer, constater avec `git diff` que seul ce fichier a changé, et que `vce check` donne
les mêmes problèmes.

**Scénarios d'acceptation** :

1. **Given** des modifications dans `vce serve`, **When** l'utilisateur clique « Enregistrer »
   (ou Ctrl+S), **Then** les fichiers modifiés, et eux seuls, sont écrits sur disque.
2. **Given** un fichier modifié sur disque par un autre outil depuis son chargement, **When**
   l'utilisateur enregistre, **Then** l'enregistrement de ce fichier est refusé avec un message
   explicite, sans perte des modifications en cours.
3. **Given** l'éditeur local, **When** une requête d'écriture vise un chemin hors du dossier ou
   un fichier autre que `*.json` et `*.csv`, **Then** elle est refusée.

---

### User Story 6 - Publication sur GitHub Pages (Priorité : P1)

L'éditeur en ligne est publié automatiquement à chaque merge sur `main`. Le README des dépôts
de l'éditeur et de configuration y renvoie.

**Pourquoi cette priorité** : c'est l'objet de la demande, et cela permet de faire tester
l'outil sans installation.

**Test indépendant** : après merge sur `main`, ouvrir l'URL GitHub Pages et dérouler l'US1.

**Scénarios d'acceptation** :

1. **Given** un merge sur `main` avec une CI verte, **When** le workflow s'exécute, **Then**
   l'éditeur en ligne est publié sur GitHub Pages.
2. **Given** le site publié, **When** on l'ouvre, **Then** il fonctionne sans serveur
   applicatif, avec une CSP qui interdit toute ressource distante.
3. **Given** le README de l'éditeur, **When** on le lit, **Then** il donne le lien vers
   l'éditeur en ligne et explique la différence avec `vce serve`.

---

### Cas limites

- **Dossier volumineux** : le dossier choisi contient `.git/` ou `node_modules/`. Seuls les
  `*.json` et `*.csv` hors dossiers cachés et `node_modules/` sont lus, et l'ouverture de
  `validator-config-gpu` reste sous 3 s.
- **Fichier illisible** : un fichier est illisible ou non conforme à son schéma. Il reste
  affiché en lecture (onglet « Source »), n'est pas éditable par formulaire, et figure tel quel
  dans le ZIP.
- **Renommage de table** : renommer une table (`name`) ne renomme pas son fichier. Une
  référence devenue invalide (clé étrangère, `reference`, `tableModel` par convention) est
  signalée par la validation.
- **Suppression d'un objet surchargé** : supprimer une colonne ou un fichier qui a une
  surcharge dans `gpu.json` fait apparaître l'avertissement `WARN-GPU-ORPHAN-ID`.
- **Navigateurs** : sans sélection de dossier (navigateur ancien), un message invite à utiliser
  un navigateur récent (Chromium, Firefox, Safari récents).

## Exigences

### Exigences fonctionnelles

- **FR-001** : l'interface DOIT fonctionner selon deux sources de configuration, avec le même
  code :
  - le serveur local `vce serve` (lecture et écriture) ;
  - un dossier choisi par l'utilisateur dans le navigateur (lecture en mémoire, téléchargement
    ZIP).
- **FR-002** : dans l'éditeur en ligne, aucun contenu de configuration NE DOIT être transmis
  sur le réseau.
- **FR-003** : l'utilisateur DOIT pouvoir éditer par formulaire les propriétés, colonnes,
  contraintes, clés étrangères et conditions d'une table, ainsi que les propriétés, fichiers et
  déclarations de listes de codes d'un modèle de document.
- **FR-004** : toute modification DOIT relancer la validation complète (schémas et références
  croisées) et mettre à jour les problèmes en moins d'une seconde sur `validator-config-gpu`.
- **FR-005** : l'utilisateur DOIT pouvoir annuler et rétablir chaque modification (au moins
  100 niveaux).
- **FR-006** : les nouveaux objets DOIVENT recevoir un `id` de 32 caractères hexadécimaux
  aléatoire, unique dans la configuration.
- **FR-007** : l'enregistrement d'un fichier modifié DOIT conserver l'ordre des propriétés, les
  propriétés inconnues et la mise en forme des fichiers existants (JSON indenté de 4 espaces,
  sans saut de ligne final). Un fichier non modifié NE DOIT jamais être réécrit.
- **FR-008** : l'éditeur en ligne DOIT produire un ZIP de toute la configuration (fichiers
  `*.json` et `*.csv`, chemins d'origine), sans dépendance externe.
- **FR-009** : `vce serve` DOIT accepter l'écriture d'un fichier `*.json` ou `*.csv` existant
  du dossier, et refuser l'écriture si le fichier a changé sur disque depuis sa lecture.
- **FR-010** : l'interface DOIT signaler les modifications non enregistrées ou non
  téléchargées, et avertir avant de les perdre.
- **FR-011** : l'éditeur en ligne DOIT être publié sur GitHub Pages par un workflow, à chaque
  merge sur `main`.
- **FR-012** : le parent embarqué (`parent`), les listes de codes CSV et `gpu.json` DOIVENT
  rester en lecture seule dans cette feature.

### Entités clés

- **Source de configuration** : serveur local ou dossier du navigateur ; fournit les fichiers
  et, pour le serveur, l'écriture.
- **Fichier modifié** : chemin, contenu d'origine, données modifiées.
- **Historique** : suite d'états de la configuration pour annuler et rétablir.
- **Archive** : ZIP de tous les fichiers de la configuration.

## Critères de succès

- **SC-001** : un utilisateur sans Node.js modifie une contrainte de colonne et récupère la
  configuration modifiée en moins de 2 minutes depuis l'ouverture du site.
- **SC-002** : après une modification d'une seule valeur, `git diff` sur la configuration
  décompressée ou enregistrée montre une seule ligne modifiée.
- **SC-003** : ouvrir `validator-config-gpu` dans l'éditeur en ligne prend moins de 3 secondes,
  et revalider après une modification moins d'une seconde.
- **SC-004** : le paquet `vce` reste sans dépendance d'exécution, et le site publié ne charge
  aucune ressource distante.

## Hypothèses

- Les navigateurs cibles permettent de choisir un dossier (`<input webkitdirectory>`) :
  Chromium, Firefox et Safari récents.
- Le ZIP est produit sans compression (stockage), pour rester simple et sans dépendance. Sa
  taille est celle de la configuration (≈ 8 Mo pour `validator-config-gpu`).
- Le site GitHub Pages du dépôt peut être activé (dépôt public, ou Pages privé de
  l'organisation).

## Hors périmètre

- Création et suppression de modèles, de tables (fichiers) et de listes de codes (fichiers).
- **004-listes-codes** : édition des listes de codes CSV.
- **005-gpu-heritage** : édition de `gpu.json` et de l'héritage des modèles SUP.
- Ouverture d'une archive ZIP dans l'éditeur en ligne.
- **003-ouverture-depot** : ouverture de la configuration d'un dépôt GitHub par son URL.
