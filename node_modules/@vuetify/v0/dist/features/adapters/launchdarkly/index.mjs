import { UNSAFE_KEYS, isBoolean } from "../../../utilities/index.mjs";
import { t as FeaturesAdapter } from "../../../adapter-CxCiZYZO.mjs";
//#region src/composables/useFeatures/adapters/launchdarkly.ts
/**
* @module LaunchDarklyFeaturesAdapter
*
* @remarks
* LaunchDarkly adapter for feature flags.
*/
var LaunchDarklyFeaturesAdapter = class extends FeaturesAdapter {
	client;
	constructor(client) {
		super();
		this.client = client;
	}
	setup(onUpdate) {
		const collect = () => {
			const allFlags = this.client.allFlags();
			const flags = {};
			for (const [key, value] of Object.entries(allFlags)) {
				if (UNSAFE_KEYS.has(key)) continue;
				flags[key] = /* @__PURE__ */ isBoolean(value) ? value : {
					$value: true,
					$variation: value
				};
			}
			return flags;
		};
		function onChange() {
			onUpdate(collect());
		}
		this.client.on("change", onChange);
		this.disposeFn = () => this.client.off("change", onChange);
		return collect();
	}
	dispose() {
		this.disposeFn();
	}
	disposeFn = () => {};
};
//#endregion
export { LaunchDarklyFeaturesAdapter };
