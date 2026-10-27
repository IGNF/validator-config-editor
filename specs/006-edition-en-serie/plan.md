# Plan : modification en série

**Feature** : `006-edition-en-serie` | **Spec** : [spec.md](spec.md) | **Date** : 2026-10-27

## Résumé

Un module pur `src/core/equivalents.ts` :
- trouve les éléments équivalents d'une colonne, d'un fichier attendu ou d'une déclaration de
  liste, par nom, dans la famille du modèle ou dans toute la configuration ;
- produit les changements qui recopient une propriété vers une sélection d'équivalents.

Une seule fenêtre, « Équivalents », ouverte depuis une colonne, un fichier ou une liste :
- un tableau de comparaison en lecture (US3) ;
- une partie « Appliquer » (US1, US2) : choix de la propriété, aperçu des valeurs actuelles,
  cases à cocher, application en une étape d'annulation.

## Vérification des principes

| Principe | Respect |
|---|---|
| I. Format validator | Oui. Seule la propriété choisie est écrite, dans le format existant. |
| II. Aucune perte silencieuse | Oui. Action explicite après aperçu ; les fichiers non conformes ne sont pas modifiés (FR-004) ; mise en forme d'origine conservée (SC-002). |
| III. Cœur pur | Oui. Équivalences et changements dans `src/core` ; la fenêtre ne fait qu'afficher et confirmer. |
| IV. Tests d'abord, données réelles | Oui. Fixtures (copies de `cnig_SUP_A1_2016` sous d'autres noms) ; SC-003 mesuré sur `VCE_CONFIG_DIR`. |
| V. Local | Oui. |
| VI. Dépendances minimales | Oui. |
| VII. Français | Oui. |

## Décisions

- **R1 – Tables équivalentes.** `baseTableName(modèle, table)` retire le premier segment du nom
  de table s'il est égal à un segment du nom du modèle :
  - `A1_ASSIETTE_SUP_S` dans `cnig_SUP_A1_2016` donne `ASSIETTE_SUP_S` ;
  - `ZONE_URBA` dans `cnig_PLU_2017` reste `ZONE_URBA`.

  Deux tables de modèles différents sont équivalentes si leurs noms de base sont égaux.

- **R2 – Portée.** Par défaut, la famille du modèle : `modelFamily`, feature 004, par exemple
  `cnig_SUP`. Sinon, toute la configuration. Le modèle source est exclu.

- **R3 – Équivalents** (`src/core/equivalents.ts`) :

  ```ts
  type Kind = 'column' | 'file' | 'code'
  interface Source { kind: Kind; file: string; pointer: string }   // ex. table, /columns/3
  interface Equivalent { model: string; file: string; pointer: string; data: unknown; editable: boolean }
  interface Equivalents { items: Equivalent[]; absent: string[] }   // absent : modèles de la portée sans équivalent
  function findEquivalents(session: Session, source: Source, scope: 'family' | 'all'): Equivalents
  ```

  - **Colonne** : colonne de même nom dans une table équivalente, cherchée dans les modèles de
    table de chaque modèle (`types/*.json`), même non conformes.
  - **Fichier attendu, déclaration de liste** : élément de même nom dans `files[]` ou `codes[]`
    de `files.json`.
  - **`data`** : donnée courante de l'élément, modifications de la session comprises.
  - **`editable`** : faux si le fichier n'est pas conforme à son schéma (FR-004, US1 scénario 3).
  - **Tri** : par nom de modèle.

- **R4 – Propriétés** (pointeurs relatifs à l'élément) :

  | Élément | Propriétés |
  |---|---|
  | colonne | `/type`, `/title`, `/description`, `/constraints/required`, `/constraints/presenceRequired`, `/constraints/unique`, `/constraints/minLength`, `/constraints/maxLength`, `/constraints/pattern`, `/constraints/enum`, `/constraints/reference` |
  | fichier attendu | `/type`, `/mandatory`, `/path`, `/title`, `/description`, `/tableModel` |
  | déclaration de liste | `/data`, `/title` |

  Ni `name` (critère d'équivalence) ni `id` (unique, feature 010) ne sont proposés. `parent`
  n'est jamais touché (FR-005).

- **R5 – Application.** `applyToEquivalents(source, cibles, propriété)` renvoie un `FileChange`
  JSON par fichier ciblé. Pour chaque cible, `setOrRemove` écrit la valeur de la source, ou
  retire la propriété si elle est absente de la source (US1 scénario 4).
  - **Cibles regroupées par fichier** : plusieurs colonnes d'un même fichier (cas d'une portée
    élargie) donnent un seul changement.
  - **Une seule étape** : la fenêtre passe ces changements à `applyChanges`, ce qui donne une
    étape d'historique, une revalidation et des fichiers marqués modifiés (FR-003).
  - **Cibles non modifiables** : ignorées même si elles sont passées.
  - **Mise en forme** : la sérialisation existante la conserve, d'où une ligne de `git diff`
    par fichier pour une valeur simple (SC-002).

- **R6 – Fenêtre « Équivalents »** (`EquivalentsDialog.vue`) :
  - **Ouverture** : depuis un bouton « Équivalents » sur chaque colonne (`TableView`), chaque
    fichier attendu et chaque déclaration de liste (`ModelView`). Le bouton n'apparaît que s'il
    existe au moins un équivalent dans toute la configuration.
  - **Portée** : un interrupteur « Toute la configuration », la famille par défaut.
  - **Comparaison** (US3) : une ligne par modèle (source en premier) et une colonne par
    propriété. Une valeur différente de celle de la source est mise en évidence, par du texte et
    pas seulement une couleur. Chaque ligne a un lien vers l'élément. Les modèles absents sont
    listés.
  - **Appliquer** (US1, US2) :
    - choix de la propriété, présélectionnée sur la dernière propriété modifiée de cet élément
      dans la session (clé de l'historique), sinon la première qui diffère ;
    - liste des cibles avec leur valeur actuelle : cochées par défaut, « déjà à jour » si la
      valeur est égale, « non modifiable » et décochées si le fichier n'est pas conforme ;
    - « Appliquer à N éléments ».

- **R7 – Performance** (SC-003). La recherche parcourt une fois les fichiers de la portée
  (150 modèles, environ 1 100 tables sur gpu) ; le calcul se fait à l'ouverture de la fenêtre,
  pas à chaque rendu.

## Structure du code

```
src/core/equivalents.ts            baseTableName, findEquivalents, applyToEquivalents (R1–R5)
src/ui/components/EquivalentsDialog.vue
src/ui/components/TableView.vue    bouton « Équivalents » par colonne
src/ui/components/ModelView.vue    bouton « Équivalents » par fichier et par liste
tests/unit/equivalents.test.ts
tests/e2e/006-equivalents.spec.ts
```

## Dérogations

Aucune.
