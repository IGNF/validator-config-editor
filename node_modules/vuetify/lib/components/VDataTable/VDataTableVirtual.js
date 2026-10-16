import { mergeProps as _mergeProps, createVNode as _createVNode, createElementVNode as _createElementVNode, Fragment as _Fragment, normalizeProps as _normalizeProps, guardReactiveProps as _guardReactiveProps } from "vue";
// Components
import { makeDataTableProps } from "./VDataTable.js";
import { VDataTableHeaders } from "./VDataTableHeaders.js";
import { VDataTableRow } from "./VDataTableRow.js";
import { VDataTableRows } from "./VDataTableRows.js";
import { VTable } from "../VTable/index.js";
import { VVirtualScrollItem } from "../VVirtualScroll/VVirtualScrollItem.js"; // Composables
import { provideExpanded } from "./composables/expand.js";
import { createGroupBy, makeDataTableGroupProps, provideGroupBy, useGroupedItems, useOpenAllGroups } from "./composables/group.js";
import { createHeaders } from "./composables/headers.js";
import { useDataTableItems } from "./composables/items.js";
import { useOptions } from "./composables/options.js";
import { provideSelection } from "./composables/select.js";
import { createSort, provideSort, useSortedItems } from "./composables/sort.js";
import { provideDefaults } from "../../composables/defaults.js";
import { makeFilterProps, useFilter } from "../../composables/filter.js";
import { MaybeTransition } from "../../composables/transition.js";
import { makeVirtualProps, useVirtual } from "../../composables/virtual.js"; // Utilities
import { cloneVNode, computed, Fragment, isVNode, nextTick, shallowRef, toRef, toRefs, watch } from 'vue';
import { convertToUnit, genericComponent, omit, pickWithRest, propsFactory, useRender } from "../../util/index.js"; // Types
export const makeVDataTableVirtualProps = propsFactory({
  ...omit(makeDataTableProps(), ['hideDefaultFooter']),
  ...makeDataTableGroupProps(),
  ...makeVirtualProps(),
  ...makeFilterProps()
}, 'VDataTableVirtual');
function elementNodes(nodes) {
  return (nodes ?? []).flatMap(node => Array.isArray(node) ? elementNodes(node) : !isVNode(node) ? [] : node.type === Fragment ? elementNodes(node.children) : typeof node.type === 'symbol' ? [] : [node]);
}
export const VDataTableVirtual = genericComponent()({
  name: 'VDataTableVirtual',
  props: makeVDataTableVirtualProps(),
  emits: {
    'update:modelValue': value => true,
    'update:sortBy': value => true,
    'update:options': value => true,
    'update:groupBy': value => true,
    'update:expanded': value => true,
    'update:opened': value => true
  },
  setup(props, {
    attrs,
    slots
  }) {
    const {
      groupBy,
      opened,
      openAll,
      groupKey
    } = createGroupBy(props);
    const {
      initialSortOrder,
      sortBy,
      multiSort,
      mustSort
    } = createSort(props);
    const {
      disableSort
    } = toRefs(props);
    const {
      columns,
      headers,
      filterFunctions,
      sortFunctions,
      sortRawFunctions
    } = createHeaders(props, {
      groupBy,
      showSelect: toRef(() => props.showSelect),
      showExpand: toRef(() => props.showExpand)
    });
    const {
      items
    } = useDataTableItems(props, columns);
    const search = toRef(() => props.search);
    const {
      filteredItems,
      getMatches
    } = useFilter(props, items, search, {
      transform: item => item.columns,
      customKeyFilter: filterFunctions
    });
    const {
      toggleSort
    } = provideSort({
      initialSortOrder,
      sortBy,
      multiSort,
      mustSort
    });
    const {
      sortByWithGroups,
      opened: openedGroups,
      extractRows,
      isGroupOpen,
      toggleGroup
    } = provideGroupBy({
      groupBy,
      sortBy,
      disableSort,
      opened
    });
    const {
      sortedItems
    } = useSortedItems(props, filteredItems, sortByWithGroups, {
      transform: item => ({
        ...item.raw,
        ...item.columns
      }),
      sortFunctions,
      sortRawFunctions
    });
    useOpenAllGroups(openedGroups, openAll, sortedItems, groupBy, groupKey);
    const {
      flatItems
    } = useGroupedItems(sortedItems, groupBy, openedGroups, () => !!slots['group-summary'], isGroupOpen, groupKey);
    const allItems = computed(() => extractRows(flatItems.value));
    const {
      isSelected,
      select,
      selectAll,
      toggleSelect,
      someSelected,
      allSelected
    } = provideSelection(props, {
      allItems,
      currentPage: allItems
    });
    const {
      expanded,
      isExpanded,
      toggleExpand
    } = provideExpanded(props);
    const {
      containerRef,
      markerRef,
      paddingTop,
      paddingBottom,
      computedItems,
      handleItemResize,
      handleScroll,
      handleScrollend,
      calculateVisibleItems,
      scrollToIndex
    } = useVirtual(props, flatItems);
    const displayItems = computed(() => computedItems.value.map(item => ({
      ...item.raw,
      virtualIndex: item.index
    })));

    // one virtual size per index = item row + optional expanded rows
    const rowHeights = new Map();
    const expandedHeights = new Map();
    function updateSize(index) {
      const expanded = expandedHeights.get(index)?.reduce((sum, height) => sum + (height || 0), 0) ?? 0;
      handleItemResize(index, (rowHeights.get(index) ?? 0) + expanded);
    }
    function setRowHeight(index, height) {
      rowHeights.set(index, height);
      updateSize(index);
    }
    function setExpandedHeight(index, row, height) {
      const heights = expandedHeights.get(index) ?? [];
      heights[row] = height;
      expandedHeights.set(index, heights);
      updateSize(index);
    }
    function trimExpandedHeights(index, count) {
      const heights = expandedHeights.get(index);
      if (!heights || heights.length <= count) return;
      heights.length = count;
      updateSize(index);
    }
    watch(expanded, () => {
      if (!slots['expanded-row']) return;
      for (const index of [...expandedHeights.keys()]) {
        const item = flatItems.value[index];
        if (item?.type === 'item' && isExpanded(item)) continue;
        expandedHeights.delete(index);
        updateSize(index);
      }
    });
    watch(flatItems, () => {
      rowHeights.clear();
      expandedHeights.clear();
    });
    useOptions({
      sortBy,
      page: shallowRef(1),
      itemsPerPage: shallowRef(-1),
      groupBy,
      search
    });
    provideDefaults({
      VDataTableRows: {
        hideNoData: toRef(() => props.hideNoData),
        noDataText: toRef(() => props.noDataText),
        loading: toRef(() => props.loading),
        loadingText: toRef(() => props.loadingText)
      }
    });
    const slotProps = computed(() => ({
      itemsLength: allItems.value.length,
      sortBy: sortBy.value,
      toggleSort,
      someSelected: someSelected.value,
      allSelected: allSelected.value,
      isSelected,
      select,
      selectAll,
      toggleSelect,
      isExpanded,
      toggleExpand,
      isGroupOpen,
      toggleGroup,
      items: allItems.value.map(item => item.raw),
      internalItems: allItems.value,
      groupedItems: flatItems.value,
      columns: columns.value,
      headers: headers.value
    }));
    useRender(() => {
      const dataTableHeadersProps = VDataTableHeaders.filterProps(omit(props, ['multiSort']));
      const dataTableRowsProps = VDataTableRows.filterProps(props);
      const tableProps = VTable.filterProps(props);
      const [tableAttrs] = pickWithRest(attrs, [/^aria-label/]);
      return _createVNode(VTable, _mergeProps({
        "class": ['v-data-table', {
          'v-data-table--loading': props.loading
        }, props.class],
        "style": props.style
      }, tableProps, {
        "fixedHeader": props.fixedHeader || props.sticky
      }), {
        top: () => slots.top?.(slotProps.value),
        wrapper: () => _createElementVNode("div", {
          "ref": containerRef,
          "onScrollPassive": handleScroll,
          "onScrollend": handleScrollend,
          "class": "v-table__wrapper",
          "style": {
            height: convertToUnit(props.height)
          }
        }, [_createElementVNode("table", _normalizeProps(_guardReactiveProps(tableAttrs)), [slots.caption?.(), slots.colgroup?.(slotProps.value), !props.hideDefaultHeader && _createElementVNode("thead", {
          "key": "thead"
        }, [_createVNode(VDataTableHeaders, _mergeProps(dataTableHeadersProps, {
          "multiSort": !!props.multiSort
        }), slots)]), slots.thead?.(slotProps.value), !props.hideDefaultBody && _createElementVNode("tbody", {
          "key": "tbody"
        }, [_createElementVNode("tr", {
          "ref": markerRef,
          "style": {
            height: convertToUnit(paddingTop.value),
            border: 0
          }
        }, [_createElementVNode("td", {
          "colspan": columns.value.length,
          "style": {
            height: 0,
            border: 0
          }
        }, null)]), slots['body.prepend']?.(slotProps.value), _createVNode(VDataTableRows, _mergeProps(attrs, dataTableRowsProps, {
          "items": displayItems.value,
          "getMatches": getMatches
        }), {
          ...omit(slots, ['expanded', 'expanded-row']),
          item: itemSlotProps => {
            const {
              props: rowProps,
              ...itemSlot
            } = itemSlotProps;
            const index = itemSlotProps.internalItem.virtualIndex ?? itemSlotProps.internalItem.index;
            const itemExpanded = isExpanded(itemSlotProps.internalItem);
            const expandedRows = props.showExpand && itemExpanded && slots['expanded-row'] ? elementNodes(slots['expanded-row'](itemSlot)) : [];

            // rows that stay never resize, so a shrunk slot reports nothing
            if (slots['expanded-row'] && (expandedHeights.get(index)?.length ?? 0) > expandedRows.length) {
              nextTick(() => trimExpandedHeights(index, expandedRows.length));
            }
            return _createElementVNode(_Fragment, null, [_createVNode(VVirtualScrollItem, {
              "key": index,
              "renderless": true,
              "onUpdate:height": height => setRowHeight(index, height)
            }, {
              default: ({
                itemRef
              }) => slots.item?.({
                ...itemSlotProps,
                itemRef
              }) ?? _createVNode(VDataTableRow, _mergeProps(rowProps, {
                "ref": itemRef,
                "index": itemSlotProps.index,
                "getMatches": getMatches
              }), slots)
            }), props.showExpand && (slots['expanded-row'] ? expandedRows.map((node, row) => _createVNode(VVirtualScrollItem, {
              "key": `${index}-expanded-${row}`,
              "renderless": true,
              "onUpdate:height": height => setExpandedHeight(index, row, height)
            }, {
              default: ({
                itemRef
              }) => cloneVNode(node, {
                ref: itemRef
              }, true)
            })) : slots.expanded && _createVNode(VVirtualScrollItem, {
              "key": `${index}-expanded`,
              "renderless": true,
              "onUpdate:height": height => setExpandedHeight(index, 0, height)
            }, {
              default: ({
                itemRef
              }) => _createElementVNode("tr", {
                "class": "v-data-table__tr--expanded",
                "ref": itemRef
              }, [_createElementVNode("td", {
                "colspan": columns.value.length
              }, [props.expandTransition ? _createVNode(MaybeTransition, {
                "transition": props.expandTransition
              }, {
                default: () => [itemExpanded ? _createElementVNode("div", null, [slots.expanded(itemSlot)]) : null]
              }) // bypass <Transition> to avoid flash when expand-strategy=single
              : itemExpanded && _createElementVNode("div", null, [slots.expanded(itemSlot)])])])
            }))]);
          }
        }), slots['body.append']?.(slotProps.value), _createElementVNode("tr", {
          "style": {
            height: convertToUnit(paddingBottom.value),
            border: 0
          }
        }, [_createElementVNode("td", {
          "colspan": columns.value.length,
          "style": {
            height: 0,
            border: 0
          }
        }, null)])]), slots.tbody?.(slotProps.value), slots.tfoot?.(slotProps.value)])]),
        bottom: () => slots.bottom?.(slotProps.value)
      });
    });
    return {
      calculateVisibleItems,
      scrollToIndex
    };
  }
});
//# sourceMappingURL=VDataTableVirtual.js.map