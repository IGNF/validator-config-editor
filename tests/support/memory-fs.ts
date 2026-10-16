import type { ConfigFs } from '@core/load/fs'

/** Configuration en mémoire : chemin relatif → contenu. */
export class MemoryConfigFs implements ConfigFs {
  constructor(readonly files: Map<string, string>) {}

  async listFiles(): Promise<string[]> {
    return [...this.files.keys()].filter((p) => /\.(json|csv)$/.test(p))
  }

  async readText(path: string): Promise<string> {
    const text = this.files.get(path)
    if (text === undefined) throw new Error(`Fichier absent : ${path}`)
    return text
  }
}
