import { isObject } from "../../../utilities/index.mjs";
import { t as LocaleAdapter } from "../../../adapter-BTNELv6-.mjs";
//#region src/composables/useLocale/adapters/vue-i18n.ts
/**
* Locale adapter that delegates to a vue-i18n instance.
*
* Composition API mode only (vue-i18n v10+ default).
* The adapter delegates `t()` and `n()` to `i18n.global`,
* preserving all vue-i18n features: pluralization, linked
* messages, datetime/number formatting, etc.
*/
var VueI18nLocaleAdapter = class extends LocaleAdapter {
	composer;
	constructor(i18n) {
		super();
		this.composer = i18n.global;
	}
	t(key, ...params) {
		if (params.length > 0 && /* @__PURE__ */ isObject(params[0])) return this.composer.t(key, params[0]);
		return params.length > 0 ? this.composer.t(key, params) : this.composer.t(key);
	}
	ti(key, ...params) {
		return this.composer.te(key) ? this.t(key, ...params) : void 0;
	}
	n(value) {
		return this.composer.n(value);
	}
};
//#endregion
export { VueI18nLocaleAdapter };
