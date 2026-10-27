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
  <v-menu v-if="fixes.length" location="bottom end" max-width="30rem">
    <template #activator="{ props: menu }">
      <v-btn v-bind="menu" :prepend-icon="mdiAutoFix" size="small" variant="flat" color="primary" data-testid="fix">
        Corriger
      </v-btn>
    </template>
    <v-card class="fixes" data-testid="fix-menu">
      <v-card-item>
        <v-card-title class="text-subtitle-1 font-weight-bold">Corrections proposées</v-card-title>
        <v-card-subtitle class="subtitle">{{ problem.message }}</v-card-subtitle>
      </v-card-item>
      <v-divider />
      <v-list density="comfortable" class="py-0">
        <v-list-item v-for="(fix, i) in fixes" :key="i" class="fix" data-testid="fix-option" @click="store.applyFix(fix)">
          <template #prepend><v-icon :icon="mdiAutoFix" color="primary" aria-hidden="true" /></template>
          <span class="label">{{ fix.label }}</span>
          <template #append>
            <span v-if="fix.safe" class="safe" title="Correction sans ambiguïté, applicable en groupe">sûre</span>
          </template>
        </v-list-item>
      </v-list>
      <v-divider />
    </v-card>
  </v-menu>
</template>

<style scoped>
.subtitle {
  white-space: normal;
  opacity: 1;
  color: rgb(var(--v-theme-secondary));
}
.fix {
  border-bottom: 1px solid rgb(var(--v-theme-divider));
}
.fix:last-child {
  border-bottom: none;
}
.label {
  white-space: normal;
  line-height: 1.35;
}
.safe {
  margin-left: 8px;
  padding: 0 6px;
  border-radius: 10px;
  font-size: 0.72rem;
  font-weight: 700;
  color: #1e5631;
  background: #e3f4e8;
}
</style>
