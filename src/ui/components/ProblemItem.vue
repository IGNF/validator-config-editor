<script setup lang="ts">
import { mdiAlert, mdiAlertCircle, mdiLightbulbOnOutline } from '@mdi/js'
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
        <span class="severity">
          <v-icon :icon="isError ? mdiAlertCircle : mdiAlert" size="x-small" aria-hidden="true" />
          {{ isError ? 'Erreur' : 'Avertissement' }}
        </span>
        <strong class="title">{{ entry.title }}</strong>
      </span>
      <span v-if="where" class="where">{{ where }}</span>
      <span class="message">{{ problem.message }}</span>
    </a>
    <span class="hint"><v-icon :icon="mdiLightbulbOnOutline" size="small" aria-hidden="true" /><span>{{ entry.hint }}</span></span>
    <div class="foot">
      <span class="code">{{ problem.code }}</span>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.problem {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 10px;
  margin: 6px 0;
  border: 1px solid rgb(var(--v-theme-divider));
  border-left: 4px solid;
  border-radius: 6px;
  background: rgb(var(--v-theme-surface));
  font-size: 0.875rem;
  word-break: break-word;
}
.problem.error {
  border-left-color: rgb(var(--v-theme-error));
}
.problem.warning {
  border-left-color: rgb(var(--v-theme-warning));
}
.problem:hover,
.problem.current,
.problem:focus-within {
  box-shadow: 0 0 0 2px rgba(var(--v-theme-primary), 0.35);
}
.link {
  display: flex;
  flex-direction: column;
  gap: 3px;
  color: inherit;
  text-decoration: none;
}
.head {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.severity {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 0 7px;
  border-radius: 10px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.error .severity {
  color: #8c1d18;
  background: #fde7e5;
}
.warning .severity {
  color: #7a4100;
  background: #fff0d6;
}
.title {
  font-size: 0.95rem;
}
.where {
  font-weight: 600;
  color: rgb(var(--v-theme-secondary));
}
.hint {
  display: flex;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 4px;
  background: rgb(var(--v-theme-surface-light));
  color: rgb(var(--v-theme-on-surface));
}
.hint .v-icon {
  color: rgb(var(--v-theme-primary));
  flex: none;
}
.foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.code {
  padding: 0 6px;
  border: 1px solid rgb(var(--v-theme-divider));
  border-radius: 4px;
  font-family: ui-monospace, Menlo, Consolas, monospace;
  font-size: 0.72rem;
  color: rgb(var(--v-theme-secondary));
}
</style>

<style>
.v-theme--dark .problem.error .severity {
  color: #ffb4ab;
  background: rgba(255, 180, 171, 0.14);
}
.v-theme--dark .problem.warning .severity {
  color: #ffcc80;
  background: rgba(255, 204, 128, 0.14);
}
</style>
