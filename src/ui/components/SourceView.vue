<script setup lang="ts">
import { computed, nextTick, useTemplateRef, watch } from 'vue'
import { csvLine, jsonLine, type SyntaxToken } from '@core/syntax'
import { href } from '../router'
import { useProject } from '../stores/project'

// Contenu exact d'un fichier : lignes numérotées (liens), JSON et CSV colorés ; la ligne
// désignée par l'adresse (erreur de syntaxe) est mise en évidence et rendue visible.
const props = defineProps<{ file: string; line?: number }>()
const store = useProject()
const text = computed(() => store.text(props.file))
const csv = computed(() => props.file.toLowerCase().endsWith('.csv'))
// Fin de ligne restituée après chaque ligne, sauf la dernière si le fichier n'en a pas.
const finalNewline = computed(() => /\r?\n$/.test(text.value ?? ''))
const lines = computed<SyntaxToken[][]>(() => {
  const all = (text.value ?? '').replace(/\r?\n$/, '').split(/\r?\n/)
  return all.map((l, i) => (csv.value ? csvLine(l, i === 0) : props.file.endsWith('.json') ? jsonLine(l) : [{ kind: 'text', text: l }]))
})
const root = useTemplateRef<HTMLElement>('root')
watch(
  () => [props.line, text.value],
  async () => {
    await nextTick()
    if (props.line !== undefined) root.value?.querySelector(`[data-line="${props.line}"]`)?.scrollIntoView({ block: 'center' })
  },
  { immediate: true },
)
</script>

<template>
  <div v-if="text !== undefined" ref="root" class="source" data-testid="source" tabindex="0" :aria-label="`Contenu de ${file}`">
    <div v-for="(tokens, i) in lines" :key="i" class="line" :class="{ current: line === i + 1 }" :data-line="i + 1">
      <!-- Numéro affiché en CSS : le texte de la vue reste celui du fichier (copie, lecture). -->
      <a class="ln" :href="href(file, undefined, i + 1)" :aria-label="`Ligne ${i + 1}`" :data-n="i + 1" />
      <code class="text"><span v-for="(t, j) in tokens" :key="j" :class="t.kind">{{ t.text }}</span><span v-if="i < lines.length - 1 || finalNewline" class="nl">{{ '\n' }}</span></code>
    </div>
  </div>
  <p v-else>Fichier absent de la configuration.</p>
</template>

<style scoped>
.source {
  overflow: auto;
  max-height: 70vh;
  padding: 6px 0;
  border: 1px solid rgb(var(--v-theme-divider));
  border-radius: 6px;
  background: rgb(var(--v-theme-surface-light));
  font-family: ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace;
  font-size: 0.85rem;
  line-height: 1.5;
}
.line {
  display: flex;
  min-width: max-content;
}
.line.current {
  background: rgba(var(--v-theme-warning), 0.22);
  box-shadow: inset 3px 0 0 rgb(var(--v-theme-warning));
}
.ln {
  flex: none;
  width: 4.5em;
  padding-right: 12px;
  text-align: right;
  color: rgb(var(--v-theme-secondary));
  text-decoration: none;
  user-select: none;
}
.ln::before {
  content: attr(data-n);
}
.nl {
  display: none;
}
.ln:hover,
.ln:focus-visible {
  color: rgb(var(--v-theme-primary));
  text-decoration: underline;
}
.text {
  white-space: pre;
  color: rgb(var(--v-theme-on-surface));
}
.key,
.header {
  color: rgb(var(--v-theme-primary));
  font-weight: 700;
}
.string {
  color: var(--code-string);
}
.text .number {
  color: #6929c4;
}
.literal {
  color: #9f1853;
  font-weight: 700;
}
.separator {
  color: rgb(var(--v-theme-secondary));
}
</style>

<style>
.v-theme--dark .source .text .number {
  color: #be95ff;
}
.v-theme--dark .source .literal {
  color: #ff7eb6;
}
</style>
