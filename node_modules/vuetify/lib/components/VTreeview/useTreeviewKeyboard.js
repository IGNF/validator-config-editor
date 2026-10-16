// Composables
import { useRtl } from "../../composables/locale.js";
import { VNestedSymbol } from "../../composables/nested/nested.js"; // Utilities
import { inject, toRaw } from 'vue';
import { focusableChildren } from "../../util/index.js"; // Types
function focusFirstChild(el) {
  el.closest('.v-list-group')?.querySelector(':scope > .v-list-group__items [role="treeitem"]')?.focus();
}
function focusParent(el) {
  const id = el.closest('.v-list-group__items')?.getAttribute('aria-labelledby');
  if (id) document.getElementById(id)?.focus();
}
function visibleTreeitems(el) {
  const tree = el.closest('.v-treeview');
  return tree ? focusableChildren(tree).filter(x => x.matches('[role="treeitem"]')) : [];
}
function siblingTreeitem(el, offset) {
  const items = visibleTreeitems(el);
  return items[items.indexOf(el) + offset] ?? null;
}
function focusSibling(el, offset) {
  siblingTreeitem(el, offset)?.focus();
}
function focusEdge(el, edge) {
  const items = visibleTreeitems(el);
  (edge === 'first' ? items[0] : items.at(-1))?.focus();
}
const verticalKeys = ['ArrowUp', 'ArrowDown', 'Home', 'End'];
export function useTreeviewKeyboard(props, checkChildren) {
  const {
    isRtl
  } = useRtl();
  const nested = inject(VNestedSymbol, null);
  function idOf(item) {
    return props.returnObject ? toRaw(item.raw) : item.value;
  }
  function onKeydown(e, item) {
    const root = nested?.root;
    if (!root) return;
    const el = e.currentTarget;
    const onItem = e.target === e.currentTarget;
    if (verticalKeys.includes(e.key)) {
      e.stopPropagation();
      if (!onItem) return;
      e.preventDefault();
      if (e.key === 'ArrowDown') focusSibling(el, 1);else if (e.key === 'ArrowUp') focusSibling(el, -1);else if (e.key === 'Home') focusEdge(el, 'first');else if (e.key === 'End') focusEdge(el, 'last');
      return;
    }
    if (e.key === 'Tab') {
      const controls = focusableChildren(el);
      if (controls.length) {
        if (!e.shiftKey && e.target === controls.at(-1)) {
          const next = siblingTreeitem(el, 1);
          if (next) {
            e.preventDefault();
            next.focus();
          }
        } else if (e.shiftKey && e.target === controls[0]) {
          e.preventDefault();
          el.focus();
        }
      }
      return;
    }
    if (onItem) onItemActionKeydown(e, item, el, root);
  }
  function onItemActionKeydown(e, item, el, root) {
    const expandKey = isRtl.value ? 'ArrowLeft' : 'ArrowRight';
    const collapseKey = isRtl.value ? 'ArrowRight' : 'ArrowLeft';
    const expandable = !!item.children;
    const isExpanded = root.opened.value.has(idOf(item));
    const selectableNode = props.selectable && (!item.children || !['leaf', 'single-leaf'].includes(props.selectStrategy));
    const toggleExpand = () => {
      checkChildren(item);
      root.open(idOf(item), !isExpanded, e);
    };
    const toggleSelect = () => root.select(idOf(item), root.selected.value.get(idOf(item)) !== 'on', e);
    if (e.key === 'Enter') {
      e.preventDefault();
      if (props.activatable) root.activate(idOf(item), !root.activated.value.has(idOf(item)), e);
      if (expandable) toggleExpand();else if (selectableNode) toggleSelect();
    } else if (e.key === ' ') {
      e.preventDefault();
      if (selectableNode) toggleSelect();else if (expandable) toggleExpand();
    } else if (e.key === expandKey) {
      e.preventDefault();
      if (expandable && !isExpanded) {
        checkChildren(item);
        root.open(idOf(item), true, e);
      } else if (isExpanded) {
        focusFirstChild(el);
      }
    } else if (e.key === collapseKey) {
      e.preventDefault();
      if (expandable && isExpanded) {
        root.open(idOf(item), false, e);
      } else {
        focusParent(el);
      }
    } else if (e.key === '*') {
      e.preventDefault();
      for (const sibling of props.items ?? []) {
        if (!sibling.children) continue;
        checkChildren(sibling);
        root.open(idOf(sibling), true, e);
      }
    }
  }
  return {
    onKeydown
  };
}
//# sourceMappingURL=useTreeviewKeyboard.js.map