# Plan : variables d'affichage et conformité à l'import GpU

**Feature** : `010-variables-import-gpu` | **Spec** : [spec.md](spec.md) | **Date** : 2026-10-26

## Résumé

- **Variables.** Le chargement lit `variables.json` à la racine de la configuration (seul
  fichier de la racine retenu). Un module pur convertit une regex en forme à variables (et
  l'inverse). L'interface affiche les regex sous forme de variables, la regex au survol ; les
  champs de saisie gardent la regex pure.
- **Import GpU.** Quand `variables.json` est présent, la validation ajoute les règles de
  `JsonConfigReader` (GpU) : `id` présents et uniques par type d'objet dans toute la
  configuration, pas d'héritage, pas d'entrée orpheline dans `gpu.json`. `vce check` les
  applique de la même façon (même cœur).

## Vérification des principes

| Principe | Respect |
|---|---|
| I. Format validator | Oui. Rien n'est écrit en dehors du format : la saisie de `<NOM>` enregistre la regex pure. `variables.json` n'est pas modifié. |
| II. Aucune perte silencieuse | Oui. Un `variables.json` invalide est signalé, jamais réécrit. |
| III. Cœur pur | Oui. `src/core/variables.ts` et `src/core/validation/gpu-import.ts` sont purs et testés. |
| IV. Tests d'abord, données réelles | Oui. Tests sur les fixtures avec le `variables.json` réel de `validator-config-gpu` ; SC-001 mesuré sur `VCE_CONFIG_DIR`. |
| V. Local | Oui. |
| VI. Dépendances minimales | Oui. |
| VII. Français | Oui. |

## Décisions

- **R1 – Chargement.** `loadProject` retient `variables.json` à la racine (les autres fichiers de
  la racine restent ignorés) dans `Project.variables?: JsonFile`. Il fait partie des fichiers de
  la session, donc du ZIP, sans être modifiable.

- **R2 – Dictionnaire** (`src/core/variables.ts`) :

  ```ts
  type Variables = ReadonlyMap<string, string>                   // nom -> regex
  function readVariables(file: JsonFile): { variables?: Variables; problems: Problem[] }
  function toVariables(regex: string, variables: Variables): string   // la plus longue regex d'abord
  function fromVariables(text: string, variables: Variables): string  // <NOM> connu -> regex
  ```

  Problèmes (fichier `variables.json`, modèle `null`) :

  | Code | Sévérité | Cas |
  |---|---|---|
  | `ERR-VARIABLES-FORMAT` | erreur | JSON illisible, ou pas d'objet `variables` nom → texte |
  | `ERR-VARIABLES-DUPLICATE` | erreur | deux variables de même regex (affichage ambigu) |

  Un dictionnaire invalide n'est pas utilisé : les regex s'affichent telles quelles.

- **R3 – Configuration GpU** : `Project.variables` présent (même invalide). Le critère est
  recalculé à chaque validation.

- **R4 – Règles de l'import** (`src/core/validation/gpu-import.ts`, appelé par
  `validateProject` sur une configuration GpU) :

  | Code | Sévérité | Règle |
  |---|---|---|
  | `ERR-ID-DUPLICATE` (étendu) | erreur | même `id` pour deux objets de même type (modèle, fichier, liste, table, colonne) **dans deux modèles**, ou pour deux colonnes de deux tables. Les doublons d'un même modèle restent signalés par la règle existante, sans double signalement. |
  | `ERR-GPU-ID-MISSING` | erreur | objet sans `id` : modèle, fichier attendu, liste, table d'un fichier `table`, colonne. Correction « Attribuer un identifiant » (`newId`, annulable). |
  | `ERR-GPU-INHERITANCE` | erreur | `parent` dans `files.json` ; `parent_id` non nul ou `abstract: "t"` dans `gpu.json` |
  | `ERR-GPU-ORPHAN-ID` | erreur | remplace `WARN-GPU-ORPHAN-ID` sur une configuration GpU |

  Tables : comme l'import, celles des fichiers `table` (`types/<nom>.json`).

- **R5 – Affichage** (`RegexText.vue`) : texte à variables, regex pure en `title`. Utilisé pour
  le chemin des fichiers attendus (`ModelView`), le résumé des contraintes de colonne
  (`TableView`, « motif … ») et le nom du dossier. Sous chaque champ de saisie de regex, la forme
  à variables s'affiche en aide ; la valeur saisie passe par `fromVariables`.

- **R6 – Store** : `variables` (calculé depuis la session, `undefined` si absent ou invalide),
  exposé aux composants.

## Structure du code (ajouts et modifications)

```
src/core/variables.ts                  readVariables, toVariables, fromVariables
src/core/validation/gpu-import.ts      règles de l'import GpU (R4)
src/core/load/project.ts               variables.json à la racine (R1)
src/core/validation/validate.ts, refs.ts, messages.ts, fixes/catalog.ts
src/ui/components/RegexText.vue        affichage (R5)
src/ui/components/ModelView.vue, TableView.vue
tests/fixtures/variables.json          dictionnaire réel (copié dans la configuration de test)
tests/unit/variables.test.ts, tests/unit/validation/gpu-import.test.ts
tests/e2e/010-*.spec.ts
specs/001-validation-globale/contracts/problem-codes.md
```

## Dérogations

Aucune.
