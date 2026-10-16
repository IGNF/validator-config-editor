import { n as PopoverAdapterContext, t as PopoverAdapter } from "../../../adapter-CbkRdMju.mjs";
import { Ref } from "vue";
import { Middleware } from "@floating-ui/dom";
//#region src/composables/usePopover/adapters/floating-ui.d.ts
interface FloatingUIPopoverAdapterOptions {
  /** Middleware passed to `computePosition`. @default `[offset(8), flip(), shift({ padding: 8 })]` */
  middleware?: Middleware[];
}
/**
 * JS-engine positioning adapter backed by `@floating-ui/dom`.
 *
 * `setup()` is re-entrant: a single shared instance (e.g. the one passed to
 * `createPopoverPlugin`) can serve every popover. Per-call state lives in the
 * setup closure, never on `this.dispose`.
 *
 * `positionTry` is ignored; `flip()` covers the overflow intent.
 */
declare class FloatingUIPopoverAdapter extends PopoverAdapter {
  private middleware;
  constructor(options?: FloatingUIPopoverAdapterOptions);
  setup(context: PopoverAdapterContext): Readonly<Ref<Record<string, string>>>;
}
//#endregion
export { FloatingUIPopoverAdapter, FloatingUIPopoverAdapterOptions };