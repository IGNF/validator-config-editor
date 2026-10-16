import { isArray, isBoolean, isNumber, isObject, isString } from "./utilities/index.mjs";
import { n as createPluginContext } from "./createPlugin-YYkwbiUd.mjs";
import { t as createTokens } from "./createTokens-D-xtNt9m.mjs";
import { t as toArray } from "./toArray-DCZRopC6.mjs";
import { t as createGroup } from "./createGroup-If8FlygQ.mjs";
import { shallowReactive, shallowRef } from "vue";
//#region src/composables/useFeatures/index.ts
/**
* @module useFeatures
*
* @see https://0.vuetifyjs.com/composables/plugins/use-features
*
* @remarks
* Feature flag system with boolean and token-based features.
*
* Key features:
* - Boolean features (true/false activation)
* - Token features with $variation support
* - Auto-selection of enabled features
* - Multi-select support for feature combinations
* - Perfect for A/B testing, progressive rollout, feature toggles
* - Adapter pattern for external feature flag services (Generic, LaunchDarkly, Flagsmith)
*
* Inheritance chain: createRegistry → createSelection → createGroup → createFeatures
* Integrates with createTokens for token-based features.
*
* @example
* ```ts
* import { useFeatures } from '@vuetify/v0'
*
* const features = useFeatures()
* features.register({ id: 'new-checkout', value: true })
* console.log(features.variation('new-checkout'))
* ```
*/
function isEnabled(value) {
	if (/* @__PURE__ */ isBoolean(value)) return value;
	if (/* @__PURE__ */ isObject(value) && /* @__PURE__ */ isBoolean(value.$value)) return value.$value;
}
const seams = /* @__PURE__ */ new WeakMap();
function coerce(saved) {
	if (!/* @__PURE__ */ isObject(saved)) return null;
	const map = /* @__PURE__ */ new Map();
	if (/* @__PURE__ */ isArray(saved.enabled)) {
		for (const id of saved.enabled) if (/* @__PURE__ */ isString(id) || /* @__PURE__ */ isNumber(id)) map.set(id, true);
	}
	if (/* @__PURE__ */ isArray(saved.disabled)) {
		for (const id of saved.disabled) if (/* @__PURE__ */ isString(id) || /* @__PURE__ */ isNumber(id)) map.set(id, false);
	}
	return map.size > 0 ? map : null;
}
/**
* Creates a new features instance.
*
* @param options The options for the features instance.
* @returns A new features instance.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-features
*
* @example
* ```ts
* import { createFeatures } from '@vuetify/v0'
*
* const features = createFeatures({
*   features: {
*     'dark-mode': true,
*     'theme-color': { $variation: 'blue' },
*   },
* })
* ```
*/
function createFeatures(_options = {}) {
	const { features, ...options } = _options;
	const tokens = createTokens(features, { flat: true });
	const registry = createGroup({
		...options,
		events: true,
		reactive: true
	});
	const touched = shallowReactive(/* @__PURE__ */ new Set());
	const defaults = /* @__PURE__ */ new Map();
	const pending = shallowRef(null);
	for (const [id, { value }] of tokens.entries()) register({
		id,
		value
	});
	function touch(ids) {
		for (const id of /* @__PURE__ */ toArray(ids)) if (registry.has(id)) touched.add(id);
	}
	function select(ids) {
		touch(ids);
		registry.select(ids);
	}
	function unselect(ids) {
		touch(ids);
		registry.unselect(ids);
	}
	function toggle(ids) {
		touch(ids);
		registry.toggle(ids);
	}
	function reset() {
		touched.clear();
		pending.value = null;
		registry.reset();
		for (const [id, enabled] of defaults) if (enabled) registry.select(id);
	}
	function variation(id, fallback = null) {
		const ticket = registry.get(id);
		if (!ticket) return fallback;
		return /* @__PURE__ */ isObject(ticket.value) ? ticket.value.$variation ?? fallback : ticket.value ?? fallback;
	}
	function register(registration = {}) {
		const item = {
			value: false,
			...registration
		};
		const ticket = registry.register(item);
		if (isEnabled(ticket.value) === true) registry.select(ticket.id);
		defaults.set(ticket.id, registry.selectedIds.has(ticket.id));
		if (pending.value?.has(ticket.id) && !touched.has(ticket.id)) {
			touched.add(ticket.id);
			if (pending.value.get(ticket.id)) registry.select(ticket.id);
			else registry.unselect(ticket.id);
		}
		return ticket;
	}
	function sync(flags) {
		for (const [id, value] of Object.entries(flags)) if (registry.get(id)) {
			const enabled = isEnabled(value);
			registry.upsert(id, { value });
			if (enabled === true) registry.select(id);
			else if (enabled === false) registry.selectedIds.delete(id);
		} else register({
			id,
			value
		});
	}
	function onboard(registrations) {
		return registry.batch(() => registrations.map((registration) => register(registration)));
	}
	function replay(force = false) {
		if (!pending.value) return;
		for (const [id, enabled] of pending.value) {
			if (!registry.has(id)) continue;
			if (!force && touched.has(id)) continue;
			touched.add(id);
			if (enabled) registry.select(id);
			else registry.unselect(id);
		}
	}
	function delta() {
		pending.value;
		const enabled = [];
		const disabled = [];
		for (const id of touched) {
			if (!registry.has(id)) continue;
			const selected = registry.selectedIds.has(id);
			if (selected === defaults.get(id)) continue;
			if (selected) enabled.push(id);
			else disabled.push(id);
		}
		return {
			enabled,
			disabled
		};
	}
	const context = {
		...registry,
		select,
		unselect,
		toggle,
		reset,
		variation,
		register,
		onboard,
		sync,
		get size() {
			return registry.size;
		}
	};
	seams.set(context, {
		delta,
		restore: (saved) => {
			pending.value = coerce(saved);
			replay();
		},
		replay: () => replay(true)
	});
	return context;
}
function createFeaturesFallback() {
	return {
		size: 0,
		variation: (_id, fallback = null) => fallback,
		sync: () => {},
		onboard: () => [],
		register: () => void 0,
		select: () => {},
		unselect: () => {},
		get: () => void 0,
		has: () => false,
		selectedIds: /* @__PURE__ */ new Set(),
		values: () => []
	};
}
const [createFeaturesContext, createFeaturesPlugin, useFeatures] = createPluginContext("v0:features", (options) => createFeatures(options), {
	fallback: () => createFeaturesFallback(),
	persist: (context) => seams.get(context)?.delta() ?? null,
	restore: (context, saved) => seams.get(context)?.restore(saved),
	setup: (context, app, { adapter }) => {
		if (!adapter) return;
		for (const a of /* @__PURE__ */ isArray(adapter) ? adapter : [adapter]) {
			context.sync(a.setup((flags) => context.sync(flags)));
			app.onUnmount(() => a.dispose?.());
		}
		seams.get(context)?.replay();
	}
});
//#endregion
export { useFeatures as i, createFeaturesContext as n, createFeaturesPlugin as r, createFeatures as t };
