<script setup lang="ts">
import { computed, ref } from 'vue'
import { filterProblems, type Severity } from '@core/validation/problems'
import { href, route } from '../router'
import { useProject } from '../stores/project'

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
const isCurrent = (file: string, pointer?: string) => route.value.file === file && route.value.pointer === pointer
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
    <ul class="problems">
      <li v-for="(p, i) in shown.slice(0, LIMIT)" :key="i">
        <a
          :href="href(p.file, p.pointer)"
          class="problem"
          :class="[p.severity, { current: isCurrent(p.file, p.pointer) }]"
          :data-testid="`problem-${p.code}`"
        >
          <span class="code">{{ p.severity === 'error' ? 'Erreur' : 'Avertissement' }} · {{ p.code }}</span>
          <span class="where">{{ p.file }}{{ p.pointer ? ` ${p.pointer}` : '' }}</span>
          <span>{{ p.message }}</span>
        </a>
      </li>
    </ul>
    <p v-if="shown.length > LIMIT" class="text-body-2 pa-2">… {{ shown.length - LIMIT }} autres : affinez les filtres.</p>
  </section>
</template>

<style scoped>
.problems {
  list-style: none;
  padding: 0;
}
.problem {
  display: flex;
  flex-direction: column;
  padding: 6px 8px;
  margin: 4px;
  border-left: 4px solid;
  border-radius: 4px;
  color: inherit;
  text-decoration: none;
  font-size: 0.85rem;
  word-break: break-word;
}
.problem:hover,
.problem:focus-visible,
.problem.current {
  background: rgba(var(--v-theme-on-surface), 0.08);
}
.problem.error {
  border-color: rgb(var(--v-theme-error));
}
.problem.warning {
  border-color: rgb(var(--v-theme-warning));
}
.code {
  font-weight: 600;
}
.where {
  font-family: monospace;
  opacity: 0.85;
}
</style>
