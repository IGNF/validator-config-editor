// Utilities
import { computed } from 'vue';
import { isObject, isString } from "../../../util/index.js"; // Types
export function useLoadingConfig(loading, fallbackColor) {
  const active = computed(() => {
    const v = loading();
    return v != null && v !== false && v !== 'false';
  });
  const side = computed(() => {
    const v = loading();
    if (isObject(v) && v.side) return v.side;
    return 'start';
  });
  const color = computed(() => {
    const v = loading();
    if (isObject(v) && v.color) return v.color;
    if (isString(v) && v !== 'true') return v;
    return fallbackColor();
  });
  return {
    active,
    side,
    color
  };
}
//# sourceMappingURL=loading.js.map