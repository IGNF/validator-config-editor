# Tâches : ouvrir la configuration d'un dépôt GitHub

**Spec** : [spec.md](spec.md) | **Plan** : [plan.md](plan.md) | **Issue parente** : #27

## Phase 1 : US1, ouvrir un dépôt par son URL — branche `003-ouverture-depot/us1` (#23)

- [x] T001 [P] Tests `parseRepoUrl`, `splitRef`, `selectRepoRoot` (formes d'URL, branche avec « / », `config/`, dossier demandé, dossiers cachés)
- [x] T002 [P] Tests `GitHubSource` avec `fetch` simulé : branche par défaut (3 requêtes), branche donnée (2), lecture au commit, progression, erreurs (404 dépôt, 404 branche, limite de requêtes avec heure, arbre tronqué, réseau)
- [x] T003 [US1] `src/core/github.ts`, `src/ui/io/github.ts`
- [x] T004 [US1] CSP `connect-src` (serveur et build `pages`) ; `RepoDialog` (URL), affichage de la source, progression ; ZIP nommé d'après le dépôt
- [x] T005 [US1] Support e2e `github-mock` (`page.route`) ; e2e : ouverture, `config/`, sous-dossier, erreurs, édition et ZIP, aucune autre origine que GitHub

## Phase 2 : US2, choisir une branche — branche `003-ouverture-depot/us2` (#24)

- [x] T006 [US2] Liste des branches (une requête, à la demande), menu de branches dans la barre, confirmation s'il y a des modifications, branche inexistante → message et branche par défaut proposée ; e2e

## Phase 3 : US3, configurations connues — branche `003-ouverture-depot/us3` (#25)

- [x] T007 [US3] `KNOWN_CONFIGS` sur l'accueil et dans `RepoDialog` ; e2e

## Phase 4 : US4, lien partageable — branche `003-ouverture-depot/us4` (#26)

- [x] T008 [US4] Paramètres `depot`, `branche`, `dossier` lus au démarrage et écrits à l'ouverture (`history.replaceState`) ; confirmation s'il y a des modifications ; e2e (rechargement de la page sur la même vue)
- [x] T009 [US4] README : éditeur en ligne et liens vers les configurations connues ; CHANGELOG
