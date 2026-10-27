import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import pkg from '../../../package.json' with { type: 'json' }
import { main } from '@cli/main'
import { FIXTURES } from '../../support/fixtures'

// Feature 013, US1 : vce site.
let tmp: string
let config: string
let ui: string
let out: string

async function run(...argv: string[]) {
  const stdout: string[] = []
  const stderr: string[] = []
  const code = await main(argv, { log: (l) => stdout.push(l), error: (l) => stderr.push(l) }, ui)
  return { code, stdout: stdout.join('\n'), stderr: stderr.join('\n') }
}

beforeEach(() => {
  tmp = mkdtempSync(join(tmpdir(), 'vce-site-'))
  config = join(tmp, 'config')
  cpSync(FIXTURES, config, { recursive: true })
  ui = join(tmp, 'ui')
  mkdirSync(join(ui, 'assets'), { recursive: true })
  writeFileSync(join(ui, 'index.html'), '<!doctype html>\n<html><head>\n    <meta charset="UTF-8" />\n</head><body></body></html>\n')
  writeFileSync(join(ui, 'assets', 'index.js'), 'console.log(1)')
  out = join(tmp, '_site')
})

afterEach(() => rmSync(tmp, { recursive: true, force: true }))

describe('vce site', () => {
  it('interface, instantané, balise du mode, marqueurs ; résumé et code 0', async () => {
    const r = await run('site', config, out)
    expect(r.code).toBe(0)
    expect(r.stdout).toContain('3 modèles, 22 tables, 15 listes de codes — 0 erreur, 0 avertissement')
    expect(r.stdout).toContain(`Site écrit dans ${out}`)
    expect(readFileSync(join(out, 'assets', 'index.js'), 'utf8')).toBe('console.log(1)')
    expect(readFileSync(join(out, 'index.html'), 'utf8')).toContain('<meta name="vce-mode" content="site" />')
    const snapshot = JSON.parse(readFileSync(join(out, 'api', 'snapshot.json'), 'utf8'))
    expect(snapshot).toMatchObject({ root: 'config', version: pkg.version })
    expect(snapshot.files['cnig_PLU_2017/files.json']).toBe(readFileSync(join(config, 'cnig_PLU_2017/files.json'), 'utf8'))
    expect(readFileSync(join(out, '.vce-site'), 'utf8').trim()).toBe(pkg.version)
    expect(existsSync(join(out, '.nojekyll'))).toBe(true)
  })

  it('--title : titre affiché à la place du dossier', async () => {
    expect((await run('site', config, out, '--title', 'validator-config-gpu (json-source)')).code).toBe(0)
    expect(JSON.parse(readFileSync(join(out, 'api', 'snapshot.json'), 'utf8')).root).toBe('validator-config-gpu (json-source)')
  })

  it('configuration avec erreurs : site produit quand même', async () => {
    rmSync(join(config, 'cnig_PLU_2017/types/ZONE_URBA.json'))
    const r = await run('site', config, out)
    expect(r.code).toBe(0)
    expect(r.stdout).toMatch(/[1-9]\d* erreur/)
  })

  it('site déjà produit : remplacé ; dossier inconnu : refusé sans --force', async () => {
    expect((await run('site', config, out)).code).toBe(0)
    writeFileSync(join(out, 'ancien.txt'), 'x')
    expect((await run('site', config, out)).code).toBe(0)
    expect(existsSync(join(out, 'ancien.txt'))).toBe(false)

    const other = join(tmp, 'autre')
    mkdirSync(other)
    writeFileSync(join(other, 'important.txt'), 'x')
    const refused = await run('site', config, other)
    expect(refused.code).toBe(2)
    expect(refused.stderr).toContain('--force')
    expect(existsSync(join(other, 'important.txt'))).toBe(true)
    expect((await run('site', config, other, '--force')).code).toBe(0)
    expect(existsSync(join(other, 'important.txt'))).toBe(false)
  })

  it('dossier inexistant, sans modèle, ou sortie dans la configuration : code 2', async () => {
    expect((await run('site', join(tmp, 'inconnu'), out)).code).toBe(2)
    const empty = join(tmp, 'vide')
    mkdirSync(empty)
    expect((await run('site', empty, out)).code).toBe(2)
    expect((await run('site', config, join(config, '_site'))).code).toBe(2)
  })

  it('usage incorrect : code 2 ; HELP', async () => {
    expect((await run('site', config)).code).toBe(2)
    expect((await run('site', config, out, '--verbeux')).code).toBe(2)
    expect((await run('--help')).stdout).toContain('vce site <dossier> <sortie>')
  })
})
