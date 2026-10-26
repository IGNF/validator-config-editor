<script setup lang="ts">
import { mdiContentCopy } from '@mdi/js'
import { computed, ref, watch } from 'vue'
import { checkNewName, codeLists, copyCodeList, defaultCopyName, type CodeListRef } from '@core/edit/codelists'
import { go } from '../router'
import { useProject } from '../stores/project'

// Copie d'une liste de codes de la configuration dans le modèle courant (feature 005, US1).
const props = defineProps<{ model: string }>()
const store = useProject()
const open = ref(false)
const filter = ref('')
const selected = ref<CodeListRef>()
const name = ref('')

const lists = computed(() => (open.value && store.session ? codeLists(store.session) : []))
// Lignes de la liste défilante : un en-tête par modèle, puis ses listes (déjà triées par modèle).
type Row = { kind: 'model'; model: string } | { kind: 'list'; list: CodeListRef }
const rows = computed<Row[]>(() => {
  const f = filter.value?.trim().toLowerCase() ?? ''
  const out: Row[] = []
  let model: string | undefined
  for (const list of lists.value) {
    if (f && !list.name.toLowerCase().includes(f) && !list.model.toLowerCase().includes(f)) continue
    if (list.model !== model) out.push({ kind: 'model', model: (model = list.model) })
    out.push({ kind: 'list', list })
  }
  return out
})
const count = computed(() => rows.value.filter((r) => r.kind === 'list').length)

watch(open, (o) => {
  if (!o) return
  filter.value = ''
  selected.value = undefined
  name.value = ''
})

function choose(list: CodeListRef) {
  selected.value = list
  name.value = defaultCopyName(store.session!, list, props.model)
}

const refusal = computed(() => (selected.value ? checkNewName(store.session!, props.model, name.value) : undefined))

function copy() {
  const from = selected.value
  if (!from || refusal.value) return
  store.applyChanges(copyCodeList(store.session!, from, props.model, name.value))
  open.value = false
  go(`${props.model}/codes/${name.value}.csv`)
}
</script>

<template>
  <v-dialog v-model="open" max-width="900">
    <template #activator="{ props: activator }">
      <v-btn v-bind="activator" :prepend-icon="mdiContentCopy" variant="tonal" data-testid="copy-code-list">Copier une liste existante</v-btn>
    </template>
    <v-card title="Copier une liste de codes" :subtitle="`Vers le modèle ${model}`">
      <v-card-text>
        <v-text-field v-model="filter" label="Filtrer par nom de liste ou de modèle" density="compact" variant="outlined" hide-details clearable autofocus
          data-testid="code-list-filter" />
        <p class="text-caption my-2" aria-live="polite">{{ count }} liste{{ count > 1 ? 's' : '' }}</p>
        <div class="d-flex ga-4">
          <v-virtual-scroll :items="rows" height="320" item-height="36" class="choices" role="listbox" aria-label="Listes de codes de la configuration">
            <template #default="{ item }">
              <div v-if="item.kind === 'model'" class="text-caption font-weight-bold px-2 pt-2" role="presentation">{{ item.model }}</div>
              <v-list-item v-else :title="item.list.name" density="compact" role="option" :aria-selected="selected === item.list"
                :active="selected === item.list" :data-testid="`source-${item.list.model}-${item.list.name}`" @click="choose(item.list)" />
            </template>
          </v-virtual-scroll>
          <div class="preview">
            <template v-if="selected">
              <p class="text-subtitle-2">{{ selected.model }} › {{ selected.name }}</p>
              <p class="text-body-2 mb-2" data-testid="copy-preview">
                {{ selected.rows }} valeur{{ selected.rows > 1 ? 's' : '' }} — colonnes : {{ selected.columns.join(', ') }}
              </p>
              <v-text-field v-model="name" label="Nom de la copie" density="compact" variant="outlined" :error-messages="refusal ? [refusal] : []"
                data-testid="copy-name" />
            </template>
            <p v-else class="text-body-2 text-medium-emphasis">Choisissez une liste à copier.</p>
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="open = false">Annuler</v-btn>
        <v-btn color="primary" variant="flat" :disabled="!selected || !!refusal" data-testid="confirm-copy" @click="copy">Copier</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.choices {
  flex: 1 1 50%;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}
.preview {
  flex: 1 1 50%;
}
</style>
