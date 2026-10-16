//#region src/composables/usePopover/adapters/adapter.ts
/**
* Positioning engine seam for `usePopover`. `V0PopoverAdapter` (the default)
* emits CSS anchor positioning and needs nothing installed. A consumer who
* wants a JS positioning library (floating-ui, Popper, or their own) extends
* this class and passes an instance via the `adapter` option.
*
* @see https://0.vuetifyjs.com/composables/system/use-popover
*/
var PopoverAdapter = class {
	/**
	* Optional instance teardown; read lazily when the popover's scope disposes.
	* Plugin-shared adapters must put per-popover cleanup in `setup()` +
	* `onScopeDispose`, never `this.dispose` — assigning `dispose` on a shared
	* instance clobbers the previous popover's teardown when `setup()` is
	* re-entered. First-party `FloatingUIPopoverAdapter` already follows this.
	*/
	dispose;
};
//#endregion
export { PopoverAdapter as t };
