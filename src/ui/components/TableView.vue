<script setup lang="ts">
import { mdiDelete, mdiPencil, mdiPencilOffOutline, mdiPencilOutline, mdiPlus } from '@mdi/js'
import { computed, ref, watch } from 'vue'
import { setAt } from '@core/edit/pointer'
import {
  addColumn, addListItem, parseEnum, removeColumn, removeListItem, setConstraint, setListItem, setOrRemove, type TableList,
} from '@core/edit/operations'
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
import RegexTester from './RegexTester.vue'
import SqlText from './SqlText.vue'
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
]

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
function constraints(c: ColumnConstraints | undefined): { text: string; title?: string; regex?: string; tone?: string }[] {
  if (!c) return []
  const out: { text: string; title?: string; regex?: string; tone?: string }[] = []
  if (c.required) out.push({ text: 'valeur obligatoire', tone: 'presence presence-ERROR' })
  if (c.presenceRequired) out.push({ text: 'colonne obligatoire', tone: 'presence presence-WARN' })
  if (c.unique) out.push({ text: 'unique', tone: 'unique' })
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

// Valeurs autorisées d'une colonne par une clé étrangère vers une liste de codes : colonnes de la
// liste (celle visée en premier), lignes limitées à VALUES_SHOWN.
const VALUES_SHOWN = 50
function allowedValues(column: string): { list: string; path: string; key: string; header: string[]; rows: string[][]; total: number } | undefined {
  for (const text of table.value?.constraints?.foreignKeys ?? []) {
    const fk = parseForeignKey(text)
    const i = fk?.sourceColumns.indexOf(column) ?? -1
    if (!fk || i < 0) continue
    const code = checked.value?.document?.codes?.find((c) => c.name === fk.target)
    const path = code && resolvePath(model.value, code.data)
    const csv = path ? store.result?.project.models.get(model.value)?.csvs.get(path)?.csv : undefined
    if (!path || !csv) continue
    const key = fk.targetColumns[i]!
    const header = [key, ...csv.header.filter((h) => h !== key)]
    const rows = csv.rows.slice(0, VALUES_SHOWN).map((r) => header.map((h) => r[csv.header.indexOf(h)] ?? ''))
    return { list: fk.target, path, key, header, rows, total: csv.rows.length }
  }
  return undefined
}

const values = computed(() => new Map((table.value?.columns ?? []).map((c) => [c.name, allowedValues(c.name)])))

/** Clé étrangère ou condition en cours de saisie (`<liste>/<indice>`). */
const editing = ref<string>()

const LISTS: { key: TableList; title: string; placeholder: string }[] = [
  { key: 'foreignKeys', title: 'Clés étrangères', placeholder: '(COLONNE) REFERENCES Liste(COLONNE)' },
  { key: 'conditions', title: 'Conditions', placeholder: 'COLONNE IS NOT NULL OR …' },
]
</script>

<template>
  <FileFrame :title="`Table ${table?.name || baseName(file)}`" :file="file" :source="file">
    <NotConformant v-if="!table" />
    <template v-else>
      <div class="form-grid" data-pointer="">
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
        <v-btn v-if="!store.readOnly" :prepend-icon="mdiPlus" variant="tonal" data-testid="add-column" @click="add">Ajouter une colonne</v-btn>
      </div>

      <v-expansion-panels v-model="opened" multiple variant="accordion" class="my-2">
        <v-expansion-panel v-for="(c, i) in table.columns" :key="c.id ?? i" :value="i" :data-pointer="`/columns/${i}`" :data-testid="`column-${c.name}`">
          <!-- Crayon plutôt que chevron : le panneau ouvre le formulaire de la colonne. -->
          <v-expansion-panel-title :expand-icon="mdiPencilOutline" :collapse-icon="mdiPencilOffOutline">
            <div class="d-flex flex-wrap align-center ga-2">
              <strong>{{ c.name }}</strong>
              <ProblemBadge :file="file" :pointer="`/columns/${i}`" />
              <span class="text-medium-emphasis" data-testid="column-type-label">{{ c.type }}</span>
              <span v-for="k in constraints(c.constraints)" :key="k.text" :class="k.tone ?? 'constraint'" :title="k.title"><template v-if="k.regex">motif <RegexText :value="k.regex" :model="model" /></template><template v-else>{{ k.text }}</template></span>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div class="form-grid">
              <v-text-field label="Nom" :model-value="c.name" density="compact" variant="outlined" class="field" data-testid="column-name"
                @update:model-value="(v: string) => setProp(pointer('columns', i, 'name'), v, true)" />
              <v-text-field label="Titre" :model-value="c.title" density="compact" variant="outlined" class="field"
                @update:model-value="(v: string) => setProp(pointer('columns', i, 'title'), v)" />
              <v-select label="Type" :items="TYPES" :model-value="c.type" density="compact" variant="outlined" class="field" data-testid="column-type"
                @update:model-value="(v: string) => setProp(pointer('columns', i, 'type'), v, true)" />
            </div>
            <v-textarea label="Description" :model-value="c.description" density="compact" variant="outlined" rows="1" auto-grow
              @update:model-value="(v: string) => setProp(pointer('columns', i, 'description'), v)" />
            <div class="d-flex flex-wrap ga-4 checks">
              <v-checkbox label="Valeur obligatoire" :model-value="c.constraints?.required ?? false" density="compact" hide-details
                @update:model-value="(v: boolean | null) => edit((t) => setConstraint(t, i, 'required', !!v))" />
              <v-checkbox label="Colonne obligatoire" :model-value="c.constraints?.presenceRequired ?? false" density="compact" hide-details
                @update:model-value="(v: boolean | null) => edit((t) => setConstraint(t, i, 'presenceRequired', !!v))" />
              <v-checkbox label="Unique" :model-value="c.constraints?.unique ?? false" density="compact" hide-details
                @update:model-value="(v: boolean | null) => edit((t) => setConstraint(t, i, 'unique', !!v))" />
            </div>
            <div class="form-grid">
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
            <section v-if="values.get(c.name)" class="values mb-3" :data-testid="`allowed-values-${c.name}`">
              <h3 class="form-heading">
                Valeurs autorisées par <a :href="href(values.get(c.name)!.path)">{{ values.get(c.name)!.list }}</a>
                ({{ values.get(c.name)!.total }})
              </h3>
              <v-table density="compact" class="values-table">
                <thead><tr><th v-for="h in values.get(c.name)!.header" :key="h" scope="col">{{ h }}</th></tr></thead>
                <tbody>
                  <tr v-for="(r, k) in values.get(c.name)!.rows" :key="k">
                    <td v-for="(v, j) in r" :key="j" :class="{ key: j === 0 }">{{ v }}</td>
                  </tr>
                </tbody>
              </v-table>
              <p v-if="values.get(c.name)!.total > VALUES_SHOWN" class="text-body-2 mt-1">
                … et {{ values.get(c.name)!.total - VALUES_SHOWN }} autres : <a :href="href(values.get(c.name)!.path)">voir la liste</a>
              </p>
            </section>
            <RegexTester v-if="c.constraints?.pattern" :regex="c.constraints.pattern" :model="model" label="Tester une valeur" />
            <v-textarea label="Valeurs autorisées (une par ligne)" :model-value="(c.constraints?.enum ?? []).join('\n')" density="compact" variant="outlined" rows="1" auto-grow
              @update:model-value="(v: string) => edit((t) => setConstraint(t, i, 'enum', parseEnum(v, c.constraints?.enum)), pointer('columns', i, 'enum'))" />
            <div class="d-flex flex-wrap ga-2">
              <EquivalentsDialog :source="{ kind: 'column', file, pointer: pointer('columns', i) }" :label="`${table.name}.${c.name}`" />
              <v-spacer />
              <v-btn v-if="!store.readOnly" :prepend-icon="mdiDelete" size="small" variant="text" color="error" data-testid="remove-column" @click="edit((t) => removeColumn(t, i))">Supprimer la colonne</v-btn>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <template v-for="list in LISTS" :key="list.key">
        <div class="d-flex align-center mt-4">
          <h2 class="text-h6">{{ list.title }} ({{ table.constraints?.[list.key]?.length ?? 0 }})</h2>
          <v-spacer />
          <v-btn v-if="!store.readOnly" :prepend-icon="mdiPlus" variant="tonal" :data-testid="`add-${list.key}`" @click="edit((t) => addListItem(t, list.key))">Ajouter</v-btn>
        </div>
        <div v-for="(text, i) in table.constraints?.[list.key] ?? []" :key="i" class="d-flex align-center ga-2 my-1" :data-pointer="`/constraints/${list.key}/${i}`">
          <!-- Affichage SQL (mots-clés en bleu gras) ; le crayon passe en saisie, un élément vide s'édite d'emblée. -->
          <v-text-field v-if="!text || editing === `${list.key}/${i}`" :label="`${list.title} ${i + 1}`" :model-value="text" :placeholder="list.placeholder"
            density="compact" variant="outlined" hide-details class="mono" autofocus :data-testid="`${list.key}-${i}`"
            @update:model-value="(v: string) => edit((t) => setListItem(t, list.key, i, v), `/constraints/${list.key}/${i}`)"
            @blur="editing = undefined" @keydown.enter="editing = undefined" />
          <template v-else>
            <SqlText :value="text" :data-testid="`${list.key}-${i}-sql`" />
            <v-btn v-if="!store.readOnly" :icon="mdiPencil" size="small" variant="text" :aria-label="`Modifier ${list.title.toLowerCase()} ${i + 1}`"
              :data-testid="`${list.key}-${i}-edit`" @click="editing = `${list.key}/${i}`" />
          </template>
          <template v-if="list.key === 'foreignKeys' && target(text)">
            →
            <a v-if="target(text)!.path" :href="href(target(text)!.path!)">{{ target(text)!.label }}</a>
            <span v-else class="text-error">{{ target(text)!.label }}</span>
          </template>
          <v-btn v-if="!store.readOnly" :icon="mdiDelete" size="small" variant="text" :aria-label="`Supprimer ${list.title.toLowerCase()} ${i + 1}`" @click="edit((t) => removeListItem(t, list.key, i))" />
        </div>
      </template>
    </template>
  </FileFrame>
</template>

<style scoped>
.values-table {
  max-height: 18rem;
  overflow: auto;
  border: 1px solid rgb(var(--v-theme-divider));
  border-radius: 6px;
}
.values-table td.key {
  font-family: ui-monospace, Menlo, Consolas, monospace;
  font-weight: 700;
  color: rgb(var(--v-theme-primary));
}
.values a {
  color: rgb(var(--v-theme-primary));
}
.unique {
  padding: 0 8px;
  border-radius: 10px;
  border: 1px solid rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-primary));
  font-size: 0.8rem;
  font-weight: 600;
}
.field {
  min-width: 0;
  flex: 1 1 16rem;
}
.number {
  min-width: 0;
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
