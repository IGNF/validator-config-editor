import pkg from '../../package.json' with { type: 'json' }
import { runCheck, type Output } from './check'

const HELP = `Usage :
  vce check <dossier> [--format text|json] [--strict]
  vce serve <dossier> [--port <n>] [--open]
  vce --help | --version

<dossier> : dossier contenant les modèles (ex. config/).

check     valide tous les modèles ; code de sortie 0 sans erreur, 1 avec au moins une erreur
          (ou un avertissement avec --strict), 2 en cas d'usage incorrect.`

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

export async function main(argv: string[], out: Output = console_): Promise<number> {
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
  return usage(out, command ? `Commande inconnue : ${command}` : undefined)
}

function usage(out: Output, message?: string): number {
  out.error(message ? `${message}\n\n${HELP}` : HELP)
  return 2
}
