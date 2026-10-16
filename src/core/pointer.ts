// Pointeurs JSON (RFC 6901).

export function escapeSegment(segment: string | number): string {
  return String(segment).replace(/~/g, '~0').replace(/\//g, '~1')
}

export function pointer(...segments: (string | number)[]): string {
  return segments.map((s) => '/' + escapeSegment(s)).join('')
}

export function parsePointer(ptr: string): string[] {
  if (ptr === '') return []
  return ptr.slice(1).split('/').map((s) => s.replace(/~1/g, '/').replace(/~0/g, '~'))
}

// Compare deux pointeurs segment par segment, les segments numériques dans l'ordre naturel.
export function comparePointers(a: string, b: string): number {
  const sa = parsePointer(a)
  const sb = parsePointer(b)
  for (let i = 0; i < Math.min(sa.length, sb.length); i++) {
    const x = sa[i]!
    const y = sb[i]!
    if (x === y) continue
    const nx = /^\d+$/.test(x) ? Number(x) : NaN
    const ny = /^\d+$/.test(y) ? Number(y) : NaN
    if (!Number.isNaN(nx) && !Number.isNaN(ny)) return nx - ny
    return x < y ? -1 : 1
  }
  return sa.length - sb.length
}
