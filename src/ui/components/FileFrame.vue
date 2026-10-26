<script setup lang="ts">
import { mdiDownload } from '@mdi/js'
import { nextTick, onMounted, ref, useTemplateRef, watch } from 'vue'
import { closestPointer } from '@core/validation/problems'
import { route } from '../router'
import { useProject } from '../stores/project'
import SourceView from './SourceView.vue'

// Cadre commun des vues : titre, chemin du fichier, onglets « Vue » et « Source », et mise en
// évidence de l'élément désigné par le pointeur de l'URL.
defineProps<{ title: string; file: string; source?: string }>()
const tab = ref<'view' | 'source'>('view')
const store = useProject()
const root = useTemplateRef<HTMLElement>('root')

async function highlight() {
  await nextTick()
  const el = root.value
  if (!el) return
  el.querySelectorAll('.highlight').forEach((e) => e.classList.remove('highlight'))
  const pointer = route.value.pointer
  if (pointer === undefined) return
  const elements = [...el.querySelectorAll<HTMLElement>('[data-pointer]')]
  const best = closestPointer(pointer, elements.map((e) => e.dataset.pointer!))
  const target = elements.find((e) => e.dataset.pointer === best)
  if (!target) return
  target.classList.add('highlight')
  target.scrollIntoView({ block: 'center' })
}

onMounted(highlight)
watch(() => route.value.pointer, () => {
  tab.value = 'view'
  highlight()
})
watch(tab, highlight)
</script>

<template>
  <section ref="root">
    <div class="d-flex align-center flex-wrap ga-2">
      <h1 class="text-h5" :title="file">{{ title }}</h1>
      <v-chip v-if="source && store.isEdited(source)" size="small" color="warning" data-testid="edited">● modifié</v-chip>
      <slot name="chips" />
      <v-btn v-if="source" :icon="mdiDownload" size="small" variant="text" aria-label="Télécharger ce fichier" title="Télécharger ce fichier"
        data-testid="download-file" @click="store.download({ kind: 'file', path: source })" />
    </div>
    <v-tabs v-if="source" v-model="tab" density="compact" class="mb-4">
      <v-tab value="view">Vue</v-tab>
      <v-tab value="source">Source</v-tab>
    </v-tabs>
    <slot v-if="tab === 'view' || !source" />
    <SourceView v-else :file="source" />
    <!-- Chemin du fichier : discret, en bas de la vue (et au survol du titre). -->
    <p class="text-caption text-medium-emphasis mt-6" data-testid="file-path">Fichier : <code>{{ file }}</code></p>
  </section>
</template>

<style scoped>
section :deep(.highlight) {
  outline: 3px solid rgb(var(--v-theme-warning));
  outline-offset: -3px;
  background: rgba(var(--v-theme-warning), 0.12);
}
</style>
