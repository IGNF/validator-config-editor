# Contrat : codes de problème

Un problème a la forme suivante :

```ts
interface Problem {
  code: string                        // stable, voir tableau
  severity: 'error' | 'warning'
  model: string | null                // nom du dossier du modèle, null si global
  file: string                        // chemin relatif au dossier de configuration, séparateur '/'
  pointer?: string                    // pointeur JSON (RFC 6901) dans le fichier, ou '/<ligne>' pour un CSV
  message: string                     // français
}
```

**Stabilité des codes** : un code n'est jamais renommé ni réutilisé. Changer la sévérité d'un
code est un changement de version mineure.

## Chargement

| Code | Sévérité | Déclencheur | Message (exemple) |
|---|---|---|---|
| `ERR-JSON-SYNTAX` | erreur | JSON illisible | `JSON invalide ligne 12, colonne 5 : virgule manquante` |
| `ERR-CSV-SYNTAX` | erreur | guillemet non fermé | `CSV invalide ligne 8 : guillemet non fermé` |
| `ERR-CSV-HEADER` | erreur | en-tête vide ou nom de colonne vide ou dupliqué | `En-tête CSV invalide : colonne « TYPEZONE » dupliquée` |
| `ERR-CSV-ROW-LENGTH` | erreur | ligne dont le nombre de colonnes diffère de l'en-tête | `Ligne 14 : 3 valeurs pour 5 colonnes` |
| `ERR-VARIABLES-FORMAT` | erreur | `variables.json` (racine) illisible, ou sans objet `variables` nom → regex non vide (feature 010) | `variables.json illisible ou mal formé : les regex sont affichées sans variable` |
| `ERR-VARIABLES-DUPLICATE` | erreur | deux variables de `variables.json` ont la même regex (feature 010) | `La variable SIREN a la même regex que IDGEST` |
| `WARN-MODEL-NO-DOCUMENT` | avertissement | dossier sans `files.json` | `Dossier sans files.json` |

## Schémas

| Code | Sévérité | Déclencheur | Message (exemple) |
|---|---|---|---|
| `ERR-SCHEMA` | erreur | non-conformité de `files.json`, `types/*.json` ou `gpu.json` à son JSON Schema | `/columns/3/type : valeur « Texte » non autorisée (attendu : String, Integer, …)` |

## Références croisées

| Code | Sévérité | Déclencheur | Message (exemple) |
|---|---|---|---|
| `WARN-MODEL-NAME` | avertissement | `name` de `files.json` ≠ nom du dossier | `Le nom « cnig_PLU_2016 » diffère du dossier « cnig_PLU_2017 »` |
| `ERR-TABLE-MODEL-MISSING` | erreur | modèle de table absent pour un fichier `table` ou une table de `multi_table` : chemin `tableModel`, ou à défaut `./types/<name>.json` (convention du validator). `auto` et les URL ne sont pas vérifiés | `Modèle de table « ./types/ZONE_URBA.json » introuvable` |
| `ERR-CODE-DATA-MISSING` | erreur | `codes[].data` désigne un fichier absent (les URL ne sont pas vérifiées) | `Liste de codes « ./codes/ListeEtatPLU.csv » introuvable` |
| `ERR-FK-SYNTAX` | erreur | clé étrangère illisible ou listes de colonnes de longueurs différentes | `Clé étrangère illisible : « (TYPE) REFERENCE Liste(TYPE) »` |
| `ERR-FK-SOURCE-COLUMN` | erreur | colonne source absente de la table | `Clé étrangère : colonne « TYPEZONE » absente de la table` |
| `ERR-FK-TARGET-LIST` | erreur | cible ni déclarée dans `codes[]` du modèle, ni nom d'une table du modèle (le validator ignore `parent`) | `Clé étrangère : liste « ListeTypezonePLU » non déclarée dans files.json` |
| `ERR-FK-TARGET-COLUMN` | erreur | colonne cible absente de l'en-tête du CSV de la liste (ou des colonnes de la table cible) | `Clé étrangère : colonne « TYPEZONE » absente de ListeTypezonePLU.csv` |
| `ERR-REFERENCE-TARGET` | erreur | `constraints.reference` `TABLE.COLONNE` non résolue dans le modèle | `Référence « SERVITUDE.IDSUP » : table ou colonne introuvable` |
| `ERR-ID-DUPLICATE` | erreur | même `id` porté par deux objets du modèle ; sur une configuration GpU, aussi deux objets de même type dans deux modèles, ou deux colonnes de deux tables (feature 010) | `Identifiant 7833f9f8… déjà utilisé par types/ZONE_URBA.json#/` |
| `ERR-GPU-ID-MISSING` | erreur | configuration GpU (`variables.json`) : modèle, fichier, liste, table ou colonne sans `id` (feature 010) | `Colonne sans identifiant (obligatoire pour l'import dans le GpU)` |
| `ERR-GPU-INHERITANCE` | erreur | configuration GpU : `parent` dans `files.json`, `parent_id` ou `abstract` dans `gpu.json` (feature 010) | `Héritage dans files.json : refusé par l'import dans le GpU` |
| `ERR-GPU-ORPHAN-ID` | erreur | configuration GpU : remplace `WARN-GPU-ORPHAN-ID` (feature 010) | `gpu.json : identifiant 1773dd88… sans objet correspondant` |
| `WARN-GPU-ORPHAN-ID` | avertissement | clé de section de `gpu.json` absente des `id` connus (plan R10) | `gpu.json : identifiant 1773dd88… sans objet correspondant` |
| `WARN-UNREFERENCED-FILE` | avertissement | fichier `types/**.json` ou `codes/**.csv` qui n'est le modèle de table d'aucun fichier ni le `data` d'aucun code | `Fichier non référencé par files.json` |

## Tri

Les problèmes sont triés par modèle, puis par fichier, puis par pointeur (ordre naturel des
segments numériques), puis par code.
