// Point d'entrée de la commande vce (bundlé dans dist/cli.js).
import { main } from './main'

const result = await main(process.argv.slice(2))
if (typeof result === 'number') process.exitCode = result
