import { isUndefined, resolveIds, useId as useId$1 } from "./utilities/index.mjs";
import { i as useContext, t as createTrinity } from "./createTrinity-DJROWgXU.mjs";
import { t as createRegistry } from "./createRegistry-COW_AjH1.mjs";
import { computed, isRef, shallowReactive, toRaw, toRef, toValue } from "vue";
//#region src/composables/createModel/index.ts
/**
* @module createModel
*
* @see https://0.vuetifyjs.com/composables/selection/create-model
*
* @remarks
* Value store layer that extends createRegistry with a reactive Set of
* selected IDs, disabled guards, and an `apply` bridge for useProxyModel sync.
*
* Think of it as a creative way to store a single value — more like
* `defineModel` than `createSelection`. Selection-specific concepts
* (mandatory) belong in createSelection. The `multiple` option here
* controls whether `select()` accumulates or replaces. The `enroll` option
* auto-selects items on register.
*
* Both Selection and Slider extend this layer:
* - createRegistry → createModel → createSelection → createSingle/createGroup/createStep
* - createRegistry → createModel → createSlider (values override)
*
* @example
* ```ts
* import { createModel } from '@vuetify/v0'
*
* const model = createModel({ multiple: false })
* model.register({ value: 'apple' })
* model.select(model.values()[0]!.id)
* ```
*/
/**
* Creates a new model instance for storing a single value.
*
* @param options The options for the model instance.
* @template Z The input ticket type. Extend {@link ModelTicketInput} to add custom properties.
* @template E The output ticket type. Automatically includes `disabled` and `isSelected`.
* @template R The context type. Defaults to {@link ModelContext}<Z, E>.
* @returns A new model instance with selection tracking and disabled guards.
*
* @remarks
* Extends createRegistry with value tracking via a reactive Set of selected IDs.
* Provides the shared model-value concept used by both Selection and Slider.
*
* **Enrollment**: Tickets are auto-selected on registration by default (`enroll: true`).
* With single-value semantics, only the most recently registered ticket is active.
* Pass `enroll: false` to opt out. `createSelection` overrides this to `false`.
*
* **Apply bridge**: `useProxyModel` calls `apply()` to sync a ref with the model.
* When the active ticket's value is a ref, `apply` writes to it directly. Otherwise,
* it resolves via `registry.browse()`.
*
* @see https://0.vuetifyjs.com/composables/selection/create-model
*
* @example
* ```ts
* import { shallowRef } from 'vue'
* import { createModel, useProxyModel } from '@vuetify/v0'
*
* const value = shallowRef('Apple')
* const model = createModel({ events: true })
*
* model.register({ id: 'fruit', value })
* useProxyModel(model, value)
*
* // value and model stay in sync bidirectionally
* ```
*
* @example
* ```ts
* // Disabled model — all selection operations are no-ops
* const model = createModel({ disabled: true })
* model.register({ id: 'a', value: shallowRef('Apple') })
* model.select('a') // no-op
* ```
*/
function createModel(_options = {}) {
	const { disabled = false, enroll = true, multiple = false, ...options } = _options;
	const registry = createRegistry(options);
	const selectedIds = shallowReactive(/* @__PURE__ */ new Set());
	const selectedItems = computed(() => new Set(/* @__PURE__ */ resolveIds(selectedIds, registry.get)));
	const selectedValues = computed(() => {
		const out = /* @__PURE__ */ new Set();
		for (const item of selectedItems.value) out.add(toValue(item.value));
		return out;
	});
	function select(id) {
		if (toValue(disabled)) return;
		const item = registry.get(id);
		if (!item || toValue(item.disabled)) return;
		if (!toValue(multiple)) selectedIds.clear();
		selectedIds.add(id);
	}
	function unselect(id) {
		if (toValue(disabled)) return;
		const item = registry.get(id);
		if (!item || toValue(item.disabled)) return;
		selectedIds.delete(id);
	}
	function toggle(id) {
		if (toValue(disabled)) return;
		if (selected(id)) unselect(id);
		else select(id);
	}
	function selected(id) {
		return selectedIds.has(id);
	}
	function apply(values, _options) {
		const value = values[0];
		let written = false;
		for (const id of selectedIds) {
			const item = registry.get(id);
			if (!item || !isRef(item.value)) continue;
			if (!/* @__PURE__ */ isUndefined(value)) item.value.value = value;
			written = true;
		}
		if (written) return;
		if (!toValue(multiple)) selectedIds.clear();
		if (/* @__PURE__ */ isUndefined(value)) return;
		const id = registry.browse(toRaw(value))?.values().next().value;
		if (!/* @__PURE__ */ isUndefined(id)) select(id);
	}
	function register(registration = {}) {
		const id = registration.id ?? /* @__PURE__ */ useId$1();
		const item = {
			disabled: false,
			unregister: () => unregister(id),
			...registration,
			isSelected: toRef(() => selected(id)),
			id
		};
		const ticket = registry.register(item);
		if (toValue(enroll) && !toValue(disabled) && !toValue(ticket.disabled)) select(id);
		return ticket;
	}
	function unregister(id) {
		selectedIds.delete(id);
		registry.unregister(id);
	}
	function onboard(registrations) {
		return registry.batch(() => registrations.map((r) => register(r)));
	}
	function offboard(ids) {
		for (const id of ids) selectedIds.delete(id);
		return registry.offboard(ids);
	}
	function reset() {
		selectedIds.clear();
	}
	function clear() {
		reset();
		registry.clear();
	}
	function dispose() {
		reset();
		registry.dispose();
	}
	return {
		...registry,
		disabled,
		selectedIds,
		selectedItems,
		selectedValues,
		register,
		onboard,
		unregister,
		offboard,
		clear,
		dispose,
		reset,
		select,
		unselect,
		toggle,
		selected,
		apply,
		get size() {
			return registry.size;
		}
	};
}
//#endregion
//#region src/composables/createSelection/index.ts
/**
* @module createSelection
*
* @see https://0.vuetifyjs.com/composables/selection/create-selection
*
* @remarks
* Selection composable that extends createModel with multi-select,
* mandatory enforcement, auto-enrollment, and ticket self-methods.
*
* Key features:
* - Set-based selectedIds for O(1) selection checks
* - Single or multi-select mode
* - Mandatory selection mode (prevents deselecting last item)
* - Auto-enrollment option (selects non-disabled items on register)
* - `MaybeRefOrGetter` support for `mandatory`, `multiple`, and `enroll` options
* - Disabled item filtering
* - Computed selectedItems and selectedValues Sets
* - Ticket self-methods: select(), unselect(), toggle()
*
* Extends createModel and serves as the base for createSingle, createGroup, createStep, and useFeatures.
*
* @example
* ```ts
* import { createSelection } from '@vuetify/v0'
*
* const selection = createSelection({ multiple: true })
* const a = selection.register({ value: 'a' })
* const b = selection.register({ value: 'b' })
* selection.select([a.id, b.id])
* ```
*/
/**
* Creates a new selection instance for managing multiple selected items.
*
* Extends `createModel` with multi-select, mandatory enforcement,
* auto-enrollment, and ticket self-methods.
* Supports disabled items, mandatory selection enforcement, and auto-enrollment.
*
* @param options The options for the selection instance.
* @template Z The input ticket type - what users provide to register(). Extend SelectionTicketInput to add custom properties.
* @template E The output ticket type - what users receive from get(). Automatically includes selection methods.
* @template R The context type. Defaults to SelectionContext<Z, E>.
* @returns A new selection instance with selection management methods.
*
* @remarks
* **Key Features:**
* - Multi-selection support (unlike `createSingle` which enforces single selection)
* - Set-based `selectedIds` tracking for efficient lookups
* - Computed `selectedItems` and `selectedValues` for reactive access
* - Each ticket gets `isSelected`, `select()`, `unselect()`, and `toggle()` methods
* - Disabled items cannot be selected
* - Mandatory mode prevents deselecting the last item
* - Force mode auto-selects first non-disabled item on registration
* - Enroll option auto-selects all non-disabled items on registration
*
* **Inheritance Chain:**
* `createRegistry` → `createModel` → `createSelection` → `createSingle`/`createGroup` → `createStep`
*
* @see https://0.vuetifyjs.com/composables/selection/create-selection
*
* @example
* ```ts
* import { createSelection } from '@vuetify/v0'
*
* // Basic usage
* const selection = createSelection({ mandatory: true })
*
* selection.onboard([
*   { id: 'item-1', value: 'Item 1' },
*   { id: 'item-2', value: 'Item 2', disabled: true },
*   { id: 'item-3', value: 'Item 3' },
* ])
*
* selection.select('item-1')
* selection.select('item-3')
*
* console.log(selection.selectedIds) // Set { 'item-1', 'item-3' }
* console.log(Array.from(selection.selectedValues.value)) // ['Item 1', 'Item 3']
* ```
*
* @example
* ```ts
* // With custom ticket type
* interface MyTicket extends SelectionTicketInput {
*   label: string
*   icon?: string
* }
*
* const tabs = createSelection<MyTicket>()
*
* tabs.register({ label: 'Home', icon: 'mdi-home' })
* tabs.register({ label: 'Settings' })
*
* const ticket = tabs.get('...')
* // ticket has: label, icon, isSelected, select(), unselect(), toggle()
* ```
*/
function createSelection(_options = {}) {
	const { enroll = false, mandatory = false, multiple = false, ...options } = _options;
	const model = createModel({
		...options,
		multiple,
		enroll: false
	});
	function seek(direction = "first", from) {
		return model.seek(direction, from, (ticket) => !toValue(ticket.disabled));
	}
	function mandate() {
		if (!toValue(mandatory) || model.size === 0 || model.selectedIds.size > 0) return;
		const ticket = seek("first");
		if (ticket) model.select(ticket.id);
	}
	function drain(id) {
		if (toValue(model.disabled)) return;
		if (toValue(mandatory) && model.selectedIds.size === 1) return;
		model.selectedIds.delete(id);
	}
	function unselect(id) {
		if (toValue(model.disabled)) return;
		const item = model.get(id);
		if (!item || toValue(item.disabled)) return;
		drain(id);
	}
	function toggle(id) {
		if (toValue(model.disabled)) return;
		if (model.selectedIds.has(id)) unselect(id);
		else model.select(id);
	}
	function apply(values, options) {
		const isMultiple = options?.multiple ?? toValue(multiple);
		const currentIds = new Set(model.selectedIds);
		const targetIds = /* @__PURE__ */ new Set();
		if (isMultiple) {
			for (const value of values) {
				const ids = model.browse(toRaw(value));
				if (/* @__PURE__ */ isUndefined(ids)) continue;
				for (const id of ids) {
					const ticket = model.get(id);
					if (!ticket || toValue(ticket.disabled)) continue;
					targetIds.add(id);
				}
			}
			if (toValue(mandatory) && targetIds.size === 0) return;
			for (const id of currentIds) if (!targetIds.has(id)) model.selectedIds.delete(id);
			for (const id of targetIds) model.selectedIds.add(id);
		} else {
			for (const value of values) {
				const ids = model.browse(toRaw(value));
				if (/* @__PURE__ */ isUndefined(ids)) continue;
				for (const id of ids) targetIds.add(id);
			}
			const next = targetIds.values().next().value;
			const last = currentIds.values().next().value;
			if (!/* @__PURE__ */ isUndefined(last)) drain(last);
			if (!/* @__PURE__ */ isUndefined(next)) model.select(next);
		}
	}
	function register(registration = {}) {
		const id = registration.id ?? /* @__PURE__ */ useId$1();
		const decorated = {
			select: () => model.select(id),
			unselect: () => unselect(id),
			toggle: () => toggle(id),
			...registration,
			id
		};
		const ticket = model.register(decorated);
		if (toValue(enroll) && !toValue(model.disabled) && !toValue(ticket.disabled)) model.select(ticket.id);
		if (toValue(mandatory) === "force") mandate();
		return ticket;
	}
	function onboard(registrations) {
		const tickets = model.batch(() => registrations.map((registration) => register(registration)));
		if (toValue(mandatory) === "force") mandate();
		return tickets;
	}
	return {
		...model,
		multiple,
		register,
		onboard,
		unselect,
		toggle,
		apply,
		mandate,
		seek,
		get size() {
			return model.size;
		}
	};
}
/**
* Creates a new selection context.
*
* @param options The options for the selection context.
* @template Z The input ticket type - what users provide to register().
* @template E The output ticket type - what users receive from get().
* @template R The context type. Defaults to SelectionContext<Z, E>.
* @returns A new selection context.
*
* @see https://0.vuetifyjs.com/composables/selection/create-selection
*
* @example
* ```ts
* import { createSelectionContext } from '@vuetify/v0'
*
* // With default namespace 'v0:selection'
* export const [useCheckboxes, provideCheckboxes, checkboxes] = createSelectionContext()
*
* // Or with custom namespace
* export const [useCheckboxes, provideCheckboxes, checkboxes] = createSelectionContext({ namespace: 'checkboxes' })
*
* // In a parent component:
* provideCheckboxes()
*
* // In a child component:
* const checkboxes = useCheckboxes()
* checkboxes.select('checkbox-1')
* ```
*
* @example
* ```ts
* // With custom ticket type
* interface TabTicket extends SelectionTicketInput {
*   label: string
*   icon?: string
* }
*
* export const [useTabs, provideTabs, tabs] = createSelectionContext<TabTicket>()
* ```
*/
function createSelectionContext(_options = {}) {
	const { namespace = "v0:selection", ...options } = _options;
	const context = createSelection(options);
	return createTrinity(namespace, context);
}
/**
* Returns the current selection instance.
*
* @param namespace The namespace for the selection context. Defaults to `'v0:selection'`.
* @template Z The input ticket type.
* @template E The output ticket type.
* @template R The context type.
* @returns The current selection instance.
*
* @see https://0.vuetifyjs.com/composables/selection/create-selection
*
* @example
* ```vue
* <script setup lang="ts">
*   import { useSelection } from '@vuetify/v0'
*
*   const selection = useSelection()
* <\/script>
*
* <template>
*   <div>
*     <p>Selected: {{ selection.selectedIds.size }}</p>
*   </div>
* </template>
* ```
*/
function useSelection(namespace = "v0:selection") {
	return useContext(namespace);
}
//#endregion
export { createModel as i, createSelectionContext as n, useSelection as r, createSelection as t };
