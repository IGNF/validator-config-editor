<script setup lang="ts">
import { mdiAlert, mdiAlertCircle } from '@mdi/js'
import { computed } from 'vue'
import { CATALOG } from '@core/validation/messages'
import { useProject } from '../stores/project'

// Indicateur de problèmes d'un élément (colonne, fichier, liste…), avec leurs titres au survol.
const props = defineProps<{ file: string; pointer: string }>()
const store = useProject()
const problems = computed(() => store.problemsUnder(props.file, props.pointer))
const hasError = computed(() => problems.value.some((p) => p.severity === 'error'))
const label = computed(() => `${problems.value.length} problème(s) : ${problems.value.map((p) => CATALOG[p.code].title).join(' ; ')}`)
</script>

<template>
  <span v-if="problems.length" class="badge" :class="hasError ? 'error' : 'warning'" :title="label" :aria-label="label" role="img" data-testid="problem-badge">
    <v-icon :icon="hasError ? mdiAlertCircle : mdiAlert" size="x-small" aria-hidden="true" />
    {{ problems.length }}
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 0 6px;
  border-radius: 8px;
  font-size: 0.75rem;
  color: #fff;
}
.badge.error {
  background: #b00020;
}
.badge.warning {
  background: #8a5300;
}
</style>
