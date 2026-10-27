<script setup lang="ts">
import { mdiDatabaseOutline, mdiFileDocumentOutline, mdiFileOutline, mdiFilePdfBox, mdiFolderOutline, mdiTable } from '@mdi/js'
import { inject, watch } from 'vue'
import type { FileNode } from '@core/model/file-tree'
import { resolvePath, tableModelRef } from '@core/model/paths'
import { href, route } from '../router'
import { useProject } from '../stores/project'

// Un fichier attendu dans l'arbre ; un dossier est un groupe repliable de ses fichiers.
const props = defineProps<{ node: FileNode; model: string; modelPath: string }>()
const FILE_ICONS: Record<string, string> = {
  table: mdiTable,
  pdf: mdiFilePdfBox,
  directory: mdiFolderOutline,
  metadata: mdiFileDocumentOutline,
  multi_table: mdiDatabaseOutline,
}
const store = useProject()
const pointer = () => `/files/${props.node.index}`
// Fichier de type table : sa table s'il la trouve (012, R1), sinon le fichier dans la vue du modèle.
const tableOf = (node: FileNode) => {
  if (node.file.type !== 'table') return undefined
  const ref = tableModelRef(node.file.tableModel, node.file.name)
  const path = ref === undefined ? undefined : resolvePath(props.model, ref)
  return path && store.has(path) ? path : undefined
}
const tablePath = () => tableOf(props.node)
const isActive = (node: FileNode): boolean => {
  const table = tableOf(node)
  return table ? route.value.file === table : route.value.file === props.modelPath && route.value.pointer === `/files/${node.index}`
}
const active = () => isActive(props.node)
// Dossier qui contient l'élément affiché : ouvert, pour que la ligne soit visible (012, R1).
const contains = (node: FileNode): boolean => node.children.some((c) => isActive(c) || contains(c))
const open = inject<(key: string) => void>('openTreeGroup', () => {})
watch(() => [route.value.file, route.value.pointer], () => {
  if (props.node.children.length && contains(props.node)) open(`${props.model}:${props.node.file.path}`)
}, { immediate: true })
</script>

<template>
  <v-list-group v-if="node.children.length" :value="`${model}:${node.file.path}`">
    <template #activator="{ props: activator, isOpen }">
      <v-list-item v-bind="activator" role="button" :aria-selected="null" :aria-expanded="isOpen" :prepend-icon="mdiFolderOutline" :title="node.file.name"
        :data-testid="`expected-${model}-${node.file.name}`" />
    </template>
    <FileTreeNode v-for="child in node.children" :key="child.index" :node="child" :model="model" :model-path="modelPath" />
  </v-list-group>
  <v-list-item v-else :href="tablePath() ? href(tablePath()!) : href(modelPath, pointer())" :active="active()" :aria-current="active() ? 'page' : undefined" :prepend-icon="FILE_ICONS[node.file.type] ?? mdiFileOutline" :title="node.file.name"
    :data-testid="`expected-${model}-${node.file.name}`" />
</template>
