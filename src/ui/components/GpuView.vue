<script setup lang="ts">
import { computed } from 'vue'
import { indexObjects, type ObjectRef } from '@core/model/objects'
import type { GpuSection } from '@core/model/types'
import { modelOf } from '../files'
import { href } from '../router'
import { useProject } from '../stores/project'
import FileFrame from './FileFrame.vue'
import NotConformant from './NotConformant.vue'

const props = defineProps<{ file: string }>()
const store = useProject()
const model = computed(() => modelOf(props.file))
const gpu = computed(() => store.result!.checked.get(model.value)?.gpu)

const SECTIONS: Record<GpuSection, string> = {
  validator_document_model: 'Modèle de document',
  validator_file_model: 'Fichiers',
  validator_feature_type: 'Tables',
  validator_static_table: 'Listes de codes',
  validator_attribute_type: 'Colonnes',
}

// Objets connus : ceux du modèle, puis ceux de son parent et des modèles qui en héritent.
const objects = computed(() => {
  const index = new Map<string, ObjectRef>()
  const models = store.result!.project.models
  const checked = store.result!.checked
  const parent = checked.get(model.value)?.document?.parent?.name
  const related = [model.value, ...(parent ? [parent] : [])]
  for (const c of checked.values()) if (c.document?.parent?.name === model.value) related.push(c.model.name)
  for (const name of related) {
    const loaded = models.get(name)
    if (loaded) for (const [id, ref] of indexObjects(loaded)) if (!index.has(id)) index.set(id, ref)
  }
  return index
})

const sections = computed(() =>
  (Object.keys(SECTIONS) as GpuSection[])
    .filter((s) => gpu.value?.[s])
    .map((s) => ({ key: s, title: SECTIONS[s], entries: Object.entries(gpu.value![s]!) })),
)

const definitionName = (entry: Record<string, string | null>) => entry.name ?? undefined
</script>

<template>
  <FileFrame :title="`Surcharges GpU de ${model}`" :file="file" :source="file">
    <NotConformant v-if="!gpu" />
    <template v-else>
      <p v-if="sections.length === 0">Aucune surcharge.</p>
      <template v-for="s in sections" :key="s.key">
        <h2 class="text-h6">{{ s.title }} ({{ s.entries.length }})</h2>
        <v-table density="compact" class="mb-6">
          <thead>
            <tr><th>Objet</th><th>Identifiant</th><th>Surcharges</th></tr>
          </thead>
          <tbody>
            <tr v-for="[id, entry] in s.entries" :key="id" :data-pointer="`/${s.key}/${id}`">
              <td>
                <a v-if="objects.get(id)" :href="href(objects.get(id)!.file, objects.get(id)!.pointer)">
                  {{ objects.get(id)!.kind }} {{ objects.get(id)!.label }}
                </a>
                <span v-else-if="definitionName(entry)">défini dans gpu.json : {{ definitionName(entry) }}</span>
                <span v-else class="text-warning">objet inconnu</span>
              </td>
              <td><code>{{ id }}</code></td>
              <td>
                <div v-for="(value, key) in entry" :key="key" class="override">
                  <strong>{{ key }}</strong> : <code>{{ value ?? 'null' }}</code>
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
      </template>
    </template>
  </FileFrame>
</template>

<style scoped>
.override {
  word-break: break-all;
}
</style>
