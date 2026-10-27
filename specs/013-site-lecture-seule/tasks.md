# Tâches : site en lecture seule d'un dépôt de configuration

**Spec** : [spec.md](spec.md) | **Plan** : [plan.md](plan.md) | **Issue parente** : #95

Une phase correspond à une branche et une PR ciblant `main`. Les tests précèdent le code.

## Phase 1 : US1 et US2, construire et consulter le site — branche `013-site-lecture-seule/us1`

Livrées ensemble : un site qui permettrait d'éditer sans enregistrer serait trompeur.

- [ ] T001 [P] Tests CLI `vce site` : fichiers produits (interface, `api/snapshot.json`, balise, `.vce-site`, `.nojekyll`), `--title`, sortie refusée sans `--force`, dossier inexistant ou sans modèle → code 2, HELP
- [ ] T002 [P] e2e : site produit puis servi par un serveur statique sous un sous-chemin ; navigation, problèmes, comparaison, téléchargement ; aucun champ modifiable ni contrôle d'édition sur chaque vue ; bandeau ; aucune requête distante ; axe clair et sombre
- [ ] T003 [US1] `src/cli/site.ts`, `main.ts` (R1)
- [ ] T004 [US2] `SiteSource`, `readOnly` du store, contrôles masqués, bandeau (R2, R3)

## Phase 2 : US3, publication — branche `013-site-lecture-seule/us3`

- [ ] T005 [US3] `docs/utilisation.md` : workflow complet et réglages du dépôt (R4) ; SC-001 mesuré sur `validator-config-gpu`
