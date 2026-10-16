// Point d'entrée de la commande vce (bundlé dans dist/cli.js).
import { main } from './main'

process.exitCode = main(process.argv.slice(2))
