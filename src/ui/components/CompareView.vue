<script setup lang="ts">
import { mdiSwapHorizontal } from '@mdi/js'
import { computed } from 'vue'
import { compareModels, previousVersion, type Change, type Section } from '@core/compare'
import { resolvePath } from '@core/model/paths'
import { pointer } from '@core/pointer'
import { compareHref, href } from '../router'
import { useProject } from '../stores/project'
import RegexText from './RegexText.vue'

// Comparaison de deux modèles (feature 011, plan R7) : `model` comparé à `reference`, en lecture seule.
const props = defineProps<{ model: string; reference: string }>()
const store = useProject()

const names = computed(() => store.models.map((m) => m.name))
const comparison = computed(() =>
  store.result && props.reference && props.reference !== props.model ? compareModels(store.result, props.reference, props.model) : undefined)
const suggested = computed(() => previousVersion(props.model, names.value))

const choose = (model: string, reference: string) => {
  location.hash = compareHref(model, reference)
}

// Champs dont la valeur est une regex : affichée avec ses variables (010).
const REGEX = new Set(['path', 'pattern', 'folderName'])
const LABELS: Record<string, string> = {
  folderName: 'nom du dossier', metadataSpecification: 'spécification des métadonnées', type: 'type', mandatory: 'présence',
  path: 'chemin', tableModel: 'modèle de table', conditions: 'conditions', foreignKeys: 'clés étrangères', description: 'description',
  minLength: 'longueur minimale', maxLength: 'longueur maximale', required: 'valeur obligatoire', presenceRequired: 'colonne obligatoire',
  unique: 'unique', enum: 'valeurs possibles', pattern: 'motif',
}
function format(field: string, v: Change['old']): string {
  if (v === null || v === undefined) return '(absent)'
  if (typeof v === 'boolean') return v ? 'Oui' : 'Non'
  if (field === 'maxLength' && v === -1) return 'sans limite'
  return String(v)
}

// Liens vers l'élément : dans le modèle comparé, ou dans la référence s'il a été retiré.
const checked = (model: string) => store.result?.checked.get(model)
const documentPath = (model: string) => store.result?.project.models.get(model)?.document?.path
function fileLink(model: string, name: string): string | undefined {
  const path = documentPath(model)
  const i = checked(model)?.document?.files.findIndex((f) => f.name === name) ?? -1
  return path && i >= 0 ? href(path, pointer('files', i)) : undefined
}
function tablePath(model: string, name: string): string | undefined {
  return [...(checked(model)?.tables ?? [])].find(([, t]) => t.name === name)?.[0]
}
function tableLink(model: string, name: string, column?: string): string | undefined {
  const path = tablePath(model, name)
  if (!path) return undefined
  if (column === undefined) return href(path)
  const i = checked(model)!.tables.get(path)!.columns.findIndex((c) => c.name === column)
  return href(path, i >= 0 ? pointer('columns', i) : undefined)
}
function codeLink(model: string, name: string): string | undefined {
  const code = checked(model)?.document?.codes?.find((c) => c.name === name)
  const path = code && resolvePath(model, code.data)
  return path && store.has(path) ? href(path) : undefined
}

const count = (s: Section) => s.added.length + s.removed.length + s.changed.length
</script>

<template>
  <section data-testid="compare-view">
    <h1 class="text-h5 mb-4">Comparaison de modèles</h1>
    <div class="d-flex flex-wrap align-center ga-4 mb-4">
      <v-select label="Référence" :items="names.filter((n) => n !== model)" :model-value="reference || null" density="compact" variant="outlined"
        class="field" data-testid="compare-reference" @update:model-value="(v: string) => choose(model, v)" />
      <v-btn :icon="mdiSwapHorizontal" variant="text" :disabled="!reference" aria-label="Inverser le sens" title="Inverser le sens"
        data-testid="compare-swap" @click="choose(reference, model)" />
      <v-select label="Modèle comparé" :items="names.filter((n) => n !== reference)" :model-value="model" density="compact" variant="outlined"
        class="field" data-testid="compare-model" @update:model-value="(v: string) => choose(v, reference)" />
    </div>

    <template v-if="!comparison">
      <p v-if="suggested">
        Choisissez une référence, ou comparez avec la version précédente :
        <a :href="compareHref(model, suggested)" data-testid="compare-suggested">{{ suggested }}</a>.
      </p>
      <p v-else>Choisissez une référence : aucune version précédente de {{ model }} dans la configuration.</p>
    </template>

    <template v-else>
      <p class="mb-4" data-testid="compare-total">
        <template v-if="comparison.total === 0">Aucune différence.</template>
        <template v-else>{{ comparison.total }} différence{{ comparison.total > 1 ? 's' : '' }} de {{ reference }} à {{ model }}.</template>
      </p>
      <v-alert v-if="comparison.unreadable.length" type="warning" variant="tonal" class="mb-4" data-testid="compare-unreadable">
        Fichiers illisibles ou non conformes, laissés de côté : {{ comparison.unreadable.join(', ') }}
      </v-alert>

      <section v-if="comparison.document.length" class="mb-4" data-testid="compare-document">
        <h2 class="text-h6">Dossier</h2>
        <ul class="changes">
          <li v-for="c in comparison.document" :key="c.field">
            <span class="badge changed">modifié</span> {{ LABELS[c.field] ?? c.field }} :
            <span class="old"><RegexText v-if="REGEX.has(c.field) && typeof c.old === 'string'" :value="c.old" :model="reference" /><template v-else>{{ format(c.field, c.old) }}</template></span>
            →
            <span class="new"><RegexText v-if="REGEX.has(c.field) && typeof c.new === 'string'" :value="c.new" :model="model" /><template v-else>{{ format(c.field, c.new) }}</template></span>
          </li>
        </ul>
      </section>

      <section v-if="count(comparison.files)" class="mb-4" data-testid="compare-files">
        <h2 class="text-h6">Fichiers attendus ({{ count(comparison.files) }})</h2>
        <ul class="changes">
          <li v-for="n in comparison.files.added" :key="`+${n}`"><span class="badge added">ajouté</span> <a :href="fileLink(model, n)">{{ n }}</a></li>
          <li v-for="n in comparison.files.removed" :key="`-${n}`"><span class="badge removed">retiré</span> <a :href="fileLink(reference, n)">{{ n }}</a></li>
          <li v-for="f in comparison.files.changed" :key="`~${f.name}`">
            <span class="badge changed">modifié</span> <a :href="fileLink(model, f.name)">{{ f.name }}</a>
            <ul>
              <li v-for="c in f.changes" :key="c.field">
                {{ LABELS[c.field] ?? c.field }} :
                <span class="old"><RegexText v-if="REGEX.has(c.field) && typeof c.old === 'string'" :value="c.old" :model="reference" /><template v-else>{{ format(c.field, c.old) }}</template></span>
                →
                <span class="new"><RegexText v-if="REGEX.has(c.field) && typeof c.new === 'string'" :value="c.new" :model="model" /><template v-else>{{ format(c.field, c.new) }}</template></span>
              </li>
            </ul>
          </li>
        </ul>
      </section>

      <section v-if="comparison.tables.added.length || comparison.tables.removed.length || comparison.tables.changed.length" class="mb-4" data-testid="compare-tables">
        <h2 class="text-h6">Tables</h2>
        <ul class="changes">
          <li v-for="n in comparison.tables.added" :key="`+${n}`"><span class="badge added">ajoutée</span> <a :href="tableLink(model, n)">{{ n }}</a></li>
          <li v-for="n in comparison.tables.removed" :key="`-${n}`"><span class="badge removed">retirée</span> <a :href="tableLink(reference, n)">{{ n }}</a></li>
          <li v-for="t in comparison.tables.changed" :key="`~${t.name}`" :data-testid="`compare-table-${t.name}`">
            <span class="badge changed">modifiée</span> <a :href="tableLink(model, t.name)">{{ t.name }}</a>
            <ul>
              <li v-for="c in t.changes" :key="c.field">
                {{ LABELS[c.field] ?? c.field }} :
                <span v-for="x in c.removed" :key="`-${x}`" class="old item">− {{ x }}</span>
                <span v-for="x in c.added" :key="`+${x}`" class="new item">+ {{ x }}</span>
              </li>
              <li v-for="n in t.columns.added" :key="`+c${n}`"><span class="badge added">colonne ajoutée</span> <a :href="tableLink(model, t.name, n)">{{ n }}</a></li>
              <li v-for="n in t.columns.removed" :key="`-c${n}`"><span class="badge removed">colonne retirée</span> <a :href="tableLink(reference, t.name, n)">{{ n }}</a></li>
              <li v-for="col in t.columns.changed" :key="`~c${col.name}`">
                <span class="badge changed">colonne modifiée</span> <a :href="tableLink(model, t.name, col.name)">{{ col.name }}</a> :
                <template v-for="(c, i) in col.changes" :key="c.field">
                  <template v-if="i > 0">, </template>
                  {{ LABELS[c.field] ?? c.field }}
                  <template v-if="c.removed">
                    <span v-for="x in c.removed" :key="`-${x}`" class="old item">− {{ x }}</span>
                    <span v-for="x in c.added" :key="`+${x}`" class="new item">+ {{ x }}</span>
                  </template>
                  <template v-else>
                    <span class="old"><RegexText v-if="REGEX.has(c.field) && typeof c.old === 'string'" :value="c.old" :model="reference" /><template v-else>{{ format(c.field, c.old) }}</template></span>
                    →
                    <span class="new"><RegexText v-if="REGEX.has(c.field) && typeof c.new === 'string'" :value="c.new" :model="model" /><template v-else>{{ format(c.field, c.new) }}</template></span>
                  </template>
                </template>
              </li>
            </ul>
          </li>
        </ul>
      </section>

      <section v-if="comparison.codes.added.length || comparison.codes.removed.length" class="mb-4" data-testid="compare-codes">
        <h2 class="text-h6">Listes de codes</h2>
        <ul class="changes">
          <li v-for="n in comparison.codes.added" :key="`+${n}`"><span class="badge added">ajoutée</span> <a :href="codeLink(model, n)">{{ n }}</a></li>
          <li v-for="n in comparison.codes.removed" :key="`-${n}`"><span class="badge removed">retirée</span> <a :href="codeLink(reference, n)">{{ n }}</a></li>
        </ul>
      </section>
    </template>
  </section>
</template>

<style scoped>
.field {
  min-width: 16rem;
  flex: 1 1 16rem;
}
.changes {
  list-style: none;
  padding-left: 0;
}
.changes ul {
  list-style: none;
  padding-left: 1.5rem;
}
.changes li {
  margin: 2px 0;
}
.badge {
  display: inline-block;
  padding: 0 6px;
  border-radius: 4px;
  font-size: 0.8rem;
}
.badge.added {
  background: rgba(var(--v-theme-success), 0.15);
}
.badge.removed {
  background: rgba(var(--v-theme-error), 0.15);
}
.badge.changed {
  background: rgba(var(--v-theme-primary), 0.12);
}
.item {
  display: inline-block;
  margin-left: 0.5rem;
  word-break: break-all;
}
.old {
  text-decoration: line-through;
  text-decoration-thickness: 1px;
}
</style>
