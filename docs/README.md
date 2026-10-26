# Documentation

- [Utilisation](utilisation.md) : éditeur en ligne et local, installation, `vce check`,
  `vce serve`, configurations connues.
- [Principes du projet](principes.md) (obligatoires).
- [Workflow spec → issue → PR et conventions de commit](developper/workflow.md).

## Développement

```sh
npm ci
npm test                 # tests unitaires
npm run build            # dist/ui (interface) et dist/cli.js (CLI)
npm run test:e2e         # tests de bout en bout (Chromium, Firefox)
node bin/vce.js check tests/fixtures/config
VCE_CONFIG_DIR=~/gpu/validator-config-gpu/config npm test   # + configuration complète
```

## Arborescence

- `src/core/` : cœur pur (chargement, validation, édition, corrections), sans dépendance au
  navigateur ni à Node ;
- `src/ui/` : interface Vue (éditeur en ligne et `vce serve`) ;
- `src/cli/` : commandes `vce check` et `vce serve` ;
- `specs/` : spécifications, plans et tâches, une feature par dossier ;
- `tests/` : tests unitaires et de bout en bout, fixtures réelles ;
- `.github/` : modèles d'issues et de PR, workflows (CI, Pages, Release).
