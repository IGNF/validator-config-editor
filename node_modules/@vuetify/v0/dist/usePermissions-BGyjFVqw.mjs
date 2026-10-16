import { UNSAFE_KEYS } from "./utilities/index.mjs";
import { n as createPluginContext } from "./createPlugin-YYkwbiUd.mjs";
import { t as createTokens } from "./createTokens-D-xtNt9m.mjs";
import { t as toArray } from "./toArray-DCZRopC6.mjs";
import { t as V0PermissionsAdapter } from "./v0-C4TLCYZJ.mjs";
//#region src/composables/usePermissions/index.ts
/**
* @module usePermissions
*
* @see https://0.vuetifyjs.com/composables/plugins/use-permissions
*
* @remarks
* Permission management composable with support for RBAC and ABAC patterns.
*
* Key features:
* - Role-Based Access Control (RBAC) support
* - Attribute-Based Access Control (ABAC) with context
* - Functional permission conditions
* - Token-based permission storage
* - Adapter pattern for custom permission systems
*
* Built on createTokens for flexible permission configuration.
*
* @example
* ```ts
* import { usePermissions } from '@vuetify/v0'
*
* const permissions = usePermissions()
* console.log(permissions.can('admin', 'edit', 'users'))
* ```
*/
/**
* Creates a new permissions instance.
*
* @param options The options for the permissions instance.
* @template Z The type of the permission ticket.
* @template E The type of the permission context.
* @returns A new permissions instance.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-permissions
*
* @example
* ```ts
* import { createPermissions } from '@vuetify/v0'
*
* const permissions = createPermissions({
*   permissions: {
*     admin: [['read', 'users']],
*     editor: [['edit', 'posts']],
*   },
* })
* ```
*/
function createPermissions(_options = {}) {
	const { adapter = new V0PermissionsAdapter(), permissions = {}, ...options } = _options;
	const record = {};
	for (const role in permissions) {
		if (UNSAFE_KEYS.has(role)) continue;
		if (!record[role]) record[role] = {};
		for (const [actions, subjects, condition = true] of permissions[role]) for (const action of /* @__PURE__ */ toArray(actions)) {
			if (UNSAFE_KEYS.has(action)) continue;
			for (const subject of /* @__PURE__ */ toArray(subjects)) {
				if (UNSAFE_KEYS.has(subject)) continue;
				if (!record[role][action]) record[role][action] = {};
				record[role][action][subject] = condition;
			}
		}
	}
	const tokens = createTokens(record, options);
	function can(id, action, subject, context = {}) {
		return adapter.can(id, action, subject, context, tokens);
	}
	return {
		...tokens,
		can,
		get size() {
			return tokens.size;
		}
	};
}
/**
* Creates a new permissions context.
*
* @param options The options for the permissions context.
* @template Z The type of the permission ticket.
* @template E The type of the permission context.
* @returns A new permissions context.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-permissions
*
* @example
* ```ts
* import { createPermissionsContext } from '@vuetify/v0'
*
* export const [usePermissions, providePermissions, context] = createPermissionsContext({
*   namespace: 'app:permissions',
*   permissions: {
*     admin: [['read', 'users'], ['edit', 'users']],
*     editor: [['edit', 'posts']],
*   },
* })
* ```
*/
function createPermissionsFallback() {
	return {
		size: 0,
		can: () => false
	};
}
const [createPermissionsContext, createPermissionsPlugin, usePermissions] = createPluginContext("v0:permissions", (options) => createPermissions(options), { fallback: () => createPermissionsFallback() });
/**
* Creates a new permissions plugin.
*
* @param options The options for the permissions plugin.
* @template Z The type of the permission ticket.
* @template E The type of the permission context.
* @returns A new permissions plugin.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-permissions
*
* @example
* ```ts
* import { createApp } from 'vue'
* import { createPermissionsPlugin } from '@vuetify/v0'
* import App from './App.vue'
*
* const app = createApp(App)
*
* app.use(
*   createPermissionsPlugin({
*     permissions: {
*       admin: [['read', 'users']],
*       editor: [['edit', 'posts']],
*     },
*   })
* )
*
* app.mount('#app')
* ```
*/
//#endregion
export { usePermissions as i, createPermissionsContext as n, createPermissionsPlugin as r, createPermissions as t };
