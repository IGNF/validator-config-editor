import { cpSync, mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import pkg from '../../../package.json' with { type: 'json' }
import { NodeConfigFs } from '@cli/fs'
import { main } from '@cli/main'
import { FIXTURES } from '../../support/fixtures'

async function run(...argv: string[]) {
  const stdout: string[] = []
  const stderr: string[] = []
  const code = await main(argv, { log: (l) => stdout.push(l), error: (l) => stderr.push(l) })
  return { code, stdout: stdout.join('\n'), stderr: stderr.join('\n') }
}

let tmp: string
let config: string

beforeEach(() => {
  tmp = mkdtempSync(join(tmpdir(), 'vce-'))
  config = join(tmp, 'config')
  cpSync(FIXTURES, config, { recursive: true })
})

afterEach(() => rmSync(tmp, { recursive: true, force: true }))

describe('vce', () => {
  it('--version affiche la version du paquet', async () => {
    expect(await run('--version')).toMatchObject({ code: 0, stdout: pkg.version })
  })

  it('--help affiche l\'usage', async () => {
    const r = await run('--help')
    expect(r.code).toBe(0)
    expect(r.stdout).toContain('vce check <dossier>')
  })

  it.each([
    [['inconnue'], 'Commande inconnue'],
    [[], 'Usage'],
    [['check'], 'un et un seul dossier'],
    [['check', 'a', 'b'], 'un et un seul dossier'],
    [['check', 'a', '--format'], 'Valeur manquante'],
    [['check', 'a', '--format', 'xml'], 'Format inconnu'],
    [['check', 'a', '--verbeux'], 'Option inconnue'],
  ])('usage incorrect %j : code 2', async (argv, message) => {
    const r = await run(...argv)
    expect(r.code).toBe(2)
    expect(r.stderr).toContain(message)
  })
})

describe('vce check', () => {
  it('configuration sans erreur : résumé et code 0', async () => {
    const r = await run('check', config)
    expect(r.code).toBe(0)
    expect(r.stdout).toBe('4 modèles, 22 tables, 15 listes de codes — 0 erreur, 0 avertissement')
  })

  it('tableModel cassé : problème localisé et code 1', async () => {
    rmSync(join(config, 'cnig_PLU_2017/types/ZONE_URBA.json'))
    const r = await run('check', config)
    expect(r.code).toBe(1)
    expect(r.stdout).toMatch(/^cnig_PLU_2017\/files\.json:\/files\/\d+\/tableModel ERR-TABLE-MODEL-MISSING Modèle de table « \.\/types\/ZONE_URBA\.json » introuvable$/m)
    expect(r.stdout).toMatch(/— 1 erreur, \d+ avertissements?$/)
  })

  it('JSON invalide : ligne et colonne, les autres modèles sont validés', async () => {
    writeFileSync(join(config, 'cnig_PLU_2017/files.json'), '{\n  "id": ,\n}')
    rmSync(join(config, 'cnig_SUP_A1_2016/codes/ListeModeprodSUP.csv'))
    const r = await run('check', config)
    expect(r.code).toBe(1)
    expect(r.stdout).toMatch(/^cnig_PLU_2017\/files\.json ERR-JSON-SYNTAX JSON invalide ligne 2, colonne \d+/m)
    expect(r.stdout).toContain('cnig_SUP_A1_2016/files.json:')
  })

  it('--format json : un seul document JSON', async () => {
    rmSync(join(config, 'cnig_PLU_2017/types/ZONE_URBA.json'))
    const r = await run('check', config, '--format', 'json')
    expect(r.code).toBe(1)
    const doc = JSON.parse(r.stdout)
    expect(doc.summary).toMatchObject({ models: 4, tables: 21, codeLists: 15, errors: 1 })
    expect(doc.problems.filter((p: { severity: string }) => p.severity === 'error')).toMatchObject([{ code: 'ERR-TABLE-MODEL-MISSING', severity: 'error', model: 'cnig_PLU_2017', file: 'cnig_PLU_2017/files.json' }])
    expect(doc.root).toContain('config')
  })

  it('avertissements seuls : code 0, et 1 avec --strict', async () => {
    writeFileSync(join(config, 'cnig_PLU_2017/codes/Orpheline.csv'), 'A\n1\n')
    expect((await run('check', config)).code).toBe(0)
    expect((await run('check', config, '--strict')).code).toBe(1)
  })

  it('dossier inexistant ou sans modèle : code 2', async () => {
    expect(await run('check', join(tmp, 'absent'))).toMatchObject({ code: 2, stderr: expect.stringContaining('Dossier introuvable') })
    mkdirSync(join(tmp, 'vide'))
    expect(await run('check', join(tmp, 'vide'))).toMatchObject({ code: 2, stderr: expect.stringContaining('Aucun modèle') })
  })
})

describe('NodeConfigFs', () => {
  it('liste les json et csv, ignore les fichiers cachés et les liens sortants', async () => {
    writeFileSync(join(config, 'cnig_PLU_2017/notes.txt'), 'x')
    mkdirSync(join(config, '.git'))
    writeFileSync(join(config, '.git/config.json'), '{}')
    mkdirSync(join(tmp, 'dehors'))
    writeFileSync(join(tmp, 'dehors/secret.json'), '{}')
    symlinkSync(join(tmp, 'dehors'), join(config, 'lien-sortant'))
    symlinkSync(join(config, 'GPU_MEC_2025'), join(config, 'lien-interne'))
    const files = await (await NodeConfigFs.open(config)).listFiles()
    expect(files).toContain('cnig_PLU_2017/files.json')
    expect(files).toContain('lien-interne/files.json')
    expect(files.some((f) => f.endsWith('.txt') || f.startsWith('.git') || f.startsWith('lien-sortant'))).toBe(false)
  })

  it('refuse de lire hors de la configuration', async () => {
    writeFileSync(join(tmp, 'secret.json'), '{}')
    const fs = await NodeConfigFs.open(config)
    await expect(fs.readText('../secret.json')).rejects.toThrow('hors de la configuration')
    expect(await fs.readText('cnig_PLU_2017/files.json')).toContain('cnig_PLU_2017')
  })
})
