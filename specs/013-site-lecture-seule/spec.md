# Spécification : site en lecture seule d'un dépôt de configuration

**Feature** : `013-site-lecture-seule`

**Créée le** : 2026-10-27

**Statut** : brouillon

**Issue** : #95

**Demande** : « Je veux pouvoir ajouter ce dépôt dans les dépendances d'une config, pour pouvoir
l'afficher proprement en lecture seule dans le GitHub Pages de cette config, avec la comparaison
entre standards. »

## Contexte

Un dépôt de configuration (`validator-config-gpu`, dgpr, ppr…) installe déjà
`validator-config-editor` depuis un tag git, pour lancer `vce check` en CI. Pour consulter sa
configuration, il faut aujourd'hui :
- soit cloner le dépôt et lancer `vce serve` ;
- soit ouvrir l'éditeur en ligne et choisir un dossier local.

Aucun lien ne permet de montrer une configuration à quelqu'un qui n'a ni Node.js ni copie locale.

Ce qui existe déjà :
- **Interface livrée** : le paquet contient l'interface construite (`dist/ui`, 1,2 Mo), servie
  par `vce serve`.
- **Chargement** : l'interface lit toute la configuration d'une requête, `api/snapshot` :
  `{ root, files }`, chemins relatifs vers texte.
- **Taille** : pour `validator-config-gpu` (`json-source`, 2 431 fichiers JSON et CSV),
  l'instantané pèse 7,6 Mo, soit 0,9 Mo compressé.
- **Comparaison** : la comparaison de standards (011), la navigation et la validation n'ont pas
  besoin d'écrire.

## Scénarios utilisateur et tests

### User Story 1 - Construire le site (Priorité : P1)

Une commande produit, depuis le dossier de configuration, un site statique prêt à publier.

**Pourquoi cette priorité** : c'est la brique de base ; le reste en dépend.

**Test indépendant** : `vce site config/ _site/`, puis servir `_site/` avec un serveur statique
quelconque ; l'éditeur s'ouvre sur la configuration, en lecture seule.

**Scénarios d'acceptation** :

1. **Given** un dossier de configuration, **When** `vce site <dossier> <sortie>` est lancé,
   **Then** `<sortie>` contient l'interface et un instantané de la configuration. Le code de
   sortie est 0, et le résumé (modèles, tables, listes, problèmes) est affiché.
2. **Given** l'option `--title <titre>`, **When** le site s'ouvre, **Then** le titre est affiché à
   la place du chemin du dossier, par exemple « validator-config-gpu (json-source) ».
3. **Given** un dossier inexistant, ou sans modèle, **When** la commande est lancée, **Then** un
   message l'indique et le code de sortie est 2.
4. **Given** une sortie qui existe déjà et n'est pas un site produit par `vce site`, **When** la
   commande est lancée, **Then** elle refuse d'écrire, sauf avec `--force`.
5. **Given** le site servi depuis un sous-chemin (`https://ignf.github.io/<dépôt>/`), **When** il
   s'ouvre, **Then** toutes les ressources se chargent, sans requête vers un autre site.

---

### User Story 2 - Consulter en lecture seule (Priorité : P1)

Le site permet tout ce qui ne modifie pas la configuration, et rien d'autre.

**Pourquoi cette priorité** : la demande dit « en lecture seule ». Un champ modifiable sans
enregistrement possible serait trompeur.

**Test indépendant** : sur le site, parcourir un modèle, une table et une liste, filtrer les
problèmes, comparer deux standards. Aucun champ n'est modifiable, et aucun bouton n'ajoute, ne
supprime ou n'enregistre.

**Scénarios d'acceptation** :

1. **Given** le site, **When** une vue s'affiche (modèle, table, liste, surcharges), **Then** les
   champs sont en lecture seule. Les boutons d'ajout, de suppression, de déplacement, de copie, de
   correction, d'annulation et d'enregistrement sont absents.
2. **Given** le site, **When** l'utilisateur navigue, **Then** l'arbre, les problèmes, les liens
   entre fichiers, l'onglet « Source », les variables (010) et les adresses partageables
   fonctionnent comme dans l'éditeur.
3. **Given** le site, **When** l'utilisateur ouvre « Comparer » (011) ou « Équivalents » (006),
   **Then** la comparaison s'affiche. L'onglet « Appliquer » des équivalents est absent.
4. **Given** le site, **When** l'utilisateur veut récupérer des fichiers, **Then** le
   téléchargement d'un fichier, d'un modèle ou de toute la configuration (008) reste possible.
5. **Given** le site, **When** il s'affiche, **Then** un bandeau indique « Lecture seule » et
   comment éditer : `vce serve` ou l'éditeur en ligne.

---

### User Story 3 - Publier depuis le dépôt de configuration (Priorité : P2)

Un workflow GitHub Actions d'exemple, à copier dans le dépôt de configuration, publie le site à
chaque push.

**Pourquoi cette priorité** : la commande suffit, mais l'exemple évite à chaque dépôt de réécrire
le même workflow.

**Test indépendant** : copier le workflow dans un dépôt de test, pousser, ouvrir l'adresse
GitHub Pages.

**Scénarios d'acceptation** :

1. **Given** la documentation (`docs/utilisation.md`), **When** on la lit, **Then** elle donne le
   workflow complet : `npm ci`, `npx vce site config _site --title …`, publication Pages, et les
   réglages du dépôt (Settings → Pages → GitHub Actions).
2. **Given** le workflow, **When** la validation trouve des erreurs, **Then** le site est publié
   quand même et les montre. Le blocage reste le rôle de `vce check` dans la CI.

---

### Cas limites

- **Configuration avec erreurs** : le site s'affiche avec ses problèmes, comme l'éditeur.
- **Fichiers non textuels** (PDF, images de la configuration) : ils ne sont pas dans l'instantané,
  comme pour `vce serve`.
- **Grosse configuration** : gpu tient en 7,6 Mo, soit 0,9 Mo compressé. Le chargement affiche sa
  progression.
- **Version de l'éditeur** : le site embarque la version installée dans le dépôt de configuration,
  et le pied de page l'indique.

## Exigences

### Exigences fonctionnelles

- **FR-001** : `vce site <dossier> <sortie> [--title <titre>] [--force]` DOIT produire un site
  statique autonome : interface, instantané de la configuration, aucune ressource distante.
- **FR-002** : le site DOIT fonctionner depuis un sous-chemin, avec n'importe quel serveur statique.
- **FR-003** : le site NE DOIT permettre aucune modification de la configuration. Navigation,
  validation, comparaison, équivalents (lecture) et téléchargements DOIVENT rester disponibles.
- **FR-004** : le mode lecture seule DOIT être signalé à l'utilisateur.
- **FR-005** : la documentation DOIT fournir un workflow de publication GitHub Pages pour un dépôt
  de configuration.
- **FR-006** : la commande DOIT réutiliser l'interface livrée dans le paquet (`dist/ui`), sans
  construction supplémentaire dans le dépôt de configuration.

## Critères de succès

- **SC-001** : sur `validator-config-gpu`, `vce site` prend moins de 10 secondes, et le site s'ouvre
  et se valide en moins de 5 secondes sur un poste courant.
- **SC-002** : axe ne signale aucune violation sur le site, en clair et en sombre.
- **SC-003** : aucun contrôle de modification n'est présent sur le site (vérifié par les tests de
  bout en bout sur chaque vue).

## Hypothèses

- Le dépôt de configuration a les droits pour activer GitHub Pages (Settings → Pages → GitHub
  Actions).
- La configuration publiée est publique, ou réservée aux membres de l'organisation si le dépôt est
  interne.

## Hors périmètre

- Édition en ligne avec enregistrement dans le dépôt (PR, commits) : la feature 003 a été retirée.
- Recherche plein texte dans la configuration.
- Plusieurs configurations ou plusieurs branches sur un même site.
