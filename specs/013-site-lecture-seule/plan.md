# Plan : site en lecture seule d'un dépôt de configuration

**Feature** : `013-site-lecture-seule` | **Spec** : [spec.md](spec.md) | **Date** : 2026-10-27

## Résumé

`vce site` produit le site dans le dossier de sortie :
- une copie de l'interface livrée (`dist/ui`) ;
- un instantané `api/snapshot.json` ;
- une balise `<meta name="vce-mode" content="site">` dans `index.html`.

L'interface reconnaît ce mode. Elle lit alors l'instantané avec une source sans écriture, bloque
toute modification dans le store, masque les contrôles d'édition et affiche un bandeau.

## Vérification des principes

| Principe | Respect |
|---|---|
| I. Format validator | Oui. Rien n'est écrit dans la configuration. |
| II. Aucune perte silencieuse | Oui. Le site ne modifie rien ; `vce site` refuse d'écraser un dossier inconnu (`--force`). |
| III. Cœur pur | Oui. `vce site` réutilise `snapshot` (CLI) ; aucune logique métier nouvelle. |
| IV. Tests d'abord | Oui. Tests CLI ; e2e sur un site produit et servi statiquement. |
| V. Local et hors ligne | Oui. Le site n'a aucune ressource distante. |
| VI. Dépendances minimales | Oui. Aucune dépendance. |
| VII. Français | Oui. |

## Décisions

- **R1 – Commande** (`src/cli/site.ts`) :

  ```
  vce site <dossier> <sortie> [--title <titre>] [--force]
  ```

  - **Validation** : la configuration est validée comme par `vce check`, et le résumé est
    affiché. Les erreurs ne bloquent pas, puisque le site les montre (US3, scénario 2).
  - **Sortie** :
    - elle est vidée puis remplie ;
    - elle doit être absente, vide, ou contenir `.vce-site`, sauf avec `--force` ;
    - `.vce-site` contient la version de l'éditeur.
  - **Fichiers écrits** :
    - copie de `dist/ui` ;
    - `api/snapshot.json`, avec `{ root: <titre ou nom du dossier>, files, version }` ;
    - `.nojekyll`, pour que GitHub Pages serve les fichiers tels quels.
  - **Marque du mode** : `index.html` reçoit `<meta name="vce-mode" content="site">`.
  - **Codes de sortie** : 0, ou 2 pour un dossier inexistant, sans modèle, une sortie refusée
    ou une interface absente.

- **R2 – Source** (`src/ui/io/site.ts`) : `SiteSource` (`kind: 'site'`) lit
  `api/snapshot.json` (chemin relatif, donc valable sous un sous-chemin) et n'a pas de `save`.
  `App.vue` la choisit si la balise `vce-mode` vaut `site`.

- **R3 – Lecture seule** :
  - **Store** : `readOnly` est vrai pour une source `site`. `edit`, `applyChanges`, `applyFix`,
    `fixAll`, `undo`, `redo` et `save` n'ont alors aucun effet. C'est la garantie de FR-003,
    quel que soit le contrôle affiché.
  - **Interface** : `<v-defaults-provider>` met les champs en `readonly` (`VTextField`,
    `VTextarea`, `VSelect`, `VCombobox`, `VCheckbox`). Les contrôles d'édition ont la classe
    `edit-control`, et ne sont pas rendus en lecture seule (`v-if="!store.readOnly"`). Sont
    concernés :
    - ajouter, supprimer, monter, descendre ;
    - créer, copier ou déclarer une liste ;
    - corrections ;
    - annuler, rétablir, enregistrer ;
    - onglet « Appliquer » des équivalents.
  - **Bandeau** : sous l'en-tête, « Lecture seule — pour modifier, ouvrir le dépôt avec
    `vce serve` ou l'éditeur en ligne », avec la version de l'éditeur.

- **R4 – Workflow** : `docs/utilisation.md`, section « Site en lecture seule ». Le workflow
  enchaîne `checkout`, `setup-node`, `npm ci`, `npx vce site config _site --title "…"`,
  `upload-pages-artifact` et `deploy-pages`.

## Structure du code

```
src/cli/site.ts, src/cli/main.ts (HELP)
src/ui/io/site.ts, src/ui/App.vue, src/ui/stores/project.ts
src/ui/components/*.vue                     contrôles d'édition masqués
tests/unit/cli/site.test.ts
tests/e2e/013-site.spec.ts                  site produit et servi statiquement
docs/utilisation.md
```

## Dérogations

Aucune.
