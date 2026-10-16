import { describe, expect, it } from 'vitest'
import { GitHubError, GitHubSource } from '@ui/io/github'
import { asRepo, fakeFetch, fakeGitHub } from '../../support/github-fake'
import { readConfig } from '../../support/fixtures'

const config = readConfig()
const repo = () => ({
  'IGNF/validator-config-test': {
    defaultBranch: 'main',
    branches: {
      main: asRepo(config),
      'feat/x': asRepo(config, 'autre/'),
    },
  },
})

const api = (calls: string[]) => calls.filter((c) => c.startsWith('https://api.github.com'))

describe('GitHubSource', () => {
  it('ouvre la branche par défaut et config/ en 3 requêtes à l\'API, contenus au commit', async () => {
    const fake = fakeGitHub(repo())
    const source = new GitHubSource({ owner: 'IGNF', repo: 'validator-config-test' }, fakeFetch(fake))
    const progress: number[] = []
    const files = await source.load((done) => progress.push(done))
    expect([...files.keys()].sort()).toEqual([...config.keys()].filter((p) => /\.(json|csv)$/.test(p)).sort())
    expect(files.get('cnig_PLU_2017/files.json')).toBe(config.get('cnig_PLU_2017/files.json'))
    expect(api(fake.calls)).toHaveLength(3)
    expect(fake.calls.filter((c) => c.startsWith('https://raw.githubusercontent.com')).every((c) => c.includes('/commit-main/'))).toBe(true)
    expect(progress.at(-1)).toBe(files.size)
    expect(source).toMatchObject({ branch: 'main', commit: 'commit-main', path: 'config', label: 'IGNF/validator-config-test · main · config', archiveName: 'validator-config-test' })
  })

  it('ouvre une branche donnée en 2 requêtes', async () => {
    const fake = fakeGitHub(repo())
    await new GitHubSource({ owner: 'IGNF', repo: 'validator-config-test', branch: 'main' }, fakeFetch(fake)).load()
    expect(api(fake.calls)).toHaveLength(2)
  })

  it('résout une branche contenant « / » et un dossier depuis /tree/…', async () => {
    const fake = fakeGitHub(repo())
    const source = new GitHubSource({ owner: 'IGNF', repo: 'validator-config-test', rest: 'feat/x/autre' }, fakeFetch(fake))
    const files = await source.load()
    expect(source).toMatchObject({ branch: 'feat/x', path: 'autre' })
    expect(files.has('cnig_PLU_2017/files.json')).toBe(true)
  })

  it.each([
    ['dépôt introuvable ou privé', { owner: 'IGNF', repo: 'inconnu' }, 'Dépôt IGNF/inconnu introuvable ou privé.'],
    ['branche introuvable', { owner: 'IGNF', repo: 'validator-config-test', branch: 'absente' }, 'Branche « absente » introuvable'],
  ])('erreur explicite : %s', async (_label, spec, message) => {
    const source = new GitHubSource(spec, fakeFetch(fakeGitHub(repo())))
    await expect(source.load()).rejects.toThrow(GitHubError)
    await expect(source.load()).rejects.toThrow(message)
  })

  it('erreur explicite : limite de requêtes atteinte, avec l\'heure de nouvel essai', async () => {
    const fake = fakeGitHub(repo())
    fake.rateLimitResetAt = Date.UTC(2026, 9, 16, 14, 30) / 1000
    const expected = new Date(fake.rateLimitResetAt * 1000).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    await expect(new GitHubSource({ owner: 'IGNF', repo: 'validator-config-test' }, fakeFetch(fake)).load()).rejects.toThrow(`Réessayer après ${expected}`)
  })

  it('erreur explicite : arbre tronqué', async () => {
    const fake = fakeGitHub(repo())
    fake.truncated = true
    await expect(new GitHubSource({ owner: 'IGNF', repo: 'validator-config-test' }, fakeFetch(fake)).load()).rejects.toThrow('trop volumineux')
  })

  it('erreur explicite : réseau', async () => {
    const source = new GitHubSource({ owner: 'IGNF', repo: 'validator-config-test' }, async () => { throw new TypeError('Failed to fetch') })
    await expect(source.load()).rejects.toThrow('Impossible de joindre GitHub')
  })

  it('liste les branches', async () => {
    expect(await new GitHubSource({ owner: 'IGNF', repo: 'validator-config-test' }, fakeFetch(fakeGitHub(repo()))).branches()).toEqual(['main', 'feat/x'])
  })
})

describe('branche introuvable', () => {
  it('propose la branche par défaut', async () => {
    const source = new GitHubSource({ owner: 'IGNF', repo: 'validator-config-test', branch: 'absente', path: 'config' }, fakeFetch(fakeGitHub(repo())))
    const error = await source.load().catch((e: unknown) => e)
    expect(error).toBeInstanceOf(GitHubError)
    expect((error as GitHubError).suggestion).toEqual({
      label: 'Ouvrir la branche par défaut (main)',
      spec: { owner: 'IGNF', repo: 'validator-config-test', branch: 'main', path: 'config' },
    })
  })
})
