<script setup lang="ts">
import { mdiSourceBranchSync } from '@mdi/js'
import { computed, ref, watch } from 'vue'
import { getAt } from '@core/edit/pointer'
import { dataOf } from '@core/edit/session'
import { applyToEquivalents, findEquivalents, PROPERTIES, type Equivalent, type Source } from '@core/equivalents'
import { href } from '../router'
import { useProject } from '../stores/project'

// Modification en série (feature 006, plan R6) : éléments équivalents de `source` dans les autres
// modèles, puis recopie d'une propriété vers ceux qui sont cochés, en une étape d'annulation.
const props = defineProps<{ source: Source; label: string }>()
const store = useProject()
const open = ref(false)
const all = ref(false)
const property = ref<string>()
const unchecked = ref(new Set<string>())

const LABELS: Record<string, string> = {
  '/type': 'Type', '/title': 'Titre', '/description': 'Description', '/constraints/required': 'Valeur obligatoire',
  '/constraints/presenceRequired': 'Colonne obligatoire', '/constraints/unique': 'Unique', '/constraints/minLength': 'Longueur minimale',
  '/constraints/maxLength': 'Longueur maximale', '/constraints/pattern': 'Motif', '/constraints/enum': 'Valeurs autorisées',
  '/constraints/reference': 'Référence', '/mandatory': 'Présence', '/path': 'Chemin', '/tableModel': 'Modèle de table', '/data': 'Fichier CSV',
}
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
  unchecked.value = new Set()
  property.value = preselect()
})

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
  store.notice = `${LABELS[property.value]} appliqué à ${n} élément${n > 1 ? 's' : ''} (Annuler pour revenir en arrière).`
  open.value = false
}
</script>

<template>
  <v-dialog v-model="open" max-width="900" scrollable>
    <template #activator="{ props: activator }">
      <v-btn v-bind="activator" :prepend-icon="mdiSourceBranchSync" size="small" variant="text" data-testid="equivalents">Équivalents</v-btn>
    </template>
    <v-card :title="`Équivalents de ${label}`" :subtitle="all ? 'Toute la configuration' : 'Modèles de la même famille'" data-testid="equivalents-dialog">
      <v-card-text>
        <v-switch v-model="all" label="Toute la configuration" density="compact" hide-details color="primary" data-testid="equivalents-all" />
        <p v-if="!equivalents.items.length" class="my-2" data-testid="equivalents-none">Aucun élément équivalent.</p>
        <template v-else>
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
        <v-btn color="primary" variant="flat" :disabled="!property || !selected.length" data-testid="equivalents-apply" @click="apply">
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
.status {
  font-size: 0.8rem;
  padding: 0 6px;
  border-radius: 4px;
  background: rgba(var(--v-theme-secondary), 0.15);
}
</style>
