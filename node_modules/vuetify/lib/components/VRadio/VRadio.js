import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
// Components
import { makeVSelectionControlProps, VSelectionControl } from "../VSelectionControl/VSelectionControl.js"; // Composables
import { useProxiedModel } from "../../composables/proxiedModel.js"; // Utilities
import { genericComponent, omit, propsFactory, useRender } from "../../util/index.js"; // Types
export const makeVRadioProps = propsFactory({
  ...omit(makeVSelectionControlProps({
    falseIcon: '$radioOff',
    trueIcon: '$radioOn'
  }), ['indeterminate', 'indeterminateIcon'])
}, 'VRadio');
export const VRadio = genericComponent()({
  name: 'VRadio',
  props: makeVRadioProps(),
  emits: {
    'update:modelValue': value => true
  },
  setup(props, {
    slots
  }) {
    const model = useProxiedModel(props, 'modelValue');
    useRender(() => {
      const controlProps = omit(VSelectionControl.filterProps(props), ['modelValue']);
      return _createVNode(VSelectionControl, _mergeProps(controlProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": $event => model.value = $event,
        "class": ['v-radio', props.class],
        "style": props.style,
        "type": "radio"
      }), slots);
    });
    return {};
  }
});
//# sourceMappingURL=VRadio.js.map