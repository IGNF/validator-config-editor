<script setup lang="ts">
import { computed } from 'vue'
import { useProject } from '../stores/project'

const props = defineProps<{ file: string }>()
const store = useProject()
const text = computed(() => store.files.get(props.file))
</script>

<template>
  <pre v-if="text !== undefined" class="source pa-3" data-testid="source" tabindex="0" :aria-label="`Contenu de ${file}`">{{ text }}</pre>
  <p v-else>Fichier absent de la configuration.</p>
</template>

<style scoped>
.source {
  overflow: auto;
  max-height: 70vh;
  font-size: 0.85rem;
  background: rgba(var(--v-theme-on-surface), 0.04);
  border-radius: 4px;
}
</style>
