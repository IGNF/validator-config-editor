<script setup lang="ts">
import { mdiFileDocumentOutline, mdiTune } from '@mdi/js'
import { computed } from 'vue'
import { fileTree } from '@core/model/file-tree'
import type { LoadedModel } from '@core/model/types'
import { modelOf } from '../files'
import { href, route } from '../router'
import { useProject } from '../stores/project'
import FileTreeNode from './FileTreeNode.vue'
import ProblemCount from './ProblemCount.vue'

// Un modèle dans l'arbre (012, R1) : son document, ses fichiers attendus (une table s'ouvre depuis
// son fichier), ses surcharges GpU. Les listes de codes s'ouvrent depuis la vue du modèle.
const props = defineProps<{ model: LoadedModel; opened: boolean }>()
const store = useProject()

const mark = (path: string | undefined) => (path && store.isEdited(path) ? '● ' : '')
// Modèle du fichier affiché : mis en évidence (gras, barre latérale, fond).
const current = computed(() => !!route.value.file && modelOf(route.value.file) === props.model.name)
const modelPath = () => props.model.document?.path ?? `${props.model.name}/`
// Fichiers attendus rangés selon l'arborescence de leurs chemins (dossiers repliables).
const expectedFiles = () => store.result?.checked.get(props.model.name)?.document?.files ?? []
const expected = () => fileTree(expectedFiles())
</script>

<template>
  <!-- Modèle affiché : tout son bloc (en-tête et fichiers) encadré en bleu. -->
  <v-list-group :value="model.name" :class="{ 'current-group': current }" :data-testid="`model-group-${model.name}`">
    <template #activator="{ props: activator }">
      <v-list-item v-bind="activator" role="button" :aria-selected="null" :aria-expanded="opened" :class="{ current }"
        :aria-current="current ? 'true' : undefined" :data-testid="`model-${model.name}`">
        <v-list-item-title>{{ store.isModelEdited(model.name) ? '● ' : '' }}{{ model.name }}</v-list-item-title>
        <template #append>
          <v-chip v-if="!model.document" size="x-small" class="mr-1">sans files.json</v-chip>
          <ProblemCount :counts="store.countsByModel.get(model.name)" :testid="`errors-${model.name}`" />
        </template>
      </v-list-item>
    </template>
    <v-list-item :href="href(modelPath())" :active="route.file === modelPath() && route.pointer === undefined"
      :aria-current="route.file === modelPath() && route.pointer === undefined ? 'page' : undefined" :prepend-icon="mdiFileDocumentOutline"
      :title="mark(model.document?.path) + (model.document ? 'Modèle (files.json)' : 'Dossier sans files.json')">
      <template #append><ProblemCount :counts="store.countsByFile.get(modelPath())" /></template>
    </v-list-item>
    <template v-if="expectedFiles().length">
      <v-list-subheader>Fichiers ({{ expectedFiles().length }})</v-list-subheader>
      <FileTreeNode v-for="node in expected()" :key="node.index" :node="node" :model="model.name" :model-path="modelPath()" />
    </template>
    <v-list-item v-if="model.gpu" :href="href(model.gpu.path)" :active="route.file === model.gpu.path" :aria-current="route.file === model.gpu.path ? 'page' : undefined" :prepend-icon="mdiTune" :title="mark(model.gpu.path) + 'Surcharges GpU (gpu.json)'">
      <template #append><ProblemCount :counts="store.countsByFile.get(model.gpu.path)" /></template>
    </v-list-item>
  </v-list-group>
</template>

<style scoped>
.current-group {
  border: 2px solid rgb(var(--v-theme-primary));
  border-radius: 6px;
  margin: 2px 0;
}
.current,
.current :deep(.v-list-item-title) {
  font-weight: 700;
}
.current {
  border-left: 4px solid rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary), 0.08);
}
</style>
