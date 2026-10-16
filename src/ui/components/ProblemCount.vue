<script setup lang="ts">
import type { ProblemCounts } from '@core/validation/problems'

// Compteurs d'erreurs et d'avertissements (texte lisible pour les lecteurs d'écran).
defineProps<{ counts: ProblemCounts | undefined; testid?: string }>()
</script>

<template>
  <span v-if="counts?.errors" class="count error" :title="`${counts.errors} erreur(s)`" :aria-label="`${counts.errors} erreur(s)`" :data-testid="testid">{{ counts.errors }}</span>
  <span v-if="counts?.warnings" class="count warning" :title="`${counts.warnings} avertissement(s)`" :aria-label="`${counts.warnings} avertissement(s)`">{{ counts.warnings }}</span>
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
