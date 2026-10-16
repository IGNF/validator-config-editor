# Spécification : ouvrir la configuration d'un dépôt GitHub

**Feature** : `003-ouverture-depot`

**Créée le** : 2026-10-16

**Statut** : brouillon

**Demande** : « Ajouter une feature de chargement de modèle par URL » : il s'agit de l'URL d'un
**dépôt** de configuration. « Ajouter les autres configurations connues » : dgpr, naviforest,
ppr.

## Contexte

Les configurations IGNF/validator sont publiées dans des dépôts GitHub publics :

| Dépôt | Modèles |
|---|---|
| [validator-config-gpu](https://github.com/IGNF/validator-config-gpu) | standards CNIG du Géoportail de l'Urbanisme |
| [validator-config-dgpr](https://github.com/IGNF/validator-config-dgpr) | directive inondation, COVADIS, canalisations |
| [validator-config-naviforest](https://github.com/IGNF/validator-config-naviforest) | dessertes forestières |
| [validator-config-ppr](https://github.com/IGNF/validator-config-ppr) | plans de prévention des risques |

Avec les features 001 et 002, il faut un clone local (ou un dossier du poste) pour ouvrir une
configuration. Cette feature permet d'ouvrir directement la configuration d'un dépôt, et d'une
branche, à partir de son URL, dans l'éditeur en ligne comme dans l'éditeur local. On peut ainsi
consulter, valider, éditer puis télécharger en ZIP (feature 002) sans clone, et partager un lien
qui ouvre une configuration.

Faisabilité vérifiée : l'API GitHub (`api.github.com`) et `raw.githubusercontent.com`
autorisent les requêtes depuis un autre site (CORS `*`). Une requête liste l'arbre du dépôt, puis
une requête par fichier lit son contenu, sans jeton pour un dépôt public. Les archives ZIP de
GitHub (`codeload.github.com`) ne sont pas lisibles depuis le navigateur.

## Scénarios utilisateur et tests

### User Story 1 - Ouvrir un dépôt par son URL (Priorité : P1)

L'utilisateur colle l'URL d'un dépôt de configuration (ex.
`https://github.com/IGNF/validator-config-dgpr`). L'éditeur lit la configuration de la branche
par défaut et l'affiche, avec navigation, problèmes et édition, comme pour un dossier local.

**Pourquoi cette priorité** : c'est l'objet de la demande. Les autres stories en dépendent.

**Test indépendant** : saisir l'URL de `validator-config-dgpr`, constater le même résumé et
les mêmes problèmes que `vce check` sur un clone de sa branche par défaut.

**Scénarios d'acceptation** :

1. **Given** l'accueil (éditeur en ligne) ou le menu « Ouvrir » (éditeur local), **When**
   l'utilisateur saisit l'URL d'un dépôt GitHub public et valide, **Then** une progression
   (fichiers lus / total) s'affiche, puis la configuration est ouverte, avec le dépôt et la
   branche visibles dans la barre de titre.
2. **Given** un dépôt qui contient un dossier `config/`, **When** il est ouvert, **Then**
   `config/` est utilisé comme configuration. Sinon, la racine du dépôt est utilisée.
3. **Given** une URL qui désigne un sous-dossier
   (`https://github.com/<org>/<dépôt>/tree/<branche>/<chemin>`), **When** elle est ouverte,
   **Then** ce sous-dossier est utilisé comme configuration.
4. **Given** une URL invalide, un dépôt inexistant ou privé, ou un dépôt sans aucun modèle,
   **When** l'utilisateur l'ouvre, **Then** un message explicite indique la cause, et la
   configuration courante est conservée.
5. **Given** la limite de requêtes anonymes de l'API GitHub atteinte, **When** l'utilisateur
   ouvre un dépôt, **Then** le message indique l'heure à partir de laquelle réessayer.
6. **Given** une configuration ouverte depuis un dépôt, **When** l'utilisateur l'édite, **Then**
   les modifications restent en mémoire, et le téléchargement ZIP (feature 002) fournit la
   configuration modifiée. Le dépôt distant n'est jamais modifié.

---

### User Story 2 - Choisir une branche (Priorité : P1)

L'utilisateur ouvre une autre branche que la branche par défaut, par exemple `json-source` de
`validator-config-gpu`, ou une branche de travail pour relire une PR.

**Pourquoi cette priorité** : les évolutions de configuration se font sur des branches, et la
configuration de référence de `validator-config-gpu` est sur `json-source`.

**Test indépendant** : ouvrir `validator-config-gpu`, choisir `json-source`, constater
153 modèles.

**Scénarios d'acceptation** :

1. **Given** une URL `https://github.com/<org>/<dépôt>/tree/<branche>`, **When** elle est
   ouverte, **Then** cette branche est lue.
2. **Given** un dépôt ouvert, **When** l'utilisateur affiche la liste des branches du dépôt et
   en choisit une, **Then** la configuration de cette branche est chargée (après confirmation
   s'il y a des modifications non téléchargées).
3. **Given** une branche inexistante, **When** l'utilisateur la demande, **Then** un message
   l'indique et propose la branche par défaut.

---

### User Story 3 - Configurations connues (Priorité : P2)

L'accueil propose les quatre configurations connues. Un clic ouvre la configuration de la
branche de référence de chacune.

**Pourquoi cette priorité** : c'est le chemin le plus court pour découvrir l'outil ou relire
une configuration, sans connaître les URL.

**Test indépendant** : sur l'accueil, cliquer sur « validator-config-ppr », constater
l'ouverture de ses 3 modèles.

**Scénarios d'acceptation** :

1. **Given** l'accueil, **When** il s'affiche, **Then** il liste les dépôts gpu, dgpr,
   naviforest et ppr, avec leur description et leur branche de référence (`json-source` pour
   gpu, la branche par défaut pour les autres).
2. **Given** la liste, **When** l'utilisateur clique sur un dépôt, **Then** il est ouvert comme
   en US1.

---

### User Story 4 - Lien partageable (Priorité : P2)

L'utilisateur copie l'adresse de l'éditeur pour partager une configuration, et éventuellement
l'élément affiché. Le destinataire ouvre directement la même configuration au même endroit.

**Pourquoi cette priorité** : c'est utile pour la relecture et le support (« regarde la colonne
X de telle table sur telle branche »), mais non indispensable.

**Test indépendant** : ouvrir un dépôt, naviguer vers une table, recharger la page avec
l'adresse affichée, constater la même vue.

**Scénarios d'acceptation** :

1. **Given** un dépôt ouvert, **When** l'utilisateur regarde l'adresse de la page, **Then**
   elle contient le dépôt, la branche et le sous-dossier
   (`?depot=<org>/<dépôt>&branche=<branche>&dossier=<chemin>`), plus l'élément affiché
   (`#/<fichier>?p=<pointeur>`).
2. **Given** une telle adresse, **When** un autre utilisateur l'ouvre, **Then** la même
   configuration est chargée et le même élément est affiché.
3. **Given** des modifications non téléchargées, **When** l'utilisateur ouvre un autre lien de
   dépôt, **Then** il est averti avant de les perdre.

---

### Cas limites

- **Configuration volumineuse** : `validator-config-gpu` compte environ 2 600 fichiers. Les
  lectures sont parallélisées (16 à la fois), et l'ouverture affiche la progression.
- **Fichiers ignorés** : les fichiers autres que `*.json` et `*.csv`, ou situés hors du dossier
  de configuration, ne sont pas lus. L'arbre du dépôt donne la liste sans les télécharger.
- **Arbre tronqué** : si GitHub tronque l'arbre d'un très grand dépôt (indicateur `truncated`),
  un message l'indique au lieu d'ouvrir une configuration incomplète.
- **Accès** : un dépôt privé ou d'une organisation sans accès public est hors périmètre. Le
  message invite à cloner le dépôt et à ouvrir le dossier local.
- **Réseau** : en cas d'erreur réseau pendant la lecture, l'ouverture est interrompue et la
  configuration courante est conservée.
- **URL acceptées** : `https://github.com/<org>/<dépôt>`, avec ou sans `.git`, `/tree/<branche>`
  et `/tree/<branche>/<chemin>`. Une branche qui contient « / » est résolue avec la liste des
  branches du dépôt.

## Exigences

### Exigences fonctionnelles

- **FR-001** : l'interface (éditeur en ligne et `vce serve`) DOIT ouvrir la configuration d'un
  dépôt GitHub public à partir de son URL, sur la branche par défaut ou sur une branche donnée.
- **FR-002** : le dossier de configuration DOIT être `config/` s'il existe, sinon la racine du
  dépôt, sauf si l'URL désigne un sous-dossier.
- **FR-003** : seuls les fichiers `*.json` et `*.csv` du dossier de configuration DOIVENT être
  lus. L'arbre DOIT être obtenu en une requête à l'API GitHub, et les contenus par
  `raw.githubusercontent.com`, au commit de l'arbre, pour lire un état cohérent même si la
  branche avance pendant la lecture.
- **FR-004** : aucun contenu NE DOIT être envoyé, aucun jeton NE DOIT être demandé, et seules
  `api.github.com` et `raw.githubusercontent.com` DOIVENT être contactées (CSP `connect-src`),
  uniquement sur action de l'utilisateur ou ouverture d'un lien de dépôt.
- **FR-005** : la configuration ouverte DOIT être validée, navigable, éditable et téléchargeable
  en ZIP comme un dossier local (features 001 et 002). Le dépôt distant NE DOIT jamais être
  modifié.
- **FR-006** : les erreurs (URL invalide, dépôt ou branche introuvable, dépôt privé, limite de
  requêtes, arbre tronqué, erreur réseau) DOIVENT donner un message explicite en français, sans
  perdre la configuration courante.
- **FR-007** : l'adresse de la page DOIT permettre de rouvrir le même dépôt, la même branche, le
  même dossier et le même élément.
- **FR-008** : l'accueil DOIT proposer les configurations connues, définies dans une liste
  unique du code, avec leur branche de référence.
- **FR-009** : l'interface DOIT afficher la source de la configuration ouverte (dossier local,
  serveur local, ou dépôt, branche et commit), avec un lien vers le dépôt.

### Entités clés

- **Référence de dépôt** : organisation, dépôt, branche, sous-dossier, et commit résolu.
- **Configuration connue** : dépôt, description, branche de référence.

## Critères de succès

- **SC-001** : ouvrir `validator-config-dgpr`, `validator-config-naviforest` ou
  `validator-config-ppr` depuis l'accueil prend moins de 10 secondes ; ouvrir
  `validator-config-gpu` (`json-source`, ≈ 2 600 fichiers) moins de 60 secondes, avec la
  progression affichée.
- **SC-002** : pour chaque configuration connue, les problèmes affichés après ouverture par URL
  sont identiques à ceux de `vce check` sur un clone du même commit.
- **SC-003** : une ouverture de dépôt consomme au plus 3 requêtes à l'API GitHub (dépôt, arbre,
  branches), si bien que la limite anonyme (60 par heure) permet au moins 20 ouvertures par
  heure.

## Hypothèses

- Les dépôts de configuration sont publics sur GitHub.
- La feature 002 (édition, téléchargement ZIP, éditeur en ligne) est livrée avant, ou en même
  temps que, l'édition d'une configuration ouverte par URL. La lecture et la validation n'en
  dépendent pas.
- Le principe V est amendé (`docs/principes.md`) : l'interface peut lire une configuration
  publique sur GitHub à la demande explicite de l'utilisateur.

## Hors périmètre

- Dépôts privés et authentification GitHub (jeton).
- Création d'une branche, d'un commit ou d'une PR depuis l'éditeur.
- Autres hébergeurs (GitLab…) et URL de modèles publiés hors dépôt (ex. standards du Géoportail
  de l'Urbanisme, qui ont un autre format et n'autorisent pas les requêtes d'un autre site).
- `vce check <url>` en ligne de commande.
