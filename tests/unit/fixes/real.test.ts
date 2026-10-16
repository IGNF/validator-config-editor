import { describe, expect, it } from 'vitest'
import { applyChanges, openSession } from '@core/edit/session'
import { fixesFor } from '@core/fixes/catalog'
import { countProblems } from '@core/validation/problems'
import { readConfig } from '../../support/fixtures'

// SC-001 (004) : sur la configuration complète (ex. validator-config-gpu, json-source).
describe.skipIf(!process.env.VCE_CONFIG_DIR)('corrections sur la configuration complète', () => {
  it('propose une correction pour la quasi-totalité des problèmes, et leur application laisse 0 erreur', async () => {
    let session = await openSession(readConfig(process.env.VCE_CONFIG_DIR))
    const problems = session.result.problems
    const withFix = problems.filter((p) => fixesFor(session, p).length > 0)
    expect(withFix.length).toBeGreaterThanOrEqual(Math.min(problems.length, 60))

    // Applique la première correction du premier problème corrigeable, jusqu'à épuisement.
    for (let i = 0; i < 500; i++) {
      const next = session.result.problems.map((p) => fixesFor(session, p)[0]).find((f) => f !== undefined)
      if (!next) break
      session = applyChanges(session, next.changes)
    }
    expect(countProblems(session.result.problems).errors).toBe(0)
  }, 120_000)
})
