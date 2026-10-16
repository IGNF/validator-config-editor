import { t as LocaleAdapter } from "../../../adapter-Bi799Zn7.mjs";
import { Composer } from "vue-i18n";
//#region src/composables/useLocale/adapters/vue-i18n.d.ts
/**
 * Locale adapter that delegates to a vue-i18n instance.
 *
 * Composition API mode only (vue-i18n v10+ default).
 * The adapter delegates `t()` and `n()` to `i18n.global`,
 * preserving all vue-i18n features: pluralization, linked
 * messages, datetime/number formatting, etc.
 */
declare class VueI18nLocaleAdapter extends LocaleAdapter {
  private composer;
  constructor(i18n: {
    global: Composer;
  });
  t(key: string, ...params: unknown[]): string;
  ti(key: string, ...params: unknown[]): string | undefined;
  n(value: number): string;
}
//#endregion
export { VueI18nLocaleAdapter };