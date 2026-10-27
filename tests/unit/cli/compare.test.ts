import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { main } from '@cli/main'
import { FIXTURES } from '../../support/fixtures'

// Feature 011, US3 : vce compare (contrat contracts/compare.md).
async function run(...argv: string[]) {
  const stdout: string[] = []
  const stderr: string[] = []
  const code = await main(argv, { log: (l) => stdout.push(l), error: (l) => stderr.push(l) })
  return { code, stdout: stdout.join('\n'), stderr: stderr.join('\n') }
}

let tmp: string
let config: string
const PLU = () => join(config, 'cnig_PLU_2017')
const COPY = () => join(config, 'cnig_PLU_2022')

beforeEach(() => {
  tmp = mkdtempSync(join(tmpdir(), 'vce-'))
  config = join(tmp, 'config')
  cpSync(FIXTURES, config, { recursive: true })
  cpSync(PLU(), COPY(), { recursive: true })
  const files = join(COPY(), 'files.json')
  const doc = JSON.parse(readFileSync(files, 'utf8'))
  doc.files = doc.files.filter((f: { name: string }) => f.name !== 'JUGEMENT')
  doc.files.find((f: { name: string }) => f.name === 'RAPPORT').mandatory = 'WARN'
  writeFileSync(files, JSON.stringify(doc, null, 4))
  const csv = join(COPY(), 'codes/ListeEtatPLU.csv')
  writeFileSync(csv, readFileSync(csv, 'utf8').trimEnd() + '\n99\n')
})

afterEach(() => rmSync(tmp, { recursive: true, force: true }))

describe('vce compare', () => {
  it('texte : sections, total, code 0', async () => {
    const r = await run('compare', PLU(), COPY())
    expect(r.code).toBe(0)
    expect(r.stdout).toContain('Comparaison de cnig_PLU_2017 à cnig_PLU_2022')
    expect(r.stdout).toContain('Fichiers attendus\n  - JUGEMENT\n  ~ RAPPORT : présence : ERROR → WARN')
    expect(r.stdout).toContain('Contenu des listes de codes\n  ~ ListeEtatPLU\n      + 99')
    expect(r.stdout).toMatch(/3 différences$/)
  })

  it('--format json : conforme au contrat', async () => {
    const r = await run('compare', PLU(), COPY(), '--format', 'json')
    expect(r.code).toBe(0)
    const json = JSON.parse(r.stdout)
    expect(Object.keys(json)).toEqual(['from', 'to', 'document', 'files', 'tables', 'codes', 'unreadable', 'total'])
    expect(json).toMatchObject({
      from: 'cnig_PLU_2017',
      to: 'cnig_PLU_2022',
      files: { added: [], removed: ['JUGEMENT'], changed: [{ name: 'RAPPORT', changes: [{ field: 'mandatory', old: 'ERROR', new: 'WARN' }] }] },
      codes: { content: [{ name: 'ListeEtatPLU', rows: { added: ['99'] } }] },
      total: 3,
    })
  })

  it('modèles identiques : « Aucune différence »', async () => {
    const r = await run('compare', PLU(), PLU())
    expect(r).toMatchObject({ code: 0 })
    expect(r.stdout).toMatch(/Aucune différence$/)
  })

  it('deux dossiers de configuration différents', async () => {
    const other = join(tmp, 'autre')
    mkdirSync(other)
    cpSync(COPY(), join(other, 'cnig_PLU_2022'), { recursive: true })
    rmSync(COPY(), { recursive: true })
    const r = await run('compare', PLU(), join(other, 'cnig_PLU_2022'), '--format', 'json')
    expect(r.code).toBe(0)
    expect(JSON.parse(r.stdout).total).toBe(3)
  })

  it('même nom dans deux configurations : refusé (hors périmètre)', async () => {
    const other = join(tmp, 'autre')
    cpSync(PLU(), join(other, 'cnig_PLU_2017'), { recursive: true })
    const r = await run('compare', PLU(), join(other, 'cnig_PLU_2017'))
    expect(r.code).toBe(2)
    expect(r.stderr).toContain('même nom')
  })

  it('dossier inexistant ou sans files.json : code 2', async () => {
    expect((await run('compare', PLU(), join(config, 'inconnu'))).code).toBe(2)
    mkdirSync(join(config, 'vide'))
    const r = await run('compare', join(config, 'vide'), PLU())
    expect(r.code).toBe(2)
    expect(r.stderr).toContain('files.json')
  })

  it('usage incorrect : code 2', async () => {
    expect((await run('compare', PLU())).code).toBe(2)
    expect((await run('compare', PLU(), COPY(), '--strict')).code).toBe(2)
    expect((await run('compare', PLU(), COPY(), '--format', 'xml')).code).toBe(2)
  })

  it('--help décrit compare', async () => {
    expect((await run('--help')).stdout).toContain('vce compare <référence> <modèle>')
  })
})
