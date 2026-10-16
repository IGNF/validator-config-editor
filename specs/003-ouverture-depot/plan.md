# Plan : ouvrir la configuration d'un dépôt GitHub

**Feature** : `003-ouverture-depot` | **Spec** : [spec.md](spec.md) | **Date** : 2026-10-16

## Résumé

L'interface reçoit une troisième source de configuration, `GitHubSource`, sur le contrat
`ConfigSource` de la feature 002. Elle lit l'arbre d'un dépôt public (API GitHub), retient le
dossier de configuration, puis lit les fichiers sur `raw.githubusercontent.com` au commit de
l'arbre. L'édition, la validation, les corrections et le téléchargement ZIP sont ceux des
features 002 et 004. Le dépôt n'est jamais modifié.

## Vérification des principes

| Principe | Respect |
|---|---|
| I à IV | Oui. Les fonctions pures (analyse d'URL, choix de la branche et du dossier) sont dans `src/core/github.ts` et testées ; `GitHubSource` est testée avec un `fetch` simulé. |
| V. Local et hors ligne | Exception prévue par l'amendement de la spec 003 : GitHub n'est contacté que sur action de l'utilisateur ou par un lien de dépôt, en lecture, sans jeton. CSP `connect-src 'self' https://api.github.com https://raw.githubusercontent.com`. |
| VI. Dépendances minimales | Oui. `fetch` uniquement. |
| VII. Français | Oui. |

## Décisions

- **R1 – Requêtes.** Au plus 3 à l'API, conformément à SC-003 :
  1. `GET /repos/{o}/{r}` pour la branche par défaut, seulement si l'URL n'en donne pas ;
  2. `GET /repos/{o}/{r}/branches/{branche}`, qui donne le commit et l'arbre ;
  3. `GET /repos/{o}/{r}/git/trees/{arbre}?recursive=1`, qui liste les fichiers.

  Les contenus viennent de `https://raw.githubusercontent.com/{o}/{r}/{commit}/{chemin}`, au
  commit et non à la branche, avec 16 lectures en parallèle et la progression affichée. La
  liste des branches (`GET /repos/{o}/{r}/branches?per_page=100`) n'est demandée qu'à
  l'ouverture du sélecteur de branche (US2), ou pour une URL dont la branche contient « / ».

- **R2 – Analyse d'URL** (`parseRepoUrl`). Formes acceptées :
  - `https://github.com/<org>/<dépôt>`, avec ou sans `.git` ni `/` final ;
  - `…/tree/<reste>` ;
  - `<org>/<dépôt>`.

  `<reste>` est découpé en branche et dossier par `splitRef(reste, branches)` : on retient le
  plus long préfixe qui est une branche existante. Sans liste de branches, le premier segment
  est la branche.

- **R3 – Dossier de configuration** (`selectRepoRoot`), même règle que `selectFolder` (002) :
  - le dossier demandé dans l'URL s'il y en a un ;
  - sinon `config/` s'il contient un modèle ;
  - sinon la racine.

  On garde les `*.json` et `*.csv` sous ce dossier, hors dossiers cachés. Un arbre `truncated`
  donne une erreur explicite.

- **R4 – Erreurs** (`GitHubError`, messages en français) :

  | Cas | Message |
  |---|---|
  | URL invalide | indique les formes acceptées |
  | 404 | « dépôt introuvable ou privé », ou « branche introuvable » (avec la branche par défaut proposée) |
  | 403 ou 429 avec `X-RateLimit-Remaining: 0` | « limite de requêtes GitHub atteinte, réessayer après HH:MM » (`X-RateLimit-Reset`) |
  | Arbre tronqué | message dédié |
  | Erreur réseau | message dédié |

  Dans tous les cas, la configuration courante est conservée (le store garde l'ancienne session
  en cas d'échec).

- **R5 – Adresse partageable.** `?depot=<org>/<dépôt>&branche=<b>&dossier=<d>`, suivi du
  fragment de sélection existant.
  - Au démarrage, si `depot` est présent, l'application ouvre ce dépôt, dans les deux modes
    (`pages` et `serve`).
  - À l'ouverture d'un dépôt, l'adresse est mise à jour par `history.replaceState`, sans
    recharger la page.

- **R6 – Configurations connues** (`KNOWN_CONFIGS` dans `src/core/github.ts`) :
  - gpu, branche `json-source` ;
  - dgpr, naviforest et ppr, branche par défaut.

  Elles sont affichées sur l'accueil et dans la fenêtre « Ouvrir un dépôt ».

- **R7 – Interface.**
  - Accueil (`pages`) et barre (les deux modes) : « Ouvrir un dépôt GitHub », une fenêtre avec
    l'URL et les configurations connues.
  - Barre : la source s'affiche « org/dépôt · branche · commit court », avec un lien vers le
    dépôt, et un menu de branches (US2).
  - Une progression s'affiche pendant la lecture. Le ZIP est nommé d'après le dépôt.

- **R8 – Tests sans réseau.**
  - Unitaires : fonctions pures, et `GitHubSource` avec un `fetch` injecté qui sert les fixtures
    sous la forme d'un faux dépôt.
  - e2e : `page.route` sur `api.github.com` et `raw.githubusercontent.com`.
  - Facultatif : un test réel sur dgpr si `VCE_GITHUB_REAL=1`.

## Structure du code (ajouts)

```
src/core/github.ts            parseRepoUrl, splitRef, selectRepoRoot, KNOWN_CONFIGS, types
src/ui/io/github.ts           GitHubSource (fetch injectable), GitHubError
src/ui/components/RepoDialog.vue, SourceChip.vue (source et branches)
src/ui/router.ts              paramètres depot, branche, dossier
src/cli/server.ts, vite.config.ts   CSP connect-src
tests/unit/github.test.ts, tests/unit/ui/github-source.test.ts
tests/e2e/003-*.spec.ts, tests/e2e/support/github-mock.ts
```

## Dérogations

L'exception au principe V est déjà prévue et justifiée par l'amendement de `docs/principes.md`
(spec 003).
