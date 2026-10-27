<script setup lang="ts">
import { mdiAlertCircleOutline, mdiContentSave, mdiDownload, mdiFileTreeOutline, mdiFolderOpen, mdiRedo, mdiRefresh, mdiUndo } from '@mdi/js'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import CodeListView from './components/CodeListView.vue'
import CompareView from './components/CompareView.vue'
import GpuView from './components/GpuView.vue'
import Home from './components/Home.vue'
import ModelTree from './components/ModelTree.vue'
import ModelView from './components/ModelView.vue'
import ProblemsPanel from './components/ProblemsPanel.vue'
import ResizeHandle from './components/ResizeHandle.vue'
import SourceView from './components/SourceView.vue'
import TableView from './components/TableView.vue'
import { kindOf, modelOf } from './files'
import { panels } from './layout'
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
async function save() {
  const results = await store.save()
  const failed = results.filter((r) => !r.ok)
  const saved = results.length - failed.length
  store.notice =
    (saved ? `${saved} fichier${saved > 1 ? 's' : ''} enregistré${saved > 1 ? 's' : ''}.` : '') +
    failed.map((r) => ` Non enregistré : ${r.path} (${r.ok ? '' : r.message}).`).join('')
}

function reload() {
  if (store.changed.size > 0 && !window.confirm(`${store.changed.size} fichier(s) modifié(s) : recharger depuis le disque abandonne ces modifications. Continuer ?`)) return
  store.load()
}

const VIEWS = { model: ModelView, table: TableView, codes: CodeListView, gpu: GpuView, other: SourceView }
const view = computed(() => VIEWS[kindOf(route.value.file)])
</script>

<template>
  <v-app>
    <v-app-bar density="compact" color="primary">
      <template v-if="store.result" #prepend>
        <v-btn :icon="mdiFileTreeOutline" :aria-pressed="panels.models.open" aria-label="Panneau des modèles" title="Afficher ou masquer les modèles"
          data-testid="toggle-models" @click="panels.models.open = !panels.models.open" />
      </template>
      <v-app-bar-title>
        <a href="#/" class="home">Configuration validator</a>
      </v-app-bar-title>
      <span class="text-body-2 mr-4 root" :title="store.root" data-testid="config-source">{{ store.root }}</span>
      <v-btn :icon="mdiUndo" :disabled="!store.canUndo" aria-label="Annuler (Ctrl+Z)" title="Annuler (Ctrl+Z)" data-testid="undo" @click="store.undo()" />
      <v-btn :icon="mdiRedo" :disabled="!store.canRedo" aria-label="Rétablir (Ctrl+Maj+Z)" title="Rétablir (Ctrl+Maj+Z)" data-testid="redo" @click="store.redo()" />
      <span v-if="store.changed.size" class="text-body-2 mx-2" data-testid="changed-count">{{ store.changed.size }} fichier(s) modifié(s)</span>
      <v-btn v-if="store.canSave" :prepend-icon="mdiContentSave" :disabled="!store.changed.size" data-testid="save" @click="save">Enregistrer</v-btn>
      <v-btn v-if="store.result" :prepend-icon="mdiDownload" data-testid="download-zip" @click="store.download({ kind: 'all' })">Télécharger (ZIP)</v-btn>
      <v-btn v-if="online && store.result" :prepend-icon="mdiFolderOpen" data-testid="other-folder" @click="showHome = true">Ouvrir un dossier</v-btn>
      <v-btn v-if="!online" :prepend-icon="mdiRefresh" :loading="store.loading" data-testid="reload" @click="reload">Recharger</v-btn>
      <v-btn :prepend-icon="mdiAlertCircleOutline" :aria-pressed="panels.problems.open" data-testid="toggle-problems" @click="panels.problems.open = !panels.problems.open">
        Problèmes ({{ store.result?.problems.length ?? 0 }})
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-if="store.result" v-model="panels.models.open" permanent :width="panels.models.width" data-testid="models-panel">
      <ModelTree />
      <ResizeHandle :panel="panels.models" edge="right" label="Largeur du panneau des modèles" />
    </v-navigation-drawer>

    <v-navigation-drawer v-if="store.result" v-model="panels.problems.open" location="end" :width="panels.problems.width" permanent data-testid="problems-panel">
      <ProblemsPanel />
      <ResizeHandle :panel="panels.problems" edge="left" label="Largeur du panneau des problèmes" />
    </v-navigation-drawer>

    <v-snackbar :model-value="!!store.notice" timeout="8000" data-testid="notice" @update:model-value="(v: boolean) => !v && (store.notice = undefined)">
      {{ store.notice }}
    </v-snackbar>

    <v-main>
      <v-container fluid>
        <v-alert v-if="store.error" type="error" class="mb-4">{{ store.error }}</v-alert>
        <v-progress-linear v-if="store.loading && !store.result" indeterminate aria-label="Chargement de la configuration" />
        <Home v-if="online && (!store.result || showHome)" />
        <template v-else-if="store.result">
          <CompareView v-if="route.file && route.compare !== undefined" :model="modelOf(route.file)" :reference="route.compare" />
          <component :is="view" v-else-if="route.file" :key="route.file" :file="route.file" />
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
