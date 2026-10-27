<script setup lang="ts">
import { computed } from 'vue'
import type { LoadedModel } from '@core/model/types'
import { modelOf } from '../files'
import { href, route } from '../router'
import { useProject } from '../stores/project'
import ProblemCount from './ProblemCount.vue'

// Un modèle dans l'arbre : un lien vers sa vue (files.json) ; le détail est dans le panneau principal.
const props = defineProps<{ model: LoadedModel }>()
const store = useProject()

// Modèle du fichier affiché : mis en évidence (gras, barre latérale, fond).
const current = computed(() => !!route.value.file && modelOf(route.value.file) === props.model.name)
const modelPath = () => props.model.document?.path ?? `${props.model.name}/`
</script>

<template>
  <v-list-item :href="href(modelPath())" :active="current" :class="{ current }" :aria-current="current ? 'page' : undefined"
    :data-testid="`model-${model.name}`">
    <v-list-item-title>{{ store.isModelEdited(model.name) ? '● ' : '' }}{{ model.name }}</v-list-item-title>
    <template #append>
      <v-chip v-if="!model.document" size="x-small" class="mr-1">sans files.json</v-chip>
      <ProblemCount :counts="store.countsByModel.get(model.name)" :testid="`errors-${model.name}`" />
    </template>
  </v-list-item>
</template>

<style scoped>
.current,
.current :deep(.v-list-item-title) {
  font-weight: 700;
}
.current {
  border-left: 4px solid rgb(var(--v-theme-primary));
}
</style>
