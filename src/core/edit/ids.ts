// Identifiants des nouveaux objets (plan 002, R6) : 32 caractères hexadécimaux, uniques dans la
// configuration.

export type RandomBytes = (bytes: Uint8Array) => void

const defaultRandom: RandomBytes = (bytes) => {
  globalThis.crypto.getRandomValues(bytes)
}

export function newId(existing: ReadonlySet<string>, random: RandomBytes = defaultRandom): string {
  for (;;) {
    const bytes = new Uint8Array(16)
    random(bytes)
    const id = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('')
    if (!existing.has(id)) return id
  }
}
