import { cpSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { request } from 'node:http'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { NodeConfigFs } from '@cli/fs'
import { sha256, startServer, type RunningServer } from '@cli/server'
import { FIXTURES } from '../../support/fixtures'

let tmp: string
let config: string
let server: RunningServer
const FILE = 'cnig_PLU_2017/types/ZONE_URBA.json'

function put(path: string | null, body: string, { ifMatch, host }: { ifMatch?: string | null; host?: string } = {}) {
  const original = readFileSync(join(config, FILE), 'utf8')
  const headers: Record<string, string> = { host: host ?? `127.0.0.1:${server.port}`, 'content-type': 'text/plain; charset=utf-8' }
  const match = ifMatch === undefined ? `"${sha256(original)}"` : ifMatch
  if (match !== null) headers['if-match'] = match
  const query = path === null ? '' : `?path=${encodeURIComponent(path)}`
  return new Promise<{ status: number; body: string }>((resolve, reject) => {
    const req = request({ host: '127.0.0.1', port: server.port, path: `/api/file${query}`, method: 'PUT', headers }, (res) => {
      let data = ''
      res.on('data', (c: Buffer) => (data += c.toString()))
      res.on('end', () => resolve({ status: res.statusCode!, body: data }))
    })
    req.on('error', reject)
    req.end(body)
  })
}

beforeEach(async () => {
  tmp = mkdtempSync(join(tmpdir(), 'vce-write-'))
  config = join(tmp, 'config')
  cpSync(FIXTURES, config, { recursive: true })
  mkdirSync(join(tmp, 'ui'))
  writeFileSync(join(tmp, 'ui/index.html'), '<!doctype html>')
  server = await startServer({ fs: await NodeConfigFs.open(config), uiDir: join(tmp, 'ui'), port: 0, strictPort: true })
})

afterEach(async () => {
  await server.close()
  rmSync(tmp, { recursive: true, force: true })
})

describe('PUT /api/file', () => {
  it('écrit le fichier (204), sans laisser de fichier temporaire', async () => {
    expect((await put(FILE, '{"name": "ZONE_URBA"}')).status).toBe(204)
    expect(readFileSync(join(config, FILE), 'utf8')).toBe('{"name": "ZONE_URBA"}')
    expect(readdirSync(join(config, 'cnig_PLU_2017/types')).filter((f) => f.endsWith('.tmp'))).toEqual([])
  })

  it('refuse sans path ni If-Match (400)', async () => {
    expect((await put(null, 'x')).status).toBe(400)
    expect((await put(FILE, 'x', { ifMatch: null })).status).toBe(400)
  })

  it('refuse si le fichier a changé sur disque depuis sa lecture (409)', async () => {
    const r = await put(FILE, 'x', { ifMatch: `"${sha256('autre contenu')}"` })
    expect(r.status).toBe(409)
    expect(r.body).toContain('modifié sur disque')
    expect(readFileSync(join(config, FILE), 'utf8')).not.toBe('x')
  })

  it.each([
    ['hors du dossier', '../secret.json'],
    ['extension non autorisée', 'cnig_PLU_2017/notes.txt'],
    ['fichier inexistant', 'cnig_PLU_2017/types/NOUVEAU.json'],
    ['fichier caché', 'cnig_PLU_2017/.x.json'],
  ])('refuse (403) : %s', async (_label, path) => {
    writeFileSync(join(tmp, 'secret.json'), '{}')
    writeFileSync(join(config, 'cnig_PLU_2017/notes.txt'), 'x')
    expect((await put(path, 'x')).status).toBe(403)
    expect(readFileSync(join(tmp, 'secret.json'), 'utf8')).toBe('{}')
  })

  it('refuse un lien symbolique qui sort du dossier (403)', async () => {
    mkdirSync(join(tmp, 'dehors'))
    writeFileSync(join(tmp, 'dehors/x.json'), '{}')
    symlinkSync(join(tmp, 'dehors'), join(config, 'lien'))
    expect((await put('lien/x.json', 'pirate')).status).toBe(403)
    expect(readFileSync(join(tmp, 'dehors/x.json'), 'utf8')).toBe('{}')
  })

  it('refuse un autre hôte (403)', async () => {
    expect((await put(FILE, 'x', { host: 'evil.example' })).status).toBe(403)
  })

  it('refuse un corps de plus de 10 Mo (413)', async () => {
    expect((await put(FILE, 'x'.repeat(10 * 1024 * 1024 + 1))).status).toBe(413)
  })
})
