import { n as LocaleAdapterContext, t as LocaleAdapter } from "./adapter-Bi799Zn7.mjs";
//#region src/composables/useLocale/adapters/v0.d.ts
/**
 * Default locale adapter for @vuetify/v0.
 *
 * Handles the full translation pipeline: key lookup via tokens,
 * fallback chain, token reference resolution, and placeholder interpolation.
 */
declare class V0LocaleAdapter extends LocaleAdapter {
  private context;
  constructor(context: LocaleAdapterContext);
  t(key: string, ...params: unknown[]): string;
  ti(key: string, ...params: unknown[]): string | undefined;
  n(value: number): string;
  private lookup;
  private resolve;
  private interpolate;
}
//#endregion
export { V0LocaleAdapter as t };