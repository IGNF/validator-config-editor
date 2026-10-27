import { describe, expect, it } from 'vitest'
import { checkColumns, checkNewName, codeLists, copyCodeList, createCodeList, defaultCopyName, listNameOf, renameCodeList, type CodeListRef } from '@core/edit/codelists'
import { applyChanges, dataOf, isChanged, openSession, textOf, undoEdit, type Session } from '@core/edit/session'
import { editJson, readConfig } from '../../support/fixtures'

const PLU = 'cnig_PLU_2017'
const MEC = 'GPU_MEC_2025'
const ETAT = `${PLU}/codes/ListeEtatPLU.csv`
const fixed = (bytes: Uint8Array) => bytes.fill(7)

const listOf = (s: Session, model: string, name: string) => codeLists(s).find((l) => l.model === model && l.name === name)!
const codesOf = (s: Session, model: string) => (dataOf(s, `${model}/files.json`) as { codes: Record<string, string>[] }).codes

describe('codeLists', () => {
  it('listes CSV déclarées et lisibles, triées par modèle puis par nom', async () => {
    const s = await openSession(readConfig())
    const lists = codeLists(s)
    expect(lists.length).toBeGreaterThan(5)
    expect(lists.map((l) => `${l.model}/${l.name}`)).toEqual([...lists.map((l) => `${l.model}/${l.name}`)].sort())
    expect(listOf(s, PLU, 'PrescriptionUrbaType')).toMatchObject({
      path: `${PLU}/codes/PrescriptionUrbaType.csv`,
      columns: ['TYPEPSC', 'STYPEPSC', 'LIBELLE', 'REFLOI', 'REFREGLE'],
    })
    expect(listOf(s, PLU, 'ListeEtatPLU').rows).toBeGreaterThan(0)
  })

  it('exclut les listes par URL et les CSV illisibles', async () => {
    const files = readConfig()
    editJson(files, `${PLU}/files.json`, (d) => d.codes.push({ data: 'https://example.org/l.csv', name: 'Distante' }))
    files.set(ETAT, 'ETAT\n"01\n')
    const names = codeLists(await openSession(files)).filter((l) => l.model === PLU).map((l) => l.name)
    expect(names).not.toContain('Distante')
    expect(names).not.toContain('ListeEtatPLU')
  })
})

describe('checkNewName', () => {
  it('accepte un nom libre', async () => {
    expect(checkNewName(await openSession(readConfig()), MEC, 'ListeEtatPLU')).toBeUndefined()
  })

  it('refuse un nom invalide, déjà déclaré, ou dont le fichier existe', async () => {
    const files = readConfig()
    files.set(`${MEC}/codes/Orpheline.csv`, 'A\n1\n')
    const s = await openSession(files)
    for (const name of ['', 'a b', 'a/b', 'é']) expect(checkNewName(s, MEC, name)).toMatch(/Nom invalide/)
    expect(checkNewName(s, PLU, 'ListeEtatPLU')).toMatch(/déjà déclarée/)
    expect(checkNewName(s, MEC, 'Orpheline')).toMatch(/existe déjà.*Déclarer une liste/)
  })

  it('refuse un dossier sans files.json', async () => {
    const files = readConfig()
    files.set('orphelin/notes.json', '{}')
    expect(checkNewName(await openSession(files), 'orphelin', 'L')).toMatch(/files\.json/)
  })
})

describe('defaultCopyName', () => {
  it('même nom vers un autre modèle ; suffixe _COPIE dans le même modèle', async () => {
    const s = await openSession(readConfig())
    const etat = listOf(s, PLU, 'ListeEtatPLU')
    expect(defaultCopyName(s, etat, MEC)).toBe('ListeEtatPLU')
    expect(defaultCopyName(s, etat, PLU)).toBe('ListeEtatPLU_COPIE')
    const again = applyChanges(s, copyCodeList(s, etat, PLU, 'ListeEtatPLU_COPIE'))
    expect(defaultCopyName(again, etat, PLU)).toBe('ListeEtatPLU_COPIE_2')
  })
})

describe('copyCodeList', () => {
  it('copie le texte exact et déclare la liste (titre d\'origine, nouvel id), sans nouveau problème', async () => {
    const files = readConfig()
    const s = await openSession(files)
    const etat: CodeListRef = listOf(s, PLU, 'ListeEtatPLU')
    const after = applyChanges(s, copyCodeList(s, etat, MEC, 'ListeEtatPLU', fixed))
    expect(textOf(after, `${MEC}/codes/ListeEtatPLU.csv`)).toBe(files.get(ETAT))
    const source = codesOf(s, PLU).find((c) => c.name === 'ListeEtatPLU')!
    expect(codesOf(after, MEC).at(-1)).toEqual({ data: './codes/ListeEtatPLU.csv', id: '07'.repeat(16), name: 'ListeEtatPLU', title: source.title })
    expect(after.result.problems).toEqual([])
    expect(after.history.past).toHaveLength(1)
  })

  it('une annulation retire le fichier et la déclaration', async () => {
    const s = await openSession(readConfig())
    const after = applyChanges(s, copyCodeList(s, listOf(s, PLU, 'ListeEtatPLU'), MEC, 'ListeEtatPLU'))
    const undone = undoEdit(after)
    expect(textOf(undone, `${MEC}/codes/ListeEtatPLU.csv`)).toBeUndefined()
    expect(codesOf(undone, MEC)).toEqual(codesOf(s, MEC))
    expect(isChanged(undone, `${MEC}/files.json`)).toBe(false)
  })

  it('duplique dans le même modèle sous un autre nom', async () => {
    const s = await openSession(readConfig())
    const after = applyChanges(s, copyCodeList(s, listOf(s, PLU, 'ListeEtatPLU'), PLU, 'ListeEtatPLU_COPIE'))
    expect(textOf(after, `${PLU}/codes/ListeEtatPLU_COPIE.csv`)).toBe(textOf(s, ETAT))
    expect(codesOf(after, PLU).map((c) => c.name)).toContain('ListeEtatPLU_COPIE')
    expect(after.result.problems).toEqual([])
  })

  it('copie le contenu courant d\'une liste modifiée', async () => {
    const s = await openSession(readConfig())
    const edited = applyChanges(s, [{ path: ETAT, kind: 'text', text: 'ETAT\n01\n02\n' }])
    const after = applyChanges(edited, copyCodeList(edited, listOf(edited, PLU, 'ListeEtatPLU'), MEC, 'ListeEtatPLU'))
    expect(textOf(after, `${MEC}/codes/ListeEtatPLU.csv`)).toBe('ETAT\n01\n02\n')
  })

  it('n\'attribue pas d\'id si le modèle cible n\'en utilise pas', async () => {
    const files = readConfig()
    editJson(files, `${MEC}/files.json`, (d) => {
      delete d.id
      for (const f of d.files) delete f.id
    })
    const s = await openSession(files)
    const after = applyChanges(s, copyCodeList(s, listOf(s, PLU, 'ListeEtatPLU'), MEC, 'ListeEtatPLU'))
    expect(codesOf(after, MEC).at(-1)).not.toHaveProperty('id')
  })
})

describe('createCodeList', () => {
  it('crée le CSV avec la seule ligne d\'en-tête et déclare la liste, sans problème', async () => {
    const s = await openSession(readConfig())
    const after = applyChanges(s, createCodeList(s, MEC, 'ListeTest', ['CODE', 'LIBELLE'], fixed))
    expect(textOf(after, `${MEC}/codes/ListeTest.csv`)).toBe('CODE,LIBELLE\n')
    expect(codesOf(after, MEC).at(-1)).toEqual({ data: './codes/ListeTest.csv', id: '07'.repeat(16), name: 'ListeTest', title: 'ListeTest' })
    expect(after.result.problems).toEqual([])
    expect(undoEdit(after).result.problems).toEqual([])
    expect(textOf(undoEdit(after), `${MEC}/codes/ListeTest.csv`)).toBeUndefined()
  })
})

describe('checkColumns', () => {
  it('accepte des colonnes distinctes et non vides', () => {
    expect(checkColumns(['CODE', 'LIBELLE'])).toBeUndefined()
  })

  it('refuse aucune colonne, une colonne vide, en double, ou avec virgule ou guillemet', () => {
    expect(checkColumns([])).toMatch(/au moins une colonne/)
    expect(checkColumns(['CODE', ''])).toMatch(/vide/)
    expect(checkColumns(['CODE', 'CODE'])).toMatch(/en double/)
    expect(checkColumns(['A,B'])).toMatch(/virgule/)
    expect(checkColumns(['A"B'])).toMatch(/virgule/)
  })
})

// Feature 012, US4 : nom de la liste égal au nom de son fichier.
describe('listNameOf / renameCodeList', () => {
  const config = (edit: (f: Map<string, string>) => void) => {
    const f = readConfig()
    edit(f)
    return f
  }
  const indexOf = (s: Session, model: string, name: string) => codesOf(s, model).findIndex((c) => c.name === name)
  const fkOf = (s: Session, table: string) => (dataOf(s, `${PLU}/types/${table}.json`) as { constraints: { foreignKeys: string[] } }).constraints.foreignKeys

  it('nom du fichier sans .csv', () => {
    expect(listNameOf('./codes/ListeEtatPLU.csv')).toBe('ListeEtatPLU')
    expect(listNameOf('../cnig_PLU_2017/codes/Liste.Etat.CSV')).toBe('Liste.Etat')
  })

  it('nom, titre qui suivait l\'ancien nom et clés étrangères, en une étape', async () => {
    const s = await openSession(config((f) => {
      f.set(`${PLU}/codes/Etat.csv`, f.get(ETAT)!)
      editJson(f, `${PLU}/files.json`, (d) => { d.codes.find((c: { name: string }) => c.name === 'ListeEtatPLU').title = 'ListeEtatPLU' })
    }))
    const i = indexOf(s, PLU, 'ListeEtatPLU')
    const r = renameCodeList(s, PLU, i, './codes/Etat.csv')
    expect(r.refusal).toBeUndefined()
    const after = applyChanges(s, r.changes)
    expect(codesOf(after, PLU)[i]).toMatchObject({ name: 'Etat', data: './codes/Etat.csv', title: 'Etat' })
    expect(fkOf(after, 'DOC_URBA')).toContain('(ETAT) REFERENCES Etat(ETAT)')
    expect(fkOf(after, 'DOC_URBA').join()).not.toContain('ListeEtatPLU')
    expect(after.result.problems.filter((p) => p.severity === 'error')).toEqual([])
    // Une seule étape.
    expect(dataOf(undoEdit(after), `${PLU}/types/DOC_URBA.json`)).toEqual(dataOf(s, `${PLU}/types/DOC_URBA.json`))
  })

  it('titre distinct de l\'ancien nom : conservé', async () => {
    const s = await openSession(config((f) => {
      f.set(`${PLU}/codes/Etat.csv`, f.get(ETAT)!)
      editJson(f, `${PLU}/files.json`, (d) => { d.codes.find((c: { name: string }) => c.name === 'ListeEtatPLU').title = 'États du document' })
    }))
    const i = indexOf(s, PLU, 'ListeEtatPLU')
    expect(codesOf(applyChanges(s, renameCodeList(s, PLU, i, './codes/Etat.csv').changes), PLU)[i]!.title).toBe('États du document')
  })

  it('nom déjà déclaré dans le modèle : refusé', async () => {
    const s = await openSession(readConfig())
    const r = renameCodeList(s, PLU, indexOf(s, PLU, 'ListeEtatPLU'), './codes/ListeTypedocPLU.csv')
    expect(r).toEqual({ changes: [], refusal: 'La liste « ListeTypedocPLU » est déjà déclarée dans ce modèle.' })
  })
})

// SC-003 : aucun écart entre nom et fichier dans les configurations connues.
describe('WARN-CODE-NAME-FILE sur les configurations connues', () => {
  it.each(['dgpr', 'naviforest', 'ppr'])('%s', async (name) => {
    const { join } = await import('node:path')
    const { FIXTURES } = await import('../../support/fixtures')
    const s = await openSession(readConfig(join(FIXTURES, '../known', name)))
    expect(s.result.problems.filter((p) => p.code === 'WARN-CODE-NAME-FILE')).toEqual([])
  })
})
