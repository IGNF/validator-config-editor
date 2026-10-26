# Plan : créer et copier des listes de codes

**Feature** : `005-listes-codes` | **Spec** : [spec.md](spec.md) | **Date** : 2026-10-26

## Résumé

Le cœur calcule, pour une copie ou une création, un ensemble de modifications de fichiers
(`FileChange[]`) : un CSV créé et une déclaration ajoutée à `files.json`. La session les applique
en un seul pas, comme les corrections de la feature 004, qui savent déjà créer un fichier.
L'interface ajoute une fenêtre « Nouvelle liste » et « Copier une liste existante » à la vue du
modèle.

## Vérification des principes

| Principe | Respect |
|---|---|
| I. Format validator | Oui. Un CSV dans `codes/` et une entrée `codes[]` (`data`, `id`, `name`, `title`), comme les listes existantes. |
| II. Aucune perte silencieuse | Oui. Création refusée si le nom ou le fichier existe ; un seul pas annulable ; `vce serve` refuse d'écraser un fichier (412, feature 004). |
| III. Cœur pur | Oui. `src/core/edit/codelists.ts` est pur et testé. |
| IV. Tests d'abord, données réelles | Oui. Tests sur les fixtures (`cnig_PLU_2017` → `GPU_MEC_2025`). |
| V. Local | Oui. |
| VI. Dépendances minimales | Oui. |
| VII. Français | Oui. |

## Décisions

- **R1 – Fonctions du cœur** (`src/core/edit/codelists.ts`) :

  ```ts
  interface CodeListRef { model: string; name: string; path: string; title?: string; columns: string[]; rows: number }
  function codeLists(session: Session): CodeListRef[]        // listes CSV déclarées et lisibles, par modèle puis nom
  function checkNewName(session: Session, model: string, name: string): string | undefined   // message de refus
  function copyCodeList(session: Session, from: CodeListRef, model: string, name: string): FileChange[]
  function createCodeList(session: Session, model: string, name: string, columns: string[]): FileChange[]
  ```

  - `checkNewName` refuse : nom vide ou hors `[A-Za-z0-9_.-]`, nom déjà déclaré dans `codes[]`
    du modèle, fichier `<modèle>/codes/<nom>.csv` présent (origine ou session). Dans ce dernier
    cas, le message renvoie vers « Déclarer une liste ».
  - Les colonnes d'une création : non vides, sans virgule ni guillemet, sans doublon.

- **R2 – Contenu copié** : le texte courant de la liste d'origine (`textOf`), BOM et fins de ligne
  compris. Les listes des configurations connues sont en UTF-8 ou ASCII (gpu : 664 et 510) ; le
  texte réencodé en UTF-8 reproduit donc leurs octets (FR-002). Une liste créée contient
  `<colonnes séparées par des virgules>\n`.

- **R3 – Déclaration** : `addCode` reçoit un `title` facultatif. La copie reprend le `title` de la
  déclaration d'origine ; la création utilise le nom. Un nouvel `id` est attribué si le modèle en
  utilise (`newId` sur `allIds`), comme pour la correction de `ERR-FK-TARGET-LIST`.

- **R4 – Application** : le store expose `applyChanges(changes)` (déjà utilisé par `applyFix`),
  un pas d'historique revalidé. Après l'application, l'interface ouvre la nouvelle liste.

- **R5 – Enregistrement** : rien à ajouter. `changedFiles` inclut les créations, le ZIP aussi,
  et `PUT /api/file` sait créer un fichier dans `codes/` d'un modèle existant
  (`If-None-Match: *`, 412 s'il existe).

- **R6 – Interface** (`CodeListDialog.vue` pour la copie, `NewCodeListDialog.vue` pour la création) :
  - deux boutons dans la section « Listes de codes » de `ModelView`, à côté de « Déclarer une
    liste » : « Nouvelle liste » (`new-code-list`) et « Copier une liste existante »
    (`copy-code-list`) ;
  - copie : filtre par nom, liste groupée par modèle (1 174 listes sur gpu : `v-virtual-scroll`),
    aperçu (colonnes, nombre de valeurs), champ « Nom » prérempli (`<nom>` ou `<nom>_COPIE`
    dans le même modèle), message de refus de `checkNewName` sous le champ ;
  - création : champs « Nom » et « Colonnes » (séparées par des virgules).

## Structure du code (ajouts et modifications)

```
src/core/edit/codelists.ts          codeLists, checkNewName, copyCodeList, createCodeList
src/core/edit/operations.ts         addCode(…, title?)
src/ui/stores/project.ts            applyChanges(changes)
src/ui/components/CodeListDialog.vue
src/ui/components/ModelView.vue     boutons
tests/unit/edit/codelists.test.ts
tests/e2e/pages/005-us1-copy.spec.ts, tests/e2e/005-serve.spec.ts, tests/e2e/pages/005-us2-create.spec.ts
```

## Dérogations

Aucune.
