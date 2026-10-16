import { t as IN_BROWSER } from "../../../globals-Bxw-y98v.mjs";
import { isNullOrUndefined } from "../../../utilities/index.mjs";
import { t as PopoverAdapter } from "../../../adapter-B5teFrQH.mjs";
import { onScopeDispose, shallowRef, watch } from "vue";
import { autoUpdate, computePosition, flip, offset, shift } from "@floating-ui/dom";
//#region src/composables/usePopover/adapters/floating-ui.ts
/**
* @module FloatingUIPopoverAdapter
*
* @remarks
* First-party [Floating UI](https://floating-ui.com) positioning adapter for
* `usePopover`. Subpath-only — import from
* `@vuetify/v0/popover/adapters/floating-ui`. Requires the `@floating-ui/dom`
* peer. `positionTry` is ignored; `flip()` covers the overflow intent.
*
* @example
* ```ts
* import { usePopover } from '@vuetify/v0'
* import { FloatingUIPopoverAdapter } from '@vuetify/v0/popover/adapters/floating-ui'
*
* const popover = usePopover({ adapter: new FloatingUIPopoverAdapter() })
* ```
*/
/**
* JS-engine positioning adapter backed by `@floating-ui/dom`.
*
* `setup()` is re-entrant: a single shared instance (e.g. the one passed to
* `createPopoverPlugin`) can serve every popover. Per-call state lives in the
* setup closure, never on `this.dispose`.
*
* `positionTry` is ignored; `flip()` covers the overflow intent.
*/
var FloatingUIPopoverAdapter = class extends PopoverAdapter {
	middleware;
	constructor(options) {
		super();
		this.middleware = options?.middleware ?? [
			offset(8),
			flip(),
			shift({ padding: 8 })
		];
	}
	setup(context) {
		function positionStyles(top, left) {
			return {
				position: "fixed",
				margin: "unset",
				inset: "unset",
				top,
				left
			};
		}
		const styles = shallowRef(positionStyles("0px", "0px"));
		const middleware = this.middleware;
		let stopAutoUpdate;
		async function reposition() {
			/* v8 ignore next -- SSR: no layout engine off-DOM */
			if (!IN_BROWSER) return;
			const anchor = context.anchorEl.value;
			const content = context.contentEl.value;
			if (/* @__PURE__ */ isNullOrUndefined(anchor) || /* @__PURE__ */ isNullOrUndefined(content)) return;
			if (!context.isOpen.value) return;
			const { side, align } = context.placement.value;
			const placement = align === "center" ? side : `${side}-${align}`;
			const { x, y } = await computePosition(anchor, content, {
				placement,
				strategy: "fixed",
				middleware
			});
			if (!context.isOpen.value) return;
			styles.value = positionStyles(`${y}px`, `${x}px`);
		}
		function sync() {
			stopAutoUpdate?.();
			stopAutoUpdate = void 0;
			/* v8 ignore next -- SSR: no layout engine off-DOM */
			if (!IN_BROWSER) return;
			const anchor = context.anchorEl.value;
			const content = context.contentEl.value;
			if (/* @__PURE__ */ isNullOrUndefined(anchor) || /* @__PURE__ */ isNullOrUndefined(content) || !context.isOpen.value) return;
			stopAutoUpdate = autoUpdate(anchor, content, reposition);
		}
		const stopWatch = watch([
			context.anchorEl,
			context.contentEl,
			context.isOpen,
			context.placement
		], sync, { immediate: true });
		function stop() {
			stopWatch();
			stopAutoUpdate?.();
			stopAutoUpdate = void 0;
		}
		onScopeDispose(stop, true);
		return styles;
	}
};
//#endregion
export { FloatingUIPopoverAdapter };
