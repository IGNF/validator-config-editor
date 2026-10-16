import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { crc32, zip } from '@core/zip'

const bytes = (s: string) => new TextEncoder().encode(s)
const python = spawnSync('python3', ['--version']).status === 0

// Relit une archive avec le module zipfile de Python (lecteur indépendant).
function readWithPython(archive: Uint8Array): { name: string; data: string; crcOk: boolean }[] {
  const dir = mkdtempSync(join(tmpdir(), 'vce-zip-'))
  try {
    const path = join(dir, 'a.zip')
    writeFileSync(path, archive)
    const script = `import zipfile,json,sys
z=zipfile.ZipFile(sys.argv[1])
bad=z.testzip()
print(json.dumps([{"name":i.filename,"data":z.read(i).hex(),"crcOk":bad is None} for i in z.infolist()]))`
    const r = spawnSync('python3', ['-I', '-c', script, path], { encoding: 'utf8' })
    if (r.status !== 0) throw new Error(r.stderr)
    return JSON.parse(r.stdout)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

describe('zip', () => {
  it('calcule le CRC-32 (vecteurs connus)', () => {
    expect(crc32(bytes(''))).toBe(0)
    expect(crc32(bytes('123456789'))).toBe(0xcbf43926)
    expect(crc32(bytes('The quick brown fox jumps over the lazy dog'))).toBe(0x414fa339)
  })

  it('produit une archive vide valide', () => {
    expect(zip([]).length).toBe(22)
  })

  it.skipIf(!python)('produit une archive relue à l\'identique par un lecteur indépendant', () => {
    const entries = [
      { path: 'config/m/files.json', data: bytes('{\n    "name": "m"\n}') },
      { path: 'config/m/codes/Liste été.csv', data: new Uint8Array([0xef, 0xbb, 0xbf, 0x41, 0x0d, 0x0a, 0xe9]) },
      { path: 'config/m/types/vide.json', data: new Uint8Array() },
    ]
    const read = readWithPython(zip(entries, new Date(2026, 9, 16, 12, 30, 10)))
    expect(read).toEqual(entries.map((e) => ({ name: e.path, data: Buffer.from(e.data).toString('hex'), crcOk: true })))
  })
})
