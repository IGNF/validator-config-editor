# Spécification : créer et copier des listes de codes

**Feature** : `005-listes-codes`

**Créée le** : 2026-10-26

**Statut** : brouillon

**Demande** : « Permettre l'ajout d'une table de codes, ou la copie depuis une autre table ou un
autre modèle. »

Périmètre retenu : créer, dupliquer et copier une liste de codes. L'édition du contenu d'une
liste (lignes, colonnes) reste hors périmètre, pour une feature ultérieure.

## Contexte

Une liste de codes est un fichier CSV du dossier `codes/` d'un modèle, déclaré dans
`files.json` (`codes[]` : `data`, `id`, `name`, `title`). Les clés étrangères des tables la
désignent par son nom (`(TYPEZONE) REFERENCES ListeTypezonePLU(TYPEZONE)`).

Aujourd'hui, l'éditeur :

- déclare dans `files.json` un CSV **déjà présent** dans le dossier du modèle (« Ajouter une
  liste », feature 002) ;
- copie une liste depuis un autre modèle **seulement** comme correction de
  `ERR-FK-TARGET-LIST` (feature 004), quand une clé étrangère désigne une liste absente.

Il ne permet ni de créer une liste, ni de copier volontairement une liste d'un modèle à l'autre,
ni de dupliquer une liste pour en faire une variante. Les listes sont pourtant largement
partagées : dans `validator-config-gpu`, `ListeEtatPLU` ou `ListeTypezonePLU` se retrouvent à
l'identique dans de nombreux modèles.

Le cœur (`src/core/edit/session`) et `vce serve` savent déjà créer un fichier : un fichier créé
est inclus dans le ZIP, et `vce serve` le crée sur disque à l'enregistrement, sans écraser un
fichier existant.

## Scénarios utilisateur et tests

### User Story 1 - Copier une liste existante (Priorité : P1)

Depuis un modèle, l'utilisateur choisit une liste de n'importe quel modèle de la configuration
(y compris le modèle courant) et la copie dans le modèle courant, sous le même nom ou sous un
nouveau nom.

**Pourquoi cette priorité** : c'est le cas le plus fréquent. Un nouveau modèle reprend les
listes d'une version précédente (`cnig_PLU_2017` → `cnig_PLU_2024`), et une variante d'une
liste part d'une liste existante.

**Test indépendant** : dans `GPU_MEC_2025` (aucune liste), copier `ListeEtatPLU` de
`cnig_PLU_2017`. Constater `GPU_MEC_2025/codes/ListeEtatPLU.csv` identique octet pour octet à
l'original, sa déclaration dans `files.json`, aucun nouveau problème, puis l'annuler en un pas.

**Scénarios d'acceptation** :

1. **Given** la vue d'un modèle, **When** l'utilisateur choisit « Copier une liste existante »,
   **Then** une fenêtre liste toutes les listes de codes CSV de la configuration, groupées par
   modèle, avec un filtre par nom, et un aperçu (colonnes et nombre de lignes) de la liste
   sélectionnée.
2. **Given** une liste choisie dans un autre modèle, **When** l'utilisateur valide sans changer
   le nom, **Then** le CSV est copié tel quel (mêmes octets) dans `<modèle>/codes/<nom>.csv`, et
   la liste est déclarée dans `files.json` avec le titre de la déclaration d'origine.
3. **Given** une liste du modèle courant (duplication), **When** l'utilisateur la copie, **Then**
   un nouveau nom est obligatoire, proposé par défaut (`<nom>_COPIE`).
4. **Given** un nom déjà déclaré dans le modèle, ou un fichier `codes/<nom>.csv` déjà présent,
   **When** l'utilisateur valide, **Then** la copie est refusée avec un message, et l'utilisateur
   peut changer le nom.
5. **Given** une copie faite, **When** l'utilisateur annule (Ctrl+Z), **Then** le fichier créé
   et la déclaration sont retirés en un seul pas.
6. **Given** une copie faite dans `vce serve`, **When** l'utilisateur enregistre, **Then** le
   fichier est créé sur disque, et `files.json` est enregistré ; dans l'éditeur en ligne, les
   deux sont dans le ZIP.

---

### User Story 2 - Créer une liste vide (Priorité : P1)

L'utilisateur crée une nouvelle liste de codes en donnant son nom et ses colonnes.

**Pourquoi cette priorité** : c'est l'« ajout d'une table de codes » de la demande, pour une
liste qui n'existe dans aucun modèle.

**Test indépendant** : dans `GPU_MEC_2025`, créer `ListeTest` avec les colonnes `CODE,LIBELLE`.
Constater `codes/ListeTest.csv` qui ne contient que l'en-tête, sa déclaration, et aucune erreur.

**Scénarios d'acceptation** :

1. **Given** la vue d'un modèle, **When** l'utilisateur choisit « Nouvelle liste », saisit un nom
   et des colonnes, puis valide, **Then** `codes/<nom>.csv` est créé avec la seule ligne
   d'en-tête, et la liste est déclarée dans `files.json`.
2. **Given** un nom invalide (vide, espaces, `/`), des colonnes vides ou en double, **When**
   l'utilisateur valide, **Then** la création est refusée avec un message.
3. **Given** la liste créée, **When** elle est affichée, **Then** elle s'ouvre dans la vue des
   listes de codes, comme une liste existante.

---

### Cas limites

- **Identifiants** : si le modèle utilise des `id`, la déclaration reçoit un nouvel `id`
  unique, comme les autres ajouts (feature 002). L'`id` de la liste d'origine n'est pas repris.
- **Fins de ligne et BOM** : une copie conserve ceux de l'original. Une liste créée utilise
  UTF-8 sans BOM et des fins de ligne LF.
- **Liste d'origine illisible** (CSV invalide) : elle n'est pas proposée à la copie.
- **Liste d'origine modifiée** dans la session : c'est son contenu courant qui est copié.
- **Listes par URL** : non proposées (pas de fichier à copier).
- **Dossier sans `files.json`** : pas de déclaration possible, les actions ne sont pas
  proposées.
- **Fichier CSV présent mais non déclaré** : le message de refus (US1, scénario 4) propose de le
  déclarer avec « Ajouter une liste » (feature 002).

## Exigences

### Exigences fonctionnelles

- **FR-001** : la vue d'un modèle DOIT proposer « Nouvelle liste » et « Copier une liste
  existante », dans l'éditeur en ligne et dans `vce serve`.
- **FR-002** : une copie DOIT reproduire les octets du CSV d'origine (contenu courant s'il est
  modifié), et le déclarer dans `files.json` (`data: ./codes/<nom>.csv`, `name`, `title`, `id`
  si le modèle en utilise).
- **FR-003** : une création ou une copie DOIT être une seule étape d'historique, annulable, et
  revalidée immédiatement.
- **FR-004** : une création ou une copie NE DOIT jamais écraser un fichier existant ni créer un
  doublon de nom dans `codes[]`.
- **FR-005** : les fichiers créés DOIVENT être inclus dans le téléchargement ZIP, et créés sur
  disque par l'enregistrement de `vce serve`.
- **FR-006** : les clés étrangères des tables NE DOIVENT pas être modifiées. Brancher une table
  sur la nouvelle liste reste une édition de table (feature 002).

### Entités clés

- **Liste de codes** : modèle, nom, fichier CSV, titre, `id` éventuel.
- **Copie** : liste d'origine, modèle cible, nom cible.

## Critères de succès

- **SC-001** : copier une liste d'un modèle à l'autre prend moins de 30 secondes, recherche
  comprise, sur `validator-config-gpu` (1 174 listes).
- **SC-002** : `git diff` après une copie et un enregistrement ne montre que le nouveau CSV et
  l'ajout dans `codes[]` de `files.json`.
- **SC-003** : une copie ou une création n'ajoute aucun problème de validation.

## Hypothèses

- Les listes de codes déclarées sont des CSV (c'est le cas dans toutes les configurations
  connues).
- Un nouvel `id` est préférable à la reprise de celui de la liste d'origine, car les `id` sont
  uniques au sein d'un modèle et propres au GpU. À confirmer en relecture.

## Hors périmètre

- Édition du contenu d'une liste (lignes, colonnes) : feature ultérieure.
- Suppression ou renommage d'une liste et de son fichier.
- Copie de plusieurs listes à la fois, ou d'un modèle entier.
- Mise à jour des clés étrangères vers la nouvelle liste.
