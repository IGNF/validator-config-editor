import { n as isSelfClosingTag } from "./htmlElements-Bt1XN_d8.mjs";
import { t as IN_BROWSER } from "./globals-Bxw-y98v.mjs";
import { clamp, isArray, isElement, isNull, isNullOrUndefined, isNumber, isObject, isString, isUndefined, pxToNumber, useId as useId$1 } from "./utilities/index.mjs";
import { n as createContext, r as provideContext } from "./createTrinity-DJROWgXU.mjs";
import { i as useLogger } from "./useLogger-BIAZ6Iyu.mjs";
import { t as createRegistry } from "./createRegistry-COW_AjH1.mjs";
import { t as createSelection } from "./createSelection-DQNMDMJj.mjs";
import { t as createSingle } from "./createSingle-BcLDttSx.mjs";
import { a as useLocale } from "./useLocale-cS3wOsyK.mjs";
import { n as useEventListener, t as useDocumentEventListener } from "./useEventListener-C1aOe4Iy.mjs";
import { C as createForm, D as createDataGrid, E as useRaf, G as useImage, H as createBreadcrumbs, K as createOverflow, L as useVirtualFocus, M as createCombobox, Q as useToggleScope, R as createStep, S as useIntersectionObserver, V as useProxyModel, X as useResizeObserver, Y as useElementSize, _ as createNumberField, c as useTooltip, g as usePresence, it as useClickOutside, j as useLazy, l as createSlider, n as createNested, nt as useStack, p as createProgress, rt as toElement, t as useRovingFocus, u as createRating, y as createInput } from "./useRovingFocus-CM5nGIFN.mjs";
import { i as useTheme } from "./useTheme-Dh-EW4wo.mjs";
import { t as createGroup } from "./createGroup-If8FlygQ.mjs";
import { t as useTimer } from "./useTimer-DxQCew2E.mjs";
import { i as usePopover, s as useDelay } from "./usePopover-Cf7z1gNt.mjs";
import { n as createPagination } from "./adapter-DMzQI6ma.mjs";
import { t as createDataTable } from "./createDataTable-DkLoaMq6.mjs";
import { i as useNotifications } from "./useNotifications-B2Q_Iiks.mjs";
import { Fragment, Teleport, TransitionGroup, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createPropsRestProxy, createTextVNode, createVNode, defineComponent, guardReactiveProps, mergeModels, mergeProps, nextTick, normalizeProps, normalizeStyle, onActivated, onBeforeUnmount, onDeactivated, onMounted, onScopeDispose, onUnmounted, openBlock, ref, renderList, renderSlot, resolveDynamicComponent, shallowReadonly, shallowRef, toDisplayString, toRef, toValue, unref, useAttrs, useModel, useTemplateRef, vShow, watch, watchEffect, withCtx, withDirectives } from "vue";
//#region src/components/Atom/Atom.vue
/**
* @module Atom
*
* @see https://0.vuetifyjs.com/components/primitives/atom
*
* @remarks
* Foundation component providing polymorphic rendering with three modes:
* 1. **Element Mode** (default): Renders as any HTML element via the `as` prop
* 2. **Renderless Mode**: Renders slot content directly without wrapper
* 3. **Null Mode**: Equivalent to renderless when `as={null}`
*
* Key features:
* - Polymorphic element rendering (div, button, span, etc.)
* - Self-closing tag detection (img, input, br, hr, etc.)
* - Automatic attribute forwarding to rendered element
* - Generic slot props typing for type-safe attribute passing
* - Template ref exposure for DOM element access
* - Renderless mode for maximum flexibility
*
* The Atom component is the lowest-level primitive in the component system,
* serving as the foundation for all other components that need polymorphic
* rendering capabilities.
*/
const _sfc_main$192 = /*@__PURE__*/ defineComponent({
	name: "Atom",
	__name: "Atom",
	props: {
		as: { default: "div" },
		renderless: {
			type: Boolean,
			default: false
		}
	},
	setup(__props, { expose: __expose }) {
		const element = useTemplateRef("element");
		__expose({ element });
		const attrs = useAttrs();
		const isSelfClosing = toRef(() => /* @__PURE__ */ isString(__props.as) && /* @__PURE__ */ isSelfClosingTag(__props.as));
		const slotProps = toRef(() => attrs);
		return (_ctx, _cache) => {
			return __props.renderless || unref(isNull)(__props.as) ? renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)), void 0, void 0, 0) : !isSelfClosing.value ? (openBlock(), createBlock(resolveDynamicComponent(__props.as), mergeProps({ key: 1 }, slotProps.value, {
				ref_key: "element",
				ref: element
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16)) : (openBlock(), createBlock(resolveDynamicComponent(__props.as), mergeProps({
				key: 2,
				ref_key: "element",
				ref: element
			}, slotProps.value), null, 16));
		};
	}
});
//#endregion
//#region src/components/Alert/AlertDescription.vue
const _sfc_main$191 = /*@__PURE__*/ defineComponent({
	name: "AlertDescription",
	__name: "AlertDescription",
	props: {
		as: { default: "p" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const slotProps = toRef(() => ({ attrs: {} }));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Alert/AlertRoot.vue
const _sfc_main$190 = /*@__PURE__*/ defineComponent({
	name: "AlertRoot",
	__name: "AlertRoot",
	props: {
		role: { default: "alert" },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const slotProps = toRef(() => ({ attrs: {
			"aria-atomic": true,
			"aria-live": __props.role === "alert" ? "assertive" : "polite",
			role: __props.role
		} }));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Alert/AlertTitle.vue
const _sfc_main$189 = /*@__PURE__*/ defineComponent({
	name: "AlertTitle",
	__name: "AlertTitle",
	props: {
		as: { default: "p" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const slotProps = toRef(() => ({ attrs: {} }));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Alert/index.ts
/**
* Alert compound component for inline status messages.
*
* Renders a live region (`role="alert"` by default) that screen readers
* announce when content is inserted or updated. Use `Alert.Root`,
* `Alert.Title`, and `Alert.Description` to compose structured alerts.
*
* @see https://0.vuetifyjs.com/components/semantic/alert
*
* @example
* ```vue
* <script setup lang="ts">
*   import { Alert } from '@vuetify/v0'
* <\/script>
*
* <template>
*   <Alert.Root>
*     <Alert.Title>Session expiring</Alert.Title>
*
*     <Alert.Description>You will be signed out in 5 minutes.</Alert.Description>
*   </Alert.Root>
* </template>
* ```
*/
const Alert = {
	/**
	* Root live-region container. Defaults to `role="alert"` (assertive).
	* Set `role="status"` for polite, non-urgent messages.
	*
	* @see https://0.vuetifyjs.com/components/semantic/alert
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Alert } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Alert.Root>
	*     <Alert.Title>Session expiring</Alert.Title>
	*     <Alert.Description>You will be signed out in 5 minutes.</Alert.Description>
	*   </Alert.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$190,
	/**
	* Title for the alert. Renders as `<p>` by default.
	*
	* @see https://0.vuetifyjs.com/components/semantic/alert
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Alert } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Alert.Title>Session expiring</Alert.Title>
	* </template>
	* ```
	*/
	Title: _sfc_main$189,
	/**
	* Description body for the alert. Renders as `<p>` by default.
	*
	* @see https://0.vuetifyjs.com/components/semantic/alert
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Alert } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Alert.Description>You will be signed out in 5 minutes.</Alert.Description>
	* </template>
	* ```
	*/
	Description: _sfc_main$191
};
//#endregion
//#region src/components/AlertDialog/AlertDialogRoot.vue
const [useAlertDialogContext, provideAlertDialogContext] = createContext();
const _sfc_main$188 = /*@__PURE__*/ defineComponent({
	name: "AlertDialogRoot",
	__name: "AlertDialogRoot",
	props: /*@__PURE__*/ mergeModels({
		namespace: { default: "v0:alert-dialog" },
		id: {},
		as: { default: null },
		renderless: { type: Boolean }
	}, {
		"modelValue": {
			type: Boolean,
			default: false
		},
		"modelModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["update:model-value"], ["update:modelValue"]),
	setup(__props) {
		const id = __props.id ?? /* @__PURE__ */ useId$1();
		const isOpen = useModel(__props, "modelValue");
		const isPending = shallowRef(false);
		const cancelEl = shallowRef(null);
		const titleId = `${id}-title`;
		const descriptionId = `${id}-description`;
		const hasTitle = shallowRef(false);
		const hasDescription = shallowRef(false);
		function open() {
			isOpen.value = true;
		}
		function close() {
			isPending.value = false;
			isOpen.value = false;
		}
		provideAlertDialogContext(__props.namespace, {
			isOpen,
			id,
			titleId,
			descriptionId,
			hasTitle,
			hasDescription,
			isPending,
			cancelEl,
			open,
			close
		});
		const slotProps = toRef(() => ({
			id,
			isOpen: isOpen.value,
			isPending: isPending.value,
			open,
			close
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), {
				as: __props.as,
				renderless: ""
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 8, ["as"]);
		};
	}
});
//#endregion
//#region src/components/AlertDialog/AlertDialogAction.vue
const _sfc_main$187 = /*@__PURE__*/ defineComponent({
	name: "AlertDialogAction",
	__name: "AlertDialogAction",
	props: {
		namespace: { default: "v0:alert-dialog" },
		disabled: {
			type: Boolean,
			default: false
		},
		as: { default: "button" },
		renderless: { type: Boolean }
	},
	emits: ["action"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const context = useAlertDialogContext(__props.namespace);
		function onClick() {
			if (__props.disabled) return;
			let waited = false;
			emit("action", {
				wait() {
					waited = true;
					context.isPending.value = true;
				},
				close() {
					context.isPending.value = false;
					context.close();
				}
			});
			if (!waited) context.close();
		}
		function onKeydown(e) {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onClick();
			}
		}
		const slotProps = toRef(() => ({
			isPending: context.isPending.value,
			attrs: {
				"type": __props.as === "button" ? "button" : void 0,
				"role": __props.as === "button" ? void 0 : "button",
				"tabindex": __props.disabled ? -1 : 0,
				"disabled": __props.as === "button" ? __props.disabled || void 0 : void 0,
				"data-disabled": __props.disabled ? "" : void 0,
				"data-pending": context.isPending.value ? "" : void 0,
				"onClick": onClick,
				"onKeydown": __props.as === "button" ? void 0 : onKeydown
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/AlertDialog/AlertDialogActivator.vue
const _sfc_main$186 = /*@__PURE__*/ defineComponent({
	name: "AlertDialogActivator",
	__name: "AlertDialogActivator",
	props: {
		namespace: { default: "v0:alert-dialog" },
		as: { default: "button" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useAlertDialogContext(__props.namespace);
		function onClick() {
			context.open();
		}
		function onKeydown(e) {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onClick();
			}
		}
		const slotProps = toRef(() => ({
			isOpen: context.isOpen.value,
			attrs: {
				"type": __props.as === "button" ? "button" : void 0,
				"role": __props.as === "button" ? void 0 : "button",
				"tabindex": 0,
				"aria-haspopup": "dialog",
				"aria-expanded": context.isOpen.value,
				"data-open": context.isOpen.value || void 0,
				"onClick": onClick,
				"onKeydown": __props.as === "button" ? void 0 : onKeydown
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/AlertDialog/AlertDialogCancel.vue
const _sfc_main$185 = /*@__PURE__*/ defineComponent({
	name: "AlertDialogCancel",
	__name: "AlertDialogCancel",
	props: {
		namespace: { default: "v0:alert-dialog" },
		disabled: {
			type: Boolean,
			default: false
		},
		as: { default: "button" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useAlertDialogContext(__props.namespace);
		const cancelRef = useTemplateRef("cancel");
		onMounted(() => {
			context.cancelEl.value = cancelRef.value?.element ?? null;
		});
		onUnmounted(() => {
			context.cancelEl.value = null;
		});
		function onClick() {
			if (__props.disabled) return;
			context.close();
		}
		function onKeydown(e) {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onClick();
			}
		}
		const slotProps = toRef(() => ({
			isOpen: context.isOpen.value,
			attrs: {
				"type": __props.as === "button" ? "button" : void 0,
				"role": __props.as === "button" ? void 0 : "button",
				"tabindex": __props.disabled ? -1 : 0,
				"disabled": __props.as === "button" ? __props.disabled || void 0 : void 0,
				"data-disabled": __props.disabled ? "" : void 0,
				"onClick": onClick,
				"onKeydown": __props.as === "button" ? void 0 : onKeydown
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				ref: "cancel",
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/AlertDialog/AlertDialogClose.vue
const _sfc_main$184 = /*@__PURE__*/ defineComponent({
	name: "AlertDialogClose",
	__name: "AlertDialogClose",
	props: {
		namespace: { default: "v0:alert-dialog" },
		as: { default: "button" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useAlertDialogContext(__props.namespace);
		const locale = useLocale();
		function onClick() {
			context.close();
		}
		function onKeydown(e) {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onClick();
			}
		}
		const slotProps = toRef(() => ({
			isOpen: context.isOpen.value,
			attrs: {
				"type": __props.as === "button" ? "button" : void 0,
				"role": __props.as === "button" ? void 0 : "button",
				"tabindex": 0,
				"aria-label": locale.ti("AlertDialog.close") ?? "Close",
				"onClick": onClick,
				"onKeydown": __props.as === "button" ? void 0 : onKeydown
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/AlertDialog/AlertDialogContent.vue
const _sfc_main$183 = /*@__PURE__*/ defineComponent({
	name: "AlertDialogContent",
	__name: "AlertDialogContent",
	props: {
		namespace: { default: "v0:alert-dialog" },
		closeOnClickOutside: {
			type: Boolean,
			default: false
		},
		closeOnEscape: {
			type: Boolean,
			default: false
		},
		blocking: {
			type: Boolean,
			default: false
		},
		as: { default: "dialog" },
		renderless: { type: Boolean }
	},
	emits: ["cancel", "close"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const context = useAlertDialogContext(__props.namespace);
		const contentRef = useTemplateRef("content");
		const ticket = useStack().register({
			onDismiss: () => context.close(),
			blocking: () => __props.blocking,
			el: () => contentRef.value?.element
		});
		watch(context.isOpen, (isOpen) => {
			if (isOpen) ticket.select();
			else ticket.unselect();
		}, { immediate: true });
		function focusCancel() {
			context.cancelEl.value?.focus();
		}
		watch(context.isOpen, (isOpen) => {
			const element = contentRef.value?.element;
			/* v8 ignore next -- defensive guard, element is always present after mount */
			if (!element) return;
			if (isOpen) {
				element.showModal?.();
				focusCancel();
			} else element.close?.();
		});
		onMounted(() => {
			if (context.isOpen.value) {
				(contentRef.value?.element)?.showModal();
				focusCancel();
			}
		});
		useToggleScope(
			() => __props.closeOnClickOutside && context.isOpen.value,
			/* v8 ignore start -- callback tested via useClickOutside */
			() => {
				useClickOutside(() => contentRef.value?.element, () => context.close(), { bounds: true });
			}
			/* v8 ignore stop */
		);
		function onCancel(e) {
			if (!__props.closeOnEscape) {
				e.preventDefault();
				return;
			}
			context.close();
			emit("cancel", e);
		}
		function onClose(e) {
			context.close();
			emit("close", e);
		}
		const slotProps = toRef(() => ({
			isOpen: context.isOpen.value,
			globalTop: ticket.globalTop.value,
			zIndex: ticket.zIndex.value,
			attrs: {
				"id": context.id,
				"role": "alertdialog",
				"aria-modal": "true",
				"aria-labelledby": context.hasTitle.value ? context.titleId : void 0,
				"aria-describedby": context.hasDescription.value ? context.descriptionId : void 0,
				"style": { zIndex: ticket.zIndex.value },
				"onCancel": onCancel,
				"onClose": onClose
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				ref: "content",
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/AlertDialog/AlertDialogDescription.vue
const _sfc_main$182 = /*@__PURE__*/ defineComponent({
	name: "AlertDialogDescription",
	__name: "AlertDialogDescription",
	props: {
		namespace: { default: "v0:alert-dialog" },
		as: { default: "p" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useAlertDialogContext(__props.namespace);
		onMounted(() => {
			context.hasDescription.value = true;
		});
		onBeforeUnmount(() => {
			context.hasDescription.value = false;
		});
		const slotProps = toRef(() => ({ attrs: { id: context.descriptionId } }));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/AlertDialog/AlertDialogTitle.vue
const _sfc_main$181 = /*@__PURE__*/ defineComponent({
	name: "AlertDialogTitle",
	__name: "AlertDialogTitle",
	props: {
		namespace: { default: "v0:alert-dialog" },
		as: { default: "h2" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useAlertDialogContext(__props.namespace);
		onMounted(() => {
			context.hasTitle.value = true;
		});
		onBeforeUnmount(() => {
			context.hasTitle.value = false;
		});
		const slotProps = toRef(() => ({ attrs: { id: context.titleId } }));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/AlertDialog/index.ts
/**
* AlertDialog component with sub-components for building confirmation dialogs.
*
* @see https://0.vuetifyjs.com/components/disclosure/alert-dialog
*
* @example
* ```vue
* <script lang="ts" setup>
*   import { AlertDialog } from '@vuetify/v0'
* <\/script>
*
* <template>
*   <AlertDialog.Root>
*     <AlertDialog.Activator>
*       Delete Item
*     </AlertDialog.Activator>
*
*     <AlertDialog.Content>
*       <AlertDialog.Title>Are you sure?</AlertDialog.Title>
*       <AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
*
*       <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
*       <AlertDialog.Action>Confirm</AlertDialog.Action>
*     </AlertDialog.Content>
*   </AlertDialog.Root>
* </template>
* ```
*/
const AlertDialog = {
	/**
	* Root component for alert dialogs.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/alert-dialog
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { AlertDialog } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <AlertDialog.Root>
	*     <AlertDialog.Activator>Delete</AlertDialog.Activator>
	*     <AlertDialog.Content>
	*       <AlertDialog.Title>Are you sure?</AlertDialog.Title>
	*       <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
	*       <AlertDialog.Action>Confirm</AlertDialog.Action>
	*     </AlertDialog.Content>
	*   </AlertDialog.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$188,
	/**
	* Activator component that opens the alert dialog.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/alert-dialog
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { AlertDialog } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <AlertDialog.Activator>
	*     Delete Item
	*   </AlertDialog.Activator>
	* </template>
	* ```
	*/
	Activator: _sfc_main$186,
	/**
	* Content container for the alert dialog using native `<dialog>` element.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/alert-dialog
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { AlertDialog } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <AlertDialog.Content>
	*     <AlertDialog.Title>Are you sure?</AlertDialog.Title>
	*     <AlertDialog.Description>This cannot be undone.</AlertDialog.Description>
	*     <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
	*     <AlertDialog.Action>Confirm</AlertDialog.Action>
	*   </AlertDialog.Content>
	* </template>
	* ```
	*/
	Content: _sfc_main$183,
	/**
	* Title component for accessible alert dialog labeling.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/alert-dialog
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { AlertDialog } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <AlertDialog.Title>Are you sure?</AlertDialog.Title>
	* </template>
	* ```
	*/
	Title: _sfc_main$181,
	/**
	* Description component for accessible alert dialog description.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/alert-dialog
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { AlertDialog } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <AlertDialog.Description>
	*     This action cannot be undone.
	*   </AlertDialog.Description>
	* </template>
	* ```
	*/
	Description: _sfc_main$182,
	/**
	* Cancel button component for dismissing the alert dialog.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/alert-dialog
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { AlertDialog } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
	* </template>
	* ```
	*/
	Cancel: _sfc_main$185,
	/**
	* Close button component for closing the alert dialog.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/alert-dialog
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { AlertDialog } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <AlertDialog.Close>Close</AlertDialog.Close>
	* </template>
	* ```
	*/
	Close: _sfc_main$184,
	/**
	* Action button component for confirming the alert dialog.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/alert-dialog
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { AlertDialog } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <AlertDialog.Action>Confirm</AlertDialog.Action>
	* </template>
	* ```
	*/
	Action: _sfc_main$187
};
//#endregion
//#region src/components/AspectRatio/AspectRatio.vue
const _sfc_main$180 = /*@__PURE__*/ defineComponent({
	name: "AspectRatio",
	__name: "AspectRatio",
	props: {
		ratio: { default: 1 },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const resolved = toRef(() => /* @__PURE__ */ isNumber(__props.ratio) ? String(__props.ratio) : __props.ratio);
		const slotProps = toRef(() => ({
			ratio: resolved.value,
			attrs: { style: { aspectRatio: resolved.value } }
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Avatar/AvatarGroup.vue
const [useAvatarGroup, provideAvatarGroup] = createContext();
const _sfc_main$179 = /*@__PURE__*/ defineComponent({
	name: "AvatarGroup",
	__name: "AvatarGroup",
	props: {
		namespace: { default: "v0:avatar:group" },
		max: {},
		responsive: {
			type: Boolean,
			default: false
		},
		priority: { default: "start" },
		gap: { default: 0 },
		label: {},
		ariaLabelledby: {},
		ariaDescribedby: {},
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const registry = createRegistry({ reactive: true });
		const indicatorWidth = shallowRef(0);
		const itemWidth = shallowRef(0);
		const overflow = shallowRef(null);
		const containerRef = useTemplateRef("container");
		useToggleScope(() => __props.responsive, () => {
			overflow.value = createOverflow({
				container: () => /* @__PURE__ */ toElement(containerRef.value?.element) ?? null,
				gap: () => __props.gap,
				reserved: indicatorWidth,
				itemWidth,
				reverse: () => __props.priority === "end"
			});
			onScopeDispose(() => {
				overflow.value = null;
			});
		});
		function isVisible(index) {
			const tickets = registry.values();
			const ticket = tickets[index];
			if (!ticket) return true;
			if (toValue(ticket.disabled)) return true;
			const widthCap = overflow.value?.capacity.value ?? Infinity;
			const cap = Math.min(__props.max ?? Infinity, widthCap);
			if (cap === Infinity) return true;
			let rank = 0;
			let total = 0;
			for (const [i, t] of tickets.entries()) {
				if (toValue(t.disabled)) continue;
				if (i === index) rank = total;
				total++;
			}
			return __props.priority === "end" ? rank >= total - cap : rank < cap;
		}
		const tickets = toRef(() => registry.values());
		const enabledCount = toRef(() => {
			let n = 0;
			for (const t of tickets.value) if (!toValue(t.disabled)) n++;
			return n;
		});
		const visibleCount = toRef(() => {
			let n = 0;
			for (let i = 0; i < tickets.value.length; i++) {
				const t = tickets.value[i];
				if (toValue(t.disabled)) continue;
				if (isVisible(i)) n++;
			}
			return n;
		});
		const hidden = toRef(() => tickets.value.filter((_, i) => !isVisible(i)));
		const isOverflowing = toRef(() => {
			if (overflow.value) return overflow.value.isOverflowing.value;
			return enabledCount.value > (__props.max ?? Infinity);
		});
		provideAvatarGroup(__props.namespace, {
			registry,
			max: toRef(() => __props.max),
			responsive: toRef(() => __props.responsive),
			priority: toRef(() => __props.priority),
			indicatorWidth,
			itemWidth,
			overflow,
			isOverflowing,
			isVisible
		});
		const slotProps = toRef(() => ({
			total: enabledCount.value,
			visible: visibleCount.value,
			hidden: hidden.value,
			isOverflowing: isOverflowing.value,
			attrs: {
				"role": "group",
				"aria-label": __props.label || void 0,
				"aria-labelledby": __props.ariaLabelledby || void 0,
				"aria-describedby": __props.ariaDescribedby || void 0,
				"data-overflow": isOverflowing.value || void 0,
				"data-priority": __props.priority
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({ ref: "container" }, slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Avatar/AvatarRoot.vue
const [useAvatarRoot, provideAvatarRoot] = createContext();
const _sfc_main$178 = /*@__PURE__*/ defineComponent({
	name: "AvatarRoot",
	__name: "AvatarRoot",
	props: {
		namespace: { default: "v0:avatar" },
		value: {},
		disabled: {
			type: Boolean,
			default: false
		},
		groupNamespace: { default: "v0:avatar:group" },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const selection = createSelection({
			mandatory: "force",
			multiple: false
		});
		provideAvatarRoot(__props.namespace, selection);
		const group = useAvatarGroup(__props.groupNamespace, null);
		const atomRef = useTemplateRef("atom");
		const el = toRef(() => /* @__PURE__ */ toElement(atomRef.value?.element) ?? null);
		const ticket = group?.registry.register({
			value: __props.value,
			disabled: toRef(() => __props.disabled),
			el
		});
		function measure() {
			if (!group || !ticket || !IN_BROWSER || !el.value) return;
			const w = el.value.offsetWidth;
			if (w === 0) return;
			group.itemWidth.value = w;
		}
		let last = null;
		useToggleScope(() => !!group && group.responsive.value, () => {
			useResizeObserver(el, () => measure());
			watch(() => [el.value, ticket?.index], ([element, index]) => {
				measure();
				if (/* @__PURE__ */ isNullOrUndefined(index)) return;
				if (!/* @__PURE__ */ isNull(last) && last !== index) group?.overflow.value?.measure(last, void 0);
				last = index;
				group?.overflow.value?.measure(index, element ?? void 0);
			}, { immediate: true });
		});
		onBeforeUnmount(() => {
			if (!/* @__PURE__ */ isNull(last)) group?.overflow.value?.measure(last, void 0);
			ticket?.unregister();
		});
		const isHidden = toRef(() => !!ticket && !group.isVisible(ticket.index));
		const index = toRef(() => ticket?.index ?? 0);
		const slotProps = toRef(() => ({
			isHidden: isHidden.value,
			index: index.value
		}));
		const inGroup = !/* @__PURE__ */ isNullOrUndefined(group);
		return (_ctx, _cache) => {
			return withDirectives((openBlock(), createBlock(unref(_sfc_main$192), {
				ref: "atom",
				"aria-hidden": isHidden.value || void 0,
				as: __props.as,
				"data-hidden": isHidden.value || void 0,
				"data-index": inGroup ? index.value : void 0,
				renderless: __props.renderless
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 8, [
				"aria-hidden",
				"as",
				"data-hidden",
				"data-index",
				"renderless"
			])), [[vShow, !isHidden.value]]);
		};
	}
});
//#endregion
//#region src/components/Avatar/AvatarFallback.vue
const _sfc_main$177 = /*@__PURE__*/ defineComponent({
	name: "AvatarFallback",
	__name: "AvatarFallback",
	props: {
		namespace: { default: "v0:avatar" },
		as: { default: "span" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useAvatarRoot(__props.namespace);
		const ticket = context.register({ type: "fallback" });
		const slotProps = toRef(() => ({ isSelected: ticket.isSelected.value }));
		onBeforeUnmount(() => context.unregister(ticket.id));
		return (_ctx, _cache) => {
			return unref(ticket).isSelected.value ? (openBlock(), createBlock(unref(_sfc_main$192), {
				key: 0,
				as: __props.as,
				renderless: __props.renderless
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 8, ["as", "renderless"])) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region src/components/Avatar/AvatarImage.vue
const _sfc_main$176 = /*@__PURE__*/ defineComponent({
	name: "AvatarImage",
	__name: "AvatarImage",
	props: {
		src: {},
		alt: {},
		priority: { default: 0 },
		namespace: { default: "v0:avatar" },
		as: { default: "img" },
		renderless: { type: Boolean }
	},
	emits: ["load", "error"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const context = useAvatarRoot(__props.namespace);
		const image = useImage({ src: toRef(() => __props.src) });
		const ticket = context.register({
			priority: __props.priority,
			type: "image",
			disabled: true
		});
		function onLoad(e) {
			image.onLoad(e);
			emit("load", e);
		}
		function onError(e) {
			image.onError(e);
			emit("error", e);
		}
		function selectBest() {
			let best;
			for (const candidate of context.values()) {
				if (candidate.type !== "image" || toValue(candidate.disabled)) continue;
				if (!best || (candidate.priority ?? 0) > (best.priority ?? 0)) best = candidate;
			}
			const target = best ?? context.seek("first");
			if (target) context.select(target.id);
		}
		watch(image.isLoaded, (isLoaded) => {
			if (isLoaded) {
				ticket.disabled = false;
				selectBest();
			}
		});
		watch(image.isError, (isError) => {
			if (isError) {
				ticket.disabled = true;
				selectBest();
			}
		});
		onBeforeUnmount(() => {
			context.unregister(ticket.id);
		});
		const slotProps = toRef(() => ({
			isSelected: ticket.isSelected.value,
			status: image.status.value,
			isLoaded: image.isLoaded.value,
			isError: image.isError.value,
			retry: image.retry,
			attrs: {
				role: "img",
				src: image.source.value,
				alt: __props.alt,
				onLoad,
				onError
			}
		}));
		return (_ctx, _cache) => {
			return withDirectives((openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"])), [[vShow, unref(ticket).isSelected.value]]);
		};
	}
});
//#endregion
//#region src/components/Avatar/AvatarIndicator.vue
/**
* @module AvatarIndicator
*
* @see https://0.vuetifyjs.com/components/semantic/avatar
*
* @remarks
* Renders a "+N" indicator when an enclosing Avatar.Group truncates its
* children. Silently renders nothing outside a group, and renders nothing
* when the group is not overflowing. When the group's `responsive` flag
* is set, this component self-measures and feeds its width back to the
* group so createOverflow can reserve space for it (wired in Task 4).
*/
const _sfc_main$175 = /*@__PURE__*/ defineComponent({
	name: "AvatarIndicator",
	__name: "AvatarIndicator",
	props: {
		namespace: { default: "v0:avatar:group" },
		as: { default: "span" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const LABEL_KEY = "Avatar.indicatorLabel";
		const group = useAvatarGroup(__props.namespace, null);
		const locale = useLocale();
		const atomRef = useTemplateRef("atom");
		const el = toRef(() => /* @__PURE__ */ toElement(atomRef.value?.element) ?? null);
		function measure() {
			if (!group || !IN_BROWSER || !el.value) {
				if (group) group.indicatorWidth.value = 0;
				return;
			}
			const style = getComputedStyle(el.value);
			const marginX = /* @__PURE__ */ pxToNumber(style.marginLeft) + /* @__PURE__ */ pxToNumber(style.marginRight);
			group.indicatorWidth.value = (el.value.offsetWidth || 0) + marginX;
		}
		useToggleScope(() => !!group && group.responsive.value, () => {
			watch(el, () => measure(), { immediate: true });
			useResizeObserver(el, () => measure());
		});
		onBeforeUnmount(() => {
			if (group) group.indicatorWidth.value = 0;
		});
		const hidden = toRef(() => {
			if (!group) return [];
			return group.registry.values().filter((_, i) => !group.isVisible(i));
		});
		const count = toRef(() => hidden.value.length);
		const slotProps = toRef(() => {
			const ariaLabel = locale.ti(LABEL_KEY, { count: count.value }) ?? `+${count.value} more`;
			return {
				count: count.value,
				hidden: hidden.value,
				attrs: {
					"aria-label": ariaLabel,
					"aria-live": "polite",
					"data-overflow-indicator": "true"
				}
			};
		});
		return (_ctx, _cache) => {
			return unref(group) && count.value > 0 ? (openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				key: 0,
				ref: "atom"
			}, slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"])) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region src/components/Avatar/index.ts
/**
* Avatar component with sub-components for building avatars.
*
* @see https://0.vuetifyjs.com/components/semantic/avatar
*/
const Avatar = {
	/**
	* Root component for avatars.
	*
	* @see https://0.vuetifyjs.com/components/semantic/avatar
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Avatar } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Avatar.Root>
	*     <Avatar.Image src="/avatar.jpg" />
	*
	*     <Avatar.Fallback>JD</Avatar.Fallback>
	*   </Avatar.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$178,
	/**
	* Image inside an Avatar.Root. Registers with the avatar's image
	* selection and shows when loaded.
	*
	* @see https://0.vuetifyjs.com/components/semantic/avatar
	*/
	Image: _sfc_main$176,
	/**
	* Fallback content when no image is loaded.
	*
	* @see https://0.vuetifyjs.com/components/semantic/avatar
	*/
	Fallback: _sfc_main$177,
	/**
	* Group container for stacked / collapsing avatars. Owns the visibility
	* math driven by `max` and (optionally) width-based truncation.
	*
	* @see https://0.vuetifyjs.com/components/semantic/avatar
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Avatar } from '@vuetify/v0'
	*   const users = [{ id: 1, initials: 'JD' }, { id: 2, initials: 'KW' }]
	* <\/script>
	*
	* <template>
	*   <Avatar.Group :max="4">
	*     <Avatar.Root v-for="u in users" :key="u.id" :value="u.id">
	*       <Avatar.Fallback>{{ u.initials }}</Avatar.Fallback>
	*     </Avatar.Root>
	*
	*     <Avatar.Indicator v-slot="{ count }">
	*       +{{ count }}
	*     </Avatar.Indicator>
	*   </Avatar.Group>
	* </template>
	* ```
	*/
	Group: _sfc_main$179,
	/**
	* Overflow indicator for Avatar.Group. Renders only when items are
	* hidden. Slot receives the hidden count and hidden tickets.
	*
	* @see https://0.vuetifyjs.com/components/semantic/avatar
	*/
	Indicator: _sfc_main$175
};
//#endregion
//#region src/components/Breadcrumbs/BreadcrumbsRoot.vue
const [useBreadcrumbsRoot, provideBreadcrumbsRoot] = createContext();
const _sfc_main$174 = /*@__PURE__*/ defineComponent({
	name: "BreadcrumbsRoot",
	__name: "BreadcrumbsRoot",
	props: {
		namespace: { default: "v0:breadcrumbs" },
		divider: { default: "/" },
		ellipsis: { default: "…" },
		gap: { default: 8 },
		label: {},
		as: { default: "nav" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const locale = useLocale();
		const containerRef = useTemplateRef("container");
		const breadcrumbs = createBreadcrumbs({ enroll: true });
		const group = createGroup({
			enroll: true,
			multiple: true,
			reactive: true
		});
		const ellipsisWidth = shallowRef(0);
		const firstItemWidth = shallowRef(0);
		const firstDividerWidth = shallowRef(0);
		const overflow = createOverflow({
			container: () => containerRef.value?.element,
			gap: () => __props.gap,
			reserved: () => {
				let r = 0;
				if (firstItemWidth.value > 0) r += firstItemWidth.value + __props.gap;
				if (firstDividerWidth.value > 0) r += firstDividerWidth.value + __props.gap;
				if (ellipsisWidth.value > 0) r += ellipsisWidth.value + __props.gap;
				return r;
			},
			reverse: true
		});
		const isOverflowing = overflow.isOverflowing;
		const hasActivator = toRef(() => group.values().some((t) => t.type === "activator"));
		const expanded = shallowRef(false);
		const hiddenCount = shallowRef(0);
		let _firstItemIndex = null;
		let _firstDividerIndex = null;
		function measureToRef(el, target) {
			if (!IN_BROWSER || !el) {
				target.value = 0;
				return;
			}
			const htmlEl = el;
			const style = getComputedStyle(htmlEl);
			const marginX = /* @__PURE__ */ pxToNumber(style.marginLeft) + /* @__PURE__ */ pxToNumber(style.marginRight);
			target.value = (htmlEl.offsetWidth || 0) + marginX;
		}
		function measureElement(index, type, el) {
			if (type === "item" && (/* @__PURE__ */ isNull(_firstItemIndex) || index <= _firstItemIndex)) {
				_firstItemIndex = el ? index : null;
				measureToRef(el, firstItemWidth);
				return;
			}
			if (type === "divider" && (/* @__PURE__ */ isNull(_firstDividerIndex) || index <= _firstDividerIndex)) {
				_firstDividerIndex = el ? index : null;
				measureToRef(el, firstDividerWidth);
				return;
			}
			overflow.measure(index, el);
		}
		watch([
			() => overflow.capacity.value,
			() => group.size,
			expanded
		], ([capacity]) => {
			const all = group.values();
			const contentTickets = [];
			const ellipsisTickets = [];
			for (const ticket of all) {
				if (ticket.type === "activator") continue;
				if (ticket.type === "ellipsis") ellipsisTickets.push(ticket);
				else contentTickets.push(ticket);
			}
			const contentSize = contentTickets.length;
			const measuredCount = Math.max(0, contentSize - 2);
			const fI = firstItemWidth.value;
			const fD = firstDividerWidth.value;
			const eW = ellipsisWidth.value;
			const reserved = fI + __props.gap + fD + __props.gap + eW + __props.gap;
			if (ellipsisTickets.length === 0 || capacity === Infinity || capacity >= measuredCount) {
				hiddenCount.value = 0;
				if (expanded.value) expanded.value = false;
				for (const t of ellipsisTickets) group.unselect(t.id);
				for (const t of contentTickets) if (!t.isSelected.value) group.select(t.id);
				return;
			}
			const lastIndex = contentSize - 1;
			const poolStart = 2;
			const poolSize = Math.max(0, lastIndex - poolStart + 1);
			const toShow = Math.min(poolSize, capacity);
			const showStart = lastIndex - toShow + 1;
			const visible = Array.from({ length: contentSize }, (_, i) => i < 2 || i >= showStart);
			let showEllipsis = true;
			if (toShow > 0 && showStart > poolStart && contentTickets[showStart].type === "item") {
				const sep = showStart - 1;
				if (contentTickets[sep].type === "divider") visible[sep] = true;
			}
			if (capacity === 0) {
				visible[lastIndex] = true;
				const w = overflow.width.value;
				if (w < reserved + fD) visible[1] = false;
				if (w < fI + __props.gap + eW + __props.gap) showEllipsis = false;
				if (w < fI + __props.gap) visible[0] = false;
			}
			let hidden = 0;
			for (let i = 0; i < contentSize; i++) if (!visible[i] && contentTickets[i].type === "item") hidden++;
			hiddenCount.value = hidden;
			for (const t of ellipsisTickets) if (showEllipsis || expanded.value) group.select(t.id);
			else group.unselect(t.id);
			for (let i = 0; i < contentSize; i++) {
				const t = contentTickets[i];
				if (expanded.value || visible[i]) {
					if (!t.isSelected.value) group.select(t.id);
				} else group.unselect(t.id);
			}
		}, { immediate: true });
		provideBreadcrumbsRoot(__props.namespace, {
			breadcrumbs,
			group,
			overflow,
			divider: toRef(() => __props.divider),
			ellipsis: toRef(() => __props.ellipsis),
			isOverflowing,
			expanded,
			hasActivator,
			hiddenCount,
			ellipsisWidth,
			measureElement
		});
		const slotProps = toRef(() => ({
			isOverflowing: overflow.isOverflowing.value,
			capacity: overflow.capacity.value,
			total: group.size,
			depth: breadcrumbs.depth.value,
			isRoot: breadcrumbs.isRoot.value,
			first: breadcrumbs.first,
			prev: breadcrumbs.prev,
			select: breadcrumbs.select,
			attrs: {
				"aria-label": __props.label ?? locale.ti("Breadcrumbs.label") ?? "Breadcrumbs",
				"role": __props.as === "nav" ? void 0 : "navigation"
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				ref: "container",
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Breadcrumbs/BreadcrumbsActivator.vue
const _sfc_main$173 = /*@__PURE__*/ defineComponent({
	name: "BreadcrumbsActivator",
	__name: "BreadcrumbsActivator",
	props: {
		namespace: { default: "v0:breadcrumbs" },
		as: { default: "button" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const locale = useLocale();
		const context = useBreadcrumbsRoot(__props.namespace);
		const ticket = context.group.register({ type: "activator" });
		onBeforeUnmount(() => {
			context.group.unregister(ticket.id);
		});
		const isExpanded = toRef(() => context.expanded.value);
		const count = toRef(() => context.hiddenCount.value);
		const label = toRef(() => locale.ti("Breadcrumbs.expand", { count: count.value }) ?? `Show ${count.value} more breadcrumbs`);
		function toggle() {
			context.expanded.value = !context.expanded.value;
		}
		function onKeydown(e) {
			if (e.key !== "Enter" && e.key !== " ") return;
			e.preventDefault();
			toggle();
		}
		const slotProps = toRef(() => ({
			isExpanded: isExpanded.value,
			count: count.value,
			toggle,
			attrs: {
				"type": __props.as === "button" ? "button" : void 0,
				"role": __props.as === "button" ? void 0 : "button",
				"tabindex": __props.as === "button" ? void 0 : 0,
				"aria-expanded": isExpanded.value,
				"aria-label": label.value,
				"data-state": isExpanded.value ? "open" : "closed",
				"onClick": toggle,
				"onKeydown": __props.as === "button" ? void 0 : onKeydown
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Breadcrumbs/BreadcrumbsDivider.vue
const _sfc_main$172 = /*@__PURE__*/ defineComponent({
	name: "BreadcrumbsDivider",
	__name: "BreadcrumbsDivider",
	props: {
		namespace: { default: "v0:breadcrumbs" },
		id: {},
		divider: {},
		as: { default: "li" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const elRef = useTemplateRef("el");
		const context = useBreadcrumbsRoot(__props.namespace);
		const ticket = context.group.register({
			id: __props.id,
			type: "divider"
		});
		watch(() => elRef.value?.element, (element) => {
			context.measureElement(ticket.index, "divider", element ?? void 0);
		}, { immediate: true });
		onBeforeUnmount(() => {
			context.measureElement(ticket.index, "divider", void 0);
			context.group.unregister(ticket.id);
		});
		const divider = toRef(() => __props.divider ?? context.divider.value);
		const isSelected = toRef(() => ticket.isSelected.value);
		const slotProps = toRef(() => ({
			id: ticket.id,
			divider: divider.value,
			isSelected: isSelected.value,
			attrs: {
				"aria-hidden": "true",
				"data-selected": isSelected.value || void 0
			}
		}));
		return (_ctx, _cache) => {
			return withDirectives((openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				ref: "el",
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)), () => [createTextVNode(toDisplayString(divider.value), 1)])]),
				_: 3
			}, 16, ["as", "renderless"])), [[vShow, isSelected.value]]);
		};
	}
});
//#endregion
//#region src/components/Breadcrumbs/BreadcrumbsEllipsis.vue
const _sfc_main$171 = /*@__PURE__*/ defineComponent({
	name: "BreadcrumbsEllipsis",
	__name: "BreadcrumbsEllipsis",
	props: {
		namespace: { default: "v0:breadcrumbs" },
		id: {},
		ellipsis: {},
		as: { default: "li" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const elRef = useTemplateRef("el");
		const context = useBreadcrumbsRoot(__props.namespace);
		const ticket = context.group.register({
			id: __props.id,
			type: "ellipsis"
		});
		watch(() => elRef.value?.element, (element) => {
			if (!IN_BROWSER || !element) {
				context.ellipsisWidth.value = 0;
				return;
			}
			const el = element;
			const style = getComputedStyle(el);
			const marginX = /* @__PURE__ */ pxToNumber(style.marginLeft) + /* @__PURE__ */ pxToNumber(style.marginRight);
			context.ellipsisWidth.value = (el.offsetWidth || 0) + marginX;
		}, { immediate: true });
		onBeforeUnmount(() => {
			context.ellipsisWidth.value = 0;
			context.group.unregister(ticket.id);
		});
		const resolvedEllipsis = toRef(() => __props.ellipsis ?? context.ellipsis.value);
		const isSelected = toRef(() => ticket.isSelected.value);
		const count = toRef(() => context.hiddenCount.value);
		const slotProps = toRef(() => ({
			id: ticket.id,
			ellipsis: resolvedEllipsis.value,
			isSelected: isSelected.value,
			count: count.value,
			attrs: {
				"aria-hidden": context.hasActivator.value ? void 0 : "true",
				"data-selected": isSelected.value || void 0
			}
		}));
		return (_ctx, _cache) => {
			return withDirectives((openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				ref: "el",
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)), () => [createTextVNode(toDisplayString(resolvedEllipsis.value), 1)])]),
				_: 3
			}, 16, ["as", "renderless"])), [[vShow, isSelected.value]]);
		};
	}
});
//#endregion
//#region src/components/Breadcrumbs/BreadcrumbsItem.vue
const _sfc_main$170 = /*@__PURE__*/ defineComponent({
	name: "BreadcrumbsItem",
	__name: "BreadcrumbsItem",
	props: {
		namespace: { default: "v0:breadcrumbs" },
		id: {},
		value: {},
		text: { default: "" },
		as: { default: "li" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const elRef = useTemplateRef("el");
		const context = useBreadcrumbsRoot(__props.namespace);
		const crumb = context.breadcrumbs.register({
			id: __props.id,
			value: __props.value,
			text: __props.text
		});
		const ticket = context.group.register({
			id: crumb.id,
			value: __props.value,
			type: "item"
		});
		watch(() => elRef.value?.element, (element) => {
			context.measureElement(ticket.index, "item", element ?? void 0);
		}, { immediate: true });
		onBeforeUnmount(() => {
			context.measureElement(ticket.index, "item", void 0);
			context.group.unregister(ticket.id);
			context.breadcrumbs.unregister(crumb.id);
		});
		const isSelected = toRef(() => ticket.isSelected.value);
		const slotProps = toRef(() => ({
			id: ticket.id,
			isSelected: isSelected.value,
			attrs: {
				"inert": isSelected.value ? void 0 : true,
				"data-selected": isSelected.value || void 0
			}
		}));
		return (_ctx, _cache) => {
			return withDirectives((openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				ref: "el",
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"])), [[vShow, isSelected.value]]);
		};
	}
});
//#endregion
//#region src/components/Breadcrumbs/BreadcrumbsLink.vue
const _sfc_main$169 = /*@__PURE__*/ defineComponent({
	name: "BreadcrumbsLink",
	__name: "BreadcrumbsLink",
	props: {
		as: { default: "a" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), {
				as: __props.as,
				renderless: __props.renderless
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Breadcrumbs/BreadcrumbsList.vue
const _sfc_main$168 = /*@__PURE__*/ defineComponent({
	name: "BreadcrumbsList",
	__name: "BreadcrumbsList",
	props: {
		as: { default: "ol" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const slotProps = toRef(() => ({ attrs: { role: "list" } }));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Breadcrumbs/BreadcrumbsPage.vue
const _sfc_main$167 = /*@__PURE__*/ defineComponent({
	name: "BreadcrumbsPage",
	__name: "BreadcrumbsPage",
	props: {
		as: { default: "span" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const slotProps = toRef(() => ({ attrs: { "aria-current": "page" } }));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Breadcrumbs/index.ts
/**
* Breadcrumbs component for responsive navigation trails.
*
* @see https://0.vuetifyjs.com/components/semantic/breadcrumbs
*/
const Breadcrumbs = {
	/**
	* Root component for breadcrumb navigation.
	* Creates breadcrumbs composable + Group + Overflow context.
	*
	* @see https://0.vuetifyjs.com/components/semantic/breadcrumbs
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Breadcrumbs } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Breadcrumbs.Root>
	*     <Breadcrumbs.List>
	*       <Breadcrumbs.Item text="Home">
	*         <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
	*       </Breadcrumbs.Item>
	*
	*       <Breadcrumbs.Divider />
	*
	*       <Breadcrumbs.Ellipsis />
	*
	*       <Breadcrumbs.Item text="Products">
	*         <Breadcrumbs.Link href="/products">Products</Breadcrumbs.Link>
	*       </Breadcrumbs.Item>
	*
	*       <Breadcrumbs.Divider />
	*
	*       <Breadcrumbs.Item text="Shoes">
	*         <Breadcrumbs.Page>Shoes</Breadcrumbs.Page>
	*       </Breadcrumbs.Item>
	*     </Breadcrumbs.List>
	*   </Breadcrumbs.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$174,
	/**
	* Semantic list wrapper for breadcrumb items.
	* Renders as an ordered list with role="list".
	*
	* @see https://0.vuetifyjs.com/components/semantic/breadcrumbs
	*
	* @example
	* ```vue
	* <template>
	*   <Breadcrumbs.List>
	*     <!-- Items, dividers, ellipsis go here -->
	*   </Breadcrumbs.List>
	* </template>
	* ```
	*/
	List: _sfc_main$168,
	/**
	* Individual breadcrumb item. Registers with root and
	* self-measures for overflow visibility.
	*
	* @see https://0.vuetifyjs.com/components/semantic/breadcrumbs
	*
	* @example
	* ```vue
	* <template>
	*   <!-- With a link -->
	*   <Breadcrumbs.Item text="Products">
	*     <Breadcrumbs.Link href="/products">Products</Breadcrumbs.Link>
	*   </Breadcrumbs.Item>
	*
	*   <!-- Current page (no link) -->
	*   <Breadcrumbs.Item text="Shoes">
	*     <Breadcrumbs.Page>Shoes</Breadcrumbs.Page>
	*   </Breadcrumbs.Item>
	*
	*   <!-- With slot props -->
	*   <Breadcrumbs.Item text="Home" v-slot="{ isSelected }">
	*     <span v-show="isSelected">Home</span>
	*   </Breadcrumbs.Item>
	* </template>
	* ```
	*/
	Item: _sfc_main$170,
	/**
	* Navigable breadcrumb link. Renders as an anchor by default.
	* All attributes (href, to, etc.) fall through to the underlying element.
	*
	* @see https://0.vuetifyjs.com/components/semantic/breadcrumbs
	*
	* @example
	* ```vue
	* <template>
	*   <!-- Standard anchor -->
	*   <Breadcrumbs.Link href="/products">
	*     Products
	*   </Breadcrumbs.Link>
	*
	*   <!-- With RouterLink via :as -->
	*   <Breadcrumbs.Link :as="RouterLink" to="/products">
	*     Products
	*   </Breadcrumbs.Link>
	*
	*   <!-- Custom element -->
	*   <Breadcrumbs.Link as="button" @click="navigate">
	*     Products
	*   </Breadcrumbs.Link>
	* </template>
	* ```
	*/
	Link: _sfc_main$169,
	/**
	* Current page indicator. Renders as a span with
	* aria-current="page".
	*
	* @see https://0.vuetifyjs.com/components/semantic/breadcrumbs
	*
	* @example
	* ```vue
	* <template>
	*   <Breadcrumbs.Page>Current Page</Breadcrumbs.Page>
	*
	*   <!-- With custom element -->
	*   <Breadcrumbs.Page as="strong">Current Page</Breadcrumbs.Page>
	* </template>
	* ```
	*/
	Page: _sfc_main$167,
	/**
	* Visual separator between breadcrumb items. Renders as a list
	* item with aria-hidden="true". Uses divider character from Root
	* by default, or override via prop or slot content.
	*
	* @see https://0.vuetifyjs.com/components/semantic/breadcrumbs
	*
	* @example
	* ```vue
	* <template>
	*   <!-- Uses default divider from Root -->
	*   <Breadcrumbs.Divider />
	*
	*   <!-- Override divider character -->
	*   <Breadcrumbs.Divider divider=">" />
	*
	*   <!-- Custom slot content (e.g., SVG chevron) -->
	*   <Breadcrumbs.Divider>
	*     <svg class="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	*       <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
	*     </svg>
	*   </Breadcrumbs.Divider>
	* </template>
	* ```
	*/
	Divider: _sfc_main$172,
	/**
	* Ellipsis indicator shown when items are truncated by overflow.
	* Auto-hidden until overflow is detected. Renders with
	* aria-hidden="true".
	*
	* @see https://0.vuetifyjs.com/components/semantic/breadcrumbs
	*
	* @example
	* ```vue
	* <template>
	*   <!-- Uses default "..." from Root -->
	*   <Breadcrumbs.Ellipsis />
	*
	*   <!-- Override ellipsis character -->
	*   <Breadcrumbs.Ellipsis ellipsis="…" />
	* </template>
	* ```
	*/
	Ellipsis: _sfc_main$171,
	/**
	* Disclosure control that reveals the crumbs hidden by truncation.
	* Place inside an Ellipsis, which stays the list item.
	*
	* @see https://0.vuetifyjs.com/components/semantic/breadcrumbs
	*
	* @example
	* ```vue
	* <template>
	*   <Breadcrumbs.Ellipsis>
	*     <Breadcrumbs.Activator />
	*   </Breadcrumbs.Ellipsis>
	* </template>
	* ```
	*/
	Activator: _sfc_main$173
};
//#endregion
//#region src/components/Button/ButtonGroup.vue
const [useButtonGroup, provideButtonGroup] = createContext();
const _sfc_main$166 = /*@__PURE__*/ defineComponent({
	name: "ButtonGroup",
	__name: "ButtonGroup",
	props: /*@__PURE__*/ mergeModels({
		namespace: { default: "v0:button:group" },
		disabled: {
			type: Boolean,
			default: false
		},
		multiple: {
			type: Boolean,
			default: false
		},
		mandatory: {
			type: [Boolean, String],
			default: false
		},
		label: {},
		ariaLabelledby: {},
		ariaDescribedby: {},
		as: { default: "div" },
		renderless: { type: Boolean }
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["update:model-value"], ["update:modelValue"]),
	setup(__props) {
		const model = useModel(__props, "modelValue");
		const selection = createSelection({
			disabled: toRef(() => __props.disabled),
			multiple: toRef(() => __props.multiple),
			mandatory: toRef(() => __props.mandatory),
			events: true
		});
		useProxyModel(selection, model, { multiple: toRef(() => __props.multiple) });
		provideButtonGroup(__props.namespace, selection);
		const slotProps = toRef(() => ({
			isDisabled: toValue(selection.disabled),
			attrs: {
				"role": "group",
				"aria-label": __props.label || void 0,
				"aria-labelledby": __props.ariaLabelledby || void 0,
				"aria-describedby": __props.ariaDescribedby || void 0
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Button/ButtonHiddenInput.vue
const _hoisted_1$8 = [
	"checked",
	"disabled",
	"form",
	"name",
	"value"
];
const visuallyHiddenStyle$6 = {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: "0",
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	border: "0"
};
const _sfc_main$165 = /*@__PURE__*/ defineComponent({
	name: "ButtonHiddenInput",
	__name: "ButtonHiddenInput",
	props: {
		namespace: { default: "v0:button:root" },
		name: {},
		value: {},
		form: {}
	},
	setup(__props) {
		const root = useButtonRoot(__props.namespace);
		const name = toRef(() => __props.name ?? root.name);
		const form = toRef(() => __props.form ?? root.form);
		const value = toRef(() => {
			const v = __props.value ?? root.value ?? "on";
			if (/* @__PURE__ */ isObject(v)) return JSON.stringify(v);
			return String(v);
		});
		const isSelected = root.isSelected;
		const isDisabled = root.isDisabled;
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("input", {
				checked: unref(isSelected),
				disabled: unref(isDisabled),
				form: form.value,
				inert: "",
				name: name.value,
				style: visuallyHiddenStyle$6,
				tabindex: "-1",
				type: "checkbox",
				value: value.value
			}, null, 8, _hoisted_1$8);
		};
	}
});
//#endregion
//#region src/components/Button/ButtonRoot.vue
const [useButtonRoot, provideButtonRoot] = createContext();
const _sfc_main$164 = /*@__PURE__*/ defineComponent({
	name: "ButtonRoot",
	inheritAttrs: false,
	__name: "ButtonRoot",
	props: {
		disabled: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
		passive: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		},
		grace: { default: 0 },
		value: {},
		namespace: { default: "v0:button:root" },
		groupNamespace: { default: "v0:button:group" },
		name: {},
		form: {},
		ariaLabel: {},
		as: { default: "button" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		let group = null;
		try {
			group = useButtonGroup(__props.groupNamespace);
		} catch {}
		const ticket = group?.register({
			value: __props.value,
			disabled: () => toValue(__props.disabled) ?? false
		});
		const isDisabled = toRef(() => group && ticket ? toValue(ticket.disabled) || toValue(group.disabled) : __props.disabled);
		const isReadonly = toRef(() => __props.readonly);
		const isPassive = toRef(() => __props.passive);
		const isSelected = toRef(() => ticket ? toValue(ticket.isSelected) : false);
		const isLoading = shallowRef(false);
		const timer = useTimer(() => {
			isLoading.value = true;
		}, { duration: __props.grace });
		watch(() => __props.loading, (active) => {
			if (!active) {
				timer.stop();
				isLoading.value = false;
			} else if (__props.grace > 0) timer.start();
			else isLoading.value = true;
		}, { immediate: true });
		const single = createSingle({ mandatory: "force" });
		const isSolo = shallowRef(false);
		const locale = useLocale();
		function onClick() {
			if (isDisabled.value || isReadonly.value || isPassive.value || __props.loading || !ticket) return;
			ticket.toggle();
		}
		function onKeydown(e) {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onClick();
			}
		}
		onBeforeUnmount(() => {
			timer.stop();
			ticket?.unregister();
		});
		const context = {
			value: __props.value,
			name: __props.name,
			form: __props.form,
			isLoading: toRef(() => isLoading.value),
			isDisabled,
			isReadonly,
			isPassive,
			isSelected,
			isSolo,
			single
		};
		provideButtonRoot(__props.namespace, context);
		const elementAttrs = toRef(() => ({
			"type": __props.as === "button" ? "button" : void 0,
			"role": "button",
			"disabled": isDisabled.value ? true : void 0,
			"aria-disabled": isDisabled.value || isPassive.value,
			"aria-busy": isLoading.value ? true : void 0,
			"aria-pressed": group ? isSelected.value : void 0,
			"aria-label": __props.ariaLabel || (!__props.renderless && isSolo.value ? locale.ti("Button.label") ?? "Button" : void 0),
			"tabindex": isDisabled.value ? -1 : 0,
			"data-loading": isLoading.value ? true : void 0,
			"data-passive": isPassive.value ? true : void 0,
			"data-readonly": isReadonly.value ? true : void 0,
			"data-disabled": isDisabled.value ? true : void 0,
			"data-selected": group && isSelected.value ? true : void 0,
			"data-solo": isSolo.value ? true : void 0,
			"onClick": ticket ? onClick : void 0,
			"onKeydown": __props.as === "button" ? void 0 : onKeydown
		}));
		const slotProps = toRef(() => ({
			isLoading: isLoading.value,
			isDisabled: isDisabled.value,
			isReadonly: isReadonly.value,
			isPassive: isPassive.value,
			isSelected: isSelected.value,
			attrs: elementAttrs.value
		}));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createVNode(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]), __props.name ? (openBlock(), createBlock(_sfc_main$165, { key: 0 })) : createCommentVNode("v-if", true)], 64);
		};
	}
});
//#endregion
//#region src/components/Button/ButtonContent.vue
const _sfc_main$163 = /*@__PURE__*/ defineComponent({
	name: "ButtonContent",
	__name: "ButtonContent",
	props: {
		id: { default: () => /* @__PURE__ */ useId$1() },
		namespace: { default: "v0:button:root" }
	},
	setup(__props) {
		const ticket = useButtonRoot(__props.namespace).single.register({ id: __props.id });
		onBeforeUnmount(() => ticket.unregister());
		const slotProps = toRef(() => ({ isSelected: ticket.isSelected.value }));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("span", { style: normalizeStyle({ visibility: unref(ticket).isSelected.value ? "visible" : "hidden" }) }, [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))], 4);
		};
	}
});
//#endregion
//#region src/components/Button/ButtonIcon.vue
const _sfc_main$162 = /*@__PURE__*/ defineComponent({
	name: "ButtonIcon",
	__name: "ButtonIcon",
	props: {
		namespace: { default: "v0:button:root" },
		as: { default: "span" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const root = useButtonRoot(__props.namespace);
		onMounted(() => {
			if (root.single.size > 0) return;
			root.isSolo.value = true;
		});
		const slotProps = toRef(() => ({
			isSolo: root.isSolo.value,
			attrs: { "aria-hidden": true }
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Button/ButtonLoading.vue
const _sfc_main$161 = /*@__PURE__*/ defineComponent({
	name: "ButtonLoading",
	__name: "ButtonLoading",
	props: {
		id: { default: () => /* @__PURE__ */ useId$1() },
		namespace: { default: "v0:button:root" }
	},
	setup(__props) {
		const root = useButtonRoot(__props.namespace);
		const ticket = root.single.register({
			id: __props.id,
			disabled: true
		});
		watch(root.isLoading, (active) => {
			if (active) {
				ticket.disabled = false;
				ticket.select();
			} else {
				ticket.disabled = true;
				const fallback = root.single.seek("first");
				if (fallback) fallback.select();
			}
		}, { immediate: true });
		onBeforeUnmount(() => ticket.unregister());
		const slotProps = toRef(() => ({ isSelected: ticket.isSelected.value }));
		return (_ctx, _cache) => {
			return unref(ticket).isSelected.value ? renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)), void 0, void 0, 0) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region src/components/Button/index.ts
/**
* Button component with sub-components for interactive button controls.
*
* @see https://0.vuetifyjs.com/components/actions/button
*
* @example
* ```vue
* <script setup lang="ts">
*   import { Button } from '@vuetify/v0'
* <\/script>
*
* <template>
*   <Button.Root>
*     <Button.Content>Click me</Button.Content>
*   </Button.Root>
* </template>
* ```
*/
const Button = {
	/**
	* Default content area for buttons.
	*
	* Registers with Root's internal selection as the fallback.
	* Always rendered, selected when Loading is not active.
	*
	* @see https://0.vuetifyjs.com/components/actions/button
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Button } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Button.Root>
	*     <Button.Content>Submit</Button.Content>
	*   </Button.Root>
	* </template>
	* ```
	*/
	Content: _sfc_main$163,
	/**
	* Selection container for toggle button groups.
	*
	* @see https://0.vuetifyjs.com/components/actions/button
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Button } from '@vuetify/v0'
	*   import { ref } from 'vue'
	*
	*   const selected = ref<string>()
	* <\/script>
	*
	* <template>
	*   <Button.Group v-model="selected">
	*     <Button.Root value="bold">B</Button.Root>
	*     <Button.Root value="italic">I</Button.Root>
	*   </Button.Group>
	* </template>
	* ```
	*/
	Group: _sfc_main$166,
	/**
	* Hidden input component for form submission.
	*
	* @see https://0.vuetifyjs.com/components/actions/button
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Button } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Button.Group>
	*     <Button.Root value="yes">
	*       Yes
	*       <Button.HiddenInput name="answer" />
	*     </Button.Root>
	*   </Button.Group>
	* </template>
	* ```
	*/
	HiddenInput: _sfc_main$165,
	/**
	* Icon wrapper with accessibility enforcement.
	*
	* Sets `aria-hidden="true"` on itself. Detects solo buttons
	* and warns when `aria-label` is missing on Root.
	*
	* @see https://0.vuetifyjs.com/components/actions/button
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Button } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Button.Root aria-label="Close">
	*     <Button.Icon>✕</Button.Icon>
	*   </Button.Root>
	* </template>
	* ```
	*/
	Icon: _sfc_main$162,
	/**
	* Loading indicator that becomes visible after the grace period.
	*
	* Registers with Root's internal selection. Enabled and selected
	* when Root's isLoading becomes true (after grace period).
	*
	* @see https://0.vuetifyjs.com/components/actions/button
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Button } from '@vuetify/v0'
	*   import { shallowRef } from 'vue'
	*
	*   const loading = shallowRef(false)
	* <\/script>
	*
	* <template>
	*   <Button.Root :loading @click="loading = true">
	*     <Button.Loading>Saving...</Button.Loading>
	*     <Button.Content>Save</Button.Content>
	*   </Button.Root>
	* </template>
	* ```
	*/
	Loading: _sfc_main$161,
	/**
	* Root component for buttons.
	*
	* Renders as a button with proper ARIA attributes. Supports
	* disabled, readonly, passive, and loading states. When inside
	* a Button.Group, registers as a toggle button.
	*
	* @see https://0.vuetifyjs.com/components/actions/button
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Button } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Button.Root>
	*     <Button.Content>Click me</Button.Content>
	*   </Button.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$164
};
//#endregion
//#region src/components/Carousel/CarouselRoot.vue
const [useCarouselRoot, provideCarouselRoot] = createContext();
const _sfc_main$160 = /*@__PURE__*/ defineComponent({
	name: "CarouselRoot",
	__name: "CarouselRoot",
	props: /*@__PURE__*/ mergeModels({
		id: { default: () => /* @__PURE__ */ useId$1() },
		label: {},
		namespace: { default: "v0:carousel" },
		disabled: {
			type: Boolean,
			default: false
		},
		circular: {
			type: Boolean,
			default: false
		},
		orientation: { default: "horizontal" },
		perView: { default: 1 },
		autoplay: { default: 0 },
		behavior: { default: "smooth" },
		as: { default: "div" },
		renderless: { type: Boolean }
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const locale = useLocale();
		const model = useModel(__props, "modelValue");
		const step = createStep({
			disabled: toRef(() => __props.disabled),
			mandatory: "force",
			circular: __props.circular,
			events: true,
			reactive: true
		});
		useProxyModel(step, model, { multiple: false });
		function next() {
			if (__props.perView > 1) {
				const maxStart = Math.max(0, step.size - __props.perView);
				if (step.selectedIndex.value >= maxStart) {
					if (__props.circular) step.first();
					return;
				}
			}
			step.next();
		}
		function prev() {
			if (__props.circular && __props.perView > 1 && step.selectedIndex.value === 0) {
				step.step(Math.max(0, step.size - __props.perView));
				return;
			}
			step.prev();
		}
		const timer = __props.autoplay > 0 ? useTimer(() => next(), {
			duration: __props.autoplay,
			repeat: true
		}) : null;
		function pause() {
			timer?.pause();
		}
		function resume() {
			timer?.resume();
		}
		function play() {
			timer?.start();
		}
		function stop() {
			timer?.stop();
		}
		const parts = createRegistry();
		const context = {
			...step,
			next,
			prev,
			play,
			pause,
			resume,
			orientation: toRef(() => __props.orientation),
			perView: toRef(() => __props.perView),
			circular: toRef(() => __props.circular),
			rootId: __props.id,
			behavior: toRef(() => __props.behavior),
			parts,
			autoplay: toRef(() => __props.autoplay),
			remaining: toRef(() => timer?.remaining.value ?? 0),
			isAutoplay: toRef(() => timer?.isActive.value ?? false),
			isPaused: toRef(() => timer?.isPaused.value ?? false),
			get size() {
				return step.size;
			}
		};
		provideCarouselRoot(__props.namespace, context);
		const slotProps = toRef(() => ({
			isDisabled: toValue(step.disabled),
			orientation: __props.orientation,
			perView: __props.perView,
			first: step.first,
			last: step.last,
			next,
			prev,
			step: step.step,
			select: step.select,
			isAutoplay: timer?.isActive.value ?? false,
			isPaused: timer?.isPaused.value ?? false,
			remaining: timer?.remaining.value ?? 0,
			play,
			stop,
			pause,
			resume,
			attrs: {
				"role": "region",
				"aria-roledescription": "carousel",
				"aria-label": __props.label ?? locale.ti("Carousel.label") ?? "Carousel",
				"aria-disabled": toValue(step.disabled),
				"data-disabled": toValue(step.disabled) || void 0
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Carousel/CarouselViewport.vue
const _sfc_main$159 = /*@__PURE__*/ defineComponent({
	name: "CarouselViewport",
	inheritAttrs: false,
	__name: "CarouselViewport",
	props: {
		namespace: { default: "v0:carousel" },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const viewportRef = useTemplateRef("viewport");
		const carousel = useCarouselRoot(__props.namespace);
		const isVertical = toRef(() => carousel.orientation.value === "vertical");
		const isDragging = shallowRef(false);
		const syncing = shallowRef(false);
		const snapDisabled = shallowRef(false);
		const viewportId = `${carousel.rootId}-viewport`;
		const el = toRef(() => /* @__PURE__ */ toElement(viewportRef.value?.element) ?? null);
		const ticket = carousel.parts.register({
			type: "viewport",
			el
		});
		onBeforeUnmount(() => ticket.unregister());
		const { width, height } = useElementSize(el);
		const scrollPaddingStart = shallowRef();
		const scrollPaddingEnd = shallowRef();
		function syncScrollPadding() {
			const element = el.value;
			/* v8 ignore next 5 -- defensive: ResizeObserver only fires when element exists */
			if (!element) {
				scrollPaddingStart.value = void 0;
				scrollPaddingEnd.value = void 0;
				return;
			}
			const cs = getComputedStyle(element);
			const start = isVertical.value ? cs.paddingBlockStart : cs.paddingInlineStart;
			const end = isVertical.value ? cs.paddingBlockEnd : cs.paddingInlineEnd;
			/* v8 ignore next 2 -- happy-dom returns no computed padding so '0px' branch always taken */
			scrollPaddingStart.value = start && start !== "0px" ? start : void 0;
			scrollPaddingEnd.value = end && end !== "0px" ? end : void 0;
		}
		useResizeObserver(el, syncScrollPadding, { immediate: true });
		watch(isVertical, syncScrollPadding);
		const slideStep = toRef(() => {
			/* v8 ignore next -- defensive: getter only invoked after viewport mounts */
			if (!el.value) return 0;
			if ((isVertical.value ? height.value : width.value) === 0) return 0;
			/* v8 ignore start -- happy-dom has no layout engine: width/height and offset* read 0, so this measurement block is unreachable in tests */
			const ticket = carousel.seek("first");
			const first = toValue(ticket?.el);
			if (!ticket || !first) return 0;
			const second = toValue(carousel.seek("first", ticket.index + 1)?.el);
			if (!second) return isVertical.value ? first.offsetHeight : first.offsetWidth;
			return isVertical.value ? second.offsetTop - first.offsetTop : second.offsetLeft - first.offsetLeft;
			/* v8 ignore stop */
		});
		if (IN_BROWSER) {
			useEventListener(el, "scrollend", () => {
				if (syncing.value || snapDisabled.value) {
					syncing.value = false;
					return;
				}
				const viewport = el.value;
				/* v8 ignore next -- defensive: scrollend fires only on attached element with measured slideStep */
				if (!viewport || slideStep.value === 0) return;
				isDragging.value = false;
				const scrollPos = isVertical.value ? viewport.scrollTop : viewport.scrollLeft;
				const snapIndex = Math.round(scrollPos / slideStep.value);
				const id = carousel.lookup(snapIndex);
				/* v8 ignore next 3 -- snapIndex resolution requires real layout, not exercised in happy-dom */
				if (!/* @__PURE__ */ isUndefined(id) && id !== carousel.selectedItem.value?.id) carousel.select(id);
			});
			useEventListener(el, "scroll", () => {
				if (!syncing.value) isDragging.value = true;
			});
			let lastWheel = 0;
			useEventListener(el, "wheel", (e) => {
				if (e.shiftKey === isVertical.value) return;
				const delta = e.deltaY || e.deltaX;
				if (delta === 0) return;
				e.preventDefault();
				const now = performance.now();
				if (now - lastWheel < 300) return;
				lastWheel = now;
				if (delta > 0) carousel.next();
				else carousel.prev();
			}, { passive: false });
			let dragStart = 0;
			let scrollStart = 0;
			useEventListener(el, "mousedown", (e) => {
				if (e.button !== 0) return;
				const viewport = el.value;
				/* v8 ignore next -- defensive: mousedown only fires on attached viewport */
				if (!viewport) return;
				carousel.pause();
				dragStart = isVertical.value ? e.clientY : e.clientX;
				scrollStart = isVertical.value ? viewport.scrollTop : viewport.scrollLeft;
				snapDisabled.value = true;
			});
			useToggleScope(() => snapDisabled.value, () => {
				useDocumentEventListener("mousemove", (e) => {
					const viewport = el.value;
					/* v8 ignore next -- defensive: mousemove only fires within active drag scope */
					if (!viewport) return;
					e.preventDefault();
					const delta = (isVertical.value ? e.clientY : e.clientX) - dragStart;
					if (isVertical.value) viewport.scrollTop = scrollStart - delta;
					else viewport.scrollLeft = scrollStart - delta;
				});
				useDocumentEventListener("mouseup", () => {
					const viewport = el.value;
					carousel.resume();
					if (!viewport || slideStep.value === 0) {
						snapDisabled.value = false;
						isDragging.value = false;
						return;
					}
					const scrollPos = isVertical.value ? viewport.scrollTop : viewport.scrollLeft;
					const snapIndex = Math.round(scrollPos / slideStep.value);
					const position = snapIndex * slideStep.value;
					syncing.value = true;
					viewport.scrollTo({
						[isVertical.value ? "top" : "left"]: position,
						behavior: carousel.behavior.value
					});
					const id = carousel.lookup(snapIndex);
					if (!/* @__PURE__ */ isUndefined(id) && id !== carousel.selectedItem.value?.id) carousel.select(id);
					snapDisabled.value = false;
					isDragging.value = false;
				});
				onScopeDispose(() => {
					carousel.resume();
					snapDisabled.value = false;
					isDragging.value = false;
				});
			});
			useEventListener(el, "touchstart", () => carousel.pause(), { passive: true });
			useEventListener(el, "touchend", () => carousel.resume(), { passive: true });
			useEventListener(el, "focusin", () => carousel.pause());
			useEventListener(el, "focusout", () => carousel.resume());
		}
		watch(() => carousel.selectedIndex.value, (index) => {
			const viewport = el.value;
			/* v8 ignore next -- defensive: viewport always present when watch fires after mount */
			if (!viewport || slideStep.value === 0) return;
			syncing.value = true;
			const position = index * slideStep.value;
			viewport.scrollTo({
				[isVertical.value ? "top" : "left"]: position,
				behavior: carousel.behavior.value
			});
		});
		const viewportStyle = toRef(() => {
			const axis = isVertical.value ? "block" : "inline";
			return {
				"display": "flex",
				"flex-direction": isVertical.value ? "column" : "row",
				[isVertical.value ? "overflow-y" : "overflow-x"]: "auto",
				[isVertical.value ? "overflow-x" : "overflow-y"]: "hidden",
				"scroll-snap-type": snapDisabled.value ? "none" : `${isVertical.value ? "y" : "x"} mandatory`,
				"scrollbar-width": "none",
				/* v8 ignore next 3 -- happy-dom never sets computed padding so spreads always evaluate to {} */
				...scrollPaddingStart.value ? { [`scroll-padding-${axis}-start`]: scrollPaddingStart.value } : {},
				...scrollPaddingEnd.value ? { [`scroll-padding-${axis}-end`]: scrollPaddingEnd.value } : {},
				...snapDisabled.value ? { "user-select": "none" } : {}
			};
		});
		const slotProps = toRef(() => ({
			isDragging: isDragging.value,
			attrs: {
				"id": viewportId,
				"data-orientation": carousel.orientation.value,
				"data-dragging": isDragging.value || void 0,
				"style": viewportStyle.value
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({ ref: "viewport" }, mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless,
				style: [unref(attrs).style, slotProps.value.attrs.style]
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, [
				"as",
				"renderless",
				"style"
			]);
		};
	}
});
//#endregion
//#region src/components/Carousel/CarouselItem.vue
const _sfc_main$158 = /*@__PURE__*/ defineComponent({
	name: "CarouselItem",
	inheritAttrs: false,
	__name: "CarouselItem",
	props: {
		id: {},
		value: {},
		disabled: {},
		namespace: { default: "v0:carousel" },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const rootEl = useTemplateRef("root");
		const locale = useLocale();
		const carousel = useCarouselRoot(__props.namespace);
		const el = toRef(() => /* @__PURE__ */ toElement(rootEl.value?.element) ?? null);
		const ticket = carousel.register({
			id: __props.id,
			value: __props.value,
			disabled: () => toValue(__props.disabled) ?? false,
			el
		});
		const isDisabled = toRef(() => toValue(ticket.disabled) || toValue(carousel.disabled));
		onBeforeUnmount(() => {
			ticket.unregister();
		});
		const isActive = toRef(() => {
			const selected = carousel.selectedIndex.value;
			const perView = carousel.perView.value;
			const index = ticket.index;
			return index >= selected && index < selected + perView;
		});
		const slideStyle = { "scroll-snap-align": "start" };
		const slotProps = toRef(() => ({
			id: String(ticket.id),
			isSelected: toValue(ticket.isSelected),
			isActive: isActive.value,
			isDisabled: isDisabled.value,
			index: ticket.index,
			select: ticket.select,
			unselect: ticket.unselect,
			toggle: ticket.toggle,
			attrs: {
				"id": `${carousel.rootId}-slide-${ticket.index}`,
				"role": "group",
				"aria-roledescription": "slide",
				"aria-label": locale.ti("Carousel.slide", {
					current: ticket.index + 1,
					size: carousel.size
				}) ?? `Slide ${ticket.index + 1} of ${carousel.size}`,
				"aria-hidden": isActive.value ? void 0 : true,
				"data-selected": toValue(ticket.isSelected) || void 0,
				"data-active": isActive.value || void 0,
				"data-disabled": isDisabled.value || void 0,
				"data-index": ticket.index,
				"style": slideStyle
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({ ref: "root" }, mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless,
				style: [unref(attrs).style, slotProps.value.attrs.style]
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, [
				"as",
				"renderless",
				"style"
			]);
		};
	}
});
//#endregion
//#region src/components/Carousel/CarouselPrevious.vue
const _sfc_main$157 = /*@__PURE__*/ defineComponent({
	name: "CarouselPrevious",
	inheritAttrs: false,
	__name: "CarouselPrevious",
	props: {
		namespace: { default: "v0:carousel" },
		as: { default: "button" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const rootEl = useTemplateRef("root");
		const locale = useLocale();
		const carousel = useCarouselRoot(__props.namespace);
		const el = toRef(() => /* @__PURE__ */ toElement(rootEl.value?.element) ?? null);
		const ticket = carousel.parts.register({
			type: "previous",
			el
		});
		onBeforeUnmount(() => ticket.unregister());
		const viewportId = `${carousel.rootId}-viewport`;
		const isAtEdge = toRef(() => !carousel.circular.value && carousel.selectedIndex.value === 0);
		const isDisabled = toRef(() => toValue(carousel.disabled) || isAtEdge.value);
		function onClick() {
			if (!isDisabled.value) carousel.prev();
		}
		function onKeydown(e) {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onClick();
			}
		}
		const slotProps = toRef(() => ({
			isDisabled: isDisabled.value,
			isAtEdge: isAtEdge.value,
			attrs: {
				"type": __props.as === "button" ? "button" : void 0,
				"role": __props.as === "button" ? void 0 : "button",
				"tabindex": isDisabled.value ? -1 : 0,
				"aria-label": locale.ti("Carousel.prev") ?? "Previous slide",
				"aria-controls": viewportId,
				"aria-disabled": isDisabled.value,
				"disabled": __props.as === "button" ? isDisabled.value : void 0,
				"data-disabled": isDisabled.value || void 0,
				"data-edge": isAtEdge.value || void 0,
				"onClick": onClick,
				"onKeydown": __props.as === "button" ? void 0 : onKeydown
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({ ref: "root" }, mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Carousel/CarouselNext.vue
const _sfc_main$156 = /*@__PURE__*/ defineComponent({
	name: "CarouselNext",
	inheritAttrs: false,
	__name: "CarouselNext",
	props: {
		namespace: { default: "v0:carousel" },
		as: { default: "button" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const rootEl = useTemplateRef("root");
		const locale = useLocale();
		const carousel = useCarouselRoot(__props.namespace);
		const el = toRef(() => /* @__PURE__ */ toElement(rootEl.value?.element) ?? null);
		const ticket = carousel.parts.register({
			type: "next",
			el
		});
		onBeforeUnmount(() => ticket.unregister());
		const viewportId = `${carousel.rootId}-viewport`;
		const isAtEdge = toRef(() => {
			if (carousel.circular.value) return false;
			return carousel.selectedIndex.value >= carousel.size - carousel.perView.value;
		});
		const isDisabled = toRef(() => toValue(carousel.disabled) || isAtEdge.value);
		function onClick() {
			if (!isDisabled.value) carousel.next();
		}
		function onKeydown(e) {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onClick();
			}
		}
		const slotProps = toRef(() => ({
			isDisabled: isDisabled.value,
			isAtEdge: isAtEdge.value,
			attrs: {
				"type": __props.as === "button" ? "button" : void 0,
				"role": __props.as === "button" ? void 0 : "button",
				"tabindex": isDisabled.value ? -1 : 0,
				"aria-label": locale.ti("Carousel.next") ?? "Next slide",
				"aria-controls": viewportId,
				"aria-disabled": isDisabled.value,
				"disabled": __props.as === "button" ? isDisabled.value : void 0,
				"data-disabled": isDisabled.value || void 0,
				"data-edge": isAtEdge.value || void 0,
				"onClick": onClick,
				"onKeydown": __props.as === "button" ? void 0 : onKeydown
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({ ref: "root" }, mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Carousel/CarouselIndicator.vue
const _sfc_main$155 = /*@__PURE__*/ defineComponent({
	name: "CarouselIndicator",
	inheritAttrs: false,
	__name: "CarouselIndicator",
	props: {
		label: {},
		namespace: { default: "v0:carousel" },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const rootEl = useTemplateRef("root");
		const locale = useLocale();
		const carousel = useCarouselRoot(__props.namespace);
		const el = toRef(() => /* @__PURE__ */ toElement(rootEl.value?.element) ?? null);
		const ticket = carousel.parts.register({
			type: "indicator",
			el
		});
		onBeforeUnmount(() => ticket.unregister());
		function selectIndex(index) {
			const id = carousel.lookup(index);
			if (!/* @__PURE__ */ isUndefined(id)) carousel.select(id);
		}
		function focusSelected() {
			nextTick(() => {
				(/* @__PURE__ */ toElement(rootEl.value?.element))?.querySelector("[tabindex=\"0\"]")?.focus();
			});
		}
		function onKeydown(index, e) {
			const horizontal = carousel.orientation.value === "horizontal";
			const size = carousel.size;
			if (horizontal && e.key === "ArrowRight" || !horizontal && e.key === "ArrowDown") {
				e.preventDefault();
				selectIndex(index + 1 < size ? index + 1 : carousel.circular.value ? 0 : index);
				focusSelected();
				return;
			}
			if (horizontal && e.key === "ArrowLeft" || !horizontal && e.key === "ArrowUp") {
				e.preventDefault();
				selectIndex(index - 1 >= 0 ? index - 1 : carousel.circular.value ? size - 1 : index);
				focusSelected();
				return;
			}
			if (e.key === "Home") {
				e.preventDefault();
				carousel.first();
				focusSelected();
				return;
			}
			if (e.key === "End") {
				e.preventDefault();
				carousel.last();
				focusSelected();
				return;
			}
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				selectIndex(index);
			}
		}
		const slotProps = toRef(() => {
			const selected = carousel.selectedIndex.value;
			const size = carousel.size;
			const perView = carousel.perView.value;
			return {
				size,
				selectedIndex: selected,
				items: Array.from({ length: size }, (_, i) => {
					const isSelected = i === selected;
					const isActive = i >= selected && i < selected + perView;
					return {
						index: i,
						isSelected,
						isActive,
						attrs: {
							"role": "tab",
							"tabindex": isSelected ? 0 : -1,
							"aria-selected": isSelected,
							"aria-controls": `${carousel.rootId}-slide-${i}`,
							"aria-label": locale.ti("Carousel.indicator", {
								current: i + 1,
								size
							}) ?? `Go to slide ${i + 1} of ${size}`,
							"data-selected": isSelected || void 0,
							"data-active": isActive || void 0,
							"onClick"() {
								selectIndex(i);
							},
							"onKeydown": (e) => onKeydown(i, e)
						}
					};
				}),
				attrs: {
					"role": "tablist",
					"aria-label": __props.label ?? locale.ti("Carousel.indicators") ?? "Carousel indicators",
					"aria-orientation": carousel.orientation.value
				}
			};
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({ ref: "root" }, mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Carousel/CarouselProgress.vue
const _sfc_main$154 = /*@__PURE__*/ defineComponent({
	name: "CarouselProgress",
	inheritAttrs: false,
	__name: "CarouselProgress",
	props: {
		namespace: { default: "v0:carousel" },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const rootEl = useTemplateRef("root");
		const locale = useLocale();
		const carousel = useCarouselRoot(__props.namespace);
		const el = toRef(() => /* @__PURE__ */ toElement(rootEl.value?.element) ?? null);
		const ticket = carousel.parts.register({
			type: "progress",
			el
		});
		onBeforeUnmount(() => ticket.unregister());
		const progress = toRef(() => {
			const duration = carousel.autoplay.value;
			if (duration <= 0) return 0;
			return 1 - carousel.remaining.value / duration;
		});
		const state = toRef(() => {
			if (!carousel.isAutoplay.value) return "idle";
			if (carousel.isPaused.value) return "paused";
			return "active";
		});
		const slotProps = toRef(() => {
			const percent = Math.round(progress.value * 100);
			return {
				progress: progress.value,
				isAutoplay: carousel.isAutoplay.value,
				isPaused: carousel.isPaused.value,
				attrs: {
					"role": "progressbar",
					"aria-valuenow": percent,
					"aria-valuemin": 0,
					"aria-valuemax": 100,
					"aria-valuetext": locale.ti("Carousel.progress", { percent }) ?? `${percent}% complete`,
					"aria-label": locale.ti("Carousel.progressLabel") ?? "Carousel progress",
					"data-state": state.value,
					"style": { width: `${percent}%` }
				}
			};
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({ ref: "root" }, mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless,
				style: [unref(attrs).style, slotProps.value.attrs.style]
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, [
				"as",
				"renderless",
				"style"
			]);
		};
	}
});
//#endregion
//#region src/components/Carousel/CarouselLiveRegion.vue
const _sfc_main$153 = /*@__PURE__*/ defineComponent({
	name: "CarouselLiveRegion",
	inheritAttrs: false,
	__name: "CarouselLiveRegion",
	props: {
		namespace: { default: "v0:carousel" },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const rootEl = useTemplateRef("root");
		const locale = useLocale();
		const carousel = useCarouselRoot(__props.namespace);
		const el = toRef(() => /* @__PURE__ */ toElement(rootEl.value?.element) ?? null);
		const ticket = carousel.parts.register({
			type: "live-region",
			el
		});
		onBeforeUnmount(() => ticket.unregister());
		const text = shallowRef("");
		/* v8 ignore start -- watch fires after mount, setTimeout callback requires timer */
		let pending;
		watch(() => carousel.selectedIndex.value, (index, prevIndex) => {
			if (/* @__PURE__ */ isUndefined(prevIndex)) return;
			clearTimeout(pending);
			pending = setTimeout(() => {
				text.value = locale.ti("Carousel.liveRegion", {
					current: index + 1,
					size: carousel.size
				}) ?? `Slide ${index + 1} of ${carousel.size}`;
			}, 100);
		});
		onBeforeUnmount(() => clearTimeout(pending));
		/* v8 ignore stop */
		const slotProps = toRef(() => ({
			current: carousel.selectedIndex.value + 1,
			size: carousel.size,
			text: text.value,
			attrs: {
				"aria-atomic": true,
				"aria-live": "polite",
				"role": "status"
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({ ref: "root" }, mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)), () => [createTextVNode(toDisplayString(text.value), 1)])]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Carousel/index.ts
/**
* Carousel component with sub-components for building accessible slide navigation.
*
* @see https://0.vuetifyjs.com/components/semantic/carousel
*
* @example
* ```vue
* <script setup lang="ts">
*   import { Carousel } from '@vuetify/v0'
* <\/script>
*
* <template>
*   <Carousel.Root circular>
*     <Carousel.Viewport>
*       <Carousel.Item v-for="i in 5" :key="i" :value="i">
*         Slide {{ i }}
*       </Carousel.Item>
*     </Carousel.Viewport>
*
*     <Carousel.Previous>Previous</Carousel.Previous>
*     <Carousel.Next>Next</Carousel.Next>
*   </Carousel.Root>
* </template>
* ```
*/
const Carousel = {
	/**
	* Root component that provides carousel context.
	*
	* @see https://0.vuetifyjs.com/components/semantic/carousel
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Carousel } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Carousel.Root circular :autoplay="5000">
	*     <Carousel.Viewport>
	*       <Carousel.Item v-for="i in 5" :key="i" :value="i">
	*         Slide {{ i }}
	*       </Carousel.Item>
	*     </Carousel.Viewport>
	*
	*     <Carousel.Previous>Previous</Carousel.Previous>
	*     <Carousel.Next>Next</Carousel.Next>
	*     <Carousel.LiveRegion class="sr-only" />
	*   </Carousel.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$160,
	/**
	* Scroll-snap container for carousel items. Handles native drag/swipe
	* via CSS scroll-snap and synchronizes scroll position with selection.
	*
	* @see https://0.vuetifyjs.com/components/semantic/carousel
	*
	* @example
	* ```vue
	* <template>
	*   <Carousel.Viewport class="cursor-grab data-[dragging]:cursor-grabbing">
	*     <Carousel.Item v-for="i in 5" :key="i" :value="i">
	*       Slide {{ i }}
	*     </Carousel.Item>
	*   </Carousel.Viewport>
	*
	*   <!-- With slot props -->
	*   <Carousel.Viewport v-slot="{ isDragging }">
	*     <span v-if="isDragging">Dragging...</span>
	*   </Carousel.Viewport>
	* </template>
	* ```
	*/
	Viewport: _sfc_main$159,
	/**
	* Individual carousel slide that registers with the step context.
	* Exposes selection state, visibility, and ARIA attributes.
	*
	* @see https://0.vuetifyjs.com/components/semantic/carousel
	*
	* @example
	* ```vue
	* <template>
	*   <Carousel.Item :value="1">Slide 1</Carousel.Item>
	*
	*   <!-- With slot props -->
	*   <Carousel.Item :value="2" v-slot="{ isActive, isSelected }">
	*     <div :class="{ 'opacity-100': isActive, 'opacity-40': !isActive }">
	*       Slide 2
	*     </div>
	*   </Carousel.Item>
	*
	*   <!-- With data attributes -->
	*   <Carousel.Item :value="3" class="data-[active]:opacity-100 opacity-40">
	*     Slide 3
	*   </Carousel.Item>
	* </template>
	* ```
	*/
	Item: _sfc_main$158,
	/**
	* Navigation button that moves to the previous slide. Automatically
	* disables at the first slide in non-circular mode.
	*
	* @see https://0.vuetifyjs.com/components/semantic/carousel
	*
	* @example
	* ```vue
	* <template>
	*   <Carousel.Previous>Previous</Carousel.Previous>
	*
	*   <!-- With slot props -->
	*   <Carousel.Previous v-slot="{ isDisabled, isAtEdge }">
	*     <span :class="{ 'opacity-50': isDisabled }">‹</span>
	*   </Carousel.Previous>
	*
	*   <!-- With data attributes -->
	*   <Carousel.Previous class="data-[disabled]:opacity-40">
	*     Previous
	*   </Carousel.Previous>
	* </template>
	* ```
	*/
	Previous: _sfc_main$157,
	/**
	* Navigation button that moves to the next slide. Automatically
	* disables at the last visible boundary in non-circular mode.
	*
	* @see https://0.vuetifyjs.com/components/semantic/carousel
	*
	* @example
	* ```vue
	* <template>
	*   <Carousel.Next>Next</Carousel.Next>
	*
	*   <!-- With slot props -->
	*   <Carousel.Next v-slot="{ isDisabled, isAtEdge }">
	*     <span :class="{ 'opacity-50': isDisabled }">›</span>
	*   </Carousel.Next>
	*
	*   <!-- With data attributes -->
	*   <Carousel.Next class="data-[disabled]:opacity-40">
	*     Next
	*   </Carousel.Next>
	* </template>
	* ```
	*/
	Next: _sfc_main$156,
	/**
	* Dot indicator navigation showing the active slide. Exposes an
	* `items` array via slot props — one entry per slide with selection
	* state and ARIA attributes. Uses roving tabindex for keyboard nav.
	*
	* @see https://0.vuetifyjs.com/components/semantic/carousel
	*
	* @example
	* ```vue
	* <template>
	*   <Carousel.Indicator v-slot="{ items }">
	*     <button
	*       v-for="item in items"
	*       :key="item.index"
	*       v-bind="item.attrs"
	*       class="size-2 rounded-full bg-surface-variant data-[selected]:bg-primary"
	*     />
	*   </Carousel.Indicator>
	* </template>
	* ```
	*/
	Indicator: _sfc_main$155,
	/**
	* Autoplay progress bar that fills based on remaining timer duration.
	* Exposes progress (0–1), autoplay state, and width styling via
	* slot props. Use `data-state` to style active/paused/idle states.
	*
	* @see https://0.vuetifyjs.com/components/semantic/carousel
	*
	* @example
	* ```vue
	* <template>
	*   <Carousel.Progress
	*     class="h-1 bg-surface-variant data-[state=idle]:hidden"
	*   >
	*     <template #default="{ attrs }">
	*       <div
	*         class="h-full bg-primary transition-[width]"
	*         :style="attrs.style"
	*       />
	*     </template>
	*   </Carousel.Progress>
	* </template>
	* ```
	*/
	Progress: _sfc_main$154,
	/**
	* Visually-hidden live region that announces slide changes to screen
	* readers. Should be styled with sr-only/visually-hidden CSS.
	*
	* @see https://0.vuetifyjs.com/components/semantic/carousel
	*
	* @example
	* ```vue
	* <template>
	*   <Carousel.Root>
	*     <Carousel.LiveRegion class="sr-only" />
	*     <!-- other carousel items -->
	*   </Carousel.Root>
	* </template>
	* ```
	*/
	LiveRegion: _sfc_main$153
};
//#endregion
//#region src/components/Checkbox/CheckboxGroup.vue
const [useCheckboxGroup, provideCheckboxGroup] = createContext();
const _sfc_main$152 = /*@__PURE__*/ defineComponent({
	name: "CheckboxGroup",
	__name: "CheckboxGroup",
	props: /*@__PURE__*/ mergeModels({
		namespace: { default: "v0:checkbox:group" },
		disabled: {
			type: Boolean,
			default: false
		},
		enroll: {
			type: Boolean,
			default: false
		},
		mandatory: {
			type: [Boolean, String],
			default: false
		},
		label: {},
		ariaLabelledby: {},
		ariaDescribedby: {},
		as: { default: "div" },
		renderless: { type: Boolean }
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["update:model-value"], ["update:modelValue"]),
	setup(__props) {
		const model = useModel(__props, "modelValue");
		const group = createGroup({
			disabled: toRef(() => __props.disabled),
			enroll: toRef(() => __props.enroll),
			mandatory: toRef(() => __props.mandatory),
			events: true
		});
		useProxyModel(group, model, { multiple: true });
		provideCheckboxGroup(__props.namespace, group);
		const slotProps = toRef(() => ({
			isDisabled: toValue(group.disabled),
			isNoneSelected: group.isNoneSelected.value,
			isAllSelected: group.isAllSelected.value,
			isMixed: group.isMixed.value,
			select: group.select,
			unselect: group.unselect,
			toggle: group.toggle,
			selectAll: group.selectAll,
			unselectAll: group.unselectAll,
			toggleAll: group.toggleAll,
			attrs: {
				"role": "group",
				"aria-label": __props.label || void 0,
				"aria-labelledby": __props.ariaLabelledby || void 0,
				"aria-describedby": __props.ariaDescribedby || void 0
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Checkbox/CheckboxRoot.vue
const [useCheckboxRoot, provideCheckboxRoot] = createContext();
const _sfc_main$151 = /*@__PURE__*/ defineComponent({
	name: "CheckboxRoot",
	inheritAttrs: false,
	__name: "CheckboxRoot",
	props: /*@__PURE__*/ mergeModels({
		id: { default: () => /* @__PURE__ */ useId$1() },
		label: {},
		value: {},
		name: {},
		form: {},
		disabled: { default: false },
		indeterminate: { default: false },
		namespace: { default: "v0:checkbox:root" },
		groupNamespace: { default: "v0:checkbox:group" },
		ariaLabelledby: {},
		ariaDescribedby: {},
		ariaInvalid: { type: Boolean },
		as: { default: "button" },
		renderless: { type: Boolean }
	}, {
		"modelValue": { type: Boolean },
		"modelModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["update:model-value"], ["update:modelValue"]),
	setup(__props) {
		const attrs = useAttrs();
		let group = null;
		try {
			group = useCheckboxGroup(__props.groupNamespace);
		} catch {}
		const model = useModel(__props, "modelValue");
		const ticket = group?.register({
			id: __props.id,
			value: __props.value,
			disabled: () => toValue(__props.disabled) ?? false,
			indeterminate: () => toValue(__props.indeterminate) ?? false
		});
		const isChecked = toRef(() => ticket ? toValue(ticket.isSelected) : model.value ?? false);
		const isMixed = toRef(() => ticket ? toValue(ticket.isMixed) : toValue(__props.indeterminate) ?? false);
		const isDisabled = toRef(() => group && ticket ? toValue(ticket.disabled) || toValue(group.disabled) : toValue(__props.disabled) ?? false);
		const dataState = toRef(() => isMixed.value ? "indeterminate" : isChecked.value ? "checked" : "unchecked");
		function toggle() {
			if (isDisabled.value) return;
			if (ticket) ticket.toggle();
			else model.value = !model.value;
		}
		function select() {
			if (isDisabled.value) return;
			if (ticket) ticket.select();
			else model.value = true;
		}
		function unselect() {
			if (isDisabled.value) return;
			if (ticket) ticket.unselect();
			else model.value = false;
		}
		function mix() {
			if (isDisabled.value || !ticket) return;
			ticket.mix();
		}
		function unmix() {
			if (isDisabled.value || !ticket) return;
			ticket.unmix();
		}
		function onClick() {
			toggle();
		}
		function onKeydown(e) {
			if (e.key !== " ") return;
			e.preventDefault();
			toggle();
		}
		onBeforeUnmount(() => {
			if (!ticket || !group) return;
			group.unregister(ticket.id);
		});
		const context = {
			id: __props.id,
			label: __props.label,
			value: __props.value,
			name: __props.name,
			form: __props.form,
			isChecked,
			isMixed,
			isDisabled,
			select,
			unselect,
			toggle,
			mix,
			unmix
		};
		provideCheckboxRoot(__props.namespace, context);
		const slotProps = toRef(() => ({
			id: __props.id,
			label: __props.label,
			value: __props.value,
			isChecked: isChecked.value,
			isMixed: isMixed.value,
			isDisabled: isDisabled.value,
			select,
			unselect,
			toggle,
			mix,
			unmix,
			attrs: {
				"type": __props.as === "button" ? "button" : void 0,
				"role": "checkbox",
				"aria-checked": isMixed.value ? "mixed" : isChecked.value,
				"aria-disabled": isDisabled.value,
				"aria-label": __props.label || void 0,
				"aria-labelledby": __props.ariaLabelledby || void 0,
				"aria-describedby": __props.ariaDescribedby || void 0,
				"aria-invalid": __props.ariaInvalid || void 0,
				"tabindex": isDisabled.value ? void 0 : 0,
				"data-state": dataState.value,
				"data-disabled": isDisabled.value ? true : void 0,
				"onClick": onClick,
				"onKeydown": onKeydown
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createVNode(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]), __props.name ? (openBlock(), createBlock(_sfc_main$150, { key: 0 })) : createCommentVNode("v-if", true)], 64);
		};
	}
});
//#endregion
//#region src/components/Checkbox/CheckboxHiddenInput.vue
const _hoisted_1$7 = [
	"checked",
	"disabled",
	"form",
	"name",
	"value"
];
const visuallyHiddenStyle$5 = {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: "0",
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	border: "0"
};
const _sfc_main$150 = /*@__PURE__*/ defineComponent({
	name: "CheckboxHiddenInput",
	__name: "CheckboxHiddenInput",
	props: {
		namespace: { default: "v0:checkbox:root" },
		name: {},
		value: {},
		form: {}
	},
	setup(__props) {
		const root = useCheckboxRoot(__props.namespace);
		const name = toRef(() => __props.name ?? root.name);
		const form = toRef(() => __props.form ?? root.form);
		const value = toRef(() => {
			const v = __props.value ?? root.value ?? "on";
			if (/* @__PURE__ */ isNullOrUndefined(v)) return "on";
			if (/* @__PURE__ */ isObject(v)) return JSON.stringify(v);
			return String(v);
		});
		const isChecked = root.isChecked;
		const isDisabled = root.isDisabled;
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("input", {
				checked: unref(isChecked),
				disabled: unref(isDisabled),
				form: form.value,
				inert: "",
				name: name.value,
				style: visuallyHiddenStyle$5,
				tabindex: "-1",
				type: "checkbox",
				value: value.value
			}, null, 8, _hoisted_1$7);
		};
	}
});
//#endregion
//#region src/components/Checkbox/CheckboxIndicator.vue
const _sfc_main$149 = /*@__PURE__*/ defineComponent({
	name: "CheckboxIndicator",
	__name: "CheckboxIndicator",
	props: {
		namespace: { default: "v0:checkbox:root" },
		as: { default: "span" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const root = useCheckboxRoot(__props.namespace);
		const isChecked = toRef(() => toValue(root.isChecked));
		const isMixed = toRef(() => toValue(root.isMixed));
		const isVisible = toRef(() => isChecked.value || isMixed.value);
		const dataState = toRef(() => isMixed.value ? "indeterminate" : isChecked.value ? "checked" : "unchecked");
		const slotProps = toRef(() => ({
			isChecked: isChecked.value,
			isMixed: isMixed.value,
			attrs: {
				"data-state": dataState.value,
				"style": { visibility: isVisible.value ? "visible" : "hidden" }
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Checkbox/CheckboxSelectAll.vue
const _sfc_main$148 = /*@__PURE__*/ defineComponent({
	name: "CheckboxSelectAll",
	inheritAttrs: false,
	__name: "CheckboxSelectAll",
	props: {
		label: {},
		disabled: { type: Boolean },
		namespace: { default: "v0:checkbox:root" },
		groupNamespace: { default: "v0:checkbox:group" },
		ariaLabelledby: {},
		ariaDescribedby: {},
		as: { default: "button" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const group = useCheckboxGroup(__props.groupNamespace);
		const id = /* @__PURE__ */ useId$1();
		const isAllSelected = toRef(() => group.isAllSelected.value);
		const isMixed = toRef(() => group.isMixed.value);
		const isDisabled = toRef(() => toValue(__props.disabled) || toValue(group.disabled));
		const dataState = toRef(() => isMixed.value ? "indeterminate" : isAllSelected.value ? "checked" : "unchecked");
		function onClick() {
			if (isDisabled.value) return;
			group.toggleAll();
		}
		function onKeydown(e) {
			if (e.key !== " ") return;
			e.preventDefault();
			if (isDisabled.value) return;
			group.toggleAll();
		}
		const context = {
			id,
			label: __props.label,
			value: void 0,
			name: void 0,
			form: void 0,
			isChecked: isAllSelected,
			isMixed,
			isDisabled,
			select: group.selectAll,
			unselect: group.unselectAll,
			toggle: group.toggleAll,
			mix: () => {},
			unmix: () => {}
		};
		provideCheckboxRoot(__props.namespace, context);
		const slotProps = toRef(() => ({
			label: __props.label,
			isAllSelected: isAllSelected.value,
			isMixed: isMixed.value,
			isDisabled: isDisabled.value,
			selectAll: group.selectAll,
			unselectAll: group.unselectAll,
			toggleAll: group.toggleAll,
			attrs: {
				"type": __props.as === "button" ? "button" : void 0,
				"role": "checkbox",
				"aria-checked": isMixed.value ? "mixed" : isAllSelected.value,
				"aria-disabled": isDisabled.value,
				"aria-label": __props.label || void 0,
				"aria-labelledby": __props.ariaLabelledby || void 0,
				"aria-describedby": __props.ariaDescribedby || void 0,
				"tabindex": isDisabled.value ? void 0 : 0,
				"data-state": dataState.value,
				"data-disabled": isDisabled.value ? true : void 0,
				onClick,
				onKeydown
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Checkbox/index.ts
/**
* Checkbox component with sub-components for checkbox controls.
*
* @see https://0.vuetifyjs.com/components/forms/checkbox
*
* @example
* ```vue
* <script lang="ts" setup>
*   import { Checkbox } from '@vuetify/v0'
* <\/script>
*
* <template>
*   <label>
*     <Checkbox.Root>
*       <Checkbox.Indicator>✓</Checkbox.Indicator>
*     </Checkbox.Root>
*     I agree to terms
*   </label>
* </template>
* ```
*/
const Checkbox = {
	/**
	* Group component for managing multiple checkboxes.
	*
	* @see https://0.vuetifyjs.com/components/forms/checkbox
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Checkbox } from '@vuetify/v0'
	*   import { ref } from 'vue'
	*
	*   const selected = ref<string[]>([])
	* <\/script>
	*
	* <template>
	*   <Checkbox.Group v-model="selected">
	*     <Checkbox.Root value="a">
	*       <Checkbox.Indicator>✓</Checkbox.Indicator>
	*       Option A
	*     </Checkbox.Root>
	*     <Checkbox.Root value="b">
	*       <Checkbox.Indicator>✓</Checkbox.Indicator>
	*       Option B
	*     </Checkbox.Root>
	*   </Checkbox.Group>
	* </template>
	* ```
	*/
	Group: _sfc_main$152,
	/**
	* Hidden input component for form submission.
	*
	* Auto-rendered by Root when `name` prop is provided.
	* Can also be used explicitly for custom form integration.
	*
	* @see https://0.vuetifyjs.com/components/forms/checkbox
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Checkbox } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Checkbox.Root>
	*     <Checkbox.Indicator>✓</Checkbox.Indicator>
	*     <Checkbox.HiddenInput name="agree" value="yes" />
	*   </Checkbox.Root>
	* </template>
	* ```
	*/
	HiddenInput: _sfc_main$150,
	/**
	* Visual indicator component for checkboxes.
	*
	* Renders as a span and only displays when checked or indeterminate.
	* Must be used within a Checkbox.Root component.
	*
	* @see https://0.vuetifyjs.com/components/forms/checkbox
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Checkbox } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Checkbox.Root>
	*     <Checkbox.Indicator>
	*       <svg viewBox="0 0 24 24">
	*         <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
	*       </svg>
	*     </Checkbox.Indicator>
	*   </Checkbox.Root>
	* </template>
	* ```
	*/
	Indicator: _sfc_main$149,
	/**
	* Root component for individual checkboxes.
	*
	* Renders as a button with proper ARIA attributes and handles
	* click/keyboard interactions. Supports standalone mode with
	* v-model or group mode within Checkbox.Group. When `name` prop
	* is provided, automatically renders a hidden input for form submission.
	*
	* @see https://0.vuetifyjs.com/components/forms/checkbox
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Checkbox } from '@vuetify/v0'
	*   import { ref } from 'vue'
	*
	*   const agreed = ref(false)
	* <\/script>
	*
	* <template>
	*   <label>
	*     <Checkbox.Root v-model="agreed">
	*       <Checkbox.Indicator>✓</Checkbox.Indicator>
	*     </Checkbox.Root>
	*     I agree to the terms
	*   </label>
	* </template>
	* ```
	*/
	Root: _sfc_main$151,
	/**
	* Select all checkbox for group multi-selection.
	*
	* Binds to parent Checkbox.Group's aggregate state. Reflects
	* isAllSelected/isMixed and calls toggleAll on click. Does NOT
	* register as a group item. Must be used within a Checkbox.Group.
	*
	* @see https://0.vuetifyjs.com/components/forms/checkbox
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Checkbox } from '@vuetify/v0'
	*   import { ref } from 'vue'
	*
	*   const selected = ref<string[]>([])
	* <\/script>
	*
	* <template>
	*   <Checkbox.Group v-model="selected">
	*     <Checkbox.SelectAll>
	*       <Checkbox.Indicator v-slot="{ isMixed }">
	*         <span v-if="isMixed">−</span>
	*         <span v-else>✓</span>
	*       </Checkbox.Indicator>
	*     </Checkbox.SelectAll>
	*
	*     <Checkbox.Root value="a">
	*       <Checkbox.Indicator>✓</Checkbox.Indicator>
	*     </Checkbox.Root>
	*   </Checkbox.Group>
	* </template>
	* ```
	*/
	SelectAll: _sfc_main$148
};
//#endregion
//#region src/components/Collapsible/CollapsibleRoot.vue
const [useCollapsible, provideCollapsible] = createContext();
const _sfc_main$147 = /*@__PURE__*/ defineComponent({
	name: "CollapsibleRoot",
	__name: "CollapsibleRoot",
	props: /*@__PURE__*/ mergeModels({
		namespace: { default: "v0:collapsible" },
		disabled: {
			type: Boolean,
			default: false
		},
		as: { default: "div" },
		renderless: { type: Boolean }
	}, {
		"modelValue": {
			type: Boolean,
			default: false
		},
		"modelModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["update:model-value"], ["update:modelValue"]),
	setup(__props) {
		const model = useModel(__props, "modelValue");
		const isDisabled = toRef(() => __props.disabled);
		const selection = createSingle({
			disabled: isDisabled,
			events: true
		});
		const id = /* @__PURE__ */ useId$1();
		const activatorId = toRef(() => id);
		const contentId = toRef(() => `${id}-content`);
		const ticket = selection.register({
			id,
			value: true
		});
		useProxyModel(selection, model, {
			transformIn: (val) => val ? [true] : [],
			transformOut: (vals) => vals.length > 0
		});
		const isOpen = toRef(() => ticket.isSelected.value);
		function toggle() {
			selection.toggle(ticket.id);
		}
		function show() {
			selection.select(ticket.id);
		}
		function hide() {
			selection.unselect(ticket.id);
		}
		provideCollapsible(__props.namespace, {
			open: isOpen,
			disabled: isDisabled,
			activatorId,
			contentId,
			toggle,
			show,
			hide
		});
		const slotProps = toRef(() => ({
			isOpen: isOpen.value,
			isDisabled: isDisabled.value,
			open: show,
			close: hide,
			toggle,
			attrs: {
				"data-state": isOpen.value ? "open" : "closed",
				"data-disabled": isDisabled.value || void 0
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Collapsible/CollapsibleActivator.vue
const _sfc_main$146 = /*@__PURE__*/ defineComponent({
	name: "CollapsibleActivator",
	__name: "CollapsibleActivator",
	props: {
		namespace: { default: "v0:collapsible" },
		as: { default: "button" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useCollapsible(__props.namespace);
		function onKeydown(e) {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				context.toggle();
			}
		}
		const slotProps = toRef(() => ({
			isOpen: context.open.value,
			isDisabled: context.disabled.value,
			toggle: context.toggle,
			attrs: {
				"id": context.activatorId.value,
				"role": __props.as === "button" ? void 0 : "button",
				"tabindex": context.disabled.value ? -1 : 0,
				"aria-expanded": context.open.value,
				"aria-controls": context.contentId.value,
				"aria-disabled": __props.as === "button" ? void 0 : context.disabled.value,
				"data-state": context.open.value ? "open" : "closed",
				"data-disabled": context.disabled.value || void 0,
				"disabled": __props.as === "button" ? context.disabled.value : void 0,
				"type": __props.as === "button" ? "button" : void 0,
				"onClick": context.toggle,
				"onKeydown": __props.as === "button" ? void 0 : onKeydown
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Collapsible/CollapsibleContent.vue
const _sfc_main$145 = /*@__PURE__*/ defineComponent({
	name: "CollapsibleContent",
	__name: "CollapsibleContent",
	props: {
		namespace: { default: "v0:collapsible" },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useCollapsible(__props.namespace);
		const slotProps = toRef(() => ({
			isOpen: context.open.value,
			attrs: {
				"id": context.contentId.value,
				"role": "region",
				"aria-labelledby": context.activatorId.value,
				"hidden": !context.open.value,
				"data-state": context.open.value ? "open" : "closed",
				"data-disabled": context.disabled.value || void 0
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Collapsible/CollapsibleCue.vue
const _sfc_main$144 = /*@__PURE__*/ defineComponent({
	name: "CollapsibleCue",
	__name: "CollapsibleCue",
	props: {
		namespace: { default: "v0:collapsible" },
		as: { default: "span" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useCollapsible(__props.namespace);
		const slotProps = toRef(() => ({
			isOpen: context.open.value,
			attrs: {
				"aria-hidden": true,
				"data-state": context.open.value ? "open" : "closed"
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Collapsible/index.ts
/**
* A single-item disclosure toggle for showing and hiding content.
*
* @see https://0.vuetifyjs.com/components/disclosure/collapsible
*
* @example
* ```vue
* <script setup lang="ts">
*   import { Collapsible } from '@vuetify/v0'
* <\/script>
*
* <template>
*   <Collapsible.Root>
*     <Collapsible.Activator>
*       <Collapsible.Cue />
*       Toggle content
*     </Collapsible.Activator>
*
*     <Collapsible.Content>
*       Content goes here.
*     </Collapsible.Content>
*   </Collapsible.Root>
* </template>
* ```
*/
const Collapsible = {
	Root: _sfc_main$147,
	Activator: _sfc_main$146,
	Cue: _sfc_main$144,
	Content: _sfc_main$145
};
//#endregion
//#region src/components/Combobox/ComboboxHiddenInput.vue
const _hoisted_1$6 = [
	"disabled",
	"form",
	"name",
	"value"
];
const visuallyHiddenStyle$4 = {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: "0",
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	border: "0"
};
const _sfc_main$143 = /*@__PURE__*/ defineComponent({
	name: "ComboboxHiddenInput",
	__name: "ComboboxHiddenInput",
	props: { namespace: { default: "v0:combobox" } },
	setup(__props) {
		const context = useComboboxContext(__props.namespace);
		const values = toRef(() => {
			return Array.from(context.selection.selectedValues.value).map((v) => {
				if (/* @__PURE__ */ isNullOrUndefined(v)) return "";
				if (/* @__PURE__ */ isObject(v)) return JSON.stringify(v);
				return String(v);
			});
		});
		const isDisabled = toRef(() => toValue(context.disabled));
		return (_ctx, _cache) => {
			return openBlock(true), createElementBlock(Fragment, null, renderList(values.value, (val, index) => {
				return openBlock(), createElementBlock("input", {
					key: index,
					disabled: isDisabled.value,
					form: unref(context).form,
					inert: "",
					name: unref(context).name,
					style: visuallyHiddenStyle$4,
					tabindex: "-1",
					type: "hidden",
					value: val
				}, null, 8, _hoisted_1$6);
			}), 128);
		};
	}
});
//#endregion
//#region src/components/Combobox/ComboboxRoot.vue
const [useComboboxContext, provideComboboxContext] = createContext();
const _sfc_main$142 = /*@__PURE__*/ defineComponent({
	name: "ComboboxRoot",
	__name: "ComboboxRoot",
	props: /*@__PURE__*/ mergeModels({
		namespace: { default: "v0:combobox" },
		id: {},
		name: {},
		form: {},
		disabled: {
			type: Boolean,
			default: false
		},
		multiple: {
			type: Boolean,
			default: false
		},
		mandatory: {
			type: Boolean,
			default: false
		},
		strict: {
			type: Boolean,
			default: false
		},
		error: {
			type: Boolean,
			default: false
		},
		errorMessages: {},
		adapter: {},
		positionAdapter: {},
		displayValue: { type: Function },
		as: { default: null },
		renderless: { type: Boolean }
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["update:model-value"], ["update:modelValue"]),
	setup(__props) {
		const model = useModel(__props, "modelValue");
		const context = createCombobox({
			id: __props.id,
			name: __props.name,
			form: __props.form,
			disabled: toRef(() => __props.disabled),
			multiple: toRef(() => __props.multiple),
			mandatory: toRef(() => __props.mandatory),
			strict: toRef(() => __props.strict),
			error: () => __props.error,
			errorMessages: () => __props.errorMessages,
			adapter: __props.adapter,
			positionAdapter: __props.positionAdapter,
			displayValue: __props.displayValue
		});
		useProxyModel(context.selection, model, { multiple: __props.multiple });
		provideComboboxContext(__props.namespace, context);
		const slotProps = toRef(() => ({
			id: context.id,
			query: context.query.value,
			isOpen: context.isOpen.value,
			isEmpty: context.isEmpty.value,
			isLoading: context.isLoading.value,
			isDisabled: toValue(context.disabled),
			errors: context.errors.value,
			isValid: context.isValid.value,
			open: context.open,
			close: context.close,
			toggle: context.toggle,
			clear: context.clear
		}));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createVNode(unref(_sfc_main$192), {
				as: __props.as,
				renderless: ""
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 8, ["as"]), __props.name ? (openBlock(), createBlock(_sfc_main$143, { key: 0 })) : createCommentVNode("v-if", true)], 64);
		};
	}
});
//#endregion
//#region src/components/Combobox/ComboboxActivator.vue
const _sfc_main$141 = /*@__PURE__*/ defineComponent({
	name: "ComboboxActivator",
	__name: "ComboboxActivator",
	props: {
		namespace: { default: "v0:combobox" },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useComboboxContext(__props.namespace);
		const slotProps = toRef(() => ({
			isOpen: context.isOpen.value,
			attrs: {
				"data-state": context.isOpen.value ? "open" : "closed",
				"style": context.popover.anchorStyles.value
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Combobox/ComboboxContent.vue
const _sfc_main$140 = /*@__PURE__*/ defineComponent({
	name: "ComboboxContent",
	__name: "ComboboxContent",
	props: {
		namespace: { default: "v0:combobox" },
		eager: {
			type: Boolean,
			default: false
		},
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useComboboxContext(__props.namespace);
		const content = useTemplateRef("content");
		context.popover.attach(() => content.value?.element);
		const { hasContent } = useLazy(context.isOpen, { eager: __props.eager });
		const activator = toRef(() => context.inputEl.value?.closest("[data-state]"));
		useClickOutside([() => content.value?.element, activator], () => {
			if (context.isOpen.value) context.close();
		});
		const slotProps = toRef(() => ({
			isOpen: context.isOpen.value,
			attrs: {
				...context.popover.contentAttrs.value,
				"id": context.listboxId,
				"role": "listbox",
				"aria-labelledby": context.inputId,
				"aria-multiselectable": context.multiple || void 0,
				"popover": "manual",
				"tabindex": -1,
				"style": context.popover.contentStyles.value
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				ref_key: "content",
				ref: content
			}, slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [unref(hasContent) ? renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)), void 0, void 0, 0) : createCommentVNode("v-if", true)]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Combobox/ComboboxControl.vue
const _sfc_main$139 = /*@__PURE__*/ defineComponent({
	name: "ComboboxControl",
	__name: "ComboboxControl",
	props: {
		namespace: { default: "v0:combobox" },
		openOn: { default: "focus" },
		placeholder: {},
		as: { default: "input" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useComboboxContext(__props.namespace);
		const input = useTemplateRef("input");
		watchEffect(() => {
			context.inputEl.value = input.value?.element ?? null;
		});
		function onInput(e) {
			context.pristine.value = false;
			context.query.value = e.target.value;
			if (__props.openOn === "input") context.open();
		}
		function onFocus() {
			if (__props.openOn === "focus") context.open();
		}
		function onKeydown(e) {
			if (context.isOpen.value) switch (e.key) {
				case "Enter": {
					e.preventDefault();
					const highlighted = context.cursor.highlightedId.value;
					if (!/* @__PURE__ */ isUndefined(highlighted)) context.select(highlighted);
					break;
				}
				case "Escape":
					e.preventDefault();
					context.close();
					break;
				case "Tab":
					context.close();
					break;
				case "ArrowDown":
				case "ArrowUp":
				case "Home":
				case "End":
					e.preventDefault();
					if (/* @__PURE__ */ isUndefined(context.cursor.highlightedId.value)) {
						const selected = context.selection.selectedIds.values().next().value;
						if (!/* @__PURE__ */ isUndefined(selected)) {
							context.cursor.highlight(selected);
							break;
						}
					}
					context.cursor.onKeydown(e);
			}
			else switch (e.key) {
				case "ArrowDown":
				case "ArrowUp":
					e.preventDefault();
					context.open();
			}
		}
		const strict = toRef(() => toValue(context.strict));
		const invalid = toRef(() => context.isValid.value === false);
		const slotProps = toRef(() => ({
			query: context.query.value,
			isOpen: context.isOpen.value,
			attrs: {
				"id": context.inputId,
				"role": "combobox",
				"aria-autocomplete": strict.value ? "both" : "list",
				"aria-expanded": context.isOpen.value,
				"aria-haspopup": "listbox",
				"aria-controls": context.listboxId,
				"aria-describedby": context.hasDescription.value ? context.descriptionId : void 0,
				"aria-errormessage": context.hasError.value && context.errors.value.length > 0 ? context.errorId : void 0,
				"aria-invalid": invalid.value || void 0,
				"aria-disabled": toValue(context.disabled),
				"disabled": toValue(context.disabled) || void 0,
				"placeholder": __props.placeholder,
				"value": context.display.value,
				"onInput": onInput,
				"onFocus": onFocus,
				"onKeydown": onKeydown
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				ref_key: "input",
				ref: input
			}, slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Combobox/ComboboxCue.vue
const _sfc_main$138 = /*@__PURE__*/ defineComponent({
	name: "ComboboxCue",
	__name: "ComboboxCue",
	props: {
		namespace: { default: "v0:combobox" },
		as: { default: "span" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useComboboxContext(__props.namespace);
		function onClick() {
			if (!toValue(context.disabled)) context.toggle();
		}
		const slotProps = toRef(() => ({
			isOpen: context.isOpen.value,
			attrs: {
				"aria-hidden": true,
				"data-state": context.isOpen.value ? "open" : "closed",
				"onClick": onClick
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Combobox/ComboboxDescription.vue
const _sfc_main$137 = /*@__PURE__*/ defineComponent({
	name: "ComboboxDescription",
	inheritAttrs: false,
	__name: "ComboboxDescription",
	props: {
		namespace: { default: "v0:combobox" },
		as: { default: "span" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const context = useComboboxContext(__props.namespace);
		onMounted(() => {
			context.hasDescription.value = true;
		});
		onBeforeUnmount(() => {
			context.hasDescription.value = false;
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(unref(attrs), {
				id: unref(context).descriptionId,
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { id: unref(context).descriptionId })]),
				_: 3
			}, 16, [
				"id",
				"as",
				"renderless"
			]);
		};
	}
});
//#endregion
//#region src/components/Combobox/ComboboxEmpty.vue
const _sfc_main$136 = /*@__PURE__*/ defineComponent({
	name: "ComboboxEmpty",
	__name: "ComboboxEmpty",
	props: {
		namespace: { default: "v0:combobox" },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useComboboxContext(__props.namespace);
		const locale = useLocale();
		const slotProps = toRef(() => ({ query: context.query.value }));
		return (_ctx, _cache) => {
			return unref(context).isEmpty.value ? (openBlock(), createBlock(unref(_sfc_main$192), {
				key: 0,
				as: __props.as,
				renderless: __props.renderless
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)), () => [createTextVNode(toDisplayString(unref(locale).ti("Combobox.noResults") ?? "No results"), 1)])]),
				_: 3
			}, 8, ["as", "renderless"])) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region src/components/Combobox/ComboboxError.vue
const _sfc_main$135 = /*@__PURE__*/ defineComponent({
	name: "ComboboxError",
	inheritAttrs: false,
	__name: "ComboboxError",
	props: {
		namespace: { default: "v0:combobox" },
		as: { default: "span" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const context = useComboboxContext(__props.namespace);
		const errors = context.errors;
		onMounted(() => {
			context.hasError.value = true;
		});
		onBeforeUnmount(() => {
			context.hasError.value = false;
		});
		const slotProps = toRef(() => ({
			id: context.errorId,
			errors: errors.value,
			attrs: {
				"id": context.errorId,
				"aria-live": "polite",
				"data-state": errors.value.length > 0 ? "visible" : "hidden"
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Combobox/ComboboxItem.vue
const _sfc_main$134 = /*@__PURE__*/ defineComponent({
	name: "ComboboxItem",
	__name: "ComboboxItem",
	props: {
		namespace: { default: "v0:combobox" },
		id: {},
		value: {},
		disabled: {},
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useComboboxContext(__props.namespace);
		const ticket = context.selection.register({
			id: __props.id,
			value: __props.value,
			disabled: () => toValue(__props.disabled) ?? false
		});
		const elementId = `${context.id}-option-${ticket.id}`;
		const isSelected = toRef(() => toValue(ticket.isSelected));
		const isDisabled = toRef(() => toValue(ticket.disabled) || toValue(context.disabled));
		const isHighlighted = toRef(() => context.cursor.highlightedId.value === ticket.id);
		const isFiltered = toRef(() => context.filtered.value.has(ticket.id));
		function onClick() {
			if (!toValue(isDisabled)) context.select(ticket.id);
		}
		onBeforeUnmount(() => {
			context.selection.unregister(ticket.id);
		});
		const slotProps = toRef(() => ({
			value: __props.value,
			isSelected: isSelected.value,
			isHighlighted: isHighlighted.value,
			isDisabled: isDisabled.value,
			isFiltered: isFiltered.value,
			select: () => context.select(ticket.id),
			attrs: {
				"id": elementId,
				"role": "option",
				"aria-selected": isSelected.value,
				"aria-disabled": isDisabled.value,
				"data-selected": isSelected.value || void 0,
				"data-highlighted": isHighlighted.value ? "" : void 0,
				"data-disabled": isDisabled.value || void 0,
				"data-id": String(ticket.id),
				"onClick": onClick
			}
		}));
		return (_ctx, _cache) => {
			return withDirectives((openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"])), [[vShow, isFiltered.value]]);
		};
	}
});
//#endregion
//#region src/components/Combobox/index.ts
/**
* Combobox component with sub-components for building autocomplete inputs.
*
* @see https://0.vuetifyjs.com/components/forms/combobox
*
* @example
* ```vue
* <script lang="ts" setup>
*   import { Combobox } from '@vuetify/v0'
*   import { ref } from 'vue'
*
*   const selected = ref()
*   const items = [
*     { id: 'apple', label: 'Apple' },
*     { id: 'banana', label: 'Banana' },
*     { id: 'cherry', label: 'Cherry' },
*   ]
* <\/script>
*
* <template>
*   <Combobox.Root v-model="selected">
*     <Combobox.Activator>
*       <Combobox.Control placeholder="Search..." />
*       <Combobox.Cue />
*     </Combobox.Activator>
*
*     <Combobox.Content>
*       <Combobox.Item
*         v-for="item in items"
*         :key="item.id"
*         :id="item.id"
*         :value="item.label"
*       >
*         {{ item.label }}
*       </Combobox.Item>
*       <Combobox.Empty>No results found</Combobox.Empty>
*     </Combobox.Content>
*   </Combobox.Root>
* </template>
* ```
*/
const Combobox = {
	/**
	* Root component for comboboxes. Creates selection, virtual focus, popover,
	* and adapter contexts. Bridges v-model to the internal selection state.
	*
	* @see https://0.vuetifyjs.com/components/forms/combobox
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Combobox } from '@vuetify/v0'
	*   import { ref } from 'vue'
	*
	*   const selected = ref()
	* <\/script>
	*
	* <template>
	*   <Combobox.Root v-model="selected" strict>
	*     <Combobox.Activator>
	*       <Combobox.Control placeholder="Search..." />
	*       <Combobox.Cue />
	*     </Combobox.Activator>
	*     <Combobox.Content>
	*       <Combobox.Item id="a" value="A">Option A</Combobox.Item>
	*     </Combobox.Content>
	*   </Combobox.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$142,
	/**
	* Wrapper for the control and cue. Sets CSS anchor-name so the dropdown
	* positions relative to this element.
	*
	* @see https://0.vuetifyjs.com/components/forms/combobox
	*
	* @example
	* ```vue
	* <Combobox.Activator>
	*   <Combobox.Control placeholder="Type to search..." />
	*   <Combobox.Cue />
	* </Combobox.Activator>
	* ```
	*/
	Activator: _sfc_main$141,
	/**
	* Text input that drives the query string and keyboard navigation.
	* Binds `role="combobox"` and manages `aria-activedescendant` via virtual focus.
	*
	* @see https://0.vuetifyjs.com/components/forms/combobox
	*
	* @example
	* ```vue
	* <!-- Opens on focus (default) -->
	* <Combobox.Control placeholder="Search fruits..." />
	*
	* <!-- Opens only when the user starts typing -->
	* <Combobox.Control open-on="input" placeholder="Start typing..." />
	* ```
	*/
	Control: _sfc_main$139,
	/**
	* Visual cue for open/close state. Exposes `data-state="open|closed"` for
	* CSS-driven styling. Clicking toggles the dropdown.
	*
	* @see https://0.vuetifyjs.com/components/forms/combobox
	*
	* @example
	* ```vue
	* <Combobox.Cue v-slot="{ isOpen }">
	*   {{ isOpen ? '▲' : '▼' }}
	* </Combobox.Cue>
	* ```
	*/
	Cue: _sfc_main$138,
	/**
	* Dropdown content container using native popover API with CSS anchor
	* positioning. Renders `role="listbox"` with lazy mounting.
	*
	* @see https://0.vuetifyjs.com/components/forms/combobox
	*
	* @example
	* ```vue
	* <Combobox.Content>
	*   <Combobox.Item id="a" value="A">Option A</Combobox.Item>
	*   <Combobox.Item id="b" value="B">Option B</Combobox.Item>
	*   <Combobox.Empty>No results found</Combobox.Empty>
	* </Combobox.Content>
	* ```
	*/
	Content: _sfc_main$140,
	/**
	* Option item within the combobox dropdown. Registers with selection and
	* virtual focus. Hidden via `v-show` when filtered out so selection state
	* is preserved.
	*
	* @see https://0.vuetifyjs.com/components/forms/combobox
	*
	* @example
	* ```vue
	* <Combobox.Item
	*   id="apple"
	*   value="Apple"
	*   class="data-[highlighted]:bg-primary"
	*   v-slot="{ isSelected }"
	* >
	*   Apple {{ isSelected ? '✓' : '' }}
	* </Combobox.Item>
	* ```
	*/
	Item: _sfc_main$134,
	/**
	* Empty state shown when no items match the current query. Exposes the
	* query string via slot props for contextual messaging.
	*
	* @see https://0.vuetifyjs.com/components/forms/combobox
	*
	* @example
	* ```vue
	* <Combobox.Empty v-slot="{ query }">
	*   No results for "{{ query }}"
	* </Combobox.Empty>
	* ```
	*/
	Empty: _sfc_main$136,
	/**
	* Help text component connected via aria-describedby.
	* Auto-generates an ID that Combobox.Control references in its
	* aria-describedby attribute for accessibility.
	*
	* @see https://0.vuetifyjs.com/components/forms/combobox
	*
	* @example
	* ```vue
	* <Combobox.Root v-model="selected">
	*   <Combobox.Activator>
	*     <Combobox.Control placeholder="Search..." />
	*   </Combobox.Activator>
	*   <Combobox.Description>Select a fruit from the list.</Combobox.Description>
	* </Combobox.Root>
	* ```
	*/
	Description: _sfc_main$137,
	/**
	* Error message component with aria-live announcements.
	* Renders error messages from Root's errorMessages prop.
	* Connected to Control via aria-errormessage. Uses aria-live="polite"
	* for screen reader announcements when errors appear.
	*
	* @see https://0.vuetifyjs.com/components/forms/combobox
	*
	* @example
	* ```vue
	* <Combobox.Root v-model="selected" :error-messages="['Selection required']">
	*   <Combobox.Activator>
	*     <Combobox.Control placeholder="Search..." />
	*   </Combobox.Activator>
	*   <Combobox.Error v-slot="{ errors }">
	*     <span v-for="error in errors" :key="error">{{ error }}</span>
	*   </Combobox.Error>
	* </Combobox.Root>
	* ```
	*/
	Error: _sfc_main$135
};
//#endregion
//#region src/components/DataGrid/DataGridRoot.vue
/**
* @module DataGridRoot
*
* @see https://0.vuetifyjs.com/components/data/data-grid
*
* @remarks
* Provider for the DataGrid compound. Creates `createDataGrid` and
* provides it to children. Rows and columns register themselves when
* they mount — same lifecycle as Checkbox.Group. Renders only slot content.
*/
const [_useDataGridRoot, provideDataGridRoot] = createContext();
function useDataGridRoot(namespace = "v0:data-grid") {
	return _useDataGridRoot(namespace);
}
const _sfc_main$133 = /*@__PURE__*/ defineComponent({
	name: "DataGridRoot",
	__name: "DataGridRoot",
	props: /*@__PURE__*/ mergeModels({
		namespace: { default: "v0:data-grid" },
		editing: {},
		preserveRowOrder: {},
		rowSpanning: { type: Function },
		filter: {},
		pagination: {},
		sortMultiple: { type: Boolean },
		mandate: { type: Boolean },
		firstSortOrder: {},
		selectStrategy: {},
		itemSelectable: {},
		groupBy: {},
		openAll: { type: Boolean },
		expandMultiple: { type: Boolean },
		locale: {},
		adapter: {}
	}, {
		"search": { default: "" },
		"searchModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["update:search"], ["update:search"]),
	setup(__props) {
		const options = createPropsRestProxy(__props, [
			"namespace",
			"editing",
			"preserveRowOrder",
			"rowSpanning"
		]);
		const context = createDataGrid({
			editing: __props.editing,
			preserveRowOrder: __props.preserveRowOrder,
			rowSpanning: __props.rowSpanning,
			...options
		});
		provideDataGridRoot(__props.namespace, context);
		const search = useModel(__props, "search");
		watch(search, (value) => {
			if (context.query.value !== (value ?? "")) context.search(value ?? "");
		}, { immediate: true });
		watch(context.query, (value) => {
			if (search.value !== value) search.value = value;
		});
		const slotProps = toRef(() => ({ context }));
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)));
		};
	}
});
//#endregion
//#region src/components/DataGrid/DataGridBody.vue
/**
* @module DataGridBody
*
* @see https://0.vuetifyjs.com/components/data/data-grid
*
* @remarks
* The `<tbody>` element wrapper. Exposes the paginated items from the
* context for rendering data rows.
*/
const _sfc_main$132 = /*@__PURE__*/ defineComponent({
	name: "DataGridBody",
	inheritAttrs: false,
	__name: "DataGridBody",
	props: {
		namespace: { default: "v0:data-grid" },
		as: { default: "tbody" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const context = useDataGridRoot(__props.namespace);
		const slotProps = toRef(() => ({
			items: context.items.value,
			sortedItems: context.sortedItems.value,
			orderedItems: context.orderedItems.value,
			rank: context.rank,
			isLoading: context.loading.value,
			isEmpty: context.items.value.length === 0,
			headerRows: context.headers.value.length,
			rowStart: context.headers.value.length + context.pagination.pageStart.value + 1,
			size: context.size,
			attrs: { role: __props.as === "tbody" ? void 0 : "rowgroup" }
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, mergeProps(unref(attrs), slotProps.value.attrs)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Splitter/SplitterRoot.vue
const [useSplitterRoot, provideSplitterRoot] = createContext("v0:splitter");
const _sfc_main$131 = /*@__PURE__*/ defineComponent({
	name: "SplitterRoot",
	inheritAttrs: false,
	__name: "SplitterRoot",
	props: {
		orientation: { default: "horizontal" },
		disabled: {
			type: Boolean,
			default: false
		},
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	emits: ["layout"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const attrs = useAttrs();
		const emit = __emit;
		const rootAtom = useTemplateRef("root");
		const rootEl = toRef(() => /* @__PURE__ */ toElement(rootAtom.value?.element) ?? null);
		const draggingHandle = shallowRef(null);
		const dragging = toRef(() => !/* @__PURE__ */ isNull(draggingHandle.value));
		const expandAccum = /* @__PURE__ */ new Map();
		const EXPAND_THRESHOLD = 10;
		const intentAccum = /* @__PURE__ */ new Map();
		const pending = shallowRef(null);
		const INTENT_THRESHOLD = 5;
		function arm(id, mode, delta) {
			const accum = (intentAccum.get(id) ?? 0) + Math.abs(delta);
			intentAccum.set(id, accum);
			if (accum >= INTENT_THRESHOLD) pending.value = {
				id,
				mode
			};
		}
		function disarm(id) {
			intentAccum.delete(id);
			if (pending.value?.id === id) pending.value = null;
		}
		const panels = createSelection({
			multiple: true,
			enroll: true,
			reactive: true
		});
		const handles = createRegistry();
		watch(() => panels.collection.size, (size, prev) => {
			const values = panels.values();
			/* v8 ignore next -- defensive: watch fires only when panel registry has at least one entry */
			if (values.length === 0) return;
			const total = values.reduce((sum, t) => sum + t.size, 0);
			if (total === 0 || total === 100) return;
			distribute(!/* @__PURE__ */ isUndefined(prev) && size > prev ? values.map((t) => t.defaultSize) : values.map((t) => t.size));
		}, { flush: "post" });
		function panel(index) {
			const id = panels.lookup(index);
			return /* @__PURE__ */ isNullOrUndefined(id) ? void 0 : panels.get(id);
		}
		function effectiveMin(ticket) {
			if (!ticket.collapsible) return ticket.minSize;
			if (!toValue(ticket.isSelected)) return ticket.collapsedSize;
			if (dragging.value && ticket.size < ticket.minSize) return ticket.collapsedSize;
			return ticket.minSize;
		}
		function canExpand(ticket, neighbor) {
			const target = Math.min(ticket.defaultSize, ticket.maxSize);
			const take = Math.min(target - ticket.collapsedSize, neighbor.size - neighbor.minSize);
			return ticket.collapsedSize + take >= ticket.minSize;
		}
		function canCollapse(ticket) {
			const need = ticket.size - ticket.collapsedSize;
			let room = 0;
			for (const other of panels.values()) {
				if (other.id === ticket.id) continue;
				room += other.maxSize - other.size;
				if (room >= need) return true;
			}
			return false;
		}
		function resize(index, delta, options) {
			const before = panel(index);
			const after = panel(index + 1);
			/* v8 ignore next -- defensive: resize only invoked between adjacent panels */
			if (!before || !after) return;
			const total = before.size + after.size;
			const min1 = effectiveMin(before);
			const min2 = effectiveMin(after);
			const lower = Math.max(min1, total - after.maxSize);
			const upper = Math.min(before.maxSize, total - min2);
			let size = /* @__PURE__ */ clamp(before.size + delta, lower, upper);
			const beforeCollapsed = !toValue(before.isSelected);
			const drag = dragging.value;
			if (before.collapsible && !beforeCollapsed && size <= before.minSize && delta < 0) {
				if (drag) {
					if (before.size >= before.minSize) {
						size = before.minSize;
						if (canCollapse(before)) arm(before.id, "collapse", Math.max(0, before.minSize - (before.size + delta)));
					}
				} else {
					size = before.collapsedSize;
					before.unselect();
					expandAccum.set(before.id, 0);
				}
			} else if (before.collapsible && beforeCollapsed && delta > 0) {
				if (drag) {
					size = before.collapsedSize;
					if (canExpand(before, after)) arm(before.id, "expand", delta);
				} else {
					const accum = (expandAccum.get(before.id) ?? 0) + delta;
					expandAccum.set(before.id, accum);
					if (accum >= EXPAND_THRESHOLD) {
						size = /* @__PURE__ */ clamp(accum, before.collapsedSize, before.maxSize);
						before.select();
						expandAccum.delete(before.id);
					} else size = before.collapsedSize;
				}
			} else if (drag) disarm(before.id);
			const afterSize = total - size;
			const afterCollapsed = !toValue(after.isSelected);
			if (after.collapsible && !afterCollapsed && afterSize <= after.minSize && delta > 0) {
				if (drag) {
					if (after.size >= after.minSize) {
						size = total - after.minSize;
						if (canCollapse(after)) arm(after.id, "collapse", Math.max(0, after.minSize - (after.size - delta)));
					}
				} else {
					size = total - after.collapsedSize;
					after.unselect();
					expandAccum.set(after.id, 0);
				}
			} else if (after.collapsible && afterCollapsed && delta < 0) {
				if (drag) {
					size = total - after.collapsedSize;
					if (canExpand(after, before)) arm(after.id, "expand", delta);
				} else {
					const accum = (expandAccum.get(after.id) ?? 0) + Math.abs(delta);
					expandAccum.set(after.id, accum);
					if (accum >= EXPAND_THRESHOLD) {
						size = total - /* @__PURE__ */ clamp(accum, after.collapsedSize, after.maxSize);
						after.select();
						expandAccum.delete(after.id);
					} else size = total - after.collapsedSize;
				}
			} else if (drag) disarm(after.id);
			before.size = size;
			after.size = total - size;
			if (options?.emit) emitLayout();
		}
		function collapse(index, neighborIndex) {
			const ticket = panel(index);
			/* v8 ignore next -- defensive: collapse called only on collapsible+selected panels */
			if (!ticket?.collapsible || !toValue(ticket.isSelected)) return false;
			const neighbor = panel(neighborIndex ?? (index > 0 ? index - 1 : index + 1));
			/* v8 ignore next -- defensive: at least one neighbor exists when there are 2+ panels */
			if (!neighbor) return false;
			const diff = ticket.size - ticket.collapsedSize;
			const absorbed = Math.min(diff, neighbor.maxSize - neighbor.size);
			neighbor.size += absorbed;
			ticket.size = ticket.collapsedSize;
			let remaining = diff - absorbed;
			if (remaining > 0) for (const p of panels.values()) {
				if (p.id === ticket.id || p.id === neighbor.id || remaining <= 0) continue;
				const room = p.maxSize - p.size;
				const take = Math.min(remaining, room);
				p.size += take;
				remaining -= take;
			}
			if (remaining > 0) ticket.size += remaining;
			if (ticket.size <= ticket.collapsedSize) ticket.unselect();
			emitLayout();
			return true;
		}
		function expand(index, neighborIndex) {
			const ticket = panel(index);
			/* v8 ignore next -- defensive: expand called only on collapsible+collapsed panels */
			if (!ticket?.collapsible || toValue(ticket.isSelected)) return false;
			const neighbor = panel(neighborIndex ?? (index > 0 ? index - 1 : index + 1));
			/* v8 ignore next -- defensive: at least one neighbor exists when there are 2+ panels */
			if (!neighbor) return false;
			if (!canExpand(ticket, neighbor)) return false;
			const target = Math.min(ticket.defaultSize, ticket.maxSize);
			const take = Math.min(target - ticket.collapsedSize, neighbor.size - neighbor.minSize);
			neighbor.size -= take;
			ticket.size = ticket.collapsedSize + take;
			ticket.select();
			emitLayout();
			return true;
		}
		function distribute(incoming) {
			const values = panels.values();
			if (incoming.length !== values.length) return;
			for (const [index, ticket] of values.entries()) {
				const value = incoming[index];
				const min = ticket.collapsible && value <= ticket.collapsedSize ? ticket.collapsedSize : ticket.minSize;
				ticket.size = /* @__PURE__ */ clamp(value, min, ticket.maxSize);
			}
			let remainder = 100 - values.reduce((sum, t) => sum + t.size, 0);
			for (const ticket of values) {
				if (remainder === 0) break;
				const min = ticket.collapsible && ticket.size <= ticket.collapsedSize ? ticket.collapsedSize : ticket.minSize;
				const room = remainder > 0 ? ticket.maxSize - ticket.size : ticket.size - min;
				const adjust = remainder > 0 ? Math.min(remainder, room) : Math.max(remainder, -room);
				ticket.size += adjust;
				remainder -= adjust;
			}
			for (const ticket of values) {
				/* v8 ignore next -- defensive: existing tests use collapsible panels */
				if (!ticket.collapsible) continue;
				const collapsed = !toValue(ticket.isSelected);
				if (!collapsed && ticket.size <= ticket.collapsedSize) ticket.unselect();
				else if (collapsed && ticket.size > ticket.collapsedSize) ticket.select();
			}
			emit("layout", values.map((t) => t.size));
		}
		function onStartDrag(index) {
			draggingHandle.value = index;
		}
		function endDrag(commit) {
			if (/* @__PURE__ */ isNull(draggingHandle.value)) return;
			const handleIndex = draggingHandle.value;
			const intent = pending.value;
			draggingHandle.value = null;
			pending.value = null;
			expandAccum.clear();
			intentAccum.clear();
			if (commit && intent) {
				const ticket = panels.get(intent.id);
				if (ticket) {
					const neighborIndex = ticket.index === handleIndex ? handleIndex + 1 : handleIndex;
					if (intent.mode === "collapse" ? collapse(ticket.index, neighborIndex) : expand(ticket.index, neighborIndex)) return;
				}
			}
			emitLayout();
		}
		function onEndDrag() {
			endDrag(true);
		}
		function onAbortDrag() {
			endDrag(false);
		}
		onBeforeUnmount(() => {
			onAbortDrag();
		});
		function emitLayout() {
			emit("layout", panels.values().map((t) => t.size));
		}
		provideSplitterRoot({
			orientation: toRef(() => __props.orientation),
			disabled: toRef(() => __props.disabled),
			panels,
			handles,
			dragging,
			draggingHandle,
			pending,
			rootEl,
			panel,
			resize,
			onStartDrag,
			onEndDrag,
			onAbortDrag,
			collapse,
			expand,
			distribute
		});
		__expose({
			distribute,
			dragging
		});
		const slotProps = toRef(() => ({
			orientation: __props.orientation,
			isDisabled: __props.disabled,
			sizes: panels.values().map((t) => t.size),
			isDragging: dragging.value,
			distribute,
			attrs: {
				"data-orientation": __props.orientation,
				"data-dragging": dragging.value || void 0
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({ ref: "root" }, mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless,
				style: [
					unref(attrs).style,
					slotProps.value.attrs.style,
					{
						display: "flex",
						flexDirection: __props.orientation === "horizontal" ? "row" : "column"
					}
				]
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, [
				"as",
				"renderless",
				"style"
			]);
		};
	}
});
//#endregion
//#region src/components/Splitter/SplitterPanel.vue
const _sfc_main$130 = /*@__PURE__*/ defineComponent({
	name: "SplitterPanel",
	inheritAttrs: false,
	__name: "SplitterPanel",
	props: /*@__PURE__*/ mergeModels({
		defaultSize: {},
		minSize: { default: 0 },
		maxSize: { default: 100 },
		collapsible: {
			type: Boolean,
			default: false
		},
		collapsedSize: { default: 0 },
		as: { default: "div" },
		renderless: { type: Boolean }
	}, {
		"collapsed": { type: Boolean },
		"collapsedModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["update:collapsed", "resize"], ["update:collapsed"]),
	setup(__props, { expose: __expose, emit: __emit }) {
		const attrs = useAttrs();
		const collapsed = useModel(__props, "collapsed");
		const emit = __emit;
		const splitter = useSplitterRoot();
		const panelId = /* @__PURE__ */ useId$1();
		const rootSize = shallowRef(0);
		function isPx(value) {
			return /* @__PURE__ */ isString(value) && value.endsWith("px");
		}
		if (isPx(__props.defaultSize) || isPx(__props.minSize) || isPx(__props.maxSize) || isPx(__props.collapsedSize))
 /* v8 ignore start -- px-mode panels not exercised in happy-dom (no real layout) */
		useResizeObserver(splitter.rootEl, (entries) => {
			const rect = entries[0]?.contentRect;
			rootSize.value = splitter.orientation.value === "horizontal" ? rect?.width ?? 0 : rect?.height ?? 0;
		});
		function percent(value, fallback) {
			if (!/* @__PURE__ */ isString(value)) return value;
			const num = Number.parseFloat(value);
			if (Number.isNaN(num)) return fallback;
			/* v8 ignore start -- px-mode conversion path not exercised in happy-dom (no real layout) */
			if (value.endsWith("px")) {
				const root = splitter.rootEl.value;
				const dimension = rootSize.value || (splitter.orientation.value === "horizontal" ? root?.offsetWidth : root?.offsetHeight) || 0;
				return dimension > 0 ? num / dimension * 100 : fallback;
			}
			/* v8 ignore stop */
			return num;
		}
		const ticket = splitter.panels.register({
			id: panelId,
			size: percent(__props.defaultSize, 0),
			minSize: percent(__props.minSize, 0),
			maxSize: percent(__props.maxSize, 100),
			collapsible: __props.collapsible,
			collapsedSize: percent(__props.collapsedSize, 0),
			defaultSize: percent(__props.defaultSize, 0)
		});
		watchEffect(() => {
			ticket.minSize = percent(__props.minSize, 0);
			ticket.maxSize = percent(__props.maxSize, 100);
			ticket.collapsible = __props.collapsible;
			ticket.collapsedSize = percent(__props.collapsedSize, 0);
			ticket.defaultSize = percent(__props.defaultSize, 0);
		});
		onBeforeUnmount(() => {
			splitter.panels.unregister(ticket.id);
		});
		const size = toRef(() => ticket.size);
		const isCollapsed = toRef(() => __props.collapsible && !toValue(ticket.isSelected));
		function collapse() {
			splitter.collapse(ticket.index);
		}
		function expand() {
			splitter.expand(ticket.index);
		}
		__expose({
			collapse,
			expand,
			size,
			isCollapsed
		});
		watch(collapsed, (val) => {
			if (/* @__PURE__ */ isUndefined(val)) return;
			if (val && !isCollapsed.value) collapse();
			else if (!val && isCollapsed.value) expand();
		}, {
			immediate: true,
			flush: "post"
		});
		watch(isCollapsed, (val) => {
			if (/* @__PURE__ */ isUndefined(collapsed.value)) return;
			collapsed.value = val;
		});
		watch(size, (val) => emit("resize", val));
		const slotProps = toRef(() => ({
			size: size.value,
			isCollapsed: isCollapsed.value,
			collapse,
			expand,
			attrs: {
				"id": panelId,
				"data-orientation": splitter.orientation.value,
				"data-panel-index": ticket.index,
				"data-collapsed": isCollapsed.value || void 0
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless,
				style: [
					unref(attrs).style,
					slotProps.value.attrs.style,
					{
						flexGrow: 0,
						flexShrink: 0,
						flexBasis: `${size.value}%`,
						minWidth: 0,
						minHeight: 0
					}
				]
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, [
				"as",
				"renderless",
				"style"
			]);
		};
	}
});
//#endregion
//#region src/components/Splitter/SplitterHandle.vue
const _sfc_main$129 = /*@__PURE__*/ defineComponent({
	name: "SplitterHandle",
	inheritAttrs: false,
	__name: "SplitterHandle",
	props: {
		disabled: {
			type: Boolean,
			default: false
		},
		label: {},
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const ARROW_STEP = 1;
		const PAGE_STEP = 10;
		const locale = useLocale();
		const splitter = useSplitterRoot();
		const ticket = splitter.handles.register();
		onBeforeUnmount(() => {
			splitter.handles.unregister(ticket.id);
		});
		const hovering = shallowRef(false);
		const startPosition = shallowRef(0);
		let latestPos = 0;
		const isDisabled = toRef(() => __props.disabled || splitter.disabled.value);
		const isHorizontal = toRef(() => splitter.orientation.value === "horizontal");
		const state = toRef(() => {
			if (splitter.draggingHandle.value === ticket.index) return "drag";
			if (hovering.value) return "hover";
			return "inactive";
		});
		const pending = toRef(() => {
			const intent = splitter.pending.value;
			if (!intent) return null;
			if (splitter.draggingHandle.value !== ticket.index) return null;
			const before = splitter.panel(ticket.index);
			const after = splitter.panel(ticket.index + 1);
			return intent.id === before?.id || intent.id === after?.id ? intent.mode : null;
		});
		/* v8 ignore next -- defensive: the handle's index always points to a registered panel */
		const valuenow = toRef(() => Math.round(splitter.panel(ticket.index)?.size ?? 0));
		const valuemin = toRef(() => {
			const p = splitter.panel(ticket.index);
			/* v8 ignore next -- defensive: handle's index always resolves to a registered panel */
			if (!p) return 0;
			return p.collapsible ? p.collapsedSize : p.minSize;
		});
		const valuemax = toRef(() => {
			const p = splitter.panel(ticket.index);
			const adjacent = splitter.panel(ticket.index + 1);
			if (!p || !adjacent) return 100;
			const adjMin = adjacent.collapsible ? adjacent.collapsedSize : adjacent.minSize;
			return Math.min(p.maxSize, p.size + adjacent.size - adjMin);
		});
		function onPointerDown(e) {
			if (isDisabled.value) return;
			e.currentTarget.setPointerCapture(e.pointerId);
			startPosition.value = isHorizontal.value ? e.clientX : e.clientY;
			if (IN_BROWSER) {
				document.documentElement.style.userSelect = "none";
				document.documentElement.style.touchAction = "none";
			}
			splitter.onStartDrag(ticket.index);
		}
		useToggleScope(() => splitter.draggingHandle.value === ticket.index, () => {
			const update = useRaf(() => {
				const root = splitter.rootEl.value;
				/* v8 ignore next -- defensive: drag scope only enters with a mounted root */
				if (!root) return;
				const rootSize = isHorizontal.value ? root.offsetWidth : root.offsetHeight;
				/* v8 ignore next -- happy-dom returns 0 for offset dimensions; not exercised in tests */
				if (!rootSize) return;
				const delta = (latestPos - startPosition.value) / rootSize * 100;
				startPosition.value = latestPos;
				splitter.resize(ticket.index, delta);
			});
			useDocumentEventListener("pointermove", (e) => {
				latestPos = isHorizontal.value ? e.clientX : e.clientY;
				update();
			});
			useDocumentEventListener("pointerup", () => {
				update.cancel();
				/* v8 ignore next 4 -- IN_BROWSER always true in happy-dom test env */
				if (IN_BROWSER) {
					document.documentElement.style.userSelect = "";
					document.documentElement.style.touchAction = "";
				}
				splitter.onEndDrag();
			});
			useDocumentEventListener("pointercancel", () => {
				update.cancel();
				/* v8 ignore next 4 -- IN_BROWSER always true in happy-dom test env */
				if (IN_BROWSER) {
					document.documentElement.style.userSelect = "";
					document.documentElement.style.touchAction = "";
				}
				splitter.onAbortDrag();
			});
			onScopeDispose(() => {
				/* v8 ignore next 4 -- IN_BROWSER always true in happy-dom test env */
				if (IN_BROWSER) {
					document.documentElement.style.userSelect = "";
					document.documentElement.style.touchAction = "";
				}
				splitter.onAbortDrag();
			});
		});
		function onKeydown(e) {
			if (isDisabled.value) return;
			const forward = isHorizontal.value ? "ArrowRight" : "ArrowDown";
			const backward = isHorizontal.value ? "ArrowLeft" : "ArrowUp";
			switch (e.key) {
				case forward:
					e.preventDefault();
					splitter.resize(ticket.index, ARROW_STEP, { emit: true });
					break;
				case backward:
					e.preventDefault();
					splitter.resize(ticket.index, -1, { emit: true });
					break;
				case "PageDown":
					e.preventDefault();
					splitter.resize(ticket.index, PAGE_STEP, { emit: true });
					break;
				case "PageUp":
					e.preventDefault();
					splitter.resize(ticket.index, -10, { emit: true });
					break;
				case "Home": {
					e.preventDefault();
					const p = splitter.panel(ticket.index);
					if (p?.collapsible) splitter.collapse(ticket.index, ticket.index + 1);
					else {
						const current = p?.size ?? 0;
						splitter.resize(ticket.index, valuemin.value - current, { emit: true });
					}
					break;
				}
				case "End": {
					e.preventDefault();
					const p = splitter.panel(ticket.index);
					if (p?.collapsible && !toValue(p.isSelected)) splitter.expand(ticket.index, ticket.index + 1);
					else {
						const current = p?.size ?? 0;
						splitter.resize(ticket.index, valuemax.value - current, { emit: true });
					}
					break;
				}
				case "Enter": {
					e.preventDefault();
					const p = splitter.panel(ticket.index);
					if (!p?.collapsible) break;
					if (toValue(p.isSelected)) splitter.collapse(ticket.index, ticket.index + 1);
					else splitter.expand(ticket.index, ticket.index + 1);
					break;
				}
			}
		}
		function onPointerEnter() {
			hovering.value = true;
		}
		function onPointerLeave() {
			hovering.value = false;
		}
		const ariaOrientation = toRef(() => splitter.orientation.value === "horizontal" ? "vertical" : "horizontal");
		const ariaControls = toRef(() => {
			const p = splitter.panel(ticket.index);
			return /* @__PURE__ */ isNullOrUndefined(p) ? void 0 : String(p.id);
		});
		const slotProps = toRef(() => {
			const pendingLabel = pending.value === "collapse" ? locale.ti("Splitter.releaseToHide") ?? "Release to hide" : pending.value === "expand" ? locale.ti("Splitter.releaseToOpen") ?? "Release to open" : void 0;
			return {
				isDragging: splitter.draggingHandle.value === ticket.index,
				isDisabled: isDisabled.value,
				state: state.value,
				pending: pending.value,
				pendingLabel,
				attrs: {
					"role": "separator",
					"tabindex": isDisabled.value ? -1 : 0,
					"aria-valuenow": valuenow.value,
					"aria-valuemin": valuemin.value,
					"aria-valuemax": valuemax.value,
					"aria-valuetext": pendingLabel,
					"aria-orientation": ariaOrientation.value,
					"aria-controls": ariaControls.value,
					"aria-label": __props.label || (locale.ti("Splitter.handle") ?? "Resize"),
					"aria-disabled": isDisabled.value,
					"data-state": state.value,
					"data-orientation": splitter.orientation.value,
					"data-disabled": isDisabled.value || void 0,
					"data-pending": pending.value ?? void 0,
					"style": { "touch-action": "none" },
					"onPointerdown": onPointerDown,
					"onPointerenter": onPointerEnter,
					"onPointerleave": onPointerLeave,
					"onKeydown": onKeydown
				}
			};
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless,
				style: [
					unref(attrs).style,
					slotProps.value.attrs.style,
					{ flexShrink: 0 }
				]
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, [
				"as",
				"renderless",
				"style"
			]);
		};
	}
});
//#endregion
//#region src/components/Splitter/index.ts
/**
* Splitter component with sub-components for building resizable panel layouts.
*
* @see https://0.vuetifyjs.com/components/semantic/splitter
*
* @example
* ```vue
* <script lang="ts" setup>
*   import { Splitter } from '@vuetify/v0'
* <\/script>
*
* <template>
*   <Splitter.Root orientation="horizontal">
*     <Splitter.Panel :default-size="60" :min-size="20">
*       Left content
*     </Splitter.Panel>
*
*     <Splitter.Handle />
*
*     <Splitter.Panel :default-size="40" :min-size="20">
*       Right content
*     </Splitter.Panel>
*   </Splitter.Root>
* </template>
* ```
*/
const Splitter = {
	/**
	* Root container that provides splitter context and manages panel sizes.
	*
	* @see https://0.vuetifyjs.com/components/semantic/splitter
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Splitter } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Splitter.Root orientation="horizontal">
	*     <Splitter.Panel :default-size="60" :min-size="20">
	*       Left content
	*     </Splitter.Panel>
	*
	*     <Splitter.Handle label="Resize panels" />
	*
	*     <Splitter.Panel :default-size="40" :min-size="20">
	*       Right content
	*     </Splitter.Panel>
	*   </Splitter.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$131,
	/**
	* Resizable panel within a splitter layout, sized via flex-basis percentage.
	*
	* @see https://0.vuetifyjs.com/components/semantic/splitter
	*
	* @example
	* ```vue
	* <Splitter.Panel :default-size="50" :min-size="20" :max-size="80">
	*   Panel content
	* </Splitter.Panel>
	* ```
	*/
	Panel: _sfc_main$130,
	/**
	* Draggable resize handle between two adjacent panels.
	*
	* @see https://0.vuetifyjs.com/components/semantic/splitter
	*
	* @example
	* ```vue
	* <Splitter.Handle label="Resize panels" />
	* ```
	*/
	Handle: _sfc_main$129
};
//#endregion
//#region src/components/DataGrid/DataGridHeader.vue
/**
* @module DataGridHeader
*
* @see https://0.vuetifyjs.com/components/data/data-grid
*
* @remarks
* The `<thead>` element wrapper. Exposes the 2D header grid from the context
* for rendering nested header rows.
*/
const [useDataGridHeader, provideDataGridHeader] = createContext({ suffix: "header" });
const _sfc_main$128 = /*@__PURE__*/ defineComponent({
	name: "DataGridHeader",
	inheritAttrs: false,
	__name: "DataGridHeader",
	props: {
		namespace: { default: "v0:data-grid" },
		as: { default: "thead" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const context = useDataGridRoot(__props.namespace);
		const rows = ref([]);
		function register() {
			const token = {};
			rows.value.push(token);
			const index = toRef(() => {
				const pos = rows.value.indexOf(token);
				return pos === -1 ? void 0 : pos + 1;
			});
			function unregister() {
				const pos = rows.value.indexOf(token);
				if (pos !== -1) rows.value.splice(pos, 1);
			}
			return {
				index,
				unregister
			};
		}
		provideDataGridHeader(__props.namespace, { register });
		const slotProps = toRef(() => ({
			headers: context.headers.value,
			attrs: { role: __props.as === "thead" ? void 0 : "rowgroup" }
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, mergeProps(unref(attrs), slotProps.value.attrs)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/DataGrid/DataGridRow.vue
/**
* @module DataGridRow
*
* @see https://0.vuetifyjs.com/components/data/data-grid
*
* @remarks
* A `<tr>` element. Use inside DataGrid.Header (with Column) or
* DataGrid.Body (with Cell). Exposes selection and expansion state
* when bound to a row item.
*
* When `resizable` is true, the row composes `Splitter.Root` so child
* columns register as `Splitter.Panel`. Splitter cannot live in a native
* table — pass `as="div"` on the Table/Header/Body/Row/Column/Cell chain.
*/
const [useDataGridRow, provideDataGridRow] = createContext({ suffix: "row" });
const _sfc_main$127 = /*@__PURE__*/ defineComponent({
	name: "DataGridRow",
	inheritAttrs: false,
	__name: "DataGridRow",
	props: {
		namespace: { default: "v0:data-grid" },
		id: {},
		value: {},
		index: {},
		selectable: {
			type: Boolean,
			default: false
		},
		resizable: {
			type: Boolean,
			default: false
		},
		as: { default: "tr" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const context = useDataGridRoot(__props.namespace);
		const header = useDataGridHeader(__props.namespace, null);
		const ticket = !/* @__PURE__ */ isUndefined(__props.value) && (/* @__PURE__ */ isUndefined(__props.id) || !context.has(__props.id)) ? context.register({
			id: __props.id,
			value: __props.value
		}) : void 0;
		const panels = [];
		function registerColumn(id) {
			panels.push(id);
		}
		function unregisterColumn(id) {
			const index = panels.indexOf(id);
			if (index !== -1) panels.splice(index, 1);
		}
		provideDataGridRow(__props.namespace, {
			id: toRef(() => ticket?.id ?? __props.id),
			resizable: toRef(() => __props.resizable),
			registerColumn,
			unregisterColumn
		});
		if (ticket) watch(() => __props.value, (next) => {
			if (!/* @__PURE__ */ isUndefined(next)) context.upsert(ticket.id, { value: next });
		});
		function rowId() {
			return ticket?.id ?? __props.id;
		}
		function isHeaderRow() {
			return /* @__PURE__ */ isUndefined(ticket) && /* @__PURE__ */ isUndefined(__props.value) && (/* @__PURE__ */ isUndefined(__props.id) || !context.has(__props.id));
		}
		const headerRow = header && isHeaderRow() ? header.register() : void 0;
		onBeforeUnmount(() => {
			headerRow?.unregister();
			if (ticket) context.unregister(ticket.id);
		});
		const record = toRef(() => {
			if (!/* @__PURE__ */ isUndefined(__props.value)) return __props.value;
			const current = rowId();
			if (/* @__PURE__ */ isUndefined(current)) return void 0;
			return context.get(current)?.value;
		});
		function matches(item) {
			const rec = record.value;
			if (!/* @__PURE__ */ isUndefined(rec) && item === rec) return true;
			const current = rowId();
			return !/* @__PURE__ */ isUndefined(current) && item.id === current;
		}
		const isVisible = toRef(() => {
			if (isHeaderRow()) return true;
			return context.items.value.some((item) => matches(item));
		});
		const rowIndex = toRef(() => {
			if (!/* @__PURE__ */ isUndefined(__props.index)) return __props.index;
			if (isHeaderRow()) return headerRow?.index.value;
			const pos = context.orderedItems.value.findIndex((item) => matches(item));
			if (pos === -1) return void 0;
			return context.headers.value.length + pos + 1;
		});
		const isSelected = toRef(() => {
			const current = rowId();
			if (/* @__PURE__ */ isUndefined(current)) return false;
			return context.selection.isSelected(current);
		});
		const isSelectable = toRef(() => {
			const current = rowId();
			if (/* @__PURE__ */ isUndefined(current)) return false;
			return context.selection.isSelectable(current);
		});
		const isExpanded = toRef(() => {
			const current = rowId();
			if (/* @__PURE__ */ isUndefined(current)) return false;
			return context.expansion.isExpanded(current);
		});
		function toggleSelection() {
			const current = rowId();
			if (/* @__PURE__ */ isUndefined(current) || !isSelectable.value) return;
			context.selection.toggle(current);
		}
		function onClick() {
			if (!__props.selectable) return;
			toggleSelection();
		}
		function toggleExpansion() {
			const current = rowId();
			if (!/* @__PURE__ */ isUndefined(current)) context.expansion.toggle(current);
		}
		function onSplitterLayout(sizes) {
			const visible = new Set(context.layout.columns.value.map((c) => c.id));
			const assigned = /* @__PURE__ */ new Map();
			for (const [index, size] of sizes.entries()) {
				const id = panels[index];
				if (/* @__PURE__ */ isUndefined(id)) return;
				assigned.set(id, size);
			}
			const permuted = [];
			for (const leaf of context.leaves.value) {
				const id = String(leaf.id);
				if (!visible.has(id)) continue;
				const size = assigned.get(id);
				if (/* @__PURE__ */ isUndefined(size)) return;
				permuted.push(size);
			}
			context.layout.distribute(permuted);
		}
		const slotProps = toRef(() => ({
			id: rowId(),
			value: record.value,
			isResizable: __props.resizable,
			isSelected: isSelected.value,
			isSelectable: isSelectable.value,
			isExpanded: isExpanded.value,
			isVisible: isVisible.value,
			toggleSelection,
			toggleExpansion,
			attrs: {
				"role": "row",
				"aria-selected": __props.selectable && !/* @__PURE__ */ isUndefined(rowId()) ? isSelected.value : void 0,
				"aria-rowindex": rowIndex.value,
				"data-selected": isSelected.value || void 0,
				"data-expanded": isExpanded.value || void 0,
				"onClick": __props.selectable ? onClick : void 0
			}
		}));
		const host = toRef(() => __props.resizable ? _sfc_main$131 : _sfc_main$192);
		const binds = toRef(() => __props.resizable ? mergeProps(attrs, slotProps.value.attrs, {
			orientation: "horizontal",
			as: __props.as,
			renderless: __props.renderless,
			onLayout: onSplitterLayout
		}) : mergeProps(attrs, slotProps.value.attrs, {
			as: __props.as,
			renderless: __props.renderless
		}));
		return (_ctx, _cache) => {
			return __props.renderless ? (openBlock(), createBlock(resolveDynamicComponent(host.value), normalizeProps(mergeProps({ key: 0 }, binds.value)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16)) : withDirectives((openBlock(), createBlock(resolveDynamicComponent(host.value), normalizeProps(mergeProps({ key: 1 }, binds.value)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16)), [[vShow, isVisible.value]]);
		};
	}
});
//#endregion
//#region src/components/DataGrid/DataGridCell.vue
/**
* @module DataGridCell
*
* @see https://0.vuetifyjs.com/components/data/data-grid
*
* @remarks
* A `<td>` element for data cells. Exposes editing state, row spanning,
* consumer `colspan`, and layout (pin/size/offset) from the grid context.
*/
const _sfc_main$126 = /*@__PURE__*/ defineComponent({
	name: "DataGridCell",
	inheritAttrs: false,
	__name: "DataGridCell",
	props: {
		namespace: { default: "v0:data-grid" },
		column: {},
		colspan: {},
		as: { default: "td" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const context = useDataGridRoot(__props.namespace);
		const row = useDataGridRow(__props.namespace, null);
		const rowId = toRef(() => toValue(row?.id));
		const isEditing = toRef(() => {
			if (!__props.column || /* @__PURE__ */ isUndefined(rowId.value)) return false;
			const active = context.editing.active.value;
			return active?.row === rowId.value && active?.column === __props.column;
		});
		const rowSpan = toRef(() => {
			if (!__props.column || /* @__PURE__ */ isUndefined(rowId.value)) return 1;
			const spanMap = context.spans.value.get(rowId.value);
			if (!spanMap) return 1;
			return spanMap.get(__props.column)?.rowSpan ?? 1;
		});
		const isHidden = toRef(() => {
			if (!__props.column || /* @__PURE__ */ isUndefined(rowId.value)) return false;
			const spanMap = context.spans.value.get(rowId.value);
			if (!spanMap) return false;
			const entry = spanMap.get(__props.column);
			return !/* @__PURE__ */ isUndefined(entry) && entry.hidden;
		});
		const resolvedColumn = toRef(() => {
			if (!__props.column) return void 0;
			return context.layout.columns.value.find((c) => c.id === __props.column);
		});
		const pinPosition = toRef(() => {
			const pos = resolvedColumn.value?.pinned;
			if (pos === "left" || pos === "right") return pos;
			return false;
		});
		const isPinned = toRef(() => pinPosition.value !== false);
		const size = toRef(() => resolvedColumn.value?.size ?? 0);
		const offset = toRef(() => resolvedColumn.value?.offset ?? 0);
		function colIndex() {
			if (__props.as === "td" || !__props.column) return void 0;
			const index = context.layout.columns.value.findIndex((c) => c.id === __props.column);
			return index === -1 ? void 0 : index + 1;
		}
		const slotProps = toRef(() => ({
			isEditing: isEditing.value,
			rowSpan: rowSpan.value,
			isPinned: isPinned.value,
			pinPosition: pinPosition.value,
			size: size.value,
			offset: offset.value,
			attrs: {
				"role": "cell",
				"colspan": __props.as === "td" ? __props.colspan : void 0,
				"rowspan": __props.as === "td" && rowSpan.value > 1 ? rowSpan.value : void 0,
				"aria-colspan": __props.as !== "td" && (__props.colspan ?? 1) > 1 ? __props.colspan : void 0,
				"aria-rowspan": __props.as !== "td" && rowSpan.value > 1 ? rowSpan.value : void 0,
				"aria-colindex": colIndex(),
				"data-state": isEditing.value ? "editing" : void 0,
				"style": size.value > 0 ? {
					width: `${size.value}%`,
					flexBasis: `${size.value}%`,
					flexGrow: 0,
					flexShrink: 0
				} : void 0
			}
		}));
		return (_ctx, _cache) => {
			return !isHidden.value ? (openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				key: 0,
				as: __props.as,
				renderless: __props.renderless
			}, mergeProps(unref(attrs), slotProps.value.attrs)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"])) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region src/components/DataGrid/DataGridColumn.vue
/**
* @module DataGridColumn
*
* @see https://0.vuetifyjs.com/components/data/data-grid
*
* @remarks
* A `<th>` element for header cells. Exposes sort state, pin, and layout
* information from the grid context. Registers on mount when `id` is set.
*
* When inside a resizable `DataGridRow`, this component composes
* `Splitter.Panel`. Keep the consumer `as` — do not swap `th` for `div`.
*/
const _sfc_main$125 = /*@__PURE__*/ defineComponent({
	name: "DataGridColumn",
	inheritAttrs: false,
	__name: "DataGridColumn",
	props: {
		namespace: { default: "v0:data-grid" },
		id: {},
		sortable: { type: Boolean },
		filterable: { type: Boolean },
		size: {},
		minSize: {},
		maxSize: {},
		pinned: { type: [String, Boolean] },
		resizable: {
			type: Boolean,
			default: true
		},
		editable: { type: Boolean },
		validate: { type: Function },
		colspan: {},
		rowspan: {},
		as: { default: "th" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const context = useDataGridRoot(__props.namespace);
		const rowContext = useDataGridRow(__props.namespace, null);
		const ticket = !/* @__PURE__ */ isUndefined(__props.id) && !context.columns.has(__props.id) ? context.columns.register({
			id: __props.id,
			sortable: () => toValue(__props.sortable) ?? false,
			filterable: () => toValue(__props.filterable) ?? false,
			size: __props.size,
			minSize: __props.minSize,
			maxSize: __props.maxSize,
			pinned: __props.pinned,
			resizable: __props.resizable,
			editable: __props.editable,
			validate: __props.validate
		}) : void 0;
		if (!/* @__PURE__ */ isUndefined(__props.id)) rowContext?.registerColumn(__props.id);
		onBeforeUnmount(() => {
			if (ticket) context.columns.unregister(ticket.id);
			if (!/* @__PURE__ */ isUndefined(__props.id)) rowContext?.unregisterColumn(__props.id);
		});
		const inResizableRow = toRef(() => toValue(rowContext?.resizable) ?? false);
		const isSortable = toRef(() => {
			if (!__props.id) return false;
			return context.leaves.value.some((col) => col.id === __props.id && toValue(col.sortable) === true);
		});
		const direction = toRef(() => {
			if (!__props.id) return "none";
			return context.sort.direction(__props.id);
		});
		const priority = toRef(() => {
			if (!__props.id) return -1;
			return context.sort.priority(__props.id);
		});
		function toggle() {
			if (__props.id && isSortable.value) context.sort.toggle(__props.id);
		}
		const resolvedColumn = toRef(() => {
			if (!__props.id) return void 0;
			return context.layout.columns.value.find((c) => c.id === __props.id);
		});
		const pinPosition = toRef(() => {
			const pos = resolvedColumn.value?.pinned;
			if (pos === "left" || pos === "right") return pos;
			return false;
		});
		const isPinned = toRef(() => pinPosition.value !== false);
		const isResizable = toRef(() => resolvedColumn.value?.resizable ?? true);
		const size = toRef(() => resolvedColumn.value?.size ?? 0);
		const minSize = toRef(() => resolvedColumn.value?.minSize ?? 2);
		const maxSize = toRef(() => resolvedColumn.value?.maxSize ?? 100);
		const offset = toRef(() => resolvedColumn.value?.offset ?? 0);
		const ariaSort = toRef(() => {
			if (!isSortable.value) return void 0;
			const dir = direction.value;
			if (dir === "asc") return "ascending";
			if (dir === "desc") return "descending";
			return "none";
		});
		const slotProps = toRef(() => ({
			isSortable: isSortable.value,
			direction: direction.value,
			priority: priority.value,
			toggle,
			isPinned: isPinned.value,
			pinPosition: pinPosition.value,
			isResizable: isResizable.value,
			size: size.value,
			minSize: minSize.value,
			maxSize: maxSize.value,
			offset: offset.value,
			attrs: {
				"role": "columnheader",
				"scope": __props.as === "th" ? (__props.colspan ?? 1) > 1 ? "colgroup" : "col" : void 0,
				"aria-sort": ariaSort.value,
				"data-direction": isSortable.value && (direction.value === "asc" || direction.value === "desc") ? direction.value : void 0,
				"colspan": __props.as === "th" ? __props.colspan : void 0,
				"rowspan": __props.as === "th" ? __props.rowspan : void 0,
				"aria-colspan": __props.as !== "th" && (__props.colspan ?? 1) > 1 ? __props.colspan : void 0,
				"aria-rowspan": __props.as !== "th" && (__props.rowspan ?? 1) > 1 ? __props.rowspan : void 0,
				"style": size.value > 0 ? { width: `${size.value}%` } : void 0
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(resolveDynamicComponent(inResizableRow.value ? unref(_sfc_main$130) : unref(_sfc_main$192)), normalizeProps(guardReactiveProps(inResizableRow.value ? mergeProps(unref(attrs), slotProps.value.attrs, {
				as: __props.as,
				defaultSize: size.value,
				minSize: minSize.value,
				maxSize: maxSize.value,
				renderless: __props.renderless
			}) : mergeProps(unref(attrs), slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}))), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region src/components/DataGrid/DataGridEmpty.vue
/**
* @module DataGridEmpty
*
* @see https://0.vuetifyjs.com/components/data/data-grid
*
* @remarks
* Empty state component that renders when the grid has no items.
* Conditionally renders based on the items count.
*/
const _sfc_main$124 = /*@__PURE__*/ defineComponent({
	name: "DataGridEmpty",
	inheritAttrs: false,
	__name: "DataGridEmpty",
	props: {
		namespace: { default: "v0:data-grid" },
		as: { default: "tr" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const context = useDataGridRoot(__props.namespace);
		const isEmpty = toRef(() => context.items.value.length === 0);
		const slotProps = toRef(() => ({
			isLoading: context.loading.value,
			columnCount: context.leaves.value.length,
			attrs: { role: __props.as === "tr" ? void 0 : "row" }
		}));
		return (_ctx, _cache) => {
			return isEmpty.value ? (openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				key: 0,
				as: __props.as,
				renderless: __props.renderless
			}, mergeProps(unref(attrs), slotProps.value.attrs)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"])) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region src/components/DataGrid/DataGridHandle.vue
/**
* @module DataGridHandle
*
* @see https://0.vuetifyjs.com/components/data/data-grid
*
* @remarks
* Column resize handle for the data grid. Thin wrapper around
* Splitter.Handle. Only mounts inside a resizable DataGridRow — otherwise
* renders nothing so it cannot hijack an ancestor Splitter or throw
* V0_CONTEXT_MISSING.
*/
const _sfc_main$123 = /*@__PURE__*/ defineComponent({
	name: "DataGridHandle",
	inheritAttrs: false,
	__name: "DataGridHandle",
	props: {
		namespace: { default: "v0:data-grid" },
		disabled: {
			type: Boolean,
			default: false
		},
		label: {},
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const row = useDataGridRow(__props.namespace, null);
		const isResizable = toRef(() => toValue(row?.resizable) ?? false);
		const locale = useLocale();
		const resolvedLabel = toRef(() => __props.label ?? locale.ti("DataGrid.resizeHandle") ?? "Resize column");
		return (_ctx, _cache) => {
			return isResizable.value ? (openBlock(), createBlock(unref(_sfc_main$129), mergeProps({ key: 0 }, unref(attrs), {
				as: __props.as,
				disabled: __props.disabled,
				label: resolvedLabel.value,
				renderless: __props.renderless
			}), {
				default: withCtx((handleProps) => [renderSlot(_ctx.$slots, "default", {
					attrs: handleProps.attrs,
					isDisabled: handleProps.isDisabled,
					isDragging: handleProps.isDragging,
					state: handleProps.state
				})]),
				_: 3
			}, 16, [
				"as",
				"disabled",
				"label",
				"renderless"
			])) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region src/components/DataGrid/DataGridTable.vue
/**
* @module DataGridTable
*
* @see https://0.vuetifyjs.com/components/data/data-grid
*
* @remarks
* The `<table>` element wrapper for the DataGrid compound. Renders a semantic
* table with proper ARIA attributes. This is not an APG Grid widget.
*/
const _sfc_main$122 = /*@__PURE__*/ defineComponent({
	name: "DataGridTable",
	inheritAttrs: false,
	__name: "DataGridTable",
	props: {
		namespace: { default: "v0:data-grid" },
		as: { default: "table" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const context = useDataGridRoot(__props.namespace);
		const headerRows = toRef(() => context.headers.value.length);
		const truncated = toRef(() => context.items.value.length < context.total.value);
		const slotProps = toRef(() => ({ attrs: {
			"role": "table",
			"aria-rowcount": truncated.value ? headerRows.value + context.total.value : void 0
		} }));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, mergeProps(unref(attrs), slotProps.value.attrs)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/DataGrid/index.ts
/**
* DataGrid compound component for building data grids.
*
* @see https://0.vuetifyjs.com/components/data/data-grid
*
* @example
* ```vue
* <script setup lang="ts">
*   import { DataGrid } from '@vuetify/v0'
*
*   const users = [
*     { id: 1, name: 'John', email: 'john@example.com' },
*     { id: 2, name: 'Jane', email: 'jane@example.com' },
*   ]
*
* <\/script>
*
* <template>
*   <DataGrid.Root>
*     <DataGrid.Table>
*       <DataGrid.Header>
*         <DataGrid.Row>
*           <DataGrid.Column id="name">Name</DataGrid.Column>
*           <DataGrid.Column id="email">Email</DataGrid.Column>
*         </DataGrid.Row>
*       </DataGrid.Header>
*
*       <DataGrid.Body v-slot="{ rank }">
*         <DataGrid.Row
*           v-for="user in rank(users)"
*           :id="user.id"
*           :value="user"
*           :key="user.id"
*         >
*           <DataGrid.Cell column="name">{{ user.name }}</DataGrid.Cell>
*           <DataGrid.Cell column="email">{{ user.email }}</DataGrid.Cell>
*         </DataGrid.Row>
*
*         <DataGrid.Empty v-slot="{ columnCount }">
*           <DataGrid.Cell :colspan="columnCount">No data available</DataGrid.Cell>
*         </DataGrid.Empty>
*       </DataGrid.Body>
*     </DataGrid.Table>
*   </DataGrid.Root>
* </template>
* ```
*/
const DataGrid = {
	/**
	* Provider that creates `createDataGrid`. Children register when they mount.
	*
	* @see https://0.vuetifyjs.com/components/data/data-grid
	*
	* @example
	* ```vue
	* <DataGrid.Root v-model:search="query" v-slot="{ context }">
	*   <!-- context.items is derived from mounted Row children -->
	* </DataGrid.Root>
	* ```
	*/
	Root: _sfc_main$133,
	/**
	* The `<table>` element wrapper with ARIA table role. `aria-rowcount` is
	* set only when the current page is a subset of total.
	*
	* @see https://0.vuetifyjs.com/components/data/data-grid
	*
	* @example
	* ```vue
	* <DataGrid.Table>
	*   <DataGrid.Header />
	*   <DataGrid.Body />
	* </DataGrid.Table>
	* ```
	*/
	Table: _sfc_main$122,
	/**
	* The `<thead>` element wrapper. Exposes the 2D header grid after columns register.
	*
	* @see https://0.vuetifyjs.com/components/data/data-grid
	*
	* @example
	* ```vue
	* <DataGrid.Header>
	*   <DataGrid.Row>
	*     <DataGrid.Column id="name">Name</DataGrid.Column>
	*   </DataGrid.Row>
	* </DataGrid.Header>
	* ```
	*/
	Header: _sfc_main$128,
	/**
	* A `<th>` element for header cells with sort state, pin, and layout.
	* Composes `Splitter.Panel` when inside a resizable `DataGridRow`.
	*
	* @see https://0.vuetifyjs.com/components/data/data-grid
	*
	* @example
	* ```vue
	* <DataGrid.Column
	*   id="name"
	*   v-slot="{ isSortable, toggle }"
	* >
	*   <Button.Root v-if="isSortable" @click="toggle">
	*     Name
	*   </Button.Root>
	*   <span v-else>Name</span>
	* </DataGrid.Column>
	* ```
	*/
	Column: _sfc_main$125,
	/**
	* The `<tbody>` element wrapper. Exposes paginated items.
	*
	* @see https://0.vuetifyjs.com/components/data/data-grid
	*
	* @example
	* ```vue
	* <DataGrid.Body v-slot="{ rank }">
	*   <DataGrid.Row
	*     v-for="user in rank(users)"
	*     :id="user.id"
	*     :key="user.id"
	*     :value="user"
	*   >
	*     <!-- cells -->
	*   </DataGrid.Row>
	* </DataGrid.Body>
	* ```
	*/
	Body: _sfc_main$132,
	/**
	* A `<tr>` element for data rows with selection and expansion state.
	*
	* @see https://0.vuetifyjs.com/components/data/data-grid
	*
	* @example
	* ```vue
	* <DataGrid.Row
	*   :id="item.id"
	*   :value="item"
	*   v-slot="{ isSelected, toggleSelection }"
	* >
	*   <DataGrid.Cell column="name">
	*     <Button.Root :aria-pressed="isSelected" @click="toggleSelection">
	*       Select
	*     </Button.Root>
	*   </DataGrid.Cell>
	* </DataGrid.Row>
	* ```
	*/
	Row: _sfc_main$127,
	/**
	* A `<td>` element for data cells with editing state and row spanning.
	*
	* @see https://0.vuetifyjs.com/components/data/data-grid
	*
	* @example
	* ```vue
	* <DataGrid.Cell v-slot="{ isEditing }" column="name">
	*   {{ isEditing ? 'editing' : item.name }}
	* </DataGrid.Cell>
	*
	* <DataGrid.Empty v-slot="{ columnCount }">
	*   <DataGrid.Cell :colspan="columnCount">No data available</DataGrid.Cell>
	* </DataGrid.Empty>
	* ```
	*/
	Cell: _sfc_main$126,
	/**
	* Empty state row that renders when the grid has no items.
	*
	* @see https://0.vuetifyjs.com/components/data/data-grid
	*
	* @example
	* ```vue
	* <DataGrid.Empty v-slot="{ columnCount }">
	*   <DataGrid.Cell :colspan="columnCount">
	*     No data available
	*   </DataGrid.Cell>
	* </DataGrid.Empty>
	* ```
	*/
	Empty: _sfc_main$124,
	/**
	* Column resize handle. Wraps `Splitter.Handle` for drag interaction.
	* Nest inside a `DataGridColumn` (except the last) in a resizable row
	* that uses the full `as="div"` chain.
	*
	* @see https://0.vuetifyjs.com/components/data/data-grid
	*
	* @example
	* ```vue
	* <DataGrid.Table as="div">
	*   <DataGrid.Header as="div">
	*     <DataGrid.Row as="div" resizable>
	*       <DataGrid.Column as="div" id="name">
	*         Name
	*         <DataGrid.Handle />
	*       </DataGrid.Column>
	*       <DataGrid.Column as="div" id="email">Email</DataGrid.Column>
	*     </DataGrid.Row>
	*   </DataGrid.Header>
	* </DataGrid.Table>
	* ```
	*/
	Handle: _sfc_main$123
};
//#endregion
//#region src/components/DataTable/DataTableRoot.vue
/**
* @module DataTableRoot
*
* @see https://0.vuetifyjs.com/components/data/data-table
*
* @remarks
* Provider for the DataTable compound. Creates `createDataTable` and
* provides it to children. Rows and columns register themselves when
* they mount — same lifecycle as Checkbox.Group. Renders only slot content.
*/
const [_useDataTableRoot, provideDataTableRoot] = createContext();
function useDataTableRoot(namespace = "v0:data-table") {
	return _useDataTableRoot(namespace);
}
const _sfc_main$121 = /*@__PURE__*/ defineComponent({
	name: "DataTableRoot",
	__name: "DataTableRoot",
	props: /*@__PURE__*/ mergeModels({
		namespace: { default: "v0:data-table" },
		filter: {},
		pagination: {},
		sortMultiple: { type: Boolean },
		mandate: { type: Boolean },
		firstSortOrder: {},
		selectStrategy: {},
		itemSelectable: {},
		groupBy: {},
		openAll: { type: Boolean },
		expandMultiple: { type: Boolean },
		locale: {},
		adapter: {}
	}, {
		"search": { default: "" },
		"searchModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["update:search"], ["update:search"]),
	setup(__props) {
		const context = createDataTable({
			filter: __props.filter,
			pagination: __props.pagination,
			sortMultiple: __props.sortMultiple,
			mandate: __props.mandate,
			firstSortOrder: __props.firstSortOrder,
			selectStrategy: __props.selectStrategy,
			itemSelectable: __props.itemSelectable,
			groupBy: __props.groupBy,
			openAll: __props.openAll,
			expandMultiple: __props.expandMultiple,
			locale: __props.locale,
			adapter: __props.adapter
		});
		provideDataTableRoot(__props.namespace, context);
		const search = useModel(__props, "search");
		watch(search, (value) => {
			if (context.query.value !== (value ?? "")) context.search(value ?? "");
		}, { immediate: true });
		watch(context.query, (value) => {
			if (search.value !== value) search.value = value;
		});
		const slotProps = toRef(() => ({ context }));
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)));
		};
	}
});
//#endregion
//#region src/components/DataTable/DataTableBody.vue
/**
* @module DataTableBody
*
* @see https://0.vuetifyjs.com/components/data/data-table
*
* @remarks
* The `<tbody>` element wrapper. Slot exposes `rank`, `items`, and `isEmpty`.
*/
const _sfc_main$120 = /*@__PURE__*/ defineComponent({
	name: "DataTableBody",
	inheritAttrs: false,
	__name: "DataTableBody",
	props: {
		namespace: { default: "v0:data-table" },
		as: { default: "tbody" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const context = useDataTableRoot(__props.namespace);
		const slotProps = toRef(() => ({
			items: context.items.value,
			rank: context.rank,
			isLoading: context.loading.value,
			isEmpty: context.items.value.length === 0,
			attrs: { role: __props.as === "tbody" ? void 0 : "rowgroup" }
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, mergeProps(unref(attrs), slotProps.value.attrs)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/DataTable/DataTableCell.vue
/**
* @module DataTableCell
*
* @see https://0.vuetifyjs.com/components/data/data-table
*
* @remarks
* A `<td>` element for data cells. Use inside DataTable.Row.
*/
const _sfc_main$119 = /*@__PURE__*/ defineComponent({
	name: "DataTableCell",
	inheritAttrs: false,
	__name: "DataTableCell",
	props: {
		colspan: {},
		rowspan: {},
		as: { default: "td" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const slotProps = toRef(() => ({ attrs: {
			role: "cell",
			colspan: __props.colspan,
			rowspan: __props.rowspan
		} }));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, mergeProps(unref(attrs), slotProps.value.attrs)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/DataTable/DataTableColumn.vue
/**
* @module DataTableColumn
*
* @see https://0.vuetifyjs.com/components/data/data-table
*
* @remarks
* A `<th>` element for header cells. Exposes sort state and controls
* for sortable columns. Use inside DataTable.Row.
*/
const _sfc_main$118 = /*@__PURE__*/ defineComponent({
	name: "DataTableColumn",
	inheritAttrs: false,
	__name: "DataTableColumn",
	props: {
		namespace: { default: "v0:data-table" },
		id: {},
		sortable: {
			type: Boolean,
			default: false
		},
		filterable: {
			type: Boolean,
			default: false
		},
		colspan: {},
		rowspan: {},
		as: { default: "th" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const context = useDataTableRoot(__props.namespace);
		const ticket = !/* @__PURE__ */ isUndefined(__props.id) && !context.columns.has(__props.id) ? context.columns.register({
			id: __props.id,
			sortable: () => toValue(__props.sortable) ?? false,
			filterable: () => toValue(__props.filterable) ?? false
		}) : void 0;
		onBeforeUnmount(() => {
			if (ticket) context.columns.unregister(ticket.id);
		});
		const isSortable = toRef(() => {
			if (!__props.id) return false;
			return context.leaves.value.some((col) => col.id === __props.id && toValue(col.sortable) === true);
		});
		const direction = toRef(() => {
			if (!__props.id) return "none";
			return context.sort.direction(__props.id);
		});
		const priority = toRef(() => {
			if (!__props.id) return -1;
			return context.sort.priority(__props.id);
		});
		function toggle() {
			if (__props.id && isSortable.value) context.sort.toggle(__props.id);
		}
		const ariaSort = toRef(() => {
			if (!isSortable.value) return void 0;
			const dir = direction.value;
			if (dir === "asc") return "ascending";
			if (dir === "desc") return "descending";
			return "none";
		});
		const slotProps = toRef(() => ({
			isSortable: isSortable.value,
			direction: direction.value,
			priority: priority.value,
			toggle,
			attrs: {
				"role": "columnheader",
				"scope": (__props.colspan ?? 1) > 1 ? "colgroup" : "col",
				"aria-sort": ariaSort.value,
				"data-direction": isSortable.value && (direction.value === "asc" || direction.value === "desc") ? direction.value : void 0,
				"colspan": __props.colspan,
				"rowspan": __props.rowspan
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, mergeProps(unref(attrs), slotProps.value.attrs)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/DataTable/DataTableEmpty.vue
/**
* @module DataTableEmpty
*
* @see https://0.vuetifyjs.com/components/data/data-table
*
* @remarks
* Empty state component that renders when the table has no items.
* Conditionally renders based on the items count.
*/
const _sfc_main$117 = /*@__PURE__*/ defineComponent({
	name: "DataTableEmpty",
	inheritAttrs: false,
	__name: "DataTableEmpty",
	props: {
		namespace: { default: "v0:data-table" },
		as: { default: "tr" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const context = useDataTableRoot(__props.namespace);
		const isEmpty = toRef(() => context.items.value.length === 0);
		const slotProps = toRef(() => ({
			isLoading: context.loading.value,
			columnCount: context.leaves.value.length,
			attrs: { role: __props.as === "tr" ? void 0 : "row" }
		}));
		return (_ctx, _cache) => {
			return isEmpty.value ? (openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				key: 0,
				as: __props.as,
				renderless: __props.renderless
			}, mergeProps(unref(attrs), slotProps.value.attrs)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"])) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region src/components/DataTable/DataTableHeader.vue
/**
* @module DataTableHeader
*
* @see https://0.vuetifyjs.com/components/data/data-table
*
* @remarks
* The `<thead>` element wrapper. Exposes the 2D header grid from the context
* for rendering nested header rows.
*/
const _sfc_main$116 = /*@__PURE__*/ defineComponent({
	name: "DataTableHeader",
	inheritAttrs: false,
	__name: "DataTableHeader",
	props: {
		namespace: { default: "v0:data-table" },
		as: { default: "thead" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const context = useDataTableRoot(__props.namespace);
		const slotProps = toRef(() => ({
			headers: context.headers.value,
			attrs: { role: __props.as === "thead" ? void 0 : "rowgroup" }
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, mergeProps(unref(attrs), slotProps.value.attrs)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/DataTable/DataTableRow.vue
/**
* @module DataTableRow
*
* @see https://0.vuetifyjs.com/components/data/data-table
*
* @remarks
* A `<tr>` element. Use inside DataTable.Header (with Column) or
* DataTable.Body (with Cell). Exposes selection and expansion state
* when bound to a row item.
*/
const _sfc_main$115 = /*@__PURE__*/ defineComponent({
	name: "DataTableRow",
	inheritAttrs: false,
	__name: "DataTableRow",
	props: {
		namespace: { default: "v0:data-table" },
		id: {},
		value: {},
		index: {},
		selectable: {
			type: Boolean,
			default: false
		},
		as: { default: "tr" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const context = useDataTableRoot(__props.namespace);
		const ticket = !/* @__PURE__ */ isUndefined(__props.value) && (/* @__PURE__ */ isUndefined(__props.id) || !context.has(__props.id)) ? context.register({
			id: __props.id,
			value: __props.value
		}) : void 0;
		if (ticket) watch(() => __props.value, (next) => {
			if (!/* @__PURE__ */ isUndefined(next)) context.upsert(ticket.id, { value: next });
		});
		onBeforeUnmount(() => {
			if (ticket) context.unregister(ticket.id);
		});
		function rowId() {
			return ticket?.id ?? __props.id;
		}
		function isHeaderRow() {
			return /* @__PURE__ */ isUndefined(ticket) && /* @__PURE__ */ isUndefined(__props.value) && (/* @__PURE__ */ isUndefined(__props.id) || !context.has(__props.id));
		}
		const record = toRef(() => {
			if (!/* @__PURE__ */ isUndefined(__props.value)) return __props.value;
			const current = rowId();
			if (/* @__PURE__ */ isUndefined(current)) return void 0;
			return context.get(current)?.value;
		});
		function matches(item) {
			const rec = record.value;
			if (!/* @__PURE__ */ isUndefined(rec) && item === rec) return true;
			const current = rowId();
			return !/* @__PURE__ */ isUndefined(current) && item.id === current;
		}
		const isVisible = toRef(() => {
			if (isHeaderRow()) return true;
			return context.items.value.some((item) => matches(item));
		});
		const rowIndex = toRef(() => {
			if (!/* @__PURE__ */ isUndefined(__props.index)) return __props.index;
			if (isHeaderRow()) return void 0;
			const pos = context.sortedItems.value.findIndex((item) => matches(item));
			if (pos === -1) return void 0;
			return context.headers.value.length + pos + 1;
		});
		const isSelected = toRef(() => {
			const current = rowId();
			if (/* @__PURE__ */ isUndefined(current)) return false;
			return context.selection.isSelected(current);
		});
		const isSelectable = toRef(() => {
			const current = rowId();
			if (/* @__PURE__ */ isUndefined(current)) return false;
			return context.selection.isSelectable(current);
		});
		const isExpanded = toRef(() => {
			const current = rowId();
			if (/* @__PURE__ */ isUndefined(current)) return false;
			return context.expansion.isExpanded(current);
		});
		function toggleSelection() {
			const current = rowId();
			if (/* @__PURE__ */ isUndefined(current) || !isSelectable.value) return;
			context.selection.toggle(current);
		}
		function onClick() {
			if (!__props.selectable) return;
			toggleSelection();
		}
		function toggleExpansion() {
			const current = rowId();
			if (!/* @__PURE__ */ isUndefined(current)) context.expansion.toggle(current);
		}
		const slotProps = toRef(() => ({
			id: rowId(),
			value: record.value,
			isSelected: isSelected.value,
			isSelectable: isSelectable.value,
			isExpanded: isExpanded.value,
			isVisible: isVisible.value,
			toggleSelection,
			toggleExpansion,
			attrs: {
				"role": "row",
				"aria-selected": __props.selectable && !/* @__PURE__ */ isUndefined(rowId()) ? isSelected.value : void 0,
				"aria-rowindex": rowIndex.value,
				"data-selected": isSelected.value || void 0,
				"data-expanded": isExpanded.value || void 0,
				"onClick": __props.selectable ? onClick : void 0
			}
		}));
		return (_ctx, _cache) => {
			return withDirectives((openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, mergeProps(unref(attrs), slotProps.value.attrs)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"])), [[vShow, isVisible.value]]);
		};
	}
});
//#endregion
//#region src/components/DataTable/DataTableTable.vue
/**
* @module DataTableTable
*
* @see https://0.vuetifyjs.com/components/data/data-table
*
* @remarks
* The `<table>` element wrapper for the DataTable compound. Renders a semantic
* table with proper ARIA attributes.
*/
const _sfc_main$114 = /*@__PURE__*/ defineComponent({
	name: "DataTableTable",
	inheritAttrs: false,
	__name: "DataTableTable",
	props: {
		namespace: { default: "v0:data-table" },
		as: { default: "table" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const context = useDataTableRoot(__props.namespace);
		const headerRows = toRef(() => context.headers.value.length);
		const truncated = toRef(() => context.items.value.length < context.total.value);
		const slotProps = toRef(() => ({ attrs: {
			"role": "table",
			"aria-rowcount": truncated.value ? headerRows.value + context.total.value : void 0
		} }));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, mergeProps(unref(attrs), slotProps.value.attrs)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/DataTable/index.ts
/**
* DataTable compound component for rendering tabular data.
*
* @see https://0.vuetifyjs.com/components/data/data-table
*
* @example
* ```vue
* <script setup lang="ts">
*   import { DataTable } from '@vuetify/v0'
*
*   const users = [
*     { id: 1, name: 'Alice', email: 'alice@test.com' },
*     { id: 2, name: 'Bob', email: 'bob@test.com' },
*   ]
* <\/script>
*
* <template>
*   <DataTable.Root>
*     <DataTable.Table>
*       <DataTable.Header>
*         <DataTable.Row>
*           <DataTable.Column id="name" sortable>Name</DataTable.Column>
*           <DataTable.Column id="email">Email</DataTable.Column>
*         </DataTable.Row>
*       </DataTable.Header>
*
*       <DataTable.Body v-slot="{ rank }">
*         <DataTable.Row
*           v-for="user in rank(users)"
*           :id="user.id"
*           :key="user.id"
*           :value="user"
*         >
*           <DataTable.Cell>{{ user.name }}</DataTable.Cell>
*           <DataTable.Cell>{{ user.email }}</DataTable.Cell>
*         </DataTable.Row>
*
*         <DataTable.Empty v-slot="{ columnCount }">
*           <DataTable.Cell :colspan="columnCount">No data available</DataTable.Cell>
*         </DataTable.Empty>
*       </DataTable.Body>
*     </DataTable.Table>
*   </DataTable.Root>
* </template>
* ```
*/
const DataTable = {
	/**
	* Provider that creates `createDataTable`. Children register when they mount.
	*
	* @see https://0.vuetifyjs.com/components/data/data-table
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { DataTable } from '@vuetify/v0'
	*   import { shallowRef } from 'vue'
	*
	*   const query = shallowRef('')
	* <\/script>
	*
	* <template>
	*   <DataTable.Root v-model:search="query" v-slot="{ context }">
	*     <input v-model="query" type="search" aria-label="Search">
	*     <!-- context.items is derived from mounted Row children -->
	*   </DataTable.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$121,
	/**
	* The `<table>` element wrapper with ARIA table role. `aria-rowcount` is
	* set only when the current page is a subset of total.
	*
	* @see https://0.vuetifyjs.com/components/data/data-table
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { DataTable } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <DataTable.Root>
	*     <DataTable.Table aria-label="Users">
	*       <DataTable.Header />
	*       <DataTable.Body />
	*     </DataTable.Table>
	*   </DataTable.Root>
	* </template>
	* ```
	*/
	Table: _sfc_main$114,
	/**
	* The `<thead>` element wrapper. Exposes the 2D header grid after columns register.
	*
	* @see https://0.vuetifyjs.com/components/data/data-table
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { DataTable } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <DataTable.Root>
	*     <DataTable.Table>
	*       <DataTable.Header>
	*         <DataTable.Row>
	*           <DataTable.Column id="name" sortable>Name</DataTable.Column>
	*           <DataTable.Column id="email">Email</DataTable.Column>
	*         </DataTable.Row>
	*       </DataTable.Header>
	*     </DataTable.Table>
	*   </DataTable.Root>
	* </template>
	* ```
	*/
	Header: _sfc_main$116,
	/**
	* A `<th>` element for header cells with sort state and controls.
	*
	* @see https://0.vuetifyjs.com/components/data/data-table
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Button, DataTable } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <DataTable.Root>
	*     <DataTable.Table>
	*       <DataTable.Header>
	*         <DataTable.Row>
	*           <DataTable.Column id="name" sortable v-slot="{ isSortable, toggle }">
	*             <Button.Root v-if="isSortable" @click="toggle">Name</Button.Root>
	*             <span v-else>Name</span>
	*           </DataTable.Column>
	*         </DataTable.Row>
	*       </DataTable.Header>
	*     </DataTable.Table>
	*   </DataTable.Root>
	* </template>
	* ```
	*/
	Column: _sfc_main$118,
	/**
	* The `<tbody>` element wrapper. Slot exposes `rank`, `items`, and `isEmpty`.
	*
	* @see https://0.vuetifyjs.com/components/data/data-table
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { DataTable } from '@vuetify/v0'
	*
	*   const users = [
	*     { id: 1, name: 'Alice' },
	*     { id: 2, name: 'Bob' },
	*   ]
	* <\/script>
	*
	* <template>
	*   <DataTable.Root>
	*     <DataTable.Table>
	*       <DataTable.Header>
	*         <DataTable.Row>
	*           <DataTable.Column id="name">Name</DataTable.Column>
	*         </DataTable.Row>
	*       </DataTable.Header>
	*
	*       <DataTable.Body v-slot="{ rank }">
	*         <DataTable.Row
	*           v-for="user in rank(users)"
	*           :id="user.id"
	*           :key="user.id"
	*           :value="user"
	*         >
	*           <DataTable.Cell>{{ user.name }}</DataTable.Cell>
	*         </DataTable.Row>
	*       </DataTable.Body>
	*     </DataTable.Table>
	*   </DataTable.Root>
	* </template>
	* ```
	*/
	Body: _sfc_main$120,
	/**
	* A `<tr>` element for data rows with selection and expansion state.
	*
	* @see https://0.vuetifyjs.com/components/data/data-table
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Button, DataTable } from '@vuetify/v0'
	*
	*   const users = [
	*     { id: 1, name: 'Alice' },
	*   ]
	* <\/script>
	*
	* <template>
	*   <DataTable.Root>
	*     <DataTable.Table>
	*       <DataTable.Body v-slot="{ rank }">
	*         <DataTable.Row
	*           v-for="user in rank(users)"
	*           :id="user.id"
	*           :key="user.id"
	*           :value="user"
	*           selectable
	*           v-slot="{ isSelected, toggleSelection }"
	*         >
	*           <DataTable.Cell>
	*             <Button.Root :aria-pressed="isSelected" @click="toggleSelection">
	*               Select
	*             </Button.Root>
	*           </DataTable.Cell>
	*           <DataTable.Cell>{{ user.name }}</DataTable.Cell>
	*         </DataTable.Row>
	*       </DataTable.Body>
	*     </DataTable.Table>
	*   </DataTable.Root>
	* </template>
	* ```
	*/
	Row: _sfc_main$115,
	/**
	* A `<td>` element for data cells.
	*
	* @see https://0.vuetifyjs.com/components/data/data-table
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { DataTable } from '@vuetify/v0'
	*
	*   const users = [
	*     { id: 1, name: 'Alice' },
	*   ]
	* <\/script>
	*
	* <template>
	*   <DataTable.Root>
	*     <DataTable.Table>
	*       <DataTable.Body v-slot="{ rank }">
	*         <DataTable.Row
	*           v-for="user in rank(users)"
	*           :id="user.id"
	*           :key="user.id"
	*           :value="user"
	*         >
	*           <DataTable.Cell>{{ user.name }}</DataTable.Cell>
	*         </DataTable.Row>
	*       </DataTable.Body>
	*     </DataTable.Table>
	*   </DataTable.Root>
	* </template>
	* ```
	*/
	Cell: _sfc_main$119,
	/**
	* Empty state row that renders when the table has no items.
	*
	* @see https://0.vuetifyjs.com/components/data/data-table
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { DataTable } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <DataTable.Root>
	*     <DataTable.Table>
	*       <DataTable.Body>
	*         <DataTable.Empty v-slot="{ columnCount }">
	*           <DataTable.Cell :colspan="columnCount">
	*             No data available
	*           </DataTable.Cell>
	*         </DataTable.Empty>
	*       </DataTable.Body>
	*     </DataTable.Table>
	*   </DataTable.Root>
	* </template>
	* ```
	*/
	Empty: _sfc_main$117
};
//#endregion
//#region src/components/Dialog/DialogRoot.vue
const [useDialogContext, provideDialogContext] = createContext();
const _sfc_main$113 = /*@__PURE__*/ defineComponent({
	name: "DialogRoot",
	__name: "DialogRoot",
	props: /*@__PURE__*/ mergeModels({
		namespace: { default: "v0:dialog" },
		id: {},
		as: { default: null },
		renderless: { type: Boolean }
	}, {
		"modelValue": {
			type: Boolean,
			default: false
		},
		"modelModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["update:model-value"], ["update:modelValue"]),
	setup(__props) {
		const isOpen = useModel(__props, "modelValue");
		const id = __props.id ?? /* @__PURE__ */ useId$1();
		const titleId = `${id}-title`;
		const descriptionId = `${id}-description`;
		const hasTitle = shallowRef(false);
		const hasDescription = shallowRef(false);
		function open() {
			isOpen.value = true;
		}
		function close() {
			isOpen.value = false;
		}
		provideDialogContext(__props.namespace, {
			isOpen,
			id,
			titleId,
			descriptionId,
			hasTitle,
			hasDescription,
			open,
			close
		});
		const slotProps = toRef(() => ({
			id,
			isOpen: isOpen.value,
			open,
			close
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), {
				as: __props.as,
				renderless: ""
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 8, ["as"]);
		};
	}
});
//#endregion
//#region src/components/Dialog/DialogClose.vue
const _sfc_main$112 = /*@__PURE__*/ defineComponent({
	name: "DialogClose",
	__name: "DialogClose",
	props: {
		namespace: { default: "v0:dialog" },
		as: { default: "button" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useDialogContext(__props.namespace);
		const locale = useLocale();
		function onClick() {
			context.close();
		}
		function onKeydown(e) {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onClick();
			}
		}
		const slotProps = toRef(() => ({
			isOpen: context.isOpen.value,
			attrs: {
				"type": __props.as === "button" ? "button" : void 0,
				"role": __props.as === "button" ? void 0 : "button",
				"tabindex": 0,
				"aria-label": locale.ti("Dialog.close") ?? "Close",
				"onClick": onClick,
				"onKeydown": __props.as === "button" ? void 0 : onKeydown
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Dialog/DialogContent.vue
const _sfc_main$111 = /*@__PURE__*/ defineComponent({
	name: "DialogContent",
	__name: "DialogContent",
	props: {
		namespace: { default: "v0:dialog" },
		closeOnClickOutside: {
			type: Boolean,
			default: true
		},
		blocking: {
			type: Boolean,
			default: false
		},
		as: { default: "dialog" },
		renderless: { type: Boolean }
	},
	emits: ["cancel", "close"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const context = useDialogContext(__props.namespace);
		const contentRef = useTemplateRef("content");
		const ticket = useStack().register({
			onDismiss: () => context.close(),
			blocking: () => __props.blocking,
			el: () => contentRef.value?.element
		});
		watch(context.isOpen, (isOpen) => {
			if (isOpen) ticket.select();
			else ticket.unselect();
		}, { immediate: true });
		watch(context.isOpen, (isOpen) => {
			const element = contentRef.value?.element;
			/* v8 ignore next -- defensive guard, element is always present after mount */
			if (!element) return;
			if (isOpen) element.showModal?.();
			else element.close?.();
		});
		onMounted(() => {
			if (context.isOpen.value) (contentRef.value?.element)?.showModal();
		});
		useToggleScope(
			() => __props.closeOnClickOutside && context.isOpen.value,
			/* v8 ignore start -- callback tested via useClickOutside */
			() => {
				useClickOutside(() => contentRef.value?.element, () => context.close(), { bounds: true });
			}
			/* v8 ignore stop */
		);
		function onCancel(e) {
			context.isOpen.value = false;
			emit("cancel", e);
		}
		function onClose(e) {
			context.isOpen.value = false;
			emit("close", e);
		}
		const slotProps = toRef(() => ({
			isOpen: context.isOpen.value,
			globalTop: ticket.globalTop.value,
			zIndex: ticket.zIndex.value,
			attrs: {
				"id": context.id,
				"role": "dialog",
				"aria-modal": "true",
				"aria-labelledby": context.hasTitle.value ? context.titleId : void 0,
				"aria-describedby": context.hasDescription.value ? context.descriptionId : void 0,
				"style": { zIndex: ticket.zIndex.value },
				"onCancel": onCancel,
				"onClose": onClose
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				ref: "content",
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Dialog/DialogDescription.vue
const _sfc_main$110 = /*@__PURE__*/ defineComponent({
	name: "DialogDescription",
	__name: "DialogDescription",
	props: {
		namespace: { default: "v0:dialog" },
		as: { default: "p" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useDialogContext(__props.namespace);
		onMounted(() => {
			context.hasDescription.value = true;
		});
		onBeforeUnmount(() => {
			context.hasDescription.value = false;
		});
		const slotProps = toRef(() => ({ attrs: { id: context.descriptionId } }));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Dialog/DialogTitle.vue
const _sfc_main$109 = /*@__PURE__*/ defineComponent({
	name: "DialogTitle",
	__name: "DialogTitle",
	props: {
		namespace: { default: "v0:dialog" },
		as: { default: "h2" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useDialogContext(__props.namespace);
		onMounted(() => {
			context.hasTitle.value = true;
		});
		onBeforeUnmount(() => {
			context.hasTitle.value = false;
		});
		const slotProps = toRef(() => ({ attrs: { id: context.titleId } }));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Dialog/DialogActivator.vue
const _sfc_main$108 = /*@__PURE__*/ defineComponent({
	name: "DialogActivator",
	__name: "DialogActivator",
	props: {
		namespace: { default: "v0:dialog" },
		as: { default: "button" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useDialogContext(__props.namespace);
		function onClick() {
			context.open();
		}
		function onKeydown(e) {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onClick();
			}
		}
		const slotProps = toRef(() => ({
			isOpen: context.isOpen.value,
			attrs: {
				"type": __props.as === "button" ? "button" : void 0,
				"role": __props.as === "button" ? void 0 : "button",
				"tabindex": 0,
				"aria-haspopup": "dialog",
				"aria-expanded": context.isOpen.value,
				"data-open": context.isOpen.value || void 0,
				"onClick": onClick,
				"onKeydown": __props.as === "button" ? void 0 : onKeydown
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Dialog/index.ts
/**
* Dialog component with sub-components for building modal dialogs.
*
* @see https://0.vuetifyjs.com/components/disclosure/dialog
*
* @example
* ```vue
* <script lang="ts" setup>
*   import { Dialog } from '@vuetify/v0'
* <\/script>
*
* <template>
*   <Dialog.Root>
*     <Dialog.Activator>
*       Open Dialog
*     </Dialog.Activator>
*
*     <Dialog.Content>
*       <Dialog.Title>Dialog Title</Dialog.Title>
*       <Dialog.Description>Dialog description text.</Dialog.Description>
*
*       <p>Dialog content goes here.</p>
*
*       <Dialog.Close>Close</Dialog.Close>
*     </Dialog.Content>
*   </Dialog.Root>
* </template>
* ```
*/
const Dialog = {
	/**
	* Root component for dialogs.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/dialog
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Dialog } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Dialog.Root>
	*     <Dialog.Activator>Open</Dialog.Activator>
	*     <Dialog.Content>
	*       <Dialog.Title>Title</Dialog.Title>
	*       <Dialog.Close>Close</Dialog.Close>
	*     </Dialog.Content>
	*   </Dialog.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$113,
	/**
	* Activator component that opens the dialog.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/dialog
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Dialog } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Dialog.Activator>
	*     Open Dialog
	*   </Dialog.Activator>
	* </template>
	* ```
	*/
	Activator: _sfc_main$108,
	/**
	* Content container for the dialog using native `<dialog>` element.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/dialog
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Dialog } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Dialog.Content>
	*     <Dialog.Title>Title</Dialog.Title>
	*     <p>Content goes here.</p>
	*     <Dialog.Close>Close</Dialog.Close>
	*   </Dialog.Content>
	* </template>
	* ```
	*/
	Content: _sfc_main$111,
	/**
	* Title component for accessible dialog labeling.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/dialog
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Dialog } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Dialog.Title>Dialog Title</Dialog.Title>
	* </template>
	* ```
	*/
	Title: _sfc_main$109,
	/**
	* Description component for accessible dialog description.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/dialog
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Dialog } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Dialog.Description>
	*     This dialog allows you to configure settings.
	*   </Dialog.Description>
	* </template>
	* ```
	*/
	Description: _sfc_main$110,
	/**
	* Close button component for closing the dialog.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/dialog
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Dialog } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Dialog.Close>Close</Dialog.Close>
	* </template>
	* ```
	*/
	Close: _sfc_main$112
};
//#endregion
//#region src/components/ExpansionPanel/ExpansionPanelGroup.vue
const [useExpansionPanelGroup, provideExpansionPanelGroup] = createContext();
const _sfc_main$107 = /*@__PURE__*/ defineComponent({
	name: "ExpansionPanelGroup",
	__name: "ExpansionPanelGroup",
	props: /*@__PURE__*/ mergeModels({
		namespace: { default: "v0:expansion-panel" },
		disabled: {
			type: Boolean,
			default: false
		},
		enroll: {
			type: Boolean,
			default: false
		},
		mandatory: {
			type: [Boolean, String],
			default: false
		},
		multiple: {
			type: Boolean,
			default: false
		},
		as: {},
		renderless: { type: Boolean }
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["update:model-value"], ["update:modelValue"]),
	setup(__props) {
		const model = useModel(__props, "modelValue");
		const isDisabled = toRef(() => __props.disabled);
		const selection = createSelection({
			disabled: isDisabled,
			enroll: toRef(() => __props.enroll),
			mandatory: toRef(() => __props.mandatory),
			multiple: toRef(() => __props.multiple),
			events: true
		});
		useProxyModel(selection, model, { multiple: toRef(() => __props.multiple) });
		const slotProps = toRef(() => ({
			isDisabled,
			select: selection.select,
			unselect: selection.unselect,
			toggle: selection.toggle
		}));
		provideExpansionPanelGroup(__props.namespace, selection);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), {
				as: __props.as,
				renderless: __props.renderless
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 8, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/ExpansionPanel/ExpansionPanelRoot.vue
const [useExpansionPanelRoot, provideExpansionPanelRoot] = createContext({ suffix: "item" });
const _sfc_main$106 = /*@__PURE__*/ defineComponent({
	name: "ExpansionPanelRoot",
	__name: "ExpansionPanelRoot",
	props: {
		id: {},
		value: {},
		disabled: {},
		namespace: { default: "v0:expansion-panel" },
		as: {},
		renderless: { type: Boolean }
	},
	setup(__props) {
		const selection = useExpansionPanelGroup(__props.namespace);
		const ticket = selection.register({
			id: __props.id,
			value: __props.value,
			disabled: () => toValue(__props.disabled) ?? false
		});
		const headerId = toRef(() => `${ticket.id}-header`);
		const contentId = toRef(() => `${ticket.id}-content`);
		const isDisabled = toRef(() => toValue(ticket.disabled) || toValue(selection.disabled));
		const slotProps = toRef(() => ({
			isSelected: ticket.isSelected.value,
			isDisabled: isDisabled.value,
			attrs: { "data-selected": ticket.isSelected.value || void 0 }
		}));
		onBeforeUnmount(() => selection.unregister(ticket.id));
		provideExpansionPanelRoot(__props.namespace, {
			ticket,
			headerId,
			contentId,
			isDisabled
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/ExpansionPanel/ExpansionPanelActivator.vue
const _sfc_main$105 = /*@__PURE__*/ defineComponent({
	name: "ExpansionPanelActivator",
	__name: "ExpansionPanelActivator",
	props: {
		namespace: { default: "v0:expansion-panel" },
		as: { default: "button" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const item = useExpansionPanelRoot(__props.namespace);
		function onClick() {
			if (item.isDisabled.value) return;
			item.ticket.toggle();
		}
		function onKeydown(e) {
			if (item.isDisabled.value) return;
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				item.ticket.toggle();
			}
		}
		const slotProps = toRef(() => ({
			isDisabled: item.isDisabled.value,
			isSelected: item.ticket.isSelected.value,
			toggle: item.ticket.toggle,
			attrs: {
				"id": item.headerId.value,
				"role": __props.as === "button" ? void 0 : "button",
				"tabindex": item.isDisabled.value ? -1 : 0,
				"aria-expanded": item.ticket.isSelected.value,
				"aria-controls": item.contentId.value,
				"aria-disabled": item.isDisabled.value,
				"data-disabled": item.isDisabled.value || void 0,
				"data-selected": item.ticket.isSelected.value || void 0,
				"disabled": __props.as === "button" ? item.isDisabled.value : void 0,
				"type": __props.as === "button" ? "button" : void 0,
				"onClick": onClick,
				"onKeydown": __props.as === "button" ? void 0 : onKeydown
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/ExpansionPanel/ExpansionPanelContent.vue
const _sfc_main$104 = /*@__PURE__*/ defineComponent({
	name: "ExpansionPanelContent",
	__name: "ExpansionPanelContent",
	props: {
		namespace: { default: "v0:expansion-panel" },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const item = useExpansionPanelRoot(__props.namespace);
		const slotProps = toRef(() => ({
			isSelected: item.ticket.isSelected.value,
			attrs: {
				"data-selected": item.ticket.isSelected.value || void 0,
				"id": item.contentId.value,
				"role": "region",
				"aria-labelledby": item.headerId.value,
				"hidden": !item.ticket.isSelected.value
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/ExpansionPanel/ExpansionPanelCue.vue
const _sfc_main$103 = /*@__PURE__*/ defineComponent({
	name: "ExpansionPanelCue",
	__name: "ExpansionPanelCue",
	props: {
		namespace: { default: "v0:expansion-panel" },
		as: { default: "span" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useExpansionPanelRoot(__props.namespace);
		const slotProps = toRef(() => ({
			isSelected: context.ticket.isSelected.value,
			attrs: {
				"aria-hidden": true,
				"data-state": context.ticket.isSelected.value ? "open" : "closed"
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/ExpansionPanel/ExpansionPanelHeader.vue
const _sfc_main$102 = /*@__PURE__*/ defineComponent({
	name: "ExpansionPanelHeader",
	__name: "ExpansionPanelHeader",
	props: {
		namespace: { default: "v0:expansion-panel" },
		as: { default: "h3" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const item = useExpansionPanelRoot(__props.namespace);
		const slotProps = toRef(() => ({
			isSelected: item.ticket.isSelected.value,
			attrs: { "data-selected": item.ticket.isSelected.value || void 0 }
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/ExpansionPanel/index.ts
/**
* ExpansionPanel component with sub-components for building expansion panels.
*
* @see https://0.vuetifyjs.com/components/disclosure/expansion-panel
*
* @example
* ```vue
* <script lang="ts" setup>
*   import { ExpansionPanel } from '@vuetify/v0'
* <\/script>
*
* <template>
*   <ExpansionPanel.Group>
*     <ExpansionPanel.Root>
*       <ExpansionPanel.Header>
*         <ExpansionPanel.Activator>
*          Click to expand
*         </ExpansionPanel.Activator>
*       </ExpansionPanel.Header>
*
*       <ExpansionPanel.Content>
*         Content goes here.
*       </ExpansionPanel.Content>
*     </ExpansionPanel.Root>
*   </ExpansionPanel.Group>
* </template>
* ```
*/
const ExpansionPanel = {
	/**
	* Group component for coordinating expansion panels.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/expansion-panel
	*/
	Group: _sfc_main$107,
	/**
	* Root component representing a single expansion panel.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/expansion-panel
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { ExpansionPanel } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <ExpansionPanel.Root>
	*     <ExpansionPanel.Header>
	*       <ExpansionPanel.Activator>
	*        Click to expand
	*       </ExpansionPanel.Activator>
	*     </ExpansionPanel.Header>
	*
	*     <ExpansionPanel.Content>
	*       Content goes here.
	*     </ExpansionPanel.Content>
	*   </ExpansionPanel.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$106,
	/**
	* (optional) Component for the header section of an expansion panel item.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/expansion-panel
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { ExpansionPanel } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <ExpansionPanel.Header>
	*     <ExpansionPanel.Activator>
	*      Click to expand
	*     </ExpansionPanel.Activator>
	*   </ExpansionPanel.Header>
	* </template>
	* ```
	*/
	Header: _sfc_main$102,
	/**
	* Component for the activator section of an expansion panel header.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/expansion-panel
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { ExpansionPanel } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <ExpansionPanel.Activator>
	*    Click to expand
	*   </ExpansionPanel.Activator>
	* </template>
	* ```
	*/
	Activator: _sfc_main$105,
	/**
	* Visual cue for expansion state (e.g., chevron icon).
	*
	* @see https://0.vuetifyjs.com/components/disclosure/expansion-panel
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { ExpansionPanel } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <ExpansionPanel.Activator>
	*     Click to expand
	*     <ExpansionPanel.Cue />
	*   </ExpansionPanel.Activator>
	* </template>
	* ```
	*/
	Cue: _sfc_main$103,
	/**
	* Component for the content section of an expansion panel item.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/expansion-panel
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { ExpansionPanel } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <ExpansionPanel.Content>
	*     Content goes here.
	*   </ExpansionPanel.Content>
	* </template>
	* ```
	*/
	Content: _sfc_main$104
};
//#endregion
//#region src/components/Form/Form.vue
const _sfc_main$101 = /*@__PURE__*/ defineComponent({
	name: "Form",
	inheritAttrs: false,
	__name: "Form",
	props: /*@__PURE__*/ mergeModels({
		namespace: { default: "v0:form" },
		disabled: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
		novalidate: {
			type: Boolean,
			default: true
		},
		as: { default: "form" },
		renderless: { type: Boolean }
	}, {
		"modelValue": {
			type: [Boolean, null],
			default: null
		},
		"modelModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels([
		"update:model-value",
		"submit",
		"reset"
	], ["update:modelValue"]),
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const model = useModel(__props, "modelValue");
		const form = createForm({
			disabled: toRef(() => __props.disabled),
			readonly: toRef(() => __props.readonly)
		});
		watchEffect(() => {
			model.value = form.isValid.value;
		});
		const attrs = useAttrs();
		provideContext(__props.namespace, form);
		async function onSubmit(event) {
			event.preventDefault();
			const valid = await form.submit();
			emit("submit", { valid });
		}
		function onReset(event) {
			event.preventDefault();
			form.reset();
			emit("reset");
		}
		const slotProps = toRef(() => ({
			isValid: form.isValid.value,
			isValidating: form.isValidating.value,
			isDisabled: toValue(form.disabled),
			isReadonly: toValue(form.readonly),
			submit: form.submit,
			reset: form.reset,
			attrs: {
				novalidate: __props.novalidate || void 0,
				onSubmit,
				onReset
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Group/GroupRoot.vue
const [useGroupRoot, provideGroupRoot] = createContext();
const _sfc_main$100 = /*@__PURE__*/ defineComponent({
	name: "GroupRoot",
	__name: "GroupRoot",
	props: /*@__PURE__*/ mergeModels({
		namespace: { default: "v0:group" },
		disabled: {
			type: Boolean,
			default: false
		},
		enroll: {
			type: Boolean,
			default: false
		},
		mandatory: {
			type: [Boolean, String],
			default: false
		}
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["update:model-value"], ["update:modelValue"]),
	setup(__props) {
		const model = useModel(__props, "modelValue");
		const group = createGroup({
			disabled: toRef(() => __props.disabled),
			enroll: toRef(() => __props.enroll),
			mandatory: toRef(() => __props.mandatory),
			events: true
		});
		useProxyModel(group, model, { multiple: true });
		provideGroupRoot(__props.namespace, group);
		const slotProps = toRef(() => ({
			isDisabled: toValue(group.disabled),
			isNoneSelected: group.isNoneSelected.value,
			isAllSelected: group.isAllSelected.value,
			isMixed: group.isMixed.value,
			select: group.select,
			unselect: group.unselect,
			toggle: group.toggle,
			selectAll: group.selectAll,
			unselectAll: group.unselectAll,
			toggleAll: group.toggleAll,
			attrs: { "aria-multiselectable": true }
		}));
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)));
		};
	}
});
//#endregion
//#region src/components/Group/GroupItem.vue
const _sfc_main$99 = /*@__PURE__*/ defineComponent({
	name: "GroupItem",
	__name: "GroupItem",
	props: {
		id: {},
		label: {},
		value: {},
		disabled: {},
		indeterminate: { default: false },
		namespace: { default: "v0:group" }
	},
	setup(__props) {
		const group = useGroupRoot(__props.namespace);
		const ticket = group.register({
			id: __props.id,
			value: __props.value,
			disabled: () => toValue(__props.disabled) ?? false,
			indeterminate: () => toValue(__props.indeterminate) ?? false
		});
		const isDisabled = toRef(() => toValue(ticket.disabled) || toValue(group.disabled));
		function onClick() {
			if (toValue(isDisabled)) return;
			ticket.toggle();
		}
		function onKeydown(e) {
			if (e.key !== " ") return;
			e.preventDefault();
			onClick();
		}
		onBeforeUnmount(() => {
			group.unregister(ticket.id);
		});
		const slotProps = toRef(() => ({
			id: String(ticket.id),
			label: __props.label,
			value: __props.value,
			isSelected: toValue(ticket.isSelected),
			isMixed: toValue(ticket.isMixed),
			isDisabled: toValue(isDisabled),
			select: ticket.select,
			unselect: ticket.unselect,
			toggle: ticket.toggle,
			mix: ticket.mix,
			unmix: ticket.unmix,
			attrs: {
				"role": "checkbox",
				"tabindex": toValue(isDisabled) ? -1 : 0,
				"aria-checked": toValue(ticket.isMixed) ? "mixed" : toValue(ticket.isSelected),
				"aria-disabled": toValue(isDisabled),
				"data-selected": toValue(ticket.isSelected) || void 0,
				"data-disabled": toValue(isDisabled) || void 0,
				"data-mixed": toValue(ticket.isMixed) || void 0,
				"onClick": onClick,
				"onKeydown": onKeydown
			}
		}));
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)));
		};
	}
});
//#endregion
//#region src/components/Group/index.ts
/**
* Group component with sub-components for multi-selection.
*
* @see https://0.vuetifyjs.com/components/providers/group
*/
const Group = {
	/**
	* Root component for multi-selection groups.
	*
	* @see https://0.vuetifyjs.com/components/providers/group
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Group } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Group.Root v-model="selected">
	*     <Group.Item value="a">Option A</Group.Item>
	*
	*     <Group.Item value="b">Option B</Group.Item>
	*   </Group.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$100,
	/**
	* Item component for multi-selection groups.
	*
	* @see https://0.vuetifyjs.com/components/providers/group
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Group } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Group.Item value="a">
	*     Option A
	*   </Group.Item>
	* </template>
	* ```
	*/
	Item: _sfc_main$99
};
//#endregion
//#region src/components/Image/ImageRoot.vue
const [useImageRoot, provideImageRoot] = createContext();
const _sfc_main$98 = /*@__PURE__*/ defineComponent({
	name: "ImageRoot",
	__name: "ImageRoot",
	props: {
		src: {},
		lazy: {
			type: Boolean,
			default: false
		},
		rootMargin: { default: "0px" },
		threshold: { default: 0 },
		root: { default: null },
		namespace: { default: "v0:image" },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const atomRef = useTemplateRef("atom");
		const rootEl = toRef(() => /* @__PURE__ */ toElement(atomRef.value?.element) ?? null);
		if (__props.lazy && __props.renderless) useLogger().warn("[v0:image] `lazy` requires a wrapper element but `renderless` is set — the image will never load. Remove `renderless` or use useIntersectionObserver manually.");
		const { isIntersecting } = __props.lazy ? useIntersectionObserver(rootEl, () => {}, {
			once: true,
			rootMargin: __props.rootMargin,
			threshold: __props.threshold,
			root: __props.root
		}) : { isIntersecting: shallowRef(true) };
		const image = useImage({
			src: toRef(() => __props.src),
			eager: isIntersecting
		});
		provideImageRoot(__props.namespace, image);
		const slotProps = toRef(() => ({
			status: image.status.value,
			isIdle: image.isIdle.value,
			isLoading: image.isLoading.value,
			isLoaded: image.isLoaded.value,
			isError: image.isError.value,
			retry: image.retry,
			attrs: { "data-state": image.status.value }
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({ ref: "atom" }, slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Image/ImageFallback.vue
const _sfc_main$97 = /*@__PURE__*/ defineComponent({
	name: "ImageFallback",
	__name: "ImageFallback",
	props: {
		namespace: { default: "v0:image" },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useImageRoot(__props.namespace);
		const slotProps = toRef(() => ({
			retry: context.retry,
			attrs: {
				"role": "img",
				"data-state": "error"
			}
		}));
		return (_ctx, _cache) => {
			return unref(context).isError.value ? (openBlock(), createBlock(unref(_sfc_main$192), mergeProps({ key: 0 }, slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"])) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region src/components/Image/ImageImg.vue
const _sfc_main$96 = /*@__PURE__*/ defineComponent({
	name: "ImageImg",
	__name: "ImageImg",
	props: {
		alt: {},
		srcset: {},
		sizes: {},
		width: {},
		height: {},
		crossorigin: {},
		referrerpolicy: {},
		decoding: { default: "async" },
		loading: {},
		fetchpriority: {},
		namespace: { default: "v0:image" },
		as: { default: "img" },
		renderless: { type: Boolean }
	},
	emits: [
		"load",
		"error",
		"loadstart"
	],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const context = useImageRoot(__props.namespace);
		function onLoad(e) {
			context.onLoad(e);
			emit("load", e);
		}
		function onError(e) {
			context.onError(e);
			emit("error", e);
		}
		watch(context.status, (status, prev) => {
			if (status === "loading" && prev !== "loading" && context.source.value) emit("loadstart", context.source.value);
		}, { immediate: true });
		const slotProps = toRef(() => ({
			isLoaded: context.isLoaded.value,
			status: context.status.value,
			attrs: {
				"role": "img",
				"src": context.source.value,
				srcset: __props.srcset,
				sizes: __props.sizes,
				alt: __props.alt,
				width: __props.width,
				height: __props.height,
				crossorigin: __props.crossorigin,
				referrerpolicy: __props.referrerpolicy,
				decoding: __props.decoding,
				loading: __props.loading,
				fetchpriority: __props.fetchpriority,
				"data-state": context.status.value,
				onLoad,
				onError
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Image/ImagePlaceholder.vue
const _sfc_main$95 = /*@__PURE__*/ defineComponent({
	name: "ImagePlaceholder",
	__name: "ImagePlaceholder",
	props: {
		namespace: { default: "v0:image" },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useImageRoot(__props.namespace);
		const isVisible = toRef(() => context.isIdle.value || context.isLoading.value);
		const slotProps = toRef(() => ({
			status: context.status.value,
			attrs: {
				"aria-hidden": true,
				"data-state": context.status.value
			}
		}));
		return (_ctx, _cache) => {
			return isVisible.value ? (openBlock(), createBlock(unref(_sfc_main$192), mergeProps({ key: 0 }, slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"])) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region src/components/Image/index.ts
/**
* Image component with sub-components for managing image loading lifecycle.
*
* @see https://0.vuetifyjs.com/components/semantic/image
*/
const Image = {
	/**
	* Root component for images. Owns the loading state machine and optionally
	* manages lazy loading via IntersectionObserver.
	*
	* @see https://0.vuetifyjs.com/components/semantic/image
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Image } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Image.Root src="/photo.jpg">
	*     <Image.Img alt="A photo" width="800" height="600" />
	*     <Image.Placeholder>Loading...</Image.Placeholder>
	*     <Image.Fallback>Failed to load</Image.Fallback>
	*   </Image.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$98,
	/**
	* The `<img>` element. Reads the gated source from context and reports
	* load/error events.
	*
	* @see https://0.vuetifyjs.com/components/semantic/image
	*
	* @example
	* ```vue
	* <Image.Img alt="Description" width="800" height="600" />
	* ```
	*/
	Img: _sfc_main$96,
	/**
	* Placeholder content shown while the image is idle or loading.
	*
	* @see https://0.vuetifyjs.com/components/semantic/image
	*
	* @example
	* ```vue
	* <Image.Placeholder>
	*   <div class="bg-gray-200 animate-pulse" />
	* </Image.Placeholder>
	* ```
	*/
	Placeholder: _sfc_main$95,
	/**
	* Fallback content shown when the image fails to load. Exposes `retry()`
	* via slot props.
	*
	* @see https://0.vuetifyjs.com/components/semantic/image
	*
	* @example
	* ```vue
	* <Image.Fallback v-slot="{ retry }">
	*   <button @click="retry">Retry</button>
	* </Image.Fallback>
	* ```
	*/
	Fallback: _sfc_main$97
};
//#endregion
//#region src/components/Input/InputRoot.vue
const [useInputRoot, provideInputRoot] = createContext();
function parseValidateOn$1(value) {
	const parts = String(value).split(" ");
	let event = "blur";
	let modifier;
	for (const part of parts) if (part === "lazy" || part === "eager") modifier = part;
	else if (part === "blur" || part === "input" || part === "submit") event = part;
	return {
		event,
		modifier
	};
}
const _sfc_main$94 = /*@__PURE__*/ defineComponent({
	name: "InputRoot",
	inheritAttrs: false,
	__name: "InputRoot",
	props: /*@__PURE__*/ mergeModels({
		id: { default: () => /* @__PURE__ */ useId$1() },
		label: {},
		name: {},
		type: { default: "text" },
		form: {},
		disabled: { default: false },
		readonly: { default: false },
		required: { type: Boolean },
		rules: { default: () => [] },
		validateOn: { default: "blur" },
		error: {
			type: Boolean,
			default: false
		},
		errorMessages: {},
		namespace: { default: "v0:input:root" },
		formNamespace: { default: "v0:form" },
		as: { default: "div" },
		renderless: { type: Boolean }
	}, {
		"modelValue": { default: "" },
		"modelModifiers": {},
		"focused": {
			type: Boolean,
			default: false
		},
		"focusedModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["update:model-value", "update:focused"], ["update:modelValue", "update:focused"]),
	setup(__props) {
		const attrs = useAttrs();
		const model = useModel(__props, "modelValue");
		const focused = useModel(__props, "focused");
		const input = createInput({
			value: model,
			id: __props.id,
			label: __props.label,
			name: __props.name,
			form: __props.form,
			formNamespace: __props.formNamespace,
			required: __props.required,
			disabled: () => toValue(__props.disabled),
			readonly: () => toValue(__props.readonly),
			rules: __props.rules,
			error: () => toValue(__props.error),
			errorMessages: () => toValue(__props.errorMessages)
		});
		const parsed = toRef(() => parseValidateOn$1(__props.validateOn));
		function shouldValidate(trigger) {
			const { event, modifier } = parsed.value;
			if (event === "submit") return false;
			if (modifier === "lazy" && !input.isTouched.value) return false;
			if (modifier === "eager") {
				if (input.isValid.value === false) return true;
				if (trigger === "input") return false;
				return trigger === event;
			}
			return trigger === event;
		}
		watch(input.isFocused, (val) => {
			focused.value = val;
			if (val) return;
			input.isTouched.value = true;
			if (shouldValidate("blur")) input.validate();
		});
		let resetting = false;
		watch(model, () => {
			if (!resetting && shouldValidate("input")) input.validate();
		});
		function reset() {
			resetting = true;
			input.reset();
			nextTick(() => {
				resetting = false;
			});
		}
		const context = {
			id: input.id,
			label: __props.label,
			name: __props.name,
			type: toRef(() => __props.type),
			form: __props.form,
			required: __props.required,
			descriptionId: input.descriptionId,
			errorId: input.errorId,
			descriptions: input.descriptions,
			fieldErrors: input.fieldErrors,
			hasDescription: input.hasDescription,
			hasError: input.hasError,
			value: model,
			isDirty: input.isDirty,
			isFocused: input.isFocused,
			isDisabled: input.isDisabled,
			isReadonly: input.isReadonly,
			errors: input.errors,
			isValid: input.isValid,
			isPristine: input.isPristine,
			isValidating: input.isValidating,
			validate: input.validate,
			reset
		};
		provideInputRoot(__props.namespace, context);
		const slotProps = toRef(() => ({
			id: input.id,
			label: __props.label,
			value: model.value,
			isDirty: input.isDirty.value,
			isFocused: input.isFocused.value,
			errors: input.errors.value,
			isValid: input.isValid.value,
			isPristine: input.isPristine.value,
			isValidating: input.isValidating.value,
			isDisabled: input.isDisabled.value,
			isReadonly: input.isReadonly.value,
			validate: input.validate,
			reset,
			attrs: {
				"data-state": input.state.value,
				"data-dirty": input.isDirty.value ? true : void 0,
				"data-focused": input.isFocused.value ? true : void 0,
				"data-disabled": input.isDisabled.value ? true : void 0,
				"data-readonly": input.isReadonly.value ? true : void 0
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Input/InputControl.vue
function defined(attrs) {
	const result = {};
	for (const key of Object.keys(attrs)) if (!/* @__PURE__ */ isUndefined(attrs[key])) result[key] = attrs[key];
	return result;
}
const _sfc_main$93 = /*@__PURE__*/ defineComponent({
	name: "InputControl",
	inheritAttrs: false,
	__name: "InputControl",
	props: {
		namespace: { default: "v0:input:root" },
		as: { default: "input" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const root = useInputRoot(__props.namespace);
		function onInput(e) {
			const target = e.target;
			root.value.value = target.value;
		}
		function onFocus() {
			root.isFocused.value = true;
		}
		function onBlur() {
			root.isFocused.value = false;
		}
		const describedby = toRef(() => {
			return root.hasDescription.value ? root.descriptionId : void 0;
		});
		const controlAttrs = toRef(() => {
			const invalid = root.isValid.value === false;
			const disabled = root.isDisabled.value;
			const readonly = root.isReadonly.value;
			const isFocused = root.isFocused.value;
			return defined({
				"id": root.id,
				"type": root.type.value,
				"name": root.name,
				"value": root.value.value,
				"form": root.form,
				"disabled": disabled || void 0,
				"readonly": readonly || void 0,
				"required": root.required || void 0,
				"aria-invalid": invalid || void 0,
				"aria-label": root.label || void 0,
				"aria-describedby": describedby.value,
				"aria-errormessage": root.hasError.value && root.errors.value.length > 0 ? root.errorId : void 0,
				"aria-required": root.required || void 0,
				"data-state": invalid ? "invalid" : root.isValid.value === true ? "valid" : "pristine",
				"data-focused": isFocused ? true : void 0,
				"data-disabled": disabled ? true : void 0,
				"data-readonly": readonly ? true : void 0,
				"onInput": onInput,
				"onFocus": onFocus,
				"onBlur": onBlur
			});
		});
		const slotProps = toRef(() => ({
			value: root.value.value,
			isFocused: root.isFocused.value,
			isDisabled: root.isDisabled.value,
			isReadonly: root.isReadonly.value,
			attrs: controlAttrs.value
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), controlAttrs.value), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Input/InputDescription.vue
const _sfc_main$92 = /*@__PURE__*/ defineComponent({
	name: "InputDescription",
	inheritAttrs: false,
	__name: "InputDescription",
	props: {
		id: { default: () => /* @__PURE__ */ useId$1() },
		namespace: { default: "v0:input:root" },
		as: { default: "span" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const root = useInputRoot(__props.namespace);
		const ticket = root.descriptions.register({ id: __props.id });
		onBeforeUnmount(() => ticket.unregister());
		const descriptionAttrs = toRef(() => ({ id: root.descriptionId }));
		const slotProps = toRef(() => ({ id: root.descriptionId }));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), descriptionAttrs.value), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Input/InputError.vue
const _sfc_main$91 = /*@__PURE__*/ defineComponent({
	name: "InputError",
	inheritAttrs: false,
	__name: "InputError",
	props: {
		id: { default: () => /* @__PURE__ */ useId$1() },
		namespace: { default: "v0:input:root" },
		as: { default: "span" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const root = useInputRoot(__props.namespace);
		const errors = root.errors;
		const ticket = root.fieldErrors.register({ id: __props.id });
		onBeforeUnmount(() => ticket.unregister());
		const slotProps = toRef(() => ({
			errors: errors.value,
			attrs: {
				"id": root.errorId,
				"aria-live": "polite",
				"data-state": errors.value.length > 0 ? "visible" : "hidden"
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Input/index.ts
/**
* Input component with sub-components for text input controls.
*
* @see https://0.vuetifyjs.com/components/forms/input
*
* @example
* ```vue
* <script setup lang="ts">
*   import { Input } from '@vuetify/v0'
*   import { ref } from 'vue'
*
*   const email = ref('')
* <\/script>
*
* <template>
*   <Input.Root
*     v-model="email"
*     label="Email"
*     :rules="[(v) => !!v || 'Required', (v) => /.+@.+/.test(v) || 'Invalid email']"
*   >
*     <Input.Control />
*     <Input.Description>We'll never share your email.</Input.Description>
*     <Input.Error v-slot="{ errors }">
*       <span v-for="error in errors" :key="error">{{ error }}</span>
*     </Input.Error>
*   </Input.Root>
* </template>
* ```
*/
const Input = {
	/**
	* Native input element with ARIA bindings and validation triggers.
	*
	* Renders as `<input>` by default. Binds ARIA attributes from Root context
	* and triggers validation on blur or input based on Root's validateOn prop.
	*
	* @see https://0.vuetifyjs.com/components/forms/input
	*
	* @example
	* ```vue
	* <Input.Root v-model="value" label="Name">
	*   <Input.Control />
	* </Input.Root>
	* ```
	*/
	Control: _sfc_main$93,
	/**
	* Help text component connected via aria-describedby.
	*
	* Auto-generates an ID that Input.Control references in its
	* aria-describedby attribute for accessibility.
	*
	* @see https://0.vuetifyjs.com/components/forms/input
	*
	* @example
	* ```vue
	* <Input.Root v-model="value" label="Username">
	*   <Input.Control />
	*   <Input.Description>Must be 3-20 characters.</Input.Description>
	* </Input.Root>
	* ```
	*/
	Description: _sfc_main$92,
	/**
	* Error message component with aria-live announcements.
	*
	* Renders validation errors from Root's validation context.
	* Connected to Control via aria-errormessage. Uses aria-live="polite"
	* for screen reader announcements when errors appear.
	*
	* @see https://0.vuetifyjs.com/components/forms/input
	*
	* @example
	* ```vue
	* <Input.Root v-model="value" :rules="[(v) => !!v || 'Required']">
	*   <Input.Control />
	*   <Input.Error v-slot="{ errors }">
	*     <span v-for="error in errors" :key="error">{{ error }}</span>
	*   </Input.Error>
	* </Input.Root>
	* ```
	*/
	Error: _sfc_main$91,
	/**
	* Root component for text inputs with validation.
	*
	* Creates a validation context, registers a single field, and provides
	* context to child components. Supports v-model for value binding and
	* auto-registers with parent form when used inside createForm.
	*
	* @see https://0.vuetifyjs.com/components/forms/input
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Input } from '@vuetify/v0'
	*   import { ref } from 'vue'
	*
	*   const name = ref('')
	* <\/script>
	*
	* <template>
	*   <Input.Root v-model="name" label="Full name" :rules="[(v) => !!v || 'Required']">
	*     <Input.Control />
	*     <Input.Error v-slot="{ errors }">
	*       <span v-for="error in errors" :key="error">{{ error }}</span>
	*     </Input.Error>
	*   </Input.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$94
};
//#endregion
//#region src/components/Locale/Locale.vue
const _sfc_main$90 = /*@__PURE__*/ defineComponent({
	name: "Locale",
	inheritAttrs: false,
	__name: "Locale",
	props: {
		locale: {},
		renderless: {
			type: Boolean,
			default: false
		},
		as: { default: "div" }
	},
	setup(__props) {
		const parent = useLocale();
		const scopedParent = parent;
		const selectedId = toRef(() => __props.locale);
		const selectedItem = toRef(() => parent.get(__props.locale));
		const rootT = scopedParent._rootT ?? parent.t;
		const rootN = scopedParent._rootN ?? parent.n;
		function t(key, ...params) {
			const prev = new Set(parent.selectedIds);
			parent.selectedIds.clear();
			parent.selectedIds.add(__props.locale);
			try {
				return rootT(key, ...params);
			} finally {
				parent.selectedIds.clear();
				for (const id of prev) parent.selectedIds.add(id);
			}
		}
		function n(value) {
			const prev = new Set(parent.selectedIds);
			parent.selectedIds.clear();
			parent.selectedIds.add(__props.locale);
			try {
				return rootN(value);
			} finally {
				parent.selectedIds.clear();
				for (const id of prev) parent.selectedIds.add(id);
			}
		}
		const scoped = {
			...parent,
			selectedId,
			selectedItem,
			t,
			n,
			_rootT: rootT,
			_rootN: rootN
		};
		provideContext("v0:locale", scoped);
		const attrs = toRef(() => ({
			"data-locale": __props.locale,
			"lang": __props.locale
		}));
		return (_ctx, _cache) => {
			return __props.renderless ? renderSlot(_ctx.$slots, "default", { attrs: attrs.value }, void 0, void 0, 0) : (openBlock(), createBlock(resolveDynamicComponent(__props.as), normalizeProps(mergeProps({ key: 1 }, attrs.value)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { attrs: attrs.value })]),
				_: 3
			}, 16));
		};
	}
});
//#endregion
//#region src/components/NumberField/NumberFieldRoot.vue
const [useNumberFieldRoot, provideNumberFieldRoot] = createContext();
function parseValidateOn(value) {
	const parts = String(value).split(" ");
	let event = "blur";
	let modifier;
	for (const part of parts) if (part === "lazy" || part === "eager") modifier = part;
	else if (part === "blur" || part === "input" || part === "submit") event = part;
	return {
		event,
		modifier
	};
}
const _sfc_main$89 = /*@__PURE__*/ defineComponent({
	name: "NumberFieldRoot",
	inheritAttrs: false,
	__name: "NumberFieldRoot",
	props: /*@__PURE__*/ mergeModels({
		id: { default: () => /* @__PURE__ */ useId$1() },
		label: {},
		ariaLabelledby: {},
		name: {},
		form: {},
		required: { type: Boolean },
		disabled: { default: false },
		readonly: { default: false },
		min: {},
		max: {},
		step: {},
		leap: {},
		wrap: { type: Boolean },
		locale: {},
		format: {},
		clamp: {
			type: Boolean,
			default: true
		},
		commitOn: { default: "change" },
		rules: { default: () => [] },
		validateOn: { default: "blur" },
		error: {
			type: Boolean,
			default: false
		},
		errorMessages: {},
		spinDelay: { default: 400 },
		spinRate: { default: 60 },
		wheel: {
			type: Boolean,
			default: false
		},
		namespace: { default: "v0:number-field:root" },
		formNamespace: { default: "v0:form" },
		as: { default: "div" },
		renderless: { type: Boolean }
	}, {
		"modelValue": { default: null },
		"modelModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["update:model-value"], ["update:modelValue"]),
	setup(__props) {
		const attrs = useAttrs();
		const model = useModel(__props, "modelValue");
		const { input, ...field } = createNumberField({
			value: model,
			id: __props.id,
			label: __props.label,
			name: __props.name,
			formNamespace: __props.formNamespace,
			required: __props.required,
			locale: __props.locale,
			format: __props.format,
			clamp: __props.clamp,
			commitOn: __props.commitOn,
			disabled: () => toValue(__props.disabled),
			readonly: () => toValue(__props.readonly),
			min: __props.min,
			max: __props.max,
			step: __props.step,
			leap: __props.leap,
			wrap: __props.wrap,
			rules: __props.rules,
			error: __props.error,
			errorMessages: __props.errorMessages
		});
		const parsed = toRef(() => parseValidateOn(__props.validateOn));
		function shouldValidate(trigger) {
			const { event, modifier } = parsed.value;
			if (event === "submit") return false;
			if (modifier === "lazy" && !input.isTouched.value) return false;
			if (modifier === "eager") {
				if (input.isValid.value === false) return true;
				if (trigger === "input") return false;
				return trigger === event;
			}
			return trigger === event;
		}
		watch(input.isFocused, (val) => {
			if (val) return;
			input.isTouched.value = true;
			if (shouldValidate("blur")) input.validate();
		});
		let resetting = false;
		watch(model, () => {
			if (!resetting && shouldValidate("input")) input.validate();
		});
		function reset() {
			resetting = true;
			input.reset();
			nextTick(() => {
				resetting = false;
			});
		}
		const context = {
			...field,
			input,
			id: input.id,
			label: __props.label,
			ariaLabelledby: __props.ariaLabelledby,
			name: __props.name,
			form: __props.form,
			required: __props.required,
			descriptionId: input.descriptionId,
			errorId: input.errorId,
			descriptions: input.descriptions,
			fieldErrors: input.fieldErrors,
			hasDescription: input.hasDescription,
			hasError: input.hasError,
			isDirty: input.isDirty,
			isFocused: input.isFocused,
			isDisabled: input.isDisabled,
			isReadonly: input.isReadonly,
			errors: input.errors,
			isValid: input.isValid,
			isPristine: input.isPristine,
			isValidating: input.isValidating,
			validate: input.validate,
			reset,
			spinDelay: __props.spinDelay,
			spinRate: __props.spinRate,
			wheel: __props.wheel
		};
		provideNumberFieldRoot(__props.namespace, context);
		const slotProps = toRef(() => ({
			id: input.id,
			value: model.value,
			display: field.display.value,
			canIncrement: field.canIncrement.value,
			canDecrement: field.canDecrement.value,
			isDisabled: input.isDisabled.value,
			isReadonly: input.isReadonly.value,
			isFocused: input.isFocused.value,
			errors: input.errors.value,
			isValid: input.isValid.value,
			isPristine: input.isPristine.value,
			validate: input.validate,
			reset,
			attrs: {
				"data-state": input.state.value,
				"data-dirty": input.isDirty.value ? true : void 0,
				"data-focused": input.isFocused.value ? true : void 0,
				"data-disabled": input.isDisabled.value ? true : void 0,
				"data-readonly": input.isReadonly.value ? true : void 0
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/NumberField/NumberFieldControl.vue
const _sfc_main$88 = /*@__PURE__*/ defineComponent({
	name: "NumberFieldControl",
	inheritAttrs: false,
	__name: "NumberFieldControl",
	props: {
		namespace: { default: "v0:number-field:root" },
		as: { default: "input" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const root = useNumberFieldRoot(__props.namespace);
		const locale = useLocale();
		const leap = Math.max(1, Math.round(root.numeric.leap / root.numeric.step));
		const text = shallowRef("");
		function syncText() {
			text.value = /* @__PURE__ */ isNull(root.value.value) ? "" : String(root.value.value);
		}
		onMounted(syncText);
		let isEagerWrite = false;
		watch(() => root.value.value, () => {
			if (isEagerWrite) {
				isEagerWrite = false;
				return;
			}
			syncText();
		});
		const displayValue = toRef(() => {
			return root.isFocused.value ? text.value : root.display.value;
		});
		function onBeforeinput(e) {
			if (root.isDisabled.value || root.isReadonly.value) return;
			if (!e.data) return;
			const { value: existing, selectionStart, selectionEnd } = e.target;
			const next = existing.slice(0, selectionStart ?? 0) + e.data + existing.slice(selectionEnd ?? 0);
			if (!/^-?\d*\.?\d*$/.test(next)) e.preventDefault();
		}
		function onInput(e) {
			const target = e.target;
			text.value = target.value;
			if (root.commitOn === "input") {
				isEagerWrite = true;
				root.write(text.value);
				nextTick(() => {
					isEagerWrite = false;
				});
			}
		}
		function onFocus() {
			root.isFocused.value = true;
			syncText();
		}
		function onBlur() {
			const parsed = root.parse(text.value);
			root.value.value = parsed;
			root.commit(parsed);
			root.isFocused.value = false;
			syncText();
		}
		function onKeydown(e) {
			if (root.isDisabled.value || root.isReadonly.value) return;
			if (e.shiftKey && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
				e.preventDefault();
				if (e.key === "ArrowUp") root.increment(10);
				else root.decrement(10);
				syncText();
				return;
			}
			const action = {
				ArrowUp: () => root.increment(),
				ArrowDown: () => root.decrement(),
				PageUp: () => root.increment(leap),
				PageDown: () => root.decrement(leap),
				Home: () => root.floor(),
				End: () => root.ceil(),
				Enter: () => {
					const parsed = root.parse(text.value);
					root.value.value = parsed;
					root.commit(parsed);
				}
			}[e.key];
			if (!action) return;
			e.preventDefault();
			action();
			syncText();
		}
		function onWheel(e) {
			if (!root.wheel) return;
			if (!root.isFocused.value) return;
			if (root.isDisabled.value || root.isReadonly.value) return;
			e.preventDefault();
			if (e.deltaY < 0) root.increment();
			else root.decrement();
			syncText();
		}
		const describedby = toRef(() => {
			return root.hasDescription.value ? root.descriptionId : void 0;
		});
		const controlAttrs = toRef(() => {
			const invalid = root.isValid.value === false;
			const disabled = root.isDisabled.value;
			const readonly = root.isReadonly.value;
			const isFocused = root.isFocused.value;
			const val = root.value.value;
			return {
				"id": root.id,
				"role": "spinbutton",
				"type": "text",
				"inputmode": "decimal",
				"name": root.name,
				"value": displayValue.value,
				"form": root.form,
				"disabled": disabled || void 0,
				"readonly": readonly || void 0,
				"required": root.required || void 0,
				"autocomplete": "off",
				"autocorrect": "off",
				"spellcheck": false,
				"aria-valuenow": /* @__PURE__ */ isNull(val) ? void 0 : val,
				"aria-valuetext": /* @__PURE__ */ isNull(val) ? void 0 : root.display.value,
				"aria-valuemin": Number.isFinite(root.numeric.min) ? root.numeric.min : void 0,
				"aria-valuemax": Number.isFinite(root.numeric.max) ? root.numeric.max : void 0,
				"aria-invalid": invalid || void 0,
				"aria-label": root.ariaLabelledby ? void 0 : root.label || (locale.ti("NumberField.label") ?? "Number"),
				"aria-labelledby": root.ariaLabelledby || void 0,
				"aria-describedby": describedby.value,
				"aria-errormessage": root.hasError.value && root.errors.value.length > 0 ? root.errorId : void 0,
				"aria-required": root.required || void 0,
				"data-state": invalid ? "invalid" : root.isValid.value === true ? "valid" : "pristine",
				"data-focused": isFocused ? true : void 0,
				"data-disabled": disabled ? true : void 0,
				"data-readonly": readonly ? true : void 0,
				onBeforeinput,
				onBlur,
				onFocus,
				onInput,
				onKeydown,
				onWheel
			};
		});
		const slotProps = toRef(() => ({
			value: displayValue.value,
			isFocused: root.isFocused.value,
			isDisabled: root.isDisabled.value,
			isReadonly: root.isReadonly.value,
			attrs: controlAttrs.value
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), controlAttrs.value), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/NumberField/NumberFieldDecrement.vue
const _sfc_main$87 = /*@__PURE__*/ defineComponent({
	name: "NumberFieldDecrement",
	inheritAttrs: false,
	__name: "NumberFieldDecrement",
	props: {
		namespace: { default: "v0:number-field:root" },
		as: { default: "button" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const root = useNumberFieldRoot(__props.namespace);
		const locale = useLocale();
		const isDisabled = toRef(() => {
			return root.isDisabled.value || root.isReadonly.value || !root.canDecrement.value;
		});
		const spin = useTimer(() => root.decrement(), {
			duration: root.spinRate,
			repeat: true
		});
		const delay = useTimer(() => spin.start(), { duration: root.spinDelay });
		function stop() {
			delay.stop();
			spin.stop();
		}
		useDocumentEventListener("pointerup", stop);
		useDocumentEventListener("pointercancel", stop);
		function onPointerdown(e) {
			if (isDisabled.value) return;
			if (e.button !== 0) return;
			e.preventDefault();
			root.decrement();
			delay.start();
		}
		function onPointerup() {
			stop();
		}
		function onPointercancel() {
			stop();
		}
		function onBlur() {
			stop();
		}
		const controlAttrs = toRef(() => {
			const disabled = isDisabled.value;
			return {
				"type": "button",
				"tabindex": -1,
				"aria-label": locale.ti("NumberField.decrement") ?? "Decrement",
				"disabled": disabled || void 0,
				"data-disabled": disabled ? true : void 0,
				onBlur,
				onPointercancel,
				onPointerdown,
				onPointerup
			};
		});
		const slotProps = toRef(() => ({
			isDisabled: isDisabled.value,
			attrs: controlAttrs.value
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), controlAttrs.value), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/NumberField/NumberFieldDescription.vue
const _sfc_main$86 = /*@__PURE__*/ defineComponent({
	name: "NumberFieldDescription",
	inheritAttrs: false,
	__name: "NumberFieldDescription",
	props: {
		id: { default: () => /* @__PURE__ */ useId$1() },
		namespace: { default: "v0:number-field:root" },
		as: { default: "span" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const root = useNumberFieldRoot(__props.namespace);
		const ticket = root.descriptions.register({ id: __props.id });
		onBeforeUnmount(() => ticket.unregister());
		const descriptionAttrs = toRef(() => ({ id: root.descriptionId }));
		const slotProps = toRef(() => ({ id: root.descriptionId }));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), descriptionAttrs.value), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/NumberField/NumberFieldError.vue
const _sfc_main$85 = /*@__PURE__*/ defineComponent({
	name: "NumberFieldError",
	inheritAttrs: false,
	__name: "NumberFieldError",
	props: {
		id: { default: () => /* @__PURE__ */ useId$1() },
		namespace: { default: "v0:number-field:root" },
		as: { default: "span" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const root = useNumberFieldRoot(__props.namespace);
		const errors = root.errors;
		const ticket = root.fieldErrors.register({ id: __props.id });
		onBeforeUnmount(() => ticket.unregister());
		const slotProps = toRef(() => ({
			errors: errors.value,
			attrs: {
				"id": root.errorId,
				"aria-live": "polite",
				"data-state": errors.value.length > 0 ? "visible" : "hidden"
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/NumberField/NumberFieldIncrement.vue
const _sfc_main$84 = /*@__PURE__*/ defineComponent({
	name: "NumberFieldIncrement",
	inheritAttrs: false,
	__name: "NumberFieldIncrement",
	props: {
		namespace: { default: "v0:number-field:root" },
		as: { default: "button" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const root = useNumberFieldRoot(__props.namespace);
		const locale = useLocale();
		const isDisabled = toRef(() => {
			return root.isDisabled.value || root.isReadonly.value || !root.canIncrement.value;
		});
		const spin = useTimer(() => root.increment(), {
			duration: root.spinRate,
			repeat: true
		});
		const delay = useTimer(() => spin.start(), { duration: root.spinDelay });
		function stop() {
			delay.stop();
			spin.stop();
		}
		useDocumentEventListener("pointerup", stop);
		useDocumentEventListener("pointercancel", stop);
		function onPointerdown(e) {
			if (isDisabled.value) return;
			if (e.button !== 0) return;
			e.preventDefault();
			root.increment();
			delay.start();
		}
		function onPointerup() {
			stop();
		}
		function onPointercancel() {
			stop();
		}
		function onBlur() {
			stop();
		}
		const controlAttrs = toRef(() => {
			const disabled = isDisabled.value;
			return {
				"type": "button",
				"tabindex": -1,
				"aria-label": locale.ti("NumberField.increment") ?? "Increment",
				"disabled": disabled || void 0,
				"data-disabled": disabled ? true : void 0,
				onBlur,
				onPointercancel,
				onPointerdown,
				onPointerup
			};
		});
		const slotProps = toRef(() => ({
			isDisabled: isDisabled.value,
			attrs: controlAttrs.value
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), controlAttrs.value), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/NumberField/NumberFieldScrub.vue
const _sfc_main$83 = /*@__PURE__*/ defineComponent({
	name: "NumberFieldScrub",
	inheritAttrs: false,
	__name: "NumberFieldScrub",
	props: {
		namespace: { default: "v0:number-field:root" },
		sensitivity: { default: 1 },
		as: { default: "label" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const root = useNumberFieldRoot(__props.namespace);
		let accumulator = 0;
		let locked = false;
		const raf = useRaf(() => {
			const steps = Math.trunc(accumulator / __props.sensitivity);
			if (steps === 0) return;
			accumulator -= steps * __props.sensitivity;
			if (steps > 0) root.increment(steps);
			else root.decrement(-steps);
		});
		function onPointermove(e) {
			if (!locked) return;
			if (root.isDisabled.value || root.isReadonly.value) return;
			accumulator += e.movementX;
			raf();
		}
		function onPointerdown(e) {
			if (root.isDisabled.value || root.isReadonly.value) return;
			if (e.button !== 0) return;
			e.currentTarget.requestPointerLock();
			locked = true;
			accumulator = 0;
		}
		function onPointerup() {
			if (!locked) return;
			locked = false;
			raf.cancel();
			document.exitPointerLock();
		}
		const slotProps = toRef(() => ({ attrs: {
			"style": { cursor: "ew-resize" },
			"data-disabled": root.isDisabled.value ? true : void 0,
			"data-readonly": root.isReadonly.value ? true : void 0,
			onPointerdown,
			onPointermove,
			onPointerup
		} }));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/NumberField/index.ts
/**
* Number field component with sub-components for numeric input controls.
*
* @see https://0.vuetifyjs.com/components/number-field
*
* @example
* ```vue
* <script setup lang="ts">
*   import { NumberField } from '@vuetify/v0'
*   import { ref } from 'vue'
*
*   const value = ref<number | null>(0)
* <\/script>
*
* <template>
*   <NumberField.Root v-model="value" :min="0" :max="100">
*     <NumberField.Decrement>-</NumberField.Decrement>
*     <NumberField.Control />
*     <NumberField.Increment>+</NumberField.Increment>
*   </NumberField.Root>
* </template>
* ```
*/
const NumberField = {
	/**
	* Root component for number fields.
	*
	* Creates number field context, provides it to child components, and
	* bridges v-model. Manages validation timing via validateOn prop.
	* Configure min, max, step, locale, and format via props.
	*
	* @see https://0.vuetifyjs.com/components/number-field
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { NumberField } from '@vuetify/v0'
	*   import { ref } from 'vue'
	*
	*   const value = ref<number | null>(0)
	* <\/script>
	*
	* <template>
	*   <NumberField.Root v-model="value" :min="0" :max="100">
	*     <NumberField.Control />
	*   </NumberField.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$89,
	/**
	* Native input element with spinbutton semantics.
	*
	* Provides keyboard navigation (Arrow, Page, Home/End, Shift+Arrow, Enter),
	* text parsing, and focus-dependent display (raw while focused, formatted
	* while blurred). Emits full ARIA spinbutton attributes.
	*
	* @see https://0.vuetifyjs.com/components/number-field#anatomy
	*
	* @example
	* ```vue
	* <NumberField.Control />
	* ```
	*/
	Control: _sfc_main$88,
	/**
	* Increment button with spin-on-hold behavior.
	*
	* On pointerdown, increments immediately then starts repeating
	* after spinDelay at spinRate interval. Disabled when value is
	* at maximum or field is disabled/readonly.
	*
	* @see https://0.vuetifyjs.com/components/number-field#anatomy
	*
	* @example
	* ```vue
	* <NumberField.Increment>+</NumberField.Increment>
	* ```
	*/
	Increment: _sfc_main$84,
	/**
	* Decrement button with spin-on-hold behavior.
	*
	* On pointerdown, decrements immediately then starts repeating
	* after spinDelay at spinRate interval. Disabled when value is
	* at minimum or field is disabled/readonly.
	*
	* @see https://0.vuetifyjs.com/components/number-field#anatomy
	*
	* @example
	* ```vue
	* <NumberField.Decrement>-</NumberField.Decrement>
	* ```
	*/
	Decrement: _sfc_main$87,
	/**
	* Click-and-drag scrub control using Pointer Lock API.
	*
	* Allows unbounded horizontal dragging to adjust the value.
	* Configure sensitivity (pixels per step) via prop. Shows
	* ew-resize cursor on hover. Renders as label by default.
	*
	* @see https://0.vuetifyjs.com/components/number-field#scrub
	*
	* @example
	* ```vue
	* <NumberField.Scrub>Amount</NumberField.Scrub>
	* ```
	*/
	Scrub: _sfc_main$83,
	/**
	* Help text component connected via aria-describedby.
	*
	* Auto-registers with parent Root to wire up the ARIA relationship
	* to the Control element.
	*
	* @see https://0.vuetifyjs.com/components/number-field#description
	*
	* @example
	* ```vue
	* <NumberField.Description>Enter a value between 0 and 100</NumberField.Description>
	* ```
	*/
	Description: _sfc_main$86,
	/**
	* Error message component connected via aria-errormessage.
	*
	* Renders validation error messages from the parent Root's validation
	* context. Uses aria-live="polite" for screen reader announcements.
	*
	* @see https://0.vuetifyjs.com/components/number-field#validation
	*
	* @example
	* ```vue
	* <NumberField.Error v-slot="{ errors }">
	*   <span v-for="error in errors">{{ error }}</span>
	* </NumberField.Error>
	* ```
	*/
	Error: _sfc_main$85
};
//#endregion
//#region src/components/Overflow/OverflowRoot.vue
/**
* @module OverflowRoot
*
* @see https://0.vuetifyjs.com/components/semantic/overflow
*
* Root component for the Overflow primitive. Owns the createOverflow context,
* the child Item registry, and the capacity computation that drives item
* visibility and the indicator's appearance.
*
* @remarks
* Visibility is computed against the *non-disabled* sibling order: a disabled
* Item is exempt from capacity math and never counts against the cap, so the
* Items around it occupy the same number of visible slots regardless of where
* the disabled Item sits. The reactive `gap` prop is forwarded to
* `createOverflow` as a getter so capacity recomputes when the prop changes.
*/
const [useOverflowRoot, provideOverflowRoot] = createContext();
const _sfc_main$82 = /*@__PURE__*/ defineComponent({
	name: "OverflowRoot",
	__name: "OverflowRoot",
	props: {
		namespace: { default: "v0:overflow" },
		gap: { default: 0 },
		priority: { default: "start" },
		disabled: {
			type: Boolean,
			default: false
		},
		as: { default: "div" },
		renderless: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		const containerRef = useTemplateRef("container");
		const indicatorWidth = shallowRef(0);
		const registry = createRegistry({ reactive: true });
		const overflow = createOverflow({
			container: () => /* @__PURE__ */ toElement(containerRef.value?.element),
			gap: () => __props.gap,
			reserved: indicatorWidth,
			reverse: () => __props.priority === "end"
		});
		const hidden = computed(() => {
			const set = /* @__PURE__ */ new Set();
			if (__props.disabled) return set;
			const cap = overflow.capacity.value;
			if (cap === Infinity) return set;
			const tickets = registry.values();
			const enabled = [];
			for (const [i, ticket] of tickets.entries()) if (!toValue(ticket.disabled)) enabled.push(i);
			const total = enabled.length;
			for (let rank = 0; rank < total; rank++) if (!(__props.priority === "end" ? rank >= total - cap : rank < cap)) set.add(enabled[rank]);
			return set;
		});
		function isVisible(index) {
			return !hidden.value.has(index);
		}
		provideOverflowRoot(__props.namespace, {
			overflow,
			registry,
			priority: toRef(() => __props.priority),
			disabled: toRef(() => __props.disabled),
			indicatorWidth,
			isOverflowing: overflow.isOverflowing,
			isVisible
		});
		const slotProps = toRef(() => ({
			capacity: overflow.capacity.value,
			size: registry.size,
			isOverflowing: overflow.isOverflowing.value,
			attrs: {
				"data-overflow": overflow.isOverflowing.value || void 0,
				"data-priority": __props.priority
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				ref: "container",
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Overflow/OverflowIndicator.vue
/**
* @module OverflowIndicator
*
* @see https://0.vuetifyjs.com/components/semantic/overflow
*
* Indicator that renders only when items overflow. Self-measures its own
* width and writes it back to OverflowRoot so capacity computation can
* reserve space for the indicator's footprint.
*
* @remarks
* In non-renderless mode, the wrapper carries `data-overflow-indicator`
* and `aria-live="polite"`. **Renderless mode** drops the wrapper, so the
* slot consumer must spread `slotProps.attrs` onto their own element to
* preserve the data hook and live-region semantics.
*/
const _sfc_main$81 = /*@__PURE__*/ defineComponent({
	name: "OverflowIndicator",
	__name: "OverflowIndicator",
	props: {
		namespace: { default: "v0:overflow" },
		as: { default: "div" },
		renderless: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		const root = useOverflowRoot(__props.namespace);
		const atomRef = useTemplateRef("atom");
		const el = toRef(() => /* @__PURE__ */ toElement(atomRef.value?.element) ?? null);
		function measure() {
			if (!IN_BROWSER || !el.value) {
				root.indicatorWidth.value = 0;
				return;
			}
			const style = getComputedStyle(el.value);
			const marginX = /* @__PURE__ */ pxToNumber(style.marginLeft) + /* @__PURE__ */ pxToNumber(style.marginRight);
			root.indicatorWidth.value = (el.value.offsetWidth || 0) + marginX;
		}
		watch(el, () => measure(), { immediate: true });
		useResizeObserver(el, () => measure());
		onBeforeUnmount(() => {
			root.indicatorWidth.value = 0;
		});
		const hidden = computed(() => {
			return root.registry.values().filter((_, index) => !root.isVisible(index));
		});
		const slotProps = toRef(() => ({
			count: hidden.value.length,
			hidden: hidden.value,
			attrs: {
				"data-overflow-indicator": "true",
				"aria-live": "polite"
			}
		}));
		return (_ctx, _cache) => {
			return unref(root).isOverflowing.value ? (openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				key: 0,
				ref: "atom",
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"])) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region src/components/Overflow/OverflowItem.vue
/**
* @module OverflowItem
*
* @see https://0.vuetifyjs.com/components/semantic/overflow
*
* Individual overflow item. Registers with OverflowRoot, self-measures,
* and renders/hides based on capacity.
*
* @remarks
* In non-renderless mode, the wrapper applies a structural `display: none`
* inline style when the item is hidden. **Renderless mode** drops the wrapper,
* so the slot consumer is responsible for honoring `isHidden` themselves —
* read it from `slotProps.isHidden` and conditionally render or apply CSS.
*/
const _sfc_main$80 = /*@__PURE__*/ defineComponent({
	name: "OverflowItem",
	__name: "OverflowItem",
	props: {
		namespace: { default: "v0:overflow" },
		value: {},
		disabled: {
			type: Boolean,
			default: false
		},
		as: { default: "div" },
		renderless: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		const root = useOverflowRoot(__props.namespace);
		const atomRef = useTemplateRef("atom");
		const el = toRef(() => /* @__PURE__ */ toElement(atomRef.value?.element) ?? null);
		const _disabled = toRef(() => __props.disabled);
		const ticket = root.registry.register({
			value: __props.value,
			disabled: _disabled
		});
		let lastMeasuredIndex = null;
		watch(() => [
			_disabled.value,
			el.value,
			ticket.index
		], ([isDisabled, element, index]) => {
			if (!/* @__PURE__ */ isNull(lastMeasuredIndex) && lastMeasuredIndex !== index) root.overflow.measure(lastMeasuredIndex, void 0);
			lastMeasuredIndex = index;
			root.overflow.measure(index, isDisabled ? void 0 : element ?? void 0);
		}, { immediate: true });
		onBeforeUnmount(() => {
			if (!/* @__PURE__ */ isNull(lastMeasuredIndex)) root.overflow.measure(lastMeasuredIndex, void 0);
			root.registry.unregister(ticket.id);
		});
		const isVisible = toRef(() => __props.disabled || root.isVisible(ticket.index));
		const isHidden = toRef(() => !isVisible.value);
		const slotProps = toRef(() => ({
			isVisible: isVisible.value,
			isHidden: isHidden.value,
			attrs: {
				"data-hidden": isHidden.value || void 0,
				"aria-hidden": isHidden.value ? "true" : void 0
			}
		}));
		return (_ctx, _cache) => {
			return withDirectives((openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				ref: "atom",
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"])), [[vShow, isVisible.value]]);
		};
	}
});
//#endregion
//#region src/components/Overflow/index.ts
/**
* Headless responsive truncation primitive. Children render until the
* container runs out of width, then overflowing children are hidden
* and an indicator surfaces the hidden count.
*
* @see https://0.vuetifyjs.com/components/semantic/overflow
*/
const Overflow = {
	/**
	* Root component. Owns the createOverflow context, child registry,
	* and capacity computation.
	*
	* @see https://0.vuetifyjs.com/components/semantic/overflow
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Overflow } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Overflow.Root class="flex gap-2 overflow-hidden">
	*     <Overflow.Item v-for="tag in tags" :key="tag">
	*       {{ tag }}
	*     </Overflow.Item>
	*
	*     <Overflow.Indicator v-slot="{ count }">
	*       +{{ count }} more
	*     </Overflow.Indicator>
	*   </Overflow.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$82,
	/**
	* Individual overflow item. Registers with Root and self-measures.
	* Hidden when its index falls outside capacity.
	*
	* @see https://0.vuetifyjs.com/components/semantic/overflow
	*
	* @example
	* ```vue
	* <template>
	*   <Overflow.Item v-slot="{ isHidden }">
	*     <span :class="{ 'opacity-50': isHidden }">Tag</span>
	*   </Overflow.Item>
	* </template>
	* ```
	*/
	Item: _sfc_main$80,
	/**
	* Indicator that renders only when items are hidden. Exposes the
	* hidden count and the array of hidden tickets via slot props.
	*
	* @see https://0.vuetifyjs.com/components/semantic/overflow
	*
	* @example
	* ```vue
	* <template>
	*   <Overflow.Indicator v-slot="{ count, hidden }">
	*     +{{ count }} more
	*   </Overflow.Indicator>
	* </template>
	* ```
	*/
	Indicator: _sfc_main$81
};
//#endregion
//#region src/components/Pagination/PaginationRoot.vue
const [usePaginationRoot, providePaginationRoot] = createContext();
const [usePaginationControls, providePaginationControls] = createContext({ suffix: "controls" });
const [usePaginationItems, providePaginationItems] = createContext({ suffix: "items" });
const _sfc_main$79 = /*@__PURE__*/ defineComponent({
	name: "PaginationRoot",
	__name: "PaginationRoot",
	props: /*@__PURE__*/ mergeModels({
		namespace: { default: "v0:pagination" },
		size: { default: 1 },
		totalVisible: {},
		itemsPerPage: { default: 10 },
		ellipsis: {
			type: [String, Boolean],
			default: "..."
		},
		as: { default: "nav" },
		renderless: { type: Boolean }
	}, {
		"modelValue": { default: 1 },
		"modelModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["update:model-value"], ["update:modelValue"]),
	setup(__props) {
		const page = useModel(__props, "modelValue");
		const locale = useLocale();
		const controls = createRegistry();
		const items = createRegistry();
		const atom = useTemplateRef("atom");
		const itemWidth = shallowRef(0);
		const itemGap = shallowRef(0);
		const overflow = createOverflow({
			container: () => atom.value?.element,
			itemWidth,
			gap: itemGap
		});
		/* v8 ignore start -- browser-only measurement code */
		watch([() => items.size, () => overflow.width.value], () => {
			if (!IN_BROWSER) return;
			const el = items.seek("first")?.value;
			const root = overflow.container.value;
			if (!el || !root) return;
			requestAnimationFrame(() => {
				const rootStyle = getComputedStyle(root);
				const style = getComputedStyle(el);
				const marginX = /* @__PURE__ */ pxToNumber(style.marginLeft) + /* @__PURE__ */ pxToNumber(style.marginRight);
				const gapX = /* @__PURE__ */ pxToNumber(rootStyle.gap);
				itemWidth.value = (el.offsetWidth || 0) + marginX;
				itemGap.value = gapX;
			});
		}, { flush: "post" });
		/* v8 ignore stop */
		const visible = computed(() => {
			const totalCap = overflow.capacity.value;
			if (totalCap === Infinity) return __props.totalVisible ?? 7;
			/* v8 ignore start -- branches require browser measurement */
			const pageCap = Math.max(0, totalCap - controls.size);
			const noVisible = /* @__PURE__ */ isNullOrUndefined(__props.totalVisible);
			if (pageCap > 0) return noVisible ? pageCap : Math.min(__props.totalVisible, pageCap);
			return noVisible ? 1 : __props.totalVisible;
			/* v8 ignore stop */
		});
		const pagination = createPagination({
			page,
			visible,
			ellipsis: __props.ellipsis,
			size: () => __props.size,
			itemsPerPage: () => __props.itemsPerPage
		});
		const slotProps = toRef(() => ({
			page: pagination.page.value,
			size: pagination.size,
			pages: pagination.pages,
			itemsPerPage: pagination.itemsPerPage,
			items: pagination.items.value,
			pageStart: pagination.pageStart.value,
			pageStop: pagination.pageStop.value,
			isFirst: pagination.isFirst.value,
			isLast: pagination.isLast.value,
			first: pagination.first,
			last: pagination.last,
			next: pagination.next,
			prev: pagination.prev,
			select: pagination.select,
			attrs: {
				"aria-label": locale.ti("Pagination.label") ?? "Pagination",
				"role": __props.as === "nav" ? void 0 : "navigation"
			}
		}));
		providePaginationRoot(__props.namespace, pagination);
		providePaginationControls(__props.namespace, controls);
		providePaginationItems(__props.namespace, items);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				ref_key: "atom",
				ref: atom
			}, slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Pagination/PaginationEllipsis.vue
const _sfc_main$78 = /*@__PURE__*/ defineComponent({
	name: "PaginationEllipsis",
	__name: "PaginationEllipsis",
	props: {
		namespace: { default: "v0:pagination" },
		ellipsis: {},
		id: { default: () => /* @__PURE__ */ useId$1() },
		as: { default: "span" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const pagination = usePaginationRoot(__props.namespace);
		const items = usePaginationItems(__props.namespace);
		const atom = useTemplateRef("atom");
		watch(() => atom.value?.element, (el) => {
			if (!el) return;
			items.register({
				id: __props.id,
				value: el
			});
		}, { immediate: true });
		const resolvedEllipsis = toRef(() => __props.ellipsis ?? pagination.ellipsis);
		const slotProps = toRef(() => ({
			ellipsis: resolvedEllipsis.value,
			attrs: { "aria-hidden": "true" }
		}));
		onBeforeUnmount(() => items.unregister(__props.id));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				ref_key: "atom",
				ref: atom
			}, slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)), () => [createTextVNode(toDisplayString(resolvedEllipsis.value), 1), createCommentVNode(" v8 ignore -- template fallback ")])]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Pagination/PaginationFirst.vue
const _sfc_main$77 = /*@__PURE__*/ defineComponent({
	name: "PaginationFirst",
	__name: "PaginationFirst",
	props: {
		namespace: { default: "v0:pagination" },
		disabled: { type: Boolean },
		id: { default: () => /* @__PURE__ */ useId$1() },
		as: { default: "button" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const locale = useLocale();
		const pagination = usePaginationRoot(__props.namespace);
		const controls = usePaginationControls(__props.namespace);
		const atom = useTemplateRef("atom");
		watch(() => atom.value?.element, (el) => {
			if (!el) return;
			controls.register({
				id: __props.id,
				value: el
			});
		}, { immediate: true });
		const isDisabled = toRef(() => __props.disabled || pagination.isFirst.value);
		function first() {
			if (isDisabled.value) return;
			pagination.first();
		}
		function onKeydown(e) {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				first();
			}
		}
		const slotProps = toRef(() => ({
			isDisabled: isDisabled.value,
			first,
			attrs: {
				"aria-label": locale.ti("Pagination.first") ?? "First page",
				"aria-disabled": isDisabled.value,
				"data-disabled": isDisabled.value || void 0,
				"disabled": __props.as === "button" ? isDisabled.value : void 0,
				"tabindex": isDisabled.value ? -1 : 0,
				"type": __props.as === "button" ? "button" : void 0,
				"role": __props.as === "button" ? void 0 : "button",
				"onClick": first,
				"onKeydown": __props.as === "button" ? void 0 : onKeydown
			}
		}));
		onBeforeUnmount(() => controls.unregister(__props.id));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				ref_key: "atom",
				ref: atom
			}, slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Pagination/PaginationItem.vue
const _sfc_main$76 = /*@__PURE__*/ defineComponent({
	name: "PaginationItem",
	__name: "PaginationItem",
	props: {
		namespace: { default: "v0:pagination" },
		value: {},
		disabled: {
			type: Boolean,
			default: false
		},
		id: { default: () => /* @__PURE__ */ useId$1() },
		as: { default: "button" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const locale = useLocale();
		const pagination = usePaginationRoot(__props.namespace);
		const items = usePaginationItems(__props.namespace);
		const atom = useTemplateRef("atom");
		watch(() => atom.value?.element, (el) => {
			if (!el) return;
			items.register({
				id: __props.id,
				value: el
			});
		}, { immediate: true });
		const isSelected = toRef(() => pagination.page.value === __props.value);
		const ariaLabel = toRef(() => {
			return isSelected.value ? locale.ti("Pagination.currentPage", { page: __props.value }) ?? `Page ${__props.value}, current` : locale.ti("Pagination.goToPage", { page: __props.value }) ?? `Go to page ${__props.value}`;
		});
		function select() {
			if (__props.disabled) return;
			pagination.select(__props.value);
		}
		function onKeydown(e) {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				select();
			}
		}
		const slotProps = toRef(() => ({
			page: __props.value,
			isSelected: isSelected.value,
			isDisabled: __props.disabled,
			select,
			attrs: {
				"aria-label": ariaLabel.value,
				"aria-current": isSelected.value ? "page" : void 0,
				"aria-disabled": __props.disabled,
				"data-selected": isSelected.value || void 0,
				"data-disabled": __props.disabled || void 0,
				"disabled": __props.as === "button" ? __props.disabled : void 0,
				"tabindex": __props.disabled ? -1 : 0,
				"type": __props.as === "button" ? "button" : void 0,
				"role": __props.as === "button" ? void 0 : "button",
				"onClick": select,
				"onKeydown": __props.as === "button" ? void 0 : onKeydown
			}
		}));
		onBeforeUnmount(() => items.unregister(__props.id));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				ref_key: "atom",
				ref: atom
			}, slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)), () => [createTextVNode(toDisplayString(__props.value), 1)])]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Pagination/PaginationLast.vue
const _sfc_main$75 = /*@__PURE__*/ defineComponent({
	name: "PaginationLast",
	__name: "PaginationLast",
	props: {
		namespace: { default: "v0:pagination" },
		disabled: { type: Boolean },
		id: { default: () => /* @__PURE__ */ useId$1() },
		as: { default: "button" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const locale = useLocale();
		const pagination = usePaginationRoot(__props.namespace);
		const controls = usePaginationControls(__props.namespace);
		const atom = useTemplateRef("atom");
		watch(() => atom.value?.element, (el) => {
			if (!el) return;
			controls.register({
				id: __props.id,
				value: el
			});
		}, { immediate: true });
		const isDisabled = toRef(() => __props.disabled || pagination.isLast.value);
		function last() {
			if (isDisabled.value) return;
			pagination.last();
		}
		function onKeydown(e) {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				last();
			}
		}
		const slotProps = toRef(() => ({
			isDisabled: isDisabled.value,
			last,
			attrs: {
				"aria-label": locale.ti("Pagination.last") ?? "Last page",
				"aria-disabled": isDisabled.value,
				"data-disabled": isDisabled.value || void 0,
				"disabled": __props.as === "button" ? isDisabled.value : void 0,
				"tabindex": isDisabled.value ? -1 : 0,
				"type": __props.as === "button" ? "button" : void 0,
				"role": __props.as === "button" ? void 0 : "button",
				"onClick": last,
				"onKeydown": __props.as === "button" ? void 0 : onKeydown
			}
		}));
		onBeforeUnmount(() => controls.unregister(__props.id));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				ref_key: "atom",
				ref: atom
			}, slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Pagination/PaginationNext.vue
const _sfc_main$74 = /*@__PURE__*/ defineComponent({
	name: "PaginationNext",
	__name: "PaginationNext",
	props: {
		namespace: { default: "v0:pagination" },
		disabled: { type: Boolean },
		id: { default: () => /* @__PURE__ */ useId$1() },
		as: { default: "button" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const locale = useLocale();
		const pagination = usePaginationRoot(__props.namespace);
		const controls = usePaginationControls(__props.namespace);
		const atom = useTemplateRef("atom");
		watch(() => atom.value?.element, (el) => {
			if (!el) return;
			controls.register({
				id: __props.id,
				value: el
			});
		}, { immediate: true });
		const isDisabled = toRef(() => __props.disabled || pagination.isLast.value);
		function next() {
			if (isDisabled.value) return;
			pagination.next();
		}
		function onKeydown(e) {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				next();
			}
		}
		const slotProps = toRef(() => ({
			isDisabled: isDisabled.value,
			next,
			attrs: {
				"aria-label": locale.ti("Pagination.next") ?? "Next page",
				"aria-disabled": isDisabled.value,
				"data-disabled": isDisabled.value || void 0,
				"disabled": __props.as === "button" ? isDisabled.value : void 0,
				"tabindex": isDisabled.value ? -1 : 0,
				"type": __props.as === "button" ? "button" : void 0,
				"role": __props.as === "button" ? void 0 : "button",
				"onClick": next,
				"onKeydown": __props.as === "button" ? void 0 : onKeydown
			}
		}));
		onBeforeUnmount(() => controls.unregister(__props.id));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				ref_key: "atom",
				ref: atom
			}, slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Pagination/PaginationPrev.vue
const _sfc_main$73 = /*@__PURE__*/ defineComponent({
	name: "PaginationPrev",
	__name: "PaginationPrev",
	props: {
		namespace: { default: "v0:pagination" },
		disabled: { type: Boolean },
		id: { default: () => /* @__PURE__ */ useId$1() },
		as: { default: "button" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const locale = useLocale();
		const pagination = usePaginationRoot(__props.namespace);
		const controls = usePaginationControls(__props.namespace);
		const atom = useTemplateRef("atom");
		watch(() => atom.value?.element, (el) => {
			if (!el) return;
			controls.register({
				id: __props.id,
				value: el
			});
		}, { immediate: true });
		const isDisabled = toRef(() => __props.disabled || pagination.isFirst.value);
		function prev() {
			if (isDisabled.value) return;
			pagination.prev();
		}
		function onKeydown(e) {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				prev();
			}
		}
		const slotProps = toRef(() => ({
			isDisabled: isDisabled.value,
			prev,
			attrs: {
				"aria-label": locale.ti("Pagination.prev") ?? "Previous page",
				"aria-disabled": isDisabled.value,
				"data-disabled": isDisabled.value || void 0,
				"disabled": __props.as === "button" ? isDisabled.value : void 0,
				"tabindex": isDisabled.value ? -1 : 0,
				"type": __props.as === "button" ? "button" : void 0,
				"role": __props.as === "button" ? void 0 : "button",
				"onClick": prev,
				"onKeydown": __props.as === "button" ? void 0 : onKeydown
			}
		}));
		onBeforeUnmount(() => controls.unregister(__props.id));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				ref_key: "atom",
				ref: atom
			}, slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Pagination/PaginationStatus.vue
const _sfc_main$72 = /*@__PURE__*/ defineComponent({
	name: "PaginationStatus",
	__name: "PaginationStatus",
	props: {
		namespace: { default: "v0:pagination" },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const locale = useLocale();
		const pagination = usePaginationRoot(__props.namespace);
		const text = shallowRef("");
		/* v8 ignore start -- watch fires after mount, setTimeout callback requires timer */
		let pending;
		watch(() => pagination.page.value, (page, prevPage) => {
			if (/* @__PURE__ */ isUndefined(prevPage)) return;
			clearTimeout(pending);
			pending = setTimeout(() => {
				text.value = locale.ti("Pagination.status", {
					page,
					pages: pagination.pages
				}) ?? `Page ${page} of ${pagination.pages}`;
			}, 100);
		});
		onBeforeUnmount(() => clearTimeout(pending));
		/* v8 ignore stop */
		const slotProps = toRef(() => ({
			page: pagination.page.value,
			pages: pagination.pages,
			text: text.value,
			attrs: {
				"aria-atomic": true,
				"aria-live": "polite",
				"role": "status"
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)), () => [createTextVNode(toDisplayString(text.value), 1)])]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Pagination/index.ts
/**
* Pagination component with sub-components for building pagination controls.
*
* @see https://0.vuetifyjs.com/components/semantic/pagination
*/
const Pagination = {
	/**
	* Root component for pagination controls.
	*
	* @see https://0.vuetifyjs.com/components/semantic/pagination
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Pagination } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Pagination.Root v-model="page" :size="100">
	*     <Pagination.First />
	*
	*     <Pagination.Prev />
	*
	*     <template v-for="item in items" :key="item.value">
	*       <Pagination.Item v-if="item.type === 'page'" :value="item.value" />
	*
	*       <Pagination.Ellipsis v-else />
	*     </template>
	*
	*     <Pagination.Next />
	*
	*     <Pagination.Last />
	*   </Pagination.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$79,
	/**
	* Individual page button that navigates to a specific page number.
	*
	* @see https://0.vuetifyjs.com/components/semantic/pagination
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Pagination } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Pagination.Item :value="1">1</Pagination.Item>
	*
	*   <!-- With slot props -->
	*   <Pagination.Item :value="2" v-slot="{ isSelected }">
	*     <span :class="{ 'font-bold': isSelected }">2</span>
	*   </Pagination.Item>
	* </template>
	* ```
	*/
	Item: _sfc_main$76,
	/**
	* Navigation button that jumps to the first page. Automatically
	* disables when already on the first page.
	*
	* @see https://0.vuetifyjs.com/components/semantic/pagination
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Pagination } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Pagination.First>First</Pagination.First>
	*
	*   <!-- With slot props -->
	*   <Pagination.First v-slot="{ isDisabled }">
	*     <span :class="{ 'opacity-50': isDisabled }">«</span>
	*   </Pagination.First>
	*
	*   <!-- With data attributes -->
	*   <Pagination.First class="data-[disabled]:opacity-50">
	*     First
	*   </Pagination.First>
	* </template>
	* ```
	*/
	First: _sfc_main$77,
	/**
	* Navigation button that moves to the previous page. Automatically
	* disables when already on the first page.
	*
	* @see https://0.vuetifyjs.com/components/semantic/pagination
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Pagination } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Pagination.Prev>Prev</Pagination.Prev>
	*
	*   <!-- With slot props -->
	*   <Pagination.Prev v-slot="{ isDisabled }">
	*     <span :class="{ 'opacity-50': isDisabled }">‹</span>
	*   </Pagination.Prev>
	*
	*  <!-- With data attributes -->
	*  <Pagination.Prev class="data-[disabled]:opacity-50">
	*    Prev
	*  </Pagination.Prev>
	* </template>
	* ```
	*/
	Prev: _sfc_main$73,
	/**
	* Visual indicator for omitted page numbers. Hidden from screen
	* readers via aria-hidden. Inherits ellipsis character from Root
	* or can be overridden via prop.
	*
	* @see https://0.vuetifyjs.com/components/semantic/pagination
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Pagination } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <!-- Uses default "..." from Root -->
	*   <Pagination.Ellipsis />
	*
	*   <!-- Override ellipsis character -->
	*   <Pagination.Ellipsis ellipsis="…" />
	* </template>
	* ```
	*/
	Ellipsis: _sfc_main$78,
	/**
	* Navigation button that moves to the next page. Automatically
	* disables when already on the last page.
	*
	* @see https://0.vuetifyjs.com/components/semantic/pagination
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Pagination } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Pagination.Next>Next</Pagination.Next>
	*
	*   <!-- With slot props -->
	*   <Pagination.Next v-slot="{ isDisabled }">
	*     <span :class="{ 'opacity-50': isDisabled }">›</span>
	*   </Pagination.Next>
	*
	*   <!-- With data attributes -->
	*   <Pagination.Next class="data-[disabled]:opacity-50">
	*     Next
	*   </Pagination.Next>
	* </template>
	* ```
	*/
	Next: _sfc_main$74,
	/**
	* Navigation button that jumps to the last page. Automatically
	* disables when already on the last page.
	*
	* @see https://0.vuetifyjs.com/components/semantic/pagination
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Pagination } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Pagination.Last>Last</Pagination.Last>
	*
	*   <!-- With slot props -->
	*   <Pagination.Last v-slot="{ isDisabled }">
	*     <span :class="{ 'opacity-50': isDisabled }">»</span>
	*   </Pagination.Last>
	*
	*   <!-- With data attributes -->
	*   <Pagination.Last class="data-[disabled]:opacity-50">
	*     Last
	*   </Pagination.Last>
	* </template>
	* ```
	*/
	Last: _sfc_main$75,
	/**
	* Visually-hidden live region that announces page changes to screen
	* readers. Should be styled with sr-only/visually-hidden CSS.
	*
	* @see https://0.vuetifyjs.com/components/semantic/pagination
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Pagination } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Pagination.Root v-model="page" :size="100">
	*     <Pagination.Status class="sr-only" />
	*     <!-- other pagination items -->
	*   </Pagination.Root>
	* </template>
	* ```
	*/
	Status: _sfc_main$72
};
//#endregion
//#region src/components/Popover/PopoverRoot.vue
const [usePopoverContext, providePopoverContext] = createContext("v0:popover:root");
const _sfc_main$71 = /*@__PURE__*/ defineComponent({
	name: "PopoverRoot",
	__name: "PopoverRoot",
	props: /*@__PURE__*/ mergeModels({
		id: {},
		positionArea: {},
		positionTry: {},
		adapter: {},
		as: { default: null },
		renderless: { type: Boolean }
	}, {
		"modelValue": {
			type: Boolean,
			default: false
		},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const isSelected = useModel(__props, "modelValue");
		const popover = usePopover({
			id: __props.id,
			isOpen: isSelected,
			adapter: __props.adapter,
			positionArea: () => __props.positionArea,
			positionTry: () => __props.positionTry
		});
		providePopoverContext(popover);
		const slotProps = toRef(() => ({
			id: popover.id,
			isSelected: isSelected.value,
			toggle: popover.toggle
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), {
				as: __props.as,
				renderless: ""
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 8, ["as"]);
		};
	}
});
//#endregion
//#region src/components/Popover/PopoverActivator.vue
const _sfc_main$70 = /*@__PURE__*/ defineComponent({
	name: "PopoverActivator",
	__name: "PopoverActivator",
	props: {
		target: {},
		as: { default: "button" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = usePopoverContext();
		const atomRef = useTemplateRef("atom");
		if (!__props.target) context.attachAnchor(() => /* @__PURE__ */ toElement(atomRef.value?.element) ?? null);
		const popovertarget = toRef(() => __props.target ?? context.id);
		const style = toRef(() => {
			if (__props.target) return { anchorName: `--${String(__props.target).replace(/[^a-zA-Z0-9_-]/g, "")}` };
			return context.anchorStyles.value;
		});
		function onKeydown(e) {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				context.toggle();
			}
		}
		const slotProps = toRef(() => ({
			isOpen: context.isOpen.value,
			attrs: {
				"popovertarget": toValue(popovertarget),
				"type": __props.as === "button" ? "button" : void 0,
				"role": __props.as === "button" ? void 0 : "button",
				"tabindex": 0,
				"aria-expanded": context.isOpen.value,
				"aria-controls": toValue(popovertarget),
				"data-open": context.isOpen.value || void 0,
				"style": style.value,
				"onKeydown": __props.as === "button" ? void 0 : onKeydown
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				ref: "atom",
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Popover/PopoverContent.vue
const _sfc_main$69 = /*@__PURE__*/ defineComponent({
	name: "PopoverContent",
	__name: "PopoverContent",
	props: {
		id: {},
		positionArea: {},
		positionTry: {},
		as: {},
		renderless: { type: Boolean }
	},
	emits: ["beforetoggle"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const context = usePopoverContext();
		const ref = useTemplateRef("ref");
		watch(() => __props.positionArea, (value) => {
			if (!/* @__PURE__ */ isUndefined(value)) context.positionArea.value = value;
		}, { immediate: true });
		watch(() => __props.positionTry, (value) => {
			if (!/* @__PURE__ */ isUndefined(value)) context.positionTry.value = value;
		}, { immediate: true });
		const id = toRef(() => __props.id ?? context.id);
		const style = toRef(() => {
			const styles = context.contentStyles.value;
			if (/* @__PURE__ */ isUndefined(__props.id)) return styles;
			return {
				...styles,
				"position-anchor": `--${String(__props.id).replace(/[^a-zA-Z0-9_-]/g, "")}`
			};
		});
		context.attach(() => ref.value?.element);
		function onBeforeToggle(e) {
			emit("beforetoggle", e);
		}
		const slotProps = toRef(() => ({
			isOpen: context.isOpen.value,
			attrs: {
				id: id.value,
				popover: "",
				style: style.value,
				onBeforetoggle: onBeforeToggle
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				ref_key: "ref",
				ref,
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Popover/index.ts
/**
* Popover component with sub-components for building popovers.
*
* @see https://0.vuetifyjs.com/components/disclosure/popover
*/
const Popover = {
	/**
	* Root component for popovers.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/popover
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Popover } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Popover.Root>
	*     <Popover.Activator>
	*       Click to toggle
	*     </Popover.Activator>
	*
	*     <Popover.Content>
	*       Popover content goes here.
	*     </Popover.Content>
	*   </Popover.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$71,
	/**
	* Activator component that opens the popover.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/popover
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Popover } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Popover.Activator>
	*     Click to toggle
	*   </Popover.Activator>
	* </template>
	* ```
	*/
	Activator: _sfc_main$70,
	/**
	* Component for the content section of a popover.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/popover
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Popover } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Popover.Content>
	*     Popover content goes here.
	*   </Popover.Content>
	* </template>
	* ```
	*/
	Content: _sfc_main$69
};
//#endregion
//#region src/components/Portal/Portal.vue
/**
* @module Portal
*
* @see https://0.vuetifyjs.com/components/primitives/portal
*
* @remarks
* Renderless component wrapping Vue's Teleport with automatic
* useStack integration for z-index coordination.
*
* Standardizes the teleport + stack registration pattern used by
* overlay components (Snackbar, Toast, Dialog, etc.).
*/
const _sfc_main$68 = /*@__PURE__*/ defineComponent({
	name: "Portal",
	__name: "Portal",
	props: {
		to: {},
		disabled: {
			type: Boolean,
			default: false
		},
		blocking: {
			type: Boolean,
			default: false
		},
		scrim: {
			type: Boolean,
			default: true
		}
	},
	emits: ["close"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const stack = useStack();
		const ticket = stack.register({
			blocking: () => __props.blocking,
			scrim: () => __props.scrim,
			onDismiss: () => emit("close")
		});
		ticket.select();
		const target = toRef(() => {
			const resolvedTo = __props.to ?? stack.default.value ?? "body";
			return resolvedTo === "top-layer" ? stack.topElement.value ?? "body" : resolvedTo;
		});
		const slotProps = toRef(() => ({
			zIndex: ticket.zIndex.value,
			close: ticket.dismiss
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(Teleport, {
				disabled: __props.disabled,
				to: target.value
			}, [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))], 8, ["disabled", "to"]);
		};
	}
});
//#endregion
//#region src/components/Presence/Presence.vue
/**
* @module Presence
*
* @see https://0.vuetifyjs.com/components/primitives/presence
*
* @remarks
* Renderless component for animation-agnostic mount lifecycle.
*
* Wraps usePresence composable, exposing lifecycle state via
* slot props. Content is conditionally rendered based on
* isMounted — stays in DOM during the leaving state to allow
* exit animations.
*
* Key features:
* - v-model driven visibility
* - Lazy mounting via `lazy` prop
* - Exit animation support via `done` slot prop
* - Lifecycle events: `enter`, `leave`, `after-leave`
* - Animation-agnostic: works with CSS, WAAPI, GSAP, or nothing
*/
const _sfc_main$67 = /*@__PURE__*/ defineComponent({
	name: "Presence",
	__name: "Presence",
	props: /*@__PURE__*/ mergeModels({
		lazy: {
			type: Boolean,
			default: false
		},
		immediate: {
			type: Boolean,
			default: true
		}
	}, {
		"modelValue": {
			type: Boolean,
			default: false
		},
		"modelModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels([
		"enter",
		"leave",
		"after-leave"
	], ["update:modelValue"]),
	setup(__props, { emit: __emit }) {
		/**
		* @event enter Content mounted in DOM (enter animation can start)
		* @event leave Exit started, content still in DOM (exit animation can start)
		* @event after-leave Exit complete, content about to be removed from DOM
		*/
		const emit = __emit;
		const model = useModel(__props, "modelValue");
		const presence = usePresence({
			present: model,
			lazy: __props.lazy,
			immediate: __props.immediate
		});
		const slotProps = toRef(() => {
			const state = presence.state.value;
			const attrs = { "data-state": state };
			if (__props.lazy && state === "mounted") attrs.hidden = true;
			return {
				attrs,
				isPresent: presence.isPresent.value,
				isLeaving: presence.isLeaving.value,
				done: presence.done
			};
		});
		watch(presence.state, (state, prev) => {
			if (state === "mounted" && prev === "unmounted") emit("enter");
			else if (state === "leaving") emit("leave");
			else if (prev === "leaving" && (state === "unmounted" || state === "mounted")) emit("after-leave");
		});
		return (_ctx, _cache) => {
			return unref(presence).isMounted.value ? renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)), void 0, void 0, 0) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region src/components/Progress/ProgressHiddenInput.vue
const _hoisted_1$5 = ["name", "value"];
const _sfc_main$66 = /*@__PURE__*/ defineComponent({
	name: "ProgressHiddenInput",
	__name: "ProgressHiddenInput",
	props: { namespace: { default: "v0:progress:root" } },
	setup(__props) {
		const root = useProgressRoot(__props.namespace);
		const value = toRef(() => root.total.value);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("input", {
				name: unref(root).name,
				tabindex: "-1",
				type: "hidden",
				value: value.value
			}, null, 8, _hoisted_1$5);
		};
	}
});
//#endregion
//#region src/components/Progress/ProgressRoot.vue
const [useProgressRoot, provideProgressRoot] = createContext();
const _sfc_main$65 = /*@__PURE__*/ defineComponent({
	name: "ProgressRoot",
	inheritAttrs: false,
	__name: "ProgressRoot",
	props: /*@__PURE__*/ mergeModels({
		id: { default: () => /* @__PURE__ */ useId$1() },
		ariaLabel: {},
		modelValue: {},
		min: { default: 0 },
		max: { default: 100 },
		name: {},
		namespace: { default: "v0:progress:root" },
		as: { default: "div" },
		renderless: { type: Boolean }
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const attrs = useAttrs();
		const model = useModel(__props, "modelValue");
		const internal = computed({
			get: () => {
				if (/* @__PURE__ */ isNullOrUndefined(model.value)) return [];
				return /* @__PURE__ */ isArray(model.value) ? model.value : [model.value];
			},
			set: (arr) => {
				/* v8 ignore next -- defensive guard for null/undefined model with empty registry */
				if (/* @__PURE__ */ isNullOrUndefined(model.value) && arr.length === 0) return;
				/* v8 ignore next -- arr[0] is defined once a fill has registered a value */
				model.value = /* @__PURE__ */ isArray(model.value) ? arr : arr[0] ?? 0;
			}
		});
		const progress = createProgress({
			min: __props.min,
			max: __props.max
		});
		useProxyModel(progress, internal, { multiple: true });
		const labelId = `${__props.id}-label`;
		const hasLabel = shallowRef(false);
		const context = {
			...progress,
			id: __props.id,
			name: __props.name,
			labelId,
			hasLabel
		};
		provideProgressRoot(__props.namespace, context);
		const slotProps = toRef(() => {
			const indeterminate = progress.isIndeterminate.value;
			const total = progress.total.value;
			const pct = progress.percent.value;
			return {
				id: __props.id,
				total,
				percent: pct,
				isIndeterminate: indeterminate,
				segments: progress.segments.value,
				attrs: {
					"role": "progressbar",
					"aria-valuenow": indeterminate ? void 0 : total,
					"aria-valuemin": __props.min,
					"aria-valuemax": __props.max,
					"aria-valuetext": indeterminate ? void 0 : `${Math.round(pct)}%`,
					"aria-label": hasLabel.value ? void 0 : __props.ariaLabel,
					"aria-labelledby": hasLabel.value ? labelId : void 0,
					"aria-busy": indeterminate ? true : void 0,
					"data-state": indeterminate ? "indeterminate" : "determinate",
					"data-complete": total >= __props.max ? true : void 0
				}
			};
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createVNode(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]), __props.name ? (openBlock(), createBlock(_sfc_main$66, { key: 0 })) : createCommentVNode("v-if", true)], 64);
		};
	}
});
//#endregion
//#region src/components/Progress/ProgressBuffer.vue
const _sfc_main$64 = /*@__PURE__*/ defineComponent({
	name: "ProgressBuffer",
	inheritAttrs: false,
	__name: "ProgressBuffer",
	props: {
		value: { default: 0 },
		namespace: { default: "v0:progress:root" },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const root = useProgressRoot(__props.namespace);
		const extent = toRef(() => root.max - root.min);
		const clamped = toRef(() => /* @__PURE__ */ clamp(__props.value, root.min, root.max));
		const percent = toRef(() => {
			if (extent.value === 0) return 0;
			return (clamped.value - root.min) / extent.value * 100;
		});
		const slotProps = toRef(() => ({
			value: clamped.value,
			percent: percent.value,
			attrs: {
				"data-buffer": true,
				"data-state": root.isIndeterminate.value ? "indeterminate" : "determinate",
				"style": { width: `${percent.value}%` }
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless,
				style: [unref(attrs).style, slotProps.value.attrs.style]
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, [
				"as",
				"renderless",
				"style"
			]);
		};
	}
});
//#endregion
//#region src/components/Progress/ProgressFill.vue
const _sfc_main$63 = /*@__PURE__*/ defineComponent({
	name: "ProgressFill",
	inheritAttrs: false,
	__name: "ProgressFill",
	props: {
		value: {},
		namespace: { default: "v0:progress:root" },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const root = useProgressRoot(__props.namespace);
		const ticket = /* @__PURE__ */ isUndefined(__props.value) ? root.register() : root.register({ value: toRef(() => __props.value) });
		onBeforeUnmount(() => {
			ticket.unregister();
		});
		/* v8 ignore next -- defensive: registered ticket.value always coalesces to number via toRef getter above */
		const current = toRef(() => toValue(ticket.value) ?? 0);
		const percent = toRef(() => root.fromValue(current.value));
		const slotProps = toRef(() => {
			const indeterminate = root.isIndeterminate.value;
			return {
				value: current.value,
				percent: percent.value,
				index: ticket.index,
				attrs: {
					"data-index": ticket.index,
					"data-state": indeterminate ? "indeterminate" : "determinate",
					"style": indeterminate ? void 0 : { width: `${percent.value}%` }
				}
			};
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless,
				style: [unref(attrs).style, slotProps.value.attrs.style]
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, [
				"as",
				"renderless",
				"style"
			]);
		};
	}
});
//#endregion
//#region src/components/Progress/ProgressLabel.vue
const _sfc_main$62 = /*@__PURE__*/ defineComponent({
	name: "ProgressLabel",
	inheritAttrs: false,
	__name: "ProgressLabel",
	props: {
		namespace: { default: "v0:progress:root" },
		as: { default: "label" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const root = useProgressRoot(__props.namespace);
		onMounted(() => {
			root.hasLabel.value = true;
		});
		onBeforeUnmount(() => {
			root.hasLabel.value = false;
		});
		const slotProps = toRef(() => ({
			total: root.total.value,
			percent: root.percent.value,
			isIndeterminate: root.isIndeterminate.value,
			attrs: { id: root.labelId }
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Progress/ProgressTrack.vue
const _sfc_main$61 = /*@__PURE__*/ defineComponent({
	name: "ProgressTrack",
	inheritAttrs: false,
	__name: "ProgressTrack",
	props: {
		namespace: { default: "v0:progress:root" },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const root = useProgressRoot(__props.namespace);
		const slotProps = toRef(() => ({ attrs: { "data-state": root.isIndeterminate.value ? "indeterminate" : "determinate" } }));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Progress/ProgressValue.vue
const _sfc_main$60 = /*@__PURE__*/ defineComponent({
	name: "ProgressValue",
	inheritAttrs: false,
	__name: "ProgressValue",
	props: {
		namespace: { default: "v0:progress:root" },
		as: { default: "span" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const root = useProgressRoot(__props.namespace);
		const display = toRef(() => `${Math.round(root.percent.value)}%`);
		const slotProps = toRef(() => ({
			total: root.total.value,
			percent: root.percent.value,
			isIndeterminate: root.isIndeterminate.value,
			attrs: {}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)), () => [createTextVNode(toDisplayString(display.value), 1)])]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Progress/index.ts
/**
* Progress component with sub-components for building progress bars and indicators.
*
* Provides a headless, accessible progress indicator with determinate,
* indeterminate, and buffer modes. Supports segmented tracks, custom
* value formatting, and full ARIA compliance. Uses `createProgress`
* internally for value management and exposes state via data attributes
* for CSS-only styling.
*
* @see https://0.vuetifyjs.com/components/progress
*
* @example
* ```vue
* <script setup lang="ts">
*   import { Progress } from '@vuetify/v0'
*   import { shallowRef } from 'vue'
*
*   const value = shallowRef(60)
* <\/script>
*
* <template>
*   <Progress.Root :model-value="value">
*     <Progress.Track>
*       <Progress.Fill />
*     </Progress.Track>
*     <Progress.Value />
*   </Progress.Root>
* </template>
* ```
*/
const Progress = {
	/**
	* Root component for progress indicators.
	*
	* Creates progress context, provides it to child components, and
	* bridges v-model. Manages value clamping, percentage calculation,
	* and ARIA attributes. Supports determinate, indeterminate, and
	* buffer modes. When `name` prop is provided, automatically renders
	* a hidden input for form submission.
	*
	* @see https://0.vuetifyjs.com/components/progress
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Progress } from '@vuetify/v0'
	*   import { shallowRef } from 'vue'
	*
	*   const value = shallowRef(60)
	* <\/script>
	*
	* <template>
	*   <Progress.Root :model-value="value" :max="100">
	*     <Progress.Track>
	*       <Progress.Fill />
	*     </Progress.Track>
	*   </Progress.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$65,
	/**
	* Track container for the progress bar.
	*
	* Renders the background track that contains the fill and buffer
	* elements. Supports segmented mode via the `segments` prop on Root.
	* Exposes segment data through its slot for custom rendering.
	*
	* @see https://0.vuetifyjs.com/components/progress#anatomy
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Progress } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Progress.Track>
	*     <Progress.Fill />
	*   </Progress.Track>
	* </template>
	* ```
	*/
	Track: _sfc_main$61,
	/**
	* Fill element representing the current progress value.
	*
	* Renders inside the Track and sizes itself to reflect the current
	* percentage. Applies `--v0-progress-fill` CSS variable for styling.
	* In indeterminate mode, omits inline sizing to allow CSS animations.
	*
	* @see https://0.vuetifyjs.com/components/progress#anatomy
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Progress } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Progress.Fill class="bg-blue-500 h-full transition-all" />
	* </template>
	* ```
	*/
	Fill: _sfc_main$63,
	/**
	* Buffer indicator for streaming or loading progress.
	*
	* Renders a secondary fill representing buffered content ahead of
	* the primary progress. Applies `--v0-progress-buffer` CSS variable
	* for styling. Useful for media players and file uploads.
	*
	* @see https://0.vuetifyjs.com/components/progress#buffer
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Progress } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Progress.Track>
	*     <Progress.Buffer class="bg-blue-200 h-full" />
	*     <Progress.Fill class="bg-blue-500 h-full" />
	*   </Progress.Track>
	* </template>
	* ```
	*/
	Buffer: _sfc_main$64,
	/**
	* Text display for the current progress value.
	*
	* Renders the formatted progress value as text. Uses the `format`
	* function from Root context if provided, otherwise displays the
	* raw percentage. Supports custom formatting via the default slot.
	*
	* @see https://0.vuetifyjs.com/components/progress#value-display
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Progress } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Progress.Value v-slot="{ percent }">
	*     {{ Math.round(percent) }}%
	*   </Progress.Value>
	* </template>
	* ```
	*/
	Value: _sfc_main$60,
	/**
	* Accessible label for the progress indicator.
	*
	* Associates a visible label with the progress Root via `aria-labelledby`.
	* Renders as a `<label>` element by default. Exposes progress state
	* through its slot for dynamic label content.
	*
	* @see https://0.vuetifyjs.com/components/progress#accessibility
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Progress } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Progress.Label>Loading...</Progress.Label>
	* </template>
	* ```
	*/
	Label: _sfc_main$62,
	/**
	* Hidden native input for form submission.
	*
	* Auto-rendered by Root when the `name` prop is provided. Submits
	* the current numeric progress value as part of the form. Can also
	* be used explicitly for custom form integration scenarios where
	* you need manual control over the hidden input placement.
	*
	* @see https://0.vuetifyjs.com/components/progress#form-integration
	* @internal
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Progress } from '@vuetify/v0'
	*   import { shallowRef } from 'vue'
	*
	*   const value = shallowRef(75)
	* <\/script>
	*
	* <template>
	*   <Progress.Root :model-value="value" name="upload-progress">
	*     <Progress.Track>
	*       <Progress.Fill />
	*     </Progress.Track>
	*   </Progress.Root>
	* </template>
	* ```
	*/
	HiddenInput: _sfc_main$66
};
//#endregion
//#region src/components/Radio/RadioGroup.vue
const [useRadioGroup, provideRadioGroup] = createContext();
const _sfc_main$59 = /*@__PURE__*/ defineComponent({
	name: "RadioGroup",
	__name: "RadioGroup",
	props: /*@__PURE__*/ mergeModels({
		namespace: { default: "v0:radio:group" },
		disabled: {
			type: Boolean,
			default: false
		},
		mandatory: {
			type: [Boolean, String],
			default: false
		},
		label: {},
		ariaLabelledby: {},
		ariaDescribedby: {},
		ariaRequired: { type: Boolean },
		name: {},
		activation: { default: "automatic" },
		as: { default: "div" },
		renderless: { type: Boolean }
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["update:model-value"], ["update:modelValue"]),
	setup(__props) {
		const model = useModel(__props, "modelValue");
		const single = createSingle({
			disabled: toRef(() => __props.disabled),
			mandatory: toRef(() => __props.mandatory),
			events: true
		});
		useProxyModel(single, model, { multiple: false });
		provideRadioGroup(__props.namespace, {
			...single,
			name: __props.name,
			activation: toRef(() => __props.activation)
		});
		const slotProps = toRef(() => ({
			isDisabled: toValue(single.disabled),
			isNoneSelected: single.selectedIds.size === 0,
			activation: __props.activation,
			attrs: {
				"role": "radiogroup",
				"aria-label": __props.label || void 0,
				"aria-labelledby": __props.ariaLabelledby || void 0,
				"aria-describedby": __props.ariaDescribedby || void 0,
				"aria-required": __props.ariaRequired || void 0
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Radio/RadioRoot.vue
const [useRadioRoot, provideRadioRoot] = createContext();
const _sfc_main$58 = /*@__PURE__*/ defineComponent({
	name: "RadioRoot",
	inheritAttrs: false,
	__name: "RadioRoot",
	props: {
		id: { default: () => /* @__PURE__ */ useId$1() },
		label: {},
		value: {},
		name: {},
		form: {},
		disabled: { default: false },
		namespace: { default: "v0:radio:root" },
		groupNamespace: { default: "v0:radio:group" },
		ariaLabelledby: {},
		ariaDescribedby: {},
		ariaInvalid: { type: Boolean },
		as: { default: "button" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const rootRef = useTemplateRef("root");
		const group = useRadioGroup(__props.groupNamespace);
		const name = __props.name ?? group.name;
		const el = toRef(() => /* @__PURE__ */ toElement(rootRef.value?.element) ?? void 0);
		const ticket = group.register({
			id: __props.id,
			value: __props.value,
			disabled: () => toValue(__props.disabled) ?? false,
			el
		});
		const isChecked = toRef(() => toValue(ticket.isSelected));
		const isDisabled = toRef(() => toValue(ticket.disabled) || toValue(group.disabled));
		const dataState = toRef(() => isChecked.value ? "checked" : "unchecked");
		const isTabbable = toRef(() => {
			if (toValue(group.disabled)) return false;
			if (toValue(ticket.disabled)) return false;
			if (toValue(ticket.isSelected)) return true;
			if (group.selectedIds.size > 0) return false;
			for (const item of group.values()) if (!toValue(item.disabled)) return item.id === __props.id;
			return false;
		});
		function select() {
			if (isDisabled.value) return;
			ticket.select();
		}
		function onClick() {
			select();
		}
		function onKeydown(e) {
			if (e.key === " " || e.key === "Enter") {
				e.preventDefault();
				select();
				return;
			}
			if (![
				"ArrowUp",
				"ArrowDown",
				"ArrowLeft",
				"ArrowRight"
			].includes(e.key)) return;
			e.preventDefault();
			const items = [...group.values()].filter((item) => !toValue(item.disabled));
			const currentIndex = items.findIndex((item) => item.id === __props.id);
			if (currentIndex === -1) return;
			let nextIndex;
			if (e.key === "ArrowUp" || e.key === "ArrowLeft") nextIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
			else nextIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
			const nextItem = items[nextIndex];
			if (!nextItem) return;
			if (group.activation.value === "automatic") nextItem.select();
			toValue(nextItem.el)?.focus();
		}
		onBeforeUnmount(() => {
			group.unregister(ticket.id);
		});
		const context = {
			id: __props.id,
			label: __props.label,
			value: __props.value,
			name,
			form: __props.form,
			isChecked,
			isDisabled,
			select
		};
		provideRadioRoot(__props.namespace, context);
		const slotProps = toRef(() => ({
			id: __props.id,
			label: __props.label,
			value: __props.value,
			isChecked: isChecked.value,
			isDisabled: isDisabled.value,
			select,
			attrs: {
				"type": __props.as === "button" ? "button" : void 0,
				"role": "radio",
				"aria-checked": isChecked.value,
				"aria-disabled": isDisabled.value,
				"aria-label": __props.label || void 0,
				"aria-labelledby": __props.ariaLabelledby || void 0,
				"aria-describedby": __props.ariaDescribedby || void 0,
				"aria-invalid": __props.ariaInvalid || void 0,
				"tabindex": isTabbable.value ? 0 : -1,
				"data-state": dataState.value,
				"data-disabled": isDisabled.value ? true : void 0,
				"data-radio-id": __props.id,
				"onClick": onClick,
				"onKeydown": onKeydown
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createVNode(unref(_sfc_main$192), mergeProps({ ref: "root" }, mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]), unref(name) ? (openBlock(), createBlock(_sfc_main$57, { key: 0 })) : createCommentVNode("v-if", true)], 64);
		};
	}
});
//#endregion
//#region src/components/Radio/RadioHiddenInput.vue
const _hoisted_1$4 = [
	"checked",
	"disabled",
	"form",
	"name",
	"value"
];
const visuallyHiddenStyle$3 = {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: "0",
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	border: "0"
};
const _sfc_main$57 = /*@__PURE__*/ defineComponent({
	name: "RadioHiddenInput",
	__name: "RadioHiddenInput",
	props: {
		namespace: { default: "v0:radio:root" },
		name: {},
		value: {},
		form: {}
	},
	setup(__props) {
		const root = useRadioRoot(__props.namespace);
		const name = toRef(() => __props.name ?? root.name);
		const form = toRef(() => __props.form ?? root.form);
		const value = toRef(() => {
			const v = __props.value ?? root.value ?? "on";
			if (/* @__PURE__ */ isObject(v)) return JSON.stringify(v);
			return String(v);
		});
		const isChecked = root.isChecked;
		const isDisabled = root.isDisabled;
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("input", {
				checked: unref(isChecked),
				disabled: unref(isDisabled),
				form: form.value,
				inert: "",
				name: name.value,
				style: visuallyHiddenStyle$3,
				tabindex: "-1",
				type: "radio",
				value: value.value
			}, null, 8, _hoisted_1$4);
		};
	}
});
//#endregion
//#region src/components/Radio/RadioIndicator.vue
const _sfc_main$56 = /*@__PURE__*/ defineComponent({
	name: "RadioIndicator",
	__name: "RadioIndicator",
	props: {
		namespace: { default: "v0:radio:root" },
		as: { default: "span" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const root = useRadioRoot(__props.namespace);
		const isChecked = toRef(() => toValue(root.isChecked));
		const dataState = toRef(() => isChecked.value ? "checked" : "unchecked");
		const slotProps = toRef(() => ({
			isChecked: isChecked.value,
			attrs: {
				"data-state": dataState.value,
				"style": { visibility: isChecked.value ? "visible" : "hidden" }
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Radio/index.ts
/**
* Radio component with sub-components for radio button controls.
*
* @see https://0.vuetifyjs.com/components/forms/radio
*
* @example
* ```vue
* <script lang="ts" setup>
*   import { Radio } from '@vuetify/v0'
*   import { ref } from 'vue'
*
*   const selected = ref<string>()
* <\/script>
*
* <template>
*   <Radio.Group v-model="selected">
*     <label>
*       <Radio.Root value="a">
*         <Radio.Indicator>●</Radio.Indicator>
*       </Radio.Root>
*       Option A
*     </label>
*     <label>
*       <Radio.Root value="b">
*         <Radio.Indicator>●</Radio.Indicator>
*       </Radio.Root>
*       Option B
*     </label>
*   </Radio.Group>
* </template>
* ```
*/
const Radio = {
	/**
	* Group component for managing radio buttons with single-selection.
	*
	* @see https://0.vuetifyjs.com/components/forms/radio
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Radio } from '@vuetify/v0'
	*   import { ref } from 'vue'
	*
	*   const selected = ref<string>()
	* <\/script>
	*
	* <template>
	*   <Radio.Group v-model="selected" mandatory>
	*     <Radio.Root value="a">
	*       <Radio.Indicator>●</Radio.Indicator>
	*       Option A
	*     </Radio.Root>
	*     <Radio.Root value="b">
	*       <Radio.Indicator>●</Radio.Indicator>
	*       Option B
	*     </Radio.Root>
	*   </Radio.Group>
	* </template>
	* ```
	*/
	Group: _sfc_main$59,
	/**
	* Hidden input component for form submission.
	*
	* Auto-rendered by Root when Group has a `name` prop.
	* Can also be used explicitly for custom form integration.
	*
	* @see https://0.vuetifyjs.com/components/forms/radio
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Radio } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Radio.Group v-model="selected">
	*     <Radio.Root value="yes">
	*       <Radio.Indicator>●</Radio.Indicator>
	*       <Radio.HiddenInput name="choice" />
	*     </Radio.Root>
	*   </Radio.Group>
	* </template>
	* ```
	*/
	HiddenInput: _sfc_main$57,
	/**
	* Visual indicator component for radio buttons.
	*
	* Renders as a span and only displays when checked.
	* Must be used within a Radio.Root component.
	*
	* @see https://0.vuetifyjs.com/components/forms/radio
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Radio } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Radio.Group v-model="selected">
	*     <Radio.Root value="a">
	*       <Radio.Indicator>
	*         <svg viewBox="0 0 24 24">
	*           <circle cx="12" cy="12" r="6" />
	*         </svg>
	*       </Radio.Indicator>
	*     </Radio.Root>
	*   </Radio.Group>
	* </template>
	* ```
	*/
	Indicator: _sfc_main$56,
	/**
	* Root component for individual radio buttons.
	*
	* Must be used within a Radio.Group. Renders as a button with proper
	* ARIA attributes and handles click/keyboard interactions. When the
	* group has a `name` prop, automatically renders a hidden input for
	* form submission.
	*
	* @see https://0.vuetifyjs.com/components/forms/radio
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Radio } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Radio.Group v-model="selected">
	*     <Radio.Root value="option1">
	*       <Radio.Indicator>●</Radio.Indicator>
	*       Option 1
	*     </Radio.Root>
	*   </Radio.Group>
	* </template>
	* ```
	*/
	Root: _sfc_main$58
};
//#endregion
//#region src/components/Rating/RatingRoot.vue
const [useRatingRoot, provideRatingRoot] = createContext();
const _sfc_main$55 = /*@__PURE__*/ defineComponent({
	name: "RatingRoot",
	inheritAttrs: false,
	__name: "RatingRoot",
	props: /*@__PURE__*/ mergeModels({
		modelValue: {},
		size: { default: 5 },
		half: {
			type: Boolean,
			default: false
		},
		disabled: { default: false },
		readonly: { default: false },
		ariaLabel: {},
		ariaLabelledby: {},
		name: {},
		namespace: { default: "v0:rating:root" },
		as: { default: "div" },
		renderless: { type: Boolean }
	}, {
		"modelValue": { default: 0 },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const attrs = useAttrs();
		const model = useModel(__props, "modelValue");
		const rating = createRating({
			value: model,
			size: toRef(() => __props.size),
			half: toRef(() => __props.half)
		});
		const hoveredValue = shallowRef(null);
		const isHovering = toRef(() => !/* @__PURE__ */ isNull(hoveredValue.value));
		const isDisabled = toRef(() => toValue(__props.disabled));
		const isReadonly = toRef(() => toValue(__props.readonly));
		const displayValue = toRef(() => isHovering.value && !/* @__PURE__ */ isNull(hoveredValue.value) ? hoveredValue.value : rating.value.value);
		function onKeydown(e) {
			if (isDisabled.value || isReadonly.value) return;
			const action = {
				ArrowRight: () => rating.next(),
				ArrowUp: () => rating.next(),
				ArrowLeft: () => rating.prev(),
				ArrowDown: () => rating.prev(),
				Home: () => rating.first(),
				End: () => rating.last()
			}[e.key];
			if (!action) return;
			e.preventDefault();
			action();
		}
		function onPointerleave() {
			hoveredValue.value = null;
		}
		const context = {
			...rating,
			name: __props.name,
			hoveredValue,
			isHovering,
			isDisabled,
			isReadonly
		};
		const locale = useLocale();
		provideRatingRoot(__props.namespace, context);
		const slotProps = toRef(() => ({
			value: displayValue.value,
			items: rating.items.value,
			isHovering: isHovering.value,
			isDisabled: isDisabled.value,
			isReadonly: isReadonly.value,
			attrs: {
				"role": "slider",
				"tabindex": isDisabled.value ? -1 : 0,
				"aria-valuenow": rating.value.value,
				"aria-valuemin": 0,
				"aria-valuemax": rating.size,
				"aria-valuetext": locale.ti("Rating.valueText", {
					value: rating.value.value,
					size: rating.size
				}) ?? `${rating.value.value} of ${rating.size} stars`,
				"aria-label": __props.ariaLabelledby ? void 0 : __props.ariaLabel || (locale.ti("Rating.label") ?? "Rating"),
				"aria-labelledby": __props.ariaLabelledby || void 0,
				"aria-disabled": isDisabled.value,
				"aria-readonly": isReadonly.value ? true : void 0,
				"data-disabled": isDisabled.value ? true : void 0,
				"data-readonly": isReadonly.value ? true : void 0,
				"data-hovering": isHovering.value ? true : void 0,
				"onKeydown": onKeydown,
				"onPointerleave": onPointerleave
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createVNode(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]), __props.name ? (openBlock(), createBlock(_sfc_main$54, { key: 0 })) : createCommentVNode("v-if", true)], 64);
		};
	}
});
//#endregion
//#region src/components/Rating/RatingHiddenInput.vue
const _hoisted_1$3 = [
	"disabled",
	"name",
	"value"
];
const _sfc_main$54 = /*@__PURE__*/ defineComponent({
	name: "RatingHiddenInput",
	__name: "RatingHiddenInput",
	props: { namespace: { default: "v0:rating:root" } },
	setup(__props) {
		const root = useRatingRoot(__props.namespace);
		const value = toRef(() => root.value.value);
		const isDisabled = toRef(() => root.isDisabled.value);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("input", {
				disabled: isDisabled.value,
				name: unref(root).name,
				tabindex: "-1",
				type: "hidden",
				value: value.value
			}, null, 8, _hoisted_1$3);
		};
	}
});
//#endregion
//#region src/components/Rating/RatingItem.vue
const _sfc_main$53 = /*@__PURE__*/ defineComponent({
	name: "RatingItem",
	inheritAttrs: false,
	__name: "RatingItem",
	props: {
		index: {},
		namespace: { default: "v0:rating:root" },
		as: { default: "span" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const root = useRatingRoot(__props.namespace);
		const displayValue = toRef(() => {
			const hovered = root.hoveredValue.value;
			if (root.isHovering.value && !/* @__PURE__ */ isNull(hovered)) return hovered;
			return root.value.value;
		});
		function getState() {
			const current = displayValue.value;
			if (__props.index <= Math.floor(current)) return "full";
			if (__props.index === Math.ceil(current) && current !== Math.floor(current)) return "half";
			return "empty";
		}
		const state = toRef(getState);
		const isHighlighted = toRef(() => __props.index <= displayValue.value);
		function onPointermove(e) {
			if (root.isDisabled.value || root.isReadonly.value) return;
			if (root.half) {
				const rect = e.currentTarget.getBoundingClientRect();
				const mid = rect.left + rect.width / 2;
				root.hoveredValue.value = e.clientX < mid ? __props.index - .5 : __props.index;
			} else root.hoveredValue.value = __props.index;
		}
		function onClick() {
			if (root.isDisabled.value || root.isReadonly.value) return;
			root.select(root.hoveredValue.value ?? __props.index);
		}
		const slotProps = toRef(() => ({
			state: state.value,
			isHighlighted: isHighlighted.value,
			isDisabled: root.isDisabled.value,
			isReadonly: root.isReadonly.value,
			attrs: {
				"data-state": state.value,
				"data-highlighted": isHighlighted.value ? true : void 0,
				"data-disabled": root.isDisabled.value ? true : void 0,
				"data-readonly": root.isReadonly.value ? true : void 0,
				"onPointermove": onPointermove,
				"onClick": onClick
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Rating/index.ts
/**
* Rating component with sub-components for building star/icon rating controls.
*
* Provides a headless, accessible rating input with hover preview,
* half-star support, keyboard navigation, and full ARIA compliance.
* Uses `createRating` internally for value management and exposes
* state via data attributes for CSS-only styling.
*
* @see https://0.vuetifyjs.com/components/forms/rating
*
* @example
* ```vue
* <script setup lang="ts">
*   import { Rating } from '@vuetify/v0'
*   import { shallowRef } from 'vue'
*
*   const rating = shallowRef(0)
* <\/script>
*
* <template>
*   <Rating.Root v-model="rating">
*     <Rating.Item
*       v-for="i in 5"
*       :key="i"
*       :index="i"
*       v-slot="{ state }"
*     >
*       {{ state === 'full' ? '★' : '☆' }}
*     </Rating.Item>
*   </Rating.Root>
* </template>
* ```
*/
const Rating = {
	/**
	* Root component for ratings.
	*
	* Creates rating context, provides it to child components, and
	* bridges v-model. Handles hover tracking, keyboard navigation,
	* and ARIA attributes. When `name` prop is provided, automatically
	* renders a hidden input for form submission. Supports both whole
	* and half-star modes via the `half` prop.
	*
	* @see https://0.vuetifyjs.com/components/forms/rating
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Rating } from '@vuetify/v0'
	*   import { shallowRef } from 'vue'
	*
	*   const rating = shallowRef(0)
	* <\/script>
	*
	* <template>
	*   <Rating.Root v-model="rating" :size="5">
	*     <Rating.Item
	*       v-for="i in 5"
	*       :key="i"
	*       :index="i"
	*       v-slot="{ state }"
	*     >
	*       {{ state === 'full' ? '★' : '☆' }}
	*     </Rating.Item>
	*   </Rating.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$55,
	/**
	* Individual rating item (star/icon).
	*
	* Consumes Rating context and computes its visual state from the
	* current or hovered value. Exposes state via data attributes
	* (`data-state`, `data-highlighted`) for CSS-only styling. Handles
	* pointer events for hover preview and click to commit. When half
	* mode is active, detects left/right half of the element for
	* half-star hover precision.
	*
	* @see https://0.vuetifyjs.com/components/forms/rating#anatomy
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Rating } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Rating.Item
	*     :index="1"
	*     class="[&[data-state=full]]:text-amber-500 [&[data-state=empty]]:text-gray-300"
	*     v-slot="{ state }"
	*   >
	*     {{ state === 'full' ? '★' : state === 'half' ? '⯨' : '☆' }}
	*   </Rating.Item>
	* </template>
	* ```
	*/
	Item: _sfc_main$53,
	/**
	* Hidden native input for form submission.
	*
	* Auto-rendered by Root when the `name` prop is provided. Submits
	* the current numeric rating value as part of the form. Can also
	* be used explicitly for custom form integration scenarios where
	* you need manual control over the hidden input placement.
	*
	* @see https://0.vuetifyjs.com/components/forms/rating
	* @internal
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Rating } from '@vuetify/v0'
	*   import { shallowRef } from 'vue'
	*
	*   const rating = shallowRef(3)
	* <\/script>
	*
	* <template>
	*   <Rating.Root v-model="rating" name="review-rating">
	*     <Rating.Item
	*       v-for="i in 5"
	*       :key="i"
	*       :index="i"
	*       v-slot="{ state }"
	*     >
	*       {{ state === 'full' ? '★' : '☆' }}
	*     </Rating.Item>
	*   </Rating.Root>
	* </template>
	* ```
	*/
	HiddenInput: _sfc_main$54
};
//#endregion
//#region src/components/Scrim/Scrim.vue
const _sfc_main$52 = /*@__PURE__*/ defineComponent({
	name: "Scrim",
	inheritAttrs: false,
	__name: "Scrim",
	props: {
		transition: { default: "fade" },
		teleport: {
			type: Boolean,
			default: true
		},
		teleportTo: { default: "body" },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const stack = useStack();
		const tickets = computed(() => Array.from(stack.selectedItems.value).filter((ticket) => ticket.scrim.value !== false));
		function onDismiss(ticket) {
			if (!ticket.blocking.value) ticket.dismiss();
		}
		function getSlotProps(ticket) {
			const zIndex = ticket.zIndex.value - 1;
			return {
				ticket,
				zIndex,
				isBlocking: ticket.blocking.value,
				dismiss: () => onDismiss(ticket),
				attrs: {
					"aria-hidden": "true",
					"style": { zIndex },
					"onClick": () => onDismiss(ticket)
				}
			};
		}
		return (_ctx, _cache) => {
			return __props.teleport ? (openBlock(), createBlock(Teleport, {
				key: 0,
				to: __props.teleportTo
			}, [createVNode(TransitionGroup, { name: __props.transition }, {
				default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(tickets.value, (ticket) => {
					return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
						key: ticket.id,
						as: __props.as,
						renderless: __props.renderless
					}, { ref_for: true }, mergeProps(unref(attrs), getSlotProps(ticket).attrs)), {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default", mergeProps({ ref_for: true }, getSlotProps(ticket)))]),
						_: 2
					}, 1040, ["as", "renderless"]);
				}), 128))]),
				_: 3
			}, 8, ["name"])], 8, ["to"])) : (openBlock(), createBlock(TransitionGroup, {
				key: 1,
				name: __props.transition
			}, {
				default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(tickets.value, (ticket) => {
					return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
						key: ticket.id,
						as: __props.as,
						renderless: __props.renderless
					}, { ref_for: true }, mergeProps(unref(attrs), getSlotProps(ticket).attrs)), {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default", mergeProps({ ref_for: true }, getSlotProps(ticket)))]),
						_: 2
					}, 1040, ["as", "renderless"]);
				}), 128))]),
				_: 3
			}, 8, ["name"]));
		};
	}
});
//#endregion
//#region src/components/Select/SelectHiddenInput.vue
const _hoisted_1$2 = [
	"disabled",
	"form",
	"name",
	"value"
];
const visuallyHiddenStyle$2 = {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: "0",
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	border: "0"
};
const _sfc_main$51 = /*@__PURE__*/ defineComponent({
	name: "SelectHiddenInput",
	__name: "SelectHiddenInput",
	props: { namespace: { default: "v0:select" } },
	setup(__props) {
		const context = useSelectContext(__props.namespace);
		const values = toRef(() => {
			return Array.from(context.selection.selectedValues.value).map((v) => {
				if (/* @__PURE__ */ isNullOrUndefined(v)) return "";
				if (/* @__PURE__ */ isObject(v)) return JSON.stringify(v);
				return String(v);
			});
		});
		const isDisabled = toRef(() => toValue(context.disabled));
		return (_ctx, _cache) => {
			return openBlock(true), createElementBlock(Fragment, null, renderList(values.value, (val, index) => {
				return openBlock(), createElementBlock("input", {
					key: index,
					disabled: isDisabled.value,
					form: unref(context).form,
					inert: "",
					name: unref(context).name,
					style: visuallyHiddenStyle$2,
					tabindex: "-1",
					type: "hidden",
					value: val
				}, null, 8, _hoisted_1$2);
			}), 128);
		};
	}
});
//#endregion
//#region src/components/Select/SelectRoot.vue
const [useSelectContext, provideSelectContext] = createContext();
const _sfc_main$50 = /*@__PURE__*/ defineComponent({
	name: "SelectRoot",
	__name: "SelectRoot",
	props: /*@__PURE__*/ mergeModels({
		namespace: { default: "v0:select" },
		id: {},
		name: {},
		form: {},
		disabled: {
			type: Boolean,
			default: false
		},
		multiple: {
			type: Boolean,
			default: false
		},
		mandatory: {
			type: [Boolean, String],
			default: false
		},
		adapter: {},
		as: { default: null },
		renderless: { type: Boolean }
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["update:model-value"], ["update:modelValue"]),
	setup(__props) {
		const model = useModel(__props, "modelValue");
		const id = __props.id ?? /* @__PURE__ */ useId$1();
		const listboxId = `${id}-listbox`;
		const activatorId = `${id}-activator`;
		const selection = createSelection({
			multiple: toRef(() => __props.multiple),
			mandatory: toRef(() => __props.mandatory),
			disabled: toRef(() => __props.disabled),
			events: true
		});
		useProxyModel(selection, model, { multiple: toRef(() => __props.multiple) });
		const selectedId = toRef(() => selection.selectedIds.values().next().value);
		const popover = usePopover({
			id,
			adapter: __props.adapter
		});
		const isOpen = popover.isOpen;
		const activatorEl = shallowRef(null);
		popover.attachAnchor(activatorEl);
		const virtualFocus = useVirtualFocus(() => selection.values().map((ticket) => ({
			id: ticket.id,
			el: () => IN_BROWSER ? document.querySelector(`#${CSS.escape(`${id}-option-${ticket.id}`)}`) : null,
			disabled: ticket.disabled
		})), {
			control: activatorEl,
			target: () => null,
			orientation: "vertical"
		});
		watch(isOpen, (open) => {
			if (!open) {
				virtualFocus.clear();
				return;
			}
			nextTick(() => {
				const selected = selectedId.value;
				if (!/* @__PURE__ */ isUndefined(selected)) virtualFocus.highlight(String(selected));
			});
		}, { flush: "post" });
		function open() {
			if (!isOpen.value && !toValue(__props.disabled)) isOpen.value = true;
		}
		function close() {
			isOpen.value = false;
		}
		function toggle() {
			if (isOpen.value) close();
			else open();
		}
		function select(itemId) {
			if (__props.multiple) selection.toggle(itemId);
			else {
				selection.select(itemId);
				close();
			}
		}
		provideSelectContext(__props.namespace, {
			isOpen,
			disabled: toRef(() => __props.disabled),
			multiple: __props.multiple,
			id,
			listboxId,
			activatorId,
			name: __props.name,
			form: __props.form,
			activatorEl,
			selection,
			virtualFocus,
			popover,
			open,
			close,
			toggle,
			select,
			modelValue: model
		});
		const slotProps = toRef(() => ({
			id,
			isOpen: isOpen.value,
			isDisabled: toValue(__props.disabled),
			open,
			close,
			toggle
		}));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createVNode(unref(_sfc_main$192), {
				as: __props.as,
				renderless: ""
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 8, ["as"]), __props.name ? (openBlock(), createBlock(_sfc_main$51, { key: 0 })) : createCommentVNode("v-if", true)], 64);
		};
	}
});
//#endregion
//#region src/components/Select/SelectActivator.vue
const _sfc_main$49 = /*@__PURE__*/ defineComponent({
	name: "SelectActivator",
	__name: "SelectActivator",
	props: {
		namespace: { default: "v0:select" },
		label: {},
		as: { default: "button" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useSelectContext(__props.namespace);
		const activatorEl = useTemplateRef("activator");
		watchEffect(() => {
			context.activatorEl.value = activatorEl.value?.element ?? null;
		});
		function onClick() {
			context.toggle();
		}
		function onKeydown(e) {
			if (context.isOpen.value) switch (e.key) {
				case " ":
				case "Enter":
					e.preventDefault();
					if (!/* @__PURE__ */ isUndefined(context.virtualFocus.highlightedId.value)) context.select(context.virtualFocus.highlightedId.value);
					break;
				case "Escape":
					e.preventDefault();
					context.close();
					break;
				case "Tab":
					context.close();
					break;
				case "ArrowDown":
				case "ArrowUp":
				case "Home":
				case "End": context.virtualFocus.onKeydown(e);
			}
			else switch (e.key) {
				case " ":
				case "Enter":
				case "ArrowDown":
				case "ArrowUp":
					e.preventDefault();
					context.open();
			}
		}
		const slotProps = toRef(() => ({
			isOpen: context.isOpen.value,
			attrs: {
				"id": context.activatorId,
				"role": "combobox",
				"type": __props.as === "button" ? "button" : void 0,
				"aria-expanded": context.isOpen.value,
				"aria-haspopup": "listbox",
				"aria-controls": context.listboxId,
				"aria-label": __props.label || void 0,
				"aria-disabled": toValue(context.disabled),
				"disabled": toValue(context.disabled) || void 0,
				"tabindex": __props.as === "button" ? void 0 : 0,
				"data-disabled": toValue(context.disabled) || void 0,
				"data-open": context.isOpen.value || void 0,
				"style": context.popover.anchorStyles.value,
				onClick,
				onKeydown
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				ref: "activator",
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Select/SelectContent.vue
const _sfc_main$48 = /*@__PURE__*/ defineComponent({
	name: "SelectContent",
	__name: "SelectContent",
	props: {
		namespace: { default: "v0:select" },
		eager: {
			type: Boolean,
			default: false
		},
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useSelectContext(__props.namespace);
		const content = useTemplateRef("content");
		context.popover.attach(() => content.value?.element);
		const { hasContent } = useLazy(context.isOpen, { eager: __props.eager });
		const slotProps = toRef(() => ({
			isOpen: context.isOpen.value,
			attrs: {
				...context.popover.contentAttrs.value,
				"id": context.listboxId,
				"role": "listbox",
				"aria-labelledby": context.activatorId,
				"aria-multiselectable": context.multiple || void 0,
				"tabindex": -1,
				"style": context.popover.contentStyles.value
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				ref_key: "content",
				ref: content,
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [unref(hasContent) ? renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)), void 0, void 0, 0) : createCommentVNode("v-if", true)]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Select/SelectCue.vue
const _sfc_main$47 = /*@__PURE__*/ defineComponent({
	name: "SelectCue",
	__name: "SelectCue",
	props: {
		namespace: { default: "v0:select" },
		as: { default: "span" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useSelectContext(__props.namespace);
		const slotProps = toRef(() => ({
			isOpen: context.isOpen.value,
			attrs: {
				"aria-hidden": true,
				"data-state": context.isOpen.value ? "open" : "closed"
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Select/SelectItem.vue
const _sfc_main$46 = /*@__PURE__*/ defineComponent({
	name: "SelectItem",
	__name: "SelectItem",
	props: {
		namespace: { default: "v0:select" },
		id: {},
		value: {},
		disabled: {},
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useSelectContext(__props.namespace);
		const ticket = context.selection.register({
			id: __props.id,
			value: __props.value,
			disabled: () => toValue(__props.disabled) ?? false
		});
		const elementId = `${context.id}-option-${ticket.id}`;
		const isSelected = toRef(() => toValue(ticket.isSelected));
		const isDisabled = toRef(() => toValue(ticket.disabled) || toValue(context.disabled));
		const isHighlighted = toRef(() => context.virtualFocus.highlightedId.value === ticket.id);
		function onClick() {
			if (!toValue(isDisabled)) context.select(ticket.id);
		}
		onBeforeUnmount(() => {
			context.selection.unregister(ticket.id);
		});
		const slotProps = toRef(() => ({
			value: __props.value,
			isSelected: isSelected.value,
			isHighlighted: isHighlighted.value,
			isDisabled: isDisabled.value,
			select: () => context.select(ticket.id),
			attrs: {
				"id": elementId,
				"role": "option",
				"aria-selected": isSelected.value,
				"aria-disabled": isDisabled.value,
				"data-selected": isSelected.value || void 0,
				"data-highlighted": isHighlighted.value ? "" : void 0,
				"data-disabled": isDisabled.value || void 0,
				"data-id": String(ticket.id),
				"onClick": onClick
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Select/SelectPlaceholder.vue
const _sfc_main$45 = /*@__PURE__*/ defineComponent({
	name: "SelectPlaceholder",
	__name: "SelectPlaceholder",
	props: {
		namespace: { default: "v0:select" },
		as: { default: "span" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useSelectContext(__props.namespace);
		const hasValue = toRef(() => context.selection.selectedIds.size > 0 || !/* @__PURE__ */ isNullOrUndefined(context.modelValue.value));
		return (_ctx, _cache) => {
			return !hasValue.value ? (openBlock(), createBlock(unref(_sfc_main$192), {
				key: 0,
				as: __props.as,
				renderless: __props.renderless
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { hasValue: hasValue.value })]),
				_: 3
			}, 8, ["as", "renderless"])) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region src/components/Select/SelectValue.vue
const _sfc_main$44 = /*@__PURE__*/ defineComponent({
	name: "SelectValue",
	__name: "SelectValue",
	props: {
		namespace: { default: "v0:select" },
		as: { default: "span" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useSelectContext(__props.namespace);
		const items = toRef(() => Array.from(context.selection.selectedItems.value));
		const values = toRef(() => Array.from(context.selection.selectedValues.value));
		const hasSelected = toRef(() => context.selection.selectedIds.size > 0);
		const pendingValues = toRef(() => {
			const mv = context.modelValue.value;
			if (/* @__PURE__ */ isNullOrUndefined(mv)) return [];
			return /* @__PURE__ */ isArray(mv) ? mv : [mv];
		});
		const hasValue = toRef(() => hasSelected.value || pendingValues.value.length > 0);
		const slotProps = toRef(() => {
			const resolved = hasSelected.value;
			return {
				selectedItem: resolved ? items.value[0] : void 0,
				selectedItems: resolved ? items.value : [],
				selectedValue: resolved ? values.value[0] : pendingValues.value[0],
				selectedValues: resolved ? values.value : pendingValues.value,
				hasValue: hasValue.value,
				attrs: {}
			};
		});
		return (_ctx, _cache) => {
			return hasValue.value ? (openBlock(), createBlock(unref(_sfc_main$192), {
				key: 0,
				as: __props.as,
				renderless: __props.renderless
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)), () => [createTextVNode(toDisplayString(values.value[0]), 1)])]),
				_: 3
			}, 8, ["as", "renderless"])) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region src/components/Select/index.ts
/**
* Select component with sub-components for building dropdown selects.
*
* @see https://0.vuetifyjs.com/components/forms/select
*
* @example
* ```vue
* <script lang="ts" setup>
*   import { Select } from '@vuetify/v0'
*   import { ref } from 'vue'
*
*   const selected = ref()
*   const items = [
*     { id: 'apple', label: 'Apple' },
*     { id: 'banana', label: 'Banana' },
*     { id: 'cherry', label: 'Cherry' },
*   ]
* <\/script>
*
* <template>
*   <Select.Root v-model="selected">
*     <Select.Activator>
*       <Select.Value v-slot="{ selectedValue }">
*         {{ selectedValue }}
*       </Select.Value>
*       <Select.Placeholder>Pick a fruit</Select.Placeholder>
*     </Select.Activator>
*
*     <Select.Content>
*       <Select.Item
*         v-for="item in items"
*         :key="item.id"
*         :id="item.id"
*         :value="item.label"
*       >
*         {{ item.label }}
*       </Select.Item>
*     </Select.Content>
*   </Select.Root>
* </template>
* ```
*/
const Select = {
	/**
	* Root component for selects. Creates selection, virtual focus, and popover contexts.
	*
	* @see https://0.vuetifyjs.com/components/forms/select
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Select } from '@vuetify/v0'
	*   import { ref } from 'vue'
	*
	*   const selected = ref()
	* <\/script>
	*
	* <template>
	*   <Select.Root v-model="selected">
	*     <Select.Activator>
	*       <Select.Value />
	*       <Select.Placeholder>Choose...</Select.Placeholder>
	*     </Select.Activator>
	*     <Select.Content>
	*       <Select.Item id="a" value="A">Option A</Select.Item>
	*     </Select.Content>
	*   </Select.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$50,
	/**
	* Activator button that opens the select dropdown.
	*
	* @see https://0.vuetifyjs.com/components/forms/select
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Select } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Select.Activator>
	*     Click to open
	*   </Select.Activator>
	* </template>
	* ```
	*/
	Activator: _sfc_main$49,
	/**
	* Display component for the selected value. Slot-based — consumers provide rendering.
	*
	* @see https://0.vuetifyjs.com/components/forms/select
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Select } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Select.Value v-slot="{ selectedValue }">
	*     {{ selectedValue }}
	*   </Select.Value>
	*   <Select.Placeholder>Pick one</Select.Placeholder>
	* </template>
	* ```
	*/
	Value: _sfc_main$44,
	/**
	* Dropdown content container using native popover API with CSS anchor positioning.
	*
	* @see https://0.vuetifyjs.com/components/forms/select
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Select } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Select.Content>
	*     <Select.Item id="a" value="A">Option A</Select.Item>
	*     <Select.Item id="b" value="B">Option B</Select.Item>
	*   </Select.Content>
	* </template>
	* ```
	*/
	Content: _sfc_main$48,
	/**
	* Visual cue for open/close state. Exposes `data-state="open|closed"` for CSS-driven styling.
	*
	* @see https://0.vuetifyjs.com/components/forms/select
	*
	* @example
	* ```vue
	* <Select.Activator>
	*   <Select.Value />
	*   <Select.Placeholder>Choose...</Select.Placeholder>
	*   <Select.Cue v-slot="{ isOpen }">
	*     {{ isOpen ? '▲' : '▼' }}
	*   </Select.Cue>
	* </Select.Activator>
	* ```
	*/
	Cue: _sfc_main$47,
	/**
	* Option item within the select dropdown. Registers with selection and virtual focus.
	*
	* @see https://0.vuetifyjs.com/components/forms/select
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Select } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Select.Item id="apple" value="Apple" v-slot="{ isSelected }">
	*     Apple {{ isSelected ? '✓' : '' }}
	*   </Select.Item>
	* </template>
	* ```
	*/
	Item: _sfc_main$46,
	/**
	* Placeholder text shown when no value is selected. Automatically hidden when a selection exists.
	*
	* @see https://0.vuetifyjs.com/components/forms/select
	*
	* @example
	* ```vue
	* <Select.Activator>
	*   <Select.Value />
	*   <Select.Placeholder>Choose an option…</Select.Placeholder>
	*   <Select.Cue />
	* </Select.Activator>
	* ```
	*/
	Placeholder: _sfc_main$45
};
//#endregion
//#region src/components/Selection/SelectionRoot.vue
const [useSelectionRoot, provideSelectionRoot] = createContext();
const _sfc_main$43 = /*@__PURE__*/ defineComponent({
	name: "SelectionRoot",
	__name: "SelectionRoot",
	props: /*@__PURE__*/ mergeModels({
		namespace: { default: "v0:selection" },
		disabled: {
			type: Boolean,
			default: false
		},
		enroll: {
			type: Boolean,
			default: false
		},
		mandatory: {
			type: [Boolean, String],
			default: false
		},
		multiple: {
			type: Boolean,
			default: false
		}
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["update:model-value"], ["update:modelValue"]),
	setup(__props) {
		const model = useModel(__props, "modelValue");
		const selection = createSelection({
			disabled: toRef(() => __props.disabled),
			enroll: toRef(() => __props.enroll),
			mandatory: toRef(() => __props.mandatory),
			multiple: toRef(() => __props.multiple),
			events: true
		});
		useProxyModel(selection, model, { multiple: toRef(() => __props.multiple) });
		provideSelectionRoot(__props.namespace, selection);
		const slotProps = toRef(() => ({
			isDisabled: toValue(selection.disabled),
			multiple: __props.multiple,
			select: selection.select,
			unselect: selection.unselect,
			toggle: selection.toggle,
			attrs: { "aria-multiselectable": __props.multiple }
		}));
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)));
		};
	}
});
//#endregion
//#region src/components/Selection/SelectionItem.vue
const _sfc_main$42 = /*@__PURE__*/ defineComponent({
	name: "SelectionItem",
	__name: "SelectionItem",
	props: {
		id: {},
		label: {},
		value: {},
		disabled: {},
		namespace: { default: "v0:selection" }
	},
	setup(__props) {
		const selection = useSelectionRoot(__props.namespace);
		const ticket = selection.register({
			id: __props.id,
			value: __props.value,
			disabled: () => toValue(__props.disabled) ?? false
		});
		const isDisabled = toRef(() => toValue(ticket.disabled) || toValue(selection.disabled));
		function onClick() {
			if (toValue(isDisabled)) return;
			ticket.toggle();
		}
		function onKeydown(e) {
			if (e.key !== "Enter" && e.key !== " ") return;
			e.preventDefault();
			onClick();
		}
		onBeforeUnmount(() => {
			selection.unregister(ticket.id);
		});
		const slotProps = toRef(() => ({
			id: String(ticket.id),
			label: __props.label,
			value: __props.value,
			isSelected: toValue(ticket.isSelected),
			isDisabled: toValue(isDisabled),
			select: ticket.select,
			unselect: ticket.unselect,
			toggle: ticket.toggle,
			attrs: {
				"role": "option",
				"tabindex": toValue(isDisabled) ? -1 : 0,
				"aria-selected": toValue(ticket.isSelected),
				"aria-disabled": toValue(isDisabled),
				"data-selected": toValue(ticket.isSelected) || void 0,
				"data-disabled": toValue(isDisabled) || void 0,
				"onClick": onClick,
				"onKeydown": onKeydown
			}
		}));
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)));
		};
	}
});
//#endregion
//#region src/components/Selection/index.ts
/**
* Selection component with sub-components for managing item selection state.
*
* @see https://0.vuetifyjs.com/components/providers/selection
*/
const Selection = {
	/**
	* Root component for selection contexts.
	*
	* @see https://0.vuetifyjs.com/components/providers/selection
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Selection } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Selection.Root v-model="selected" multiple>
	*     <Selection.Item value="a" v-slot="{ attrs }">
	*       <button v-bind="attrs">Option A</button>
	*     </Selection.Item>
	*
	*     <Selection.Item value="b" v-slot="{ attrs }">
	*       <button v-bind="attrs">Option B</button>
	*     </Selection.Item>
	*   </Selection.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$43,
	/**
	* Item component for selection contexts.
	*
	* @see https://0.vuetifyjs.com/components/providers/selection
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Selection } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Selection.Item value="a" v-slot="{ attrs }">
	*     <button v-bind="attrs">Option A</button>
	*   </Selection.Item>
	* </template>
	* ```
	*/
	Item: _sfc_main$42
};
//#endregion
//#region src/components/Single/SingleRoot.vue
const [useSingleRoot, provideSingleRoot] = createContext();
const _sfc_main$41 = /*@__PURE__*/ defineComponent({
	name: "SingleRoot",
	__name: "SingleRoot",
	props: /*@__PURE__*/ mergeModels({
		namespace: { default: "v0:single" },
		disabled: {
			type: Boolean,
			default: false
		},
		enroll: {
			type: Boolean,
			default: false
		},
		mandatory: {
			type: [Boolean, String],
			default: false
		}
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const model = useModel(__props, "modelValue");
		const single = createSingle({
			disabled: toRef(() => __props.disabled),
			enroll: toRef(() => __props.enroll),
			mandatory: toRef(() => __props.mandatory),
			events: true
		});
		useProxyModel(single, model, { multiple: false });
		provideSingleRoot(__props.namespace, single);
		const slotProps = toRef(() => ({
			isDisabled: toValue(single.disabled),
			select: single.select,
			unselect: single.unselect,
			toggle: single.toggle,
			attrs: { "aria-multiselectable": false }
		}));
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)));
		};
	}
});
//#endregion
//#region src/components/Single/SingleItem.vue
const _sfc_main$40 = /*@__PURE__*/ defineComponent({
	name: "SingleItem",
	__name: "SingleItem",
	props: {
		id: {},
		label: {},
		value: {},
		disabled: {},
		namespace: { default: "v0:single" }
	},
	setup(__props) {
		const single = useSingleRoot(__props.namespace);
		const ticket = single.register({
			id: __props.id,
			value: __props.value,
			disabled: () => toValue(__props.disabled) ?? false
		});
		const isDisabled = toRef(() => toValue(ticket.disabled) || toValue(single.disabled));
		function onClick() {
			if (toValue(isDisabled)) return;
			ticket.toggle();
		}
		function onKeydown(e) {
			if (e.key !== "Enter" && e.key !== " ") return;
			e.preventDefault();
			onClick();
		}
		onBeforeUnmount(() => {
			single.unregister(ticket.id);
		});
		const slotProps = toRef(() => ({
			id: String(ticket.id),
			label: __props.label,
			value: __props.value,
			isSelected: toValue(ticket.isSelected),
			isDisabled: toValue(isDisabled),
			select: ticket.select,
			unselect: ticket.unselect,
			toggle: ticket.toggle,
			attrs: {
				"role": "option",
				"tabindex": toValue(isDisabled) ? -1 : 0,
				"aria-selected": toValue(ticket.isSelected),
				"aria-disabled": toValue(isDisabled),
				"data-selected": toValue(ticket.isSelected) || void 0,
				"data-disabled": toValue(isDisabled) || void 0,
				"onClick": onClick,
				"onKeydown": onKeydown
			}
		}));
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)));
		};
	}
});
//#endregion
//#region src/components/Single/index.ts
/**
* Single component with sub-components for building single-selection interfaces.
*
* @see https://0.vuetifyjs.com/components/providers/single
*/
const Single = {
	/**
	* Root component for single-selection. Only one item can be selected at a time.
	*
	* @see https://0.vuetifyjs.com/components/providers/single
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Single } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Single.Root v-model="selected">
	*     <Single.Item value="option1">
	*       Option 1
	*     </Single.Item>
	*
	*     <Single.Item value="option2">
	*       Option 2
	*     </Single.Item>
	*   </Single.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$41,
	/**
	* Component representing a selectable item within Single.Root.
	*
	* @see https://0.vuetifyjs.com/components/providers/single
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Single } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Single.Item value="option1" #default="{ isSelected }">
	*     <div :class="{ selected: isSelected }">
	*       Option 1
	*     </div>
	*   </Single.Item>
	* </template>
	* ```
	*/
	Item: _sfc_main$40
};
//#endregion
//#region src/components/Slider/SliderRoot.vue
const [useSliderRoot, provideSliderRoot] = createContext();
const _sfc_main$39 = /*@__PURE__*/ defineComponent({
	name: "SliderRoot",
	inheritAttrs: false,
	__name: "SliderRoot",
	props: /*@__PURE__*/ mergeModels({
		id: { default: () => /* @__PURE__ */ useId$1() },
		min: { default: 0 },
		max: { default: 100 },
		step: { default: 1 },
		disabled: { default: false },
		readonly: { default: false },
		orientation: { default: "horizontal" },
		inverted: {
			type: Boolean,
			default: false
		},
		minStepsBetweenThumbs: { default: 0 },
		crossover: {
			type: Boolean,
			default: false
		},
		name: {},
		form: {},
		label: {},
		ariaLabelledby: {},
		namespace: { default: "v0:slider:root" },
		as: { default: "div" },
		renderless: { type: Boolean }
	}, {
		"modelValue": { default: () => [] },
		"modelModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels([
		"update:model-value",
		"start",
		"end"
	], ["update:modelValue"]),
	setup(__props, { emit: __emit }) {
		const attrs = useAttrs();
		const emit = __emit;
		const model = useModel(__props, "modelValue");
		const scalar = !/* @__PURE__ */ isArray(model.value) && !/* @__PURE__ */ isUndefined(model.value);
		const internal = computed({
			get: () => /* @__PURE__ */ isArray(model.value) ? model.value : [model.value],
			set: (arr) => {
				/* v8 ignore next -- arr[0] always defined when scalar=true since model started with a number */
				model.value = scalar ? arr[0] ?? 0 : arr;
			}
		});
		const slider = createSlider({
			min: __props.min,
			max: __props.max,
			step: __props.step,
			disabled: () => toValue(__props.disabled),
			readonly: () => toValue(__props.readonly),
			orientation: () => toValue(__props.orientation),
			inverted: () => toValue(__props.inverted),
			minStepsBetweenThumbs: __props.minStepsBetweenThumbs,
			crossover: __props.crossover
		});
		useProxyModel(slider, internal, { multiple: true });
		const dragging = shallowRef(null);
		const track = shallowRef(null);
		const dragOffset = shallowRef(0);
		function getPercent(e) {
			const el = track.value;
			/* v8 ignore next -- defensive: pointermove is gated to active drag, track is mounted by then */
			if (!el) return 0;
			const rect = el.getBoundingClientRect();
			return toValue(slider.orientation) === "vertical" ? (rect.bottom - e.clientY - dragOffset.value) / rect.height * 100 : (e.clientX - rect.left - dragOffset.value) / rect.width * 100;
		}
		useToggleScope(() => !/* @__PURE__ */ isNull(dragging.value), () => {
			/* v8 ignore next 3 -- IN_BROWSER always true in happy-dom test env */
			if (IN_BROWSER) document.documentElement.style.touchAction = "none";
			useDocumentEventListener("pointermove", (e) => {
				/* v8 ignore next -- defensive: dragging cleared on pointerup */
				if (/* @__PURE__ */ isNull(dragging.value)) return;
				const percent = getPercent(e);
				slider.set(dragging.value, slider.fromPercent(percent));
			});
			useDocumentEventListener("pointerup", () => {
				/* v8 ignore next 3 -- IN_BROWSER always true in happy-dom test env */
				if (IN_BROWSER) document.documentElement.style.touchAction = "";
				const values = [...slider.values.value];
				/* v8 ignore next -- end event scalar branch only fires for single-value drag, not exercised */
				emit("end", scalar ? values[0] ?? 0 : values);
				dragging.value = null;
				dragOffset.value = 0;
			});
		});
		function onDrag(index, event, thumbEl) {
			if (toValue(__props.disabled)) return;
			if (toValue(__props.readonly)) return;
			if (event.button !== 0) return;
			event.preventDefault();
			if (thumbEl) {
				const rect = thumbEl.getBoundingClientRect();
				const isVertical = toValue(slider.orientation) === "vertical";
				dragOffset.value = isVertical ? event.clientY - (rect.top + rect.height / 2) : event.clientX - (rect.left + rect.width / 2);
			} else dragOffset.value = 0;
			dragging.value = index;
			const values = [...slider.values.value];
			/* v8 ignore next -- start event scalar branch only fires for single-value drag, not exercised */
			emit("start", scalar ? values[0] ?? 0 : values);
		}
		const context = {
			...slider,
			id: __props.id,
			name: __props.name,
			form: __props.form,
			dragging,
			track,
			onDrag
		};
		provideSliderRoot(__props.namespace, context);
		const isDisabled = toRef(() => toValue(__props.disabled));
		const isReadonly = toRef(() => toValue(__props.readonly));
		const slotProps = toRef(() => ({
			id: __props.id,
			values: slider.values.value,
			min: __props.min,
			max: __props.max,
			isDisabled: isDisabled.value,
			isReadonly: isReadonly.value,
			orientation: toValue(slider.orientation),
			snap: slider.snap,
			fromValue: slider.fromValue,
			fromPercent: slider.fromPercent,
			set: slider.set,
			up: slider.up,
			down: slider.down,
			floor: slider.floor,
			ceil: slider.ceil,
			attrs: {
				"role": "group",
				"aria-label": __props.label || void 0,
				"aria-labelledby": __props.ariaLabelledby || void 0,
				"data-disabled": isDisabled.value ? true : void 0,
				"data-readonly": isReadonly.value ? true : void 0,
				"data-orientation": toValue(slider.orientation)
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createVNode(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]), __props.name ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(unref(slider).values.value, (_, index) => {
				return openBlock(), createBlock(_sfc_main$38, {
					key: index,
					index
				}, null, 8, ["index"]);
			}), 128)) : createCommentVNode("v-if", true)], 64);
		};
	}
});
//#endregion
//#region src/components/Slider/SliderHiddenInput.vue
const _hoisted_1$1 = [
	"disabled",
	"form",
	"name",
	"value"
];
const _sfc_main$38 = /*@__PURE__*/ defineComponent({
	name: "SliderHiddenInput",
	__name: "SliderHiddenInput",
	props: {
		namespace: { default: "v0:slider:root" },
		index: { default: 0 }
	},
	setup(__props) {
		const root = useSliderRoot(__props.namespace);
		const value = toRef(() => root.values.value[__props.index] ?? root.min);
		const isDisabled = toRef(() => toValue(root.disabled));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("input", {
				disabled: isDisabled.value,
				form: unref(root).form,
				name: unref(root).name,
				tabindex: "-1",
				type: "hidden",
				value: value.value
			}, null, 8, _hoisted_1$1);
		};
	}
});
//#endregion
//#region src/components/Slider/SliderRange.vue
const _sfc_main$37 = /*@__PURE__*/ defineComponent({
	name: "SliderRange",
	inheritAttrs: false,
	__name: "SliderRange",
	props: {
		namespace: { default: "v0:slider:root" },
		as: { default: "span" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const root = useSliderRoot(__props.namespace);
		const rawStart = toRef(() => {
			const values = root.values.value;
			if (values.length === 0) return 0;
			if (values.length === 1) return root.fromValue(root.min);
			return root.fromValue(Math.min(...values));
		});
		const rawEnd = toRef(() => {
			const values = root.values.value;
			if (values.length === 0) return 0;
			if (values.length === 1) return root.fromValue(values[0]);
			return root.fromValue(Math.max(...values));
		});
		const start = toRef(() => Math.min(rawStart.value, rawEnd.value));
		const end = toRef(() => Math.max(rawStart.value, rawEnd.value));
		const isVertical = toRef(() => toValue(root.orientation) === "vertical");
		const slotProps = toRef(() => ({
			start: start.value,
			end: end.value,
			attrs: {
				"data-disabled": toValue(root.disabled) ? true : void 0,
				"data-readonly": toValue(root.readonly) ? true : void 0,
				"data-orientation": toValue(root.orientation),
				"style": {
					[isVertical.value ? "bottom" : "left"]: `${start.value}%`,
					[isVertical.value ? "height" : "width"]: `${end.value - start.value}%`
				}
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless,
				style: [unref(attrs).style, slotProps.value.attrs.style]
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, [
				"as",
				"renderless",
				"style"
			]);
		};
	}
});
//#endregion
//#region src/components/Slider/SliderThumb.vue
const _sfc_main$36 = /*@__PURE__*/ defineComponent({
	name: "SliderThumb",
	inheritAttrs: false,
	__name: "SliderThumb",
	props: {
		namespace: { default: "v0:slider:root" },
		ariaLabel: {},
		ariaLabelledby: {},
		ariaValuetext: {},
		as: { default: "span" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const root = useSliderRoot(__props.namespace);
		const locale = useLocale();
		const thumbRef = useTemplateRef("thumb");
		const ticket = root.register();
		onBeforeUnmount(() => {
			root.unregister(ticket.id);
		});
		const index = toRef(() => ticket.index);
		const value = toRef(() => toValue(ticket.value));
		const pct = toRef(() => root.fromValue(value.value));
		const isDragging = toRef(() => root.dragging.value === index.value);
		const isDisabled = toRef(() => toValue(root.disabled));
		const isReadonly = toRef(() => toValue(root.readonly));
		const isVertical = toRef(() => toValue(root.orientation) === "vertical");
		const valueMin = toRef(() => {
			if (root.crossover) return root.min;
			const prev = root.values.value[index.value - 1];
			return /* @__PURE__ */ isUndefined(prev) ? root.min : prev;
		});
		const valueMax = toRef(() => {
			if (root.crossover) return root.max;
			const next = root.values.value[index.value + 1];
			return /* @__PURE__ */ isUndefined(next) ? root.max : next;
		});
		function onPointerdown(e) {
			root.onDrag(index.value, e, thumbRef.value?.element ?? void 0);
		}
		function onKeydown(e) {
			if (isDisabled.value || isReadonly.value) return;
			const isInverted = toValue(root.inverted);
			const actions = {
				ArrowRight: () => isInverted ? root.down(index.value) : root.up(index.value),
				ArrowUp: () => root.up(index.value),
				ArrowLeft: () => isInverted ? root.up(index.value) : root.down(index.value),
				ArrowDown: () => root.down(index.value),
				PageUp: () => root.up(index.value, 10),
				PageDown: () => root.down(index.value, 10),
				Home: () => root.floor(index.value),
				End: () => root.ceil(index.value)
			};
			if (e.shiftKey && e.key.startsWith("Arrow")) {
				e.preventDefault();
				const base = e.key === "ArrowRight" || e.key === "ArrowUp" ? "up" : "down";
				const method = (e.key === "ArrowRight" || e.key === "ArrowLeft") && isInverted ? base === "up" ? "down" : "up" : base;
				root[method](index.value, 10);
				return;
			}
			const action = actions[e.key];
			if (!action) return;
			e.preventDefault();
			action();
		}
		const dataState = toRef(() => isDragging.value ? "dragging" : "idle");
		const slotProps = toRef(() => ({
			index: index.value,
			value: value.value,
			percent: pct.value,
			isDragging: isDragging.value,
			attrs: {
				"role": "slider",
				"tabindex": isDisabled.value ? -1 : 0,
				"aria-valuenow": value.value,
				"aria-valuemin": valueMin.value,
				"aria-valuemax": valueMax.value,
				"aria-valuetext": __props.ariaValuetext || void 0,
				"aria-orientation": toValue(root.orientation),
				"aria-disabled": isDisabled.value,
				"aria-readonly": isReadonly.value ? true : void 0,
				"aria-label": __props.ariaLabelledby ? void 0 : __props.ariaLabel || (locale.ti("Slider.label") ?? "Slider"),
				"aria-labelledby": __props.ariaLabelledby || void 0,
				"data-state": dataState.value,
				"data-disabled": isDisabled.value ? true : void 0,
				"data-readonly": isReadonly.value ? true : void 0,
				"style": {
					[isVertical.value ? "bottom" : "left"]: `${pct.value}%`,
					"touch-action": "none"
				},
				"onKeydown": onKeydown,
				"onPointerdown": onPointerdown
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({ ref: "thumb" }, mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless,
				style: [unref(attrs).style, slotProps.value.attrs.style]
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, [
				"as",
				"renderless",
				"style"
			]);
		};
	}
});
//#endregion
//#region src/components/Slider/SliderTrack.vue
const _sfc_main$35 = /*@__PURE__*/ defineComponent({
	name: "SliderTrack",
	inheritAttrs: false,
	__name: "SliderTrack",
	props: {
		namespace: { default: "v0:slider:root" },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const root = useSliderRoot(__props.namespace);
		const trackRef = useTemplateRef("track");
		watchEffect(() => {
			root.track.value = trackRef.value?.element ?? null;
		});
		function nearest(value) {
			let closest = 0;
			let distance = Infinity;
			for (let index = 0; index < root.values.value.length; index++) {
				const d = Math.abs(root.values.value[index] - value);
				if (d < distance) {
					distance = d;
					closest = index;
				}
			}
			return closest;
		}
		function onPointerdown(e) {
			if (toValue(root.disabled)) return;
			if (toValue(root.readonly)) return;
			if (e.button !== 0) return;
			const el = trackRef.value?.element;
			if (!el) return;
			const rect = el.getBoundingClientRect();
			const percent = toValue(root.orientation) === "vertical" ? (rect.bottom - e.clientY) / rect.height * 100 : (e.clientX - rect.left) / rect.width * 100;
			const value = root.fromPercent(percent);
			const index = nearest(value);
			root.set(index, value);
			root.onDrag(index, e);
		}
		const slotProps = toRef(() => ({ attrs: {
			"data-disabled": toValue(root.disabled) ? true : void 0,
			"data-readonly": toValue(root.readonly) ? true : void 0,
			"data-orientation": toValue(root.orientation),
			"style": { "touch-action": "none" },
			"onPointerdown": onPointerdown
		} }));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({ ref: "track" }, mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless,
				style: [unref(attrs).style, slotProps.value.attrs.style]
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, [
				"as",
				"renderless",
				"style"
			]);
		};
	}
});
//#endregion
//#region src/components/Slider/index.ts
/**
* Slider component with sub-components for range input controls.
*
* @see https://0.vuetifyjs.com/components/forms/slider
*
* @example
* ```vue
* <script setup lang="ts">
*   import { Slider } from '@vuetify/v0'
*   import { ref } from 'vue'
*
*   const value = ref([50])
* <\/script>
*
* <template>
*   <Slider.Root v-model="value" :min="0" :max="100">
*     <Slider.Track>
*       <Slider.Range />
*     </Slider.Track>
*     <Slider.Thumb />
*   </Slider.Root>
* </template>
* ```
*/
const Slider = {
	/**
	* Root component for sliders.
	*
	* Creates slider context, provides it to child components, and
	* bridges v-model. Value is always `number[]`: single thumb = `[50]`,
	* range = `[25, 75]`. Configure min, max, step, and orientation via
	* props. When `name` prop is provided, automatically renders hidden
	* inputs for form submission.
	*
	* @see https://0.vuetifyjs.com/components/forms/slider
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Slider } from '@vuetify/v0'
	*   import { ref } from 'vue'
	*
	*   const value = ref([50])
	* <\/script>
	*
	* <template>
	*   <Slider.Root v-model="value" :min="0" :max="100">
	*     <Slider.Track>
	*       <Slider.Range />
	*     </Slider.Track>
	*     <Slider.Thumb />
	*   </Slider.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$39,
	/**
	* Track element that contains the Range and handles click-to-position.
	*
	* On pointerdown, calculates the value from pointer position, snaps
	* the nearest thumb to that value, and initiates drag. Must contain
	* Slider.Range as a child.
	*
	* @see https://0.vuetifyjs.com/components/forms/slider#anatomy
	*
	* @example
	* ```vue
	* <Slider.Track>
	*   <Slider.Range />
	* </Slider.Track>
	* ```
	*/
	Track: _sfc_main$35,
	/**
	* Filled region between thumb positions.
	*
	* For single-thumb sliders, fills from min to the thumb value.
	* For range sliders, fills between the lowest and highest thumb
	* values. Must be used within a Slider.Track component.
	*
	* @see https://0.vuetifyjs.com/components/forms/slider#anatomy
	*
	* @example
	* ```vue
	* <Slider.Track>
	*   <Slider.Range />
	* </Slider.Track>
	* ```
	*/
	Range: _sfc_main$37,
	/**
	* Draggable thumb control with keyboard navigation.
	*
	* Auto-registers with parent Root to receive its index. Supports
	* pointer drag and full keyboard navigation (Arrow, Page, Home/End).
	* Provides ARIA slider attributes including per-thumb constrained
	* valuemin/valuemax for multi-thumb sliders. Render multiple Thumbs
	* for range sliders.
	*
	* @see https://0.vuetifyjs.com/components/forms/slider#anatomy
	*
	* @example
	* ```vue
	* <Slider.Thumb />
	* ```
	*/
	Thumb: _sfc_main$36,
	/**
	* Hidden native input for form submission.
	*
	* Auto-rendered by Root when `name` prop is provided — one input
	* per thumb value. Can also be used explicitly for custom form
	* integration.
	*
	* @see https://0.vuetifyjs.com/components/forms/slider#form-integration
	* @internal
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Slider } from '@vuetify/v0'
	*   import { ref } from 'vue'
	*
	*   const value = ref([50])
	* <\/script>
	*
	* <template>
	*   <!-- You don't need to do this — Root auto-renders hidden
	*        inputs when the `name` prop is set. This is only needed
	*        for custom form integration. -->
	*   <Slider.Root v-model="value">
	*     <Slider.Track>
	*       <Slider.Range />
	*     </Slider.Track>
	*     <Slider.Thumb />
	*     <Slider.HiddenInput name="volume" :index="0" />
	*   </Slider.Root>
	* </template>
	* ```
	*/
	HiddenInput: _sfc_main$38
};
//#endregion
//#region src/components/Snackbar/SnackbarAnnouncer.vue
const visuallyHiddenStyle$1 = {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: "0",
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	border: "0"
};
const _sfc_main$34 = /*@__PURE__*/ defineComponent({
	name: "SnackbarAnnouncer",
	__name: "SnackbarAnnouncer",
	props: { namespace: { default: "v0:notifications" } },
	setup(__props) {
		const portal = usePortal(__props.namespace);
		const polite = toRef(() => portal?.polite.value ?? "");
		const assertive = toRef(() => portal?.assertive.value ?? "");
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createElementVNode("div", {
				"aria-atomic": "true",
				"aria-live": "polite",
				role: "status",
				style: visuallyHiddenStyle$1
			}, toDisplayString(polite.value), 1), createElementVNode("div", {
				"aria-atomic": "true",
				"aria-live": "assertive",
				role: "alert",
				style: visuallyHiddenStyle$1
			}, toDisplayString(assertive.value), 1)], 64);
		};
	}
});
//#endregion
//#region src/components/Snackbar/SnackbarPortal.vue
const [usePortal, providePortal] = createContext({ suffix: "portal" });
const _sfc_main$33 = /*@__PURE__*/ defineComponent({
	name: "SnackbarPortal",
	inheritAttrs: false,
	__name: "SnackbarPortal",
	props: {
		announcer: {
			type: Boolean,
			default: true
		},
		namespace: { default: "v0:notifications" },
		teleport: {
			type: [
				String,
				Object,
				Boolean
			],
			default: "top-layer"
		},
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const polite = shallowRef("");
		const assertive = shallowRef("");
		let politeNext = "";
		let assertiveNext = "";
		const politeFrame = useRaf(() => {
			polite.value = politeNext;
		});
		const assertiveFrame = useRaf(() => {
			assertive.value = assertiveNext;
		});
		function announce(message, urgent = false) {
			const region = urgent ? assertive : polite;
			region.value = "";
			if (urgent) {
				assertiveNext = message;
				assertiveFrame();
			} else {
				politeNext = message;
				politeFrame();
			}
		}
		providePortal(__props.namespace, {
			announce,
			polite: shallowReadonly(polite),
			assertive: shallowReadonly(assertive)
		});
		function getSlotProps(zIndex) {
			return {
				zIndex,
				attrs: { style: { zIndex } }
			};
		}
		const atomRef = useTemplateRef("atom");
		const el = toRef(() => /* @__PURE__ */ toElement(atomRef.value?.element) ?? null);
		watch(el, (value) => {
			if (!IN_BROWSER || /* @__PURE__ */ isNull(value)) return;
			const element = value;
			if (getComputedStyle(element).position === "static") element.style.position = "relative";
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$68), {
				disabled: __props.teleport === false,
				scrim: false,
				to: __props.teleport || "body"
			}, {
				default: withCtx(({ zIndex }) => [createVNode(unref(_sfc_main$192), mergeProps({
					ref: "atom",
					as: __props.as,
					renderless: __props.renderless
				}, mergeProps(_ctx.$attrs, getSlotProps(zIndex).attrs)), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(getSlotProps(zIndex))))]),
					_: 2
				}, 1040, ["as", "renderless"]), __props.announcer ? (openBlock(), createBlock(_sfc_main$34, {
					key: 0,
					namespace: __props.namespace
				}, null, 8, ["namespace"])) : createCommentVNode("v-if", true)]),
				_: 3
			}, 8, ["disabled", "to"]);
		};
	}
});
//#endregion
//#region src/components/Snackbar/SnackbarQueue.vue
const [useSnackbarQueueContext, provideSnackbarQueueContext] = createContext({ suffix: "queue" });
const _sfc_main$32 = /*@__PURE__*/ defineComponent({
	name: "SnackbarQueue",
	__name: "SnackbarQueue",
	props: {
		namespace: { default: "v0:notifications" },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const notifications = useNotifications(__props.namespace);
		function dismiss(id) {
			notifications.unregister(id);
			if (reasons.size > 0) notifications.queue.pause();
		}
		provideSnackbarQueueContext(__props.namespace, { dismiss });
		const items = computed(() => notifications.queue.values().map((q) => notifications.get(q.id)).filter((n) => !/* @__PURE__ */ isUndefined(n)).toReversed());
		const container = useTemplateRef("container");
		const reasons = /* @__PURE__ */ new Set();
		function pause(reason) {
			reasons.add(reason);
			notifications.queue.pause();
		}
		function resume(reason) {
			reasons.delete(reason);
			if (reasons.size === 0) notifications.queue.resume();
		}
		function onEnter() {
			pause("hover");
		}
		function onLeave() {
			resume("hover");
		}
		function onFocusin() {
			pause("focus");
		}
		function onFocusout(e) {
			const el = container.value?.element ?? null;
			if (/* @__PURE__ */ isElement(el) && /* @__PURE__ */ isElement(e.relatedTarget) && el.contains(e.relatedTarget)) return;
			resume("focus");
		}
		onBeforeUnmount(() => {
			if (reasons.size > 0) {
				reasons.clear();
				notifications.queue.resume();
			}
		});
		const slotProps = toRef(() => ({
			items: items.value,
			attrs: {
				onMouseenter: onEnter,
				onMouseleave: onLeave,
				onFocusin,
				onFocusout
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				ref_key: "container",
				ref: container,
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Snackbar/SnackbarRoot.vue
const [useSnackbarRootContext, provideSnackbarRootContext] = createContext({ suffix: "root" });
const _sfc_main$31 = /*@__PURE__*/ defineComponent({
	name: "SnackbarRoot",
	__name: "SnackbarRoot",
	props: {
		namespace: { default: "v0:notifications" },
		id: { default: () => /* @__PURE__ */ useId$1() },
		urgent: { type: Boolean },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	emits: ["dismiss"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const portal = usePortal(__props.namespace, null);
		const queue = useSnackbarQueueContext(__props.namespace, null);
		function onDismiss() {
			if (queue) queue.dismiss(__props.id);
			else emit("dismiss", __props.id);
		}
		provideSnackbarRootContext(__props.namespace, {
			id: __props.id,
			onDismiss
		});
		const atomRef = useTemplateRef("atom");
		const el = toRef(() => /* @__PURE__ */ toElement(atomRef.value?.element) ?? null);
		onMounted(async () => {
			if (!portal) return;
			await nextTick();
			const text = el.value?.textContent;
			if (text) portal.announce(text, __props.urgent);
		});
		const slotProps = toRef(() => ({
			id: __props.id,
			attrs: { role: __props.urgent ? "alert" : "status" }
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				ref: "atom",
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Snackbar/SnackbarContent.vue
const _sfc_main$30 = /*@__PURE__*/ defineComponent({
	name: "SnackbarContent",
	__name: "SnackbarContent",
	props: {
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), {
				as: __props.as,
				renderless: __props.renderless
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Snackbar/SnackbarClose.vue
const _sfc_main$29 = /*@__PURE__*/ defineComponent({
	name: "SnackbarClose",
	__name: "SnackbarClose",
	props: {
		namespace: { default: "v0:notifications" },
		as: { default: "button" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const context = useSnackbarRootContext(__props.namespace);
		const locale = useLocale();
		function onClick() {
			context.onDismiss();
		}
		function onKeydown(e) {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onClick();
			}
		}
		const slotProps = toRef(() => ({ attrs: {
			"type": __props.as === "button" ? "button" : void 0,
			"role": __props.as === "button" ? void 0 : "button",
			"tabindex": 0,
			"aria-label": locale.ti("Snackbar.close") ?? "Dismiss",
			"onClick": onClick,
			"onKeydown": __props.as === "button" ? void 0 : onKeydown
		} }));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				renderless: __props.renderless
			}, slotProps.value.attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Snackbar/index.ts
/**
* Snackbar component with sub-components for building toast notifications.
*
* @see https://0.vuetifyjs.com/components/semantic/snackbar
*
* @example
* ```vue
* <script setup lang="ts">
*   import { Snackbar } from '@vuetify/v0'
* <\/script>
*
* <template>
*   <Snackbar.Portal>
*     <Snackbar.Queue v-slot="{ items }">
*       <template v-for="item in items" :key="item.id">
*         <Snackbar.Root :id="item.id">
*           <Snackbar.Content>{{ item.subject }}</Snackbar.Content>
*           <Snackbar.Close />
*         </Snackbar.Root>
*       </template>
*     </Snackbar.Queue>
*   </Snackbar.Portal>
* </template>
* ```
*/
const Snackbar = {
	/**
	* Container that teleports to `<body>` and manages z-index via useStack.
	* Coordinates layering with Dialog and Scrim. Pass `:teleport="false"`
	* for inline rendering (docs, Storybook, scoped containers).
	*
	* @see https://0.vuetifyjs.com/components/semantic/snackbar
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Snackbar } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Snackbar.Portal>
	*     <Snackbar.Root>
	*       <Snackbar.Content>Saved</Snackbar.Content>
	*       <Snackbar.Close />
	*     </Snackbar.Root>
	*   </Snackbar.Portal>
	* </template>
	* ```
	*/
	Portal: _sfc_main$33,
	/**
	* Connects to useNotifications by namespace and exposes queue items
	* via scoped slot. Pauses auto-dismiss on hover and focus (WCAG 2.2.1).
	* Re-pauses after dismiss when hover/focus is still active.
	*
	* @see https://0.vuetifyjs.com/components/semantic/snackbar
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Snackbar } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Snackbar.Queue v-slot="{ items }">
	*     <Snackbar.Root v-for="item in items" :key="item.id" :id="item.id">
	*       <Snackbar.Content>{{ item.subject }}</Snackbar.Content>
	*       <Snackbar.Close />
	*     </Snackbar.Root>
	*   </Snackbar.Queue>
	* </template>
	* ```
	*/
	Queue: _sfc_main$32,
	/**
	* A single snackbar instance. Provides dismiss context to child
	* Snackbar.Close components. Defaults to `role="status"` (polite
	* live region) — override with `role="alert"` for urgent notifications.
	*
	* @see https://0.vuetifyjs.com/components/semantic/snackbar
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Snackbar } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Snackbar.Root :id="item.id">
	*     <Snackbar.Content>{{ item.subject }}</Snackbar.Content>
	*     <Snackbar.Close />
	*   </Snackbar.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$31,
	/**
	* Semantic wrapper for the notification message text.
	* Renders as a `<div>` by default. Polymorphic via the `as` prop.
	*
	* @see https://0.vuetifyjs.com/components/semantic/snackbar
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Snackbar } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Snackbar.Content>Changes saved</Snackbar.Content>
	* </template>
	* ```
	*/
	Content: _sfc_main$30,
	/**
	* Dismiss button that auto-wires to the nearest Snackbar.Root context.
	* Renders with `aria-label="Close"` and `type="button"`. In renderless
	* mode, all attributes including `onClick` are available via `slotProps.attrs`.
	*
	* @see https://0.vuetifyjs.com/components/semantic/snackbar
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Snackbar } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Snackbar.Close />
	* </template>
	* ```
	*/
	Close: _sfc_main$29,
	/**
	* Visually-hidden polite + assertive live-region pair that announces
	* snackbar messages. Auto-rendered by Snackbar.Portal — place explicitly
	* with `:announcer="false"` on the Portal to control position or markup
	* order.
	*
	* @see https://0.vuetifyjs.com/components/semantic/snackbar
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Snackbar } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Snackbar.Portal :announcer="false">
	*     <Snackbar.Announcer />
	*     <Snackbar.Root>
	*       <Snackbar.Content>Saved</Snackbar.Content>
	*       <Snackbar.Close />
	*     </Snackbar.Root>
	*   </Snackbar.Portal>
	* </template>
	* ```
	*/
	Announcer: _sfc_main$34
};
//#endregion
//#region src/components/Step/StepRoot.vue
const [useStepRoot, provideStepRoot] = createContext();
const _sfc_main$28 = /*@__PURE__*/ defineComponent({
	name: "StepRoot",
	__name: "StepRoot",
	props: /*@__PURE__*/ mergeModels({
		namespace: { default: "v0:step" },
		disabled: {
			type: Boolean,
			default: false
		},
		enroll: {
			type: Boolean,
			default: false
		},
		mandatory: {
			type: [Boolean, String],
			default: false
		}
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const model = useModel(__props, "modelValue");
		const step = createStep({
			disabled: toRef(() => __props.disabled),
			enroll: toRef(() => __props.enroll),
			mandatory: toRef(() => __props.mandatory),
			events: true
		});
		useProxyModel(step, model, { multiple: false });
		provideStepRoot(__props.namespace, step);
		const slotProps = toRef(() => ({
			isDisabled: toValue(step.disabled),
			first: step.first,
			last: step.last,
			next: step.next,
			prev: step.prev,
			step: step.step,
			select: step.select,
			unselect: step.unselect,
			toggle: step.toggle,
			attrs: { "aria-multiselectable": false }
		}));
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)));
		};
	}
});
//#endregion
//#region src/components/Step/StepItem.vue
const _sfc_main$27 = /*@__PURE__*/ defineComponent({
	name: "StepItem",
	__name: "StepItem",
	props: {
		id: {},
		label: {},
		value: {},
		disabled: {},
		namespace: { default: "v0:step" }
	},
	setup(__props) {
		const step = useStepRoot(__props.namespace);
		const ticket = step.register({
			id: __props.id,
			value: __props.value,
			disabled: () => toValue(__props.disabled) ?? false
		});
		const isDisabled = toRef(() => toValue(ticket.disabled) || toValue(step.disabled));
		function onClick() {
			if (toValue(isDisabled)) return;
			ticket.toggle();
		}
		function onKeydown(e) {
			if (e.key !== "Enter" && e.key !== " ") return;
			e.preventDefault();
			onClick();
		}
		onBeforeUnmount(() => {
			step.unregister(ticket.id);
		});
		const slotProps = toRef(() => ({
			id: String(ticket.id),
			label: __props.label,
			value: __props.value,
			isSelected: toValue(ticket.isSelected),
			isDisabled: toValue(isDisabled),
			select: ticket.select,
			unselect: ticket.unselect,
			toggle: ticket.toggle,
			attrs: {
				"role": "tab",
				"tabindex": toValue(isDisabled) ? -1 : 0,
				"aria-selected": toValue(ticket.isSelected),
				"aria-disabled": toValue(isDisabled),
				"data-selected": toValue(ticket.isSelected) || void 0,
				"data-disabled": toValue(isDisabled) || void 0,
				"onClick": onClick,
				"onKeydown": onKeydown
			}
		}));
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)));
		};
	}
});
//#endregion
//#region src/components/Step/index.ts
/**
* Step component with sub-components for building stepper navigation.
*
* @see https://0.vuetifyjs.com/components/providers/step
*/
const Step = {
	/**
	* Root component for step navigation.
	*
	* @see https://0.vuetifyjs.com/components/providers/step
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Step } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Step.Root>
	*     <Step.Item value="account">Account</Step.Item>
	*
	*     <Step.Item value="profile">Profile</Step.Item>
	*
	*     <Step.Item value="review">Review</Step.Item>
	*   </Step.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$28,
	/**
	* Component representing a single step item.
	*
	* @see https://0.vuetifyjs.com/components/providers/step
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Step } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Step.Item value="account">
	*     Account Setup
	*   </Step.Item>
	* </template>
	* ```
	*/
	Item: _sfc_main$27
};
//#endregion
//#region src/components/Switch/SwitchGroup.vue
const [useSwitchGroup, provideSwitchGroup] = createContext();
const _sfc_main$26 = /*@__PURE__*/ defineComponent({
	name: "SwitchGroup",
	__name: "SwitchGroup",
	props: /*@__PURE__*/ mergeModels({
		namespace: { default: "v0:switch:group" },
		disabled: {
			type: Boolean,
			default: false
		},
		enroll: {
			type: Boolean,
			default: false
		},
		mandatory: {
			type: [Boolean, String],
			default: false
		},
		label: {},
		ariaLabelledby: {},
		ariaDescribedby: {},
		as: { default: "div" },
		renderless: { type: Boolean }
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["update:model-value"], ["update:modelValue"]),
	setup(__props) {
		const model = useModel(__props, "modelValue");
		const group = createGroup({
			disabled: toRef(() => __props.disabled),
			enroll: toRef(() => __props.enroll),
			mandatory: toRef(() => __props.mandatory),
			events: true
		});
		useProxyModel(group, model, { multiple: true });
		provideSwitchGroup(__props.namespace, group);
		const slotProps = toRef(() => ({
			isDisabled: toValue(group.disabled),
			isNoneSelected: group.isNoneSelected.value,
			isAllSelected: group.isAllSelected.value,
			isMixed: group.isMixed.value,
			select: group.select,
			unselect: group.unselect,
			toggle: group.toggle,
			selectAll: group.selectAll,
			unselectAll: group.unselectAll,
			toggleAll: group.toggleAll,
			attrs: {
				"role": "group",
				"aria-label": __props.label || void 0,
				"aria-labelledby": __props.ariaLabelledby || void 0,
				"aria-describedby": __props.ariaDescribedby || void 0
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Switch/SwitchRoot.vue
const [useSwitchRoot, provideSwitchRoot] = createContext();
const _sfc_main$25 = /*@__PURE__*/ defineComponent({
	name: "SwitchRoot",
	inheritAttrs: false,
	__name: "SwitchRoot",
	props: /*@__PURE__*/ mergeModels({
		id: { default: () => /* @__PURE__ */ useId$1() },
		label: {},
		value: {},
		name: {},
		form: {},
		disabled: { default: false },
		indeterminate: { default: false },
		namespace: { default: "v0:switch:root" },
		groupNamespace: { default: "v0:switch:group" },
		ariaLabelledby: {},
		ariaDescribedby: {},
		ariaInvalid: { type: Boolean },
		as: { default: "button" },
		renderless: { type: Boolean }
	}, {
		"modelValue": { type: Boolean },
		"modelModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["update:model-value"], ["update:modelValue"]),
	setup(__props) {
		const attrs = useAttrs();
		let group = null;
		try {
			group = useSwitchGroup(__props.groupNamespace);
		} catch {}
		const model = useModel(__props, "modelValue");
		const ticket = group?.register({
			id: __props.id,
			value: __props.value,
			disabled: () => toValue(__props.disabled) ?? false,
			indeterminate: () => toValue(__props.indeterminate) ?? false
		});
		const isChecked = toRef(() => ticket ? toValue(ticket.isSelected) : model.value ?? false);
		const isMixed = toRef(() => ticket ? toValue(ticket.isMixed) : toValue(__props.indeterminate) ?? false);
		const isDisabled = toRef(() => group && ticket ? toValue(ticket.disabled) || toValue(group.disabled) : toValue(__props.disabled) ?? false);
		const dataState = toRef(() => isMixed.value ? "indeterminate" : isChecked.value ? "checked" : "unchecked");
		function toggle() {
			if (isDisabled.value) return;
			if (ticket) ticket.toggle();
			else model.value = !model.value;
		}
		function select() {
			if (isDisabled.value) return;
			if (ticket) ticket.select();
			else model.value = true;
		}
		function unselect() {
			if (isDisabled.value) return;
			if (ticket) ticket.unselect();
			else model.value = false;
		}
		function mix() {
			if (isDisabled.value || !ticket) return;
			ticket.mix();
		}
		function unmix() {
			if (isDisabled.value || !ticket) return;
			ticket.unmix();
		}
		function onClick() {
			toggle();
		}
		function onKeydown(e) {
			if (e.key !== " ") return;
			e.preventDefault();
			toggle();
		}
		onBeforeUnmount(() => {
			if (!ticket || !group) return;
			group.unregister(ticket.id);
		});
		const context = {
			id: __props.id,
			label: __props.label,
			value: __props.value,
			name: __props.name,
			form: __props.form,
			isChecked,
			isMixed,
			isDisabled,
			select,
			unselect,
			toggle,
			mix,
			unmix
		};
		provideSwitchRoot(__props.namespace, context);
		const slotProps = toRef(() => ({
			id: __props.id,
			label: __props.label,
			value: __props.value,
			isChecked: isChecked.value,
			isMixed: isMixed.value,
			isDisabled: isDisabled.value,
			select,
			unselect,
			toggle,
			mix,
			unmix,
			attrs: {
				"type": __props.as === "button" ? "button" : void 0,
				"role": "switch",
				"aria-checked": !isMixed.value && isChecked.value,
				"aria-disabled": isDisabled.value,
				"aria-label": __props.label || void 0,
				"aria-labelledby": __props.ariaLabelledby || void 0,
				"aria-describedby": __props.ariaDescribedby || void 0,
				"aria-invalid": __props.ariaInvalid || void 0,
				"tabindex": isDisabled.value ? void 0 : 0,
				"data-state": dataState.value,
				"data-disabled": isDisabled.value ? true : void 0,
				"onClick": onClick,
				"onKeydown": onKeydown
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createVNode(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]), __props.name ? (openBlock(), createBlock(_sfc_main$24, { key: 0 })) : createCommentVNode("v-if", true)], 64);
		};
	}
});
//#endregion
//#region src/components/Switch/SwitchHiddenInput.vue
const _hoisted_1 = [
	"checked",
	"disabled",
	"form",
	"name",
	"value"
];
const visuallyHiddenStyle = {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: "0",
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	border: "0"
};
const _sfc_main$24 = /*@__PURE__*/ defineComponent({
	name: "SwitchHiddenInput",
	__name: "SwitchHiddenInput",
	props: {
		namespace: { default: "v0:switch:root" },
		name: {},
		value: {},
		form: {}
	},
	setup(__props) {
		const root = useSwitchRoot(__props.namespace);
		const name = toRef(() => __props.name ?? root.name);
		const form = toRef(() => __props.form ?? root.form);
		const value = toRef(() => {
			const v = __props.value ?? root.value ?? "on";
			if (/* @__PURE__ */ isNullOrUndefined(v)) return "on";
			if (/* @__PURE__ */ isObject(v)) return JSON.stringify(v);
			return String(v);
		});
		const isChecked = root.isChecked;
		const isDisabled = root.isDisabled;
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("input", {
				checked: unref(isChecked),
				disabled: unref(isDisabled),
				form: form.value,
				inert: "",
				name: name.value,
				style: visuallyHiddenStyle,
				tabindex: "-1",
				type: "checkbox",
				value: value.value
			}, null, 8, _hoisted_1);
		};
	}
});
//#endregion
//#region src/components/Switch/SwitchSelectAll.vue
const _sfc_main$23 = /*@__PURE__*/ defineComponent({
	name: "SwitchSelectAll",
	inheritAttrs: false,
	__name: "SwitchSelectAll",
	props: {
		label: {},
		disabled: { type: Boolean },
		namespace: { default: "v0:switch:root" },
		groupNamespace: { default: "v0:switch:group" },
		ariaLabelledby: {},
		ariaDescribedby: {},
		as: { default: "button" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const group = useSwitchGroup(__props.groupNamespace);
		const id = /* @__PURE__ */ useId$1();
		const isAllSelected = toRef(() => group.isAllSelected.value);
		const isMixed = toRef(() => group.isMixed.value);
		const isDisabled = toRef(() => toValue(__props.disabled) || toValue(group.disabled));
		const dataState = toRef(() => isMixed.value ? "indeterminate" : isAllSelected.value ? "checked" : "unchecked");
		function onClick() {
			if (isDisabled.value) return;
			group.toggleAll();
		}
		function onKeydown(e) {
			if (e.key !== " ") return;
			e.preventDefault();
			if (isDisabled.value) return;
			group.toggleAll();
		}
		const context = {
			id,
			label: __props.label,
			value: void 0,
			name: void 0,
			form: void 0,
			isChecked: isAllSelected,
			isMixed,
			isDisabled,
			select: group.selectAll,
			unselect: group.unselectAll,
			toggle: group.toggleAll,
			mix: () => {},
			unmix: () => {}
		};
		provideSwitchRoot(__props.namespace, context);
		const slotProps = toRef(() => ({
			label: __props.label,
			isAllSelected: isAllSelected.value,
			isMixed: isMixed.value,
			isDisabled: isDisabled.value,
			selectAll: group.selectAll,
			unselectAll: group.unselectAll,
			toggleAll: group.toggleAll,
			attrs: {
				"type": __props.as === "button" ? "button" : void 0,
				"role": "switch",
				"aria-checked": !isMixed.value && isAllSelected.value,
				"aria-disabled": isDisabled.value,
				"aria-label": __props.label || void 0,
				"aria-labelledby": __props.ariaLabelledby || void 0,
				"aria-describedby": __props.ariaDescribedby || void 0,
				"tabindex": isDisabled.value ? void 0 : 0,
				"data-state": dataState.value,
				"data-disabled": isDisabled.value ? true : void 0,
				onClick,
				onKeydown
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Switch/SwitchThumb.vue
const _sfc_main$22 = /*@__PURE__*/ defineComponent({
	name: "SwitchThumb",
	__name: "SwitchThumb",
	props: {
		namespace: { default: "v0:switch:root" },
		as: { default: "span" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const root = useSwitchRoot(__props.namespace);
		const isChecked = toRef(() => toValue(root.isChecked));
		const isMixed = toRef(() => toValue(root.isMixed));
		const dataState = toRef(() => isMixed.value ? "indeterminate" : isChecked.value ? "checked" : "unchecked");
		const slotProps = toRef(() => ({
			isChecked: isChecked.value,
			isMixed: isMixed.value,
			attrs: {
				"aria-hidden": "true",
				"data-state": dataState.value
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Switch/SwitchTrack.vue
const _sfc_main$21 = /*@__PURE__*/ defineComponent({
	name: "SwitchTrack",
	__name: "SwitchTrack",
	props: {
		namespace: { default: "v0:switch:root" },
		as: { default: "span" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const root = useSwitchRoot(__props.namespace);
		const isChecked = toRef(() => toValue(root.isChecked));
		const isMixed = toRef(() => toValue(root.isMixed));
		const dataState = toRef(() => isMixed.value ? "indeterminate" : isChecked.value ? "checked" : "unchecked");
		const slotProps = toRef(() => ({
			isChecked: isChecked.value,
			isMixed: isMixed.value,
			attrs: {
				"aria-hidden": "true",
				"data-state": dataState.value
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				dir: "ltr",
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Switch/index.ts
/**
* Switch component with sub-components for toggle controls.
*
* @see https://0.vuetifyjs.com/components/forms/switch
*
* @example
* ```vue
* <script lang="ts" setup>
*   import { Switch } from '@vuetify/v0'
*   import { ref } from 'vue'
*
*   const enabled = ref(false)
* <\/script>
*
* <template>
*   <label>
*     <Switch.Root v-model="enabled">
*       <Switch.Track>
*         <Switch.Thumb />
*       </Switch.Track>
*     </Switch.Root>
*     Enable notifications
*   </label>
* </template>
* ```
*/
const Switch = {
	/**
	* Group component for managing multiple switches with tri-state support.
	*
	* @see https://0.vuetifyjs.com/components/forms/switch
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Switch } from '@vuetify/v0'
	*   import { ref } from 'vue'
	*
	*   const selected = ref<string[]>([])
	* <\/script>
	*
	* <template>
	*   <Switch.Group v-model="selected">
	*     <label>
	*       <Switch.Root value="a">
	*         <Switch.Track><Switch.Thumb /></Switch.Track>
	*       </Switch.Root>
	*       Option A
	*     </label>
	*     <label>
	*       <Switch.Root value="b">
	*         <Switch.Track><Switch.Thumb /></Switch.Track>
	*       </Switch.Root>
	*       Option B
	*     </label>
	*   </Switch.Group>
	* </template>
	* ```
	*/
	Group: _sfc_main$26,
	/**
	* Hidden input component for form submission.
	*
	* Auto-rendered by Root when `name` prop is provided.
	* Can also be used explicitly for custom form integration.
	*
	* @see https://0.vuetifyjs.com/components/forms/switch
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Switch } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Switch.Root>
	*     <Switch.Track><Switch.Thumb /></Switch.Track>
	*     <Switch.HiddenInput name="notifications" value="on" />
	*   </Switch.Root>
	* </template>
	* ```
	*/
	HiddenInput: _sfc_main$24,
	/**
	* Root component for individual switches.
	*
	* Renders as a button with `role="switch"` and proper ARIA attributes.
	* Handles click/keyboard interactions. Supports standalone mode with
	* v-model or group mode within Switch.Group. When `name` prop is
	* provided, automatically renders a hidden input for form submission.
	*
	* @see https://0.vuetifyjs.com/components/forms/switch
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Switch } from '@vuetify/v0'
	*   import { ref } from 'vue'
	*
	*   const enabled = ref(false)
	* <\/script>
	*
	* <template>
	*   <label>
	*     <Switch.Root v-model="enabled">
	*       <Switch.Track>
	*         <Switch.Thumb />
	*       </Switch.Track>
	*     </Switch.Root>
	*     Enable notifications
	*   </label>
	* </template>
	* ```
	*/
	Root: _sfc_main$25,
	/**
	* Select-all toggle for group multi-selection.
	*
	* Binds to parent Switch.Group's aggregate state. Reflects
	* isAllSelected/isMixed and calls toggleAll on click. Does NOT
	* register as a group item. Must be used within a Switch.Group.
	*
	* @see https://0.vuetifyjs.com/components/forms/switch
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Switch } from '@vuetify/v0'
	*   import { ref } from 'vue'
	*
	*   const selected = ref<string[]>([])
	* <\/script>
	*
	* <template>
	*   <Switch.Group v-model="selected">
	*     <label>
	*       <Switch.SelectAll label="Toggle all">
	*         <Switch.Track><Switch.Thumb /></Switch.Track>
	*       </Switch.SelectAll>
	*       Select all
	*     </label>
	*
	*     <label>
	*       <Switch.Root value="a">
	*         <Switch.Track><Switch.Thumb /></Switch.Track>
	*       </Switch.Root>
	*       Option A
	*     </label>
	*   </Switch.Group>
	* </template>
	* ```
	*/
	SelectAll: _sfc_main$23,
	/**
	* Sliding knob for switches.
	*
	* Renders as a span with a `data-state` attribute for CSS styling.
	* Always visible; drive its off/on position and color from `data-state`.
	* Must be used within a Switch.Root or Switch.SelectAll.
	*
	* @see https://0.vuetifyjs.com/components/forms/switch
	*
	* @example
	* ```vue
	* <Switch.Root v-model="enabled">
	*   <Switch.Track>
	*     <Switch.Thumb />
	*   </Switch.Track>
	* </Switch.Root>
	* ```
	*/
	Thumb: _sfc_main$22,
	/**
	* Track/rail component for switches.
	*
	* Always visible, provides `data-state` attribute for CSS styling.
	* Must be used within a Switch.Root or Switch.SelectAll.
	*
	* @see https://0.vuetifyjs.com/components/forms/switch
	*
	* @example
	* ```vue
	* <Switch.Root v-model="enabled">
	*   <Switch.Track>
	*     <Switch.Thumb />
	*   </Switch.Track>
	* </Switch.Root>
	* ```
	*/
	Track: _sfc_main$21
};
//#endregion
//#region src/components/Tabs/TabsRoot.vue
const [useTabsRoot, provideTabsRoot] = createContext();
const _sfc_main$20 = /*@__PURE__*/ defineComponent({
	name: "TabsRoot",
	__name: "TabsRoot",
	props: /*@__PURE__*/ mergeModels({
		namespace: { default: "v0:tabs" },
		disabled: {
			type: Boolean,
			default: false
		},
		enroll: {
			type: Boolean,
			default: false
		},
		mandatory: {
			type: [Boolean, String],
			default: "force"
		},
		circular: {
			type: Boolean,
			default: true
		},
		orientation: { default: "horizontal" },
		activation: { default: "automatic" }
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["update:model-value"], ["update:modelValue"]),
	setup(__props) {
		const model = useModel(__props, "modelValue");
		const rootId = /* @__PURE__ */ useId$1();
		const step = createStep({
			disabled: toRef(() => __props.disabled),
			enroll: toRef(() => __props.enroll),
			mandatory: toRef(() => __props.mandatory),
			circular: __props.circular,
			events: true
		});
		useProxyModel(step, model, { multiple: false });
		const context = {
			...step,
			orientation: toRef(() => __props.orientation),
			activation: toRef(() => __props.activation),
			circular: toRef(() => __props.circular),
			rootId
		};
		provideTabsRoot(__props.namespace, context);
		const slotProps = toRef(() => ({
			isDisabled: toValue(step.disabled),
			orientation: __props.orientation,
			activation: __props.activation,
			first: step.first,
			last: step.last,
			next: step.next,
			prev: step.prev,
			step: step.step,
			select: step.select,
			unselect: step.unselect,
			toggle: step.toggle,
			attrs: { "aria-multiselectable": false }
		}));
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)));
		};
	}
});
//#endregion
//#region src/components/Tabs/TabsList.vue
const _sfc_main$19 = /*@__PURE__*/ defineComponent({
	name: "TabsList",
	inheritAttrs: false,
	__name: "TabsList",
	props: {
		label: {},
		namespace: { default: "v0:tabs" },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const tabs = useTabsRoot(__props.namespace);
		const isDisabled = toRef(() => toValue(tabs.disabled));
		const slotProps = toRef(() => ({
			orientation: tabs.orientation.value,
			isDisabled: isDisabled.value,
			attrs: {
				"role": "tablist",
				"aria-orientation": tabs.orientation.value,
				"aria-label": __props.label,
				"aria-disabled": isDisabled.value,
				"data-disabled": isDisabled.value || void 0
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Tabs/TabsItem.vue
const _sfc_main$18 = /*@__PURE__*/ defineComponent({
	name: "TabsItem",
	inheritAttrs: false,
	__name: "TabsItem",
	props: {
		id: {},
		value: {},
		disabled: {},
		namespace: { default: "v0:tabs" },
		ariaLabel: {},
		ariaLabelledby: {},
		ariaDescribedby: {},
		el: {},
		as: { default: "button" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const rootRef = useTemplateRef("root");
		const tabs = useTabsRoot(__props.namespace);
		const el = toRef(() => /* @__PURE__ */ toElement(__props.el) ?? /* @__PURE__ */ toElement(rootRef.value?.element) ?? void 0);
		const ticket = tabs.register({
			id: __props.id,
			value: __props.value,
			disabled: () => toValue(__props.disabled) ?? false,
			el
		});
		const isDisabled = toRef(() => toValue(ticket.disabled) || toValue(tabs.disabled));
		const tabId = toRef(() => `${tabs.rootId}-tab-${ticket.id}`);
		const panelId = toRef(() => `${tabs.rootId}-panel-${ticket.id}`);
		onBeforeUnmount(() => {
			tabs.unregister(ticket.id);
		});
		function focusSelectedTab() {
			nextTick(() => {
				const selected = tabs.selectedItem.value;
				if (selected) (/* @__PURE__ */ toElement(selected.el))?.focus();
			});
		}
		function focusAdjacent(direction) {
			const all = tabs.values();
			const current = all.findIndex((t) => t.id === ticket.id);
			const length = all.length;
			const circular = tabs.circular.value;
			let index = current + direction;
			let hops = 0;
			while (hops < length) {
				if (circular) index = (index % length + length) % length;
				else if (index < 0 || index >= length) return;
				const item = all[index];
				if (item && !toValue(item.disabled)) {
					nextTick(() => (/* @__PURE__ */ toElement(item.el))?.focus());
					return;
				}
				index += direction;
				hops++;
			}
		}
		function focusEdge(edge) {
			const item = tabs.seek(edge);
			if (item) nextTick(() => (/* @__PURE__ */ toElement(item.el))?.focus());
		}
		function onKeydown(e) {
			const isHorizontal = tabs.orientation.value === "horizontal";
			const manual = tabs.activation.value === "manual";
			if (isHorizontal && e.key === "ArrowRight" || !isHorizontal && e.key === "ArrowDown") {
				e.preventDefault();
				if (manual) focusAdjacent(1);
				else {
					tabs.next();
					focusSelectedTab();
				}
				return;
			}
			if (isHorizontal && e.key === "ArrowLeft" || !isHorizontal && e.key === "ArrowUp") {
				e.preventDefault();
				if (manual) focusAdjacent(-1);
				else {
					tabs.prev();
					focusSelectedTab();
				}
				return;
			}
			if (e.key === "Home") {
				e.preventDefault();
				if (manual) focusEdge("first");
				else {
					tabs.first();
					focusSelectedTab();
				}
				return;
			}
			if (e.key === "End") {
				e.preventDefault();
				if (manual) focusEdge("last");
				else {
					tabs.last();
					focusSelectedTab();
				}
				return;
			}
			if (manual && (e.key === "Enter" || e.key === " ")) {
				e.preventDefault();
				ticket.select();
			}
		}
		function onClick() {
			if (!isDisabled.value) ticket.select();
		}
		function onFocus() {
			if (tabs.activation.value === "automatic" && !isDisabled.value) ticket.select();
		}
		const slotProps = toRef(() => ({
			id: String(ticket.id),
			isSelected: toValue(ticket.isSelected),
			isDisabled: toValue(isDisabled),
			select: ticket.select,
			attrs: {
				"id": tabId.value,
				"role": "tab",
				"tabindex": toValue(ticket.isSelected) ? 0 : -1,
				"aria-selected": toValue(ticket.isSelected),
				"aria-controls": panelId.value,
				"aria-disabled": toValue(isDisabled),
				"aria-label": __props.ariaLabel,
				"aria-labelledby": __props.ariaLabelledby,
				"aria-describedby": __props.ariaDescribedby,
				"data-selected": toValue(ticket.isSelected) || void 0,
				"data-disabled": toValue(isDisabled) || void 0,
				"disabled": __props.as === "button" ? toValue(isDisabled) : void 0,
				"type": __props.as === "button" ? "button" : void 0,
				"onClick": onClick,
				"onKeydown": onKeydown,
				"onFocus": onFocus
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({ ref: "root" }, mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Tabs/TabsPanel.vue
const _sfc_main$17 = /*@__PURE__*/ defineComponent({
	name: "TabsPanel",
	inheritAttrs: false,
	__name: "TabsPanel",
	props: {
		value: {},
		namespace: { default: "v0:tabs" },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const tabs = useTabsRoot(__props.namespace);
		const ticket = toRef(() => {
			const ids = tabs.browse(__props.value);
			if (ids && ids.length > 0) return tabs.get(ids[0]) ?? null;
			return null;
		});
		const isSelected = toRef(() => {
			const t = ticket.value;
			return t ? toValue(t.isSelected) : false;
		});
		const ticketId = toRef(() => ticket.value?.id ?? __props.value);
		const panelId = toRef(() => `${tabs.rootId}-panel-${ticketId.value}`);
		const tabId = toRef(() => `${tabs.rootId}-tab-${ticketId.value}`);
		const slotProps = toRef(() => ({
			isSelected: isSelected.value,
			attrs: {
				"id": panelId.value,
				"role": "tabpanel",
				"aria-labelledby": tabId.value,
				"tabindex": isSelected.value ? 0 : -1,
				"hidden": !isSelected.value,
				"data-selected": isSelected.value || void 0
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Tabs/index.ts
/**
* Tabs component with sub-components for building accessible tab interfaces.
*
* @see https://0.vuetifyjs.com/components/disclosure/tabs
*
* @example
* ```vue
* <script lang="ts" setup>
*   import { Tabs } from '@vuetify/v0'
*
*   const selected = ref('profile')
* <\/script>
*
* <template>
*   <Tabs.Root v-model="selected">
*     <Tabs.List label="Account settings">
*       <Tabs.Item value="profile">Profile</Tabs.Item>
*       <Tabs.Item value="password">Password</Tabs.Item>
*       <Tabs.Item value="billing" disabled>Billing</Tabs.Item>
*     </Tabs.List>
*
*     <Tabs.Panel value="profile">Profile content</Tabs.Panel>
*     <Tabs.Panel value="password">Password content</Tabs.Panel>
*     <Tabs.Panel value="billing">Billing content</Tabs.Panel>
*   </Tabs.Root>
* </template>
* ```
*/
const Tabs = {
	/**
	* Root component that provides tabs context.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/tabs
	*/
	Root: _sfc_main$20,
	/**
	* Container for tab triggers with tablist role.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/tabs
	*/
	List: _sfc_main$19,
	/**
	* Individual tab trigger.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/tabs
	*/
	Item: _sfc_main$18,
	/**
	* Content panel associated with a tab.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/tabs
	*/
	Panel: _sfc_main$17
};
//#endregion
//#region src/components/Theme/Theme.vue
const _sfc_main$16 = /*@__PURE__*/ defineComponent({
	name: "Theme",
	inheritAttrs: false,
	__name: "Theme",
	props: {
		theme: {},
		namespace: { default: "v0:theme" },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const parent = useTheme();
		const selectedId = toRef(() => __props.theme ?? parent.selectedId.value);
		const isDark = toRef(() => {
			if (!selectedId.value) return parent.isDark.value;
			return parent.get(selectedId.value)?.dark ?? parent.isDark.value;
		});
		const context = {
			...parent,
			selectedId,
			isDark,
			selectedItem: toRef(() => {
				if (!selectedId.value) return parent.selectedItem.value;
				return parent.get(selectedId.value) ?? parent.selectedItem.value;
			}),
			selectedIndex: toRef(() => {
				if (!selectedId.value) return parent.selectedIndex.value;
				return parent.get(selectedId.value)?.index ?? -1;
			}),
			selectedValue: toRef(() => {
				if (!selectedId.value) return parent.selectedValue.value;
				return parent.get(selectedId.value)?.value;
			})
		};
		provideContext(__props.namespace, context);
		const attrs = toRef(() => ({ "data-theme": selectedId.value }));
		const slotProps = toRef(() => ({
			attrs: attrs.value,
			theme: selectedId.value,
			isDark: isDark.value
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				as: __props.as,
				"data-theme": selectedId.value,
				renderless: __props.renderless
			}, _ctx.$attrs), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, [
				"as",
				"data-theme",
				"renderless"
			]);
		};
	}
});
//#endregion
//#region src/components/Toggle/ToggleGroup.vue
const [useToggleGroup, provideToggleGroup] = createContext();
const _sfc_main$15 = /*@__PURE__*/ defineComponent({
	name: "ToggleGroup",
	__name: "ToggleGroup",
	props: /*@__PURE__*/ mergeModels({
		namespace: { default: "v0:toggle:group" },
		disabled: {
			type: Boolean,
			default: false
		},
		multiple: {
			type: Boolean,
			default: false
		},
		mandatory: {
			type: [Boolean, String],
			default: false
		},
		orientation: { default: "horizontal" },
		label: {},
		ariaLabelledby: {},
		ariaDescribedby: {},
		as: { default: "div" },
		renderless: { type: Boolean }
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["update:model-value"], ["update:modelValue"]),
	setup(__props) {
		const model = useModel(__props, "modelValue");
		const selection = __props.multiple ? createGroup({
			disabled: toRef(() => __props.disabled),
			mandatory: toRef(() => __props.mandatory),
			events: true
		}) : createSingle({
			disabled: toRef(() => __props.disabled),
			mandatory: toRef(() => __props.mandatory),
			events: true
		});
		useProxyModel(selection, model, { multiple: toRef(() => __props.multiple) });
		provideToggleGroup(__props.namespace, {
			disabled: toRef(() => __props.disabled),
			orientation: toRef(() => __props.orientation),
			selection
		});
		const slotProps = toRef(() => ({
			isDisabled: toValue(__props.disabled),
			attrs: {
				"role": "group",
				"aria-label": __props.label || void 0,
				"aria-labelledby": __props.ariaLabelledby || void 0,
				"aria-describedby": __props.ariaDescribedby || void 0,
				"aria-orientation": __props.orientation,
				"aria-disabled": __props.disabled,
				"data-orientation": __props.orientation,
				"data-disabled": __props.disabled ? true : void 0
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Toggle/ToggleRoot.vue
const [useToggleRoot, provideToggleRoot] = createContext();
const _sfc_main$14 = /*@__PURE__*/ defineComponent({
	name: "ToggleRoot",
	inheritAttrs: false,
	__name: "ToggleRoot",
	props: /*@__PURE__*/ mergeModels({
		id: { default: () => /* @__PURE__ */ useId$1() },
		value: {},
		disabled: {
			type: Boolean,
			default: false
		},
		namespace: { default: "v0:toggle:root" },
		groupNamespace: { default: "v0:toggle:group" },
		as: { default: "button" },
		renderless: { type: Boolean }
	}, {
		"modelValue": { type: Boolean },
		"modelModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["update:model-value"], ["update:modelValue"]),
	setup(__props) {
		const attrs = useAttrs();
		let group = null;
		try {
			group = useToggleGroup(__props.groupNamespace);
		} catch {}
		const model = useModel(__props, "modelValue");
		const pressed = shallowRef(model.value ?? false);
		watch(() => model.value, (v) => {
			pressed.value = v ?? false;
		});
		const ticket = group?.selection.register({
			id: __props.id,
			value: __props.value,
			disabled: () => toValue(__props.disabled) ?? false
		});
		const isPressed = toRef(() => ticket ? toValue(ticket.isSelected) : pressed.value);
		const isDisabled = toRef(() => group && ticket ? toValue(ticket.disabled) || toValue(group.disabled) : __props.disabled);
		function toggle() {
			if (isDisabled.value) return;
			if (ticket) ticket.toggle();
			else {
				pressed.value = !pressed.value;
				model.value = pressed.value;
			}
		}
		function onClick() {
			toggle();
		}
		function onKeydown(e) {
			if (e.key !== " " && e.key !== "Enter") return;
			e.preventDefault();
			toggle();
		}
		onBeforeUnmount(() => {
			ticket?.unregister();
		});
		const context = {
			isPressed,
			isDisabled,
			toggle
		};
		provideToggleRoot(__props.namespace, context);
		const slotProps = toRef(() => ({
			isPressed: isPressed.value,
			isDisabled: isDisabled.value,
			toggle,
			attrs: {
				"type": __props.as === "button" ? "button" : void 0,
				"role": __props.as === "button" ? void 0 : "button",
				"aria-pressed": isPressed.value,
				"aria-disabled": __props.as === "button" ? void 0 : isDisabled.value,
				"disabled": __props.as === "button" ? isDisabled.value : void 0,
				"tabindex": isDisabled.value ? -1 : 0,
				"data-state": isPressed.value ? "on" : "off",
				"data-disabled": isDisabled.value ? true : void 0,
				"onClick": onClick,
				"onKeydown": __props.as === "button" ? void 0 : onKeydown
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(mergeProps(unref(attrs), slotProps.value.attrs), {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Toggle/ToggleIndicator.vue
const _sfc_main$13 = /*@__PURE__*/ defineComponent({
	name: "ToggleIndicator",
	__name: "ToggleIndicator",
	props: {
		namespace: { default: "v0:toggle:root" },
		as: { default: "span" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const root = useToggleRoot(__props.namespace);
		const isPressed = toRef(() => toValue(root.isPressed));
		const slotProps = toRef(() => ({
			isPressed: isPressed.value,
			attrs: {
				"data-state": isPressed.value ? "on" : "off",
				"style": { visibility: isPressed.value ? "visible" : "hidden" }
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Toggle/index.ts
/**
* Toggle component with sub-components for pressable on/off buttons.
*
* @see https://0.vuetifyjs.com/components/actions/toggle
*
* @example
* ```vue
* <script setup lang="ts">
*   import { Toggle } from '@vuetify/v0'
* <\/script>
*
* <template>
*   <Toggle.Root>
*     <Toggle.Indicator>✓</Toggle.Indicator>
*     Bold
*   </Toggle.Root>
* </template>
* ```
*/
const Toggle = {
	/**
	* Group container managing selection across child Toggle.Root components.
	*
	* @see https://0.vuetifyjs.com/components/actions/toggle
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Toggle } from '@vuetify/v0'
	*   import { ref } from 'vue'
	*
	*   const alignment = ref('left')
	* <\/script>
	*
	* <template>
	*   <Toggle.Group v-model="alignment">
	*     <Toggle.Root value="left">Left</Toggle.Root>
	*     <Toggle.Root value="center">Center</Toggle.Root>
	*     <Toggle.Root value="right">Right</Toggle.Root>
	*   </Toggle.Group>
	* </template>
	* ```
	*/
	Group: _sfc_main$15,
	/**
	* Visual indicator for the pressed state.
	*
	* Renders as a span and only displays when pressed.
	* Must be used within a Toggle.Root component.
	*
	* @see https://0.vuetifyjs.com/components/actions/toggle
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Toggle } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Toggle.Root>
	*     <Toggle.Indicator>✓</Toggle.Indicator>
	*   </Toggle.Root>
	* </template>
	* ```
	*/
	Indicator: _sfc_main$13,
	/**
	* Pressable toggle button with on/off state.
	*
	* Supports standalone mode with v-model (boolean) or group mode
	* within Toggle.Group where pressed state is derived from selection.
	*
	* @see https://0.vuetifyjs.com/components/actions/toggle
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Toggle } from '@vuetify/v0'
	*   import { ref } from 'vue'
	*
	*   const bold = ref(false)
	* <\/script>
	*
	* <template>
	*   <Toggle.Root v-model="bold">Bold</Toggle.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$14
};
//#endregion
//#region src/components/Tooltip/TooltipRoot.vue
const [useTooltipRoot, provideTooltipRoot] = createContext({ suffix: "root" });
const _sfc_main$12 = /*@__PURE__*/ defineComponent({
	name: "TooltipRoot",
	__name: "TooltipRoot",
	props: /*@__PURE__*/ mergeModels({
		openDelay: {},
		closeDelay: {},
		disabled: {
			type: Boolean,
			default: false
		},
		interactive: {
			type: Boolean,
			default: false
		},
		positionArea: { default: "top" },
		positionTry: { default: "most-height top" },
		namespace: { default: "v0:tooltip" },
		adapter: {},
		as: { default: null },
		renderless: { type: Boolean }
	}, {
		"modelValue": {
			type: Boolean,
			default: false
		},
		"modelModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["update:model-value"], ["update:modelValue"]),
	setup(__props) {
		const isOpen = useModel(__props, "modelValue");
		const region = useTooltip();
		const isDisabled = toRef(() => __props.disabled || region.disabled.value);
		const popover = usePopover({
			isOpen,
			positionArea: () => __props.positionArea,
			positionTry: () => __props.positionTry,
			adapter: __props.adapter ?? region.adapter
		});
		const skipped = shallowRef(false);
		const delay = useDelay((direction) => {
			if (direction && isDisabled.value) return;
			isOpen.value = direction;
			if (!direction) skipped.value = false;
		}, {
			openDelay: toRef(() => skipped.value ? 0 : __props.openDelay ?? region.openDelay.value),
			closeDelay: toRef(() => __props.closeDelay ?? region.closeDelay.value)
		});
		function open(instant = false) {
			if (isDisabled.value) return;
			skipped.value = instant || region.shouldSkipOpenDelay();
			delay.start(true);
		}
		function close() {
			delay.start(false);
		}
		function cancel() {
			delay.stop();
		}
		let registered = false;
		watch(isOpen, (value) => {
			if (value && !registered) {
				region.register({ id: popover.id });
				registered = true;
			} else if (!value && registered) {
				region.unregister(popover.id);
				registered = false;
			}
		}, { immediate: true });
		onBeforeUnmount(() => {
			if (registered) region.unregister(popover.id);
		});
		const dataState = toRef(() => {
			return isOpen.value ? skipped.value ? "instant-open" : "delayed-open" : "closed";
		});
		const context = {
			id: popover.id,
			isOpen,
			isDisabled,
			isInteractive: toRef(() => __props.interactive),
			dataState,
			open,
			close,
			cancel,
			contentAttrs: popover.contentAttrs,
			contentStyles: popover.contentStyles,
			anchorStyles: popover.anchorStyles,
			attach: popover.attach,
			attachAnchor: popover.attachAnchor
		};
		provideTooltipRoot(__props.namespace, context);
		const slotProps = toRef(() => ({
			isOpen: isOpen.value,
			isDisabled: isDisabled.value
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), {
				as: __props.as,
				renderless: ""
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 8, ["as"]);
		};
	}
});
//#endregion
//#region src/components/Tooltip/TooltipActivator.vue
const _sfc_main$11 = /*@__PURE__*/ defineComponent({
	name: "TooltipActivator",
	inheritAttrs: false,
	__name: "TooltipActivator",
	props: {
		namespace: { default: "v0:tooltip" },
		as: { default: "button" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const root = useTooltipRoot(__props.namespace);
		const atomRef = useTemplateRef("atom");
		root.attachAnchor(() => /* @__PURE__ */ toElement(atomRef.value?.element) ?? null);
		function onPointerenter(e) {
			if (e.pointerType === "touch") return;
			root.open();
		}
		function onPointerleave(e) {
			if (e.pointerType === "touch") return;
			root.close();
		}
		function onFocus(e) {
			if (!e.target.matches(":focus-visible")) return;
			root.cancel();
			root.open(true);
		}
		function onBlur() {
			root.cancel();
			root.close();
		}
		function onClick() {
			root.close();
		}
		function onKeydown(e) {
			if (e.key === "Escape") root.close();
		}
		const slotProps = toRef(() => ({
			isOpen: root.isOpen.value,
			isDisabled: root.isDisabled.value,
			attrs: {
				"aria-describedby": root.id,
				"data-state": root.dataState.value,
				"aria-disabled": __props.as === "button" ? void 0 : root.isDisabled.value,
				"disabled": __props.as === "button" ? root.isDisabled.value : void 0,
				"type": __props.as === "button" ? "button" : void 0,
				"data-disabled": root.isDisabled.value || void 0,
				"onPointerenter": onPointerenter,
				"onPointerleave": onPointerleave,
				"onFocus": onFocus,
				"onBlur": onBlur,
				"onClick": onClick,
				"onKeydown": onKeydown
			},
			styles: root.anchorStyles.value
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				ref: "atom",
				as: __props.as,
				renderless: __props.renderless,
				style: unref(root).anchorStyles.value
			}, mergeProps(unref(attrs), slotProps.value.attrs)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, [
				"as",
				"renderless",
				"style"
			]);
		};
	}
});
//#endregion
//#region src/components/Tooltip/TooltipContent.vue
const _sfc_main$10 = /*@__PURE__*/ defineComponent({
	name: "TooltipContent",
	inheritAttrs: false,
	__name: "TooltipContent",
	props: {
		namespace: { default: "v0:tooltip" },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const attrs = useAttrs();
		const atomRef = useTemplateRef("atom");
		const root = useTooltipRoot(__props.namespace);
		root.attach(() => atomRef.value?.element);
		function onPointerenter() {
			if (!root.isInteractive.value) return;
			root.cancel();
		}
		function onPointerleave() {
			if (!root.isInteractive.value) return;
			root.close();
		}
		function onKeydown(e) {
			if (e.key === "Escape") root.close();
		}
		const slotProps = toRef(() => ({
			isOpen: root.isOpen.value,
			isInteractive: root.isInteractive.value,
			attrs: {
				...root.contentAttrs.value,
				"role": "tooltip",
				"data-state": root.dataState.value,
				"data-interactive": root.isInteractive.value || void 0,
				"onPointerenter": onPointerenter,
				"onPointerleave": onPointerleave,
				"onKeydown": onKeydown
			},
			styles: root.contentStyles.value
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({
				ref: "atom",
				as: __props.as,
				renderless: __props.renderless,
				style: slotProps.value.styles
			}, mergeProps(unref(attrs), slotProps.value.attrs)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, [
				"as",
				"renderless",
				"style"
			]);
		};
	}
});
//#endregion
//#region src/components/Tooltip/index.ts
/**
* Tooltip compound component.
*
* @see https://0.vuetifyjs.com/components/disclosure/tooltip
*
* @example
* ```vue
* <script lang="ts" setup>
*   import { Tooltip } from '@vuetify/v0'
* <\/script>
*
* <template>
*   <Tooltip.Root>
*     <Tooltip.Activator>Hover me</Tooltip.Activator>
*     <Tooltip.Content>Helpful description</Tooltip.Content>
*   </Tooltip.Root>
* </template>
* ```
*/
const Tooltip = {
	/**
	* Root of a single tooltip instance; coordinates delay, state, and anchoring.
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Tooltip } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Tooltip.Root>
	*     <Tooltip.Activator>Hover me</Tooltip.Activator>
	*     <Tooltip.Content>Helpful description</Tooltip.Content>
	*   </Tooltip.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$12,
	/**
	* Trigger element that opens the tooltip on hover/focus.
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Tooltip } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Tooltip.Activator>Hover me</Tooltip.Activator>
	* </template>
	* ```
	*/
	Activator: _sfc_main$11,
	/**
	* Floating content shown while the tooltip is open.
	*
	* @example
	* ```vue
	* <script lang="ts" setup>
	*   import { Tooltip } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Tooltip.Content>Helpful description</Tooltip.Content>
	* </template>
	* ```
	*/
	Content: _sfc_main$10
};
//#endregion
//#region src/components/Treeview/TreeviewRoot.vue
const [useTreeviewRoot, provideTreeviewRoot] = createContext();
const _sfc_main$9 = /*@__PURE__*/ defineComponent({
	name: "TreeviewRoot",
	__name: "TreeviewRoot",
	props: /*@__PURE__*/ mergeModels({
		namespace: { default: "v0:treeview" },
		disabled: {
			type: Boolean,
			default: false
		},
		enroll: {
			type: Boolean,
			default: false
		},
		mandatory: {
			type: [Boolean, String],
			default: false
		},
		multiple: {
			type: Boolean,
			default: true
		},
		open: { default: "multiple" },
		openAll: {
			type: Boolean,
			default: false
		},
		reveal: {
			type: Boolean,
			default: false
		},
		selection: { default: "cascade" },
		active: { default: "single" }
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["update:model-value"], ["update:modelValue"]),
	setup(__props) {
		const model = useModel(__props, "modelValue");
		const nested = createNested({
			disabled: toRef(() => __props.disabled),
			enroll: toRef(() => __props.enroll),
			mandatory: toRef(() => __props.mandatory),
			multiple: toRef(() => __props.multiple),
			open: __props.open,
			openAll: __props.openAll,
			reveal: __props.reveal,
			selection: __props.selection,
			active: __props.active,
			events: true
		});
		useProxyModel(nested, model, { multiple: __props.multiple });
		provideTreeviewRoot(__props.namespace, nested);
		const slotProps = toRef(() => ({
			isDisabled: toValue(nested.disabled),
			isNoneSelected: nested.isNoneSelected.value,
			isAllSelected: nested.isAllSelected.value,
			isMixed: nested.isMixed.value,
			select: nested.select,
			unselect: nested.unselect,
			toggle: nested.toggle,
			selectAll: nested.selectAll,
			unselectAll: nested.unselectAll,
			expandAll: nested.expandAll,
			collapseAll: nested.collapseAll
		}));
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)));
		};
	}
});
//#endregion
//#region src/components/Treeview/TreeviewList.vue
const FOCUSABLE = "a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]";
const [useTreeviewList, provideTreeviewList] = createContext({ suffix: "list" });
const _sfc_main$8 = /*@__PURE__*/ defineComponent({
	name: "TreeviewList",
	__name: "TreeviewList",
	props: {
		namespace: { default: "v0:treeview" },
		multiselectable: { type: Boolean },
		label: {},
		as: { default: "ul" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const nested = useTreeviewRoot(__props.namespace);
		const roving = useRovingFocus(() => nested.visibleItems().map((item) => ({
			id: item.id,
			el: item.el,
			disabled: toRef(() => toValue(item.disabled))
		})), { orientation: "vertical" });
		provideTreeviewList(__props.namespace, roving);
		function onFocusin(e) {
			const target = e.target;
			if (target.getAttribute("role") !== "treeitem") return;
			const match = nested.visibleItems().find((item) => toValue(item.el) === target);
			if (match && roving.focusedId.value !== match.id) roving.focusedId.value = match.id;
		}
		function expandable(ticket) {
			/* v8 ignore next -- defensive: callers always pass a registered ticket */
			if (!ticket) return false;
			return (toValue(ticket.el)?.hasAttribute("aria-expanded") ?? false) || !toValue(ticket.isLeaf);
		}
		function isRtl(e) {
			/* v8 ignore next -- IN_BROWSER always true in happy-dom test env */
			if (!IN_BROWSER) return false;
			const el = e.currentTarget;
			/* v8 ignore next -- defensive: keydown handlers always have a currentTarget */
			return el ? getComputedStyle(el).direction === "rtl" : false;
		}
		function openOrChild(ticket) {
			if (expandable(ticket) && !toValue(ticket.isOpen)) nested.open(ticket.id);
			else if (toValue(ticket.isOpen)) {
				const childIds = nested.children.get(ticket.id);
				if (childIds?.length) roving.focus(childIds[0]);
			}
		}
		function closeOrParent(ticket) {
			if (toValue(ticket.isOpen) && expandable(ticket)) nested.close(ticket.id);
			else if (!/* @__PURE__ */ isNullOrUndefined(ticket.parentId)) roving.focus(ticket.parentId);
		}
		function focusableChildren(el) {
			return Array.from(el.querySelectorAll(FOCUSABLE)).filter((child) => child.getAttribute("tabindex") !== "-1" && child.getAttribute("aria-disabled") !== "true" && child.closest("[role=\"treeitem\"]") === el);
		}
		function nextItemId(id) {
			/* v8 ignore next -- defensive: source is always a registered visible item */
			if (/* @__PURE__ */ isNullOrUndefined(id)) return void 0;
			const visible = nested.visibleItems();
			const index = visible.findIndex((item) => item.id === id);
			/* v8 ignore next -- defensive: a registered item is always found in visibleItems */
			if (index === -1) return void 0;
			return visible.slice(index + 1).find((item) => !toValue(item.disabled))?.id;
		}
		function onKeydown(e) {
			const target = e.target;
			const itemEl = target.closest("[role=\"treeitem\"]");
			const onItem = target === e.currentTarget || target.getAttribute("role") === "treeitem";
			if (e.key === "Tab") {
				if (!itemEl) return;
				const controls = focusableChildren(itemEl);
				if (controls.length === 0) return;
				if (!e.shiftKey && onItem) {
					e.preventDefault();
					controls[0].focus();
				} else if (!e.shiftKey && target === controls.at(-1)) {
					const source = nested.visibleItems().find((item) => toValue(item.el) === itemEl)?.id;
					const next = nextItemId(source);
					if (!/* @__PURE__ */ isNullOrUndefined(next)) {
						e.preventDefault();
						roving.focus(next);
					}
				} else if (e.shiftKey && target === controls[0]) {
					e.preventDefault();
					itemEl.focus();
				}
				return;
			}
			if (!onItem) return;
			const id = roving.focusedId.value;
			const ticket = /* @__PURE__ */ isNullOrUndefined(id) ? void 0 : nested.get(id);
			const rtl = isRtl(e);
			switch (e.key) {
				case "ArrowUp":
					e.preventDefault();
					roving.prev();
					break;
				case "ArrowDown":
					e.preventDefault();
					roving.next();
					break;
				case "ArrowRight":
					e.preventDefault();
					if (!ticket) break;
					if (rtl) closeOrParent(ticket);
					else openOrChild(ticket);
					break;
				case "ArrowLeft":
					e.preventDefault();
					if (!ticket) break;
					if (rtl) openOrChild(ticket);
					else closeOrParent(ticket);
					break;
				case "Home":
					e.preventDefault();
					roving.first();
					break;
				case "End":
					e.preventDefault();
					roving.last();
					break;
				case "Enter":
					e.preventDefault();
					if (ticket) {
						if (expandable(ticket)) nested.flip(ticket.id);
						nested.activate(ticket.id);
					}
					break;
				case " ":
					e.preventDefault();
					if (ticket) nested.toggle(ticket.id);
					break;
				case "*":
					e.preventDefault();
					if (ticket) {
						const sibs = nested.siblings(ticket.id);
						for (const sibId of sibs) if (expandable(nested.get(sibId))) nested.open(sibId);
					}
			}
		}
		const slotProps = toRef(() => ({ attrs: {
			"role": "tree",
			/* v8 ignore next -- nested.multiple fallback used when multiselectable prop is undefined */
			"aria-multiselectable": __props.multiselectable ?? nested.multiple,
			"aria-label": __props.label || void 0,
			onKeydown,
			onFocusin
		} }));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Treeview/TreeviewItem.vue
const [useTreeviewItem, provideTreeviewItem] = createContext({ suffix: "item" });
const _sfc_main$7 = /*@__PURE__*/ defineComponent({
	name: "TreeviewItem",
	__name: "TreeviewItem",
	props: {
		id: {},
		value: {},
		disabled: {},
		namespace: { default: "v0:treeview" },
		as: { default: "li" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const nested = useTreeviewRoot(__props.namespace);
		const rootRef = useTemplateRef("root");
		const el = toRef(() => /* @__PURE__ */ toElement(rootRef.value?.element) ?? void 0);
		const parentId = useTreeviewItem(__props.namespace, null)?.ticket.id;
		const ticket = nested.register({
			id: __props.id,
			value: __props.value,
			disabled: () => toValue(__props.disabled) ?? false,
			parentId,
			el
		});
		const isDisabled = toRef(() => toValue(ticket.disabled) || toValue(nested.disabled));
		const hasContent = shallowRef(false);
		const roving = useTreeviewList(__props.namespace, null);
		onBeforeUnmount(() => nested.unregister(ticket.id));
		provideTreeviewItem(__props.namespace, {
			ticket,
			isDisabled,
			hasContent
		});
		const slotProps = toRef(() => ({
			id: ticket.id,
			value: __props.value,
			isSelected: toValue(ticket.isSelected),
			isMixed: toValue(ticket.isMixed),
			isDisabled: toValue(isDisabled),
			isOpen: toValue(ticket.isOpen),
			isActive: toValue(ticket.isActive),
			isLeaf: toValue(ticket.isLeaf),
			depth: toValue(ticket.depth),
			select: ticket.select,
			unselect: ticket.unselect,
			toggle: ticket.toggle,
			flip: ticket.flip,
			open: ticket.open,
			close: ticket.close,
			activate: ticket.activate,
			deactivate: ticket.deactivate,
			attrs: {
				"role": "treeitem",
				"aria-disabled": toValue(isDisabled),
				"aria-expanded": hasContent.value ? toValue(ticket.isOpen) : void 0,
				"aria-level": toValue(ticket.depth) + 1,
				"aria-posinset": ticket.position(),
				"aria-current": toValue(ticket.isActive) ? "true" : void 0,
				"aria-selected": toValue(ticket.isSelected),
				"aria-setsize": ticket.siblings().length,
				"data-active": toValue(ticket.isActive) || void 0,
				"data-disabled": toValue(isDisabled) || void 0,
				"data-open": toValue(ticket.isOpen) || void 0,
				"data-selected": toValue(ticket.isSelected) || void 0,
				"tabindex": roving ? roving.isTabbable(ticket.id) ? 0 : -1 : void 0,
				"style": { "--v0-treeview-depth": toValue(ticket.depth) }
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps({ ref: "root" }, slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Treeview/TreeviewActivator.vue
const _sfc_main$6 = /*@__PURE__*/ defineComponent({
	name: "TreeviewActivator",
	__name: "TreeviewActivator",
	props: {
		namespace: { default: "v0:treeview" },
		as: { default: "button" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const item = useTreeviewItem(__props.namespace);
		const slotProps = toRef(() => ({
			isOpen: toValue(item.ticket.isOpen),
			isLeaf: toValue(item.ticket.isLeaf),
			isDisabled: item.isDisabled.value,
			flip: item.ticket.flip,
			attrs: {
				"role": __props.as === "button" ? void 0 : "button",
				"tabindex": -1,
				"aria-disabled": item.isDisabled.value,
				"data-disabled": item.isDisabled.value || void 0,
				"data-open": toValue(item.ticket.isOpen) || void 0,
				"disabled": __props.as === "button" ? item.isDisabled.value : void 0,
				"type": __props.as === "button" ? "button" : void 0,
				"onClick": item.ticket.flip
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Treeview/TreeviewCheckbox.vue
const _sfc_main$5 = /*@__PURE__*/ defineComponent({
	name: "TreeviewCheckbox",
	__name: "TreeviewCheckbox",
	props: {
		namespace: { default: "v0:treeview" },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const item = useTreeviewItem(__props.namespace);
		const slotProps = toRef(() => ({
			isSelected: toValue(item.ticket.isSelected),
			isMixed: toValue(item.ticket.isMixed),
			isDisabled: item.isDisabled.value,
			toggle: item.ticket.toggle,
			select: item.ticket.select,
			unselect: item.ticket.unselect,
			attrs: {
				"role": "checkbox",
				"aria-checked": toValue(item.ticket.isMixed) ? "mixed" : toValue(item.ticket.isSelected),
				"aria-disabled": item.isDisabled.value,
				"tabindex": -1,
				"data-selected": toValue(item.ticket.isSelected) || void 0,
				"data-disabled": item.isDisabled.value || void 0,
				"data-mixed": toValue(item.ticket.isMixed) || void 0,
				"onClick": item.ticket.toggle
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Treeview/TreeviewContent.vue
const _sfc_main$4 = /*@__PURE__*/ defineComponent({
	name: "TreeviewContent",
	__name: "TreeviewContent",
	props: { namespace: { default: "v0:treeview" } },
	setup(__props) {
		const item = useTreeviewItem(__props.namespace);
		item.hasContent.value = true;
		onDeactivated(() => {
			item.hasContent.value = false;
		});
		onActivated(() => {
			item.hasContent.value = true;
		});
		onBeforeUnmount(() => {
			item.hasContent.value = false;
		});
		return (_ctx, _cache) => {
			return toValue(unref(item).ticket.isOpen) ? renderSlot(_ctx.$slots, "default", { isOpen: toValue(unref(item).ticket.isOpen) }, void 0, void 0, 0) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region src/components/Treeview/TreeviewCue.vue
const _sfc_main$3 = /*@__PURE__*/ defineComponent({
	name: "TreeviewCue",
	__name: "TreeviewCue",
	props: {
		namespace: { default: "v0:treeview" },
		as: { default: "span" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const item = useTreeviewItem(__props.namespace);
		const isOpen = toRef(() => toValue(item.ticket.isOpen));
		const state = toRef(() => isOpen.value ? "open" : "closed");
		const slotProps = toRef(() => ({
			isOpen: isOpen.value,
			isLeaf: !item.hasContent.value,
			attrs: {
				"aria-hidden": true,
				"data-state": state.value,
				"style": { visibility: item.hasContent.value ? "visible" : "hidden" }
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Treeview/TreeviewGroup.vue
const _sfc_main$2 = /*@__PURE__*/ defineComponent({
	name: "TreeviewGroup",
	__name: "TreeviewGroup",
	props: {
		as: { default: "ul" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const slotProps = toRef(() => ({ attrs: { role: "group" } }));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Treeview/TreeviewIndicator.vue
const _sfc_main$1 = /*@__PURE__*/ defineComponent({
	name: "TreeviewIndicator",
	__name: "TreeviewIndicator",
	props: {
		namespace: { default: "v0:treeview" },
		as: { default: "span" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const item = useTreeviewItem(__props.namespace);
		const isSelected = toRef(() => toValue(item.ticket.isSelected));
		const isMixed = toRef(() => toValue(item.ticket.isMixed));
		const isVisible = toRef(() => isSelected.value || isMixed.value);
		const state = toRef(() => isMixed.value ? "indeterminate" : isSelected.value ? "checked" : "unchecked");
		const slotProps = toRef(() => ({
			isSelected: isSelected.value,
			isMixed: isMixed.value,
			attrs: {
				"aria-hidden": true,
				"data-state": state.value,
				"style": { visibility: isVisible.value ? "visible" : "hidden" }
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Treeview/TreeviewSelectAll.vue
const _sfc_main = /*@__PURE__*/ defineComponent({
	name: "TreeviewSelectAll",
	__name: "TreeviewSelectAll",
	props: {
		label: {},
		disabled: {
			type: Boolean,
			default: false
		},
		namespace: { default: "v0:treeview" },
		as: { default: "div" },
		renderless: { type: Boolean }
	},
	setup(__props) {
		const nested = useTreeviewRoot(__props.namespace);
		const isAllSelected = toRef(() => nested.isAllSelected.value);
		const isMixed = toRef(() => nested.isMixed.value);
		const isDisabled = toRef(() => __props.disabled || toValue(nested.disabled));
		const state = toRef(() => isMixed.value ? "indeterminate" : isAllSelected.value ? "checked" : "unchecked");
		function onClick() {
			if (isDisabled.value) return;
			nested.toggleAll();
		}
		function onKeydown(e) {
			if (e.key !== "Enter" && e.key !== " ") return;
			e.preventDefault();
			if (isDisabled.value) return;
			nested.toggleAll();
		}
		function noop() {}
		const empty = [];
		provideTreeviewItem(__props.namespace, {
			ticket: {
				id: "__select-all__",
				index: -1,
				value: void 0,
				valueIsIndex: false,
				unregister: noop,
				disabled: isDisabled,
				isSelected: isAllSelected,
				select: nested.selectAll,
				unselect: nested.unselectAll,
				toggle: nested.toggleAll,
				isMixed,
				mix: noop,
				unmix: noop,
				el: void 0,
				parentId: void 0,
				isOpen: shallowRef(false),
				isActive: shallowRef(false),
				isLeaf: shallowRef(true),
				depth: shallowRef(0),
				open: noop,
				close: noop,
				flip: noop,
				reveal: noop,
				activate: noop,
				deactivate: noop,
				getPath: () => [],
				getAncestors: () => [],
				getDescendants: () => [],
				isAncestorOf: () => false,
				hasAncestor: () => false,
				siblings: () => empty,
				position: () => 0
			},
			isDisabled,
			hasContent: shallowRef(false)
		});
		const slotProps = toRef(() => ({
			label: __props.label,
			isAllSelected: isAllSelected.value,
			isMixed: isMixed.value,
			isDisabled: isDisabled.value,
			selectAll: nested.selectAll,
			unselectAll: nested.unselectAll,
			toggleAll: nested.toggleAll,
			attrs: {
				"role": "checkbox",
				"aria-checked": isMixed.value ? "mixed" : isAllSelected.value,
				"aria-disabled": isDisabled.value,
				"aria-label": __props.label || void 0,
				"tabindex": isDisabled.value ? void 0 : 0,
				"data-state": state.value,
				"data-disabled": isDisabled.value ? true : void 0,
				"onClick": onClick,
				"onKeydown": onKeydown
			}
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(_sfc_main$192), mergeProps(slotProps.value.attrs, {
				as: __props.as,
				renderless: __props.renderless
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps.value)))]),
				_: 3
			}, 16, ["as", "renderless"]);
		};
	}
});
//#endregion
//#region src/components/Treeview/index.ts
/**
* Treeview component with sub-components for hierarchical data.
*
* @see https://0.vuetifyjs.com/components/disclosure/treeview
*
* @example
* ```vue
* <script setup lang="ts">
*   import { Treeview } from '@vuetify/v0'
* <\/script>
*
* <template>
*   <Treeview.Root>
*     <Treeview.List>
*       <Treeview.Item>
*         <Treeview.Activator>Documents</Treeview.Activator>
*         <Treeview.Content>
*           <Treeview.Group>
*             <Treeview.Item>
*               <Treeview.Activator>Resume.pdf</Treeview.Activator>
*             </Treeview.Item>
*           </Treeview.Group>
*         </Treeview.Content>
*       </Treeview.Item>
*     </Treeview.List>
*   </Treeview.Root>
* </template>
* ```
*/
const Treeview = {
	/**
	* Root component that creates and provides the nested context.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/treeview
	*
	* @example
	* ```vue
	* <script setup lang="ts">
	*   import { Treeview } from '@vuetify/v0'
	* <\/script>
	*
	* <template>
	*   <Treeview.Root v-model="selected" :multiple="true">
	*     <Treeview.List>
	*       <Treeview.Item value="a">Node A</Treeview.Item>
	*     </Treeview.List>
	*   </Treeview.Root>
	* </template>
	* ```
	*/
	Root: _sfc_main$9,
	/**
	* Top-level list container with `role="tree"` and `aria-multiselectable`.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/treeview
	*
	* @example
	* ```vue
	* <Treeview.List label="File browser">
	*   <Treeview.Item>...</Treeview.Item>
	* </Treeview.List>
	* ```
	*/
	List: _sfc_main$8,
	/**
	* Tree node with `role="treeitem"`. Registers with the nearest Root context
	* and auto-nests under the closest ancestor Item.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/treeview
	*
	* @example
	* ```vue
	* <Treeview.Item id="docs" value="documents">
	*   <Treeview.Activator>Documents</Treeview.Activator>
	*   <Treeview.Content>
	*     <Treeview.Group>
	*       <Treeview.Item id="resume" value="resume.pdf">
	*         <Treeview.Activator>Resume.pdf</Treeview.Activator>
	*       </Treeview.Item>
	*     </Treeview.Group>
	*   </Treeview.Content>
	* </Treeview.Item>
	* ```
	*/
	Item: _sfc_main$7,
	/**
	* Click-to-toggle trigger for expand/collapse. Renders a button by default.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/treeview
	*
	* @example
	* ```vue
	* <Treeview.Activator v-slot="{ isOpen }">
	*   {{ isOpen ? '▼' : '▶' }} Documents
	* </Treeview.Activator>
	* ```
	*/
	Activator: _sfc_main$6,
	/**
	* Collapse gate for child nodes. Conditionally renders when the parent Item is open.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/treeview
	*
	* @example
	* ```vue
	* <Treeview.Content>
	*   <Treeview.Group>
	*     <Treeview.Item>...</Treeview.Item>
	*   </Treeview.Group>
	* </Treeview.Content>
	* ```
	*/
	Content: _sfc_main$4,
	/**
	* Visual cue for expand/collapse state. Hides itself on leaf nodes.
	* Exposes `data-state="open|closed"` for CSS-driven styling.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/treeview
	*
	* @example
	* ```vue
	* <Treeview.Cue v-slot="{ attrs }" renderless>
	*   <span v-bind="attrs">▶</span>
	* </Treeview.Cue>
	* ```
	*/
	Cue: _sfc_main$3,
	/**
	* Wrapper with `role="group"` for nested child items inside Content.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/treeview
	*
	* @example
	* ```vue
	* <Treeview.Content>
	*   <Treeview.Group>
	*     <Treeview.Item>Child A</Treeview.Item>
	*     <Treeview.Item>Child B</Treeview.Item>
	*   </Treeview.Group>
	* </Treeview.Content>
	* ```
	*/
	Group: _sfc_main$2,
	/**
	* Tri-state checkbox for selection. Toggles selection on click
	* and shows mixed state for partially-selected parents.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/treeview
	*
	* @example
	* ```vue
	* <Treeview.Checkbox v-slot="{ attrs, isSelected, isMixed }" renderless>
	*   <span v-bind="attrs">{{ isMixed ? '−' : isSelected ? '✓' : '○' }}</span>
	* </Treeview.Checkbox>
	* ```
	*/
	Checkbox: _sfc_main$5,
	/**
	* Visual indicator for selection state. Shows checked, unchecked,
	* or indeterminate via `data-state`.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/treeview
	*
	* @example
	* ```vue
	* <Treeview.Indicator v-slot="{ attrs }" renderless>
	*   <span v-bind="attrs">●</span>
	* </Treeview.Indicator>
	* ```
	*/
	Indicator: _sfc_main$1,
	/**
	* Select all checkbox for tree-wide multi-selection.
	*
	* Binds to parent TreeviewRoot's aggregate state. Reflects
	* isAllSelected/isMixed and calls toggleAll on click. Does NOT
	* register as a tree item. Must be used within a Treeview.Root.
	*
	* @see https://0.vuetifyjs.com/components/disclosure/treeview
	*
	* @example
	* ```vue
	* <Treeview.SelectAll v-slot="{ attrs, isAllSelected, isMixed }" renderless>
	*   <button v-bind="attrs">
	*     {{ isMixed ? '−' : isAllSelected ? '✓' : '○' }} Select All
	*   </button>
	* </Treeview.SelectAll>
	* ```
	*/
	SelectAll: _sfc_main
};
//#endregion
export { _sfc_main$28 as $, _sfc_main$160 as $i, Input as $n, _sfc_main$124 as $r, useRadioRoot as $t, provideToggleGroup as A, useAvatarRoot as Aa, _sfc_main$145 as Ai, providePaginationControls as An, Dialog as Ar, useSelectionRoot as At, Switch as B, _sfc_main$185 as Ba, provideCheckboxRoot as Bi, provideOverflowRoot as Bn, _sfc_main$114 as Br, useSelectContext as Bt, useTooltipRoot as C, useBreadcrumbsRoot as Ca, _sfc_main$140 as Ci, _sfc_main$73 as Cn, _sfc_main$105 as Cr, _sfc_main$41 as Ct, provideToggleRoot as D, _sfc_main$177 as Da, useComboboxContext as Di, _sfc_main$77 as Dn, _sfc_main$107 as Dr, _sfc_main$42 as Dt, _sfc_main$14 as E, _sfc_main$176 as Ea, provideComboboxContext as Ei, _sfc_main$76 as En, useExpansionPanelRoot as Er, Selection as Et, _sfc_main$18 as F, AlertDialog as Fa, Checkbox as Fi, usePaginationRoot as Fn, _sfc_main$112 as Fr, _sfc_main$47 as Ft, _sfc_main$25 as G, useAlertDialogContext as Ga, Carousel as Gi, _sfc_main$85 as Gn, _sfc_main$119 as Gr, _sfc_main$55 as Gt, _sfc_main$22 as H, _sfc_main$187 as Ha, _sfc_main$152 as Hi, NumberField as Hn, _sfc_main$116 as Hr, Rating as Ht, _sfc_main$19 as I, _sfc_main$181 as Ia, _sfc_main$148 as Ii, Overflow as In, _sfc_main$113 as Ir, _sfc_main$48 as It, _sfc_main$26 as J, _sfc_main$190 as Ja, _sfc_main$155 as Ji, _sfc_main$88 as Jn, provideDataTableRoot as Jr, Radio as Jt, provideSwitchRoot as K, Alert as Ka, _sfc_main$153 as Ki, _sfc_main$86 as Kn, _sfc_main$120 as Kr, provideRatingRoot as Kt, _sfc_main$20 as L, _sfc_main$182 as La, _sfc_main$149 as Li, _sfc_main$80 as Ln, provideDialogContext as Lr, _sfc_main$49 as Lt, _sfc_main$16 as M, provideAvatarGroup as Ma, _sfc_main$147 as Mi, providePaginationRoot as Mn, _sfc_main$109 as Mr, _sfc_main$44 as Mt, Tabs as N, useAvatarGroup as Na, provideCollapsible as Ni, usePaginationControls as Nn, _sfc_main$110 as Nr, _sfc_main$45 as Nt, useToggleRoot as O, _sfc_main$178 as Oa, Collapsible as Oi, _sfc_main$78 as On, provideExpansionPanelGroup as Or, _sfc_main$43 as Ot, _sfc_main$17 as P, _sfc_main$180 as Pa, useCollapsible as Pi, usePaginationItems as Pn, _sfc_main$111 as Pr, _sfc_main$46 as Pt, _sfc_main$27 as Q, _sfc_main$159 as Qi, _sfc_main$90 as Qn, _sfc_main$123 as Qr, provideRadioRoot as Qt, provideTabsRoot as R, _sfc_main$183 as Ra, _sfc_main$150 as Ri, _sfc_main$81 as Rn, useDialogContext as Rr, _sfc_main$50 as Rt, provideTooltipRoot as S, provideBreadcrumbsRoot as Sa, _sfc_main$139 as Si, _sfc_main$72 as Sn, _sfc_main$104 as Sr, _sfc_main$40 as St, _sfc_main$13 as T, _sfc_main$175 as Ta, _sfc_main$142 as Ti, _sfc_main$75 as Tn, provideExpansionPanelRoot as Tr, useSingleRoot as Tt, _sfc_main$23 as U, _sfc_main$188 as Ua, provideCheckboxGroup as Ui, _sfc_main$83 as Un, _sfc_main$117 as Ur, _sfc_main$53 as Ut, _sfc_main$21 as V, _sfc_main$186 as Va, useCheckboxRoot as Vi, useOverflowRoot as Vn, _sfc_main$115 as Vr, _sfc_main$52 as Vt, _sfc_main$24 as W, provideAlertDialogContext as Wa, useCheckboxGroup as Wi, _sfc_main$84 as Wn, _sfc_main$118 as Wr, _sfc_main$54 as Wt, useSwitchGroup as X, _sfc_main$192 as Xa, _sfc_main$157 as Xi, provideNumberFieldRoot as Xn, DataGrid as Xr, _sfc_main$57 as Xt, provideSwitchGroup as Y, _sfc_main$191 as Ya, _sfc_main$156 as Yi, _sfc_main$89 as Yn, useDataTableRoot as Yr, _sfc_main$56 as Yt, Step as Z, _sfc_main$158 as Zi, useNumberFieldRoot as Zn, _sfc_main$122 as Zr, _sfc_main$58 as Zt, useTreeviewRoot as _, _sfc_main$170 as _a, _sfc_main$134 as _i, _sfc_main$70 as _n, useGroupRoot as _r, _sfc_main$38 as _t, _sfc_main$3 as a, _sfc_main$163 as aa, _sfc_main$128 as ai, _sfc_main$61 as an, useInputRoot as ar, _sfc_main$31 as at, _sfc_main$11 as b, _sfc_main$173 as ba, _sfc_main$137 as bi, usePopoverContext as bn, _sfc_main$102 as br, useSliderRoot as bt, _sfc_main$6 as c, useButtonRoot as ca, _sfc_main$130 as ci, _sfc_main$64 as cn, _sfc_main$96 as cr, _sfc_main$32 as ct, useTreeviewItem as d, provideButtonGroup as da, useSplitterRoot as di, useProgressRoot as dn, provideImageRoot as dr, _sfc_main$33 as dt, provideCarouselRoot as ea, _sfc_main$125 as ei, _sfc_main$59 as en, _sfc_main$91 as er, provideStepRoot as et, _sfc_main$8 as f, useButtonGroup as fa, _sfc_main$132 as fi, _sfc_main$66 as fn, useImageRoot as fr, _sfc_main$34 as ft, provideTreeviewRoot as g, _sfc_main$169 as ga, Combobox as gi, _sfc_main$69 as gn, provideGroupRoot as gr, _sfc_main$37 as gt, _sfc_main$9 as h, _sfc_main$168 as ha, useDataGridRoot as hi, Popover as hn, _sfc_main$100 as hr, _sfc_main$36 as ht, _sfc_main$2 as i, _sfc_main$162 as ia, useDataGridRow as ii, _sfc_main$60 as in, provideInputRoot as ir, _sfc_main$30 as it, useToggleGroup as j, _sfc_main$179 as ja, _sfc_main$146 as ji, providePaginationItems as jn, _sfc_main$108 as jr, Select as jt, _sfc_main$15 as k, provideAvatarRoot as ka, _sfc_main$144 as ki, _sfc_main$79 as kn, useExpansionPanelGroup as kr, provideSelectionRoot as kt, _sfc_main$7 as l, _sfc_main$165 as la, _sfc_main$131 as li, _sfc_main$65 as ln, _sfc_main$97 as lr, provideSnackbarQueueContext as lt, useTreeviewList as m, _sfc_main$167 as ma, provideDataGridRoot as mi, _sfc_main$68 as mn, _sfc_main$99 as mr, _sfc_main$35 as mt, _sfc_main as n, Button as na, _sfc_main$127 as ni, useRadioGroup as nn, _sfc_main$93 as nr, Snackbar as nt, _sfc_main$4 as o, _sfc_main$164 as oa, Splitter as oi, _sfc_main$62 as on, Image as or, provideSnackbarRootContext as ot, provideTreeviewList as p, Breadcrumbs as pa, _sfc_main$133 as pi, _sfc_main$67 as pn, Group as pr, Slider as pt, useSwitchRoot as q, _sfc_main$189 as qa, _sfc_main$154 as qi, _sfc_main$87 as qn, _sfc_main$121 as qr, useRatingRoot as qt, _sfc_main$1 as r, _sfc_main$161 as ra, provideDataGridRow as ri, Progress as rn, _sfc_main$94 as rr, _sfc_main$29 as rt, _sfc_main$5 as s, provideButtonRoot as sa, _sfc_main$129 as si, _sfc_main$63 as sn, _sfc_main$95 as sr, useSnackbarRootContext as st, Treeview as t, useCarouselRoot as ta, _sfc_main$126 as ti, provideRadioGroup as tn, _sfc_main$92 as tr, useStepRoot as tt, provideTreeviewItem as u, _sfc_main$166 as ua, provideSplitterRoot as ui, provideProgressRoot as un, _sfc_main$98 as ur, useSnackbarQueueContext as ut, Tooltip as v, _sfc_main$171 as va, _sfc_main$135 as vi, _sfc_main$71 as vn, _sfc_main$101 as vr, _sfc_main$39 as vt, Toggle as w, Avatar as wa, _sfc_main$141 as wi, _sfc_main$74 as wn, _sfc_main$106 as wr, provideSingleRoot as wt, _sfc_main$12 as x, _sfc_main$174 as xa, _sfc_main$138 as xi, Pagination as xn, _sfc_main$103 as xr, Single as xt, _sfc_main$10 as y, _sfc_main$172 as ya, _sfc_main$136 as yi, providePopoverContext as yn, ExpansionPanel as yr, provideSliderRoot as yt, useTabsRoot as z, _sfc_main$184 as za, _sfc_main$151 as zi, _sfc_main$82 as zn, DataTable as zr, provideSelectContext as zt };
