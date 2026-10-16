import { a as SUPPORTS_OBSERVER, n as SUPPORTS_INTERSECTION_OBSERVER, t as IN_BROWSER } from "./globals-Bxw-y98v.mjs";
import { clamp, getActiveElement, instanceExists, isArray, isElement, isFunction, isNaN, isNull, isNullOrUndefined, isObject, isString, isUndefined, pxToNumber, range, resolveIds, resolveIndexes, useId as useId$1 } from "./utilities/index.mjs";
import { i as useContext, n as createContext, t as createTrinity } from "./createTrinity-DJROWgXU.mjs";
import { n as createPluginContext, t as createPlugin } from "./createPlugin-YYkwbiUd.mjs";
import { i as useLogger } from "./useLogger-BIAZ6Iyu.mjs";
import { t as createRegistry } from "./createRegistry-COW_AjH1.mjs";
import { i as createModel, t as createSelection } from "./createSelection-DQNMDMJj.mjs";
import { t as createSingle } from "./createSingle-BcLDttSx.mjs";
import { a as useLocale } from "./useLocale-cS3wOsyK.mjs";
import { t as toArray } from "./toArray-DCZRopC6.mjs";
import { n as useEventListener, r as useWindowEventListener, t as useDocumentEventListener } from "./useEventListener-C1aOe4Iy.mjs";
import { p as useHydration } from "./useTheme-Dh-EW4wo.mjs";
import { i as useProxyRegistry, t as createGroup } from "./createGroup-If8FlygQ.mjs";
import { t as useTimer } from "./useTimer-DxQCew2E.mjs";
import { i as usePopover } from "./usePopover-Cf7z1gNt.mjs";
import { a as createFilter } from "./adapter-DMzQI6ma.mjs";
import { a as extractLeaves, t as createDataTable } from "./createDataTable-DkLoaMq6.mjs";
import { a as useRules, o as isStandardSchema } from "./useRules-D1BMxv8w.mjs";
import { computed, effectScope, hasInjectionContext, isReadonly, isRef, nextTick, onScopeDispose, ref, shallowReactive, shallowReadonly, shallowRef, toRef, toValue, watch } from "vue";
//#region src/composables/useClickOutside/index.ts
/**
* @module useClickOutside
*
* @see https://0.vuetifyjs.com/composables/system/use-click-outside
*
* @remarks
* Detects clicks outside of specified element(s) with automatic cleanup.
*
* Key features:
* - Two-phase detection (pointerdown → pointerup) prevents drag-out false positives
* - `bounds` mode: coordinate-based detection for native `<dialog>` backdrop clicks
* - Touch scroll threshold ignores swipes/scrolls on mobile
* - Capture phase listeners work with stopPropagation
* - Pause/resume/stop functionality
* - Optional iframe focus detection
* - SSR-safe (no-op when not in browser)
*
* Common use cases: closing popovers, dropdowns, modals, and menus.
*
* Accessibility: This composable handles pointer interactions only. For accessible
* components (dialogs, popovers, menus), pair with `useHotkey` for Escape key
* dismissal per WCAG/APG requirements.
*
* @example
* ```ts
* import { useTemplateRef } from 'vue'
* import { useClickOutside } from '@vuetify/v0'
*
* const target = useTemplateRef('popover')
* useClickOutside(target, () => console.log('clicked outside'))
* ```
*/
/**
* Detects clicks outside of the specified element(s).
*
* Uses two-phase detection (pointerdown → pointerup) to prevent false positives
* when users drag from inside to outside an element.
*
* @param target Element ref(s) to detect clicks outside of. Accepts a single ref/getter or array of refs/getters.
* @param handler Callback invoked when a click outside is detected.
* @param options Configuration options.
* @returns An object with methods to control the listener.
*
* @see https://0.vuetifyjs.com/composables/system/use-click-outside
*
* @example Native element ref
* ```ts
* const menuRef = useTemplateRef<HTMLElement>('menu')
*
* useClickOutside(menuRef, () => { isOpen.value = false })
* ```
*
* @example Component ref (e.g., Atom)
* ```ts
* const atomRef = useTemplateRef<AtomExpose>('atom')
*
* // Pass the exposed element TemplateRef via getter
* useClickOutside(
*   () => atomRef.value?.element,
*   () => { isOpen.value = false }
* )
* ```
*
* @example Multiple targets
* ```ts
* const popoverRef = useTemplateRef<AtomExpose>('popover')
* const anchorRef = useTemplateRef<HTMLElement>('anchor')
*
* useClickOutside(
*   [() => popoverRef.value?.element, anchorRef],
*   () => { isOpen.value = false }
* )
* ```
*
* @example Ignoring elements (CSS selectors or refs)
* ```ts
* useClickOutside(
*  () => navRef.value?.element,
*  () => { isOpen.value = false },
*  { ignore: ['[data-app-bar]'] }
* )
* ```
*
* @example Native dialog with bounds detection
* ```ts
* // For native <dialog> elements, use bounds mode to detect backdrop clicks
* const dialogRef = useTemplateRef<HTMLDialogElement>('dialog')
*
* useClickOutside(
*   dialogRef,
*   () => { dialogRef.value?.close() },
*   { bounds: true }
* )
* ```
*/
function useClickOutside(target, handler, options = {}) {
	const { capture = true, touchScrollThreshold = 30, detectIframe = false, ignore = [], bounds = false } = options;
	const isPaused = shallowRef(false);
	const isActive = toRef(() => !isPaused.value);
	let initialTarget = null;
	let startPosition = {
		x: 0,
		y: 0
	};
	let startedOutsideBounds = false;
	let cleanupPointerDown;
	let cleanupPointerUp;
	let cleanupBlur;
	/**
	* Resolve target(s) to an array of HTMLElements.
	*/
	function getTargets() {
		return (/* @__PURE__ */ toArray(target)).map((source) => toValue(source)).filter((el) => !!el && /* @__PURE__ */ isFunction(el.contains));
	}
	/**
	* Resolve ignore targets to a tuple of [selectors, elements].
	* Called once per event to avoid repeated toValue() calls in hot path.
	*/
	function resolveIgnoreTargets() {
		const ignoreTargets = toValue(ignore);
		if (ignoreTargets.length === 0) return [[], []];
		const selectors = [];
		const elements = [];
		for (const ignoreTarget of ignoreTargets) if (/* @__PURE__ */ isString(ignoreTarget)) selectors.push(ignoreTarget);
		else {
			const ignoreEl = toValue(ignoreTarget);
			if (ignoreEl) elements.push(ignoreEl);
		}
		return [selectors, elements];
	}
	/**
	* Check if an element matches resolved ignore targets.
	*/
	function isIgnored(el, selectors, elements) {
		/* v8 ignore next -- defensive guard, callers always pass an Element */
		if (!el) return false;
		for (const selector of selectors) try {
			if (el.matches(selector) || !/* @__PURE__ */ isNull(el.closest(selector))) return true;
		} catch {}
		for (const ignoreEl of elements) if (ignoreEl === el || ignoreEl.contains(el)) return true;
		return false;
	}
	/**
	* Check if any element in the event path should be ignored.
	*/
	function shouldIgnore(path) {
		const [selectors, elements] = resolveIgnoreTargets();
		if (selectors.length === 0 && elements.length === 0) return false;
		return path.some((node) => /* @__PURE__ */ isElement(node) && isIgnored(node, selectors, elements));
	}
	/**
	* Check if the event target is outside all target elements (DOM containment).
	*/
	function isOutside(eventTarget) {
		/* v8 ignore start -- defensive guards */
		if (!eventTarget) return false;
		if (!(eventTarget instanceof Node)) return false;
		/* v8 ignore stop */
		const targets = getTargets();
		if (targets.length === 0) return false;
		return targets.every((el) => {
			/* v8 ignore next -- defensive: getTargets filters to Element-typed values */
			if (/* @__PURE__ */ isNullOrUndefined(el) || !/* @__PURE__ */ isFunction(el.contains)) return false;
			return el !== eventTarget && !el.contains(eventTarget);
		});
	}
	/**
	* Check if coordinates are outside all target elements' bounding rects.
	*/
	function isOutsideBounds(x, y) {
		const targets = getTargets();
		/* v8 ignore next -- edge case: bounds check only invoked when targets exist */
		if (targets.length === 0) return false;
		return targets.every((el) => {
			const { left, right, top, bottom } = el.getBoundingClientRect();
			return x < left || x > right || y < top || y > bottom;
		});
	}
	/**
	* Check if the event target is a strict descendant of any target element.
	*
	* @remarks Used by bounds mode so content rendered *inside* the element but
	* positioned outside its box (e.g. a top-layer overlay teleported into a
	* native `<dialog>`) is not treated as an outside click. A backdrop click has
	* `target === el`, so it is not a strict descendant and still counts as outside.
	*/
	function isDescendant(eventTarget) {
		/* v8 ignore next -- defensive guard, callers always pass an Element */
		if (!(eventTarget instanceof Node)) return false;
		return getTargets().some((el) => el !== eventTarget && el.contains(eventTarget));
	}
	/**
	* Validate that the target is still in the DOM.
	*/
	function isValidTarget(eventTarget) {
		/* v8 ignore next -- type guard for non-Element targets (e.g., document, window) */
		if (!/* @__PURE__ */ isElement(eventTarget)) return false;
		if (!eventTarget.isConnected) return false;
		return true;
	}
	/* v8 ignore start -- event handlers tested via integration, not unit */
	/**
	* Handle pointerdown - store initial target and position.
	*/
	function onPointerdown(event) {
		if (isPaused.value) return;
		if (event.defaultPrevented) return;
		initialTarget = event.composedPath()[0] ?? event.target;
		startPosition = {
			x: event.clientX,
			y: event.clientY
		};
		startedOutsideBounds = bounds ? isOutsideBounds(event.clientX, event.clientY) : false;
	}
	/**
	* Handle pointerup - check if it's an outside click.
	*/
	function onPointerup(event) {
		if (isPaused.value) return;
		if (event.defaultPrevented) return;
		if (!initialTarget) return;
		const pointerdownTarget = initialTarget;
		initialTarget = null;
		if (!isValidTarget(pointerdownTarget)) return;
		const path = event.composedPath();
		const pointerupTarget = path[0] ?? event.target;
		if (event.pointerType === "touch") {
			const dx = Math.abs(event.clientX - startPosition.x);
			const dy = Math.abs(event.clientY - startPosition.y);
			if (dx >= touchScrollThreshold || dy >= touchScrollThreshold) return;
		}
		if ((bounds ? startedOutsideBounds && isOutsideBounds(event.clientX, event.clientY) && !isDescendant(pointerdownTarget) && !isDescendant(pointerupTarget) : isOutside(pointerdownTarget) && isOutside(pointerupTarget)) && !shouldIgnore(path)) handler(event);
	}
	/**
	* Handle window blur - detect focus moving to iframe.
	*/
	function onBlur(event) {
		if (!IN_BROWSER) return;
		if (isPaused.value) return;
		if (event.defaultPrevented) return;
		if (document.activeElement instanceof HTMLIFrameElement) {
			const iframeIsOutside = getTargets().every((el) => !el.contains(/* @__PURE__ */ getActiveElement()));
			const [selectors, elements] = resolveIgnoreTargets();
			if (iframeIsOutside && !isIgnored(document.activeElement, selectors, elements)) handler(event);
		}
	}
	/* v8 ignore stop */
	function setup() {
		cleanupPointerDown = useDocumentEventListener("pointerdown", onPointerdown, capture);
		cleanupPointerUp = useDocumentEventListener("pointerup", onPointerup, capture);
		if (!detectIframe) return;
		cleanupBlur = useWindowEventListener("blur", onBlur, capture);
	}
	function cleanup() {
		cleanupPointerDown?.();
		cleanupPointerUp?.();
		cleanupBlur?.();
		cleanupPointerDown = void 0;
		cleanupPointerUp = void 0;
		cleanupBlur = void 0;
	}
	function pause() {
		if (isPaused.value) return;
		isPaused.value = true;
		initialTarget = null;
		cleanup();
	}
	function resume() {
		if (!isPaused.value) return;
		isPaused.value = false;
		setup();
	}
	function stop() {
		isPaused.value = true;
		initialTarget = null;
		cleanup();
	}
	setup();
	onScopeDispose(stop, true);
	return {
		isActive: shallowReadonly(isActive),
		isPaused: shallowReadonly(isPaused),
		pause,
		resume,
		stop
	};
}
//#endregion
//#region src/composables/toElement/index.ts
/**
* @module toElement
*
* @see https://0.vuetifyjs.com/composables/transformers/to-element
*
* @remarks
* Resolves various element reference types to a DOM Element.
*
* Accepts refs, getters, raw DOM elements, or Vue component instances
* and normalizes them to a plain Element. Uses structural typing to
* avoid cross-version Vue Ref incompatibilities.
*
* @example
* ```ts
* import { shallowRef } from 'vue'
* import { toElement } from '@vuetify/v0'
*
* const el = shallowRef<HTMLElement | null>(null)
* const resolved = toElement(el) // HTMLElement | undefined
* ```
*/
/**
* Resolves a {@link MaybeElementRef} to a DOM Element or undefined.
*
* Handles:
* - `Ref<Element>`, `ShallowRef<HTMLElement>`, getter functions
* - Vue component instances (extracts `$el`)
* - Raw DOM elements (pass-through)
* - null/undefined (returns undefined)
*
* @param target The element ref, getter, or raw value to resolve
* @returns The resolved DOM Element, or undefined if not available
*
* @see https://0.vuetifyjs.com/composables/transformers/to-element
*
* @example
* ```ts
* import { toElement } from '@vuetify/v0'
*
* const el = shallowRef<HTMLElement | null>(null)
* toElement(el) // HTMLElement | undefined
*
* const component = ref<ComponentPublicInstance>()
* toElement(component) // Element | undefined (from $el)
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function toElement(target) {
	if (!target) return void 0;
	if (/* @__PURE__ */ isElement(target)) return target;
	const raw = /* @__PURE__ */ isFunction(target) ? target() : /* @__PURE__ */ isObject(target) && "value" in target ? target.value : target;
	if (!raw) return void 0;
	if (/* @__PURE__ */ isElement(raw)) return raw;
	if (/* @__PURE__ */ isObject(raw) && "$el" in raw) return raw.$el;
}
//#endregion
//#region src/composables/useStack/index.ts
/**
* @module useStack
*
* @see https://0.vuetifyjs.com/composables/plugins/use-stack
*
* @remarks
* Overlay z-index stacking composable with:
* - Global reactive registry of active overlays
* - Automatic z-index calculation based on selection order
* - `globalTop` tracking - is this ticket topmost globally?
* - Manual select/unselect for explicit control
* - Auto-cleanup when registered within component setup
*
* Built on createSelection for consistent ticket-based management.
*
* @example
* ```ts
* import { useStack } from '@vuetify/v0'
*
* const stack = useStack()
* const ticket = stack.register({ onDismiss: () => console.log('dismissed') })
* ticket.select()
* ```
*/
/**
* Creates a new stack instance for managing overlay z-indexes.
*
* @param options Configuration options
* @returns Stack context with registry methods and scrim helpers
*
* @see https://0.vuetifyjs.com/composables/plugins/use-stack
*
* @example
* ```ts
* import { createStack } from '@vuetify/v0'
*
* const stack = createStack({ baseZIndex: 1000 })
*
* const ticket = stack.register({
*   onDismiss: () => console.log('dismissed'),
*   blocking: false,
* })
*
* ticket.select()  // Activate overlay
* console.log(ticket.zIndex.value)  // 1000
*
* ticket.unselect()  // Deactivate overlay
* ```
*/
function createStack(_options = {}) {
	const { baseZIndex = 2e3, increment = 10, default: defaultTeleport, ...options } = _options;
	const selection = createSelection({
		...options,
		multiple: true
	});
	function selectedScrims() {
		return Array.from(selection.selectedIds).map((id) => selection.get(id)).filter((ticket) => !!ticket && ticket.scrim.value !== false);
	}
	const isActive = toRef(() => selectedScrims().length > 0);
	const top = toRef(() => selectedScrims().at(-1));
	const scrimZIndex = toRef(() => {
		const ticket = top.value;
		return ticket ? ticket.zIndex.value - 1 : 0;
	});
	const isBlocking = toRef(() => toValue(top.value?.blocking) ?? false);
	const topElement = toRef(() => {
		const scrims = selectedScrims();
		for (let i = scrims.length - 1; i >= 0; i--) {
			const el = /* @__PURE__ */ toElement(toValue(scrims[i].el));
			if (el) return el;
		}
		return null;
	});
	function ids() {
		return Array.from(selection.selectedIds);
	}
	function register(input = {}) {
		const id = input.id ?? /* @__PURE__ */ useId$1();
		const blocking = toRef(() => toValue(input.blocking) ?? false);
		const scrim = toRef(() => toValue(input.scrim) ?? true);
		const onDismiss = input.onDismiss;
		const zIndex = toRef(() => {
			const position = ids().indexOf(id);
			if (position === -1) return baseZIndex;
			return baseZIndex + position * increment;
		});
		const globalTop = toRef(() => {
			const list = ids();
			if (list.length === 0) return false;
			return list.at(-1) === id;
		});
		function dismiss() {
			if (blocking.value) return;
			onDismiss?.();
			selection.unselect(id);
		}
		const ticket = selection.register({
			...input,
			blocking,
			scrim,
			onDismiss,
			zIndex,
			globalTop,
			dismiss,
			id
		});
		if (/* @__PURE__ */ instanceExists()) onScopeDispose(() => {
			selection.unregister(id);
		}, true);
		return ticket;
	}
	const defaultRef = toRef(() => defaultTeleport);
	return {
		...selection,
		register,
		isActive,
		top,
		scrimZIndex,
		isBlocking,
		topElement,
		default: defaultRef,
		get size() {
			return selection.size;
		}
	};
}
/**
* Creates a stack context trinity for provide/inject usage.
*
* @param options Configuration options including namespace
* @returns Trinity of [useStackContext, provideStackContext, context]
*
* @see https://0.vuetifyjs.com/composables/plugins/use-stack
*
* @example
* ```ts
* import { createStackContext } from '@vuetify/v0'
*
* const [useMyStack, provideMyStack, myStack] = createStackContext({
*   namespace: 'my:stack',
*   baseZIndex: 3000,
* })
*
* // In parent component:
* provideMyStack()
*
* // In child component:
* const stack = useMyStack()
* ```
*/
function createStackContext(_options = {}) {
	const { namespace = "v0:stack", ...options } = _options;
	const context = createStack(options);
	return createTrinity(namespace, context);
}
/**
* Creates a Vue plugin to provide stack context at app level.
*
* @param options Configuration options
* @returns Vue plugin instance
*
* @see https://0.vuetifyjs.com/composables/plugins/use-stack
*
* @example
* ```ts
* import { createApp } from 'vue'
* import { createStackPlugin } from '@vuetify/v0'
*
* const app = createApp(App)
* app.use(createStackPlugin({ baseZIndex: 2000 }))
* app.mount('#app')
* ```
*/
function createStackPlugin(_options = {}) {
	const { namespace = "v0:stack", ...options } = _options;
	const [, provideStackContext, context] = createStackContext({
		...options,
		namespace
	});
	return createPlugin({
		namespace,
		provide: (app) => {
			provideStackContext(context, app);
		}
	});
}
let fallbackStack;
function getStackFallback() {
	if (!IN_BROWSER) return createStack();
	if (!fallbackStack) fallbackStack = createStack();
	return fallbackStack;
}
/**
* Returns the current stack context.
*
* @param namespace The namespace for the stack context. Defaults to 'v0:stack'.
* @returns The stack context instance
*
* @remarks Falls back to an internal shared instance if no provider exists.
* For SSR safety, use createStackPlugin to provide isolated context per app.
*
* Tickets registered within component setup are automatically unregistered
* when the component is unmounted.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-stack
*
* @example
* ```vue
* <script setup lang="ts">
*   import { shallowRef, watch } from 'vue'
*   import { useStack } from '@vuetify/v0'
*
*   const stack = useStack()
*   const isOpen = shallowRef(false)
*
*   // Ticket is auto-cleaned up when component unmounts
*   const ticket = stack.register({
*     onDismiss: () => { isOpen.value = false },
*   })
*
*   // Sync selection state with isOpen
*   watch(isOpen, v => v ? ticket.select() : ticket.unselect())
* <\/script>
*
* <template>
*   <button @click="isOpen = true">Open</button>
*   <div v-if="isOpen" :style="{ zIndex: ticket.zIndex.value }">
*     <p>Dialog content</p>
*     <button @click="ticket.dismiss()">Close</button>
*   </div>
* </template>
* ```
*/
function useStack(namespace = "v0:stack") {
	const fallback = getStackFallback();
	if (!/* @__PURE__ */ instanceExists()) return fallback;
	try {
		return useContext(namespace);
	} catch {
		return fallback;
	}
}
//#endregion
//#region src/composables/useToggleScope/index.ts
/**
* @module useToggleScope
*
* @see https://0.vuetifyjs.com/composables/system/use-toggle-scope
*
* @remarks
* Conditionally manages an effect scope based on a reactive boolean condition.
* When the source becomes true, creates and runs an effect scope. When false, stops the scope.
* All reactive effects created within the scoped function are automatically cleaned up on deactivation.
*
* Key features:
* - Uses Vue's effectScope for efficient reactive effect lifecycle management
* - Automatic cleanup when condition becomes false
* - Supports optional reset callback for scope restart capability
* - Handles rapid toggling and parent scope disposal safely
* - SSR-safe (effectScope is part of Vue core)
*
* Perfect for conditional side effects, feature flags, and performance optimization
* by only running reactive effects when needed.
*
* @example
* ```ts
* import { shallowRef } from 'vue'
* import { useToggleScope } from '@vuetify/v0'
*
* const isEnabled = shallowRef(false)
* const { isActive } = useToggleScope(isEnabled, () => {
*   // effects run while isEnabled is true
* })
* ```
*/
/**
* Conditionally manages an effect scope based on a reactive boolean source.
*
* @param source A reactive boolean value or getter that controls the scope lifecycle
* @param fn The function to run within the effect scope. Can optionally receive controls for manual scope management.
* @returns Controls object with isActive state and start/stop/reset methods
*
* @see https://vuejs.org/api/reactivity-advanced.html#effectscope
* @see https://0.vuetifyjs.com/composables/system/use-toggle-scope
*
* @example
* ```ts
* import { ref } from 'vue'
* import { useToggleScope } from '@vuetify/v0'
*
* const isEnabled = ref(false)
*
* const { isActive } = useToggleScope(isEnabled, () => {
*   // This code runs when isEnabled becomes true
*   const unwatch = watch(someRef, () => {
*     console.log('Watching...')
*   })
*
*   // Cleanup happens automatically when isEnabled becomes false
* })
*
* // Toggle the scope on/off
* isEnabled.value = true  // Starts the scope
* console.log(isActive.value) // true
* isEnabled.value = false // Stops and cleans up
* console.log(isActive.value) // false
* ```
*
* @example
* With manual controls:
* ```ts
* const isEnabled = ref(true)
*
* useToggleScope(isEnabled, (controls) => {
*   // Access controls inside the scope
*   console.log('Active:', controls.isActive.value)
*
*   // Manually reset the scope if needed
*   someEvent.on('reset', () => controls.reset())
* })
* ```
*/
function useToggleScope(source, fn) {
	const scope = shallowRef();
	const isActive = toRef(() => !!scope.value);
	function start() {
		if (scope.value) return;
		scope.value = effectScope();
		scope.value.run(() => fn.length > 0 ? fn(controls) : fn());
	}
	function stop() {
		scope.value?.stop();
		scope.value = void 0;
	}
	function reset() {
		stop();
		start();
	}
	const controls = {
		isActive: shallowReadonly(isActive),
		start,
		stop,
		reset
	};
	watch(source, (active) => {
		if (active && !scope.value) start();
		else if (!active) stop();
	}, { immediate: true });
	onScopeDispose(stop, true);
	return controls;
}
//#endregion
//#region src/composables/createObserver/index.ts
/**
* @module createObserver
*
* @remarks
* Internal factory for browser Observer API composables. Encapsulates the
* shared lifecycle, hydration, pause/resume/stop, and target-watch logic
* used by useResizeObserver, useIntersectionObserver, and useMutationObserver.
*
* The `observer` ref uses a three-state sentinel:
* - `undefined` — not yet created
* - `null` — permanently stopped (`stop()` was called; `setup()` is a no-op)
* - instance — active observer
*
* @example
* ```ts
* import { createObserver } from '#v0/composables/createObserver'
*
* const observer = createObserver(target, entries => {
*   console.log(entries)
* }, {
*   supports: true,
*   create: cb => new ResizeObserver(cb),
*   observe: (o, el) => o.observe(el),
* })
* ```
*/
function createObserver(target, userCallback, config) {
	const { isHydrated } = useHydration();
	const resolved = toRef(() => /* @__PURE__ */ toElement(target));
	const observer = shallowRef(void 0);
	const isPaused = shallowRef(false);
	const isActive = toRef(() => !!observer.value && !isPaused.value);
	function invoke(entries) {
		config.onEntry?.(entries);
		userCallback(entries);
		if (config.once) {
			if (config.shouldStop ? config.shouldStop(entries) : true) stop();
		}
	}
	function setup() {
		if (/* @__PURE__ */ isNull(observer.value)) return;
		const el = resolved.value;
		if (!isHydrated.value || !config.supports || !/* @__PURE__ */ isElement(el) || isPaused.value) return;
		observer.value = config.create(invoke);
		config.observe(observer.value, el);
		if (config.immediate) {
			const entries = config.immediate(el);
			if (config.onceIncludesImmediate) invoke(entries);
			else {
				config.onEntry?.(entries);
				userCallback(entries);
			}
		}
	}
	watch(resolved, (el, oldEl) => {
		if (oldEl || observer.value) cleanup();
		if (isHydrated.value && /* @__PURE__ */ isElement(el)) setup();
	}, { immediate: true });
	let stopHydrationWatch;
	if (!isHydrated.value) stopHydrationWatch = watch(() => isHydrated.value, (hydrated) => {
		if (hydrated && /* @__PURE__ */ isElement(resolved.value) && !observer.value) {
			setup();
			stopHydrationWatch?.();
			stopHydrationWatch = void 0;
		}
	});
	function cleanup() {
		if (observer.value) {
			observer.value.disconnect();
			observer.value = void 0;
		}
	}
	function pause() {
		isPaused.value = true;
		config.onPause?.();
		observer.value?.disconnect();
	}
	function resume() {
		isPaused.value = false;
		setup();
	}
	function stop() {
		stopHydrationWatch?.();
		stopHydrationWatch = void 0;
		cleanup();
		observer.value = null;
	}
	onScopeDispose(stop, true);
	return {
		isActive: shallowReadonly(isActive),
		isPaused: shallowReadonly(isPaused),
		pause,
		resume,
		stop
	};
}
//#endregion
//#region src/composables/useResizeObserver/index.ts
/**
* @module useResizeObserver
*
* @see https://0.vuetifyjs.com/composables/system/use-resize-observer
*
* @remarks
* ResizeObserver composable with lifecycle management.
*
* Key features:
* - ResizeObserver API wrapper
* - `isActive` reactive flag
* - `once` option for single-fire observation
* - Pause/resume/stop functionality
* - Automatic cleanup on unmount
* - SSR-safe (checks SUPPORTS_OBSERVER)
* - Hydration-aware
* - Box model options (content-box/border-box)
* - Reports `borderBoxSize` and `contentBoxSize` alongside `contentRect`
*
* Perfect for responsive components and size-based rendering.
*
* @example
* ```ts
* import { useTemplateRef } from 'vue'
* import { useResizeObserver } from '@vuetify/v0'
*
* const target = useTemplateRef('target')
* useResizeObserver(target, entries => {
*   console.log(entries[0].contentRect.width)
* })
* ```
*/
/**
* Synthesize the entry the observer would report for `el`, for the `immediate`
* callback that fires before the observer's own first delivery.
*
* Every measurement comes from `getComputedStyle` rather than
* `getBoundingClientRect` because resolved lengths are layout values — like the
* observer, and unlike a client rect, they are not scaled by CSS transforms.
* `contentRect` mirrors the native entry: width/height are the content box and
* top/left are the padding offsets, so the immediate entry matches what the
* observer reports next. The client rect only remains as the fallback when a
* resolved length is not numeric (e.g. a detached element).
*
* Every read is written to tolerate a partial style declaration: an element
* with no layout box resolves its lengths to `''`, and this runs on whatever
* `getComputedStyle` returns.
*/
/* #__NO_SIDE_EFFECTS__ */
function measure(el) {
	const rect = el.getBoundingClientRect();
	const style = getComputedStyle(el);
	const padding = {
		top: /* @__PURE__ */ pxToNumber(style.paddingTop),
		left: /* @__PURE__ */ pxToNumber(style.paddingLeft),
		right: /* @__PURE__ */ pxToNumber(style.paddingRight),
		bottom: /* @__PURE__ */ pxToNumber(style.paddingBottom)
	};
	const paddingX = padding.left + padding.right;
	const paddingY = padding.top + padding.bottom;
	const borderX = /* @__PURE__ */ pxToNumber(style.borderLeftWidth) + /* @__PURE__ */ pxToNumber(style.borderRightWidth);
	const borderY = /* @__PURE__ */ pxToNumber(style.borderTopWidth) + /* @__PURE__ */ pxToNumber(style.borderBottomWidth);
	const outer = style.boxSizing === "border-box";
	const resolvedX = /* @__PURE__ */ pxToNumber(style.width, rect.width);
	const resolvedY = /* @__PURE__ */ pxToNumber(style.height, rect.height);
	const width = {
		border: outer ? resolvedX : resolvedX + paddingX + borderX,
		content: Math.max(0, outer ? resolvedX - paddingX - borderX : resolvedX)
	};
	const height = {
		border: outer ? resolvedY : resolvedY + paddingY + borderY,
		content: Math.max(0, outer ? resolvedY - paddingY - borderY : resolvedY)
	};
	const vertical = /* @__PURE__ */ isString(style.writingMode) && style.writingMode.startsWith("vertical");
	const inline = vertical ? height : width;
	const block = vertical ? width : height;
	return {
		contentRect: {
			width: width.content,
			height: height.content,
			top: padding.top,
			left: padding.left
		},
		borderBoxSize: [{
			inlineSize: inline.border,
			blockSize: block.border
		}],
		contentBoxSize: [{
			inlineSize: inline.content,
			blockSize: block.content
		}],
		target: el
	};
}
/**
* A composable that uses the Resize Observer API to detect when an element's
* size changes.
*
* @param target The element to observe.
* @param callback The callback to execute when the element's size changes.
* @param options The options for the Resize Observer.
* @returns An object with methods to control the observer.
*
* @see https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
* @see https://0.vuetifyjs.com/composables/system/use-resize-observer
*
* @example
* ```ts
* import { ref } from 'vue'
* import { useResizeObserver } from '@vuetify/v0'
*
* const el = ref<HTMLElement>()
* const width = ref(0)
* const height = ref(0)
*
* const { pause, resume, isPaused } = useResizeObserver(
*   el,
*   (entries) => {
*     const entry = entries[0]
*     if (entry) {
*       width.value = entry.contentRect.width
*       height.value = entry.contentRect.height
*       console.log('Size changed:', width.value, 'x', height.value)
*     }
*   },
*   { immediate: true }
* )
*
* // Pause observation
* pause()
*
* // Resume observation
* resume()
* ```
*
* @example
* Measuring the border box — padding and borders included:
*
* ```ts
* useResizeObserver(el, ([entry]) => {
*   height.value = entry.borderBoxSize[0].blockSize
* }, { box: 'border-box' })
* ```
*/
function useResizeObserver(target, callback, options = {}) {
	return createObserver(target, callback, {
		supports: SUPPORTS_OBSERVER,
		once: options.once,
		create: (cb) => new ResizeObserver((entries) => {
			cb(entries.map((e) => ({
				contentRect: {
					width: e.contentRect.width,
					height: e.contentRect.height,
					top: e.contentRect.top,
					left: e.contentRect.left
				},
				borderBoxSize: e.borderBoxSize,
				contentBoxSize: e.contentBoxSize,
				target: e.target
			})));
		}),
		observe: (obs, el) => obs.observe(el, { box: options.box ?? "content-box" }),
		immediate: options.immediate ? (el) => [/* @__PURE__ */ measure(el)] : void 0
	});
}
/**
* A convenience composable that uses the Resize Observer API to track an
* element's size.
*
* @param target The element to observe.
* @returns An object with the element's width and height.
*
* @see https://0.vuetifyjs.com/composables/system/use-resize-observer
*
* @example
* ```ts
* import { ref, watchEffect } from 'vue'
* import { useElementSize } from '@vuetify/v0'
*
* const box = ref<HTMLElement>()
* const { width, height } = useElementSize(box)
*
* // Width and height are reactive refs
* watchEffect(() => {
*   console.log('Box size:', width.value, 'x', height.value)
* })
* ```
*/
function useElementSize(target) {
	const width = shallowRef(0);
	const height = shallowRef(0);
	const { pause: _pause, resume, stop, isActive, isPaused } = useResizeObserver(target, (entries) => {
		const entry = entries[0];
		/* v8 ignore next 4 -- defensive: ResizeObserver always passes an entry array with at least one entry */
		if (entry) {
			width.value = entry.contentRect.width;
			height.value = entry.contentRect.height;
		}
	}, { immediate: true });
	function pause() {
		width.value = 0;
		height.value = 0;
		_pause();
	}
	return {
		width: shallowReadonly(width),
		height: shallowReadonly(height),
		isActive: shallowReadonly(isActive),
		isPaused: shallowReadonly(isPaused),
		pause,
		resume,
		stop
	};
}
//#endregion
//#region src/composables/createOverflow/index.ts
/**
* @module createOverflow
*
* @see https://0.vuetifyjs.com/composables/semantic/create-overflow
*
* @remarks
* Composable for computing how many items fit in a container based on available width.
* Enables responsive truncation logic for Pagination, Breadcrumbs, and similar components.
*
* Key features:
* - Container width tracking via ResizeObserver
* - Two modes: variable-width (per-item) or uniform-width (sample-based)
* - Computes capacity (how many items fit)
* - SSR-safe with Infinity fallback
* - Supports reserved space for nav buttons, ellipsis, etc.
*
* Use variable mode (default) for items with different widths like Breadcrumbs.
* Use uniform mode (itemWidth option) for same-width items like Pagination buttons.
*
* ## Item registration contract
*
* Every child item must call `measure(index, el)` on mount and
* `measure(index, undefined)` on unmount, regardless of mode. The width arg
* is recorded in both modes but **only consumed by uniform mode for
* isOverflowing's count** — capacity in uniform mode is derived purely
* from `itemWidth`. Variable mode uses the per-item widths for both
* capacity and isOverflowing.
*
* Consumers that compute their own capacity outside this composable (e.g.,
* with a separate registry) still need the measure() calls if they want
* `isOverflowing` to reflect reality — without them the count source is
* empty and the signal is permanently false.
*
* @example
* ```ts
* import { useTemplateRef } from 'vue'
* import { createOverflow } from '@vuetify/v0'
*
* const el = useTemplateRef('container')
* const overflow = createOverflow({ container: el })
* console.log(overflow.capacity.value) // number of items that fit
* ```
*/
/**
* Creates a new overflow context for computing how many items fit in a container.
*
* @param options Configuration options
* @returns Overflow context with container ref, capacity, and measurement functions
*
* @example Variable-width mode (Breadcrumbs)
* ```vue
* <script lang="ts" setup>
*   import { useTemplateRef } from 'vue'
*   import { createOverflow } from '@vuetify/v0'
*
*   const containerRef = useTemplateRef('container')
*   const overflow = createOverflow({
*     container: containerRef,
*     gap: 8,
*     reserved: 40,
*   })
* <\/script>
*
* <template>
*   <div ref="container">
*     <span
*       v-for="(item, i) in items.slice(0, overflow.capacity.value)"
*       :key="i"
*       :ref="el => overflow.measure(i, el)"
*     >
*       {{ item }}
*     </span>
*     <span v-if="overflow.isOverflowing.value">...</span>
*   </div>
* </template>
* ```
*
* @example Uniform-width mode (Pagination)
* ```ts
* const overflow = createOverflow({
*   container: () => atom.value?.element,
*   itemWidth: buttonWidth,
*   reserved: () => buttonWidth.value * 4,
* })
* ```
*/
function createOverflow(options = {}) {
	const { container: _container, gap = 0, reserved = 0, itemWidth, reverse } = options;
	const container = /* @__PURE__ */ isUndefined(_container) ? shallowRef() : toRef(() => /* @__PURE__ */ toElement(_container) ?? null);
	const widths = shallowRef(/* @__PURE__ */ new Map());
	const { width } = useElementSize(container);
	function measure(index, el) {
		if (!el) {
			if (widths.value.has(index)) {
				const next = new Map(widths.value);
				next.delete(index);
				widths.value = next;
			}
			return;
		}
		/* v8 ignore start -- browser-only measurement code */
		if (!IN_BROWSER) return;
		const style = getComputedStyle(el);
		const marginX = /* @__PURE__ */ pxToNumber(style.marginLeft) + /* @__PURE__ */ pxToNumber(style.marginRight);
		const w = (el.offsetWidth || 0) + marginX;
		if (widths.value.get(index) !== w) widths.value = new Map(widths.value).set(index, w);
		/* v8 ignore stop */
	}
	function reset() {
		widths.value = /* @__PURE__ */ new Map();
	}
	const total = computed(() => {
		const g = toValue(gap);
		let sum = 0;
		let count = 0;
		for (const w of widths.value.values()) {
			sum += w + (count > 0 ? g : 0);
			count++;
		}
		return sum;
	});
	const capacity = computed(() => {
		const available = width.value - toValue(reserved);
		if (width.value === 0) return Infinity;
		if (available <= 0) return 0;
		const g = toValue(gap);
		const uniformWidth = toValue(itemWidth) ?? 0;
		if (!/* @__PURE__ */ isUndefined(itemWidth) && uniformWidth <= 0) return Infinity;
		if (uniformWidth > 0) {
			const subsequent = uniformWidth + g;
			if (available < uniformWidth) return 0;
			return Math.max(1, Math.floor((available - uniformWidth) / subsequent) + 1);
		}
		const entries = [...widths.value.entries()].toSorted((a, b) => a[0] - b[0]);
		if (toValue(reverse)) entries.reverse();
		let sum = 0;
		let count = 0;
		for (const [, w] of entries) {
			const next = sum + w + (count > 0 ? g : 0);
			if (next > available) break;
			sum = next;
			count++;
		}
		return count;
	});
	return {
		container,
		width,
		capacity,
		total,
		isOverflowing: toRef(() => {
			if (width.value === 0) return false;
			if (!/* @__PURE__ */ isUndefined(itemWidth)) {
				const cap = capacity.value;
				if (cap === Infinity) return false;
				return widths.value.size > cap;
			}
			return total.value > width.value - toValue(reserved);
		}),
		measure,
		reset
	};
}
/**
* Creates an overflow context with dependency injection support.
*
* @param options Configuration options including namespace
* @template E The type of the overflow context
* @returns Trinity tuple: [useOverflow, provideOverflow, defaultOverflow]
*
* @example
* ```ts
* // Create injectable context
* const [useOverflow, provideOverflow, overflow] = createOverflowContext({
*   namespace: 'my-overflow',
*   gap: 8,
*   reserved: 160,
* })
*
* // In parent component
* provideOverflow()
*
* // In child component
* const overflow = useOverflow()
* ```
*/
function createOverflowContext(_options = {}) {
	const { namespace = "v0:overflow", ...options } = _options;
	const context = createOverflow(options);
	return createTrinity(namespace, context);
}
/**
* Returns the current overflow context from dependency injection.
*
* @param namespace The namespace for the overflow context. Defaults to `v0:overflow`.
* @template E The type of the overflow context
* @returns The current overflow context.
*
* @throws An error if the overflow context is not found and no default is provided.
*
* @example
* ```vue
* <script lang="ts" setup>
*   import { useOverflow } from '@vuetify/v0'
*
*   // Inject overflow context provided by parent
*   const overflow = useOverflow()
* <\/script>
*
* <template>
*   <div>
*     <p>Capacity: {{ overflow.capacity.value }}</p>
*   </div>
* </template>
* ```
*/
function useOverflow(namespace = "v0:overflow") {
	return useContext(namespace);
}
//#endregion
//#region src/composables/useImage/index.ts
/**
* @module useImage
*
* @see https://0.vuetifyjs.com/composables/system/use-image
*
* @remarks
* Image loading state machine with deferred loading support.
*
* Key features:
* - State machine: idle → loading → loaded | error
* - Reactive `eager` gate withholds the source until ready
* - Automatic reset when `src` changes
* - Manual `retry()` to re-attempt after error
* - Bind-ready handlers and gated source
* - SSR-safe
*
* Perfect for image components, lightboxes, lazy-loaded galleries,
* and any UI that needs to react to image load state.
*
* @example
* ```ts
* import { useImage } from '@vuetify/v0'
*
* const { status, source, onLoad, onError } = useImage({
*   src: 'https://example.com/img.png',
* })
* ```
*/
/**
* Tracks image loading state as a reactive state machine.
*
* @param options Configuration options
* @returns Image context with state refs and event handlers
*
* @see https://0.vuetifyjs.com/composables/system/use-image
*
* @example
* ```ts
* import { toRef } from 'vue'
* import { useImage } from '@vuetify/v0'
*
* const props = defineProps<{ src: string }>()
*
* const { source, isLoaded, onLoad, onError, retry } = useImage({
*   src: toRef(() => props.src),
* })
* ```
*
* @example
* Composed with `useIntersectionObserver` for lazy loading:
* ```ts
* const target = shallowRef<HTMLElement>()
* const { isIntersecting } = useIntersectionObserver(target, () => {}, {
*   once: true,
*   rootMargin: '200px',
* })
*
* const { source, onLoad, onError } = useImage({
*   src: toRef(() => props.src),
*   eager: isIntersecting,
* })
* ```
*/
function useImage(options) {
	const { src, eager = true } = options;
	const status = shallowRef(toValue(eager) ? "loading" : "idle");
	const isIdle = toRef(() => status.value === "idle");
	const isLoading = toRef(() => status.value === "loading");
	const isLoaded = toRef(() => status.value === "loaded");
	const isError = toRef(() => status.value === "error");
	const source = toRef(() => status.value === "idle" ? void 0 : toValue(src));
	function onLoad() {
		status.value = "loaded";
	}
	function onError() {
		status.value = "error";
	}
	function retry() {
		const resumeAs = toValue(eager) ? "loading" : "idle";
		status.value = "idle";
		nextTick(() => {
			status.value = resumeAs;
		});
	}
	const stopEager = watch(() => toValue(eager), (value) => {
		if (value && status.value === "idle") status.value = "loading";
		else if (!value && status.value !== "loaded" && status.value !== "error") status.value = "idle";
	});
	const stopSrc = watch(() => toValue(src), () => {
		status.value = toValue(eager) ? "loading" : "idle";
	});
	onScopeDispose(() => {
		stopEager();
		stopSrc();
	}, true);
	return {
		status: shallowReadonly(status),
		isIdle,
		isLoading,
		isLoaded,
		isError,
		source,
		onLoad,
		onError,
		retry
	};
}
//#endregion
//#region src/composables/createBreadcrumbs/index.ts
/**
* @module createBreadcrumbs
*
* @see https://0.vuetifyjs.com/composables/semantic/create-breadcrumbs
*
* @remarks
* Breadcrumb navigation composable built on createSingle.
*
* Key features:
* - Extends createSingle for consistent registry patterns
* - Navigation methods: first, prev, select (with truncation)
* - Derived state: depth, isRoot, isEmpty
* - Trinity pattern for dependency injection
*
* Inheritance chain: createRegistry → createSelection → createSingle → createBreadcrumbs
*
* @example
* ```ts
* import { createBreadcrumbs } from '@vuetify/v0'
*
* const crumbs = createBreadcrumbs()
* crumbs.register({ text: 'Home' })
* crumbs.register({ text: 'Docs' })
* console.log(crumbs.depth.value) // 2
* ```
*/
/**
* Creates a breadcrumbs navigation model.
*
* @param options The options for the breadcrumbs instance.
* @returns A breadcrumbs context with navigation methods.
*
* @example
* ```ts
* import { createBreadcrumbs } from '@vuetify/v0'
*
* const breadcrumbs = createBreadcrumbs()
*
* breadcrumbs.register({ text: 'Home' })
* breadcrumbs.register({ text: 'Products' })
* breadcrumbs.register({ text: 'Electronics' })
*
* // Navigate back
* breadcrumbs.prev() // removes Electronics
* breadcrumbs.first() // truncates to Home
*
* // Derived state
* breadcrumbs.depth.value // 1
* breadcrumbs.isRoot.value // true
* ```
*/
function createBreadcrumbs(options = {}) {
	const single = createSingle({
		...options,
		reactive: true,
		events: true,
		enroll: true
	});
	const depth = toRef(() => single.size);
	const isRoot = toRef(() => depth.value <= 1);
	const isEmpty = toRef(() => depth.value === 0);
	/**
	* Select an item and truncate everything after it.
	*/
	function select(id) {
		const ticket = single.get(id);
		if (!ticket) return;
		const index = ticket.index;
		const toRemove = single.values().filter((item) => item.index > index).map((item) => item.id);
		if (toRemove.length > 0) single.offboard(toRemove);
		single.select(id);
	}
	/**
	* Navigate to root (first item).
	*/
	function first() {
		const root = single.seek("first");
		if (root) select(root.id);
	}
	/**
	* Navigate up one level (select previous item, removing current).
	*/
	function prev() {
		if (single.size <= 1) return;
		const currentIndex = single.selectedIndex.value;
		if (currentIndex <= 0) return;
		const prevId = single.lookup(currentIndex - 1);
		if (prevId) select(prevId);
	}
	return {
		...single,
		select,
		first,
		prev,
		depth,
		isRoot,
		isEmpty,
		get size() {
			return single.size;
		}
	};
}
/**
* Creates a breadcrumbs context for dependency injection.
*
* @param options The options including namespace.
* @returns A trinity: [useBreadcrumbs, provideBreadcrumbs, defaultContext]
*
* @example
* ```ts
* const [useBreadcrumbs, provideBreadcrumbs] = createBreadcrumbsContext()
*
* // Parent component
* provideBreadcrumbs()
*
* // Child component
* const breadcrumbs = useBreadcrumbs()
* breadcrumbs.register({ text: 'Details' })
* ```
*/
function createBreadcrumbsContext(_options = {}) {
	const { namespace = "v0:breadcrumbs", ...options } = _options;
	const context = createBreadcrumbs(options);
	return createTrinity(namespace, context);
}
/**
* Returns the current breadcrumbs instance from context.
*
* @param namespace The namespace. @default 'v0:breadcrumbs'
* @returns The breadcrumbs context.
*
* @example
* ```vue
* <script setup lang="ts">
*   import { useBreadcrumbs } from '@vuetify/v0'
*
*   const breadcrumbs = useBreadcrumbs()
* <\/script>
*
* <template>
*   <nav>
*     <template v-for="ticket in breadcrumbs.values()" :key="ticket.id">
*       <a @click="breadcrumbs.select(ticket.id)">{{ ticket.text }}</a>
*     </template>
*   </nav>
* </template>
* ```
*/
function useBreadcrumbs(namespace = "v0:breadcrumbs") {
	return useContext(namespace);
}
//#endregion
//#region src/composables/useProxyModel/index.ts
/**
* @module useProxyModel
*
* @see https://0.vuetifyjs.com/composables/reactivity/use-proxy-model
*
* @remarks
* Proxy composable for bidirectional sync between a model context and v-model.
*
* Key features:
* - Bidirectional synchronization
* - `multiple` option controls array vs single-value mode (must be explicit — not inferred)
* - `MaybeRefOrGetter` support for the `multiple` option
* - Automatic cleanup on scope disposal
* - Works with any ModelContext (Selection, Slider, etc.)
*
* Bridges the gap between model composables and Vue's v-model.
*
* @example
* ```ts
* import { shallowRef } from 'vue'
* import { createSelection, useProxyModel } from '@vuetify/v0'
*
* const selection = createSelection({ events: true })
* const model = shallowRef<string[]>([])
* useProxyModel(selection, model, { multiple: true })
* ```
*/
/**
* Syncs a ref with a model context bidirectionally.
*
* @param context The model context to bind to.
* @param model The ref to sync.
* @param options The options for the proxy model.
* @returns A function to stop the sync.
*
* @see https://0.vuetifyjs.com/composables/reactivity/use-proxy-model
*
* @example
* ```ts
* import { createSelection, useProxyModel } from '@vuetify/v0'
*
* const model = ref()
* const registry = createSelection({ events: true })
* registry.onboard([
*   { id: 'item-1', value: 'Item 1' },
*   { id: 'item-2', value: 'Item 2' },
* ])
*
* const stop = useProxyModel(registry, model)
* ```
*/
function useProxyModel(context, model, options) {
	const multiple = options?.multiple ?? context.multiple ?? false;
	const _transformIn = options?.transformIn;
	const _transformOut = options?.transformOut;
	function transformIn(val) {
		const value = toValue(val);
		return /* @__PURE__ */ toArray(/* @__PURE__ */ isFunction(_transformIn) ? _transformIn(value) : value);
	}
	function transformOut(val) {
		if (/* @__PURE__ */ isFunction(_transformOut)) return _transformOut(val);
		return toValue(multiple) ? val : val[0];
	}
	const applyOptions = toValue(multiple) === toValue(context.multiple ?? false) ? void 0 : { multiple: toValue(multiple) };
	const pending = /* @__PURE__ */ new Set();
	function deferred(value) {
		return !context.browse?.(value)?.length;
	}
	function reconcile(values) {
		context.apply(values, applyOptions);
		const selected = new Set(context.selectedValues.value);
		pending.clear();
		for (const value of values) if (!selected.has(value) && deferred(value)) pending.add(value);
	}
	reconcile(transformIn(model));
	let syncing = false;
	function shallowEqual(a, b) {
		if (a === b) return true;
		if (!/* @__PURE__ */ isArray(a) || !/* @__PURE__ */ isArray(b) || a.length !== b.length) return false;
		return a.every((v, index) => v === b[index]);
	}
	const contextWatch = watch(context.selectedValues, (val) => {
		if (syncing) return;
		syncing = true;
		modelWatch.pause();
		model.value = transformOut(Array.from(toValue(val)));
		modelWatch.resume();
		syncing = false;
	}, { flush: "sync" });
	const modelWatch = watch(model, (val) => {
		if (syncing) return;
		syncing = true;
		contextWatch.pause();
		reconcile(transformIn(val));
		if (pending.size === 0) {
			const actual = transformOut(Array.from(context.selectedValues.value));
			if (!shallowEqual(val, actual)) model.value = actual;
		}
		contextWatch.resume();
		syncing = false;
	}, {
		flush: "sync",
		deep: toValue(multiple)
	});
	function onRegister(data) {
		const ticket = data;
		if (!pending.has(ticket.value) || toValue(ticket.disabled)) return;
		contextWatch.pause();
		modelWatch.pause();
		context.select?.(ticket.id);
		pending.delete(ticket.value);
		modelWatch.resume();
		contextWatch.resume();
	}
	context.on?.("register:ticket", onRegister);
	function stop() {
		contextWatch();
		modelWatch();
		context.off?.("register:ticket", onRegister);
	}
	onScopeDispose(stop, true);
	return stop;
}
//#endregion
//#region src/composables/createStep/index.ts
/**
* @module createStep
*
* @see https://0.vuetifyjs.com/composables/selection/create-step
*
* @remarks
* Navigation composable that extends createSingle with first/last/next/prev/step methods.
*
* Key features:
* - Configurable circular or bounded navigation
* - Automatic disabled item skipping
* - Arbitrary step counts (positive/negative)
* - Perfect for wizards, carousels, pagination, onboarding flows
*
* Inheritance chain: createRegistry → createSelection → createSingle → createStep
*
* @example
* ```ts
* import { createStep } from '@vuetify/v0'
*
* const wizard = createStep({ circular: false })
* wizard.register({ value: 'step-1' })
* wizard.register({ value: 'step-2' })
* wizard.next()
* ```
*/
/**
* Creates a new step instance with navigation through items.
*
* Extends `createSingle` with `first()`, `last()`, `next()`, `prev()`, and `step(count)` methods
* for sequential navigation. Supports both circular (wrapping) and bounded (stopping at edges) modes.
*
* @param options The options for the step instance.
* @template Z The type of the step ticket.
* @template E The type of the step context.
* @returns A new step instance with navigation methods.
*
* @remarks
* **Key Features:**
* - **Configurable Navigation**: `circular: true` for wrapping, `false` for bounded (default: false)
* - **Disabled Item Skipping**: Automatically skips disabled items during navigation
* - **Bidirectional**: Forward (`next`, positive `step`) and backward (`prev`, negative `step`)
* - **Safe Edge Cases**: Handles empty registries and all-disabled scenarios gracefully
*
* **Navigation Methods:**
* - `first()`: Select first non-disabled item
* - `last()`: Select last non-disabled item
* - `next()`: Move to next item (wraps if circular, stops at end if bounded)
* - `prev()`: Move to previous item (wraps if circular, stops at start if bounded)
* - `step(count)`: Move by `count` positions (negative for backward)
*
* **Circular Mode (`circular: true`):**
* - Uses modulo arithmetic for wrapping: `((index % length) + length) % length`
* - Works correctly with negative indexes and large step counts
* - Perfect for carousels, theme switchers, infinite scrolling
*
* **Bounded Mode (`circular: false`, default):**
* - Navigation stops at boundaries (no wrapping)
* - `next()` on last item does nothing
* - `prev()` on first item does nothing
* - Perfect for pagination, wizards with explicit completion, forms
*
* **Inheritance Chain:**
* `createRegistry` → `createSelection` → `createSingle` → `createStep`
*
* @see https://0.vuetifyjs.com/composables/selection/create-step
*
* @example
* ```ts
* import { createStep } from '@vuetify/v0'
*
* // Bounded navigation (default) - for pagination
* const pagination = createStep({ circular: false })
* pagination.onboard([
*   { id: 'page-1', value: 1 },
*   { id: 'page-2', value: 2 },
*   { id: 'page-3', value: 3 },
* ])
* pagination.first() // Select page 1
* pagination.prev() // Does nothing (already at first)
* pagination.next() // Select page 2
*
* // Circular navigation - for carousels
* const carousel = createStep({ circular: true })
* carousel.onboard([
*   { id: 'slide-1', value: 'First' },
*   { id: 'slide-2', value: 'Second' },
*   { id: 'slide-3', value: 'Third' },
* ])
* carousel.first()
* carousel.prev() // Wraps to 'slide-3'
* carousel.next() // Wraps to 'slide-1'
* ```
*/
function createStep(_options = {}) {
	const { circular = false, ...options } = _options;
	const registry = createSingle(options);
	function first() {
		const ticket = registry.seek("first");
		if (ticket) registry.select(ticket.id);
	}
	function last() {
		const ticket = registry.seek("last");
		if (ticket) registry.select(ticket.id);
	}
	function next() {
		step(1);
	}
	function prev() {
		step(-1);
	}
	function wrapped(length, index) {
		return (index % length + length) % length;
	}
	function step(count = 1) {
		const length = registry.size;
		if (!length) return;
		registry.lookup(0);
		const currentIndex = registry.selectedIndex.value;
		const direction = Math.sign(count || 1);
		let hops = 0;
		let index = circular ? wrapped(length, currentIndex + count) : currentIndex + count;
		if (!circular && (index < 0 || index >= length)) return;
		let id = registry.lookup(index);
		while (!/* @__PURE__ */ isUndefined(id) && toValue(registry.get(id)?.disabled) && hops < length) {
			index = circular ? wrapped(length, index + direction) : index + direction;
			if (!circular && (index < 0 || index >= length)) return;
			id = registry.lookup(index);
			hops++;
		}
		if (/* @__PURE__ */ isUndefined(id) || hops === length) return;
		registry.selectedIds.clear();
		registry.select(id);
	}
	return {
		...registry,
		first,
		last,
		next,
		prev,
		step,
		get size() {
			return registry.size;
		}
	};
}
/**
* Creates a new step context.
*
* @param options The options for the step context.
* @template Z The input ticket type.
* @template E The output ticket type.
* @template R The context type.
* @returns A new step context.
*
* @see https://0.vuetifyjs.com/composables/selection/create-step
*
* @example
* ```ts
* import { createStepContext } from '@vuetify/v0'
*
* // With default namespace 'v0:step'
* export const [useStep, provideStep, context] = createStepContext()
*
* // In a parent component:
* provideStep()
*
* // In a child component:
* const context = useStep()
* context.next() // Progress to next step
* ```
*/
function createStepContext(_options = {}) {
	const { namespace = "v0:step", ...options } = _options;
	const context = createStep(options);
	return createTrinity(namespace, context);
}
/**
* Returns the current step instance.
*
* @param namespace The namespace for the step context. Defaults to `'v0:step'`.
* @template Z The input ticket type.
* @template E The output ticket type.
* @template R The context type.
* @returns The current step instance.
*
* @see https://0.vuetifyjs.com/composables/selection/create-step
*
* @example
* ```vue
* <script setup lang="ts">
*   import { useStep } from '@vuetify/v0'
*
*   const wizard = useStep()
* <\/script>
*
* <template>
*   <div>
*     <p>Current step: {{ wizard.selectedIndex }}</p>
*     <button @click="wizard.next()">Next</button>
*   </div>
* </template>
* ```
*/
function useStep(namespace = "v0:step") {
	return useContext(namespace);
}
//#endregion
//#region src/composables/createFocusTraversal/index.ts
/**
* @module createFocusTraversal
*
* @remarks
* Internal factory for keyboard-driven traversal of ordered item lists.
* Encapsulates stride-based navigation, disabled-item skipping, circular/bounded
* movement, grid row scoping, and key-to-action mapping shared by
* useRovingFocus and useVirtualFocus.
*
* Not exported from the package barrel — consumed only by sibling composables.
*
* @example
* ```ts
* import { createFocusTraversal } from '#v0/composables/createFocusTraversal'
*
* const items = () => [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
* const traversal = createFocusTraversal(items, id => console.log(id))
* traversal.next()
* ```
*/
function mod(length, index) {
	return (index % length + length) % length;
}
function isRtl(e) {
	if (!IN_BROWSER) return false;
	const el = e.currentTarget;
	return el ? getComputedStyle(el).direction === "rtl" : false;
}
function createFocusTraversal(items, activate, options = {}) {
	const { orientation = "vertical", circular = false, columns: _columns } = options;
	const activeId = shallowRef();
	function enabled() {
		return items().filter((item) => !toValue(item.disabled));
	}
	function indexOf(id) {
		return items().findIndex((item) => item.id === id);
	}
	function go(id) {
		activeId.value = id;
		activate(id);
	}
	function step(stride) {
		const all = items();
		const length = all.length;
		if (!length) return;
		const current = /* @__PURE__ */ isUndefined(activeId.value) ? -1 : indexOf(activeId.value);
		const direction = stride > 0 ? 1 : -1;
		const absStride = Math.abs(stride);
		let index = current + stride;
		const maxHops = circular ? length : Math.ceil(length / absStride);
		let hops = 0;
		if (circular) index = mod(length, index);
		else if (index < 0 || index >= length) return;
		while (hops < maxHops) {
			const item = all[index];
			if (item && !toValue(item.disabled)) {
				go(item.id);
				return;
			}
			hops++;
			index = circular ? mod(length, index + stride) : index + direction * absStride;
			if (!circular && (index < 0 || index >= length)) return;
		}
	}
	function next() {
		step(1);
	}
	function prev() {
		step(-1);
	}
	function first() {
		const list = enabled();
		if (list.length > 0) go(list[0].id);
	}
	function last() {
		const list = enabled();
		if (list.length > 0) go(list.at(-1).id);
	}
	/** Focus first non-disabled item in the current row (grid mode) */
	function rowFirst() {
		/* v8 ignore next 2 -- defensive: rowFirst is only invoked in grid mode (cols > 0) */
		const cols = toValue(_columns) ?? 0;
		if (!cols) return first();
		const all = items();
		const current = /* @__PURE__ */ isUndefined(activeId.value) ? 0 : indexOf(activeId.value);
		const rowStart = current - current % cols;
		const rowEnd = Math.min(rowStart + cols, all.length);
		for (let i = rowStart; i < rowEnd; i++) {
			const item = all[i];
			if (item && !toValue(item.disabled)) {
				go(item.id);
				return;
			}
		}
	}
	/** Focus last non-disabled item in the current row (grid mode) */
	function rowLast() {
		/* v8 ignore next 2 -- defensive: rowLast is only invoked in grid mode (cols > 0) */
		const cols = toValue(_columns) ?? 0;
		if (!cols) return last();
		const all = items();
		const current = /* @__PURE__ */ isUndefined(activeId.value) ? 0 : indexOf(activeId.value);
		const rowStart = current - current % cols;
		const rowEnd = Math.min(rowStart + cols, all.length);
		for (let i = rowEnd - 1; i >= rowStart; i--) {
			const item = all[i];
			if (item && !toValue(item.disabled)) {
				go(item.id);
				return;
			}
		}
	}
	function onKeydown(e) {
		const cols = toValue(_columns);
		const rtl = isRtl(e);
		if (cols) {
			switch (e.key) {
				case "ArrowRight":
					e.preventDefault();
					step(rtl ? -1 : 1);
					break;
				case "ArrowLeft":
					e.preventDefault();
					step(rtl ? 1 : -1);
					break;
				case "ArrowDown":
					e.preventDefault();
					step(cols);
					break;
				case "ArrowUp":
					e.preventDefault();
					step(-cols);
					break;
				case "Home":
					e.preventDefault();
					if (e.ctrlKey) first();
					else rowFirst();
					break;
				case "End":
					e.preventDefault();
					if (e.ctrlKey) last();
					else rowLast();
			}
			return;
		}
		const prevKeys = [];
		const nextKeys = [];
		if (orientation === "vertical" || orientation === "both") {
			prevKeys.push("ArrowUp");
			nextKeys.push("ArrowDown");
		}
		if (orientation === "horizontal" || orientation === "both") {
			prevKeys.push(rtl ? "ArrowRight" : "ArrowLeft");
			nextKeys.push(rtl ? "ArrowLeft" : "ArrowRight");
		}
		if (prevKeys.includes(e.key)) {
			e.preventDefault();
			prev();
		} else if (nextKeys.includes(e.key)) {
			e.preventDefault();
			next();
		} else if (e.key === "Home") {
			e.preventDefault();
			first();
		} else if (e.key === "End") {
			e.preventDefault();
			last();
		}
	}
	return {
		activeId,
		step,
		next,
		prev,
		first,
		last,
		onKeydown
	};
}
//#endregion
//#region src/composables/useVirtualFocus/index.ts
/**
* @module useVirtualFocus
*
* @see https://0.vuetifyjs.com/composables/system/use-virtual-focus
*
* @remarks
* Virtual focus composable for aria-activedescendant keyboard navigation.
* DOM focus stays on a control element while a virtual cursor highlights
* items in a list.
*
* Key features:
* - Arrow key navigation with orientation support
* - Grid mode for 2D navigation
* - Automatic disabled item skipping
* - Optional circular navigation
* - Home/End key support (row-scoped in grid mode)
* - Auto-attaches keydown listener when target is provided
* - Sets aria-activedescendant and data-highlighted attributes
*
* Perfect for comboboxes, autocompletes, listboxes, and other widgets
* where DOM focus must remain on the control element.
*
* @example
* ```ts
* import { useVirtualFocus } from '@vuetify/v0'
*
* const items = () => [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
* const cursor = useVirtualFocus(items)
* cursor.next()
* ```
*/
function useVirtualFocus(items, options) {
	const { control, target, orientation, circular, columns, onHighlight } = options;
	let previousEl = null;
	function applyHighlight(id) {
		const item = items().find((i) => i.id === id);
		if (!item?.el) return false;
		const el = toValue(item.el);
		if (!el) return false;
		const controlEl = toValue(control);
		if (controlEl) {
			const itemId = el.getAttribute("id");
			if (itemId) controlEl.setAttribute("aria-activedescendant", itemId);
		}
		if (previousEl) delete previousEl.dataset.highlighted;
		el.dataset.highlighted = "";
		previousEl = el;
		el.scrollIntoView({ block: "nearest" });
		onHighlight?.(id);
		return true;
	}
	const traversal = createFocusTraversal(items, (id) => applyHighlight(id), {
		orientation,
		circular,
		columns
	});
	function highlight(id) {
		const prev = traversal.activeId.value;
		traversal.activeId.value = id;
		if (!applyHighlight(id)) traversal.activeId.value = prev;
	}
	function clear() {
		traversal.activeId.value = void 0;
		const controlEl = toValue(control);
		if (controlEl) controlEl.removeAttribute("aria-activedescendant");
		if (previousEl) {
			delete previousEl.dataset.highlighted;
			previousEl = null;
		}
	}
	const listener = target ?? control;
	if (listener) useEventListener(listener, "keydown", traversal.onKeydown);
	onScopeDispose(() => {
		clear();
	});
	return {
		highlightedId: traversal.activeId,
		highlight,
		clear,
		next: traversal.next,
		prev: traversal.prev,
		first: traversal.first,
		last: traversal.last,
		onKeydown: traversal.onKeydown
	};
}
//#endregion
//#region src/composables/createCombobox/adapters/adapter.ts
var ComboboxAdapter = class {};
//#endregion
//#region src/composables/createCombobox/adapters/client.ts
/**
* @module createCombobox/adapters/client
*
* @remarks
* Default combobox adapter. Filters items client-side using createFilter.
* Synchronous, zero debounce — items update immediately as the user types.
*/
var ClientComboboxAdapter = class extends ComboboxAdapter {
	options;
	constructor(options = {}) {
		super();
		this.options = options;
	}
	setup(context) {
		const { mode, keys, filter: customFilter } = this.options;
		const filter = createFilter({
			mode,
			keys,
			customFilter: customFilter ? (query, item) => customFilter(String(query), item) : void 0
		});
		const values = toRef(() => context.items.value.map((t) => t.value));
		const trimmed = toRef(() => String(context.query.value).trim());
		const { items: filteredValues } = filter.apply(trimmed, values);
		const filtered = computed(() => {
			if (!String(context.query.value).trim()) return new Set(context.items.value.map((t) => t.id));
			const matchedValues = new Set(filteredValues.value);
			const ids = /* @__PURE__ */ new Set();
			for (const ticket of context.items.value) if (matchedValues.has(ticket.value)) ids.add(ticket.id);
			return ids;
		});
		const isEmpty = toRef(() => filtered.value.size === 0);
		return {
			filtered,
			isLoading: shallowRef(false),
			isEmpty
		};
	}
};
//#endregion
//#region src/composables/createCombobox/index.ts
/**
* @module createCombobox
*
* @see https://0.vuetifyjs.com/composables/forms/create-combobox
*
* @remarks
* Orchestrator composable that coordinates selection, popover, and virtual focus
* for a combobox (autocomplete/typeahead) pattern. Does not extend the selection
* chain — it composes existing primitives instead.
*
* Key features:
* - Adapter-based filtering (client-side or server-side via ClientComboboxAdapter/ServerComboboxAdapter)
* - Single or multi-select mode
* - Virtual focus keyboard navigation (aria-activedescendant pattern)
* - Strict mode: reverts query to selected value on close if no match
* - Popover-based dropdown positioning
* - Context DI via createComboboxContext / useCombobox
*
* @example
* ```ts
* import { createCombobox } from '@vuetify/v0'
*
* const combobox = createCombobox({ strict: true })
* combobox.selection.register({ value: 'Apple' })
* combobox.selection.register({ value: 'Banana' })
* combobox.open()
* ```
*/
/**
* Creates a combobox context that orchestrates selection, popover, virtual
* focus, and adapter-based filtering into a single coordinated state.
*
* @param options - Configuration for selection mode, filtering adapter, and behavior.
* @returns A combobox context with all composed systems and action methods.
*
* @see https://0.vuetifyjs.com/composables/forms/create-combobox
*
* @example
* ```ts
* import { createCombobox } from '@vuetify/v0'
*
* const combobox = createCombobox({ strict: true })
*
* combobox.selection.register({ id: 'a', value: 'Apple' })
* combobox.selection.register({ id: 'b', value: 'Banana' })
*
* combobox.open()
* combobox.select('a') // query → 'Apple', dropdown closes
* ```
*/
function createCombobox(options = {}) {
	const { multiple = false, mandatory = false, disabled = false, strict = false, error = false, errorMessages, adapter, positionAdapter, displayValue = (v) => String(v ?? ""), id: _id, name, form } = options;
	const id = _id ?? /* @__PURE__ */ useId$1();
	const inputId = `${id}-input`;
	const listboxId = `${id}-listbox`;
	const descriptionId = `${id}-description`;
	const errorId = `${id}-error`;
	const hasDescription = shallowRef(false);
	const hasError = shallowRef(false);
	const errors = computed(() => {
		const messages = toValue(errorMessages);
		return messages ? /* @__PURE__ */ toArray(messages) : [];
	});
	const isValid = toRef(() => {
		if (toValue(error)) return false;
		if (errors.value.length > 0) return false;
		return null;
	});
	const selection = createSelection({
		multiple,
		mandatory,
		disabled: toRef(() => toValue(disabled)),
		events: true
	});
	const query = shallowRef("");
	const pristine = shallowRef(true);
	const inputEl = shallowRef(null);
	const version = shallowRef(0);
	selection.on("register:ticket", () => {
		version.value++;
	});
	selection.on("unregister:ticket", () => {
		version.value++;
	});
	const items = computed(() => {
		version.value;
		return [...selection.values()];
	});
	const { filtered, isLoading, isEmpty } = (adapter ?? new ClientComboboxAdapter()).setup({
		query,
		items
	});
	const popover = usePopover({
		id,
		adapter: positionAdapter
	});
	popover.attachAnchor(inputEl);
	const isOpen = popover.isOpen;
	const cursor = useVirtualFocus(() => selection.values().filter((ticket) => filtered.value.has(ticket.id) && !toValue(ticket.disabled)).map((ticket) => ({
		id: ticket.id,
		el: () => IN_BROWSER ? document.querySelector(`#${CSS.escape(`${id}-option-${ticket.id}`)}`) : null,
		disabled: ticket.disabled
	})), {
		control: inputEl,
		target: () => null,
		orientation: "vertical"
	});
	const selectedId = toRef(() => selection.selectedIds.values().next().value);
	const display = toRef(() => {
		if (!pristine.value) return query.value;
		if (toValue(multiple)) return query.value;
		const ticket = /* @__PURE__ */ isUndefined(selectedId.value) ? void 0 : selection.get(selectedId.value);
		return ticket ? displayValue(ticket.value) : "";
	});
	function open() {
		if (!isOpen.value && !toValue(disabled)) isOpen.value = true;
	}
	function close() {
		query.value = "";
		pristine.value = true;
		isOpen.value = false;
	}
	function toggle() {
		if (isOpen.value) close();
		else open();
	}
	function select(itemId) {
		if (toValue(multiple)) {
			selection.toggle(itemId);
			query.value = "";
			pristine.value = true;
			cursor.highlight(itemId);
			inputEl.value?.focus();
		} else {
			selection.select(itemId);
			query.value = "";
			pristine.value = true;
			close();
		}
	}
	function clear() {
		query.value = "";
		pristine.value = true;
		if (toValue(disabled)) return;
		for (const id of Array.from(selection.selectedIds)) {
			if (toValue(mandatory) && selection.selectedIds.size === 1) break;
			selection.selectedIds.delete(id);
		}
	}
	watch(isOpen, (open) => {
		if (!open) cursor.clear();
	});
	return {
		selection,
		popover,
		cursor,
		query,
		display,
		pristine,
		filtered,
		isEmpty,
		isLoading,
		isOpen,
		id,
		inputId,
		listboxId,
		descriptionId,
		errorId,
		hasDescription,
		hasError,
		errors,
		isValid,
		inputEl,
		multiple: toValue(multiple),
		strict,
		disabled,
		name,
		form,
		open,
		close,
		toggle,
		select,
		clear
	};
}
/**
* Creates a combobox context with dependency injection support.
*
* @param options - Combobox options plus an optional namespace for DI.
* @returns A context trinity: `[useCombobox, provideCombobox, defaultCombobox]`.
*
* @see https://0.vuetifyjs.com/composables/forms/create-combobox
*
* @example
* ```ts
* import { createComboboxContext } from '@vuetify/v0'
*
* const [useCombobox, provideCombobox, combobox] = createComboboxContext({
*   namespace: 'my-combobox',
*   strict: true,
* })
* ```
*/
function createComboboxContext(_options = {}) {
	const { namespace = "v0:combobox", ...options } = _options;
	const context = createCombobox(options);
	return createTrinity(namespace, context);
}
/**
* Injects the current combobox context from a parent provider.
*
* @param namespace - DI namespace. Defaults to `'v0:combobox'`.
* @returns The combobox context from the nearest provider.
*
* @see https://0.vuetifyjs.com/composables/forms/create-combobox
*
* @example
* ```ts
* import { useCombobox } from '@vuetify/v0'
*
* const combobox = useCombobox()
* combobox.query.value = 'search term'
* ```
*/
function useCombobox(namespace = "v0:combobox") {
	return useContext(namespace);
}
//#endregion
//#region src/composables/useLazy/index.ts
/**
* @module useLazy
*
* @see https://0.vuetifyjs.com/composables/system/use-lazy
*
* @remarks
* Deferred content rendering composable for performance optimization.
*
* Key features:
* - Content only renders after first activation (unless eager)
* - Optional reset on deactivation for memory savings
* - Readonly state refs for template binding
* - Manual reset control
* - SSR-safe
*
* Perfect for dialogs, menus, tooltips, and any component with
* conditionally rendered content.
*
* @example
* ```ts
* import { shallowRef } from 'vue'
* import { useLazy } from '@vuetify/v0'
*
* const isOpen = shallowRef(false)
* const { hasContent, onAfterLeave } = useLazy(isOpen)
* ```
*/
/**
* Deferred content rendering for performance optimization.
*
* @param active Reactive boolean controlling activation state
* @param options Configuration options
* @returns Lazy context with state refs and control functions
*
* @see https://0.vuetifyjs.com/composables/system/use-lazy
*
* @example
* ```ts
* import { ref } from 'vue'
* import { useLazy } from '@vuetify/v0'
*
* const isOpen = ref(false)
* const { hasContent, onAfterLeave } = useLazy(isOpen)
*
* // In template:
* // <Transition @after-leave="onAfterLeave">
* //   <div v-if="isOpen">
* //     <template v-if="hasContent">
* //       <!-- Heavy content here -->
* //     </template>
* //   </div>
* // </Transition>
* ```
*
* @example
* Eager mode (render immediately):
* ```ts
* const { hasContent } = useLazy(isOpen, { eager: true })
* // hasContent.value is always true
* ```
*
* @example
* With reactive eager prop:
* ```ts
* const props = defineProps<{ eager: boolean }>()
* const { hasContent } = useLazy(isOpen, {
*   eager: toRef(() => props.eager),
* })
* ```
*/
function useLazy(active, options = {}) {
	const { eager = false, delay = 0 } = options;
	const isBooted = shallowRef(false);
	const hasContent = toRef(() => isBooted.value || toValue(eager) || toValue(active));
	const timer = delay > 0 ? useTimer(() => {
		isBooted.value = true;
	}, { duration: delay }) : void 0;
	const stop = watch(() => toValue(active), (value) => {
		if (value) {
			if (timer) timer.start();
			else isBooted.value = true;
		} else timer?.stop();
	}, { immediate: true });
	function reset() {
		isBooted.value = false;
	}
	function onAfterLeave() {
		if (!toValue(eager)) reset();
	}
	onScopeDispose(stop, true);
	return {
		isBooted: shallowReadonly(isBooted),
		hasContent: shallowReadonly(hasContent),
		reset,
		onAfterLeave
	};
}
//#endregion
//#region src/composables/createSortable/index.ts
/**
* @module createSortable
*
* @see https://0.vuetifyjs.com/composables/data/create-sortable
*
* @remarks
* Headless ordered-list primitive. Extends `createModel` with mutation primitives
* (`swap`, `reorder`) and an enriched `move:ticket` event on the registry event
* bus. Honors `disabled` as a real mutation gate at both root and per-ticket scope.
*
* Pure logical composable — no DnD, no DOM, no keyboard. Drag-and-drop integration
* composes with `useDragDrop`; keyboard reorder composes with `useVirtualFocus`.
*
* @example
* ```ts
* import { createSortable } from '@vuetify/v0'
* import type { SortableTicketInput } from '@vuetify/v0'
*
* interface TaskTicket extends SortableTicketInput {
*   value: { id: number; label: string }
* }
*
* const sortable = createSortable<TaskTicket>()
* const a = sortable.register({ value: { id: 1, label: 'A' } })
* const b = sortable.register({ value: { id: 2, label: 'B' } })
*
* sortable.move(a.id, 1)
* sortable.on('move:ticket', ({ ticket, from, to }) => {
*   console.log(`${ticket.value.label} moved ${from} → ${to}`)
* })
* ```
*/
/**
* Create an ordered-list state primitive.
*
* @param options Sortable options.
* @returns A {@link SortableContext} that extends {@link ModelContext}.
*
* @example
* ```ts
* const sortable = createSortable<Todo>()
* sortable.onboard(todos.value.map(value => ({ value })))
* ```
*/
function createSortable(_options = {}) {
	const { disabled, ...options } = _options;
	const model = createModel({
		...options,
		events: true,
		disabled
	});
	const logger = useLogger();
	function move(id, toIndex) {
		if (toValue(disabled)) return void 0;
		const ticket = model.get(id);
		if (!ticket) return void 0;
		if (toValue(ticket.disabled)) return void 0;
		const from = ticket.index;
		const result = model.move(id, toIndex);
		if (result && result.index !== from) model.emit("move:ticket", {
			ticket: result,
			from,
			to: result.index
		});
		return result;
	}
	function swap(a, b) {
		if (toValue(disabled)) return;
		if (a === b) return;
		const ta = model.get(a);
		const tb = model.get(b);
		if (!ta || !tb) return;
		if (toValue(ta.disabled) || toValue(tb.disabled)) return;
		const indexA = ta.index;
		const indexB = tb.index;
		model.batch(() => {
			const ra = model.move(a, indexB);
			if (ra && ra.index !== indexA) model.emit("move:ticket", {
				ticket: ra,
				from: indexA,
				to: ra.index
			});
			const rb = model.move(b, indexA);
			if (rb && rb.index !== indexB) model.emit("move:ticket", {
				ticket: rb,
				from: indexB,
				to: rb.index
			});
		});
	}
	function reorder(ids) {
		if (toValue(disabled)) return;
		const currentSize = model.size;
		if (ids.length !== currentSize) {
			logger.warn(`Reorder expected ${currentSize} ids, got ${ids.length}.`);
			return;
		}
		const known = new Set(model.keys());
		const seen = /* @__PURE__ */ new Set();
		for (const id of ids) {
			if (!known.has(id)) {
				logger.warn(`Reorder contains unknown id "${String(id)}".`);
				return;
			}
			if (seen.has(id)) {
				logger.warn(`Reorder contains duplicate id "${String(id)}".`);
				return;
			}
			seen.add(id);
		}
		const froms = /* @__PURE__ */ new Map();
		for (const id of ids) {
			const ticket = model.get(id);
			if (ticket) froms.set(id, ticket.index);
		}
		model.batch(() => {
			model.reorder(ids);
			for (const [index, id] of ids.entries()) {
				const from = froms.get(id);
				if (from === index) continue;
				const ticket = model.get(id);
				if (ticket) model.emit("move:ticket", {
					ticket,
					from,
					to: index
				});
			}
		});
	}
	return {
		...model,
		move,
		swap,
		reorder,
		get size() {
			return model.size;
		}
	};
}
//#endregion
//#region src/composables/createDataGrid/editing.ts
/**
* @module createDataGrid/editing
*
* @remarks
* Cell editing state management. Tracks active cell, validation errors,
* and dirty (staged but uncommitted) edits. Does not mutate source data —
* commit fires a callback for the consumer to handle.
*
* When a `registry` is provided, editing state for rows that get
* unregistered (or wiped via `clear`) is pruned automatically so consumers
* can never observe `active` pointing at a phantom row or stale entries
* lingering in `dirty`.
*
* @internal Consumed only by `createDataGrid`. This is a fully decoupled 2D
* cell-edit primitive — it imports nothing from `createDataGrid` /
* `createDataTable` (only `#v0/utilities`, `#v0/types`, and Vue), so it is a
* latent composable. It is parameterized over a row type `T` (defaulting to
* `unknown`), but a type parameter is not an import — the primitive stays
* fully decoupled from the grid's concrete ticket types and deliberately
* row-agnostic: `T` is intentionally unconstrained, so do not narrow it to
* the grid's `Record<string, unknown>` when promoting. Promote it to a
* standalone `createCellEditing/`
* composable the moment a second consumer appears (e.g. an editable
* `createDataTable`). See `.claude/rules/composables.md` §"Sub-modules:
* inline, private sibling, or promote".
*/
/**
* Creates cell editing state for a data grid.
*
* @param options Cell editing configuration including columns and commit callback
* @returns Cell editing state and controls
*
* @example
* ```ts
* const editing = createCellEditing({
*   columns: [{ id: 'name', editable: true }],
*   registry: table,
*   onEdit (row, column, value) { ... },
* })
*
* editing.edit(1, 'name')
* editing.commit('Alice')
* ```
*/
function createCellEditing(options) {
	const { columns, onEdit, lookup, registry } = options;
	function resolveColumn(column) {
		for (const col of toValue(columns)) if (col.id === column) return col;
	}
	const active = shallowRef(null);
	const error = shallowRef(null);
	const dirty = shallowReactive(/* @__PURE__ */ new Map());
	function edit(row, column) {
		const col = resolveColumn(column);
		if (!col) return;
		if (/* @__PURE__ */ isFunction(col.editable)) {
			const item = lookup?.(row);
			if (/* @__PURE__ */ isUndefined(item) || !col.editable(item)) return;
		} else if (col.editable !== true) return;
		error.value = null;
		active.value = {
			row,
			column
		};
	}
	function commit(value) {
		const cell = active.value;
		if (!cell) return;
		const col = resolveColumn(cell.column);
		if (col?.validate) {
			const result = col.validate(value, lookup?.(cell.row));
			if (result !== true && /* @__PURE__ */ isString(result) && result.length > 0) {
				error.value = result;
				return;
			}
		}
		const entry = dirty.get(cell.row);
		if (entry) {
			entry.delete(cell.column);
			if (entry.size === 0) dirty.delete(cell.row);
		}
		error.value = null;
		active.value = null;
		onEdit?.(cell.row, cell.column, value);
	}
	function cancel() {
		const cell = active.value;
		if (cell) {
			const entry = dirty.get(cell.row);
			if (entry) {
				entry.delete(cell.column);
				if (entry.size === 0) dirty.delete(cell.row);
			}
		}
		error.value = null;
		active.value = null;
	}
	function onUnregister(data) {
		const ticket = data;
		if (active.value?.row === ticket.id) {
			active.value = null;
			error.value = null;
		}
		dirty.delete(ticket.id);
	}
	function onClear() {
		active.value = null;
		error.value = null;
		dirty.clear();
	}
	if (registry) {
		registry.on("unregister:ticket", onUnregister);
		registry.on("clear:registry", onClear);
		onScopeDispose(() => {
			registry.off("unregister:ticket", onUnregister);
			registry.off("clear:registry", onClear);
		}, true);
	}
	return {
		active,
		edit,
		commit,
		cancel,
		error,
		dirty
	};
}
//#endregion
//#region src/composables/createDataGrid/layout.ts
/**
* @module createDataGrid/layout
*
* @remarks
* Manages column layout state for data grids: sizing (percentages 0-100),
* pinning (left/right/scrollable regions), delta-based resizing compatible
* with the Splitter two-panel model, column reordering, and visibility.
*
* Column existence, display order, AND grid layout config (size, pin,
* min/max, resizable, reorderable) all live on the table's columns registry
* (passed in as the only argument). `createRegistry` preserves the extra
* grid fields on each ticket, so layout reads its config straight off the
* registered ticket — there is no separate defs array. Columns onboarded
* before OR after the layout is built are picked up identically: an initial
* loop seeds the already-registered set and a `register:ticket` handler seeds
* the rest. Removed columns have their pin/size/visibility state pruned via
* unregister events.
*
* Sizing uses percentages so it is compatible with the Splitter component.
* Offsets are computed per-region (left, scrollable, right) independently
* and over visible columns only — hidden columns are excluded from the
* render set without auto-redistribution (headless: the consumer rebalances
* via `distribute()` or CSS).
*
* @internal Private sibling of `createDataGrid`, and intentionally NOT a
* promotion candidate: it is bound to the table's `DataTableColumnTicket`
* types, so it is parent-specific glue rather than a reusable primitive. See
* `.claude/rules/composables.md` §"Sub-modules: inline, private sibling, or
* promote".
*/
const DEFAULT_EXTRAS = {
	minSize: 2,
	maxSize: 100,
	resizable: true,
	reorderable: true
};
function offsets(cols, reverse = false) {
	let offset = 0;
	const start = reverse ? cols.length - 1 : 0;
	const step = reverse ? -1 : 1;
	const end = reverse ? -1 : cols.length;
	for (let i = start; i !== end; i += step) {
		cols[i].offset = offset;
		offset += cols[i].size;
	}
}
/**
* Creates a column layout manager for a data grid.
*
* Reads column existence, display order, AND grid layout config (size, pin,
* min/max, resizable, reorderable) from the table's columns registry. The
* grid fields ride on each ticket — `createRegistry` preserves them — so
* there is no separate defs array. Visibility is layout-local view state
* (not a ticket field) kept here and reconciled via register / unregister /
* clear events.
*
* Generic over the registry's input/output ticket types so the caller's
* concrete grid column ticket (`DataGridColumnTicket`) flows through. Layout
* only ever reads from the registry (`values`, `keys`, `on`, `reorder`,
* `move`, `lookup`) — it never registers — so the output ticket need only be
* readable as a {@link GridColumnDef}.
*
* @param cols The table's columns registry — source of truth for which
*             columns exist, in what order, and their layout config
* @returns Column layout state and mutation methods
*/
function createColumnLayout(cols) {
	const logger = useLogger();
	const configs = /* @__PURE__ */ new Map();
	const group = createGroup({ multiple: true });
	const sizes = shallowReactive(/* @__PURE__ */ new Map());
	const hidden = shallowReactive(/* @__PURE__ */ new Set());
	const order = [];
	function record(id) {
		if (!order.includes(id)) order.push(id);
	}
	/** Even share over the currently-registered leaves: explicit sizes are
	*  honored, unsized columns split the remaining percentage. */
	function share(id) {
		const leaves = /* @__PURE__ */ extractLeaves(cols.values());
		let used = 0;
		let unsized = 0;
		for (const leaf of leaves) {
			const size = configs.get(String(leaf.id))?.size;
			if (/* @__PURE__ */ isUndefined(size)) unsized++;
			else used += size;
		}
		const own = configs.get(id)?.size;
		if (!/* @__PURE__ */ isUndefined(own)) return own;
		const remainder = Math.max(0, 100 - used);
		return unsized > 0 ? remainder / unsized : 0;
	}
	function seedLeaf(leaf) {
		const id = String(leaf.id);
		if (!configs.has(id)) configs.set(id, {
			size: leaf.size,
			minSize: leaf.minSize ?? DEFAULT_EXTRAS.minSize,
			maxSize: leaf.maxSize ?? DEFAULT_EXTRAS.maxSize,
			resizable: leaf.resizable ?? DEFAULT_EXTRAS.resizable,
			reorderable: leaf.reorderable ?? DEFAULT_EXTRAS.reorderable,
			pinned: leaf.pinned ?? false
		});
		if (!group.has(id)) group.register({
			id,
			value: id
		});
		if (!sizes.has(id)) sizes.set(id, share(id));
		for (const other of /* @__PURE__ */ extractLeaves(cols.values())) {
			const otherId = String(other.id);
			if (configs.has(otherId) && /* @__PURE__ */ isUndefined(configs.get(otherId)?.size)) sizes.set(otherId, share(otherId));
		}
		const config = configs.get(id);
		if (config.pinned === "left") group.select(id);
		else if (config.pinned === "right") group.mix(id);
	}
	function dropLeaf(id) {
		group.unregister(id);
		configs.delete(id);
		sizes.delete(id);
		hidden.delete(id);
	}
	function leavesOf(ticket) {
		return /* @__PURE__ */ extractLeaves([ticket]);
	}
	for (const ticket of cols.values()) {
		record(String(ticket.id));
		for (const leaf of leavesOf(ticket)) seedLeaf(leaf);
	}
	cols.on("register:ticket", (ticket) => {
		record(String(ticket.id));
		for (const leaf of leavesOf(ticket)) seedLeaf(leaf);
	});
	cols.on("unregister:ticket", (ticket) => {
		const top = order.indexOf(String(ticket.id));
		if (top !== -1) order.splice(top, 1);
		for (const leaf of leavesOf(ticket)) dropLeaf(String(leaf.id));
	});
	cols.on("clear:registry", () => {
		group.clear();
		configs.clear();
		sizes.clear();
		hidden.clear();
		order.length = 0;
	});
	function position(id) {
		if (group.selectedIds.has(id)) return "left";
		if (group.mixed(id)) return "right";
		return false;
	}
	function resolve(includeHidden) {
		const resolved = [];
		let index = 0;
		for (const ticket of /* @__PURE__ */ extractLeaves(cols.values())) {
			const id = String(ticket.id);
			const visible = !hidden.has(id);
			if (!includeHidden && !visible) continue;
			const meta = configs.get(id) ?? DEFAULT_EXTRAS;
			resolved.push({
				id,
				index: index++,
				size: sizes.get(id) ?? 0,
				offset: 0,
				pinned: position(id),
				resizable: meta.resizable,
				reorderable: meta.reorderable,
				minSize: meta.minSize,
				maxSize: meta.maxSize,
				visible
			});
		}
		return resolved;
	}
	function split(resolved) {
		const left = [];
		const scrollable = [];
		const right = [];
		for (const col of resolved) if (col.pinned === "left") left.push(col);
		else if (col.pinned === "right") right.push(col);
		else scrollable.push(col);
		offsets(left);
		offsets(scrollable);
		offsets(right, true);
		return {
			left,
			scrollable,
			right
		};
	}
	const pinned = computed(() => split(resolve(false)));
	const columns = computed(() => {
		const { left, scrollable, right } = pinned.value;
		return [
			...left,
			...scrollable,
			...right
		];
	});
	const allColumns = computed(() => resolve(true));
	function pin(id, pos) {
		if (!group.has(id)) return;
		group.unselect(id);
		group.unmix(id);
		if (pos === "left") group.select(id);
		else if (pos === "right") group.mix(id);
	}
	function resize(id, delta) {
		const { left, scrollable, right } = pinned.value;
		const all = [
			...left,
			...scrollable,
			...right
		];
		const target = all.find((c) => c.id === id);
		if (!target || !target.resizable) return;
		const allIndex = all.findIndex((c) => c.id === id);
		if (allIndex === -1 || allIndex === all.length - 1) return;
		const neighbor = all[allIndex + 1];
		const total = target.size + neighbor.size;
		const lower = Math.max(target.minSize, total - neighbor.maxSize);
		const upper = Math.min(target.maxSize, total - neighbor.minSize);
		const clamped = /* @__PURE__ */ clamp(target.size + delta, lower, upper);
		sizes.set(id, clamped);
		sizes.set(neighbor.id, total - clamped);
	}
	function reorder(from, to) {
		if (from === to) return;
		const tops = [...cols.values()];
		const ids = [];
		const leafToTop = [];
		for (const [top, ticket] of tops.entries()) for (const leaf of /* @__PURE__ */ extractLeaves([ticket])) {
			ids.push(String(leaf.id));
			leafToTop.push(top);
		}
		const visible = ids.filter((id) => !hidden.has(id));
		const fromId = visible[from];
		const toId = visible[to];
		if (/* @__PURE__ */ isUndefined(fromId) || /* @__PURE__ */ isUndefined(toId)) return;
		const fromTop = leafToTop[ids.indexOf(fromId)];
		const toTop = leafToTop[ids.indexOf(toId)];
		if (/* @__PURE__ */ isUndefined(fromTop) || /* @__PURE__ */ isUndefined(toTop) || fromTop === toTop) return;
		if (tops[fromTop]?.reorderable === false) return;
		const id = cols.lookup(fromTop);
		if (/* @__PURE__ */ isUndefined(id)) return;
		cols.move(id, toTop);
	}
	function distribute(incoming) {
		const visible = (/* @__PURE__ */ extractLeaves(cols.values())).filter((leaf) => !hidden.has(String(leaf.id)));
		if (incoming.length !== visible.length) {
			logger.warn(`createDataGrid: distribute() expected ${visible.length} sizes but received ${incoming.length}; ignoring.`);
			return;
		}
		const sum = incoming.reduce((acc, value) => acc + value, 0);
		if (sum <= 0) {
			logger.warn(`createDataGrid: distribute() received sizes summing to ${sum}; expected a positive total.`);
			return;
		}
		const metas = visible.map((col) => configs.get(String(col.id)) ?? DEFAULT_EXTRAS);
		let current = incoming.map((value, i) => /* @__PURE__ */ clamp(value / sum * 100, metas[i].minSize, metas[i].maxSize));
		let residual = 100 - current.reduce((acc, value) => acc + value, 0);
		const max = visible.length * 2;
		for (let pass = 0; pass < max && Math.abs(residual) >= 1e-6; pass++) {
			const room = current.map((value, i) => residual > 0 ? metas[i].maxSize - value : value - metas[i].minSize);
			const available = room.reduce((acc, value) => acc + Math.max(0, value), 0);
			if (available <= 0) break;
			current = current.map((value, i) => room[i] <= 0 ? value : value + residual * (room[i] / available));
			residual = 100 - current.reduce((acc, value) => acc + value, 0);
		}
		if (Math.abs(residual) >= 1e-6) logger.warn(`createDataGrid: distribute() could not reach 100 within min/max constraints (off by ${residual.toFixed(2)})`);
		for (const [i, col] of visible.entries()) sizes.set(String(col.id), current[i]);
	}
	function show(id) {
		hidden.delete(id);
	}
	function hide(id) {
		hidden.add(id);
	}
	function toggle(id) {
		if (hidden.has(id)) hidden.delete(id);
		else hidden.add(id);
	}
	function reset() {
		for (const ticket of /* @__PURE__ */ extractLeaves(cols.values())) {
			const id = String(ticket.id);
			sizes.set(id, share(id));
		}
		cols.reorder([...order]);
		hidden.clear();
		for (const ticket of /* @__PURE__ */ extractLeaves(cols.values())) {
			const id = String(ticket.id);
			group.unselect(id);
			group.unmix(id);
		}
		for (const [id, config] of configs) if (config.pinned === "left") group.select(id);
		else if (config.pinned === "right") group.mix(id);
	}
	return {
		pinned,
		columns,
		all: allColumns,
		pin,
		resize,
		reorder,
		distribute,
		show,
		hide,
		toggle,
		reset
	};
}
//#endregion
//#region src/composables/createDataGrid/spanning.ts
/**
* @module createDataGrid/spanning
*
* @remarks
* Computes a row span map from visible items. For each cell, determines
* rowSpan and whether it's hidden (covered by a span from a previous row).
* Spans do not cross page boundaries. Each row is addressed by a key: either a
* `key(item, index)` projection (the grid passes the registry ticket id) or,
* absent that, the row's `itemKey` value. Rows whose resolved key is
* `undefined` cannot be addressed in the resulting map and are skipped.
*
* @internal Consumed only by `createDataGrid`. Fully decoupled (items ref +
* columns + key + span fn — no grid/table types), so it is a latent composable.
* Promote it to a standalone `createRowSpanning/` composable on a second
* consumer. See `.claude/rules/composables.md` §"Sub-modules: inline, private
* sibling, or promote".
*/
/**
* Computes a row span map from visible items.
*
* @param options Row spanning configuration
* @returns A computed map of item ID to column to SpanEntry
*
* @example
* ```ts
* const spans = createRowSpanning({
*   items: computed(() => grid.items.value),
*   columns: ['group', 'ticker', 'value'],
*   span: (item, column) => column === 'group' ? 3 : 1,
* })
*
* spans.value.get(id)?.get('group') // { rowSpan: 3, hidden: false }
* ```
*/
function createRowSpanning(options) {
	const { items, columns, key, itemKey = "id", span } = options;
	return computed(() => {
		const result = /* @__PURE__ */ new Map();
		if (!span) return result;
		const list = items.value;
		const resolved = toValue(columns);
		const covered = Array.from({ length: resolved.length }, () => 0);
		for (let row = 0; row < list.length; row++) {
			const item = list[row];
			const id = key ? key(item, row) : item[itemKey];
			if (/* @__PURE__ */ isUndefined(id)) continue;
			const cells = /* @__PURE__ */ new Map();
			for (const [col, column] of resolved.entries()) if (covered[col] > 0) {
				cells.set(column, {
					rowSpan: 1,
					hidden: true
				});
				covered[col]--;
			} else {
				const raw = span(item, column);
				const rowSpan = Math.min(Math.max(1, /* @__PURE__ */ isNaN(raw) ? 1 : raw), list.length - row);
				cells.set(column, {
					rowSpan,
					hidden: false
				});
				if (rowSpan > 1) covered[col] = rowSpan - 1;
			}
			result.set(id, cells);
		}
		return result;
	});
}
//#endregion
//#region src/composables/createDataGrid/index.ts
/**
* @module createDataGrid
*
* @see https://0.vuetifyjs.com/composables/data/create-data-grid
*
* @remarks
* Main factory that wires together column layout, cell editing, row ordering,
* and row spanning on top of a createDataTable pipeline. Row ordering is
* provided by a createSortable instance synced to the table's row registry
* via register / unregister events; the ordered ids are applied post-sort,
* pre-pagination by overriding the `items` projection.
*
* Rows are registered through the inherited registry surface (`register`,
* `onboard`, `unregister`, `clear`) — they are not passed as an `items`
* option to the factory.
*
* Follows the trinity pattern for dependency injection.
*
* @example
* ```ts
* const grid = createDataGrid()
*
* grid.columns.onboard([
*   { id: 'name', sortable: true },
*   { id: 'progress', editable: true },
* ])
*
* grid.onboard(rows.map(value => ({ id: value.id, value })))
* grid.layout.pin('name', 'left')
* grid.editing.edit(row.id, 'progress')
* ```
*/
function recordId(row) {
	return row.id;
}
/**
* Creates a data grid instance with layout, editing, row ordering, and spanning
* layered on top of the createDataTable pipeline.
*
* Rows live on the inherited registry surface — register them with
* `grid.onboard(rows.map(value => ({ id: value.id, value })))` or
* `grid.register({ id, value })`.
*
* @param options Data grid options
* @returns Data grid context
*
* @example
* ```ts
* const grid = createDataGrid({ pagination: { page: 1 } })
*
* grid.columns.onboard([
*   { id: 'name', sortable: true },
*   { id: 'progress', editable: true, validate: v => Number(v) >= 0 || 'must be positive' },
* ])
*
* grid.onboard(rows.map(value => ({ id: value.id, value })))
* grid.layout.pin('name', 'left')
* grid.rows.move(rowId, 0)
* grid.editing.edit(row.id, 'progress')
* ```
*/
function createDataGrid(_options = {}) {
	const { editing: editingOptions, preserveRowOrder = false, rowSpanning, ...options } = _options;
	const table = createDataTable(options);
	const sortable = createSortable();
	const sortableProxy = useProxyRegistry(sortable);
	const dirty = shallowRef(false);
	table.on("register:ticket", (ticket) => {
		sortable.register({
			id: ticket.id,
			value: ticket.id
		});
	});
	table.on("unregister:ticket", (ticket) => {
		sortable.unregister(ticket.id);
	});
	table.on("clear:registry", () => {
		sortable.clear();
		dirty.value = false;
	});
	const order = toRef(() => sortableProxy.keys);
	const sortedIds = computed(() => {
		const buckets = /* @__PURE__ */ new Map();
		for (const ticket of table.values()) {
			const value = ticket.value;
			const queue = buckets.get(value);
			if (queue) queue.push(ticket.id);
			else buckets.set(value, [ticket.id]);
		}
		const ids = [];
		for (const value of table.sortedItems.value) {
			const id = buckets.get(value)?.shift();
			if (!/* @__PURE__ */ isUndefined(id)) ids.push(id);
		}
		return ids;
	});
	function move(id, toIndex) {
		if (!dirty.value) {
			const sorted = sortedIds.value;
			const seen = new Set(sorted);
			const rest = sortable.keys().filter((key) => !seen.has(key));
			sortable.reorder([...sorted, ...rest]);
		}
		sortable.move(id, toIndex);
		dirty.value = true;
	}
	function reset() {
		if (!dirty.value) return;
		if (sortable.size > 0) sortable.reorder(table.keys());
		dirty.value = false;
	}
	useToggleScope(() => !toValue(preserveRowOrder), () => {
		watch(table.sort.columns, reset, { flush: "sync" });
	});
	const ordered = computed(() => {
		if (!dirty.value) return {
			items: table.sortedItems.value,
			ids: sortedIds.value
		};
		const sorted = table.sortedItems.value;
		const ids = sortedIds.value;
		const byId = /* @__PURE__ */ new Map();
		for (let i = 0; i < sorted.length; i++) byId.set(ids[i], sorted[i]);
		const seen = new Set(order.value);
		const items = [];
		const orderedIds = [];
		for (const id of order.value) {
			const value = byId.get(id);
			if (!/* @__PURE__ */ isUndefined(value)) {
				items.push(value);
				orderedIds.push(id);
			}
		}
		for (const [i, element] of sorted.entries()) {
			const id = ids[i];
			if (!seen.has(id)) {
				items.push(element);
				orderedIds.push(id);
			}
		}
		return {
			items,
			ids: orderedIds
		};
	});
	const page = computed(() => {
		if (!dirty.value) {
			const start = table.pagination.pageStart.value;
			return {
				items: table.items.value,
				ids: table.total.value > table.sortedItems.value.length ? sortedIds.value : sortedIds.value.slice(start, start + table.items.value.length)
			};
		}
		const full = ordered.value;
		if (table.total.value > table.sortedItems.value.length) return full;
		const start = table.pagination.pageStart.value;
		const stop = table.pagination.pageStop.value;
		return {
			items: full.items.slice(start, stop),
			ids: full.ids.slice(start, stop)
		};
	});
	const pageOrderedItems = toRef(() => page.value.items);
	const orderedItems = toRef(() => ordered.value.items);
	function rank(source) {
		const ranked = orderedItems.value;
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
	const layout = createColumnLayout(table.columns);
	function lookup(row) {
		return table.get(row)?.value;
	}
	const editing = createCellEditing({
		columns: () => table.leaves.value.filter((col) => col.editable === true || /* @__PURE__ */ isFunction(col.editable)).map((col) => ({
			id: String(col.id),
			editable: col.editable,
			validate: col.validate
		})),
		lookup,
		registry: table,
		onEdit: editingOptions?.onEdit ? (row, column, value) => {
			const item = lookup(row);
			if (!/* @__PURE__ */ isUndefined(item)) editingOptions.onEdit(row, column, value, item);
		} : void 0
	});
	const spans = createRowSpanning({
		items: pageOrderedItems,
		columns: () => table.leaves.value.map((col) => col.id),
		key: (_item, index) => page.value.ids[index],
		span(item, column) {
			const col = table.leaves.value.find((leaf) => String(leaf.id) === column);
			if (col && /* @__PURE__ */ isFunction(col.span)) return col.span(item);
			return rowSpanning?.(item, column) ?? 1;
		}
	});
	return {
		...table,
		items: pageOrderedItems,
		orderedItems,
		rank,
		layout,
		rows: {
			order,
			move,
			reset
		},
		editing,
		spans,
		get size() {
			return table.size;
		}
	};
}
/**
* Creates a data grid context with dependency injection support.
*
* @param options Data grid context options including namespace
* @returns A trinity tuple: [useDataGridContext, provideDataGridContext, defaultContext]
*
* @example
* ```ts
* const [useDataGrid, provideDataGrid, grid] = createDataGridContext({
*   namespace: 'v0:projects',
* })
*
* grid.columns.onboard(columns)
* grid.onboard(rows.map(value => ({ id: value.id, value })))
* provideDataGrid()
* const ctx = useDataGrid()
* ```
*/
function createDataGridContext(_options = {}) {
	const { namespace = "v0:data-grid", ...options } = _options;
	const [useDataGridContext, _provideDataGridContext] = createContext(namespace);
	const context = createDataGrid(options);
	function provideDataGridContext(_context = context, app) {
		return _provideDataGridContext(_context, app);
	}
	return createTrinity(useDataGridContext, provideDataGridContext, context);
}
/**
* Returns the current data grid context from dependency injection.
*
* @param namespace The namespace for the data grid context. @default 'v0:data-grid'
* @returns The current data grid context
*
* @example
* ```ts
* const grid = useDataGrid<Project>()
*
* grid.layout.pin('id', 'left')
* grid.rows.reset()
* ```
*/
function useDataGrid(namespace = "v0:data-grid") {
	return useContext(namespace);
}
//#endregion
//#region src/composables/useRaf/index.ts
/**
* @module useRaf
*
* @see https://0.vuetifyjs.com/composables/system/use-raf
*
* @remarks
* Scope-disposed safe requestAnimationFrame composable.
*
* Key features:
* - Cancel-then-request pattern (deduplicates rapid calls)
* - Automatic cleanup on scope disposal
* - SSR-safe (no-op in non-browser environments)
* - Callable function with cancel method
*
* Perfect for throttling updates to the next animation frame.
*
* @example
* ```ts
* import { useRaf } from '@vuetify/v0'
*
* const update = useRaf(timestamp => {
*   // runs on next animation frame
* })
* update()
* ```
*/
/**
* Scope-disposed safe requestAnimationFrame.
*
* @param callback Function to call on animation frame.
* @returns Callable that requests frame (canceling pending), with cancel method.
*
* @see https://0.vuetifyjs.com/composables/system/use-raf
*
* @example
* ```ts
* // Basic usage
* const update = useRaf((timestamp) => {
*   // Runs on next animation frame
* })
*
* update() // Request frame
* update() // Cancels previous, requests new (deduplicated)
*
* // Manual cancel
* update.cancel()
*
* // Check if pending
* if (update.isActive.value) { ... }
* ```
*/
function useRaf(callback) {
	const id = shallowRef();
	const isActive = toRef(() => !/* @__PURE__ */ isUndefined(id.value));
	function cancel() {
		if (!/* @__PURE__ */ isUndefined(id.value)) {
			cancelAnimationFrame(id.value);
			id.value = void 0;
		}
	}
	function request() {
		if (!IN_BROWSER) return;
		cancel();
		id.value = requestAnimationFrame((timestamp) => {
			id.value = void 0;
			callback(timestamp);
		});
	}
	onScopeDispose(cancel, true);
	return Object.assign(request, {
		cancel,
		isActive
	});
}
//#endregion
//#region src/composables/createForm/index.ts
/**
* @module createForm
*
* @see https://0.vuetifyjs.com/composables/forms/create-form
*
* @remarks
* Form composable that coordinates validation across multiple fields.
*
* Key features:
* - Pure registry of ValidationContext instances
* - Validations auto-register via useForm() injection
* - Form-level submit, reset, and aggregate state
* - Exposes disabled/readonly refs for component consumption
* - Trinity pattern for DI
*
* Per-field validation logic lives in createValidation.
* createForm is the mothership — it coordinates, not creates.
*
* @example
* ```ts
* import { createForm } from '@vuetify/v0'
*
* const form = createForm()
* const isValid = await form.validate()
* if (isValid) form.submit()
* ```
*/
/**
* Creates a new form instance.
*
* A form is a pure registry of validation contexts. Validations register
* themselves via `useForm()` injection. The form coordinates submit, reset,
* and aggregate state across all registered validations.
*
* @param options The options for the form instance.
* @returns A new form context.
*
* @see https://0.vuetifyjs.com/composables/forms/create-form
*
* @example
* ```ts
* import { createForm, createValidation } from '@vuetify/v0'
* import { shallowRef } from 'vue'
*
* const form = createForm()
*
* // Each validation is one input — form is just the coordinator
* const email = shallowRef('')
* const validation = createValidation({
*   value: email,
*   rules: ['required', 'email'],
* })
*
* form.register({ value: validation })
*
* await form.submit()
* form.reset()
* ```
*/
function createForm(_options = {}) {
	const { disabled = false, readonly = false, ...options } = _options;
	const registry = createRegistry({
		...options,
		reactive: true
	});
	const isValidating = computed(() => {
		for (const ticket of registry.values()) if (ticket.value.isValidating.value) return true;
		return false;
	});
	const isValid = computed(() => {
		let hasNull = false;
		let hasFields = false;
		for (const ticket of registry.values()) {
			hasFields = true;
			if (ticket.value.isValid.value === false) return false;
			if (/* @__PURE__ */ isNull(ticket.value.isValid.value)) hasNull = true;
		}
		if (!hasFields) return null;
		return hasNull ? null : true;
	});
	function register(registration) {
		return registry.register(registration);
	}
	function reset() {
		for (const ticket of registry.values()) ticket.value.reset();
	}
	async function submit(id) {
		const ids = /* @__PURE__ */ isUndefined(id) ? [...registry.keys()] : /* @__PURE__ */ toArray(id);
		return (await Promise.all(ids.map(async (key) => {
			const ticket = registry.get(key);
			if (!ticket) return true;
			return ticket.value.validate();
		}))).every(Boolean);
	}
	return {
		...registry,
		register,
		submit,
		reset,
		disabled,
		readonly,
		isValid,
		isValidating,
		get size() {
			return registry.size;
		}
	};
}
/**
* Creates a new form context using the Trinity pattern.
*
* @param options The options for the form context.
* @returns A Trinity tuple: [useFormContext, provideFormContext, formContext]
*
* @see https://0.vuetifyjs.com/composables/forms/create-form
*
* @example
* ```ts
* import { createFormContext } from '@vuetify/v0'
*
* export const [useMyForm, provideMyForm, myForm] = createFormContext()
* ```
*/
function createFormContext(_options = {}) {
	const { namespace = "v0:form", ...options } = _options;
	const context = createForm(options);
	return createTrinity(namespace, context);
}
/**
* Returns the current form instance.
*
* @param namespace The namespace for the form context. Defaults to `'v0:form'`.
* @returns The current form instance, or undefined if not provided.
*
* @see https://0.vuetifyjs.com/composables/forms/create-form
*
* @example
* ```vue
* <script setup lang="ts">
*   import { useForm } from '@vuetify/v0'
*
*   const form = useForm()
* <\/script>
* ```
*/
function useForm(namespace = "v0:form") {
	if (!hasInjectionContext()) return void 0;
	try {
		return useContext(namespace);
	} catch {
		return;
	}
}
//#endregion
//#region src/composables/useIntersectionObserver/index.ts
/**
* @module useIntersectionObserver
*
* @see https://0.vuetifyjs.com/composables/system/use-intersection-observer
*
* @remarks
* IntersectionObserver composable with lifecycle management.
*
* Key features:
* - IntersectionObserver API wrapper
* - `isActive` reactive flag
* - `once` option for single-fire observation
* - Pause/resume/stop functionality
* - Automatic cleanup on unmount
* - SSR-safe (checks SUPPORTS_INTERSECTION_OBSERVER)
* - Hydration-aware
* - Immediate callback option
*
* Perfect for lazy loading, infinite scroll, and visibility detection.
*
* @example
* ```ts
* import { useTemplateRef } from 'vue'
* import { useIntersectionObserver } from '@vuetify/v0'
*
* const target = useTemplateRef('target')
* useIntersectionObserver(target, entries => {
*   console.log(entries[0].isIntersecting)
* })
* ```
*/
/**
* A composable that uses the Intersection Observer API to detect when an element
* is visible in the viewport.
*
* @param target The element to observe.
* @param callback The callback to execute when the element's intersection changes.
* @param options The options for the Intersection Observer.
* @returns An object with methods to control the observer.
*
* @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
* @see https://0.vuetifyjs.com/composables/system/use-intersection-observer
*
* @example
* ```ts
* import { ref } from 'vue'
* import { useIntersectionObserver } from '@vuetify/v0'
*
* const target = ref<HTMLElement>()
* const isVisible = ref(false)
*
* const { isIntersecting, pause, resume } = useIntersectionObserver(
*   target,
*   (entries) => {
*     const entry = entries[0]
*     if (entry) {
*       isVisible.value = entry.isIntersecting
*       console.log('Element is visible:', entry.isIntersecting)
*     }
*   },
*   { threshold: 0.5 }
* )
*
* // Pause observation
* pause()
*
* // Resume observation
* resume()
* ```
*/
function useIntersectionObserver(target, callback, options = {}) {
	const isIntersecting = shallowRef(false);
	return {
		...createObserver(target, callback, {
			supports: SUPPORTS_INTERSECTION_OBSERVER,
			once: options.once,
			create: (cb) => new IntersectionObserver((entries) => {
				cb(entries.map((e) => ({
					boundingClientRect: e.boundingClientRect,
					intersectionRatio: e.intersectionRatio,
					intersectionRect: e.intersectionRect,
					isIntersecting: e.isIntersecting,
					rootBounds: e.rootBounds,
					target: e.target,
					time: e.time
				})));
			}, {
				root: options.root ?? null,
				rootMargin: options.rootMargin ?? "0px",
				threshold: options.threshold ?? 0
			}),
			observe: (obs, el) => obs.observe(el),
			onEntry: (entries) => {
				const latest = entries.at(-1);
				/* v8 ignore next -- defensive: IntersectionObserver always emits at least one entry */
				if (latest) isIntersecting.value = latest.isIntersecting;
			},
			onPause: () => {
				isIntersecting.value = false;
			},
			/* v8 ignore next -- defensive nullish coalesce: entries always populated when shouldStop fires */
			shouldStop: (entries) => entries.at(-1)?.isIntersecting ?? false,
			immediate: options.immediate ? (el) => {
				return [{
					boundingClientRect: el.getBoundingClientRect(),
					intersectionRatio: 0,
					intersectionRect: new DOMRect(0, 0, 0, 0),
					isIntersecting: false,
					rootBounds: null,
					target: el,
					time: performance.now()
				}];
			} : void 0
		}),
		isIntersecting: shallowReadonly(isIntersecting)
	};
}
/**
* A convenience composable that uses the Intersection Observer API to detect
* when an element is visible in the viewport.
*
* @param target The element to observe.
* @param options The options for the Intersection Observer.
* @returns An object with the intersection state.
*
* @see https://0.vuetifyjs.com/composables/system/use-intersection-observer
*
* @example
* ```ts
* import { ref } from 'vue'
* import { useElementIntersection } from '@vuetify/v0'
*
* const myElement = ref<HTMLElement>()
* const { isIntersecting, intersectionRatio } = useElementIntersection(myElement, {
*   threshold: 0.5
* })
*
* // Use in template to conditionally render or animate
* watchEffect(() => {
*   if (isIntersecting.value) {
*     console.log('Element is visible!', intersectionRatio.value)
*   }
* })
* ```
*/
function useElementIntersection(target, options = {}) {
	const isIntersecting = shallowRef(false);
	const intersectionRatio = shallowRef(0);
	const { pause: _pause, resume, stop, isActive, isPaused } = useIntersectionObserver(target, (entries) => {
		const entry = entries.at(-1);
		/* v8 ignore next 4 -- defensive: IntersectionObserver always emits at least one entry */
		if (entry) {
			isIntersecting.value = entry.isIntersecting;
			intersectionRatio.value = entry.intersectionRatio;
		}
	}, {
		immediate: true,
		...options
	});
	function pause() {
		isIntersecting.value = false;
		intersectionRatio.value = 0;
		_pause();
	}
	return {
		isIntersecting: shallowReadonly(isIntersecting),
		intersectionRatio: shallowReadonly(intersectionRatio),
		isActive,
		isPaused,
		pause,
		resume,
		stop
	};
}
//#endregion
//#region src/composables/createValidation/index.ts
/**
* @module createValidation
*
* @see https://0.vuetifyjs.com/composables/forms/create-validation
*
* @remarks
* Per-input validation composable built on createGroup.
*
* Key features:
* - Each ticket is a rule — enable/disable via select/unselect
* - Auto-register with parent form via useForm() injection
* - Async rule support with generation-based race safety
* - Standard Schema support (Zod, Valibot, ArkType, etc.)
* - Silent validation mode
* - Tri-state isValid (null/true/false)
*
* Uses useRules() to resolve alias strings via shared context.
*
* @example
* ```ts
* import { createValidation } from '@vuetify/v0'
*
* const validation = createValidation({
*   rules: [v => !!v || 'Required'],
* })
* await validation.validate('hello')
* ```
*/
const UNSET = /* @__PURE__ */ Symbol("unset");
/**
* Creates a per-input validation instance.
*
* Built on `createGroup` — each registered rule becomes a ticket that can be
* enabled/disabled via selection methods (`select`, `unselect`, `toggle`).
* Only selected (active) rules run during validation.
*
* @param options The options for the validation instance.
* @returns A new validation context.
*
* @see https://0.vuetifyjs.com/composables/forms/create-validation
*
* @example
* ```ts
* import { createValidation } from '@vuetify/v0'
*
* const validation = createValidation({
*   rules: [
*     v => !!v || 'Required',
*     v => /^.+@\S+\.\S+$/.test(String(v)) || 'Invalid email',
*   ],
* })
*
* await validation.validate('')
*
* console.log(validation.errors.value) // ['Required', 'Invalid email']
*
* validation.reset()
* ```
*/
function createValidation(_options = {}) {
	const { rules: initialRules = [], value: valueSource, enroll = true, formNamespace = "v0:form", ...options } = _options;
	const group = createGroup({
		...options,
		enroll,
		multiple: true
	});
	const rulesContext = useRules();
	const errors = shallowRef([]);
	const isValid = shallowRef(null);
	const isValidating = shallowRef(false);
	let generation = 0;
	let visible = 0;
	let latest;
	function register(input) {
		if (/* @__PURE__ */ isFunction(input) || /* @__PURE__ */ isString(input) || /* @__PURE__ */ isStandardSchema(input)) {
			const rule = rulesContext.resolve([input])[0] ?? (() => /* @__PURE__ */ isString(input) ? `Unknown validation rule "${input}"` : false);
			return group.register({ value: rule });
		}
		return group.register(input);
	}
	function onboard(rules) {
		return group.batch(() => rules.map((r) => register(r)));
	}
	async function wait() {
		while (true) {
			const current = latest;
			if (/* @__PURE__ */ isUndefined(current)) return false;
			const result = await current.promise;
			if (current.generation === generation) return result;
		}
	}
	async function run(gen, _value, silent) {
		const val = _value === UNSET ? toValue(valueSource) : _value;
		const activeRules = [];
		for (const ticket of group.selectedItems.value) activeRules.push(ticket.value);
		if (activeRules.length === 0) {
			if (!silent) {
				errors.value = [];
				isValid.value = true;
				isValidating.value = false;
			}
			return true;
		}
		if (!silent) isValidating.value = true;
		try {
			const results = await Promise.all(activeRules.map((rule) => rule(val)));
			if (gen !== generation) return wait();
			const errorMessages = results.filter((result) => /* @__PURE__ */ isString(result) || result === false).map((result) => result === false ? "Validation failed" : result);
			if (!silent) {
				errors.value = errorMessages;
				isValid.value = errorMessages.length === 0;
			}
			return errorMessages.length === 0;
		} catch (error) {
			if (gen !== generation) return wait();
			if (!silent) {
				errors.value = [error instanceof Error ? error.message : "Validation error"];
				isValid.value = false;
			}
			return false;
		} finally {
			if (!silent && gen === visible) isValidating.value = false;
		}
	}
	async function validate(_value = UNSET, silent = false) {
		const gen = ++generation;
		if (!silent) visible = gen;
		const promise = run(gen, _value, silent);
		latest = {
			generation: gen,
			promise
		};
		return promise;
	}
	function reset() {
		errors.value = [];
		isValid.value = null;
		isValidating.value = false;
		generation++;
		latest = void 0;
	}
	if (initialRules.length > 0) onboard(initialRules);
	const context = {
		...group,
		register,
		onboard,
		validate,
		reset,
		errors,
		isValid,
		isValidating,
		get size() {
			return group.size;
		}
	};
	const form = useForm(formNamespace);
	const ticket = form?.register({ value: context });
	onScopeDispose(() => {
		if (!ticket || !form) return;
		form.unregister(ticket.id);
	}, true);
	return context;
}
//#endregion
//#region src/composables/createInput/index.ts
/**
* @module createInput
*
* @see https://0.vuetifyjs.com/composables/forms/create-input
*
* @remarks
* Shared form field primitive. Owns validation, field state, and ARIA IDs.
* Extracted from InputRoot.vue — consumed by Input, NumberField, Select, Combobox.
*
* No event handling — composables never bind DOM events. Components call
* validate() and write isFocused/isTouched when they choose.
*
* @example
* ```ts
* import { shallowRef } from 'vue'
* import { createInput } from '@vuetify/v0'
*
* const value = shallowRef('')
* const input = createInput({ value, label: 'Name', required: true })
* await input.validate()
* ```
*/
function createInput(options) {
	const { value, id = /* @__PURE__ */ useId$1(), label, name, form, formNamespace, required, disabled = false, readonly: _readonly = false, rules = [], error = false, errorMessages, dirty: dirtyFn, equals = (a, b) => a === b } = options;
	function filled(val) {
		if (dirtyFn) return dirtyFn(val);
		return /* @__PURE__ */ isString(val) ? val.length > 0 : !/* @__PURE__ */ isNullOrUndefined(val);
	}
	const locale = useLocale();
	function requiredRule(v) {
		return filled(v) || (locale.ti("Input.required") ?? "Required");
	}
	const validation = createValidation({
		rules: required ? [requiredRule, ...rules] : rules,
		value,
		formNamespace
	});
	const initialValue = value.value;
	const isFocused = shallowRef(false);
	const isTouched = shallowRef(false);
	const descriptions = createRegistry({ reactive: true });
	const fieldErrors = createRegistry({ reactive: true });
	const hasDescription = toRef(() => descriptions.size > 0);
	const hasError = toRef(() => fieldErrors.size > 0);
	const isDisabled = toRef(() => toValue(disabled));
	const isReadonly = toRef(() => toValue(_readonly));
	const descriptionId = `${id}-description`;
	const errorId = `${id}-error`;
	const isDirty = toRef(() => filled(value.value));
	const isPristine = shallowRef(true);
	watch(value, (val) => {
		isPristine.value = equals(val, initialValue);
	}, { flush: "sync" });
	const errors = computed(() => {
		const manual = toValue(errorMessages);
		return [...manual ? /* @__PURE__ */ toArray(manual) : [], ...validation.errors.value];
	});
	const isValid = toRef(() => {
		if (toValue(error)) return false;
		if (errors.value.length > 0 && validation.errors.value.length === 0) return false;
		return validation.isValid.value;
	});
	const state = toRef(() => {
		if (isValid.value === false) return "invalid";
		if (isValid.value === true) return "valid";
		return "pristine";
	});
	function validate() {
		return validation.validate();
	}
	function reset() {
		value.value = initialValue;
		isPristine.value = true;
		isTouched.value = false;
		validation.reset();
	}
	return {
		id,
		label,
		name,
		form,
		required,
		descriptionId,
		errorId,
		descriptions,
		fieldErrors,
		hasDescription,
		hasError,
		value,
		isDirty,
		isFocused,
		isDisabled,
		isReadonly,
		isPristine,
		isTouched,
		errors,
		isValid,
		isValidating: validation.isValidating,
		validate,
		reset,
		state
	};
}
//#endregion
//#region src/composables/createNumeric/index.ts
/**
* @module createNumeric
*
* @see https://0.vuetifyjs.com/composables/forms/create-numeric
*
* @remarks
* Pure numeric math primitive. No reactivity, no registry, no DOM events.
* Provides clamp, snap, step, and percentage conversion for bounded numeric values.
*
* Used by createSlider, createNumberField, and other numeric composables.
* Handles floating-point precision correction internally.
*
* @example
* ```ts
* import { createNumeric } from '@vuetify/v0'
*
* const numeric = createNumeric({ min: 0, max: 10, step: 1 })
* console.log(numeric.snap(3.7)) // 4
* console.log(numeric.fromValue(5)) // 50
* ```
*/
function decimalPlaces(n) {
	const s = String(n);
	const dot = s.indexOf(".");
	return dot === -1 ? 0 : s.length - dot - 1;
}
function createNumeric(options = {}) {
	const { min = -Infinity, max = Infinity, step = 1, leap = step * 10, wrap = false } = options;
	const extent = max - min;
	const decimals = Math.max(decimalPlaces(step), Number.isFinite(min) ? decimalPlaces(min) : 0);
	function snap(value) {
		if (!Number.isFinite(value)) return min;
		if (step <= 0 || !Number.isFinite(min)) return /* @__PURE__ */ clamp(value, min, max);
		const steps = Math.round((/* @__PURE__ */ clamp(value, min, max) - min) / step);
		const result = min + steps * step;
		return /* @__PURE__ */ clamp(decimals > 0 ? +result.toFixed(decimals) : result, min, max);
	}
	function fromValue(value) {
		if (!Number.isFinite(extent)) return 0;
		if (extent === 0) return 0;
		return (value - min) / extent * 100;
	}
	function fromPercent(percent) {
		if (!Number.isFinite(extent)) return snap(0);
		return snap(min + percent / 100 * extent);
	}
	function up(value, multiplier = 1) {
		const result = snap(value + step * multiplier);
		if (wrap && result === value && value >= max) return min;
		return result;
	}
	function down(value, multiplier = 1) {
		const result = snap(value - step * multiplier);
		if (wrap && result === value && value <= min) return max;
		return result;
	}
	function floor() {
		return min;
	}
	function ceil() {
		return max;
	}
	function canUp(value) {
		return wrap || value < max;
	}
	function canDown(value) {
		return wrap || value > min;
	}
	return {
		min,
		max,
		step,
		leap,
		wrap,
		snap,
		fromValue,
		fromPercent,
		up,
		down,
		floor,
		ceil,
		canUp,
		canDown
	};
}
//#endregion
//#region src/composables/createNumberField/index.ts
/**
* @module createNumberField
*
* @see https://0.vuetifyjs.com/composables/forms/create-number-field
*
* @remarks
* Orchestrator composable that composes createInput + createNumeric + Intl.NumberFormat.
* Manages a numeric value with formatting, parsing, stepping, and field state.
*
* @example
* ```ts
* import { createNumberField } from '@vuetify/v0'
*
* const field = createNumberField({ min: 0, max: 100, step: 5 })
* field.increment()
* console.log(field.value.value) // 5
* ```
*/
function createNumberField(options = {}) {
	const { value = ref(null), locale = "en-US", format: formatOptions, clamp: shouldClamp = true, commitOn = "change", disabled = false, readonly: _readonly = false, min, max, step, leap, wrap, id, label, name, formNamespace, required, rules, error, errorMessages } = options;
	const numeric = createNumeric({
		min,
		max,
		step,
		leap,
		wrap
	});
	const input = createInput({
		value,
		id,
		label,
		name,
		formNamespace,
		required,
		disabled,
		readonly: _readonly,
		rules,
		error,
		errorMessages,
		dirty: (v) => !/* @__PURE__ */ isNull(v),
		equals: (a, b) => Object.is(a, b)
	});
	const formatter = new Intl.NumberFormat(locale, formatOptions);
	const parts = formatter.formatToParts(12345.6);
	const literals = /* @__PURE__ */ new Set();
	for (const part of parts) if (part.type === "group" || part.type === "currency" || part.type === "literal") literals.add(part.value);
	const display = toRef(() => {
		return /* @__PURE__ */ isNull(value.value) ? "" : formatter.format(value.value);
	});
	const canIncrement = toRef(() => {
		return /* @__PURE__ */ isNull(value.value) || numeric.canUp(value.value);
	});
	const canDecrement = toRef(() => {
		return /* @__PURE__ */ isNull(value.value) || numeric.canDown(value.value);
	});
	function isLocked() {
		return toValue(disabled) || toValue(_readonly);
	}
	function initialize() {
		return /* @__PURE__ */ clamp(0, numeric.min, numeric.max);
	}
	function increment(multiplier) {
		if (isLocked()) return;
		if (/* @__PURE__ */ isNull(value.value) || !Number.isFinite(value.value)) {
			value.value = initialize();
			return;
		}
		value.value = numeric.up(value.value, multiplier);
	}
	function decrement(multiplier) {
		if (isLocked()) return;
		if (/* @__PURE__ */ isNull(value.value) || !Number.isFinite(value.value)) {
			value.value = initialize();
			return;
		}
		value.value = numeric.down(value.value, multiplier);
	}
	function floor() {
		if (isLocked()) return;
		value.value = numeric.floor();
	}
	function ceil() {
		if (isLocked()) return;
		value.value = numeric.ceil();
	}
	function formatValue(v) {
		return formatter.format(v);
	}
	function parse(text) {
		if (text.trim() === "") return null;
		let cleaned = text;
		for (const literal of literals) cleaned = cleaned.split(literal).join("");
		const decimalPart = parts.find((p) => p.type === "decimal");
		if (decimalPart && decimalPart.value !== ".") cleaned = cleaned.replace(decimalPart.value, ".");
		cleaned = cleaned.trim();
		const result = Number(cleaned);
		return Number.isNaN(result) ? null : result;
	}
	function commit(next) {
		if (isLocked()) return;
		const val = arguments.length === 0 ? value.value : next;
		if (/* @__PURE__ */ isNull(val)) return;
		if (!shouldClamp && (val < numeric.min || val > numeric.max)) {
			if (numeric.step > 0 && Number.isFinite(numeric.min)) {
				const steps = Math.round((val - numeric.min) / numeric.step);
				value.value = numeric.min + steps * numeric.step;
			}
			return;
		}
		value.value = numeric.snap(val);
	}
	function write(text) {
		if (isLocked()) return;
		value.value = parse(text);
	}
	return {
		value,
		display,
		canIncrement,
		canDecrement,
		numeric,
		input,
		increment,
		decrement,
		floor,
		ceil,
		formatValue,
		parse,
		commit,
		commitOn,
		write
	};
}
//#endregion
//#region src/composables/usePresence/index.ts
/**
* @module usePresence
*
* @see https://0.vuetifyjs.com/composables/system/use-presence
*
* @remarks
* Animation-agnostic mount lifecycle composable.
*
* Manages the full DOM presence lifecycle: lazy mount, enter, exit delay, unmount.
* Consumers control exit timing via a `done()` callback, making it compatible
* with CSS transitions, Web Animations API, GSAP, or no animation at all.
*
* Key features:
* - State machine: unmounted → mounted → present → leaving → unmounted
* - Lazy mounting: defer first mount until first activation
* - Re-entry during leave: cancels exit, stays mounted
* - Immediate mode: auto-unmounts if done() not called (fast path)
* - SSR-safe: starts unmounted
*
* @example
* ```ts
* import { shallowRef } from 'vue'
* import { usePresence } from '@vuetify/v0'
*
* const isOpen = shallowRef(false)
* const { isMounted, state, done } = usePresence({ present: isOpen })
* ```
*/
/**
* Animation-agnostic mount lifecycle management.
*
* @param options Configuration for presence behavior
* @returns Reactive state refs and a `done` callback for exit animation control
*
* @see https://0.vuetifyjs.com/composables/system/use-presence
*
* @example
* Basic usage:
* ```ts
* import { ref } from 'vue'
* import { usePresence } from '@vuetify/v0'
*
* const isOpen = ref(false)
* const { isMounted, state, done } = usePresence({ present: isOpen })
*
* // In template:
* // <div v-if="isMounted" :data-state="state" @animationend="done">
* //   Content
* // </div>
* ```
*
* @example
* Lazy mount (defer until first activation):
* ```ts
* const { isMounted } = usePresence({ present: isOpen, lazy: true })
* // isMounted stays false until isOpen is first true
* ```
*
* @example
* Manual exit control (for JS-driven animations):
* ```ts
* const { isLeaving, done } = usePresence({
*   present: isOpen,
*   immediate: false,
* })
* // Stays in 'leaving' state until done() is called
* ```
*/
function usePresence(options) {
	const { lazy = false, immediate = true } = options;
	const state = shallowRef("unmounted");
	const isMounted = toRef(() => state.value !== "unmounted");
	const isPresent = toRef(() => state.value === "present");
	const isLeaving = toRef(() => state.value === "leaving");
	let booted = !lazy;
	function done() {
		if (state.value !== "leaving") return;
		state.value = lazy ? "mounted" : "unmounted";
	}
	function enter() {
		state.value = "mounted";
		nextTick(() => {
			if (state.value === "mounted") state.value = "present";
		});
	}
	function leave() {
		if (state.value !== "present" && state.value !== "mounted") return;
		state.value = "leaving";
		if (immediate) nextTick(() => {
			if (state.value === "leaving") done();
		});
	}
	const stop = watch(() => toValue(options.present), (value) => {
		if (value) {
			if (!booted) booted = true;
			switch (state.value) {
				case "leaving":
					state.value = "present";
					break;
				case "mounted":
					state.value = "present";
					break;
				case "unmounted": enter();
			}
		} else if (booted) leave();
	}, { immediate: true });
	onScopeDispose(() => {
		stop();
		state.value = "unmounted";
	}, true);
	return {
		state: shallowReadonly(state),
		isMounted: shallowReadonly(isMounted),
		isPresent: shallowReadonly(isPresent),
		isLeaving: shallowReadonly(isLeaving),
		done
	};
}
//#endregion
//#region src/composables/createProgress/index.ts
/**
* @module createProgress
*
* @see https://0.vuetifyjs.com/composables/semantic/create-progress
*
* @remarks
* Progress composable built on createModel for segment tracking.
*
* Each segment is a model ticket with a ShallowRef<number> value.
* All segments stay selected (multiple: true, enroll: true) so
* selectedValues always reflects the full set of segment values.
* Compatible with useProxyModel for v-model bridging.
*
* @example
* ```ts
* import { createProgress } from '@vuetify/v0'
*
* const progress = createProgress({ min: 0, max: 100, value: 25 })
* progress.register({ value: 50 })
* console.log(progress.percent.value)
* ```
*/
/**
* Creates a progress instance with model-based segment tracking.
*
* @param options The options for the progress instance.
* @returns A progress context with segment registration.
*
* @example
* ```ts
* import { createProgress } from '@vuetify/v0'
*
* const progress = createProgress({ max: 100 })
* const segment = progress.register({ value: 50 })
* progress.percent.value // 50
* ```
*/
function createProgress(options = {}) {
	const { value: _value, min = 0, max = 100 } = options;
	const _hasInitialValue = !/* @__PURE__ */ isNullOrUndefined(_value);
	const extent = max - min;
	const model = createModel({
		multiple: true,
		events: true
	});
	let pending = null;
	const segments = computed(() => Array.from(model.selectedItems.value).toSorted((a, b) => a.index - b.index));
	const total = toRef(() => {
		const segs = segments.value;
		if (segs.length === 0 && _hasInitialValue) return /* @__PURE__ */ clamp(_value, min, max);
		let sum = 0;
		for (const seg of segs) sum += toValue(seg.value) ?? 0;
		return /* @__PURE__ */ clamp(sum, min, max);
	});
	const percent = toRef(() => {
		if (extent === 0) return 0;
		return (total.value - min) / extent * 100;
	});
	const isIndeterminate = toRef(() => {
		const segs = segments.value;
		if (segs.length === 0) return !_hasInitialValue;
		for (const seg of segs) if ((toValue(seg.value) ?? 0) > 0) return false;
		return true;
	});
	function fromValue(value) {
		if (extent === 0) return 0;
		return (/* @__PURE__ */ clamp(value, min, max) - min) / extent * 100;
	}
	function register(registration = {}) {
		const index = segments.value.length;
		const pendingValue = pending?.[index];
		const val = /* @__PURE__ */ isUndefined(pendingValue) ? 0 : pendingValue;
		const ticket = model.register({
			...registration,
			value: registration.value ?? shallowRef(val)
		});
		if (!model.selectedIds.has(ticket.id)) model.selectedIds.add(ticket.id);
		if (pending && segments.value.length >= pending.length) pending = null;
		return ticket;
	}
	function onboard(registrations) {
		return model.batch(() => registrations.map((registration) => register(registration)));
	}
	function apply(incoming, _options) {
		const clamped = incoming.map((v) => /* @__PURE__ */ clamp(Number(v), min, max));
		if (segments.value.length === 0) {
			pending = clamped;
			return;
		}
		for (const [index, ticket] of segments.value.entries()) {
			if (!isRef(ticket.value) || isReadonly(ticket.value)) continue;
			ticket.value.value = clamped[index] ?? min;
		}
	}
	return {
		...model,
		segments,
		total,
		percent,
		isIndeterminate,
		fromValue,
		register,
		onboard,
		apply,
		min,
		max,
		get size() {
			return model.size;
		}
	};
}
/**
* Creates a progress context for dependency injection.
*
* @param options The options including namespace.
* @returns A trinity: [useProgress, provideProgress, defaultContext]
*/
function createProgressContext(_options = {}) {
	const { namespace = "v0:progress", ...options } = _options;
	const context = createProgress(options);
	return createTrinity(namespace, context);
}
/**
* Returns the current progress instance from context.
*
* @param namespace The namespace. @default 'v0:progress'
* @returns The progress context.
*/
function useProgress(namespace = "v0:progress") {
	return useContext(namespace);
}
//#endregion
//#region src/composables/createRating/index.ts
/**
* @module createRating
*
* @see https://0.vuetifyjs.com/composables/forms/create-rating
*
* @remarks
* Lightweight rating composable for bounded discrete values.
*
* Key features:
* - No registry overhead — just a bounded number
* - Direct ref support for v-model compatibility
* - Navigation methods: next, prev, first, last, select
* - Computed items with full/half/empty state
* - Half-step support for 0.5 increments
* - Trinity pattern for dependency injection
*
* Unlike registry-based composables, rating tracks a single number
* within a range with computed item states, making it efficient
* for any star/icon rating use case.
*
* @example
* ```ts
* import { createRating } from '@vuetify/v0'
*
* const rating = createRating({ size: 5, value: 3 })
* rating.select(4)
* console.log(rating.value.value) // 4
* ```
*/
const MAX_SIZE = 1e3;
/**
* Creates a rating instance.
*
* @param options The options for the rating instance.
* @returns A rating context with navigation methods.
*
* @example
* ```ts
* import { createRating } from '@vuetify/v0'
*
* // Basic usage
* const rating = createRating()
* rating.select(3)
* rating.items.value // [{ value: 1, state: 'full' }, ...]
*
* // With v-model (pass a ref)
* const value = shallowRef(0)
* const rating = createRating({ value })
* ```
*/
function createRating(_options = {}) {
	const { value: _value = 0, size: _size = 5, half: _half = false } = _options;
	const _raw = isRef(_value) ? _value : shallowRef(_value);
	const value = computed({
		get: () => /* @__PURE__ */ clamp(_raw.value, 0, toValue(_size)),
		set: (v) => {
			_raw.value = /* @__PURE__ */ clamp(v, 0, toValue(_size));
		}
	});
	const step = toRef(() => toValue(_half) ? .5 : 1);
	const isFirst = toRef(() => value.value <= 0);
	const isLast = toRef(() => value.value >= toValue(_size));
	function select(v) {
		value.value = v;
	}
	function next() {
		if (value.value < toValue(_size)) value.value = /* @__PURE__ */ clamp(value.value + step.value, 0, toValue(_size));
	}
	function prev() {
		if (value.value > 0) value.value = /* @__PURE__ */ clamp(value.value - step.value, 0, toValue(_size));
	}
	function first() {
		value.value = 0;
	}
	function last() {
		value.value = toValue(_size);
	}
	function getState(item, current) {
		if (item <= Math.floor(current)) return "full";
		if (item === Math.ceil(current) && current !== Math.floor(current)) return "half";
		return "empty";
	}
	return {
		value,
		items: computed(() => {
			const current = value.value;
			const count = /* @__PURE__ */ clamp(Math.floor(toValue(_size)), 0, MAX_SIZE);
			return (/* @__PURE__ */ range(count, 1)).map((i) => ({
				value: i,
				state: getState(i, current)
			}));
		}),
		isFirst,
		isLast,
		select,
		next,
		prev,
		first,
		last,
		get size() {
			return toValue(_size);
		},
		get half() {
			return toValue(_half);
		}
	};
}
/**
* Creates a rating context for dependency injection.
*
* @param options The options including namespace.
* @returns A trinity: [useRating, provideRating, defaultContext]
*
* @example
* ```ts
* const [useRating, provideRatingContext] = createRatingContext({ size: 5 })
*
* // Parent component
* provideRatingContext()
*
* // Child component
* const rating = useRating()
* rating.select(4)
* ```
*/
function createRatingContext(_options = {}) {
	const { namespace = "v0:rating", ...options } = _options;
	const context = createRating(options);
	return createTrinity(namespace, context);
}
/**
* Returns the current rating instance from context.
*
* @param namespace The namespace. @default 'v0:rating'
* @returns The rating context.
*
* @example
* ```vue
* <script setup lang="ts">
*   import { useRating } from '@vuetify/v0'
*
*   const rating = useRating()
* <\/script>
*
* <template>
*   <button @click="rating.prev()" :disabled="rating.isFirst.value">-</button>
*   <span>{{ rating.value.value }} / {{ rating.size }}</span>
*   <button @click="rating.next()" :disabled="rating.isLast.value">+</button>
* </template>
* ```
*/
function useRating(namespace = "v0:rating") {
	return useContext(namespace);
}
//#endregion
//#region src/composables/createSlider/index.ts
/**
* @module createSlider
*
* @see https://0.vuetifyjs.com/composables/forms/create-slider
*
* @remarks
* Composable for managing slider state: value math, step snapping,
* percentage conversion, and multi-thumb value operations.
*
* Extends createModel for useProxyModel compatibility:
* - createRegistry → createModel → createSlider (ticket-per-thumb)
*
* Each thumb is a model ticket with a `shallowRef<number>` value.
* Values are derived from ordered tickets, not a standalone ref.
*
* Designed for single-thumb, range, and multi-thumb sliders.
* Also reusable for color picker tracks, media scrubbers,
* gradient editors, and other 1D value-on-track controls.
*
* @example
* ```ts
* import { createSlider } from '@vuetify/v0'
*
* const slider = createSlider({ min: 0, max: 100, step: 5 })
* slider.register({ value: 25 })
* slider.set(0, 60)
* ```
*/
/**
* Creates slider state with value math, step snapping, and multi-thumb support.
*
* Extends createModel for useProxyModel compatibility. Each thumb is a model
* ticket with a shallowRef<number> value. Values are derived from the ordered
* tickets, enabling proper registration/unregistration lifecycle.
*
* @param options Slider configuration.
* @returns Slider context with values, math functions, and thumb operations.
*
* @see https://0.vuetifyjs.com/composables/forms/create-slider
* @see {@link createModel} for the base model composable.
*
* @example Single thumb
* ```ts
* import { createSlider } from '@vuetify/v0'
*
* const slider = createSlider({ min: 0, max: 100, step: 5 })
* const ticket = slider.register({ value: 50 })
* slider.up(0)           // values: [55]
* slider.fromValue(50)   // 50
* ```
*
* @example Range slider
* ```ts
* import { createSlider } from '@vuetify/v0'
*
* const slider = createSlider({ min: 0, max: 100, step: 1, range: true })
* slider.register({ value: 25 })
* slider.register({ value: 75 })
* slider.set(0, 30)      // values: [30, 75]
* slider.set(1, 60)      // values: [30, 60]
* ```
*
* @example Custom pointer interaction (media scrubber)
* ```ts
* import { createSlider } from '@vuetify/v0'
*
* const slider = createSlider({ min: 0, max: 217, step: 0.1 })
* slider.register({ value: 0 })
*
* // pointer → fromPercent → set → fromValue → UI
* const percent = (clientX - rect.left) / rect.width * 100
* slider.set(0, slider.fromPercent(percent))
* const position = slider.fromValue(slider.values.value[0])
* ```
*/
function createSlider(options = {}) {
	const { min = 0, max = 100, step = 1, disabled: _disabled = false, readonly: _readonly = false, orientation: _orientation = "horizontal", inverted: _inverted = false, minStepsBetweenThumbs = 0, crossover = false, range = false } = options;
	const model = createModel({
		disabled: _disabled,
		multiple: true,
		events: true
	});
	const numeric = createNumeric({
		min,
		max,
		step
	});
	const disabled = toRef(() => toValue(_disabled));
	const readonly = toRef(() => toValue(_readonly));
	const orientation = toRef(() => toValue(_orientation));
	const inverted = toRef(() => toValue(_inverted));
	let pending = null;
	const thumbs = computed(() => Array.from(model.selectedItems.value).toSorted((a, b) => a.index - b.index));
	const values = computed(() => thumbs.value.map((t) => toValue(t.value)));
	const selectedValues = computed(() => values.value);
	function snap(value) {
		return numeric.snap(value);
	}
	function fromValue(value) {
		const p = numeric.fromValue(value);
		return inverted.value ? 100 - p : p;
	}
	function fromPercent(percent) {
		const value = numeric.fromPercent(percent);
		return inverted.value ? numeric.max - (value - numeric.min) : value;
	}
	function register(input) {
		const initialValue = /* @__PURE__ */ isObject(input) ? input.value : input;
		const thumbIndex = thumbs.value.length;
		const pendingValue = pending?.[thumbIndex];
		const val = /* @__PURE__ */ isUndefined(pendingValue) ? snap(initialValue ?? min) : snap(pendingValue);
		const ticket = model.register({ value: shallowRef(val) });
		if (!model.selectedIds.has(ticket.id)) model.selectedIds.add(ticket.id);
		if (pending && thumbs.value.length >= pending.length) pending = null;
		return ticket;
	}
	function apply(incoming, _options) {
		const snapped = incoming.map((v) => snap(Number(v)));
		if (thumbs.value.length === 0) {
			pending = snapped;
			return;
		}
		const gap = minStepsBetweenThumbs * step;
		let written;
		for (const [index, element] of snapped.entries()) {
			const ticket = thumbs.value[index];
			if (!ticket || !isRef(ticket.value)) continue;
			let constrained = element;
			if (!crossover && !/* @__PURE__ */ isUndefined(written)) constrained = Math.max(constrained, written + gap);
			constrained = /* @__PURE__ */ clamp(constrained, min, max);
			ticket.value.value = constrained;
			written = constrained;
		}
	}
	function set(index, value) {
		if (disabled.value || readonly.value) return;
		const snapped = snap(value);
		const current = values.value;
		let constrained = snapped;
		if (!crossover) {
			const gap = minStepsBetweenThumbs * step;
			const prev = current[index - 1];
			const following = current[index + 1];
			if (index > 0 && !/* @__PURE__ */ isUndefined(prev)) constrained = Math.max(constrained, prev + gap);
			if (index < current.length - 1 && !/* @__PURE__ */ isUndefined(following)) constrained = Math.min(constrained, following - gap);
		}
		constrained = /* @__PURE__ */ clamp(constrained, min, max);
		const ticket = thumbs.value[index];
		if (ticket && isRef(ticket.value)) ticket.value.value = constrained;
	}
	function up(index, multiplier = 1) {
		set(index, (values.value[index] ?? min) + step * multiplier);
	}
	function down(index, multiplier = 1) {
		set(index, (values.value[index] ?? min) - step * multiplier);
	}
	function floor(index) {
		set(index, min);
	}
	function ceil(index) {
		set(index, max);
	}
	function onboard(registrations) {
		return model.batch(() => registrations.map((r) => register(r)));
	}
	return {
		...model,
		values,
		selectedValues,
		apply,
		range,
		min,
		max,
		step,
		minStepsBetweenThumbs,
		crossover,
		disabled,
		readonly,
		orientation,
		inverted,
		register,
		onboard,
		snap,
		fromValue,
		fromPercent,
		set,
		up,
		down,
		floor,
		ceil,
		get size() {
			return model.size;
		}
	};
}
//#endregion
//#region src/composables/useTooltip/index.ts
/**
* @module useTooltip
*
* @see https://0.vuetifyjs.com/composables/plugins/use-tooltip
*
* @remarks
* Region-scoped tooltip coordination plugin. Holds shared delay defaults and
* a small registry of currently-open tooltips so individual tooltip instances
* can skip their open delay when another tooltip is already visible (the
* "warmup" pattern from React Aria / Radix).
*
* Use the plugin form (`app.use(createTooltipPlugin())`) for app-wide
* defaults.
*
* @example
* ```ts
* import { createTooltipPlugin } from '@vuetify/v0'
*
* app.use(createTooltipPlugin({ openDelay: 500 }))
* ```
*/
function createTooltip(options = {}) {
	const openDelay = toRef(() => toValue(options.openDelay) ?? 700);
	const closeDelay = toRef(() => toValue(options.closeDelay) ?? 150);
	const skipDelay = toRef(() => toValue(options.skipDelay) ?? 300);
	const disabled = toRef(() => toValue(options.disabled) ?? false);
	const registry = createRegistry({
		reactive: true,
		events: true
	});
	let lastClosedAt = null;
	registry.on("unregister:ticket", () => {
		lastClosedAt = Date.now();
	});
	const isAnyOpen = toRef(() => registry.size > 0);
	function shouldSkipOpenDelay() {
		if (isAnyOpen.value) return true;
		if (/* @__PURE__ */ isNull(lastClosedAt)) return false;
		return Date.now() - lastClosedAt < skipDelay.value;
	}
	onScopeDispose(() => registry.dispose(), true);
	return {
		openDelay,
		closeDelay,
		skipDelay,
		disabled,
		isAnyOpen,
		shouldSkipOpenDelay,
		register: registry.register,
		unregister: registry.unregister,
		adapter: options.adapter
	};
}
/**
* Synthesized fallback used when `useTooltip()` is called without
* `app.use(createTooltipPlugin())`. Returns a fresh context with the
* documented defaults — `<Tooltip.Root>` keeps working but warmup
* coordination is per-instance instead of region-wide.
*
* @example
* ```ts
* import { createTooltipFallback } from '@vuetify/v0'
*
* const tooltip = createTooltipFallback()
* console.log(tooltip.openDelay.value) // 700
* ```
*/
function createTooltipFallback() {
	return createTooltip();
}
const [createTooltipContext, createTooltipPlugin, useTooltip] = createPluginContext("v0:tooltip", createTooltip, { fallback: () => createTooltipFallback() });
//#endregion
//#region src/composables/createNested/index.ts
/**
* @module createNested
*
* @see https://0.vuetifyjs.com/composables/selection/create-nested
*
* @remarks
* Hierarchical tree management composable extending createGroup with:
* - Parent-child relationship tracking (children/parents Maps)
* - Open/close state management
* - Tree traversal utilities (getPath, getDescendants, etc.)
* - Cascade selection propagation through nested registers
* - `rootIds` tracking for top-level item detection
*
* Inheritance chain: createSelection → createGroup → createNested
*
* @example
* ```ts
* import { createNested } from '@vuetify/v0'
*
* const tree = createNested()
* const root = tree.register({ value: 'root' })
* tree.register({ value: 'child', parentId: root.id })
* tree.open(root.id)
* ```
*/
/**
* Creates a new nested tree instance with hierarchical management.
*
* Extends `createGroup` to support parent-child relationships, tree traversal,
* and open/close state management. Perfect for tree views, nested navigation,
* and hierarchical data structures.
*
* @param options The options for the nested instance.
* @returns A new nested instance with tree management capabilities.
*
* @remarks
* **Key Differences from `createGroup`:**
* - `register()` accepts `parentId` for establishing parent-child relationships
* - `unregister()` accepts optional `cascade` parameter for cascading deletions
* - Adds tree traversal methods: `getPath()`, `getAncestors()`, `getDescendants()`
* - Adds computed properties: `roots`, `leaves`, `isLeaf()`, `getDepth()`
* - Adds open state management: `open()`, `close()`, `flip()`, `opened()`
*
* @see https://0.vuetifyjs.com/composables/selection/create-nested
*
* @example
* ```ts
* import { createNested } from '@vuetify/v0'
*
* const tree = createNested()
*
* const root = tree.register({ id: 'root', value: 'Root' })
* const child1 = tree.register({ id: 'child-1', value: 'Child 1', parentId: 'root' })
* const child2 = tree.register({ id: 'child-2', value: 'Child 2', parentId: 'root' })
*
* console.log(tree.getPath('child-1')) // ['root', 'child-1']
* console.log(tree.getDescendants('root')) // ['child-1', 'child-2']
* console.log(tree.isLeaf('child-2')) // true
*
* tree.open('root')
* console.log(tree.opened('root')) // true
* ```
*/
function createNested(_options = {}) {
	const { open: openMode = "multiple", openAll = false, reveal: revealOnOpen = false, selection: selectionMode = "cascade", active: activeMode = "single", ...options } = _options;
	const mandatoryOption = _options.mandatory ?? false;
	const multipleOption = _options.multiple ?? true;
	const group = createGroup(options);
	const logger = useLogger();
	const children = shallowReactive(/* @__PURE__ */ new Map());
	const parents = shallowReactive(/* @__PURE__ */ new Map());
	const openedIds = shallowReactive(/* @__PURE__ */ new Set());
	const activeIds = shallowReactive(/* @__PURE__ */ new Set());
	const rootIds = shallowReactive(/* @__PURE__ */ new Set());
	let batching = false;
	let pendingChildren;
	let pendingParents;
	let pendingRoots;
	const activeItems = computed(() => new Set(/* @__PURE__ */ resolveIds(activeIds, group.get)));
	const activeIndexes = computed(() => new Set(/* @__PURE__ */ resolveIndexes(activeItems.value)));
	const openedItems = computed(() => new Set(/* @__PURE__ */ resolveIds(openedIds, group.get)));
	const roots = computed(() => /* @__PURE__ */ resolveIds(rootIds, group.get));
	const leaves = computed(() => {
		return group.values().filter((item) => {
			const childList = children.get(item.id);
			return /* @__PURE__ */ isUndefined(childList) || childList.length === 0;
		});
	});
	function opened(id) {
		return openedIds.has(id);
	}
	function open(ids) {
		if (toValue(group.disabled)) return;
		for (const id of /* @__PURE__ */ toArray(ids)) {
			const item = group.get(id);
			if (!item || toValue(item.disabled)) continue;
			openedIds.add(id);
			if (openMode === "single") {
				for (const openedId of openedIds) if (openedId !== id) openedIds.delete(openedId);
			}
			if (revealOnOpen) {
				let parentId = parents.get(id);
				const visited = /* @__PURE__ */ new Set([id]);
				while (!/* @__PURE__ */ isUndefined(parentId)) {
					if (visited.has(parentId)) {
						logger.warn(`Circular parent reference detected at "${parentId}".`);
						break;
					}
					visited.add(parentId);
					openedIds.add(parentId);
					parentId = parents.get(parentId);
				}
			}
		}
	}
	function close(ids) {
		if (toValue(group.disabled)) return;
		for (const id of /* @__PURE__ */ toArray(ids)) {
			const item = group.get(id);
			if (!item || toValue(item.disabled)) continue;
			openedIds.delete(id);
		}
	}
	function flip(ids) {
		if (toValue(group.disabled)) return;
		for (const id of /* @__PURE__ */ toArray(ids)) {
			const item = group.get(id);
			if (!item || toValue(item.disabled)) continue;
			if (opened(id)) close(id);
			else open(id);
		}
	}
	/**
	* Open node(s) and their immediate non-leaf children.
	* Useful for expanding a section with its immediate subcategories.
	*/
	function unfold(ids) {
		for (const id of /* @__PURE__ */ toArray(ids)) {
			if (!group.has(id)) continue;
			open(id);
			const childIds = children.get(id) ?? [];
			for (const childId of childIds) if (!isLeaf(childId)) open(childId);
		}
	}
	/**
	* Reveal a node by opening all its ancestors.
	* Makes the node visible in a collapsed tree without opening the node itself.
	*/
	function reveal(ids) {
		for (const id of /* @__PURE__ */ toArray(ids)) {
			if (!group.has(id)) continue;
			const ancestorIds = getAncestors(id);
			if (ancestorIds.length > 0) open(ancestorIds);
		}
	}
	/**
	* Fully expand a node and all its non-leaf descendants.
	* Opens the entire subtree rooted at the given node.
	*/
	function expand(ids) {
		for (const id of /* @__PURE__ */ toArray(ids)) {
			if (!group.has(id)) continue;
			if (!isLeaf(id)) open(id);
			for (const descendantId of getDescendants(id)) if (!isLeaf(descendantId)) open(descendantId);
		}
	}
	function expandAll() {
		if (toValue(group.disabled)) return;
		for (const [id, childList] of children) if (childList.length > 0) {
			const item = group.get(id);
			if (item && toValue(item.disabled)) continue;
			openedIds.add(id);
		}
	}
	function collapseAll() {
		if (toValue(group.disabled)) return;
		const toClose = [...openedIds].filter((id) => {
			const item = group.get(id);
			return !item || !toValue(item.disabled);
		});
		for (const id of toClose) openedIds.delete(id);
	}
	function activated(id) {
		return activeIds.has(id);
	}
	function activate(ids) {
		for (const id of /* @__PURE__ */ toArray(ids)) {
			if (!group.has(id)) continue;
			if (activeMode === "single") {
				for (const activeId of activeIds) if (activeId !== id) activeIds.delete(activeId);
			}
			activeIds.add(id);
		}
	}
	function deactivate(ids) {
		for (const id of /* @__PURE__ */ toArray(ids)) activeIds.delete(id);
	}
	function deactivateAll() {
		activeIds.clear();
	}
	function getPath(id) {
		const path = [];
		let currentId = id;
		const visited = /* @__PURE__ */ new Set();
		while (!/* @__PURE__ */ isUndefined(currentId)) {
			if (visited.has(currentId)) {
				logger.warn(`Circular parent reference detected at "${currentId}".`);
				break;
			}
			visited.add(currentId);
			path.unshift(currentId);
			currentId = parents.get(currentId);
		}
		return path;
	}
	function getAncestors(id) {
		return getPath(id).slice(0, -1);
	}
	function getDescendants(id) {
		const descendants = [];
		const initial = children.get(id);
		if (!initial) return descendants;
		const queue = initial.slice();
		const visited = /* @__PURE__ */ new Set([id]);
		let index = 0;
		while (index < queue.length) {
			const currentId = queue[index++];
			if (visited.has(currentId)) {
				logger.warn(`Circular child reference detected at "${currentId}".`);
				continue;
			}
			visited.add(currentId);
			descendants.push(currentId);
			const childIds = children.get(currentId);
			if (childIds) for (const cid of childIds) queue.push(cid);
		}
		return descendants;
	}
	function isLeaf(id) {
		const childList = children.get(id);
		return /* @__PURE__ */ isUndefined(childList) || childList.length === 0;
	}
	function getDepth(id) {
		return getAncestors(id).length;
	}
	/**
	* Check if `ancestorId` is an ancestor of `descendantId`.
	* Returns false if either ID doesn't exist in the tree.
	*/
	function isAncestorOf(ancestorId, descendantId) {
		if (!group.has(ancestorId) || !group.has(descendantId)) return false;
		if (ancestorId === descendantId) return false;
		let currentId = parents.get(descendantId);
		const visited = /* @__PURE__ */ new Set([descendantId]);
		while (!/* @__PURE__ */ isUndefined(currentId)) {
			if (currentId === ancestorId) return true;
			if (visited.has(currentId)) {
				logger.warn(`Circular parent reference detected at "${currentId}".`);
				return false;
			}
			visited.add(currentId);
			currentId = parents.get(currentId);
		}
		return false;
	}
	/**
	* Check if `id` has `ancestorId` as an ancestor.
	* Semantic alias for isAncestorOf(ancestorId, id).
	*/
	function hasAncestor(id, ancestorId) {
		return isAncestorOf(ancestorId, id);
	}
	/**
	* Get siblings of a node (including self).
	* For root nodes, returns all root IDs.
	*/
	function siblings(id) {
		if (!group.has(id)) return [];
		const parentId = parents.get(id);
		if (/* @__PURE__ */ isUndefined(parentId)) return Array.from(rootIds);
		return children.get(parentId) ?? [];
	}
	/**
	* Get 1-indexed position among siblings (for aria-posinset).
	* Returns 0 if node not found.
	*/
	function position(id) {
		const index = siblings(id).indexOf(id);
		return index === -1 ? 0 : index + 1;
	}
	/**
	* Returns depth-first traversal of visible (open) nodes.
	* A node is visible if all its ancestors are open.
	* Used by useRovingFocus to determine keyboard navigation order.
	*/
	function visibleItems() {
		const result = [];
		const rootItems = Array.from(rootIds);
		const visited = /* @__PURE__ */ new Set();
		function walk(ids) {
			for (const id of ids) {
				if (visited.has(id)) {
					logger.warn(`Circular child reference detected at "${id}".`);
					continue;
				}
				visited.add(id);
				const item = group.get(id);
				if (!item) continue;
				result.push(item);
				if (opened(id)) {
					const childIds = children.get(id);
					if (childIds?.length) walk(childIds);
				}
			}
		}
		walk(rootItems);
		return result;
	}
	function updateAncestors(id) {
		const { selectedIds, mixedIds } = group;
		let parentId = parents.get(id);
		const visited = /* @__PURE__ */ new Set([id]);
		while (!/* @__PURE__ */ isUndefined(parentId)) {
			if (visited.has(parentId)) {
				logger.warn(`Circular parent reference detected at "${parentId}".`);
				break;
			}
			visited.add(parentId);
			const childIds = children.get(parentId);
			if (childIds && childIds.length > 0) {
				const enabledIds = childIds.filter((cid) => {
					const child = group.get(cid);
					return !child || !toValue(child.disabled);
				});
				const allSelected = enabledIds.length > 0 && enabledIds.every((cid) => selectedIds.has(cid));
				const someSelected = !allSelected && childIds.some((cid) => selectedIds.has(cid) || mixedIds.has(cid));
				if (allSelected) {
					mixedIds.delete(parentId);
					selectedIds.add(parentId);
				} else if (someSelected) {
					selectedIds.delete(parentId);
					mixedIds.add(parentId);
				} else {
					mixedIds.delete(parentId);
					selectedIds.delete(parentId);
				}
			}
			parentId = parents.get(parentId);
		}
	}
	function getLeafDescendants(id) {
		return getDescendants(id).filter((did) => isLeaf(did));
	}
	function removeLeaves(leafIds) {
		const { selectedIds, mixedIds } = group;
		const ids = new Set(leafIds);
		if (toValue(mandatoryOption) && [...selectedIds].every((id) => ids.has(id))) return;
		for (const id of ids) {
			mixedIds.delete(id);
			selectedIds.delete(id);
		}
		for (const id of ids) updateAncestors(id);
	}
	function select(ids) {
		if (toValue(group.disabled)) return;
		for (const id of /* @__PURE__ */ toArray(ids)) if (selectionMode === "independent") group.select(id);
		else if (selectionMode === "leaf") {
			if (isLeaf(id)) group.select(id);
			else {
				const item = group.get(id);
				if (!item || toValue(item.disabled)) continue;
				for (const lid of getLeafDescendants(id)) group.select(lid);
			}
		} else {
			const item = group.get(id);
			if (!item || toValue(item.disabled)) continue;
			if (!toValue(multipleOption)) {
				group.select(id);
				return;
			}
			const { selectedIds, mixedIds } = group;
			mixedIds.delete(id);
			selectedIds.add(id);
			for (const did of getDescendants(id)) {
				const desc = group.get(did);
				if (desc && toValue(desc.disabled)) continue;
				mixedIds.delete(did);
				selectedIds.add(did);
			}
			updateAncestors(id);
		}
	}
	function unselect(ids) {
		if (toValue(group.disabled)) return;
		for (const id of /* @__PURE__ */ toArray(ids)) if (selectionMode === "independent") group.unselect(id);
		else if (selectionMode === "leaf") {
			const item = group.get(id);
			if (!item || toValue(item.disabled)) continue;
			removeLeaves(isLeaf(id) ? [id] : getLeafDescendants(id));
		} else {
			const item = group.get(id);
			if (!item || toValue(item.disabled)) continue;
			const { selectedIds, mixedIds } = group;
			if (toValue(mandatoryOption)) {
				const toRemove = /* @__PURE__ */ new Set([id, ...getDescendants(id)]);
				if ([...selectedIds].every((sid) => toRemove.has(sid))) return;
			}
			mixedIds.delete(id);
			selectedIds.delete(id);
			for (const did of getDescendants(id)) {
				mixedIds.delete(did);
				selectedIds.delete(did);
			}
			updateAncestors(id);
		}
	}
	function toggle(ids) {
		if (toValue(group.disabled)) return;
		for (const id of /* @__PURE__ */ toArray(ids)) if (selectionMode === "independent") group.toggle(id);
		else if (selectionMode === "leaf") {
			if (isLeaf(id)) group.toggle(id);
			else {
				const item = group.get(id);
				if (!item || toValue(item.disabled)) continue;
				const leafIds = getLeafDescendants(id);
				if (leafIds.every((lid) => group.selected(lid))) removeLeaves(leafIds);
				else for (const lid of leafIds) group.select(lid);
			}
		} else if (group.selected(id) || group.mixed(id)) unselect(id);
		else select(id);
	}
	function selectAll() {
		if (toValue(group.disabled)) return;
		const { selectedIds, mixedIds } = group;
		for (const item of group.values()) {
			if (toValue(item.disabled)) continue;
			selectedIds.add(item.id);
		}
		mixedIds.clear();
	}
	function unselectAll() {
		if (toValue(group.disabled)) return;
		group.selectedIds.clear();
		group.mixedIds.clear();
		if (!toValue(mandatoryOption)) return;
		const ticket = group.seek("first");
		if (ticket) {
			group.selectedIds.add(ticket.id);
			updateAncestors(ticket.id);
		}
	}
	function toggleAll() {
		if (group.isAllSelected.value) unselectAll();
		else selectAll();
	}
	/**
	* Converts the tree to a flat array with parentId references.
	* Useful for serialization or sending to APIs/AI systems.
	*/
	function toFlat() {
		return group.values().map((item) => ({
			id: item.id,
			parentId: parents.get(item.id),
			value: item.value
		}));
	}
	function register(registration = {}) {
		const id = registration.id ?? /* @__PURE__ */ useId$1();
		const parentId = registration.parentId;
		const nested = registration.children;
		if (!/* @__PURE__ */ isUndefined(parentId) && !group.has(parentId)) logger.warn(`Parent with id "${parentId}" does not exist. Registering "${id}" without parent.`);
		if (!/* @__PURE__ */ isUndefined(parentId) && group.has(parentId)) {
			if (batching) {
				pendingParents.set(id, parentId);
				const pending = pendingChildren.get(parentId);
				if (pending) pending.push(id);
				else {
					const existing = children.get(parentId);
					const list = existing ? [...existing, id] : [id];
					pendingChildren.set(parentId, list);
				}
			} else {
				parents.set(id, parentId);
				const list = children.get(parentId);
				children.set(parentId, list ? [...list, id] : [id]);
			}
			if (openAll) openedIds.add(parentId);
		} else if (batching) {
			pendingParents.set(id, void 0);
			pendingRoots.add(id);
		} else {
			parents.set(id, void 0);
			rootIds.add(id);
		}
		const { children: _, ...rest } = registration;
		const item = {
			...rest,
			id,
			el: registration.el,
			parentId: batching ? pendingParents.get(id) : parents.get(id),
			isOpen: toRef(() => opened(id)),
			isActive: toRef(() => activated(id)),
			isLeaf: toRef(() => isLeaf(id)),
			depth: toRef(() => getDepth(id)),
			open: () => open(id),
			close: () => close(id),
			flip: () => flip(id),
			reveal: () => reveal(id),
			activate: () => activate(id),
			deactivate: () => deactivate(id),
			getPath: () => getPath(id),
			getAncestors: () => getAncestors(id),
			getDescendants: () => getDescendants(id),
			isAncestorOf: (descendantId) => isAncestorOf(id, descendantId),
			hasAncestor: (ancestorId) => hasAncestor(id, ancestorId),
			siblings: () => siblings(id),
			position: () => position(id)
		};
		const ticket = group.register(item);
		ticket.select = () => select(id);
		ticket.unselect = () => unselect(id);
		ticket.toggle = () => toggle(id);
		ticket.unregister = () => unregister(id);
		if (registration.active) activate(id);
		if (nested?.length) for (const child of nested) register({
			...child,
			parentId: id
		});
		return ticket;
	}
	function unregister(id, cascade = false) {
		if (!group.has(id)) return;
		const parentId = parents.get(id);
		if (!/* @__PURE__ */ isUndefined(parentId)) {
			const siblings = children.get(parentId);
			if (siblings) {
				const filtered = siblings.filter((sid) => sid !== id);
				if (filtered.length === 0) children.delete(parentId);
				else children.set(parentId, filtered);
			}
		}
		const list = children.get(id);
		if (list?.length) {
			if (cascade) {
				const descendantIds = getDescendants(id);
				for (const did of descendantIds) {
					parents.delete(did);
					children.delete(did);
					openedIds.delete(did);
					activeIds.delete(did);
					rootIds.delete(did);
				}
				group.offboard(descendantIds);
			} else {
				for (const did of getDescendants(id)) {
					openedIds.delete(did);
					activeIds.delete(did);
				}
				for (const cid of list) {
					parents.set(cid, void 0);
					rootIds.add(cid);
				}
			}
		}
		parents.delete(id);
		children.delete(id);
		openedIds.delete(id);
		activeIds.delete(id);
		rootIds.delete(id);
		group.unregister(id);
	}
	function offboard(ids, cascade = false) {
		for (const id of ids) unregister(id, cascade);
	}
	function onboard(registrations) {
		batching = true;
		pendingChildren = /* @__PURE__ */ new Map();
		pendingParents = /* @__PURE__ */ new Map();
		pendingRoots = /* @__PURE__ */ new Set();
		try {
			const result = group.batch(() => registrations.map((registration) => register(registration)));
			for (const [id, list] of pendingChildren) children.set(id, list);
			for (const [id, pid] of pendingParents) parents.set(id, pid);
			for (const id of pendingRoots) rootIds.add(id);
			return result;
		} finally {
			batching = false;
			pendingChildren = void 0;
			pendingParents = void 0;
			pendingRoots = void 0;
		}
	}
	function clear() {
		children.clear();
		parents.clear();
		openedIds.clear();
		activeIds.clear();
		rootIds.clear();
		group.clear();
	}
	function reset() {
		children.clear();
		parents.clear();
		openedIds.clear();
		activeIds.clear();
		rootIds.clear();
		group.reset();
	}
	function dispose() {
		children.clear();
		parents.clear();
		openedIds.clear();
		activeIds.clear();
		rootIds.clear();
		group.dispose();
	}
	return {
		...group,
		children,
		parents,
		openedIds,
		openedItems,
		activeIds,
		activeItems,
		activeIndexes,
		roots,
		leaves,
		visibleItems,
		getPath,
		getAncestors,
		getDescendants,
		isLeaf,
		getDepth,
		isAncestorOf,
		hasAncestor,
		siblings,
		position,
		open,
		close,
		flip,
		opened,
		unfold,
		reveal,
		expand,
		expandAll,
		collapseAll,
		activate,
		deactivate,
		activated,
		deactivateAll,
		toFlat,
		multiple: toValue(multipleOption),
		select,
		unselect,
		toggle,
		selectAll,
		unselectAll,
		toggleAll,
		register,
		unregister,
		offboard,
		onboard,
		clear,
		reset,
		dispose,
		get size() {
			return group.size;
		}
	};
}
/**
* Creates a new nested context with provide/inject pattern.
*
* @param options The options for the nested context.
* @returns A trinity tuple [useNested, provideNested, defaultNested]
*
* @see https://0.vuetifyjs.com/composables/selection/create-nested
*
* @example
* ```ts
* import { createNestedContext } from '@vuetify/v0'
*
* export const [useTree, provideTree, tree] = createNestedContext()
*
* // In parent: provideTree()
* // In child: const tree = useTree()
* ```
*/
function createNestedContext(_options = {}) {
	const { namespace = "v0:nested", ...options } = _options;
	const context = createNested(options);
	return createTrinity(namespace, context);
}
/**
* Returns the current nested instance from context.
*
* @param namespace The namespace for the nested context. Defaults to `'v0:nested'`.
* @returns The current nested instance.
*
* @see https://0.vuetifyjs.com/composables/selection/create-nested
*/
function useNested(namespace = "v0:nested") {
	return useContext(namespace);
}
//#endregion
//#region src/composables/useRovingFocus/index.ts
/**
* @module useRovingFocus
*
* @see https://0.vuetifyjs.com/composables/system/use-roving-focus
*
* @remarks
* Roving tabindex composable for keyboard navigation within composite widgets.
*
* Key features:
* - Arrow key navigation with orientation support
* - Grid mode for 2D navigation (data tables, calendars)
* - Automatic disabled item skipping
* - Optional circular navigation
* - Home/End key support (row-scoped in grid mode)
* - Auto-attaches keydown listener when target is provided
*
* Perfect for toolbars, menus, tree items, grids, and other composite widgets.
*
* @example
* ```ts
* import { useRovingFocus } from '@vuetify/v0'
*
* const items = () => [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
* const focus = useRovingFocus(items, { orientation: 'horizontal' })
* focus.next()
* ```
*/
function useRovingFocus(items, options = {}) {
	const { orientation, circular, columns, onFocus, target } = options;
	function applyFocus(id) {
		const item = items().find((i) => i.id === id);
		if (!item?.el) return false;
		onFocus?.(id);
		nextTick(() => {
			toValue(item.el)?.focus();
		});
		return true;
	}
	const traversal = createFocusTraversal(items, (id) => applyFocus(id), {
		orientation,
		circular,
		columns
	});
	function focus(id) {
		const prev = traversal.activeId.value;
		traversal.activeId.value = id;
		if (!applyFocus(id)) traversal.activeId.value = prev;
	}
	function enabled() {
		return items().filter((item) => !toValue(item.disabled));
	}
	function isTabbable(id) {
		if (!/* @__PURE__ */ isUndefined(traversal.activeId.value)) return traversal.activeId.value === id;
		const list = enabled();
		return list.length > 0 && list[0]?.id === id;
	}
	if (target) useEventListener(target, "keydown", traversal.onKeydown);
	return {
		focusedId: traversal.activeId,
		isTabbable,
		focus,
		next: traversal.next,
		prev: traversal.prev,
		first: traversal.first,
		last: traversal.last,
		onKeydown: traversal.onKeydown
	};
}
//#endregion
export { createStack as $, createSortable as A, useStep as B, createForm as C, createDataGrid as D, useRaf as E, ClientComboboxAdapter as F, useImage as G, createBreadcrumbs as H, ComboboxAdapter as I, useOverflow as J, createOverflow as K, useVirtualFocus as L, createCombobox as M, createComboboxContext as N, createDataGridContext as O, useCombobox as P, useToggleScope as Q, createStep as R, useIntersectionObserver as S, useForm as T, createBreadcrumbsContext as U, useProxyModel as V, useBreadcrumbs as W, useResizeObserver as X, useElementSize as Y, createObserver as Z, createNumberField as _, createTooltipContext as a, createValidation as b, useTooltip as c, createRatingContext as d, createStackContext as et, useRating as f, usePresence as g, useProgress as h, useNested as i, useClickOutside as it, useLazy as j, useDataGrid as k, createSlider as l, createProgressContext as m, createNested as n, useStack as nt, createTooltipFallback as o, createProgress as p, createOverflowContext as q, createNestedContext as r, toElement as rt, createTooltipPlugin as s, useRovingFocus as t, createStackPlugin as tt, createRating as u, createNumeric as v, createFormContext as w, useElementIntersection as x, createInput as y, createStepContext as z };
