// Utilities
import { toValue, watch } from 'vue';

// Types

const AUTOFILL_PENDING_MS = 1000;
export function useAutofill(items, select) {
  let pending = null;
  let pendingTimeout = -1;
  function findItem(text) {
    return toValue(items).find(item => item.title === text || item.value === text);
  }
  watch(() => toValue(items), () => {
    if (!pending) return;
    const item = findItem(pending);
    if (!item) return;
    pending = null;
    select(item);
  });
  function autofill(text) {
    const item = findItem(text);
    if (item) return select(item);
    resetAutofill();
    pending = text;
    pendingTimeout = window.setTimeout(resetAutofill, AUTOFILL_PENDING_MS);
  }
  function resetAutofill() {
    pending = null;
    clearTimeout(pendingTimeout);
  }
  return {
    autofill,
    resetAutofill
  };
}
//# sourceMappingURL=useAutofill.js.map