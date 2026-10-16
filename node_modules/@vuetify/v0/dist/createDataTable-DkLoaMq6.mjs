import { isNullOrUndefined } from "./utilities/index.mjs";
import { i as useContext, t as createTrinity } from "./createTrinity-DJROWgXU.mjs";
import { t as createRegistry } from "./createRegistry-COW_AjH1.mjs";
import { a as useLocale } from "./useLocale-cS3wOsyK.mjs";
import { i as useProxyRegistry, t as createGroup } from "./createGroup-If8FlygQ.mjs";
import { t as ClientDataTableAdapter } from "./v0-DoHWpAZn.mjs";
import { computed, shallowReactive, shallowReadonly, shallowRef, toRef, toValue, watch } from "vue";
//#region src/composables/createDataTable/columns.ts
/**
* Recursively extract leaf columns (those without children).
*
* @param columns Column tree to extract leaves from
* @returns Flat array of leaf columns
*/
/* #__NO_SIDE_EFFECTS__ */
function extractLeaves(columns) {
	const leaves = [];
	for (const col of columns) if (col.children?.length) leaves.push(.../* @__PURE__ */ extractLeaves(col.children));
	else leaves.push(col);
	return leaves;
}
/**
* Compute the maximum nesting depth of a column tree (0 = flat).
*
* @param columns Column tree to measure
* @returns Maximum nesting depth
*/
/* #__NO_SIDE_EFFECTS__ */
function computeDepth(columns) {
	let max = 0;
	for (const col of columns) if (col.children?.length) max = Math.max(max, 1 + /* @__PURE__ */ computeDepth(col.children));
	return max;
}
/**
* Resolve a recursive column tree into a 2D header grid.
*
* Each cell has colspan (number of leaf descendants) and rowspan
* (how many rows a leaf spans when it doesn't fill all depth levels).
*
* @param columns Column tree to resolve
* @returns 2D array of header cells with colspan/rowspan
*/
/* #__NO_SIDE_EFFECTS__ */
function resolveHeaders(columns) {
	if (columns.length === 0) return [];
	const maxDepth = /* @__PURE__ */ computeDepth(columns);
	const rows = Array.from({ length: maxDepth + 1 }, () => []);
	function walk(cols, depth) {
		for (const col of cols) if (col.children?.length) {
			const leaves = /* @__PURE__ */ extractLeaves(col.children);
			rows[depth].push({
				id: col.id,
				title: col.title ?? "",
				colspan: leaves.length,
				rowspan: 1,
				depth
			});
			walk(col.children, depth + 1);
		} else rows[depth].push({
			id: col.id,
			title: col.title ?? "",
			colspan: 1,
			rowspan: maxDepth - depth + 1,
			depth
		});
	}
	walk(columns, 0);
	return rows;
}
//#endregion
//#region src/composables/createDataTable/index.ts
/**
* @module createDataTable
*
* @see https://0.vuetifyjs.com/composables/data/create-data-table
*
* @remarks
* Composable data table that composes existing v0 primitives rather than
* reimplementing their logic. Uses createGroup's tri-state for sort direction
* and delegates the data pipeline (filter, sort, paginate) to an adapter.
*
* Rows and columns are both managed via internal registries. Call
* `table.columns.onboard([...])` / `table.columns.register({...})` to add
* columns and `table.onboard([...])` / `table.register({...})` for rows.
* Row identity is the ticket id (caller-supplied or auto-generated); column
* identity is the caller-supplied `id` (required — no auto-generation).
* The row registry is non-reactive: iterate rows via `items` / `allItems`
* and update a row via `upsert(id, { value })` — never mutate a ticket's
* value in place or iterate raw `values()` in templates or computeds.
*
* Key features:
* - Adapter pattern for pipeline strategy (client, server, virtual)
* - Sort via createGroup tri-state: selected=asc, mixed=desc, unselected=none
* - Selection strategies: single, page, all
* - Per-column custom sort/filter functions
* - Row selectability control via itemSelectable
* - Sort options: mandate, firstSortOrder
* - Row selection via lightweight Set (not registry-based)
* - Trinity pattern for dependency injection
*
* @example
* ```ts
* import { createDataTable } from '@vuetify/v0'
*
* const table = createDataTable<User>()
*
* table.columns.onboard([
*   { id: 'name', title: 'Name', sortable: true },
*   { id: 'email', title: 'Email', filterable: true },
* ])
*
* table.onboard([
*   { id: 1, value: { id: 1, name: 'Alice', email: 'alice@test.com' } },
*   { id: 2, value: { id: 2, name: 'Bob', email: 'bob@test.com' } },
* ])
*
* table.sort.toggle('name')
* ```
*/
function recordId(row) {
	return row.id;
}
/**
* Creates a data table instance with sort controls, selection, and an
* adapter-driven data pipeline.
*
* Rows and columns are both managed via internal registries. Use
* `table.columns.register({ id, ... })` / `table.columns.onboard([...])` to
* add columns and `table.register({ id, value })` / `table.onboard([...])`
* for rows. Removing entries from the column registry reactively updates
* `leaves`, `headers`, the sort group, and the filter pipeline.
*
* Must be called inside a component `setup()` or a Vue effect scope.
* Calling at module scope in SSR environments causes request state leakage.
*
* @param options Data table options (all optional)
* @returns Data table context with pipeline stages, controls, and registry surface
*
* @example
* ```ts
* import { createDataTable } from '@vuetify/v0'
*
* const table = createDataTable<User>()
*
* table.columns.onboard([
*   { id: 'name', title: 'Name', sortable: true, filterable: true },
*   { id: 'email', title: 'Email', sortable: true, filterable: true },
*   { id: 'age', title: 'Age', sortable: true },
* ])
*
* table.onboard(users.map(value => ({ id: value.id, value })))
*
* table.search('john')
*
* table.sort.toggle('name')
* table.sort.toggle('name')
* table.sort.toggle('name')
*
* table.pagination.next()
*
* table.selection.toggle(1)
* ```
*/
function createDataTable(options = {}) {
	const { filter: filterOptions = {}, pagination: paginationOptions = {}, sortMultiple = false, mandate = false, firstSortOrder = "asc", selectStrategy = "page", itemSelectable, groupBy, openAll = false, expandMultiple = true, locale: initialLocale, adapter = new ClientDataTableAdapter() } = options;
	const registry = createRegistry({
		events: true,
		reactive: false
	});
	const proxy = useProxyRegistry(registry);
	const columns = createRegistry({
		events: true,
		reactive: true
	});
	const _query = shallowRef("");
	function search(value) {
		_query.value = value;
	}
	const { selectedId: selectedLocale } = useLocale();
	const locale = toRef(() => {
		if (!/* @__PURE__ */ isNullOrUndefined(initialLocale)) return initialLocale;
		const selected = selectedLocale?.value;
		if (!/* @__PURE__ */ isNullOrUndefined(selected)) return String(selected);
	});
	const leaves = computed(() => /* @__PURE__ */ extractLeaves(columns.values()));
	const headers = computed(() => /* @__PURE__ */ resolveHeaders(columns.values()));
	const sortable = computed(() => leaves.value.filter((col) => toValue(col.sortable) === true));
	const group = createGroup({ multiple: sortMultiple });
	const order = shallowReactive([]);
	watch(sortable, (next) => {
		const ids = /* @__PURE__ */ new Set();
		for (const col of next) ids.add(String(col.id));
		for (const id of group.keys()) {
			const key = String(id);
			if (!ids.has(key)) {
				group.unregister(id);
				const index = order.indexOf(key);
				if (index !== -1) order.splice(index, 1);
			}
		}
		for (const id of ids) if (!group.has(id)) group.register({
			id,
			value: id
		});
	}, {
		flush: "sync",
		immediate: true
	});
	function toggle(id) {
		if (!group.has(id)) return;
		const isAsc = group.selectedIds.has(id);
		const isDesc = group.mixed(id);
		function clearOthers() {
			if (!sortMultiple) {
				group.unselectAll();
				group.mixedIds.clear();
				order.length = 0;
			}
		}
		function setAsc() {
			group.unmix(id);
			group.select(id);
		}
		function setDesc() {
			group.unselect(id);
			group.mix(id);
		}
		function setNone() {
			group.unselect(id);
			group.unmix(id);
			const index = order.indexOf(id);
			if (index !== -1) order.splice(index, 1);
		}
		if (!isAsc && !isDesc) {
			clearOthers();
			if (firstSortOrder === "desc") setDesc();
			else setAsc();
			order.push(id);
		} else if (isAsc) {
			if (firstSortOrder === "desc" && !mandate) setNone();
			else setDesc();
		} else if (firstSortOrder === "asc" && !mandate) setNone();
		else setAsc();
	}
	const sortBy = computed(() => {
		const result = [];
		for (const id of order) if (group.selectedIds.has(id)) result.push({
			key: id,
			direction: "asc"
		});
		else if (group.mixed(id)) result.push({
			key: id,
			direction: "desc"
		});
		return result;
	});
	function direction(id) {
		if (group.selectedIds.has(id)) return "asc";
		if (group.mixed(id)) return "desc";
		return "none";
	}
	function priority(id) {
		return order.indexOf(id);
	}
	function reset() {
		group.unselectAll();
		group.mixedIds.clear();
		order.length = 0;
	}
	const sort = {
		toggle,
		columns: sortBy,
		order,
		direction,
		priority,
		reset
	};
	const filterable = computed(() => {
		const ids = [];
		for (const col of leaves.value) if (toValue(col.filterable) === true) ids.push(String(col.id));
		return ids;
	});
	const customSorts = computed(() => {
		const sorts = {};
		for (const col of leaves.value) if (col.sort) sorts[String(col.id)] = col.sort;
		return sorts;
	});
	const customColumnFilters = computed(() => {
		const filters = {};
		for (const col of leaves.value) if (col.filter) filters[String(col.id)] = col.filter;
		return filters;
	});
	const source = computed(() => proxy.values.map((t) => t.value));
	const { allItems, filteredItems, sortedItems, items: visible, pagination, total, loading = toRef(() => false), error = toRef(() => null) } = adapter.setup({
		items: source,
		search: _query,
		filterableKeys: filterable,
		sortBy,
		locale,
		filterOptions,
		paginationOptions,
		customSorts,
		customColumnFilters
	});
	const selectedIds = shallowReactive(/* @__PURE__ */ new Set());
	const selectableIds = computed(() => {
		if (!itemSelectable) return null;
		const ids = /* @__PURE__ */ new Set();
		for (const ticket of proxy.values) {
			const value = ticket.value;
			if (!/* @__PURE__ */ isNullOrUndefined(value) && value[itemSelectable]) ids.add(ticket.id);
		}
		return ids;
	});
	function isSelectable(id) {
		return !selectableIds.value || selectableIds.value.has(id);
	}
	const scopeItems = toRef(() => {
		if (selectStrategy === "single") return [];
		return selectStrategy === "all" ? sortedItems.value : visible.value;
	});
	const scopedTickets = computed(() => {
		const scope = scopeItems.value;
		if (scope.length === 0) return [];
		const set = new Set(scope);
		const result = [];
		for (const ticket of proxy.values) {
			const value = ticket.value;
			if (/* @__PURE__ */ isNullOrUndefined(value) || !set.has(value)) continue;
			if (itemSelectable && !value[itemSelectable]) continue;
			result.push(ticket);
		}
		return result;
	});
	const selection = {
		selectedIds,
		select(id) {
			if (!isSelectable(id)) return;
			if (selectStrategy === "single") selectedIds.clear();
			selectedIds.add(id);
		},
		unselect(id) {
			selectedIds.delete(id);
		},
		toggle(id) {
			if (selectedIds.has(id)) selectedIds.delete(id);
			else selection.select(id);
		},
		isSelected(id) {
			return selectedIds.has(id);
		},
		isSelectable,
		selectAll() {
			for (const ticket of scopedTickets.value) selectedIds.add(ticket.id);
		},
		unselectAll() {
			selectedIds.clear();
		},
		toggleAll() {
			if (selectStrategy === "single") return;
			if (selection.isAllSelected.value) for (const ticket of scopedTickets.value) selectedIds.delete(ticket.id);
			else selection.selectAll();
		},
		isAllSelected: computed(() => {
			const tickets = scopedTickets.value;
			if (tickets.length === 0) return false;
			return tickets.every((ticket) => selectedIds.has(ticket.id));
		}),
		isMixed: computed(() => {
			const tickets = scopedTickets.value;
			if (tickets.length === 0) return false;
			return tickets.some((ticket) => selectedIds.has(ticket.id)) && !selection.isAllSelected.value;
		})
	};
	const expandedIds = shallowReactive(/* @__PURE__ */ new Set());
	const visibleTickets = computed(() => {
		const scope = visible.value;
		if (scope.length === 0) return [];
		const set = new Set(scope);
		const result = [];
		for (const ticket of proxy.values) {
			const value = ticket.value;
			if (!/* @__PURE__ */ isNullOrUndefined(value) && set.has(value)) result.push(ticket);
		}
		return result;
	});
	const expansion = {
		expandedIds,
		expand(id) {
			if (!expandMultiple) expandedIds.clear();
			expandedIds.add(id);
		},
		collapse(id) {
			expandedIds.delete(id);
		},
		toggle(id) {
			if (expandedIds.has(id)) expandedIds.delete(id);
			else expansion.expand(id);
		},
		isExpanded(id) {
			return expandedIds.has(id);
		},
		expandAll() {
			if (!expandMultiple) return;
			for (const ticket of visibleTickets.value) expandedIds.add(ticket.id);
		},
		collapseAll() {
			expandedIds.clear();
		}
	};
	registry.on("unregister:ticket", (ticket) => {
		selectedIds.delete(ticket.id);
		expandedIds.delete(ticket.id);
	});
	registry.on("clear:registry", () => {
		selectedIds.clear();
		expandedIds.clear();
	});
	const opened = shallowReactive(/* @__PURE__ */ new Set());
	const groups = computed(() => {
		if (!groupBy) return [];
		const map = /* @__PURE__ */ new Map();
		for (const item of sortedItems.value) {
			const raw = item[groupBy];
			const key = String(raw ?? "");
			let entry = map.get(key);
			if (!entry) {
				entry = {
					value: raw,
					items: []
				};
				map.set(key, entry);
			}
			entry.items.push(item);
		}
		const result = [];
		for (const [key, entry] of map) result.push({
			key,
			value: entry.value,
			items: entry.items
		});
		return result;
	});
	if (openAll) {
		const autoOpened = /* @__PURE__ */ new Set();
		for (const group of groups.value) {
			opened.add(group.key);
			autoOpened.add(group.key);
		}
		watch(groups, (newGroups) => {
			for (const group of newGroups) {
				if (autoOpened.has(group.key)) continue;
				opened.add(group.key);
				autoOpened.add(group.key);
			}
		}, { flush: "sync" });
	}
	const grouping = {
		groups,
		toggle(groupKey) {
			if (opened.has(groupKey)) opened.delete(groupKey);
			else opened.add(groupKey);
		},
		isOpen(groupKey) {
			return opened.has(groupKey);
		},
		open(groupKey) {
			opened.add(groupKey);
		},
		close(groupKey) {
			opened.delete(groupKey);
		},
		openAll() {
			for (const group of groups.value) opened.add(group.key);
		},
		closeAll() {
			opened.clear();
		}
	};
	function rank(source) {
		const ranked = sortedItems.value;
		const positions = /* @__PURE__ */ new Map();
		for (const [index, row] of ranked.entries()) {
			positions.set(row, index);
			const id = recordId(row);
			if (!/* @__PURE__ */ isNullOrUndefined(id)) positions.set(id, index);
		}
		return [...source].toSorted((a, b) => {
			return (positions.get(a) ?? positions.get(recordId(a)) ?? Infinity) - (positions.get(b) ?? positions.get(recordId(b)) ?? Infinity);
		});
	}
	return {
		...registry,
		items: visible,
		allItems,
		filteredItems,
		sortedItems,
		rank,
		columns,
		leaves,
		headers,
		search,
		query: shallowReadonly(_query),
		sort,
		pagination,
		selection,
		expansion,
		grouping,
		total,
		loading,
		error,
		get size() {
			return proxy.size;
		}
	};
}
/**
* Creates a data table context with dependency injection support.
*
* The returned context exposes both row and column registries. Columns must
* be onboarded after construction — pass them via `context.columns.onboard`,
* not in the factory options.
*
* @param options Data table context options including namespace
* @returns A trinity tuple: [useDataTable, provideDataTable, defaultContext]
*
* @example
* ```ts
* import { createDataTableContext } from '@vuetify/v0'
*
* const [useDataTable, provideDataTable, context] = createDataTableContext<User>({
*   namespace: 'app:users',
* })
*
* context.columns.onboard([
*   { id: 'name', title: 'Name', sortable: true },
* ])
*
* // Parent component
* provideDataTable()
* context.onboard(users.map(value => ({ id: value.id, value })))
*
* // Child component
* const table = useDataTable()
* ```
*/
function createDataTableContext(_options = {}) {
	const { namespace = "v0:data-table", ...options } = _options;
	const context = createDataTable(options);
	return createTrinity(namespace, context);
}
/**
* Returns the current data table context from dependency injection.
*
* @typeParam T - Must be provided explicitly; cannot be inferred from namespace.
*   Prefer the `useX` function from {@link createDataTableContext} for type-safe injection.
*
* @param namespace The namespace for the data table context. @default 'v0:data-table'
* @returns The current data table context
*
* @example
* ```vue
* <script setup lang="ts">
*   import { useDataTable } from '@vuetify/v0'
*
*   const table = useDataTable<User>()
* <\/script>
* ```
*/
function useDataTable(namespace = "v0:data-table") {
	return useContext(namespace);
}
//#endregion
export { extractLeaves as a, computeDepth as i, createDataTableContext as n, resolveHeaders as o, useDataTable as r, createDataTable as t };
