import { n as FeaturesAdapterFlags, t as FeaturesAdapter } from "./adapter-w8SEWO2v.mjs";
import { PostHog } from "posthog-js";
//#region src/composables/useFeatures/adapters/posthog.d.ts
declare class PostHogFeaturesAdapter extends FeaturesAdapter {
  private client;
  constructor(client: PostHog);
  setup(onUpdate: (flags: FeaturesAdapterFlags) => void): FeaturesAdapterFlags;
  dispose(): void;
  private disposeFn;
}
//#endregion
export { PostHogFeaturesAdapter as t };