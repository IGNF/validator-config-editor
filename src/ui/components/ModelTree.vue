<script setup lang="ts">
import { mdiFolderMultipleOutline, mdiMagnify } from '@mdi/js'
import { computed, ref, watch } from 'vue'
import { groupByFamily, modelFamily } from '@core/labels'
import type { LoadedModel } from '@core/model/types'
import { countProblems } from '@core/validation/problems'
import { modelOf } from '../files'
import { route } from '../router'
import { useProject } from '../stores/project'
import ModelNode from './ModelNode.vue'
import ProblemCount from './ProblemCount.vue'

const store = useProject()
const filter = ref('')
const opened = ref<string[]>([])

const shown = computed(() => {
  const f = filter.value.trim().toLowerCase()
  return f ? store.models.filter((m) => m.name.toLowerCase().includes(f)) : store.models
})
// Familles de modèles (cnig_PLU, cnig_SUP…) ; un modèle seul dans sa famille n'est pas regroupé.
const nodes = computed(() => groupByFamily(shown.value))
const isFamily = (n: LoadedModel | { family: string; models: LoadedModel[] }): n is { family: string; models: LoadedModel[] } => 'family' in n
const familyKey = (family: string) => `famille:${family}`
const familyCounts = (models: LoadedModel[]) =>
  countProblems((store.result?.problems ?? []).filter((p) => models.some((m) => m.name === p.model)))

// Le filtre ouvre les familles concernées ; la sélection ouvre sa famille et son modèle.
watch(filter, (f) => {
  if (f?.trim()) opened.value = [...new Set([...opened.value, ...nodes.value.filter(isFamily).map((n) => familyKey(n.family))])]
})
watch(
  () => route.value.file,
  (file) => {
    const model = file && modelOf(file)
    if (model) opened.value = [...new Set([...opened.value, familyKey(modelFamily(model)), model])]
  },
  { immediate: true },
)
</script>

<template>
  <nav aria-label="Modèles">
    <v-text-field v-model="filter" label="Filtrer les modèles" :prepend-inner-icon="mdiMagnify" density="compact" variant="outlined"
      hide-details clearable class="ma-2" data-testid="model-filter" />
    <p class="text-caption px-4" aria-live="polite">{{ shown.length }} / {{ store.models.length }} modèles</p>
    <!-- Rôles : Vuetify donne « option » aux en-têtes de groupe, invalide hors d'une listbox. -->
    <!-- Retrait de 12 px par niveau (famille › modèle › fichiers) au lieu de 56 px, icône à 10 px du texte. -->
    <v-list v-model:opened="opened" density="compact" nav role="none" class="tree">
      <template v-for="n in nodes" :key="isFamily(n) ? familyKey(n.family) : n.name">
        <v-list-group v-if="isFamily(n)" :value="familyKey(n.family)">
          <template #activator="{ props }">
            <v-list-item v-bind="props" role="button" :aria-selected="null" :aria-expanded="opened.includes(familyKey(n.family))"
              :prepend-icon="mdiFolderMultipleOutline" :data-testid="`family-${n.family}`">
              <v-list-item-title><strong>{{ n.family }}</strong> <span class="text-medium-emphasis">({{ n.models.length }})</span></v-list-item-title>
              <template #append><ProblemCount :counts="familyCounts(n.models)" /></template>
            </v-list-item>
          </template>
          <ModelNode v-for="m in n.models" :key="m.name" :model="m" :opened="opened.includes(m.name)" />
        </v-list-group>
        <ModelNode v-else :model="n" :opened="opened.includes(n.name)" />
      </template>
    </v-list>
  </nav>
</template>

<style scoped>
.tree {
  --v-list-group-prepend: 0px;
  --v-list-indent: 12px;
  --v-list-prepend-gap: 10px;
}
</style>
