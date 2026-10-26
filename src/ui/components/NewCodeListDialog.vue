<script setup lang="ts">
import { mdiPlaylistPlus } from '@mdi/js'
import { computed, ref, watch } from 'vue'
import { checkColumns, checkNewName, createCodeList } from '@core/edit/codelists'
import { go } from '../router'
import { useProject } from '../stores/project'

// Création d'une liste de codes vide dans le modèle courant (feature 005, US2).
const props = defineProps<{ model: string }>()
const store = useProject()
const open = ref(false)
const name = ref('')
const columnsText = ref('')

watch(open, (o) => {
  if (!o) return
  name.value = ''
  columnsText.value = 'CODE,LIBELLE'
})

// Colonnes saisies séparées par des virgules, espaces autour retirés.
const columns = computed(() => (columnsText.value.trim() === '' ? [] : columnsText.value.split(',').map((c) => c.trim())))
const nameRefusal = computed(() => (name.value ? checkNewName(store.session!, props.model, name.value) : undefined))
const columnsRefusal = computed(() => checkColumns(columns.value))
const valid = computed(() => !!name.value && !nameRefusal.value && !columnsRefusal.value)

function create() {
  if (!valid.value) return
  store.applyChanges(createCodeList(store.session!, props.model, name.value, columns.value))
  open.value = false
  go(`${props.model}/codes/${name.value}.csv`)
}
</script>

<template>
  <v-dialog v-model="open" max-width="600">
    <template #activator="{ props: activator }">
      <v-btn v-bind="activator" :prepend-icon="mdiPlaylistPlus" variant="tonal" data-testid="new-code-list">Nouvelle liste</v-btn>
    </template>
    <v-card title="Nouvelle liste de codes" :subtitle="`Dans le modèle ${model}`">
      <v-card-text>
        <v-text-field v-model="name" label="Nom de la liste" density="compact" variant="outlined" autofocus :error-messages="nameRefusal ? [nameRefusal] : []"
          data-testid="new-list-name" />
        <v-text-field v-model="columnsText" label="Colonnes (séparées par des virgules)" density="compact" variant="outlined"
          :error-messages="columnsRefusal ? [columnsRefusal] : []" data-testid="new-list-columns" />
        <p class="text-body-2 text-medium-emphasis">Le fichier <code>codes/{{ name || '…' }}.csv</code> est créé avec la seule ligne d'en-tête, et la liste est déclarée dans files.json.</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="open = false">Annuler</v-btn>
        <v-btn color="primary" variant="flat" :disabled="!valid" data-testid="confirm-create" @click="create">Créer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
