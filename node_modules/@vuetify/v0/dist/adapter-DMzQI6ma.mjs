import { clamp, isArray, isNaN, isNullOrUndefined, isNumber, isObject, isString, range } from "./utilities/index.mjs";
import { i as useContext, t as createTrinity } from "./createTrinity-DJROWgXU.mjs";
import { t as toArray } from "./toArray-DCZRopC6.mjs";
import { computed, isRef, shallowRef, toRef, toValue } from "vue";
//#region src/composables/createFilter/index.ts
/**
* @module createFilter
*
* @see https://0.vuetifyjs.com/composables/data/create-filter
*
* @remarks
* Reactive array filtering composable with multiple filter modes.
*
* Key features:
* - Four filter modes: some, every, union, intersection
* - Case-insensitive filtering
* - Custom filter functions
* - Reactive updates
* - Context-based DI support
* - Perfect for search, multi-criteria filtering
*
* Filters arrays based on query strings with configurable matching strategies.
*
* @example
* ```ts
* import { createFilter } from '@vuetify/v0'
*
* const filter = createFilter({ mode: 'some' })
* const { items } = filter.apply('an', ['apple', 'banana', 'cherry'])
* console.log(items.value) // ['banana']
* ```
*/
function defaultFilter(query, item, keys, mode = "some") {
	const queries = (/* @__PURE__ */ toArray(query)).map((q) => String(q).toLowerCase());
	const stringValues = (/* @__PURE__ */ isObject(item) ? keys?.length ? keys.map((k) => item[k]) : Object.values(item) : [item]).map((v) => String(v).toLowerCase());
	if (mode === "some") return queries.some((q) => stringValues.some((val) => val.includes(q)));
	if (mode === "every") return queries.every((q) => stringValues.every((val) => val.includes(q)));
	const joined = stringValues.join("\0");
	if (mode === "union") return queries.some((q) => joined.includes(q));
	if (mode === "intersection") return queries.every((q) => joined.includes(q));
	return false;
}
/**
* Creates a filter context with pre-configured options.
*
* @param options The filter options
* @template Z The type of the items
* @template E The type of the filter context
* @returns A filter context
*
* @see https://0.vuetifyjs.com/composables/data/create-filter
*
* @example
* ```ts
* import { createFilter } from '@vuetify/v0'
*
* const filter = createFilter({
*   mode: 'intersection',
*   keys: ['name', 'email'],
* })
*
* const { items } = filter.apply(query, users)
* ```
*/
function createFilter(options = {}) {
	const { customFilter, keys, mode = "some" } = options;
	const filterFunction = customFilter ?? ((q, i) => defaultFilter(q, i, toValue(keys), mode));
	const query = shallowRef("");
	function apply(_query, items) {
		return { items: computed(() => {
			const q = toValue(_query);
			query.value = q;
			const queries = (/* @__PURE__ */ toArray(q)).filter((q) => String(q).trim());
			if (queries.length === 0) return toValue(items);
			const queryParam = queries.length === 1 ? queries[0] : queries;
			return toValue(items).filter((item) => filterFunction(queryParam, item));
		}) };
	}
	return {
		mode,
		keys,
		customFilter,
		query,
		apply
	};
}
/**
* Creates a filter context with dependency injection support.
*
* @param options The filter context options
* @template Z The type of the items
* @template E The type of the filter context
* @returns A trinity tuple: [useContext, provideContext, defaultContext]
*
* @see https://0.vuetifyjs.com/composables/data/create-filter
*
* @example
* ```ts
* import { createFilterContext } from '@vuetify/v0'
*
* export const [useSearchFilter, provideSearchFilter, searchFilter] = createFilterContext({
*   namespace: 'app:search',
*   mode: 'union',
*   keys: ['title', 'description'],
* })
*
* // In parent component
* provideSearchFilter()
*
* // In child component
* const filter = useSearchFilter()
* const { items } = filter.apply(query, products)
* ```
*/
function createFilterContext(_options = {}) {
	const { namespace = "v0:filter", ...options } = _options;
	const context = createFilter(options);
	return createTrinity(namespace, context);
}
/**
* Returns the current filter context from dependency injection.
*
* @param namespace The namespace for the filter context. Defaults to `'v0:filter'`.
* @template Z The type of the items.
* @template E The type of the filter context.
* @returns The current filter context.
*
* @see https://0.vuetifyjs.com/composables/data/create-filter
*
* @example
* ```vue
* <script setup lang="ts">
*   import { useFilter } from '@vuetify/v0'
*
*   const filter = useFilter()
*   const { items } = filter.apply(query, products)
* <\/script>
* ```
*/
function useFilter(namespace = "v0:filter") {
	return useContext(namespace);
}
//#endregion
//#region src/composables/createPagination/index.ts
/**
* @module createPagination
*
* @see https://0.vuetifyjs.com/composables/data/create-pagination
*
* @remarks
* Lightweight pagination composable for navigating through pages.
*
* Key features:
* - No registry overhead - just a bounded integer
* - Direct ref support for v-model compatibility
* - Navigation methods: next, prev, first, last
* - Computed visible items with ellipsis
* - Trinity pattern for dependency injection
*
* Unlike registry-based composables, pagination tracks a single number
* within a range, making it efficient for large page counts.
*
* @example
* ```ts
* import { createPagination } from '@vuetify/v0'
*
* const pagination = createPagination({ size: 100, itemsPerPage: 10 })
* pagination.next()
* console.log(pagination.page.value) // 2
* ```
*/
/**
* Creates a pagination instance.
*
* @param options The options for the pagination instance.
* @returns A pagination context with navigation methods.
*
* @example
* ```ts
* import { createPagination } from '@vuetify/v0'
*
* // Basic usage
* const pagination = createPagination({ size: 100 })
* pagination.next()
* pagination.items.value // [{ type: 'page', value: 1 }, { type: 'page', value: 2 }, ...]
*
* // With v-model (pass a ref)
* const page = ref(1)
* const pagination = createPagination({ page, size: 100 })
* // Mutating pagination.page or the passed ref syncs both
* ```
*/
function createPagination(_options = {}) {
	const { page: _page = 1, itemsPerPage: _itemsPerPage = 10, size: _size = 0, visible: _visible = 7, ellipsis = "..." } = _options;
	const _raw = isRef(_page) ? _page : shallowRef(_page);
	const pages = computed(() => {
		const size = toValue(_size);
		const perPage = toValue(_itemsPerPage);
		if (size <= 0 || /* @__PURE__ */ isNaN(size)) return 0;
		return Math.ceil(size / perPage);
	});
	const page = computed({
		get: () => {
			const p = pages.value;
			return p > 0 ? /* @__PURE__ */ clamp(_raw.value, 1, p) : _raw.value;
		},
		set: (v) => {
			_raw.value = v;
		}
	});
	function first() {
		page.value = 1;
	}
	function last() {
		page.value = Math.max(1, pages.value);
	}
	function next() {
		if (page.value < pages.value) page.value++;
	}
	function prev() {
		if (page.value > 1) page.value--;
	}
	function select(value) {
		if (value < 1) page.value = 1;
		else if (value > pages.value) page.value = Math.max(1, pages.value);
		else page.value = value;
	}
	const isFirst = toRef(() => page.value <= 1);
	const isLast = toRef(() => page.value >= pages.value);
	const pageStart = toRef(() => (page.value - 1) * toValue(_itemsPerPage));
	const pageStop = toRef(() => Math.min(pageStart.value + toValue(_itemsPerPage), toValue(_size)));
	function toPage(value) {
		return {
			type: "page",
			value
		};
	}
	function toEllipsis() {
		return ellipsis === false ? false : {
			type: "ellipsis",
			value: ellipsis
		};
	}
	function filter(array) {
		return array.filter((item) => item !== false);
	}
	return {
		page,
		ellipsis,
		items: computed(() => {
			const pageCount = pages.value;
			const visible = toValue(_visible);
			const current = page.value;
			if (pageCount <= 0 || /* @__PURE__ */ isNaN(pageCount) || pageCount > Number.MAX_SAFE_INTEGER) return [];
			if (visible <= 0) return [];
			if (visible <= 2) return [toPage(current)];
			if (pageCount <= visible) return (/* @__PURE__ */ range(pageCount, 1)).map(toPage);
			if (visible === 3) {
				const mid = current <= 1 ? 2 : current >= pageCount ? pageCount - 1 : current;
				return [
					toPage(1),
					toPage(mid),
					toPage(pageCount)
				];
			}
			const boundary = visible - 2;
			const middle = visible - 4;
			if (middle <= 0) {
				if (current <= boundary) return filter([
					...(/* @__PURE__ */ range(boundary, 1)).map(toPage),
					toEllipsis(),
					toPage(pageCount)
				]);
				if (current > pageCount - boundary) return filter([
					toPage(1),
					toEllipsis(),
					...(/* @__PURE__ */ range(boundary, pageCount - boundary + 1)).map(toPage)
				]);
				return current <= Math.ceil(pageCount / 2) ? filter([
					toPage(1),
					toPage(current),
					toEllipsis(),
					toPage(pageCount)
				]) : filter([
					toPage(1),
					toEllipsis(),
					toPage(current),
					toPage(pageCount)
				]);
			}
			const leftThreshold = boundary - 1;
			const rightThreshold = pageCount - boundary + 2;
			if (current <= leftThreshold) return filter([
				...(/* @__PURE__ */ range(boundary, 1)).map(toPage),
				toEllipsis(),
				toPage(pageCount)
			]);
			else if (current >= rightThreshold) return filter([
				toPage(1),
				toEllipsis(),
				...(/* @__PURE__ */ range(boundary, pageCount - boundary + 1)).map(toPage)
			]);
			else {
				const start = current - Math.floor(middle / 2);
				return filter([
					toPage(1),
					toEllipsis(),
					...(/* @__PURE__ */ range(middle, start)).map(toPage),
					toEllipsis(),
					toPage(pageCount)
				]);
			}
		}),
		pageStart,
		pageStop,
		isFirst,
		isLast,
		first,
		last,
		next,
		prev,
		select,
		get itemsPerPage() {
			return toValue(_itemsPerPage);
		},
		get size() {
			return toValue(_size);
		},
		get pages() {
			return pages.value;
		}
	};
}
/**
* Creates a pagination context for dependency injection.
*
* @param options The options including namespace.
* @returns A trinity: [usePagination, providePagination, defaultContext]
*
* @example
* ```ts
* // With default namespace 'v0:pagination'
* const [usePagination, providePaginationContext] = createPaginationContext({ size: 50 })
*
* // Or with custom namespace
* const [usePagination, providePaginationContext] = createPaginationContext({
*   namespace: 'my-pagination',
*   size: 50,
* })
*
* // Parent component
* providePaginationContext()
*
* // Child component
* const pagination = usePagination()
* pagination.next()
* ```
*/
function createPaginationContext(_options = {}) {
	const { namespace = "v0:pagination", ...options } = _options;
	const context = createPagination(options);
	return createTrinity(namespace, context);
}
/**
* Returns the current pagination instance from context.
*
* @param namespace The namespace. @default 'v0:pagination'
* @returns The pagination context.
*
* @example
* ```vue
* <script setup lang="ts">
*  import { usePagination } from '@vuetify/v0'
*
*  const pagination = usePagination()
* <\/script>
*
* <template>
*   <button @click="pagination.prev()" :disabled="pagination.isFirst.value">Prev</button>
*   <button @click="pagination.next()" :disabled="pagination.isLast.value">Next</button>
* </template>
* ```
*/
function usePagination(namespace = "v0:pagination") {
	return useContext(namespace);
}
//#endregion
//#region src/composables/createDataTable/adapters/adapter.ts
/**
* @module createDataTable/adapters
*
* @remarks
* Defines the adapter interface and abstract base class for data table
* pipeline strategies. Adapters control how raw items are filtered, sorted,
* and sliced into visible items.
*
* The abstract DataTableAdapter provides shared filter and sort pipelines
* used by client-side adapters. Server adapters that delegate pipeline
* operations externally subclass DataTableAdapter directly.
*/
function getNestedValue(obj, parts) {
	let result = obj;
	for (const k of parts) {
		if (/* @__PURE__ */ isNullOrUndefined(result)) return void 0;
		result = result[k];
	}
	return result;
}
function compareValues(a, b, collator) {
	if (a === b) return 0;
	const aNil = /* @__PURE__ */ isNullOrUndefined(a);
	const bNil = /* @__PURE__ */ isNullOrUndefined(b);
	if (aNil && bNil) return 0;
	if (aNil) return 1;
	if (bNil) return -1;
	if (/* @__PURE__ */ isString(a) && /* @__PURE__ */ isString(b)) return collator ? collator.compare(a, b) : a.localeCompare(b);
	if (/* @__PURE__ */ isNumber(a) && /* @__PURE__ */ isNumber(b)) {
		if (/* @__PURE__ */ isNaN(a)) return 1;
		if (/* @__PURE__ */ isNaN(b)) return -1;
		return a - b;
	}
	const sa = String(a);
	const sb = String(b);
	return collator ? collator.compare(sa, sb) : sa.localeCompare(sb);
}
var DataTableAdapter = class {
	/** Create the filter pipeline stage */
	filter(context) {
		const filter = createFilter({
			...context.filterOptions,
			keys: context.filterableKeys,
			customFilter: context.filterOptions.customFilter ?? ((query, item) => {
				const columnFilters = toValue(context.customColumnFilters);
				const keys = toValue(context.filterableKeys);
				if (!/* @__PURE__ */ isObject(item)) return false;
				const q = String(/* @__PURE__ */ isArray(query) ? query[0] : query).toLowerCase();
				if (!q) return true;
				const obj = item;
				for (const key of keys) {
					const customFn = columnFilters[key];
					if (customFn) {
						if (customFn(obj[key], q)) return true;
					} else {
						const val = obj[key];
						if (!/* @__PURE__ */ isNullOrUndefined(val) && String(val).toLowerCase().includes(q)) return true;
					}
				}
				return false;
			})
		});
		const allItems = toRef(() => toValue(context.items));
		const { items: filtered } = filter.apply(context.search, allItems);
		return {
			allItems,
			filteredItems: filtered
		};
	}
	/** Create the sort pipeline stage */
	sort(filteredItems, sortBy, locale, customSorts) {
		return computed(() => {
			const entries = sortBy.value;
			if (entries.length === 0) return filteredItems.value;
			const sorts = toValue(customSorts) ?? {};
			const collator = new Intl.Collator(locale?.value);
			const resolved = entries.map(({ key, direction }) => ({
				parts: key.split("."),
				direction,
				custom: sorts[key]
			}));
			return filteredItems.value.toSorted((a, b) => {
				for (const { parts, direction, custom } of resolved) {
					const aVal = parts.length === 1 ? a[parts[0]] : getNestedValue(a, parts);
					const bVal = parts.length === 1 ? b[parts[0]] : getNestedValue(b, parts);
					const cmp = custom ? custom(aVal, bVal) : compareValues(aVal, bVal, collator);
					if (cmp !== 0) return direction === "desc" ? -cmp : cmp;
				}
				return 0;
			});
		});
	}
};
//#endregion
export { createFilter as a, usePagination as i, createPagination as n, createFilterContext as o, createPaginationContext as r, useFilter as s, DataTableAdapter as t };
