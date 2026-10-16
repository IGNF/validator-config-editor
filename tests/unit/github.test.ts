import { describe, expect, it } from 'vitest'
import { KNOWN_CONFIGS, parseRepoUrl, selectRepoRoot, splitRef } from '@core/github'

describe('parseRepoUrl', () => {
  it.each([
    ['https://github.com/IGNF/validator-config-dgpr', { owner: 'IGNF', repo: 'validator-config-dgpr' }],
    ['https://github.com/IGNF/validator-config-dgpr/', { owner: 'IGNF', repo: 'validator-config-dgpr' }],
    ['https://github.com/IGNF/validator-config-dgpr.git', { owner: 'IGNF', repo: 'validator-config-dgpr' }],
    ['github.com/IGNF/validator-config-dgpr', { owner: 'IGNF', repo: 'validator-config-dgpr' }],
    ['  IGNF/validator-config-ppr  ', { owner: 'IGNF', repo: 'validator-config-ppr' }],
    ['https://github.com/IGNF/validator-config-gpu/tree/json-source', { owner: 'IGNF', repo: 'validator-config-gpu', rest: 'json-source' }],
    ['https://github.com/IGNF/validator-config-gpu/tree/feat/x/config', { owner: 'IGNF', repo: 'validator-config-gpu', rest: 'feat/x/config' }],
    ['https://github.com/o/r/tree/main/dossier%20a', { owner: 'o', repo: 'r', rest: 'main/dossier a' }],
  ])('%s', (url, expected) => {
    expect(parseRepoUrl(url)).toEqual(expected)
  })

  it.each(['', 'https://gitlab.com/o/r', 'https://github.com/o', 'pas une url', 'https://github.com/o/r/blob/main/x.json'])('refuse %j', (url) => {
    expect(parseRepoUrl(url)).toBeUndefined()
  })
})

describe('splitRef', () => {
  it('prend le premier segment comme branche sans liste de branches', () => {
    expect(splitRef('main')).toEqual({ branch: 'main' })
    expect(splitRef('main/config/sub')).toEqual({ branch: 'main', path: 'config/sub' })
  })

  it('retient le plus long préfixe qui est une branche (branches avec « / »)', () => {
    expect(splitRef('feat/x/config', ['main', 'feat/x'])).toEqual({ branch: 'feat/x', path: 'config' })
    expect(splitRef('feat/x', ['feat', 'feat/x'])).toEqual({ branch: 'feat/x' })
  })
})

describe('selectRepoRoot', () => {
  const tree = ['README.md', 'package.json', 'config/m/files.json', 'config/m/codes/L.csv', 'config-backup/x.csv', '.github/w.json', 'autre/m2/files.json']

  it('utilise config/ quand il contient un modèle', () => {
    const r = selectRepoRoot(tree)
    expect(r.root).toBe('config/')
    expect([...r.files]).toEqual([['config/m/files.json', 'm/files.json'], ['config/m/codes/L.csv', 'm/codes/L.csv']])
  })

  it('utilise le dossier demandé', () => {
    expect([...selectRepoRoot(tree, '/autre/').files.values()]).toEqual(['m2/files.json'])
  })

  it('utilise la racine sinon, hors dossiers cachés', () => {
    const r = selectRepoRoot(['m/files.json', '.github/x.json', 'node_modules/p/package.json'])
    expect(r.root).toBe('')
    expect([...r.files.values()]).toEqual(['m/files.json'])
  })
})

describe('configurations connues', () => {
  it('liste gpu (json-source), dgpr, naviforest et ppr', () => {
    expect(KNOWN_CONFIGS.map((c) => `${c.repo}${c.branch ? '@' + c.branch : ''}`)).toEqual([
      'validator-config-gpu@json-source', 'validator-config-dgpr', 'validator-config-naviforest', 'validator-config-ppr',
    ])
  })
})
