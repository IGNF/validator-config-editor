<script setup lang="ts">
import { mdiAlertCircle, mdiAlert } from '@mdi/js'
import { computed } from 'vue'
import { describeLocation } from '@core/validation/location'
import { CATALOG } from '@core/validation/messages'
import type { Problem } from '@core/validation/problems'
import { href, route } from '../router'
import { useProject } from '../stores/project'

const props = defineProps<{ problem: Problem }>()
const store = useProject()
const entry = computed(() => CATALOG[props.problem.code])
// Localisation masquée si le message la donne déjà (ex. « Ligne 39 : … »).
const where = computed(() => {
  const element = describeLocation(store.result!.project, props.problem).element
  return element && !props.problem.message.startsWith(element) ? element : undefined
})
const isError = computed(() => props.problem.severity === 'error')
const current = computed(() => route.value.file === props.problem.file && route.value.pointer === props.problem.pointer)
</script>

<template>
  <div class="problem" :class="[problem.severity, { current }]">
    <a :href="href(problem.file, problem.pointer)" class="link" :data-testid="`problem-${problem.code}`">
      <span class="head">
        <v-icon :icon="isError ? mdiAlertCircle : mdiAlert" size="small" :color="isError ? 'error' : 'warning'" aria-hidden="true" />
        <span class="severity">{{ isError ? 'Erreur' : 'Avertissement' }}</span>
        <strong>{{ entry.title }}</strong>
      </span>
      <span v-if="where" class="where">{{ where }}</span>
      <span>{{ problem.message }}</span>
    </a>
    <span class="hint">{{ entry.hint }}</span>
    <span class="code">{{ problem.code }}</span>
    <slot />
  </div>
</template>

<style scoped>
.problem {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 6px 8px;
  margin: 4px 0;
  border-left: 4px solid;
  border-radius: 4px;
  font-size: 0.85rem;
  word-break: break-word;
}
.problem.error {
  border-color: rgb(var(--v-theme-error));
}
.problem.warning {
  border-color: rgb(var(--v-theme-warning));
}
.problem:hover,
.problem.current,
.problem:focus-within {
  background: rgba(var(--v-theme-on-surface), 0.06);
}
.link {
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: inherit;
  text-decoration: none;
}
.head {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.severity {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.where {
  font-weight: 500;
}
.hint {
  font-style: italic;
  opacity: 0.85;
}
.code {
  font-family: monospace;
  font-size: 0.75rem;
  opacity: 0.7;
}
</style>
