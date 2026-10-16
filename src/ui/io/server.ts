import type { ConfigSource } from './source'

/** Configuration servie par `vce serve` (GET /api/snapshot). */
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
}
