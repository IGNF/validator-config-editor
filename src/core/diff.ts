// Différences ligne à ligne entre deux textes (revue des modifications) : préfixe et suffixe
// communs écartés, plus longue sous-suite commune sur le reste ; regroupées en blocs avec contexte.
export type DiffKind = 'same' | 'del' | 'add'
export interface DiffLine {
  kind: DiffKind
  text: string
  /** Numéro de ligne avant (same, del) et après (same, add). */
  before?: number
  after?: number
}
export interface DiffHunk {
  lines: DiffLine[]
}

const split = (text: string) => (text === '' ? [] : text.replace(/\r?\n$/, '').split(/\r?\n/))
// Au-delà, le milieu est affiché en retiré puis ajouté (pas de recherche de lignes communes).
const LCS_MAX = 4_000_000

export function lineDiff(before: string, after: string): DiffLine[] {
  const a = split(before)
  const b = split(after)
  let start = 0
  while (start < a.length && start < b.length && a[start] === b[start]) start++
  let endA = a.length
  let endB = b.length
  while (endA > start && endB > start && a[endA - 1] === b[endB - 1]) {
    endA--
    endB--
  }
  const out: DiffLine[] = []
  for (let i = 0; i < start; i++) out.push({ kind: 'same', text: a[i]!, before: i + 1, after: i + 1 })
  const ma = a.slice(start, endA)
  const mb = b.slice(start, endB)
  if (ma.length * mb.length > LCS_MAX) {
    ma.forEach((t, i) => out.push({ kind: 'del', text: t, before: start + i + 1 }))
    mb.forEach((t, j) => out.push({ kind: 'add', text: t, after: start + j + 1 }))
  } else {
    // Table des longueurs de sous-suite commune, parcourue depuis la fin.
    const n = ma.length
    const m = mb.length
    const lcs = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1))
    for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) lcs[i]![j] = ma[i] === mb[j] ? lcs[i + 1]![j + 1]! + 1 : Math.max(lcs[i + 1]![j]!, lcs[i]![j + 1]!)
    let i = 0
    let j = 0
    while (i < n || j < m) {
      if (i < n && j < m && ma[i] === mb[j]) {
        out.push({ kind: 'same', text: ma[i]!, before: start + i + 1, after: start + j + 1 })
        i++
        j++
      } else if (i < n && (j >= m || lcs[i + 1]![j]! >= lcs[i]![j + 1]!)) {
        // Retrait avant ajout : l'ancienne ligne, puis la nouvelle.
        out.push({ kind: 'del', text: ma[i]!, before: start + i + 1 })
        i++
      } else {
        out.push({ kind: 'add', text: mb[j]!, after: start + j + 1 })
        j++
      }
    }
  }
  const shift = endB - endA
  for (let i = endA; i < a.length; i++) out.push({ kind: 'same', text: a[i]!, before: i + 1, after: i + shift + 1 })
  return out
}

/** Blocs de lignes modifiées, avec `context` lignes inchangées autour. */
export function hunks(lines: readonly DiffLine[], context = 3): DiffHunk[] {
  const keep = new Set<number>()
  lines.forEach((l, i) => {
    if (l.kind !== 'same') for (let k = Math.max(0, i - context); k <= Math.min(lines.length - 1, i + context); k++) keep.add(k)
  })
  const out: DiffHunk[] = []
  let current: DiffLine[] | undefined
  lines.forEach((l, i) => {
    if (!keep.has(i)) {
      current = undefined
      return
    }
    if (!current) out.push({ lines: (current = []) })
    current.push(l)
  })
  return out
}
