<script setup lang="ts">
import { mdiSourceBranchSync } from '@mdi/js'
import { computed, ref, watch } from 'vue'
import { getAt } from '@core/edit/pointer'
import { dataOf, isModifiedAt } from '@core/edit/session'
import { applyToEquivalents, COMPARED, differingProperties, findEquivalents, PROPERTIES, type Equivalent, type Source } from '@core/equivalents'
import { href } from '../router'
import { useProject } from '../stores/project'
import RegexText from './RegexText.vue'

// Modification en série (feature 006, plan R6) : éléments équivalents de `source` dans les autres
// modèles, puis recopie d'une propriété vers ceux qui sont cochés.
const props = defineProps<{ source: Source; label: string }>()
const store = useProject()
const open = ref(false)
const tab = ref<'apply' | 'compare'>('apply')
const all = ref(false)
const property = ref<string>()
const unchecked = ref(new Set<string>())

// Libellé du bouton selon l'élément : colonnes, fichiers ou listes semblables des autres modèles.
const BUTTON: Record<Source['kind'], string> = { column: 'Appliquer aux colonnes semblables', file: 'Appliquer aux fichiers semblables', code: 'Appliquer aux listes semblables' }

const LABELS: Record<string, string> = {
  '/type': 'Type', '/title': 'Titre', '/description': 'Description', '/constraints/required': 'Valeur obligatoire',
  '/constraints/presenceRequired': 'Colonne obligatoire', '/constraints/unique': 'Unique', '/constraints/minLength': 'Longueur minimale',
  '/constraints/maxLength': 'Longueur maximale', '/constraints/pattern': 'Motif', '/constraints/enum': 'Valeurs autorisées',
  '/constraints/reference': 'Référence', '/mandatory': 'Présence', '/path': 'Chemin', '/tableModel': 'Modèle de table', '/data': 'Fichier CSV',
}
// Bouton proposé seulement une fois l'élément modifié : il sert à propager une modification.
const modified = computed(() => !!store.session && isModifiedAt(store.session, props.source.file, props.source.pointer))
const properties = computed(() => PROPERTIES[props.source.kind].map((p) => ({ title: LABELS[p] ?? p, value: p })))

const equivalents = computed(() => (open.value && store.session ? findEquivalents(store.session, props.source, all.value ? 'all' : 'family') : { items: [], absent: [] }))
const sourceData = computed(() => (store.session ? getAt(dataOf(store.session, props.source.file), props.source.pointer) : undefined))

const valueOf = (data: unknown, p: string) => getAt(data, p)
const same = (a: unknown, b: unknown) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null)
function format(v: unknown): string {
  if (v === undefined || v === null || v === '') return '(absent)'
  if (typeof v === 'boolean') return v ? 'Oui' : 'Non'
  return Array.isArray(v) ? v.join(', ') : String(v)
}
const keyOf = (e: Equivalent) => `${e.file}#${e.pointer}`
const upToDate = (e: Equivalent) => property.value !== undefined && same(valueOf(e.data, property.value), valueOf(sourceData.value, property.value))
const selected = computed(() => equivalents.value.items.filter((e) => e.editable && !upToDate(e) && !unchecked.value.has(keyOf(e))))

// Propriété présélectionnée : la dernière modifiée de l'élément dans la session, sinon la première qui diffère.
function preselect() {
  const past = store.session?.history.past ?? []
  for (let i = past.length - 1; i >= 0; i--) {
    const key = past[i]!.key
    if (past[i]!.changes.some((c) => c.path === props.source.file) && key?.startsWith(`${props.source.pointer}/`)) {
      // Les champs de contrainte de TableView ont pour clé /columns/<i>/<contrainte>.
      const p = key.slice(props.source.pointer.length)
      const found = [p, `/constraints${p}`].find((x) => PROPERTIES[props.source.kind].includes(x))
      if (found) return found
    }
  }
  return PROPERTIES[props.source.kind].find((p) => equivalents.value.items.some((e) => !same(valueOf(e.data, p), valueOf(sourceData.value, p))))
}

watch(open, (o) => {
  if (!o) return
  all.value = false
  // Site en lecture seule (013) : comparaison seulement.
  tab.value = store.readOnly ? 'compare' : 'apply'
  unchecked.value = new Set()
  property.value = preselect()
})

// Tableau de comparaison (US3) : source en premier, propriétés principales, écarts à la source.
const compared = computed(() => COMPARED[props.source.kind])
const sourceModel = computed(() => props.source.file.slice(0, props.source.file.indexOf('/')))
const rows = computed(() => [
  { key: 'source', model: sourceModel.value, file: props.source.file, pointer: props.source.pointer, data: sourceData.value, differs: [] as string[], isSource: true },
  ...equivalents.value.items.map((e) => ({ key: keyOf(e), ...e, differs: differingProperties(sourceData.value, e.data, compared.value), isSource: false })),
])
const divergent = computed(() => rows.value.filter((r) => r.differs.length).length)
const isRegex = (p: string) => p === '/constraints/pattern' || p === '/path'

function toggle(e: Equivalent, on: boolean | null) {
  const next = new Set(unchecked.value)
  if (on) next.delete(keyOf(e))
  else next.add(keyOf(e))
  unchecked.value = next
}

function apply() {
  if (!store.session || !property.value || !selected.value.length) return
  const n = selected.value.length
  store.applyChanges(applyToEquivalents(store.session, props.source, selected.value, property.value))
  store.notice = `${LABELS[property.value]} appliqué à ${n} élément${n > 1 ? 's' : ''}.`
  open.value = false
}
</script>

<template>
  <v-dialog v-if="modified || open" v-model="open" max-width="900" scrollable>
    <template #activator="{ props: activator }">
      <v-btn v-bind="activator" :prepend-icon="mdiSourceBranchSync" size="small" variant="text" data-testid="equivalents">{{ BUTTON[source.kind] }}</v-btn>
    </template>
    <v-card :title="`Équivalents de ${label}`" :subtitle="all ? 'Toute la configuration' : 'Modèles de la même famille'" data-testid="equivalents-dialog">
      <v-card-text>
        <v-switch v-model="all" label="Toute la configuration" density="compact" hide-details color="primary" data-testid="equivalents-all" />
        <p v-if="!equivalents.items.length" class="my-2" data-testid="equivalents-none">Aucun élément équivalent.</p>
        <v-tabs v-else v-model="tab" density="compact" class="mt-2">
          <v-tab v-if="!store.readOnly" value="apply" data-testid="equivalents-tab-apply">Appliquer</v-tab>
          <v-tab value="compare" data-testid="equivalents-tab-compare">Comparer</v-tab>
        </v-tabs>
        <template v-if="equivalents.items.length && tab === 'compare'">
          <p class="text-body-2 my-2" data-testid="equivalents-divergent">
            <template v-if="divergent">{{ divergent }} élément{{ divergent > 1 ? 's' : '' }} sur {{ equivalents.items.length }} diffère{{ divergent > 1 ? 'nt' : '' }} de {{ label }} (valeurs marquées « ≠ »).</template>
            <template v-else>Les {{ equivalents.items.length }} éléments équivalents ont les mêmes valeurs que {{ label }}.</template>
          </p>
          <v-table density="compact" class="compare" data-testid="equivalents-table">
            <caption class="sr-only">Comparaison de {{ label }} avec ses équivalents</caption>
            <thead>
              <tr>
                <th scope="col">Modèle</th>
                <th v-for="p in compared" :key="p" scope="col">{{ LABELS[p] ?? p }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in rows" :key="r.key" :data-testid="`compare-row-${r.model}`">
                <th scope="row"><a :href="href(r.file, r.pointer)">{{ r.model }}</a><template v-if="r.isSource"> (source)</template></th>
                <td v-for="p in compared" :key="p" :class="{ diff: r.differs.includes(p) }">
                  <template v-if="r.differs.includes(p)">≠ </template>
                  <RegexText v-if="isRegex(p) && typeof valueOf(r.data, p) === 'string'" :value="valueOf(r.data, p) as string" :model="r.model" />
                  <template v-else>{{ format(valueOf(r.data, p)) }}</template>
                </td>
              </tr>
            </tbody>
          </v-table>
        </template>
        <template v-else-if="equivalents.items.length">
          <v-select v-model="property" :items="properties" label="Propriété à appliquer" density="compact" variant="outlined" class="mt-2"
            data-testid="equivalents-property" />
          <p v-if="property" class="text-body-2 mb-2">
            Valeur de {{ label }} : <strong data-testid="equivalents-source-value">{{ format(valueOf(sourceData, property)) }}</strong>
          </p>
          <ul class="targets" aria-label="Éléments équivalents">
            <li v-for="e in equivalents.items" :key="keyOf(e)" :data-testid="`equivalent-${e.model}`">
              <v-checkbox :model-value="e.editable && !upToDate(e) && !unchecked.has(keyOf(e))" :disabled="!e.editable || upToDate(e)" density="compact" hide-details
                :aria-label="`Appliquer à ${e.model}`" @update:model-value="(v: boolean | null) => toggle(e, v)" />
              <a :href="href(e.file, e.pointer)">{{ e.model }}</a>
              <span class="text-medium-emphasis">{{ e.file.slice(e.model.length + 1) }}</span>
              <span v-if="property">: {{ format(valueOf(e.data, property)) }}</span>
              <span v-if="!e.editable" class="status">non modifiable</span>
              <span v-else-if="upToDate(e)" class="status">déjà à jour</span>
            </li>
          </ul>
        </template>
        <p v-if="equivalents.absent.length" class="text-body-2 mt-2" data-testid="equivalents-absent">
          Sans élément équivalent : {{ equivalents.absent.join(', ') }}
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="open = false">Fermer</v-btn>
        <v-btn v-if="tab === 'apply'" color="primary" variant="flat" :disabled="!property || !selected.length" data-testid="equivalents-apply" @click="apply">
          Appliquer à {{ selected.length }} élément{{ selected.length > 1 ? 's' : '' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.targets {
  list-style: none;
  padding-left: 0;
}
.targets li {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.compare td.diff {
  font-weight: bold;
  background: rgba(var(--v-theme-warning), 0.12);
}
.compare td,
.compare th {
  white-space: nowrap;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
.status {
  font-size: 0.8rem;
  padding: 0 6px;
  border-radius: 4px;
  background: rgba(var(--v-theme-secondary), 0.15);
}
</style>
