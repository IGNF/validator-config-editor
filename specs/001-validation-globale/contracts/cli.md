# Contrat : CLI `vce` et API locale

## Synopsis

```
vce check <dossier> [--format text|json] [--strict]
vce serve <dossier> [--port <n>] [--open]
vce --help | --version
```

`<dossier>` est le dossier contenant les modèles (ex. `config/`).

## `vce check`

**Sortie texte** (par défaut) : un problème par ligne sur la sortie standard, puis un résumé.

```
cnig_PLU_2017/files.json:/files/3/tableModel ERR-TABLE-MODEL-MISSING Modèle de table « ./types/ZONE_URBA.json » introuvable
cnig_PLU_2017/gpu.json:/validator_file_model/1773dd88… WARN-GPU-ORPHAN-ID gpu.json : identifiant 1773dd88… sans objet correspondant

153 modèles, 1097 tables, 1213 listes de codes — 1 erreur, 1 avertissement
```

Le pointeur est omis (`<fichier> CODE message`) quand il ne s'applique pas.

**Sortie JSON** (`--format json`) : un seul document sur la sortie standard, rien d'autre.

```json
{
  "root": "/chemin/absolu/config",
  "summary": { "models": 153, "tables": 1097, "codeLists": 1213, "errors": 1, "warnings": 1 },
  "problems": [ { "code": "…", "severity": "error", "model": "…", "file": "…", "pointer": "…", "message": "…" } ]
}
```

**Codes de sortie**

| Code | Cas |
|---|---|
| 0 | aucune erreur (et, avec `--strict`, aucun avertissement) |
| 1 | au moins une erreur (ou, avec `--strict`, au moins un avertissement) |
| 2 | usage incorrect, dossier inexistant, illisible ou sans aucun modèle (message sur la sortie d'erreur) |

## `vce serve`

- Écoute sur `127.0.0.1`, port 5174 par défaut. Si le port est pris et que `--port` n'est pas
  donné, essaie le port suivant (10 essais).
- Affiche `Éditeur disponible sur http://127.0.0.1:<port>/ (Ctrl+C pour arrêter)`.
- `--open` ouvre l'adresse dans le navigateur par défaut (`xdg-open`, `open` ou `start`).

### API

| Méthode et chemin | Réponse |
|---|---|
| `GET /api/snapshot` | `200 application/json` : `{ "root": "<chemin absolu>", "files": { "<chemin relatif>": "<texte UTF-8>" } }`, pour tous les `*.json` et `*.csv` sous la racine, liens symboliques sortants exclus |
| `GET /` et `GET /assets/*` | fichiers statiques de l'interface (`dist/ui/`) |
| Toute autre méthode | `405` |
| En-tête `Host` différent de `127.0.0.1:<port>` ou `localhost:<port>` | `403` |
| Chemin statique inconnu, ou chemin sortant de `dist/ui/` | `404` |

En-têtes de toutes les réponses : `Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://api.github.com https://raw.githubusercontent.com` (lecture de dépôts GitHub, feature 003),
`X-Content-Type-Options: nosniff`, `Cache-Control: no-store` pour `/api/*`.

L'API est en lecture seule dans cette feature. L'écriture (`PUT /api/file`) est prévue en 002.
