import { V0Error, isObject, isString, isSymbol, isUndefined } from "./utilities/index.mjs";
import { inject, provide } from "vue";
//#region src/composables/createContext/index.ts
/**
* @module createContext
*
* @see https://0.vuetifyjs.com/composables/foundation/create-context
*
* @remarks
* Factory for creating type-safe Vue dependency injection contexts.
*
* Provides a wrapper around Vue's provide/inject that throws errors when context is not found,
* eliminating silent failures and improving developer experience. Supports both app-level and
* component-level provision.
*
* Supports two modes:
* - **Static key**: `createContext('my-key')` - key is fixed at creation time
* - **Dynamic key**: `createContext()` or `createContext({ suffix: 'item' })` - key provided at runtime
*
* @example
* ```ts
* import { createContext } from '@vuetify/v0'
*
* const [useTheme, provideTheme] = createContext<{ dark: boolean }>('theme')
*
* provideTheme({ dark: true })
* const theme = useTheme()
* ```
*/
/**
* Injects a context provided by an ancestor component.
*
* @param key The key of the context to inject.
* @param defaultValue Optional default value if context is not found.
* @template Z The type of the context.
* @returns The injected context.
* @throws An error if the context is not found and no default is provided.
*
* @see https://vuejs.org/api/composition-api-dependency-injection.html#inject
* @see https://0.vuetifyjs.com/composables/foundation/create-context
*
* @example
* ```ts
* // Without default value
* const context = useContext<MyContext>('my-context')
*
* // With default value
* const context = useContext<MyContext>('my-context', defaultContext)
* ```
*/
function useContext(key, defaultValue) {
	const context = inject(key, defaultValue);
	if (/* @__PURE__ */ isUndefined(context)) throw new V0Error(`Context "${String(key)}" not found. Ensure it's provided by an ancestor.`, {
		code: "V0_CONTEXT_MISSING",
		key
	});
	return context;
}
/**
* Provides a context to all descendant components.
*
* @param key The key of the context to provide.
* @param context The context to provide.
* @param app Optional Vue app instance to provide the context at app level instead of component level.
* @template Z The type of the context.
* @returns The provided context.
*
* @remarks
* When `app` parameter is provided, the context is made available to all components in the app.
* When omitted, the context is provided at the current component level and available to descendants only.
*
* @see https://vuejs.org/api/composition-api-dependency-injection.html#provide
* @see https://0.vuetifyjs.com/composables/foundation/create-context
*
* @example
* ```ts
* // Component-level provision
* provideContext<MyContext>('my-context', context)
*
* // App-level provision (typically used in plugins)
* const app = createApp()
* provideContext<MyContext>('my-context', context, app)
* ```
*/
function provideContext(key, context, app) {
	if (app) app.provide(key, context);
	else provide(key, context);
	return context;
}
function createContext(keyOrOptions, defaultValue) {
	if (/* @__PURE__ */ isString(keyOrOptions) || /* @__PURE__ */ isSymbol(keyOrOptions)) {
		if (process.env.NODE_ENV !== "production" && /* @__PURE__ */ isString(keyOrOptions) && !keyOrOptions.includes(":")) console.warn(`[v0:context] String key "${keyOrOptions}" has no namespace separator. Use "namespace:key" format (e.g. "v0:theme") to prevent collisions.`);
		const _key = keyOrOptions;
		function _provideContext(context, app) {
			return provideContext(_key, context, app);
		}
		function _useContext() {
			return useContext(_key, defaultValue);
		}
		return [_useContext, _provideContext];
	}
	const suffix = /* @__PURE__ */ isObject(keyOrOptions) ? keyOrOptions.suffix : void 0;
	function _provideContext(key, context, app) {
		return provideContext(suffix ? `${key}:${suffix}` : key, context, app);
	}
	function _useContext(key, defaultValue) {
		return useContext(suffix ? `${key}:${suffix}` : key, defaultValue);
	}
	return [_useContext, _provideContext];
}
//#endregion
//#region src/composables/createTrinity/index.ts
/**
* @module createTrinity
*
* @see https://0.vuetifyjs.com/composables/foundation/create-trinity
*
* @remarks
* Factory for creating the trinity pattern tuple used throughout the codebase.
*
* The trinity pattern returns a readonly tuple of [useContext, provideContext, defaultContext],
* enabling flexible dependency injection with sensible defaults. This pattern is fundamental
* to all registry-based composables.
*
* @example
* ```ts
* import { createTrinity } from '@vuetify/v0'
*
* const [useMyContext, provideMyContext, defaultContext] =
*   createTrinity('my-context', { foo: 'bar' })
* ```
*/
function createTrinity(keyOrUseContext, provideContextOrContext, maybeContext) {
	if (/* @__PURE__ */ isString(keyOrUseContext)) {
		const [useContext, provideContext] = createContext(keyOrUseContext);
		const context = provideContextOrContext;
		return [
			useContext,
			(_context = context, app) => provideContext(_context, app),
			context
		];
	}
	const provideContext = provideContextOrContext;
	const context = maybeContext;
	return [
		keyOrUseContext,
		(_context = context, app) => provideContext(_context, app),
		context
	];
}
//#endregion
export { useContext as i, createContext as n, provideContext as r, createTrinity as t };
