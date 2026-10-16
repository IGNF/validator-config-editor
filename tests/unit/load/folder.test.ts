import { describe, expect, it } from 'vitest'
import { selectFolder } from '@core/load/folder'

describe('selectFolder', () => {
  it('utilise le dossier choisi quand il contient les modèles', () => {
    const s = selectFolder(['config/m/files.json', 'config/m/types/T.json', 'config/m/codes/L.csv', 'config/m/notes.txt'])
    expect(s.root).toBe('config/')
    expect([...s.files.values()]).toEqual(['m/files.json', 'm/types/T.json', 'm/codes/L.csv'])
  })

  it('utilise config/ quand le dossier choisi est un dépôt de configuration', () => {
    const s = selectFolder(['depot/package.json', 'depot/config/m/files.json', 'depot/config/m/gpu.json', 'depot/config-backup/x.csv'])
    expect(s.root).toBe('depot/config/')
    expect([...s.files.entries()]).toEqual([['depot/config/m/files.json', 'm/files.json'], ['depot/config/m/gpu.json', 'm/gpu.json']])
  })

  it('ignore les dossiers cachés et node_modules', () => {
    const s = selectFolder(['d/m/files.json', 'd/.git/x.json', 'd/node_modules/p/package.json', 'd/m/.cache/y.csv'])
    expect([...s.files.values()]).toEqual(['m/files.json'])
  })

  it('accepte un dossier vide', () => {
    expect(selectFolder([])).toEqual({ root: '/', files: new Map() })
  })
})
