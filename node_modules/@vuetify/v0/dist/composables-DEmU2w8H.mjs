import { i as SUPPORTS_MUTATION_OBSERVER, r as SUPPORTS_MATCH_MEDIA, t as IN_BROWSER } from "./globals-Bxw-y98v.mjs";
import { V0Error, clamp, findMatchRanges, getActiveElement, instanceExists, isArray, isBoolean, isElement, isFunction, isNaN, isNull, isNullOrUndefined, isNumber, isString, isThenable, isUndefined, mergeDeep, useId as useId$1 } from "./utilities/index.mjs";
import { i as useContext, t as createTrinity } from "./createTrinity-DJROWgXU.mjs";
import { n as createPluginContext, t as createPlugin } from "./createPlugin-YYkwbiUd.mjs";
import { i as useLogger } from "./useLogger-BIAZ6Iyu.mjs";
import { t as createRegistry } from "./createRegistry-COW_AjH1.mjs";
import { a as useLocale } from "./useLocale-cS3wOsyK.mjs";
import { t as toArray } from "./toArray-DCZRopC6.mjs";
import { n as useEventListener, r as useWindowEventListener } from "./useEventListener-C1aOe4Iy.mjs";
import { A as createSortable, I as ComboboxAdapter, X as useResizeObserver, Z as createObserver, y as createInput } from "./useRovingFocus-CM5nGIFN.mjs";
import { c as usePrefersReducedMotion } from "./useTheme-Dh-EW4wo.mjs";
import { n as deriveWeekInfo } from "./adapter-z5dFxm0f.mjs";
import { computed, effectScope, hasInjectionContext, isRef, onScopeDispose, onWatcherCleanup, reactive, readonly, ref, shallowReadonly, shallowRef, toRef, toValue, unref, watch, watchEffect } from "vue";
//#region src/composables/createCombobox/adapters/server.ts
/**
* @module createCombobox/adapters/server
*
* @remarks
* Server-side combobox adapter. All filtering is performed externally.
* The adapter is a pass-through — it shows all registered items and
* exposes loading state for the consumer to control.
*
* The consumer watches `query` via useComboboxContext() or slot props
* and provides filtered items reactively.
*/
var ServerComboboxAdapter = class extends ComboboxAdapter {
	setup(context) {
		const isLoading = shallowRef(false);
		return {
			filtered: toRef(() => {
				return new Set(context.items.value.map((t) => t.id));
			}),
			isLoading,
			isEmpty: toRef(() => context.items.value.length === 0)
		};
	}
};
//#endregion
//#region src/composables/createKanban/index.ts
/**
* @module createKanban
*
* @see https://0.vuetifyjs.com/composables/data/create-kanban
*
* @remarks
* Headless data-flow management for two-level sortable boards. Wraps a column
* sortable; each column ticket carries its own inner sortable on `column.items`.
* Adds a `transfer` primitive for cross-column moves with reused `disabled`
* gating and a destination-side `accept` predicate. Pure logic — no DnD, no DOM.
*
* @example
* ```ts
* import { createKanban } from '@vuetify/v0'
* import type { SortableTicketInput } from '@vuetify/v0'
*
* interface CardTicket extends SortableTicketInput {
*   value: { title: string }
* }
*
* const kanban = createKanban<CardTicket>()
*
* const todo = kanban.columns.register({ value: { title: 'Todo' } })
* const done = kanban.columns.register({ value: { title: 'Done' } })
*
* const card = todo.items.register({ value: { title: 'Write spec' } })
*
* kanban.on('transfer:ticket', ({ ticket, from, to }) => {
*   console.log(ticket.value.title, from, '→', to)
* })
*
* kanban.transfer(card.id, done.id, 0)
* ```
*/
/**
* Create a headless two-level sortable orchestrator.
*
* @param options Kanban options (currently only `disabled`).
* @returns A {@link KanbanContext}.
*
* @example
* ```ts
* import { createKanban } from '@vuetify/v0'
* import type { KanbanColumnTicketInput, SortableTicketInput } from '@vuetify/v0'
*
* interface CardTicket extends SortableTicketInput {
*   value: { title: string }
* }
*
* interface BoardColumn extends KanbanColumnTicketInput<CardTicket> {
*   value: { title: string }
* }
*
* const kanban = createKanban<CardTicket, BoardColumn>()
*
* const todo = kanban.columns.register({ value: { title: 'Todo' } })
* const review = kanban.columns.register({
*   value: { title: 'Review' },
*   accept: card => card.value.title.length > 0,
* })
*
* const spec = todo.items.register({ value: { title: 'Write spec' } })
* kanban.transfer(spec.id, review.id, 0)
* ```
*/
function createKanban(_options = {}) {
	const { disabled, ...options } = _options;
	const logger = useLogger();
	const _columns = createSortable({
		...options,
		disabled
	});
	const lookup = createRegistry({ events: true });
	const bus = createRegistry({ events: true });
	const on = bus.on;
	const off = bus.off;
	const columns = {
		..._columns,
		register(registration) {
			let ticket;
			const items = createSortable({ disabled: () => !!toValue(disabled) || !!toValue(ticket?.disabled) });
			items.on("register:ticket", (t) => {
				lookup.upsert(t.id, { value: ticket.id });
			});
			items.on("unregister:ticket", (t) => {
				lookup.get(t.id)?.unregister();
			});
			ticket = _columns.register({
				...registration,
				items
			});
			return ticket;
		},
		onboard(registrations) {
			return _columns.batch(() => registrations.map((reg) => columns.register(reg)));
		},
		upsert(id, patch = {}, event) {
			return /* @__PURE__ */ isUndefined(_columns.get(id)) ? columns.register({
				...patch,
				id
			}) : _columns.upsert(id, patch, event);
		},
		get size() {
			return _columns.size;
		}
	};
	function onColumnUnregister(column) {
		column.items.dispose();
		for (const t of lookup.values()) if (t.value === column.id) t.unregister();
	}
	function dispose() {
		for (const column of _columns.values()) column.items.dispose();
		lookup.dispose();
		bus.dispose();
		_columns.dispose();
		columns.on("unregister:ticket", onColumnUnregister);
	}
	columns.dispose = dispose;
	columns.on("unregister:ticket", onColumnUnregister);
	function isAccepted(accept, ticket, from, toIndex) {
		if (/* @__PURE__ */ isUndefined(accept)) return true;
		try {
			const result = accept(ticket, from, toIndex);
			if (/* @__PURE__ */ isThenable(result)) {
				logger.warn("accept predicate returned a thenable; async predicates are not supported — treating as reject");
				return false;
			}
			return Boolean(result);
		} catch (error) {
			logger.error("accept predicate threw; treating as reject", error);
			return false;
		}
	}
	function transfer(id, toColumnId, toIndex) {
		const fromColumnId = lookup.get(id)?.value;
		if (/* @__PURE__ */ isUndefined(fromColumnId)) {
			logger.warn(`unknown ticket id "${String(id)}"`);
			return;
		}
		const source = columns.get(fromColumnId);
		if (!source) {
			logger.warn(`unknown source column id "${String(fromColumnId)}"`);
			return;
		}
		const destination = columns.get(toColumnId);
		if (!destination) {
			logger.warn(`unknown destination column id "${String(toColumnId)}"`);
			return;
		}
		const ticket = source.items.get(id);
		if (!ticket) {
			logger.warn(`ticket "${String(id)}" missing from source column "${String(fromColumnId)}"`);
			return;
		}
		const fromIndex = ticket.index;
		if (toColumnId === fromColumnId) return source.items.move(id, toIndex);
		if (toValue(disabled) || toValue(source.disabled) || toValue(destination.disabled) || toValue(ticket.disabled)) return;
		if (!isAccepted(destination.accept, ticket, fromColumnId, toIndex)) return void 0;
		if (!/* @__PURE__ */ isUndefined(destination.items.get(id))) {
			logger.warn(`id "${String(id)}" already exists in destination column "${String(toColumnId)}"`);
			return;
		}
		let registered;
		let moved;
		destination.items.batch(() => {
			const [input] = source.items.offboard([id]);
			if (/* @__PURE__ */ isUndefined(input)) return;
			registered = destination.items.register({
				...input,
				id
			});
			moved = registered.index === toIndex ? registered : destination.items.move(registered.id, toIndex);
		});
		const final = moved ?? registered;
		if (final) bus.emit("transfer:ticket", {
			ticket: final,
			from: fromColumnId,
			to: toColumnId,
			fromIndex,
			toIndex: final.index
		});
		return final;
	}
	return {
		columns,
		transfer,
		on,
		off,
		dispose
	};
}
//#endregion
//#region src/composables/createOtp/index.ts
/**
* @module createOtp
*
* @see https://0.vuetifyjs.com/composables/forms/create-otp
*
* @remarks
* Headless state for a fixed-length one-time-password / verification-code value.
* Owns the joined string, per-character pattern matching, length contract,
* completion edge detection with a decisional async `onComplete` hook, and
* validation through `createInput`. Rendering, focus, and per-element event
* wiring are the consumer's responsibility.
*
* @example
* ```ts
* import { createOtp } from '@vuetify/v0'
*
* const otp = createOtp({
*   length: 6,
*   pattern: 'numeric',
*   onComplete: async value => {
*     const ok = await verify(value)
*     return ok
*   },
* })
*
* otp.write(0, '4')
* otp.distribute('12345', 1) // returns 5; value becomes '412345'
* otp.isComplete.value  // true
* ```
*/
const PRESETS = {
	numeric: /^[0-9]$/,
	alphanumeric: /^[a-zA-Z0-9]$/,
	alphabetic: /^[a-zA-Z]$/
};
const WARNED_PATTERNS = /* @__PURE__ */ new WeakSet();
function createOtp(_options = {}) {
	const { value = shallowRef(""), length = 6, pattern = "numeric", disabled = false, readonly: _readonly = false, onComplete, ...options } = _options;
	const logger = useLogger();
	const errorRef = shallowRef(false);
	const errorMessagesRef = shallowRef(void 0);
	const input = createInput({
		...options,
		value,
		disabled,
		readonly: _readonly,
		error: errorRef,
		errorMessages: errorMessagesRef
	});
	const lengthRef = toRef(() => toValue(length));
	let lastCompleted = "";
	function compile(resolved) {
		if (/* @__PURE__ */ isString(resolved)) return PRESETS[resolved];
		if (process.env.NODE_ENV !== "production" && !WARNED_PATTERNS.has(resolved)) {
			WARNED_PATTERNS.add(resolved);
			if (resolved.test("aa") || resolved.test("00")) logger.warn("createOtp: pattern matches multi-character input; per-character matching may behave unexpectedly");
		}
		return resolved;
	}
	function accepts(char) {
		if (char.length !== 1) return false;
		return compile(toValue(pattern)).test(char);
	}
	function filterAccepted(text) {
		let out = "";
		for (const ch of text) if (accepts(ch)) out += ch;
		return out;
	}
	const isPending = shallowRef(false);
	function isLocked() {
		return toValue(disabled) || toValue(_readonly) || isPending.value;
	}
	function clearRejection() {
		if (errorRef.value || errorMessagesRef.value) {
			errorRef.value = false;
			errorMessagesRef.value = void 0;
		}
	}
	function write(index, char) {
		if (isLocked()) return;
		const max = toValue(lengthRef);
		if (index < 0 || index >= max) return;
		if (char === "") {
			clearRejection();
			value.value = value.value.slice(0, index);
			return;
		}
		const first = char[0];
		if (!accepts(first)) return;
		clearRejection();
		const current = value.value;
		const head = current.slice(0, index);
		const tail = current.slice(index + 1);
		value.value = (head + first + tail).slice(0, max);
	}
	function distribute(text, index = 0) {
		if (isLocked()) return 0;
		const max = toValue(lengthRef);
		const start = /* @__PURE__ */ clamp(index, 0, max);
		const filtered = filterAccepted(text);
		if (filtered.length === 0) return 0;
		clearRejection();
		const head = value.value.slice(0, start);
		const next = (head + filtered).slice(0, max);
		value.value = next;
		return next.length - head.length;
	}
	function clear() {
		if (isLocked()) return;
		clearRejection();
		lastCompleted = "";
		value.value = "";
	}
	function fill(text) {
		if (isLocked()) return;
		const max = toValue(lengthRef);
		const filtered = filterAccepted(text).slice(0, max);
		if (text.length === 0 || filtered.length > 0) clearRejection();
		value.value = filtered;
	}
	function reject() {
		errorRef.value = true;
		errorMessagesRef.value = ["Invalid code"];
		lastCompleted = "";
		value.value = "";
	}
	const isComplete = toRef(() => {
		const max = toValue(lengthRef);
		const v = value.value;
		if (v.length !== max) return false;
		const re = compile(toValue(pattern));
		for (const ch of v) if (!re.test(ch)) return false;
		return true;
	});
	watch(value, (next) => {
		if (!isComplete.value) {
			lastCompleted = "";
			return;
		}
		if (!onComplete) return;
		if (isLocked()) return;
		if (next === lastCompleted) return;
		lastCompleted = next;
		let result;
		try {
			result = onComplete(next);
		} catch (error) {
			logger.warn("createOtp: onComplete threw", error);
			reject();
			return;
		}
		if (/* @__PURE__ */ isThenable(result)) {
			isPending.value = true;
			result.then((ok) => {
				isPending.value = false;
				if (ok === false) reject();
			}, (error) => {
				isPending.value = false;
				logger.warn("createOtp: onComplete rejected", error);
				reject();
			});
			return;
		}
		if (result === false) reject();
	});
	return {
		value,
		length: lengthRef,
		input: {
			...input,
			reset() {
				clearRejection();
				lastCompleted = "";
				input.reset();
			}
		},
		isComplete,
		isValidating: isPending,
		write,
		distribute,
		clear,
		fill,
		accepts
	};
}
//#endregion
//#region src/composables/createTimeline/index.ts
/**
* @module createTimeline
*
* @see https://0.vuetifyjs.com/composables/registration/create-timeline
*
* @remarks
* Bounded undo/redo system with overflow management.
*
* Key features:
* - Fixed-size history (default: 10 items)
* - Undo/redo stack management
* - Overflow queue (preserves oldest items)
* - Automatic reindexing after operations
* - Perfect for command pattern, history tracking
*
* Extends createRegistry with temporal navigation capabilities.
*
* @example
* ```ts
* import { createTimeline } from '@vuetify/v0'
*
* const timeline = createTimeline({ size: 5 })
* timeline.register({ value: 'action-1' })
* timeline.register({ value: 'action-2' })
* timeline.undo()
* ```
*/
/**
* Creates a new timeline instance.
*
* @param options The options for the timeline instance.
* @template Z The type of the timeline ticket.
* @template E The type of the timeline context.
* @returns A new timeline instance.
*
* @see https://0.vuetifyjs.com/composables/registration/create-timeline
*
* @example
* ```ts
* import { useTimeline } from '@vuetify/v0'
*
* const timeline = useTimeline({ size: 3 })
*
* timeline.onboard([{ id: 'one' }, { id: 'two' }, { id: 'three' }])
*
* console.log(timeline.values()) // [{ id: 'one' }, { id: 'two' }, { id: 'three' }]
*
* timeline.undo()
* console.log(timeline.values()) // [{ id: 'one' }, { id: 'two' }]
*
* timeline.redo()
* console.log(timeline.values()) // [{ id: 'one' }, { id: 'two' }, { id: 'three' }]
* ```
*/
function createTimeline(_options = {}) {
	const { size: _size = 10, ...options } = _options;
	const size = /* @__PURE__ */ isNaN(_size) ? 10 : Math.max(1, Math.floor(_size));
	const registry = createRegistry(options);
	const stack = [];
	const overflow = [];
	function register(item) {
		stack.length = 0;
		if (registry.size < size) return registry.register({ ...item });
		const removing = registry.seek("first");
		if (overflow.length === size) overflow.shift();
		overflow.push(removing);
		registry.unregister(removing.id);
		const ticket = registry.register({ ...item });
		registry.reindex();
		return ticket;
	}
	function undo() {
		const item = registry.seek("last");
		if (!item) return void 0;
		stack.push(item);
		registry.unregister(item.id);
		const restored = overflow.pop();
		if (restored) {
			const remaining = registry.values();
			registry.clear();
			registry.onboard([restored, ...remaining]);
			registry.reindex();
		}
		return item;
	}
	function redo() {
		if (stack.length === 0) return void 0;
		const item = stack.pop();
		if (registry.size >= size) {
			const oldest = registry.seek("first");
			if (overflow.length === size) overflow.shift();
			overflow.push(oldest);
			registry.unregister(oldest.id);
		}
		const ticket = registry.register(item);
		registry.reindex();
		return ticket;
	}
	return {
		...registry,
		register,
		undo,
		redo,
		get size() {
			return registry.size;
		}
	};
}
/**
* Creates a new timeline context.
*
* @param options The options for the timeline context.
* @template Z The type of the timeline ticket.
* @template E The type of the timeline context.
* @returns A new timeline context.
*
* @see https://0.vuetifyjs.com/composables/registration/create-timeline
*
* @example
* ```ts
* import { createTimelineContext } from '@vuetify/v0'
*
* // With default namespace 'v0:timeline'
* export const [useTimeline, provideTimeline, context] = createTimelineContext({ size: 5 })
*
* context.register({ id: 'example' })
*
* // In a parent component
* provideTimeline()
*
* // In a child component
* const timeline = useTimeline()
*
* console.log(timeline.values()) // [{ id: 'example' }]
* ```
*/
function createTimelineContext(_options = {}) {
	const { namespace = "v0:timeline", ...options } = _options;
	const context = createTimeline(options);
	return createTrinity(namespace, context);
}
/**
* Returns the current timeline instance.
*
* @param namespace The namespace for the timeline context. Defaults to `'v0:timeline'`.
* @returns The current timeline instance.
*
* @see https://0.vuetifyjs.com/composables/registration/create-timeline
*
* @example
* ```vue
* <script setup lang="ts">
*   import { useTimeline } from '@vuetify/v0'
*
*   const timeline = useTimeline()
* <\/script>
* ```
*/
function useTimeline(namespace = "v0:timeline") {
	return useContext(namespace);
}
//#endregion
//#region src/composables/createVirtual/index.ts
/**
* @module createVirtual
*
* @see https://0.vuetifyjs.com/composables/data/create-virtual
*
* @remarks
* Virtual scrolling composable for efficiently rendering large lists.
*
* Key features:
* - Trinity pattern for dependency injection (`createVirtualContext`, `useVirtual`)
* - Renders only visible items (viewport + overscan)
* - Dynamic or fixed item heights
* - SSR-safe (checks IN_BROWSER)
* - Bidirectional scrolling (forward/reverse for chat apps)
* - Scroll anchoring (maintains position across data changes)
* - Edge detection for infinite scroll
* - iOS momentum and elastic scrolling
* - Configurable overscan (extra items rendered for smooth scrolling)
*
* Perfect for large data sets, chat apps, and infinite scroll implementations.
*
* @example
* ```ts
* import { shallowRef } from 'vue'
* import { createVirtual } from '@vuetify/v0'
*
* const items = shallowRef(Array.from({ length: 10000 }, (_, i) => ({ id: i })))
* const virtual = createVirtual(items, { itemHeight: 40 })
* console.log(virtual.items.value)
* ```
*/
/**
* Virtual scrolling composable for efficiently rendering large lists
*
* @param items Reactive array of items to virtualize
* @param options Configuration options
* @returns Virtual scrolling context
*
* @see https://0.vuetifyjs.com/composables/data/create-virtual
*
* @example
* ```vue
* <script setup lang="ts">
*   import { createVirtual } from '@vuetify/v0'
*
*   const items = ref(Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `Item ${i}` })))
*   const virtual = createVirtual(items)
* <\/script>
*
* <template>
*   <div
*     ref="virtual.element"
*     style="height: 600px; overflow-y: auto;"
*     @scroll="virtual.scroll"
*   >
*     <div :style="{ height: `${virtual.offset.value}px` }" />
*
*     <div v-for="item in virtual.items.value" :key="item.index">
*       {{ item.raw.name }}
*     </div>
*
*     <div :style="{ height: `${virtual.size.value}px` }" />
*   </div>
* </template>
* ```
*/
const FALLBACK_HEIGHT = 40;
function createVirtual(items, _options = {}) {
	const { itemHeight: _itemHeight, height, overscan = 5, direction = "forward", anchor = "auto", anchorSmooth = true, onStartReached, onEndReached, startThreshold = 0, endThreshold = 0, momentum: momentumOption, elastic: elasticOption } = _options;
	const element = ref();
	const itemHeight = shallowRef(Number.parseFloat(String(_itemHeight || 0)));
	function estimate() {
		return itemHeight.value || FALLBACK_HEIGHT;
	}
	const heights = shallowRef([]);
	const offsets = shallowRef([]);
	const first = shallowRef(0);
	const last = shallowRef(0);
	const offset = shallowRef(0);
	const size = shallowRef(0);
	const viewportHeight = shallowRef(0);
	const state = shallowRef("ok");
	const isIOS = IN_BROWSER && /iPad|iPhone|iPod/.test(navigator.userAgent);
	const momentum = momentumOption ?? isIOS;
	const elastic = elasticOption ?? isIOS;
	let raf = -1;
	let rebuildRaf = -1;
	let edgeRaf = -1;
	const cachedViewport = Number.parseInt(String(height)) || 0;
	let anchorIndex = -1;
	let anchorOffset = 0;
	const computedItems = computed(() => items.value.slice(first.value, last.value).map((item, i) => ({
		raw: item,
		index: i + first.value
	})));
	watch(element, (el) => {
		if (!IN_BROWSER || !el?.style) return;
		/* v8 ignore start -- browser-only style assignments */
		if (momentum) el.style.webkitOverflowScrolling = "touch";
		if (!elastic) el.style.overscrollBehavior = "none";
		/* v8 ignore stop */
	});
	useResizeObserver(element, (entries) => {
		/* v8 ignore next -- defensive: ResizeObserver always emits at least one entry */
		if (!entries[0]) return;
		viewportHeight.value = entries[0].contentRect.height;
		update();
	});
	watch(items, (newItems) => {
		captureAnchor();
		const length = newItems.length;
		const old = heights.value;
		const newHeights = old.length === length ? old : Array.from({ length }, (_, i) => i < old.length ? old[i] : null);
		if (heights.value !== newHeights) heights.value = newHeights;
		rebuild();
	}, { immediate: true });
	watch(element, () => {
		/* v8 ignore next -- defensive: watch fires only when element is present */
		if (!element.value) return;
		if (direction === "reverse" && items.value.length > 0) {
			const lastIndex = items.value.length - 1;
			const totalHeight = (offsets.value[lastIndex] || 0) + (heights.value[lastIndex] || estimate());
			element.value.scrollTop = totalHeight;
		}
		update();
	});
	function captureAnchor() {
		if (!element.value || anchor === "auto") return;
		if (anchor === "start") {
			anchorIndex = 0;
			anchorOffset = 0;
		} else if (anchor === "end") {
			anchorIndex = items.value.length - 1;
			anchorOffset = 0;
		} else if (/* @__PURE__ */ isFunction(anchor)) {
			const result = anchor(items.value);
			/* v8 ignore next 4 -- function-anchor: tested with valid number return; non-number rejection branch is implicit */
			if (/* @__PURE__ */ isNumber(result)) {
				anchorIndex = result;
				anchorOffset = element.value.scrollTop - (offsets.value[result] || 0);
			}
		} else {
			/* v8 ignore start -- default anchor capture */
			anchorIndex = first.value;
			anchorOffset = element.value.scrollTop - (offsets.value[first.value] || 0);
		}
	}
	function restoreAnchor() {
		if (!element.value || anchorIndex < 0) return;
		const newScrollTop = (offsets.value[anchorIndex] || 0) + anchorOffset;
		if (anchorSmooth && direction === "forward") element.value.scrollTo({
			top: newScrollTop,
			behavior: "smooth"
		});
		else element.value.scrollTop = newScrollTop;
		/* v8 ignore stop */
		anchorIndex = -1;
		anchorOffset = 0;
	}
	function rebuild() {
		const length = items.value.length;
		const newOffsets = offsets.value.length === length ? offsets.value : Array.from({ length });
		let offset = 0;
		for (let i = 0; i < length; i++) {
			newOffsets[i] = offset;
			offset += heights.value[i] || estimate();
		}
		if (offsets.value !== newOffsets) offsets.value = newOffsets;
		update();
		restoreAnchor();
	}
	function findIndex(scrollTop) {
		const arr = offsets.value;
		if (arr.length === 0) return 0;
		let low = 0;
		let high = arr.length - 1;
		while (low <= high) {
			const mid = low + high >> 1;
			if (arr[mid] <= scrollTop) low = mid + 1;
			else high = mid - 1;
		}
		return Math.max(0, high);
	}
	function update() {
		if (!element.value) return;
		const viewport = viewportHeight.value || cachedViewport;
		if (!viewport) return;
		const scrollTop = element.value.scrollTop || 0;
		const length = items.value.length;
		const visibleStart = findIndex(scrollTop);
		const visibleEnd = findIndex(scrollTop + viewport) + 1;
		const start = /* @__PURE__ */ clamp(visibleStart - overscan, 0, length);
		const end = /* @__PURE__ */ clamp(visibleEnd + overscan, start, length);
		first.value = start;
		last.value = end;
		offset.value = offsets.value[start] || 0;
		const lastIndex = length - 1;
		const totalHeight = (offsets.value[lastIndex] || 0) + (heights.value[lastIndex] || estimate());
		size.value = totalHeight - (offsets.value[end] || totalHeight);
	}
	function checkEdges() {
		if (!element.value) return;
		const scrollTop = element.value.scrollTop;
		const scrollHeight = element.value.scrollHeight;
		const clientHeight = element.value.clientHeight;
		const distanceFromStart = scrollTop;
		const distanceFromEnd = scrollHeight - (scrollTop + clientHeight);
		if (IN_BROWSER) {
			cancelAnimationFrame(edgeRaf);
			edgeRaf = requestAnimationFrame(() => {
				if (onStartReached && distanceFromStart <= startThreshold) onStartReached(distanceFromStart);
				if (onEndReached && distanceFromEnd <= endThreshold) onEndReached(distanceFromEnd);
			});
		} else {
			if (onStartReached && distanceFromStart <= startThreshold) onStartReached(distanceFromStart);
			if (onEndReached && distanceFromEnd <= endThreshold) onEndReached(distanceFromEnd);
		}
		/* v8 ignore stop */
	}
	function resize(index, height) {
		/* v8 ignore next -- early bail when height is already correct */
		if (heights.value[index] === height) return;
		heights.value[index] = height;
		/* v8 ignore next -- first-call only: itemHeight bootstrapped from initial measurement */
		if (!itemHeight.value) itemHeight.value = height;
		if (IN_BROWSER) {
			cancelAnimationFrame(rebuildRaf);
			rebuildRaf = requestAnimationFrame(rebuild);
		} else rebuild();
		/* v8 ignore stop */
	}
	function scroll() {
		if (IN_BROWSER) {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(update);
			checkEdges();
		} else update();
		/* v8 ignore stop */
	}
	function scrollTo(index, scrollOptions) {
		/* v8 ignore next -- defensive: scrollTo only invoked after element mounts */
		if (!element.value) return;
		const targetOffset = offsets.value[index] || 0;
		const behavior = scrollOptions?.behavior ?? "auto";
		const block = scrollOptions?.block ?? "start";
		const extraOffset = scrollOptions?.offset ?? 0;
		let scrollTop = targetOffset + extraOffset;
		switch (block) {
			case "center": {
				const viewport = viewportHeight.value || cachedViewport;
				const itemH = heights.value[index] || estimate();
				scrollTop = targetOffset - viewport / 2 + itemH / 2 + extraOffset;
				break;
			}
			case "end": {
				const viewport = viewportHeight.value || cachedViewport;
				const itemH = heights.value[index] || estimate();
				scrollTop = targetOffset - viewport + itemH + extraOffset;
				break;
			}
			case "nearest": {
				const viewport = viewportHeight.value || cachedViewport;
				const currentScroll = element.value.scrollTop;
				const itemH = heights.value[index] || estimate();
				if (targetOffset < currentScroll) scrollTop = targetOffset + extraOffset;
				else if (targetOffset + itemH > currentScroll + viewport) scrollTop = targetOffset - viewport + itemH + extraOffset;
				else return;
				break;
			}
		}
		if (behavior === "smooth") element.value.scrollTo({
			top: scrollTop,
			behavior: "smooth"
		});
		else element.value.scrollTop = scrollTop;
		update();
	}
	function reset() {
		state.value = "ok";
		anchorIndex = -1;
		anchorOffset = 0;
		if (element.value && direction === "reverse" && items.value.length > 0) {
			const lastIndex = items.value.length - 1;
			const totalHeight = (offsets.value[lastIndex] || 0) + (heights.value[lastIndex] || estimate());
			element.value.scrollTop = totalHeight;
		}
	}
	onScopeDispose(() => {
		if (!IN_BROWSER) return;
		cancelAnimationFrame(raf);
		cancelAnimationFrame(rebuildRaf);
		cancelAnimationFrame(edgeRaf);
	}, true);
	return {
		element,
		items: computedItems,
		offset: readonly(offset),
		size: readonly(size),
		state,
		scrollTo,
		scroll,
		scrollend: scroll,
		resize,
		reset
	};
}
/**
* Creates a virtual scrolling context with dependency injection support.
*
* @param items Reactive array of items to virtualize
* @param options Configuration options including namespace
* @template T The type of the items
* @returns Trinity tuple: [useVirtual, provideVirtual, defaultVirtual]
*
* @see https://0.vuetifyjs.com/composables/data/create-virtual
*
* @example
* ```ts
* // Create injectable context
* const [useVirtual, provideVirtual, virtual] = createVirtualContext(items, {
*   namespace: 'my-virtual',
*   overscan: 10,
* })
*
* // In parent component
* provideVirtual()
*
* // In child component
* const virtual = useVirtual()
* ```
*/
function createVirtualContext(items, _options = {}) {
	const { namespace = "v0:virtual", ...options } = _options;
	const context = createVirtual(items, options);
	return createTrinity(namespace, context);
}
/**
* Returns the current virtual context from dependency injection.
*
* @param namespace The namespace for the virtual context. Defaults to `v0:virtual`.
* @template T The type of the items
* @returns The current virtual context.
*
* @throws An error if the virtual context is not found and no default is provided.
*
* @see https://0.vuetifyjs.com/composables/data/create-virtual
*
* @example
* ```vue
* <script lang="ts" setup>
*   import { createVirtual } from '@vuetify/v0'
*
*   // Inject virtual context provided by parent
*   const virtual = useVirtual()
* <\/script>
*
* <template>
*   <div>
*     <p>Visible items: {{ virtual.items.value.length }}</p>
*   </div>
* </template>
* ```
*/
function useVirtual(namespace = "v0:virtual") {
	return useContext(namespace);
}
//#endregion
//#region src/composables/toHighlight/index.ts
/**
* @module toHighlight
*
* @see https://0.vuetifyjs.com/composables/transformers/to-highlight
*
* @remarks
* Pure transformer — no DOM, no state, no registry, no reactivity. Splits text
* into matched and unmatched chunks given a query string, an array of query
* strings, or pre-computed `[start, end]` match ranges (e.g., from createFilter).
* Returns a plain array; wrap the call in `computed()` for reactive recomputation.
*
* @example
* ```ts
* import { toHighlight } from '@vuetify/v0'
*
* const chunks = toHighlight('Hello World', 'World')
* // [{ text: 'Hello ', match: false }, { text: 'World', match: true }]
* ```
*/
function merge(ranges) {
	const sorted = ranges.filter((span) => span[0] < span[1]).toSorted((a, b) => a[0] - b[0]);
	const merged = [];
	for (const span of sorted) {
		const last = merged.at(-1);
		if (last && span[0] <= last[1]) last[1] = Math.max(last[1], span[1]);
		else merged.push([span[0], span[1]]);
	}
	return merged;
}
function chunk(text, ranges) {
	const chunks = [];
	let cursor = 0;
	for (const [start, end] of ranges) {
		if (cursor < start) chunks.push({
			text: text.slice(cursor, start),
			match: false
		});
		chunks.push({
			text: text.slice(start, end),
			match: true
		});
		cursor = end;
	}
	if (cursor < text.length) chunks.push({
		text: text.slice(cursor),
		match: false
	});
	return chunks;
}
function find(text, query, options) {
	const spans = [];
	for (const term of (/* @__PURE__ */ toArray(query)).filter(Boolean)) spans.push(.../* @__PURE__ */ findMatchRanges(text, term, options));
	return merge(spans);
}
/**
* Splits text into matched and unmatched chunks.
*
* Pure transformer — returns a plain array. Wrap the call in `computed()` for
* reactive recomputation.
*
* Priority: `options.matches` (when non-empty) → `query` → no-match fallback.
*
* @param text The source string to split.
* @param query One or more search terms. Empty strings are ignored. Case sensitivity controlled by `options.ignoreCase`.
* @param options Optional `matches`, `matchAll`, `ignoreCase`, `ignoreAccents`.
* @returns A `HighlightChunk[]` array.
*
* @see https://0.vuetifyjs.com/composables/transformers/to-highlight
*
* @example
* ```ts
* import { computed, shallowRef } from 'vue'
* import { toHighlight } from '@vuetify/v0'
*
* const query = shallowRef('World')
* const chunks = computed(() => toHighlight('Hello World', query))
*
* console.log(chunks.value)
* // [{ text: 'Hello ', match: false }, { text: 'World', match: true }]
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function toHighlight(text, query, options = {}) {
	const _text = toValue(text);
	const _query = toValue(query);
	const _matches = toValue(options.matches);
	const matchAll = toValue(options.matchAll) ?? false;
	const ignoreCase = toValue(options.ignoreCase) ?? false;
	const ignoreAccents = toValue(options.ignoreAccents) ?? false;
	if (_matches?.length) return chunk(_text, merge(_matches));
	if (_query) {
		const ranges = find(_text, _query, {
			matchAll,
			ignoreCase,
			ignoreAccents
		});
		return ranges.length > 0 ? chunk(_text, ranges) : [{
			text: _text,
			match: false
		}];
	}
	return [{
		text: _text,
		match: false
	}];
}
//#endregion
//#region src/composables/toReactive/index.ts
/**
* @module toReactive
*
* @see https://0.vuetifyjs.com/composables/transformers/to-reactive
*
* @remarks
* Utility function to convert values and refs into reactive proxies with ref unwrapping.
*
* Key features:
* - Automatic ref unwrapping
* - Deep reactive proxying
* - Map and Set support with ref unwrapping
* - Nested object/array reactivity
* - Type preservation
*
* Perfect for creating reactive versions of plain objects while automatically unwrapping refs.
*
* @example
* ```ts
* import { shallowRef } from 'vue'
* import { toReactive } from '@vuetify/v0'
*
* const source = { name: shallowRef('Alice'), age: 30 }
* const reactive = toReactive(source)
* console.log(reactive.name) // 'Alice' (auto-unwrapped)
* ```
*/
function createMapProxy(refObject) {
	let mapProxy;
	const mapHandlers = {
		get: (key) => unref(refObject.value.get(key)),
		set: (key, value) => {
			const map = refObject.value;
			const existingValue = map.get(key);
			if (isRef(existingValue)) existingValue.value = unref(value);
			else map.set(key, value);
			return mapProxy;
		},
		has: (key) => refObject.value.has(key),
		delete: (key) => refObject.value.delete(key),
		clear: () => refObject.value.clear(),
		keys: () => refObject.value.keys(),
		*values() {
			for (const value of refObject.value.values()) yield unref(value);
		},
		*entries() {
			for (const [key, value] of refObject.value.entries()) yield [key, unref(value)];
		},
		forEach: (callback, thisArg) => {
			for (const [key, value] of refObject.value.entries()) callback.call(thisArg, unref(value), key, mapProxy);
		}
	};
	mapHandlers[Symbol.iterator] = mapHandlers.entries;
	mapProxy = new Proxy(/* @__PURE__ */ new Map(), { get(_, p) {
		if (p === "size") return refObject.value.size;
		if (Object.hasOwn(mapHandlers, p)) return mapHandlers[p];
		const map = refObject.value;
		const value = Reflect.get(map, p);
		return /* @__PURE__ */ isFunction(value) ? value.bind(map) : value;
	} });
	return reactive(mapProxy);
}
function createSetProxy(refObject) {
	let setProxy;
	const setHandlers = {
		add: (value) => {
			refObject.value.add(value);
			return setProxy;
		},
		has: (value) => refObject.value.has(value),
		delete: (value) => refObject.value.delete(value),
		clear: () => refObject.value.clear(),
		*keys() {
			for (const value of refObject.value.values()) yield unref(value);
		},
		*values() {
			for (const value of refObject.value.values()) yield unref(value);
		},
		*entries() {
			for (const value of refObject.value.values()) {
				const unreffedValue = unref(value);
				yield [unreffedValue, unreffedValue];
			}
		},
		forEach: (callback, thisArg) => {
			for (const value of refObject.value) {
				const unreffedValue = unref(value);
				callback.call(thisArg, unreffedValue, unreffedValue, setProxy);
			}
		}
	};
	setHandlers[Symbol.iterator] = setHandlers.values;
	setProxy = new Proxy(/* @__PURE__ */ new Set(), { get(_, p) {
		if (p === "size") return refObject.value.size;
		if (Object.hasOwn(setHandlers, p)) return setHandlers[p];
		const set = refObject.value;
		const value = Reflect.get(set, p);
		return /* @__PURE__ */ isFunction(value) ? value.bind(set) : value;
	} });
	return reactive(setProxy);
}
function createObjectProxy(refObject) {
	const proxy = new Proxy({}, {
		get(_, p, receiver) {
			return unref(Reflect.get(refObject.value, p, receiver));
		},
		set(_, p, value) {
			return Reflect.set(refObject.value, p, value);
		},
		deleteProperty(_, p) {
			return Reflect.deleteProperty(refObject.value, p);
		},
		has(_, p) {
			return Reflect.has(refObject.value, p);
		},
		ownKeys() {
			return Reflect.ownKeys(refObject.value);
		},
		getOwnPropertyDescriptor(_, p) {
			const desc = Reflect.getOwnPropertyDescriptor(refObject.value, p);
			if (!desc) return;
			const newDesc = {
				configurable: true,
				enumerable: desc.enumerable
			};
			if ("value" in desc) {
				newDesc.value = unref(desc.value);
				newDesc.writable = desc.writable;
			} else {
				newDesc.get = desc.get;
				newDesc.set = desc.set;
			}
			return newDesc;
		}
	});
	return reactive(proxy);
}
/**
* Converts a `MaybeRef` to a `UnwrapNestedRefs`.
*
* @param objectRef The object to convert.
* @template Z The type of the object.
* @returns The converted object.
*
* @see https://0.vuetifyjs.com/composables/transformers/to-reactive
*
* @example
* ```ts
* import { ref } from 'vue'
* import { toReactive } from '@vuetify/v0'
*
* const state = ref({ name: 'John', age: 30 })
* const rstate = toReactive(state)
*
* console.log(rstate.name) // John
* ```
*/
function toReactive(objectRef) {
	if (!isRef(objectRef)) return reactive(objectRef);
	const refObject = objectRef;
	const target = refObject.value;
	if (target instanceof Map) return createMapProxy(refObject);
	if (target instanceof Set) return createSetProxy(refObject);
	return createObjectProxy(refObject);
}
//#endregion
//#region src/composables/useBreakpoints/index.ts
/**
* @module useBreakpoints
*
* @see https://0.vuetifyjs.com/composables/plugins/use-breakpoints
*
* @remarks
* Responsive breakpoint detection composable with window resize handling.
*
* Key features:
* - matchMedia-based detection for zoom-accurate breakpoints
* - Six built-in breakpoints (xs, sm, md, lg, xl, xxl) with Vuetify 4 default widths
* - `isMobile` flag and configurable `mobileBreakpoint`
* - Automatic resize listener with cleanup
* - SSR-safe with hydration flush
* - Custom breakpoint configuration
*
* Perfect for responsive layouts and conditional rendering based on screen size.
*
* @example
* ```ts
* import { useBreakpoints } from '@vuetify/v0'
*
* const { current, isMobile, smAndUp } = useBreakpoints()
* console.log(current.value) // 'md'
* ```
*/
const BREAKPOINT_ORDER = [
	"xs",
	"sm",
	"md",
	"lg",
	"xl",
	"xxl"
];
/**
* Creates default breakpoint configuration.
*
* @returns The default breakpoint configuration object.
*/
function createDefaultBreakpoints() {
	return {
		mobileBreakpoint: "lg",
		breakpoints: {
			xs: 0,
			sm: 600,
			md: 840,
			lg: 1145,
			xl: 1545,
			xxl: 2138
		}
	};
}
/**
* Creates a new breakpoints instance.
*
* @param options The options for the breakpoints instance.
* @returns A new breakpoints instance.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-breakpoints
*
* @example
* ```ts
* import { createBreakpoints } from '@vuetify/v0'
*
* const breakpoints = createBreakpoints({
*   namespace: 'v0:breakpoints',
*   mobileBreakpoint: 'md',
*   breakpoints: {
*     xs: 0,
*     sm: 600,
*     md: 840,
*     lg: 1145,
*     xl: 1545,
*     xxl: 2138,
*   },
* })
* ```
*/
function createBreakpoints(_options = {}) {
	const { ssr, ...options } = _options;
	const defaults = createDefaultBreakpoints();
	const { mobileBreakpoint, breakpoints } = /* @__PURE__ */ mergeDeep(defaults, options);
	const sorted = Object.entries(breakpoints).toSorted((a, b) => a[1] - b[1]);
	const names = sorted.map(([n]) => n);
	const mb = /* @__PURE__ */ isNumber(mobileBreakpoint) ? mobileBreakpoint : breakpoints[mobileBreakpoint] ?? breakpoints.md;
	const initialWidth = ssr ? ssr.clientWidth : IN_BROWSER ? window.innerWidth : 0;
	const initialHeight = ssr ? ssr.clientHeight ?? 0 : IN_BROWSER ? window.innerHeight : 0;
	const name = shallowRef("xs");
	const width = shallowRef(initialWidth);
	const height = shallowRef(initialHeight);
	const isMobile = shallowRef(false);
	const xs = shallowRef(false);
	const sm = shallowRef(false);
	const md = shallowRef(false);
	const lg = shallowRef(false);
	const xl = shallowRef(false);
	const xxl = shallowRef(false);
	const smAndUp = shallowRef(false);
	const mdAndUp = shallowRef(false);
	const lgAndUp = shallowRef(false);
	const xlAndUp = shallowRef(false);
	const smAndDown = shallowRef(false);
	const mdAndDown = shallowRef(false);
	const lgAndDown = shallowRef(false);
	const xlAndDown = shallowRef(false);
	function resolve(value, media) {
		let current = "xs";
		for (let i = sorted.length - 1; i >= 0; i--) {
			const px = sorted[i][1];
			if (media ? window.matchMedia(`(min-width: ${px}px)`).matches : value >= px) {
				current = sorted[i][0];
				break;
			}
		}
		const index = names.indexOf(current);
		/* v8 ignore next 3 -- alternate arm is defensive: mb always resolves to a number via `?? breakpoints.md` */
		const mobile = /* @__PURE__ */ isNumber(mb) ? media ? !window.matchMedia(`(min-width: ${mb}px)`).matches : value < mb : index < names.indexOf(mobileBreakpoint);
		return {
			current,
			index,
			mobile
		};
	}
	function apply({ current, mobile }) {
		const index = BREAKPOINT_ORDER.indexOf(current);
		name.value = current;
		isMobile.value = mobile;
		xs.value = current === "xs";
		sm.value = current === "sm";
		md.value = current === "md";
		lg.value = current === "lg";
		xl.value = current === "xl";
		xxl.value = current === "xxl";
		smAndUp.value = index >= 1;
		mdAndUp.value = index >= 2;
		lgAndUp.value = index >= 3;
		xlAndUp.value = index >= 4;
		smAndDown.value = index <= 1;
		mdAndDown.value = index <= 2;
		lgAndDown.value = index <= 3;
		xlAndDown.value = index <= 4;
	}
	apply(resolve(initialWidth, !ssr && IN_BROWSER && SUPPORTS_MATCH_MEDIA));
	let listening = false;
	function listen() {
		if (listening || !IN_BROWSER) return;
		listening = true;
		useWindowEventListener("resize", () => {
			update();
		}, { passive: true });
	}
	function update() {
		if (!IN_BROWSER) return;
		listen();
		width.value = window.innerWidth;
		height.value = window.innerHeight;
		apply(resolve(width.value, SUPPORTS_MATCH_MEDIA));
	}
	if (!ssr) listen();
	return {
		breakpoints,
		mobileBreakpoint,
		name: readonly(name),
		width: readonly(width),
		height: readonly(height),
		isMobile: readonly(isMobile),
		xs: readonly(xs),
		sm: readonly(sm),
		md: readonly(md),
		lg: readonly(lg),
		xl: readonly(xl),
		xxl: readonly(xxl),
		smAndUp: readonly(smAndUp),
		mdAndUp: readonly(mdAndUp),
		lgAndUp: readonly(lgAndUp),
		xlAndUp: readonly(xlAndUp),
		smAndDown: readonly(smAndDown),
		mdAndDown: readonly(mdAndDown),
		lgAndDown: readonly(lgAndDown),
		xlAndDown: readonly(xlAndDown),
		ssr: !!ssr,
		update
	};
}
function createBreakpointsFallback(options = {}) {
	if (options.ssr) return createBreakpoints(options);
	const defaults = createDefaultBreakpoints();
	return {
		breakpoints: defaults.breakpoints,
		mobileBreakpoint: defaults.mobileBreakpoint,
		name: readonly(shallowRef("xs")),
		width: readonly(shallowRef(0)),
		height: readonly(shallowRef(0)),
		isMobile: readonly(shallowRef(true)),
		xs: readonly(shallowRef(true)),
		sm: readonly(shallowRef(false)),
		md: readonly(shallowRef(false)),
		lg: readonly(shallowRef(false)),
		xl: readonly(shallowRef(false)),
		xxl: readonly(shallowRef(false)),
		smAndUp: readonly(shallowRef(false)),
		mdAndUp: readonly(shallowRef(false)),
		lgAndUp: readonly(shallowRef(false)),
		xlAndUp: readonly(shallowRef(false)),
		smAndDown: readonly(shallowRef(true)),
		mdAndDown: readonly(shallowRef(true)),
		lgAndDown: readonly(shallowRef(true)),
		xlAndDown: readonly(shallowRef(true)),
		ssr: false,
		update: () => {}
	};
}
const [createBreakpointsContext, createBreakpointsPlugin, useBreakpoints] = createPluginContext("v0:breakpoints", (options) => createBreakpoints(options), {
	fallback: () => createBreakpointsFallback(),
	setup: (context, app, options) => {
		if (!options?.ssr) {
			if (IN_BROWSER) context.update();
			return;
		}
		const { mount } = app;
		app.mount = (...args) => {
			const vm = mount(...args);
			context.update();
			app.mount = mount;
			return vm;
		};
	}
});
//#endregion
//#region src/composables/useDate/index.ts
/**
* @module useDate
*
* @see https://0.vuetifyjs.com/composables/plugins/use-date
*
* @remarks
* Date manipulation composable with adapter pattern for date operations.
*
* Key features:
* - Adapter pattern for date library abstraction
* - Locale-aware formatting via Intl.DateTimeFormat
* - `firstDayOfWeek` derived from locale and propagated to adapter
* - Integration with useLocale for automatic locale sync
*
* @example Using the built-in Temporal adapter
* ```ts
* import { V0DateAdapter } from '@vuetify/v0/date'
* import { createDatePlugin } from '@vuetify/v0'
*
* const app = createApp(App)
* app.use(createDatePlugin({ adapter: new V0DateAdapter() }))
*
* // In a component:
* const { adapter } = useDate()
* const today = adapter.date()
* const formatted = adapter.format(today, 'fullDate')
* ```
*
* @example Custom adapter
* ```ts
* import { DateAdapter } from '@vuetify/v0'
*
* class DateFnsAdapter extends DateAdapter<Date> {
*   // ... implementation
* }
*
* app.use(createDatePlugin({ adapter: new DateFnsAdapter() }))
* ```
*/
/**
* Default short locale codes mapped to full Intl locale strings.
* Used when useLocale provides a short code without region (e.g., 'en' instead of 'en-US').
*/
const defaultLocales = {
	en: "en-US",
	es: "es-ES",
	fr: "fr-FR",
	de: "de-DE",
	it: "it-IT",
	pt: "pt-BR",
	ja: "ja-JP",
	ko: "ko-KR",
	zh: "zh-CN",
	ru: "ru-RU",
	ar: "ar-SA"
};
/**
* Creates a new date context.
*
* @param options Adapter and locale configuration.
* @template Z The date type used by the adapter.
* @template E The date context type.
* @returns A date context.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-date
*
* @example
* ```ts
* import { V0DateAdapter } from '@vuetify/v0/date'
*
* const { adapter } = createDate({ adapter: new V0DateAdapter() })
* const today = adapter.date()
*
* // With locale options
* const { adapter } = createDate({
*   adapter: new V0DateAdapter(),
*   locale: 'de-DE',
* })
* ```
*/
function createDate(options) {
	const { locales = defaultLocales, adapter, locale: initialLocale, firstDayOfWeek: explicitFirstDay } = options;
	let selectedId;
	try {
		if (hasInjectionContext()) selectedId = useLocale().selectedId;
	} catch {}
	const locale = computed(() => {
		const selected = selectedId?.value;
		if (!/* @__PURE__ */ isNullOrUndefined(selected)) {
			const str = String(selected);
			return str.includes("-") ? str : locales[str] ?? str;
		}
		const fallback = initialLocale ?? adapter.locale ?? "en-US";
		return fallback.includes("-") ? fallback : locales[fallback] ?? fallback;
	});
	const firstDayOfWeek = computed(() => {
		if (!/* @__PURE__ */ isUndefined(explicitFirstDay)) return explicitFirstDay;
		const loc = locale.value;
		return loc ? (/* @__PURE__ */ deriveWeekInfo(loc)).firstDay : 0;
	});
	if (hasInjectionContext()) {
		const stop = watchEffect(() => {
			const loc = locale.value;
			if (loc && adapter.locale !== loc) adapter.locale = loc;
			const fdow = firstDayOfWeek.value;
			if (adapter.firstDayOfWeek !== fdow) adapter.firstDayOfWeek = fdow;
		});
		onScopeDispose(stop, true);
	} else {
		const loc = locale.value;
		if (loc && adapter.locale !== loc) adapter.locale = loc;
		const fdow = firstDayOfWeek.value;
		if (adapter.firstDayOfWeek !== fdow) adapter.firstDayOfWeek = fdow;
	}
	return {
		adapter,
		locale,
		firstDayOfWeek
	};
}
/**
* Creates a new date context trinity.
*
* @param options Adapter, locale, and namespace configuration.
* @template Z The date type used by the adapter.
* @template E The date context type.
* @returns A trinity [useContext, provideContext, defaultContext].
*
* @see https://0.vuetifyjs.com/composables/plugins/use-date
*
* @example
* ```ts
* import { V0DateAdapter } from '@vuetify/v0/date'
*
* const [useAppDate, provideAppDate] = createDateContext({
*   adapter: new V0DateAdapter(),
*   namespace: 'app:date',
* })
* ```
*/
function createDateContext(_options) {
	const { namespace = "v0:date", ...options } = _options;
	const context = createDate(options);
	return createTrinity(namespace, context);
}
/**
* Creates a new date plugin.
*
* @param options Adapter, locale, and namespace configuration.
* @template Z The date type used by the adapter.
* @template E The date context type.
* @returns A Vue plugin.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-date
*
* @example
* ```ts
* import { V0DateAdapter } from '@vuetify/v0/date'
*
* const app = createApp(App)
* app.use(createDatePlugin({ adapter: new V0DateAdapter() }))
*
* // With locale options
* app.use(createDatePlugin({
*   adapter: new V0DateAdapter(),
*   locale: 'de-DE',
* }))
* ```
*/
function createDatePlugin(_options) {
	const { namespace = "v0:date", ...options } = _options;
	return createPlugin({
		namespace,
		provide: (app) => {
			const [, provideDateContext, context] = createDateContext({
				namespace,
				...options
			});
			provideDateContext(context, app);
		}
	});
}
/**
* Returns the current date context.
*
* Requires `createDatePlugin` to be installed with an adapter.
*
* @param namespace The namespace to look up (defaults to 'v0:date').
* @template Z The date type used by the adapter.
* @template E The date context type.
* @returns The current date context.
* @throws If called outside a component or without a date plugin installed.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-date
*
* @example
* ```ts
* // main.ts
* import { V0DateAdapter } from '@vuetify/v0/date'
* import { createDatePlugin } from '@vuetify/v0'
*
* app.use(createDatePlugin({ adapter: new V0DateAdapter() }))
* ```
*
* @example
* ```vue
* <script setup lang="ts">
* import { useDate } from '@vuetify/v0'
*
* const { adapter, locale } = useDate()
* const today = adapter.date()
* <\/script>
* ```
*/
function useDate(namespace = "v0:date") {
	if (!/* @__PURE__ */ instanceExists()) throw new V0Error("[v0] useDate() must be called inside a Vue component with createDatePlugin installed.\n\nExample:\n  import { V0DateAdapter } from '@vuetify/v0/date'\n  import { createDatePlugin } from '@vuetify/v0'\n\n  app.use(createDatePlugin({ adapter: new V0DateAdapter() }))", {
		code: "V0_PLUGIN_MISSING",
		plugin: "createDatePlugin"
	});
	return useContext(namespace);
}
//#endregion
//#region src/composables/useMutationObserver/index.ts
/**
* @module useMutationObserver
*
* @see https://0.vuetifyjs.com/composables/system/use-mutation-observer
*
* @remarks
* MutationObserver composable with lifecycle management.
*
* Key features:
* - MutationObserver API wrapper
* - `isActive` reactive flag
* - `once` option for single-fire observation
* - Pause/resume/stop functionality
* - Automatic cleanup on unmount
* - SSR-safe (checks SUPPORTS_MUTATION_OBSERVER)
* - Hydration-aware
* - Configurable observation options (childList, attributes, characterData, etc.)
*
* Perfect for detecting DOM changes and responding to mutations.
*
* @example
* ```ts
* import { useTemplateRef } from 'vue'
* import { useMutationObserver } from '@vuetify/v0'
*
* const target = useTemplateRef('target')
* useMutationObserver(target, records => {
*   console.log(records)
* }, { childList: true })
* ```
*/
/**
* A composable that uses the Mutation Observer API to detect changes in the DOM.
*
* @param target The element to observe.
* @param callback The callback to execute when a mutation is observed.
* @param options The options for the Mutation Observer.
* @returns An object with methods to control the observer.
*
* @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
* @see https://0.vuetifyjs.com/composables/system/use-mutation-observer
*
* @example
* ```ts
* import { ref } from 'vue'
* import { useMutationObserver } from '@vuetify/v0'
*
* const container = ref<HTMLElement>()
*
* const { pause, resume, isPaused } = useMutationObserver(
*   container,
*   (mutations) => {
*     mutations.forEach((mutation) => {
*       if (mutation.type === 'childList') {
*         console.log('Children changed:', mutation.addedNodes, mutation.removedNodes)
*       } else if (mutation.type === 'attributes') {
*         console.log('Attribute changed:', mutation.attributeName)
*       }
*     })
*   },
*   {
*     childList: true,
*     attributes: true,
*     subtree: true
*   }
* )
*
* // Pause observation
* pause()
*
* // Resume observation
* resume()
* ```
*/
function useMutationObserver(target, callback, options = {}) {
	const observerOptions = {
		childList: options.childList ?? true,
		attributes: options.attributes ?? false,
		characterData: options.characterData ?? false,
		subtree: options.subtree ?? false,
		attributeOldValue: options.attributeOldValue ?? false,
		characterDataOldValue: options.characterDataOldValue ?? false,
		attributeFilter: options.attributeFilter
	};
	return createObserver(target, callback, {
		supports: SUPPORTS_MUTATION_OBSERVER,
		once: options.once,
		create: (cb) => new MutationObserver((mutations) => {
			cb(mutations.map((m) => ({
				type: m.type,
				target: m.target,
				addedNodes: m.addedNodes,
				removedNodes: m.removedNodes,
				previousSibling: m.previousSibling,
				nextSibling: m.nextSibling,
				attributeName: m.attributeName,
				attributeNamespace: m.attributeNamespace,
				oldValue: m.oldValue
			})));
		}),
		observe: (obs, el) => obs.observe(el, observerOptions),
		immediate: options.immediate ? (el) => {
			const emptyNodeList = {
				length: 0,
				item: () => null,
				forEach: () => {},
				*[Symbol.iterator]() {}
			};
			return [{
				type: "childList",
				target: el,
				addedNodes: emptyNodeList,
				removedNodes: emptyNodeList,
				previousSibling: null,
				nextSibling: null,
				attributeName: null,
				attributeNamespace: null,
				oldValue: null
			}];
		} : void 0,
		onceIncludesImmediate: true
	});
}
//#endregion
//#region src/composables/useDragDrop/adapters/adapter.ts
/**
* @module useDragDrop/adapters/adapter
*
* @remarks
* Adapter contract and abstract base for useDragDrop. Concrete adapters extend
* `DragDropAdapter<Z>` to share the `cleanup` field, `dispose()` lifecycle, and
* the `locate()` DOM-walk helper.
*/
/**
* Abstract base class for useDragDrop adapters. Provides a `cleanup` slot, a
* `dispose()` lifecycle, and a `locate()` helper that walks the DOM to find the
* draggable ticket whose `el` ancestors a given event target.
*
* @example
* ```ts
* import { DragDropAdapter, type DragDropAdapterContext } from '@vuetify/v0'
*
* class MyAdapter extends DragDropAdapter {
*   setup (context: DragDropAdapterContext) {
*     const stop = useEventListener(document, 'mousedown', event => {
*       const ticket = this.locate(event.target, context)
*       if (ticket) context.emit.start(ticket, { x: event.clientX, y: event.clientY }, 'pointer')
*     })
*     this.cleanup = () => stop()
*   }
* }
* ```
*/
var DragDropAdapter = class {
	cleanup = null;
	dispose() {
		this.cleanup?.();
		this.cleanup = null;
	}
	locate(target, context) {
		let element = /* @__PURE__ */ isElement(target) ? target : null;
		while (element) {
			for (const ticket of context.draggables.values()) if (ticket.el.value === element) return ticket;
			element = element.parentElement;
		}
		return null;
	}
};
//#endregion
//#region src/composables/useDragDrop/adapters/pointer.ts
/**
* @module useDragDrop/adapters/pointer
*
* @remarks
* Default pointer adapter for useDragDrop. Listens for `pointerdown` /
* `pointermove` / `pointerup` / `pointercancel` on the document and emits the
* drag lifecycle. Activation distance is configurable via `threshold`.
*/
/**
* Default pointer adapter. Wires `pointerdown` / `pointermove` / `pointerup` /
* `pointercancel` on the document and converts them into drag lifecycle calls.
*
* @example
* ```ts
* import { PointerAdapter, useDragDrop } from '@vuetify/v0'
*
* useDragDrop({ adapters: [new PointerAdapter({ threshold: 10 })] })
* ```
*/
var PointerAdapter = class extends DragDropAdapter {
	threshold;
	constructor(options = {}) {
		super();
		this.threshold = options.threshold ?? 0;
	}
	setup(context) {
		const logger = useLogger();
		if (this.cleanup) {
			logger.warn("PointerAdapter setup called twice; previous registration will be replaced");
			this.dispose();
		}
		if (!IN_BROWSER) return;
		let downSource = null;
		let downOrigin = null;
		let downId = null;
		let started = false;
		function reset() {
			downSource = null;
			downOrigin = null;
			downId = null;
			started = false;
		}
		const onDown = (event) => {
			if (event.button !== 0) return;
			if (downSource) return;
			const ticket = this.locate(event.target, context);
			if (!ticket) return;
			downSource = ticket;
			downOrigin = {
				x: event.clientX,
				y: event.clientY
			};
			downId = event.pointerId;
			started = false;
		};
		const onMove = (event) => {
			if (!downSource || !downOrigin || event.pointerId !== downId) return;
			const point = {
				x: event.clientX,
				y: event.clientY
			};
			if (!started) {
				const dx = point.x - downOrigin.x;
				const dy = point.y - downOrigin.y;
				if (this.threshold > 0 && Math.hypot(dx, dy) < this.threshold) return;
				context.emit.start(downSource, downOrigin, "pointer");
				started = true;
			}
			context.emit.move(point);
		};
		function onUp(event) {
			if (event.pointerId !== downId) return;
			if (downSource && started) context.emit.drop();
			reset();
		}
		function onCancel(event) {
			if (event.pointerId !== downId) return;
			if (downSource && started) context.emit.cancel();
			reset();
		}
		const stopDown = useEventListener(document, "pointerdown", onDown);
		const stopMove = useEventListener(document, "pointermove", onMove);
		const stopUp = useEventListener(document, "pointerup", onUp);
		const stopCancel = useEventListener(document, "pointercancel", onCancel);
		this.cleanup = () => {
			stopDown();
			stopMove();
			stopUp();
			stopCancel();
		};
	}
};
//#endregion
//#region src/composables/useDragDrop/adapters/keyboard.ts
/**
* @module useDragDrop/adapters/keyboard
*
* @remarks
* Default keyboard adapter for useDragDrop. Listens for `keydown` on the
* document. Activation keys (default Space and Enter) start and drop drags;
* arrow keys nudge the drag point by `step` px; Escape cancels.
*/
function isEditable(element) {
	if (/* @__PURE__ */ isNull(element)) return false;
	const tag = element.tagName;
	if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
	if (element.isContentEditable) return true;
	const role = element.getAttribute("role");
	return role === "textbox" || role === "searchbox" || role === "combobox" || role === "spinbutton";
}
/**
* Default keyboard adapter. Listens for `keydown` on the document; activation
* keys start/drop drags, arrow keys nudge the drag point, Escape cancels.
*
* @example
* ```ts
* import { KeyboardAdapter, useDragDrop } from '@vuetify/v0'
*
* useDragDrop({ adapters: [new KeyboardAdapter({ activate: ['x'], step: 32 })] })
* ```
*/
var KeyboardAdapter = class extends DragDropAdapter {
	activate;
	step;
	constructor(options = {}) {
		super();
		this.activate = options.activate ?? [" ", "Enter"];
		this.step = options.step ?? 16;
	}
	setup(context) {
		const logger = useLogger();
		if (this.cleanup) {
			logger.warn("KeyboardAdapter setup called twice; previous registration will be replaced");
			this.dispose();
		}
		if (!IN_BROWSER) return;
		const onKeydown = (event) => {
			const focused = /* @__PURE__ */ getActiveElement();
			if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
			if (isEditable(focused)) return;
			const ticket = this.locate(focused, context);
			const isActive = !/* @__PURE__ */ isNull(context.active.value);
			if (this.activate.includes(event.key)) {
				if (isActive) {
					event.preventDefault();
					context.emit.drop();
				} else if (ticket) {
					const el = ticket.el.value;
					if (!el) {
						logger.warn("KeyboardAdapter: cannot start drag — element is not mounted");
						return;
					}
					event.preventDefault();
					const rect = el.getBoundingClientRect();
					context.emit.start(ticket, {
						x: rect.left + rect.width / 2,
						y: rect.top + rect.height / 2
					}, "keyboard");
				}
				return;
			}
			if (event.key === "Escape" && isActive) {
				event.preventDefault();
				context.emit.cancel();
				return;
			}
			if (isActive && event.key.startsWith("Arrow")) {
				const active = context.active.value;
				if (/* @__PURE__ */ isNull(active)) return;
				const current = active.current;
				let point = null;
				switch (event.key) {
					case "ArrowUp":
						point = {
							x: current.x,
							y: current.y - this.step
						};
						break;
					case "ArrowDown":
						point = {
							x: current.x,
							y: current.y + this.step
						};
						break;
					case "ArrowLeft":
						point = {
							x: current.x - this.step,
							y: current.y
						};
						break;
					case "ArrowRight": point = {
						x: current.x + this.step,
						y: current.y
					};
				}
				if (point) {
					event.preventDefault();
					context.emit.move(point);
				}
			}
		};
		const stop = useEventListener(document, "keydown", onKeydown);
		this.cleanup = () => stop();
	}
};
//#endregion
//#region src/composables/useDragDrop/index.ts
/**
* @module useDragDrop
*
* @see https://0.vuetifyjs.com/composables/system/use-drag-drop
*
* @remarks
* Headless drag-and-drop primitive. Owns two registries (draggables and zones)
* plus the active-drag state. Pointer and keyboard adapters ship by default;
* lifecycle hooks and a plugin array provide extension points.
*
* @example
* ```ts
* import { useDragDrop } from '@vuetify/v0'
*
* const dnd = useDragDrop()
* ```
*/
function toSource(source) {
	return toValue(source);
}
/**
* Pure math for resolving where in an oriented zone a pointer would drop.
* Internal — consumers rely on the `position.index` / `position.indicator`
* fields delivered to `onDrop`.
*
* Assumes rects ascend along the axis (DOM order in normal flow). Reversed
* layouts resolve arbitrary slots — always have — and sorting is not the fix:
* the slot must stay the child's DOM index for consumers to splice by.
*/
function resolveDropPosition(point, rects, orientation) {
	if (rects.length === 0) return null;
	const axis = orientation === "vertical" ? "y" : "x";
	const start = orientation === "vertical" ? "top" : "left";
	const end = orientation === "vertical" ? "bottom" : "right";
	const coord = point[axis];
	let index = rects.length;
	for (const [at, rect] of rects.entries()) if (coord < rect[start] + (rect[end] - rect[start]) / 2) {
		index = at;
		break;
	}
	return index === 0 ? {
		index,
		edge: "before",
		rect: rects[0]
	} : {
		index,
		edge: "after",
		rect: rects[index - 1]
	};
}
/**
* Create a headless drag-and-drop context.
*
* @param options - Adapters, plugins, and lifecycle hooks. All optional.
* @returns A `DragDropContext<Z>` exposing `draggables` / `zones` registries,
*   the `active` drag, the `isDragging` boolean, and a programmatic `cancel()`.
*
* @see https://0.vuetifyjs.com/composables/system/use-drag-drop
*
* @example
* ```ts
* import { useDragDrop } from '@vuetify/v0'
* import { useTemplateRef } from 'vue'
*
* const dnd = useDragDrop<{ type: 'card', value: string }>()
*
* const draggable = useTemplateRef<HTMLElement>('draggable')
* const dropzone = useTemplateRef<HTMLElement>('dropzone')
*
* dnd.draggables.register({ el: draggable, type: 'card', value: 'card-1' })
* dnd.zones.register({
*   el: dropzone,
*   accept: ['card'],
*   onDrop: (drag, position) => console.log(drag.value, position.index),
* })
* ```
*/
function useDragDrop(options = {}) {
	const { plugins = [] } = options;
	const logger = useLogger();
	const _draggables = createRegistry({ events: true });
	const _zones = createRegistry({ events: true });
	const active = shallowRef(null);
	const isDragging = toRef(() => !/* @__PURE__ */ isNull(active.value));
	const scopes = /* @__PURE__ */ new Map();
	const nodes = /* @__PURE__ */ new Map();
	function next(fn, ...args) {
		if (/* @__PURE__ */ isUndefined(fn)) return;
		try {
			fn(...args);
		} catch (error) {
			logger.error("useDragDrop hook threw", error);
		}
	}
	function safeAccept(accept, drag) {
		try {
			if (/* @__PURE__ */ isNull(drag)) return false;
			if (/* @__PURE__ */ isUndefined(accept)) return true;
			if (/* @__PURE__ */ isArray(accept)) return accept.includes(drag.type);
			const result = accept(drag);
			if (/* @__PURE__ */ isThenable(result)) {
				logger.warn("useDragDrop accept predicate returned a thenable; async predicates are not supported — treating as reject");
				return false;
			}
			return Boolean(result);
		} catch (error) {
			logger.error("useDragDrop accept predicate threw; treating as reject", error);
			return false;
		}
	}
	const draggables = {
		..._draggables,
		register(registration) {
			const id = registration.id ?? /* @__PURE__ */ useId$1();
			const el = toRef(() => toSource(registration.el));
			const dragging = toRef(() => active.value?.id === id);
			const input = {
				...registration,
				id,
				el,
				isDragging: dragging
			};
			return _draggables.register(input);
		}
	};
	const zones = {
		..._zones,
		register(registration) {
			const id = registration.id ?? /* @__PURE__ */ useId$1();
			if (_zones.has(id)) return _zones.register(registration);
			const el = toRef(() => toSource(registration.el));
			const isOver = toRef(() => active.value?.over === id);
			const willAccept = toRef(() => safeAccept(registration.accept, active.value));
			const rects = shallowRef([]);
			function refresh() {
				const zoneEl = el.value;
				rects.value = zoneEl ? Array.from(zoneEl.children).map((child) => child.getBoundingClientRect()) : [];
			}
			const scope = effectScope();
			scopes.set(id, scope);
			scope.run(() => {
				if (registration.orientation) {
					watch(el, refresh, {
						immediate: true,
						flush: "post"
					});
					useResizeObserver(el, refresh);
					useMutationObserver(el, refresh, { childList: true });
					watch(() => active.value?.id, (id) => {
						if (id) refresh();
					});
				}
				watch(el, (current) => {
					if (/* @__PURE__ */ isNull(current)) return;
					nodes.set(current, id);
					onWatcherCleanup(() => nodes.delete(current));
				}, { immediate: true });
			});
			const indicator = computed(() => {
				if (!registration.orientation || !isOver.value || !active.value) return null;
				const resolved = resolveDropPosition(active.value.current, rects.value, registration.orientation);
				if (!resolved) return null;
				const from = home(el.value, active.value.id);
				if (from !== -1 && (resolved.index === from || resolved.index === from + 1)) return null;
				return resolved;
			});
			const input = {
				...registration,
				id,
				el,
				isOver,
				willAccept,
				indicator
			};
			return _zones.register(input);
		}
	};
	function at(point) {
		if (!IN_BROWSER) return null;
		let element = document.elementFromPoint(point.x, point.y);
		while (element) {
			const id = nodes.get(element);
			if (!/* @__PURE__ */ isUndefined(id)) {
				const zone = _zones.get(id);
				if (zone && !toValue(zone.disabled)) return id;
			}
			element = element.parentElement;
		}
		return null;
	}
	function home(zoneEl, id) {
		const source = toValue(_draggables.get(id)?.el);
		if (!zoneEl || !source) return -1;
		for (let el = source.parentElement; el; el = el.parentElement) {
			if (!nodes.has(el)) continue;
			if (el !== zoneEl) return -1;
			break;
		}
		return Array.from(zoneEl.children).findIndex((child) => child.contains(source));
	}
	function position(zoneId, drag) {
		const zone = _zones.get(zoneId);
		const out = { pointer: drag.current };
		if (zone?.orientation) {
			const resolved = zone.indicator?.value ?? null;
			if (resolved) {
				out.index = resolved.index;
				out.indicator = resolved;
			} else {
				const from = home(toValue(zone.el), drag.id);
				out.index = from === -1 ? 0 : from;
			}
		}
		return out;
	}
	function bail(drag, reason = "cancel") {
		active.value = null;
		if (!/* @__PURE__ */ isNull(drag.over)) next(_zones.get(drag.over)?.onLeave, drag);
		next(_draggables.get(drag.id)?.onCancel, drag, reason);
		next(options.onCancel, drag, reason);
	}
	function onStart(source, origin, via) {
		if (toValue(_draggables.get(source.id)?.disabled)) return;
		const draft = {
			id: source.id,
			type: source.type,
			value: source.value,
			origin,
			current: origin,
			delta: {
				x: 0,
				y: 0
			},
			over: null,
			willAccept: false,
			via
		};
		try {
			if (_draggables.get(source.id)?.onBeforeStart?.(draft) === false) return;
		} catch (error) {
			logger.error("useDragDrop onBeforeStart threw; treating as veto", error);
			return;
		}
		try {
			if (options.onBeforeStart?.(draft) === false) return;
		} catch (error) {
			logger.error("useDragDrop onBeforeStart threw; treating as veto", error);
			return;
		}
		active.value = draft;
	}
	function onMove(point) {
		if (!active.value) return;
		const over = at(point);
		const draft = {
			...active.value,
			current: point,
			delta: {
				x: point.x - active.value.origin.x,
				y: point.y - active.value.origin.y
			},
			over,
			willAccept: false
		};
		draft.willAccept = !/* @__PURE__ */ isNull(over) && safeAccept(_zones.get(over)?.accept, draft);
		const previous = active.value.over;
		active.value = draft;
		if (previous !== over) {
			if (!/* @__PURE__ */ isNull(previous)) next(_zones.get(previous)?.onLeave, draft);
			if (!/* @__PURE__ */ isNull(over)) next(_zones.get(over)?.onEnter, draft);
		}
		next(_draggables.get(draft.id)?.onMove, draft);
		next(options.onMove, draft);
	}
	function onDrop() {
		if (!active.value) return;
		const drag = active.value;
		const zoneId = drag.over;
		if (/* @__PURE__ */ isNull(zoneId)) {
			bail(drag);
			return;
		}
		const dropAt = position(zoneId, drag);
		const zone = _zones.get(zoneId);
		function vetoed(fn, label) {
			if (!fn) return false;
			try {
				return fn(drag, dropAt) === false;
			} catch (error) {
				logger.error(`useDragDrop ${label} threw; treating as veto`, error);
				return true;
			}
		}
		if (vetoed(zone?.onBeforeDrop, "zone onBeforeDrop") || vetoed(options.onBeforeDrop, "options onBeforeDrop")) {
			bail(drag, "reject");
			return;
		}
		active.value = null;
		next(zone?.onDrop, drag, dropAt);
		next(options.onDrop, drag, dropAt);
	}
	function cancel() {
		if (!active.value) return;
		bail(active.value);
	}
	const context = {
		draggables,
		zones,
		active: shallowReadonly(active),
		isDragging,
		cancel
	};
	const disposers = [];
	const adapters = options.adapters ?? [new PointerAdapter(), new KeyboardAdapter()];
	const emit = {
		start: (source, origin, via) => onStart(source, origin, via),
		move: (point) => onMove(point),
		drop: () => onDrop(),
		cancel: () => cancel()
	};
	const adapterContext = {
		...context,
		emit
	};
	for (const adapter of adapters) try {
		adapter.setup(adapterContext);
		disposers.push(() => adapter.dispose());
	} catch (error) {
		logger.error("useDragDrop adapter setup threw; skipping adapter", error);
		try {
			adapter.dispose();
		} catch (disposeError) {
			logger.error("useDragDrop adapter dispose threw after setup failure", disposeError);
		}
	}
	for (const plugin of plugins) try {
		const dispose = plugin(context);
		if (/* @__PURE__ */ isFunction(dispose)) disposers.push(dispose);
	} catch (error) {
		logger.error("useDragDrop plugin install threw; skipping plugin", error);
	}
	_draggables.on("unregister:ticket", (ticket) => {
		if (active.value?.id === ticket.id) cancel();
	});
	_zones.on("unregister:ticket", (ticket) => {
		const scope = scopes.get(ticket.id);
		if (scope) {
			scope.stop();
			scopes.delete(ticket.id);
		}
		if (active.value?.over === ticket.id) {
			next(ticket.onLeave, active.value);
			active.value = {
				...active.value,
				over: null,
				willAccept: false
			};
		}
	});
	onScopeDispose(() => {
		if (!/* @__PURE__ */ isNull(active.value)) cancel();
		for (const dispose of disposers.toReversed()) try {
			dispose();
		} catch (error) {
			logger.error("useDragDrop disposer threw", error);
		}
		for (const scope of scopes.values()) try {
			scope.stop();
		} catch (error) {
			logger.error("useDragDrop zone scope dispose threw", error);
		}
		scopes.clear();
		nodes.clear();
		try {
			_draggables.dispose();
		} catch (error) {
			logger.error("useDragDrop draggables dispose threw", error);
		}
		try {
			_zones.dispose();
		} catch (error) {
			logger.error("useDragDrop zones dispose threw", error);
		}
	}, true);
	return context;
}
//#endregion
//#region src/composables/useHotkey/aliases.ts
/**
* Key alias mapping for consistent key normalization across the hotkey system.
*
* Maps user-friendly aliases to canonical key names that match
* KeyboardEvent.key values (in lowercase) where possible.
*/
const keyAliasMap = {
	control: "ctrl",
	command: "cmd",
	option: "alt",
	up: "arrowup",
	down: "arrowdown",
	left: "arrowleft",
	right: "arrowright",
	esc: "escape",
	spacebar: " ",
	space: " ",
	return: "enter",
	del: "delete",
	plus: "+",
	slash: "/",
	underscore: "_",
	minus: "-",
	hyphen: "-"
};
/* #__NO_SIDE_EFFECTS__ */
function normalizeKey(key) {
	const lowerKey = key.toLowerCase();
	return keyAliasMap[lowerKey] ?? lowerKey;
}
//#endregion
//#region src/composables/useHotkey/parsing.ts
const logger = /* @__PURE__ */ useLogger();
const MODIFIERS = [
	"ctrl",
	"shift",
	"alt",
	"meta",
	"cmd"
];
/**
* Splits a single combination string into individual key parts.
*
* A combination is a set of keys that must be pressed simultaneously.
* e.g. `ctrl+k`, `shift+-`
*
* @param combination - The combination string to parse
* @param isInternal - Whether this is an internal call (suppresses warnings)
* @returns Object with keys array and separators array
*/
function splitKeyCombination(combination, isInternal = false) {
	const emptyResult = {
		keys: [],
		separators: []
	};
	if (!combination) {
		if (!isInternal) logger.warn("Invalid hotkey combination: empty string provided");
		return emptyResult;
	}
	if (combination.length > 1 && [
		"+",
		"/",
		"_"
	].some((v) => combination.startsWith(v)) && ![
		"++",
		"//",
		"__"
	].some((v) => combination.startsWith(v)) || combination.includes("++") || combination.includes("//") || combination.includes("__") || combination === "+" || combination === "/" || combination === "_" || combination.length > 1 && (combination.endsWith("+") || combination.endsWith("/") || combination.endsWith("_")) && combination.at(-2) !== combination.at(-1) || combination === "++" || combination === "--" || combination === "__") {
		if (!isInternal) logger.warn(`Invalid hotkey combination: "${combination}" has invalid structure`);
		return emptyResult;
	}
	const keys = [];
	const separators = [];
	let buffer = "";
	function flushBuffer(separator) {
		if (buffer) {
			if (separator) separators.push(separator);
			keys.push(/* @__PURE__ */ normalizeKey(buffer));
			buffer = "";
		}
	}
	for (let i = 0; i < combination.length; i++) {
		const char = combination[i];
		const nextChar = combination[i + 1];
		if ([
			"+",
			"/",
			"_",
			"-"
		].includes(char)) {
			/* v8 ignore start -- edge case: doubled special chars */
			if (char === nextChar) {
				flushBuffer(char);
				keys.push(char);
				i++;
			} else if ([
				"+",
				"/",
				"_"
			].includes(char)) flushBuffer(char);
			else buffer += char;
		} else buffer += char;
	}
	flushBuffer();
	/* v8 ignore start -- edge case: invalid minus in combination */
	if (keys.some((key) => key.length > 1 && key.includes("-") && key !== "--")) {
		if (!isInternal) logger.warn(`Invalid hotkey combination: "${combination}" has invalid structure`);
		return emptyResult;
	}
	if (keys.length === 0 && combination) return {
		keys: [/* @__PURE__ */ normalizeKey(combination)],
		separators
	};
	/* v8 ignore stop */
	return {
		keys,
		separators
	};
}
/**
* Splits a hotkey string into its constituent combination groups.
*
* A sequence is a series of combinations that must be pressed in order.
* e.g. `a-b`, `ctrl+k-p`
*
* @param str - The sequence string to parse
* @returns Array of combination strings
*/
function splitKeySequence(str) {
	if (!str) {
		logger.warn("Invalid hotkey sequence: empty string provided");
		return [];
	}
	const hasInvalidStart = str.startsWith("-") && ![
		"-",
		"---",
		"--+"
	].includes(str);
	const hasInvalidEnd = str.endsWith("-") && !str.endsWith("+-") && !str.endsWith("_-") && str !== "-" && str !== "---";
	if (hasInvalidStart || hasInvalidEnd) {
		logger.warn(`Invalid hotkey sequence: "${str}" contains invalid combinations`);
		return [];
	}
	const result = [];
	let buffer = "";
	let i = 0;
	while (i < str.length) {
		const char = str[i];
		if (char === "-") {
			const prevChar = str[i - 1] ?? "";
			const prevPrevChar = i > 1 ? str[i - 2] : void 0;
			if (["+", "_"].includes(prevChar) && !["+", "/"].includes(prevPrevChar ?? "")) {
				buffer += char;
				i++;
			} else {
				if (buffer) {
					result.push(buffer);
					buffer = "";
				} else result.push("-");
				i++;
			}
		} else {
			buffer += char;
			i++;
		}
	}
	if (buffer) result.push(buffer);
	const collapsed = [];
	let minusCount = 0;
	for (const part of result)
 /* v8 ignore start -- edge case: minus collapsing */
	if (part === "-") {
		if (minusCount % 2 === 0) collapsed.push("-");
		minusCount++;
	} else {
		minusCount = 0;
		collapsed.push(part);
	}
	/* v8 ignore start -- edge case: invalid combination in sequence */
	if (!collapsed.every((s) => splitKeyCombination(s, true).keys.length > 0)) {
		logger.warn(`Invalid hotkey sequence: "${str}" contains invalid combinations`);
		return [];
	}
	/* v8 ignore stop */
	return collapsed;
}
//#endregion
//#region src/composables/useHotkey/index.ts
/**
* @module useHotkey
*
* @see https://0.vuetifyjs.com/composables/system/use-hotkey
*
* @remarks
* Hotkey listener composable with key combination and sequence support.
*
* Key features:
* - Key combination support (`ctrl+k`, `shift+enter`)
* - Key sequence support (`g-h` for GitHub-style shortcuts)
* - Platform-aware modifiers (Mac: cmd→meta, others: cmd→ctrl)
* - Input focus detection (skip when typing in inputs)
* - Sequence timeout with automatic reset
* - Key and symbol word alias normalization (`plus` → `+`, `esc` → `escape`, etc.)
* - Pause/resume/stop functionality
* - Automatic cleanup on scope disposal
* - SSR-safe (no-op when not in browser)
*
* Builds on useEventListener for lifecycle-managed keyboard events.
*
* @example
* ```ts
* import { useHotkey } from '@vuetify/v0'
*
* useHotkey('ctrl+k', () => console.log('opened palette'))
* useHotkey('g-h', () => console.log('go home'))
* ```
*/
const isMac = IN_BROWSER && /mac|iphone|ipad|ipod/i.test(navigator?.userAgent ?? "");
/**
* A composable that listens for hotkey combinations and sequences.
*
* @param keys - The hotkey string (e.g., 'ctrl+k', 'g-h')
* @param callback - The function to call when the hotkey is triggered
* @param options - Configuration options
* @returns An object with state refs and control methods
*
* @see https://0.vuetifyjs.com/composables/system/use-hotkey
*
* @example
* ```ts
* import { useHotkey } from '@vuetify/v0'
*
* // Simple combination
* const { isActive, pause, resume } = useHotkey('ctrl+k', () => {
*   console.log('Command palette opened')
* })
*
* // Key sequence (GitHub-style)
* useHotkey('g-h', () => console.log('Go home'))
*
* // With options
* useHotkey('escape', closeModal, { inputs: true })
*
* // Pause/resume control
* pause()  // Temporarily disable
* resume() // Re-enable
* ```
*/
function useHotkey(keys, callback, options = {}, _platform) {
	const platformIsMac = _platform?.isMac ?? isMac;
	const { event = "keydown", inputs = false, preventDefault = true, stopPropagation = false, sequenceTimeout = 1e3 } = options;
	const isPaused = shallowRef(false);
	const cleanup = shallowRef(null);
	const isActive = toRef(() => !/* @__PURE__ */ isNull(cleanup.value));
	let sequenceTimer;
	let keyGroups = [];
	let isSequence = false;
	let groupIndex = 0;
	function isInputFocused() {
		/* v8 ignore next -- IN_BROWSER always true in happy-dom test env */
		if (!IN_BROWSER) return false;
		if (toValue(inputs)) return false;
		const activeElement = /* @__PURE__ */ getActiveElement();
		/* v8 ignore next -- defensive: document.activeElement is always set in happy-dom */
		if (!activeElement) return false;
		const role = activeElement.getAttribute("role");
		if (role === "textbox" || role === "searchbox" || role === "combobox" || role === "spinbutton") return true;
		if (activeElement.tagName === "INPUT") {
			const type = activeElement.type?.toLowerCase();
			return [
				"text",
				"email",
				"password",
				"search",
				"tel",
				"url",
				"number",
				"date",
				"datetime-local",
				"time",
				"month",
				"week"
			].includes(type);
		}
		return activeElement.tagName === "TEXTAREA" || activeElement.isContentEditable;
	}
	function resetSequence() {
		groupIndex = 0;
		clearTimeout(sequenceTimer);
	}
	function handler(e) {
		const group = keyGroups[groupIndex];
		if (!group || isInputFocused()) return;
		if (!matchesKeyGroup(e, group, platformIsMac)) {
			if (isSequence) resetSequence();
			return;
		}
		if (toValue(stopPropagation)) e.stopPropagation();
		if (toValue(preventDefault)) e.preventDefault();
		if (!isSequence) {
			callback(e);
			return;
		}
		clearTimeout(sequenceTimer);
		groupIndex++;
		if (groupIndex === keyGroups.length) {
			callback(e);
			resetSequence();
			return;
		}
		sequenceTimer = setTimeout(resetSequence, toValue(sequenceTimeout));
	}
	function setup() {
		if (!IN_BROWSER || isPaused.value) return;
		const currentKeys = toValue(keys);
		if (!currentKeys) return;
		const groups = splitKeySequence(currentKeys.toLowerCase());
		/* v8 ignore next -- defensive: splitKeySequence rejects empty strings earlier */
		if (groups.length === 0) return;
		isSequence = groups.length > 1;
		keyGroups = groups;
		resetSequence();
		cleanup.value = useWindowEventListener(toValue(event), handler);
	}
	function dispose() {
		if (cleanup.value) {
			cleanup.value();
			cleanup.value = null;
		}
		clearTimeout(sequenceTimer);
		keyGroups = [];
		isSequence = false;
		groupIndex = 0;
	}
	function pause() {
		isPaused.value = true;
		dispose();
	}
	function resume() {
		isPaused.value = false;
		setup();
	}
	function stop() {
		dispose();
	}
	watch(() => toValue(keys), () => {
		if (isPaused.value) return;
		dispose();
		setup();
	}, { immediate: true });
	watch(() => toValue(event), () => {
		if (isPaused.value || !toValue(keys)) return;
		dispose();
		setup();
	});
	onScopeDispose(stop, true);
	return {
		isActive: shallowReadonly(isActive),
		isPaused: shallowReadonly(isPaused),
		pause,
		resume,
		stop
	};
}
function isModifier(key) {
	return MODIFIERS.includes(key);
}
function parseKeyGroup(group) {
	const { keys: parts } = splitKeyCombination(group.toLowerCase());
	const modifiers = Object.fromEntries(MODIFIERS.map((m) => [m, false]));
	/* v8 ignore next 3 -- defensive: parseKeyGroup is not invoked with empty parts */
	if (parts.length === 0) return {
		modifiers,
		actualKey: void 0
	};
	let actualKey;
	for (const part of parts) if (isModifier(part)) modifiers[part] = true;
	else actualKey = part;
	return {
		modifiers,
		actualKey
	};
}
function matchesKeyGroup(e, group, platformIsMac) {
	const { modifiers, actualKey } = parseKeyGroup(group);
	const expectCtrl = modifiers.ctrl || !platformIsMac && (modifiers.cmd || modifiers.meta);
	const expectMeta = platformIsMac && (modifiers.cmd || modifiers.meta);
	const modifiersMatch = e.ctrlKey === expectCtrl && e.metaKey === expectMeta && e.shiftKey === modifiers.shift && e.altKey === modifiers.alt;
	if (/* @__PURE__ */ isUndefined(actualKey)) return modifiersMatch;
	return modifiersMatch && e.key.toLowerCase() === actualKey.toLowerCase();
}
//#endregion
//#region src/composables/useReducedMotion/adapters/adapter.ts
var ReducedMotionAdapter = class {
	/**
	* Teardown for any side-effects started in `setup`. The plugin registers this on
	* `app.onUnmount`, so adapter effects are cleaned up even though `setup` runs
	* outside an effect scope (where `onScopeDispose` would silently no-op). It is
	* read lazily at app unmount, so adapters may assign it at any point during or
	* after `setup`.
	*/
	dispose;
};
//#endregion
//#region src/composables/useReducedMotion/adapters/v0.ts
function payload(reduced) {
	return reduced ? "reduce" : "no-preference";
}
/**
* Default reduced-motion adapter. In the browser it writes
* `document.body.dataset.reducedMotion`; on the server it renders the same
* attribute through `@unhead` so the value is present in the initial HTML.
*/
var V0ReducedMotionAdapter = class extends ReducedMotionAdapter {
	setup(app, context) {
		if (IN_BROWSER) {
			function sync(reduced) {
				document.body.dataset.reducedMotion = payload(reduced);
			}
			sync(context.isReduced.value);
			this.dispose = watch(context.isReduced, sync);
		} else {
			const head = app._context?.provides?.usehead ?? app._context?.provides?.head;
			if (head?.push) {
				const entry = head.push({ bodyAttrs: { "data-reduced-motion": payload(context.isReduced.value) } });
				const stop = watch(context.isReduced, (reduced) => entry.patch?.({ bodyAttrs: { "data-reduced-motion": payload(reduced) } }));
				this.dispose = () => {
					stop();
					entry.dispose?.();
				};
			}
		}
	}
};
//#endregion
//#region src/composables/useReducedMotion/index.ts
/**
* @module useReducedMotion
*
* @see https://0.vuetifyjs.com/composables/plugins/use-reduced-motion
*
* @remarks
* Reduced-motion plugin composable for respecting or overriding the
* `prefers-reduced-motion` media query.
*
* Key features:
* - Three-way `mode`: `'system'` (honor OS setting), `'always'` (force reduce),
*   `'never'` (force full motion)
* - Reactive `isReduced` boolean — true when motion should be minimized
* - When installed as a plugin, the default `V0ReducedMotionAdapter` writes
*   `document.body.dataset.reducedMotion = 'reduce' | 'no-preference'` in the browser.
*   On the server it renders the same attribute via `@unhead` with the configured
*   mode — the OS preference is only readable in the browser, so in `'system'` mode
*   the server value is always `'no-preference'` until client takeover; pair the
*   attribute selector with a native `@media (prefers-reduced-motion: reduce)` rule
*   for pre-hydration coverage
* - SSR-safe: no `window`/`document` access on the server
*
* @example
* ```ts
* import { createReducedMotionPlugin, useReducedMotion } from '@vuetify/v0'
*
* // install once
* app.use(createReducedMotionPlugin({ mode: 'system' }))
*
* // consume anywhere
* const motion = useReducedMotion()
* console.log(motion.isReduced.value) // true | false
* motion.select('never') // override
* ```
*/
/**
* Creates a standalone reduced-motion context.
*
* @param options Initial options.
* @returns A `ReducedMotionContext`.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-reduced-motion
*
* @example
* ```ts
* import { createReducedMotion } from '@vuetify/v0'
*
* const motion = createReducedMotion({ mode: 'system' })
*
* console.log(motion.isReduced.value) // true | false
* motion.select('always')
* ```
*/
function createReducedMotion(options = {}) {
	const selectedMode = shallowRef(options.mode ?? "system");
	const media = usePrefersReducedMotion();
	const isReduced = toRef(() => {
		if (selectedMode.value === "always") return true;
		if (selectedMode.value === "never") return false;
		return media.matches.value;
	});
	function select(value) {
		selectedMode.value = value;
	}
	return {
		selectedMode: shallowReadonly(selectedMode),
		isReduced,
		select,
		dispose: media.stop
	};
}
function createReducedMotionFallback() {
	return {
		selectedMode: shallowReadonly(shallowRef("system")),
		isReduced: shallowReadonly(shallowRef(false)),
		select: () => {},
		dispose: () => {}
	};
}
const [createReducedMotionContext, createReducedMotionPlugin, useReducedMotion] = createPluginContext("v0:reduced-motion", (options) => createReducedMotion(options), {
	fallback: () => createReducedMotionFallback(),
	persist: (context) => context.selectedMode.value,
	restore: (context, saved) => {
		if (saved === "system" || saved === "always" || saved === "never") context.select(saved);
	},
	setup: (context, app, { adapter = new V0ReducedMotionAdapter() }) => {
		app.onUnmount(() => context.dispose());
		adapter.setup(app, context);
		app.onUnmount(() => adapter.dispose?.());
	}
});
//#endregion
//#region src/composables/useRtl/adapters/adapter.ts
var RtlAdapter = class {
	/**
	* Teardown registered by `setup`. Called once via `app.onUnmount` on the
	* plugin path and available as a reachable handle on standalone paths.
	*/
	dispose;
};
//#endregion
//#region src/composables/useRtl/adapters/v0.ts
var V0RtlAdapter = class extends RtlAdapter {
	setup(app, context, target) {
		if (IN_BROWSER) {
			if (/* @__PURE__ */ isNull(target)) return;
			const targetEl = target instanceof HTMLElement ? target : /* @__PURE__ */ isString(target) ? document.querySelector(target) : document.documentElement;
			if (!targetEl) return;
			targetEl.dir = context.isRtl.value ? "rtl" : "ltr";
			this.dispose = watch(context.isRtl, (value) => {
				targetEl.dir = value ? "rtl" : "ltr";
			});
		} else {
			const head = app._context?.provides?.usehead ?? app._context?.provides?.head;
			if (head?.push) {
				const entry = head.push({ htmlAttrs: { dir: context.isRtl.value ? "rtl" : "ltr" } });
				const stop = watch(context.isRtl, (rtl) => entry.patch?.({ htmlAttrs: { dir: rtl ? "rtl" : "ltr" } }));
				this.dispose = () => {
					stop();
					entry.dispose?.();
				};
			}
		}
	}
};
//#endregion
//#region src/composables/useRtl/index.ts
/**
* @module useRtl
*
* @see https://0.vuetifyjs.com/composables/plugins/use-rtl
*
* @remarks
* RTL (right-to-left) direction composable with adapter pattern.
*
* Key features:
* - Reactive boolean direction state
* - Plugin trinity pattern (createRtlContext, createRtlPlugin, useRtl)
* - Adapter pattern for DOM integration (dir attribute)
* - Subtree overrides via context provision
*
* Independent from useLocale — Vuetify connects them via adapter.
*
* @example
* ```ts
* import { useRtl } from '@vuetify/v0'
*
* const { isRtl, toggle } = useRtl()
* toggle() // flip direction
* ```
*/
/**
* Creates a new RTL direction instance.
*
* @param options The options for the RTL instance.
* @returns A new RTL context with reactive direction state.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-rtl
*/
function createRtl(options = {}) {
	const isRtl = shallowRef(options.default ?? false);
	function toggle() {
		isRtl.value = !isRtl.value;
	}
	return {
		isRtl,
		toggle,
		dispose: () => {}
	};
}
function createRtlFallback() {
	return {
		isRtl: shallowRef(false),
		toggle: () => {},
		dispose: () => {}
	};
}
const [createRtlContext, createRtlPlugin, useRtl] = createPluginContext("v0:rtl", (options) => createRtl(options), {
	fallback: () => createRtlFallback(),
	setup: (context, app, { adapter = new V0RtlAdapter(), target }) => {
		adapter.setup(app, context, target);
		app.onUnmount(() => adapter.dispose?.());
	},
	persist: (ctx) => ctx.isRtl.value,
	restore: (ctx, saved) => {
		if (/* @__PURE__ */ isBoolean(saved)) ctx.isRtl.value = saved;
	}
});
//#endregion
export { createVirtual as A, useDate as C, useBreakpoints as D, createBreakpointsPlugin as E, useTimeline as F, createOtp as I, createKanban as L, useVirtual as M, createTimeline as N, toReactive as O, createTimelineContext as P, ServerComboboxAdapter as R, createDatePlugin as S, createBreakpointsContext as T, PointerAdapter as _, useRtl as a, createDate as b, createReducedMotion as c, useReducedMotion as d, V0ReducedMotionAdapter as f, KeyboardAdapter as g, useDragDrop as h, createRtlPlugin as i, createVirtualContext as j, toHighlight as k, createReducedMotionContext as l, useHotkey as m, createRtlContext as n, V0RtlAdapter as o, ReducedMotionAdapter as p, createRtlFallback as r, RtlAdapter as s, createRtl as t, createReducedMotionPlugin as u, DragDropAdapter as v, createBreakpoints as w, createDateContext as x, useMutationObserver as y };
