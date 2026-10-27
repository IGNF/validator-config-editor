import { describe, expect, it } from 'vitest'
import { applyToEquivalents, baseTableName, COMPARED, differingProperties, findEquivalents, type Source } from '@core/equivalents'
import { applyChanges, dataOf, edit, openSession, textOf, undoEdit, type Session } from '@core/edit/session'
import { setAt } from '@core/edit/pointer'
import { readConfig } from '../support/fixtures'

// Feature 006, US1. Fixtures : cnig_SUP_A1_2016 copié en cnig_SUP_A2_2016 (préfixe de table A2_)
// et en cnig_SUP_A3_2016 (sans GESTIONNAIRE_SUP) ; cnig_PLU_2017 est hors famille.
const A1 = 'cnig_SUP_A1_2016'
const GEST = (m: string) => `${m}/types/GESTIONNAIRE_SUP.json`

async function session(edit: (files: Map<string, string>) => void = () => {}): Promise<Session> {
  const files = readConfig()
  for (const [path, text] of [...files]) {
    if (!path.startsWith(`${A1}/`)) continue
    for (const to of ['cnig_SUP_A2_2016', 'cnig_SUP_A3_2016']) {
      const suffix = to.split('_')[2]!
      files.set(path.replace(A1, to).replace('/A1_', `/${suffix}_`), text.replaceAll('A1_', `${suffix}_`).replaceAll('_A1', `_${suffix}`))
    }
  }
  files.delete(GEST('cnig_SUP_A3_2016'))
  edit(files)
  return openSession(files)
}

const columnIndex = (s: Session, file: string, name: string) =>
  (dataOf(s, file) as { columns: { name: string }[] }).columns.findIndex((c) => c.name === name)
const source = (s: Session, file: string, name: string): Source => ({ kind: 'column', file, pointer: `/columns/${columnIndex(s, file, name)}` })

describe('baseTableName', () => {
  it('retire le préfixe égal à un segment du nom du modèle', () => {
    expect(baseTableName('cnig_SUP_A1_2016', 'A1_ASSIETTE_SUP_S')).toBe('ASSIETTE_SUP_S')
    expect(baseTableName('cnig_SUP_AC4bis_2016', 'AC4bis_GENERATEUR_SUP_P')).toBe('GENERATEUR_SUP_P')
  })

  it('garde les autres noms', () => {
    expect(baseTableName('cnig_PLU_2017', 'ZONE_URBA')).toBe('ZONE_URBA')
    expect(baseTableName('cnig_SUP_A1_2016', 'SERVITUDE')).toBe('SERVITUDE')
    expect(baseTableName('cnig_SUP_A1_2016', 'A2_ASSIETTE_SUP_S')).toBe('A2_ASSIETTE_SUP_S')
  })
})

describe('findEquivalents (colonne)', () => {
  it('colonne de même nom dans les tables équivalentes de la famille ; modèles absents', async () => {
    const s = await session()
    const found = findEquivalents(s, source(s, GEST(A1), 'NOMGEST'), 'family')
    expect(found.items.map((e) => [e.model, e.file, e.editable])).toEqual([['cnig_SUP_A2_2016', GEST('cnig_SUP_A2_2016'), true]])
    expect(found.items[0]!.pointer).toBe(`/columns/${columnIndex(s, GEST(A1), 'NOMGEST')}`)
    expect(found.absent).toEqual(['cnig_SUP_A3_2016'])
  })

  it('tables à préfixe du modèle : A1_ASSIETTE_SUP_S ↔ A2_ASSIETTE_SUP_S', async () => {
    const s = await session()
    const file = `${A1}/types/A1_ASSIETTE_SUP_S.json`
    const found = findEquivalents(s, source(s, file, 'IDASS'), 'family')
    expect(found.items.map((e) => e.file)).toEqual(['cnig_SUP_A2_2016/types/A2_ASSIETTE_SUP_S.json', 'cnig_SUP_A3_2016/types/A3_ASSIETTE_SUP_S.json'])
  })

  it('toute la configuration : modèles hors famille compris', async () => {
    const s = await session()
    const found = findEquivalents(s, source(s, GEST(A1), 'NOMGEST'), 'all')
    expect(found.absent).toContain('cnig_PLU_2017')
    expect(found.absent).not.toContain(A1)
  })

  it('table non conforme : non modifiable', async () => {
    const s = await session((f) => {
      const t = JSON.parse(f.get(GEST('cnig_SUP_A2_2016'))!)
      t.columns[0].type = 'Texte'
      f.set(GEST('cnig_SUP_A2_2016'), JSON.stringify(t, null, 4))
    })
    expect(findEquivalents(s, source(s, GEST(A1), 'NOMGEST'), 'family').items[0]!.editable).toBe(false)
  })

  it('modifications de la session prises en compte', async () => {
    let s = await session()
    const i = columnIndex(s, GEST('cnig_SUP_A2_2016'), 'NOMGEST')
    s = edit(s, GEST('cnig_SUP_A2_2016'), (d) => setAt(d, `/columns/${i}/constraints/maxLength`, 33))
    const [item] = findEquivalents(s, source(s, GEST(A1), 'NOMGEST'), 'family').items
    expect((item!.data as { constraints: { maxLength: number } }).constraints.maxLength).toBe(33)
  })
})

describe('applyToEquivalents', () => {
  it('recopie seulement la propriété, en une étape annulable, une ligne de diff par fichier', async () => {
    let s = await session()
    const src = source(s, GEST(A1), 'NOMGEST')
    s = edit(s, GEST(A1), (d) => setAt(d, `${src.pointer}/constraints/maxLength`, 120))
    const targets = findEquivalents(s, src, 'family').items
    const before = textOf(s, GEST('cnig_SUP_A2_2016'))!
    const after = applyChanges(s, applyToEquivalents(s, src, targets, '/constraints/maxLength'))
    const text = textOf(after, GEST('cnig_SUP_A2_2016'))!
    const diff = text.split('\n').filter((line, i) => line !== before.split('\n')[i])
    expect(diff).toEqual([expect.stringContaining('"maxLength": 120')])
    // Une seule étape : l'annulation rend le texte d'origine.
    expect(textOf(undoEdit(after), GEST('cnig_SUP_A2_2016'))).toBe(before)
  })

  it('propriété absente de la source : retirée des cibles', async () => {
    let s = await session()
    const src = source(s, GEST(A1), 'NOMGEST')
    s = edit(s, GEST(A1), (d) => setAt(d, `${src.pointer}/constraints/pattern`, '[A-Z]+'))
    const targets = findEquivalents(s, src, 'family').items
    s = applyChanges(s, applyToEquivalents(s, src, targets, '/constraints/pattern'))
    expect(JSON.stringify(dataOf(s, GEST('cnig_SUP_A2_2016')))).toContain('[A-Z]+')
    s = edit(s, GEST(A1), (d) => setAt(d, `${src.pointer}/constraints/pattern`, undefined))
    s = applyChanges(s, applyToEquivalents(s, src, targets, '/constraints/pattern'))
    expect(JSON.stringify(dataOf(s, GEST('cnig_SUP_A2_2016')))).not.toContain('[A-Z]+')
  })

  it('cibles non modifiables ignorées ; id inchangés', async () => {
    const s = await session()
    const src = source(s, GEST(A1), 'NOMGEST')
    const [target] = findEquivalents(s, src, 'family').items
    expect(applyToEquivalents(s, src, [{ ...target!, editable: false }], '/type')).toEqual([])
    const after = applyChanges(s, applyToEquivalents(s, src, [target!], '/constraints/maxLength'))
    const data = dataOf(after, GEST('cnig_SUP_A2_2016')) as { id: string; columns: { id: string }[] }
    const original = dataOf(s, GEST('cnig_SUP_A2_2016')) as typeof data
    expect(data.id).toBe(original.id)
    expect(data.columns.map((c) => c.id)).toEqual(original.columns.map((c) => c.id))
  })

  it('plusieurs cibles d\'un même fichier : un seul changement', async () => {
    const s = await session()
    const src = source(s, GEST(A1), 'NOMGEST')
    const [target] = findEquivalents(s, src, 'family').items
    const other = { ...target!, pointer: `/columns/${columnIndex(s, GEST('cnig_SUP_A2_2016'), 'NUMTEL')}` }
    expect(applyToEquivalents(s, src, [target!, other], '/constraints/maxLength')).toHaveLength(1)
  })
})

describe('differingProperties (US3)', () => {
  it('propriétés principales qui diffèrent ; absent, vide et null équivalents', () => {
    const a = { type: 'String', constraints: { maxLength: 80, pattern: '[A-Z]+', enum: [] } }
    const b = { type: 'String', constraints: { maxLength: 120, required: false } }
    expect(differingProperties(a, b, COMPARED.column)).toEqual(['/constraints/required', '/constraints/maxLength', '/constraints/pattern'])
    expect(differingProperties(a, a, COMPARED.column)).toEqual([])
  })

  it('sur les équivalents réels : valeur divergente repérée', async () => {
    let s = await session()
    const i = columnIndex(s, GEST('cnig_SUP_A2_2016'), 'NOMGEST')
    s = edit(s, GEST('cnig_SUP_A2_2016'), (d) => setAt(d, `/columns/${i}/constraints/maxLength`, 33))
    const src = source(s, GEST(A1), 'NOMGEST')
    const [a2, a3] = findEquivalents(s, src, 'family').items
    const data = dataOf(s, GEST(A1)) as { columns: unknown[] }
    expect(differingProperties(data.columns[columnIndex(s, GEST(A1), 'NOMGEST')], a2!.data, COMPARED.column)).toEqual(['/constraints/maxLength'])
    expect(a3).toBeUndefined()
  })
})

// T005, SC-003 : configuration complète.
describe.skipIf(!process.env.VCE_CONFIG_DIR)('configuration complète (VCE_CONFIG_DIR)', () => {
  it('NOMGEST de cnig_SUP_A1_2016 : 122 équivalents dans cnig_SUP, recherche et application < 1 s', async () => {
    const opened = await openSession(readConfig(process.env.VCE_CONFIG_DIR))
    const src = source(opened, GEST(A1), 'NOMGEST')
    const s = edit(opened, GEST(A1), (d) => setAt(d, `${src.pointer}/constraints/maxLength`, 99))
    let t = performance.now()
    const found = findEquivalents(s, src, 'family')
    expect(performance.now() - t).toBeLessThan(1000)
    expect(found.items).toHaveLength(122)
    expect(found.absent).toEqual([])
    expect(findEquivalents(s, src, 'all').items).toHaveLength(122)
    t = performance.now()
    const after = applyChanges(s, applyToEquivalents(s, src, found.items, '/constraints/maxLength'))
    expect(performance.now() - t).toBeLessThan(1000)
    // Une étape pour la source, une seule pour les 122 équivalents.
    expect(after.history.past.length).toBe(2)
    expect(after.edited.size).toBe(123)
  })
})
