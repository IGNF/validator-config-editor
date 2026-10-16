import { n as FeaturesAdapterFlags, t as FeaturesAdapter } from "./adapter-w8SEWO2v.mjs";
import { LDClient } from "launchdarkly-js-client-sdk";
//#region src/composables/useFeatures/adapters/launchdarkly.d.ts
declare class LaunchDarklyFeaturesAdapter extends FeaturesAdapter {
  private client;
  constructor(client: LDClient);
  setup(onUpdate: (flags: FeaturesAdapterFlags) => void): FeaturesAdapterFlags;
  dispose(): void;
  private disposeFn;
}
//#endregion
export { LaunchDarklyFeaturesAdapter as t };