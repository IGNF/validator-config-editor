<script setup lang="ts">
import { mdiDownload, mdiFileEditOutline, mdiFilePlusOutline, mdiUndoVariant } from '@mdi/js'
import { computed, ref } from 'vue'
import { hunks, lineDiff } from '@core/diff'
import { href } from '../router'
import { useProject } from '../stores/project'

// Revue des modifications : fichiers modifiés ou créés, diff ligne à ligne, ouverture et
// rétablissement d'un fichier ; avant le téléchargement complet, confirmation.
const store = useProject()
const open = ref(false)
const confirmDownload = ref(false)
const expanded = ref<string[]>([])

const files = computed(() =>
  [...store.changed].sort(([a], [b]) => a.localeCompare(b)).map(([path, text]) => {
    const original = store.session?.originals.get(path)
    const lines = lineDiff(original ?? '', text)
    return {
      path,
      created: original === undefined,
      added: lines.filter((l) => l.kind === 'add').length,
      removed: lines.filter((l) => l.kind === 'del').length,
      hunks: hunks(lines),
    }
  }))

/** Ouvre la revue ; `download` : le téléchargement complet attend la confirmation. */
function show(download = false) {
  confirmDownload.value = download
  expanded.value = files.value.length <= 3 ? files.value.map((f) => f.path) : []
  open.value = true
}
function download() {
  open.value = false
  store.download({ kind: 'all' })
}
defineExpose({ show })
</script>

<template>
  <v-dialog v-model="open" max-width="1000" scrollable>
    <v-card data-testid="changes-dialog">
      <v-card-item>
        <v-card-title>Modifications ({{ files.length }} fichier{{ files.length > 1 ? 's' : '' }})</v-card-title>
        <v-card-subtitle class="subtitle">
          {{ confirmDownload ? 'Vérifiez les modifications avant de télécharger toute la configuration.' : 'Fichiers modifiés ou créés depuis l\'ouverture, ligne à ligne.' }}
        </v-card-subtitle>
      </v-card-item>
      <v-divider />
      <v-card-text>
        <p v-if="!files.length">Aucune modification.</p>
        <v-expansion-panels v-model="expanded" multiple variant="accordion">
          <v-expansion-panel v-for="f in files" :key="f.path" :value="f.path" :data-testid="`change-${f.path}`">
            <v-expansion-panel-title>
              <div class="d-flex align-center flex-wrap ga-2">
                <v-icon :icon="f.created ? mdiFilePlusOutline : mdiFileEditOutline" color="primary" aria-hidden="true" />
                <strong class="path">{{ f.path }}</strong>
                <span class="tag" :class="f.created ? 'created' : 'edited'">{{ f.created ? 'créé' : 'modifié' }}</span>
                <span class="count add">+{{ f.added }}</span>
                <span class="count del">−{{ f.removed }}</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <div class="d-flex flex-wrap ga-2 mb-2">
                <v-btn size="small" variant="tonal" color="primary" :href="href(f.path)" data-testid="change-open" @click="open = false">Ouvrir</v-btn>
                <v-btn v-if="!store.readOnly" size="small" variant="tonal" :prepend-icon="mdiUndoVariant" data-testid="change-revert" @click="store.revert(f.path)">
                  {{ f.created ? 'Retirer ce fichier créé' : 'Annuler les modifications de ce fichier' }}
                </v-btn>
              </div>
              <div v-for="(h, k) in f.hunks" :key="k" class="hunk" data-testid="change-hunk">
                <div v-for="(l, j) in h.lines" :key="j" class="dl" :class="l.kind">
                  <span class="n">{{ l.before ?? '' }}</span><span class="n">{{ l.after ?? '' }}</span>
                  <span class="sign" aria-hidden="true">{{ l.kind === 'add' ? '+' : l.kind === 'del' ? '−' : ' ' }}</span>
                  <span class="sr-only">{{ l.kind === 'add' ? 'ajouté :' : l.kind === 'del' ? 'retiré :' : '' }}</span>
                  <code>{{ l.text }}</code>
                </div>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn @click="open = false">{{ confirmDownload ? 'Annuler' : 'Fermer' }}</v-btn>
        <v-btn v-if="confirmDownload" color="primary" variant="flat" :prepend-icon="mdiDownload" data-testid="confirm-download" @click="download">
          Télécharger (ZIP)
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.subtitle {
  white-space: normal;
  opacity: 1;
  color: rgb(var(--v-theme-secondary));
}
.path {
  font-family: ui-monospace, Menlo, Consolas, monospace;
  overflow-wrap: anywhere;
}
.tag,
.count {
  padding: 0 6px;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 700;
}
.tag.created {
  color: #1e5631;
  background: #e3f4e8;
}
.tag.edited {
  color: #7a4100;
  background: #fff0d6;
}
.count.add {
  color: #1e5631;
}
.count.del {
  color: #8c1d18;
}
.hunk {
  margin-bottom: 10px;
  border: 1px solid rgb(var(--v-theme-divider));
  border-radius: 6px;
  overflow: auto;
  font-family: ui-monospace, Menlo, Consolas, monospace;
  font-size: 0.82rem;
}
.dl {
  display: flex;
  min-width: max-content;
  white-space: pre;
}
.dl.add {
  background: #e6f4ea;
}
.dl.del {
  background: #fdecea;
}
.n {
  width: 3.5em;
  padding-right: 6px;
  text-align: right;
  color: rgb(var(--v-theme-secondary));
  user-select: none;
}
.sign {
  width: 1.5em;
  text-align: center;
  font-weight: 700;
}
.dl.add .sign {
  color: #1e5631;
}
.dl.del .sign {
  color: #8c1d18;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
</style>

<style>
.v-theme--dark [data-testid='changes-dialog'] .dl.add {
  background: rgba(165, 214, 167, 0.14);
}
.v-theme--dark [data-testid='changes-dialog'] .dl.del {
  background: rgba(255, 180, 171, 0.14);
}
.v-theme--dark [data-testid='changes-dialog'] .dl code {
  color: #fff;
}
</style>
