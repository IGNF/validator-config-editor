import { isFunction } from "./utilities/index.mjs";
//#region src/composables/usePermissions/adapters/adapter.ts
var PermissionsAdapter = class {};
//#endregion
//#region src/composables/usePermissions/adapters/v0.ts
var V0PermissionsAdapter = class extends PermissionsAdapter {
	constructor() {
		super();
	}
	can(role, action, subject, context, permissions) {
		const access = `${role}.${action}.${subject}`;
		const ticket = permissions.get(access);
		if (!ticket || !ticket.value) return false;
		return /* @__PURE__ */ isFunction(ticket.value) ? ticket.value(context) : ticket.value;
	}
};
//#endregion
export { PermissionsAdapter as n, V0PermissionsAdapter as t };
