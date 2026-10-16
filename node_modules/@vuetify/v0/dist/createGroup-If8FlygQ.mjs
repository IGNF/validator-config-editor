import { resolveIds, resolveIndexes, useId as useId$1 } from "./utilities/index.mjs";
import { i as useContext, t as createTrinity } from "./createTrinity-DJROWgXU.mjs";
import { t as createSelection } from "./createSelection-DQNMDMJj.mjs";
import { t as toArray } from "./toArray-DCZRopC6.mjs";
import { computed, onScopeDispose, reactive, shallowReactive, shallowRef, toRef, toValue } from "vue";
//#region src/composables/useProxyRegistry/index.ts
/**
* @module useProxyRegistry
*
* @see https://0.vuetifyjs.com/composables/reactivity/use-proxy-registry
*
* @remarks
* Proxy composable for reactive registry keys, values, entries, and size.
*
* Key features:
* - Reactive proxy for registry data
* - Deep or shallow reactivity options
* - Event-based updates
* - Automatic cleanup on scope disposal
* - Transforms Map-based registry into reactive refs
*
* Perfect for exposing registry data as reactive computed properties.
*
* @example
* ```ts
* import { createRegistry, useProxyRegistry } from '@vuetify/v0'
*
* const registry = createRegistry({ events: true })
* const proxy = useProxyRegistry(registry)
* registry.register({ value: 'Item 1' })
* console.log(proxy.size) // 1
* ```
*/
/**
* Creates a proxy registry that provides reactive objects for registry data.
*
* @param registry The registry instance to proxy.
* @param options The options for the proxy registry.
* @template Z The input ticket type (what users provide to register).
* @template E The output ticket type (what users receive from get/values).
* @returns A proxy registry with reactive objects.
*
* @see https://0.vuetifyjs.com/composables/reactivity/use-proxy-registry
*
* @example
* ```ts
* import { createRegistry, useProxyRegistry } from '@vuetify/v0'
*
* const registry = createRegistry({ events: true })
* const proxy = useProxyRegistry(registry)
*
* registry.register({ value: 'Item 1' })
* console.log(proxy.size) // 1
* ```
*/
function useProxyRegistry(registry, options) {
	const version = shallowRef(0);
	function wrap(value) {
		return options?.deep ? reactive(value) : value;
	}
	function update() {
		version.value++;
	}
	registry.on("register:ticket", update);
	registry.on("unregister:ticket", update);
	registry.on("update:ticket", update);
	registry.on("clear:registry", update);
	registry.on("reindex:registry", update);
	onScopeDispose(() => {
		registry.off("register:ticket", update);
		registry.off("unregister:ticket", update);
		registry.off("update:ticket", update);
		registry.off("clear:registry", update);
		registry.off("reindex:registry", update);
	}, true);
	return reactive({
		keys: computed(() => {
			version.value;
			return registry.keys();
		}),
		values: computed(() => {
			version.value;
			return wrap(registry.values());
		}),
		entries: computed(() => {
			version.value;
			return wrap(registry.entries());
		}),
		size: computed(() => {
			version.value;
			return registry.size;
		})
	});
}
//#endregion
//#region src/composables/createGroup/index.ts
/**
* @module createGroup
*
* @see https://0.vuetifyjs.com/composables/selection/create-group
*
* @remarks
* Multi-selection composable that extends createSelection with batch operations and tri-state support.
*
* Key features:
* - Batch operations (select/unselect/toggle accept ID | ID[])
* - Tri-state support via mixed/indeterminate state (mix/unmix)
* - selectedIndexes computed Set for position-based tracking
* - Perfect for checkbox trees, multi-select dropdowns, filter panels
*
* Tri-state behavior:
* - Items can be selected, mixed (indeterminate), or unselected
* - select() clears mixed state, mix() clears selected state (mutually exclusive)
* - toggle() on a mixed item selects it (resolves positively)
*
* Inheritance chain: createRegistry → createSelection → createGroup
* Extended by: useFeatures
*
* @example
* ```ts
* import { createGroup } from '@vuetify/v0'
*
* const group = createGroup()
* group.register({ value: 'a' })
* group.register({ value: 'b' })
* group.select(['a', 'b'])
* ```
*/
/**
* Creates a new group instance with batch selection and tri-state support.
*
* Extends `createSelection` to support selecting, unselecting, and toggling multiple items
* at once by passing an array of IDs. Adds tri-state (mixed/indeterminate) support for
* checkbox trees and similar use cases.
*
* @param options The options for the group instance.
* @template Z The type of the group ticket.
* @template E The type of the group context.
* @returns A new group instance with batch selection and tri-state support.
*
* @remarks
* **Key Differences from `createSelection`:**
* - `select()` accepts `ID | ID[]` for batch operations
* - `unselect()` accepts `ID | ID[]` for batch operations
* - `toggle()` accepts `ID | ID[]` for batch operations
* - Adds `selectedIndexes` computed Set for getting selected item indexes
* - Adds tri-state support via `mix()`, `unmix()`, `mixed()`, `mixedIds`, `mixedItems`
* - Perfect for checkbox trees, multi-select dropdowns, and bulk operations
*
* **Tri-State Support:**
* - Items can be in one of three states: selected, mixed (indeterminate), or unselected
* - `mix(id)` sets item to mixed state (clears selected if set)
* - `unmix(id)` clears mixed state
* - `select(id)` clears mixed state before selecting
* - `toggle(id)` on a mixed item selects it (resolves the indeterminate state positively)
* - Mixed state works on disabled items (it's a computed state, not user action)
*
* **Batch Operations:**
* - Single ID: `group.select('item-1')`
* - Array of IDs: `group.select(['item-1', 'item-2', 'item-3'])`
* - Uses `toArray()` utility internally to normalize input
* - Disabled items are automatically skipped in select operations
* - Non-existent IDs are silently ignored
*
* **Inheritance Chain:**
* `createRegistry` → `createSelection` → `createGroup`
*
* **Used By:**
* - `createFeatures` for feature flag management with multiple selections
*
* @see https://0.vuetifyjs.com/composables/selection/create-group
*
* @example
* ```ts
* import { createGroup } from '@vuetify/v0'
*
* const checkboxes = createGroup()
*
* checkboxes.onboard([
*   { id: 'option-a', value: 'Option A' },
*   { id: 'option-b', value: 'Option B' },
*   { id: 'option-c', value: 'Option C' },
* ])
*
* // Select multiple items at once
* checkboxes.select(['option-a', 'option-c'])
*
* console.log(checkboxes.selectedIds) // Set { 'option-a', 'option-c' }
* console.log(Array.from(checkboxes.selectedIndexes.value)) // [0, 2]
*
* // Set item to mixed/indeterminate state
* checkboxes.mix('option-a')
* console.log(checkboxes.mixedIds) // Set { 'option-a' }
* console.log(checkboxes.selectedIds) // Set { 'option-c' } (option-a removed)
*
* // Toggle a mixed item selects it
* checkboxes.toggle('option-a')
* console.log(checkboxes.selectedIds) // Set { 'option-a', 'option-c' }
* console.log(checkboxes.mixedIds) // Set {} (cleared)
* ```
*/
function createGroup(_options = {}) {
	const { mandatory = false, multiple = true, ...options } = _options;
	const selection = createSelection({
		...options,
		mandatory,
		multiple,
		events: true
	});
	const proxy = useProxyRegistry(selection);
	const mixedIds = shallowReactive(/* @__PURE__ */ new Set());
	const selectedIndexes = computed(() => new Set(/* @__PURE__ */ resolveIndexes(selection.selectedItems.value)));
	const mixedItems = computed(() => new Set(/* @__PURE__ */ resolveIds(mixedIds, selection.get)));
	function mixed(id) {
		return mixedIds.has(id);
	}
	function mix(ids) {
		for (const id of /* @__PURE__ */ toArray(ids)) {
			if (!selection.has(id)) continue;
			selection.selectedIds.delete(id);
			mixedIds.add(id);
		}
	}
	function unmix(ids) {
		for (const id of /* @__PURE__ */ toArray(ids)) mixedIds.delete(id);
	}
	function select(ids) {
		for (const id of /* @__PURE__ */ toArray(ids)) {
			mixedIds.delete(id);
			selection.select(id);
		}
	}
	function unselect(ids) {
		for (const id of /* @__PURE__ */ toArray(ids)) selection.unselect(id);
	}
	function toggle(ids) {
		for (const id of /* @__PURE__ */ toArray(ids)) if (mixed(id)) select(id);
		else selection.toggle(id);
	}
	function register(registration = {}) {
		const id = registration.id ?? /* @__PURE__ */ useId$1();
		const item = {
			...registration,
			id,
			isMixed: toRef(() => mixed(id)),
			select: () => select(id),
			unselect: () => unselect(id),
			toggle: () => toggle(id),
			mix: () => mix(id),
			unmix: () => unmix(id),
			unregister: () => unregister(id)
		};
		const ticket = selection.register(item);
		if (toValue(registration.indeterminate)) mix(id);
		return ticket;
	}
	function unregister(id) {
		mixedIds.delete(id);
		selection.unregister(id);
	}
	function offboard(ids) {
		for (const id of ids) mixedIds.delete(id);
		return selection.offboard(ids);
	}
	function onboard(registrations) {
		const tickets = selection.batch(() => registrations.map((registration) => register(registration)));
		if (toValue(mandatory) === "force") selection.mandate();
		return tickets;
	}
	function reset() {
		mixedIds.clear();
		selection.reset();
	}
	function clear() {
		mixedIds.clear();
		selection.clear();
	}
	function dispose() {
		mixedIds.clear();
		selection.dispose();
	}
	const selectableItems = computed(() => {
		return proxy.values.filter((item) => !toValue(item.disabled));
	});
	const isAllSelected = computed(() => {
		const items = selectableItems.value;
		if (items.length === 0) return false;
		return items.every((item) => selection.selectedIds.has(item.id));
	});
	const isNoneSelected = toRef(() => selection.selectedIds.size === 0);
	const isMixed = computed(() => {
		return mixedIds.size > 0 || !isNoneSelected.value && !isAllSelected.value;
	});
	function selectAll() {
		for (const item of selectableItems.value) {
			mixedIds.delete(item.id);
			selection.select(item.id);
		}
	}
	function unselectAll() {
		selection.selectedIds.clear();
		if (!toValue(mandatory)) return;
		const ticket = selection.seek("first");
		if (ticket) selection.select(ticket.id);
	}
	function toggleAll() {
		if (isAllSelected.value) unselectAll();
		else selectAll();
	}
	return {
		...selection,
		mixed,
		mix,
		unmix,
		select,
		unselect,
		toggle,
		register,
		unregister,
		offboard,
		onboard,
		reset,
		clear,
		dispose,
		selectAll,
		unselectAll,
		toggleAll,
		mixedIds,
		mixedItems,
		selectedIndexes,
		isNoneSelected,
		isAllSelected,
		isMixed,
		get size() {
			return selection.size;
		}
	};
}
/**
* Creates a new group context.
*
* @param options The options for the group context.
* @template Z The input ticket type.
* @template E The output ticket type.
* @template R The context type.
* @returns A new group context.
*
* @see https://0.vuetifyjs.com/composables/selection/create-group
*
* @example
* ```ts
* import { createGroupContext } from '@vuetify/v0'
*
* // With default namespace 'v0:group'
* export const [useMyGroup, provideMyGroup, myGroup] = createGroupContext()
*
* // Or with custom namespace
* export const [useMyGroup, provideMyGroup, myGroup] = createGroupContext({ namespace: 'my-group' })
*
* // In a parent component:
* provideMyGroup()
*
* // In a child component:
* const group = useMyGroup()
* ```
*/
function createGroupContext(_options = {}) {
	const { namespace = "v0:group", ...options } = _options;
	const context = createGroup(options);
	return createTrinity(namespace, context);
}
/**
* Returns the current group instance.
*
* @param namespace The namespace for the group context. Defaults to `'v0:group'`.
* @template Z The input ticket type.
* @template E The output ticket type.
* @template R The context type.
* @returns The current group instance.
*
* @see https://0.vuetifyjs.com/composables/selection/create-group
*
* @example
* ```vue
* <script setup lang="ts">
*   import { useGroup } from '@vuetify/v0'
*
*   const group = useGroup()
* <\/script>
*
* <template>
*   <div>
*     <p>Selected: {{ group.selectedIds.size }}</p>
*   </div>
* </template>
* ```
*/
function useGroup(namespace = "v0:group") {
	return useContext(namespace);
}
//#endregion
export { useProxyRegistry as i, createGroupContext as n, useGroup as r, createGroup as t };
