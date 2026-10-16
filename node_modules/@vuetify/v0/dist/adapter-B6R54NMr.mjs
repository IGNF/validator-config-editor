import { V0Error, hexToRgb, isUndefined } from "./utilities/index.mjs";
//#region src/composables/useTheme/adapters/adapter.ts
var ThemeAdapter = class ThemeAdapter {
	/** CSS ident for theme ids, color keys, and the adapter prefix. */
	static SAFE_IDENT = /^[a-zA-Z0-9_-]+$/;
	/** Rejected inside theme color values before they are written to a stylesheet. */
	static UNSAFE_CSS = /url\s*\(|src\s*\(|image\s*\(|image-set\s*\(|cross-fade\s*\(|@import|expression\s*\(|[;{}<>\\]|\/\*/i;
	stylesheetId = "v0-theme-stylesheet";
	prefix;
	rgb = false;
	/**
	* Teardown registered by `setup`. Called once via `app.onUnmount` on the
	* plugin path and available as a reachable handle on standalone paths.
	*/
	dispose;
	constructor(prefix) {
		if (!ThemeAdapter.SAFE_IDENT.test(prefix)) throw new V0Error(`Invalid theme prefix: "${prefix}". Expected an identifier matching ${ThemeAdapter.SAFE_IDENT}.`, {
			code: "V0_THEME_INVALID_PREFIX",
			prefix
		});
		this.prefix = prefix;
	}
	generate(colors, isDark) {
		let css = "";
		for (const theme in colors) {
			const themeColors = colors[theme];
			if (!themeColors) continue;
			if (!ThemeAdapter.SAFE_IDENT.test(theme)) continue;
			const vars = Object.entries(themeColors).filter(([key, val]) => ThemeAdapter.SAFE_IDENT.test(key) && !ThemeAdapter.UNSAFE_CSS.test(val)).map(([key, val]) => `  --${this.prefix}-${key}: ${this.rgb ? this.decompose(val) : val};`).join("\n");
			css += `[data-theme="${theme}"] {\n${vars}\n}\n`;
		}
		if (!/* @__PURE__ */ isUndefined(isDark)) css += `:root {\n  color-scheme: ${isDark ? "dark" : "light"};\n}\n`;
		return css;
	}
	decompose(hex) {
		const { r, g, b, a } = /* @__PURE__ */ hexToRgb(hex);
		return /* @__PURE__ */ isUndefined(a) ? `${r}, ${g}, ${b}` : `${r}, ${g}, ${b}, ${a}`;
	}
};
//#endregion
export { ThemeAdapter as t };
