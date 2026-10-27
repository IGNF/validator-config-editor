<script setup lang="ts">
import { computed } from 'vue'
import { modelFamily } from '@core/labels'
import { getAt } from '@core/edit/pointer'
import { parsePointer } from '@core/pointer'
import { baseName, kindOf, modelOf } from '../files'
import { href, route } from '../router'
import { useProject } from '../stores/project'

// Fil d'Ariane d'une vue : configuration › famille › modèle › table ou liste › élément du pointeur.
const props = defineProps<{ file: string; last?: string }>()
const store = useProject()

const nameAt = (data: unknown, ptr: string) => {
  const name = getAt(data, `${ptr}/name`)
  return typeof name === 'string' ? name : undefined
}
const items = computed(() => {
  const model = modelOf(props.file)
  const doc = `${model}/files.json`
  const family = modelFamily(model)
  const out: { title: string; href?: string }[] = [{ title: 'Configuration', href: '#/' }]
  if (family !== model) out.push({ title: family })
  const kind = kindOf(props.file)
  const data = store.data(props.file)
  out.push({ title: model, ...(kind !== 'model' || route.value.pointer !== undefined || route.value.compare !== undefined ? { href: href(store.has(doc) ? doc : `${model}/`) } : {}) })
  if (kind === 'table') out.push({ title: `Table ${typeof getAt(data, '/name') === 'string' ? getAt(data, '/name') : baseName(props.file)}`, ...(route.value.pointer ? { href: href(props.file) } : {}) })
  if (kind === 'codes') out.push({ title: `Liste ${baseName(props.file).replace(/\.csv$/i, '')}` })
  // Élément désigné par le pointeur : colonne, fichier attendu, liste déclarée.
  const [head, index] = parsePointer(route.value.pointer ?? '')
  if (index !== undefined && (head === 'columns' || head === 'files' || head === 'codes')) {
    const name = nameAt(data, `/${head}/${index}`)
    const label = { columns: 'Colonne', files: 'Fichier', codes: 'Liste' }[head]
    if (name) out.push({ title: `${label} ${name}` })
  }
  if (props.last) out.push({ title: props.last })
  return out
})
</script>

<template>
  <nav aria-label="Fil d'Ariane" class="crumbs" data-testid="breadcrumbs">
    <ol>
      <li v-for="(item, i) in items" :key="i">
        <a v-if="item.href && i < items.length - 1" :href="item.href">{{ item.title }}</a>
        <span v-else :aria-current="i === items.length - 1 ? 'page' : undefined">{{ item.title }}</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.crumbs ol {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0 0 4px;
  font-size: 0.875rem;
  color: rgb(var(--v-theme-secondary));
}
.crumbs li + li::before {
  content: '›';
  margin: 0 6px;
}
.crumbs a {
  color: rgb(var(--v-theme-primary));
}
.crumbs [aria-current='page'] {
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
}
</style>
