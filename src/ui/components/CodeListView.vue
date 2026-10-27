<script setup lang="ts">
import { mdiDelete, mdiPlus } from '@mdi/js'
import { computed, nextTick } from 'vue'
import { addCsvRow, csvEditable, removeCsvRow, setCsvCell } from '@core/edit/csv-edit'
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

// Édition des valeurs : une ligne de CSV réécrite à la fois (le reste du fichier est conservé).
const text = computed(() => store.text(props.file))
const editable = computed(() => !store.readOnly && text.value !== undefined && csvEditable(text.value))
const apply = (next: string) => store.applyChanges([{ path: props.file, kind: 'text', text: next }])
// Une ligne sans aucune valeur serait ignorée à la lecture : une liste à une colonne garde une valeur.
function setCell(row: number, column: number, value: string, input?: HTMLInputElement) {
  const current = csv.value?.rows[row]?.[column] ?? ''
  if (text.value === undefined || value === current) return
  if (value === '' && csv.value?.header.length === 1) {
    if (input) input.value = current
    store.notice = 'Une liste à une colonne ne peut pas avoir de valeur vide : supprimez plutôt la ligne.'
    return
  }
  apply(setCsvCell(text.value, row, column, value))
}
// Ligne ajoutée avec « NOUVEAU » en première colonne, sélectionné pour être remplacé.
async function addRow() {
  if (text.value === undefined) return
  apply(addCsvRow(text.value, ['NOUVEAU']))
  await nextTick()
  const input = document.querySelector<HTMLInputElement>('[data-testid="code-values"] tbody tr:last-child input')
  input?.focus()
  input?.select()
}
</script>

<template>
  <FileFrame :title="`Liste de codes ${name ?? baseName(file)}`" :file="file" :source="file">
    <NotConformant v-if="!csv" />
    <template v-else>
      <div class="d-flex align-center flex-wrap ga-2 mb-2">
        <p class="mb-0">{{ csv.rows.length }} valeur{{ csv.rows.length > 1 ? 's' : '' }}</p>
        <v-spacer />
        <v-btn v-if="editable" :prepend-icon="mdiPlus" variant="tonal" data-testid="add-row" @click="addRow">Ajouter une ligne</v-btn>
      </div>
      <p v-if="!store.readOnly && !editable" class="text-body-2 mb-2">Une valeur s'étend sur plusieurs lignes : modifiez ce fichier dans un éditeur de texte.</p>
      <!-- Tableau large : région défilante accessible au clavier. -->
      <div class="scroll" tabindex="0" role="region" :aria-label="`Valeurs de ${name ?? baseName(file)}`">
      <v-table density="compact" data-testid="code-values">
        <thead>
          <tr><th v-for="h in csv.header" :key="h">{{ h }}</th><th v-if="editable" class="actions"><span class="sr-only">Actions</span></th></tr>
        </thead>
        <tbody>
          <!-- Pointeur '/<ligne>' : la ligne 1 est l'en-tête (contrat problem-codes). -->
          <tr v-for="(row, i) in csv.rows" :key="i" :data-pointer="`/${i + 2}`">
            <td v-for="(v, j) in csv.header.map((_, k) => row[k] ?? '')" :key="j">
              <input v-if="editable" class="cell" :value="v" :aria-label="`${csv.header[j]}, ligne ${i + 2}`" :data-testid="`cell-${i}-${j}`"
                @change="setCell(i, j, ($event.target as HTMLInputElement).value, $event.target as HTMLInputElement)" @keydown.enter="($event.target as HTMLInputElement).blur()" />
              <template v-else>{{ v }}</template>
            </td>
            <td v-if="editable" class="actions">
              <v-btn :icon="mdiDelete" size="x-small" variant="text" :aria-label="`Supprimer la ligne ${i + 2}`" :data-testid="`remove-row-${i}`"
                @click="apply(removeCsvRow(text!, i))" />
            </td>
          </tr>
        </tbody>
      </v-table>
      </div>
    </template>
  </FileFrame>
</template>

<style scoped>
.cell {
  width: 100%;
  min-width: 6rem;
  padding: 2px 6px;
  border: 1px solid transparent;
  border-radius: 4px;
  font: inherit;
  color: inherit;
  background: transparent;
}
.cell:hover {
  border-color: rgb(var(--v-theme-divider));
}
.cell:focus {
  outline: none;
  border-color: rgb(var(--v-theme-primary));
  background: rgb(var(--v-theme-surface));
}
.actions {
  width: 1%;
  white-space: nowrap;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
.scroll {
  overflow-x: auto;
}
.scroll :deep(.v-table__wrapper) {
  overflow: visible;
}
</style>
