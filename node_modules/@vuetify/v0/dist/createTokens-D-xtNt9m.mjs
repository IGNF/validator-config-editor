import { UNSAFE_KEYS, isObject, isString, isUndefined } from "./utilities/index.mjs";
import { i as useContext, t as createTrinity } from "./createTrinity-DJROWgXU.mjs";
import { i as useLogger } from "./useLogger-BIAZ6Iyu.mjs";
import { t as createRegistry } from "./createRegistry-COW_AjH1.mjs";
//#region src/composables/createTokens/index.ts
/**
* @module createTokens
*
* @see https://0.vuetifyjs.com/composables/registration/create-tokens
*
* @remarks
* Design token registry with alias resolution and W3C Design Tokens format support.
*
* Key features:
* - Alias resolution with circular reference detection
* - Nested token flattening with dot notation
* - W3C Design Tokens format ($value, $type, $description, $extensions)
* - Path-based resolution (e.g., {colors.blue.500} or colors.blue.500)
* - Resolution caching for performance
*
* Used by useTheme, useLocale, useFeatures, and usePermissions for token-based configuration.
*
* @example
* ```ts
* import { createTokens } from '@vuetify/v0'
*
* const tokens = createTokens({
*   colors: { primary: '#1976d2' },
* })
* console.log(tokens.resolve('{colors.primary}'))
* ```
*/
/**
* Creates a new token instance.
*
* @param tokens The tokens to use.
* @param options The options for the token instance.
* @template Z The type of the token ticket.
* @template E The type of the token context.
* @returns A new token instance.
*
* @see https://www.designtokens.org/tr/drafts/format/
* @see https://0.vuetifyjs.com/composables/registration/create-tokens
*
* @example
* ```ts
* import { createTokens } from '@vuetify/v0'
*
* const tokens = createTokens({
*   colors: {
*     primary: '#3b82f6',
*     secondary: '{colors.primary}', // Alias reference
*   },
* })
*
* console.log(tokens.resolve('{colors.primary}')) // '#3b82f6'
* console.log(tokens.resolve('{colors.secondary}')) // '#3b82f6'
* ```
*/
function createTokens(tokens = {}, options = {}) {
	const logger = useLogger();
	const registry = createRegistry({
		...options,
		events: true
	});
	const cache = /* @__PURE__ */ new Map();
	function invalidate() {
		cache.clear();
	}
	registry.on("register:ticket", invalidate);
	registry.on("unregister:ticket", invalidate);
	registry.on("update:ticket", invalidate);
	registry.on("reindex:registry", invalidate);
	registry.on("clear:registry", invalidate);
	registry.onboard(/* @__PURE__ */ flatten(tokens, options.prefix, !!options.flat));
	function isAlias(token) {
		return /* @__PURE__ */ isString(token) && token.length > 2 && token[0] === "{" && token.at(-1) === "}";
	}
	function isTokenAlias(value) {
		return /* @__PURE__ */ isObject(value) && "$value" in value;
	}
	function resolve(token, visited = /* @__PURE__ */ new Set()) {
		const cacheKey = /* @__PURE__ */ isString(token) ? token : JSON.stringify(token);
		if (cache.has(cacheKey)) return cache.get(cacheKey);
		const reference = isTokenAlias(token) ? token.$value : token;
		const isAliasReference = /* @__PURE__ */ isString(reference) && isAlias(reference);
		if (isTokenAlias(token) && !isAliasReference) {
			cache.set(cacheKey, reference);
			return reference;
		}
		const clean = isAliasReference ? reference.slice(1, -1) : String(reference);
		if (visited.has(clean)) {
			logger.warn(`Circular alias detected for "${clean}"`);
			cache.set(cacheKey, void 0);
			return;
		}
		visited.add(clean);
		let found = registry.get(clean);
		let segments = [];
		if (!found && clean.includes(".")) {
			const parts = clean.split(".");
			for (let i = parts.length - 1; i > 0; i--) {
				const prefix = parts.slice(0, i).join(".");
				const suffix = parts.slice(i);
				const candidate = registry.get(prefix);
				if (!/* @__PURE__ */ isUndefined(candidate?.value)) {
					found = candidate;
					segments = suffix;
					break;
				}
			}
		}
		if (/* @__PURE__ */ isUndefined(found?.value)) {
			if (isAliasReference) logger.warn(`Alias not found for "${String(reference)}"`);
			cache.set(cacheKey, void 0);
			return;
		}
		let current = found.value;
		if (segments.length > 0) {
			if (isTokenAlias(current)) current = current.$value;
			for (const segment of segments) {
				if (!/* @__PURE__ */ isObject(current) || UNSAFE_KEYS.has(segment) || !Object.prototype.hasOwnProperty.call(current, segment)) {
					current = void 0;
					break;
				}
				current = current[segment];
				if (isTokenAlias(current)) current = current.$value;
			}
			if (/* @__PURE__ */ isUndefined(current)) {
				logger.warn(`Path not found inside "${clean}": ${segments.join(".")}`);
				cache.set(cacheKey, void 0);
				return;
			}
		} else if (isTokenAlias(current)) current = current.$value;
		const result = /* @__PURE__ */ isString(current) && isAlias(current) ? resolve(current, visited) : current;
		cache.set(cacheKey, result);
		return result;
	}
	return {
		...registry,
		resolve,
		isAlias,
		get size() {
			return registry.size;
		}
	};
}
/**
* Creates a new token context.
*
* @param options The options for the token context.
* @template Z The type of the token ticket.
* @template E The type of the token context.
* @returns A new token context.
*
* @see https://0.vuetifyjs.com/composables/registration/create-tokens
*
* @example
* ```ts
* import { createTokensContext } from '@vuetify/v0'
*
* export const [useTokens, provideTokens, context] = createTokensContext({
*  namespace: 'v0:tokens',
*  tokens: {
*    colors: {
*      primary: '#3b82f6',
*      secondary: '{colors.primary}', // Alias reference
*    },
*  },
* })
* ```
*/
function createTokensContext(_options) {
	const { namespace = "v0:tokens", tokens = {}, ...options } = _options;
	const context = createTokens(tokens, options);
	return createTrinity(namespace, context);
}
/**
* Returns the current tokens instance.
*
* @param namespace The namespace for the tokens context. Defaults to `'v0:tokens'`.
* @returns The current tokens instance.
*
* @see https://0.vuetifyjs.com/composables/registration/create-tokens
*
* @example
* ```vue
* <script setup lang="ts">
*   import { useTokens } from '@vuetify/v0'
*
*   const tokens = useTokens()
* <\/script>
* ```
*/
function useTokens(namespace = "v0:tokens") {
	return useContext(namespace);
}
/**
* Flattens a nested collection of tokens into a flat array of tokens.
* Each token is represented by an object containing its ID & value.
* @param tokens The collection of tokens to flatten.
* @param prefix An optional prefix to prepend to each token ID.
* @returns An array of flattened tokens, each with an ID and value.
*/
/* #__NO_SIDE_EFFECTS__ */
function flatten(tokens, prefix = "", flat = false) {
	const flattened = [];
	const stack = [{
		tokens,
		prefix,
		flat
	}];
	while (stack.length > 0) {
		const { tokens: currentTokens, prefix: currentPrefix, flat } = stack.pop();
		const meta = {};
		for (const k in currentTokens) {
			if (!Object.hasOwn(currentTokens, k)) continue;
			if (k.startsWith("$")) meta[k] = currentTokens[k];
		}
		if (Object.keys(meta).length > 0 && currentPrefix) flattened.push({
			id: currentPrefix,
			value: meta
		});
		for (const key in currentTokens) {
			if (!Object.hasOwn(currentTokens, key)) continue;
			if (UNSAFE_KEYS.has(key)) continue;
			if (key.startsWith("$")) continue;
			const value = currentTokens[key];
			const id = currentPrefix ? `${currentPrefix}.${key}` : key;
			if (!/* @__PURE__ */ isObject(value)) {
				flattened.push({
					id,
					value
				});
				continue;
			}
			if ("$value" in value) {
				flattened.push({
					id,
					value
				});
				const inner = value.$value;
				if (/* @__PURE__ */ isObject(inner) && !flat) for (const innerKey in inner) {
					if (!Object.hasOwn(inner, innerKey)) continue;
					if (UNSAFE_KEYS.has(innerKey)) continue;
					if (innerKey.startsWith("$")) continue;
					const child = inner[innerKey];
					const childId = `${id}.${innerKey}`;
					if (!/* @__PURE__ */ isObject(child)) flattened.push({
						id: childId,
						value: child
					});
					else if ("$value" in child) flattened.push({
						id: childId,
						value: child
					});
					else stack.push({
						tokens: child,
						prefix: childId,
						flat
					});
				}
				continue;
			}
			if (flat) {
				flattened.push({
					id,
					value
				});
				continue;
			}
			stack.push({
				tokens: value,
				prefix: id,
				flat
			});
		}
	}
	return flattened;
}
//#endregion
export { useTokens as i, createTokensContext as n, flatten as r, createTokens as t };
