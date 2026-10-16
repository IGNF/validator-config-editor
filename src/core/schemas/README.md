# JSON Schema des fichiers de configuration

Ces schémas (draft-07) décrivent le format **réel** des configurations IGNF/validator :

| Schéma | Fichiers |
|---|---|
| `document.json` | `<modèle>/files.json` |
| `table.json` | `<modèle>/types/*.json` |
| `gpu.json` | `<modèle>/gpu.json` |

## Origine

- inventaire des clés et valeurs de `IGNF/validator-config-gpu` (branche `json-source`) ;
- `doc/document_model.md` et le modèle Java `fr.ign.validator.model` du dépôt `IGNF/validator`.

Les objets restent ouverts : une propriété inconnue n'est pas une erreur (principe II).
Le code de validation est généré dans `generated/` par `npm run schemas` : ne pas le modifier
à la main.

## Écarts avec les schémas du validator (`validator-core/src/main/resources/schema/`)

- `Document.json` : ajout de `id`, `title`, `abstract`, `parent`, `codes`,
  `constraints.folderName` / `metadataSpecification` (remplacent `regexp`), `id`/`title`/
  `description` des fichiers, `tables` des fichiers `multi_table`.
- `Table.json` : ajout de `id`, `title`, `constraints.conditions` / `foreignKeys` au niveau de la
  table, `presenceRequired` et `reference` au niveau de la colonne ; type `Url` (et non `URL`)
  et types `Filename`, `MultiPoint`, `MultiLineString`, `MultiPolygon`.
- `gpu.json` est propre au Géoportail de l'Urbanisme et ignoré par le validator.
