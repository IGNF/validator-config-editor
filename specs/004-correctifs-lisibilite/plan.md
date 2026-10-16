# Plan : correctifs proposés et lisibilité de l'interface

**Feature** : `004-correctifs-lisibilite` | **Spec** : [spec.md](spec.md) | **Date** : 2026-10-16

## Résumé

- **Correctifs.** Le cœur calcule, pour un problème et l'état de la session, des corrections pures
  (`Fix`). Une correction est un ensemble de modifications de fichiers. La session les applique
  en un seul pas d'historique. Elle gère désormais aussi des textes (ligne CSV) et des fichiers
  créés (liste de codes copiée).
- **Lisibilité.** Titres, conseils et localisation en clair viennent du cœur ; familles de modèles
  et libellés métier sont calculés par des fonctions pures. L'interface (panneau, arbre, vues) les
  affiche.

## Vérification des principes

| Principe | Respect |
|---|---|
| I. Format validator | Oui. Les corrections ne produisent que des fichiers du format existant. |
| II. Aucune perte silencieuse | Oui. Une correction est une action explicite, décrite, annulable. Aucun fichier n'est supprimé, et une création est refusée si le fichier existe. |
| III. Cœur pur | Oui. `src/core/fixes/` et `src/core/labels.ts` sont des fonctions pures et testées. |
| IV. Tests d'abord, données réelles | Oui. Un test par correction ; SC-001 mesuré sur `VCE_CONFIG_DIR` (gpu) : appliquer une correction par problème laisse 0 erreur. |
| V. Local | Oui. |
| VI. Dépendances minimales | Oui. Distance d'édition (Levenshtein) écrite en interne, une vingtaine de lignes. |
| VII. Français | Oui. |

## Décisions

- **R1 – Modèle de correction** (`src/core/fixes/types.ts`) :

  ```ts
  type FileChange =
    | { path: string; kind: 'json'; update: (data: unknown) => unknown }
    | { path: string; kind: 'text'; text: string; create?: boolean }
  interface Fix { label: string; changes: FileChange[]; safe: boolean }   // safe : correction groupable (US2)
  fixesFor(session: Session, problem: Problem): Fix[]
  ```

  Une correction est recalculée sur l'état courant à chaque affichage (cas limite « corrections
  concurrentes »).

- **R2 – Session étendue** (`src/core/edit/session.ts`).
  - Un pas d'historique devient `{ changes: { path, before, after }[], key?, at }`, où `before`
    et `after` sont des données JSON ou des textes. L'édition simple (002) produit un pas d'une
    seule modification ; une correction groupée, un pas à plusieurs modifications.
  - Les textes modifiés (CSV) et les fichiers créés sont suivis à côté des données JSON. Une
    annulation de création retire le fichier.
  - `withText(project, path, text)` relit le CSV, met à jour la liste du modèle et recalcule
    les problèmes de lecture de ce fichier. `checkLoaded` reçoit les problèmes de lecture
    recalculés.
  - `changedFiles`, `allFiles` (ZIP) et `textOf` incluent textes et créations.

- **R3 – Création sur disque** (`PUT /api/file` étendu, contrat
  [source-et-ecriture](../002-edition-en-ligne/contracts/source-et-ecriture.md)).
  - `If-None-Match: *` crée le fichier, seulement s'il n'existe pas, et seulement sous
    `<modèle>/codes/` ou `<modèle>/types/` d'un modèle existant. Le sous-dossier est créé s'il
    manque.
  - `ServerSource.save` envoie `If-None-Match` pour un fichier créé.

- **R4 – Catalogue des corrections** (`src/core/fixes/catalog.ts`) : une fonction par code.

  | Code | Correction | `safe` |
  |---|---|---|
  | `WARN-MODEL-NAME` | `/name` ← nom du dossier | oui |
  | `ERR-ID-DUPLICATE` | nouvel `id` (`newId`, ensemble des `id` de la configuration) au pointeur du problème | oui |
  | `WARN-GPU-ORPHAN-ID` | retrait de l'entrée `/section/id` de `gpu.json` | oui |
  | `WARN-UNREFERENCED-FILE`, CSV | `addCode` (nom = nom du fichier) | oui |
  | `WARN-UNREFERENCED-FILE`, table | `addFile(type table, tableModel, nom)`, chemin vide (signalé en clair dans le libellé) | non |
  | `ERR-FK-TARGET-LIST` | CSV présent : `addCode`. Sinon, copie depuis le premier modèle (ordre alphabétique) qui déclare cette liste avec un CSV lisible : création de `codes/<nom>.csv` et `addCode`. Plus 3 noms déclarés proches. | si une seule option |
  | `ERR-FK-SOURCE-COLUMN` / `ERR-FK-TARGET-COLUMN` | réécriture de la clé avec la colonne proche (colonnes de la table ou en-tête du CSV) | non |
  | `ERR-REFERENCE-TARGET` | `TABLE.COLONNE` proches | non |
  | `ERR-TABLE-MODEL-MISSING` / `ERR-CODE-DATA-MISSING` | chemins `./types/…` / `./codes/…` proches du modèle | non |
  | `ERR-PARENT-MISSING` | noms de modèles proches | non |
  | `ERR-CSV-ROW-LENGTH` (trop de valeurs, ligne sans guillemets) | pour chaque colonne où regrouper `extra + 1` valeurs donne un texte non numérique : la ligne réécrite avec cette valeur entre guillemets (aperçu dans le libellé) | si une seule colonne candidate |

- **R5 – Noms proches** (`src/core/fixes/similar.ts`). Distance de Levenshtein insensible à la
  casse ; on garde les candidats à distance ≤ max(1, ⌊longueur/3⌋), 3 au plus, triés par
  distance puis par nom.

- **R6 – Lecteur CSV.** `parseCsv` signale **chaque** ligne de longueur incorrecte (au lieu de la
  première) : les corrections portent ligne par ligne. Le contrat `problem-codes` (001) est
  inchangé : un problème par ligne.

- **R7 – Textes en clair** (`src/core/validation/messages.ts`). Chaque code reçoit un `title`
  (ex. « Liste de codes non déclarée ») et un `hint` (que faire), en plus du `message`.

- **R8 – Localisation lisible** (`src/core/validation/location.ts`).
  `describeLocation(project, problem)` donne un fichier (« Table ZONE_URBA ») et un élément
  (« Colonne TYPEZONE · référence », « Fichier ZONE_URBA · modèle de table », « Clé étrangère 2 »,
  « Ligne 39 », « Surcharge de la colonne ZONE_URBA.TYPEZONE »), à partir du pointeur, de la
  donnée et de `indexObjects`.

- **R9 – Libellés et familles** (`src/core/labels.ts`) :
  - `mandatoryLabel`, `fileTypeLabel`, `columnTypeFamily` (texte, nombre, booléen, date,
    géométrie, fichier ou lien) ;
  - `modelFamily(name)` : les deux premiers segments du nom (`cnig_PLU_2017` → `cnig_PLU`,
    `cnig_SUP_A1_2016` → `cnig_SUP`, `GPU_MEC_2025` → `GPU_MEC`, `Canalisations` →
    `Canalisations`). Une famille d'un seul modèle n'est pas regroupée.

- **R10 – Interface.**
  - `ProblemsPanel` : groupes par fichier en `v-expansion-panels`, ligne de problème (icône de
    sévérité et libellé, titre, localisation, message, code en `text-caption`), menu
    « Corriger » (`v-menu`), et « Corriger les N » quand le filtre de code est actif et que
    chaque problème a une seule correction `safe`.
  - `ModelTree` : familles en groupes, icônes `@mdi/js` par nature d'élément.
  - `ModelView` : carte de synthèse. Vues : badge de problèmes par élément (`problemsUnder`).

## Structure du code (ajouts)

```
src/core/fixes/{types,catalog,similar}.ts
src/core/validation/location.ts
src/core/labels.ts
src/core/edit/{history,session}.ts   (pas multi-fichiers, textes, créations)
src/core/load/csv.ts                 (toutes les lignes en erreur)
src/cli/server.ts                    (création, If-None-Match)
src/ui/components/ProblemsPanel.vue, ProblemItem.vue, FixMenu.vue, ModelTree.vue, ModelSummary.vue, ProblemBadge.vue
```

## Dérogations

Aucune.
