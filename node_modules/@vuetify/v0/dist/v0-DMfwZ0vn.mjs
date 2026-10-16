import { t as IN_BROWSER } from "./globals-Bxw-y98v.mjs";
import { isObject, isString, isUndefined } from "./utilities/index.mjs";
import { t as LocaleAdapter } from "./adapter-BTNELv6-.mjs";
//#region src/composables/useLocale/adapters/v0.ts
/**
* Default locale adapter for @vuetify/v0.
*
* Handles the full translation pipeline: key lookup via tokens,
* fallback chain, token reference resolution, and placeholder interpolation.
*/
var V0LocaleAdapter = class extends LocaleAdapter {
	context;
	constructor(context) {
		super();
		this.context = context;
	}
	t(key, ...params) {
		const found = this.lookup(key, params);
		return /* @__PURE__ */ isUndefined(found) ? this.interpolate(key, params) : found;
	}
	ti(key, ...params) {
		return this.lookup(key, params);
	}
	n(value) {
		const locale = this.context.selectedId.value;
		if (!IN_BROWSER || !locale) return value.toString();
		return new Intl.NumberFormat(String(locale)).format(value);
	}
	lookup(key, params) {
		const locale = this.context.selectedId.value;
		if (!locale) return void 0;
		const message = this.context.tokens.get(`${locale}.${key}`)?.value;
		if (/* @__PURE__ */ isString(message)) return this.interpolate(this.resolve(locale, message), params);
		if (this.context.fallbackLocale) {
			const fb = this.context.tokens.get(`${this.context.fallbackLocale}.${key}`)?.value;
			if (/* @__PURE__ */ isString(fb)) return this.interpolate(this.resolve(this.context.fallbackLocale, fb), params);
		}
	}
	resolve(locale, str, visited = /* @__PURE__ */ new Set()) {
		return str.replace(/{([a-zA-Z0-9.\-_]+)}/g, (match, key) => {
			const [prefix, ...rest] = key.split(".");
			const target = this.context.has(prefix) ? prefix : locale;
			const path = `${target}.${this.context.has(prefix) ? rest.join(".") : key}`;
			if (visited.has(path)) return match;
			const resolved = this.context.tokens.get(path)?.value;
			if (/* @__PURE__ */ isString(resolved)) return this.resolve(target, resolved, new Set(visited).add(path));
			return match;
		});
	}
	interpolate(message, args) {
		let result = message;
		let rest = args;
		if (rest.length > 0 && /* @__PURE__ */ isObject(rest[0])) {
			const variables = rest[0];
			result = result.replace(/{([a-zA-Z][a-zA-Z0-9_]*)}/g, (match, name) => {
				return /* @__PURE__ */ isUndefined(variables[name]) ? match : String(variables[name]);
			});
			rest = rest.slice(1);
		}
		result = result.replace(/\{(\d+)\}/g, (match, index) => {
			const i = Number.parseInt(index, 10);
			if (!/* @__PURE__ */ isUndefined(rest[i])) return String(rest[i]);
			return match;
		});
		return result;
	}
};
//#endregion
export { V0LocaleAdapter as t };
