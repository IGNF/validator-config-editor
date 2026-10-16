import { UNSAFE_KEYS, isNullOrUndefined } from "../../../utilities/index.mjs";
import { t as FeaturesAdapter } from "../../../adapter-CxCiZYZO.mjs";
//#region src/composables/useFeatures/adapters/flagsmith.ts
/**
* @module FlagsmithFeaturesAdapter
*
* @remarks
* Flagsmith adapter for feature flags.
*/
var FlagsmithFeaturesAdapter = class extends FeaturesAdapter {
	client;
	options;
	constructor(client, options) {
		super();
		this.client = client;
		this.options = options;
	}
	setup(onUpdate) {
		const updateFlags = () => {
			const flags = this.client.getAllFlags();
			const adapterFlags = {};
			if (flags) for (const [key, flag] of Object.entries(flags)) {
				if (UNSAFE_KEYS.has(key)) continue;
				const isEnabled = flag.enabled;
				const variation = flag.value;
				adapterFlags[key] = /* @__PURE__ */ isNullOrUndefined(variation) ? isEnabled : {
					$value: isEnabled,
					$variation: variation
				};
			}
			return adapterFlags;
		};
		this.client.init({
			...this.options,
			onChange: (oldFlags, params, loadingState) => {
				onUpdate(updateFlags());
				this.options.onChange?.(oldFlags, params, loadingState);
			}
		});
		this.disposeFn = () => this.client.stopListening();
		return updateFlags();
	}
	dispose() {
		this.disposeFn();
	}
	disposeFn = () => {};
};
//#endregion
export { FlagsmithFeaturesAdapter };
