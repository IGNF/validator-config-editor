<script setup lang="ts">
import { mdiArrowDown, mdiArrowUp, mdiDelete, mdiFolderDownload, mdiPlus } from '@mdi/js'
import { computed, ref, watch } from 'vue'
import { FILE_TYPE_LABELS, MANDATORY_LABELS, fileTypeLabel, mandatoryLabel } from '@core/labels'
import { addCode, addFile, codeName, moveItem, removeItem, setOrRemove, type DocumentList } from '@core/edit/operations'
import { setAt } from '@core/edit/pointer'
import { resolvePath, tableModelRef } from '@core/model/paths'
import type { DocumentModel, FileModel } from '@core/model/types'
import { pointer } from '@core/pointer'
import { modelOf } from '../files'
import { href, route } from '../router'
import { useProject } from '../stores/project'
import CodeListDialog from './CodeListDialog.vue'
import FileFrame from './FileFrame.vue'
import ModelSummary from './ModelSummary.vue'
import ProblemBadge from './ProblemBadge.vue'
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
const move = (list: DocumentList, i: number, to: number) => edit((d) => moveItem(d, list, i, to))
</script>

<template>
  <FileFrame :title="`Modèle ${name}`" :file="path ?? `${name}/`" :source="path">
    <template #chips>
      <v-chip v-if="doc?.abstract" size="small" color="secondary">abstrait</v-chip>
      <v-btn :prepend-icon="mdiFolderDownload" size="small" variant="tonal" data-testid="download-model" @click="store.download({ kind: 'model', model: name })">
        Télécharger le modèle
      </v-btn>
    </template>

    <template v-if="!loaded?.document">
      <p class="mb-2">Ce dossier ne contient pas de files.json.</p>
      <p v-if="loaded?.gpu"><a :href="href(loaded.gpu.path)">Surcharges GpU (gpu.json)</a></p>
    </template>

    <NotConformant v-else-if="!doc" />

    <template v-else>
      <ModelSummary :name="name" :doc="doc" />
      <section data-pointer="">
        <div class="d-flex flex-wrap ga-4">
          <v-text-field label="Nom" :model-value="doc.name" density="compact" variant="outlined" class="field" data-testid="model-name"
            @update:model-value="(v: string) => setProp('/name', v, true)" />
          <v-text-field label="Titre" :model-value="doc.title" density="compact" variant="outlined" class="field"
            @update:model-value="(v: string) => setProp('/title', v)" />
        </div>
        <v-textarea label="Description" :model-value="doc.description" density="compact" variant="outlined" rows="1" auto-grow
          @update:model-value="(v: string) => setProp('/description', v)" />
        <div class="d-flex flex-wrap ga-4">
          <v-text-field label="Nom du dossier (expression régulière)" :model-value="doc.constraints?.folderName" density="compact" variant="outlined" class="field mono"
            @update:model-value="(v: string) => setProp('/constraints/folderName', v)" />
          <v-text-field label="Spécification des métadonnées" :model-value="doc.constraints?.metadataSpecification" density="compact" variant="outlined" class="field"
            data-testid="metadata-specification" @update:model-value="(v: string) => setProp('/constraints/metadataSpecification', v)" />
        </div>
        <p v-if="doc.id" class="text-body-2">Identifiant : <code>{{ doc.id }}</code></p>
      </section>

      <div class="d-flex align-center mt-4">
        <h2 class="text-h6">Fichiers ({{ doc.files.length }})</h2>
        <v-spacer />
        <v-btn :prepend-icon="mdiPlus" variant="tonal" data-testid="add-file" @click="newFile">Ajouter un fichier</v-btn>
      </div>
      <v-expansion-panels v-model="opened" multiple variant="accordion" class="my-2">
        <v-expansion-panel v-for="(f, i) in doc.files" :key="f.id ?? i" :value="i" :data-pointer="`/files/${i}`" :data-testid="`file-${f.name}`">
          <v-expansion-panel-title>
            <div class="d-flex flex-wrap align-center ga-2">
              <strong>{{ f.name }}</strong>
              <ProblemBadge :file="path!" :pointer="`/files/${i}`" />
              <span class="text-medium-emphasis">{{ fileTypeLabel(f.type) }}</span>
              <span class="tag">{{ mandatoryLabel(f.mandatory) }}</span>
              <code class="path">{{ f.path }}</code>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div class="d-flex flex-wrap ga-4">
              <v-text-field label="Nom" :model-value="f.name" density="compact" variant="outlined" class="field"
                @update:model-value="(v: string) => setProp(pointer('files', i, 'name'), v, true)" />
              <v-text-field label="Titre" :model-value="f.title" density="compact" variant="outlined" class="field"
                @update:model-value="(v: string) => setProp(pointer('files', i, 'title'), v)" />
            </div>
            <div class="d-flex flex-wrap ga-4">
              <v-select label="Type" :items="FILE_TYPES" :model-value="f.type" density="compact" variant="outlined" class="field" data-testid="file-type"
                @update:model-value="(v: string) => setProp(pointer('files', i, 'type'), v, true)" />
              <v-select label="Présence" :items="MANDATORY" :model-value="f.mandatory ?? 'WARN'" density="compact" variant="outlined" class="field" data-testid="file-mandatory"
                @update:model-value="(v: string) => setProp(pointer('files', i, 'mandatory'), v, true)" />
            </div>
            <v-text-field label="Chemin (expression régulière)" :model-value="f.path" density="compact" variant="outlined" class="mono" data-testid="file-path"
              @update:model-value="(v: string) => setProp(pointer('files', i, 'path'), v, true)" />
            <div v-if="f.type === 'table'" class="d-flex flex-wrap align-center ga-4">
              <v-combobox label="Modèle de table (vide : ./types/<nom>.json)" :items="tableChoices" :model-value="f.tableModel ?? null" density="compact" variant="outlined"
                class="field" clearable data-testid="file-tableModel"
                @update:model-value="(v: string | null) => setProp(pointer('files', i, 'tableModel'), v)" />
              <a v-if="tableOf(f)?.path" :href="href(tableOf(f)!.path!)">Ouvrir la table {{ tableOf(f)!.text }}</a>
              <span v-else-if="f.tableModel !== 'auto'" class="text-error">Modèle de table introuvable : {{ tableOf(f)?.text }}</span>
            </div>
            <v-textarea label="Description" :model-value="f.description" density="compact" variant="outlined" rows="1" auto-grow
              @update:model-value="(v: string) => setProp(pointer('files', i, 'description'), v)" />
            <div class="d-flex ga-2">
              <v-btn :prepend-icon="mdiArrowUp" size="small" variant="text" :disabled="i === 0" @click="move('files', i, i - 1)">Monter</v-btn>
              <v-btn :prepend-icon="mdiArrowDown" size="small" variant="text" :disabled="i === doc.files.length - 1" @click="move('files', i, i + 1)">Descendre</v-btn>
              <v-spacer />
              <v-btn :prepend-icon="mdiDelete" size="small" variant="text" color="error" data-testid="remove-file" @click="edit((d) => removeItem(d, 'files', i))">Supprimer le fichier</v-btn>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <div class="d-flex align-center mt-4">
        <h2 class="text-h6">Listes de codes ({{ doc.codes?.length ?? 0 }})</h2>
        <v-spacer />
        <div class="d-flex flex-wrap ga-2">
          <CodeListDialog :model="name" />
          <v-btn :prepend-icon="mdiPlus" variant="tonal" data-testid="add-code" @click="newCode">Déclarer une liste</v-btn>
        </div>
      </div>
      <div v-for="(c, i) in doc.codes ?? []" :key="c.id ?? i" class="d-flex flex-wrap align-center ga-2" :data-pointer="`/codes/${i}`" :data-testid="`code-${c.name}`">
        <v-text-field :label="`Nom de la liste ${i + 1}`" :model-value="c.name" density="compact" variant="outlined" hide-details class="field"
          @update:model-value="(v: string) => setProp(pointer('codes', i, 'name'), v, true)" />
        <v-select :label="`Fichier de la liste ${i + 1}`" :items="csvChoices" :model-value="c.data" density="compact" variant="outlined" hide-details class="field"
          @update:model-value="(v: string) => setProp(pointer('codes', i, 'data'), v, true)" />
        <a v-if="codePath(c.data)" :href="href(codePath(c.data)!)">Ouvrir</a>
        <ProblemBadge :file="path!" :pointer="`/codes/${i}`" />
        <v-btn :icon="mdiDelete" size="small" variant="text" :aria-label="`Supprimer la liste ${c.name}`" @click="edit((d) => removeItem(d, 'codes', i))" />
      </div>
    </template>
  </FileFrame>
</template>

<style scoped>
.field {
  min-width: 16rem;
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
