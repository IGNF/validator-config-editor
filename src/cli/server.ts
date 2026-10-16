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
  'Content-Security-Policy': "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:",
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

function handler(options: ServeOptions, port: () => number) {
  const uiRoot = normalize(options.uiDir + sep)
  return async (req: IncomingMessage, res: ServerResponse) => {
    try {
      // Anti DNS rebinding : seul l'hôte local est accepté (plan R6).
      const host = req.headers.host
      if (host !== `127.0.0.1:${port()}` && host !== `localhost:${port()}`) return send(res, 403, 'Hôte refusé')
      if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, 'Méthode non autorisée', undefined, { Allow: 'GET, HEAD' })
      const path = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname)
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
