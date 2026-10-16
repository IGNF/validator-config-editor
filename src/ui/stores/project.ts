import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'
import type { LoadedModel } from '@core/model/types'
import { countProblems, type Problem, type ProblemCounts } from '@core/validation/problems'
import { checkConfig, summarize, type CheckResult } from '@core/validation/validate'
import { fetchSnapshot, SnapshotConfigFs } from '../io/snapshot'

export const useProject = defineStore('project', () => {
  const root = ref('')
  // Données volumineuses et non modifiées : pas de réactivité profonde.
  const files = shallowRef(new Map<string, string>())
  const result = shallowRef<CheckResult>()
  const loading = ref(false)
  const error = ref<string>()

  async function load() {
    loading.value = true
    error.value = undefined
    try {
      const snapshot = await fetchSnapshot()
      root.value = snapshot.root
      files.value = snapshot.files
      result.value = await checkConfig(new SnapshotConfigFs(snapshot.files))
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e)
    } finally {
      loading.value = false
    }
  }

  const models = computed<LoadedModel[]>(() =>
    result.value ? [...result.value.project.models.values()].sort((a, b) => a.name.localeCompare(b.name)) : [],
  )

  const summary = computed(() => (result.value ? summarize(result.value.project, result.value.problems) : undefined))

  const countsByModel = computed(() => {
    const byModel = new Map<string, Problem[]>()
    for (const p of result.value?.problems ?? []) byModel.set(p.model ?? '', [...(byModel.get(p.model ?? '') ?? []), p])
    return new Map<string, ProblemCounts>([...byModel].map(([model, problems]) => [model, countProblems(problems)]))
  })

  return { root, files, result, loading, error, load, models, summary, countsByModel }
})
