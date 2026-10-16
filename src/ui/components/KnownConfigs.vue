<script setup lang="ts">
import { mdiSourceRepository } from '@mdi/js'
import { KNOWN_CONFIGS, type KnownConfig } from '@core/github'
import { GitHubSource } from '../io/github'
import { useProject } from '../stores/project'

// Configurations IGNF/validator connues (feature 003, US3) : un clic ouvre le dépôt.
const emit = defineEmits<{ opened: [] }>()
const store = useProject()

async function open(c: KnownConfig) {
  if (store.pending && !window.confirm(`${store.changed.size} fichier(s) modifié(s) non téléchargé(s) : ouvrir un autre dépôt abandonne ces modifications. Continuer ?`)) return
  await store.load(new GitHubSource({ owner: c.owner, repo: c.repo, ...(c.branch && { branch: c.branch }) }))
  if (!store.error) emit('opened')
}
</script>

<template>
  <v-list density="compact" class="known" aria-label="Configurations connues">
    <v-list-item v-for="c in KNOWN_CONFIGS" :key="c.repo" :prepend-icon="mdiSourceRepository" :title="c.repo" :subtitle="`${c.description} — branche ${c.branch ?? 'par défaut'}`"
      :disabled="store.loading" :data-testid="`known-${c.repo}`" @click="open(c)" />
  </v-list>
</template>
