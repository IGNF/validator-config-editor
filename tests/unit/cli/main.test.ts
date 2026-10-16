import { afterEach, describe, expect, it, vi } from 'vitest'
import pkg from '../../../package.json' with { type: 'json' }
import { main } from '@cli/main'

describe('vce', () => {
  afterEach(() => vi.restoreAllMocks())

  it('--version affiche la version du paquet', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    expect(main(['--version'])).toBe(0)
    expect(log).toHaveBeenCalledWith(pkg.version)
  })

  it('--help affiche l\'usage', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    expect(main(['--help'])).toBe(0)
    expect(log.mock.calls[0]?.[0]).toContain('vce check <dossier>')
  })

  it('une commande inconnue sort avec le code 2', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(main(['inconnue'])).toBe(2)
    expect(error.mock.calls[0]?.[0]).toContain('Commande inconnue')
  })
})
