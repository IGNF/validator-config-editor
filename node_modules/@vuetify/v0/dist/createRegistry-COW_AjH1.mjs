import { clamp, isNullOrUndefined, isUndefined, useId as useId$1 } from "./utilities/index.mjs";
import { i as useContext, t as createTrinity } from "./createTrinity-DJROWgXU.mjs";
import { i as useLogger } from "./useLogger-BIAZ6Iyu.mjs";
import { shallowReactive, shallowRef } from "vue";
//#region src/composables/createRegistry/index.ts
/**
* @module createRegistry
*
* @see https://0.vuetifyjs.com/composables/registration/create-registry
*
* @remarks
* A foundational composable for managing collections of items (tickets) with:
* - Unique ID-based access
* - Index-based ordering and reordering via `move()`
* - Value-based reverse lookup
* - `unregister()` for individual item removal
* - Automatic reindexing
* - Batched event dispatch to prevent N cache invalidations
* - Performance-optimized caching
*
* The registry serves as the base for many other composables in the system,
* including createSelection, createForm, createTimeline, and more.
*
* @example
* ```ts
* import { createRegistry } from '@vuetify/v0'
*
* const registry = createRegistry()
* const ticket = registry.register({ value: 'item-1' })
* console.log(registry.size) // 1
* registry.unregister(ticket.id)
* ```
*/
/**
* Creates a new registry instance.
*
* @param options The options for the registry instance.
* @template Z The type of registry ticket that extends RegistryTicket. Use this to add custom properties to tickets.
* @template E The type of registry context that extends RegistryContext<Z>. Use this when extending the registry with additional methods.
* @returns A new registry instance.
*
* @see https://0.vuetifyjs.com/composables/registration/create-registry
*
* @example
* ```ts
* import { createRegistry } from '@vuetify/v0'
*
* const registry = createRegistry()
*
* const ticket1 = registry.register({ id: 'user-1', value: { name: 'John' } })
* const ticket2 = registry.register({ id: 'user-2', value: { name: 'Jane' } })
*
* console.log(registry.size) // 2
* console.log(registry.get('user-1')) // { id: 'user-1', index: 0, value: { name: 'John' }, ... }
* ```
*/
function createRegistry(options) {
	const logger = useLogger();
	const events = options?.events ?? false;
	const reactive = options?.reactive ?? false;
	const collection = reactive ? shallowReactive(/* @__PURE__ */ new Map()) : /* @__PURE__ */ new Map();
	const catalog = /* @__PURE__ */ new Map();
	const directory = /* @__PURE__ */ new Map();
	const cache = /* @__PURE__ */ new Map();
	const listeners = /* @__PURE__ */ new Map();
	const minted = /* @__PURE__ */ new WeakSet();
	const order = [];
	const version = shallowRef(0);
	let indexDependentCount = 0;
	let needsReindex = false;
	let minDirtyIndex = Infinity;
	let maxDirtyIndex = -Infinity;
	let isBatching = false;
	let structural = false;
	let batched = [];
	function dispatch(event, data) {
		const cbs = listeners.get(event);
		if (!cbs) return;
		for (const cb of cbs) cb(data);
	}
	function emit(event, data = void 0) {
		if (!events) return;
		if (isBatching) {
			batched.push({
				event,
				data
			});
			return;
		}
		dispatch(event, data);
	}
	function on(event, cb) {
		if (!events) {
			logger.warn(`Events are disabled. Initialize with \`createRegistry({ events: true })\` to enable.`);
			return;
		}
		if (!listeners.has(event)) listeners.set(event, /* @__PURE__ */ new Set());
		const cbs = listeners.get(event);
		cbs.add(cb);
		if (process.env.NODE_ENV !== "production" && cbs.size === 101) logger.warn(`Event "${event}" has ${cbs.size} listeners. Possible memory leak.`);
	}
	function off(event, cb) {
		if (!events) {
			logger.warn(`Events are disabled. Initialize with \`createRegistry({ events: true })\` to enable.`);
			return;
		}
		listeners.get(event)?.delete(cb);
	}
	function dispose() {
		listeners.clear();
		clear();
	}
	function get(id) {
		return collection.get(id);
	}
	function upsert(id, patch = {}, event) {
		if (needsReindex) reindex();
		const existing = get(id);
		if (!existing) return register({
			...patch,
			id
		});
		const hasValue = Object.hasOwn(patch, "value");
		let value = existing.value;
		let valueIsIndex = existing.valueIsIndex;
		if (hasValue) {
			if (/* @__PURE__ */ isUndefined(patch.value)) {
				value = existing.index;
				valueIsIndex = true;
			} else {
				value = patch.value;
				valueIsIndex = false;
			}
			if (valueIsIndex !== existing.valueIsIndex) {
				if (valueIsIndex) indexDependentCount++;
				else indexDependentCount--;
			}
			if (!Object.is(value, existing.value)) {
				unassign(existing.value, id);
				assign(value, id);
			}
		}
		Object.assign(existing, patch, {
			id,
			index: existing.index,
			value,
			valueIsIndex
		});
		collection.set(id, existing);
		cache.clear();
		emit("update:ticket", existing);
		if (event) emit(event, existing);
		return existing;
	}
	function browse(value) {
		if (needsReindex) reindex();
		const bucket = catalog.get(value);
		return bucket ? bucket.slice() : void 0;
	}
	function lookup(index) {
		if (needsReindex) reindex();
		return directory.get(index);
	}
	function has(id) {
		return collection.has(id);
	}
	function assign(value, id) {
		const bucket = catalog.get(value);
		if (bucket) {
			if (!bucket.includes(id)) bucket.push(id);
		} else catalog.set(value, [id]);
	}
	function unassign(value, id) {
		const bucket = catalog.get(value);
		if (!bucket) return;
		const next = bucket.filter((v) => v !== id);
		if (next.length === 0) catalog.delete(value);
		else catalog.set(value, next);
	}
	function keys() {
		if (reactive) version.value;
		const cached = cache.get("keys");
		if (!/* @__PURE__ */ isUndefined(cached)) return cached;
		const out = order.map((ticket) => ticket.id);
		cache.set("keys", out);
		return out;
	}
	function values() {
		if (reactive) version.value;
		const cached = cache.get("values");
		if (!/* @__PURE__ */ isUndefined(cached)) return cached;
		const out = order.slice();
		cache.set("values", out);
		return out;
	}
	function entries() {
		if (reactive) version.value;
		const cached = cache.get("entries");
		if (!/* @__PURE__ */ isUndefined(cached)) return cached;
		const out = order.map((ticket) => [ticket.id, ticket]);
		cache.set("entries", out);
		return out;
	}
	function clear() {
		order.length = 0;
		collection.clear();
		catalog.clear();
		directory.clear();
		invalidate();
		indexDependentCount = 0;
		needsReindex = false;
		minDirtyIndex = Infinity;
		maxDirtyIndex = -Infinity;
		emit("clear:registry");
	}
	function invalidate() {
		cache.clear();
		if (isBatching) {
			structural = true;
			return;
		}
		version.value++;
	}
	function batch(fn) {
		if (isBatching) return fn();
		isBatching = true;
		structural = false;
		batched = [];
		try {
			return fn();
		} finally {
			isBatching = false;
			const queue = batched;
			batched = [];
			cache.clear();
			try {
				for (const { event, data } of queue) dispatch(event, data);
			} finally {
				if (structural) version.value++;
			}
		}
	}
	function reindex() {
		const size = order.length;
		const start = minDirtyIndex === Infinity ? 0 : minDirtyIndex;
		const end = maxDirtyIndex === -Infinity ? size - 1 : Math.min(maxDirtyIndex, size - 1);
		const full = start === 0 && end === size - 1;
		invalidate();
		if (full) {
			catalog.clear();
			directory.clear();
		} else for (let i = start; i <= end; i++) {
			const ticket = order[i];
			directory.delete(ticket.index);
			if (ticket.valueIsIndex) unassign(ticket.value, ticket.id);
		}
		for (let i = start; i <= end; i++) {
			const ticket = order[i];
			if (ticket.valueIsIndex) {
				ticket.value = i;
				assign(ticket.value, ticket.id);
			} else if (full) assign(ticket.value, ticket.id);
			ticket.index = i;
			directory.set(i, ticket.id);
		}
		needsReindex = false;
		minDirtyIndex = Infinity;
		maxDirtyIndex = -Infinity;
		emit("reindex:registry");
	}
	function register(registration = {}) {
		if (needsReindex) reindex();
		const size = collection.size;
		const auto = /* @__PURE__ */ isNullOrUndefined(registration.id);
		const id = registration.id ?? /* @__PURE__ */ useId$1();
		if (has(id)) {
			logger.warn(`Ticket "${id}" already exists. Use \`upsert()\` to update or check \`has()\` before registering.`);
			return get(id);
		}
		const valueIsUndefined = /* @__PURE__ */ isUndefined(registration.value);
		const index = size;
		const value = valueIsUndefined ? index : registration.value;
		const valueIsIndex = registration.valueIsIndex ?? valueIsUndefined;
		if (valueIsIndex) indexDependentCount++;
		const input = {
			unregister: () => unregister(id),
			...registration,
			id,
			index,
			value,
			valueIsIndex
		};
		const ticket = reactive ? shallowReactive(input) : input;
		if (auto) minted.add(ticket);
		collection.set(ticket.id, ticket);
		order.push(ticket);
		directory.set(ticket.index, ticket.id);
		assign(ticket.value, ticket.id);
		invalidate();
		emit("register:ticket", ticket);
		return ticket;
	}
	function unregister(id) {
		const ticket = collection.get(id);
		if (!ticket) return;
		if (ticket.valueIsIndex) indexDependentCount--;
		let orderPos = ticket.index;
		if (order[orderPos] !== ticket) orderPos = order.indexOf(ticket);
		if (orderPos !== -1) order.splice(orderPos, 1);
		collection.delete(ticket.id);
		directory.delete(ticket.index);
		unassign(ticket.value, ticket.id);
		const willReindex = indexDependentCount > 0 && ticket.index < collection.size;
		if (!willReindex) invalidate();
		minDirtyIndex = Math.min(minDirtyIndex, ticket.index);
		if (willReindex) reindex();
		else needsReindex = true;
		emit("unregister:ticket", ticket);
	}
	function onboard(registrations) {
		return batch(() => registrations.map((registration) => register(registration)));
	}
	function toInput(ticket) {
		const input = { ...ticket };
		delete input.index;
		delete input.valueIsIndex;
		delete input.unregister;
		if (minted.has(ticket)) delete input.id;
		if (ticket.valueIsIndex) delete input.value;
		return input;
	}
	function offboard(ids) {
		const removed = [];
		const removedIds = /* @__PURE__ */ new Set();
		for (const id of ids) {
			if (removedIds.has(id)) continue;
			const ticket = collection.get(id);
			if (ticket) {
				removed.push(ticket);
				removedIds.add(id);
			}
		}
		if (removed.length === 0) return [];
		batch(() => {
			let w = 0;
			for (const ticket of order) if (!removedIds.has(ticket.id)) order[w++] = ticket;
			order.length = w;
			invalidate();
			for (const ticket of removed) {
				if (ticket.valueIsIndex) indexDependentCount--;
				minDirtyIndex = Math.min(minDirtyIndex, ticket.index);
				collection.delete(ticket.id);
				directory.delete(ticket.index);
				unassign(ticket.value, ticket.id);
			}
			for (const ticket of removed) emit("unregister:ticket", ticket);
			if (indexDependentCount > 0 && minDirtyIndex < collection.size) reindex();
			else needsReindex = true;
		});
		return removed.map((ticket) => toInput(ticket));
	}
	function move(id, toIndex) {
		if (needsReindex) reindex();
		const ticket = collection.get(id);
		if (!ticket) return void 0;
		const size = collection.size;
		const target = /* @__PURE__ */ clamp(toIndex, 0, size - 1);
		const from = ticket.index;
		if (from === target) return ticket;
		return batch(() => {
			order.splice(from, 1);
			order.splice(target, 0, ticket);
			minDirtyIndex = Math.min(from, target);
			maxDirtyIndex = Math.max(from, target);
			reindex();
			emit("update:ticket", ticket);
			return ticket;
		});
	}
	function reorder(ids) {
		if (needsReindex) reindex();
		if (ids.length !== collection.size) return;
		const seen = /* @__PURE__ */ new Set();
		const next = [];
		for (const id of ids) {
			if (seen.has(id)) return;
			const ticket = collection.get(id);
			if (!ticket) return;
			seen.add(id);
			next.push(ticket);
		}
		batch(() => {
			for (const [i, ticket] of next.entries()) order[i] = ticket;
			minDirtyIndex = 0;
			maxDirtyIndex = -Infinity;
			reindex();
		});
	}
	function seek(direction = "first", from, predicate) {
		if (collection.size === 0) return void 0;
		if (needsReindex) reindex();
		const n = order.length;
		if (!predicate && /* @__PURE__ */ isUndefined(from)) return direction === "first" ? order[0] : order.at(-1);
		const index = /* @__PURE__ */ isUndefined(from) ? void 0 : /* @__PURE__ */ clamp(from, 0, n - 1);
		if (direction === "last") {
			const start = /* @__PURE__ */ isUndefined(index) ? n - 1 : index;
			for (let i = start; i >= 0; i--) {
				const ticket = order[i];
				if (!predicate || predicate(ticket)) return ticket;
			}
		} else {
			const start = /* @__PURE__ */ isUndefined(index) ? 0 : index;
			for (let i = start; i < n; i++) {
				const ticket = order[i];
				if (!predicate || predicate(ticket)) return ticket;
			}
		}
	}
	return {
		collection,
		emit,
		on,
		off,
		dispose,
		has,
		keys,
		clear,
		browse,
		entries,
		values,
		lookup,
		get,
		upsert,
		register,
		unregister,
		reindex,
		move,
		reorder,
		seek,
		batch,
		onboard,
		offboard,
		get size() {
			return collection.size;
		}
	};
}
/**
* Creates a new registry context.
*
* @param options The options for the registry context, including `namespace` (defaults to `'v0:registry'`) and `events`.
* @template Z The type of registry ticket that extends RegistryTicket. Use this to add custom properties to tickets.
* @template E The type of registry context that extends RegistryContext<Z>. Use this when extending the registry with additional methods.
* @returns A new registry context.
*
* @see https://0.vuetifyjs.com/composables/registration/create-registry
*
* @example
* ```ts
* import { createRegistryContext } from '@vuetify/v0'
*
* // With default namespace 'v0:registry'
* export const [useItems, provideItems, items] = createRegistryContext()
*
* // Or with custom namespace
* export const [useItems, provideItems, items] = createRegistryContext({ namespace: 'my-items' })
*
* // In a parent component:
* provideItems()
*
* // In a child component:
* const items = useItems()
* items.register({ id: 'item-1', value: 'Value 1' })
* ```
*/
function createRegistryContext(_options = {}) {
	const { namespace = "v0:registry", ...options } = _options;
	const context = createRegistry(options);
	return createTrinity(namespace, context);
}
/**
* Uses an existing registry from context.
*
* @param namespace The namespace for the registry context. Defaults to `'v0:registry'`.
* @template Z The type of registry ticket that extends RegistryTicket.
* @template E The type of registry context that extends RegistryContext<Z>.
* @returns The registry instance.
*
* @see https://0.vuetifyjs.com/composables/registration/create-registry
*
* @example
* ```ts
* import { useRegistry } from '@vuetify/v0'
*
* // In a child component (after provideRegistry was called by an ancestor):
* const registry = useRegistry()
*
* registry.register({ id: 'item-1', value: 'Value 1' })
* ```
*/
function useRegistry(namespace = "v0:registry") {
	return useContext(namespace);
}
//#endregion
export { createRegistryContext as n, useRegistry as r, createRegistry as t };
