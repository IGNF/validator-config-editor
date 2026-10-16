import pkg from '../../package.json' with { type: 'json' }
import { fileURLToPath } from 'node:url'
import { runCheck, type Output } from './check'
import { runServe } from './serve'
import type { RunningServer } from './server'

const HELP = `Usage :
  vce check <dossier> [--format text|json] [--strict]
  vce serve <dossier> [--port <n>] [--open]
  vce --help | --version

<dossier> : dossier contenant les modèles (ex. config/).

check     valide tous les modèles ; code de sortie 0 sans erreur, 1 avec au moins une erreur
          (ou un avertissement avec --strict), 2 en cas d'usage incorrect.
serve     ouvre l'éditeur local sur http://127.0.0.1:<port>/ (5174 par défaut, ou le suivant
          libre) ; --open l'ouvre dans le navigateur.`

const console_: Output = { log: (l) => console.log(l), error: (l) => console.error(l) }

// Sépare arguments positionnels et options « --nom [valeur] ».
function parseArgs(args: string[], withValue: string[]): { positional: string[]; options: Map<string, string | true> } | string {
  const positional: string[] = []
  const options = new Map<string, string | true>()
  for (let i = 0; i < args.length; i++) {
    const a = args[i]!
    if (!a.startsWith('--')) {
      positional.push(a)
      continue
    }
    if (withValue.includes(a)) {
      const v = args[++i]
      if (v === undefined) return `Valeur manquante pour ${a}`
      options.set(a, v)
    } else options.set(a, true)
  }
  return { positional, options }
}

// Interface construite : dist/ui, à côté de dist/cli.js.
const UI_DIR = fileURLToPath(new URL('./ui/', import.meta.url))

/** Renvoie le code de sortie, ou le serveur démarré par `serve`. */
export async function main(argv: string[], out: Output = console_, uiDir = UI_DIR): Promise<number | RunningServer> {
  const [command, ...rest] = argv
  if (command === '--version' || command === '-v') {
    out.log(pkg.version)
    return 0
  }
  if (command === '--help' || command === '-h') {
    out.log(HELP)
    return 0
  }
  if (command === 'check') {
    const parsed = parseArgs(rest, ['--format'])
    if (typeof parsed === 'string') return usage(out, parsed)
    const { positional, options } = parsed
    const unknown = [...options.keys()].filter((o) => o !== '--format' && o !== '--strict')
    if (unknown.length > 0) return usage(out, `Option inconnue : ${unknown[0]}`)
    const format = options.get('--format') ?? 'text'
    if (format !== 'text' && format !== 'json') return usage(out, `Format inconnu : ${String(format)} (text ou json)`)
    if (positional.length !== 1) return usage(out, 'Indiquer un et un seul dossier')
    return runCheck(positional[0]!, { format, strict: options.has('--strict') }, out)
  }
  if (command === 'serve') {
    const parsed = parseArgs(rest, ['--port'])
    if (typeof parsed === 'string') return usage(out, parsed)
    const { positional, options } = parsed
    const unknown = [...options.keys()].filter((o) => o !== '--port' && o !== '--open')
    if (unknown.length > 0) return usage(out, `Option inconnue : ${unknown[0]}`)
    const portText = options.get('--port')
    const port = portText === undefined ? undefined : Number(portText)
    if (port !== undefined && !(Number.isInteger(port) && port >= 0 && port < 65536)) return usage(out, `Port invalide : ${String(portText)}`)
    if (positional.length !== 1) return usage(out, 'Indiquer un et un seul dossier')
    return runServe(positional[0]!, { port, open: options.has('--open'), uiDir }, out)
  }
  return usage(out, command ? `Commande inconnue : ${command}` : undefined)
}

function usage(out: Output, message?: string): number {
  out.error(message ? `${message}\n\n${HELP}` : HELP)
  return 2
}
