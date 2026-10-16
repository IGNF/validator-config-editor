<script setup lang="ts">
import { mdiMagnify } from '@mdi/js'
import { computed, ref, watch } from 'vue'
import type { LoadedModel } from '@core/model/types'
import { baseName, modelOf } from '../files'
import { href, route } from '../router'
import { useProject } from '../stores/project'

const store = useProject()
const filter = ref('')
const opened = ref<string[]>([])

const shown = computed(() => {
  const f = filter.value.trim().toLowerCase()
  return f ? store.models.filter((m) => m.name.toLowerCase().includes(f)) : store.models
})

// Ouvre le modèle de l'élément sélectionné.
watch(
  () => route.value.file,
  (file) => {
    const model = file && modelOf(file)
    if (model && !opened.value.includes(model)) opened.value = [...opened.value, model]
  },
  { immediate: true },
)

const tables = (m: LoadedModel) =>
  [...m.tables.keys()].map((path) => {
    const name = store.result?.checked.get(m.name)?.tables.get(path)?.name
    return { path, title: name ?? baseName(path).replace(/\.json$/, '') }
  })
const codeLists = (m: LoadedModel) => [...m.csvs.keys()].map((path) => ({ path, title: baseName(path).replace(/\.csv$/, '') }))
const isAbstract = (m: LoadedModel) => !m.document
const counts = (m: LoadedModel) => store.countsByModel.get(m.name) ?? { errors: 0, warnings: 0 }
</script>

<template>
  <nav aria-label="Modèles">
    <v-text-field
      v-model="filter"
      label="Filtrer les modèles"
      :prepend-inner-icon="mdiMagnify"
      density="compact"
      variant="outlined"
      hide-details
      clearable
      class="ma-2"
      data-testid="model-filter"
    />
    <p class="text-caption px-4" aria-live="polite">{{ shown.length }} / {{ store.models.length }} modèles</p>
    <!-- Rôles : Vuetify donne « option » aux en-têtes de groupe, invalide hors d'une listbox. -->
    <v-list v-model:opened="opened" density="compact" nav role="none">
      <v-list-group v-for="m in shown" :key="m.name" :value="m.name">
        <template #activator="{ props }">
          <v-list-item v-bind="props" role="button" :aria-selected="null" :aria-expanded="opened.includes(m.name)" :data-testid="`model-${m.name}`">
            <v-list-item-title>{{ store.isModelEdited(m.name) ? '● ' : '' }}{{ m.name }}</v-list-item-title>
            <template #append>
              <v-chip v-if="isAbstract(m)" size="x-small" class="mr-1">abstrait</v-chip>
              <span v-if="counts(m).errors" class="count error" :aria-label="`${counts(m).errors} erreur(s)`" :data-testid="`errors-${m.name}`">{{ counts(m).errors }}</span>
              <span v-if="counts(m).warnings" class="count warning" :aria-label="`${counts(m).warnings} avertissement(s)`">{{ counts(m).warnings }}</span>
            </template>
          </v-list-item>
        </template>
        <v-list-item
          :href="href(m.document?.path ?? `${m.name}/`)"
          :active="route.file === (m.document?.path ?? `${m.name}/`)"
          :title="(m.document && store.isEdited(m.document.path) ? '● ' : '') + (m.document ? 'Modèle (files.json)' : 'Modèle abstrait')"
        />
        <template v-if="m.tables.size">
          <v-list-subheader>Tables ({{ m.tables.size }})</v-list-subheader>
          <v-list-item v-for="t in tables(m)" :key="t.path" :href="href(t.path)" :active="route.file === t.path" :title="(store.isEdited(t.path) ? '● ' : '') + t.title" />
        </template>
        <template v-if="m.csvs.size">
          <v-list-subheader>Listes de codes ({{ m.csvs.size }})</v-list-subheader>
          <v-list-item v-for="c in codeLists(m)" :key="c.path" :href="href(c.path)" :active="route.file === c.path" :title="c.title" />
        </template>
        <v-list-item v-if="m.gpu" :href="href(m.gpu.path)" :active="route.file === m.gpu.path" title="Surcharges GpU (gpu.json)" />
      </v-list-group>
    </v-list>
  </nav>
</template>

<style scoped>
.count {
  min-width: 1.5rem;
  margin-left: 2px;
  padding: 0 4px;
  border-radius: 8px;
  text-align: center;
  font-size: 0.75rem;
  color: #fff;
}
.count.error {
  background: #b00020;
}
.count.warning {
  background: #8a5300;
}
</style>
