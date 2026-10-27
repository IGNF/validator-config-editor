<script setup lang="ts">
import { computed } from 'vue'
import { useProject } from '../stores/project'

// Regex affichée avec ses variables (feature 010) ; regex complète au survol, variables
// facultatives (_OPT) en jaune comme dans le GpU.
const props = defineProps<{ value: string | undefined; model?: string }>()
const store = useProject()
const segments = computed(() => store.regexSegments(props.value ?? '', props.model))
const display = computed(() => segments.value.map((s) => s.text).join(''))
</script>

<template>
  <code class="regex" :title="display !== value ? value : undefined" data-testid="regex"><template v-for="(s, i) in segments" :key="i"><span
    v-if="s.variable" class="variable" :class="{ optional: s.optional }" :title="`${s.variable} : ${s.regex}${s.optional ? ' (facultatif)' : ''}`"
    :data-testid="s.optional ? 'variable-optional' : 'variable'">{{ s.text }}</span><template v-else>{{ s.text }}</template></template></code>
</template>

<style scoped>
.regex {
  padding: 1px 5px;
  border: 1px solid rgb(var(--v-theme-divider));
  border-radius: 4px;
  background: rgb(var(--v-theme-surface-light));
  color: rgb(var(--v-theme-on-surface));
  font-family: ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace;
  overflow-wrap: anywhere;
}
/* Variables de variables.json : bleu ; facultatives (_OPT) : jaune, comme dans le GpU. */
.variable {
  padding: 0 2px;
  border-radius: 3px;
  background: rgba(var(--v-theme-primary), 0.14);
  color: rgb(var(--v-theme-primary));
  font-weight: 700;
}
.variable.optional {
  background: rgba(var(--v-theme-optional), 0.55);
  color: #3d2f00;
}
</style>

<style>
/* Thème sombre : jaune sourd et texte clair (non scopé : :global() dans un style scopé
   s'appliquerait au sélecteur entier). */
.v-theme--dark code.regex .variable.optional {
  background: rgba(var(--v-theme-optional), 0.22);
  color: #ffe07a;
}
</style>
