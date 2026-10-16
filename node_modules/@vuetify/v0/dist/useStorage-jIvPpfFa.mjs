import { t as IN_BROWSER } from "./globals-Bxw-y98v.mjs";
import { isArray, isNull, isNullOrUndefined, isObject } from "./utilities/index.mjs";
import { n as createPluginContext } from "./createPlugin-YYkwbiUd.mjs";
import { i as useLogger } from "./useLogger-BIAZ6Iyu.mjs";
import { r as useWindowEventListener } from "./useEventListener-C1aOe4Iy.mjs";
import { t as MemoryStorageAdapter } from "./memory-C-Hi69Zc.mjs";
import { ref, watch } from "vue";
//#region src/composables/useStorage/index.ts
/**
* @module useStorage
*
* @see https://0.vuetifyjs.com/composables/plugins/use-storage
*
* @remarks
* Reactive storage composable with adapter pattern for localStorage, sessionStorage, or memory.
*
* Key features:
* - Reactive refs that sync with storage
* - localStorage, sessionStorage, and memory adapters
* - TTL (time-to-live) for time-based cache expiration
* - Custom serialization support
* - SSR fallback to memory adapter
* - Automatic cleanup on remove/clear
*
* Uses adapter pattern to abstract storage implementation details.
*
* @example
* ```ts
* import { useStorage } from '@vuetify/v0'
*
* const storage = useStorage()
* const theme = storage.get('theme', 'light')
* theme.value = 'dark' // persists automatically
* ```
*/
/**
* Resolves the browser's localStorage, or `null` when it is unavailable.
*
* @remarks
* Reading `window.localStorage` throws a `SecurityError` when a browser policy
* blocks site data (Chrome's "block all cookies", a sandboxed iframe without
* `allow-same-origin`, Firefox's `dom.storage.enabled=false`), so the property
* access itself has to be guarded.
*
* @returns The browser's localStorage, or `null` outside the browser or when it is refused.
*/
function localStorageOrNull() {
	if (!IN_BROWSER) return null;
	try {
		return window.localStorage;
	} catch {
		return null;
	}
}
/**
* Creates a new storage instance.
*
* @param options The options for the storage instance.
* @template E The type of the storage context.
* @returns A new storage instance.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-storage
*
* @example
* ```ts
* import { createStorage } from '@vuetify/v0'
*
* const storage = createStorage()
*
* storage.set('username', 'MyUsername')
*
* const username = storage.get('username')
*
* console.log(username.value) // MyUsername
*
* storage.clear()
* ```
*/
function createStorage(options = {}) {
	const local = localStorageOrNull();
	const { adapter = local ?? new MemoryStorageAdapter(), prefix = "v0:", serializer = {
		read: JSON.parse,
		write: JSON.stringify
	}, ttl } = options;
	const logger = useLogger();
	const cache = /* @__PURE__ */ new Map();
	const watchers = /* @__PURE__ */ new Map();
	function has(key) {
		const prefixedKey = `${prefix}${key}`;
		return cache.has(prefixedKey) || !/* @__PURE__ */ isNullOrUndefined(readStored(prefixedKey));
	}
	function readStored(prefixedKey) {
		let raw;
		try {
			raw = adapter?.getItem(prefixedKey);
		} catch (error) {
			logger.error(`[v0:storage] Failed to read key "${prefixedKey}":`, error);
			return;
		}
		if (/* @__PURE__ */ isNullOrUndefined(raw)) return void 0;
		try {
			const parsed = serializer.read(raw);
			if (/* @__PURE__ */ isObject(parsed) && "__v0" in parsed && "__v" in parsed) {
				const envelope = parsed;
				if (ttl && Date.now() - envelope.__t > ttl) {
					adapter?.removeItem(prefixedKey);
					return;
				}
				return envelope.__v;
			}
			return parsed;
		} catch (error) {
			logger.error(`[v0:storage] Failed to parse stored value for key "${prefixedKey}":`, error);
			return;
		}
	}
	function writeStored(prefixedKey, value) {
		const wrapped = ttl ? {
			__v0: 1,
			__v: value,
			__t: Date.now()
		} : value;
		try {
			adapter?.setItem(prefixedKey, serializer.write(wrapped));
		} catch (error) {
			logger.error(`[v0:storage] Failed to write key "${prefixedKey}":`, error);
		}
	}
	function get(key, defaultValue) {
		const prefixedKey = `${prefix}${key}`;
		if (cache.has(prefixedKey)) return cache.get(prefixedKey);
		const initialValue = readStored(prefixedKey) ?? (/* @__PURE__ */ isObject(defaultValue) || /* @__PURE__ */ isArray(defaultValue) ? structuredClone(defaultValue) : defaultValue);
		const valueRef = ref(initialValue);
		const stop = watch(valueRef, (newValue) => {
			if (/* @__PURE__ */ isNullOrUndefined(newValue)) adapter?.removeItem(prefixedKey);
			else writeStored(prefixedKey, newValue);
		}, { deep: true });
		watchers.set(prefixedKey, stop);
		cache.set(prefixedKey, valueRef);
		return valueRef;
	}
	function set(key, value) {
		const valueRef = get(key);
		valueRef.value = value;
	}
	function remove(key) {
		const prefixedKey = `${prefix}${key}`;
		const stop = watchers.get(prefixedKey);
		if (!stop) return;
		stop();
		watchers.delete(prefixedKey);
		adapter?.removeItem(prefixedKey);
		cache.delete(prefixedKey);
	}
	function clear() {
		if (watchers.size > 0) {
			for (const stop of watchers.values()) stop();
			watchers.clear();
		}
		if (cache.size > 0) {
			for (const key of cache.keys()) adapter?.removeItem(key);
			cache.clear();
		}
	}
	if (!/* @__PURE__ */ isNull(local) && adapter === local) useWindowEventListener("storage", (e) => {
		if (!e.key?.startsWith(prefix)) return;
		const valueRef = cache.get(e.key);
		if (!valueRef) return;
		watchers.get(e.key)?.();
		valueRef.value = /* @__PURE__ */ isNullOrUndefined(e.newValue) ? void 0 : readStored(e.key);
		const stop = watch(valueRef, (newValue) => {
			if (/* @__PURE__ */ isNullOrUndefined(newValue)) adapter?.removeItem(e.key);
			else writeStored(e.key, newValue);
		}, { deep: true });
		watchers.set(e.key, stop);
	});
	return {
		has,
		get,
		set,
		remove,
		clear
	};
}
function createStorageFallback() {
	return createStorage({ adapter: new MemoryStorageAdapter() });
}
const [createStorageContext, createStoragePlugin, useStorage] = createPluginContext("v0:storage", (options) => createStorage(options), { fallback: () => createStorageFallback() });
//#endregion
export { useStorage as i, createStorageContext as n, createStoragePlugin as r, createStorage as t };
