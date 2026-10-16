import pkg from '../../package.json' with { type: 'json' }

const HELP = `Usage :
  vce check <dossier> [--format text|json] [--strict]
  vce serve <dossier> [--port <n>] [--open]
  vce --help | --version

<dossier> : dossier contenant les modèles (ex. config/).`

export function main(argv: string[]): number {
  const [command] = argv
  if (command === '--version' || command === '-v') {
    console.log(pkg.version)
    return 0
  }
  if (command === '--help' || command === '-h') {
    console.log(HELP)
    return 0
  }
  console.error(command ? `Commande inconnue : ${command}\n\n${HELP}` : HELP)
  return 2
}
