# Fixtures

## `config/`

Extrait réel de [IGNF/validator-config-gpu](https://github.com/IGNF/validator-config-gpu),
branche `json-source`, copié sans modification :

| Modèle | Commit | Intérêt |
|---|---|---|
| `cnig_PLU_2017` | `5fb2cdb7` | modèle complet : tables, listes de codes multi-colonnes, codes `.json`, `gpu.json` |
| `cnig_SUP_A1_2016` | `823d71e` | modèle SUP aplati (sans héritage) : colonnes communes de même `id` dans plusieurs tables |
| `GPU_MEC_2025` | `5fb2cdb7` | dossier `codes/` vide (`.gitkeep` ajouté pour git) |

Cette configuration ne doit produire **aucune erreur**.

## `known/` : autres configurations connues

Un modèle réel de chacune des autres configurations IGNF/validator, copié sans modification
(branche `main`) :

| Dossier | Origine | Intérêt |
|---|---|---|
| `known/dgpr/Canalisations` | [validator-config-dgpr](https://github.com/IGNF/validator-config-dgpr) `1e7abe3` | colonnes sans `id`, `name` différent du dossier |
| `known/naviforest/cnig_SNDD_2019` | [validator-config-naviforest](https://github.com/IGNF/validator-config-naviforest) `e2b1b75` | valeurs `enum` numériques |
| `known/ppr/cnig_PPR_v1.0_geopackage` | [validator-config-ppr](https://github.com/IGNF/validator-config-ppr) `8e92a96` | aucun `id`, fichier `multi_table`, modèles de table des listes de codes (inutilisés par le validator) |

Ces configurations ne doivent produire **aucune erreur**.

## Tests sur la configuration complète

```sh
VCE_CONFIG_DIR=~/gpu/validator-config-gpu/config npm test
```
