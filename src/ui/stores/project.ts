import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'
import { allIds, changedFiles, dataOf, edit as editSession, openSession, redoEdit, textOf, undoEdit, type Session } from '@core/edit/session'
import type { LoadedModel } from '@core/model/types'
import { countByModel } from '@core/validation/problems'
import { summarize } from '@core/validation/validate'
import { ServerSource } from '../io/server'
import type { ConfigSource } from '../io/source'

export const useProject = defineStore('project', () => {
  const source = shallowRef<ConfigSource>()
  // Session immuable (src/core/edit/session) : remplacée à chaque édition.
  const session = shallowRef<Session>()
  const loading = ref(false)
  const error = ref<string>()

  /** Charge une source ; en cas d'échec, la configuration courante est conservée. */
  async function load(next: ConfigSource = source.value ?? new ServerSource()) {
    loading.value = true
    error.value = undefined
    try {
      const opened = await openSession(await next.load())
      if (opened.result.project.models.size === 0) {
        throw new Error('Aucun modèle trouvé : choisissez le dossier qui contient les modèles (ex. config/) ou la racine d\'un dépôt de configuration.')
      }
      session.value = opened
      source.value = next
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e)
    } finally {
      loading.value = false
    }
  }

  const result = computed(() => session.value?.result)
  const root = computed(() => source.value?.label ?? '')

  const models = computed<LoadedModel[]>(() =>
    result.value ? [...result.value.project.models.values()].sort((a, b) => a.name.localeCompare(b.name)) : [],
  )
  const summary = computed(() => (result.value ? summarize(result.value.project, result.value.problems) : undefined))
  const countsByModel = computed(() => countByModel(result.value?.problems ?? []))

  const has = (path: string | undefined) => path !== undefined && !!session.value?.originals.has(path)
  const text = (path: string) => (session.value ? textOf(session.value, path) : undefined)
  const data = (path: string) => (session.value ? dataOf(session.value, path) : undefined)

  /** Applique une édition pure à un fichier JSON ; `key` fusionne les saisies d'un même champ. */
  function edit<T = unknown>(path: string, update: (data: T) => unknown, key?: string) {
    if (session.value) session.value = editSession(session.value, path, update, key)
  }
  const undo = () => session.value && (session.value = undoEdit(session.value))
  const redo = () => session.value && (session.value = redoEdit(session.value))
  const canUndo = computed(() => (session.value?.history.past.length ?? 0) > 0)
  const canRedo = computed(() => (session.value?.history.future.length ?? 0) > 0)
  const changed = computed(() => (session.value ? changedFiles(session.value) : new Map<string, string>()))
  const ids = () => (session.value ? allIds(session.value) : new Set<string>())
  const isEdited = (path: string) => !!session.value?.edited.has(path)
  const isModelEdited = (model: string) => [...(session.value?.edited.keys() ?? [])].some((p) => p.startsWith(model + '/'))

  return {
    source, session, loading, error, load, result, root, models, summary, countsByModel,
    has, text, data, edit, ids, undo, redo, canUndo, canRedo, changed, isEdited, isModelEdited,
  }
})
