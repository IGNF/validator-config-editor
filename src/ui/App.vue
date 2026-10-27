<script setup lang="ts">
import { mdiAlertCircleOutline, mdiContentSave, mdiDownload, mdiFileTreeOutline, mdiFolderOpen, mdiGithub, mdiRedo, mdiRefresh, mdiUndo } from '@mdi/js'
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue'
import ChangesDialog from './components/ChangesDialog.vue'
import CodeListView from './components/CodeListView.vue'
import ConfigHome from './components/ConfigHome.vue'
import CompareView from './components/CompareView.vue'
import Home from './components/Home.vue'
import ModelTree from './components/ModelTree.vue'
import ModelView from './components/ModelView.vue'
import ProblemsPanel from './components/ProblemsPanel.vue'
import SearchDialog from './components/SearchDialog.vue'
import ResizeHandle from './components/ResizeHandle.vue'
import SourceView from './components/SourceView.vue'
import TableView from './components/TableView.vue'
import { kindOf, modelOf } from './files'
import { panels } from './layout'
import { route } from './router'
import { useProject } from './stores/project'
import pkg from '../../package.json' with { type: 'json' }
import { isSite, SiteSource } from './io/site'

const store = useProject()
// Éditeur en ligne (build « pages ») : pas de serveur, l'utilisateur choisit un dossier.
const online = import.meta.env.MODE === 'pages'
// Site en lecture seule produit par `vce site` (013) : instantané statique, champs en lecture seule.
const site = isSite()
const siteSource = site ? new SiteSource() : undefined
// Champs : pas d'espace réservé sous un champ sans message ; en lecture seule (013), non modifiables.
const FIELDS = { VTextField: { hideDetails: 'auto' }, VTextarea: { hideDetails: 'auto' }, VSelect: { hideDetails: 'auto' }, VCombobox: { hideDetails: 'auto' } }
const READ_ONLY = { VTextField: { hideDetails: 'auto', readonly: true }, VTextarea: { hideDetails: 'auto', readonly: true }, VSelect: { hideDetails: 'auto', readonly: true }, VCombobox: { hideDetails: 'auto', readonly: true }, VCheckbox: { readonly: true } }
const showHome = ref(false)
// Téléchargement complet : avec des modifications, la revue s'ouvre et attend la confirmation.
const changes = useTemplateRef<InstanceType<typeof ChangesDialog>>('changes')
function downloadAll() {
  if (store.changed.size) changes.value?.show(true)
  else store.download({ kind: 'all' })
}
watch(() => store.session, () => (showHome.value = false))
// Panneau des problèmes : à chaque chargement, ouvert s'il y a des problèmes, replié sinon.
watch(
  () => store.loading,
  (loading, was) => {
    if (was && !loading && store.result) panels.problems.open = store.result.problems.length > 0
  },
)
// Un problème qui apparaît (édition) rouvre le panneau.
watch(
  () => store.result?.problems.length ?? 0,
  (count, before) => {
    if (before === 0 && count > 0 && !store.loading) panels.problems.open = true
  },
)

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
  if (!online) store.load(siteSource)
  window.addEventListener('keydown', onKey)
  window.addEventListener('beforeunload', onBeforeUnload)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('beforeunload', onBeforeUnload)
})

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

const VIEWS = { model: ModelView, table: TableView, codes: CodeListView, other: SourceView }
const view = computed(() => VIEWS[kindOf(route.value.file)])
</script>

<template>
  <v-app>
    <v-app-bar density="compact" flat class="app-header">
      <template v-if="store.result" #prepend>
        <v-btn :icon="mdiFileTreeOutline" :aria-pressed="panels.models.open" aria-label="Panneau des modèles" title="Afficher ou masquer les modèles"
          data-testid="toggle-models" @click="panels.models.open = !panels.models.open" />
      </template>
      <v-app-bar-title>
        <a href="#/" class="home">Configuration validator</a>
      </v-app-bar-title>
      <span class="version text-body-2" :title="`Version ${pkg.version} de validator-config-editor`" data-testid="app-version">v{{ pkg.version }}</span>
      <v-btn :icon="mdiGithub" size="small" variant="text" href="https://github.com/IGNF/validator-config-editor" target="_blank" rel="noopener"
        aria-label="validator-config-editor sur GitHub (nouvel onglet)" title="validator-config-editor sur GitHub" data-testid="app-github" />
      <span class="text-body-2 ml-4 mr-4 root" :title="store.root" data-testid="config-source">{{ store.root }}</span>
      <v-btn v-if="store.result && !store.readOnly" :icon="mdiUndo" :disabled="!store.canUndo" aria-label="Annuler (Ctrl+Z)" title="Annuler (Ctrl+Z)" data-testid="undo" @click="store.undo()" />
      <v-btn v-if="store.result && !store.readOnly" :icon="mdiRedo" :disabled="!store.canRedo" aria-label="Rétablir (Ctrl+Maj+Z)" title="Rétablir (Ctrl+Maj+Z)" data-testid="redo" @click="store.redo()" />
      <v-btn v-if="store.changed.size" variant="tonal" color="warning" class="mx-2 changed" title="Revoir les modifications" data-testid="changed-count"
        @click="changes?.show()">{{ store.changed.size }} fichier(s) modifié(s)</v-btn>
      <v-btn v-if="store.canSave" :prepend-icon="mdiContentSave" :disabled="!store.changed.size" data-testid="save" @click="save">Enregistrer</v-btn>
      <SearchDialog v-if="store.result" />
      <v-btn v-if="store.result" :prepend-icon="mdiDownload" data-testid="download-zip" @click="downloadAll">Télécharger (ZIP)</v-btn>
      <v-btn v-if="online && store.result" :prepend-icon="mdiFolderOpen" data-testid="other-folder" @click="showHome = true">Ouvrir un dossier</v-btn>
      <v-btn v-if="!online && !site" :prepend-icon="mdiRefresh" :loading="store.loading" data-testid="reload" @click="reload">Recharger</v-btn>
      <v-btn v-if="store.result" :prepend-icon="mdiAlertCircleOutline" :aria-pressed="panels.problems.open" data-testid="toggle-problems" @click="panels.problems.open = !panels.problems.open">
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

    <ChangesDialog ref="changes" />

    <v-snackbar :model-value="!!store.notice" timeout="8000" data-testid="notice" @update:model-value="(v: boolean) => !v && (store.notice = undefined)">
      {{ store.notice }}
    </v-snackbar>

    <v-main>
      <v-alert v-if="store.readOnly" type="info" variant="tonal" density="compact" class="rounded-0" data-testid="read-only-banner">
        <strong>Lecture seule</strong> — pour modifier cette configuration, ouvrez son dépôt avec <code>vce serve</code> ou l'éditeur en ligne.
        <span v-if="siteSource?.version" class="text-medium-emphasis"> Éditeur v{{ siteSource.version }}.</span>
      </v-alert>
      <v-defaults-provider :defaults="store.readOnly ? READ_ONLY : FIELDS">
      <v-container fluid>
        <v-alert v-if="store.error" type="error" class="mb-4">{{ store.error }}</v-alert>
        <v-progress-linear v-if="store.loading && !store.result" indeterminate aria-label="Chargement de la configuration" />
        <Home v-if="online && (!store.result || showHome)" />
        <template v-else-if="store.result">
          <CompareView v-if="route.file && route.compare !== undefined" :model="modelOf(route.file)" :reference="route.compare" />
          <component :is="view" v-else-if="route.file" :key="route.file" :file="route.file" />
          <ConfigHome v-else />
        </template>
      </v-container>
      </v-defaults-provider>
    </v-main>
  </v-app>
</template>

<style scoped>
.home {
  color: inherit;
  text-decoration: none;
}
.version {
  margin-left: 8px;
  padding: 0 6px;
  border: 1px solid rgb(var(--v-theme-divider));
  border-radius: 4px;
  color: rgb(var(--v-theme-secondary));
  white-space: nowrap;
}
.root {
  max-width: 40vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
