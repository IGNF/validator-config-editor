// Noms proches (004, R5) : distance de Levenshtein insensible à la casse.

export function distance(a: string, b: string): number {
  const x = a.toLowerCase()
  const y = b.toLowerCase()
  let previous = Array.from({ length: y.length + 1 }, (_, j) => j)
  for (let i = 1; i <= x.length; i++) {
    const current = [i]
    for (let j = 1; j <= y.length; j++) {
      current[j] = Math.min(previous[j]! + 1, current[j - 1]! + 1, previous[j - 1]! + (x[i - 1] === y[j - 1] ? 0 : 1))
    }
    previous = current
  }
  return previous[y.length]!
}

/** Jusqu'à 3 candidats proches de `name` (distance ≤ max(1, longueur / 3)), du plus proche au plus lointain. */
export function similar(name: string, candidates: Iterable<string>, limit = 3): string[] {
  const max = Math.max(1, Math.floor(name.length / 3))
  return [...new Set(candidates)]
    .filter((c) => c !== name)
    .map((c) => ({ c, d: distance(name, c) }))
    .filter(({ d }) => d <= max)
    .sort((a, b) => a.d - b.d || a.c.localeCompare(b.c))
    .slice(0, limit)
    .map(({ c }) => c)
}
