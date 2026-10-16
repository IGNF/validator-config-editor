import { t as IN_BROWSER } from "./globals-Bxw-y98v.mjs";
import { isNull, isString } from "./utilities/index.mjs";
import { t as ThemeAdapter } from "./adapter-B6R54NMr.mjs";
import { watch } from "vue";
//#region src/composables/useTheme/adapters/v0.ts
/**
* Theme adapter that injects CSS custom properties via adoptedStyleSheets.
* Best for SPAs where SSR hydration is not a concern.
*/
var V0StyleSheetThemeAdapter = class extends ThemeAdapter {
	cspNonce;
	sheet;
	constructor(options = {}) {
		super(options.prefix ?? "v0");
		this.cspNonce = options.cspNonce;
		this.stylesheetId = options.stylesheetId ?? this.stylesheetId;
	}
	setup(app, context, target) {
		if (IN_BROWSER) {
			this.update(context.colors.value, context.isDark.value);
			const stopWatch = watch([context.colors, context.isDark], ([colors, isDark]) => {
				this.update(colors, isDark);
			});
			if (/* @__PURE__ */ isNull(target)) {
				this.dispose = () => {
					stopWatch();
					this.detach();
				};
				return;
			}
			const targetEl = target instanceof HTMLElement ? target : /* @__PURE__ */ isString(target) ? document.querySelector(target) : app._container || document.querySelector("#app") || document.body;
			if (!targetEl) {
				this.dispose = () => {
					stopWatch();
					this.detach();
				};
				return;
			}
			if (context.selectedId.value) targetEl.dataset.theme = String(context.selectedId.value);
			const stopTheme = watch(context.selectedId, (id) => {
				if (!id) return;
				targetEl.dataset.theme = String(id);
			});
			this.dispose = () => {
				stopWatch();
				stopTheme();
				this.detach();
			};
		} else {
			const head = app._context?.provides?.usehead ?? app._context?.provides?.head;
			if (head?.push) {
				const id = context.selectedId.value;
				const entry = head.push({
					htmlAttrs: { "data-theme": id ? String(id) : "" },
					style: [{
						innerHTML: this.generate(context.colors.value, context.isDark.value),
						id: this.stylesheetId,
						...this.cspNonce ? { nonce: this.cspNonce } : {}
					}]
				});
				const stop = watch([
					context.selectedId,
					context.colors,
					context.isDark
				], ([themeId, colors, isDark]) => {
					entry.patch?.({
						htmlAttrs: { "data-theme": themeId ? String(themeId) : "" },
						style: [{
							innerHTML: this.generate(colors, isDark),
							id: this.stylesheetId,
							...this.cspNonce ? { nonce: this.cspNonce } : {}
						}]
					});
				});
				this.dispose = () => {
					stop();
					entry.dispose?.();
				};
			}
		}
	}
	update(colors, isDark) {
		if (!IN_BROWSER) return;
		this.upsert(this.generate(colors, isDark));
	}
	upsert(styles) {
		if (!IN_BROWSER) return;
		if (!this.sheet) {
			this.sheet = new CSSStyleSheet();
			document.adoptedStyleSheets = [...document.adoptedStyleSheets, this.sheet];
		}
		this.sheet.replaceSync(styles);
	}
	detach() {
		if (!IN_BROWSER) return;
		document.adoptedStyleSheets = document.adoptedStyleSheets.filter((s) => s !== this.sheet);
		this.sheet = void 0;
	}
};
//#endregion
export { V0StyleSheetThemeAdapter as t };
