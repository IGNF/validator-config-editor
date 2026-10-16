# Change Log

Tous les changements notables sont documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](http://keepachangelog.com/)
et le versionnement sur [Semantic Versioning](http://semver.org/).

## [Unreleased]

### Added

- Ouverture de la configuration d'un dépôt GitHub public par son URL (branche, sous-dossier), éditable et téléchargeable en ZIP (#23).

## [0.1.0] - 2026-10-16

### Added

- Navigation lisible : modèles groupés par famille, icônes et compteurs de problèmes, synthèse du modèle, libellés métier, indicateurs de problèmes sur les éléments (#40).

- Correction groupée : tous les problèmes d'un même code corrigés en une étape annulable (#38).

- Corrections proposées en un clic pour les problèmes (surcharge orpheline, liste non déclarée ou copiée depuis un autre modèle, nouvel identifiant, nom du modèle, noms proches, valeur CSV entre guillemets), annulables (#37).

- Panneau des problèmes lisible : groupes par fichier, titres et conseils en clair, localisation par noms, sévérité par icône (#39).

- Éditeur en ligne publié sur GitHub Pages : ouverture d'un dossier local, édition, téléchargement ZIP (#11, #14, #16).
- Édition des tables et des modèles de document, avec annuler/rétablir et validation en direct (#12, #13).

- Prise en charge des configurations dgpr, naviforest et ppr : `id` facultatif, valeurs `enum` numériques (#21).

- Spécification 001 : navigation et validation globale d'une configuration validator.
- JSON Schema des fichiers `files.json`, `types/*.json` et `gpu.json`.
- Commande `vce check` : validation de tout un dossier de configuration (#2).
- Commande `vce serve` : éditeur local en lecture (modèles, tables, listes de codes, surcharges GpU) (#3).
- Panneau des problèmes : filtres, navigation vers l'élément concerné, compteurs par modèle, rechargement (#4).
