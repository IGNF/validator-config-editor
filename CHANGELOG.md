# Change Log

Tous les changements notables sont documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](http://keepachangelog.com/)
et le versionnement sur [Semantic Versioning](http://semver.org/).

## [Unreleased]

### Added

- Modification en série : « Équivalents » sur une colonne liste les colonnes de même nom des tables équivalentes (famille du modèle ou toute la configuration) et recopie une propriété vers celles qui sont cochées, après aperçu, en une étape d'annulation (#55) ; onglet « Comparer » : propriétés principales des équivalents par modèle, écarts à la source marqués « ≠ », modèles sans équivalent (#57).
- Comparaison de deux modèles (« Comparer » dans la vue du modèle), par défaut avec la version précédente du même standard : dossier, fichiers attendus, tables, colonnes et listes de codes ajoutés, retirés ou modifiés, modifications non enregistrées comprises (#97) ; contenu des listes de codes : colonnes et lignes ajoutées, retirées ou modifiées, lignes rapprochées par les colonnes de la clé étrangère (#98).
- `vce compare <référence> <modèle> [--format text|json]` : la même comparaison en ligne de commande (#99).
- Variables facultatives (suffixe `_OPT`, regex `(…)?`, ex. `<_PART_OPT>`) surlignées en jaune comme dans GpU ; préfixe `_` pour une regex qui commence par `_` ; écart à ces conventions signalé (`WARN-VARIABLES-OPT`).
- Variables : alias par famille de modèles (`aliases` de `variables.json`, ex. `<IDGEST>` pour les SUP, `<SIREN>` pour les PLUi et SCoT), à l'affichage et à la saisie.
- Configuration GpU (`variables.json` présent) : règles de l'import dans le GpU vérifiées — `id` présents et uniques par type d'objet dans toute la configuration, héritage refusé, surcharge `gpu.json` orpheline en erreur ; correction « Attribuer un identifiant » (#86).
- Regex (nom du dossier, chemins des fichiers attendus, motifs de colonne) affichées avec les variables de `variables.json` à la racine de la configuration, regex complète au survol ; saisie de `<NOM>` convertie en regex (#85).
- Téléchargement du fichier affiché, avec son contenu courant (octets d'origine s'il n'est pas modifié) (#70).
- Téléchargement d'un modèle en ZIP, depuis sa vue ou l'arbre ; références vers d'autres modèles signalées (#71).
- Création d'une liste de codes vide (nom et colonnes) dans un modèle (#74).
- Copie d'une liste de codes depuis n'importe quel modèle, ou duplication dans le modèle, en une étape annulable (#73).
- Arbre des modèles : catégorie « Fichiers » rangée selon l'arborescence des chemins (dossiers repliables, tous les fichiers attendus, tables comprises), qui ouvre le fichier attendu dans la vue du modèle ; chemin du fichier affiché en bas de la vue et au survol du titre.
- Panneaux latéraux (modèles, problèmes) rétractables et redimensionnables (souris ou clavier), état mémorisé dans le navigateur ; arbre des modèles plus compact (retrait de 12 px par niveau).

### Removed

- Gestion de l'héritage (cas propre au GpU, déjà aplati dans `validator-config-gpu`) : plus de vérification `ERR-PARENT-MISSING`, de résolution des `id` de `gpu.json` par le parent ou les modèles qui en héritent, ni d'affichage du parent embarqué et des modèles hérités. La clé `parent` reste tolérée et conservée.

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
