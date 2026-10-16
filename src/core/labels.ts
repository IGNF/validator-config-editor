// Libellés métier et familles de modèles (004, R9).

export const MANDATORY_LABELS: Record<string, string> = {
  ERROR: 'Obligatoire',
  WARN: 'Recommandé',
  OPTIONAL: 'Facultatif',
}

export const FILE_TYPE_LABELS: Record<string, string> = {
  table: 'Table',
  multi_table: 'Base multi-tables (GeoPackage…)',
  pdf: 'PDF',
  directory: 'Dossier',
  metadata: 'Fiche de métadonnées',
}

/** Présence d'un fichier ; `WARN` par défaut, comme le validator. */
export const mandatoryLabel = (mandatory: string | undefined) => MANDATORY_LABELS[mandatory ?? 'WARN'] ?? mandatory ?? ''
export const fileTypeLabel = (type: string) => FILE_TYPE_LABELS[type] ?? type

export type ColumnFamily = 'texte' | 'nombre' | 'booléen' | 'date' | 'géométrie' | 'fichier ou lien'

const FAMILIES: Record<string, ColumnFamily> = {
  String: 'texte',
  Integer: 'nombre',
  Double: 'nombre',
  Boolean: 'booléen',
  Date: 'date',
  Url: 'fichier ou lien',
  Filename: 'fichier ou lien',
  Path: 'fichier ou lien',
}

/** Famille d'un type de colonne ; les types géométriques (Point, MultiPolygon…) sont des géométries. */
export const columnTypeFamily = (type: string): ColumnFamily | undefined =>
  FAMILIES[type] ?? (/Point|LineString|Polygon|Geometry/.test(type) ? 'géométrie' : undefined)

/** Famille d'un modèle : les deux premiers segments du nom (cnig_SUP_A1_2016 → cnig_SUP). */
export const modelFamily = (name: string) => name.split('_').slice(0, 2).join('_')

/** Modèles regroupés par famille, dans l'ordre des noms ; une famille d'un seul modèle reste seule. */
export function groupByFamily<T extends { name: string }>(models: readonly T[]): ({ family: string; models: T[] } | T)[] {
  const families = new Map<string, T[]>()
  for (const m of models) families.set(modelFamily(m.name), [...(families.get(modelFamily(m.name)) ?? []), m])
  return [...families].map(([family, list]) => (list.length > 1 ? { family, models: list } : list[0]!))
}
