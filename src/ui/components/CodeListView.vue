<script setup lang="ts">
import { computed } from 'vue'
import { resolvePath } from '@core/model/paths'
import { baseName, modelOf } from '../files'
import { useProject } from '../stores/project'
import FileFrame from './FileFrame.vue'
import NotConformant from './NotConformant.vue'

const props = defineProps<{ file: string }>()
const store = useProject()
const model = computed(() => modelOf(props.file))
const csv = computed(() => store.result!.project.models.get(model.value)?.csvs.get(props.file)?.csv)
const name = computed(
  () => store.result!.checked.get(model.value)?.document?.codes?.find((c) => resolvePath(model.value, c.data) === props.file)?.name,
)
</script>

<template>
  <FileFrame :title="`Liste de codes ${name ?? baseName(file)}`" :file="file" :source="file">
    <NotConformant v-if="!csv" />
    <template v-else>
      <p class="mb-2">{{ csv.rows.length }} valeur{{ csv.rows.length > 1 ? 's' : '' }}</p>
      <v-table density="compact">
        <thead>
          <tr><th v-for="h in csv.header" :key="h">{{ h }}</th></tr>
        </thead>
        <tbody>
          <!-- Pointeur '/<ligne>' : la ligne 1 est l'en-tête (contrat problem-codes). -->
          <tr v-for="(row, i) in csv.rows" :key="i" :data-pointer="`/${i + 2}`">
            <td v-for="(v, j) in row" :key="j">{{ v }}</td>
          </tr>
        </tbody>
      </v-table>
    </template>
  </FileFrame>
</template>
