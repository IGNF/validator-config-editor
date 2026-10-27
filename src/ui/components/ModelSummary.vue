<script setup lang="ts">
import { mdiAlertCircleOutline, mdiFileTreeOutline, mdiFormatListBulleted, mdiTable } from '@mdi/js'
import { computed } from 'vue'
import { fileTypeLabel } from '@core/labels'
import type { DocumentModel } from '@core/model/types'
import { useProject } from '../stores/project'

// Bandeau de synthèse d'un modèle (004 US4) : fichiers par type, tables, listes de codes,
// problèmes ; chaque tuile ouvre l'onglet correspondant de la vue.
const props = defineProps<{ name: string; doc: DocumentModel }>()
const emit = defineEmits<{ select: [tab: 'files' | 'tables' | 'codes'] }>()
const store = useProject()
const loaded = computed(() => store.result!.project.models.get(props.name))
const byType = computed(() => {
  const counts = new Map<string, number>()
  for (const f of props.doc.files) counts.set(f.type, (counts.get(f.type) ?? 0) + 1)
  return [...counts].map(([type, n]) => ({ type, label: `${n} ${(n > 1 ? PLURALS[type] : undefined) ?? fileTypeLabel(type).replace(/^(?!PDF)./, (c) => c.toLowerCase())}` }))
})
// Libellés au pluriel des types de fichiers attendus.
const PLURALS: Record<string, string> = { table: 'tables', directory: 'dossiers', metadata: 'fiches de métadonnées', pdf: 'PDF', multi_table: 'bases multi-tables' }
const counts = computed(() => store.countsByModel.get(props.name) ?? { errors: 0, warnings: 0 })
const plural = (n: number, word: string) => `${n} ${word}${n > 1 ? 's' : ''}`
const tiles = computed(() => [
  { tab: 'files' as const, icon: mdiFileTreeOutline, value: props.doc.files.length, label: props.doc.files.length > 1 ? 'fichiers attendus' : 'fichier attendu' },
  { tab: 'tables' as const, icon: mdiTable, value: loaded.value?.tables.size ?? 0, label: (loaded.value?.tables.size ?? 0) > 1 ? 'modèles de table' : 'modèle de table' },
  { tab: 'codes' as const, icon: mdiFormatListBulleted, value: props.doc.codes?.length ?? 0, label: (props.doc.codes?.length ?? 0) > 1 ? 'listes de codes' : 'liste de codes' },
])
</script>

<template>
  <div class="summary mb-4" data-testid="model-summary">
    <button v-for="t in tiles" :key="t.tab" type="button" class="tile" :data-testid="`summary-${t.tab}`" @click="emit('select', t.tab)">
      <v-icon :icon="t.icon" color="primary" aria-hidden="true" />
      <span class="value">{{ t.value }}</span>
      <span class="label">{{ t.label }}</span>
    </button>
    <div class="tile problems" :class="{ error: counts.errors, warning: !counts.errors && counts.warnings }" data-testid="summary-problems">
      <v-icon :icon="mdiAlertCircleOutline" :color="counts.errors ? 'error' : counts.warnings ? 'warning' : 'success'" aria-hidden="true" />
      <span class="value">{{ counts.errors + counts.warnings }}</span>
      <span class="label">{{ counts.errors + counts.warnings ? `${plural(counts.errors, 'erreur')}, ${plural(counts.warnings, 'avertissement')}` : 'aucun problème' }}</span>
      <v-btn v-if="counts.errors + counts.warnings" size="small" variant="text" color="primary" class="px-1" data-testid="show-model-problems"
        @click="store.problemModel = name">Voir les problèmes</v-btn>
    </div>
    <div class="types" aria-label="Fichiers attendus par type">
      <span v-for="t in byType" :key="t.type" class="type">{{ t.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.summary {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
  gap: 10px;
}
.tile {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  column-gap: 10px;
  align-items: center;
  padding: 10px 14px;
  border: 1px solid rgb(var(--v-theme-divider));
  border-left: 4px solid rgb(var(--v-theme-primary));
  border-radius: 6px;
  background: rgb(var(--v-theme-surface-light));
  color: rgb(var(--v-theme-on-surface));
  text-align: left;
  font: inherit;
}
button.tile {
  cursor: pointer;
}
button.tile:hover,
button.tile:focus-visible {
  background: rgba(var(--v-theme-primary), 0.1);
}
.tile .v-icon {
  grid-row: span 2;
}
.value {
  font-family: var(--v-font-heading);
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.1;
}
.label {
  grid-column: 2;
  color: rgb(var(--v-theme-secondary));
  font-size: 0.875rem;
}
.problems {
  border-left-color: rgb(var(--v-theme-success));
}
.problems.error {
  border-left-color: rgb(var(--v-theme-error));
}
.problems.warning {
  border-left-color: rgb(var(--v-theme-warning));
}
.problems .v-btn {
  grid-column: 2;
  justify-self: start;
}
.types {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.type {
  padding: 1px 8px;
  border: 1px solid rgb(var(--v-theme-divider));
  border-radius: 12px;
  font-size: 0.8rem;
  color: rgb(var(--v-theme-secondary));
}
</style>
