// Utilities
import { onBeforeUnmount, readonly, ref, watch } from 'vue';
import { templateRef } from "../util/index.js";
import { Box } from "../util/box.js";
import { IN_BROWSER } from "../util/globals.js"; // Types
export function useResizeObserver(callback, box = 'content') {
  const resizeRef = templateRef();
  const contentRect = ref();
  if (IN_BROWSER) {
    const observer = new ResizeObserver(entries => {
      callback?.(entries, observer);
      if (!entries.length) return;
      if (box === 'content') {
        contentRect.value = entries[0].contentRect;
      } else {
        // borderBoxSize ignores CSS transforms (e.g. VDialogTransition scale-in)
        const border = entries[0].borderBoxSize?.[0];
        const el = entries[0].target;
        contentRect.value = new Box({
          x: 0,
          y: 0,
          width: border?.inlineSize ?? el.offsetWidth,
          height: border?.blockSize ?? el.offsetHeight
        });
      }
    });
    onBeforeUnmount(() => {
      observer.disconnect();
    });
    watch(() => resizeRef.el, (newValue, oldValue) => {
      if (oldValue) {
        observer.unobserve(oldValue);
        contentRect.value = undefined;
      }
      if (newValue) observer.observe(newValue);
    }, {
      flush: 'post'
    });
  }
  return {
    resizeRef,
    contentRect: readonly(contentRect)
  };
}
//# sourceMappingURL=resizeObserver.js.map