<script setup lang="ts">
import { mdiCompareHorizontal, mdiDatabaseOutline, mdiDelete, mdiFileDocumentOutline, mdiFileOutline, mdiFilePdfBox, mdiFolderDownload, mdiFolderOutline, mdiPlus, mdiTable } from '@mdi/js'
import { computed, ref, watch } from 'vue'
import { FILE_TYPE_LABELS, MANDATORY_LABELS, fileTypeLabel, mandatoryLabel } from '@core/labels'
import { previousVersion } from '@core/compare'
import { renameCodeList } from '@core/edit/codelists'
import { addCode, addFile, codeName, removeItem, setOrRemove } from '@core/edit/operations'
import { setAt } from '@core/edit/pointer'
import { fileTree, type FileNode } from '@core/model/file-tree'
import { resolvePath, tableModelRef } from '@core/model/paths'
import type { DocumentModel, FileModel } from '@core/model/types'
import { pointer } from '@core/pointer'
import { modelOf } from '../files'
import { compareHref, href, route } from '../router'
import { useProject } from '../stores/project'
import CodeListDialog from './CodeListDialog.vue'
import EquivalentsDialog from './EquivalentsDialog.vue'
import FileFrame from './FileFrame.vue'
import NewCodeListDialog from './NewCodeListDialog.vue'
import ModelSummary from './ModelSummary.vue'
import ProblemBadge from './ProblemBadge.vue'
import ProblemCount from './ProblemCount.vue'
import RegexText from './RegexText.vue'
import RegexTester from './RegexTester.vue'
import NotConformant from './NotConformant.vue'

const props = defineProps<{ file: string }>()
const store = useProject()
const name = computed(() => modelOf(props.file))
const loaded = computed(() => store.result!.project.models.get(name.value))
const path = computed(() => loaded.value?.document?.path)

// Donnée courante, même non conforme au schéma, pourvu qu'elle ait une liste de fichiers.
const doc = computed(() => {
  const d = path.value ? (store.data(path.value) as DocumentModel | undefined) : undefined
  return d && typeof d === 'object' && Array.isArray(d.files) ? d : undefined
})

const MANDATORY = Object.entries(MANDATORY_LABELS).map(([value, label]) => ({ title: `${label} (${value})`, value }))
const FILE_TYPES = Object.entries(FILE_TYPE_LABELS).map(([value, label]) => ({ title: `${label} (${value})`, value }))

type Update = (d: DocumentModel) => unknown
const edit = (update: Update, key?: string) => store.edit<DocumentModel>(path.value!, update, key)
const setProp = (ptr: string, value: unknown, required = false) =>
  edit((d) => (required ? setAt(d, ptr, value ?? '') : setOrRemove(d, ptr, value)), ptr)

// Choix proposés : tables et listes de codes du dossier du modèle, en chemin relatif.
const relative = (p: string) => './' + p.slice(name.value.length + 1)
const tableChoices = computed(() => ['auto', ...[...(loaded.value?.tables.keys() ?? [])].map(relative)])
const csvChoices = computed(() => [...(loaded.value?.csvs.keys() ?? [])].map(relative))

function tableOf(f: FileModel): { text: string; path?: string } | undefined {
  if (f.type !== 'table') return undefined
  const ref = tableModelRef(f.tableModel, f.name)
  if (ref === undefined) return { text: f.tableModel ?? '' }
  const p = resolvePath(name.value, ref)
  return { text: f.tableModel ?? `${ref} (convention)`, ...(store.has(p) && { path: p }) }
}
const codePath = (data: string) => {
  const p = resolvePath(name.value, data)
  return store.has(p) ? p : undefined
}
// Fichier d'une déclaration : son nom devient celui de la liste, clés étrangères comprises (012, R5).
function chooseFile(index: number, data: string) {
  const { changes, refusal } = renameCodeList(store.session!, name.value, index, data)
  if (refusal) store.notice = refusal
  else store.applyChanges(changes)
}
// Fichiers attendus dans l'ordre de leur arborescence, avec leur profondeur (dossier › contenu).
const FILE_ICONS: Record<string, string> = { directory: mdiFolderOutline, table: mdiTable, pdf: mdiFilePdfBox, metadata: mdiFileDocumentOutline, multi_table: mdiDatabaseOutline }
const rows = computed(() => {
  const files = doc.value?.files ?? []
  const out: { f: FileModel; i: number; depth: number }[] = []
  const walk = (nodes: FileNode[], depth: number) => nodes.forEach((n) => { out.push({ f: files[n.index]!, i: n.index, depth }); walk(n.children, depth + 1) })
  walk(fileTree(files), 0)
  return out
})
// Nombre de valeurs d'une liste (lignes du CSV, hors en-tête).
const rowsOf = (data: string) => {
  const p = resolvePath(name.value, data)
  return p === undefined ? undefined : loaded.value?.csvs.get(p)?.csv?.rows.length
}
// Tables qu'aucun fichier attendu ne désigne (012, R2) : celles de WARN-UNREFERENCED-FILE.
const unreferencedTables = computed(() =>
  (store.result?.problems ?? []).filter((p) => p.code === 'WARN-UNREFERENCED-FILE' && p.model === name.value && p.file.startsWith(`${name.value}/types/`)).map((p) => p.file))

// Onglets de la vue (modèle, fichiers, tables, listes) : l'onglet suit le pointeur de l'URL
// (fichier de l'arbre, problème cliqué), « Modèle » par défaut.
type ModelTab = 'model' | 'files' | 'tables' | 'codes'
const modelTab = ref<ModelTab>('model')
watch(
  () => route.value.pointer,
  (p) => {
    if (p === undefined) return
    modelTab.value = p.startsWith('/files') ? 'files' : p.startsWith('/codes') ? 'codes' : 'model'
  },
  { immediate: true },
)

// Modèles de table du modèle : ceux des fichiers attendus de type table (et multi_table).
const tables = computed(() => {
  const out: { name: string; file: string; index: number; mandatory?: string; ref: string; path?: string; columns?: number }[] = []
  const checked = store.result?.checked.get(name.value)
  doc.value?.files.forEach((f, index) => {
    const entries = f.type === 'table' ? [{ name: f.name, tableModel: f.tableModel }] : f.type === 'multi_table' ? (f.tables ?? []) : []
    for (const t of entries) {
      const ref = tableModelRef(t.tableModel, t.name)
      const p = ref === undefined ? undefined : resolvePath(name.value, ref)
      const found = p !== undefined && store.has(p) ? p : undefined
      out.push({ name: checked?.tables.get(found ?? '')?.name ?? t.name, file: f.name, index, mandatory: f.mandatory, ref: ref ?? t.tableModel ?? '', ...(found && { path: found, columns: checked?.tables.get(found)?.columns.length }) })
    }
  })
  return out
})

// Fichier ouvert : suit le pointeur de l'URL (problème cliqué) et l'ajout.
const opened = ref<number[]>([])
watch(
  () => route.value.pointer,
  (p) => {
    const m = /^\/files\/(\d+)/.exec(p ?? '')
    if (m && !opened.value.includes(Number(m[1]))) opened.value = [...opened.value, Number(m[1])]
  },
  { immediate: true },
)
function newFile() {
  edit((d) => addFile(d, store.ids()))
  opened.value = [doc.value!.files.length - 1]
}
function newCode() {
  const declared = new Set((doc.value?.codes ?? []).map((c) => c.data))
  const data = csvChoices.value.find((c) => !declared.has(c)) ?? ''
  edit((d) => addCode(d, store.ids(), data, codeName(data) || 'NOUVELLE_LISTE'))
}
</script>

<template>
  <FileFrame :title="`Modèle ${doc?.title || name}`" :file="path ?? `${name}/`" :source="path">
    <template #chips>
      <v-btn :prepend-icon="mdiFolderDownload" size="small" variant="tonal" data-testid="download-model" @click="store.download({ kind: 'model', model: name })">
        Télécharger le modèle
      </v-btn>
      <v-btn :prepend-icon="mdiCompareHorizontal" size="small" variant="tonal" data-testid="compare-model-button"
        :href="compareHref(name, previousVersion(name, store.models.map((m) => m.name)))">
        Comparer
      </v-btn>
    </template>

    <template v-if="!loaded?.document">
      <p class="mb-2">Ce dossier ne contient pas de files.json.</p>
    </template>

    <NotConformant v-else-if="!doc" />

    <template v-else>
      <ModelSummary :name="name" />
      <v-tabs v-model="modelTab" color="primary" class="model-tabs mb-4" data-testid="model-tabs">
        <v-tab value="model" data-testid="model-tab-model">Modèle</v-tab>
        <v-tab value="files" data-testid="model-tab-files">Fichiers ({{ doc.files.length }})</v-tab>
        <v-tab value="tables" data-testid="model-tab-tables">Tables ({{ tables.length }})</v-tab>
        <v-tab value="codes" data-testid="model-tab-codes">Listes de codes ({{ doc.codes?.length ?? 0 }})</v-tab>
      </v-tabs>

      <section v-if="modelTab === 'model'" data-pointer="" class="form-section">
        <h3 class="form-heading">Identification</h3>
        <div class="form-grid">
          <v-text-field label="Nom" :model-value="doc.name" density="compact" variant="outlined" class="field" data-testid="model-name"
            @update:model-value="(v: string) => setProp('/name', v, true)" />
          <v-text-field label="Titre" :model-value="doc.title" density="compact" variant="outlined" class="field"
            @update:model-value="(v: string) => setProp('/title', v)" />
        </div>
        <v-textarea label="Description" :model-value="doc.description" density="compact" variant="outlined" rows="1" auto-grow
          @update:model-value="(v: string) => setProp('/description', v)" />
        <h3 class="form-heading">Dossier du document</h3>
        <div class="form-grid">
          <v-text-field label="Nom du dossier (expression régulière)" :model-value="doc.constraints?.folderName" density="compact" variant="outlined" class="field mono"
            :hint="store.regexHint(doc.constraints?.folderName, name)" persistent-hint data-testid="model-folderName"
            @update:model-value="(v: string) => setProp('/constraints/folderName', store.regexInput(v, name))">
            <template #message>Affichage : <RegexText :value="doc.constraints?.folderName" :model="name" /></template>
          </v-text-field>
          <v-text-field label="Spécification des métadonnées" :model-value="doc.constraints?.metadataSpecification" density="compact" variant="outlined" class="field"
            data-testid="metadata-specification" @update:model-value="(v: string) => setProp('/constraints/metadataSpecification', v)" />
        </div>
        <RegexTester :regex="doc.constraints?.folderName" :model="name" label="Tester un nom de dossier" />
      </section>

      <template v-if="modelTab === 'files'">
      <div class="d-flex align-center">
        <h2 class="text-h6">Fichiers attendus ({{ doc.files.length }})</h2>
        <v-spacer />
        <v-btn v-if="!store.readOnly" :prepend-icon="mdiPlus" variant="tonal" data-testid="add-file" @click="newFile">Ajouter un fichier</v-btn>
      </div>
      <v-expansion-panels v-model="opened" multiple variant="accordion" class="my-2">
        <!-- Fichiers rangés selon leur arborescence (dossiers puis leur contenu, en retrait). -->
        <v-expansion-panel v-for="{ f, i, depth } in rows" :key="f.id ?? i" :value="i" :data-pointer="`/files/${i}`" :data-testid="`file-${f.name}`"
          :class="['tree-row', { folder: f.type === 'directory', nested: depth > 0 }]" :style="{ marginLeft: `${depth * 28}px`, maxWidth: `calc(100% - ${depth * 28}px)` }" :data-depth="depth">
          <v-expansion-panel-title>
            <div class="d-flex flex-wrap align-center ga-2">
              <v-icon :icon="FILE_ICONS[f.type] ?? mdiFileOutline" size="small" :color="f.type === 'directory' ? 'primary' : undefined" aria-hidden="true" />
              <strong>{{ f.name }}</strong>
              <ProblemBadge :file="path!" :pointer="`/files/${i}`" />
              <span class="text-medium-emphasis">{{ fileTypeLabel(f.type) }}</span>
              <span class="presence" :class="`presence-${f.mandatory ?? 'WARN'}`" data-testid="file-presence">{{ mandatoryLabel(f.mandatory) }}</span>
              <RegexText :value="f.path" :model="name" class="path" />
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div class="form-grid">
              <v-text-field label="Nom" :model-value="f.name" density="compact" variant="outlined" class="field"
                @update:model-value="(v: string) => setProp(pointer('files', i, 'name'), v, true)" />
              <v-text-field label="Titre" :model-value="f.title" density="compact" variant="outlined" class="field"
                @update:model-value="(v: string) => setProp(pointer('files', i, 'title'), v)" />
            </div>
            <div class="form-grid">
              <v-select label="Type" :items="FILE_TYPES" :model-value="f.type" density="compact" variant="outlined" class="field" data-testid="file-type"
                @update:model-value="(v: string) => setProp(pointer('files', i, 'type'), v, true)" />
              <v-select label="Présence" :items="MANDATORY" :model-value="f.mandatory ?? 'WARN'" density="compact" variant="outlined" class="field" data-testid="file-mandatory"
                @update:model-value="(v: string) => setProp(pointer('files', i, 'mandatory'), v, true)" />
            </div>
            <v-text-field label="Chemin (expression régulière)" :model-value="f.path" density="compact" variant="outlined" class="mono" data-testid="file-path"
              :hint="store.regexHint(f.path, name)" persistent-hint
              @update:model-value="(v: string) => setProp(pointer('files', i, 'path'), store.regexInput(v, name), true)">
              <template #message>Affichage : <RegexText :value="f.path" :model="name" /></template>
            </v-text-field>
            <RegexTester :regex="f.path" :model="name" label="Tester un chemin (sans extension)" />
            <div v-if="f.type === 'table'" class="d-flex flex-wrap align-center ga-4">
              <v-combobox label="Modèle de table (vide : ./types/<nom>.json)" :items="tableChoices" :model-value="f.tableModel ?? null" density="compact" variant="outlined"
                class="field" clearable data-testid="file-tableModel"
                @update:model-value="(v: string | null) => setProp(pointer('files', i, 'tableModel'), v)" />
              <a v-if="tableOf(f)?.path" :href="href(tableOf(f)!.path!)">Ouvrir la table {{ tableOf(f)!.text }}</a>
              <span v-else-if="f.tableModel !== 'auto'" class="text-error">Modèle de table introuvable : {{ tableOf(f)?.text }}</span>
            </div>
            <v-textarea label="Description" :model-value="f.description" density="compact" variant="outlined" rows="1" auto-grow
              @update:model-value="(v: string) => setProp(pointer('files', i, 'description'), v)" />
            <div class="d-flex flex-wrap ga-2">
              <EquivalentsDialog :source="{ kind: 'file', file: path!, pointer: pointer('files', i) }" :label="`${name} › ${f.name}`" />
              <v-spacer />
              <v-btn v-if="!store.readOnly" :prepend-icon="mdiDelete" size="small" variant="text" color="error" data-testid="remove-file" @click="edit((d) => removeItem(d, 'files', i))">Supprimer le fichier</v-btn>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      </template>

      <template v-if="modelTab === 'tables'">
        <h2 class="text-h6">Modèles de table ({{ tables.length }})</h2>
        <v-table density="comfortable" class="tables mb-4" data-testid="model-tables">
          <thead>
            <tr><th scope="col">Table</th><th scope="col">Présence</th><th scope="col">Colonnes</th><th scope="col">Problèmes</th></tr>
          </thead>
          <tbody>
            <tr v-for="t in tables" :key="t.file + t.ref" :data-testid="`model-table-${t.file}`">
              <th scope="row">
                <a v-if="t.path" :href="href(t.path)"><v-icon :icon="mdiTable" size="small" class="mr-1" aria-hidden="true" />{{ t.name }}</a>
                <span v-else class="text-error">{{ t.name }} (modèle de table introuvable)</span>
                <a v-if="t.file !== t.name" class="file-link" :href="href(path!, pointer('files', t.index))">fichier {{ t.file }}</a>
              </th>
              <td><span class="presence" :class="`presence-${t.mandatory ?? 'WARN'}`">{{ mandatoryLabel(t.mandatory) }}</span></td>
              <td>{{ t.columns ?? '—' }}</td>
              <td><ProblemCount :counts="t.path ? store.countsByFile.get(t.path) : undefined" /><span v-if="!t.path || !store.countsByFile.get(t.path)">aucun</span></td>
            </tr>
          </tbody>
        </v-table>
      <template v-if="unreferencedTables.length">
        <h2 class="text-h6">Tables non référencées ({{ unreferencedTables.length }})</h2>
        <p class="text-body-2">Aucun fichier attendu ne désigne ces modèles de table : le validator les ignore.</p>
        <v-list density="compact" data-testid="unreferenced-tables">
          <v-list-item v-for="t in unreferencedTables" :key="t" :href="href(t)" :prepend-icon="mdiTable" :title="t.slice(name.length + 1)" />
        </v-list>
      </template>

      </template>

      <template v-if="modelTab === 'codes'">
      <div class="d-flex flex-wrap align-center ga-2" data-pointer="/codes" data-testid="code-lists">
        <h2 class="text-h6 text-no-wrap mr-2">Listes de codes ({{ doc.codes?.length ?? 0 }})</h2>
        <v-spacer />
        <div class="d-flex flex-wrap ga-2">
          <NewCodeListDialog v-if="!store.readOnly" :model="name" />
          <CodeListDialog v-if="!store.readOnly" :model="name" />
          <v-btn v-if="!store.readOnly" :prepend-icon="mdiPlus" variant="tonal" data-testid="add-code" @click="newCode">Déclarer une liste</v-btn>
        </div>
      </div>
      <div v-for="(c, i) in doc.codes ?? []" :key="c.id ?? i" class="d-flex flex-wrap align-center ga-2" :data-pointer="`/codes/${i}`" :data-testid="`code-${c.name}`">
        <strong class="list-name" data-testid="code-name">{{ c.name }}</strong>
        <v-select :label="`Fichier de la liste ${c.name}`" :items="csvChoices" :model-value="c.data" density="compact" variant="outlined" hide-details class="field"
          data-testid="code-data" @update:model-value="(v: string) => chooseFile(i, v)" />
        <a v-if="codePath(c.data)" :href="href(codePath(c.data)!)">Ouvrir<template v-if="rowsOf(c.data) !== undefined"> ({{ rowsOf(c.data) }} valeur{{ rowsOf(c.data)! > 1 ? 's' : '' }})</template></a>
        <ProblemBadge :file="path!" :pointer="`/codes/${i}`" />
        <EquivalentsDialog :source="{ kind: 'code', file: path!, pointer: pointer('codes', i) }" :label="`${name} › ${c.name}`" />
        <v-btn v-if="!store.readOnly" :icon="mdiDelete" size="small" variant="text" :aria-label="`Supprimer la liste ${c.name}`" @click="edit((d) => removeItem(d, 'codes', i))" />
      </div>
      </template>
    </template>
  </FileFrame>
</template>

<style scoped>
.tables a {
  color: rgb(var(--v-theme-primary));
}
.tables th[scope='row'] {
  font-weight: 600;
}
.file-link {
  display: block;
  font-weight: 400;
  font-size: 0.8rem;
}
.tree-row.folder > :deep(.v-expansion-panel-title) {
  background: rgba(var(--v-theme-primary), 0.07);
}
.tree-row.nested {
  border-left: 3px solid rgba(var(--v-theme-primary), 0.45);
  width: auto;
}
.list-name {
  min-width: 12rem;
}
.field {
  min-width: 0;
  flex: 1 1 16rem;
}
.mono :deep(input) {
  font-family: monospace;
}
.path {
  word-break: break-all;
  font-size: 0.8rem;
}
.tag {
  padding: 0 6px;
  border-radius: 4px;
  font-size: 0.8rem;
  background: rgba(var(--v-theme-primary), 0.1);
}
</style>
