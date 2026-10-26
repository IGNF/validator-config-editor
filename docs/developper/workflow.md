# Workflow de développement

Le projet suit un développement piloté par les specs. Aucun code applicatif n'est écrit sans
spec approuvée.

## Une feature = un dossier `specs/NNN-nom/`

| Fichier | Contenu |
|---|---|
| `spec.md` | User stories priorisées (P1, P2…), scénarios Given/When/Then, test indépendant, exigences `FR-xxx`, critères de succès `SC-xxx`, hors périmètre |
| `plan.md` | Contexte technique, vérification des [principes](../principes.md), décisions (R1, R2…), structure du code, dérogations justifiées |
| `tasks.md` | Tâches `T001…`, regroupées par phase (une phase = une issue = une PR). `[P]` : parallélisable, `[USk]` : user story. Les tâches de test précèdent les tâches de code. |
| `contracts/*.md` | Contrats stables : codes de problème, interface de la CLI, API du serveur local |

## Étapes et traçabilité spec → issue → PR

1. **Spec** : branche `NNN-nom/spec`, PR `[NNN] Spec : <titre>`. La spec est relue et
   mergée avant toute suite.
2. **Plan et tâches** : branche `NNN-nom/plan`, PR `[NNN] Plan et tâches : <titre>`.
3. **Issues** (`gh issue create`) :
   - une issue parente `[NNN] <titre de la spec>`, avec le lien vers `spec.md` et la liste des
     issues de user story ;
   - une issue par user story `[NNN/USk] <titre>` : priorité, test indépendant, scénarios
     d'acceptation en cases à cocher, FR couvertes.
4. **Implémentation** : une branche et une PR par issue.
   - `NNN-nom/socle` pour le socle technique éventuel ;
   - `NNN-nom/usk` pour chaque user story, avec `Closes #<issue>` dans la description.
5. Toute modification de la spec après création des issues est répercutée dans les issues
   concernées.

## Commits

Le sujet est préfixé par la feature et l'étape : `[001] Spec : …`, `[001/socle] …`,
`[001/US2] …`. Le corps est une liste à puces, puis `Refs #<issue>`.

## Conditions de merge

Une PR est mergeable seulement si :

- la CI passe (génération des validateurs à jour, typecheck, lint, tests unitaires avec
  couverture, tests de bout en bout, build) ;
- les scénarios d'acceptation de l'issue sont cochés ;
- les principes sont respectés, ou la dérogation est justifiée dans le plan.

## Versions

Le projet suit [Semantic Versioning](https://semver.org/lang/fr/). Chaque version est un tag
git `vX.Y.Z`, référencé par les dépôts de configuration
(`github:IGNF/validator-config-editor#vX.Y.Z`). Les changements sont résumés dans
[CHANGELOG.md](../../CHANGELOG.md).

Publier une version :

1. PR qui incrémente `version` dans `package.json` et complète le CHANGELOG ;
2. après merge, lancer le workflow **Release** (Actions → Release → Run workflow) ;
3. le workflow teste et construit `main`, crée un commit détaché contenant `dist/`, pose le tag
   `vX.Y.Z` sur ce commit et crée la release GitHub. `main` ne contient jamais `dist/`.
