<script setup lang="ts">
import { mdiDelete, mdiPlus } from '@mdi/js'
import { computed, ref } from 'vue'
import { addVariable, aliasRows, checkVariableName, removeVariable, renameVariable, setAlias, setVariableRegex } from '@core/edit/variables-edit'
import { setOrRemove } from '@core/edit/operations'
import { modelFamily } from '@core/labels'
import { pointer } from '@core/pointer'
import { isOptional, VARIABLES_FILE } from '@core/variables'
import { useProject } from '../stores/project'
import FileFrame from './FileFrame.vue'
import NotConformant from './NotConformant.vue'
import ProblemBadge from './ProblemBadge.vue'

// Dictionnaire des variables (variables.json, feature 010) : variables, regex et alias par famille.
// Seul le dictionnaire change : les regex des modèles restent telles quelles.
defineProps<{ file: string }>()
const store = useProject()
const data = computed(() => store.data(VARIABLES_FILE) as { description?: string; variables?: Record<string, string> } | undefined)
const variables = computed(() => {
  const v = data.value?.variables
  return v && typeof v === 'object' && !Array.isArray(v) ? Object.entries(v) : undefined
})
const aliases = computed(() => (data.value ? aliasRows(data.value) : []))
const editable = computed(() => !store.readOnly)
const edit = (update: (d: unknown) => unknown, key?: string) => store.edit(VARIABLES_FILE, update, key)

// Saisie validée à la sortie du champ ; une saisie refusée est remise à sa valeur et expliquée.
function refuse(input: HTMLInputElement, value: string, message: string) {
  input.value = value
  store.notice = message
}
function rename(name: string, input: HTMLInputElement) {
  const next = input.value.trim()
  if (next === name) return
  const refusal = checkVariableName(data.value, next, name)
  if (refusal) return refuse(input, name, refusal)
  edit((d) => renameVariable(d, name, next))
}
function setRegex(name: string, regex: string, input: HTMLInputElement) {
  if (input.value === regex) return
  if (!input.value) return refuse(input, regex, 'Une variable a toujours une regex : supprimez plutôt la variable.')
  edit((d) => setVariableRegex(d, name, input.value))
}

// Ajout d'une variable : nom et regex obligatoires.
const newName = ref('')
const newRegex = ref('')
const newRefusal = computed(() => (newName.value ? checkVariableName(data.value, newName.value.trim()) : undefined))
function add() {
  edit((d) => addVariable(d, newName.value.trim(), newRegex.value))
  newName.value = ''
  newRegex.value = ''
}

// Alias : familles des modèles chargés (cnig_SUP, cnig_PLUi…) et celles déjà présentes.
const families = computed(() => [...new Set([...store.models.map((m) => modelFamily(m.name)), ...aliases.value.map((a) => a.family)])].sort())
const aliasFamily = ref<string | null>(null)
const aliasVariable = ref<string | null>(null)
const aliasName = ref('')
function addAlias() {
  edit((d) => setAlias(d, aliasFamily.value!, aliasVariable.value!, aliasName.value.trim()))
  aliasName.value = ''
}
function changeAlias(family: string, variable: string, alias: string, input: HTMLInputElement) {
  if (input.value.trim() === alias) return
  edit((d) => setAlias(d, family, variable, input.value.trim()))
}
</script>

<template>
  <FileFrame title="Dictionnaire des variables" :file="VARIABLES_FILE" :source="VARIABLES_FILE">
    <NotConformant v-if="!variables" />
    <template v-else>
      <p class="text-body-2 mb-4">
        Chaque variable remplace sa regex à l'affichage (<code>&lt;NOM&gt;</code> à la saisie). Les modèles ne contiennent que les regex :
        modifier une regex ici ne change pas les modèles, seulement leur affichage.
      </p>
      <v-textarea label="Description" :model-value="data?.description" density="compact" variant="outlined" rows="1" auto-grow :readonly="!editable"
        data-testid="variables-description" @update:model-value="(v: string) => edit((d) => setOrRemove(d, '/description', v), '/description')" />

      <h2 class="text-h6 mb-2">Variables ({{ variables.length }})</h2>
      <div class="scroll" tabindex="0" role="region" aria-label="Variables">
        <v-table density="compact" class="values" data-testid="variables">
          <thead>
            <tr><th scope="col">Nom</th><th scope="col">Regex</th><th scope="col">Problèmes</th><th v-if="editable" scope="col"><span class="sr-only">Actions</span></th></tr>
          </thead>
          <tbody>
            <tr v-for="[name, regex] in variables" :key="name" :data-pointer="pointer('variables', name)" :data-testid="`variable-${name}`">
              <td class="name">
                <input class="cell mono" :class="{ optional: isOptional(name) }" :value="name" :readonly="!editable" :aria-label="`Nom de la variable ${name}`"
                  data-testid="variable-name" @change="rename(name, $event.target as HTMLInputElement)" @keydown.enter="($event.target as HTMLInputElement).blur()" />
              </td>
              <td>
                <input class="cell mono" :value="regex" :readonly="!editable" :aria-label="`Regex de ${name}`" data-testid="variable-regex"
                  @change="setRegex(name, regex, $event.target as HTMLInputElement)" @keydown.enter="($event.target as HTMLInputElement).blur()" />
              </td>
              <td><ProblemBadge :file="VARIABLES_FILE" :pointer="pointer('variables', name)" /></td>
              <td v-if="editable" class="actions">
                <v-btn :icon="mdiDelete" size="x-small" variant="text" :aria-label="`Supprimer la variable ${name}`" data-testid="remove-variable"
                  @click="edit((d) => removeVariable(d, name))" />
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
      <div v-if="editable" class="add mt-2" data-testid="add-variable">
        <v-text-field v-model="newName" label="Nouvelle variable" placeholder="NOM ou _NOM_OPT" density="compact" variant="outlined" class="mono"
          :error-messages="newRefusal" data-testid="new-variable-name" />
        <v-text-field v-model="newRegex" label="Regex" density="compact" variant="outlined" class="mono" data-testid="new-variable-regex" />
        <v-btn :prepend-icon="mdiPlus" variant="tonal" :disabled="!newName.trim() || !newRegex || !!newRefusal" data-testid="confirm-add-variable" @click="add">Ajouter</v-btn>
      </div>

      <h2 class="text-h6 mt-6 mb-2">Alias par famille ({{ aliases.length }})</h2>
      <p class="text-body-2 mb-2">Nom affiché d'une variable pour les modèles d'une famille (ex. <code>IDGEST</code> pour <code>DIGIT_9</code> dans les SUP).</p>
      <v-table v-if="aliases.length" density="compact" class="values" data-testid="aliases">
        <thead>
          <tr><th scope="col">Famille</th><th scope="col">Variable</th><th scope="col">Nom affiché</th><th v-if="editable" scope="col"><span class="sr-only">Actions</span></th></tr>
        </thead>
        <tbody>
          <tr v-for="a in aliases" :key="`${a.family}/${a.variable}`" :data-pointer="`/aliases/${a.family}/${a.variable}`" :data-testid="`alias-${a.family}-${a.variable}`">
            <td>{{ a.family }}</td>
            <td><code>{{ a.variable }}</code></td>
            <td>
              <input class="cell mono" :value="a.alias" :readonly="!editable" :aria-label="`Nom affiché de ${a.variable} pour ${a.family}`" data-testid="alias-name"
                @change="changeAlias(a.family, a.variable, a.alias, $event.target as HTMLInputElement)" @keydown.enter="($event.target as HTMLInputElement).blur()" />
            </td>
            <td v-if="editable" class="actions">
              <v-btn :icon="mdiDelete" size="x-small" variant="text" :aria-label="`Supprimer l'alias ${a.alias} (${a.family})`" data-testid="remove-alias"
                @click="edit((d) => setAlias(d, a.family, a.variable, ''))" />
            </td>
          </tr>
        </tbody>
      </v-table>
      <div v-if="editable" class="add mt-2" data-testid="add-alias">
        <v-combobox v-model="aliasFamily" :items="families" label="Famille" density="compact" variant="outlined" data-testid="new-alias-family" />
        <v-select v-model="aliasVariable" :items="variables.map(([n]) => n)" label="Variable" density="compact" variant="outlined" data-testid="new-alias-variable" />
        <v-text-field v-model="aliasName" label="Nom affiché" density="compact" variant="outlined" class="mono" data-testid="new-alias-name" />
        <v-btn :prepend-icon="mdiPlus" variant="tonal" :disabled="!aliasFamily || !aliasVariable || !aliasName.trim()" data-testid="confirm-add-alias" @click="addAlias">Ajouter</v-btn>
      </div>
    </template>
  </FileFrame>
</template>

<style scoped>
.values {
  border: 1px solid rgb(var(--v-theme-divider));
  border-radius: 6px;
}
.values :deep(thead th) {
  background: rgb(var(--v-theme-surface-light)) !important;
  font-weight: 600 !important;
}
.name {
  width: 18rem;
}
.cell {
  width: 100%;
  min-width: 8rem;
  padding: 2px 6px;
  border: 1px solid transparent;
  border-radius: 4px;
  font: inherit;
  color: inherit;
  background: transparent;
}
.cell:not([readonly]):hover {
  border-color: rgb(var(--v-theme-divider));
}
.cell:focus {
  outline: none;
  border-color: rgb(var(--v-theme-primary));
  background: rgb(var(--v-theme-surface));
}
.mono,
.mono :deep(input) {
  font-family: ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace;
}
/* Variable facultative (_OPT) : en jaune, comme à l'affichage des regex. */
.cell.optional {
  background: rgba(var(--v-theme-optional), 0.55);
  color: #3d2f00;
  font-weight: 700;
}
.add {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  gap: 8px;
  align-items: start;
}
.actions {
  width: 1%;
  white-space: nowrap;
}
.scroll {
  overflow-x: auto;
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
.v-theme--dark .cell.optional {
  background: rgba(var(--v-theme-optional), 0.22);
  color: #ffe07a;
}
</style>
