import { a as ID } from "./index-XNZrgWCq.mjs";
//#region src/composables/useFeatures/adapters/adapter.d.ts
type FeaturesAdapterValue = boolean | {
  $value?: boolean;
  $variation?: unknown;
};
type FeaturesAdapterFlags = Record<ID, FeaturesAdapterValue>;
declare abstract class FeaturesAdapter {
  /**
   * Initialize the adapter and return initial flags.
   *
   * @param onUpdate Callback invoked when flags change.
   * @returns Initial feature flags.
   *
   * @remarks Called during plugin setup. Sets up change listeners
   * and returns the initial flag values.
   */
  abstract setup(onUpdate: (flags: FeaturesAdapterFlags) => void): FeaturesAdapterFlags;
  /**
   * Cleanup adapter resources.
   *
   * @remarks Called when the plugin is disposed.
   */
  dispose?(): void;
}
//#endregion
export { FeaturesAdapterFlags as n, FeaturesAdapterValue as r, FeaturesAdapter as t };