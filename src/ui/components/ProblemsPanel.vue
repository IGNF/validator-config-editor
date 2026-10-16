<script setup lang="ts">
import { computed, ref } from 'vue'
import { describeLocation } from '@core/validation/location'
import { countProblems, filterProblems, type Problem, type Severity } from '@core/validation/problems'
import { useProject } from '../stores/project'
import ProblemItem from './ProblemItem.vue'

const store = useProject()
const severity = ref<Severity | null>(null)
const code = ref<string | null>(null)
const model = ref<string | null>(null)

const LIMIT = 500
const all = computed(() => store.result?.problems ?? [])
const codes = computed<string[]>(() => [...new Set<string>(all.value.map((p) => p.code))].sort())
const models = computed(() => store.models.map((m) => m.name))
const shown = computed(() =>
  filterProblems(all.value, { ...(severity.value && { severity: severity.value }), ...(code.value && { code: code.value }), ...(model.value !== null && { model: model.value }) }),
)
const SEVERITIES = [
  { title: 'Erreurs', value: 'error' },
  { title: 'Avertissements', value: 'warning' },
]

// Problèmes groupés par fichier, dans l'ordre de tri (modèle, fichier, pointeur).
const groups = computed(() => {
  const byFile = new Map<string, Problem[]>()
  for (const p of shown.value.slice(0, LIMIT)) byFile.set(p.file, [...(byFile.get(p.file) ?? []), p])
  return [...byFile].map(([file, problems]) => ({
    file,
    label: describeLocation(store.result!.project, problems[0]!).file,
    model: problems[0]!.model,
    problems,
    counts: countProblems(problems),
  }))
})
const opened = ref<string[] | undefined>()
const openedGroups = computed({
  get: () => opened.value ?? groups.value.map((g) => g.file),
  set: (v: string[]) => (opened.value = v),
})
const plural = (n: number, word: string) => `${n} ${word}${n > 1 ? 's' : ''}`
</script>

<template>
  <section aria-labelledby="problems-title" class="pa-2">
    <h2 id="problems-title" class="text-h6 px-2">Problèmes</h2>
    <div class="d-flex flex-column ga-2 pa-2">
      <v-select v-model="severity" :items="SEVERITIES" label="Sévérité" density="compact" variant="outlined" hide-details clearable data-testid="filter-severity" />
      <v-autocomplete v-model="code" :items="codes" label="Code" density="compact" variant="outlined" hide-details clearable data-testid="filter-code" />
      <v-autocomplete v-model="model" :items="models" label="Modèle" density="compact" variant="outlined" hide-details clearable data-testid="filter-model" />
    </div>
    <p class="text-body-2 px-2" aria-live="polite" data-testid="problems-count">
      {{ shown.length }} problème{{ shown.length > 1 ? 's' : '' }}<template v-if="shown.length !== all.length"> sur {{ all.length }}</template>
    </p>
    <v-expansion-panels v-model="openedGroups" multiple variant="accordion" class="mt-2">
      <v-expansion-panel v-for="g in groups" :key="g.file" :value="g.file" :data-testid="`group-${g.file}`">
        <v-expansion-panel-title class="py-2">
          <div class="d-flex flex-column">
            <strong>{{ g.label }}</strong>
            <span class="text-caption">
              <template v-if="g.model && !g.label.includes(g.model)">{{ g.model }} · </template>
              <template v-if="g.counts.errors">{{ plural(g.counts.errors, 'erreur') }}</template>
              <template v-if="g.counts.errors && g.counts.warnings">, </template>
              <template v-if="g.counts.warnings">{{ plural(g.counts.warnings, 'avertissement') }}</template>
            </span>
          </div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <ProblemItem v-for="(p, i) in g.problems" :key="i" :problem="p" />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <p v-if="shown.length > LIMIT" class="text-body-2 pa-2">… {{ shown.length - LIMIT }} autres : affinez les filtres.</p>
  </section>
</template>
