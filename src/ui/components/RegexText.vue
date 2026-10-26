<script setup lang="ts">
import { computed } from 'vue'
import { useProject } from '../stores/project'

// Regex affichée avec ses variables (feature 010) ; regex complète au survol.
const props = defineProps<{ value: string | undefined; model?: string }>()
const store = useProject()
const display = computed(() => store.regexDisplay(props.value ?? '', props.model))
</script>

<template>
  <code :title="display !== value ? value : undefined" data-testid="regex">{{ display }}</code>
</template>
