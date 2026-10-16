import { n as FeaturesAdapterFlags, t as FeaturesAdapter } from "./adapter-w8SEWO2v.mjs";
import { IFlagsmith, IInitConfig } from "@flagsmith/flagsmith";
//#region src/composables/useFeatures/adapters/flagsmith.d.ts
declare class FlagsmithFeaturesAdapter extends FeaturesAdapter {
  private client;
  private options;
  constructor(client: IFlagsmith, options: IInitConfig);
  setup(onUpdate: (flags: FeaturesAdapterFlags) => void): FeaturesAdapterFlags;
  dispose(): void;
  private disposeFn;
}
//#endregion
export { FlagsmithFeaturesAdapter as t };