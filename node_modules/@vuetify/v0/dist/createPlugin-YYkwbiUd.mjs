import { isNullOrUndefined, isUndefined } from "./utilities/index.mjs";
import { i as useContext, t as createTrinity } from "./createTrinity-DJROWgXU.mjs";
import { hasInjectionContext, inject, watch } from "vue";
//#region src/composables/createPlugin/index.ts
/**
* @module createPlugin
*
* @see https://vuejs.org/guide/reusability/plugins.html
* @see https://0.vuetifyjs.com/composables/foundation/create-plugin
*
* @remarks
* Factory for creating Vue plugins with proper context provision.
*
* Wraps the provide function in app.runWithContext() to ensure proper execution context,
* allowing plugins to safely provide dependency injection contexts at the application level.
*
* Also exports `createPluginContext` — a higher-level factory that generates the standard
* context/plugin/consumer triple for plugin composables, eliminating boilerplate.
* Supports `persist()` / `restore()` lifecycle hooks for saving and rehydrating plugin state.
*
* @example
* ```ts
* import { createPlugin } from '@vuetify/v0'
*
* const plugin = createPlugin({
*   namespace: 'v0:my-plugin',
*   provide: app => app.provide('my-key', { greet: () => 'hello' }),
* })
* // app.use(plugin)
* ```
*/
const INSTALLED = Symbol.for("v0:installed-plugins");
function getInstalled(app) {
	const ctx = app._context;
	return ctx[INSTALLED] ??= /* @__PURE__ */ new Set();
}
/**
* Creates a new Vue plugin.
*
* @param options The plugin options.
* @returns A new Vue plugin.
*
* @see https://0.vuetifyjs.com/composables/foundation/create-plugin
*
* @example
* ```ts
* export const [useContext, provideContext] = createContext<MyContext>('my-plugin')
*
* const context = {}
*
* export const MyPlugin = createPlugin({
*   namespace: 'my-plugin',
*   provide: (app) => {
*     provideContext(context, app)
*   },
*   setup: (app) => {
*     // Optional setup logic
*   },
* })
*/
function createPlugin(options) {
	return { install(app) {
		app.runWithContext(() => {
			const installed = getInstalled(app);
			if (installed.has(options.namespace)) return;
			installed.add(options.namespace);
			options.provide(app);
			options.setup?.(app);
		});
	} };
}
function deriveKey(namespace) {
	return namespace.startsWith("v0:") ? namespace.slice(3) : namespace;
}
function getPersistedStorage() {
	return useContext("v0:storage");
}
/**
* Creates the three standard functions for a plugin composable.
*
* @param defaultNamespace The default DI namespace string (e.g. `'v0:logger'`).
* @param factory Function that creates the composable context instance from options.
* @param config Optional setup callback and fallback factory.
* @returns A readonly tuple: `[createXContext, createXPlugin, useX]`.
*
* @example
* ```ts
* // Simple — no setup or fallback
* export const [createStorageContext, createStoragePlugin, useStorage] =
*   createPluginContext('v0:storage', options => createStorage(options))
*
* // With fallback — safe outside component instances
* export const [createLoggerContext, createLoggerPlugin, useLogger] =
*   createPluginContext('v0:logger', options => createLogger(options), {
*     fallback: ns => createFallbackLogger(ns),
*     setup: (context) => {
*       if (__DEV__ && IN_BROWSER) (window as Window & { __v0Logger__?: typeof context }).__v0Logger__ = context
*     },
*   })
* ```
*/
function createPluginContext(defaultNamespace, factory, config) {
	function createXContext(_options = {}) {
		const { namespace = defaultNamespace, persist: _persist, ...options } = _options;
		const context = factory(options);
		return createTrinity(namespace, context);
	}
	function createXPlugin(_options = {}) {
		const { namespace = defaultNamespace, persist: shouldPersist, ...options } = _options;
		let context;
		return createPlugin({
			namespace,
			provide: (app) => {
				const [, provide, ctx] = createXContext({
					...options,
					namespace
				});
				context = ctx;
				provide(context, app);
				if (shouldPersist && config?.restore) {
					const storage = getPersistedStorage();
					const key = deriveKey(namespace);
					const saved = storage.get(key);
					if (!/* @__PURE__ */ isNullOrUndefined(saved.value)) config.restore(context, saved.value);
				}
			},
			setup: config?.setup || shouldPersist ? (app) => {
				const ctx = context;
				config?.setup?.(ctx, app, options);
				if (shouldPersist && config?.persist) {
					const storage = getPersistedStorage();
					const key = deriveKey(namespace);
					const stored = storage.get(key);
					const stop = watch(() => config.persist(ctx), (val) => {
						stored.value = val;
					});
					app.onUnmount(stop);
				}
			} : void 0
		});
	}
	function useX(namespace = defaultNamespace) {
		if (config?.fallback) {
			if (!hasInjectionContext()) return config.fallback(namespace);
			const provided = inject(namespace, void 0);
			if (!/* @__PURE__ */ isUndefined(provided)) return provided;
			return config.fallback(namespace);
		}
		return useContext(namespace);
	}
	return [
		createXContext,
		createXPlugin,
		useX
	];
}
//#endregion
export { createPluginContext as n, createPlugin as t };
