<script setup lang="ts">
import { mdiAutoFix } from '@mdi/js'
import { computed } from 'vue'
import type { Problem } from '@core/validation/problems'
import { useProject } from '../stores/project'

// Corrections proposées pour un problème (feature 004) : un bouton « Corriger » et ses options.
const props = defineProps<{ problem: Problem }>()
const store = useProject()
const fixes = computed(() => store.fixes(props.problem))
</script>

<template>
  <v-menu v-if="fixes.length" location="bottom start">
    <template #activator="{ props: menu }">
      <v-btn v-bind="menu" :prepend-icon="mdiAutoFix" size="small" variant="tonal" color="primary" class="align-self-start mt-1" data-testid="fix">
        Corriger
      </v-btn>
    </template>
    <v-list density="compact" max-width="28rem">
      <v-list-item v-for="(fix, i) in fixes" :key="i" :title="fix.label" lines="three" data-testid="fix-option" @click="store.applyFix(fix)" />
    </v-list>
  </v-menu>
</template>
