import { describe, expect, it } from 'vitest'
import { compareModels, previousVersion } from '@core/compare'
import { checkConfig } from '@core/validation/validate'
import { editJson, memoryFs, readConfig } from '../support/fixtures'

const FROM = 'cnig_PLU_2017'
const TO = 'cnig_PLU_2022'

// Configuration des fixtures avec une copie de cnig_PLU_2017 sous le nom cnig_PLU_2022, modifiée par `edit`.
async function compare(edit: (files: Map<string, string>) => void = () => {}) {
  const files = readConfig()
  for (const [path, text] of [...files]) if (path.startsWith(`${FROM}/`)) files.set(path.replace(`${FROM}/`, `${TO}/`), text)
  edit(files)
  return compareModels(await checkConfig(memoryFs(files)), FROM, TO)
}

const FILES = `${TO}/files.json`
const ZONE_URBA = `${TO}/types/ZONE_URBA.json`
const DOC_URBA = `${TO}/types/DOC_URBA.json`
const files = (d: Record<string, any>, name: string) => d.files.find((f: { name: string }) => f.name === name)
const column = (d: Record<string, any>, name: string) => d.columns.find((c: { name: string }) => c.name === name)

describe('previousVersion', () => {
  const names = ['cnig_PLU_2013', 'cnig_PLU_2017', 'cnig_PLU_2022', 'cnig_PLU_2024', 'cnig_PLUi_2017', 'cnig_SUP_A1_2013', 'cnig_SUP_A1_2016', 'GPU_MEC_2025', 'ppr']
  it('même nom, année la plus proche en dessous', () => {
    expect(previousVersion('cnig_PLU_2024', names)).toBe('cnig_PLU_2022')
    expect(previousVersion('cnig_PLU_2017', names)).toBe('cnig_PLU_2013')
    expect(previousVersion('cnig_SUP_A1_2016', names)).toBe('cnig_SUP_A1_2013')
    // cnig_PLUi n'est pas cnig_PLU.
    expect(previousVersion('cnig_PLUi_2022', names)).toBe('cnig_PLUi_2017')
  })

  it('sans année ou sans version antérieure : aucune', () => {
    expect(previousVersion('cnig_PLU_2013', names)).toBeUndefined()
    expect(previousVersion('GPU_MEC_2025', names)).toBeUndefined()
    expect(previousVersion('ppr', names)).toBeUndefined()
  })
})

describe('compareModels', () => {
  it('deux modèles identiques : aucune différence', async () => {
    const c = await compare()
    expect(c).toMatchObject({ from: FROM, to: TO, document: [], unreadable: [], total: 0 })
    expect(c.files).toEqual({ added: [], removed: [], changed: [] })
  })

  it('ignore les id, les titres et l\'ordre', async () => {
    const c = await compare((f) => {
      editJson(f, FILES, (d) => {
        d.id = '0123456789abcdef0123456789abcdef'
        d.files.reverse()
        files(d, 'RAPPORT').id = '1123456789abcdef0123456789abcdef'
        files(d, 'RAPPORT').title = 'Autre titre'
      })
      editJson(f, ZONE_URBA, (d) => {
        d.id = '2123456789abcdef0123456789abcdef'
        d.title = 'Autre'
        d.columns.reverse()
        d.columns[0].id = '3123456789abcdef0123456789abcdef'
      })
    })
    expect(c.total).toBe(0)
  })

  it('dossier : nom et spécification des métadonnées', async () => {
    const c = await compare((f) => editJson(f, FILES, (d) => {
      d.constraints.folderName = '[0-9]{5}_PLU'
      delete d.constraints.metadataSpecification
    }))
    expect(c.document).toEqual([
      { field: 'folderName', old: '[a-zA-Z0-9]+_PLU_[0-9]{8}(_[a-zA-Z])?', new: '[0-9]{5}_PLU' },
      { field: 'metadataSpecification', old: 'CNIG PLU v2017', new: null },
    ])
    expect(c.total).toBe(2)
  })

  it('fichiers attendus ajoutés, retirés, modifiés', async () => {
    const c = await compare((f) => {
      // mandatory absent vaut WARN : pas de changement.
      editJson(f, `${FROM}/files.json`, (d) => { delete files(d, 'PADD').mandatory })
      editJson(f, FILES, (d) => {
        d.files = d.files.filter((x: { name: string }) => x.name !== 'JUGEMENT')
        d.files.push({ name: 'NOUVEAU', type: 'pdf', path: 'Pieces_ecrites/nouveau' })
        Object.assign(files(d, 'RAPPORT'), { path: 'autre', mandatory: 'WARN' })
        files(d, 'PADD').mandatory = 'WARN'
        files(d, 'ZONE_URBA').tableModel = './types/DOC_URBA.json'
      })
    })
    expect(c.files.added).toEqual(['NOUVEAU'])
    expect(c.files.removed).toEqual(['JUGEMENT'])
    expect(c.files.changed.map((x) => x.name)).toEqual(['RAPPORT', 'ZONE_URBA'])
    expect(c.files.changed[0]!.changes.map((x) => x.field)).toEqual(['mandatory', 'path'])
    expect(c.files.changed[1]!.changes).toEqual([{ field: 'tableModel', old: './types/ZONE_URBA.json', new: './types/DOC_URBA.json' }])
  })

  it('tables et colonnes ; listes comparées sans l\'ordre', async () => {
    const c = await compare((f) => {
      editJson(f, ZONE_URBA, (d) => {
        d.columns = d.columns.filter((x: { name: string }) => x.name !== 'URLFIC')
        d.columns.push({ name: 'NOUVELLE', type: 'String' })
        column(d, 'LIBELLE').constraints = { ...column(d, 'LIBELLE').constraints, maxLength: 20, unique: true }
        column(d, 'TYPEZONE').description = 'autre'
      })
      editJson(f, DOC_URBA, (d) => {
        d.constraints ??= {}
        d.constraints.conditions = [...(d.constraints.conditions ?? []), 'ETAT IS NOT NULL']
        d.constraints.foreignKeys = [...(d.constraints.foreignKeys ?? [])].reverse()
      })
    })
    expect(c.tables.added).toEqual([])
    expect(c.tables.changed.map((t) => t.name)).toEqual(['DOC_URBA', 'ZONE_URBA'])
    const [doc, zone] = c.tables.changed
    expect(doc!.changes).toEqual([{ field: 'conditions', removed: [], added: ['ETAT IS NOT NULL'] }])
    expect(zone!.changes).toEqual([])
    expect(zone!.columns.added).toEqual(['NOUVELLE'])
    expect(zone!.columns.removed).toEqual(['URLFIC'])
    expect(zone!.columns.changed).toMatchObject([
      { name: 'LIBELLE', changes: [{ field: 'maxLength', old: 12, new: 20 }, { field: 'unique', old: false, new: true }] },
      { name: 'TYPEZONE', changes: [{ field: 'description', new: 'autre' }] },
    ])
    // Table : 1 (DOC_URBA, ses propres champs) ; colonnes : 1 + 1 + 2.
    expect(c.total).toBe(5)
  })

  it('enum : valeurs retirées et ajoutées', async () => {
    const c = await compare((f) => editJson(f, ZONE_URBA, (d) => {
      column(d, 'TYPEZONE').constraints = { ...column(d, 'TYPEZONE').constraints, enum: ['U', 'X'] }
    }))
    const change = c.tables.changed[0]!.columns.changed[0]!.changes[0]!
    expect(change).toEqual({ field: 'enum', removed: [], added: ['U', 'X'] })
  })

  it('table ajoutée ou retirée avec son fichier ; listes de codes', async () => {
    const c = await compare((f) => {
      f.delete(`${TO}/types/HABILLAGE_TXT.json`)
      editJson(f, FILES, (d) => {
        d.files = d.files.filter((x: { name: string }) => x.name !== 'HABILLAGE_TXT')
        d.codes = d.codes.filter((x: { name: string }) => x.name !== 'ListeStypeinf')
        d.codes.push({ name: 'ListeNouvelle', data: './codes/ListeEtatPLU.csv' })
      })
    })
    expect(c.tables.removed).toEqual(['HABILLAGE_TXT'])
    expect(c.codes.added).toEqual(['ListeNouvelle'])
    expect(c.codes.removed).toEqual(['ListeStypeinf'])
  })

  it('table illisible : signalée, laissée de côté', async () => {
    const c = await compare((f) => f.set(ZONE_URBA, '{'))
    expect(c.unreadable).toEqual([ZONE_URBA])
    expect(c.tables.removed).toEqual([])
  })

  it('modèle absent : tout est ajouté', async () => {
    const c = compareModels(await checkConfig(memoryFs()), 'inconnu', FROM)
    expect(c.files.removed).toEqual([])
    expect(c.files.added.length).toBeGreaterThan(30)
  })
})

const CODES = `${TO}/codes`
const csvEdit = (f: Map<string, string>, name: string, edit: (lines: string[]) => string[]) =>
  f.set(`${CODES}/${name}.csv`, edit(f.get(`${CODES}/${name}.csv`)!.trimEnd().split('\n')).join('\n') + '\n')

describe('contenu des listes de codes (US2)', () => {
  it('lignes rapprochées par les colonnes de la clé étrangère : seul LIBELLE change → ligne modifiée', async () => {
    const c = await compare((f) => csvEdit(f, 'PrescriptionUrbaType', (lines) => {
      // Ligne 01,00 retirée, libellé de 01,01 modifié, ligne 98,98 ajoutée.
      const [header, , second, ...rest] = lines
      return [header!, second!.replace('Espace boisé classé à protéger', 'EBC à protéger'), ...rest, '98,98,Nouvelle,,']
    }))
    expect(c.codes.content).toHaveLength(1)
    const [content] = c.codes.content
    expect(content!.name).toBe('PrescriptionUrbaType')
    expect(content!.columns).toEqual({ added: [], removed: [] })
    expect(content!.rows.added).toEqual(['98,98,Nouvelle,,'])
    expect(content!.rows.removed).toHaveLength(1)
    expect(content!.rows.removed[0]).toMatch(/^01,00,/)
    expect(content!.rows.changed).toEqual([
      { key: '01,01', changes: [{ field: 'LIBELLE', old: 'Espace boisé classé à protéger ou conserver', new: 'EBC à protéger ou conserver' }] },
    ])
  })

  it('sans clé étrangère : première colonne', async () => {
    const c = await compare((f) => csvEdit(f, 'ListeStypeinf', (lines) => [lines[0]!, ...lines.slice(2), '99']))
    expect(c.codes.content).toEqual([{ name: 'ListeStypeinf', columns: { added: [], removed: [] }, rows: { added: ['99'], removed: ['00'], changed: [] } }])
  })

  it('clés en double : rapprochement par ligne entière', async () => {
    const c = await compare((f) => csvEdit(f, 'PrescriptionUrbaType', (lines) => [
      ...lines.map((l) => l.replace('Espace boisé classé à protéger', 'EBC à protéger')), lines[1]!.replace('Espace', 'Doublon'),
    ]))
    const rows = c.codes.content[0]!.rows
    expect(rows.changed).toEqual([])
    expect(rows.added).toHaveLength(2)
    expect(rows.removed).toHaveLength(1)
  })

  it('colonnes ajoutées et retirées ; lignes comparées sur les colonnes communes', async () => {
    const c = await compare((f) => csvEdit(f, 'ListeEtatPLU', (lines) => lines.map((l, i) => `${l},${i === 0 ? 'LIBELLE' : 'x'}`)))
    expect(c.codes.content).toEqual([{ name: 'ListeEtatPLU', columns: { added: ['LIBELLE'], removed: [] }, rows: { added: [], removed: [], changed: [] } }])
    expect(c.total).toBe(1)
  })

  it('contenu identique sous un autre chemin data : rien', async () => {
    const c = await compare((f) => {
      f.set(`${CODES}/Etat.csv`, f.get(`${CODES}/ListeEtatPLU.csv`)!)
      editJson(f, FILES, (d) => { d.codes.find((x: { name: string }) => x.name === 'ListeEtatPLU').data = './codes/Etat.csv' })
    })
    expect(c.codes.content).toEqual([])
    expect(c.total).toBe(0)
  })

  it('liste illisible : signalée, laissée de côté', async () => {
    const c = await compare((f) => f.set(`${CODES}/ListeEtatPLU.csv`, 'ETAT\n"01\n'))
    expect(c.unreadable).toEqual([`${CODES}/ListeEtatPLU.csv`])
    expect(c.codes.content).toEqual([])
  })
})

// SC-001 : nombres du tableau du contexte de la spec (json-source, commit 976b9fce).
describe.skipIf(!process.env.VCE_CONFIG_DIR)('configuration complète (VCE_CONFIG_DIR)', () => {
  const counts = (s: { added: unknown[]; removed: unknown[]; changed?: unknown[] }) => [s.added.length, s.removed.length, ...(s.changed ? [s.changed.length] : [])]
  it.each([
    ['cnig_PLU_2017', 'cnig_PLU_2022', 1, [2, 0, 1], [0, 0, 1], [14, 0, 1], [1, 0], 3],
    ['cnig_PLU_2022', 'cnig_PLU_2024', 1, [21, 2, 1], [0, 0, 7], [2, 0, 4], [6, 2], 1],
    ['cnig_PLUi_2022', 'cnig_PLUi_2024', 1, [24, 5, 14], [0, 0, 7], [2, 0, 5], [7, 3], 1],
    ['cnig_SUP_A1_2013', 'cnig_SUP_A1_2016', 1, [1, 0, 7], [0, 0, 3], [2, 1, 17], [0, 0], 0],
  ])('%s → %s', async (from, to, document, files, tables, columns, codes, content) => {
    const result = await checkConfig(memoryFs(readConfig(process.env.VCE_CONFIG_DIR)))
    const c = compareModels(result, from, to)
    expect(c.document.length).toBe(document)
    expect(counts(c.files)).toEqual(files)
    expect([c.tables.added.length, c.tables.removed.length, c.tables.changed.filter((t) => t.changes.length > 0).length]).toEqual(tables)
    expect(c.tables.changed.reduce((n, t) => n.map((x, i) => x + counts(t.columns)[i]!), [0, 0, 0])).toEqual(columns)
    expect([c.codes.added.length, c.codes.removed.length]).toEqual(codes)
    expect(c.codes.content.length).toBe(content)
    expect(c.unreadable).toEqual([])
  })
})
