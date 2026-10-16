<script setup lang="ts">
import { mdiSourceBranch } from '@mdi/js'
import { computed, ref } from 'vue'
import { GitHubSource } from '../io/github'
import { useProject } from '../stores/project'

// Source affichée dans la barre ; pour un dépôt GitHub, menu de ses branches (feature 003, US2).
const store = useProject()
const github = computed(() => (store.source instanceof GitHubSource ? store.source : undefined))
const branches = ref<string[]>()
const failure = ref<string>()

// Liste des branches demandée à l'ouverture du menu seulement (une requête).
async function list(open: boolean) {
  if (!open || !github.value || branches.value) return
  failure.value = undefined
  try {
    branches.value = await github.value.branches()
  } catch (e) {
    failure.value = e instanceof Error ? e.message : String(e)
  }
}

async function choose(branch: string) {
  const current = github.value
  if (!current || branch === current.branch) return
  if (store.pending && !window.confirm(`${store.changed.size} fichier(s) modifié(s) non téléchargé(s) : changer de branche abandonne ces modifications. Continuer ?`)) return
  const { owner, repo, path } = current.spec
  await store.load(new GitHubSource({ owner, repo, branch, ...(path && { path }) }))
  branches.value = undefined
}
</script>

<template>
  <template v-if="github">
    <a :href="github.link" target="_blank" rel="noopener" class="text-body-2 mr-2 root" :title="store.root" data-testid="source">{{ store.root }}</a>
    <v-menu @update:model-value="list">
      <template #activator="{ props }">
        <v-btn v-bind="props" :prepend-icon="mdiSourceBranch" size="small" variant="tonal" class="mr-2" data-testid="branches">
          {{ github.branch }}<span v-if="github.commit" class="ml-1 text-caption">({{ github.commit.slice(0, 7) }})</span>
        </v-btn>
      </template>
      <v-list density="compact" max-height="60vh">
        <v-list-subheader>Branches de {{ github.spec.owner }}/{{ github.spec.repo }}</v-list-subheader>
        <v-list-item v-if="failure" :title="failure" />
        <v-list-item v-else-if="!branches" title="Chargement…" />
        <v-list-item v-for="b in branches" :key="b" :title="b" :active="b === github.branch" data-testid="branch-option" @click="choose(b)" />
      </v-list>
    </v-menu>
  </template>
  <a v-else-if="store.source?.link" :href="store.source.link" target="_blank" rel="noopener" class="text-body-2 mr-4 root" :title="store.root" data-testid="source">{{ store.root }}</a>
  <span v-else class="text-body-2 mr-4 root" :title="store.root" data-testid="source">{{ store.root }}</span>
</template>

<style scoped>
.root {
  max-width: 35vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: inherit;
}
</style>
