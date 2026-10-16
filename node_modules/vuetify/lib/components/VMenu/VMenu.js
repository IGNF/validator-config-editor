import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
// Styles
import "./VMenu.css";

// Components
import { VDialogTransition } from "../transitions/index.js";
import { VDefaultsProvider } from "../VDefaultsProvider/index.js";
import { VOverlay } from "../VOverlay/index.js";
import { makeVOverlayProps } from "../VOverlay/VOverlay.js"; // Composables
import { forwardRefs } from "../../composables/forwardRefs.js";
import { useRtl } from "../../composables/locale.js";
import { useProxiedModel } from "../../composables/proxiedModel.js";
import { useScopeId } from "../../composables/scopeId.js"; // Utilities
import { computed, inject, mergeProps, onBeforeUnmount, onDeactivated, provide, ref, shallowRef, toRef, useId, watch } from 'vue';
import { VMenuSymbol } from "./shared.js";
import { focusableChildren, focusChild, genericComponent, getActiveElement, getNextElement, omit, propsFactory, useRender } from "../../util/index.js"; // Types
export const makeVMenuProps = propsFactory({
  _disableKeys: Boolean,
  id: String,
  submenu: Boolean,
  openOnArrow: {
    type: Boolean,
    default: true
  },
  ...omit(makeVOverlayProps({
    captureFocus: true,
    closeDelay: 250,
    closeOnContentClick: true,
    locationStrategy: 'connected',
    location: undefined,
    openDelay: 300,
    scrim: false,
    scrollStrategy: 'reposition',
    transition: {
      component: VDialogTransition
    }
  }), ['absolute'])
}, 'VMenu');
export const VMenu = genericComponent()({
  name: 'VMenu',
  props: makeVMenuProps(),
  emits: {
    'update:modelValue': value => true
  },
  setup(props, {
    slots
  }) {
    const isActive = useProxiedModel(props, 'modelValue');
    const {
      scopeId
    } = useScopeId();
    const {
      isRtl
    } = useRtl();
    const uid = useId();
    const id = toRef(() => props.id || `v-menu-${uid}`);
    const overlay = ref();
    const parent = inject(VMenuSymbol, null);
    const openChildren = shallowRef(new Map());
    provide(VMenuSymbol, {
      register(childUid, close) {
        // Only one submenu open per level: close any already-open sibling first.
        for (const [otherUid, closeOther] of [...openChildren.value]) {
          if (otherUid !== childUid) closeOther();
        }
        openChildren.value.set(childUid, close);
      },
      unregister(childUid) {
        openChildren.value.delete(childUid);
      },
      closeParents(e) {
        const clickedOutside = !e || overlay.value?.contentEl?._clickOutside?.lastMousedownWasOutside;
        setTimeout(() => {
          if (!openChildren.value.size && !props.persistent && clickedOutside) {
            isActive.value = false;
            parent?.closeParents(e);
          }
        }, 40);
      },
      rootOpenedByHover: props.submenu && parent ? parent.rootOpenedByHover : () => overlay.value?.openedByHover ?? false
    });
    onBeforeUnmount(() => parent?.unregister(uid));
    onDeactivated(() => isActive.value = false);
    watch(isActive, val => {
      if (val) {
        parent?.register(uid, () => {
          isActive.value = false;
        });
      } else {
        parent?.unregister(uid);

        // close a submenu branch
        for (const [, closeChild] of [...openChildren.value]) closeChild();
      }
    }, {
      immediate: true
    });
    function onKeydown(e) {
      if (props.disabled) return;
      if (e.key === 'Tab') {
        if (props.submenu && !props.retainFocus) {
          e.preventDefault();
          isActive.value = false;
          overlay.value?.activatorEl?.focus();
          return;
        }
        const nextElement = getNextElement(focusableChildren(overlay.value?.contentEl, false), e.shiftKey ? 'prev' : 'next', el => el.tabIndex >= 0);
        if (!nextElement && !props.retainFocus) {
          isActive.value = false;
        }
      } else if (props.submenu && e.key === (isRtl.value ? 'ArrowRight' : 'ArrowLeft')) {
        isActive.value = false;
        overlay.value?.activatorEl?.focus();
      }
    }
    function setInitialFocus(e) {
      const el = overlay.value?.contentEl;
      if (!el || !isActive.value) return;
      if (!['ArrowUp', 'ArrowDown'].includes(e.key)) return;
      const focusable = focusableChildren(el);
      const focusTarget = e.key === 'ArrowUp' ? focusable.at(-1) : focusable[0];
      const focusTargetRole = focusTarget?.getAttribute('role') ?? '';
      const selectedOption = ['option', 'listbox'].includes(focusTargetRole) && focusable.find(child => child.getAttribute('role') === 'option' && child.getAttribute('aria-selected') === 'true' && child.offsetParent != null);
      if (selectedOption) {
        selectedOption.focus();
      } else {
        focusChild(el, e.key === 'ArrowDown' ? 'next' : 'prev');
      }
    }
    function onActivatorKeydown(e) {
      if (props.disabled || props._disableKeys || e.isComposing) return;
      const el = overlay.value?.contentEl;
      if (el && isActive.value) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          if (!props.openOnArrow) return;
          e.preventDefault();
          e.stopImmediatePropagation();
          focusChild(el, e.key === 'ArrowDown' ? 'next' : 'prev');
        } else if (props.submenu) {
          if (e.key === (isRtl.value ? 'ArrowRight' : 'ArrowLeft')) {
            isActive.value = false;
            overlay.value?.activatorEl?.focus();
          } else if (e.key === (isRtl.value ? 'ArrowLeft' : 'ArrowRight')) {
            e.preventDefault();
            focusChild(el, 'first');
          }
        }
      } else if (props.submenu ? e.key === (isRtl.value ? 'ArrowLeft' : 'ArrowRight') : props.openOnArrow && ['ArrowDown', 'ArrowUp'].includes(e.key)) {
        isActive.value = true;
        e.preventDefault();
        focusContentWhenReady(e);
      }
    }
    function focusContentWhenReady(e, attempt = 1) {
      if (!isActive.value) return;
      const el = overlay.value?.contentEl;
      if (el?.contains(getActiveElement())) return;
      if (el && focusableChildren(el).length) {
        if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
          setInitialFocus(e);
        } else {
          onActivatorKeydown(e);
        }
        if (el.contains(getActiveElement())) return;
      }
      if (attempt <= 10) {
        requestAnimationFrame(() => focusContentWhenReady(e, attempt + 1));
      }
    }
    const activatorProps = computed(() => mergeProps({
      'aria-haspopup': 'menu',
      'aria-expanded': String(isActive.value),
      'aria-controls': id.value,
      'aria-owns': id.value,
      onKeydown: onActivatorKeydown
    }, props.activatorProps));
    useRender(() => {
      const overlayProps = VOverlay.filterProps(props);
      return _createVNode(VOverlay, _mergeProps({
        "ref": overlay,
        "id": id.value,
        "class": ['v-menu', props.class],
        "style": props.style
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": $event => isActive.value = $event,
        "absolute": true,
        "_submenu": props.submenu,
        "activatorProps": activatorProps.value,
        "location": props.location ?? (props.submenu ? 'end' : 'bottom'),
        "onKeydown": onKeydown
      }, scopeId), {
        activator: slots.activator,
        default: (...args) => _createVNode(VDefaultsProvider, {
          "root": "VMenu"
        }, {
          default: () => [slots.default?.(...args)]
        })
      });
    });
    return forwardRefs({
      id,
      ΨopenChildren: openChildren
    }, overlay);
  }
});
//# sourceMappingURL=VMenu.js.map