<script setup lang="ts">
import { mdiAlertCircleOutline, mdiContentSave, mdiDownload, mdiFolderOpen, mdiRedo, mdiRefresh, mdiUndo } from '@mdi/js'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import CodeListView from './components/CodeListView.vue'
import GpuView from './components/GpuView.vue'
import Home from './components/Home.vue'
import ModelTree from './components/ModelTree.vue'
import ModelView from './components/ModelView.vue'
import ProblemsPanel from './components/ProblemsPanel.vue'
import SourceView from './components/SourceView.vue'
import TableView from './components/TableView.vue'
import { kindOf } from './files'
import { route } from './router'
import { useProject } from './stores/project'

const store = useProject()
// Éditeur en ligne (build « pages ») : pas de serveur, l'utilisateur choisit un dossier.
const online = import.meta.env.MODE === 'pages'
const showHome = ref(false)
watch(() => store.session, () => (showHome.value = false))

// Raccourcis : Ctrl+Z annuler, Ctrl+Maj+Z ou Ctrl+Y rétablir.
function onKey(e: KeyboardEvent) {
  if (!(e.ctrlKey || e.metaKey)) return
  const key = e.key.toLowerCase()
  if (key === 's') {
    if (store.canSave) save()
  } else if (key === 'z' && !e.shiftKey) store.undo()
  else if ((key === 'z' && e.shiftKey) || key === 'y') store.redo()
  else return
  e.preventDefault()
}

// Avertissement avant de quitter avec des modifications non enregistrées ou non téléchargées.
function onBeforeUnload(e: BeforeUnloadEvent) {
  if (store.pending) e.preventDefault()
}

onMounted(() => {
  if (!online) store.load()
  window.addEventListener('keydown', onKey)
  window.addEventListener('beforeunload', onBeforeUnload)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('beforeunload', onBeforeUnload)
})

const plural = (n: number, word: string) => `${n} ${word}${n > 1 ? 's' : ''}`
const notice = ref<string>()
async function save() {
  const results = await store.save()
  const failed = results.filter((r) => !r.ok)
  const saved = results.length - failed.length
  notice.value =
    (saved ? `${saved} fichier${saved > 1 ? 's' : ''} enregistré${saved > 1 ? 's' : ''}.` : '') +
    failed.map((r) => ` Non enregistré : ${r.path} (${r.ok ? '' : r.message}).`).join('')
}
async function downloadZip() {
  const r = await store.downloadZip()
  notice.value =
    `Configuration téléchargée : ${r.name}` +
    (r.errors ? ` (${r.errors} erreur${r.errors > 1 ? 's' : ''} restante${r.errors > 1 ? 's' : ''})` : '') +
    (r.reformatted.length ? `. Fichiers réindentés : ${r.reformatted.join(', ')}` : '')
}

function reload() {
  if (store.changed.size > 0 && !window.confirm(`${store.changed.size} fichier(s) modifié(s) : recharger depuis le disque abandonne ces modifications. Continuer ?`)) return
  store.load()
}

const VIEWS = { model: ModelView, table: TableView, codes: CodeListView, gpu: GpuView, other: SourceView }
const view = computed(() => VIEWS[kindOf(route.value.file)])
const showProblems = ref(true)
</script>

<template>
  <v-app>
    <v-app-bar density="compact" color="primary">
      <v-app-bar-title>
        <a href="#/" class="home">Configuration validator</a>
      </v-app-bar-title>
      <span class="text-body-2 mr-4 root" :title="store.root" data-testid="config-source">{{ store.root }}</span>
      <v-btn :icon="mdiUndo" :disabled="!store.canUndo" aria-label="Annuler (Ctrl+Z)" title="Annuler (Ctrl+Z)" data-testid="undo" @click="store.undo()" />
      <v-btn :icon="mdiRedo" :disabled="!store.canRedo" aria-label="Rétablir (Ctrl+Maj+Z)" title="Rétablir (Ctrl+Maj+Z)" data-testid="redo" @click="store.redo()" />
      <span v-if="store.changed.size" class="text-body-2 mx-2" data-testid="changed-count">{{ store.changed.size }} fichier(s) modifié(s)</span>
      <v-btn v-if="store.canSave" :prepend-icon="mdiContentSave" :disabled="!store.changed.size" data-testid="save" @click="save">Enregistrer</v-btn>
      <v-btn v-if="store.result" :prepend-icon="mdiDownload" data-testid="download-zip" @click="downloadZip">Télécharger (ZIP)</v-btn>
      <v-btn v-if="online && store.result" :prepend-icon="mdiFolderOpen" data-testid="other-folder" @click="showHome = true">Ouvrir un dossier</v-btn>
      <v-btn v-if="!online" :prepend-icon="mdiRefresh" :loading="store.loading" data-testid="reload" @click="reload">Recharger</v-btn>
      <v-btn :prepend-icon="mdiAlertCircleOutline" :aria-pressed="showProblems" data-testid="toggle-problems" @click="showProblems = !showProblems">
        Problèmes ({{ store.result?.problems.length ?? 0 }})
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-if="store.result" permanent :width="340">
      <ModelTree />
    </v-navigation-drawer>

    <v-navigation-drawer v-if="store.result" v-model="showProblems" location="end" :width="420" permanent>
      <ProblemsPanel />
    </v-navigation-drawer>

    <v-snackbar :model-value="!!notice" timeout="8000" data-testid="notice" @update:model-value="(v: boolean) => !v && (notice = undefined)">
      {{ notice }}
    </v-snackbar>

    <v-main>
      <v-container fluid>
        <v-alert v-if="store.error" type="error" class="mb-4">{{ store.error }}</v-alert>
        <v-progress-linear v-if="store.loading && !store.result" indeterminate aria-label="Chargement de la configuration" />
        <Home v-if="online && (!store.result || showHome)" />
        <template v-else-if="store.result">
          <component :is="view" v-if="route.file" :key="route.file" :file="route.file" />
          <section v-else>
            <h1 class="text-h5 mb-2">Configuration</h1>
            <p v-if="store.summary" data-testid="summary">
              {{ plural(store.summary.models, 'modèle') }}, {{ plural(store.summary.tables, 'table') }}, {{ plural(store.summary.codeLists, 'liste') }} de codes —
              {{ plural(store.summary.errors, 'erreur') }}, {{ plural(store.summary.warnings, 'avertissement') }}.
            </p>
            <p class="mt-2">Choisissez un modèle dans la liste.</p>
          </section>
        </template>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.home {
  color: inherit;
  text-decoration: none;
}
.root {
  max-width: 40vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
