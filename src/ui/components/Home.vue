<script setup lang="ts">
import { mdiAlertCircleOutline, mdiCompareHorizontal, mdiFolderOpen, mdiPencilOutline, mdiTrayArrowDown } from '@mdi/js'
import { useTemplateRef } from 'vue'
import { canPickFolder, FolderSource } from '../io/folder'
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

const FEATURES = [
  { icon: mdiAlertCircleOutline, title: 'Valider', text: 'Erreurs et avertissements de toute la configuration, avec des corrections en un clic.' },
  { icon: mdiPencilOutline, title: 'Modifier', text: 'Modèles, tables, colonnes et listes de codes, avec annulation et modification en série.' },
  { icon: mdiCompareHorizontal, title: 'Comparer', text: 'Deux versions d\'un standard : fichiers, tables, colonnes et contenu des listes.' },
  { icon: mdiTrayArrowDown, title: 'Télécharger', text: 'Un fichier, un modèle ou toute la configuration en ZIP, dans sa mise en forme d\'origine.' },
]
</script>

<template>
  <section class="home">
    <div class="hero mb-6">
      <h1 class="text-h4 mb-2">Éditeur de configuration validator</h1>
      <p class="text-body-1 mb-4">
        Validez, comparez et modifiez une configuration
        <a href="https://github.com/IGNF/validator" rel="noopener">IGNF/validator</a> : modèles <code>files.json</code>, tables
        <code>types/*.json</code>, listes de codes, surcharges GpU.
      </p>
      <template v-if="supported">
        <v-btn color="primary" size="large" :prepend-icon="mdiFolderOpen" :loading="store.loading" data-testid="open-folder" @click="choose">
          Ouvrir un dossier de configuration
        </v-btn>
        <p class="text-body-2 mt-2">Choisissez le dossier <code>config/</code> ou la racine d'un dépôt de configuration (ex. un clone de validator-config-gpu).</p>
        <input ref="input" type="file" webkitdirectory multiple hidden data-testid="folder-input" @change="picked" />
      </template>
      <v-alert v-else type="warning" variant="tonal">
        Ce navigateur ne permet pas de choisir un dossier : utilisez une version récente de Firefox, Chrome, Edge ou Safari.
      </v-alert>
    </div>

    <ul class="features mb-6" aria-label="Fonctionnalités">
      <li v-for="f in FEATURES" :key="f.title" class="feature">
        <v-icon :icon="f.icon" color="primary" size="28" aria-hidden="true" />
        <div>
          <h2 class="text-subtitle-1 font-weight-bold">{{ f.title }}</h2>
          <p class="text-body-2">{{ f.text }}</p>
        </div>
      </li>
    </ul>

  </section>
</template>

<style scoped>
.hero {
  padding: 24px;
  border: 1px solid rgb(var(--v-theme-divider));
  border-left: 6px solid rgb(var(--v-theme-primary));
  border-radius: 8px;
  background: rgb(var(--v-theme-surface-light));
}
.features {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 16px;
}
.feature h2,
.feature p {
  margin: 0 0 4px;
}
.home a {
  color: rgb(var(--v-theme-primary));
}
.feature {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border: 1px solid rgb(var(--v-theme-divider));
  border-radius: 8px;
}
</style>
