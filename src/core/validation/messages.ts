// Catalogue des codes de problème (contrat specs/001-validation-globale/contracts/problem-codes.md).
import type { Params, Severity } from './problems'

interface Entry {
  severity: Severity
  message: (p: Params) => string
}

const s = (p: Params, k: string) => String(p[k] ?? '')

export const CATALOG = {
  'ERR-JSON-SYNTAX': { severity: 'error', message: (p) => `JSON invalide ligne ${s(p, 'line')}, colonne ${s(p, 'column')} : ${s(p, 'detail')}` },
  'ERR-CSV-SYNTAX': { severity: 'error', message: (p) => `CSV invalide ligne ${s(p, 'line')} : guillemet non fermé` },
  'ERR-CSV-HEADER': { severity: 'error', message: (p) => `En-tête CSV invalide : ${s(p, 'reason')}` },
  'ERR-CSV-ROW-LENGTH': { severity: 'error', message: (p) => `Ligne ${s(p, 'line')} : ${s(p, 'count')} valeurs pour ${s(p, 'expected')} colonnes` },
  'WARN-MODEL-NO-DOCUMENT': { severity: 'warning', message: () => 'Dossier sans files.json et non utilisé comme modèle parent' },
  'ERR-SCHEMA': { severity: 'error', message: (p) => `${s(p, 'at') || '/'} : ${s(p, 'detail')}` },
  'WARN-MODEL-NAME': { severity: 'warning', message: (p) => `Le nom « ${s(p, 'name')} » diffère du dossier « ${s(p, 'folder')} »` },
  'ERR-PARENT-MISSING': { severity: 'error', message: (p) => `Modèle parent « ${s(p, 'name')} » introuvable` },
  'ERR-TABLE-MODEL-MISSING': { severity: 'error', message: (p) => `Modèle de table « ${s(p, 'ref')} » introuvable` },
  'ERR-CODE-DATA-MISSING': { severity: 'error', message: (p) => `Liste de codes « ${s(p, 'ref')} » introuvable` },
  'ERR-FK-SYNTAX': { severity: 'error', message: (p) => `Clé étrangère illisible : « ${s(p, 'fk')} »` },
  'ERR-FK-SOURCE-COLUMN': { severity: 'error', message: (p) => `Clé étrangère : colonne « ${s(p, 'column')} » absente de la table` },
  'ERR-FK-TARGET-LIST': { severity: 'error', message: (p) => `Clé étrangère : liste « ${s(p, 'list')} » non déclarée dans files.json` },
  'ERR-FK-TARGET-COLUMN': { severity: 'error', message: (p) => `Clé étrangère : colonne « ${s(p, 'column')} » absente de ${s(p, 'list')}` },
  'ERR-REFERENCE-TARGET': { severity: 'error', message: (p) => `Référence « ${s(p, 'ref')} » : table ou colonne introuvable` },
  'ERR-ID-DUPLICATE': { severity: 'error', message: (p) => `Identifiant ${s(p, 'id')} déjà utilisé par ${s(p, 'first')}` },
  'WARN-GPU-ORPHAN-ID': { severity: 'warning', message: (p) => `gpu.json : identifiant ${s(p, 'id')} sans objet correspondant` },
  'WARN-UNREFERENCED-FILE': { severity: 'warning', message: () => 'Fichier non référencé par files.json' },
} satisfies Record<string, Entry>

export type ProblemCode = keyof typeof CATALOG
