<script setup lang="ts">
import { mdiAlertCircleOutline, mdiCompareHorizontal, mdiFolderMultipleOutline } from '@mdi/js'
import { computed } from 'vue'
import { previousVersion } from '@core/compare'
import { groupByFamily } from '@core/labels'
import type { LoadedModel } from '@core/model/types'
import { countProblems } from '@core/validation/problems'
import { panels } from '../layout'
import { compareHref, href } from '../router'
import { useProject } from '../stores/project'
import ProblemCount from './ProblemCount.vue'

// Accueil d'une configuration chargée : chiffres clés, familles de modèles, raccourcis.
const store = useProject()
// Au-delà, les modèles d'une famille (123 pour cnig_SUP) se parcourent dans l'arbre.
const MAX_CHIPS = 12
const plural = (n: number, word: string) => `${n} ${word}${n > 1 ? 's' : ''}`

const stats = computed(() => {
  const s = store.summary
  if (!s) return []
  return [
    { label: s.models > 1 ? 'modèles' : 'modèle', value: s.models, testid: 'stat-models' },
    { label: s.tables > 1 ? 'tables' : 'table', value: s.tables, testid: 'stat-tables' },
    { label: s.codeLists > 1 ? 'listes de codes' : 'liste de codes', value: s.codeLists, testid: 'stat-lists' },
    { label: s.errors > 1 ? 'erreurs' : 'erreur', value: s.errors, testid: 'stat-errors', tone: s.errors ? 'error' : 'ok' },
    { label: s.warnings > 1 ? 'avertissements' : 'avertissement', value: s.warnings, testid: 'stat-warnings', tone: s.warnings ? 'warning' : 'ok' },
  ]
})

// Familles (cnig_PLU, cnig_SUP…) ; un modèle seul forme sa propre carte.
const families = computed(() =>
  groupByFamily(store.models).map((n) => ('family' in n ? n : { family: n.name, models: [n] })))
const names = computed(() => store.models.map((m) => m.name))
const modelHref = (m: LoadedModel) => href(m.document?.path ?? `${m.name}/`)
const familyCounts = (models: LoadedModel[]) => countProblems((store.result?.problems ?? []).filter((p) => models.some((m) => m.name === p.model)))
// Comparaison proposée : le modèle le plus récent de la famille avec sa version précédente.
const latestPair = (models: LoadedModel[]) => {
  const latest = [...models].map((m) => m.name).sort().at(-1)!
  const previous = previousVersion(latest, names.value)
  return previous ? { latest, previous } : undefined
}
</script>

<template>
  <section class="config-home" data-testid="config-home">
    <h1 class="text-h4 mb-1">Configuration</h1>
    <p class="text-body-1 mb-4 root" :title="store.root">{{ store.root }}</p>
    <p v-if="store.summary" class="sr-only" data-testid="summary">
      {{ plural(store.summary.models, 'modèle') }}, {{ plural(store.summary.tables, 'table') }}, {{ plural(store.summary.codeLists, 'liste') }} de codes —
      {{ plural(store.summary.errors, 'erreur') }}, {{ plural(store.summary.warnings, 'avertissement') }}.
    </p>

    <ul class="stats mb-6" aria-label="Chiffres clés">
      <li v-for="s in stats" :key="s.testid" class="stat" :class="s.tone" :data-testid="s.testid">
        <span class="value">{{ s.value }}</span>
        <span class="label">{{ s.label }}</span>
      </li>
    </ul>

    <div class="d-flex flex-wrap ga-2 mb-6">
      <v-btn :prepend-icon="mdiAlertCircleOutline" variant="tonal" :color="store.summary?.errors ? 'error' : 'primary'" data-testid="home-show-problems"
        @click="panels.problems.open = true">Voir les problèmes</v-btn>
    </div>

    <h2 class="text-h6 mb-2">Familles de modèles ({{ families.length }})</h2>
    <div class="families">
      <v-card v-for="f in families" :key="f.family" variant="outlined" class="family" :data-testid="`home-family-${f.family}`">
        <v-card-item>
          <template #prepend><v-icon :icon="mdiFolderMultipleOutline" color="primary" /></template>
          <v-card-title class="d-flex align-center ga-2">{{ f.family }} <ProblemCount :counts="familyCounts(f.models)" /></v-card-title>
          <v-card-subtitle class="subtitle">{{ plural(f.models.length, 'modèle') }}</v-card-subtitle>
        </v-card-item>
        <v-card-text class="pt-0">
          <div class="d-flex flex-wrap ga-1">
            <v-chip v-for="m in f.models.slice(0, MAX_CHIPS)" :key="m.name" :href="modelHref(m)" size="small" variant="outlined" color="primary">
              {{ m.name.startsWith(`${f.family}_`) ? m.name.slice(f.family.length + 1) : m.name }}
            </v-chip>
            <span v-if="f.models.length > MAX_CHIPS" class="more">et {{ f.models.length - MAX_CHIPS }} autres, dans l'arbre</span>
          </div>
        </v-card-text>
        <v-card-actions v-if="latestPair(f.models)">
          <v-btn :prepend-icon="mdiCompareHorizontal" size="small" variant="text" color="primary"
            :href="compareHref(latestPair(f.models)!.latest, latestPair(f.models)!.previous)">
            Comparer {{ latestPair(f.models)!.latest.split('_').at(-1) }} à {{ latestPair(f.models)!.previous.split('_').at(-1) }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </section>
</template>

<style scoped>
.config-home {
  max-width: 72rem;
}
.root {
  color: rgb(var(--v-theme-secondary));
  overflow-wrap: anywhere;
}
.stats {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: 12px;
}
.stat {
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  border: 1px solid rgb(var(--v-theme-divider));
  border-left: 4px solid rgb(var(--v-theme-primary));
  border-radius: 6px;
  background: rgb(var(--v-theme-surface-light));
}
.stat.ok {
  border-left-color: rgb(var(--v-theme-success));
}
.stat.error {
  border-left-color: rgb(var(--v-theme-error));
}
.stat.warning {
  border-left-color: rgb(var(--v-theme-warning));
}
.stat .value {
  font-family: var(--v-font-heading);
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.1;
}
.stat .label {
  color: rgb(var(--v-theme-secondary));
}
.more {
  align-self: center;
  color: rgb(var(--v-theme-secondary));
  font-size: 0.875rem;
}
.families {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
  gap: 12px;
}
.subtitle {
  opacity: 1;
  color: rgb(var(--v-theme-secondary));
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
</style>
