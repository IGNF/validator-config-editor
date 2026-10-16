import { instanceExists, isFunction, isObject } from "./utilities/index.mjs";
import { n as createPluginContext } from "./createPlugin-YYkwbiUd.mjs";
import { i as useLogger } from "./useLogger-BIAZ6Iyu.mjs";
import { a as useLocale } from "./useLocale-cS3wOsyK.mjs";
//#region src/composables/useRules/adapters/standard.ts
/**
* Type guard for Standard Schema objects.
* Checks for the `~standard` property that all conforming libraries expose.
*
* @param value The value to check.
* @returns `true` if the value conforms to the Standard Schema interface.
*/
/* #__NO_SIDE_EFFECTS__ */
function isStandardSchema(value) {
	return /* @__PURE__ */ isObject(value) && "~standard" in value;
}
/**
* Converts a Standard Schema object into a `FormValidationRule`.
*
* Used internally by `resolve()` — both for schemas passed directly and for
* schemas returned by alias builders. Handles both sync and async validation.
* Returns the first issue message on failure.
*
* @param schema Any Standard Schema-conforming object (Zod v3.24+, Valibot, ArkType, etc.)
* @returns A `FormValidationRule` that resolves to `true` or an error string.
*
* @see https://standardschema.dev/
*/
/* #__NO_SIDE_EFFECTS__ */
function toRule(schema) {
	return async (value) => {
		let result = schema["~standard"].validate(value);
		if (result instanceof Promise) result = await result;
		return result.issues?.[0]?.message ?? true;
	};
}
//#endregion
//#region src/composables/useRules/index.ts
/**
* @module useRules
*
* @see https://0.vuetifyjs.com/composables/plugins/use-rules
*
* @remarks
* Validation rule composable with Standard Schema support.
*
* Key features:
* - Standard Schema auto-detection (Zod, Valibot, ArkType, etc.)
* - String alias resolution to FormValidationRule[] via predicate lookup
* - Custom alias registration (predicates, not builders)
* - Trinity pattern for DI
* - Plugin factory for app-level installation
*
* Validation return values:
* - `true` — validation passes
* - `string` — validation fails, the string IS the error message
* - `false` — validation fails, error message resolved from locale (`$rules.<name>`)
*
* Integrates with createValidation for rule resolution, useLocale for i18n.
*
* @example
* ```ts
* import { useRules } from '@vuetify/v0'
*
* const rules = useRules()
* const validators = rules.resolve(['required', v => v.length > 3 || 'Too short'])
* ```
*/
/**
* Wraps an alias predicate so that `false` results are
* resolved to a locale-aware error message via `$rules.<name>`.
*
* - `true` → pass
* - `string` → fail with that message
* - `false` → fail, look up message from locale
*/
function resolveAlias(name, predicate, locale) {
	return (value) => {
		const result = predicate(value);
		if (result instanceof Promise) return result.then((resolved) => {
			if (resolved === true) return true;
			if (resolved === false) return locale?.t(`$rules.${name}`) ?? name;
			return resolved;
		});
		if (result === true) return true;
		if (result === false) return locale?.t(`$rules.${name}`) ?? name;
		return result;
	};
}
function createResolve(aliases, locale) {
	const logger = useLogger();
	return function resolve(rules) {
		const result = [];
		for (const rule of rules) {
			if (/* @__PURE__ */ isFunction(rule)) {
				result.push(rule);
				continue;
			}
			if (/* @__PURE__ */ isStandardSchema(rule)) {
				result.push(/* @__PURE__ */ toRule(rule));
				continue;
			}
			const predicate = aliases[rule];
			if (predicate) result.push(resolveAlias(rule, predicate, locale));
			else if (typeof (process.env.NODE_ENV !== "production") !== "undefined" && process.env.NODE_ENV !== "production") logger.warn(`Unknown validation rule alias "${rule}". Register it via rules.aliases or install a rules plugin.`);
		}
		return result;
	};
}
/**
* Creates a new rules instance.
*
* @param options The options for the rules instance.
* @returns A new rules instance with resolve() and aliases.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-rules
*
* @example
* ```ts
* import { createRules } from '@vuetify/v0'
*
* const rules = createRules({
*   aliases: {
*     required: (v) => !!v || false,
*   },
* })
*
* // Resolve alias strings to validation functions
* const resolved = rules.resolve(['required'])
* ```
*/
function createRules(_options = {}) {
	const { aliases: customAliases } = _options;
	let locale;
	try {
		if (/* @__PURE__ */ instanceExists()) locale = useLocale();
	} catch {}
	const aliases = { ...customAliases };
	return {
		resolve: createResolve(aliases, locale),
		aliases
	};
}
/**
* Creates a fallback rules instance for use outside component scope.
* No locale lookup — `false` returns fall back to the alias name.
*
* @returns A standalone rules context with empty aliases.
*/
function createRulesFallback() {
	const aliases = {};
	return {
		resolve: createResolve(aliases),
		aliases
	};
}
const [createRulesContext, createRulesPlugin, useRules] = createPluginContext("v0:rules", (options) => createRules(options), { fallback: () => createRulesFallback() });
//#endregion
export { useRules as a, createRulesPlugin as i, createRulesContext as n, isStandardSchema as o, createRulesFallback as r, createRules as t };
