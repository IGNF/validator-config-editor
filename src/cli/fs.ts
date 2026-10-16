import { mkdir, readdir, readFile, realpath, rename, writeFile } from 'node:fs/promises'
import { basename, dirname, join, relative, sep } from 'node:path'
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

  /** Chemin réel d'un fichier existant de la configuration ; erreur s'il en sort. */
  private async resolve(path: string): Promise<string> {
    const full = await realpath(join(this.root, ...path.split('/')))
    if (!isInside(this.root, full)) throw new Error(`Chemin hors de la configuration : ${path}`)
    return full
  }

  async readText(path: string): Promise<string> {
    return readFile(await this.resolve(path), 'utf8')
  }

  /**
   * Crée un fichier `<modèle>/codes/…` ou `<modèle>/types/…` dans un modèle existant (004, R3) ;
   * échoue si le fichier existe déjà.
   */
  async createText(path: string, text: string): Promise<void> {
    const [model, folder, ...rest] = path.split('/')
    if (!model || (folder !== 'codes' && folder !== 'types') || rest.length !== 1) throw new Error(`Création non autorisée : ${path}`)
    const modelDir = await this.resolve(model)
    const dir = join(modelDir, folder)
    await mkdir(dir, { recursive: true })
    if (!isInside(this.root, await realpath(dir))) throw new Error(`Chemin hors de la configuration : ${path}`)
    await writeFile(join(dir, rest[0]!), text, { encoding: 'utf8', flag: 'wx' })
  }

  /** Remplace un fichier existant, de façon atomique (fichier temporaire puis renommage). */
  async writeText(path: string, text: string): Promise<void> {
    const full = await this.resolve(path)
    const tmp = join(dirname(full), `.${basename(full)}.vce-${process.pid}.tmp`)
    await writeFile(tmp, text, 'utf8')
    await rename(tmp, full)
  }
}
