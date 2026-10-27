import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { basename, join, relative, resolve } from 'node:path'
import pkg from '../../package.json' with { type: 'json' }
import { checkConfig, summarize } from '@core/validation/validate'
import type { Output } from './check'
import { NodeConfigFs } from './fs'
import { snapshot } from './server'

export interface SiteOptions {
  title?: string
  force: boolean
  uiDir: string
}

const MARKER = '.vce-site'
const plural = (n: number, word: string) => `${n} ${word}${n > 1 ? 's' : ''}`
const exists = (path: string) => stat(path).then(() => true, () => false)

/**
 * `vce site` (feature 013, plan R1) : site statique en lecture seule, copie de l'interface livrée,
 * instantané `api/snapshot.json` et balise `vce-mode` ; renvoie le code de sortie.
 */
export async function runSite(dir: string, output: string, options: SiteOptions, out: Output): Promise<number> {
  if (!(await stat(dir).then((s) => s.isDirectory(), () => false))) {
    out.error(`Dossier introuvable : ${dir}`)
    return 2
  }
  if (!(await exists(join(options.uiDir, 'index.html')))) {
    out.error(`Interface introuvable dans ${options.uiDir} : lancer « npm run build ».`)
    return 2
  }
  const target = resolve(output)
  const rel = relative(resolve(dir), target)
  if (rel === '' || (!rel.startsWith('..') && !rel.startsWith('/'))) {
    out.error(`La sortie ${target} est dans la configuration : choisir un dossier en dehors.`)
    return 2
  }
  if (await exists(target)) {
    const entries = await readdir(target)
    if (entries.length && !entries.includes(MARKER) && !options.force) {
      out.error(`${target} n'est pas vide et n'a pas été produit par vce site : relancer avec --force pour le remplacer.`)
      return 2
    }
  }

  const fs = await NodeConfigFs.open(dir)
  const result = await checkConfig(fs)
  if (result.project.models.size === 0) {
    out.error(`Aucun modèle dans ${fs.root} : indiquer le dossier qui contient les modèles (ex. config/).`)
    return 2
  }

  await rm(target, { recursive: true, force: true })
  await cp(options.uiDir, target, { recursive: true })
  const index = join(target, 'index.html')
  const html = await readFile(index, 'utf8')
  await writeFile(index, html.replace('<meta charset="UTF-8" />', '<meta charset="UTF-8" />\n    <meta name="vce-mode" content="site" />'))
  const snap = await snapshot(fs)
  await mkdir(join(target, 'api'), { recursive: true })
  await writeFile(join(target, 'api', 'snapshot.json'), JSON.stringify({ root: options.title ?? basename(fs.root), files: snap.files, version: pkg.version }))
  await writeFile(join(target, MARKER), `${pkg.version}\n`)
  await writeFile(join(target, '.nojekyll'), '')

  const s = summarize(result.project, result.problems)
  out.log(
    `${plural(s.models, 'modèle')}, ${plural(s.tables, 'table')}, ${s.codeLists} liste${s.codeLists > 1 ? 's' : ''} de codes` +
      ` — ${plural(s.errors, 'erreur')}, ${plural(s.warnings, 'avertissement')}`,
  )
  out.log(`Site écrit dans ${target}`)
  return 0
}
