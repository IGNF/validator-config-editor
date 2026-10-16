import { t as IN_BROWSER } from "../../../globals-Bxw-y98v.mjs";
import { UNSAFE_KEYS, isBoolean, isNullOrUndefined } from "../../../utilities/index.mjs";
import { t as FeaturesAdapter } from "../../../adapter-CxCiZYZO.mjs";
//#region src/composables/useFeatures/adapters/posthog.ts
/**
* @module PostHogFeaturesAdapter
*
* @remarks
* PostHog adapter for feature flags.
*/
var PostHogFeaturesAdapter = class extends FeaturesAdapter {
	client;
	constructor(client) {
		super();
		this.client = client;
	}
	setup(onUpdate) {
		if (!IN_BROWSER) return {};
		const collect = () => {
			const flags = {};
			const activeFlags = this.client.featureFlags.getFlags();
			if (!activeFlags) return flags;
			for (const key of activeFlags) {
				if (UNSAFE_KEYS.has(key)) continue;
				const isEnabled = this.client.isFeatureEnabled(key) ?? false;
				const payload = this.client.getFeatureFlagPayload(key);
				if (/* @__PURE__ */ isNullOrUndefined(payload)) {
					const variant = this.client.getFeatureFlag(key);
					flags[key] = !/* @__PURE__ */ isBoolean(variant) && !/* @__PURE__ */ isNullOrUndefined(variant) ? {
						$value: true,
						$variation: variant
					} : isEnabled;
				} else flags[key] = {
					$value: isEnabled,
					$variation: payload
				};
			}
			return flags;
		};
		this.disposeFn = this.client.onFeatureFlags(() => onUpdate(collect()));
		return collect();
	}
	dispose() {
		this.disposeFn();
	}
	disposeFn = () => {};
};
//#endregion
export { PostHogFeaturesAdapter };
