<script setup lang="ts">
import { computed, onMounted } from 'vue'
import CodeListView from './components/CodeListView.vue'
import GpuView from './components/GpuView.vue'
import ModelTree from './components/ModelTree.vue'
import ModelView from './components/ModelView.vue'
import SourceView from './components/SourceView.vue'
import TableView from './components/TableView.vue'
import { kindOf } from './files'
import { route } from './router'
import { useProject } from './stores/project'

const store = useProject()
onMounted(() => store.load())

const VIEWS = { model: ModelView, table: TableView, codes: CodeListView, gpu: GpuView, other: SourceView }
const view = computed(() => VIEWS[kindOf(route.value.file)])
</script>

<template>
  <v-app>
    <v-app-bar density="compact" color="primary">
      <v-app-bar-title>
        <a href="#/" class="home">Configuration validator</a>
      </v-app-bar-title>
      <span class="text-body-2 mr-4 root" :title="store.root">{{ store.root }}</span>
    </v-app-bar>

    <v-navigation-drawer permanent :width="340">
      <ModelTree />
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <v-alert v-if="store.error" type="error" class="mb-4">{{ store.error }}</v-alert>
        <v-progress-linear v-if="store.loading" indeterminate aria-label="Chargement de la configuration" />
        <template v-else-if="store.result">
          <component :is="view" v-if="route.file" :key="route.file" :file="route.file" />
          <section v-else>
            <h1 class="text-h5 mb-2">Configuration</h1>
            <p v-if="store.summary" data-testid="summary">
              {{ store.summary.models }} modèles, {{ store.summary.tables }} tables, {{ store.summary.codeLists }} listes de codes —
              {{ store.summary.errors }} erreur(s), {{ store.summary.warnings }} avertissement(s).
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
