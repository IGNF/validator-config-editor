<script setup lang="ts">
import { mdiArrowDown, mdiArrowUp, mdiDelete, mdiPlus } from '@mdi/js'
import { computed, ref, watch } from 'vue'
import { setAt } from '@core/edit/pointer'
import {
  addColumn, addListItem, moveColumn, parseEnum, removeColumn, removeListItem, setConstraint, setListItem, setOrRemove, type TableList,
} from '@core/edit/operations'
import { columnTypeFamily } from '@core/labels'
import { resolvePath } from '@core/model/paths'
import type { ColumnConstraints, TableModel } from '@core/model/types'
import { pointer } from '@core/pointer'
import { parseForeignKey } from '@core/validation/foreign-key'
import { baseName, modelOf } from '../files'
import { href, route } from '../router'
import { useProject } from '../stores/project'
import FileFrame from './FileFrame.vue'
import ProblemBadge from './ProblemBadge.vue'
import RegexText from './RegexText.vue'
import EquivalentsDialog from './EquivalentsDialog.vue'
import NotConformant from './NotConformant.vue'

const props = defineProps<{ file: string }>()
const store = useProject()
const model = computed(() => modelOf(props.file))
const checked = computed(() => store.result!.checked.get(model.value))

// Donnée courante, même non conforme au schéma, pourvu qu'elle ait une liste de colonnes :
// l'édition permet alors de corriger.
const table = computed(() => {
  const d = store.data(props.file) as TableModel | undefined
  return d && typeof d === 'object' && Array.isArray(d.columns) ? d : undefined
})

const TYPES = [
  'String', 'Integer', 'Double', 'Boolean', 'Date', 'Url', 'Filename', 'Path',
  'Point', 'LineString', 'Polygon', 'MultiPoint', 'MultiLineString', 'MultiPolygon', 'Geometry', 'GeometryCollection',
].map((value) => ({ title: `${value} (${columnTypeFamily(value)})`, value }))

type Update = (t: TableModel) => unknown
const edit = (update: Update, key?: string) => store.edit<TableModel>(props.file, update, key)
const setProp = (ptr: string, value: unknown, required = false) =>
  edit((t) => (required ? setAt(t, ptr, value ?? '') : setOrRemove(t, ptr, value)), ptr)
const setNumber = (i: number, key: string, value: string | number | null) =>
  edit((t) => setConstraint(t, i, key, value === '' || value === null ? undefined : Number(value)), pointer('columns', i, key))

// Colonne ouverte : suit le pointeur de l'URL (problème cliqué) et l'ajout de colonne.
const opened = ref<number[]>([])
watch(
  () => route.value.pointer,
  (p) => {
    const m = /^\/columns\/(\d+)/.exec(p ?? '')
    if (m && !opened.value.includes(Number(m[1]))) opened.value = [...opened.value, Number(m[1])]
  },
  { immediate: true },
)
function add() {
  edit((t) => addColumn(t, store.ids()))
  opened.value = [table.value!.columns.length - 1]
}

// Résumé des contraintes ; le motif s'affiche avec ses variables, regex complète au survol (010).
function constraints(c: ColumnConstraints | undefined): { text: string; title?: string; regex?: string }[] {
  if (!c) return []
  const out: { text: string; title?: string; regex?: string }[] = []
  if (c.required) out.push({ text: 'valeur obligatoire' })
  if (c.presenceRequired) out.push({ text: 'colonne obligatoire' })
  if (c.unique) out.push({ text: 'unique' })
  if (c.minLength !== undefined) out.push({ text: `longueur ≥ ${c.minLength}` })
  if (c.maxLength !== undefined && c.maxLength >= 0) out.push({ text: `longueur ≤ ${c.maxLength}` })
  if (c.pattern) out.push({ text: `motif ${store.regexDisplay(c.pattern, model.value)}`, title: c.pattern, regex: c.pattern })
  if (c.enum?.length) out.push({ text: `valeurs : ${c.enum.join(', ')}` })
  if (c.reference) out.push({ text: `référence ${c.reference}` })
  return out
}

// Cible d'une clé étrangère : liste de codes du modèle, sinon table du modèle.
function target(text: string): { label: string; path?: string } | undefined {
  const fk = parseForeignKey(text)
  if (!fk) return undefined
  const code = checked.value?.document?.codes?.find((c) => c.name === fk.target)
  const codePath = code && resolvePath(model.value, code.data)
  if (store.has(codePath)) return { label: fk.target, path: codePath }
  const tablePath = [...(checked.value?.tables ?? [])].find(([, t]) => t.name === fk.target)?.[0]
  return { label: fk.target, ...(tablePath && { path: tablePath }) }
}

const LISTS: { key: TableList; title: string; placeholder: string }[] = [
  { key: 'foreignKeys', title: 'Clés étrangères', placeholder: '(COLONNE) REFERENCES Liste(COLONNE)' },
  { key: 'conditions', title: 'Conditions', placeholder: 'COLONNE IS NOT NULL OR …' },
]
</script>

<template>
  <FileFrame :title="`Table ${table?.name || baseName(file)}`" :file="file" :source="file">
    <NotConformant v-if="!table" />
    <template v-else>
      <div class="d-flex flex-wrap ga-4 mb-2" data-pointer="">
        <v-text-field label="Nom" :model-value="table.name" density="compact" variant="outlined" class="field" data-testid="table-name"
          @update:model-value="(v: string) => setProp('/name', v, true)" />
        <v-text-field label="Titre" :model-value="table.title" density="compact" variant="outlined" class="field"
          @update:model-value="(v: string) => setProp('/title', v)" />
      </div>
      <v-textarea label="Description" :model-value="table.description" density="compact" variant="outlined" rows="1" auto-grow
        @update:model-value="(v: string) => setProp('/description', v)" />

      <div class="d-flex align-center mt-2">
        <h2 class="text-h6">Colonnes ({{ table.columns.length }})</h2>
        <v-spacer />
        <v-btn :prepend-icon="mdiPlus" variant="tonal" data-testid="add-column" @click="add">Ajouter une colonne</v-btn>
      </div>

      <v-expansion-panels v-model="opened" multiple variant="accordion" class="my-2">
        <v-expansion-panel v-for="(c, i) in table.columns" :key="c.id ?? i" :value="i" :data-pointer="`/columns/${i}`" :data-testid="`column-${c.name}`">
          <v-expansion-panel-title>
            <div class="d-flex flex-wrap align-center ga-2">
              <strong>{{ c.name }}</strong>
              <ProblemBadge :file="file" :pointer="`/columns/${i}`" />
              <span class="text-medium-emphasis">{{ c.type }}<template v-if="columnTypeFamily(c.type)"> · {{ columnTypeFamily(c.type) }}</template></span>
              <span v-for="k in constraints(c.constraints)" :key="k.text" class="constraint" :title="k.title"><template v-if="k.regex">motif <RegexText :value="k.regex" :model="model" /></template><template v-else>{{ k.text }}</template></span>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div class="d-flex flex-wrap ga-4">
              <v-text-field label="Nom" :model-value="c.name" density="compact" variant="outlined" class="field" data-testid="column-name"
                @update:model-value="(v: string) => setProp(pointer('columns', i, 'name'), v, true)" />
              <v-text-field label="Titre" :model-value="c.title" density="compact" variant="outlined" class="field"
                @update:model-value="(v: string) => setProp(pointer('columns', i, 'title'), v)" />
              <v-select label="Type" :items="TYPES" :model-value="c.type" density="compact" variant="outlined" class="field" data-testid="column-type"
                @update:model-value="(v: string) => setProp(pointer('columns', i, 'type'), v, true)" />
            </div>
            <v-textarea label="Description" :model-value="c.description" density="compact" variant="outlined" rows="1" auto-grow
              @update:model-value="(v: string) => setProp(pointer('columns', i, 'description'), v)" />
            <div class="d-flex flex-wrap ga-4">
              <v-checkbox label="Valeur obligatoire" :model-value="c.constraints?.required ?? false" density="compact" hide-details
                @update:model-value="(v: boolean | null) => edit((t) => setConstraint(t, i, 'required', !!v))" />
              <v-checkbox label="Colonne obligatoire" :model-value="c.constraints?.presenceRequired ?? false" density="compact" hide-details
                @update:model-value="(v: boolean | null) => edit((t) => setConstraint(t, i, 'presenceRequired', !!v))" />
              <v-checkbox label="Unique" :model-value="c.constraints?.unique ?? false" density="compact" hide-details
                @update:model-value="(v: boolean | null) => edit((t) => setConstraint(t, i, 'unique', !!v))" />
            </div>
            <div class="d-flex flex-wrap ga-4 mt-2">
              <v-text-field label="Longueur minimale" type="number" :model-value="c.constraints?.minLength" density="compact" variant="outlined" class="number"
                @update:model-value="(v: string) => setNumber(i, 'minLength', v)" />
              <v-text-field label="Longueur maximale" type="number" :model-value="c.constraints?.maxLength" density="compact" variant="outlined" class="number"
                data-testid="column-maxLength" @update:model-value="(v: string) => setNumber(i, 'maxLength', v)" />
              <v-text-field label="Motif (expression régulière)" :model-value="c.constraints?.pattern" density="compact" variant="outlined" class="field"
                :hint="store.regexHint(c.constraints?.pattern, model)" persistent-hint data-testid="column-pattern"
                @update:model-value="(v: string) => edit((t) => setConstraint(t, i, 'pattern', store.regexInput(v, model)), pointer('columns', i, 'pattern'))" />
              <v-text-field label="Référence (TABLE.COLONNE)" :model-value="c.constraints?.reference" density="compact" variant="outlined" class="field"
                data-testid="column-reference" @update:model-value="(v: string) => edit((t) => setConstraint(t, i, 'reference', v), pointer('columns', i, 'reference'))" />
            </div>
            <v-textarea label="Valeurs autorisées (une par ligne)" :model-value="(c.constraints?.enum ?? []).join('\n')" density="compact" variant="outlined" rows="1" auto-grow
              @update:model-value="(v: string) => edit((t) => setConstraint(t, i, 'enum', parseEnum(v, c.constraints?.enum)), pointer('columns', i, 'enum'))" />
            <div class="d-flex flex-wrap ga-2">
              <v-btn :prepend-icon="mdiArrowUp" size="small" variant="text" :disabled="i === 0" @click="edit((t) => moveColumn(t, i, i - 1))">Monter</v-btn>
              <v-btn :prepend-icon="mdiArrowDown" size="small" variant="text" :disabled="i === table.columns.length - 1" @click="edit((t) => moveColumn(t, i, i + 1))">Descendre</v-btn>
              <EquivalentsDialog :source="{ kind: 'column', file, pointer: pointer('columns', i) }" :label="`${table.name}.${c.name}`" />
              <v-spacer />
              <v-btn :prepend-icon="mdiDelete" size="small" variant="text" color="error" data-testid="remove-column" @click="edit((t) => removeColumn(t, i))">Supprimer la colonne</v-btn>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <template v-for="list in LISTS" :key="list.key">
        <div class="d-flex align-center mt-4">
          <h2 class="text-h6">{{ list.title }} ({{ table.constraints?.[list.key]?.length ?? 0 }})</h2>
          <v-spacer />
          <v-btn :prepend-icon="mdiPlus" variant="tonal" :data-testid="`add-${list.key}`" @click="edit((t) => addListItem(t, list.key))">Ajouter</v-btn>
        </div>
        <div v-for="(text, i) in table.constraints?.[list.key] ?? []" :key="i" class="d-flex align-center ga-2" :data-pointer="`/constraints/${list.key}/${i}`">
          <v-text-field :label="`${list.title} ${i + 1}`" :model-value="text" :placeholder="list.placeholder" density="compact" variant="outlined" hide-details class="mono"
            :data-testid="`${list.key}-${i}`" @update:model-value="(v: string) => edit((t) => setListItem(t, list.key, i, v), `/constraints/${list.key}/${i}`)" />
          <template v-if="list.key === 'foreignKeys' && target(text)">
            →
            <a v-if="target(text)!.path" :href="href(target(text)!.path!)">{{ target(text)!.label }}</a>
            <span v-else class="text-error">{{ target(text)!.label }}</span>
          </template>
          <v-btn :icon="mdiDelete" size="small" variant="text" :aria-label="`Supprimer ${list.title.toLowerCase()} ${i + 1}`" @click="edit((t) => removeListItem(t, list.key, i))" />
        </div>
      </template>
    </template>
  </FileFrame>
</template>

<style scoped>
.field {
  min-width: 16rem;
  flex: 1 1 16rem;
}
.number {
  max-width: 12rem;
}
.mono :deep(input) {
  font-family: monospace;
}
.constraint {
  display: inline-block;
  padding: 0 6px;
  border-radius: 4px;
  font-size: 0.8rem;
  background: rgba(var(--v-theme-primary), 0.1);
  word-break: break-all;
}
</style>
