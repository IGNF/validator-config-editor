import { spawn, type ChildProcess } from 'node:child_process'
import { cpSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const ROOT = join(import.meta.dirname, '../../..')

export interface TempServer {
  dir: string
  url: string
  stop: () => void
}

/** Copie les fixtures dans un dossier temporaire et y lance `vce serve` sur un port libre. */
export async function serveCopy(): Promise<TempServer> {
  const tmp = mkdtempSync(join(tmpdir(), 'vce-e2e-'))
  const dir = join(tmp, 'config')
  cpSync(join(ROOT, 'tests/fixtures/config'), dir, { recursive: true })
  const child: ChildProcess = spawn('node', [join(ROOT, 'bin/vce.js'), 'serve', dir, '--port', '0'], { stdio: ['ignore', 'pipe', 'inherit'] })
  const url = await new Promise<string>((resolve, reject) => {
    let out = ''
    child.stdout!.on('data', (chunk: Buffer) => {
      out += chunk.toString()
      const m = /disponible sur (\S+)/.exec(out)
      if (m) resolve(m[1]!)
    })
    child.on('exit', (code) => reject(new Error(`vce serve arrêté (${code})`)))
  })
  return {
    dir,
    url,
    stop: () => {
      child.kill()
      rmSync(tmp, { recursive: true, force: true })
    },
  }
}
