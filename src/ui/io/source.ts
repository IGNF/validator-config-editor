// Source de configuration (plan 002, R1 ; contrat source-et-ecriture).

export type SaveResult = { path: string; ok: true } | { path: string; ok: false; reason: 'conflict' | 'forbidden' | 'error'; message: string }

export interface ConfigSource {
  kind: 'server' | 'folder'
  /** Affiché dans la barre : chemin du dossier, nom du dossier choisi… */
  label: string
  load(onProgress?: (done: number, total: number) => void): Promise<Map<string, string>>
  /** Absent : téléchargement ZIP seulement. */
  save?(changes: Map<string, string>, originals: ReadonlyMap<string, string>): Promise<SaveResult[]>
}
