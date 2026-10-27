// Essai d'un nom contre une regex de la configuration (chemin, nom du dossier, motif) : le nom
// doit correspondre en entier ; en cas d'échec, première partie de la forme à variables qui
// ne correspond plus (variable <NOM> ou texte de la regex).
import { toSegments, type Variables } from './variables'

export type RegexTest =
  | { kind: 'invalid'; message: string }
  | { kind: 'match' }
  | { kind: 'mismatch'; failedAt?: string }

export function testName(regex: string, name: string, variables: Variables = new Map(), names: ReadonlyMap<string, string> = new Map()): RegexTest {
  let full: RegExp
  try {
    full = new RegExp(`^(?:${regex})$`)
  } catch (e) {
    return { kind: 'invalid', message: e instanceof Error ? e.message : String(e) }
  }
  if (full.test(name)) return { kind: 'match' }
  // Plus long préfixe de la regex (découpée en morceaux) qui reconnaît un début du nom.
  const segments = toSegments(regex, variables, names)
  let source = ''
  for (const s of segments) {
    const next = source + (s.regex ?? s.text)
    let prefix: RegExp | undefined
    try {
      prefix = new RegExp(`^(?:${next})`)
    } catch {
      // Morceau qui coupe un groupe : on continue avec le suivant.
      source = next
      continue
    }
    if (!prefix.test(name)) return { kind: 'mismatch', failedAt: s.text }
    source = next
  }
  return { kind: 'mismatch' }
}
