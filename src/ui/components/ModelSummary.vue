<script setup lang="ts">
import { mdiAlertCircleOutline } from '@mdi/js'
import { computed } from 'vue'
import { fileTypeLabel } from '@core/labels'
import type { DocumentModel } from '@core/model/types'
import { useProject } from '../stores/project'

// Synthèse d'un modèle (004 US4) : fichiers par type, tables, listes de codes, problèmes.
const props = defineProps<{ name: string; doc: DocumentModel }>()
const store = useProject()
const loaded = computed(() => store.result!.project.models.get(props.name))
const byType = computed(() => {
  const counts = new Map<string, number>()
  for (const f of props.doc.files) counts.set(f.type, (counts.get(f.type) ?? 0) + 1)
  return [...counts].map(([type, n]) => `${n} ${fileTypeLabel(type).toLowerCase()}`)
})
const counts = computed(() => store.countsByModel.get(props.name) ?? { errors: 0, warnings: 0 })
const plural = (n: number, word: string) => `${n} ${word}${n > 1 ? 's' : ''}`
</script>

<template>
  <v-card variant="tonal" class="mb-4" data-testid="model-summary">
    <v-card-text class="d-flex flex-wrap ga-6">
      <div>
        <div class="text-h6">{{ doc.files.length }}</div>
        <div>fichiers attendus</div>
        <div class="text-caption">{{ byType.join(', ') }}</div>
      </div>
      <div>
        <div class="text-h6">{{ loaded?.tables.size ?? 0 }}</div>
        <div>modèles de table</div>
      </div>
      <div>
        <div class="text-h6">{{ doc.codes?.length ?? 0 }}</div>
        <div>listes de codes déclarées</div>
      </div>
      <div>
        <div class="text-h6">{{ counts.errors + counts.warnings }}</div>
        <div>problèmes</div>
        <div class="text-caption">{{ plural(counts.errors, 'erreur') }}, {{ plural(counts.warnings, 'avertissement') }}</div>
        <v-btn v-if="counts.errors + counts.warnings" :prepend-icon="mdiAlertCircleOutline" size="small" variant="text" class="px-0" data-testid="show-model-problems"
          @click="store.problemModel = name">Voir les problèmes</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>
