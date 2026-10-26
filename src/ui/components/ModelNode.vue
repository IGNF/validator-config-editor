<script setup lang="ts">
import { mdiFileDocumentOutline, mdiFolderDownload, mdiFormatListBulleted, mdiTable, mdiTune } from '@mdi/js'
import type { LoadedModel } from '@core/model/types'
import { baseName } from '../files'
import { href, route } from '../router'
import { useProject } from '../stores/project'
import ProblemCount from './ProblemCount.vue'

// Un modèle dans l'arbre : son document, ses tables, ses listes de codes, ses surcharges GpU.
const props = defineProps<{ model: LoadedModel; opened: boolean }>()
const store = useProject()

const mark = (path: string | undefined) => (path && store.isEdited(path) ? '● ' : '')
const tables = () =>
  [...props.model.tables.keys()].map((path) => {
    const name = store.result?.checked.get(props.model.name)?.tables.get(path)?.name
    return { path, title: name ?? baseName(path).replace(/\.json$/, '') }
  })
const codeLists = () => [...props.model.csvs.keys()].map((path) => ({ path, title: baseName(path).replace(/\.csv$/i, '') }))
const modelPath = () => props.model.document?.path ?? `${props.model.name}/`
</script>

<template>
  <v-list-group :value="model.name">
    <template #activator="{ props: activator }">
      <v-list-item v-bind="activator" role="button" :aria-selected="null" :aria-expanded="opened" :data-testid="`model-${model.name}`">
        <v-list-item-title>{{ store.isModelEdited(model.name) ? '● ' : '' }}{{ model.name }}</v-list-item-title>
        <template #append>
          <v-chip v-if="!model.document" size="x-small" class="mr-1">sans files.json</v-chip>
          <ProblemCount :counts="store.countsByModel.get(model.name)" :testid="`errors-${model.name}`" />
        </template>
      </v-list-item>
    </template>
    <v-list-item :href="href(modelPath())" :active="route.file === modelPath()" :prepend-icon="mdiFileDocumentOutline"
      :title="mark(model.document?.path) + (model.document ? 'Modèle (files.json)' : 'Dossier sans files.json')">
      <template #append><ProblemCount :counts="store.countsByFile.get(modelPath())" /></template>
    </v-list-item>
    <template v-if="model.tables.size">
      <v-list-subheader>Tables ({{ model.tables.size }})</v-list-subheader>
      <v-list-item v-for="t in tables()" :key="t.path" :href="href(t.path)" :active="route.file === t.path" :prepend-icon="mdiTable" :title="mark(t.path) + t.title">
        <template #append><ProblemCount :counts="store.countsByFile.get(t.path)" /></template>
      </v-list-item>
    </template>
    <template v-if="model.csvs.size">
      <v-list-subheader>Listes de codes ({{ model.csvs.size }})</v-list-subheader>
      <v-list-item v-for="c in codeLists()" :key="c.path" :href="href(c.path)" :active="route.file === c.path" :prepend-icon="mdiFormatListBulleted" :title="mark(c.path) + c.title">
        <template #append><ProblemCount :counts="store.countsByFile.get(c.path)" /></template>
      </v-list-item>
    </template>
    <v-list-item v-if="model.gpu" :href="href(model.gpu.path)" :active="route.file === model.gpu.path" :prepend-icon="mdiTune" :title="mark(model.gpu.path) + 'Surcharges GpU (gpu.json)'">
      <template #append><ProblemCount :counts="store.countsByFile.get(model.gpu.path)" /></template>
    </v-list-item>
    <v-list-item role="button" :prepend-icon="mdiFolderDownload" title="Télécharger le modèle (ZIP)" :data-testid="`download-model-${model.name}`"
      @click="store.download({ kind: 'model', model: model.name })" />
  </v-list-group>
</template>
