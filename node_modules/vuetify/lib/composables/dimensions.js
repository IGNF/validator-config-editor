// Utilities
import { computed } from 'vue';
import { convertToUnit, propsFactory } from "../util/index.js"; // Types
// Composables
export const makeDimensionProps = propsFactory({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, 'dimension');
export function useDimension(props) {
  const dimensionStyles = computed(() => {
    const styles = {};
    const height = convertToUnit(props.height);
    const maxHeight = convertToUnit(props.maxHeight);
    const maxWidth = convertToUnit(props.maxWidth);
    const minHeight = convertToUnit(props.minHeight);
    const minWidth = convertToUnit(props.minWidth);
    const width = convertToUnit(props.width);
    if (height) styles.height = height;
    if (maxHeight) styles.maxHeight = maxHeight;
    if (maxWidth) styles.maxWidth = maxWidth;
    if (minHeight) styles.minHeight = minHeight;
    if (minWidth) styles.minWidth = minWidth;
    if (width) styles.width = width;
    return styles;
  });
  return {
    dimensionStyles
  };
}
//# sourceMappingURL=dimensions.js.map