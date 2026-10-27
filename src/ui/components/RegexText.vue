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
  <code :title="display !== value ? value : undefined" data-testid="regex"><template v-for="(s, i) in segments" :key="i"><span
    v-if="s.variable" class="variable" :class="{ optional: s.optional }" :title="`${s.variable} : ${s.regex}${s.optional ? ' (facultatif)' : ''}`"
    :data-testid="s.optional ? 'variable-optional' : 'variable'">{{ s.text }}</span><template v-else>{{ s.text }}</template></template></code>
</template>

<style scoped>
.variable {
  border-radius: 3px;
  background: rgba(var(--v-theme-primary), 0.12);
}
.variable.optional {
  background: rgba(var(--v-theme-optional), 0.4);
}
</style>
