# Spécification : télécharger un fichier ou un modèle

**Feature** : `008-telechargement-partiel`

**Créée le** : 2026-10-26

**Statut** : brouillon

**Demande** : « Bouton pour télécharger un fichier ou un seul modèle ».

## Contexte

L'éditeur en ligne ne sait télécharger que **toute** la configuration en ZIP (feature 002).
Pour reporter une correction dans un dépôt, il faut alors extraire l'archive et retrouver les
fichiers modifiés parmi des centaines (`validator-config-gpu` : 151 modèles, environ 2 600
fichiers). Pour transmettre un seul modèle à un collègue, il faut aussi tout envoyer.

Cette feature ajoute deux téléchargements ciblés, dans l'éditeur en ligne comme dans
`vce serve` :

- **un fichier** : celui qui est affiché ;
- **un modèle** : le dossier du modèle, en ZIP.

Les deux reprennent l'état courant, modifications comprises, avec les mêmes règles d'écriture
que le ZIP de toute la configuration.

## Scénarios utilisateur et tests

### User Story 1 - Télécharger le fichier affiché (Priorité : P1)

L'utilisateur affiche un fichier (modèle de document, table, liste de codes, surcharges GpU) et
le télécharge seul.

**Pourquoi cette priorité** : c'est le cas le plus fréquent. On corrige une table, puis on
dépose le fichier dans le dépôt.

**Test indépendant** : modifier `maxLength` d'une colonne de `ZONE_URBA`, télécharger
le fichier, constater que `git diff` sur le fichier téléchargé ne montre que la ligne modifiée.

**Scénarios d'acceptation** :

1. **Given** un fichier affiché, **When** l'utilisateur clique sur « Télécharger ce fichier »,
   **Then** le navigateur enregistre le fichier sous son nom (ex. `ZONE_URBA.json`), avec son
   contenu courant.
2. **Given** un fichier non modifié, **When** il est téléchargé, **Then** son contenu est
   identique, octet pour octet, au fichier d'origine.
3. **Given** un fichier modifié, **When** il est téléchargé, **Then** il est écrit avec les
   mêmes règles que le ZIP de toute la configuration (mise en forme d'origine conservée,
   réindentation signalée).
4. **Given** un fichier qui contient des erreurs, **When** il est téléchargé, **Then** le
   téléchargement a lieu, et le message indique le nombre d'erreurs restantes du fichier.

---

### User Story 2 - Télécharger un modèle (Priorité : P1)

L'utilisateur télécharge tout le dossier d'un modèle (`files.json`, `types/`, `codes/`,
`gpu.json`…) en ZIP.

**Pourquoi cette priorité** : un modèle est l'unité de travail habituelle (relecture, envoi à
un producteur de données, report dans un dépôt).

**Test indépendant** : télécharger `cnig_PLU_2017`, extraire l'archive dans un dossier vide,
lancer `vce check` sur ce dossier, constater 1 modèle et les mêmes problèmes que pour ce modèle
dans la configuration complète.

**Scénarios d'acceptation** :

1. **Given** un modèle affiché, ou un modèle de l'arbre de navigation, **When** l'utilisateur
   clique sur « Télécharger le modèle », **Then** le navigateur enregistre `<modèle>.zip`.
2. **Given** l'archive, **When** elle est extraite, **Then** elle contient un dossier
   `<modèle>/` avec tous les fichiers du modèle, dans leur état courant, et rien d'autre.
3. **Given** un modèle avec des erreurs, **When** il est téléchargé, **Then** le téléchargement
   a lieu, et le message indique le nombre d'erreurs restantes du modèle.
4. **Given** un modèle dont une référence sort de son dossier (ex. `tableModel` vers un autre
   modèle), **When** il est téléchargé, **Then** le message signale que l'archive seule ne
   suffit pas à valider le modèle.

---

### Cas limites

- **Fichier non conforme ou illisible** (JSON invalide) : il est téléchargé tel qu'il est
  affiché dans l'onglet « Source ».
- **Dossier sans `files.json`** : il est téléchargeable comme un modèle.
- **Fichiers hors des modèles** : sans objet, l'éditeur ne charge que les dossiers de modèle.
- **Nom de fichier** : seul le dernier segment du chemin est utilisé ; l'arborescence n'est
  conservée que dans le ZIP du modèle.

## Exigences

### Exigences fonctionnelles

- **FR-001** : chaque vue de fichier DOIT proposer « Télécharger ce fichier », dans l'éditeur
  en ligne et dans `vce serve`.
- **FR-002** : la vue d'un modèle et son entrée dans l'arbre DOIVENT proposer « Télécharger le
  modèle », qui produit `<modèle>.zip` avec le dossier `<modèle>/`.
- **FR-003** : le contenu téléchargé DOIT être l'état courant, écrit avec les règles du ZIP de
  toute la configuration (feature 002) : octets d'origine pour un fichier non modifié, mise en
  forme d'origine pour un fichier modifié.
- **FR-004** : le téléchargement NE DOIT pas être bloqué par des erreurs. Le message DOIT
  indiquer les erreurs restantes du fichier ou du modèle.
- **FR-005** : un téléchargement NE DOIT pas changer l'état « modifié » des fichiers (ni
  l'avertissement avant de quitter, ni le compteur de fichiers modifiés).
- **FR-006** : aucun contenu NE DOIT être envoyé sur le réseau (principe V).

### Entités clés

- **Téléchargement** : portée (fichier ou modèle), nom proposé, fichiers inclus, erreurs
  restantes.

## Critères de succès

- **SC-001** : télécharger un fichier ou un modèle prend un clic depuis sa vue.
- **SC-002** : `git diff` entre un fichier téléchargé et l'original ne montre que les
  modifications faites dans l'éditeur.
- **SC-003** : un modèle téléchargé puis extrait donne, avec `vce check`, les mêmes problèmes
  que ce modèle dans la configuration complète, hors références vers d'autres modèles.

## Hypothèses

- Les règles d'écriture du ZIP de la feature 002 s'appliquent sans changement à un fichier ou à
  un sous-ensemble de fichiers.

## Hors périmètre

- Sélection de plusieurs fichiers ou de plusieurs modèles.
- Téléchargement des seuls fichiers modifiés (le ZIP global et les téléchargements ciblés
  suffisent).
- Import d'un fichier ou d'un modèle dans une configuration ouverte.
