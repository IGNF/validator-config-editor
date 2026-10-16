// Utilities
import { isFunction, isObject } from "../../util/index.js"; // Types
function mounted(el, binding) {
  const {
    self = false
  } = binding.modifiers ?? {};
  const value = binding.value;
  const options = (isFunction(value) || !isObject(value) ? undefined : value.options) || {
    passive: true
  };
  const handler = isFunction(value) || 'handleEvent' in value ? value : value.handler;
  const target = self ? el : binding.arg ? document.querySelector(binding.arg) : window;
  if (!target) return;
  target.addEventListener('scroll', handler, options);
  el._onScroll = Object(el._onScroll);
  el._onScroll[binding.instance.$.uid] = {
    handler,
    options,
    // Don't reference self
    target: self ? undefined : target
  };
}
function unmounted(el, binding) {
  if (!el._onScroll?.[binding.instance.$.uid]) return;
  const {
    handler,
    options,
    target = el
  } = el._onScroll[binding.instance.$.uid];
  target.removeEventListener('scroll', handler, options);
  delete el._onScroll[binding.instance.$.uid];
}
function updated(el, binding) {
  if (binding.value === binding.oldValue) return;
  unmounted(el, binding);
  mounted(el, binding);
}
export const Scroll = {
  mounted,
  unmounted,
  updated
};
export default Scroll;
//# sourceMappingURL=index.js.map