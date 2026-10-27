import type { ConfigSource } from './source'

/** Site en lecture seule produit par `vce site` (feature 013, plan R2) : instantané statique, sans écriture. */
export class SiteSource implements ConfigSource {
  readonly kind = 'site'
  label = ''
  /** Version de l'éditeur qui a produit le site. */
  version = ''

  async load(): Promise<Map<string, string>> {
    const response = await fetch('api/snapshot.json', { cache: 'no-store' })
    if (!response.ok) throw new Error(`Lecture de la configuration impossible (HTTP ${response.status}).`)
    const data = (await response.json()) as { root: string; files: Record<string, string>; version?: string }
    this.label = data.root
    this.version = data.version ?? ''
    return new Map(Object.entries(data.files))
  }
}

/** Interface servie comme site (balise posée par `vce site`). */
export const isSite = () => document.querySelector('meta[name="vce-mode"]')?.getAttribute('content') === 'site'
