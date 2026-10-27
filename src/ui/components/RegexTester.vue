<script setup lang="ts">
import { mdiCheckCircle, mdiCloseCircle, mdiFlaskOutline } from '@mdi/js'
import { computed, ref } from 'vue'
import { useProject } from '../stores/project'

// Essai d'un nom (sans extension) contre une regex : accepté, ou refusé à partir de telle partie.
const props = defineProps<{ regex: string | undefined; model?: string; label?: string }>()
const store = useProject()
const sample = ref('')
const result = computed(() => (props.regex && sample.value ? store.regexTest(props.regex, sample.value, props.model) : undefined))
</script>

<template>
  <div class="tester" data-testid="regex-tester">
    <v-text-field v-model="sample" :label="label ?? 'Tester un nom (sans extension)'" :prepend-inner-icon="mdiFlaskOutline" density="compact"
      variant="outlined" hide-details clearable class="sample mono" :disabled="!regex" :readonly="false" data-testid="regex-sample" />
    <span v-if="result?.kind === 'match'" class="verdict ok" role="status" data-testid="regex-verdict">
      <v-icon :icon="mdiCheckCircle" size="small" aria-hidden="true" /> accepté
    </span>
    <span v-else-if="result?.kind === 'mismatch'" class="verdict ko" role="status" data-testid="regex-verdict">
      <v-icon :icon="mdiCloseCircle" size="small" aria-hidden="true" />
      refusé<template v-if="result.failedAt"> à partir de <code>{{ result.failedAt }}</code></template><template v-else> : texte en trop à la fin</template>
    </span>
    <span v-else-if="result?.kind === 'invalid'" class="verdict ko" role="status" data-testid="regex-verdict">regex invalide : {{ result.message }}</span>
  </div>
</template>

<style scoped>
.tester {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 12px;
  margin: 4px 0 14px;
}
.sample {
  flex: 1 1 18rem;
  max-width: 30rem;
}
.verdict {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 10px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.875rem;
}
.verdict.ok {
  color: #1e5631;
  background: #e3f4e8;
}
.verdict.ko {
  color: #8c1d18;
  background: #fde7e5;
}
</style>

<style>
.v-theme--dark .tester .verdict.ok {
  color: #a5d6a7;
  background: rgba(165, 214, 167, 0.12);
}
.v-theme--dark .tester .verdict.ko {
  color: #ffb4ab;
  background: rgba(255, 180, 171, 0.12);
}
</style>
