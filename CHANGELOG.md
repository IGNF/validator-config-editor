# Change Log

Tous les changements notables sont documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](http://keepachangelog.com/)
et le versionnement sur [Semantic Versioning](http://semver.org/).

## [Unreleased]

### Added

- Panneau des problèmes lisible : groupes par fichier, titres et conseils en clair, localisation par noms, sévérité par icône (#39).

- Éditeur en ligne publié sur GitHub Pages : ouverture d'un dossier local, édition, téléchargement ZIP (#11, #14, #16).
- Édition des tables et des modèles de document, avec annuler/rétablir et validation en direct (#12, #13).

- Prise en charge des configurations dgpr, naviforest et ppr : `id` facultatif, valeurs `enum` numériques (#21).

- Spécification 001 : navigation et validation globale d'une configuration validator.
- JSON Schema des fichiers `files.json`, `types/*.json` et `gpu.json`.
- Commande `vce check` : validation de tout un dossier de configuration (#2).
- Commande `vce serve` : éditeur local en lecture (modèles, tables, listes de codes, surcharges GpU) (#3).
- Panneau des problèmes : filtres, navigation vers l'élément concerné, compteurs par modèle, rechargement (#4).
