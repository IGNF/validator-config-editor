// Composables
import { useOpenOnFocus } from "../../composables/openOnFocus.js";
import { useProxiedModel } from "../../composables/proxiedModel.js"; // Utilities
import { computed, toValue } from 'vue';

// Types

export function useSelectionMenu(props, options) {
  const _menu = useProxiedModel(props, 'menu');
  const menu = computed({
    get: () => _menu.value,
    set: v => {
      if (_menu.value && !v && options.vMenuRef.value?.ΨopenChildren.size) return;
      if (!v && props.menuProps?.persistent) return;
      if (v && toValue(options.menuDisabled)) return;
      _menu.value = v;
    }
  });
  useOpenOnFocus(menu, options.isFocused, () => props.openOnFocus);
  function closeOnSelect() {
    if (props.multiple || props.menuProps?.closeOnContentClick === false) return;
    menu.value = false;
  }
  return {
    menu,
    closeOnSelect
  };
}
//# sourceMappingURL=useSelectionMenu.js.map