import { readdir, readFile, realpath } from 'node:fs/promises'
import { join, relative, sep } from 'node:path'
import type { ConfigFs } from '@core/load/fs'

const isInside = (root: string, path: string) => path === root || path.startsWith(root + sep)

/**
 * Lecture d'un dossier de configuration sur disque (plan R4, R6) : seuls les `*.json` et `*.csv`
 * sont listés, et un lien symbolique qui sort du dossier est ignoré.
 */
export class NodeConfigFs implements ConfigFs {
  private constructor(readonly root: string) {}

  /** `root` doit exister ; il est résolu en chemin réel. */
  static async open(root: string): Promise<NodeConfigFs> {
    return new NodeConfigFs(await realpath(root))
  }

  async listFiles(): Promise<string[]> {
    const out: string[] = []
    const walk = async (dir: string) => {
      for (const entry of await readdir(dir, { withFileTypes: true })) {
        if (entry.name.startsWith('.') || entry.name === 'node_modules') continue
        let path = join(dir, entry.name)
        let isDir = entry.isDirectory()
        if (entry.isSymbolicLink()) {
          const real = await realpath(path).catch(() => undefined)
          if (!real || !isInside(this.root, real)) continue
          const target = await readdir(real).then(() => true, () => false)
          isDir = target
          path = join(dir, entry.name)
        }
        if (isDir) await walk(path)
        else if (/\.(json|csv)$/.test(entry.name)) out.push(relative(this.root, path).split(sep).join('/'))
      }
    }
    await walk(this.root)
    return out.sort()
  }

  async readText(path: string): Promise<string> {
    const full = await realpath(join(this.root, ...path.split('/')))
    if (!isInside(this.root, full)) throw new Error(`Chemin hors de la configuration : ${path}`)
    return readFile(full, 'utf8')
  }
}
