// Utilities
import { isFunction } from "../../util/index.js"; // Types
function mounted(el, binding) {
  const modifiers = binding.modifiers || {};
  const value = binding.value;
  const {
    once,
    immediate,
    ...modifierKeys
  } = modifiers;
  const defaultValue = !Object.keys(modifierKeys).length;
  const handler = isFunction(value) ? value : value.handler;
  const options = isFunction(value) ? {
    attributes: modifierKeys?.attr ?? defaultValue,
    characterData: modifierKeys?.char ?? defaultValue,
    childList: modifierKeys?.child ?? defaultValue,
    subtree: modifierKeys?.sub ?? defaultValue
  } : value.options;
  const observer = new MutationObserver((mutations = [], observer) => {
    handler?.(mutations, observer);
    if (once) unmounted(el, binding);
  });
  if (immediate) handler?.([], observer);
  el._mutate = Object(el._mutate);
  el._mutate[binding.instance.$.uid] = {
    observer
  };
  observer.observe(el, options);
}
function unmounted(el, binding) {
  if (!el._mutate?.[binding.instance.$.uid]) return;
  el._mutate[binding.instance.$.uid].observer.disconnect();
  delete el._mutate[binding.instance.$.uid];
}
export const Mutate = {
  mounted,
  unmounted
};
export default Mutate;
//# sourceMappingURL=index.js.map