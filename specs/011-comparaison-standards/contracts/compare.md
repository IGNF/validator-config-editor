# Contrat : comparaison de deux modèles

**Feature** : `011-comparaison-standards` | Produit par `compareModels` (cœur) et
`vce compare --format json` (CLI).

## Commande

```
vce compare <référence> <modèle> [--format text|json]
```

| Code de sortie | Cas |
|---|---|
| 0 | comparaison affichée, avec ou sans différence |
| 2 | usage incorrect, dossier inexistant ou sans `files.json` |

## JSON

Exemple tiré de `cnig_PLU_2022` → `cnig_PLU_2024`, abrégé (`…`) :

```json
{
  "from": "cnig_PLU_2022",
  "to": "cnig_PLU_2024",
  "document": [
    { "field": "folderName", "old": "…", "new": "…" }
  ],
  "files": {
    "added": ["5_OAP", "ARRETE_DUP", "ARRETE_MAJ_ANNEXES", "…"],
    "removed": ["5_Orientations_amenagement", "ORIENTATIONS_AMENAGEMENT"],
    "changed": [
      { "name": "RAPPORT", "changes": [{ "field": "path", "old": "…", "new": "…" }] }
    ]
  },
  "tables": {
    "added": [],
    "removed": [],
    "changed": [
      {
        "name": "DOC_URBA",
        "changes": [],
        "columns": { "added": ["NOMRAPP", "URLRAPP"], "removed": [], "changed": ["…"] }
      },
      {
        "name": "PRESCRIPTION_SURF",
        "changes": [{
          "field": "foreignKeys",
          "removed": ["(TYPEPSC, STYPEPSC) REFERENCES PrescriptionUrbaType(TYPEPSC, STYPEPSC)"],
          "added": ["(TYPEPSC, STYPEPSC) REFERENCES PrescriptionSUrbaType(TYPEPSC, STYPEPSC)"]
        }],
        "columns": { "added": [], "removed": [], "changed": [] }
      }
    ]
  },
  "codes": {
    "added": ["InformationLUrbaType", "…", "PrescriptionSUrbaType"],
    "removed": ["InformationUrbaType", "PrescriptionUrbaType"],
    "content": [
      {
        "name": "…",
        "columns": { "added": [], "removed": [] },
        "rows": {
          "added": ["…"],
          "removed": [],
          "changed": [{ "key": "18,02", "changes": [{ "field": "LIBELLE", "old": "…", "new": "…" }] }]
        }
      }
    ]
  },
  "unreadable": [],
  "total": 0
}
```

`total` vaut ici la somme réelle des éléments ; l'exemple ne le calcule pas.

## Règles

- **Rapprochement** : par nom pour les fichiers attendus, les tables (`TableModel.name`), les
  colonnes et les listes ; par clé pour les lignes de codes (plan R5).
- **Champs** : ceux du plan R3. Les `id`, les titres et l'ordre ne sont jamais comparés.
- **`field`** : nom du champ, sans le préfixe `constraints.`. Pour une ligne de code, c'est le
  nom de la colonne.
- **`old` et `new`** : valeurs brutes (chaîne, nombre, booléen), `null` si le champ est absent.
- **`removed` et `added`** : utilisés pour les champs liste (`enum`, `conditions`,
  `foreignKeys`), sans tenir compte de l'ordre.
- **Tri** : toutes les listes de noms et de clés sont triées.
- **`unreadable`** : chemins des tables ou listes illisibles d'un des deux modèles, laissées de
  côté.
- **Lignes** (`rows.added`, `rows.removed`) : valeurs des colonnes communes, jointes par « , » ;
  `rows.changed[].key` : valeurs de la clé de rapprochement, jointes par « , ».
- **`total`** : nombre d'éléments ajoutés, retirés ou modifiés, toutes sections confondues
  (champ du dossier, fichier, table, colonne, liste, ligne).
