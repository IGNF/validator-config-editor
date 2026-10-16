import { createVNode as _createVNode, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, normalizeStyle as _normalizeStyle } from "vue";
// Styles
import "./VSlideGroup.css";

// Components
import { VFadeTransition } from "../transitions/index.js";
import { VIcon } from "../VIcon/index.js"; // Composables
import { makeComponentProps } from "../../composables/component.js";
import { makeDisplayProps, useDisplay } from "../../composables/display.js";
import { useGoTo } from "../../composables/goto.js";
import { makeGroupProps, useGroup } from "../../composables/group.js";
import { IconValue } from "../../composables/icons.js";
import { useRtl } from "../../composables/locale.js";
import { useResizeObserver } from "../../composables/resizeObserver.js";
import { makeTagProps } from "../../composables/tag.js"; // Utilities
import { computed, shallowRef, watch } from 'vue';
import { calculateCenteredTarget, calculateUpdatedTarget, getOffsetPosition, getOffsetSize, getScrollDistance, getScrollPosition, getScrollSize } from "./helpers.js";
import { clamp, focusableChildren, genericComponent, IN_BROWSER, isBoolean, isObject, isString, matchesSelector, propsFactory, useRender } from "../../util/index.js"; // Types
export const VSlideGroupSymbol = Symbol.for('vuetify:v-slide-group');
export const makeVSlideGroupProps = propsFactory({
  centerActive: Boolean,
  scrollDistance: {
    type: [String, Number],
    default: '100%',
    validator: v => /^-?\d*\.?\d+(px|%)?$/.test(String(v).trim())
  },
  scrollSnap: {
    type: String,
    validator: v => ['start', 'center', 'end'].includes(v)
  },
  scrollToActive: {
    type: Boolean,
    default: true
  },
  contentClass: null,
  direction: {
    type: String,
    default: 'horizontal'
  },
  symbol: {
    type: null,
    default: VSlideGroupSymbol
  },
  nextIcon: {
    type: IconValue,
    default: '$next'
  },
  prevIcon: {
    type: IconValue,
    default: '$prev'
  },
  showArrows: {
    type: [Boolean, String],
    validator: v => isBoolean(v) || ['always', 'desktop', 'mobile', 'never'].includes(v)
  },
  ...makeComponentProps(),
  ...makeDisplayProps({
    mobile: null
  }),
  ...makeTagProps(),
  ...makeGroupProps({
    selectedClass: 'v-slide-group-item--active'
  })
}, 'VSlideGroup');
export const VSlideGroup = genericComponent()({
  name: 'VSlideGroup',
  props: makeVSlideGroupProps(),
  emits: {
    'update:modelValue': value => true,
    edge: side => true
  },
  setup(props, {
    emit,
    slots
  }) {
    const {
      isRtl
    } = useRtl();
    const {
      displayClasses,
      mobile
    } = useDisplay(props);
    const group = useGroup(props, props.symbol);
    const isOverflowing = shallowRef(false);
    const scrollOffset = shallowRef(0);
    const containerSize = shallowRef(0);
    const contentSize = shallowRef(0);
    const isHorizontal = computed(() => props.direction === 'horizontal');
    const {
      resizeRef: containerRef,
      contentRect: containerRect
    } = useResizeObserver();
    const {
      resizeRef: contentRef,
      contentRect
    } = useResizeObserver();
    const goTo = useGoTo();
    const goToOptions = computed(() => {
      return {
        container: containerRef.el,
        duration: 200,
        easing: 'easeOutQuart'
      };
    });
    const firstSelectedIndex = computed(() => {
      if (!group.selected.value.length) return -1;
      return group.items.value.findIndex(item => item.id === group.selected.value[0]);
    });
    const lastSelectedIndex = computed(() => {
      if (!group.selected.value.length) return -1;
      return group.items.value.findIndex(item => item.id === group.selected.value[group.selected.value.length - 1]);
    });
    if (IN_BROWSER) {
      let frame = -1;
      watch(() => [group.selected.value, containerRect.value, contentRect.value, isHorizontal.value], () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          if (containerRect.value && contentRect.value) {
            const sizeProperty = isHorizontal.value ? 'width' : 'height';
            containerSize.value = containerRect.value[sizeProperty];
            contentSize.value = contentRect.value[sizeProperty];
            isOverflowing.value = containerSize.value + 1 < contentSize.value;
          }
          if (props.scrollToActive && firstSelectedIndex.value >= 0 && contentRef.el) {
            // TODO: Is this too naive? Should we store element references in group composable?
            const selectedElement = contentRef.el.children[lastSelectedIndex.value];
            scrollToChildren(selectedElement, props.centerActive);
          }
        });
      });
    }
    const isFocused = shallowRef(false);
    function scrollToChildren(children, center) {
      if (props.scrollSnap) {
        return scrollToPosition(snapToElement(children, center));
      }
      let target = 0;
      if (center) {
        target = calculateCenteredTarget({
          containerElement: containerRef.el,
          isHorizontal: isHorizontal.value,
          selectedElement: children
        });
      } else {
        target = calculateUpdatedTarget({
          containerElement: containerRef.el,
          isHorizontal: isHorizontal.value,
          isRtl: isRtl.value,
          selectedElement: children
        });
      }
      scrollToPosition(mirrorInRtl(target));
    }
    let activeAnimations = 0;
    function scrollToPosition(newPosition) {
      if (!IN_BROWSER || !containerRef.el) return;
      const offsetSize = getOffsetSize(isHorizontal.value, containerRef.el);
      const scrollSize = getScrollSize(isHorizontal.value, containerRef.el);
      if (scrollSize <= offsetSize) return;
      newPosition = clamp(newPosition, 0, scrollSize - offsetSize);
      if (Math.abs(newPosition - getPosition()) <= 1) return;
      const scrolling = isHorizontal.value ? goTo.horizontal(newPosition, goToOptions.value) : goTo(newPosition, goToOptions.value);

      // Suppress re-snapping every frame we write
      if (props.scrollSnap) {
        const el = containerRef.el;
        el.style.scrollSnapType = 'none';
        activeAnimations++;
        scrolling.finally(() => --activeAnimations || (el.style.scrollSnapType = ''));
      }
    }
    function onFocusin(e) {
      isFocused.value = true;
      if (!isOverflowing.value || !contentRef.el) return;

      // Pointer focus must not scroll: mousedown focuses first and would slide the
      // target out from under the cursor before click. Keyboard keeps :focus-visible.
      if (matchesSelector(e.target, ':focus-visible') === false) return;

      // Focused element is likely to be the root of an item, so a
      // breadth-first search will probably find it in the first iteration
      for (const el of e.composedPath()) {
        for (const item of contentRef.el.children) {
          if (item === el) {
            scrollToChildren(item);
            return;
          }
        }
      }
    }
    function onFocusout(e) {
      isFocused.value = false;
    }

    // Affix clicks produce onFocus that we have to ignore to avoid extra scrollToChildren
    let ignoreFocusEvent = false;
    function onFocus(e) {
      if (!ignoreFocusEvent && !isFocused.value && !(e.relatedTarget && contentRef.el?.contains(e.relatedTarget))) focus();
      ignoreFocusEvent = false;
    }
    function onFocusAffixes() {
      ignoreFocusEvent = true;
    }
    function onKeydown(e) {
      if (!contentRef.el) return;
      function toFocus(location) {
        e.preventDefault();
        focus(location);
      }
      if (isHorizontal.value) {
        if (e.key === 'ArrowRight') {
          toFocus(isRtl.value ? 'prev' : 'next');
        } else if (e.key === 'ArrowLeft') {
          toFocus(isRtl.value ? 'next' : 'prev');
        }
      } else {
        if (e.key === 'ArrowDown') {
          toFocus('next');
        } else if (e.key === 'ArrowUp') {
          toFocus('prev');
        }
      }
      if (e.key === 'Home') {
        toFocus('first');
      } else if (e.key === 'End') {
        toFocus('last');
      }
    }
    function getSiblingElement(el, location) {
      if (!el) return undefined;
      let sibling = el;
      do {
        sibling = sibling?.[location === 'next' ? 'nextElementSibling' : 'previousElementSibling'];
      } while (sibling?.hasAttribute('disabled'));
      return sibling;
    }
    function focus(location) {
      if (!contentRef.el) return;
      let el;
      if (!location) {
        const focusable = focusableChildren(contentRef.el);
        el = focusable[0];
      } else if (location === 'next') {
        el = getSiblingElement(contentRef.el.querySelector(':focus'), location);
        if (!el) return focus('first');
      } else if (location === 'prev') {
        el = getSiblingElement(contentRef.el.querySelector(':focus'), location);
        if (!el) return focus('last');
      } else if (location === 'first') {
        el = contentRef.el.firstElementChild;
        if (el?.hasAttribute('disabled')) el = getSiblingElement(el, 'next');
      } else if (location === 'last') {
        el = contentRef.el.lastElementChild;
        if (el?.hasAttribute('disabled')) el = getSiblingElement(el, 'prev');
      }
      if (el) {
        el.focus({
          preventScroll: true
        });
      }
    }
    function mirrorInRtl(position) {
      return isHorizontal.value && isRtl.value ? getScrollSize(true, containerRef.el) - getOffsetSize(true, containerRef.el) - position : position;
    }
    function getPosition() {
      return mirrorInRtl(getScrollPosition(isHorizontal.value, isRtl.value, containerRef.el));
    }
    function getBounds(child) {
      const size = getOffsetSize(isHorizontal.value, child);
      const start = isHorizontal.value && isRtl.value ? getScrollSize(true, containerRef.el) - child.offsetLeft - size : getOffsetPosition(isHorizontal.value, child);
      return {
        start,
        end: start + size
      };
    }
    function getItemBounds() {
      return contentRef.el ? Array.from(contentRef.el.children, getBounds) : [];
    }
    function getSnapPosition(item) {
      if (props.scrollSnap === 'end') return item.end - containerSize.value;
      if (props.scrollSnap === 'center') return (item.start + item.end - containerSize.value) / 2;
      return item.start;
    }
    function getSnapPositions() {
      return getItemBounds().map(getSnapPosition);
    }
    function getItemClippedAt(edge) {
      return getItemBounds().find(item => item.start < edge - 1 && item.end > edge + 1);
    }
    function reveals(item) {
      return position => !item || position <= item.start + 1 && position + containerSize.value >= item.end - 1;
    }
    function nearestTo(ideal) {
      return (best, position) => Math.abs(position - ideal) < Math.abs(best - ideal) ? position : best;
    }
    function snapToElement(child, center) {
      const item = getBounds(child);
      const ideal = center ? (item.start + item.end - containerSize.value) / 2 : getPosition();
      return getSnapPositions().filter(reveals(item)).reduce(nearestTo(ideal), getSnapPosition(item));
    }
    function snapToItem(from, step) {
      const forward = step > 0;
      const target = from + step;
      const candidates = getSnapPositions().filter(p => forward ? p > from + 1 : p < from - 1);
      const revealing = candidates.filter(reveals(getItemClippedAt(forward ? target : from)));
      const options = revealing.length ? revealing : candidates;
      return (forward ? options.findLast(p => p <= target) ?? options[0] : options.find(p => p >= target) ?? options.at(-1)) ?? target;
    }
    function slide(target) {
      if (!containerRef.el || !containerSize.value) return;
      if (isObject(target) && 'index' in target) {
        const item = contentRef.el?.children[target.index];
        if (item) {
          scrollToChildren(item, props.centerActive);
        }
        return;
      }
      const from = getPosition();
      const distance = isString(target) ? props.scrollDistance : target.by;
      const scrollDistance = getScrollDistance(containerSize.value, distance) * (target === 'prev' ? -1 : 1);
      const nextPosition = props.scrollSnap ? snapToItem(from, scrollDistance) : from + scrollDistance;
      scrollToPosition(nextPosition);
    }
    const slotProps = computed(() => ({
      next: group.next,
      prev: group.prev,
      select: group.select,
      isSelected: group.isSelected
    }));
    const hasOverflowOrScroll = computed(() => isOverflowing.value || Math.abs(scrollOffset.value) > 0);
    const hasAffixes = computed(() => {
      switch (props.showArrows) {
        case 'never':
          return false;

        // Always show arrows on desktop & mobile
        case 'always':
          return true;

        // Always show arrows on desktop
        case 'desktop':
          return !mobile.value;

        // Show arrows on mobile when overflowing.
        // This matches the default 2.2 behavior
        case true:
          return hasOverflowOrScroll.value;

        // Always show on mobile
        case 'mobile':
          return mobile.value || hasOverflowOrScroll.value;

        // https://material.io/components/tabs#scrollable-tabs
        // Always show arrows when
        // overflowed on desktop
        default:
          return !mobile.value && hasOverflowOrScroll.value;
      }
    });
    const hasPrev = computed(() => {
      // 1 pixel in reserve, may be lost after rounding
      return Math.abs(scrollOffset.value) > 1;
    });
    const hasNext = computed(() => {
      if (!hasOverflowOrScroll.value) return false;
      const scrollSizeMax = contentSize.value - containerSize.value;

      // 1 pixel in reserve, may be lost after rounding
      return scrollSizeMax - Math.abs(scrollOffset.value) > 1;
    });

    // Watching hasPrev/hasNext instead would report edges that a resize or an appearing
    // affix produced, without the position ever moving.
    function onScroll() {
      const hadPrev = hasPrev.value;
      const hadNext = hasNext.value;
      scrollOffset.value = getPosition();
      if (hadPrev && !hasPrev.value) emit('edge', 'start');
      if (hadNext && !hasNext.value) emit('edge', 'end');
    }
    useRender(() => _createVNode(props.tag, {
      "class": _normalizeClass(['v-slide-group', {
        'v-slide-group--vertical': !isHorizontal.value,
        'v-slide-group--has-affixes': hasAffixes.value,
        'v-slide-group--is-overflowing': isOverflowing.value,
        'v-slide-group--snap': !!props.scrollSnap
      }, displayClasses.value, props.class]),
      "style": _normalizeStyle(props.style),
      "tabindex": isFocused.value || group.selected.value.length ? -1 : 0,
      "onFocus": onFocus
    }, {
      default: () => [hasAffixes.value && _createElementVNode("div", {
        "key": "prev",
        "class": _normalizeClass(['v-slide-group__prev', {
          'v-slide-group__prev--disabled': !hasPrev.value
        }]),
        "onMousedown": onFocusAffixes,
        "onClick": () => hasPrev.value && slide('prev')
      }, [slots.prev?.(slotProps.value) ?? _createVNode(VFadeTransition, null, {
        default: () => [_createVNode(VIcon, {
          "icon": isRtl.value ? props.nextIcon : props.prevIcon
        }, null)]
      })]), _createElementVNode("div", {
        "key": "container",
        "ref": containerRef,
        "class": _normalizeClass(['v-slide-group__container', props.contentClass]),
        "style": {
          '--v-slide-group-snap-align': props.scrollSnap
        },
        "onScroll": onScroll
      }, [_createElementVNode("div", {
        "ref": contentRef,
        "class": "v-slide-group__content",
        "onFocusin": onFocusin,
        "onFocusout": onFocusout,
        "onKeydown": onKeydown
      }, [slots.default?.(slotProps.value)])]), hasAffixes.value && _createElementVNode("div", {
        "key": "next",
        "class": _normalizeClass(['v-slide-group__next', {
          'v-slide-group__next--disabled': !hasNext.value
        }]),
        "onMousedown": onFocusAffixes,
        "onClick": () => hasNext.value && slide('next')
      }, [slots.next?.(slotProps.value) ?? _createVNode(VFadeTransition, null, {
        default: () => [_createVNode(VIcon, {
          "icon": isRtl.value ? props.prevIcon : props.nextIcon
        }, null)]
      })])]
    }));
    return {
      selected: group.selected,
      slide,
      scrollOffset,
      focus,
      hasPrev,
      hasNext,
      hasOverflow: isOverflowing
    };
  }
});
//# sourceMappingURL=VSlideGroup.js.map