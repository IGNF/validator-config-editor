<script setup lang="ts">
import { computed } from 'vue'
import { resolvePath } from '@core/model/paths'
import type { ColumnConstraints } from '@core/model/types'
import { parseForeignKey } from '@core/validation/foreign-key'
import { baseName, modelOf } from '../files'
import { href } from '../router'
import { useProject } from '../stores/project'
import FileFrame from './FileFrame.vue'
import NotConformant from './NotConformant.vue'

const props = defineProps<{ file: string }>()
const store = useProject()
const model = computed(() => modelOf(props.file))
const checked = computed(() => store.result!.checked.get(model.value))
const table = computed(() => checked.value?.tables.get(props.file))

function constraints(c: ColumnConstraints | undefined): string[] {
  if (!c) return []
  const out: string[] = []
  if (c.required) out.push('valeur obligatoire')
  if (c.presenceRequired) out.push('colonne obligatoire')
  if (c.unique) out.push('unique')
  if (c.minLength !== undefined) out.push(`longueur ≥ ${c.minLength}`)
  if (c.maxLength !== undefined && c.maxLength >= 0) out.push(`longueur ≤ ${c.maxLength}`)
  if (c.pattern) out.push(`motif ${c.pattern}`)
  if (c.enum?.length) out.push(`valeurs : ${c.enum.join(', ')}`)
  return out
}

// Cible d'une clé étrangère : liste de codes du modèle, sinon table du modèle.
function target(text: string): { label: string; path?: string } {
  const fk = parseForeignKey(text)
  if (!fk) return { label: text }
  const code = checked.value?.document?.codes?.find((c) => c.name === fk.target)
  const codePath = code && resolvePath(model.value, code.data)
  if (codePath && store.files.has(codePath)) return { label: fk.target, path: codePath }
  const tablePath = [...(checked.value?.tables ?? [])].find(([, t]) => t.name === fk.target)?.[0]
  return { label: fk.target, ...(tablePath && { path: tablePath }) }
}

function referencePath(ref: string): string | undefined {
  const name = ref.slice(0, ref.indexOf('.'))
  return [...(checked.value?.tables ?? [])].find(([, t]) => t.name === name)?.[0]
}
</script>

<template>
  <FileFrame :title="`Table ${table?.name ?? baseName(file)}`" :file="file" :source="file">
    <NotConformant v-if="!table" />
    <template v-else>
      <p v-if="table.description" class="mb-4">{{ table.description }}</p>

      <h2 class="text-h6">Colonnes ({{ table.columns.length }})</h2>
      <v-table density="compact" class="mb-6">
        <thead>
          <tr><th>Nom</th><th>Type</th><th>Description</th><th>Contraintes</th></tr>
        </thead>
        <tbody>
          <tr v-for="(c, i) in table.columns" :key="c.id" :data-pointer="`/columns/${i}`" :data-testid="`column-${c.name}`">
            <td><strong>{{ c.name }}</strong></td>
            <td>{{ c.type }}</td>
            <td>{{ c.description }}</td>
            <td>
              <span v-for="text in constraints(c.constraints)" :key="text" class="constraint">{{ text }}</span>
              <span v-if="c.constraints?.reference" class="constraint">
                référence
                <a v-if="referencePath(c.constraints.reference)" :href="href(referencePath(c.constraints.reference)!)">{{ c.constraints.reference }}</a>
                <template v-else>{{ c.constraints.reference }}</template>
              </span>
            </td>
          </tr>
        </tbody>
      </v-table>

      <template v-if="table.constraints?.foreignKeys?.length">
        <h2 class="text-h6">Clés étrangères</h2>
        <ul class="ml-6 mb-6">
          <li v-for="(fk, i) in table.constraints.foreignKeys" :key="fk" :data-pointer="`/constraints/foreignKeys/${i}`">
            <code>{{ fk }}</code> →
            <a v-if="target(fk).path" :href="href(target(fk).path!)">{{ target(fk).label }}</a>
            <span v-else class="text-error">{{ target(fk).label }}</span>
          </li>
        </ul>
      </template>

      <template v-if="table.constraints?.conditions?.length">
        <h2 class="text-h6">Conditions</h2>
        <ul class="ml-6">
          <li v-for="(c, i) in table.constraints.conditions" :key="c" :data-pointer="`/constraints/conditions/${i}`"><code>{{ c }}</code></li>
        </ul>
      </template>
    </template>
  </FileFrame>
</template>

<style scoped>
.constraint {
  display: inline-block;
  margin: 2px 4px 2px 0;
  padding: 0 6px;
  border-radius: 4px;
  font-size: 0.8rem;
  background: rgba(var(--v-theme-primary), 0.1);
  word-break: break-all;
}
</style>
