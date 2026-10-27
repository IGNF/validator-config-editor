<script setup lang="ts">
import { mdiMagnify } from '@mdi/js'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { search } from '@core/search'
import { go } from '../router'
import { useProject } from '../stores/project'

// Recherche dans toute la configuration (feature « recherche globale ») : bouton de l'en-tête ou
// touche « / » ; un résultat ouvre l'élément trouvé.
const store = useProject()
const open = ref(false)
const query = ref('')
const debounced = ref('')
let timer: ReturnType<typeof setTimeout> | undefined
watch(query, (q) => {
  clearTimeout(timer)
  timer = setTimeout(() => (debounced.value = q ?? ''), 200)
})
const found = computed(() => (store.result && debounced.value ? search(store.result, debounced.value) : { results: [], truncated: false }))

// Extrait de la valeur trouvée, la partie cherchée isolée pour la mise en évidence.
function parts(value: string): [string, string, string] {
  const i = value.toLowerCase().indexOf(debounced.value.trim().toLowerCase())
  if (i < 0) return [value, '', '']
  const n = debounced.value.trim().length
  const start = Math.max(0, i - 40)
  return [(start > 0 ? '…' : '') + value.slice(start, i), value.slice(i, i + n), value.slice(i + n, i + n + 60) + (i + n + 60 < value.length ? '…' : '')]
}

function choose(r: (typeof found.value.results)[number]) {
  open.value = false
  go(r.file, r.pointer)
}

function onKey(e: KeyboardEvent) {
  const target = e.target as HTMLElement | null
  if (e.key !== '/' || e.ctrlKey || e.metaKey || !store.result) return
  if (target && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))) return
  e.preventDefault()
  open.value = true
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <v-dialog v-model="open" max-width="760" scrollable>
    <template #activator="{ props: activator }">
      <v-btn v-bind="activator" :prepend-icon="mdiMagnify" data-testid="search-open" title="Rechercher dans la configuration (/)">Rechercher</v-btn>
    </template>
    <v-card data-testid="search-dialog">
      <v-card-item>
        <v-text-field v-model="query" label="Rechercher : colonne, regex, code, identifiant…" :prepend-inner-icon="mdiMagnify" variant="outlined"
          density="comfortable" hide-details clearable autofocus :readonly="false" data-testid="search-input" />
      </v-card-item>
      <v-card-text class="pt-0">
        <p class="text-body-2 mb-2" role="status" data-testid="search-count">
          <template v-if="debounced.trim().length < 2">Saisissez au moins deux caractères.</template>
          <template v-else>{{ found.results.length }}{{ found.truncated ? '+' : '' }} résultat{{ found.results.length > 1 ? 's' : '' }}</template>
        </p>
        <v-list density="compact" class="results">
          <v-list-item v-for="(r, i) in found.results" :key="i" class="result" data-testid="search-result" @click="choose(r)">
            <div class="d-flex align-center flex-wrap ga-2">
              <span class="kind">{{ r.kind }}</span>
              <strong>{{ r.label }}</strong>
            </div>
            <div class="excerpt">
              {{ r.field }} : <span>{{ parts(r.value)[0] }}</span><mark>{{ parts(r.value)[1] }}</mark><span>{{ parts(r.value)[2] }}</span>
            </div>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="open = false">Fermer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.result {
  border-bottom: 1px solid rgb(var(--v-theme-divider));
}
.kind {
  padding: 0 6px;
  border-radius: 10px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  color: rgb(var(--v-theme-primary));
  border: 1px solid rgb(var(--v-theme-primary));
}
.excerpt {
  font-size: 0.85rem;
  color: rgb(var(--v-theme-secondary));
  overflow-wrap: anywhere;
}
mark {
  padding: 0 1px;
  border-radius: 2px;
  background: rgba(var(--v-theme-optional), 0.6);
  color: #3d2f00;
}
</style>
