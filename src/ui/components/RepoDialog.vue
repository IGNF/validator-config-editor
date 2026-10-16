<script setup lang="ts">
import { mdiSourceRepository } from '@mdi/js'
import { computed, ref } from 'vue'
import { parseRepoUrl } from '@core/github'
import { GitHubSource } from '../io/github'
import { useProject } from '../stores/project'

// Ouvrir la configuration d'un dépôt GitHub public par son URL (feature 003).
const store = useProject()
const open = ref(false)
const url = ref('')
const parsed = computed(() => parseRepoUrl(url.value))
const invalid = computed(() => url.value.trim() !== '' && !parsed.value)

async function submit() {
  if (!parsed.value) return
  if (store.pending && !window.confirm(`${store.changed.size} fichier(s) modifié(s) non téléchargé(s) : ouvrir un autre dépôt abandonne ces modifications. Continuer ?`)) return
  await store.load(new GitHubSource(parsed.value))
  if (!store.error) open.value = false
}
</script>

<template>
  <v-dialog v-model="open" max-width="40rem">
    <template #activator="{ props }">
      <slot name="activator" :props="props">
        <v-btn v-bind="props" :prepend-icon="mdiSourceRepository" data-testid="open-repo">Ouvrir un dépôt</v-btn>
      </slot>
    </template>
    <v-card title="Ouvrir un dépôt GitHub">
      <v-card-text>
        <p class="mb-4">
          Configuration d'un dépôt public, lue en lecture seule : les modifications restent dans le navigateur et se téléchargent en ZIP.
        </p>
        <v-text-field v-model="url" label="URL du dépôt" placeholder="https://github.com/IGNF/validator-config-dgpr" variant="outlined"
          :error-messages="invalid ? 'Formes acceptées : https://github.com/<org>/<dépôt>[/tree/<branche>[/<dossier>]] ou <org>/<dépôt>' : undefined"
          data-testid="repo-url" autofocus @keyup.enter="submit" />
        <v-progress-linear v-if="store.loading" :model-value="store.progress ? (100 * store.progress.done) / store.progress.total : undefined"
          :indeterminate="!store.progress" aria-label="Lecture du dépôt" />
        <p v-if="store.progress" class="text-body-2 mt-1" data-testid="repo-progress">{{ store.progress.done }} / {{ store.progress.total }} fichiers lus</p>
        <v-alert v-if="store.error && !store.loading" type="error" variant="tonal" class="mt-2" data-testid="repo-error">{{ store.error }}</v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="open = false">Annuler</v-btn>
        <v-btn color="primary" variant="flat" :disabled="!parsed" :loading="store.loading" data-testid="repo-submit" @click="submit">Ouvrir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
