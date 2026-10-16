import { mergeProps as _mergeProps, createElementVNode as _createElementVNode, createVNode as _createVNode, Fragment as _Fragment, vShow as _vShow, withDirectives as _withDirectives } from "vue";
// Styles
import "./VOverlay.css";

// Components
import { VMenuSymbol } from "../VMenu/shared.js"; // Composables
import { getStaticLocationClasses, makeLocationStrategyProps, useLocationStrategies } from "./locationStrategies.js";
import { makeScrollStrategyProps, useScrollStrategies } from "./scrollStrategies.js";
import { makeActivatorProps, useActivator } from "./useActivator.js";
import { useBackgroundColor } from "../../composables/color.js";
import { makeComponentProps } from "../../composables/component.js";
import { makeDimensionProps, useDimension } from "../../composables/dimensions.js";
import { makeFocusTrapProps, useFocusTrap } from "../../composables/focusTrap.js";
import { useHydration } from "../../composables/hydration.js";
import { makeLazyProps, useLazy } from "../../composables/lazy.js";
import { useRtl } from "../../composables/locale.js";
import { useProxiedModel } from "../../composables/proxiedModel.js";
import { useBackButton, useRouter } from "../../composables/router.js";
import { useScopeId } from "../../composables/scopeId.js";
import { useStack } from "../../composables/stack.js";
import { useTeleport } from "../../composables/teleport.js";
import { makeThemeProps, provideTheme } from "../../composables/theme.js";
import { useToggleScope } from "../../composables/toggleScope.js";
import { makeTransitionProps, MaybeTransition } from "../../composables/transition.js"; // Directives
import vClickOutside from "../../directives/click-outside/index.js"; // Utilities
import { computed, inject, mergeProps, onBeforeUnmount, provide, ref, Teleport, Transition, watch, watchEffect } from 'vue';
import { animate, convertToUnit, focusableChildren, genericComponent, getActiveElement, getCurrentInstance, getScrollParent, IN_BROWSER, isString, omit, propsFactory, standardEasing, useRender } from "../../util/index.js"; // Types
const overlayActivators = new WeakMap();
function Scrim(props) {
  const {
    modelValue,
    color,
    ...rest
  } = props;
  return _createVNode(Transition, {
    "name": "fade-transition",
    "appear": true
  }, {
    default: () => [props.modelValue && _createElementVNode("div", _mergeProps({
      "class": ['v-overlay__scrim', props.color.backgroundColorClasses.value],
      "style": props.color.backgroundColorStyles.value
    }, rest), null)]
  });
}
export const makeVOverlayProps = propsFactory({
  absolute: Boolean,
  attach: [Boolean, String, Object],
  closeOnBack: {
    type: Boolean,
    default: true
  },
  contained: Boolean,
  contentClass: null,
  contentProps: null,
  disabled: Boolean,
  opacity: [Number, String],
  noClickAnimation: Boolean,
  modelValue: Boolean,
  persistent: Boolean,
  scrim: {
    type: [Boolean, String],
    default: true
  },
  zIndex: {
    type: [Number, String],
    default: 2000
  },
  ...makeActivatorProps(),
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeLazyProps(),
  ...makeLocationStrategyProps(),
  ...makeScrollStrategyProps(),
  ...makeFocusTrapProps(),
  ...makeThemeProps(),
  ...makeTransitionProps()
}, 'VOverlay');
export const VOverlay = genericComponent()({
  name: 'VOverlay',
  directives: {
    vClickOutside
  },
  inheritAttrs: false,
  props: {
    _disableGlobalStack: Boolean,
    _submenu: Boolean,
    ...omit(makeVOverlayProps(), ['disableInitialFocus'])
  },
  emits: {
    'click:outside': e => true,
    'update:modelValue': value => true,
    keydown: e => true,
    afterEnter: () => true,
    afterLeave: () => true
  },
  setup(props, {
    slots,
    attrs,
    emit
  }) {
    const vm = getCurrentInstance('VOverlay');
    const root = ref();
    const scrimEl = ref();
    const contentEl = ref();
    const model = useProxiedModel(props, 'modelValue');
    const isActive = computed({
      get: () => model.value,
      set: v => {
        if (!(v && props.disabled)) model.value = v;
      }
    });
    const {
      themeClasses
    } = provideTheme(props);
    const {
      rtlClasses,
      isRtl
    } = useRtl();
    const {
      hasContent,
      onAfterLeave: _onAfterLeave
    } = useLazy(props, isActive);
    const scrimColor = useBackgroundColor(() => {
      return isString(props.scrim) ? props.scrim : null;
    });
    const {
      globalTop,
      localTop,
      stackStyles
    } = useStack(isActive, () => props.zIndex, props._disableGlobalStack);
    const {
      activatorEl,
      activatorRef,
      target,
      targetEl,
      targetRef,
      activatorEvents,
      contentEvents,
      scrimEvents,
      openedByHover
    } = useActivator(props, {
      isActive,
      isTop: localTop,
      contentEl,
      isSubmenu: props._submenu
    });
    const {
      teleportTarget
    } = useTeleport(() => {
      const target = props.attach || props.contained;
      if (target) return target;
      const rootNode = activatorEl?.value?.getRootNode() || vm.proxy?.$el?.getRootNode();
      if (rootNode instanceof ShadowRoot) return rootNode;
      return false;
    });
    const {
      dimensionStyles
    } = useDimension(props);
    const isMounted = useHydration();
    const staticLocationClasses = computed(() => {
      return props.locationStrategy === 'static' ? getStaticLocationClasses(props.location) : undefined;
    });
    const {
      scopeId
    } = useScopeId();
    watch(() => props.disabled, v => {
      if (v) isActive.value = false;
    });
    const {
      contentStyles,
      updateLocation
    } = useLocationStrategies(props, {
      isRtl,
      contentEl,
      target,
      isActive
    });
    useScrollStrategies(props, {
      root,
      contentEl,
      targetEl,
      target,
      isActive,
      updateLocation
    });

    // self-reference or the closest ancestor
    const menu = inject(VMenuSymbol, null);

    // Non-menu overlays (dialog, tooltip, …) sit under a host menu in the component tree even
    // when teleported. Scrub the inject chain so closeParents stops at that boundary.
    if (vm.parent?.type?.name !== 'VMenu') {
      provide(VMenuSymbol, null);
    }
    function onClickOutside(e) {
      emit('click:outside', e);
      if (!props.persistent) isActive.value = false;else animateClick();
      if (!props.scrim) menu?.closeParents(e);
    }
    function closeConditional(e) {
      return isActive.value && localTop.value && (
      // If using scrim, only close if clicking on it rather than anything opened on top
      !props.scrim || e.target === scrimEl.value || e instanceof MouseEvent && e.shadowTarget === scrimEl.value);
    }
    useFocusTrap(props, {
      isActive,
      localTop,
      contentEl
    });
    let openedWithActivatorFocus = false;
    watchEffect(() => {
      if (!contentEl.value) return;
      if (activatorEl.value) overlayActivators.set(contentEl.value, activatorEl.value);else overlayActivators.delete(contentEl.value);
    });
    function ownsFocus(activeElement) {
      let current = activeElement;
      const visited = new Set();
      while (current) {
        const el = current.closest('.v-overlay__content');
        if (!el || visited.has(el)) return false;
        if (el === contentEl.value) return true;
        visited.add(el);
        current = overlayActivators.get(el) ?? null;
      }
      return false;
    }
    function returnFocusToActivator() {
      const el = activatorEl.value;
      if (!el || !el.isConnected) return;
      // Skip submenus; the outermost close in the cascade will restore focus.
      if (el.closest('.v-overlay__content')) return;
      if (contentEl.value?._clickOutside?.lastMousedownWasOutside) return;
      const activeEl = getActiveElement();
      const focusWasInOverlay = (!activeEl || activeEl === document.body) && openedWithActivatorFocus || activeEl === el || el.contains(activeEl) || ownsFocus(activeEl);
      if (!focusWasInOverlay) return;
      const parent = el.parentElement;
      const focusableInParent = parent ? focusableChildren(parent) : [];
      let target;
      if (focusableInParent.includes(el)) {
        target = el;
      } else {
        const focusableWithin = focusableChildren(el);
        target = focusableWithin.find(x => x.tagName === 'INPUT' || x.tagName === 'TEXTAREA') ?? focusableWithin[0];
      }
      target?.focus({
        preventScroll: true
      });
    }
    watch(isActive, val => {
      if (val) {
        const activeEl = getActiveElement();
        const el = activatorEl.value;
        openedWithActivatorFocus = !!el && (activeEl === el || el.contains(activeEl));
        if (contentEl.value) contentEl.value.inert = false;
        // eager reuses contentEl, so the mousedown that opened us would linger until the next one
        if (contentEl.value?._clickOutside) {
          contentEl.value._clickOutside.lastMousedownWasOutside = false;
        }
      } else {
        if (contentEl.value) contentEl.value.inert = true;
        returnFocusToActivator();
      }
    }, {
      flush: 'post'
    });
    IN_BROWSER && watch(isActive, val => {
      if (val) {
        window.addEventListener('keydown', onKeydown);
      } else {
        window.removeEventListener('keydown', onKeydown);
      }
    }, {
      immediate: true
    });
    onBeforeUnmount(() => {
      if (!IN_BROWSER) return;
      window.removeEventListener('keydown', onKeydown);
    });
    function onKeydown(e) {
      if (e.key === 'Escape' && globalTop.value) {
        if (!contentEl.value?.contains(getActiveElement())) {
          emit('keydown', e);
        }
        if (!props.persistent) {
          isActive.value = false;
          if (contentEl.value?.contains(getActiveElement())) {
            activatorEl.value?.focus();
          }
        } else animateClick();
      }
    }
    function onKeydownSelf(e) {
      if (e.key === 'Escape' && !globalTop.value) return;
      emit('keydown', e);
    }
    const router = useRouter();
    useToggleScope(() => props.closeOnBack, () => {
      useBackButton(router, () => {
        if (globalTop.value && isActive.value) {
          if (!props.persistent) isActive.value = false;else animateClick();
          return false;
        }
        return undefined;
      });
    });
    const top = ref();
    watch(() => isActive.value && (props.absolute || props.contained) && teleportTarget.value == null, val => {
      if (val) {
        const scrollParent = getScrollParent(root.value);
        if (scrollParent && scrollParent !== document.scrollingElement) {
          top.value = scrollParent.scrollTop;
        }
      }
    });

    // Add a quick "bounce" animation to the content
    function animateClick() {
      if (props.noClickAnimation) return;
      contentEl.value && animate(contentEl.value, [{
        transformOrigin: 'center'
      }, {
        transform: 'scale(1.03)'
      }, {
        transformOrigin: 'center'
      }], {
        duration: 150,
        easing: standardEasing
      });
    }
    function onAfterEnter() {
      emit('afterEnter');
    }
    function onAfterLeave() {
      _onAfterLeave();
      emit('afterLeave');
    }
    useRender(() => _createElementVNode(_Fragment, null, [slots.activator?.({
      isActive: isActive.value,
      targetRef,
      props: mergeProps({
        ref: activatorRef
      }, activatorEvents.value, props.activatorProps)
    }), isMounted.value && hasContent.value && _createVNode(Teleport, {
      "disabled": !teleportTarget.value,
      "to": teleportTarget.value
    }, {
      default: () => [_createElementVNode("div", _mergeProps({
        "class": ['v-overlay', {
          'v-overlay--absolute': props.absolute || props.contained,
          'v-overlay--active': isActive.value,
          'v-overlay--contained': props.contained
        }, staticLocationClasses.value, themeClasses.value, rtlClasses.value, props.class],
        "style": [stackStyles.value, {
          '--v-overlay-opacity': props.opacity,
          top: convertToUnit(top.value)
        }, props.style],
        "ref": root,
        "onKeydown": onKeydownSelf
      }, scopeId, attrs), [_createVNode(Scrim, _mergeProps({
        "color": scrimColor,
        "modelValue": isActive.value && !!props.scrim,
        "ref": scrimEl
      }, scrimEvents.value), null), _createVNode(MaybeTransition, {
        "appear": true,
        "persisted": true,
        "transition": props.transition,
        "target": target.value,
        "onAfterEnter": onAfterEnter,
        "onAfterLeave": onAfterLeave
      }, {
        default: () => [_withDirectives(_createElementVNode("div", _mergeProps({
          "ref": contentEl,
          "class": ['v-overlay__content', props.contentClass],
          "style": [dimensionStyles.value, contentStyles.value]
        }, contentEvents.value, props.contentProps), [slots.default?.({
          isActive
        })]), [[_vShow, isActive.value], [vClickOutside, {
          handler: onClickOutside,
          closeConditional,
          include: () => {
            if (!isActive.value) return [];
            return [activatorEl.value,
            // Submenu clicks count as "inside"; clicks in ancestor overlays (e.g. a host dialog) don't.
            ...Array.from(document.querySelectorAll('.v-overlay__content')).filter(ownsFocus)];
          }
        }]])]
      })])]
    })]));
    return {
      activatorEl,
      scrimEl,
      target,
      animateClick,
      contentEl,
      rootEl: root,
      globalTop,
      localTop,
      updateLocation,
      openedByHover
    };
  }
});
//# sourceMappingURL=VOverlay.js.map