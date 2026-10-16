# validator-config-editor

Éditeur et validateur de configurations IGNF/validator (ex. `IGNF/validator-config-gpu`),
distribué comme paquet npm installé depuis un tag git et fournissant la commande `vce`.

- Principes (obligatoires) : [docs/principes.md](docs/principes.md)
- Workflow spec → issue → PR et conventions de commit : [docs/developper/workflow.md](docs/developper/workflow.md)
- Specs : `specs/NNN-nom/{spec,plan,tasks}.md`. Aucun code sans spec approuvée.
- Tout est rédigé en français (interface, messages, specs, issues, PR, commits).
- Projet modèle : `IGNF/tableschema-editor` (mêmes patterns : cœur pur, Ajv compilé, store Pinia unique).
- Configuration de référence pour les tests : `IGNF/validator-config-gpu`, branche `json-source`.
