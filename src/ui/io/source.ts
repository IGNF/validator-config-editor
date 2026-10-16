// Source de configuration (plan 002, R1 ; contrat source-et-ecriture).

export type SaveResult = { path: string; ok: true } | { path: string; ok: false; reason: 'conflict' | 'forbidden' | 'error'; message: string }

export interface ConfigSource {
  kind: 'server' | 'folder' | 'github'
  /** Affiché dans la barre : chemin du dossier, nom du dossier choisi, dépôt et branche… */
  label: string
  /** Nom de l'archive ZIP (sans extension) ; à défaut, dernier segment de `label`. */
  archiveName?: string
  /** Lien vers l'origine (dépôt GitHub…). */
  link?: string
  load(onProgress?: (done: number, total: number) => void): Promise<Map<string, string>>
  /** Octets d'origine d'un fichier, pour un ZIP identique octet pour octet (sinon : texte en UTF-8). */
  raw?(path: string): Promise<Uint8Array | undefined>
  /** Absent : téléchargement ZIP seulement. */
  save?(changes: Map<string, string>, originals: ReadonlyMap<string, string>): Promise<SaveResult[]>
}
