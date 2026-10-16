import { cpSync, mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { request } from 'node:http'
import { createServer } from 'node:net'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { NodeConfigFs } from '@cli/fs'
import { startServer, type RunningServer } from '@cli/server'
import { FIXTURES } from '../../support/fixtures'

let tmp: string
let server: RunningServer

// Requête brute : fetch impose son propre en-tête Host.
function get(path: string, { method = 'GET', host }: { method?: string; host?: string } = {}) {
  return new Promise<{ status: number; headers: Record<string, unknown>; body: string }>((resolve, reject) => {
    const req = request({ host: '127.0.0.1', port: server.port, path, method, headers: { host: host ?? `127.0.0.1:${server.port}` } }, (res) => {
      let body = ''
      res.on('data', (c: Buffer) => (body += c.toString()))
      res.on('end', () => resolve({ status: res.statusCode!, headers: res.headers, body }))
    })
    req.on('error', reject)
    req.end()
  })
}

beforeEach(async () => {
  tmp = mkdtempSync(join(tmpdir(), 'vce-serve-'))
  cpSync(FIXTURES, join(tmp, 'config'), { recursive: true })
  mkdirSync(join(tmp, 'ui/assets'), { recursive: true })
  writeFileSync(join(tmp, 'ui/index.html'), '<!doctype html><title>vce</title>')
  writeFileSync(join(tmp, 'ui/assets/app.js'), 'console.log(1)')
  writeFileSync(join(tmp, 'secret.txt'), 'secret')
  server = await startServer({ fs: await NodeConfigFs.open(join(tmp, 'config')), uiDir: join(tmp, 'ui'), port: 0, strictPort: true })
})

afterEach(async () => {
  await server.close()
  rmSync(tmp, { recursive: true, force: true })
})

describe('vce serve', () => {
  it('écoute sur 127.0.0.1', () => {
    expect(server.url).toBe(`http://127.0.0.1:${server.port}/`)
  })

  it('GET /api/snapshot renvoie toute la configuration', async () => {
    const r = await get('/api/snapshot')
    expect(r.status).toBe(200)
    expect(r.headers['content-type']).toContain('application/json')
    expect(r.headers['cache-control']).toBe('no-store')
    const doc = JSON.parse(r.body)
    expect(doc.root).toContain('config')
    expect(Object.keys(doc.files)).toContain('cnig_PLU_2017/files.json')
    expect(doc.files['cnig_PLU_2017/codes/ListeEtatPLU.csv']).toMatch(/^ETAT/)
  })

  it('exclut les liens symboliques sortants de l\'instantané', async () => {
    symlinkSync(tmp, join(tmp, 'config/lien'))
    const doc = JSON.parse((await get('/api/snapshot')).body)
    expect(Object.keys(doc.files).some((f) => f.startsWith('lien/'))).toBe(false)
  })

  it('sert l\'interface avec les en-têtes de sécurité', async () => {
    const index = await get('/')
    expect(index.status).toBe(200)
    expect(index.headers['content-type']).toContain('text/html')
    expect(index.headers['content-security-policy']).toContain("default-src 'self'")
    expect(index.headers['x-content-type-options']).toBe('nosniff')
    const js = await get('/assets/app.js')
    expect(js.status).toBe(200)
    expect(js.headers['content-type']).toContain('text/javascript')
  })

  it('accepte localhost comme hôte', async () => {
    expect((await get('/', { host: `localhost:${server.port}` })).status).toBe(200)
  })

  it.each(['evil.example:80', `127.0.0.1:${1}`, 'evil.example'])('refuse l\'hôte %s (403)', async (host) => {
    expect((await get('/api/snapshot', { host })).status).toBe(403)
  })

  it.each(['POST', 'PUT', 'DELETE'])('refuse la méthode %s (405)', async (method) => {
    expect((await get('/api/snapshot', { method })).status).toBe(405)
  })

  it.each(['/inconnu.js', '/../secret.txt', '/%2e%2e/secret.txt', '/assets/../../secret.txt'])('renvoie 404 pour %s', async (path) => {
    const r = await get(path)
    expect(r.status).toBe(404)
    expect(r.body).not.toContain('secret')
  })

  it('essaie le port suivant si le port est pris, sauf --port', async () => {
    const blocker = createServer()
    await new Promise<void>((resolve) => blocker.listen(0, '127.0.0.1', resolve))
    const busy = (blocker.address() as { port: number }).port
    const fs = await NodeConfigFs.open(join(tmp, 'config'))
    const next = await startServer({ fs, uiDir: join(tmp, 'ui'), port: busy, strictPort: false })
    expect(next.port).toBeGreaterThan(busy)
    await next.close()
    await expect(startServer({ fs, uiDir: join(tmp, 'ui'), port: busy, strictPort: true })).rejects.toThrow()
    blocker.close()
  })
})
