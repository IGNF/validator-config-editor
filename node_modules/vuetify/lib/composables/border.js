// Utilities
import { computed } from 'vue';
import { getCurrentInstanceName, isString, propsFactory } from "../util/index.js"; // Types
// Composables
export const makeBorderProps = propsFactory({
  border: [Boolean, Number, String]
}, 'border');
export function useBorder(props, name = getCurrentInstanceName()) {
  const borderClasses = computed(() => {
    const border = props.border;
    if (border === true || border === '') {
      return `${name}--border`;
    } else if (isString(border) || border === 0) {
      return String(border).split(' ').map(v => `border-${v}`);
    }
    return [];
  });
  return {
    borderClasses
  };
}
//# sourceMappingURL=border.js.map