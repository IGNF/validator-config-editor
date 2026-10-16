# Contrat : sources, écriture et formats de sortie

## Source de configuration (interface)

```ts
interface ConfigSource {
  kind: 'server' | 'folder'           // 'github' en feature 003
  /** Affiché dans la barre : chemin du dossier, nom du dossier choisi… */
  label: string
  load(onProgress?: (done: number, total: number) => void): Promise<Map<string, string>>
  /** Absent : téléchargement ZIP seulement. */
  save?(changes: Map<string, string>, originals: Map<string, string>): Promise<SaveResult>
}

type SaveResult = { path: string; ok: true } | { path: string; ok: false; reason: 'conflict' | 'forbidden' | 'error'; message: string }
```

## `PUT /api/file` (`vce serve`)

| Élément | Valeur |
|---|---|
| Requête | `PUT /api/file?path=<chemin relatif, encodé>` |
| En-têtes | `Content-Type: text/plain; charset=utf-8`, `If-Match: "<sha256 hex du texte d'origine>"` |
| Corps | nouveau texte du fichier (UTF-8) |
| `204` | fichier écrit (atomiquement : temporaire puis `rename`) |
| `400` | `path` ou `If-Match` absent |
| `403` | chemin hors du dossier, lien sortant, fichier inexistant ou autre que `*.json` / `*.csv`, ou en-tête `Host` refusé |
| `409` | le fichier sur disque a changé depuis sa lecture (empreinte différente) ; corps : message |
| `413` | corps de plus de 10 Mo |

`GET /api/snapshot` est inchangé. La méthode `PUT` n'est acceptée que sur `/api/file`.

## Sérialisation d'un fichier JSON modifié

1. `style = detectStyle(texte d'origine)` :
   - `indent` : indentation de la première ligne de clé (`"  "`, `"    "` ou `"\t"`), 4
     espaces par défaut ;
   - `eol` : `"\r\n"` si le texte en contient, sinon `"\n"` ;
   - `finalNewline` : vrai si le texte se termine par une fin de ligne.
2. `texte = JSON.stringify(donnée, null, indent)`, avec les `\n` remplacés par `eol`, plus `eol`
   si `finalNewline`.
3. Un fichier non modifié n'est jamais resérialisé : son texte d'origine est réutilisé tel quel.
4. Un fichier est dit **reproductible** si `serialize(parse(t), detectStyle(t)) === t`. Sinon,
   sa première modification est signalée (« ce fichier sera réindenté »).

## Archive ZIP (éditeur en ligne)

- Nom : `<nom du dossier choisi>.zip`. Entrées : `<nom du dossier choisi>/<chemin relatif>`
  pour tous les fichiers `*.json` et `*.csv` lus.
- Méthode 0 (stockage), CRC-32, drapeau UTF-8 (bit 11), date de modification = date du
  téléchargement. Pas de ZIP64.
- Contenu : texte d'origine (octets identiques) pour un fichier non modifié, sérialisation
  ci-dessus pour un fichier modifié.
