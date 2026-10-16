import { selectFolder } from '@core/load/folder'
import type { ConfigSource } from './source'

/** Dossier choisi dans le navigateur (éditeur en ligne) : rien n'est envoyé sur le réseau. */
export class FolderSource implements ConfigSource {
  readonly kind = 'folder'
  label = ''
  private byConfigPath = new Map<string, File>()

  constructor(private readonly files: readonly File[]) {}

  async load(onProgress?: (done: number, total: number) => void): Promise<Map<string, string>> {
    const byPath = new Map(this.files.map((f) => [f.webkitRelativePath || f.name, f]))
    const selection = selectFolder([...byPath.keys()])
    this.label = selection.root.replace(/\/$/, '')
    this.byConfigPath = new Map([...selection.files].map(([source, path]) => [path, byPath.get(source)!]))
    let done = 0
    const entries = await Promise.all(
      [...selection.files].map(async ([source, path]) => {
        const text = await byPath.get(source)!.text()
        onProgress?.(++done, selection.files.size)
        return [path, text] as const
      }),
    )
    return new Map(entries)
  }

  async raw(path: string): Promise<Uint8Array | undefined> {
    const file = this.byConfigPath.get(path)
    return file ? new Uint8Array(await file.arrayBuffer()) : undefined
  }
}

/** Le navigateur permet-il de choisir un dossier ? */
export const canPickFolder = () => 'webkitdirectory' in document.createElement('input')
