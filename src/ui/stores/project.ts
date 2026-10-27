import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'
import { allIds, applyChanges, changedFiles, dataOf, isChanged, reformatted, edit as editSession, openSession, redoEdit, textOf, undoEdit, type FileChange, type Session } from '@core/edit/session'
import type { LoadedModel } from '@core/model/types'
import { canFixAll as canFixAllIn, fixAll as fixAllIn, fixesFor, type Fix } from '@core/fixes/catalog'
import { countByModel, countProblems, type Problem } from '@core/validation/problems'
import { summarize } from '@core/validation/validate'
import { outgoingRefs, scopeFiles, type ExportScope } from '@core/export'
import { fromVariables, namesFor, readVariables, toSegments, toVariables, type Segment } from '@core/variables'
import { zip } from '@core/zip'
import { download as offer } from '../io/download'
import { ServerSource } from '../io/server'
import type { ConfigSource, SaveResult } from '../io/source'

export const useProject = defineStore('project', () => {
  const source = shallowRef<ConfigSource>()
  // Session immuable (src/core/edit/session) : remplacée à chaque édition.
  const session = shallowRef<Session>()
  const loading = ref(false)
  /** Filtre « Modèle » du panneau des problèmes (partagé avec la synthèse du modèle). */
  const problemModel = ref<string | null>(null)
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
  const countsByFile = computed(() => {
    const byFile = new Map<string, Problem[]>()
    for (const p of result.value?.problems ?? []) byFile.set(p.file, [...(byFile.get(p.file) ?? []), p])
    return new Map([...byFile].map(([file, problems]) => [file, countProblems(problems)]))
  })
  /** Problèmes d'un élément : fichier, et pointeur égal ou intérieur à `pointer`. */
  const problemsUnder = (file: string, ptr: string) =>
    (result.value?.problems ?? []).filter((p) => p.file === file && p.pointer !== undefined && (p.pointer === ptr || p.pointer.startsWith(ptr + '/')))

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
  /** Applique des modifications de fichiers en un seul pas (correction, copie de liste…). */
  function apply(changes: readonly FileChange[]) {
    if (session.value && changes.length) session.value = applyChanges(session.value, changes)
  }
  const applyFix = (fix: Fix) => apply(fix.changes)
  /** Correction groupée (004 US2) : possible si chaque problème a une seule correction sûre. */
  const canFixAll = (problems: readonly Problem[]) => !!session.value && canFixAllIn(session.value, problems)
  function fixAll(problems: readonly Problem[]) {
    const next = session.value && fixAllIn(session.value, problems)
    if (next) session.value = next
  }

  // Modifications déjà téléchargées (ou enregistrées) : plus d'avertissement avant de quitter.
  const exported = shallowRef<ReadonlyMap<string, unknown>>()
  const pending = computed(() => changed.value.size > 0 && session.value?.edited !== exported.value)

  // Variables d'affichage des regex (010) : dictionnaire variables.json s'il est présent et valide,
  // avec les noms propres à la famille du modèle (alias, ex. IDGEST pour les SUP).
  const dictionary = computed(() => {
    const file = session.value?.result.project.variables
    return file ? readVariables(file) : undefined
  })
  const variables = computed(() => dictionary.value?.variables)
  /** Regex affichée avec ses variables (inchangée sans dictionnaire). */
  const regexDisplay = (regex: string, model?: string) =>
    variables.value ? toVariables(regex, variables.value, namesFor(dictionary.value?.aliases, model)) : regex
  /** Regex affichée en morceaux (variables en étiquettes, facultatives en jaune). */
  const regexSegments = (regex: string, model?: string): Segment[] =>
    variables.value ? toSegments(regex, variables.value, namesFor(dictionary.value?.aliases, model)) : regex ? [{ text: regex }] : []
  /** Regex saisie : les <NOM> de variables connues (ou leurs alias) sont remplacés par leur regex. */
  const regexInput = (text: string, model?: string) =>
    variables.value ? fromVariables(text, variables.value, namesFor(dictionary.value?.aliases, model)) : text
  /** Aide sous un champ de regex : sa forme à variables, si elle diffère. */
  const regexHint = (regex: string | undefined, model?: string) => {
    const shown = regex ? regexDisplay(regex, model) : ''
    return shown && shown !== regex ? `Affichage : ${shown}` : undefined
  }

  /** Message affiché après un téléchargement ou un enregistrement. */
  const notice = ref<string>()

  // Octets d'un fichier (contrat source-et-ecriture) : ceux d'origine s'il n'est pas modifié.
  async function bytes(s: Session, path: string): Promise<Uint8Array> {
    const text = textOf(s, path) ?? ''
    if (!isChanged(s, path)) {
      const raw = await source.value?.raw?.(path)
      if (raw) return raw
    }
    return new TextEncoder().encode(text)
  }

  /**
   * Télécharge une portée (plan 008, R2) : toute la configuration ou un modèle en ZIP, ou un
   * fichier seul.
   * Seul le téléchargement de toute la configuration retire l'avertissement avant de quitter.
   */
  async function download(scope: ExportScope): Promise<void> {
    const s = session.value!
    const paths = scopeFiles(s, scope)
    const rewritten = reformatted(s).filter((p) => paths.includes(p))
    const reindented = rewritten.length ? `. Fichiers réindentés : ${rewritten.join(', ')}` : ''
    const remaining = (n: number) => (n ? ` (${n} erreur${n > 1 ? 's' : ''} restante${n > 1 ? 's' : ''})` : '')
    if (scope.kind === 'file') {
      const name = scope.path.slice(scope.path.lastIndexOf('/') + 1)
      const type = name.toLowerCase().endsWith('.csv') ? 'text/csv' : 'application/json'
      offer((await bytes(s, scope.path)) as BlobPart, name, type)
      notice.value = `Fichier téléchargé : ${name}${remaining(countsByFile.value.get(scope.path)?.errors ?? 0)}${reindented}`
      return
    }
    if (scope.kind === 'model') {
      // Les chemins commencent déjà par <modèle>/ : l'archive contient ce seul dossier.
      const entries = await Promise.all(paths.map(async (path) => ({ path, data: await bytes(s, path) })))
      offer(zip(entries) as BlobPart, `${scope.model}.zip`, 'application/zip')
      const outgoing = outgoingRefs(s, scope.model)
      notice.value =
        `Modèle téléchargé : ${scope.model}.zip${remaining(countsByModel.value.get(scope.model)?.errors ?? 0)}${reindented}` +
        (outgoing.length ? `. Références vers d'autres modèles, absentes de l'archive : ${outgoing.join(', ')}` : '')
      return
    }
    const name = (source.value?.label ?? '').split('/').filter(Boolean).at(-1) || 'config'
    const entries = await Promise.all(paths.map(async (path) => ({ path: `${name}/${path}`, data: await bytes(s, path) })))
    offer(zip(entries) as BlobPart, `${name}.zip`, 'application/zip')
    exported.value = s.edited
    notice.value = `Configuration téléchargée : ${name}.zip${remaining(countProblems(s.result.problems).errors)}${reindented}`
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
    pending, notice, download, variables, regexDisplay, regexSegments, regexInput, regexHint, canSave, save, fixes, applyChanges: apply, applyFix, canFixAll, fixAll,
    source, session, loading, problemModel, error, load, result, root, models, summary, countsByModel, countsByFile, problemsUnder,
    has, text, data, edit, ids, undo, redo, canUndo, canRedo, changed, isEdited, isModelEdited,
  }
})
