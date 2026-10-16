<script setup lang="ts">
import { mdiFolderOpen } from '@mdi/js'
import { useTemplateRef } from 'vue'
import { canPickFolder, FolderSource } from '../io/folder'
import KnownConfigs from './KnownConfigs.vue'
import RepoDialog from './RepoDialog.vue'
import { useProject } from '../stores/project'

const store = useProject()
const input = useTemplateRef<HTMLInputElement>('input')
const supported = canPickFolder()

function choose() {
  if (store.changed.size > 0 && !window.confirm(`${store.changed.size} fichier(s) modifié(s) non téléchargé(s) : ouvrir un autre dossier abandonne ces modifications. Continuer ?`)) return
  input.value?.click()
}

async function picked(event: Event) {
  const target = event.target as HTMLInputElement
  const files = [...(target.files ?? [])]
  target.value = ''
  if (files.length) await store.load(new FolderSource(files))
}

defineExpose({ choose })
</script>

<template>
  <section class="home">
    <h1 class="text-h4 mb-4">Éditeur de configuration validator</h1>
    <p class="mb-2">
      Validez et modifiez une configuration
      <a href="https://github.com/IGNF/validator" rel="noopener">IGNF/validator</a> (modèles <code>files.json</code>, tables
      <code>types/*.json</code>, listes de codes, surcharges GpU), puis téléchargez-la en ZIP.
    </p>
    <p class="mb-6">
      <strong>Les fichiers restent sur votre poste :</strong> ils sont lus par le navigateur et rien n'est envoyé sur le réseau.
    </p>
    <template v-if="supported">
      <v-btn color="primary" size="large" :prepend-icon="mdiFolderOpen" :loading="store.loading" data-testid="open-folder" @click="choose">
        Ouvrir un dossier de configuration
      </v-btn>
      <p class="text-body-2 mt-2">Choisissez le dossier <code>config/</code> ou la racine d'un dépôt de configuration (ex. un clone de validator-config-gpu).</p>
      <input ref="input" type="file" webkitdirectory multiple hidden data-testid="folder-input" @change="picked" />
    </template>
    <div class="mt-6">
      <p class="mb-2">Ou lire la configuration d'un dépôt GitHub public, sans clone :</p>
      <RepoDialog>
        <template #activator="{ props }">
          <v-btn v-bind="props" variant="tonal" data-testid="home-open-repo">Ouvrir un dépôt GitHub</v-btn>
        </template>
      </RepoDialog>
    </div>
    <div class="mt-6">
      <h2 class="text-h6">Configurations connues</h2>
      <KnownConfigs />
      <v-progress-linear v-if="store.loading" :model-value="store.progress ? (100 * store.progress.done) / store.progress.total : undefined"
        :indeterminate="!store.progress" aria-label="Lecture du dépôt" />
      <v-alert v-if="store.error && !store.loading" type="error" variant="tonal" class="mt-2">{{ store.error }}</v-alert>
    </div>
    <v-alert v-if="!supported" type="warning" variant="tonal" class="mt-4">
      Ce navigateur ne permet pas de choisir un dossier : utilisez une version récente de Firefox, Chrome, Edge ou Safari.
    </v-alert>
    <p class="text-body-2 mt-8">
      Pour enregistrer directement sur disque, utilisez l'éditeur local : <code>npx vce serve config</code>
      (<a href="https://github.com/IGNF/validator-config-editor" rel="noopener">documentation</a>).
    </p>
  </section>
</template>

<style scoped>
.home {
  max-width: 50rem;
}
</style>
