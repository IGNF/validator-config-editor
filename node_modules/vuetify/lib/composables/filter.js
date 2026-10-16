/* eslint-disable max-statements */
/* eslint-disable no-labels */

// Utilities
import { computed, shallowRef, unref, watchEffect } from 'vue';
import { findMatchRanges, getPropertyFromItem, isBoolean, isFunction, isNullOrUndefined, isNumber, isObject, isString, isUndefined, propsFactory, wrapInArray } from "../util/index.js"; // Types
/**
 * - boolean: match without highlight
 * - number: single match (index), length already known
 * - []: single match (start, end)
 * - [][]: multiple matches (start, end), shouldn't overlap
 */
// Composables
export function createDefaultFilter(ignoreAccents) {
  return (value, query) => {
    if (isNullOrUndefined(value) || isNullOrUndefined(query)) return -1;
    if (!query.length) return 0;
    const ranges = findMatchRanges(value.toString(), query.toString(), {
      ignoreCase: true,
      ignoreAccents,
      matchAll: true
    });
    return ranges.length ? ranges : -1;
  };
}
export const defaultFilter = createDefaultFilter();
function normaliseMatch(match, query) {
  if (isNullOrUndefined(match) || isBoolean(match) || match === -1) return;
  if (isNumber(match)) return [[match, match + query.length]];
  if (Array.isArray(match[0])) return match;
  return [match];
}
export const makeFilterProps = propsFactory({
  customFilter: Function,
  customKeyFilter: Object,
  filterKeys: [Array, String],
  filterMode: {
    type: String,
    default: 'intersection'
  },
  ignoreAccents: [Boolean, String],
  noFilter: Boolean
}, 'filter');

// eslint-disable-next-line complexity
export function filterItems(items, query, options) {
  const array = [];
  // always ensure we fall back to a functioning filter
  const filter = options?.default ?? createDefaultFilter(options?.ignoreAccents);
  const keys = options?.filterKeys ? wrapInArray(options.filterKeys) : false;
  const customFiltersLength = Object.keys(options?.customKeyFilter ?? {}).length;
  if (!items?.length) return array;
  let lookAheadItems = [];
  loop: for (let i = 0; i < items.length; i++) {
    const [item, transformed = item] = wrapInArray(items[i]);
    const customMatches = {};
    const defaultMatches = {};
    let match = -1;
    if ((query || customFiltersLength > 0) && !options?.noFilter) {
      let hasOnlyCustomFilters = false;
      if (isObject(item)) {
        if (item.type === 'divider' || item.type === 'subheader') {
          if (lookAheadItems.at(-1)?.type !== 'divider' || item.type !== 'subheader') {
            // clear unless, divider appears before subheader
            lookAheadItems = [];
          }
          lookAheadItems.push({
            index: i,
            matches: {},
            type: item.type
          });
          continue;
        }
        const filterKeys = keys || Object.keys(transformed);
        hasOnlyCustomFilters = filterKeys.length === customFiltersLength;
        for (const key of filterKeys) {
          const value = getPropertyFromItem(transformed, key);
          const keyFilter = options?.customKeyFilter?.[key];
          match = keyFilter ? keyFilter(value, query, item) : filter(value, query, item);
          if (match !== -1 && match !== false) {
            if (keyFilter) customMatches[key] = normaliseMatch(match, query);else defaultMatches[key] = normaliseMatch(match, query);
          } else if (options?.filterMode === 'every') {
            continue loop;
          }
        }
      } else {
        match = filter(item, query, item);
        if (match !== -1 && match !== false) {
          defaultMatches.title = normaliseMatch(match, query);
        }
      }
      const defaultMatchesLength = Object.keys(defaultMatches).length;
      const customMatchesLength = Object.keys(customMatches).length;
      if (!defaultMatchesLength && !customMatchesLength) continue;
      if (options?.filterMode === 'union' && customMatchesLength !== customFiltersLength && !defaultMatchesLength) continue;
      if (options?.filterMode === 'intersection' && (customMatchesLength !== customFiltersLength || !defaultMatchesLength && customFiltersLength > 0 && !hasOnlyCustomFilters)) continue;
    }
    if (lookAheadItems.length) {
      array.push(...lookAheadItems);
      lookAheadItems = [];
    }
    array.push({
      index: i,
      matches: {
        ...defaultMatches,
        ...customMatches
      }
    });
  }
  return array;
}
export function useFilter(props, items, query, options) {
  const filteredItems = shallowRef([]);
  const filteredMatches = shallowRef(new Map());
  const transformedItems = computed(() => options?.transform ? unref(items).map(item => [item, options.transform(item)]) : unref(items));
  watchEffect(() => {
    const _query = isFunction(query) ? query() : unref(query);
    const strQuery = !isString(_query) && !isNumber(_query) ? '' : String(_query);
    const results = filterItems(transformedItems.value, strQuery, {
      customKeyFilter: {
        ...props.customKeyFilter,
        ...unref(options?.customKeyFilter)
      },
      default: props.customFilter,
      filterKeys: props.filterKeys,
      filterMode: props.filterMode,
      ignoreAccents: props.ignoreAccents,
      noFilter: props.noFilter
    });
    const originalItems = unref(items);
    const _filteredItems = [];
    const _filteredMatches = new Map();
    results.forEach(({
      index,
      matches
    }) => {
      const item = originalItems[index];
      _filteredItems.push(item);
      if (!isUndefined(item.value)) {
        _filteredMatches.set(item.value, matches);
      }
    });
    filteredItems.value = _filteredItems;
    filteredMatches.value = _filteredMatches;
  });
  function getMatches(item) {
    return filteredMatches.value.get(item.value);
  }
  return {
    filteredItems,
    filteredMatches,
    getMatches
  };
}
//# sourceMappingURL=filter.js.map