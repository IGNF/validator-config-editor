// Catalogue des codes de problème (contrat specs/001-validation-globale/contracts/problem-codes.md).
// `title` et `hint` : titre et conseil en clair pour un mainteneur de configuration (004, R7).
import type { Params, Severity } from './problems'

interface Entry {
  severity: Severity
  title: string
  hint: string
  message: (p: Params) => string
}

const s = (p: Params, k: string) => String(p[k] ?? '')

export const CATALOG = {
  'ERR-JSON-SYNTAX': {
    severity: 'error',
    title: 'Fichier JSON illisible',
    hint: 'Corriger la syntaxe à la ligne indiquée (virgule, guillemet ou accolade manquant) dans un éditeur de texte.',
    message: (p) => `JSON invalide ligne ${s(p, 'line')}, colonne ${s(p, 'column')} : ${s(p, 'detail')}`,
  },
  'ERR-CSV-SYNTAX': {
    severity: 'error',
    title: 'Liste de codes illisible',
    hint: 'Fermer le guillemet ouvert à la ligne indiquée.',
    message: (p) => `CSV invalide ligne ${s(p, 'line')} : guillemet non fermé`,
  },
  'ERR-CSV-HEADER': {
    severity: 'error',
    title: 'En-tête de liste de codes invalide',
    hint: 'La première ligne doit donner un nom unique et non vide à chaque colonne.',
    message: (p) => `En-tête CSV invalide : ${s(p, 'reason')}`,
  },
  'ERR-CSV-ROW-LENGTH': {
    severity: 'error',
    title: 'Ligne de liste de codes mal découpée',
    hint: 'Une valeur contient sans doute une virgule : la mettre entre guillemets.',
    message: (p) => `Ligne ${s(p, 'line')} : ${s(p, 'count')} valeurs pour ${s(p, 'expected')} colonnes`,
  },
  'WARN-MODEL-NO-DOCUMENT': {
    severity: 'warning',
    title: 'Dossier sans modèle',
    hint: 'Ajouter un files.json, ou retirer le dossier de la configuration.',
    message: () => 'Dossier sans files.json',
  },
  'ERR-SCHEMA': {
    severity: 'error',
    title: 'Valeur non conforme au format',
    hint: 'Corriger la propriété indiquée : valeur absente, de mauvais type ou hors des valeurs autorisées.',
    message: (p) => `${s(p, 'at') || '/'} : ${s(p, 'detail')}`,
  },
  'WARN-MODEL-NAME': {
    severity: 'warning',
    title: 'Nom du modèle différent du dossier',
    hint: 'Le validator n\'impose rien, mais un nom identique au dossier évite les confusions.',
    message: (p) => `Le nom « ${s(p, 'name')} » diffère du dossier « ${s(p, 'folder')} »`,
  },
  'ERR-TABLE-MODEL-MISSING': {
    severity: 'error',
    title: 'Modèle de table introuvable',
    hint: 'Corriger le chemin du modèle de table, ou ajouter le fichier dans types/.',
    message: (p) => `Modèle de table « ${s(p, 'ref')} » introuvable`,
  },
  'ERR-CODE-DATA-MISSING': {
    severity: 'error',
    title: 'Fichier de liste de codes introuvable',
    hint: 'Corriger le chemin du fichier, ou ajouter le CSV dans codes/.',
    message: (p) => `Liste de codes « ${s(p, 'ref')} » introuvable`,
  },
  'ERR-FK-SYNTAX': {
    severity: 'error',
    title: 'Clé étrangère illisible',
    hint: 'Écrire la clé sous la forme (COLONNE) REFERENCES Liste(COLONNE).',
    message: (p) => `Clé étrangère illisible : « ${s(p, 'fk')} »`,
  },
  'ERR-FK-SOURCE-COLUMN': {
    severity: 'error',
    title: 'Clé étrangère sur une colonne inexistante',
    hint: 'Corriger le nom de la colonne de la table dans la clé étrangère.',
    message: (p) => `Clé étrangère : colonne « ${s(p, 'column')} » absente de la table`,
  },
  'ERR-FK-TARGET-LIST': {
    severity: 'error',
    title: 'Liste de codes non déclarée',
    hint: 'Déclarer la liste dans files.json (et ajouter son CSV), ou corriger son nom dans la clé étrangère.',
    message: (p) => `Clé étrangère : liste « ${s(p, 'list')} » non déclarée dans files.json`,
  },
  'ERR-FK-TARGET-COLUMN': {
    severity: 'error',
    title: 'Clé étrangère vers une colonne inexistante',
    hint: 'Corriger le nom de la colonne de la liste de codes visée.',
    message: (p) => `Clé étrangère : colonne « ${s(p, 'column')} » absente de ${s(p, 'list')}`,
  },
  'ERR-REFERENCE-TARGET': {
    severity: 'error',
    title: 'Référence vers une colonne inexistante',
    hint: 'Écrire la référence sous la forme TABLE.COLONNE, avec une table et une colonne du modèle.',
    message: (p) => `Référence « ${s(p, 'ref')} » : table ou colonne introuvable`,
  },
  'ERR-ID-DUPLICATE': {
    severity: 'error',
    title: 'Identifiant en double',
    hint: 'Donner un nouvel identifiant à l\'un des deux objets.',
    message: (p) => `Identifiant ${s(p, 'id')} déjà utilisé par ${s(p, 'first')}`,
  },
  'WARN-GPU-ORPHAN-ID': {
    severity: 'warning',
    title: 'Surcharge GpU orpheline',
    hint: 'L\'objet surchargé n\'existe plus : retirer la surcharge de gpu.json.',
    message: (p) => `gpu.json : identifiant ${s(p, 'id')} sans objet correspondant`,
  },
  'WARN-UNREFERENCED-FILE': {
    severity: 'warning',
    title: 'Fichier non utilisé',
    hint: 'Le validator ignore ce fichier : le déclarer dans files.json, ou le retirer s\'il est obsolète.',
    message: () => 'Fichier non référencé par files.json',
  },
} satisfies Record<string, Entry>

export type ProblemCode = keyof typeof CATALOG
