# Spécification : modification en série

**Feature** : `006-edition-en-serie`

**Créée le** : 2026-10-16

**Statut** : brouillon

**Demande** : « Comment se passer de l'héritage ? » Décision : l'éditeur ne gère pas l'héritage
(cas propre au GpU, appelé à disparaître ; `validator-config-gpu` est déjà aplati), et permet
d'appliquer **une même modification aux éléments équivalents de plusieurs modèles**.

## Contexte

Dans `validator-config-gpu` (`json-source`), les modèles SUP sont déjà « aplatis » pour le
validator :

- les 123 modèles hérités reprennent tous les fichiers et toutes les listes de codes de leur
  parent ;
- leurs tables reprennent les colonnes des tables abstraites, avec les mêmes `id` (47 colonnes
  partagent leur `id` entre plus de 10 modèles, jusqu'à 65 modèles SUP 2016) ;
- des fichiers comme `ACTE`, `REGLEMENT` ou `Donnees_geographiques` se retrouvent à
  l'identique dans les 65 modèles SUP 2016.

L'héritage (objet `parent`, modèles `cnig_SUP_XXX_*`, `parent_id` de `gpu.json`) ne servait qu'au
Géoportail de l'Urbanisme. Le validator l'ignore, et l'éditeur ne le gère pas.

Sans héritage, corriger une colonne commune (motif d'`IDASS`, longueur de
`NOMGEST`…) obligerait à modifier un à un des dizaines de modèles. La modification en série le
fait en une fois, avec un aperçu et une seule étape d'annulation.

## Éléments équivalents

Deux éléments de modèles différents sont **équivalents** :

- **colonnes** : même `id` (colonne héritée d'une même table abstraite), ou à défaut même nom
  dans des **tables équivalentes** ;
- **tables équivalentes** : même nom, une fois retiré le préfixe propre au modèle (premier
  segment du nom de table égal à un segment du nom du modèle : `A1_ASSIETTE_SUP_S` dans
  `cnig_SUP_A1_2016` → `ASSIETTE_SUP_S`) ;
- **fichiers attendus** (`files[]`) et **déclarations de listes** (`codes[]`) : même nom.

Les équivalents sont cherchés dans les modèles de la **même famille** (feature 004 : `cnig_SUP`,
`cnig_PLU`…). L'utilisateur peut élargir la recherche à toute la configuration.

## Scénarios utilisateur et tests

### User Story 1 - Appliquer une modification de colonne aux colonnes équivalentes (Priorité : P1)

Après avoir modifié une propriété ou une contrainte d'une colonne, l'utilisateur demande à
l'appliquer aussi aux colonnes équivalentes des autres modèles. Seule la propriété modifiée est
recopiée : les autres propriétés de chaque colonne restent inchangées.

**Pourquoi cette priorité** : c'est le cas le plus fréquent (motifs, longueurs, valeurs
obligatoires des colonnes communes des SUP), et la raison d'être de l'héritage.

**Test indépendant** : dans `cnig_SUP_A1_2016`, changer `maxLength` de `NOMGEST` (table
`GESTIONNAIRE_SUP`), l'appliquer en série, constater la même valeur dans les autres modèles SUP
de la configuration, puis annuler en une fois.

**Scénarios d'acceptation** :

1. **Given** une colonne dont une propriété a été modifiée, **When** l'utilisateur choisit
   « Appliquer aux colonnes équivalentes », **Then** la liste des colonnes équivalentes
   s'affiche (modèle, table, valeur actuelle de la propriété), toutes cochées, en indiquant
   celles qui ont déjà la nouvelle valeur.
2. **Given** la liste, **When** l'utilisateur décoche des colonnes et confirme, **Then** seule
   la propriété modifiée est recopiée dans les colonnes cochées, en une seule étape annulable,
   et les problèmes sont recalculés.
3. **Given** une colonne équivalente dans un fichier non conforme à son schéma, **When** la
   liste s'affiche, **Then** elle y figure comme « non modifiable », décochée.
4. **Given** une propriété retirée (ex. motif vidé), **When** elle est appliquée en série,
   **Then** elle est retirée des colonnes cochées.

---

### User Story 2 - Fichiers attendus et listes de codes en série (Priorité : P2)

Même principe pour un fichier attendu de `files.json` (chemin, présence, description) et pour
une déclaration de liste de codes.

**Pourquoi cette priorité** : c'est moins fréquent que les colonnes, mais utile pour les
évolutions de standard (chemin d'un PDF, fichier devenu obligatoire).

**Test indépendant** : passer `REGLEMENT` de `cnig_SUP_A1_2016` en « Obligatoire », l'appliquer
en série aux modèles SUP, puis annuler.

**Scénarios d'acceptation** :

1. **Given** un fichier attendu modifié, **When** l'utilisateur l'applique en série, **Then** le
   même choix et le même résultat qu'en US1 s'appliquent aux fichiers de même nom des modèles
   de la famille.
2. **Given** une déclaration de liste modifiée, **When** elle est appliquée en série, **Then**
   les déclarations de même nom sont modifiées de la même façon.

---

### User Story 3 - Trouver les éléments équivalents (Priorité : P2)

Depuis une colonne, un fichier ou une liste, l'utilisateur affiche ses éléments équivalents et
compare leurs valeurs, sans rien modifier, pour repérer les divergences entre modèles.

**Pourquoi cette priorité** : c'est la lecture nécessaire avant une modification en série, et
elle sert à repérer des incohérences. Par exemple, dans `A1_ASSIETTE_SUP_S`, `MODEGEOASS` a son
propre `id`, ce qui la sépare des autres colonnes héritées.

**Test indépendant** : depuis `IDASS` de `A1_ASSIETTE_SUP_S`, afficher les équivalents et
constater le tableau des motifs par modèle.

**Scénarios d'acceptation** :

1. **Given** une colonne, **When** l'utilisateur affiche ses équivalents, **Then** un tableau
   donne pour chaque modèle la table, la colonne et ses propriétés principales (type, contraintes),
   avec un lien vers chacune.
2. **Given** ce tableau, **When** des valeurs diffèrent entre modèles, **Then** les différences
   sont mises en évidence.
3. **Given** une colonne équivalente par son nom mais d'un autre `id`, **When** elle est
   affichée, **Then** elle est signalée comme « même nom, autre identifiant ».

---

### Cas limites

- **Aucun équivalent** : l'action « Appliquer aux équivalents » est absente ou indique « aucun
  élément équivalent ».
- **Recherche élargie** : sur toute la configuration (gpu : 153 modèles), le calcul des
  équivalents reste sous 1 seconde.
- **Configurations sans `id`** (ppr) : seule l'équivalence par nom s'applique.
- **Surcharges GpU** : la modification en série ne change pas les `id`, et les surcharges de
  `gpu.json` restent donc rattachées.
- **Annulation** : une modification en série de N fichiers s'annule en une étape (feature 004,
  pas multi-fichiers).

## Exigences

### Exigences fonctionnelles

- **FR-001** : le cœur DOIT calculer les éléments équivalents d'une colonne, d'un fichier
  attendu ou d'une déclaration de liste selon les règles ci-dessus, dans la famille du modèle ou
  dans toute la configuration.
- **FR-002** : l'utilisateur DOIT pouvoir recopier une propriété (ou son absence) vers une
  sélection d'éléments équivalents, après un aperçu des valeurs actuelles.
- **FR-003** : une modification en série DOIT être une seule étape d'historique, revalidée, et
  marquer les fichiers modifiés (ZIP, enregistrement).
- **FR-004** : les éléments de fichiers non conformes à leur schéma NE DOIVENT pas être modifiés.
- **FR-005** : une clé `parent` éventuelle NE DOIT pas être modifiée (conservée telle quelle).
- **FR-006** : un tableau de comparaison des éléments équivalents DOIT être disponible en
  lecture.

### Entités clés

- **Élément équivalent** : modèle, fichier, pointeur, nature de l'équivalence (même `id`, même
  nom).
- **Modification en série** : propriété, nouvelle valeur ou retrait, éléments ciblés.

## Critères de succès

- **SC-001** : changer une contrainte d'une colonne commune aux 65 modèles SUP 2016 prend moins
  d'une minute, aperçu compris, contre 65 éditions avant.
- **SC-002** : `git diff` après une modification en série d'une valeur ne montre qu'une ligne par
  fichier modifié.
- **SC-003** : le calcul des équivalents et l'application en série sur `validator-config-gpu`
  prennent chacun moins d'1 seconde.

## Hypothèses

- L'éditeur ne gère pas l'héritage : une clé `parent` est conservée sans être vérifiée.
- Les règles d'équivalence couvrent les configurations connues. Les cas non couverts restent
  modifiables un par un.

## Hors périmètre

- Héritage (objet `parent`, modèles `cnig_SUP_XXX_*`, `parent_id`) : non géré.
- Ajout ou suppression en série de colonnes ou de fichiers attendus.
- **005-listes-codes** : édition des listes de codes CSV.
- **007-gpu** : édition de `gpu.json`.
