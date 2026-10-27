import { describe, expect, it } from 'vitest'
import { fileTree, type FileNode } from '@core/model/file-tree'
import type { FileModel } from '@core/model/types'
import { readConfig } from '../support/fixtures'

const names = (nodes: FileNode[]): unknown[] => nodes.map((n) => (n.children.length ? { [n.file.name]: names(n.children) } : n.file.name))

describe('fileTree', () => {
  it('range les fichiers attendus sous leur dossier : fichiers d\'abord, puis dossiers, dans l\'ordre de files.json', () => {
    const files = JSON.parse(readConfig().get('cnig_PLU_2017/files.json')!).files as FileModel[]
    const tree = fileTree(files)
    expect(names(tree)).toEqual([
      'METADONNEES',
      'DOC_URBA_COM',
      'DOC_URBA',
      { Donnees_geographiques: ['HABILLAGE_LIN', 'HABILLAGE_PCT', 'HABILLAGE_SURF', 'HABILLAGE_TXT', 'INFO_LIN', 'INFO_PCT', 'INFO_SURF', 'PRESCRIPTION_LIN', 'PRESCRIPTION_PCT', 'PRESCRIPTION_SURF', 'ZONE_URBA'] },
      {
        Pieces_ecrites: [
          { '0_Procedure': ['JUGEMENT', 'PROCEDURE'] },
          { '1_Rapport_de_presentation': ['EVALUATION_ENVIRONNEMENTALE', 'RAPPORT'] },
          { '2_PADD': ['PADD'] },
          { '3_Reglement': ['PRESCRIPTION', 'REGLEMENT', 'REGLEMENT_GRAPHIQUE'] },
          { '4_Annexes': ['ANNEXE', 'TITRES_PIECES_ECRITES'] },
          { '5_Orientations_amenagement': ['ORIENTATIONS_AMENAGEMENT'] },
        ],
      },
    ])
    // Indice d'origine conservé (pointeur /files/<i>).
    expect(tree[3]!.children.at(-1)).toMatchObject({ index: 11, file: { name: 'ZONE_URBA' } })
  })

  it('un dossier vide reste un dossier ; un chemin sans dossier déclaré reste à la racine', () => {
    const files: FileModel[] = [
      { type: 'directory', name: 'Vide', path: 'Vide' },
      { type: 'pdf', name: 'ORPHELIN', path: 'Absent/[0-9]+.pdf' },
      { type: 'directory', name: 'A', path: 'A' },
      { type: 'pdf', name: 'DANS_A', path: 'A/x.pdf' },
      // Préfixe de nom sans « / » : pas un enfant.
      { type: 'pdf', name: 'AB', path: 'AB.pdf' },
    ]
    expect(names(fileTree(files))).toEqual(['ORPHELIN', 'AB', 'Vide', { A: ['DANS_A'] }])
    expect(fileTree(files)[2]).toMatchObject({ directory: true, children: [] })
  })
})
