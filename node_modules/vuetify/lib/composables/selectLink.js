// Utilities
import { nextTick, watch } from 'vue';
import { isBoolean } from "../util/index.js"; // Types
export function useSelectLink(link, select) {
  watch(() => link.isActive?.value, isActive => {
    if (link.isLink.value && isBoolean(isActive) && select) {
      nextTick(() => {
        select(isActive);
      });
    }
  }, {
    immediate: true
  });
}
//# sourceMappingURL=selectLink.js.map