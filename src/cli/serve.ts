import { spawn } from 'node:child_process'
import { stat } from 'node:fs/promises'
import { join } from 'node:path'
import type { Output } from './check'
import { NodeConfigFs } from './fs'
import { startServer, type RunningServer } from './server'

export interface ServeCliOptions {
  port?: number
  open: boolean
  uiDir: string
}

function openBrowser(url: string) {
  const [command, args] =
    process.platform === 'darwin' ? ['open', [url]] : process.platform === 'win32' ? ['cmd', ['/c', 'start', '', url]] : ['xdg-open', [url]]
  spawn(command as string, args as string[], { detached: true, stdio: 'ignore' }).on('error', () => {}).unref()
}

/** `vce serve` (contrat cli.md) : code de sortie en cas d'échec, serveur démarré sinon. */
export async function runServe(dir: string, options: ServeCliOptions, out: Output): Promise<number | RunningServer> {
  if (!(await stat(dir).then((s) => s.isDirectory(), () => false))) {
    out.error(`Dossier introuvable : ${dir}`)
    return 2
  }
  if (!(await stat(join(options.uiDir, 'index.html')).then(() => true, () => false))) {
    out.error(`Interface introuvable dans ${options.uiDir} : lancer « npm run build ».`)
    return 2
  }
  const fs = await NodeConfigFs.open(dir)
  let server: RunningServer
  try {
    server = await startServer({ fs, uiDir: options.uiDir, port: options.port ?? 5174, strictPort: options.port !== undefined })
  } catch (e) {
    out.error(`Impossible de démarrer le serveur : ${e instanceof Error ? e.message : String(e)}`)
    return 2
  }
  out.log(`Éditeur disponible sur ${server.url} (Ctrl+C pour arrêter)`)
  out.log(`Configuration : ${fs.root}`)
  if (options.open) openBrowser(server.url)
  return server
}
