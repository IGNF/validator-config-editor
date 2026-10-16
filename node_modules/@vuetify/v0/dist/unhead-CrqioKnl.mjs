import { t as IN_BROWSER } from "./globals-Bxw-y98v.mjs";
import { isNull, isString } from "./utilities/index.mjs";
import { t as ThemeAdapter } from "./adapter-B6R54NMr.mjs";
import { watch } from "vue";
//#region src/composables/useTheme/adapters/unhead.ts
/**
* @module useTheme/adapters/unhead
*/
/**
* Theme adapter that manages CSS custom properties via @unhead.
* Best for SSR/SSG — the same <style> tag is rendered on the server
* and patched on the client, eliminating hydration flash.
*
* Requires @unhead/vue to be installed in the app.
*/
var V0UnheadThemeAdapter = class extends ThemeAdapter {
	entry;
	cspNonce;
	constructor(options = {}) {
		super(options.prefix ?? "v0");
		this.cspNonce = options.cspNonce;
		this.stylesheetId = options.stylesheetId ?? this.stylesheetId;
	}
	setup(app, context, target) {
		const head = app._context?.provides?.usehead ?? app._context?.provides?.head;
		if (head?.push) {
			const id = context.selectedId.value;
			this.entry = head.push({
				htmlAttrs: { "data-theme": id ? String(id) : "" },
				style: [{
					innerHTML: this.generate(context.colors.value, context.isDark.value),
					id: this.stylesheetId,
					...this.cspNonce ? { nonce: this.cspNonce } : {}
				}]
			});
		}
		if (IN_BROWSER) {
			let targetEl = null;
			if (!/* @__PURE__ */ isNull(target)) targetEl = target instanceof HTMLElement ? target : /* @__PURE__ */ isString(target) ? document.querySelector(target) : app._container || document.querySelector("#app") || document.body;
			if (targetEl && context.selectedId.value) targetEl.dataset.theme = String(context.selectedId.value);
			const stopWatch = watch([
				context.colors,
				context.isDark,
				context.selectedId
			], ([colors, isDark, id]) => {
				const themeStr = id ? String(id) : "";
				if (targetEl && themeStr && targetEl.dataset.theme !== themeStr) targetEl.dataset.theme = themeStr;
				this.entry?.patch?.({
					htmlAttrs: { "data-theme": themeStr },
					style: [{
						innerHTML: this.generate(colors, isDark),
						id: this.stylesheetId,
						...this.cspNonce ? { nonce: this.cspNonce } : {}
					}]
				});
			});
			this.dispose = () => {
				stopWatch();
				this.entry?.dispose?.();
			};
		} else {
			const stop = watch([
				context.colors,
				context.isDark,
				context.selectedId
			], ([colors, isDark, id]) => {
				this.entry?.patch?.({
					htmlAttrs: { "data-theme": id ? String(id) : "" },
					style: [{
						innerHTML: this.generate(colors, isDark),
						id: this.stylesheetId
					}]
				});
			});
			this.dispose = () => {
				stop();
				this.entry?.dispose?.();
			};
		}
	}
	update(colors, isDark) {
		if (!this.entry) return;
		this.entry.patch?.({ style: [{
			innerHTML: this.generate(colors, isDark),
			id: this.stylesheetId,
			...this.cspNonce ? { nonce: this.cspNonce } : {}
		}] });
	}
};
//#endregion
export { V0UnheadThemeAdapter as t };
