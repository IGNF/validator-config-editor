import { t as IN_BROWSER } from "./globals-Bxw-y98v.mjs";
import { isNullOrUndefined, useId as useId$1 } from "./utilities/index.mjs";
import { n as createPluginContext } from "./createPlugin-YYkwbiUd.mjs";
import { n as useEventListener } from "./useEventListener-C1aOe4Iy.mjs";
import { t as useTimer } from "./useTimer-DxQCew2E.mjs";
import { t as PopoverAdapter } from "./adapter-B5teFrQH.mjs";
import { computed, onScopeDispose, shallowReadonly, shallowRef, toRef, toValue, watch } from "vue";
//#region src/composables/useDelay/index.ts
/**
* @module useDelay
*
* @see https://0.vuetifyjs.com/composables/system/use-delay
*
* @remarks
* Schedule open and close transitions with configurable delays.
*
* Composes `useTimer` for the underlying lifecycle (start / stop / pause / resume,
* plus reactive `isActive`, `isPaused`, `remaining`) and adds direction tracking
* (`isOpening`) and promise-based resolution.
*
* Key features:
* - Reactive `openDelay` and `closeDelay` via `MaybeRefOrGetter`
* - `start(isOpening)` returns a `Promise<boolean>` that resolves once the delay elapses
* - Per-call `minDelay` floor enforces a minimum delay
* - Automatic cleanup on scope disposal (timer cleared, pending promise settled with current direction)
* - SSR-safe
*
* @example
* ```ts
* import { useDelay } from '@vuetify/v0'
*
* const delay = useDelay(isOpening => isVisible.value = isOpening, {
*   openDelay: 300,
*   closeDelay: 200,
* })
*
* delay.start(true)
* delay.start(false, { minDelay: 500 })
* ```
*/
/**
* Schedule open and close transitions with configurable delays.
*
* Composes `useTimer` for the lifecycle (`start` / `stop` / `pause` / `resume` plus
* reactive `isActive`, `isPaused`, `remaining`) and adds direction tracking
* (`isOpening`) and promise-based resolution.
*
* @param callback Optional callback invoked once a started delay elapses; receives the resolved direction.
* @param options Reactive delay settings.
* @returns Lifecycle controls and reactive state.
*
* @see https://0.vuetifyjs.com/composables/system/use-delay
*
* @example
* ```ts
* const delay = useDelay(isOpening => isVisible.value = isOpening, {
*   openDelay: 300,
*   closeDelay: 200,
* })
*
* delay.start(true)
* delay.start(false, { minDelay: 500 })
* delay.pause()
* delay.resume()
* delay.stop()
* ```
*/
function useDelay(callback, options = {}) {
	const { openDelay, closeDelay } = options;
	const isOpening = shallowRef(false);
	let minDelay = 0;
	let resolver;
	function fire() {
		const direction = isOpening.value;
		const resolve = resolver;
		resolver = void 0;
		resolve?.(direction);
		callback?.(direction);
	}
	function duration() {
		const raw = isOpening.value ? toValue(openDelay) : toValue(closeDelay);
		return Math.max(minDelay, raw ?? 0);
	}
	const timer = useTimer(fire, { duration });
	function start(direction, options = {}) {
		const previous = resolver;
		resolver = void 0;
		isOpening.value = direction;
		minDelay = options.minDelay ?? 0;
		previous?.(direction);
		const ms = duration();
		return new Promise((resolve) => {
			resolver = resolve;
			if (ms <= 0) {
				timer.stop();
				fire();
				return;
			}
			timer.start();
		});
	}
	function stop() {
		const resolve = resolver;
		resolver = void 0;
		timer.stop();
		resolve?.(isOpening.value);
	}
	onScopeDispose(() => {
		const resolve = resolver;
		resolver = void 0;
		resolve?.(isOpening.value);
	}, true);
	return {
		start,
		stop,
		pause: timer.pause,
		resume: timer.resume,
		isActive: shallowReadonly(timer.isActive),
		isPaused: shallowReadonly(timer.isPaused),
		remaining: shallowReadonly(timer.remaining),
		isOpening: shallowReadonly(isOpening)
	};
}
//#endregion
//#region src/composables/usePopover/adapters/v0.ts
/**
* Default positioning adapter. Emits CSS anchor positioning
* (`position-area` / `position-try-fallbacks`) - no JS measurement, no
* runtime dependency, works with the native popover API's own layout.
*/
var V0PopoverAdapter = class extends PopoverAdapter {
	setup(context) {
		return toRef(() => ({
			"position": "fixed",
			"margin": "unset",
			"inset-area": context.placement.value.raw,
			"position-area": context.placement.value.raw,
			"position-anchor": context.anchorName,
			"position-try-fallbacks": context.positionTry.value
		}));
	}
};
//#endregion
//#region src/composables/usePopover/adapters/placement.ts
const SIDE_KEYWORDS = {
	"top": "top",
	"bottom": "bottom",
	"left": "left",
	"right": "right",
	"block-start": "top",
	"block-end": "bottom",
	"inline-start": "left",
	"inline-end": "right"
};
/**
* Best-effort normalization of a CSS `position-area` value into an
* engine-neutral `{ side, align }` descriptor. Covers the common single- and
* two-token forms (`'bottom'`, `'top span-left'`, `'bottom span-right'`,
* logical `block-start`/`block-end`/`inline-start`/`inline-end`); anything
* else falls back to `bottom`/`center`. `raw` always carries the original
* value verbatim, so no expressiveness is lost even when the normalization
* doesn't recognize it.
*/
function toPlacement(positionArea) {
	const tokens = positionArea.trim().split(/\s+/);
	/* v8 ignore next -- defensive: split() on a string always yields at least one element */
	const first = tokens[0] ?? "bottom";
	const side = SIDE_KEYWORDS[first] ?? "bottom";
	let align = "center";
	const second = tokens[1];
	if (second === "span-left" || second === "span-start" || second === "left") align = "start";
	else if (second === "span-right" || second === "span-end" || second === "right") align = "end";
	return {
		side,
		align,
		raw: positionArea
	};
}
//#endregion
//#region src/composables/usePopover/index.ts
/**
* @module usePopover
*
* @see https://0.vuetifyjs.com/composables/system/use-popover
*
* @remarks
* Composable for native popover API behavior with CSS anchor positioning.
* Manages open/close state, anchor styles, content attributes, bidirectional
* sync between reactive state and native popover events, and configurable
* open / close delays via `useDelay`.
*
* Key features:
* - Native popover API (showPopover/hidePopover)
* - CSS anchor positioning (position-area, position-try-fallbacks) by default,
*   via a pluggable `PopoverAdapter` seam for JS positioning engines
* - Reactive open/close delays via `useDelay`
* - Toggle event sync for native state changes
* - SSR-safe (no DOM ops outside browser)
* - Optional external isOpen ref for v-model integration
*
* @example
* ```ts
* import { usePopover } from '@vuetify/v0'
*
* const popover = usePopover({ openDelay: 200, closeDelay: 100 })
* popover.open()
* popover.toggle()
* ```
*
* @example Bring your own positioning engine
* ```ts
* import { PopoverAdapter, usePopover } from '@vuetify/v0'
*
* class MyAdapter extends PopoverAdapter {
*   setup (context) {
*     // read context.anchorEl / context.contentEl / context.isOpen /
*     // context.placement, return a Ref<Record<string, string>> of styles
*   }
* }
*
* const popover = usePopover({ adapter: new MyAdapter() })
* ```
*
* @example App-wide adapter via createPopoverPlugin
* ```ts
* import { createPopoverPlugin } from '@vuetify/v0'
* import { FloatingUIPopoverAdapter } from '@vuetify/v0/popover/adapters/floating-ui'
*
* app.use(createPopoverPlugin({ adapter: new FloatingUIPopoverAdapter() }))
* ```
*/
function createPopover(options = {}) {
	return { adapter: options.adapter };
}
/**
* Synthesized fallback used when `usePopover()` is called without
* `app.use(createPopoverPlugin())`. Returns `{ adapter: undefined }` so
* resolution falls through to `V0PopoverAdapter`.
*
* @example
* ```ts
* import { createPopoverFallback } from '@vuetify/v0'
*
* const plugin = createPopoverFallback()
* plugin.adapter // undefined
* ```
*/
function createPopoverFallback() {
	return { adapter: void 0 };
}
/**
* Creates a scoped popover plugin context (the first member of the plugin trinity).
*
* @example
* ```ts
* import { createPopoverContext } from '@vuetify/v0'
* import { FloatingUIPopoverAdapter } from '@vuetify/v0/popover/adapters/floating-ui'
*
* export const [useAppPopover, provideAppPopover, appPopover] = createPopoverContext({
*   namespace: 'app:popover',
*   adapter: new FloatingUIPopoverAdapter(),
* })
* ```
*
* Plugin trinity for an app-wide popover positioning adapter.
*
* Namespace is `v0:popover`. Compound `Popover.Root` context lives at
* `v0:popover:root` so the two do not collide. The generated consumer is
* module-private; `usePopover()` consults it internally. Fallback is
* `{ adapter: undefined }`, so zero-config matches today's `V0PopoverAdapter`
* default.
*
* @example
* ```ts
* import { createPopoverPlugin } from '@vuetify/v0'
* import { FloatingUIPopoverAdapter } from '@vuetify/v0/popover/adapters/floating-ui'
*
* app.use(createPopoverPlugin({ adapter: new FloatingUIPopoverAdapter() }))
* ```
*/
const [createPopoverContext, createPopoverPlugin, usePopoverPlugin] = createPluginContext("v0:popover", createPopover, { fallback: () => createPopoverFallback() });
function bindOption(source, fallback) {
	const override = shallowRef();
	return computed({
		get: () => override.value ?? toValue(source) ?? fallback,
		set: (value) => {
			override.value = value;
		}
	});
}
function usePopover(options = {}) {
	const plugin = usePopoverPlugin();
	const { id: _id, openDelay, closeDelay } = options;
	const adapter = options.adapter ?? plugin.adapter ?? new V0PopoverAdapter();
	const id = _id ?? /* @__PURE__ */ useId$1();
	const anchor = `--${String(id).replace(/[^a-zA-Z0-9_-]/g, "")}`;
	const isOpen = options.isOpen ?? shallowRef(false);
	const positionArea = bindOption(options.positionArea, "bottom");
	const positionTry = bindOption(options.positionTry, "most-width bottom");
	const delay = useDelay((direction) => {
		isOpen.value = direction;
	}, {
		openDelay,
		closeDelay
	});
	function open() {
		delay.start(true);
	}
	function close() {
		delay.start(false);
	}
	function toggle() {
		if (isOpen.value) close();
		else open();
	}
	function cancel() {
		delay.stop();
	}
	const anchorStyles = toRef(() => ({ anchorName: anchor }));
	const contentAttrs = toRef(() => ({
		id,
		popover: ""
	}));
	const anchorEl = shallowRef();
	const contentEl = shallowRef();
	const placement = toRef(() => toPlacement(positionArea.value));
	const contentStyles = adapter.setup({
		anchorName: anchor,
		anchorEl,
		contentEl,
		isOpen,
		placement,
		positionTry
	});
	onScopeDispose(() => adapter.dispose?.(), true);
	let stopAnchor;
	let stopContent;
	function attachAnchor(el) {
		stopAnchor?.();
		const handle = watch(() => toValue(el), (value) => {
			anchorEl.value = value;
		}, { immediate: true });
		function stop() {
			handle();
			if (stopAnchor !== stop) return;
			stopAnchor = void 0;
			anchorEl.value = null;
		}
		stopAnchor = stop;
		onScopeDispose(stop, true);
	}
	function attach(el) {
		stopContent?.();
		const handle = watch(() => toValue(el), (value) => {
			contentEl.value = value;
		}, { immediate: true });
		const events = attachContentEvents(el);
		function stop() {
			handle();
			events();
			if (stopContent !== stop) return;
			stopContent = void 0;
			contentEl.value = null;
		}
		stopContent = stop;
		onScopeDispose(stop, true);
	}
	function attachContentEvents(el) {
		let current;
		function hide(element) {
			if (!IN_BROWSER || /* @__PURE__ */ isNullOrUndefined(element)) return;
			try {
				if (element.matches?.(":popover-open") === false) return;
				element.hidePopover?.();
			} catch {}
		}
		function sync() {
			if (!IN_BROWSER) return;
			const element = toValue(el);
			if (!/* @__PURE__ */ isNullOrUndefined(current) && current !== element) hide(current);
			current = /* @__PURE__ */ isNullOrUndefined(element) ? void 0 : element;
			if (/* @__PURE__ */ isNullOrUndefined(element)) return;
			if (!isOpen.value) {
				hide(element);
				return;
			}
			if (!element.isConnected) return;
			if (element.matches?.(":popover-open")) return;
			element.showPopover?.();
		}
		const handle = watch([isOpen, () => toValue(el)], sync, {
			immediate: true,
			flush: "post"
		});
		const listener = useEventListener(el, "toggle", (e) => {
			if (!toValue(el)?.isConnected) return;
			isOpen.value = e.newState === "open";
		});
		function stop() {
			handle();
			listener();
			hide(toValue(el) ?? current);
		}
		return stop;
	}
	return {
		isOpen,
		id,
		open,
		close,
		toggle,
		cancel,
		anchorStyles,
		contentAttrs,
		contentStyles,
		positionArea,
		positionTry,
		attach,
		attachAnchor
	};
}
//#endregion
export { toPlacement as a, usePopover as i, createPopoverFallback as n, V0PopoverAdapter as o, createPopoverPlugin as r, useDelay as s, createPopoverContext as t };
