import { r as SUPPORTS_MATCH_MEDIA, t as IN_BROWSER } from "./globals-Bxw-y98v.mjs";
import { foreground, isNumber, isString } from "./utilities/index.mjs";
import { n as createPluginContext } from "./createPlugin-YYkwbiUd.mjs";
import { i as useLogger } from "./useLogger-BIAZ6Iyu.mjs";
import { t as createSingle } from "./createSingle-BcLDttSx.mjs";
import { r as flatten, t as createTokens } from "./createTokens-D-xtNt9m.mjs";
import { t as V0StyleSheetThemeAdapter } from "./v0-CKU1z3Az.mjs";
import { computed, nextTick, onScopeDispose, shallowReadonly, shallowRef, toRef, toValue, watch } from "vue";
//#region src/composables/useHydration/index.ts
/**
* @module useHydration
*
* @see https://0.vuetifyjs.com/composables/plugins/use-hydration
*
* @remarks
* SSR hydration state management composable.
*
* Key features:
* - Hydration state detection (browser vs SSR)
* - Root component detection
* - Readonly hydration state refs
* - Plugin installation support
* - Perfect for hydration-safe rendering
*
* Essential for composables that need to behave differently during SSR vs client-side.
*
* @example
* ```ts
* import { useHydration } from '@vuetify/v0'
*
* const { isHydrated } = useHydration()
* if (isHydrated.value) {
*   // safe for client-only logic
* }
* ```
*/
/**
* Creates a new hydration instance.
*
* @returns A new hydration instance.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-hydration
*
* @example
* ```ts
* import { createHydration } from '@vuetify/v0'
*
* const hydration = createHydration()
* console.log(hydration.isHydrated.value) // false
* hydration.hydrate()
* console.log(hydration.isHydrated.value) // true
* ```
*/
function createHydration() {
	const isHydrated = shallowRef(false);
	const isSettled = shallowRef(false);
	function hydrate() {
		isHydrated.value = true;
	}
	function settle() {
		isSettled.value = true;
	}
	return {
		isHydrated: shallowReadonly(isHydrated),
		isSettled: shallowReadonly(isSettled),
		hydrate,
		settle
	};
}
function createFallbackHydration() {
	return {
		isHydrated: shallowReadonly(shallowRef(true)),
		isSettled: shallowReadonly(shallowRef(true)),
		hydrate: () => {},
		settle: () => {}
	};
}
/**
* Creates a new hydration context trinity.
*
* @param options Options for creating the hydration context.
* @template E The type of the hydration context.
* @returns A new hydration context trinity.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-hydration
*
* @example
* ```ts
* import { createHydrationContext } from '@vuetify/v0'
*
* export const [useHydrationContext, provideHydrationContext, context] = createHydrationContext({
*   namespace: 'app:hydration',
* })
* ```
*/
const [createHydrationContext, createHydrationPlugin, useHydration] = createPluginContext("v0:hydration", () => createHydration(), {
	fallback: () => createFallbackHydration(),
	setup: (context, app) => {
		const { mount } = app;
		app.mount = (...args) => {
			const vm = mount(...args);
			nextTick().then(() => {
				context.hydrate();
				nextTick().then(() => context.settle());
			});
			app.mount = mount;
			return vm;
		};
	}
});
//#endregion
//#region src/composables/useMediaQuery/index.ts
/**
* @module useMediaQuery
*
* @see https://0.vuetifyjs.com/composables/system/use-media-query
*
* @remarks
* Reactive media query composable with automatic cleanup.
*
* Key features:
* - Synchronous matchMedia read on client mount (prevents FOUC)
* - Window matchMedia integration
* - Reactive query string support
* - SSR-safe (returns false on server)
* - Hydration-aware (defers client updates until hydrated)
* - Automatic listener cleanup on scope disposal
* - Supports both static and dynamic queries
*
* Perfect for responsive conditionals beyond breakpoint detection.
*
* @example
* ```ts
* import { useMediaQuery } from '@vuetify/v0'
*
* const { matches } = useMediaQuery('(prefers-color-scheme: dark)')
* console.log(matches.value) // true/false
* ```
*/
/**
* Reactive media query matching.
*
* @param query CSS media query string (reactive).
* @returns The media query context.
*
* @see https://0.vuetifyjs.com/composables/system/use-media-query
*
* @example
* ```ts
* // Static query
* const { matches } = useMediaQuery('(prefers-color-scheme: dark)')
*
* // Dynamic query
* const minWidth = ref(768)
* const { matches } = useMediaQuery(() => `(min-width: ${minWidth.value}px)`)
*
* // Manual cleanup
* const { matches, stop } = useMediaQuery('(hover: hover)')
* stop() // Remove listener early
* ```
*/
function useMediaQuery(query) {
	const resolvedQuery = toRef(() => toValue(query));
	const initialQuery = toValue(query);
	const initialMql = IN_BROWSER && SUPPORTS_MATCH_MEDIA ? window.matchMedia(initialQuery) : null;
	const matches = shallowRef(initialMql?.matches ?? false);
	const mediaQueryList = shallowRef(initialMql);
	const hydration = useHydration();
	let cleanup = null;
	function listen() {
		if (!IN_BROWSER || !SUPPORTS_MATCH_MEDIA) return;
		cleanup?.();
		cleanup = null;
		const mql = window.matchMedia(resolvedQuery.value);
		mediaQueryList.value = mql;
		matches.value = mql.matches;
		function handler(e) {
			matches.value = e.matches;
		}
		mql.addEventListener("change", handler);
		cleanup = () => mql.removeEventListener("change", handler);
	}
	const stopWatch = watch([resolvedQuery, () => hydration.isHydrated.value], ([_, hydrated]) => {
		if (hydrated) listen();
	}, { immediate: true });
	function stop() {
		stopWatch();
		cleanup?.();
		cleanup = null;
	}
	onScopeDispose(stop, true);
	return {
		matches: shallowReadonly(matches),
		query: resolvedQuery,
		mediaQueryList: shallowReadonly(mediaQueryList),
		stop
	};
}
/**
* Check if the user prefers dark color scheme.
*
* @returns The media query context.
*
* @example
* ```ts
* const { matches: prefersDark } = usePrefersDark()
* ```
*/
function usePrefersDark() {
	return useMediaQuery("(prefers-color-scheme: dark)");
}
/**
* Check if the user prefers reduced motion.
*
* @returns The media query context.
*
* @example
* ```ts
* const { matches: prefersReducedMotion } = usePrefersReducedMotion()
* ```
*/
function usePrefersReducedMotion() {
	return useMediaQuery("(prefers-reduced-motion: reduce)");
}
/**
* Check if the user prefers more contrast.
*
* @returns The media query context.
*
* @example
* ```ts
* const { matches: prefersContrast } = usePrefersContrast()
* ```
*/
function usePrefersContrast() {
	return useMediaQuery("(prefers-contrast: more)");
}
//#endregion
//#region src/composables/useTheme/index.ts
/**
* @module useTheme
*
* @see https://0.vuetifyjs.com/composables/plugins/use-theme
*
* @remarks
* Theme management composable with token resolution and CSS variable injection.
*
* Key features:
* - Single-selection theme switching (extends createSingle)
* - Token alias resolution via createTokens
* - Lazy theme loading (compute colors only when selected)
* - CSS variable generation via adapter pattern
* - `isDark` reactive flag on the theme context
* - Optional `system` pair that follows `prefers-color-scheme` until an explicit `select`
* - SSR support with head integration
* - Theme cycling
*
* Integrates with createSingle for selection and createTokens for color resolution.
*
* @example
* ```ts
* import { useTheme } from '@vuetify/v0'
*
* const theme = useTheme()
* theme.select('dark')
* console.log(theme.isDark.value) // true
* ```
*/
/**
* Creates a new theme instance.
*
* @param options The options for the theme instance.
* @returns A new theme instance.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-theme
*
* @example
* ```ts
* import { createTheme } from '@vuetify/v0'
*
* const theme = createTheme({
*   default: 'light',
*   themes: {
*     light: {
*       dark: false,
*       colors: {
*         primary: '#3b82f6',
*       },
*     },
*     dark: {
*       dark: true,
*       colors: {
*         primary: '#675496',
*       },
*     },
*   },
* })
* ```
*/
function createTheme(_options = {}) {
	const { themes = {}, palette = {}, foreground: genForeground, system, ...options } = _options;
	const tokens = createTokens({
		palette,
		...themes
	}, { flat: true });
	const registry = createSingle({
		...options,
		reactive: true
	});
	const logger = useLogger();
	for (const id in themes) {
		const { colors: value, ...theme } = themes[id];
		register({
			id,
			value,
			...theme
		});
	}
	const pair = resolveSystemPair(system, registry, logger);
	const following = shallowRef(Boolean(pair));
	if (!pair && options.default && !registry.selectedId.value) registry.select(options.default);
	const names = toRef(() => registry.keys());
	const colors = computed(() => {
		const resolved = {};
		const currentId = registry.selectedId.value;
		for (const theme of registry.values()) {
			if (theme.lazy && theme.id !== currentId) continue;
			const themeColors = resolve(theme.value);
			if (genForeground) for (const [key, value] of Object.entries(themeColors)) {
				const onKey = `on-${key}`;
				if (!key.startsWith("on-") && !(onKey in themeColors)) themeColors[onKey] = /* @__PURE__ */ foreground(value);
			}
			resolved[theme.id] = themeColors;
		}
		return resolved;
	});
	const isDark = toRef(() => registry.selectedItem.value?.dark ?? false);
	const isSystem = toRef(() => following.value);
	const media = pair ? usePrefersDark() : void 0;
	function follow() {
		if (!pair || !media) return;
		const id = media.matches.value ? pair.dark : pair.light;
		if (registry.has(id)) registry.select(id);
	}
	if (pair) {
		if (IN_BROWSER) follow();
		else if (options.default && !registry.selectedId.value) registry.select(options.default);
		watch(() => media.matches.value, () => {
			if (following.value) follow();
		});
	}
	function select(id) {
		following.value = false;
		registry.select(id);
	}
	function reset() {
		if (pair) {
			following.value = true;
			follow();
			return;
		}
		if (options.default) registry.select(options.default);
	}
	function cycle(themes = names.value) {
		const current = themes.indexOf(registry.selectedId.value ?? "");
		select(themes[current === -1 ? 0 : (current + 1) % themes.length]);
	}
	function resolve(colors) {
		const resolved = {};
		for (const [key, value] of Object.entries(colors)) resolved[key] = tokens.isAlias(value) ? tokens.resolve(value) : value;
		return resolved;
	}
	function register(registration = {}) {
		const { colors, ...rest } = registration;
		if (colors && rest.id && !registry.has(rest.id)) tokens.onboard(/* @__PURE__ */ flatten({ [rest.id]: { colors } }, "", true));
		const item = {
			lazy: false,
			dark: false,
			...rest,
			...colors ? { value: colors } : {}
		};
		return registry.register(item);
	}
	function onboard(registrations) {
		return registry.batch(() => registrations.map((registration) => register(registration)));
	}
	return {
		...registry,
		colors,
		isDark,
		isSystem,
		select,
		reset,
		register,
		onboard,
		cycle,
		dispose: () => {
			media?.stop();
		},
		get size() {
			return registry.size;
		}
	};
}
function resolveSystemPair(system, registry, logger) {
	if (!system) return void 0;
	const light = registry.get(system.light);
	const dark = registry.get(system.dark);
	if (!light) {
		logger.warn(`[v0:theme] system.light "${String(system.light)}" is not registered`);
		return;
	}
	if (!dark) {
		logger.warn(`[v0:theme] system.dark "${String(system.dark)}" is not registered`);
		return;
	}
	if (!dark.dark) logger.warn(`[v0:theme] system.dark "${String(system.dark)}" should have dark: true`);
	return system;
}
function createThemeFallback() {
	return {
		size: 0,
		colors: computed(() => ({})),
		isDark: shallowRef(false),
		isSystem: shallowRef(false),
		cycle: () => {},
		reset: () => {},
		onboard: () => [],
		dispose: () => {}
	};
}
const [createThemeContext, createThemePlugin, useTheme] = createPluginContext("v0:theme", (options) => createTheme(options), {
	fallback: () => createThemeFallback(),
	setup: (context, app, { adapter = new V0StyleSheetThemeAdapter(), target, rgb }) => {
		if (rgb) adapter.rgb = true;
		adapter.setup(app, context, target);
		app.onUnmount(() => adapter.dispose?.());
	},
	persist: (ctx) => ctx.isSystem.value ? null : ctx.selectedId.value,
	restore: (ctx, saved) => {
		if (/* @__PURE__ */ isString(saved) || /* @__PURE__ */ isNumber(saved)) ctx.select(saved);
	}
});
//#endregion
export { useMediaQuery as a, usePrefersReducedMotion as c, createHydrationContext as d, createHydrationPlugin as f, useTheme as i, createFallbackHydration as l, createThemeContext as n, usePrefersContrast as o, useHydration as p, createThemePlugin as r, usePrefersDark as s, createTheme as t, createHydration as u };
