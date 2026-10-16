<script setup lang="ts">
import { ref } from 'vue'
import SourceView from './SourceView.vue'

// Cadre commun des vues : titre, chemin du fichier, onglets « Vue » et « Source ».
defineProps<{ title: string; file: string; source?: string }>()
const tab = ref<'view' | 'source'>('view')
</script>

<template>
  <section>
    <div class="d-flex align-center flex-wrap ga-2">
      <h1 class="text-h5">{{ title }}</h1>
      <slot name="chips" />
    </div>
    <p class="text-body-2 text-medium-emphasis mb-2"><code>{{ file }}</code></p>
    <v-tabs v-if="source" v-model="tab" density="compact" class="mb-4">
      <v-tab value="view">Vue</v-tab>
      <v-tab value="source">Source</v-tab>
    </v-tabs>
    <slot v-if="tab === 'view' || !source" />
    <SourceView v-else :file="source" />
  </section>
</template>
