import type { Page } from '@playwright/test'
import { fakeGitHub, type FakeGitHub, type FakeRepo } from '../../support/github-fake'

/** Branche le faux GitHub (API et raw) sur la page : aucun accès réseau réel (plan 003, R8). */
export async function mockGitHub(page: Page, repos: Record<string, FakeRepo>): Promise<FakeGitHub> {
  const fake = fakeGitHub(repos)
  const handler = async (route: import('@playwright/test').Route) => {
    const r = fake.handle(route.request().url())
    await route.fulfill({ status: r.status, body: r.body, headers: { 'access-control-allow-origin': '*', 'access-control-expose-headers': 'X-RateLimit-Remaining, X-RateLimit-Reset', ...r.headers } })
  }
  await page.route('https://api.github.com/**', handler)
  await page.route('https://raw.githubusercontent.com/**', handler)
  return fake
}
