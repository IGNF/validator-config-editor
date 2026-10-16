// Components
import { VMenuSymbol } from "../VMenu/shared.js"; // Composables
import { makeDelayProps, useDelay } from "../../composables/delay.js"; // Utilities
import { computed, effectScope, inject, mergeProps, nextTick, onScopeDispose, ref, watch, watchEffect } from 'vue';
import { bindProps, getActiveElement, getCurrentInstance, IN_BROWSER, isString, matchesSelector, propsFactory, templateRef, unbindProps } from "../../util/index.js"; // Types
export const makeActivatorProps = propsFactory({
  target: [String, Object],
  activator: [String, Object],
  activatorProps: {
    type: Object,
    default: () => ({})
  },
  openOnClick: {
    type: Boolean,
    default: undefined
  },
  openOnHover: Boolean,
  openOnFocus: {
    type: Boolean,
    default: undefined
  },
  closeOnContentClick: Boolean,
  ...makeDelayProps()
}, 'VOverlay-activator');
export function useActivator(props, {
  isActive,
  isTop,
  contentEl,
  isSubmenu = false
}) {
  const vm = getCurrentInstance('useActivator');
  const activatorEl = ref();
  const parentMenu = inject(VMenuSymbol, null);
  let isHovered = false;
  let isFocused = false;
  let firstEnter = true;
  const openedByHover = ref(false);
  let delayCallbackFiredOpen = false;

  // a submenu chain collapses on mouseleave only when its root was hover-opened
  const shouldCloseOnLeave = () => !isSubmenu || (parentMenu?.rootOpenedByHover?.() ?? openedByHover.value);
  const openOnFocus = computed(() => props.openOnFocus || props.openOnFocus == null && props.openOnHover);
  const openOnClick = computed(() => props.openOnClick || props.openOnClick == null && !props.openOnHover && !openOnFocus.value);
  const {
    runOpenDelay,
    runCloseDelay
  } = useDelay(props, value => {
    if (value === (props.openOnHover && isHovered || openOnFocus.value && isFocused) && !(props.openOnHover && isActive.value && !isTop.value)) {
      if (isActive.value !== value) {
        firstEnter = true;
        if (value) {
          delayCallbackFiredOpen = true;
          openedByHover.value = isHovered && props.openOnHover;
        }
      }
      isActive.value = value;
    }
  });
  let reopenLock = false;
  watch(isActive, v => {
    if (!v) {
      reopenLock = true;
      setTimeout(() => reopenLock = false, 50);
      openedByHover.value = false;
      delayCallbackFiredOpen = false;
      return;
    }
    if (!delayCallbackFiredOpen) {
      openedByHover.value = false;
    }
    delayCallbackFiredOpen = false;
  });
  const cursorTarget = ref();
  const availableEvents = {
    onClick: e => {
      if (reopenLock && !isActive.value) return;
      e.stopPropagation();
      activatorEl.value = e.currentTarget || e.target;
      if (!isActive.value) {
        cursorTarget.value = [e.clientX, e.clientY];
      }
      isActive.value = !isActive.value;
    },
    onMouseenter: e => {
      isHovered = true;
      activatorEl.value = e.currentTarget || e.target;
      if (props.target === 'cursor') {
        cursorTarget.value = [e.clientX, e.clientY];
      }
      runOpenDelay();
    },
    onMousemove: e => {
      cursorTarget.value = [e.clientX, e.clientY];
    },
    onMouseleave: e => {
      isHovered = false;
      if (props.target === 'cursor') isFocused = false;
      if (shouldCloseOnLeave()) runCloseDelay();
    },
    onFocus: e => {
      if (reopenLock) return;
      if (matchesSelector(e.target, ':focus-visible') === false) return;
      isFocused = true;
      e.stopPropagation();
      activatorEl.value = e.currentTarget || e.target;
      runOpenDelay();
    },
    onBlur: e => {
      // Body parks from clicks on empty areas inside content also count as "still focused".
      const next = e.relatedTarget;
      if (!next || contentEl.value?.contains(next)) return;
      isFocused = false;
      e.stopPropagation();
      runCloseDelay({
        minDelay: 1
      });
    }
  };
  const activatorEvents = computed(() => {
    const events = {};
    if (openOnClick.value) {
      events.onClick = availableEvents.onClick;
    }
    if (props.openOnHover) {
      events.onMouseenter = availableEvents.onMouseenter;
      events.onMouseleave = availableEvents.onMouseleave;
      if (props.target === 'cursor' && !openOnClick.value) {
        events.onMousemove = availableEvents.onMousemove;
      }
    }
    if (openOnFocus.value) {
      events.onFocus = availableEvents.onFocus;
      events.onBlur = availableEvents.onBlur;
    }
    return events;
  });
  const contentEvents = computed(() => {
    const events = {};
    if (props.openOnHover) {
      events.onMouseenter = () => {
        isHovered = true;
        runOpenDelay();
      };
      events.onMouseleave = () => {
        isHovered = false;
        if (shouldCloseOnLeave()) runCloseDelay();
      };
    }
    if (openOnFocus.value) {
      events.onFocusin = e => {
        if (!e.target.matches(':focus-visible')) return;
        isFocused = true;
        runOpenDelay();
      };
      events.onFocusout = e => {
        const next = e.relatedTarget;
        if (!next || contentEl.value?.contains(next)) return;
        isFocused = false;
        runCloseDelay({
          minDelay: 1
        });
      };
    }
    if (props.closeOnContentClick) {
      const menu = inject(VMenuSymbol, null);
      events.onClick = () => {
        isActive.value = false;
        menu?.closeParents();
      };
    }
    return events;
  });
  const scrimEvents = computed(() => {
    const events = {};
    if (props.openOnHover) {
      events.onMouseenter = () => {
        if (firstEnter) {
          isHovered = true;
          firstEnter = false;
          runOpenDelay();
        }
      };
      events.onMouseleave = () => {
        isHovered = false;
        if (shouldCloseOnLeave()) runCloseDelay();
      };
    }
    return events;
  });
  watch(isTop, val => {
    if (val && shouldCloseOnLeave() && (props.openOnHover && !isHovered && (!openOnFocus.value || !isFocused) || openOnFocus.value && !isFocused && (!props.openOnHover || !isHovered)) && !contentEl.value?.contains(getActiveElement())) {
      runCloseDelay();
    }
  });
  watch(isActive, val => {
    if (!val) {
      setTimeout(() => {
        cursorTarget.value = undefined;
      });
    }
  }, {
    flush: 'post'
  });
  const activatorRef = templateRef();
  watchEffect(() => {
    if (!activatorRef.value) return;
    nextTick(() => {
      activatorEl.value = activatorRef.el;
    });
  });
  const targetRef = templateRef();
  const target = computed(() => {
    if (props.target === 'cursor' && cursorTarget.value) return cursorTarget.value;
    if (targetRef.value) return targetRef.el;
    return getTarget(props.target, vm) || activatorEl.value;
  });
  const targetEl = computed(() => {
    return Array.isArray(target.value) ? undefined : target.value;
  });
  let scope;
  watch(() => !!props.activator, val => {
    if (val && IN_BROWSER) {
      scope = effectScope();
      scope.run(() => {
        _useActivator(props, vm, {
          activatorEl,
          activatorEvents
        });
      });
    } else if (scope) {
      scope.stop();
    }
  }, {
    flush: 'post',
    immediate: true
  });
  onScopeDispose(() => {
    scope?.stop();
  });
  return {
    activatorEl,
    activatorRef,
    target,
    targetEl,
    targetRef,
    activatorEvents,
    contentEvents,
    scrimEvents,
    openedByHover
  };
}
function _useActivator(props, vm, {
  activatorEl,
  activatorEvents
}) {
  watch(() => props.activator, (val, oldVal) => {
    if (oldVal && val !== oldVal) {
      const activator = getActivator(oldVal);
      activator && unbindActivatorProps(activator);
    }
    if (val) {
      nextTick(() => bindActivatorProps());
    }
  }, {
    immediate: true
  });
  watch(() => props.activatorProps, () => {
    bindActivatorProps();
  });
  onScopeDispose(() => {
    unbindActivatorProps();
  });
  function bindActivatorProps(el = getActivator(), _props = props.activatorProps) {
    if (!el) return;
    bindProps(el, mergeProps(activatorEvents.value, _props));
  }
  function unbindActivatorProps(el = getActivator(), _props = props.activatorProps) {
    if (!el) return;
    unbindProps(el, mergeProps(activatorEvents.value, _props));
  }
  function getActivator(selector = props.activator) {
    const activator = getTarget(selector, vm);

    // The activator should only be a valid element (Ignore comments and text nodes)
    activatorEl.value = activator?.nodeType === Node.ELEMENT_NODE ? activator : undefined;
    return activatorEl.value;
  }
}
function getTarget(selector, vm) {
  if (!selector) return;
  let target;
  if (selector === 'parent') {
    let el = vm?.proxy?.$el?.parentNode;
    while (el?.hasAttribute('data-no-activator')) {
      el = el.parentNode;
    }
    target = el;
  } else if (isString(selector)) {
    // Selector
    target = document.querySelector(selector);
  } else if ('$el' in selector) {
    // Component (ref)
    target = selector.$el;
  } else {
    // HTMLElement | Element | [x, y]
    target = selector;
  }
  return target;
}
//# sourceMappingURL=useActivator.js.map