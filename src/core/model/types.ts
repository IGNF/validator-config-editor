// Format des fichiers de configuration IGNF/validator (voir src/core/schemas).
// Ces types ne sont utilisés qu'après validation par le schéma correspondant.

export type FileType = 'table' | 'multi_table' | 'pdf' | 'metadata' | 'directory'
export type Mandatory = 'ERROR' | 'WARN' | 'OPTIONAL'

export interface FileModel {
  /** Propre au GpU : facultatif pour le validator. */
  id?: string
  name: string
  title?: string
  description?: string
  type: FileType
  path: string
  mandatory?: Mandatory
  tableModel?: string
  tables?: { name: string; path?: string; tableModel?: string }[]
}

export interface StaticTable {
  id?: string
  name: string
  title?: string
  data: string
}

export interface DocumentConstraints {
  folderName?: string
  metadataSpecification?: string
}

export interface DocumentModel {
  id?: string
  name: string
  title?: string
  description?: string
  abstract?: boolean
  /** Héritage GpU : ignoré par le validator et par l'éditeur, conservé tel quel. */
  parent?: unknown
  files: FileModel[]
  codes?: StaticTable[]
  constraints?: DocumentConstraints
}

export interface ColumnConstraints {
  required?: boolean
  presenceRequired?: boolean
  unique?: boolean
  pattern?: string
  minLength?: number
  maxLength?: number
  enum?: (string | number | boolean)[] | null
  reference?: string
}

export interface Column {
  id?: string
  name: string
  title?: string
  description?: string
  type: string
  constraints?: ColumnConstraints
}

export interface TableModel {
  id?: string
  name: string
  title?: string
  description?: string
  columns: Column[]
  constraints?: { conditions?: string[]; foreignKeys?: string[] }
}

export type GpuSection =
  | 'validator_document_model'
  | 'validator_file_model'
  | 'validator_feature_type'
  | 'validator_attribute_type'
  | 'validator_static_table'

export type GpuFile = Partial<Record<GpuSection, Record<string, Record<string, string | null>>>>

export interface Csv {
  header: string[]
  rows: string[][]
}

// Fichier JSON lu : `data` est absent si le JSON est illisible. Sa conformité au schéma est
// vérifiée par la validation, qui seule le traite ensuite comme typé.
export interface JsonFile {
  path: string
  data?: unknown
}

export interface LoadedModel {
  /** Nom du dossier. */
  name: string
  document?: JsonFile
  gpu?: JsonFile
  /** Modèles de table (`types/**.json`), indexés par chemin relatif à la configuration. */
  tables: Map<string, JsonFile>
  /** Listes de codes CSV, indexées par chemin ; `csv` absent si illisible. */
  csvs: Map<string, { path: string; csv?: Csv }>
  /** Tous les fichiers du dossier du modèle (chemins relatifs à la configuration). */
  files: string[]
}

export interface Project {
  models: Map<string, LoadedModel>
  /** Dictionnaire des variables d'affichage des regex (`variables.json` à la racine, feature 010). */
  variables?: JsonFile
}
