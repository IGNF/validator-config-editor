import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { MemoryConfigFs } from './memory-fs'

export const FIXTURES = join(import.meta.dirname, '../fixtures/config')

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

/** Charge un dossier de configuration en mémoire (par défaut, les fixtures réelles). */
export function readConfig(root = FIXTURES): Map<string, string> {
  return new Map(walk(root).map((p) => [relative(root, p).split(sep).join('/'), readFileSync(p, 'utf8')]))
}

export function memoryFs(files = readConfig()): MemoryConfigFs {
  return new MemoryConfigFs(files)
}

/** Modifie un fichier JSON d'une configuration en mémoire. */
export function editJson(files: Map<string, string>, path: string, edit: (data: Record<string, any>) => void): void {
  const data = JSON.parse(files.get(path)!) as Record<string, any>
  edit(data)
  files.set(path, JSON.stringify(data, null, 2))
}
