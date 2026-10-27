<script setup lang="ts">
import { mdiAlertCircleOutline, mdiCheckCircleOutline } from '@mdi/js'
import { computed } from 'vue'
import { useProject } from '../stores/project'

// Problèmes d'un modèle (004 US4) : bandeau coloré selon l'état, lien vers le panneau filtré.
const props = defineProps<{ name: string }>()
const store = useProject()
const counts = computed(() => store.countsByModel.get(props.name) ?? { errors: 0, warnings: 0 })
const plural = (n: number, word: string) => `${n} ${word}${n > 1 ? 's' : ''}`
const tone = computed(() => (counts.value.errors ? 'error' : counts.value.warnings ? 'warning' : 'ok'))
</script>

<template>
  <div class="summary mb-4" :class="tone" data-testid="model-summary">
    <v-icon :icon="tone === 'ok' ? mdiCheckCircleOutline : mdiAlertCircleOutline" :color="tone === 'ok' ? 'success' : tone" aria-hidden="true" />
    <span v-if="tone === 'ok'">Aucun problème</span>
    <span v-else><strong>{{ plural(counts.errors, 'erreur') }}</strong>, {{ plural(counts.warnings, 'avertissement') }}</span>
    <v-btn v-if="tone !== 'ok'" size="small" variant="text" color="primary" data-testid="show-model-problems" @click="store.problemModel = name">
      Voir les problèmes
    </v-btn>
  </div>
</template>

<style scoped>
.summary {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid rgb(var(--v-theme-divider));
  border-left: 4px solid rgb(var(--v-theme-success));
  border-radius: 6px;
  background: rgb(var(--v-theme-surface-light));
}
.summary.error {
  border-left-color: rgb(var(--v-theme-error));
}
.summary.warning {
  border-left-color: rgb(var(--v-theme-warning));
}
</style>
