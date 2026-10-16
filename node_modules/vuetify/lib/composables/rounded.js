// Utilities
import { computed, isRef } from 'vue';
import { convertToUnit, getCurrentInstanceName, isString, propsFactory } from "../util/index.js"; // Types
const CSS_LENGTH = /^-?\d*\.?\d+([a-z%]{0,4})$/i;
function splitTokens(v) {
  return String(v).trim().split(/\s+/);
}
function isCssLength(token) {
  return token.toLowerCase().match(CSS_LENGTH)?.at(1)?.startsWith('x') === false;
}
function isCssValue(v) {
  return typeof v === 'string' && !!v && (v.includes('(') || splitTokens(v).every(isCssLength));
}

// Composables
export const makeRoundedProps = propsFactory({
  rounded: {
    type: [Boolean, Number, String],
    default: undefined
  },
  tile: Boolean
}, 'rounded');
export function useRounded(props, name = getCurrentInstanceName()) {
  const roundedClasses = computed(() => {
    const rounded = isRef(props) ? props.value : props.rounded;
    const tile = isRef(props) ? false : props.tile;
    const classes = [];
    if (tile || rounded === false || String(rounded) === '0') {
      classes.push('rounded-0');
    } else if (rounded === true || rounded === '') {
      classes.push(`${name}--rounded`);
    } else if (isString(rounded) && !isCssValue(rounded)) {
      for (const value of splitTokens(rounded)) {
        classes.push(`rounded-${value}`);
      }
    }
    return classes;
  });
  const roundedStyles = computed(() => {
    const rounded = isRef(props) ? props.value : props.rounded;
    if ((!isCssValue(rounded) || String(rounded) === '0') && !(typeof rounded === 'number' && rounded !== 0)) {
      return {};
    }
    return {
      borderRadius: convertToUnit(rounded)
    };
  });
  return {
    roundedClasses,
    roundedStyles
  };
}
//# sourceMappingURL=rounded.js.map