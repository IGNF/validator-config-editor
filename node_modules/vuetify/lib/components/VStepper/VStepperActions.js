import { mergeProps as _mergeProps, createVNode as _createVNode, createElementVNode as _createElementVNode } from "vue";
// Components
import { VBtn } from "../VBtn/VBtn.js";
import { VDefaultsProvider } from "../VDefaultsProvider/VDefaultsProvider.js"; // Composables
import { injectComponentDefaults, injectNestedDefaults } from "../../composables/defaults.js";
import { useLocale } from "../../composables/locale.js"; // Utilities
import { genericComponent, propsFactory, useRender } from "../../util/index.js"; // Types
export const makeVStepperActionsProps = propsFactory({
  color: String,
  disabled: {
    type: [Boolean, String],
    default: false
  },
  prevText: {
    type: String,
    default: '$vuetify.stepper.prev'
  },
  nextText: {
    type: String,
    default: '$vuetify.stepper.next'
  }
}, 'VStepperActions');
export const VStepperActions = genericComponent()({
  name: 'VStepperActions',
  props: makeVStepperActionsProps(),
  emits: {
    'click:prev': () => true,
    'click:next': () => true
  },
  setup(props, {
    emit,
    slots
  }) {
    const {
      t
    } = useLocale();
    const btnDefaults = injectNestedDefaults('VBtn');
    const prevDefaults = injectComponentDefaults('VStepperActionsPrevBtn');
    const nextDefaults = injectComponentDefaults('VStepperActionsNextBtn');
    function onClickPrev() {
      emit('click:prev');
    }
    function onClickNext() {
      emit('click:next');
    }
    useRender(() => {
      const prevSlotProps = {
        onClick: onClickPrev
      };
      const nextSlotProps = {
        onClick: onClickNext
      };
      const prevProps = {
        disabled: ['prev', true].includes(props.disabled),
        text: t(props.prevText),
        variant: prevDefaults.value?.variant ?? btnDefaults.value?.variant ?? 'text'
      };
      const nextProps = {
        color: props.color,
        disabled: ['next', true].includes(props.disabled),
        text: t(props.nextText),
        variant: nextDefaults.value?.variant ?? btnDefaults.value?.variant ?? 'tonal'
      };
      return _createElementVNode("div", {
        "class": "v-stepper-actions"
      }, [_createVNode(VDefaultsProvider, {
        "defaults": {
          VBtn: prevProps,
          VStepperActionsPrevBtn: {
            ...btnDefaults.value,
            ...prevDefaults.value,
            ...prevProps
          }
        }
      }, {
        default: () => [slots.prev?.({
          props: prevSlotProps
        }) ?? _createVNode(VBtn, _mergeProps({
          "_as": "VStepperActionsPrevBtn"
        }, prevSlotProps), null)]
      }), _createVNode(VDefaultsProvider, {
        "defaults": {
          VBtn: nextProps,
          VStepperActionsNextBtn: {
            ...btnDefaults.value,
            ...nextDefaults.value,
            ...nextProps
          }
        }
      }, {
        default: () => [slots.next?.({
          props: nextSlotProps
        }) ?? _createVNode(VBtn, _mergeProps({
          "_as": "VStepperActionsNextBtn"
        }, nextSlotProps), null)]
      })]);
    });
    return {};
  }
});
//# sourceMappingURL=VStepperActions.js.map