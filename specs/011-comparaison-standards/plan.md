# Plan : comparaison de standards

**Feature** : `011-comparaison-standards` | **Spec** : [spec.md](spec.md) | **Date** : 2026-10-27

## Résumé

Un module pur `src/core/compare.ts` compare deux modèles d'un résultat de validation
(`CheckResult`), par nom, sur les champs de FR-003, et calcule la version précédente d'un modèle.
L'interface affiche la comparaison dans une vue dédiée, ouverte depuis la vue du modèle, avec une
adresse `#/<modèle>/?compare=<référence>`. `vce compare` produit la même comparaison en texte ou
en JSON.

## Vérification des principes

| Principe | Respect |
|---|---|
| I. Format validator | Oui. La comparaison lit la session sans rien écrire. |
| II. Aucune perte silencieuse | Oui. Lecture seule (FR-005). |
| III. Cœur pur | Oui. `compare.ts` est pur ; la vue et la CLI ne font que l'afficher. |
| IV. Tests d'abord, données réelles | Oui. Tests sur les fixtures (deuxième version de `cnig_PLU_2017` construite en mémoire) ; SC-001 mesuré sur `VCE_CONFIG_DIR`. |
| V. Local | Oui. |
| VI. Dépendances minimales | Oui. Comparaison écrite à la main, sans bibliothèque de diff. |
| VII. Français | Oui. |

## Décisions

- **R1 – Entrée.** `compareModels(result, from, to)` lit dans `CheckResult` :
  - le document de chaque modèle (`checked.get(nom).document`) ;
  - ses tables conformes (`checked.tables`), rapprochées par `TableModel.name`, comme dans
    `StandardComparator` (GpU). Une table non conforme est absente de `checked.tables` : elle est
    listée dans `unreadable` (cas limite « fichier en erreur ») ;
  - ses listes de codes (`DocumentModel.codes`, par `name`), dont le contenu est lu dans
    `model.csvs` via `resolvePath(modèle, data)`. Une liste illisible va aussi dans
    `unreadable`.

  La session courante est comparée, modifications non enregistrées comprises.

- **R2 – Résultat** (contrat [contracts/compare.md](contracts/compare.md)) :

  ```ts
  type Value = string | number | boolean | null
  interface Change { field: string; old?: Value; new?: Value; removed?: string[]; added?: string[] }
  interface Changed { name: string; changes: Change[] }
  interface Section { added: string[]; removed: string[]; changed: Changed[] }
  interface TableChanged extends Changed { columns: Section }
  interface RowChange { key: string; changes: Change[] }
  interface CodeListContent { name: string; columns: { added: string[]; removed: string[] }; rows: { added: string[]; removed: string[]; changed: RowChange[] } }
  interface Comparison {
    from: string; to: string
    document: Change[]
    files: Section
    tables: { added: string[]; removed: string[]; changed: TableChanged[] }
    codes: { added: string[]; removed: string[]; content: CodeListContent[] }
    unreadable: string[]   // chemins
    total: number
  }
  ```

  - Les valeurs restent brutes. L'interface les met en forme (booléens « Oui / Non », regex avec
    variables) et la CLI les affiche en texte.
  - Champ absent : `null`.
  - Les listes (`enum`, `conditions`, `foreignKeys`) donnent `removed` et `added`, sans tenir
    compte de l'ordre.
  - Les noms sont triés. Une table modifiée l'est si un champ ou une colonne change.
  - `total` compte les éléments ajoutés, retirés et modifiés (dossier, fichiers, tables,
    colonnes, listes, lignes).

- **R3 – Champs comparés** (FR-003) :

  | Objet | Champs |
  |---|---|
  | dossier | `constraints.folderName`, `constraints.metadataSpecification` |
  | fichier attendu | `type`, `mandatory` (absent : `WARN`, comme l'interface), `path`, `tableModel` |
  | table | `constraints.conditions`, `constraints.foreignKeys` |
  | colonne | `description`, `type`, `constraints.minLength`, `maxLength`, `required`, `presenceRequired`, `unique`, `enum`, `pattern` |

  Ni `id`, ni `title`, ni l'ordre ne sont comparés. `maxLength` vaut -1 quand il n'y a pas de
  limite : la valeur reste brute, et l'interface l'affiche « sans limite ».

- **R4 – Version précédente.** `previousVersion(nom, noms)` : même nom sans le suffixe `_AAAA`,
  année la plus grande strictement inférieure ; `undefined` sans suffixe d'année ou sans version
  antérieure. Le modèle lui-même n'est jamais proposé.

- **R5 – Lignes des listes de codes** (US2) :
  - **Clé de rapprochement** : les colonnes cibles (`targetColumns`) de la première clé
    étrangère qui vise la liste, dans le modèle comparé puis dans la référence. Clés analysées
    avec `parseForeignKey`.
  - **Sans clé étrangère** : la première colonne.
  - **Clé de ligne** : les valeurs de la clé jointes par « , ».
  - **Résultat** : une ligne de même clé dont une autre colonne change est « modifiée », avec la
    liste des cellules changées. Les autres lignes sont ajoutées ou retirées.
  - **Clés en double** dans l'une des listes : rapprochement par ligne entière, et aucune ligne
    n'est « modifiée ».
  - **Colonnes** : les colonnes ajoutées ou retirées sont listées ; les lignes sont comparées
    sur les colonnes communes.
  - **Contenu identique** : la liste n'est pas signalée, même si les chemins `data` diffèrent
    (US2, scénario 3).

- **R6 – Adresse.** `Route` gagne `compare?: string`, le paramètre `compare` de la requête :
  `#/cnig_PLU_2024/?compare=cnig_PLU_2022`.
  - Une route de dossier avec `compare` ouvre la vue de comparaison.
  - `compare=` vide demande à l'utilisateur de choisir la référence.
  - `href` et `go` acceptent ce paramètre.

- **R7 – Vue** (`CompareView.vue`) :
  - **Bouton « Comparer »** : il est placé dans l'en-tête de `ModelView` et ouvre la vue avec
    `previousVersion` (scénario 1).
  - **En-tête** : deux listes (référence, modèle comparé, tous les modèles sauf l'autre côté),
    un bouton « Inverser » et le total.
  - **Sections dans l'ordre de la spec** : dossier, fichiers, tables (colonnes repliables),
    listes, contenu des listes.
  - **Éléments** : badges « ajouté », « retiré », « modifié », avec un texte et pas seulement
    une couleur.
  - **Valeurs** : ancienne et nouvelle valeur côte à côte. Les regex passent par `RegexText`
    avec le modèle de chaque côté (alias de famille).
  - **Liens** : vers l'élément du modèle comparé (`href(fichier, pointeur)`), ou de la
    référence s'il a été retiré.
  - **Sans différence** : « Aucune différence ».
  - **Accessibilité** : axe sans violation, comme les autres vues.

- **R8 – CLI.** `vce compare <référence> <modèle> [--format text|json]` :
  - **Chargement** : les deux arguments sont des dossiers de modèle. Le dossier parent de
    chacun est chargé avec le même chargeur que `check`, une seule fois s'ils ont le même
    parent ; une seule validation, puis `compareModels`.
  - **Sortie texte** : une section par type d'objet, `+`, `-`, `~`, puis un total.
  - **Codes de sortie** : 0, ou 2 pour un usage incorrect ou un dossier sans `files.json`.
  - **`HELP`** : il est complété.

- **R9 – Performance** (SC-002). La comparaison est un `computed` de la vue, recalculé quand la
  session change. Sur les plus gros modèles (environ 60 fichiers, 20 tables, 40 listes), le coût
  est linéaire.

## Structure du code

```
src/core/compare.ts            compareModels, previousVersion (R1–R5)
src/ui/router.ts               Route.compare (R6)
src/ui/components/CompareView.vue
src/ui/components/ModelView.vue   bouton « Comparer »
src/ui/App.vue                 vue de comparaison sur une route de dossier avec compare
src/cli/compare.ts             vce compare (R8) ; main.ts, HELP
specs/011-comparaison-standards/contracts/compare.md
tests/unit/compare.test.ts
tests/unit/cli/compare.test.ts
tests/e2e/011-us1-comparaison.spec.ts
```

## Dérogations

Aucune.
