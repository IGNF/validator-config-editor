// Compile les JSON Schema en validateurs autonomes (Ajv standalone) : aucune compilation à
// l'exécution, donc pas de dépendance à Ajv dans le paquet ni de 'unsafe-eval' (plan R3).
import { readFileSync, writeFileSync } from 'node:fs'
import Ajv from 'ajv'
import standaloneCode from 'ajv/dist/standalone/index.js'

const dir = new URL('../src/core/schemas/', import.meta.url)
const read = (name: string) => JSON.parse(readFileSync(new URL(name, dir), 'utf8')) as Record<string, unknown>

const ajv = new Ajv({
  allErrors: true,
  strict: true,
  allowUnionTypes: true,
  validateFormats: false,
  code: { source: true, esm: true },
})

for (const name of ['document', 'table']) ajv.addSchema(read(`${name}.json`))

const code = standaloneCode(ajv, {
  validateDocument: 'document',
  validateTable: 'table',
})

// En sortie ESM, Ajv laisse des `require(...)` vers ses helpers d'exécution : on les remplace
// par des imports statiques, que Vite embarque dans le bundle.
const imports: string[] = []
const esm = code.replace(/const (\w+) = require\("(ajv\/dist\/runtime\/\w+)"\)\.default/g, (_match, name: string, path: string) => {
  imports.push(`import ${name}Module from '${path}.js'`)
  return `const ${name} = ${name}Module.default ?? ${name}Module`
})
if (esm.includes('require(')) throw new Error('require() résiduel dans le code généré')

const header = '// Fichier généré par scripts/compile-schemas.ts : ne pas modifier à la main.\n/* eslint-disable */\n'
writeFileSync(new URL('generated/validate.js', dir), header + imports.join('\n') + '\n' + esm)
