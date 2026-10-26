import { reactive, watch } from 'vue'

// Panneaux latéraux (modèles à gauche, problèmes à droite) : affichés ou masqués, et largeur.
// Préférence de mise en page mémorisée dans le navigateur ; sans stockage, valeurs par défaut.
export interface Panel {
  open: boolean
  width: number
}

export const PANEL_MIN = 220
export const PANEL_MAX = 720
const KEY = 'vce:panneaux'
const DEFAULTS = { models: { open: true, width: 340 }, problems: { open: true, width: 420 } }

const clamp = (n: unknown, fallback: number) => (typeof n === 'number' && Number.isFinite(n) ? Math.min(PANEL_MAX, Math.max(PANEL_MIN, n)) : fallback)

function read(): typeof DEFAULTS {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? '{}') as Partial<Record<keyof typeof DEFAULTS, Partial<Panel>>>
    const panel = (name: keyof typeof DEFAULTS): Panel => ({
      open: typeof saved[name]?.open === 'boolean' ? saved[name]!.open! : DEFAULTS[name].open,
      width: clamp(saved[name]?.width, DEFAULTS[name].width),
    })
    return { models: panel('models'), problems: panel('problems') }
  } catch {
    return structuredClone(DEFAULTS)
  }
}

export const panels = reactive(read())

watch(panels, (p) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(p))
  } catch {
    // Stockage indisponible (navigation privée…) : la préférence n'est pas conservée.
  }
})

export const resize = (panel: Panel, width: number) => (panel.width = clamp(width, panel.width))
