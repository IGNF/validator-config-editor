<script setup lang="ts">
import { mdiDatabaseOutline, mdiFileDocumentOutline, mdiFileOutline, mdiFilePdfBox, mdiFolderOutline, mdiTable } from '@mdi/js'
import type { FileNode } from '@core/model/file-tree'
import { href } from '../router'

// Un fichier attendu dans l'arbre ; un dossier est un groupe repliable de ses fichiers.
const props = defineProps<{ node: FileNode; model: string; modelPath: string }>()
const FILE_ICONS: Record<string, string> = {
  table: mdiTable,
  pdf: mdiFilePdfBox,
  directory: mdiFolderOutline,
  metadata: mdiFileDocumentOutline,
  multi_table: mdiDatabaseOutline,
}
const pointer = () => `/files/${props.node.index}`
</script>

<template>
  <v-list-group v-if="node.children.length" :value="`${model}:${node.file.path}`">
    <template #activator="{ props: activator, isOpen }">
      <v-list-item v-bind="activator" role="button" :aria-selected="null" :aria-expanded="isOpen" :prepend-icon="mdiFolderOutline" :title="node.file.name"
        :data-testid="`expected-${model}-${node.file.name}`" />
    </template>
    <FileTreeNode v-for="child in node.children" :key="child.index" :node="child" :model="model" :model-path="modelPath" />
  </v-list-group>
  <v-list-item v-else :href="href(modelPath, pointer())" :prepend-icon="FILE_ICONS[node.file.type] ?? mdiFileOutline" :title="node.file.name"
    :data-testid="`expected-${model}-${node.file.name}`" />
</template>
