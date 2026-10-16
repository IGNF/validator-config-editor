import type { ConfigSource, SaveResult } from './source'

async function sha256(text: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

/** Configuration servie par `vce serve` : lecture (GET /api/snapshot) et écriture (PUT /api/file). */
export class ServerSource implements ConfigSource {
  readonly kind = 'server'
  label = ''

  async load(): Promise<Map<string, string>> {
    const response = await fetch('api/snapshot', { cache: 'no-store' })
    if (!response.ok) throw new Error(`Lecture de la configuration impossible (HTTP ${response.status}).`)
    const data = (await response.json()) as { root: string; files: Record<string, string> }
    this.label = data.root
    return new Map(Object.entries(data.files))
  }

  /** Écrit chaque fichier modifié, refusé si le fichier a changé sur disque depuis sa lecture. */
  async save(changes: Map<string, string>, originals: ReadonlyMap<string, string>): Promise<SaveResult[]> {
    const results: SaveResult[] = []
    for (const [path, text] of changes) {
      try {
        const response = await fetch(`api/file?path=${encodeURIComponent(path)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'text/plain; charset=utf-8', 'If-Match': `"${await sha256(originals.get(path) ?? '')}"` },
          body: text,
        })
        if (response.status === 204) results.push({ path, ok: true })
        else {
          const reason = response.status === 409 ? 'conflict' : response.status === 403 ? 'forbidden' : 'error'
          results.push({ path, ok: false, reason, message: await response.text() })
        }
      } catch (e) {
        results.push({ path, ok: false, reason: 'error', message: e instanceof Error ? e.message : String(e) })
      }
    }
    return results
  }
}
