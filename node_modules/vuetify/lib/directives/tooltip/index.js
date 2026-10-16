// Components
import { VTooltip } from "../../components/VTooltip/index.js"; // Composables
import { useDirectiveComponent } from "../../composables/directiveComponent.js"; // Utilities
import { isBoolean, isObject } from "../../util/index.js"; // Types
export const Tooltip = useDirectiveComponent(VTooltip, binding => {
  const disabled = isObject(binding.value) ? !binding.value.text : ['', false, null, undefined].includes(binding.value);
  return {
    activator: disabled ? null : 'parent',
    location: binding.arg?.replace('-', ' '),
    text: isBoolean(binding.value) ? undefined : binding.value
  };
});
export default Tooltip;
//# sourceMappingURL=index.js.map