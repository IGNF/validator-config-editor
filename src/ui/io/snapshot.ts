import type { ConfigFs } from '@core/load/fs'

export interface Snapshot {
  root: string
  files: Map<string, string>
}

/** Lit toute la configuration servie par `vce serve` (GET /api/snapshot, plan R5). */
export async function fetchSnapshot(): Promise<Snapshot> {
  const response = await fetch('api/snapshot', { cache: 'no-store' })
  if (!response.ok) throw new Error(`Lecture de la configuration impossible (HTTP ${response.status}).`)
  const data = (await response.json()) as { root: string; files: Record<string, string> }
  return { root: data.root, files: new Map(Object.entries(data.files)) }
}

export class SnapshotConfigFs implements ConfigFs {
  constructor(private readonly files: Map<string, string>) {}

  async listFiles(): Promise<string[]> {
    return [...this.files.keys()]
  }

  async readText(path: string): Promise<string> {
    const text = this.files.get(path)
    if (text === undefined) throw new Error(`Fichier absent de l'instantané : ${path}`)
    return text
  }
}
