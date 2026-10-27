<script setup lang="ts">
import { computed } from 'vue'
import { sqlTokens } from '@core/sql'

// Clé étrangère ou condition affichée comme du SQL : mots-clés connus en bleu gras.
const props = defineProps<{ value: string }>()
const tokens = computed(() => sqlTokens(props.value))
</script>

<template>
  <code class="sql" data-testid="sql"><span v-for="(t, i) in tokens" :key="i" :class="t.kind">{{ t.text }}</span></code>
</template>

<style scoped>
.sql {
  display: inline-block;
  padding: 4px 8px;
  border: 1px solid rgb(var(--v-theme-divider));
  border-radius: 4px;
  background: rgb(var(--v-theme-surface-light));
  color: rgb(var(--v-theme-on-surface));
  font-family: ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.keyword {
  color: rgb(var(--v-theme-primary));
  font-weight: 700;
}
.string {
  color: var(--code-string);
}
</style>
