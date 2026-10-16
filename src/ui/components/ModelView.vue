<script setup lang="ts">
import { computed } from 'vue'
import { resolvePath, tableModelRef } from '@core/model/paths'
import type { FileModel } from '@core/model/types'
import { modelOf } from '../files'
import { href } from '../router'
import { useProject } from '../stores/project'
import FileFrame from './FileFrame.vue'
import NotConformant from './NotConformant.vue'

const props = defineProps<{ file: string }>()
const store = useProject()
const name = computed(() => modelOf(props.file))
const loaded = computed(() => store.result!.project.models.get(name.value))
const doc = computed(() => store.result!.checked.get(name.value)?.document)
const exists = (path: string | undefined) => path !== undefined && store.files.has(path)
const children = computed(() =>
  [...store.result!.checked.values()].filter((c) => c.document?.parent?.name === name.value).map((c) => c.model.name),
)

const MANDATORY: Record<string, string> = { ERROR: 'obligatoire', WARN: 'recommandé', OPTIONAL: 'facultatif' }

function tableOf(f: FileModel): { text: string; path?: string } | undefined {
  if (f.type !== 'table') return undefined
  const ref = tableModelRef(f.tableModel, f.name)
  if (ref === undefined) return { text: f.tableModel ?? '' }
  const path = resolvePath(name.value, ref)
  return { text: f.tableModel ?? `${ref} (convention)`, ...(exists(path) && { path }) }
}

const codePath = (data: string) => {
  const path = resolvePath(name.value, data)
  return exists(path) ? path : undefined
}
</script>

<template>
  <FileFrame :title="`Modèle ${name}`" :file="loaded?.document?.path ?? `${name}/`" :source="loaded?.document?.path">
    <template #chips>
      <v-chip v-if="!loaded?.document || doc?.abstract" size="small" color="secondary">abstrait</v-chip>
    </template>

    <template v-if="!loaded?.document">
      <p class="mb-2">Modèle abstrait : ce dossier ne contient que des surcharges GpU.</p>
      <p v-if="loaded?.gpu"><a :href="href(loaded.gpu.path)">Surcharges GpU (gpu.json)</a></p>
      <template v-if="children.length">
        <h2 class="text-h6 mt-4">Modèles qui en héritent ({{ children.length }})</h2>
        <ul class="ml-6">
          <li v-for="child in children" :key="child"><a :href="href(`${child}/files.json`)">{{ child }}</a></li>
        </ul>
      </template>
    </template>

    <NotConformant v-else-if="!doc" />

    <template v-else>
      <v-table density="compact" class="mb-6 properties" data-pointer="">
        <tbody>
          <tr><th scope="row">Nom</th><td>{{ doc.name }}</td></tr>
          <tr><th scope="row">Titre</th><td>{{ doc.title }}</td></tr>
          <tr><th scope="row">Description</th><td>{{ doc.description }}</td></tr>
          <tr><th scope="row">Identifiant</th><td><code>{{ doc.id }}</code></td></tr>
          <tr><th scope="row">Nom du dossier (regex)</th><td><code>{{ doc.constraints?.folderName }}</code></td></tr>
          <tr><th scope="row">Spécification des métadonnées</th><td>{{ doc.constraints?.metadataSpecification }}</td></tr>
          <tr v-if="doc.parent" data-pointer="/parent">
            <th scope="row">Modèle parent</th>
            <td><a :href="href(`${doc.parent.name}/`)">{{ doc.parent.name }}</a></td>
          </tr>
        </tbody>
      </v-table>

      <h2 class="text-h6">Fichiers ({{ doc.files.length }})</h2>
      <v-table density="compact" class="mb-6">
        <thead>
          <tr><th>Nom</th><th>Type</th><th>Chemin (regex)</th><th>Présence</th><th>Modèle de table</th></tr>
        </thead>
        <tbody>
          <tr v-for="(f, i) in doc.files" :key="f.id" :data-pointer="`/files/${i}`">
            <td>{{ f.name }}</td>
            <td>{{ f.type }}</td>
            <td><code class="path">{{ f.path }}</code></td>
            <td>{{ MANDATORY[f.mandatory ?? 'WARN'] }}</td>
            <td>
              <template v-if="tableOf(f)">
                <a v-if="tableOf(f)!.path" :href="href(tableOf(f)!.path!)">{{ tableOf(f)!.text }}</a>
                <span v-else class="text-error">{{ tableOf(f)!.text }}</span>
              </template>
            </td>
          </tr>
        </tbody>
      </v-table>

      <h2 class="text-h6">Listes de codes ({{ doc.codes?.length ?? 0 }})</h2>
      <v-table density="compact">
        <thead>
          <tr><th>Nom</th><th>Fichier</th></tr>
        </thead>
        <tbody>
          <tr v-for="(c, i) in doc.codes ?? []" :key="c.id" :data-pointer="`/codes/${i}`">
            <td>{{ c.name }}</td>
            <td>
              <a v-if="codePath(c.data)" :href="href(codePath(c.data)!)">{{ c.data }}</a>
              <span v-else class="text-error">{{ c.data }}</span>
            </td>
          </tr>
        </tbody>
      </v-table>
    </template>
  </FileFrame>
</template>

<style scoped>
.properties th {
  width: 16rem;
}
.path {
  word-break: break-all;
}
</style>
