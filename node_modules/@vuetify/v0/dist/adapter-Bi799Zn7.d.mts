import { a as ID } from "./index-XNZrgWCq.mjs";
import { c as TokenTicket, i as TokenContext } from "./index-Dlr9_rf1.mjs";
import { Ref } from "vue";
//#region src/composables/useLocale/adapters/adapter.d.ts
interface LocaleAdapterContext {
  tokens: TokenContext<TokenTicket>;
  selectedId: Ref<ID | null | undefined>;
  fallbackLocale: ID | undefined;
  has: (id: ID) => boolean;
}
declare abstract class LocaleAdapter {
  abstract t(key: string, ...params: unknown[]): string;
  abstract ti(key: string, ...params: unknown[]): string | undefined;
  abstract n(value: number): string;
}
//#endregion
export { LocaleAdapterContext as n, LocaleAdapter as t };