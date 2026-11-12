// Source de configuration (plan 002, R1 ; contrat source-et-ecriture).

export type SaveResult = { path: string; ok: true } | { path: string; ok: false; reason: 'conflict' | 'forbidden' | 'error'; message: string }

export interface ConfigSource {
  kind: 'server' | 'folder' | 'site'
  /** Affiché dans la barre : chemin du dossier, nom du dossier choisi… */
  label: string
  load(onProgress?: (done: number, total: number) => void): Promise<Map<string, string>>
  /** Octets d'origine d'un fichier, pour un ZIP identique octet pour octet (sinon : texte en UTF-8). */
  raw?(path: string): Promise<Uint8Array | undefined>
  /** Absent : téléchargement ZIP seulement. */
  save?(changes: Map<string, string>, originals: ReadonlyMap<string, string>): Promise<SaveResult[]>
}

/** Lit une réponse JSON ; une page HTML (serveur absent ou périmé) donne un message explicite. */
export async function readJson(response: Response): Promise<unknown> {
  const text = await response.text()
  try {
    return JSON.parse(text)
  } catch {
    throw new Error("L'API de configuration a renvoyé une page HTML au lieu de JSON : lancez l'interface avec `vce serve` (et relancez-le s'il tourne depuis avant la mise à jour).")
  }
}
