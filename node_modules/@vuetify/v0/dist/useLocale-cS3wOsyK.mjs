import { isNumber, isString } from "./utilities/index.mjs";
import { n as createPluginContext } from "./createPlugin-YYkwbiUd.mjs";
import { t as createSingle } from "./createSingle-BcLDttSx.mjs";
import { r as flatten, t as createTokens } from "./createTokens-D-xtNt9m.mjs";
import { t as V0LocaleAdapter } from "./v0-DMfwZ0vn.mjs";
//#region src/composables/useLocale/index.ts
/**
* @module useLocale
*
* @see https://0.vuetifyjs.com/composables/plugins/use-locale
*
* @remarks
* Internationalization (i18n) composable with adapter pattern for message translation.
*
* Key features:
* - Locale selection with createSingle
* - Token-based message storage with createTokens
* - Numbered and named placeholder support ({0}, {name})
* - Number formatting with Intl.NumberFormat
* - Adapter pattern for integration with i18n providers (VueI18nLocaleAdapter included)
*
* Integrates with createSingle for locale selection and createTokens for message resolution.
*
* @example
* ```ts
* import { useLocale } from '@vuetify/v0'
*
* const { t, n } = useLocale()
* console.log(t('$v0.greeting', { name: 'World' }))
* console.log(n(1234.56))
* ```
*/
/**
* Creates a new locale instance.
*
* @param options The options for the locale instance.
* @returns A new locale instance.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-locale
*/
function createLocale(_options = {}) {
	const { adapter: externalAdapter, messages = {}, fallback: fallbackLocale, ...options } = _options;
	const tokens = createTokens(messages);
	const registry = createSingle({
		...options,
		reactive: true
	});
	for (const id in messages) {
		registry.register({ id });
		if (id === options.default && !registry.selectedId.value) registry.select(id);
	}
	const adapter = externalAdapter ?? new V0LocaleAdapter({
		tokens,
		selectedId: registry.selectedId,
		fallbackLocale,
		has: (id) => registry.has(id)
	});
	function t(key, ...params) {
		return adapter.t(key, ...params);
	}
	function ti(key, ...params) {
		return adapter.ti(key, ...params);
	}
	function n(value) {
		return adapter.n(value);
	}
	function register(registration = {}) {
		const { messages: msgs, ...rest } = registration;
		if (msgs && rest.id && !registry.has(rest.id)) tokens.onboard(/* @__PURE__ */ flatten({ [rest.id]: msgs }));
		return registry.register(rest);
	}
	return {
		...registry,
		t,
		ti,
		n,
		register,
		get size() {
			return registry.size;
		}
	};
}
function createLocaleFallback() {
	return {
		size: 0,
		t: (key) => key,
		ti: () => void 0,
		n: String
	};
}
const [createLocaleContext, createLocalePlugin, useLocale] = createPluginContext("v0:locale", (options) => createLocale(options), {
	fallback: () => createLocaleFallback(),
	persist: (ctx) => ctx.selectedId.value,
	restore: (ctx, saved) => {
		if (/* @__PURE__ */ isString(saved) || /* @__PURE__ */ isNumber(saved)) ctx.select(saved);
	}
});
//#endregion
export { useLocale as a, createLocalePlugin as i, createLocaleContext as n, createLocaleFallback as r, createLocale as t };
