# Change Log

Tous les changements notables sont documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](http://keepachangelog.com/)
et le versionnement sur [Semantic Versioning](http://semver.org/).

## [Unreleased]

### Changed

- Arbre de gauche réduit aux modèles groupés par famille : un clic ouvre la vue du modèle (`files.json`), le détail (fichiers attendus) est dans le panneau principal. Fil d'Ariane sans la famille. Onglet « Fichiers » : type donné par l'icône seule (libellé au survol), métadonnées en `</>`, crayon au lieu du chevron pour ouvrir le formulaire d'un fichier. Regex : variables affichées par leur nom seul, sans chevrons ni suffixe `_OPT` (la couleur indique une variable facultative). Onglet « Listes de codes » en tableau (liste, fichier, valeurs, problèmes) ; vue d'une liste avec numéros de ligne, en-tête sur fond clair et lignes alternées. Bouton « Parcourir les modèles » retiré de l'accueil.

- Panneau des problèmes replié au chargement d'une configuration sans problème, ouvert s'il y en a, et rouvert quand une modification en crée.
- Formulaires mis en forme : champs en grille, sections titrées dans l'onglet « Modèle », contenu des panneaux dépliés sur fond clair, messages sous les champs lisibles. Titre du modèle dans l'en-tête de sa vue. Bandeau du modèle réduit aux problèmes ; identifiant du modèle, chemin du fichier en bas de vue, tuiles et types de fichiers retirés. « Monter » et « Descendre » retirés des colonnes. Carte d'un problème et fenêtre des corrections proposées mises en forme (gravité en pastille, conseil encadré, correction « sûre » signalée).
- Clés étrangères et conditions affichées comme du SQL (mots-clés en bleu gras, chaînes en vert), modifiables par un crayon. Badges colorés : présence des fichiers attendus (obligatoire en rouge, recommandé en orange, facultatif en vert), contraintes des colonnes (valeur obligatoire, colonne obligatoire, unique). « Monter » et « Descendre » retirés des fichiers attendus. Bouton « Équivalents » renommé « Appliquer aux colonnes / fichiers / listes semblables ».
- Arborescence des fichiers attendus (arbre et vue du modèle) : à chaque niveau, les fichiers d'abord, puis les dossiers. Regex mises en valeur : encadrées en police à chasse fixe, variables de `variables.json` en bleu gras, variables facultatives en jaune. Accueil de l'éditeur en ligne : pleine largeur, sans les paragraphes de confidentialité et de commandes.
- Vue d'un modèle en onglets « Modèle », « Fichiers », « Tables » (nouveau : modèles de table du modèle avec présence, nombre de colonnes et problèmes, tables non référencées) et « Listes de codes » ; l'onglet suit l'adresse (fichier de l'arbre, problème cliqué). Bandeau de synthèse en tuiles qui ouvrent l'onglet correspondant, types de fichiers au pluriel. Bouton « Listes de codes (N) » retiré. « Télécharger le JSON » (ou le CSV) à côté des onglets Vue / Source, et non plus dans le titre.
- Vue d'un modèle (`files.json`) : fichiers attendus rangés selon leur arborescence, dossiers sur fond bleuté et contenu en retrait avec un filet bleu, icône par type de fichier.
- En-tête : version de l'éditeur et lien vers le dépôt GitHub ; annuler, rétablir et problèmes affichés seulement une fois une configuration chargée. Accueil d'une configuration : chiffres clés (modèles, tables, listes, erreurs, avertissements), familles de modèles avec liens et comparaison de la dernière version. Accueil de l'éditeur en ligne mis en forme (fonctionnalités, confidentialité).
- Arbre des modèles en accordéon (un seul modèle ouvert) ; bloc du modèle affiché encadré en bleu ; téléchargement du modèle retiré de l'arbre (il reste dans la vue du modèle). Contrastes renforcés : texte plein, texte secondaire, libellés et contours des champs plus foncés, élément actif de l'arbre en bleu gras.
- Arbre des modèles allégé : sous un modèle, seulement le modèle, ses fichiers attendus et ses surcharges GpU ; un fichier attendu de type table ouvre sa table ; modèle et élément affichés mis en évidence et visibles (#113). Listes de codes depuis la vue du modèle (« Listes de codes (N) », nombre de valeurs), tables non référencées listées dans la vue du modèle (#114).
- Polices et couleurs de validator-api-client : Open Sans (texte) et Fira Sans (titres) servies par l'application, bleu `#1a5fb4` et texte `#091625` aux contrastes AA, arbre et problèmes sur fond clair, en-tête blanc ; accessibilité vérifiée en thème clair et sombre (#115). Dépendances de développement `@fontsource/open-sans` et `@fontsource/fira-sans` (licence OFL-1.1, livrée dans `licences/`) : le paquet publié reste sans dépendance d'exécution.
- Listes de codes : le nom d'une liste est celui de son fichier ; la déclaration se fait par le choix du fichier, qui renomme la liste, son titre s'il suivait l'ancien nom et les clés étrangères qui la visent, en une étape ; nouvel avertissement `WARN-CODE-NAME-FILE` avec sa correction (#116).

### Added

- Édition du contenu des listes de codes : valeurs modifiables dans le tableau, lignes ajoutées ou supprimées, une étape annulable par modification ; seule la ligne touchée du CSV est réécrite (fins de ligne et guillemets du reste conservés). Une liste dont une valeur s'étend sur plusieurs lignes reste en lecture.
- Revue des modifications : le compteur « N fichier(s) modifié(s) » ouvre la liste des fichiers modifiés ou créés, avec leur diff ligne à ligne, l'ouverture du fichier et l'annulation de ses modifications (un pas annulable). Le téléchargement complet (ZIP) passe par cette revue quand il y a des modifications.
- Recherche dans toute la configuration (« Rechercher » dans l'en-tête, ou touche `/`) : modèles, fichiers attendus, tables, colonnes (nom, description, motif), listes de codes et leurs valeurs, identifiants ; chaque résultat ouvre l'élément trouvé.
- Colonne visée par une clé étrangère vers une liste de codes : valeurs autorisées affichées dans son panneau (colonne de la clé, puis libellés ; 50 premières lignes), avec un lien vers la liste.
- Essai d'un nom contre une regex (« Tester un nom ») sous le nom du dossier, le chemin des fichiers attendus et le motif des colonnes : accepté, ou refusé à partir de la première partie qui ne correspond plus (variable `<DATE>`, texte…). Disponible aussi sur le site en lecture seule.
- Vue « Source » lisible : lignes numérotées en liens (`?l=<ligne>`), JSON et CSV colorés ; une erreur de syntaxe (JSON, CSV) ouvre la source à la ligne fautive, mise en évidence. Les problèmes de syntaxe portent leur numéro de ligne (`line`, aussi dans `vce check --format json`).
- Fil d'Ariane au-dessus de chaque vue : configuration › famille › modèle › table ou liste › élément désigné (colonne, fichier, liste), chaque niveau menant à sa vue.
- `vce site <dossier> <sortie> [--title] [--force]` : site statique en lecture seule de la configuration, pour GitHub Pages ou tout serveur statique. Il reprend l'interface livrée et un instantané de la configuration. Navigation, problèmes, comparaison, équivalents en lecture et téléchargements restent disponibles ; aucun champ n'est modifiable, un bandeau l'indique ; workflow GitHub Pages d'exemple dans `docs/utilisation.md` (#95).
- Modification en série : « Équivalents » sur une colonne liste les colonnes de même nom des tables équivalentes (famille du modèle ou toute la configuration) et recopie une propriété vers celles qui sont cochées, après aperçu, en une étape d'annulation (#55) ; onglet « Comparer » : propriétés principales des équivalents par modèle, écarts à la source marqués « ≠ », modèles sans équivalent (#57) ; aussi sur les fichiers attendus et les déclarations de listes de codes (#56).
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

- Annuler et rétablir (boutons de l'en-tête, Ctrl+Z, Ctrl+Maj+Z, Ctrl+Y) ; la revue des modifications permet toujours d'annuler celles d'un fichier. Nom de la configuration retiré de l'en-tête (il reste sur l'accueil de la configuration).

- Support de `gpu.json` (vue des surcharges GpU, schéma, `WARN-GPU-ORPHAN-ID` et `ERR-GPU-ORPHAN-ID`) et de l'héritage (`parent`, `abstract`, `ERR-GPU-INHERITANCE`) : les anciens modèles GpU ne sont plus pris en charge. Un `gpu.json` présent est ignoré ; `parent` et `abstract` sont conservés tels quels sans être interprétés.
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
