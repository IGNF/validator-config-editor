import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'
import { allFiles, allIds, applyChanges, changedFiles, dataOf, isChanged, reformatted, edit as editSession, openSession, redoEdit, textOf, undoEdit, type Session } from '@core/edit/session'
import type { LoadedModel } from '@core/model/types'
import { canFixAll as canFixAllIn, fixAll as fixAllIn, fixesFor, type Fix } from '@core/fixes/catalog'
import { countByModel, type Problem } from '@core/validation/problems'
import { countProblems } from '@core/validation/problems'
import { summarize } from '@core/validation/validate'
import { zip } from '@core/zip'
import { download as offer } from '../io/download'
import { ServerSource } from '../io/server'
import type { ConfigSource, SaveResult } from '../io/source'

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
  const isEdited = (path: string) => !!session.value && isChanged(session.value, path)
  const isModelEdited = (model: string) => [...changed.value.keys()].some((p) => p.startsWith(model + '/'))

  /** Corrections proposées pour un problème, dans l'état courant (feature 004). */
  const fixes = (problem: Problem) => (session.value ? fixesFor(session.value, problem) : [])
  function applyFix(fix: Fix) {
    if (session.value) session.value = applyChanges(session.value, fix.changes)
  }
  /** Correction groupée (004 US2) : possible si chaque problème a une seule correction sûre. */
  const canFixAll = (problems: readonly Problem[]) => !!session.value && canFixAllIn(session.value, problems)
  function fixAll(problems: readonly Problem[]) {
    const next = session.value && fixAllIn(session.value, problems)
    if (next) session.value = next
  }

  // Modifications déjà téléchargées (ou enregistrées) : plus d'avertissement avant de quitter.
  const exported = shallowRef<ReadonlyMap<string, unknown>>()
  const pending = computed(() => changed.value.size > 0 && session.value?.edited !== exported.value)

  /** Télécharge toute la configuration en ZIP (contrat source-et-ecriture). */
  async function downloadZip(): Promise<{ name: string; errors: number; reformatted: string[] }> {
    const s = session.value!
    const name = (source.value?.label ?? '').split('/').filter(Boolean).at(-1) || 'config'
    const encoder = new TextEncoder()
    const entries = await Promise.all(
      [...allFiles(s)].map(async ([path, text]) => ({
        path: `${name}/${path}`,
        data: isChanged(s, path) ? encoder.encode(text) : ((await source.value?.raw?.(path)) ?? encoder.encode(text)),
      })),
    )
    offer(zip(entries) as BlobPart, `${name}.zip`, 'application/zip')
    exported.value = s.edited
    return { name: `${name}.zip`, errors: countProblems(s.result.problems).errors, reformatted: reformatted(s) }
  }

  const canSave = computed(() => !!source.value?.save)

  /**
   * Enregistre les fichiers modifiés (vce serve). Les fichiers écrits deviennent la nouvelle
   * origine ; ceux refusés (conflit…) restent modifiés. L'historique repart de zéro.
   */
  async function save(): Promise<SaveResult[]> {
    const s = session.value
    if (!s || !source.value?.save || changed.value.size === 0) return []
    const changes = changed.value
    const results = await source.value.save(changes, s.originals)
    const originals = new Map(s.originals)
    for (const r of results) if (r.ok) originals.set(r.path, changes.get(r.path)!)
    let next = await openSession(originals)
    for (const r of results) if (!r.ok) next = editSession(next, r.path, () => dataOf(s, r.path))
    session.value = next
    exported.value = next.edited
    return results
  }

  return {
    pending, downloadZip, canSave, save, fixes, applyFix, canFixAll, fixAll,
    source, session, loading, error, load, result, root, models, summary, countsByModel,
    has, text, data, edit, ids, undo, redo, canUndo, canRedo, changed, isEdited, isModelEdited,
  }
})
