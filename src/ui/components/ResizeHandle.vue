<script setup lang="ts">
import { PANEL_MAX, PANEL_MIN, resize, type Panel } from '../layout'

// Poignée de largeur d'un panneau latéral : glisser à la souris, ou flèches au clavier.
// `edge` : bord du panneau qui porte la poignée (droit pour le panneau de gauche).
const props = defineProps<{ panel: Panel; edge: 'left' | 'right'; label: string }>()
const STEP = 20

function start(e: PointerEvent) {
  const x0 = e.clientX
  const w0 = props.panel.width
  const sign = props.edge === 'right' ? 1 : -1
  const move = (m: PointerEvent) => resize(props.panel, w0 + sign * (m.clientX - x0))
  const stop = () => {
    window.removeEventListener('pointermove', move)
    window.removeEventListener('pointerup', stop)
    document.body.style.removeProperty('user-select')
  }
  document.body.style.userSelect = 'none'
  window.addEventListener('pointermove', move)
  window.addEventListener('pointerup', stop)
}

function key(e: KeyboardEvent) {
  const grow = props.edge === 'right' ? 'ArrowRight' : 'ArrowLeft'
  const shrink = props.edge === 'right' ? 'ArrowLeft' : 'ArrowRight'
  if (e.key === grow) resize(props.panel, props.panel.width + STEP)
  else if (e.key === shrink) resize(props.panel, props.panel.width - STEP)
  else return
  e.preventDefault()
}
</script>

<template>
  <div role="separator" aria-orientation="vertical" tabindex="0" :aria-label="label" :aria-valuenow="panel.width" :aria-valuemin="PANEL_MIN"
    :aria-valuemax="PANEL_MAX" :class="['handle', edge]" @pointerdown.prevent="start" @keydown="key" />
</template>

<style scoped>
.handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 6px;
  cursor: col-resize;
  z-index: 1;
}
.handle.right {
  right: -3px;
}
.handle.left {
  left: -3px;
}
.handle:hover,
.handle:focus-visible {
  background: rgba(var(--v-theme-primary), 0.4);
  outline: none;
}
</style>
