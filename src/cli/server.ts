import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http'
import { extname, join, normalize, sep } from 'node:path'
import type { NodeConfigFs } from './fs'

export interface ServeOptions {
  fs: NodeConfigFs
  /** Dossier de l'interface construite (dist/ui). */
  uiDir: string
  port: number
  /** Port imposé par --port : pas d'essai des ports suivants. */
  strictPort: boolean
}

export interface RunningServer {
  url: string
  port: number
  close: () => Promise<void>
}

const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
}

const SECURITY_HEADERS = {
  'Content-Security-Policy': "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://api.github.com https://raw.githubusercontent.com",
  'X-Content-Type-Options': 'nosniff',
}

function send(res: ServerResponse, status: number, body: string | Buffer, type = 'text/plain; charset=utf-8', extra: Record<string, string> = {}) {
  res.writeHead(status, { 'Content-Type': type, ...SECURITY_HEADERS, ...extra })
  res.end(body)
}

/** Instantané de la configuration (contrat cli.md, GET /api/snapshot). */
export async function snapshot(fs: NodeConfigFs): Promise<{ root: string; files: Record<string, string> }> {
  const paths = await fs.listFiles()
  const texts = await Promise.all(paths.map((p) => fs.readText(p)))
  return { root: fs.root, files: Object.fromEntries(paths.map((p, i) => [p, texts[i]!])) }
}

const MAX_BODY = 10 * 1024 * 1024

export const sha256 = (text: string) => createHash('sha256').update(text, 'utf8').digest('hex')

function readBody(req: IncomingMessage): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    // Au-delà de la limite, la suite est lue sans être gardée, pour pouvoir répondre 413.
    const chunks: Buffer[] = []
    let size = 0
    req.on('data', (c: Buffer) => {
      size += c.length
      if (size <= MAX_BODY) chunks.push(c)
    })
    req.on('end', () => resolve(size > MAX_BODY ? undefined : Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

/** PUT /api/file (contrat source-et-ecriture, plan 002 R8). */
async function writeFileRequest(options: ServeOptions, url: URL, req: IncomingMessage, res: ServerResponse) {
  const path = url.searchParams.get('path')
  const create = req.headers['if-none-match'] === '*'
  const expected = /^"?([0-9a-f]{64})"?$/.exec(req.headers['if-match'] ?? '')?.[1]
  if (!path || (!expected && !create)) return send(res, 400, 'Paramètre path ou en-tête If-Match (ou If-None-Match: *) manquant')
  if (!/\.(json|csv)$/i.test(path) || path.split('/').some((s) => s === '..' || s === '' || s.startsWith('.'))) {
    return send(res, 403, 'Fichier non modifiable')
  }
  if (create) {
    if ((await options.fs.readText(path).catch(() => undefined)) !== undefined) return send(res, 412, 'Le fichier existe déjà')
    const body = await readBody(req)
    if (body === undefined) return send(res, 413, 'Fichier trop volumineux')
    try {
      await options.fs.createText(path, body)
    } catch (e) {
      const exists = (e as NodeJS.ErrnoException).code === 'EEXIST'
      return send(res, exists ? 412 : 403, exists ? 'Le fichier existe déjà' : 'Création non autorisée')
    }
    res.writeHead(201, { ...SECURITY_HEADERS })
    return res.end()
  }
  const current = await options.fs.readText(path).catch(() => undefined)
  if (current === undefined) return send(res, 403, 'Fichier inexistant ou hors de la configuration')
  if (sha256(current) !== expected) return send(res, 409, 'Le fichier a été modifié sur disque depuis sa lecture')
  const body = await readBody(req)
  if (body === undefined) return send(res, 413, 'Fichier trop volumineux')
  await options.fs.writeText(path, body)
  res.writeHead(204, { ...SECURITY_HEADERS })
  res.end()
}

function handler(options: ServeOptions, port: () => number) {
  const uiRoot = normalize(options.uiDir + sep)
  return async (req: IncomingMessage, res: ServerResponse) => {
    try {
      // Anti DNS rebinding : seul l'hôte local est accepté (plan R6).
      const host = req.headers.host
      if (host !== `127.0.0.1:${port()}` && host !== `localhost:${port()}`) return send(res, 403, 'Hôte refusé')
      const url = new URL(req.url ?? '/', 'http://localhost')
      const path = decodeURIComponent(url.pathname)
      if (req.method === 'PUT' && path === '/api/file') return await writeFileRequest(options, url, req, res)
      if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, 'Méthode non autorisée', undefined, { Allow: 'GET, HEAD' })
      if (path === '/api/snapshot') {
        return send(res, 200, JSON.stringify(await snapshot(options.fs)), TYPES['.json'], { 'Cache-Control': 'no-store' })
      }
      const file = normalize(join(uiRoot, path === '/' ? 'index.html' : path))
      if (!file.startsWith(uiRoot)) return send(res, 404, 'Introuvable')
      const body = await readFile(file).catch(() => undefined)
      if (!body) return send(res, 404, 'Introuvable')
      return send(res, 200, body, TYPES[extname(file)] ?? 'application/octet-stream')
    } catch (e) {
      return send(res, 500, `Erreur : ${e instanceof Error ? e.message : String(e)}`)
    }
  }
}

function listen(server: Server, port: number): Promise<number> {
  return new Promise((resolve, reject) => {
    const onError = (e: Error) => {
      server.off('listening', onListening)
      reject(e)
    }
    const onListening = () => {
      server.off('error', onError)
      const address = server.address()
      resolve(typeof address === 'object' && address ? address.port : port)
    }
    server.once('error', onError)
    server.once('listening', onListening)
    server.listen(port, '127.0.0.1')
  })
}

/** Démarre le serveur sur 127.0.0.1 ; essaie les 10 ports suivants si le port est pris. */
export async function startServer(options: ServeOptions): Promise<RunningServer> {
  let actual = options.port
  const server = createServer(handler(options, () => actual))
  const attempts = options.strictPort ? 1 : 10
  for (let i = 0; ; i++) {
    try {
      actual = await listen(server, options.port + i)
      break
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== 'EADDRINUSE' || i + 1 >= attempts) throw e
    }
  }
  return {
    url: `http://127.0.0.1:${actual}/`,
    port: actual,
    close: () => new Promise((resolve) => server.close(() => resolve())),
  }
}
