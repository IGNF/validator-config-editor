import { a as ID, i as Extensible, n as DOMElement, o as MaybeArray, t as Activation } from "./index-XNZrgWCq.mjs";
import { c as RegistryTicketInput, s as RegistryTicket, t as RegistryContext } from "./index-Y6VfllT2.mjs";
import { $i as RatingContext, Bo as DataGridContext, Bs as StepContext, Da as NumberFieldContext, Ec as UseImageReturn, G as StackTicket, Ha as NestedSelectionMode, Ho as DataGridOptions, Ia as NestedActiveMode, Io as StandardSchemaV1, Ji as SliderContext, Js as GroupContext, La as NestedContext, Mc as SelectionTicketInput, Oc as SelectionContext, Os as PopoverReturn, Ss as VirtualFocusReturn, To as RuleAlias, Ua as NestedTicket, Us as StepTicket, Xo as PinPosition, Zs as GroupTicket, _s as ComboboxAdapter, ha as ProgressContext, ho as FormValidationRule, ic as BreadcrumbsContext, jc as SelectionTicket, ls as ComboboxContext, na as RatingItemState, nn as NotificationTicket, pc as SingleTicket, so as InputState, ta as RatingItemDescriptor, uc as SingleContext, ut as RovingFocusReturn, va as ProgressTicket, vc as OverflowContext, wc as ImageStatus, za as NestedOpenMode, zt as PresenceState } from "./index-Ct0Pmzpx.mjs";
import { t as PopoverAdapter } from "./adapter-CbkRdMju.mjs";
import { c as PaginationOptions, i as SortDirection, l as PaginationTicket, o as PaginationContext, t as DataTableAdapter, v as FilterOptions } from "./adapter-BP7jNtvH.mjs";
import { c as DataTableOptions, p as SelectStrategy, r as DataTableContext, v as InternalHeader } from "./index-DDwX_0Um.mjs";
import "./index-DMQv04YO.mjs";
import { MaybeRefOrGetter, Ref, ShallowRef, TemplateRef } from "vue";
//#region src/components/Atom/Atom.vue.d.ts
/**
 * Props for the Atom component
 */
interface AtomProps {
  /**
   * The HTML element to render as, or null for renderless mode
   * @default 'div'
   */
  as?: DOMElement | null;
  /**
   * When true, renders slot content directly without a wrapper element
   * @default false
   */
  renderless?: boolean;
}
/**
 * Slot types for the Atom component
 * @template T - The type of props passed to the slot
 */
interface AtomSlots<T> {
  /**
   * Default slot that receives all forwarded attributes as props
   */
  default: (props: T) => any;
}
/**
 * Values exposed by the Atom component via defineExpose
 */
interface AtomExpose {
  /**
   * Template ref to the rendered HTML element (null in renderless mode)
   */
  element: TemplateRef<HTMLElement | null>;
}
interface AtomPrivateProps extends AtomProps {}
declare const _default$190: typeof __VLS_export$190;
declare const __VLS_export$190: <T extends Record<string, any> = {}>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$36<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$36<AtomPrivateProps> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: import("vue").ShallowUnwrapRef<AtomExpose>) => void;
  attrs: any;
  slots: AtomSlots<T>;
  emit: {};
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$36<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Alert/AlertRoot.vue.d.ts
interface AlertRootProps extends AtomProps {
  /**
   * ARIA live-region role.
   * - `'alert'`  — assertive: AT interrupts to announce the message immediately.
   * - `'status'` — polite: AT waits for the current speech to finish.
   * @default 'alert'
   */
  role?: 'alert' | 'status';
}
interface AlertRootSlotAttrs {
  'aria-atomic': true;
  'aria-live': 'assertive' | 'polite';
  'role': 'alert' | 'status';
}
interface AlertRootSlotProps {
  /** Attributes to bind to the alert element */
  attrs: AlertRootSlotAttrs;
}
declare const _default$189: typeof __VLS_export$189;
declare const __VLS_export$189: __VLS_WithSlots$145<import("vue").DefineComponent<AlertRootProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<AlertRootProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: AlertRootSlotProps) => any;
}>;
type __VLS_WithSlots$145<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Alert/AlertTitle.vue.d.ts
interface AlertTitleProps extends AtomProps {}
interface AlertTitleSlotProps {
  /** Attributes to bind to the title element */
  attrs: Record<string, never>;
}
declare const _default$188: typeof __VLS_export$188;
declare const __VLS_export$188: __VLS_WithSlots$144<import("vue").DefineComponent<AlertTitleProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<AlertTitleProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: AlertTitleSlotProps) => any;
}>;
type __VLS_WithSlots$144<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Alert/AlertDescription.vue.d.ts
interface AlertDescriptionProps extends AtomProps {}
interface AlertDescriptionSlotProps {
  /** Attributes to bind to the description element */
  attrs: Record<string, never>;
}
declare const _default$187: typeof __VLS_export$187;
declare const __VLS_export$187: __VLS_WithSlots$143<import("vue").DefineComponent<AlertDescriptionProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<AlertDescriptionProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: AlertDescriptionSlotProps) => any;
}>;
type __VLS_WithSlots$143<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Alert/index.d.ts
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
 * </script>
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
declare const Alert: {
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
   * </script>
   *
   * <template>
   *   <Alert.Root>
   *     <Alert.Title>Session expiring</Alert.Title>
   *     <Alert.Description>You will be signed out in 5 minutes.</Alert.Description>
   *   </Alert.Root>
   * </template>
   * ```
   */
  Root: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<AlertRootProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<AlertRootProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<AlertRootProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: AlertRootSlotProps) => any;
    };
  });
  /**
   * Title for the alert. Renders as `<p>` by default.
   *
   * @see https://0.vuetifyjs.com/components/semantic/alert
   *
   * @example
   * ```vue
   * <script setup lang="ts">
   *   import { Alert } from '@vuetify/v0'
   * </script>
   *
   * <template>
   *   <Alert.Title>Session expiring</Alert.Title>
   * </template>
   * ```
   */
  Title: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<AlertTitleProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<AlertTitleProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<AlertTitleProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: AlertTitleSlotProps) => any;
    };
  });
  /**
   * Description body for the alert. Renders as `<p>` by default.
   *
   * @see https://0.vuetifyjs.com/components/semantic/alert
   *
   * @example
   * ```vue
   * <script setup lang="ts">
   *   import { Alert } from '@vuetify/v0'
   * </script>
   *
   * <template>
   *   <Alert.Description>You will be signed out in 5 minutes.</Alert.Description>
   * </template>
   * ```
   */
  Description: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<AlertDescriptionProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<AlertDescriptionProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<AlertDescriptionProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: AlertDescriptionSlotProps) => any;
    };
  });
};
//#endregion
//#region src/components/AlertDialog/AlertDialogRoot.vue.d.ts
interface AlertDialogContext {
  isOpen: ShallowRef<boolean>;
  id: string;
  titleId: string;
  descriptionId: string;
  /** Whether an AlertDialog.Title child is currently mounted */
  hasTitle: ShallowRef<boolean>;
  /** Whether an AlertDialog.Description child is currently mounted */
  hasDescription: ShallowRef<boolean>;
  isPending: ShallowRef<boolean>;
  cancelEl: ShallowRef<HTMLElement | null>;
  open: () => void;
  close: () => void;
}
interface AlertDialogRootProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Unique identifier for the alert dialog (auto-generated if not provided) */
  id?: string;
}
interface AlertDialogRootSlotProps {
  /** Unique identifier */
  id: string;
  /** Whether the alert dialog is currently open */
  isOpen: boolean;
  /** Whether an action is pending (between wait and close) */
  isPending: boolean;
  /** Open the alert dialog */
  open: () => void;
  /** Close the alert dialog */
  close: () => void;
}
declare const useAlertDialogContext: (key: string, defaultValue?: AlertDialogContext | undefined) => AlertDialogContext, provideAlertDialogContext: (key: string, context: AlertDialogContext, app?: import("vue").App) => AlertDialogContext;
declare const _default$186: typeof __VLS_export$186;
declare const __VLS_export$186: __VLS_WithSlots$142<import("vue").DefineComponent<AlertDialogRootProps & {
  modelValue?: boolean;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
  "update:modelValue": (value: boolean) => any;
  "update:model-value": (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<AlertDialogRootProps & {
  modelValue?: boolean;
}> & Readonly<{
  "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
  "onUpdate:model-value"?: ((value: boolean) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: AlertDialogRootSlotProps) => any;
}>;
type __VLS_WithSlots$142<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/AlertDialog/AlertDialogActivator.vue.d.ts
interface AlertDialogActivatorProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
}
interface AlertDialogActivatorSlotProps {
  /** Whether the alert dialog is currently open */
  isOpen: boolean;
  /** Attributes to bind to the trigger element */
  attrs: {
    'type': 'button' | undefined;
    'role': 'button' | undefined;
    'tabindex': number;
    'aria-haspopup': 'dialog';
    'aria-expanded': boolean;
    'data-open': true | undefined;
    'onClick': () => void;
    'onKeydown': ((e: KeyboardEvent) => void) | undefined;
  };
}
declare const _default$185: typeof __VLS_export$185;
declare const __VLS_export$185: __VLS_WithSlots$141<import("vue").DefineComponent<AlertDialogActivatorProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<AlertDialogActivatorProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: AlertDialogActivatorSlotProps) => any;
}>;
type __VLS_WithSlots$141<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/AlertDialog/AlertDialogContent.vue.d.ts
interface AlertDialogContentProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Close dialog when clicking outside content @default false */
  closeOnClickOutside?: boolean;
  /** Close dialog when pressing Escape @default false */
  closeOnEscape?: boolean;
  /**
   * Whether this dialog blocks scrim dismissal
   *
   * @default false
   */
  blocking?: boolean;
}
interface AlertDialogContentEmits {
  cancel: [e: Event];
  close: [e: Event];
}
interface AlertDialogContentSlotProps {
  /** Whether the alert dialog is currently open */
  isOpen: boolean;
  /** Whether this dialog is the topmost in the global stack */
  globalTop: boolean;
  /** Calculated z-index for the dialog */
  zIndex: number;
  /** Attributes to bind to the dialog element */
  attrs: {
    'id': string;
    'role': 'alertdialog';
    'aria-modal': 'true';
    'aria-labelledby': string | undefined;
    'aria-describedby': string | undefined;
    'style': {
      zIndex: number;
    };
    'onCancel': (e: Event) => void;
    'onClose': (e: Event) => void;
  };
}
declare const _default$184: typeof __VLS_export$184;
declare const __VLS_export$184: __VLS_WithSlots$140<import("vue").DefineComponent<AlertDialogContentProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
  cancel: (e: Event) => any;
  close: (e: Event) => any;
}, string, import("vue").PublicProps, Readonly<AlertDialogContentProps> & Readonly<{
  onCancel?: ((e: Event) => any) | undefined;
  onClose?: ((e: Event) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: AlertDialogContentSlotProps) => any;
}>;
type __VLS_WithSlots$140<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/AlertDialog/AlertDialogTitle.vue.d.ts
interface AlertDialogTitleProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
}
interface AlertDialogTitleSlotProps {
  /** Attributes to bind to the title element */
  attrs: {
    id: string;
  };
}
declare const _default$183: typeof __VLS_export$183;
declare const __VLS_export$183: __VLS_WithSlots$139<import("vue").DefineComponent<AlertDialogTitleProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<AlertDialogTitleProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: AlertDialogTitleSlotProps) => any;
}>;
type __VLS_WithSlots$139<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/AlertDialog/AlertDialogDescription.vue.d.ts
interface AlertDialogDescriptionProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
}
interface AlertDialogDescriptionSlotProps {
  /** Attributes to bind to the description element */
  attrs: {
    id: string;
  };
}
declare const _default$182: typeof __VLS_export$182;
declare const __VLS_export$182: __VLS_WithSlots$138<import("vue").DefineComponent<AlertDialogDescriptionProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<AlertDialogDescriptionProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: AlertDialogDescriptionSlotProps) => any;
}>;
type __VLS_WithSlots$138<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/AlertDialog/AlertDialogCancel.vue.d.ts
interface AlertDialogCancelProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Whether the cancel button is disabled */
  disabled?: boolean;
}
interface AlertDialogCancelSlotProps {
  /** Whether the alert dialog is currently open */
  isOpen: boolean;
  /** Attributes to bind to the cancel button element */
  attrs: {
    'type': 'button' | undefined;
    'role': 'button' | undefined;
    'tabindex': number;
    'disabled': boolean | undefined;
    'data-disabled': '' | undefined;
    'onClick': () => void;
    'onKeydown': ((e: KeyboardEvent) => void) | undefined;
  };
}
declare const _default$181: typeof __VLS_export$181;
declare const __VLS_export$181: __VLS_WithSlots$137<import("vue").DefineComponent<AlertDialogCancelProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<AlertDialogCancelProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: AlertDialogCancelSlotProps) => any;
}>;
type __VLS_WithSlots$137<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/AlertDialog/AlertDialogClose.vue.d.ts
interface AlertDialogCloseProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
}
interface AlertDialogCloseSlotProps {
  /** Whether the alert dialog is currently open */
  isOpen: boolean;
  /** Attributes to bind to the close button element */
  attrs: {
    'type': 'button' | undefined;
    'role': 'button' | undefined;
    'tabindex': number;
    'aria-label': string;
    'onClick': () => void;
    'onKeydown': ((e: KeyboardEvent) => void) | undefined;
  };
}
declare const _default$180: typeof __VLS_export$180;
declare const __VLS_export$180: __VLS_WithSlots$136<import("vue").DefineComponent<AlertDialogCloseProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<AlertDialogCloseProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: AlertDialogCloseSlotProps) => any;
}>;
type __VLS_WithSlots$136<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/AlertDialog/AlertDialogAction.vue.d.ts
interface AlertDialogActionEvent {
  /** Signal the dialog to stay open until close() is called */
  wait: () => void;
  /** Resolve the pending state and close the dialog */
  close: () => void;
}
interface AlertDialogActionProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Whether the action button is disabled */
  disabled?: boolean;
}
interface AlertDialogActionEmits {
  action: [event: AlertDialogActionEvent];
}
interface AlertDialogActionSlotProps {
  /** Whether the action is pending (between wait and close) */
  isPending: boolean;
  /** Attributes to bind to the action button element */
  attrs: {
    'type': 'button' | undefined;
    'role': 'button' | undefined;
    'tabindex': number;
    'disabled': boolean | undefined;
    'data-disabled': '' | undefined;
    'data-pending': '' | undefined;
    'onClick': () => void;
    'onKeydown': ((e: KeyboardEvent) => void) | undefined;
  };
}
declare const _default$179: typeof __VLS_export$179;
declare const __VLS_export$179: __VLS_WithSlots$135<import("vue").DefineComponent<AlertDialogActionProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
  action: (event: AlertDialogActionEvent) => any;
}, string, import("vue").PublicProps, Readonly<AlertDialogActionProps> & Readonly<{
  onAction?: ((event: AlertDialogActionEvent) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: AlertDialogActionSlotProps) => any;
}>;
type __VLS_WithSlots$135<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/AlertDialog/index.d.ts
/**
 * AlertDialog component with sub-components for building confirmation dialogs.
 *
 * @see https://0.vuetifyjs.com/components/disclosure/alert-dialog
 *
 * @example
 * ```vue
 * <script lang="ts" setup>
 *   import { AlertDialog } from '@vuetify/v0'
 * </script>
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
declare const AlertDialog: {
  /**
   * Root component for alert dialogs.
   *
   * @see https://0.vuetifyjs.com/components/disclosure/alert-dialog
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { AlertDialog } from '@vuetify/v0'
   * </script>
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
  Root: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<AlertDialogRootProps & {
      modelValue?: boolean;
    }> & Readonly<{
      "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
      "onUpdate:model-value"?: ((value: boolean) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
      "update:modelValue": (value: boolean) => any;
      "update:model-value": (value: boolean) => any;
    }, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<AlertDialogRootProps & {
      modelValue?: boolean;
    }> & Readonly<{
      "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
      "onUpdate:model-value"?: ((value: boolean) => any) | undefined;
    }>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<AlertDialogRootProps & {
    modelValue?: boolean;
  }> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    "onUpdate:model-value"?: ((value: boolean) => any) | undefined;
  }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => any;
    "update:model-value": (value: boolean) => any;
  }, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: AlertDialogRootSlotProps) => any;
    };
  });
  /**
   * Activator component that opens the alert dialog.
   *
   * @see https://0.vuetifyjs.com/components/disclosure/alert-dialog
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { AlertDialog } from '@vuetify/v0'
   * </script>
   *
   * <template>
   *   <AlertDialog.Activator>
   *     Delete Item
   *   </AlertDialog.Activator>
   * </template>
   * ```
   */
  Activator: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<AlertDialogActivatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<AlertDialogActivatorProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<AlertDialogActivatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: AlertDialogActivatorSlotProps) => any;
    };
  });
  /**
   * Content container for the alert dialog using native `<dialog>` element.
   *
   * @see https://0.vuetifyjs.com/components/disclosure/alert-dialog
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { AlertDialog } from '@vuetify/v0'
   * </script>
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
  Content: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<AlertDialogContentProps> & Readonly<{
      onCancel?: ((e: Event) => any) | undefined;
      onClose?: ((e: Event) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
      cancel: (e: Event) => any;
      close: (e: Event) => any;
    }, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<AlertDialogContentProps> & Readonly<{
      onCancel?: ((e: Event) => any) | undefined;
      onClose?: ((e: Event) => any) | undefined;
    }>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<AlertDialogContentProps> & Readonly<{
    onCancel?: ((e: Event) => any) | undefined;
    onClose?: ((e: Event) => any) | undefined;
  }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    cancel: (e: Event) => any;
    close: (e: Event) => any;
  }, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: AlertDialogContentSlotProps) => any;
    };
  });
  /**
   * Title component for accessible alert dialog labeling.
   *
   * @see https://0.vuetifyjs.com/components/disclosure/alert-dialog
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { AlertDialog } from '@vuetify/v0'
   * </script>
   *
   * <template>
   *   <AlertDialog.Title>Are you sure?</AlertDialog.Title>
   * </template>
   * ```
   */
  Title: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<AlertDialogTitleProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<AlertDialogTitleProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<AlertDialogTitleProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: AlertDialogTitleSlotProps) => any;
    };
  });
  /**
   * Description component for accessible alert dialog description.
   *
   * @see https://0.vuetifyjs.com/components/disclosure/alert-dialog
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { AlertDialog } from '@vuetify/v0'
   * </script>
   *
   * <template>
   *   <AlertDialog.Description>
   *     This action cannot be undone.
   *   </AlertDialog.Description>
   * </template>
   * ```
   */
  Description: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<AlertDialogDescriptionProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<AlertDialogDescriptionProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<AlertDialogDescriptionProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: AlertDialogDescriptionSlotProps) => any;
    };
  });
  /**
   * Cancel button component for dismissing the alert dialog.
   *
   * @see https://0.vuetifyjs.com/components/disclosure/alert-dialog
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { AlertDialog } from '@vuetify/v0'
   * </script>
   *
   * <template>
   *   <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
   * </template>
   * ```
   */
  Cancel: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<AlertDialogCancelProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<AlertDialogCancelProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<AlertDialogCancelProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: AlertDialogCancelSlotProps) => any;
    };
  });
  /**
   * Close button component for closing the alert dialog.
   *
   * @see https://0.vuetifyjs.com/components/disclosure/alert-dialog
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { AlertDialog } from '@vuetify/v0'
   * </script>
   *
   * <template>
   *   <AlertDialog.Close>Close</AlertDialog.Close>
   * </template>
   * ```
   */
  Close: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<AlertDialogCloseProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<AlertDialogCloseProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<AlertDialogCloseProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: AlertDialogCloseSlotProps) => any;
    };
  });
  /**
   * Action button component for confirming the alert dialog.
   *
   * @see https://0.vuetifyjs.com/components/disclosure/alert-dialog
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { AlertDialog } from '@vuetify/v0'
   * </script>
   *
   * <template>
   *   <AlertDialog.Action>Confirm</AlertDialog.Action>
   * </template>
   * ```
   */
  Action: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<AlertDialogActionProps> & Readonly<{
      onAction?: ((event: AlertDialogActionEvent) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
      action: (event: AlertDialogActionEvent) => any;
    }, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<AlertDialogActionProps> & Readonly<{
      onAction?: ((event: AlertDialogActionEvent) => any) | undefined;
    }>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<AlertDialogActionProps> & Readonly<{
    onAction?: ((event: AlertDialogActionEvent) => any) | undefined;
  }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    action: (event: AlertDialogActionEvent) => any;
  }, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: AlertDialogActionSlotProps) => any;
    };
  });
};
//#endregion
//#region src/components/AspectRatio/AspectRatio.vue.d.ts
interface AspectRatioProps extends AtomProps {
  /**
   * The aspect ratio as `width / height`. Accepts a number (`16 / 9`) or a
   * CSS `aspect-ratio` string (`'16 / 9'`, `'1.777'`).
   * @default 1
   */
  ratio?: number | string;
}
interface AspectRatioSlotProps {
  /** Resolved CSS `aspect-ratio` value. */
  ratio: string;
  /** Attributes to bind to the root element. */
  attrs: {
    style: {
      aspectRatio: string;
    };
  };
}
declare const _default$178: typeof __VLS_export$178;
declare const __VLS_export$178: __VLS_WithSlots$134<import("vue").DefineComponent<AspectRatioProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<AspectRatioProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: AspectRatioSlotProps) => any;
}>;
type __VLS_WithSlots$134<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Avatar/AvatarRoot.vue.d.ts
interface AvatarRootProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Identifier when used inside Avatar.Group; harmless when standalone */
  value?: unknown;
  /** Disables this avatar's contribution to group capacity math */
  disabled?: boolean;
  /** Namespace of the parent Avatar.Group context */
  groupNamespace?: string;
}
interface AvatarTicket extends SelectionTicket {
  type?: 'image' | 'fallback';
  priority?: number;
}
interface AvatarContext extends SelectionContext<AvatarTicket> {}
interface AvatarRootSlotProps {
  /** True only when hidden by an enclosing Avatar.Group; false otherwise */
  isHidden: boolean;
  /** Registry index inside an Avatar.Group; 0 when standalone */
  index: number;
}
declare const useAvatarRoot: (key: string, defaultValue?: AvatarContext | undefined) => AvatarContext, provideAvatarRoot: (key: string, context: AvatarContext, app?: import("vue").App) => AvatarContext;
declare const _default$177: typeof __VLS_export$177;
declare const __VLS_export$177: __VLS_WithSlots$133<import("vue").DefineComponent<AvatarRootProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<AvatarRootProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: AvatarRootSlotProps) => unknown;
}>;
type __VLS_WithSlots$133<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Avatar/AvatarImage.vue.d.ts
interface AvatarImageProps extends AtomProps {
  /** Image source URL */
  src?: string;
  /** Accessible alt text. */
  alt?: string;
  /** Priority for display order (higher = more preferred) */
  priority?: number;
  /** Namespace for retrieving avatar context */
  namespace?: string;
}
interface AvatarImageEmits {
  load: [e: Event];
  error: [e: Event];
}
interface AvatarImageSlotProps {
  /** Whether this image is currently visible */
  isSelected: boolean;
  /** Current loading status */
  status: ImageStatus;
  /** Whether the image has loaded successfully */
  isLoaded: boolean;
  /** Whether the image failed to load */
  isError: boolean;
  /** Reset the image and re-attempt loading */
  retry: () => void;
  /** Attributes to bind to the image element */
  attrs: {
    role: 'img';
    src?: string;
    alt?: string;
    onLoad: (e: Event) => void;
    onError: (e: Event) => void;
  };
}
declare const _default$176: typeof __VLS_export$176;
declare const __VLS_export$176: __VLS_WithSlots$132<import("vue").DefineComponent<AvatarImageProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
  error: (e: Event) => any;
  load: (e: Event) => any;
}, string, import("vue").PublicProps, Readonly<AvatarImageProps> & Readonly<{
  onError?: ((e: Event) => any) | undefined;
  onLoad?: ((e: Event) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: AvatarImageSlotProps) => any;
}>;
type __VLS_WithSlots$132<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Avatar/AvatarFallback.vue.d.ts
interface AvatarFallbackProps extends AtomProps {
  /** Namespace for retrieving avatar context */
  namespace?: string;
}
interface AvatarFallbackSlotProps {
  /** Whether this fallback is currently visible */
  isSelected: boolean;
}
declare const _default$175: typeof __VLS_export$175;
declare const __VLS_export$175: __VLS_WithSlots$131<import("vue").DefineComponent<AvatarFallbackProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<AvatarFallbackProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: AvatarFallbackSlotProps) => any;
}>;
type __VLS_WithSlots$131<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Avatar/AvatarGroup.vue.d.ts
type AvatarGroupPriority = 'start' | 'end';
interface AvatarGroupTicketInput<V = unknown> extends RegistryTicketInput {
  value?: V;
  disabled?: MaybeRefOrGetter<boolean>;
  el?: MaybeRefOrGetter<Element | null>;
}
interface AvatarGroupTicket<V = unknown> extends RegistryTicket {
  value: V | undefined;
  disabled: Readonly<Ref<boolean>>;
  el: Readonly<Ref<Element | null>>;
}
interface AvatarGroupContext {
  registry: RegistryContext<AvatarGroupTicketInput, AvatarGroupTicket>;
  max: Readonly<Ref<number | undefined>>;
  responsive: Readonly<Ref<boolean>>;
  priority: Readonly<Ref<AvatarGroupPriority>>;
  indicatorWidth: ShallowRef<number>;
  itemWidth: ShallowRef<number>;
  overflow: Readonly<ShallowRef<OverflowContext | null>>;
  isOverflowing: Readonly<Ref<boolean>>;
  isVisible: (index: number) => boolean;
}
interface AvatarGroupProps extends AtomProps {
  /** Namespace for dependency injection (must match Avatar.Root groupNamespace) */
  namespace?: string;
  /** Upper bound on visible count; default Infinity */
  max?: number;
  /** Opt-in width-responsive truncation via createOverflow */
  responsive?: boolean;
  /** Which side keeps items when truncated */
  priority?: AvatarGroupPriority;
  /** Pixel gap between items; only meaningful when responsive */
  gap?: number;
  /** Accessible name for the group */
  label?: string;
  /** ID of element that labels this group */
  ariaLabelledby?: string;
  /** ID of element that describes this group */
  ariaDescribedby?: string;
}
interface AvatarGroupSlotProps {
  /** Total number of registered, non-disabled avatars in the group */
  total: number;
  visible: number;
  hidden: AvatarGroupTicket[];
  isOverflowing: boolean;
  attrs: {
    'role': 'group';
    'aria-label': string | undefined;
    'aria-labelledby': string | undefined;
    'aria-describedby': string | undefined;
    'data-overflow': true | undefined;
    'data-priority': AvatarGroupPriority;
  };
}
declare const useAvatarGroup: (key: string, defaultValue?: AvatarGroupContext | null | undefined) => AvatarGroupContext | null, provideAvatarGroup: (key: string, context: AvatarGroupContext | null, app?: import("vue").App) => AvatarGroupContext | null;
declare const _default$174: typeof __VLS_export$174;
declare const __VLS_export$174: __VLS_WithSlots$130<import("vue").DefineComponent<AvatarGroupProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<AvatarGroupProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: AvatarGroupSlotProps) => unknown;
}>;
type __VLS_WithSlots$130<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Avatar/AvatarIndicator.vue.d.ts
interface AvatarIndicatorProps extends AtomProps {
  /** Namespace of the parent Avatar.Group context */
  namespace?: string;
}
interface AvatarIndicatorSlotProps {
  count: number;
  hidden: AvatarGroupTicket[];
  attrs: {
    'aria-label': string | undefined;
    'aria-live': 'polite';
    'data-overflow-indicator': 'true';
  };
}
declare const _default$173: typeof __VLS_export$173;
declare const __VLS_export$173: __VLS_WithSlots$129<import("vue").DefineComponent<AvatarIndicatorProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<AvatarIndicatorProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: AvatarIndicatorSlotProps) => unknown;
}>;
type __VLS_WithSlots$129<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Avatar/index.d.ts
/**
 * Avatar component with sub-components for building avatars.
 *
 * @see https://0.vuetifyjs.com/components/semantic/avatar
 */
declare const Avatar: {
  /**
   * Root component for avatars.
   *
   * @see https://0.vuetifyjs.com/components/semantic/avatar
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { Avatar } from '@vuetify/v0'
   * </script>
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
  Root: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<AvatarRootProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<AvatarRootProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<AvatarRootProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: AvatarRootSlotProps) => unknown;
    };
  });
  /**
   * Image inside an Avatar.Root. Registers with the avatar's image
   * selection and shows when loaded.
   *
   * @see https://0.vuetifyjs.com/components/semantic/avatar
   */
  Image: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<AvatarImageProps> & Readonly<{
      onError?: ((e: Event) => any) | undefined;
      onLoad?: ((e: Event) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
      error: (e: Event) => any;
      load: (e: Event) => any;
    }, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<AvatarImageProps> & Readonly<{
      onError?: ((e: Event) => any) | undefined;
      onLoad?: ((e: Event) => any) | undefined;
    }>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<AvatarImageProps> & Readonly<{
    onError?: ((e: Event) => any) | undefined;
    onLoad?: ((e: Event) => any) | undefined;
  }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    error: (e: Event) => any;
    load: (e: Event) => any;
  }, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: AvatarImageSlotProps) => any;
    };
  });
  /**
   * Fallback content when no image is loaded.
   *
   * @see https://0.vuetifyjs.com/components/semantic/avatar
   */
  Fallback: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<AvatarFallbackProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<AvatarFallbackProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<AvatarFallbackProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: AvatarFallbackSlotProps) => any;
    };
  });
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
   * </script>
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
  Group: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<AvatarGroupProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<AvatarGroupProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<AvatarGroupProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: AvatarGroupSlotProps) => unknown;
    };
  });
  /**
   * Overflow indicator for Avatar.Group. Renders only when items are
   * hidden. Slot receives the hidden count and hidden tickets.
   *
   * @see https://0.vuetifyjs.com/components/semantic/avatar
   */
  Indicator: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<AvatarIndicatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<AvatarIndicatorProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<AvatarIndicatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: AvatarIndicatorSlotProps) => unknown;
    };
  });
};
//#endregion
//#region src/components/Breadcrumbs/types.d.ts
type BreadcrumbsTicketType = 'item' | 'divider' | 'ellipsis' | 'activator';
interface BreadcrumbsTicket extends GroupTicket {
  /** Type of breadcrumb element */
  type: BreadcrumbsTicketType;
}
interface BreadcrumbsRootContext {
  /** Breadcrumbs composable context for navigation and state */
  breadcrumbs: BreadcrumbsContext;
  /** Group context for managing item registration and selection (overflow) */
  group: GroupContext<BreadcrumbsTicket>;
  /** Overflow context for width measurement and capacity calculation */
  overflow: OverflowContext;
  /** Default divider character/text */
  divider: Ref<string>;
  /** Default ellipsis character/text */
  ellipsis: Ref<string>;
  /** Whether items are being truncated */
  isOverflowing: Readonly<Ref<boolean>>;
  /** Whether collapsed items are revealed via the ellipsis disclosure */
  expanded: ShallowRef<boolean>;
  /** Whether a BreadcrumbsActivator is registered in the trail */
  hasActivator: Readonly<Ref<boolean>>;
  /** Number of breadcrumb items currently hidden by truncation */
  hiddenCount: Readonly<ShallowRef<number>>;
  /** Measured ellipsis width in pixels (set by BreadcrumbsEllipsis) */
  ellipsisWidth: ShallowRef<number>;
  /** Route element measurement — first item/divider go to reserved space, rest to overflow */
  measureElement: (index: number, type: 'item' | 'divider', el: Element | undefined) => void;
}
//#endregion
//#region src/components/Breadcrumbs/BreadcrumbsRoot.vue.d.ts
interface BreadcrumbsRootProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Default divider character/text */
  divider?: string;
  /** Default ellipsis character/text */
  ellipsis?: string;
  /** Gap between items in pixels. @default 8 */
  gap?: number;
  /** Accessible label for the navigation landmark */
  label?: string;
}
interface BreadcrumbsRootSlotProps {
  /** Whether items are being truncated */
  isOverflowing: boolean;
  /** Number of items that fit in available space */
  capacity: number;
  /** Total number of registered items */
  total: number;
  /** Current depth of the breadcrumb path */
  depth: number;
  /** Whether at root level */
  isRoot: boolean;
  /** Navigate to root */
  first: () => void;
  /** Navigate up one level */
  prev: () => void;
  /** Navigate to a specific item */
  select: (id: ID) => void;
  /** Attributes to bind to the root element */
  attrs: {
    'aria-label': string;
    'role': 'navigation' | undefined;
  };
}
declare const useBreadcrumbsRoot: (key: string, defaultValue?: BreadcrumbsRootContext | undefined) => BreadcrumbsRootContext, provideBreadcrumbsRoot: (key: string, context: BreadcrumbsRootContext, app?: import("vue").App) => BreadcrumbsRootContext;
declare const _default$172: typeof __VLS_export$172;
declare const __VLS_export$172: __VLS_WithSlots$128<import("vue").DefineComponent<BreadcrumbsRootProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<BreadcrumbsRootProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: BreadcrumbsRootSlotProps) => unknown;
}>;
type __VLS_WithSlots$128<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Breadcrumbs/BreadcrumbsList.vue.d.ts
interface BreadcrumbsListProps extends AtomProps {}
interface BreadcrumbsListSlotProps {
  attrs: {
    role: 'list';
  };
}
declare const _default$171: typeof __VLS_export$171;
declare const __VLS_export$171: __VLS_WithSlots$127<import("vue").DefineComponent<BreadcrumbsListProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<BreadcrumbsListProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: BreadcrumbsListSlotProps) => unknown;
}>;
type __VLS_WithSlots$127<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Breadcrumbs/BreadcrumbsItem.vue.d.ts
interface BreadcrumbsItemProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Unique identifier (auto-generated if not provided) */
  id?: ID;
  /** Value associated with this item */
  value?: unknown;
  /** Display text for the breadcrumb (used by composable model) */
  text?: string;
}
interface BreadcrumbsItemSlotProps {
  /** Unique identifier */
  id: ID;
  /** Whether this item is currently selected (visible) */
  isSelected: boolean;
  /** Attributes to bind to the item element */
  attrs: {
    'inert': true | undefined;
    'data-selected': true | undefined;
  };
}
declare const _default$170: typeof __VLS_export$170;
declare const __VLS_export$170: __VLS_WithSlots$126<import("vue").DefineComponent<BreadcrumbsItemProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<BreadcrumbsItemProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: BreadcrumbsItemSlotProps) => unknown;
}>;
type __VLS_WithSlots$126<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Breadcrumbs/BreadcrumbsPage.vue.d.ts
interface BreadcrumbsPageProps extends AtomProps {}
interface BreadcrumbsPageSlotProps {
  /** Attributes to bind to the page element */
  attrs: {
    'aria-current': 'page';
  };
}
declare const _default$169: typeof __VLS_export$169;
declare const __VLS_export$169: __VLS_WithSlots$125<import("vue").DefineComponent<BreadcrumbsPageProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<BreadcrumbsPageProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: BreadcrumbsPageSlotProps) => unknown;
}>;
type __VLS_WithSlots$125<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Breadcrumbs/BreadcrumbsDivider.vue.d.ts
interface BreadcrumbsDividerProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Unique identifier (auto-generated if not provided) */
  id?: ID;
  /** Override divider character (uses global from Root if not provided) */
  divider?: string;
}
interface BreadcrumbsDividerSlotProps {
  /** Unique identifier */
  id: ID;
  /** Resolved divider character */
  divider: string;
  /** Whether this divider is currently selected (visible) */
  isSelected: boolean;
  /** Attributes to bind to the divider element */
  attrs: {
    'aria-hidden': 'true';
    'data-selected': true | undefined;
  };
}
declare const _default$168: typeof __VLS_export$168;
declare const __VLS_export$168: __VLS_WithSlots$124<import("vue").DefineComponent<BreadcrumbsDividerProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<BreadcrumbsDividerProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: BreadcrumbsDividerSlotProps) => unknown;
}>;
type __VLS_WithSlots$124<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Breadcrumbs/BreadcrumbsEllipsis.vue.d.ts
interface BreadcrumbsEllipsisProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Unique identifier (auto-generated if not provided) */
  id?: ID;
  /** Override ellipsis character (uses global from Root if not provided) */
  ellipsis?: string;
}
interface BreadcrumbsEllipsisSlotProps {
  /** Unique identifier */
  id: ID;
  /** Resolved ellipsis character */
  ellipsis: string;
  /** Whether the ellipsis is currently selected (visible) */
  isSelected: boolean;
  /** Number of breadcrumb items hidden by truncation */
  count: number;
  /** Attributes to bind to the ellipsis element */
  attrs: {
    'aria-hidden': 'true' | undefined;
    'data-selected': true | undefined;
  };
}
declare const _default$167: typeof __VLS_export$167;
declare const __VLS_export$167: __VLS_WithSlots$123<import("vue").DefineComponent<BreadcrumbsEllipsisProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<BreadcrumbsEllipsisProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: BreadcrumbsEllipsisSlotProps) => unknown;
}>;
type __VLS_WithSlots$123<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Breadcrumbs/BreadcrumbsActivator.vue.d.ts
interface BreadcrumbsActivatorProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
}
interface BreadcrumbsActivatorSlotProps {
  /** Whether the collapsed crumbs are currently revealed */
  isExpanded: boolean;
  /** Number of breadcrumb items hidden by truncation */
  count: number;
  /** Toggle visibility of the collapsed crumbs */
  toggle: () => void;
  /** Attributes to bind to the activator element */
  attrs: {
    'type': 'button' | undefined;
    'role': 'button' | undefined;
    'tabindex': 0 | undefined;
    'aria-expanded': boolean;
    'aria-label': string;
    'data-state': 'open' | 'closed';
    'onClick': () => void;
    'onKeydown': ((e: KeyboardEvent) => void) | undefined;
  };
}
declare const _default$166: typeof __VLS_export$166;
declare const __VLS_export$166: __VLS_WithSlots$122<import("vue").DefineComponent<BreadcrumbsActivatorProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<BreadcrumbsActivatorProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: BreadcrumbsActivatorSlotProps) => unknown;
}>;
type __VLS_WithSlots$122<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Breadcrumbs/BreadcrumbsLink.vue.d.ts
type BreadcrumbsLinkProps = AtomProps;
declare const _default$165: typeof __VLS_export$165;
declare const __VLS_export$165: __VLS_WithSlots$121<import("vue").DefineComponent<AtomProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<AtomProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default?: (props: {}) => any;
}>;
type __VLS_WithSlots$121<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Breadcrumbs/index.d.ts
/**
 * Breadcrumbs component for responsive navigation trails.
 *
 * @see https://0.vuetifyjs.com/components/semantic/breadcrumbs
 */
declare const Breadcrumbs: {
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
   * </script>
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
  Root: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<BreadcrumbsRootProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<BreadcrumbsRootProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<BreadcrumbsRootProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: BreadcrumbsRootSlotProps) => unknown;
    };
  });
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
  List: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<BreadcrumbsListProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<BreadcrumbsListProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<BreadcrumbsListProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: BreadcrumbsListSlotProps) => unknown;
    };
  });
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
  Item: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<BreadcrumbsItemProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<BreadcrumbsItemProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<BreadcrumbsItemProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: BreadcrumbsItemSlotProps) => unknown;
    };
  });
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
  Link: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<AtomProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<AtomProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<AtomProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default?: (props: {}) => any;
    };
  });
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
  Page: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<BreadcrumbsPageProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<BreadcrumbsPageProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<BreadcrumbsPageProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: BreadcrumbsPageSlotProps) => unknown;
    };
  });
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
  Divider: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<BreadcrumbsDividerProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<BreadcrumbsDividerProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<BreadcrumbsDividerProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: BreadcrumbsDividerSlotProps) => unknown;
    };
  });
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
  Ellipsis: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<BreadcrumbsEllipsisProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<BreadcrumbsEllipsisProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<BreadcrumbsEllipsisProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: BreadcrumbsEllipsisSlotProps) => unknown;
    };
  });
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
  Activator: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<BreadcrumbsActivatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<BreadcrumbsActivatorProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<BreadcrumbsActivatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: BreadcrumbsActivatorSlotProps) => unknown;
    };
  });
};
//#endregion
//#region src/components/Button/ButtonContent.vue.d.ts
interface ButtonContentProps {
  /** Unique identifier for ticket registration */
  id?: ID;
  /** Namespace for context injection from parent Button.Root */
  namespace?: string;
}
interface ButtonContentSlotProps {
  isSelected: boolean;
}
declare const _default$164: typeof __VLS_export$164;
declare const __VLS_export$164: __VLS_WithSlots$120<import("vue").DefineComponent<ButtonContentProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ButtonContentProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: ButtonContentSlotProps) => any;
}>;
type __VLS_WithSlots$120<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Button/ButtonGroup.vue.d.ts
interface ButtonGroupProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Disables the entire button group */
  disabled?: boolean;
  /** Single (default) or multi-select */
  multiple?: boolean;
  /**
   * Controls mandatory selection behavior:
   * - false (default): No mandatory enforcement
   * - true: Prevents deselecting the last selected item
   * - `force`: Automatically selects the first non-disabled item on registration
   */
  mandatory?: boolean | 'force';
  /** Accessible name for the group */
  label?: string;
  /** ID of element that labels this group */
  ariaLabelledby?: string;
  /** ID of element that describes this group */
  ariaDescribedby?: string;
}
interface ButtonGroupSlotProps {
  /** Whether the button group is disabled */
  isDisabled: boolean;
  /** Attributes to bind to the root element */
  attrs: {
    'role': 'group';
    'aria-label': string | undefined;
    'aria-labelledby': string | undefined;
    'aria-describedby': string | undefined;
  };
}
declare const useButtonGroup: (key: string, defaultValue?: SelectionContext<SelectionTicket, SelectionTicket<SelectionTicket>> | undefined) => SelectionContext<SelectionTicket, SelectionTicket<SelectionTicket>>, provideButtonGroup: (key: string, context: SelectionContext<SelectionTicket, SelectionTicket<SelectionTicket>>, app?: import("vue").App) => SelectionContext<SelectionTicket, SelectionTicket<SelectionTicket>>;
declare const _default$163: typeof __VLS_export$163;
declare const __VLS_export$163: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$35<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$35<(ButtonGroupProps & {
    modelValue?: T | T[];
  }) & {
    "onUpdate:modelValue"?: ((value: T | T[] | undefined) => any) | undefined;
    "onUpdate:model-value"?: ((value: T | T[]) => any) | undefined;
  }> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: ButtonGroupSlotProps) => any;
  };
  emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$35<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Button/ButtonHiddenInput.vue.d.ts
interface ButtonHiddenInputProps {
  /** Namespace for context injection from parent Button.Root */
  namespace?: string;
  /** Form field name */
  name?: string;
  /** Submitted value (defaults to 'on') */
  value?: string;
  /** Associate with form by ID */
  form?: string;
}
declare const _default$162: typeof __VLS_export$162;
declare const __VLS_export$162: import("vue").DefineComponent<ButtonHiddenInputProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ButtonHiddenInputProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
//#endregion
//#region src/components/Button/ButtonIcon.vue.d.ts
interface ButtonIconProps extends AtomProps {
  /** Namespace for context injection from parent Button.Root */
  namespace?: string;
}
interface ButtonIconSlotProps {
  /** Whether this is an icon-only button */
  isSolo: boolean;
  /** Attributes to bind to the icon element */
  attrs: {
    'aria-hidden': true;
  };
}
declare const _default$161: typeof __VLS_export$161;
declare const __VLS_export$161: __VLS_WithSlots$119<import("vue").DefineComponent<ButtonIconProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ButtonIconProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: ButtonIconSlotProps) => any;
}>;
type __VLS_WithSlots$119<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Button/ButtonLoading.vue.d.ts
interface ButtonLoadingProps {
  /** Unique identifier for ticket registration */
  id?: ID;
  /** Namespace for context injection from parent Button.Root */
  namespace?: string;
}
interface ButtonLoadingSlotProps {
  /** Whether this loading indicator is currently selected/visible */
  isSelected: boolean;
}
declare const _default$160: typeof __VLS_export$160;
declare const __VLS_export$160: __VLS_WithSlots$118<import("vue").DefineComponent<ButtonLoadingProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ButtonLoadingProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: ButtonLoadingSlotProps) => any;
}>;
type __VLS_WithSlots$118<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Button/ButtonRoot.vue.d.ts
interface ButtonRootContext {
  /** The button's value (for group registration / form submission) */
  value: unknown;
  /** Form field name */
  name?: string;
  /** Form association ID */
  form?: string;
  /** Whether the button is in the loading state (after grace period) */
  isLoading: Readonly<Ref<boolean>>;
  /** Whether the button is disabled */
  isDisabled: Readonly<Ref<boolean>>;
  /** Whether the button is readonly */
  isReadonly: Readonly<Ref<boolean>>;
  /** Whether the button is passive */
  isPassive: Readonly<Ref<boolean>>;
  /** Whether the button is selected (in group mode) */
  isSelected: Readonly<Ref<boolean>>;
  /** Whether the button is an icon-only button */
  isSolo: Ref<boolean>;
  /** Internal single selection for Loading/Content visibility */
  single: SingleContext;
}
interface ButtonRootProps<V = unknown> extends AtomProps {
  /** Disables the button — fully non-interactive, removed from tab order */
  disabled?: boolean;
  /** Non-clickable but looks normal, remains focusable/hoverable */
  readonly?: boolean;
  /** Non-clickable, looks disabled via [data-passive], remains focusable/hoverable */
  passive?: boolean;
  /** Triggers loading state with grace period before visual indicator */
  loading?: boolean;
  /** Duration in ms before loading UI appears (0 to show immediately) */
  grace?: number;
  /** Value for use inside Button.Group */
  value?: V;
  /** Namespace for context provision to children */
  namespace?: string;
  /** Namespace for connecting to parent Button.Group */
  groupNamespace?: string;
  /** Form field name — auto-renders HiddenInput when set */
  name?: string;
  /** Associate with form by ID */
  form?: string;
  /** Accessible label for the button */
  ariaLabel?: string;
}
interface ButtonRootSlotProps {
  /** Whether the button is in the loading state (after grace period) */
  isLoading: boolean;
  /** Whether the button is disabled */
  isDisabled: boolean;
  /** Whether the button is readonly */
  isReadonly: boolean;
  /** Whether the button is passive */
  isPassive: boolean;
  /** Whether the button is selected (in group mode) */
  isSelected: boolean;
  /** Attributes to bind to the button element */
  attrs: {
    'type': 'button' | undefined;
    'role': 'button';
    'disabled': true | undefined;
    'aria-disabled': boolean;
    'aria-busy': true | undefined;
    'aria-pressed': boolean | undefined;
    'aria-label': string | undefined;
    'tabindex': 0 | -1 | undefined;
    'data-loading': true | undefined;
    'data-passive': true | undefined;
    'data-readonly': true | undefined;
    'data-disabled': true | undefined;
    'data-selected': true | undefined;
    'data-solo': true | undefined;
    'onClick': (() => void) | undefined;
    'onKeydown': ((e: KeyboardEvent) => void) | undefined;
  };
}
declare const useButtonRoot: (key: string, defaultValue?: ButtonRootContext | undefined) => ButtonRootContext, provideButtonRoot: (key: string, context: ButtonRootContext, app?: import("vue").App) => ButtonRootContext;
declare const _default$159: typeof __VLS_export$159;
declare const __VLS_export$159: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$34<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$34<ButtonRootProps<V>> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: ButtonRootSlotProps) => any;
  };
  emit: {};
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$34<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Button/index.d.ts
/**
 * Button component with sub-components for interactive button controls.
 *
 * @see https://0.vuetifyjs.com/components/actions/button
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 *   import { Button } from '@vuetify/v0'
 * </script>
 *
 * <template>
 *   <Button.Root>
 *     <Button.Content>Click me</Button.Content>
 *   </Button.Root>
 * </template>
 * ```
 */
declare const Button: {
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
   * </script>
   *
   * <template>
   *   <Button.Root>
   *     <Button.Content>Submit</Button.Content>
   *   </Button.Root>
   * </template>
   * ```
   */
  Content: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<ButtonContentProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ButtonContentProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<ButtonContentProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: ButtonContentSlotProps) => any;
    };
  });
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
   * </script>
   *
   * <template>
   *   <Button.Group v-model="selected">
   *     <Button.Root value="bold">B</Button.Root>
   *     <Button.Root value="italic">I</Button.Root>
   *   </Button.Group>
   * </template>
   * ```
   */
  Group: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
    slots: {
      default: (props: ButtonGroupSlotProps) => any;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      namespace?: string | undefined;
      disabled?: boolean | undefined;
      multiple?: boolean | undefined;
      mandatory?: boolean | "force" | undefined;
      label?: string | undefined;
      ariaLabelledby?: string | undefined;
      ariaDescribedby?: string | undefined;
      as?: (DOMElement | null) | undefined;
      renderless?: boolean | undefined;
      modelValue?: (T | T[]) | undefined;
      "onUpdate:modelValue"?: ((value: T | T[] | undefined) => any) | undefined;
      "onUpdate:model-value"?: ((value: T | T[]) => any) | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: ButtonGroupSlotProps) => any;
    };
    emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
  /**
   * Hidden input component for form submission.
   *
   * @see https://0.vuetifyjs.com/components/actions/button
   *
   * @example
   * ```vue
   * <script setup lang="ts">
   *   import { Button } from '@vuetify/v0'
   * </script>
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
  HiddenInput: import("vue").DefineComponent<ButtonHiddenInputProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ButtonHiddenInputProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
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
   * </script>
   *
   * <template>
   *   <Button.Root aria-label="Close">
   *     <Button.Icon>✕</Button.Icon>
   *   </Button.Root>
   * </template>
   * ```
   */
  Icon: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<ButtonIconProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ButtonIconProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<ButtonIconProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: ButtonIconSlotProps) => any;
    };
  });
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
   * </script>
   *
   * <template>
   *   <Button.Root :loading @click="loading = true">
   *     <Button.Loading>Saving...</Button.Loading>
   *     <Button.Content>Save</Button.Content>
   *   </Button.Root>
   * </template>
   * ```
   */
  Loading: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<ButtonLoadingProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ButtonLoadingProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<ButtonLoadingProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: ButtonLoadingSlotProps) => any;
    };
  });
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
   * </script>
   *
   * <template>
   *   <Button.Root>
   *     <Button.Content>Click me</Button.Content>
   *   </Button.Root>
   * </template>
   * ```
   */
  Root: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: {};
    slots: {
      default: (props: ButtonRootSlotProps) => any;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      disabled?: boolean | undefined;
      readonly?: boolean | undefined;
      passive?: boolean | undefined;
      loading?: boolean | undefined;
      grace?: number | undefined;
      value?: V | undefined;
      namespace?: string | undefined;
      groupNamespace?: string | undefined;
      name?: string | undefined;
      form?: string | undefined;
      ariaLabel?: string | undefined;
      as?: (DOMElement | null) | undefined;
      renderless?: boolean | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: ButtonRootSlotProps) => any;
    };
    emit: {};
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
};
//#endregion
//#region src/components/Carousel/CarouselRoot.vue.d.ts
type CarouselOrientation = 'horizontal' | 'vertical';
interface CarouselTicket extends StepTicket {
  /** Element reference for DOM measurement */
  el?: MaybeRefOrGetter<Element | null>;
}
interface CarouselRootProps extends AtomProps {
  /** Unique identifier for the carousel */
  id?: string;
  /** Accessible label for the carousel region */
  label?: string;
  /** Namespace for dependency injection (must match child namespace) */
  namespace?: string;
  /** Disables the entire carousel */
  disabled?: boolean;
  /** Whether navigation wraps around from last to first */
  circular?: boolean;
  /** Carousel orientation */
  orientation?: CarouselOrientation;
  /** Number of slides visible at once */
  perView?: number;
  /** Autoplay interval in milliseconds. 0 disables autoplay. */
  autoplay?: number;
  /** Scroll behavior for programmatic navigation */
  behavior?: ScrollBehavior;
}
interface CarouselRootSlotProps {
  /** Whether the carousel is disabled */
  isDisabled: boolean;
  /** Current orientation */
  orientation: CarouselOrientation;
  /** Number of slides visible at once */
  perView: number;
  /** Select the first slide */
  first: () => void;
  /** Select the last slide */
  last: () => void;
  /** Select the next slide */
  next: () => void;
  /** Select the previous slide */
  prev: () => void;
  /** Step forward or backward by a specific count */
  step: (count: number) => void;
  /** Select a slide by ID */
  select: (id: ID) => void;
  /** Whether autoplay is active */
  isAutoplay: boolean;
  /** Whether autoplay is paused */
  isPaused: boolean;
  /** Milliseconds remaining until next slide */
  remaining: number;
  /** Start or restart autoplay from full interval */
  play: () => void;
  /** Stop autoplay and reset timer */
  stop: () => void;
  /** Pause autoplay, preserving remaining time */
  pause: () => void;
  /** Resume autoplay from where it was paused */
  resume: () => void;
  /** Attributes to bind to the root element */
  attrs: {
    'role': 'region';
    'aria-roledescription': 'carousel';
    'aria-label': string;
    'aria-disabled': boolean;
    'data-disabled': true | undefined;
  };
}
interface CarouselPartTicket extends RegistryTicketInput {
  type: 'viewport' | 'previous' | 'next' | 'indicator' | 'progress' | 'live-region';
  el: MaybeRefOrGetter<Element | null>;
}
interface CarouselContext extends StepContext<CarouselTicket> {
  /** Carousel orientation */
  orientation: Ref<CarouselOrientation>;
  /** Number of slides visible at once */
  perView: Ref<number>;
  /** Whether navigation wraps around */
  circular: Ref<boolean>;
  /** Root ID for generating sub-component IDs */
  rootId: string;
  /** Scroll behavior for programmatic navigation */
  behavior: Ref<ScrollBehavior>;
  /** Registry for structural sub-components */
  parts: RegistryContext<CarouselPartTicket>;
  /** Autoplay interval duration in ms (0 = disabled) */
  autoplay: Readonly<Ref<number>>;
  /** Milliseconds remaining until next auto-advance */
  remaining: Readonly<Ref<number>>;
  /** Whether autoplay is currently active */
  isAutoplay: Readonly<Ref<boolean>>;
  /** Whether autoplay is currently paused */
  isPaused: Readonly<Ref<boolean>>;
  /** Restart autoplay from full interval */
  play: () => void;
  /** Pause autoplay timer */
  pause: () => void;
  /** Resume autoplay timer from remaining time */
  resume: () => void;
}
declare const useCarouselRoot: (key: string, defaultValue?: CarouselContext | undefined) => CarouselContext, provideCarouselRoot: (key: string, context: CarouselContext, app?: import("vue").App) => CarouselContext;
declare const _default$158: typeof __VLS_export$158;
declare const __VLS_export$158: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$33<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$33<(CarouselRootProps & {
    modelValue?: T | T[];
  }) & {
    "onUpdate:modelValue"?: ((value: T | T[] | undefined) => any) | undefined;
  }> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: CarouselRootSlotProps) => any;
  };
  emit: (event: "update:modelValue", value: T | T[] | undefined) => void;
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$33<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Carousel/CarouselViewport.vue.d.ts
interface CarouselViewportProps extends AtomProps {
  /** Namespace for connecting to parent Carousel.Root */
  namespace?: string;
}
interface CarouselViewportSlotProps {
  /** Whether the user is currently dragging/scrolling */
  isDragging: boolean;
  /** Attributes to bind to the viewport element */
  attrs: {
    'id': string;
    'data-orientation': 'horizontal' | 'vertical';
    'data-dragging': true | undefined;
    'style': Record<string, string | number>;
  };
}
declare const _default$157: typeof __VLS_export$157;
declare const __VLS_export$157: __VLS_WithSlots$117<import("vue").DefineComponent<CarouselViewportProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<CarouselViewportProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: CarouselViewportSlotProps) => any;
}>;
type __VLS_WithSlots$117<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Carousel/CarouselItem.vue.d.ts
interface CarouselItemProps<V = unknown> extends AtomProps {
  /** Unique identifier (auto-generated if not provided) */
  id?: ID;
  /** Value associated with this slide */
  value?: V;
  /** Disables this specific slide */
  disabled?: MaybeRefOrGetter<boolean>;
  /** Namespace for dependency injection */
  namespace?: string;
}
interface CarouselItemSlotProps {
  /** Unique identifier */
  id: string;
  /** Whether this slide is the selected (anchor) slide */
  isSelected: boolean;
  /** Whether this slide is in the visible window */
  isActive: boolean;
  /** Whether this slide is disabled */
  isDisabled: boolean;
  /** Slide index in the carousel */
  index: number;
  /** Select this slide */
  select: () => void;
  /** Unselect this slide */
  unselect: () => void;
  /** Toggle this slide's selection state */
  toggle: () => void;
  /** Attributes to bind to the slide element */
  attrs: {
    'id': string;
    'role': 'group';
    'aria-roledescription': 'slide';
    'aria-label': string;
    'aria-hidden': true | undefined;
    'data-selected': true | undefined;
    'data-active': true | undefined;
    'data-disabled': true | undefined;
    'data-index': number;
    'style': Record<string, string>;
  };
}
declare const _default$156: typeof __VLS_export$156;
declare const __VLS_export$156: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$32<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$32<CarouselItemProps<V>> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: CarouselItemSlotProps) => any;
  };
  emit: {};
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$32<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Carousel/CarouselPrevious.vue.d.ts
interface CarouselPreviousProps extends AtomProps {
  /** Namespace for connecting to parent Carousel.Root */
  namespace?: string;
}
interface CarouselPreviousSlotProps {
  /** Whether the button is disabled */
  isDisabled: boolean;
  /** Whether the carousel is at the first slide (non-circular) */
  isAtEdge: boolean;
  /** Attributes to bind to the button element */
  attrs: {
    'type': 'button' | undefined;
    'role': 'button' | undefined;
    'tabindex': number;
    'aria-label': string;
    'aria-controls': string;
    'aria-disabled': boolean;
    'disabled': boolean | undefined;
    'data-disabled': true | undefined;
    'data-edge': true | undefined;
    'onClick': () => void;
    'onKeydown': ((e: KeyboardEvent) => void) | undefined;
  };
}
declare const _default$155: typeof __VLS_export$155;
declare const __VLS_export$155: __VLS_WithSlots$116<import("vue").DefineComponent<CarouselPreviousProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<CarouselPreviousProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: CarouselPreviousSlotProps) => any;
}>;
type __VLS_WithSlots$116<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Carousel/CarouselNext.vue.d.ts
interface CarouselNextProps extends AtomProps {
  /** Namespace for connecting to parent Carousel.Root */
  namespace?: string;
}
interface CarouselNextSlotProps {
  /** Whether the button is disabled */
  isDisabled: boolean;
  /** Whether the carousel is at the last slide (non-circular) */
  isAtEdge: boolean;
  /** Attributes to bind to the button element */
  attrs: {
    'type': 'button' | undefined;
    'role': 'button' | undefined;
    'tabindex': number;
    'aria-label': string;
    'aria-controls': string;
    'aria-disabled': boolean;
    'disabled': boolean | undefined;
    'data-disabled': true | undefined;
    'data-edge': true | undefined;
    'onClick': () => void;
    'onKeydown': ((e: KeyboardEvent) => void) | undefined;
  };
}
declare const _default$154: typeof __VLS_export$154;
declare const __VLS_export$154: __VLS_WithSlots$115<import("vue").DefineComponent<CarouselNextProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<CarouselNextProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: CarouselNextSlotProps) => any;
}>;
type __VLS_WithSlots$115<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Carousel/CarouselIndicator.vue.d.ts
interface CarouselIndicatorProps extends AtomProps {
  /** Accessible label for the indicator group */
  label?: string;
  /** Namespace for connecting to parent Carousel.Root */
  namespace?: string;
}
interface CarouselIndicatorItem {
  /** Slide index (0-based) */
  index: number;
  /** Whether this indicator's slide is selected */
  isSelected: boolean;
  /** Whether this indicator's slide is in the visible window */
  isActive: boolean;
  /** Attributes to bind to each indicator element */
  attrs: {
    'role': 'tab';
    'tabindex': 0 | -1;
    'aria-selected': boolean;
    'aria-controls': string;
    'aria-label': string;
    'data-selected': true | undefined;
    'data-active': true | undefined;
    'onClick': () => void;
    'onKeydown': (e: KeyboardEvent) => void;
  };
}
interface CarouselIndicatorSlotProps {
  /** Total number of slides */
  size: number;
  /** Currently selected slide index */
  selectedIndex: number;
  /** Array of indicator items with per-dot state and attrs */
  items: CarouselIndicatorItem[];
  /** Attributes to bind to the indicator container */
  attrs: {
    'role': 'tablist';
    'aria-label': string;
    'aria-orientation': 'horizontal' | 'vertical';
  };
}
declare const _default$153: typeof __VLS_export$153;
declare const __VLS_export$153: __VLS_WithSlots$114<import("vue").DefineComponent<CarouselIndicatorProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<CarouselIndicatorProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: CarouselIndicatorSlotProps) => any;
}>;
type __VLS_WithSlots$114<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Carousel/CarouselProgress.vue.d.ts
interface CarouselProgressProps extends AtomProps {
  /** Namespace for connecting to parent Carousel.Root */
  namespace?: string;
}
interface CarouselProgressSlotProps {
  /** Progress value from 0 to 1 */
  progress: number;
  /** Whether autoplay is currently active */
  isAutoplay: boolean;
  /** Whether autoplay is paused */
  isPaused: boolean;
  /** Attributes to bind to the progress element */
  attrs: {
    'role': 'progressbar';
    'aria-valuenow': number;
    'aria-valuemin': 0;
    'aria-valuemax': 100;
    'aria-valuetext': string;
    'aria-label': string;
    'data-state': 'active' | 'paused' | 'idle';
    'style': {
      width: string;
    };
  };
}
declare const _default$152: typeof __VLS_export$152;
declare const __VLS_export$152: __VLS_WithSlots$113<import("vue").DefineComponent<CarouselProgressProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<CarouselProgressProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: CarouselProgressSlotProps) => any;
}>;
type __VLS_WithSlots$113<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Carousel/CarouselLiveRegion.vue.d.ts
interface CarouselLiveRegionProps extends AtomProps {
  /** Namespace for connecting to parent Carousel.Root */
  namespace?: string;
}
interface CarouselLiveRegionSlotProps {
  /** Current slide number (1-indexed) */
  current: number;
  /** Total number of slides */
  size: number;
  /** Announcement text */
  text: string;
  /** Attributes to bind to the live region element */
  attrs: {
    'aria-atomic': true;
    'aria-live': 'polite';
    'role': 'status';
  };
}
declare const _default$151: typeof __VLS_export$151;
declare const __VLS_export$151: __VLS_WithSlots$112<import("vue").DefineComponent<CarouselLiveRegionProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<CarouselLiveRegionProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: CarouselLiveRegionSlotProps) => any;
}>;
type __VLS_WithSlots$112<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Carousel/index.d.ts
/**
 * Carousel component with sub-components for building accessible slide navigation.
 *
 * @see https://0.vuetifyjs.com/components/semantic/carousel
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 *   import { Carousel } from '@vuetify/v0'
 * </script>
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
declare const Carousel: {
  /**
   * Root component that provides carousel context.
   *
   * @see https://0.vuetifyjs.com/components/semantic/carousel
   *
   * @example
   * ```vue
   * <script setup lang="ts">
   *   import { Carousel } from '@vuetify/v0'
   * </script>
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
  Root: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: (event: "update:modelValue", value: T | T[] | undefined) => void;
    slots: {
      default: (props: CarouselRootSlotProps) => any;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      id?: string | undefined;
      label?: string | undefined;
      namespace?: string | undefined;
      disabled?: boolean | undefined;
      circular?: boolean | undefined;
      orientation?: CarouselOrientation | undefined;
      perView?: number | undefined;
      autoplay?: number | undefined;
      behavior?: ScrollBehavior | undefined;
      as?: (DOMElement | null) | undefined;
      renderless?: boolean | undefined;
      modelValue?: (T | T[]) | undefined;
      "onUpdate:modelValue"?: ((value: T | T[] | undefined) => any) | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: CarouselRootSlotProps) => any;
    };
    emit: (event: "update:modelValue", value: T | T[] | undefined) => void;
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
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
  Viewport: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<CarouselViewportProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<CarouselViewportProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<CarouselViewportProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: CarouselViewportSlotProps) => any;
    };
  });
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
  Item: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: {};
    slots: {
      default: (props: CarouselItemSlotProps) => any;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      id?: ID | undefined;
      value?: V | undefined;
      disabled?: import("vue").MaybeRefOrGetter<boolean> | undefined;
      namespace?: string | undefined;
      as?: (DOMElement | null) | undefined;
      renderless?: boolean | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: CarouselItemSlotProps) => any;
    };
    emit: {};
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
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
  Previous: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<CarouselPreviousProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<CarouselPreviousProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<CarouselPreviousProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: CarouselPreviousSlotProps) => any;
    };
  });
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
  Next: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<CarouselNextProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<CarouselNextProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<CarouselNextProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: CarouselNextSlotProps) => any;
    };
  });
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
  Indicator: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<CarouselIndicatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<CarouselIndicatorProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<CarouselIndicatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: CarouselIndicatorSlotProps) => any;
    };
  });
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
  Progress: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<CarouselProgressProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<CarouselProgressProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<CarouselProgressProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: CarouselProgressSlotProps) => any;
    };
  });
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
  LiveRegion: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<CarouselLiveRegionProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<CarouselLiveRegionProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<CarouselLiveRegionProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: CarouselLiveRegionSlotProps) => any;
    };
  });
};
//#endregion
//#region src/components/Checkbox/CheckboxGroup.vue.d.ts
interface CheckboxGroupProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Disables the entire checkbox group */
  disabled?: boolean;
  /** Auto-select non-disabled items on registration */
  enroll?: boolean;
  /**
   * Controls mandatory checkbox behavior:
   * - false (default): No mandatory enforcement
   * - true: Prevents deselecting the last selected item
   * - `force`: Automatically selects the first non-disabled item on registration
   */
  mandatory?: boolean | 'force';
  /** Accessible name for the group */
  label?: string;
  /** ID of element that labels this group */
  ariaLabelledby?: string;
  /** ID of element that describes this group */
  ariaDescribedby?: string;
}
interface CheckboxGroupSlotProps {
  /** Whether the checkbox group is disabled */
  isDisabled: boolean;
  /** Whether no items are currently selected */
  isNoneSelected: boolean;
  /** Whether all selectable (non-disabled) items are selected */
  isAllSelected: boolean;
  /** Whether some but not all selectable items are selected */
  isMixed: boolean;
  /** Select an item by ID */
  select: (id: ID | ID[]) => void;
  /** Unselect an item by ID */
  unselect: (id: ID | ID[]) => void;
  /** Toggle an item's selection state by ID */
  toggle: (id: ID | ID[]) => void;
  /** Select all selectable (non-disabled) items */
  selectAll: () => void;
  /** Unselect all items (respects mandatory option) */
  unselectAll: () => void;
  /** Toggle between all selected and none selected */
  toggleAll: () => void;
  /** Attributes to bind to the root element */
  attrs: {
    'role': 'group';
    'aria-label': string | undefined;
    'aria-labelledby': string | undefined;
    'aria-describedby': string | undefined;
  };
}
declare const useCheckboxGroup: (key: string, defaultValue?: GroupContext<GroupTicket, GroupTicket<GroupTicket>> | undefined) => GroupContext<GroupTicket, GroupTicket<GroupTicket>>, provideCheckboxGroup: (key: string, context: GroupContext<GroupTicket, GroupTicket<GroupTicket>>, app?: import("vue").App) => GroupContext<GroupTicket, GroupTicket<GroupTicket>>;
declare const _default$150: typeof __VLS_export$150;
declare const __VLS_export$150: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$31<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$31<(CheckboxGroupProps & {
    modelValue?: T | T[];
  }) & {
    "onUpdate:modelValue"?: ((value: T | T[] | undefined) => any) | undefined;
    "onUpdate:model-value"?: ((value: T | T[]) => any) | undefined;
  }> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: CheckboxGroupSlotProps) => any;
  };
  emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$31<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Checkbox/CheckboxHiddenInput.vue.d.ts
interface CheckboxHiddenInputProps {
  /** Namespace for context injection from parent Checkbox.Root */
  namespace?: string;
  /** Form field name (defaults to context value) */
  name?: string;
  /** Submitted value when checked (defaults to context value or 'on') */
  value?: string;
  /** Associate with form by ID (defaults to context value) */
  form?: string;
}
declare const _default$149: typeof __VLS_export$149;
declare const __VLS_export$149: import("vue").DefineComponent<CheckboxHiddenInputProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<CheckboxHiddenInputProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
//#endregion
//#region src/components/Checkbox/CheckboxRoot.vue.d.ts
/** Visual state of the checkbox for styling purposes */
type CheckboxState = 'checked' | 'unchecked' | 'indeterminate';
interface CheckboxRootContext<V = unknown> {
  /** Unique identifier */
  readonly id: ID;
  /** Optional display label */
  readonly label?: string;
  /** Value associated with this checkbox */
  readonly value: V | undefined;
  /** Form field name (triggers auto hidden input when provided) */
  readonly name?: string;
  /** Associate with form by ID */
  readonly form?: string;
  /** Whether this checkbox is currently checked */
  isChecked: Readonly<Ref<boolean>>;
  /** Whether this checkbox is in a mixed/indeterminate state */
  isMixed: Readonly<Ref<boolean>>;
  /** Whether this checkbox is disabled */
  isDisabled: Readonly<Ref<boolean>>;
  /** Check this checkbox */
  select: () => void;
  /** Uncheck this checkbox */
  unselect: () => void;
  /** Toggle this checkbox's state */
  toggle: () => void;
  /** Set this checkbox to mixed/indeterminate state (group mode only) */
  mix: () => void;
  /** Clear mixed/indeterminate state (group mode only) */
  unmix: () => void;
}
interface CheckboxRootProps<V = unknown> extends AtomProps {
  /** Unique identifier (auto-generated if not provided) */
  id?: ID;
  /** Optional display label (passed through to slot) */
  label?: string;
  /** Value associated with this checkbox (used in group mode and form submission) */
  value?: V;
  /** Form field name - triggers auto hidden input when provided */
  name?: string;
  /** Associate with form by ID */
  form?: string;
  /** Disables this checkbox */
  disabled?: MaybeRefOrGetter<boolean>;
  /** Sets the indeterminate state */
  indeterminate?: MaybeRefOrGetter<boolean>;
  /** Namespace for context provision to children (Indicator, HiddenInput) */
  namespace?: string;
  /** Namespace for connecting to parent Checkbox.Group */
  groupNamespace?: string;
  /** ID of element that labels this checkbox */
  ariaLabelledby?: string;
  /** ID of element that describes this checkbox */
  ariaDescribedby?: string;
  /** Whether the checkbox has an invalid value */
  ariaInvalid?: boolean;
}
interface CheckboxRootSlotProps<V = unknown> {
  /** Unique identifier */
  id: ID;
  /** Optional display label */
  label?: string;
  /** Value associated with this checkbox */
  value: V | undefined;
  /** Whether this checkbox is currently checked */
  isChecked: boolean;
  /** Whether this checkbox is in a mixed/indeterminate state */
  isMixed: boolean;
  /** Whether this checkbox is disabled */
  isDisabled: boolean;
  /** Check this checkbox */
  select: () => void;
  /** Uncheck this checkbox */
  unselect: () => void;
  /** Toggle this checkbox's state */
  toggle: () => void;
  /** Set this checkbox to mixed/indeterminate state (group mode only) */
  mix: () => void;
  /** Clear mixed/indeterminate state (group mode only) */
  unmix: () => void;
  /** Attributes to bind to the checkbox element */
  attrs: {
    'type': 'button' | undefined;
    'role': 'checkbox';
    'aria-checked': boolean | 'mixed';
    'aria-disabled': boolean;
    'aria-label': string | undefined;
    'aria-labelledby': string | undefined;
    'aria-describedby': string | undefined;
    'aria-invalid': boolean | undefined;
    'tabindex': 0 | undefined;
    'data-state': CheckboxState;
    'data-disabled': true | undefined;
    'onClick': () => void;
    'onKeydown': (e: KeyboardEvent) => void;
  };
}
declare const useCheckboxRoot: (key: string, defaultValue?: CheckboxRootContext<unknown> | undefined) => CheckboxRootContext<unknown>, provideCheckboxRoot: (key: string, context: CheckboxRootContext<unknown>, app?: import("vue").App) => CheckboxRootContext<unknown>;
declare const _default$148: typeof __VLS_export$148;
declare const __VLS_export$148: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$30<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$30<(CheckboxRootProps<V> & {
    modelValue?: boolean;
  }) & {
    "onUpdate:modelValue"?: ((value: boolean | undefined) => any) | undefined;
    "onUpdate:model-value"?: ((value: boolean) => any) | undefined;
  }> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: CheckboxRootSlotProps<V>) => any;
  };
  emit: ((evt: "update:model-value", value: boolean) => void) & ((event: "update:modelValue", value: boolean | undefined) => void);
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$30<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Checkbox/CheckboxIndicator.vue.d.ts
interface CheckboxIndicatorProps extends AtomProps {
  /** Namespace for context injection from parent Checkbox.Root */
  namespace?: string;
}
interface CheckboxIndicatorSlotProps {
  /** Whether this checkbox is currently checked */
  isChecked: boolean;
  /** Whether this checkbox is in a mixed/indeterminate state */
  isMixed: boolean;
  /** Attributes to bind to the indicator element */
  attrs: {
    'data-state': CheckboxState;
    'style': {
      visibility: 'visible' | 'hidden';
    };
  };
}
declare const _default$147: typeof __VLS_export$147;
declare const __VLS_export$147: __VLS_WithSlots$111<import("vue").DefineComponent<CheckboxIndicatorProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<CheckboxIndicatorProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: CheckboxIndicatorSlotProps) => any;
}>;
type __VLS_WithSlots$111<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Checkbox/CheckboxSelectAll.vue.d.ts
interface CheckboxSelectAllProps extends AtomProps {
  /** Optional display label (passed through to slot and aria-label) */
  label?: string;
  /** Disables this checkbox */
  disabled?: boolean;
  /** Namespace for context provision to children (Indicator) */
  namespace?: string;
  /** Namespace for connecting to parent Checkbox.Group */
  groupNamespace?: string;
  /** ID of element that labels this checkbox */
  ariaLabelledby?: string;
  /** ID of element that describes this checkbox */
  ariaDescribedby?: string;
}
interface CheckboxSelectAllSlotProps {
  /** Optional display label */
  label?: string;
  /** Whether all selectable items are selected */
  isAllSelected: boolean;
  /** Whether some but not all selectable items are selected */
  isMixed: boolean;
  /** Whether this checkbox is disabled */
  isDisabled: boolean;
  /** Select all selectable items */
  selectAll: () => void;
  /** Unselect all items */
  unselectAll: () => void;
  /** Toggle between all selected and none selected */
  toggleAll: () => void;
  /** Attributes to bind to the checkbox element */
  attrs: {
    'type': 'button' | undefined;
    'role': 'checkbox';
    'aria-checked': boolean | 'mixed';
    'aria-disabled': boolean;
    'aria-label': string | undefined;
    'aria-labelledby': string | undefined;
    'aria-describedby': string | undefined;
    'tabindex': 0 | undefined;
    'data-state': CheckboxState;
    'data-disabled': true | undefined;
    'onClick': () => void;
    'onKeydown': (e: KeyboardEvent) => void;
  };
}
declare const _default$146: typeof __VLS_export$146;
declare const __VLS_export$146: __VLS_WithSlots$110<import("vue").DefineComponent<CheckboxSelectAllProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<CheckboxSelectAllProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: CheckboxSelectAllSlotProps) => any;
}>;
type __VLS_WithSlots$110<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Checkbox/index.d.ts
/**
 * Checkbox component with sub-components for checkbox controls.
 *
 * @see https://0.vuetifyjs.com/components/forms/checkbox
 *
 * @example
 * ```vue
 * <script lang="ts" setup>
 *   import { Checkbox } from '@vuetify/v0'
 * </script>
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
declare const Checkbox: {
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
   * </script>
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
  Group: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
    slots: {
      default: (props: CheckboxGroupSlotProps) => any;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      namespace?: string | undefined;
      disabled?: boolean | undefined;
      enroll?: boolean | undefined;
      mandatory?: boolean | "force" | undefined;
      label?: string | undefined;
      ariaLabelledby?: string | undefined;
      ariaDescribedby?: string | undefined;
      as?: (DOMElement | null) | undefined;
      renderless?: boolean | undefined;
      modelValue?: (T | T[]) | undefined;
      "onUpdate:modelValue"?: ((value: T | T[] | undefined) => any) | undefined;
      "onUpdate:model-value"?: ((value: T | T[]) => any) | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: CheckboxGroupSlotProps) => any;
    };
    emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
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
   * </script>
   *
   * <template>
   *   <Checkbox.Root>
   *     <Checkbox.Indicator>✓</Checkbox.Indicator>
   *     <Checkbox.HiddenInput name="agree" value="yes" />
   *   </Checkbox.Root>
   * </template>
   * ```
   */
  HiddenInput: import("vue").DefineComponent<CheckboxHiddenInputProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<CheckboxHiddenInputProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
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
   * </script>
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
  Indicator: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<CheckboxIndicatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<CheckboxIndicatorProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<CheckboxIndicatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: CheckboxIndicatorSlotProps) => any;
    };
  });
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
   * </script>
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
  Root: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: ((evt: "update:model-value", value: boolean) => void) & ((event: "update:modelValue", value: boolean | undefined) => void);
    slots: {
      default: (props: CheckboxRootSlotProps<V>) => any;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      id?: ID | undefined;
      label?: string | undefined;
      value?: V | undefined;
      name?: string | undefined;
      form?: string | undefined;
      disabled?: import("vue").MaybeRefOrGetter<boolean> | undefined;
      indeterminate?: import("vue").MaybeRefOrGetter<boolean> | undefined;
      namespace?: string | undefined;
      groupNamespace?: string | undefined;
      ariaLabelledby?: string | undefined;
      ariaDescribedby?: string | undefined;
      ariaInvalid?: boolean | undefined;
      as?: (DOMElement | null) | undefined;
      renderless?: boolean | undefined;
      modelValue?: boolean | undefined;
      "onUpdate:modelValue"?: ((value: boolean | undefined) => any) | undefined;
      "onUpdate:model-value"?: ((value: boolean) => any) | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: CheckboxRootSlotProps<V>) => any;
    };
    emit: ((evt: "update:model-value", value: boolean) => void) & ((event: "update:modelValue", value: boolean | undefined) => void);
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
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
   * </script>
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
  SelectAll: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<CheckboxSelectAllProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<CheckboxSelectAllProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<CheckboxSelectAllProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: CheckboxSelectAllSlotProps) => any;
    };
  });
};
//#endregion
//#region src/components/Collapsible/CollapsibleRoot.vue.d.ts
interface CollapsibleContext {
  open: Readonly<Ref<boolean>>;
  disabled: Readonly<Ref<boolean>>;
  activatorId: Readonly<Ref<string>>;
  contentId: Readonly<Ref<string>>;
  toggle: () => void;
  show: () => void;
  hide: () => void;
}
interface CollapsibleRootProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Whether the collapsible is disabled */
  disabled?: boolean;
}
interface CollapsibleRootSlotProps {
  /** Whether the collapsible is open */
  isOpen: boolean;
  /** Whether the collapsible is disabled */
  isDisabled: boolean;
  /** Open the collapsible */
  open: () => void;
  /** Close the collapsible */
  close: () => void;
  /** Toggle the collapsible */
  toggle: () => void;
  /** Attributes to bind to the root element */
  attrs: {
    'data-state': 'open' | 'closed';
    'data-disabled': true | undefined;
  };
}
declare const useCollapsible: (key: string, defaultValue?: CollapsibleContext | undefined) => CollapsibleContext, provideCollapsible: (key: string, context: CollapsibleContext, app?: import("vue").App) => CollapsibleContext;
declare const _default$145: typeof __VLS_export$145;
declare const __VLS_export$145: __VLS_WithSlots$109<import("vue").DefineComponent<CollapsibleRootProps & {
  modelValue?: boolean;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
  "update:modelValue": (value: boolean) => any;
  "update:model-value": (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<CollapsibleRootProps & {
  modelValue?: boolean;
}> & Readonly<{
  "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
  "onUpdate:model-value"?: ((value: boolean) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: CollapsibleRootSlotProps) => any;
}>;
type __VLS_WithSlots$109<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Collapsible/CollapsibleActivator.vue.d.ts
interface CollapsibleActivatorProps extends AtomProps {
  namespace?: string;
}
interface CollapsibleActivatorSlotProps {
  /** Whether the collapsible is open */
  isOpen: boolean;
  /** Whether the collapsible is disabled */
  isDisabled: boolean;
  /** Toggle the collapsible */
  toggle: () => void;
  /** Attributes to bind to the activator element for accessibility */
  attrs: {
    /** Unique ID for the activator element */
    'id': string;
    /** ARIA role for accessibility (only set when not using native button) */
    'role': 'button' | undefined;
    /** Tab index for keyboard navigation */
    'tabindex': number;
    /** ARIA expanded state */
    'aria-expanded': boolean;
    /** ARIA controls attribute pointing to content region */
    'aria-controls': string;
    /** ARIA disabled state (for non-button elements) */
    'aria-disabled': boolean | undefined;
    /** Data attribute for open/closed state */
    'data-state': 'open' | 'closed';
    /** Data attribute for disabled state */
    'data-disabled': true | undefined;
    /** Disabled attribute for native button elements */
    'disabled': boolean | undefined;
    /** Type attribute for native button elements */
    'type': 'button' | undefined;
    /** Click handler to toggle */
    'onClick': () => void;
    /** Keyboard handler for Enter and Space keys */
    'onKeydown': ((e: KeyboardEvent) => void) | undefined;
  };
}
declare const _default$144: typeof __VLS_export$144;
declare const __VLS_export$144: __VLS_WithSlots$108<import("vue").DefineComponent<CollapsibleActivatorProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<CollapsibleActivatorProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: CollapsibleActivatorSlotProps) => any;
}>;
type __VLS_WithSlots$108<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Collapsible/CollapsibleCue.vue.d.ts
interface CollapsibleCueProps extends AtomProps {
  namespace?: string;
}
interface CollapsibleCueSlotProps {
  isOpen: boolean;
  attrs: {
    'aria-hidden': true;
    'data-state': 'open' | 'closed';
  };
}
declare const _default$143: typeof __VLS_export$143;
declare const __VLS_export$143: __VLS_WithSlots$107<import("vue").DefineComponent<CollapsibleCueProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<CollapsibleCueProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: CollapsibleCueSlotProps) => any;
}>;
type __VLS_WithSlots$107<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Collapsible/CollapsibleContent.vue.d.ts
interface CollapsibleContentProps extends AtomProps {
  namespace?: string;
}
interface CollapsibleContentSlotProps {
  /** Whether the collapsible is open */
  isOpen: boolean;
  /** Attributes to bind to the content element for accessibility */
  attrs: {
    /** Unique ID for the content region */
    'id': string;
    /** ARIA role for accessibility */
    'role': 'region';
    /** ARIA labelledby attribute pointing to trigger element */
    'aria-labelledby': string;
    /** Whether the content is hidden */
    'hidden': boolean;
    /** Data attribute for open/closed state */
    'data-state': 'open' | 'closed';
    /** Data attribute for disabled state */
    'data-disabled': true | undefined;
  };
}
declare const _default$142: typeof __VLS_export$142;
declare const __VLS_export$142: __VLS_WithSlots$106<import("vue").DefineComponent<CollapsibleContentProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<CollapsibleContentProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: CollapsibleContentSlotProps) => any;
}>;
type __VLS_WithSlots$106<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Collapsible/index.d.ts
/**
 * A single-item disclosure toggle for showing and hiding content.
 *
 * @see https://0.vuetifyjs.com/components/disclosure/collapsible
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 *   import { Collapsible } from '@vuetify/v0'
 * </script>
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
declare const Collapsible: {
  Root: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<CollapsibleRootProps & {
      modelValue?: boolean;
    }> & Readonly<{
      "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
      "onUpdate:model-value"?: ((value: boolean) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
      "update:modelValue": (value: boolean) => any;
      "update:model-value": (value: boolean) => any;
    }, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<CollapsibleRootProps & {
      modelValue?: boolean;
    }> & Readonly<{
      "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
      "onUpdate:model-value"?: ((value: boolean) => any) | undefined;
    }>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<CollapsibleRootProps & {
    modelValue?: boolean;
  }> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    "onUpdate:model-value"?: ((value: boolean) => any) | undefined;
  }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => any;
    "update:model-value": (value: boolean) => any;
  }, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: CollapsibleRootSlotProps) => any;
    };
  });
  Activator: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<CollapsibleActivatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<CollapsibleActivatorProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<CollapsibleActivatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: CollapsibleActivatorSlotProps) => any;
    };
  });
  Cue: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<CollapsibleCueProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<CollapsibleCueProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<CollapsibleCueProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: CollapsibleCueSlotProps) => any;
    };
  });
  Content: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<CollapsibleContentProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<CollapsibleContentProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<CollapsibleContentProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: CollapsibleContentSlotProps) => any;
    };
  });
};
//#endregion
//#region src/components/Combobox/ComboboxRoot.vue.d.ts
interface ComboboxRootProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Unique identifier (auto-generated if not provided) */
  id?: string;
  /** Form field name — auto-renders hidden input when provided */
  name?: string;
  /** Associate with a form by ID */
  form?: string;
  /** Disables the entire combobox */
  disabled?: boolean;
  /** Enable multi-selection mode */
  multiple?: boolean;
  /**
   * Controls mandatory selection behavior:
   * - false (default): No mandatory selection enforcement
   * - true: Prevents deselecting the last selected item
   */
  mandatory?: boolean;
  /** Strict mode: reverts query to selected value on close if no match */
  strict?: boolean;
  /** Manual error state override — forces invalid regardless of error messages */
  error?: boolean;
  /** Manual error messages */
  errorMessages?: MaybeArray<string>;
  /** Filtering/loading adapter (client-side or server-side) */
  adapter?: ComboboxAdapter;
  /** Positioning engine for the dropdown. @default CSS anchor positioning (`V0PopoverAdapter`) */
  positionAdapter?: PopoverAdapter;
  /** Maps selected value to input display text. Defaults to String(value). */
  displayValue?: (value: unknown) => string;
}
interface ComboboxRootSlotProps {
  /** Root identifier */
  id: string;
  /** Current query string */
  query: string;
  /** Whether the dropdown is open */
  isOpen: boolean;
  /** Whether filtered results are empty */
  isEmpty: boolean;
  /** Whether async loading is in progress */
  isLoading: boolean;
  /** Whether the combobox is disabled */
  isDisabled: boolean;
  /** Validation error messages */
  errors: string[];
  /** Whether the combobox is valid (null = no opinion) */
  isValid: boolean | null;
  /** Open the dropdown */
  open: () => void;
  /** Close the dropdown */
  close: () => void;
  /** Toggle the dropdown */
  toggle: () => void;
  /** Clear query and selection */
  clear: () => void;
}
declare const useComboboxContext: (key: string, defaultValue?: ComboboxContext | undefined) => ComboboxContext, provideComboboxContext: (key: string, context: ComboboxContext, app?: import("vue").App) => ComboboxContext;
declare const _default$141: typeof __VLS_export$141;
declare const __VLS_export$141: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$29<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$29<(ComboboxRootProps & {
    modelValue?: T | T[];
  }) & {
    "onUpdate:modelValue"?: ((value: T | T[] | undefined) => any) | undefined;
    "onUpdate:model-value"?: ((value: T | T[]) => any) | undefined;
  }> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: ComboboxRootSlotProps) => any;
  };
  emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$29<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Combobox/ComboboxActivator.vue.d.ts
interface ComboboxActivatorProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
}
interface ComboboxActivatorSlotProps {
  /** Whether the dropdown is open */
  isOpen: boolean;
  /** Attributes to bind to the activator element */
  attrs: {
    'data-state': 'open' | 'closed';
    'style': Record<string, string>;
  };
}
declare const _default$140: typeof __VLS_export$140;
declare const __VLS_export$140: __VLS_WithSlots$105<import("vue").DefineComponent<ComboboxActivatorProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ComboboxActivatorProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: ComboboxActivatorSlotProps) => any;
}>;
type __VLS_WithSlots$105<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Combobox/ComboboxControl.vue.d.ts
interface ComboboxControlProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** When to open the dropdown */
  openOn?: 'focus' | 'input';
  /** Placeholder text */
  placeholder?: string;
}
interface ComboboxControlSlotProps {
  /** Current query value */
  query: string;
  /** Whether the dropdown is open */
  isOpen: boolean;
  /** Attributes to bind to the input element */
  attrs: {
    'id': string;
    'role': 'combobox';
    'aria-autocomplete': 'list' | 'both';
    'aria-expanded': boolean;
    'aria-haspopup': 'listbox';
    'aria-controls': string;
    'aria-describedby': string | undefined;
    'aria-errormessage': string | undefined;
    'aria-invalid': boolean | undefined;
    'aria-disabled': boolean;
    'disabled': boolean | undefined;
    'placeholder': string | undefined;
    'value': string;
    'onInput': (e: Event) => void;
    'onFocus': () => void;
    'onKeydown': (e: KeyboardEvent) => void;
  };
}
declare const _default$139: typeof __VLS_export$139;
declare const __VLS_export$139: __VLS_WithSlots$104<import("vue").DefineComponent<ComboboxControlProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ComboboxControlProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: ComboboxControlSlotProps) => any;
}>;
type __VLS_WithSlots$104<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Combobox/ComboboxCue.vue.d.ts
interface ComboboxCueProps extends AtomProps {
  namespace?: string;
}
interface ComboboxCueSlotProps {
  isOpen: boolean;
  attrs: {
    'aria-hidden': true;
    'data-state': 'open' | 'closed';
    'onClick': () => void;
  };
}
declare const _default$138: typeof __VLS_export$138;
declare const __VLS_export$138: __VLS_WithSlots$103<import("vue").DefineComponent<ComboboxCueProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ComboboxCueProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: ComboboxCueSlotProps) => any;
}>;
type __VLS_WithSlots$103<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Combobox/ComboboxContent.vue.d.ts
interface ComboboxContentProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Render content immediately without waiting for first open */
  eager?: boolean;
}
interface ComboboxContentSlotProps {
  /** Whether the dropdown is open */
  isOpen: boolean;
  /** Attributes to bind to the content element */
  attrs: Record<string, unknown>;
}
declare const _default$137: typeof __VLS_export$137;
declare const __VLS_export$137: __VLS_WithSlots$102<import("vue").DefineComponent<ComboboxContentProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ComboboxContentProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: ComboboxContentSlotProps) => any;
}>;
type __VLS_WithSlots$102<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Combobox/ComboboxItem.vue.d.ts
interface ComboboxItemProps<V = unknown> extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Unique identifier (auto-generated if not provided) */
  id?: string;
  /** Value associated with this option */
  value?: V;
  /** Disables this specific option */
  disabled?: MaybeRefOrGetter<boolean>;
}
interface ComboboxItemSlotProps<V = unknown> {
  /** Value associated with this option */
  value: V | undefined;
  /** Whether this option is currently selected */
  isSelected: boolean;
  /** Whether this option is currently highlighted via virtual focus */
  isHighlighted: boolean;
  /** Whether this option is disabled */
  isDisabled: boolean;
  /** Whether this option passes the current filter */
  isFiltered: boolean;
  /** Select this option */
  select: () => void;
  /** Attributes to bind to the option element */
  attrs: {
    'id': string;
    'role': 'option';
    'aria-selected': boolean;
    'aria-disabled': boolean;
    'data-selected': true | undefined;
    'data-highlighted': '' | undefined;
    'data-disabled': true | undefined;
    'data-id': string;
    'onClick': () => void;
  };
}
declare const _default$136: typeof __VLS_export$136;
declare const __VLS_export$136: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$28<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$28<ComboboxItemProps<V>> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: ComboboxItemSlotProps<V>) => any;
  };
  emit: {};
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$28<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Combobox/ComboboxEmpty.vue.d.ts
interface ComboboxEmptyProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
}
interface ComboboxEmptySlotProps {
  /** Current query string */
  query: string;
}
declare const _default$135: typeof __VLS_export$135;
declare const __VLS_export$135: __VLS_WithSlots$101<import("vue").DefineComponent<ComboboxEmptyProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ComboboxEmptyProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: ComboboxEmptySlotProps) => any;
}>;
type __VLS_WithSlots$101<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Combobox/ComboboxDescription.vue.d.ts
interface ComboboxDescriptionProps extends AtomProps {
  /** Namespace for connecting to parent Combobox.Root */
  namespace?: string;
}
interface ComboboxDescriptionSlotProps {
  /** ID for this description element */
  id: string;
}
declare const _default$134: typeof __VLS_export$134;
declare const __VLS_export$134: __VLS_WithSlots$100<import("vue").DefineComponent<ComboboxDescriptionProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ComboboxDescriptionProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: ComboboxDescriptionSlotProps) => any;
}>;
type __VLS_WithSlots$100<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Combobox/ComboboxError.vue.d.ts
interface ComboboxErrorProps extends AtomProps {
  /** Namespace for connecting to parent Combobox.Root */
  namespace?: string;
}
interface ComboboxErrorSlotProps {
  /** ID for this error element */
  id: string;
  /** Current error messages */
  errors: string[];
  /** Pre-computed attributes for the error element */
  attrs: {
    'id': string;
    'aria-live': 'polite';
    'data-state': 'visible' | 'hidden';
  };
}
declare const _default$133: typeof __VLS_export$133;
declare const __VLS_export$133: __VLS_WithSlots$99<import("vue").DefineComponent<ComboboxErrorProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ComboboxErrorProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: ComboboxErrorSlotProps) => any;
}>;
type __VLS_WithSlots$99<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Combobox/index.d.ts
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
 * </script>
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
declare const Combobox: {
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
   * </script>
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
  Root: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
    slots: {
      default: (props: ComboboxRootSlotProps) => any;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      namespace?: string | undefined;
      id?: string | undefined;
      name?: string | undefined;
      form?: string | undefined;
      disabled?: boolean | undefined;
      multiple?: boolean | undefined;
      mandatory?: boolean | undefined;
      strict?: boolean | undefined;
      error?: boolean | undefined;
      errorMessages?: MaybeArray<string> | undefined;
      adapter?: ComboboxAdapter | undefined;
      positionAdapter?: PopoverAdapter | undefined;
      displayValue?: ((value: unknown) => string) | undefined;
      as?: (DOMElement | null) | undefined;
      renderless?: boolean | undefined;
      modelValue?: (T | T[]) | undefined;
      "onUpdate:modelValue"?: ((value: T | T[] | undefined) => any) | undefined;
      "onUpdate:model-value"?: ((value: T | T[]) => any) | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: ComboboxRootSlotProps) => any;
    };
    emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
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
  Activator: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<ComboboxActivatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ComboboxActivatorProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<ComboboxActivatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: ComboboxActivatorSlotProps) => any;
    };
  });
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
  Control: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<ComboboxControlProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ComboboxControlProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<ComboboxControlProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: ComboboxControlSlotProps) => any;
    };
  });
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
  Cue: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<ComboboxCueProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ComboboxCueProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<ComboboxCueProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: ComboboxCueSlotProps) => any;
    };
  });
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
  Content: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<ComboboxContentProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ComboboxContentProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<ComboboxContentProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: ComboboxContentSlotProps) => any;
    };
  });
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
  Item: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: {};
    slots: {
      default: (props: ComboboxItemSlotProps<V>) => any;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      namespace?: string | undefined;
      id?: string | undefined;
      value?: V | undefined;
      disabled?: import("vue").MaybeRefOrGetter<boolean> | undefined;
      as?: (DOMElement | null) | undefined;
      renderless?: boolean | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: ComboboxItemSlotProps<V>) => any;
    };
    emit: {};
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
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
  Empty: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<ComboboxEmptyProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ComboboxEmptyProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<ComboboxEmptyProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: ComboboxEmptySlotProps) => any;
    };
  });
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
  Description: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<ComboboxDescriptionProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ComboboxDescriptionProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<ComboboxDescriptionProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: ComboboxDescriptionSlotProps) => any;
    };
  });
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
  Error: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<ComboboxErrorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ComboboxErrorProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<ComboboxErrorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: ComboboxErrorSlotProps) => any;
    };
  });
};
//#endregion
//#region src/components/DataGrid/DataGridRoot.vue.d.ts
interface DataGridRootProps<T extends object = object> extends DataGridOptions<T> {
  /** Namespace for dependency injection. @default 'v0:data-grid' */
  namespace?: string;
}
interface DataGridRootSlotProps<T extends object = object> {
  /** The data grid context instance */
  context: DataGridContext<T>;
}
declare const provideDataGridRoot: (key: string, context: DataGridContext<object>, app?: import("vue").App) => DataGridContext<object>;
declare function useDataGridRoot<T extends object = object>(namespace?: string): DataGridContext<T>;
declare const _default$132: typeof __VLS_export$132;
declare const __VLS_export$132: <T extends object = object>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$27<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$27<(DataGridRootProps<T> & {
    search?: string;
  }) & {
    "onUpdate:search"?: ((value: string) => any) | undefined;
  }> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: DataGridRootSlotProps<T>) => unknown;
  };
  emit: ((evt: "update:search", value: string) => void) & ((event: "update:search", value: string) => void);
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$27<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/DataGrid/DataGridTable.vue.d.ts
interface DataGridTableProps extends AtomProps {
  /** Namespace for dependency injection. @default 'v0:data-grid' */
  namespace?: string;
}
interface DataGridTableSlotProps {
  attrs: {
    'role': 'table';
    'aria-rowcount': number | undefined;
  };
}
declare const _default$131: typeof __VLS_export$131;
declare const __VLS_export$131: __VLS_WithSlots$98<import("vue").DefineComponent<DataGridTableProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<DataGridTableProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: DataGridTableSlotProps) => unknown;
}>;
type __VLS_WithSlots$98<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/DataGrid/DataGridHeader.vue.d.ts
interface DataGridHeaderProps extends AtomProps {
  /** Namespace for dependency injection. @default 'v0:data-grid' */
  namespace?: string;
}
interface DataGridHeaderSlotProps {
  /** 2D header grid for rendering multi-level headers */
  headers: readonly InternalHeader[][];
  attrs: {
    role: 'rowgroup' | undefined;
  };
}
declare const _default$130: typeof __VLS_export$130;
declare const __VLS_export$130: __VLS_WithSlots$97<import("vue").DefineComponent<DataGridHeaderProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<DataGridHeaderProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: DataGridHeaderSlotProps) => unknown;
}>;
type __VLS_WithSlots$97<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/DataGrid/DataGridColumn.vue.d.ts
interface DataGridColumnProps extends AtomProps {
  /** Namespace for dependency injection. @default 'v0:data-grid' */
  namespace?: string;
  /** Column id — registers this header with the grid when set */
  id?: string;
  /** Participate in the sort pipeline */
  sortable?: boolean;
  /** Participate in the filter pipeline */
  filterable?: boolean;
  /** Width as a percentage (0–100) */
  size?: number;
  /** Minimum width as a percentage */
  minSize?: number;
  /** Maximum width as a percentage */
  maxSize?: number;
  /** Pin position */
  pinned?: PinPosition;
  /** Allow resizing */
  resizable?: boolean;
  /** Whether cells in this column can be edited */
  editable?: boolean;
  /** Validate a committed edit. Return `true` or an error string. */
  validate?: (value: unknown) => string | true;
  /** Number of columns this cell spans */
  colspan?: number;
  /** Number of rows this cell spans */
  rowspan?: number;
}
interface DataGridColumnSlotProps {
  /** Whether this column is sortable */
  isSortable: boolean;
  /** Current sort direction: 'asc' | 'desc' | 'none' */
  direction: SortDirection;
  /** Sort priority index (0-based), or -1 if not sorted */
  priority: number;
  /** Toggle sort for this column */
  toggle: () => void;
  /** Whether this column is pinned */
  isPinned: boolean;
  /** Pin position: 'left', 'right', or false */
  pinPosition: PinPosition;
  /** Whether this column is resizable */
  isResizable: boolean;
  /** Current column size as a percentage */
  size: number;
  /** Minimum size as a percentage */
  minSize: number;
  /** Maximum size as a percentage */
  maxSize: number;
  /** Offset from the pinning edge (for sticky positioning) */
  offset: number;
  attrs: {
    'role': 'columnheader';
    'scope': 'col' | 'colgroup' | undefined;
    'aria-sort': 'ascending' | 'descending' | 'none' | undefined;
    'data-direction': 'asc' | 'desc' | undefined;
    'colspan': number | undefined;
    'rowspan': number | undefined;
    'aria-colspan': number | undefined;
    'aria-rowspan': number | undefined;
    'style'?: Record<string, string>;
  };
}
declare const _default$129: typeof __VLS_export$129;
declare const __VLS_export$129: __VLS_WithSlots$96<import("vue").DefineComponent<DataGridColumnProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<DataGridColumnProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: DataGridColumnSlotProps) => unknown;
}>;
type __VLS_WithSlots$96<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/DataGrid/DataGridBody.vue.d.ts
interface DataGridBodyProps extends AtomProps {
  /** Namespace for dependency injection. @default 'v0:data-grid' */
  namespace?: string;
}
interface DataGridBodySlotProps<T extends object = object> {
  /** Paginated items for the current page. Row hides off-page rows itself. */
  items: readonly T[];
  /** Filtered and sorted items in adapter order. Sort only — ignores `rows.move()`. */
  sortedItems: readonly T[];
  /** Filter+sort+row-order list before pagination. */
  orderedItems: readonly T[];
  /** Rank a source array by `orderedItems`. v-for `rank(users)` so rows register themselves. */
  rank: <U extends object>(source: readonly U[]) => U[];
  /** Whether the table is loading */
  isLoading: boolean;
  /** Whether the table has no items */
  isEmpty: boolean;
  /** Header-grid row count. */
  headerRows: number;
  /** 1-based index of the first visible data row (header-grid rows + pageStart + 1). Row sets aria-rowindex unless `:index` is passed. */
  rowStart: number;
  /** Registry size — 0 before rows register (first paint). */
  size: number;
  attrs: {
    role: 'rowgroup' | undefined;
  };
}
declare const _default$128: typeof __VLS_export$128;
declare const __VLS_export$128: <T extends object = object>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$26<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$26<DataGridBodyProps> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: DataGridBodySlotProps<T>) => unknown;
  };
  emit: {};
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$26<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/DataGrid/DataGridRow.vue.d.ts
interface DataGridRowContext {
  id: Readonly<Ref<ID | undefined>>;
  resizable: Readonly<Ref<boolean>>;
  /** Record a Column id in child mount (Splitter panel) order. */
  registerColumn: (id: string) => void;
  /** Drop a Column id when it unmounts. */
  unregisterColumn: (id: string) => void;
}
declare const useDataGridRow: (key: string, defaultValue?: DataGridRowContext | null | undefined) => DataGridRowContext | null, provideDataGridRow: (key: string, context: DataGridRowContext | null, app?: import("vue").App) => DataGridRowContext | null;
interface DataGridRowProps extends AtomProps {
  /** Namespace for dependency injection. @default 'v0:data-grid' */
  namespace?: string;
  /** Row identifier. Registers a data ticket when set with `value`. */
  id?: ID;
  /** Row value to register. Omit on header rows. */
  value?: object;
  /** 1-based aria-rowindex. Defaults to the row's position in orderedItems. */
  index?: number;
  /** Emit aria-selected. @default false */
  selectable?: boolean;
  /**
   * Enable column resizing via Splitter composition.
   * When true, the row renders as Splitter.Root and child columns
   * register as Splitter.Panel. Place DataGrid.Handle inside Column
   * (not as a sibling of Column) so the row's owned children stay
   * columnheaders. Requires the `as="div"` chain — native table tags
   * cannot host Splitter.
   */
  resizable?: boolean;
}
interface DataGridRowSlotProps {
  /** Registered row id */
  id: ID | undefined;
  /** Registered row record. Undefined on header rows. */
  value: object | undefined;
  /** Whether this row has resizable columns */
  isResizable: boolean;
  /** Whether this row is selected */
  isSelected: boolean;
  /** Whether this row is selectable */
  isSelectable: boolean;
  /** Whether this row is expanded */
  isExpanded: boolean;
  /** Whether this data row is on the current page. Header rows are always visible. */
  isVisible: boolean;
  /** Toggle row selection */
  toggleSelection: () => void;
  /** Toggle row expansion */
  toggleExpansion: () => void;
  attrs: {
    'role': 'row';
    'aria-selected': boolean | undefined;
    'aria-rowindex': number | undefined;
    'data-selected': true | undefined;
    'data-expanded': true | undefined;
    'onClick': (() => void) | undefined;
  };
}
declare const _default$127: typeof __VLS_export$127;
declare const __VLS_export$127: __VLS_WithSlots$95<import("vue").DefineComponent<DataGridRowProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<DataGridRowProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: DataGridRowSlotProps) => unknown;
}>;
type __VLS_WithSlots$95<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/DataGrid/DataGridCell.vue.d.ts
interface DataGridCellProps extends AtomProps {
  /** Namespace for dependency injection. @default 'v0:data-grid' */
  namespace?: string;
  /** Column identifier for editing and span lookup */
  column?: string;
  /** Number of columns this cell spans. Row spanning owns `rowspan`. */
  colspan?: number;
}
interface DataGridCellSlotProps {
  /** Whether this cell is currently being edited */
  isEditing: boolean;
  /** Row span for this cell (from rowSpanning config) */
  rowSpan: number;
  /** Whether this column is pinned */
  isPinned: boolean;
  /** Pin position: 'left', 'right', or false */
  pinPosition: PinPosition;
  /** Current column size as a percentage */
  size: number;
  /** Offset from the pinning edge (for sticky positioning) */
  offset: number;
  attrs: {
    'role': 'cell';
    'colspan': number | undefined;
    'rowspan': number | undefined;
    'aria-colspan': number | undefined;
    'aria-rowspan': number | undefined;
    'aria-colindex': number | undefined;
    'data-state': 'editing' | undefined;
    'style'?: Record<string, string | number>;
  };
}
declare const _default$126: typeof __VLS_export$126;
declare const __VLS_export$126: __VLS_WithSlots$94<import("vue").DefineComponent<DataGridCellProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<DataGridCellProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: DataGridCellSlotProps) => unknown;
}>;
type __VLS_WithSlots$94<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/DataGrid/DataGridEmpty.vue.d.ts
interface DataGridEmptyProps extends AtomProps {
  /** Namespace for dependency injection. @default 'v0:data-grid' */
  namespace?: string;
}
interface DataGridEmptySlotProps {
  /** Whether the table is loading */
  isLoading: boolean;
  /** Leaf column count — bind as Cell colspan */
  columnCount: number;
  attrs: {
    role: 'row' | undefined;
  };
}
declare const _default$125: typeof __VLS_export$125;
declare const __VLS_export$125: __VLS_WithSlots$93<import("vue").DefineComponent<DataGridEmptyProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<DataGridEmptyProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: DataGridEmptySlotProps) => unknown;
}>;
type __VLS_WithSlots$93<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Splitter/SplitterRoot.vue.d.ts
type SplitterOrientation = 'horizontal' | 'vertical';
type SplitterIntentMode = 'collapse' | 'expand';
interface SplitterPendingIntent {
  id: ID;
  mode: SplitterIntentMode;
}
interface SplitterPanelInput extends SelectionTicketInput {
  size: number;
  minSize: number;
  maxSize: number;
  collapsible: boolean;
  collapsedSize: number;
  defaultSize: number;
}
type SplitterPanelTicket = SelectionTicket<SplitterPanelInput>;
interface SplitterContext {
  orientation: Readonly<Ref<SplitterOrientation>>;
  disabled: Readonly<Ref<boolean>>;
  panels: SelectionContext<SplitterPanelInput>;
  handles: RegistryContext;
  dragging: Readonly<Ref<boolean>>;
  draggingHandle: Readonly<Ref<number | null>>;
  pending: Readonly<Ref<SplitterPendingIntent | null>>;
  rootEl: Readonly<Ref<Element | null>>;
  panel: (index: number) => SplitterPanelTicket | undefined;
  resize: (index: number, delta: number, options?: {
    emit?: boolean;
  }) => void;
  onStartDrag: (index: number) => void;
  onEndDrag: () => void;
  onAbortDrag: () => void;
  collapse: (index: number, neighborIndex?: number) => boolean;
  expand: (index: number, neighborIndex?: number) => boolean;
  distribute: (sizes: number[]) => void;
}
interface SplitterRootExpose {
  distribute: (sizes: number[]) => void;
  dragging: Readonly<Ref<boolean>>;
}
interface SplitterRootProps extends AtomProps {
  orientation?: SplitterOrientation;
  disabled?: boolean;
}
interface SplitterRootSlotProps {
  orientation: SplitterOrientation;
  isDisabled: boolean;
  sizes: number[];
  isDragging: boolean;
  distribute: (sizes: number[]) => void;
  attrs: {
    'style'?: Record<string, string>;
    'data-orientation': SplitterOrientation;
    'data-dragging': true | undefined;
  };
}
declare const useSplitterRoot: () => SplitterContext, provideSplitterRoot: (context: SplitterContext, app?: import("vue").App) => SplitterContext;
declare const _default$124: typeof __VLS_export$124;
declare const __VLS_export$124: __VLS_WithSlots$92<import("vue").DefineComponent<SplitterRootProps, SplitterRootExpose, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
  layout: (sizes: number[]) => any;
}, string, import("vue").PublicProps, Readonly<SplitterRootProps> & Readonly<{
  onLayout?: ((sizes: number[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: SplitterRootSlotProps) => any;
}>;
type __VLS_WithSlots$92<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Splitter/SplitterPanel.vue.d.ts
type SplitterPanelSize = number | string;
interface SplitterPanelProps extends AtomProps {
  defaultSize: SplitterPanelSize;
  minSize?: SplitterPanelSize;
  maxSize?: SplitterPanelSize;
  collapsible?: boolean;
  collapsedSize?: SplitterPanelSize;
}
interface SplitterPanelExpose {
  collapse: () => void;
  expand: () => void;
  size: Readonly<Ref<number>>;
  isCollapsed: Readonly<Ref<boolean>>;
}
interface SplitterPanelSlotProps {
  size: number;
  isCollapsed: boolean;
  collapse: () => void;
  expand: () => void;
  attrs: {
    'id': string;
    'style'?: Record<string, string>;
    'data-orientation': SplitterOrientation;
    'data-panel-index': number;
    'data-collapsed': true | undefined;
  };
}
declare const _default$123: typeof __VLS_export$123;
declare const __VLS_export$123: __VLS_WithSlots$91<import("vue").DefineComponent<SplitterPanelProps & {
  collapsed?: boolean;
}, SplitterPanelExpose, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
  resize: (size: number) => any;
  "update:collapsed": (...args: unknown[]) => any;
}, string, import("vue").PublicProps, Readonly<SplitterPanelProps & {
  collapsed?: boolean;
}> & Readonly<{
  onResize?: ((size: number) => any) | undefined;
  "onUpdate:collapsed"?: ((...args: unknown[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: SplitterPanelSlotProps) => any;
}>;
type __VLS_WithSlots$91<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Splitter/SplitterHandle.vue.d.ts
interface SplitterHandleProps extends AtomProps {
  disabled?: boolean;
  label?: string;
}
type SplitterHandleState = 'drag' | 'hover' | 'inactive';
interface SplitterHandleSlotProps {
  isDragging: boolean;
  isDisabled: boolean;
  state: SplitterHandleState;
  pending: SplitterIntentMode | null;
  pendingLabel: string | undefined;
  attrs: {
    'role': 'separator';
    'tabindex': 0 | -1;
    'aria-valuenow': number;
    'aria-valuemin': number;
    'aria-valuemax': number;
    'aria-valuetext': string | undefined;
    'aria-orientation': SplitterOrientation;
    'aria-controls': string | undefined;
    'aria-label': string | undefined;
    'aria-disabled': boolean;
    'data-state': SplitterHandleState;
    'data-orientation': SplitterOrientation;
    'data-disabled': true | undefined;
    'data-pending': SplitterIntentMode | undefined;
    'style': Record<string, string>;
    'onPointerdown': (e: PointerEvent) => void;
    'onPointerenter': () => void;
    'onPointerleave': () => void;
    'onKeydown': (e: KeyboardEvent) => void;
  };
}
declare const _default$122: typeof __VLS_export$122;
declare const __VLS_export$122: __VLS_WithSlots$90<import("vue").DefineComponent<SplitterHandleProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<SplitterHandleProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: SplitterHandleSlotProps) => any;
}>;
type __VLS_WithSlots$90<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Splitter/index.d.ts
/**
 * Splitter component with sub-components for building resizable panel layouts.
 *
 * @see https://0.vuetifyjs.com/components/semantic/splitter
 *
 * @example
 * ```vue
 * <script lang="ts" setup>
 *   import { Splitter } from '@vuetify/v0'
 * </script>
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
declare const Splitter: {
  /**
   * Root container that provides splitter context and manages panel sizes.
   *
   * @see https://0.vuetifyjs.com/components/semantic/splitter
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { Splitter } from '@vuetify/v0'
   * </script>
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
  Root: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<SplitterRootProps> & Readonly<{
      onLayout?: ((sizes: number[]) => any) | undefined;
    }>, SplitterRootExpose, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
      layout: (sizes: number[]) => any;
    }, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<SplitterRootProps> & Readonly<{
      onLayout?: ((sizes: number[]) => any) | undefined;
    }>, SplitterRootExpose, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<SplitterRootProps> & Readonly<{
    onLayout?: ((sizes: number[]) => any) | undefined;
  }>, SplitterRootExpose, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    layout: (sizes: number[]) => any;
  }, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: SplitterRootSlotProps) => any;
    };
  });
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
  Panel: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<SplitterPanelProps & {
      collapsed?: boolean;
    }> & Readonly<{
      onResize?: ((size: number) => any) | undefined;
      "onUpdate:collapsed"?: ((...args: unknown[]) => any) | undefined;
    }>, SplitterPanelExpose, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
      resize: (size: number) => any;
      "update:collapsed": (...args: unknown[]) => any;
    }, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<SplitterPanelProps & {
      collapsed?: boolean;
    }> & Readonly<{
      onResize?: ((size: number) => any) | undefined;
      "onUpdate:collapsed"?: ((...args: unknown[]) => any) | undefined;
    }>, SplitterPanelExpose, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<SplitterPanelProps & {
    collapsed?: boolean;
  }> & Readonly<{
    onResize?: ((size: number) => any) | undefined;
    "onUpdate:collapsed"?: ((...args: unknown[]) => any) | undefined;
  }>, SplitterPanelExpose, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    resize: (size: number) => any;
    "update:collapsed": (...args: unknown[]) => any;
  }, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: SplitterPanelSlotProps) => any;
    };
  });
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
  Handle: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<SplitterHandleProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<SplitterHandleProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<SplitterHandleProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: SplitterHandleSlotProps) => any;
    };
  });
};
//#endregion
//#region src/components/DataGrid/DataGridHandle.vue.d.ts
interface DataGridHandleProps extends AtomProps {
  /** Namespace for dependency injection. @default 'v0:data-grid' */
  namespace?: string;
  /** Whether the handle is disabled */
  disabled?: boolean;
  /** Accessible label for the resize handle */
  label?: string;
}
type DataGridHandleState = 'drag' | 'hover' | 'inactive';
interface DataGridHandleSlotProps {
  /** Whether the handle is currently being dragged */
  isDragging: boolean;
  /** Whether the handle is disabled */
  isDisabled: boolean;
  /** Current drag/hover state */
  state: DataGridHandleState;
  /** All ARIA and interaction attributes from Splitter.Handle */
  attrs: SplitterHandleSlotProps['attrs'];
}
declare const _default$121: typeof __VLS_export$121;
declare const __VLS_export$121: __VLS_WithSlots$89<import("vue").DefineComponent<DataGridHandleProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<DataGridHandleProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: DataGridHandleSlotProps) => unknown;
}>;
type __VLS_WithSlots$89<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/DataGrid/index.d.ts
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
 * </script>
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
declare const DataGrid: {
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
  Root: <T extends object = object>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: ((evt: "update:search", value: string) => void) & ((event: "update:search", value: string) => void);
    slots: {
      default: (props: DataGridRootSlotProps<T>) => unknown;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      namespace?: string | undefined;
      editing?: {
        onEdit?: ((row: ID, column: string, value: unknown, item: T) => void) | undefined;
      } | undefined;
      preserveRowOrder?: import("vue").MaybeRefOrGetter<boolean> | undefined;
      rowSpanning?: ((item: T, column: string) => number) | undefined;
      filter?: Omit<FilterOptions, "keys"> | undefined;
      pagination?: Omit<PaginationOptions, "size"> | undefined;
      sortMultiple?: boolean | undefined;
      mandate?: boolean | undefined;
      firstSortOrder?: "asc" | "desc" | undefined;
      selectStrategy?: SelectStrategy | undefined;
      itemSelectable?: (keyof T & string) | undefined;
      groupBy?: (keyof T & string) | undefined;
      openAll?: boolean | undefined;
      expandMultiple?: boolean | undefined;
      locale?: string | undefined;
      adapter?: DataTableAdapter<T> | undefined;
      search?: string | undefined;
      "onUpdate:search"?: ((value: string) => any) | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: DataGridRootSlotProps<T>) => unknown;
    };
    emit: ((evt: "update:search", value: string) => void) & ((event: "update:search", value: string) => void);
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
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
  Table: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<DataGridTableProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<DataGridTableProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<DataGridTableProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: DataGridTableSlotProps) => unknown;
    };
  });
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
  Header: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<DataGridHeaderProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<DataGridHeaderProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<DataGridHeaderProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: DataGridHeaderSlotProps) => unknown;
    };
  });
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
  Column: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<DataGridColumnProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<DataGridColumnProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<DataGridColumnProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: DataGridColumnSlotProps) => unknown;
    };
  });
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
  Body: <T extends object = object>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: {};
    slots: {
      default: (props: DataGridBodySlotProps<T>) => unknown;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      namespace?: string | undefined;
      as?: (DOMElement | null) | undefined;
      renderless?: boolean | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: DataGridBodySlotProps<T>) => unknown;
    };
    emit: {};
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
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
  Row: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<DataGridRowProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<DataGridRowProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<DataGridRowProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: DataGridRowSlotProps) => unknown;
    };
  });
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
  Cell: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<DataGridCellProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<DataGridCellProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<DataGridCellProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: DataGridCellSlotProps) => unknown;
    };
  });
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
  Empty: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<DataGridEmptyProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<DataGridEmptyProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<DataGridEmptyProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: DataGridEmptySlotProps) => unknown;
    };
  });
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
  Handle: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<DataGridHandleProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<DataGridHandleProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<DataGridHandleProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: DataGridHandleSlotProps) => unknown;
    };
  });
};
//#endregion
//#region src/components/DataTable/DataTableRoot.vue.d.ts
interface DataTableRootProps<T extends object = object> extends DataTableOptions<T> {
  /** Namespace for dependency injection. @default 'v0:data-table' */
  namespace?: string;
}
interface DataTableRootSlotProps<T extends object = object> {
  /** The data table context for direct access to state and methods */
  context: DataTableContext<T>;
}
declare const provideDataTableRoot: (key: string, context: DataTableContext<object>, app?: import("vue").App) => DataTableContext<object>;
declare function useDataTableRoot<T extends object = object>(namespace?: string): DataTableContext<T>;
declare const _default$120: typeof __VLS_export$120;
declare const __VLS_export$120: <T extends object = object>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$25<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$25<(DataTableRootProps<T> & {
    search?: string;
  }) & {
    "onUpdate:search"?: ((value: string) => any) | undefined;
  }> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: DataTableRootSlotProps<T>) => unknown;
  };
  emit: ((evt: "update:search", value: string) => void) & ((event: "update:search", value: string) => void);
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$25<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/DataTable/DataTableTable.vue.d.ts
interface DataTableTableProps extends AtomProps {
  /** Namespace for dependency injection. @default 'v0:data-table' */
  namespace?: string;
}
interface DataTableTableSlotProps {
  attrs: {
    'role': 'table';
    'aria-rowcount': number | undefined;
  };
}
declare const _default$119: typeof __VLS_export$119;
declare const __VLS_export$119: __VLS_WithSlots$88<import("vue").DefineComponent<DataTableTableProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<DataTableTableProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: DataTableTableSlotProps) => unknown;
}>;
type __VLS_WithSlots$88<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/DataTable/DataTableHeader.vue.d.ts
interface DataTableHeaderProps extends AtomProps {
  /** Namespace for dependency injection. @default 'v0:data-table' */
  namespace?: string;
}
interface DataTableHeaderSlotProps {
  /** 2D header grid for rendering multi-level headers */
  headers: readonly InternalHeader[][];
  attrs: {
    role: 'rowgroup' | undefined;
  };
}
declare const _default$118: typeof __VLS_export$118;
declare const __VLS_export$118: __VLS_WithSlots$87<import("vue").DefineComponent<DataTableHeaderProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<DataTableHeaderProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: DataTableHeaderSlotProps) => unknown;
}>;
type __VLS_WithSlots$87<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/DataTable/DataTableColumn.vue.d.ts
interface DataTableColumnProps extends AtomProps {
  /** Namespace for dependency injection. @default 'v0:data-table' */
  namespace?: string;
  /** Column id — registers this header with the table when set */
  id?: string;
  /** Participate in the sort pipeline */
  sortable?: boolean;
  /** Participate in the filter pipeline */
  filterable?: boolean;
  /** Number of columns this cell spans */
  colspan?: number;
  /** Number of rows this cell spans */
  rowspan?: number;
}
interface DataTableColumnSlotProps {
  /** Whether this column is sortable */
  isSortable: boolean;
  /** Current sort direction: 'asc' | 'desc' | 'none' */
  direction: SortDirection;
  /** Sort priority index (0-based), or -1 if not sorted */
  priority: number;
  /** Toggle sort for this column */
  toggle: () => void;
  attrs: {
    'role': 'columnheader';
    'scope': 'col' | 'colgroup';
    'aria-sort': 'ascending' | 'descending' | 'none' | undefined;
    'data-direction': 'asc' | 'desc' | undefined;
    'colspan': number | undefined;
    'rowspan': number | undefined;
  };
}
declare const _default$117: typeof __VLS_export$117;
declare const __VLS_export$117: __VLS_WithSlots$86<import("vue").DefineComponent<DataTableColumnProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<DataTableColumnProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: DataTableColumnSlotProps) => unknown;
}>;
type __VLS_WithSlots$86<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/DataTable/DataTableBody.vue.d.ts
interface DataTableBodyProps extends AtomProps {
  /** Namespace for dependency injection. @default 'v0:data-table' */
  namespace?: string;
}
interface DataTableBodySlotProps<T extends object = object> {
  /** Paginated items for the current page. Row hides off-page rows itself. */
  items: readonly T[];
  /** Rank a source array by pipeline order. v-for `rank(users)` so rows register themselves. */
  rank: <U extends object>(source: readonly U[]) => U[];
  /** Whether the table is loading */
  isLoading: boolean;
  /** Whether the table has no items */
  isEmpty: boolean;
  attrs: {
    role: 'rowgroup' | undefined;
  };
}
declare const _default$116: typeof __VLS_export$116;
declare const __VLS_export$116: <T extends object = object>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$24<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$24<DataTableBodyProps> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: DataTableBodySlotProps<T>) => unknown;
  };
  emit: {};
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$24<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/DataTable/DataTableRow.vue.d.ts
interface DataTableRowProps extends AtomProps {
  /** Namespace for dependency injection. @default 'v0:data-table' */
  namespace?: string;
  /** Row identifier. Registers a data ticket when set with `value`. */
  id?: ID;
  /** Row value to register. Omit on header rows. */
  value?: object;
  /** 1-based aria-rowindex. Defaults to the row's position in sortedItems. */
  index?: number;
  /** Emit aria-selected. @default false */
  selectable?: boolean;
}
interface DataTableRowSlotProps {
  /** Registered row id */
  id: ID | undefined;
  /** Registered row record. Undefined on header rows. */
  value: object | undefined;
  /** Whether this row is selected */
  isSelected: boolean;
  /** Whether this row is selectable */
  isSelectable: boolean;
  /** Whether this row is expanded */
  isExpanded: boolean;
  /** Whether this data row is on the current page. Header rows are always visible. */
  isVisible: boolean;
  /** Toggle row selection */
  toggleSelection: () => void;
  /** Toggle row expansion */
  toggleExpansion: () => void;
  attrs: {
    'role': 'row';
    'aria-selected': boolean | undefined;
    'aria-rowindex': number | undefined;
    'data-selected': true | undefined;
    'data-expanded': true | undefined;
    'onClick': (() => void) | undefined;
  };
}
declare const _default$115: typeof __VLS_export$115;
declare const __VLS_export$115: __VLS_WithSlots$85<import("vue").DefineComponent<DataTableRowProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<DataTableRowProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: DataTableRowSlotProps) => unknown;
}>;
type __VLS_WithSlots$85<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/DataTable/DataTableCell.vue.d.ts
interface DataTableCellProps extends AtomProps {
  /** Number of columns this cell spans */
  colspan?: number;
  /** Number of rows this cell spans */
  rowspan?: number;
}
interface DataTableCellSlotProps {
  attrs: {
    role: 'cell';
    colspan: number | undefined;
    rowspan: number | undefined;
  };
}
declare const _default$114: typeof __VLS_export$114;
declare const __VLS_export$114: __VLS_WithSlots$84<import("vue").DefineComponent<DataTableCellProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<DataTableCellProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: DataTableCellSlotProps) => unknown;
}>;
type __VLS_WithSlots$84<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/DataTable/DataTableEmpty.vue.d.ts
interface DataTableEmptyProps extends AtomProps {
  /** Namespace for dependency injection. @default 'v0:data-table' */
  namespace?: string;
}
interface DataTableEmptySlotProps {
  /** Whether the table is loading */
  isLoading: boolean;
  /** Leaf column count — bind as Cell colspan */
  columnCount: number;
  attrs: {
    role: 'row' | undefined;
  };
}
declare const _default$113: typeof __VLS_export$113;
declare const __VLS_export$113: __VLS_WithSlots$83<import("vue").DefineComponent<DataTableEmptyProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<DataTableEmptyProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: DataTableEmptySlotProps) => unknown;
}>;
type __VLS_WithSlots$83<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/DataTable/index.d.ts
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
 * </script>
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
declare const DataTable: {
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
   * </script>
   *
   * <template>
   *   <DataTable.Root v-model:search="query" v-slot="{ context }">
   *     <input v-model="query" type="search" aria-label="Search">
   *     <!-- context.items is derived from mounted Row children -->
   *   </DataTable.Root>
   * </template>
   * ```
   */
  Root: <T extends object = object>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: ((evt: "update:search", value: string) => void) & ((event: "update:search", value: string) => void);
    slots: {
      default: (props: DataTableRootSlotProps<T>) => unknown;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      namespace?: string | undefined;
      filter?: Omit<FilterOptions, "keys"> | undefined;
      pagination?: Omit<PaginationOptions, "size"> | undefined;
      sortMultiple?: boolean | undefined;
      mandate?: boolean | undefined;
      firstSortOrder?: "asc" | "desc" | undefined;
      selectStrategy?: SelectStrategy | undefined;
      itemSelectable?: (keyof T & string) | undefined;
      groupBy?: (keyof T & string) | undefined;
      openAll?: boolean | undefined;
      expandMultiple?: boolean | undefined;
      locale?: string | undefined;
      adapter?: DataTableAdapter<T> | undefined;
      search?: string | undefined;
      "onUpdate:search"?: ((value: string) => any) | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: DataTableRootSlotProps<T>) => unknown;
    };
    emit: ((evt: "update:search", value: string) => void) & ((event: "update:search", value: string) => void);
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
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
   * </script>
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
  Table: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<DataTableTableProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<DataTableTableProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<DataTableTableProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: DataTableTableSlotProps) => unknown;
    };
  });
  /**
   * The `<thead>` element wrapper. Exposes the 2D header grid after columns register.
   *
   * @see https://0.vuetifyjs.com/components/data/data-table
   *
   * @example
   * ```vue
   * <script setup lang="ts">
   *   import { DataTable } from '@vuetify/v0'
   * </script>
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
  Header: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<DataTableHeaderProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<DataTableHeaderProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<DataTableHeaderProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: DataTableHeaderSlotProps) => unknown;
    };
  });
  /**
   * A `<th>` element for header cells with sort state and controls.
   *
   * @see https://0.vuetifyjs.com/components/data/data-table
   *
   * @example
   * ```vue
   * <script setup lang="ts">
   *   import { Button, DataTable } from '@vuetify/v0'
   * </script>
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
  Column: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<DataTableColumnProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<DataTableColumnProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<DataTableColumnProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: DataTableColumnSlotProps) => unknown;
    };
  });
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
   * </script>
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
  Body: <T extends object = object>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: {};
    slots: {
      default: (props: DataTableBodySlotProps<T>) => unknown;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      namespace?: string | undefined;
      as?: (DOMElement | null) | undefined;
      renderless?: boolean | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: DataTableBodySlotProps<T>) => unknown;
    };
    emit: {};
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
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
   * </script>
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
  Row: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<DataTableRowProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<DataTableRowProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<DataTableRowProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: DataTableRowSlotProps) => unknown;
    };
  });
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
   * </script>
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
  Cell: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<DataTableCellProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<DataTableCellProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<DataTableCellProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: DataTableCellSlotProps) => unknown;
    };
  });
  /**
   * Empty state row that renders when the table has no items.
   *
   * @see https://0.vuetifyjs.com/components/data/data-table
   *
   * @example
   * ```vue
   * <script setup lang="ts">
   *   import { DataTable } from '@vuetify/v0'
   * </script>
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
  Empty: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<DataTableEmptyProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<DataTableEmptyProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<DataTableEmptyProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: DataTableEmptySlotProps) => unknown;
    };
  });
};
//#endregion
//#region src/components/Dialog/DialogRoot.vue.d.ts
interface DialogContext {
  isOpen: ShallowRef<boolean>;
  id: string;
  titleId: string;
  descriptionId: string;
  /** Whether a Dialog.Title child is currently mounted */
  hasTitle: ShallowRef<boolean>;
  /** Whether a Dialog.Description child is currently mounted */
  hasDescription: ShallowRef<boolean>;
  open: () => void;
  close: () => void;
}
interface DialogRootProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Unique identifier for the dialog (auto-generated if not provided) */
  id?: string;
}
interface DialogRootSlotProps {
  /** Unique identifier */
  id: string;
  /** Whether the dialog is currently open */
  isOpen: boolean;
  /** Open the dialog */
  open: () => void;
  /** Close the dialog */
  close: () => void;
}
declare const useDialogContext: (key: string, defaultValue?: DialogContext | undefined) => DialogContext, provideDialogContext: (key: string, context: DialogContext, app?: import("vue").App) => DialogContext;
declare const _default$112: typeof __VLS_export$112;
declare const __VLS_export$112: __VLS_WithSlots$82<import("vue").DefineComponent<DialogRootProps & {
  modelValue?: boolean;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
  "update:modelValue": (value: boolean) => any;
  "update:model-value": (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<DialogRootProps & {
  modelValue?: boolean;
}> & Readonly<{
  "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
  "onUpdate:model-value"?: ((value: boolean) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: DialogRootSlotProps) => any;
}>;
type __VLS_WithSlots$82<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Dialog/DialogActivator.vue.d.ts
interface DialogActivatorProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
}
interface DialogActivatorSlotProps {
  /** Whether the dialog is currently open */
  isOpen: boolean;
  /** Attributes to bind to the trigger element */
  attrs: {
    'type': 'button' | undefined;
    'role': 'button' | undefined;
    'tabindex': number;
    'aria-haspopup': 'dialog';
    'aria-expanded': boolean;
    'data-open': true | undefined;
    'onClick': () => void;
    'onKeydown': ((e: KeyboardEvent) => void) | undefined;
  };
}
declare const _default$111: typeof __VLS_export$111;
declare const __VLS_export$111: __VLS_WithSlots$81<import("vue").DefineComponent<DialogActivatorProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<DialogActivatorProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: DialogActivatorSlotProps) => any;
}>;
type __VLS_WithSlots$81<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Dialog/DialogContent.vue.d.ts
interface DialogContentProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Close dialog when clicking outside content @default true */
  closeOnClickOutside?: boolean;
  /**
   * Whether this dialog blocks scrim dismissal
   *
   * @default false
   * @remarks When true, clicking the scrim will not dismiss this dialog. Use for critical dialogs requiring explicit user action.
   */
  blocking?: boolean;
}
interface DialogContentEmits {
  cancel: [e: Event];
  close: [e: Event];
}
interface DialogContentSlotProps {
  /** Whether the dialog is currently open */
  isOpen: boolean;
  /** Whether this dialog is the topmost in the global stack */
  globalTop: boolean;
  /** Calculated z-index for the dialog */
  zIndex: number;
  /** Attributes to bind to the dialog element */
  attrs: {
    'id': string;
    'role': 'dialog';
    'aria-modal': 'true';
    'aria-labelledby': string | undefined;
    'aria-describedby': string | undefined;
    'style': {
      zIndex: number;
    };
    'onCancel': (e: Event) => void;
    'onClose': (e: Event) => void;
  };
}
declare const _default$110: typeof __VLS_export$110;
declare const __VLS_export$110: __VLS_WithSlots$80<import("vue").DefineComponent<DialogContentProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
  cancel: (e: Event) => any;
  close: (e: Event) => any;
}, string, import("vue").PublicProps, Readonly<DialogContentProps> & Readonly<{
  onCancel?: ((e: Event) => any) | undefined;
  onClose?: ((e: Event) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: DialogContentSlotProps) => any;
}>;
type __VLS_WithSlots$80<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Dialog/DialogTitle.vue.d.ts
interface DialogTitleProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
}
interface DialogTitleSlotProps {
  /** Attributes to bind to the title element */
  attrs: {
    id: string;
  };
}
declare const _default$109: typeof __VLS_export$109;
declare const __VLS_export$109: __VLS_WithSlots$79<import("vue").DefineComponent<DialogTitleProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<DialogTitleProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: DialogTitleSlotProps) => any;
}>;
type __VLS_WithSlots$79<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Dialog/DialogDescription.vue.d.ts
interface DialogDescriptionProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
}
interface DialogDescriptionSlotProps {
  /** Attributes to bind to the description element */
  attrs: {
    id: string;
  };
}
declare const _default$108: typeof __VLS_export$108;
declare const __VLS_export$108: __VLS_WithSlots$78<import("vue").DefineComponent<DialogDescriptionProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<DialogDescriptionProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: DialogDescriptionSlotProps) => any;
}>;
type __VLS_WithSlots$78<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Dialog/DialogClose.vue.d.ts
interface DialogCloseProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
}
interface DialogCloseSlotProps {
  /** Whether the dialog is currently open */
  isOpen: boolean;
  /** Attributes to bind to the close button element */
  attrs: {
    'type': 'button' | undefined;
    'role': 'button' | undefined;
    'tabindex': number;
    'aria-label': string;
    'onClick': () => void;
    'onKeydown': ((e: KeyboardEvent) => void) | undefined;
  };
}
declare const _default$107: typeof __VLS_export$107;
declare const __VLS_export$107: __VLS_WithSlots$77<import("vue").DefineComponent<DialogCloseProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<DialogCloseProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: DialogCloseSlotProps) => any;
}>;
type __VLS_WithSlots$77<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Dialog/index.d.ts
/**
 * Dialog component with sub-components for building modal dialogs.
 *
 * @see https://0.vuetifyjs.com/components/disclosure/dialog
 *
 * @example
 * ```vue
 * <script lang="ts" setup>
 *   import { Dialog } from '@vuetify/v0'
 * </script>
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
declare const Dialog: {
  /**
   * Root component for dialogs.
   *
   * @see https://0.vuetifyjs.com/components/disclosure/dialog
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { Dialog } from '@vuetify/v0'
   * </script>
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
  Root: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<DialogRootProps & {
      modelValue?: boolean;
    }> & Readonly<{
      "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
      "onUpdate:model-value"?: ((value: boolean) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
      "update:modelValue": (value: boolean) => any;
      "update:model-value": (value: boolean) => any;
    }, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<DialogRootProps & {
      modelValue?: boolean;
    }> & Readonly<{
      "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
      "onUpdate:model-value"?: ((value: boolean) => any) | undefined;
    }>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<DialogRootProps & {
    modelValue?: boolean;
  }> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    "onUpdate:model-value"?: ((value: boolean) => any) | undefined;
  }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => any;
    "update:model-value": (value: boolean) => any;
  }, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: DialogRootSlotProps) => any;
    };
  });
  /**
   * Activator component that opens the dialog.
   *
   * @see https://0.vuetifyjs.com/components/disclosure/dialog
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { Dialog } from '@vuetify/v0'
   * </script>
   *
   * <template>
   *   <Dialog.Activator>
   *     Open Dialog
   *   </Dialog.Activator>
   * </template>
   * ```
   */
  Activator: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<DialogActivatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<DialogActivatorProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<DialogActivatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: DialogActivatorSlotProps) => any;
    };
  });
  /**
   * Content container for the dialog using native `<dialog>` element.
   *
   * @see https://0.vuetifyjs.com/components/disclosure/dialog
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { Dialog } from '@vuetify/v0'
   * </script>
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
  Content: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<DialogContentProps> & Readonly<{
      onCancel?: ((e: Event) => any) | undefined;
      onClose?: ((e: Event) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
      cancel: (e: Event) => any;
      close: (e: Event) => any;
    }, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<DialogContentProps> & Readonly<{
      onCancel?: ((e: Event) => any) | undefined;
      onClose?: ((e: Event) => any) | undefined;
    }>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<DialogContentProps> & Readonly<{
    onCancel?: ((e: Event) => any) | undefined;
    onClose?: ((e: Event) => any) | undefined;
  }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    cancel: (e: Event) => any;
    close: (e: Event) => any;
  }, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: DialogContentSlotProps) => any;
    };
  });
  /**
   * Title component for accessible dialog labeling.
   *
   * @see https://0.vuetifyjs.com/components/disclosure/dialog
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { Dialog } from '@vuetify/v0'
   * </script>
   *
   * <template>
   *   <Dialog.Title>Dialog Title</Dialog.Title>
   * </template>
   * ```
   */
  Title: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<DialogTitleProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<DialogTitleProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<DialogTitleProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: DialogTitleSlotProps) => any;
    };
  });
  /**
   * Description component for accessible dialog description.
   *
   * @see https://0.vuetifyjs.com/components/disclosure/dialog
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { Dialog } from '@vuetify/v0'
   * </script>
   *
   * <template>
   *   <Dialog.Description>
   *     This dialog allows you to configure settings.
   *   </Dialog.Description>
   * </template>
   * ```
   */
  Description: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<DialogDescriptionProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<DialogDescriptionProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<DialogDescriptionProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: DialogDescriptionSlotProps) => any;
    };
  });
  /**
   * Close button component for closing the dialog.
   *
   * @see https://0.vuetifyjs.com/components/disclosure/dialog
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { Dialog } from '@vuetify/v0'
   * </script>
   *
   * <template>
   *   <Dialog.Close>Close</Dialog.Close>
   * </template>
   * ```
   */
  Close: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<DialogCloseProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<DialogCloseProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<DialogCloseProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: DialogCloseSlotProps) => any;
    };
  });
};
//#endregion
//#region src/components/ExpansionPanel/ExpansionPanelGroup.vue.d.ts
interface ExpansionPanelOptionsContext {
  /** Disabled state of the entire expansion panel */
  isDisabled: Readonly<Ref<boolean>>;
}
interface ExpansionPanelGroupProps extends AtomProps {
  /** Namespace for dependency injection (default: 'v0:expansion-panel') */
  namespace?: string;
  /** Disables the entire expansion panel instance and all items */
  disabled?: boolean;
  /** Auto-expand non-disabled items when registered */
  enroll?: boolean;
  /**
   * Mandatory expansion behavior:
   * - false (default): All panels can be collapsed
   * - true: Prevents collapsing the last expanded panel
   * - 'force': Automatically expands the first non-disabled panel
   */
  mandatory?: boolean | 'force';
  /**
   * Enable multi-expansion mode
   * - false (default): Single panel expanded at a time (accordion mode)
   * - true: Multiple panels can be expanded simultaneously
   * Note: Changes v-model type from T to T[]
   */
  multiple?: boolean;
}
interface ExpansionPanelGroupSlotProps {
  /** Disables the entire expansion panel instance and all registered items */
  isDisabled: Readonly<Ref<boolean>>;
  /** Select a panel by ID */
  select: (id: ID) => void;
  /** Unselect a panel by ID */
  unselect: (id: ID) => void;
  /** Toggle a panel's expansion state by ID */
  toggle: (id: ID) => void;
}
declare const useExpansionPanelGroup: (key: string, defaultValue?: SelectionContext<SelectionTicket, SelectionTicket<SelectionTicket>> | undefined) => SelectionContext<SelectionTicket, SelectionTicket<SelectionTicket>>, provideExpansionPanelGroup: (key: string, context: SelectionContext<SelectionTicket, SelectionTicket<SelectionTicket>>, app?: import("vue").App) => SelectionContext<SelectionTicket, SelectionTicket<SelectionTicket>>;
declare const _default$106: typeof __VLS_export$106;
declare const __VLS_export$106: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$23<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$23<(ExpansionPanelGroupProps & {
    modelValue?: T | T[];
  }) & {
    "onUpdate:modelValue"?: ((value: T | T[] | undefined) => any) | undefined;
    "onUpdate:model-value"?: ((value: T | T[]) => any) | undefined;
  }> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: ExpansionPanelGroupSlotProps) => any;
  };
  emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$23<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/ExpansionPanel/ExpansionPanelRoot.vue.d.ts
interface ExpansionPanelRootProps<V = unknown> extends AtomProps {
  /** Unique identifier for the panel item (auto-generated if not provided) */
  id?: string;
  /** Value associated with this panel item for v-model binding */
  value?: V;
  /** Disables this specific panel item */
  disabled?: MaybeRefOrGetter<boolean>;
  /** Namespace to retrieve the parent ExpansionPanelGroup context (default: 'v0:expansion-panel') */
  namespace?: string;
}
/**
 * Context provided to child components (ExpansionPanelActivator and ExpansionPanelContent)
 * via dependency injection using the itemNamespace.
 */
interface ExpansionPanelRootContext {
  /** Selection ticket from the parent ExpansionPanel registry */
  ticket: SelectionTicket;
  /** Unique ID for the header/activator element (for aria-controls) */
  headerId: Readonly<Ref<string>>;
  /** Unique ID for the content region (for aria-labelledby) */
  contentId: Readonly<Ref<string>>;
  /** Combined disabled state from item and parent */
  isDisabled: Readonly<Ref<boolean>>;
}
/**
 * Slot props provided to the default slot of ExpansionPanelRoot
 */
interface ExpansionPanelRootSlotProps {
  /** Whether this panel is currently selected/expanded */
  isSelected: boolean;
  /** Combined disabled state from item and parent */
  isDisabled: boolean;
  /** Attributes to bind to the root element for accessibility */
  attrs: {
    /** Data attribute for selected state */
    'data-selected': true | undefined;
  };
}
declare const useExpansionPanelRoot: (key: string, defaultValue?: ExpansionPanelRootContext | undefined) => ExpansionPanelRootContext, provideExpansionPanelRoot: (key: string, context: ExpansionPanelRootContext, app?: import("vue").App) => ExpansionPanelRootContext;
declare const _default$105: typeof __VLS_export$105;
declare const __VLS_export$105: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$22<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$22<ExpansionPanelRootProps<V>> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: ExpansionPanelRootSlotProps) => any;
  };
  emit: {};
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$22<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/ExpansionPanel/ExpansionPanelHeader.vue.d.ts
interface ExpansionPanelHeaderProps extends AtomProps {
  /** Namespace for retrieving the parent ExpansionPanelRoot context (default: 'v0:expansion-panel') */
  namespace?: string;
}
interface ExpansionPanelHeaderSlotProps {
  /** Whether this panel is currently selected/expanded */
  isSelected: boolean;
  /** Attributes to bind to the root element for accessibility */
  attrs: {
    /** Data attribute for selected state */
    'data-selected': true | undefined;
  };
}
declare const _default$104: typeof __VLS_export$104;
declare const __VLS_export$104: __VLS_WithSlots$76<import("vue").DefineComponent<ExpansionPanelHeaderProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ExpansionPanelHeaderProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: ExpansionPanelHeaderSlotProps) => any;
}>;
type __VLS_WithSlots$76<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/ExpansionPanel/ExpansionPanelActivator.vue.d.ts
interface ExpansionPanelActivatorProps extends AtomProps {
  namespace?: string;
}
interface ExpansionPanelActivatorSlotProps {
  /** Disabled state */
  isDisabled: boolean;
  /** Whether this panel is currently selected/expanded */
  isSelected: boolean;
  /** Toggle the panels expansion state */
  toggle: () => void;
  /** Attributes to bind to the activator element for accessibility */
  attrs: {
    /** Unique ID for the header/activator element */
    'id': string;
    /** ARIA role for accessibility (only set when not using native button) */
    'role': 'button' | undefined;
    /** Tab index for keyboard navigation */
    'tabindex': number;
    /** ARIA expanded state */
    'aria-expanded': boolean;
    /** ARIA controls attribute pointing to content region */
    'aria-controls': string;
    /** ARIA disabled state */
    'aria-disabled': boolean;
    /** Data attribute for disabled state */
    'data-disabled': true | undefined;
    /** Data attribute for selected state */
    'data-selected': true | undefined;
    /** Disabled attribute for native button elements */
    'disabled': boolean | undefined;
    /** Type attribute for native button elements */
    'type': 'button' | undefined;
    /** Click handler to toggle panel */
    'onClick': () => void;
    /** Keyboard handler for Enter and Space keys */
    'onKeydown': ((e: KeyboardEvent) => void) | undefined;
  };
}
declare const _default$103: typeof __VLS_export$103;
declare const __VLS_export$103: __VLS_WithSlots$75<import("vue").DefineComponent<ExpansionPanelActivatorProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ExpansionPanelActivatorProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: ExpansionPanelActivatorSlotProps) => any;
}>;
type __VLS_WithSlots$75<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/ExpansionPanel/ExpansionPanelCue.vue.d.ts
interface ExpansionPanelCueProps extends AtomProps {
  namespace?: string;
}
interface ExpansionPanelCueSlotProps {
  isSelected: boolean;
  attrs: {
    'aria-hidden': true;
    'data-state': 'open' | 'closed';
  };
}
declare const _default$102: typeof __VLS_export$102;
declare const __VLS_export$102: __VLS_WithSlots$74<import("vue").DefineComponent<ExpansionPanelCueProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ExpansionPanelCueProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: ExpansionPanelCueSlotProps) => any;
}>;
type __VLS_WithSlots$74<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/ExpansionPanel/ExpansionPanelContent.vue.d.ts
interface ExpansionPanelContentProps extends AtomProps {
  namespace?: string;
}
interface ExpansionPanelContentSlotProps {
  /** Whether this panel is currently selected/expanded */
  isSelected: boolean;
  /** Attributes to bind to the content element for accessibility */
  attrs: {
    /** Data attribute for selected state */
    'data-selected': true | undefined;
    /** Unique ID for the content region */
    'id': string;
    /** ARIA role for accessibility */
    'role': 'region';
    /** ARIA labelledby attribute pointing to header element */
    'aria-labelledby': string;
    /** Whether the content is hidden */
    'hidden': boolean;
  };
}
declare const _default$101: typeof __VLS_export$101;
declare const __VLS_export$101: __VLS_WithSlots$73<import("vue").DefineComponent<ExpansionPanelContentProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ExpansionPanelContentProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: ExpansionPanelContentSlotProps) => any;
}>;
type __VLS_WithSlots$73<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/ExpansionPanel/index.d.ts
/**
 * ExpansionPanel component with sub-components for building expansion panels.
 *
 * @see https://0.vuetifyjs.com/components/disclosure/expansion-panel
 *
 * @example
 * ```vue
 * <script lang="ts" setup>
 *   import { ExpansionPanel } from '@vuetify/v0'
 * </script>
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
declare const ExpansionPanel: {
  /**
   * Group component for coordinating expansion panels.
   *
   * @see https://0.vuetifyjs.com/components/disclosure/expansion-panel
   */
  Group: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
    slots: {
      default: (props: ExpansionPanelGroupSlotProps) => any;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      namespace?: string | undefined;
      disabled?: boolean | undefined;
      enroll?: boolean | undefined;
      mandatory?: boolean | "force" | undefined;
      multiple?: boolean | undefined;
      as?: (DOMElement | null) | undefined;
      renderless?: boolean | undefined;
      modelValue?: (T | T[]) | undefined;
      "onUpdate:modelValue"?: ((value: T | T[] | undefined) => any) | undefined;
      "onUpdate:model-value"?: ((value: T | T[]) => any) | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: ExpansionPanelGroupSlotProps) => any;
    };
    emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
  /**
   * Root component representing a single expansion panel.
   *
   * @see https://0.vuetifyjs.com/components/disclosure/expansion-panel
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { ExpansionPanel } from '@vuetify/v0'
   * </script>
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
  Root: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: {};
    slots: {
      default: (props: ExpansionPanelRootSlotProps) => any;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      id?: string | undefined;
      value?: V | undefined;
      disabled?: import("vue").MaybeRefOrGetter<boolean> | undefined;
      namespace?: string | undefined;
      as?: (DOMElement | null) | undefined;
      renderless?: boolean | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: ExpansionPanelRootSlotProps) => any;
    };
    emit: {};
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
  /**
   * (optional) Component for the header section of an expansion panel item.
   *
   * @see https://0.vuetifyjs.com/components/disclosure/expansion-panel
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { ExpansionPanel } from '@vuetify/v0'
   * </script>
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
  Header: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<ExpansionPanelHeaderProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ExpansionPanelHeaderProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<ExpansionPanelHeaderProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: ExpansionPanelHeaderSlotProps) => any;
    };
  });
  /**
   * Component for the activator section of an expansion panel header.
   *
   * @see https://0.vuetifyjs.com/components/disclosure/expansion-panel
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { ExpansionPanel } from '@vuetify/v0'
   * </script>
   *
   * <template>
   *   <ExpansionPanel.Activator>
   *    Click to expand
   *   </ExpansionPanel.Activator>
   * </template>
   * ```
   */
  Activator: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<ExpansionPanelActivatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ExpansionPanelActivatorProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<ExpansionPanelActivatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: ExpansionPanelActivatorSlotProps) => any;
    };
  });
  /**
   * Visual cue for expansion state (e.g., chevron icon).
   *
   * @see https://0.vuetifyjs.com/components/disclosure/expansion-panel
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { ExpansionPanel } from '@vuetify/v0'
   * </script>
   *
   * <template>
   *   <ExpansionPanel.Activator>
   *     Click to expand
   *     <ExpansionPanel.Cue />
   *   </ExpansionPanel.Activator>
   * </template>
   * ```
   */
  Cue: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<ExpansionPanelCueProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ExpansionPanelCueProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<ExpansionPanelCueProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: ExpansionPanelCueSlotProps) => any;
    };
  });
  /**
   * Component for the content section of an expansion panel item.
   *
   * @see https://0.vuetifyjs.com/components/disclosure/expansion-panel
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { ExpansionPanel } from '@vuetify/v0'
   * </script>
   *
   * <template>
   *   <ExpansionPanel.Content>
   *     Content goes here.
   *   </ExpansionPanel.Content>
   * </template>
   * ```
   */
  Content: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<ExpansionPanelContentProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ExpansionPanelContentProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<ExpansionPanelContentProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: ExpansionPanelContentSlotProps) => any;
    };
  });
};
//#endregion
//#region src/components/Form/Form.vue.d.ts
interface FormProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Disables all registered fields */
  disabled?: boolean;
  /** Sets all registered fields to readonly */
  readonly?: boolean;
  /** Suppress native constraint validation (default: true) — set false to restore browser validation UI */
  novalidate?: boolean;
}
interface FormSlotProps {
  /** Aggregate validity: null = unvalidated, true = all valid, false = any invalid */
  isValid: boolean | null;
  /** Whether any field is currently validating */
  isValidating: boolean;
  /** Whether the form is disabled */
  isDisabled: boolean;
  /** Whether the form is readonly */
  isReadonly: boolean;
  /** Validate all fields and return result */
  submit: () => Promise<boolean>;
  /** Reset all field validations */
  reset: () => void;
  /** Attributes to bind to the form element */
  attrs: {
    novalidate: true | undefined;
    onSubmit: (event: Event) => void;
    onReset: (event: Event) => void;
  };
}
declare const _default$100: typeof __VLS_export$100;
declare const __VLS_export$100: __VLS_WithSlots$72<import("vue").DefineComponent<FormProps & {
  modelValue?: boolean | null;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
  reset: () => any;
  "update:modelValue": (value: boolean | null) => any;
  "update:model-value": (value: boolean | null) => any;
  submit: (payload: {
    valid: boolean;
  }) => any;
}, string, import("vue").PublicProps, Readonly<FormProps & {
  modelValue?: boolean | null;
}> & Readonly<{
  onReset?: (() => any) | undefined;
  "onUpdate:modelValue"?: ((value: boolean | null) => any) | undefined;
  "onUpdate:model-value"?: ((value: boolean | null) => any) | undefined;
  onSubmit?: ((payload: {
    valid: boolean;
  }) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: FormSlotProps) => any;
}>;
type __VLS_WithSlots$72<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Group/GroupRoot.vue.d.ts
interface GroupRootProps {
  /** Namespace for dependency injection (must match GroupItem namespace) */
  namespace?: string;
  /** Disables the entire group instance */
  disabled?: boolean;
  /** Auto-select non-disabled items on registration */
  enroll?: boolean;
  /**
   * Controls mandatory group behavior:
   * - false (default): No mandatory group enforcement
   * - true: Prevents deselecting the last selected item
   * - `force`: Automatically selects the first non-disabled item on registration
   */
  mandatory?: boolean | 'force';
}
interface GroupRootSlotProps {
  /** Whether the group instance is disabled */
  isDisabled: boolean;
  /** Whether no items are currently selected */
  isNoneSelected: boolean;
  /** Whether all selectable (non-disabled) items are selected */
  isAllSelected: boolean;
  /** Whether some but not all selectable items are selected */
  isMixed: boolean;
  /** Select an item by ID */
  select: (id: ID | ID[]) => void;
  /** Unselect an item by ID */
  unselect: (id: ID | ID[]) => void;
  /** Toggle an item's group state by ID */
  toggle: (id: ID | ID[]) => void;
  /** Select all selectable (non-disabled) items */
  selectAll: () => void;
  /** Unselect all items (respects mandatory option) */
  unselectAll: () => void;
  /** Toggle between all selected and none selected */
  toggleAll: () => void;
  /** Attributes to bind to the root element */
  attrs: {
    'aria-multiselectable': true;
  };
}
declare const useGroupRoot: (key: string, defaultValue?: GroupContext<GroupTicket, GroupTicket<GroupTicket>> | undefined) => GroupContext<GroupTicket, GroupTicket<GroupTicket>>, provideGroupRoot: (key: string, context: GroupContext<GroupTicket, GroupTicket<GroupTicket>>, app?: import("vue").App) => GroupContext<GroupTicket, GroupTicket<GroupTicket>>;
declare const _default$99: typeof __VLS_export$99;
declare const __VLS_export$99: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$21<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$21<(GroupRootProps & {
    modelValue?: T | T[];
  }) & {
    "onUpdate:modelValue"?: ((value: T | T[] | undefined) => any) | undefined;
    "onUpdate:model-value"?: ((value: T | T[]) => any) | undefined;
  }> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: GroupRootSlotProps) => any;
  };
  emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$21<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Group/GroupItem.vue.d.ts
interface GroupItemProps<V = unknown> {
  /** Unique identifier (auto-generated if not provided) */
  id?: string;
  /** Optional display label (passed through to slot, not used in registration) */
  label?: string;
  /** Value associated with this item */
  value?: V;
  /** Disables this specific item */
  disabled?: MaybeRefOrGetter<boolean>;
  /** Sets the indeterminate state (for checkboxes) */
  indeterminate?: MaybeRefOrGetter<boolean>;
  /** Namespace for dependency injection */
  namespace?: string;
}
interface GroupItemSlotProps<V = unknown> {
  /** Unique identifier */
  id: string;
  /** Optional display label */
  label?: string;
  /** Value associated with this item */
  value: V | undefined;
  /** Whether this item is currently selected */
  isSelected: boolean;
  /** Whether this item is in a mixed/indeterminate state */
  isMixed: boolean;
  /** Whether this item is disabled */
  isDisabled: boolean;
  /** Select this item */
  select: () => void;
  /** Unselect this item */
  unselect: () => void;
  /** Toggle this item's group state */
  toggle: () => void;
  /** Set this item to mixed/indeterminate state */
  mix: () => void;
  /** Clear mixed/indeterminate state from this item */
  unmix: () => void;
  /** Attributes to bind to the item element */
  attrs: {
    'role': 'checkbox';
    'tabindex': 0 | -1;
    'aria-checked': boolean | 'mixed';
    'aria-disabled': boolean;
    'data-selected': true | undefined;
    'data-disabled': true | undefined;
    'data-mixed': true | undefined;
    'onClick': () => void;
    'onKeydown': (e: KeyboardEvent) => void;
  };
}
declare const _default$98: typeof __VLS_export$98;
declare const __VLS_export$98: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$20<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$20<GroupItemProps<V>> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: GroupItemSlotProps<V>) => unknown;
  };
  emit: {};
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$20<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Group/index.d.ts
/**
 * Group component with sub-components for multi-selection.
 *
 * @see https://0.vuetifyjs.com/components/providers/group
 */
declare const Group: {
  /**
   * Root component for multi-selection groups.
   *
   * @see https://0.vuetifyjs.com/components/providers/group
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { Group } from '@vuetify/v0'
   * </script>
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
  Root: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
    slots: {
      default: (props: GroupRootSlotProps) => any;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      namespace?: string | undefined;
      disabled?: boolean | undefined;
      enroll?: boolean | undefined;
      mandatory?: boolean | "force" | undefined;
      modelValue?: (T | T[]) | undefined;
      "onUpdate:modelValue"?: ((value: T | T[] | undefined) => any) | undefined;
      "onUpdate:model-value"?: ((value: T | T[]) => any) | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: GroupRootSlotProps) => any;
    };
    emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
  /**
   * Item component for multi-selection groups.
   *
   * @see https://0.vuetifyjs.com/components/providers/group
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { Group } from '@vuetify/v0'
   * </script>
   *
   * <template>
   *   <Group.Item value="a">
   *     Option A
   *   </Group.Item>
   * </template>
   * ```
   */
  Item: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: {};
    slots: {
      default: (props: GroupItemSlotProps<V>) => unknown;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      id?: string | undefined;
      label?: string | undefined;
      value?: V | undefined;
      disabled?: import("vue").MaybeRefOrGetter<boolean> | undefined;
      indeterminate?: import("vue").MaybeRefOrGetter<boolean> | undefined;
      namespace?: string | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: GroupItemSlotProps<V>) => unknown;
    };
    emit: {};
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
};
//#endregion
//#region src/components/Image/ImageRoot.vue.d.ts
interface ImageRootProps extends AtomProps {
  /** Image source URL. Forwarded to Image.Img via context. */
  src?: string;
  /** Defer loading until the root element intersects the viewport. */
  lazy?: boolean;
  /** IntersectionObserver root margin. Only used when lazy is true. */
  rootMargin?: string;
  /**
   * IntersectionObserver threshold(s). A number or array of numbers
   * between 0.0 and 1.0 indicating the percentage of the target's
   * visibility required to trigger the observer. Only used when lazy is true.
   */
  threshold?: number | number[];
  /**
   * IntersectionObserver root element. If omitted, the viewport is used.
   * Pass a scroll container to observe intersections relative to it instead.
   * Only used when lazy is true.
   */
  root?: Element | null;
  /** Namespace for dependency injection. */
  namespace?: string;
}
interface ImageRootSlotProps {
  /** Current loading status. */
  status: ImageStatus;
  isIdle: boolean;
  isLoading: boolean;
  isLoaded: boolean;
  isError: boolean;
  /** Reset the image and re-attempt loading. */
  retry: () => void;
  /** Attributes for the root element. */
  attrs: {
    'data-state': ImageStatus;
  };
}
interface ImageContext extends UseImageReturn {}
declare const useImageRoot: (key: string, defaultValue?: ImageContext | undefined) => ImageContext, provideImageRoot: (key: string, context: ImageContext, app?: import("vue").App) => ImageContext;
declare const _default$97: typeof __VLS_export$97;
declare const __VLS_export$97: __VLS_WithSlots$71<import("vue").DefineComponent<ImageRootProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ImageRootProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: ImageRootSlotProps) => any;
}>;
type __VLS_WithSlots$71<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Image/ImageImg.vue.d.ts
interface ImageImgProps extends AtomProps {
  /** Accessible alt text. */
  alt?: string;
  /** Responsive image candidates. */
  srcset?: string;
  /** Image sizes hint for responsive selection. */
  sizes?: string;
  /** Intrinsic image width — set to prevent layout shift. */
  width?: number | string;
  /** Intrinsic image height — set to prevent layout shift. */
  height?: number | string;
  /** CORS request mode. */
  crossorigin?: '' | 'anonymous' | 'use-credentials';
  /** Referrer policy for the request. */
  referrerpolicy?: string;
  /** How the browser should decode the image. */
  decoding?: 'sync' | 'async' | 'auto';
  /** Native browser-managed lazy loading hint. */
  loading?: 'eager' | 'lazy';
  /** Resource priority hint. */
  fetchpriority?: 'high' | 'low' | 'auto';
  /** Namespace for retrieving the Image context. */
  namespace?: string;
}
interface ImageImgEmits {
  load: [e: Event];
  error: [e: Event];
  /**
   * Synthesized event fired when the image transitions into the `loading`
   * state: on initial mount if `eager`, on intersection if `lazy`, when
   * `src` changes, or when `retry()` is called. Emits the source URL that
   * started loading — analytics can treat every emit as one network request.
   */
  loadstart: [src: string];
}
interface ImageImgSlotProps {
  /** Whether the image has loaded successfully. */
  isLoaded: boolean;
  /** Current loading status. */
  status: ImageStatus;
  /** Attributes to bind to the image element. */
  attrs: {
    'role': 'img';
    'src': string | undefined;
    'srcset': string | undefined;
    'sizes': string | undefined;
    'alt': string | undefined;
    'width': number | string | undefined;
    'height': number | string | undefined;
    'crossorigin': '' | 'anonymous' | 'use-credentials' | undefined;
    'referrerpolicy': string | undefined;
    'decoding': 'sync' | 'async' | 'auto';
    'loading': 'eager' | 'lazy' | undefined;
    'fetchpriority': 'high' | 'low' | 'auto' | undefined;
    'data-state': ImageStatus;
    'onLoad': (e: Event) => void;
    'onError': (e: Event) => void;
  };
}
declare const _default$96: typeof __VLS_export$96;
declare const __VLS_export$96: __VLS_WithSlots$70<import("vue").DefineComponent<ImageImgProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
  error: (e: Event) => any;
  load: (e: Event) => any;
  loadstart: (src: string) => any;
}, string, import("vue").PublicProps, Readonly<ImageImgProps> & Readonly<{
  onError?: ((e: Event) => any) | undefined;
  onLoad?: ((e: Event) => any) | undefined;
  onLoadstart?: ((src: string) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: ImageImgSlotProps) => any;
}>;
type __VLS_WithSlots$70<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Image/ImagePlaceholder.vue.d.ts
interface ImagePlaceholderProps extends AtomProps {
  /** Namespace for retrieving the Image context. */
  namespace?: string;
}
interface ImagePlaceholderSlotProps {
  /** Current loading status. */
  status: ImageStatus;
  /** Attributes to bind to the placeholder element. */
  attrs: {
    'aria-hidden': true;
    'data-state': ImageStatus;
  };
}
declare const _default$95: typeof __VLS_export$95;
declare const __VLS_export$95: __VLS_WithSlots$69<import("vue").DefineComponent<ImagePlaceholderProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ImagePlaceholderProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: ImagePlaceholderSlotProps) => any;
}>;
type __VLS_WithSlots$69<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Image/ImageFallback.vue.d.ts
interface ImageFallbackProps extends AtomProps {
  /** Namespace for retrieving the Image context. */
  namespace?: string;
}
interface ImageFallbackSlotProps {
  /** Reset the image and re-attempt loading. */
  retry: () => void;
  /** Attributes to bind to the fallback element. */
  attrs: {
    'role': 'img';
    'data-state': 'error';
  };
}
declare const _default$94: typeof __VLS_export$94;
declare const __VLS_export$94: __VLS_WithSlots$68<import("vue").DefineComponent<ImageFallbackProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ImageFallbackProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: ImageFallbackSlotProps) => any;
}>;
type __VLS_WithSlots$68<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Image/index.d.ts
/**
 * Image component with sub-components for managing image loading lifecycle.
 *
 * @see https://0.vuetifyjs.com/components/semantic/image
 */
declare const Image: {
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
   * </script>
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
  Root: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<ImageRootProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ImageRootProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<ImageRootProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: ImageRootSlotProps) => any;
    };
  });
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
  Img: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<ImageImgProps> & Readonly<{
      onError?: ((e: Event) => any) | undefined;
      onLoad?: ((e: Event) => any) | undefined;
      onLoadstart?: ((src: string) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
      error: (e: Event) => any;
      load: (e: Event) => any;
      loadstart: (src: string) => any;
    }, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ImageImgProps> & Readonly<{
      onError?: ((e: Event) => any) | undefined;
      onLoad?: ((e: Event) => any) | undefined;
      onLoadstart?: ((src: string) => any) | undefined;
    }>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<ImageImgProps> & Readonly<{
    onError?: ((e: Event) => any) | undefined;
    onLoad?: ((e: Event) => any) | undefined;
    onLoadstart?: ((src: string) => any) | undefined;
  }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    error: (e: Event) => any;
    load: (e: Event) => any;
    loadstart: (src: string) => any;
  }, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: ImageImgSlotProps) => any;
    };
  });
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
  Placeholder: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<ImagePlaceholderProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ImagePlaceholderProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<ImagePlaceholderProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: ImagePlaceholderSlotProps) => any;
    };
  });
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
  Fallback: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<ImageFallbackProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ImageFallbackProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<ImageFallbackProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: ImageFallbackSlotProps) => any;
    };
  });
};
//#endregion
//#region src/components/Input/InputControl.vue.d.ts
interface InputControlProps extends AtomProps {
  namespace?: string;
}
interface InputControlSlotProps {
  /** Current input value */
  value: string;
  /** Whether this input is focused */
  isFocused: boolean;
  /** Whether this input is disabled */
  isDisabled: boolean;
  /** Whether this input is readonly */
  isReadonly: boolean;
  /** Pre-computed attributes for the input element */
  attrs: Record<string, unknown>;
}
declare const _default$93: typeof __VLS_export$93;
declare const __VLS_export$93: __VLS_WithSlots$67<import("vue").DefineComponent<InputControlProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<InputControlProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: InputControlSlotProps) => any;
}>;
type __VLS_WithSlots$67<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Input/InputDescription.vue.d.ts
interface InputDescriptionProps extends AtomProps {
  /** Unique identifier (auto-generated if not provided) */
  id?: string;
  /** Namespace for connecting to parent Input.Root */
  namespace?: string;
}
interface InputDescriptionSlotProps {
  /** ID for this description element */
  id: string;
}
declare const _default$92: typeof __VLS_export$92;
declare const __VLS_export$92: __VLS_WithSlots$66<import("vue").DefineComponent<InputDescriptionProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<InputDescriptionProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: InputDescriptionSlotProps) => any;
}>;
type __VLS_WithSlots$66<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Input/InputError.vue.d.ts
interface InputErrorProps extends AtomProps {
  /** Unique identifier (auto-generated if not provided) */
  id?: string;
  /** Namespace for connecting to parent Input.Root */
  namespace?: string;
}
interface InputErrorSlotProps {
  /** Current validation error messages */
  errors: string[];
  /** Pre-computed attributes for the error element */
  attrs: {
    'id': string;
    'aria-live': 'polite';
    'data-state': 'visible' | 'hidden';
  };
}
declare const _default$91: typeof __VLS_export$91;
declare const __VLS_export$91: __VLS_WithSlots$65<import("vue").DefineComponent<InputErrorProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<InputErrorProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: InputErrorSlotProps) => any;
}>;
type __VLS_WithSlots$65<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Input/InputRoot.vue.d.ts
/** Base validation trigger event */
type ValidateEvent = 'blur' | 'input' | 'submit';
/** When to trigger validation, with optional lazy/eager modifier */
type ValidateOn = ValidateEvent | 'lazy' | 'eager' | 'blur lazy' | 'input lazy' | 'submit lazy' | 'blur eager' | 'input eager' | 'submit eager' | 'lazy blur' | 'lazy input' | 'lazy submit' | 'eager blur' | 'eager input' | 'eager submit';
interface InputRootContext {
  /** Unique identifier */
  readonly id: ID;
  /** Optional display label */
  readonly label?: string;
  /** Form field name */
  readonly name?: string;
  /** Input type */
  readonly type: Readonly<Ref<string>>;
  /** Associate with form by ID */
  readonly form?: string;
  /** Whether this input is required */
  readonly required?: boolean;
  /** ID for description element (aria-describedby) */
  readonly descriptionId: string;
  /** ID for error element (aria-errormessage) */
  readonly errorId: string;
  /** Registry of mounted Description sub-components */
  descriptions: RegistryContext;
  /** Registry of mounted Error sub-components */
  fieldErrors: RegistryContext;
  /** Whether a Description sub-component is mounted */
  hasDescription: Readonly<Ref<boolean>>;
  /** Whether an Error sub-component is mounted */
  hasError: Readonly<Ref<boolean>>;
  /** Current input value — write to update both v-model and validation */
  value: Ref<string>;
  /** Whether this input has content */
  isDirty: Readonly<Ref<boolean>>;
  /** Whether this input is focused */
  isFocused: ShallowRef<boolean>;
  /** Whether this input is disabled */
  isDisabled: Readonly<Ref<boolean>>;
  /** Whether this input is readonly */
  isReadonly: Readonly<Ref<boolean>>;
  /** Merged validation + manual error messages */
  errors: Readonly<Ref<string[]>>;
  /** Whether the field is valid (null = unvalidated, accounts for error prop) */
  isValid: Readonly<Ref<boolean | null>>;
  /** Whether the field value hasn't changed since mount/reset */
  isPristine: Readonly<Ref<boolean>>;
  /** Whether async validation is in progress */
  isValidating: Readonly<Ref<boolean>>;
  /** Validate the input */
  validate: () => Promise<boolean>;
  /** Reset the input to initial state */
  reset: () => void;
}
interface InputRootProps extends AtomProps {
  /** Unique identifier (auto-generated if not provided) */
  id?: ID;
  /** Optional display label */
  label?: string;
  /** Form field name */
  name?: string;
  /** Input type */
  type?: string;
  /** Associate with form by ID */
  form?: string;
  /** Disables this input */
  disabled?: MaybeRefOrGetter<boolean>;
  /** Makes this input readonly */
  readonly?: MaybeRefOrGetter<boolean>;
  /** Whether this input is required */
  required?: boolean;
  /** Validation rules */
  rules?: (FormValidationRule | RuleAlias | StandardSchemaV1)[];
  /** When to trigger validation */
  validateOn?: ValidateOn;
  /** Manual error state override — forces invalid regardless of validation */
  error?: boolean;
  /** Manual error messages — merged with rule-based errors */
  errorMessages?: MaybeArray<string>;
  /** Namespace for context provision to children */
  namespace?: string;
  /** Namespace for connecting to parent Form. Must match Form's namespace. */
  formNamespace?: string;
}
interface InputRootSlotProps {
  /** Unique identifier */
  id: ID;
  /** Optional display label */
  label?: string;
  /** Current input value */
  value: string;
  /** Whether this input has content */
  isDirty: boolean;
  /** Whether this input is focused */
  isFocused: boolean;
  /** Merged error messages */
  errors: string[];
  /** Whether the field is valid */
  isValid: boolean | null;
  /** Whether the field value hasn't changed */
  isPristine: boolean;
  /** Whether async validation is in progress */
  isValidating: boolean;
  /** Whether this input is disabled */
  isDisabled: boolean;
  /** Whether this input is readonly */
  isReadonly: boolean;
  /** Validate the input */
  validate: () => Promise<boolean>;
  /** Reset the input */
  reset: () => void;
  /** Attributes to bind to the root element */
  attrs: {
    'data-state': InputState;
    'data-dirty': true | undefined;
    'data-focused': true | undefined;
    'data-disabled': true | undefined;
    'data-readonly': true | undefined;
  };
}
declare const useInputRoot: (key: string, defaultValue?: InputRootContext | undefined) => InputRootContext, provideInputRoot: (key: string, context: InputRootContext, app?: import("vue").App) => InputRootContext;
declare const _default$90: typeof __VLS_export$90;
declare const __VLS_export$90: __VLS_WithSlots$64<import("vue").DefineComponent<InputRootProps & {
  modelValue?: string;
  focused?: boolean;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
  "update:modelValue": (value: string) => any;
  "update:model-value": (value: string) => any;
  "update:focused": (...args: unknown[]) => any;
}, string, import("vue").PublicProps, Readonly<InputRootProps & {
  modelValue?: string;
  focused?: boolean;
}> & Readonly<{
  "onUpdate:modelValue"?: ((value: string) => any) | undefined;
  "onUpdate:model-value"?: ((value: string) => any) | undefined;
  "onUpdate:focused"?: ((...args: unknown[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: InputRootSlotProps) => any;
}>;
type __VLS_WithSlots$64<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Input/index.d.ts
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
 * </script>
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
declare const Input: {
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
  Control: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<InputControlProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<InputControlProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<InputControlProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: InputControlSlotProps) => any;
    };
  });
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
  Description: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<InputDescriptionProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<InputDescriptionProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<InputDescriptionProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: InputDescriptionSlotProps) => any;
    };
  });
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
  Error: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<InputErrorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<InputErrorProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<InputErrorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: InputErrorSlotProps) => any;
    };
  });
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
   * </script>
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
  Root: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<InputRootProps & {
      modelValue?: string;
      focused?: boolean;
    }> & Readonly<{
      "onUpdate:modelValue"?: ((value: string) => any) | undefined;
      "onUpdate:model-value"?: ((value: string) => any) | undefined;
      "onUpdate:focused"?: ((...args: unknown[]) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
      "update:modelValue": (value: string) => any;
      "update:model-value": (value: string) => any;
      "update:focused": (...args: unknown[]) => any;
    }, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<InputRootProps & {
      modelValue?: string;
      focused?: boolean;
    }> & Readonly<{
      "onUpdate:modelValue"?: ((value: string) => any) | undefined;
      "onUpdate:model-value"?: ((value: string) => any) | undefined;
      "onUpdate:focused"?: ((...args: unknown[]) => any) | undefined;
    }>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<InputRootProps & {
    modelValue?: string;
    focused?: boolean;
  }> & Readonly<{
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    "onUpdate:model-value"?: ((value: string) => any) | undefined;
    "onUpdate:focused"?: ((...args: unknown[]) => any) | undefined;
  }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string) => any;
    "update:model-value": (value: string) => any;
    "update:focused": (...args: unknown[]) => any;
  }, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: InputRootSlotProps) => any;
    };
  });
};
//#endregion
//#region src/components/Locale/Locale.vue.d.ts
interface LocaleProps {
  /**
   * Locale ID to scope to
   */
  locale: string;
  /**
   * Skip wrapper element, pass attrs via slot
   *
   * @default false
   */
  renderless?: boolean;
  /**
   * Wrapper element tag
   *
   * @default 'div'
   */
  as?: DOMElement;
}
interface LocaleSlotProps {
  /** Attributes including lang for binding */
  attrs: Record<string, unknown>;
}
declare const _default$89: typeof __VLS_export$89;
declare const __VLS_export$89: __VLS_WithSlots$63<import("vue").DefineComponent<LocaleProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<LocaleProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: LocaleSlotProps) => any;
}>;
type __VLS_WithSlots$63<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/NumberField/NumberFieldRoot.vue.d.ts
interface NumberFieldRootContext extends NumberFieldContext {
  /** Unique identifier */
  readonly id: ID;
  /** Optional display label (used as aria-label on spinbutton) */
  readonly label?: string;
  /** ID of element that labels this spinbutton */
  readonly ariaLabelledby?: string;
  /** Form field name */
  readonly name?: string;
  /** Associate with form by ID */
  readonly form?: string;
  /** Whether this field is required */
  readonly required?: boolean;
  /** ID for description element (aria-describedby) */
  readonly descriptionId: string;
  /** ID for error element (aria-errormessage) */
  readonly errorId: string;
  /** Registry of mounted Description sub-components */
  descriptions: RegistryContext;
  /** Registry of mounted Error sub-components */
  fieldErrors: RegistryContext;
  /** Whether a Description sub-component is mounted */
  hasDescription: Readonly<Ref<boolean>>;
  /** Whether an Error sub-component is mounted */
  hasError: Readonly<Ref<boolean>>;
  /** Whether this field has content */
  isDirty: Readonly<Ref<boolean>>;
  /** Whether this field is focused */
  isFocused: ShallowRef<boolean>;
  /** Whether this field is disabled */
  isDisabled: Readonly<Ref<boolean>>;
  /** Whether this field is readonly */
  isReadonly: Readonly<Ref<boolean>>;
  /** Merged validation + manual error messages */
  errors: Readonly<Ref<string[]>>;
  /** Whether the field is valid (null = unvalidated) */
  isValid: Readonly<Ref<boolean | null>>;
  /** Whether the field value hasn't changed since mount/reset */
  isPristine: Readonly<Ref<boolean>>;
  /** Whether async validation is in progress */
  isValidating: Readonly<Ref<boolean>>;
  /** Validate the field */
  validate: () => Promise<boolean>;
  /** Reset the field to initial state */
  reset: () => void;
  /** Delay in ms before spin-on-hold starts */
  spinDelay: number;
  /** Interval in ms for repeated spin */
  spinRate: number;
  /** Whether mouse wheel adjusts value */
  wheel: boolean;
}
interface NumberFieldRootProps extends AtomProps {
  /** Unique identifier (auto-generated if not provided) */
  id?: ID;
  /** Optional display label (rendered as aria-label on the spinbutton) */
  label?: string;
  /** ID of element that labels this spinbutton */
  ariaLabelledby?: string;
  /** Form field name */
  name?: string;
  /** Associate with form by ID */
  form?: string;
  /** Whether this field is required */
  required?: boolean;
  /** Disables this field */
  disabled?: MaybeRefOrGetter<boolean>;
  /** Makes this field readonly */
  readonly?: MaybeRefOrGetter<boolean>;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment (default: 1) */
  step?: number;
  /** Leap increment for PageUp/PageDown */
  leap?: number;
  /** Wrap around at boundaries */
  wrap?: boolean;
  /** BCP 47 locale tag (default: 'en-US') */
  locale?: string;
  /** Intl.NumberFormat options */
  format?: Intl.NumberFormatOptions;
  /** Whether commit() clamps to min/max (default: true) */
  clamp?: boolean;
  /** When typed input is written into the model (default: 'change') */
  commitOn?: 'input' | 'change';
  /** Validation rules */
  rules?: (FormValidationRule | RuleAlias | StandardSchemaV1)[];
  /** When to trigger validation */
  validateOn?: ValidateOn;
  /** Manual error state override — forces invalid */
  error?: boolean;
  /** Manual error messages — merged with rule-based errors */
  errorMessages?: MaybeArray<string>;
  /** Delay in ms before spin-on-hold starts (default: 400) */
  spinDelay?: number;
  /** Interval in ms for repeated spin (default: 60) */
  spinRate?: number;
  /** Whether mouse wheel adjusts value (default: false) */
  wheel?: boolean;
  /** Namespace for context provision */
  namespace?: string;
  /** Namespace for connecting to parent Form. Must match Form's namespace. */
  formNamespace?: string;
}
interface NumberFieldRootSlotProps {
  /** Unique identifier */
  id: ID;
  /** Current numeric value */
  value: number | null;
  /** Formatted display string */
  display: string;
  /** Whether the value can be incremented */
  canIncrement: boolean;
  /** Whether the value can be decremented */
  canDecrement: boolean;
  /** Whether this field is disabled */
  isDisabled: boolean;
  /** Whether this field is readonly */
  isReadonly: boolean;
  /** Whether this field is focused */
  isFocused: boolean;
  /** Merged error messages */
  errors: string[];
  /** Whether the field is valid */
  isValid: boolean | null;
  /** Whether the field value hasn't changed */
  isPristine: boolean;
  /** Validate the field */
  validate: () => Promise<boolean>;
  /** Reset the field */
  reset: () => void;
  /** Attributes to bind to the root element */
  attrs: {
    'data-state': InputState;
    'data-dirty': true | undefined;
    'data-focused': true | undefined;
    'data-disabled': true | undefined;
    'data-readonly': true | undefined;
  };
}
declare const useNumberFieldRoot: (key: string, defaultValue?: NumberFieldRootContext | undefined) => NumberFieldRootContext, provideNumberFieldRoot: (key: string, context: NumberFieldRootContext, app?: import("vue").App) => NumberFieldRootContext;
declare const _default$88: typeof __VLS_export$88;
declare const __VLS_export$88: __VLS_WithSlots$62<import("vue").DefineComponent<NumberFieldRootProps & {
  modelValue?: number | null;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
  "update:modelValue": (value: number | null) => any;
  "update:model-value": (value: number | null) => any;
}, string, import("vue").PublicProps, Readonly<NumberFieldRootProps & {
  modelValue?: number | null;
}> & Readonly<{
  "onUpdate:modelValue"?: ((value: number | null) => any) | undefined;
  "onUpdate:model-value"?: ((value: number | null) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: NumberFieldRootSlotProps) => any;
}>;
type __VLS_WithSlots$62<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/NumberField/NumberFieldControl.vue.d.ts
interface NumberFieldControlProps extends AtomProps {
  /** Namespace for connecting to parent NumberField.Root */
  namespace?: string;
}
interface NumberFieldControlSlotProps {
  /** Current display value */
  value: string;
  /** Whether this field is focused */
  isFocused: boolean;
  /** Whether this field is disabled */
  isDisabled: boolean;
  /** Whether this field is readonly */
  isReadonly: boolean;
  /** Pre-computed attributes for the input element */
  attrs: Record<string, unknown>;
}
declare const _default$87: typeof __VLS_export$87;
declare const __VLS_export$87: __VLS_WithSlots$61<import("vue").DefineComponent<NumberFieldControlProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<NumberFieldControlProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: NumberFieldControlSlotProps) => any;
}>;
type __VLS_WithSlots$61<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/NumberField/NumberFieldIncrement.vue.d.ts
interface NumberFieldIncrementProps extends AtomProps {
  /** Namespace for connecting to parent NumberField.Root */
  namespace?: string;
}
interface NumberFieldIncrementSlotProps {
  /** Whether the button is disabled */
  isDisabled: boolean;
  /** Pre-computed attributes for the button */
  attrs: Record<string, unknown>;
}
declare const _default$86: typeof __VLS_export$86;
declare const __VLS_export$86: __VLS_WithSlots$60<import("vue").DefineComponent<NumberFieldIncrementProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<NumberFieldIncrementProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: NumberFieldIncrementSlotProps) => any;
}>;
type __VLS_WithSlots$60<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/NumberField/NumberFieldDecrement.vue.d.ts
interface NumberFieldDecrementProps extends AtomProps {
  /** Namespace for connecting to parent NumberField.Root */
  namespace?: string;
}
interface NumberFieldDecrementSlotProps {
  /** Whether the button is disabled */
  isDisabled: boolean;
  /** Pre-computed attributes for the button */
  attrs: Record<string, unknown>;
}
declare const _default$85: typeof __VLS_export$85;
declare const __VLS_export$85: __VLS_WithSlots$59<import("vue").DefineComponent<NumberFieldDecrementProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<NumberFieldDecrementProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: NumberFieldDecrementSlotProps) => any;
}>;
type __VLS_WithSlots$59<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/NumberField/NumberFieldScrub.vue.d.ts
interface NumberFieldScrubProps extends AtomProps {
  /** Namespace for connecting to parent NumberField.Root */
  namespace?: string;
  /** Pixels of movement per step (default: 1) */
  sensitivity?: number;
}
interface NumberFieldScrubSlotProps {
  /** Pre-computed attributes for the scrub element */
  attrs: {
    'style': {
      cursor: string;
    };
    'data-disabled': true | undefined;
    'data-readonly': true | undefined;
    'onPointerdown': (e: PointerEvent) => void;
    'onPointermove': (e: PointerEvent) => void;
    'onPointerup': () => void;
  };
}
declare const _default$84: typeof __VLS_export$84;
declare const __VLS_export$84: __VLS_WithSlots$58<import("vue").DefineComponent<NumberFieldScrubProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<NumberFieldScrubProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: NumberFieldScrubSlotProps) => any;
}>;
type __VLS_WithSlots$58<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/NumberField/NumberFieldDescription.vue.d.ts
interface NumberFieldDescriptionProps extends AtomProps {
  /** Unique identifier (auto-generated if not provided) */
  id?: string;
  /** Namespace for connecting to parent NumberField.Root */
  namespace?: string;
}
interface NumberFieldDescriptionSlotProps {
  /** ID for this description element */
  id: string;
}
declare const _default$83: typeof __VLS_export$83;
declare const __VLS_export$83: __VLS_WithSlots$57<import("vue").DefineComponent<NumberFieldDescriptionProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<NumberFieldDescriptionProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: NumberFieldDescriptionSlotProps) => any;
}>;
type __VLS_WithSlots$57<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/NumberField/NumberFieldError.vue.d.ts
interface NumberFieldErrorProps extends AtomProps {
  /** Unique identifier (auto-generated if not provided) */
  id?: string;
  /** Namespace for connecting to parent NumberField.Root */
  namespace?: string;
}
interface NumberFieldErrorSlotProps {
  /** Current validation error messages */
  errors: string[];
  /** Pre-computed attributes for the error element */
  attrs: {
    'id': string;
    'aria-live': 'polite';
    'data-state': 'visible' | 'hidden';
  };
}
declare const _default$82: typeof __VLS_export$82;
declare const __VLS_export$82: __VLS_WithSlots$56<import("vue").DefineComponent<NumberFieldErrorProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<NumberFieldErrorProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: NumberFieldErrorSlotProps) => any;
}>;
type __VLS_WithSlots$56<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/NumberField/index.d.ts
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
 * </script>
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
declare const NumberField: {
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
   * </script>
   *
   * <template>
   *   <NumberField.Root v-model="value" :min="0" :max="100">
   *     <NumberField.Control />
   *   </NumberField.Root>
   * </template>
   * ```
   */
  Root: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<NumberFieldRootProps & {
      modelValue?: number | null;
    }> & Readonly<{
      "onUpdate:modelValue"?: ((value: number | null) => any) | undefined;
      "onUpdate:model-value"?: ((value: number | null) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
      "update:modelValue": (value: number | null) => any;
      "update:model-value": (value: number | null) => any;
    }, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<NumberFieldRootProps & {
      modelValue?: number | null;
    }> & Readonly<{
      "onUpdate:modelValue"?: ((value: number | null) => any) | undefined;
      "onUpdate:model-value"?: ((value: number | null) => any) | undefined;
    }>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<NumberFieldRootProps & {
    modelValue?: number | null;
  }> & Readonly<{
    "onUpdate:modelValue"?: ((value: number | null) => any) | undefined;
    "onUpdate:model-value"?: ((value: number | null) => any) | undefined;
  }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: number | null) => any;
    "update:model-value": (value: number | null) => any;
  }, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: NumberFieldRootSlotProps) => any;
    };
  });
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
  Control: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<NumberFieldControlProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<NumberFieldControlProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<NumberFieldControlProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: NumberFieldControlSlotProps) => any;
    };
  });
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
  Increment: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<NumberFieldIncrementProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<NumberFieldIncrementProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<NumberFieldIncrementProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: NumberFieldIncrementSlotProps) => any;
    };
  });
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
  Decrement: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<NumberFieldDecrementProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<NumberFieldDecrementProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<NumberFieldDecrementProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: NumberFieldDecrementSlotProps) => any;
    };
  });
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
  Scrub: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<NumberFieldScrubProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<NumberFieldScrubProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<NumberFieldScrubProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: NumberFieldScrubSlotProps) => any;
    };
  });
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
  Description: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<NumberFieldDescriptionProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<NumberFieldDescriptionProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<NumberFieldDescriptionProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: NumberFieldDescriptionSlotProps) => any;
    };
  });
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
  Error: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<NumberFieldErrorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<NumberFieldErrorProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<NumberFieldErrorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: NumberFieldErrorSlotProps) => any;
    };
  });
};
//#endregion
//#region src/components/Overflow/types.d.ts
type OverflowPriority = 'start' | 'end';
interface OverflowTicketInput extends RegistryTicketInput {
  /** Skip this item from capacity calculation; always rendered visibly */
  disabled?: MaybeRefOrGetter<boolean>;
}
interface OverflowTicket extends RegistryTicket {
  /** Whether this item is excluded from capacity math */
  disabled: Readonly<Ref<boolean>>;
}
interface OverflowRootContext {
  /** Overflow composable for width tracking and capacity */
  overflow: OverflowContext;
  /** Registry of child Items */
  registry: RegistryContext<OverflowTicketInput, OverflowTicket>;
  /** Side that keeps items when overflow occurs */
  priority: Readonly<Ref<OverflowPriority>>;
  /** Whether truncation is disabled (everything renders) */
  disabled: Readonly<Ref<boolean>>;
  /** Width of the indicator element (reserved from available space) */
  indicatorWidth: ShallowRef<number>;
  /** Whether items currently overflow */
  isOverflowing: Readonly<Ref<boolean>>;
  /** Compute visibility for a given index */
  isVisible: (index: number) => boolean;
}
//#endregion
//#region src/components/Overflow/OverflowRoot.vue.d.ts
interface OverflowRootProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Pixel gap between items (mirror of CSS gap) */
  gap?: number;
  /** Side that keeps items when overflow occurs */
  priority?: OverflowPriority;
  /** Disable truncation; render everything */
  disabled?: boolean;
}
interface OverflowRootSlotProps {
  capacity: number;
  size: number;
  isOverflowing: boolean;
  attrs: {
    'data-overflow': true | undefined;
    'data-priority': OverflowPriority;
  };
}
declare const useOverflowRoot: (key: string, defaultValue?: OverflowRootContext | undefined) => OverflowRootContext, provideOverflowRoot: (key: string, context: OverflowRootContext, app?: import("vue").App) => OverflowRootContext;
declare const _default$81: typeof __VLS_export$81;
declare const __VLS_export$81: __VLS_WithSlots$55<import("vue").DefineComponent<OverflowRootProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<OverflowRootProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: OverflowRootSlotProps) => unknown;
}>;
type __VLS_WithSlots$55<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Overflow/OverflowItem.vue.d.ts
interface OverflowItemProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Value associated with this ticket (defaults to index) */
  value?: unknown;
  /** Skip from capacity calculation; always rendered visibly */
  disabled?: boolean;
}
interface OverflowItemSlotProps {
  isVisible: boolean;
  isHidden: boolean;
  attrs: {
    'data-hidden': true | undefined;
    'aria-hidden': 'true' | undefined;
  };
}
declare const _default$80: typeof __VLS_export$80;
declare const __VLS_export$80: __VLS_WithSlots$54<import("vue").DefineComponent<OverflowItemProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<OverflowItemProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: OverflowItemSlotProps) => unknown;
}>;
type __VLS_WithSlots$54<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Overflow/OverflowIndicator.vue.d.ts
interface OverflowIndicatorProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
}
interface OverflowIndicatorSlotProps {
  count: number;
  hidden: OverflowTicket[];
  attrs: {
    'data-overflow-indicator': 'true';
    'aria-live': 'polite';
  };
}
declare const _default$79: typeof __VLS_export$79;
declare const __VLS_export$79: __VLS_WithSlots$53<import("vue").DefineComponent<OverflowIndicatorProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<OverflowIndicatorProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: OverflowIndicatorSlotProps) => unknown;
}>;
type __VLS_WithSlots$53<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Overflow/index.d.ts
/**
 * Headless responsive truncation primitive. Children render until the
 * container runs out of width, then overflowing children are hidden
 * and an indicator surfaces the hidden count.
 *
 * @see https://0.vuetifyjs.com/components/semantic/overflow
 */
declare const Overflow: {
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
   * </script>
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
  Root: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<OverflowRootProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<OverflowRootProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<OverflowRootProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: OverflowRootSlotProps) => unknown;
    };
  });
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
  Item: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<OverflowItemProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<OverflowItemProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<OverflowItemProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: OverflowItemSlotProps) => unknown;
    };
  });
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
  Indicator: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<OverflowIndicatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<OverflowIndicatorProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<OverflowIndicatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: OverflowIndicatorSlotProps) => unknown;
    };
  });
};
//#endregion
//#region src/components/Pagination/PaginationRoot.vue.d.ts
declare const usePaginationRoot: (key: string, defaultValue?: PaginationContext | undefined) => PaginationContext, providePaginationRoot: (key: string, context: PaginationContext, app?: import("vue").App) => PaginationContext;
declare const usePaginationControls: (key: string, defaultValue?: RegistryContext<RegistryTicketInput<unknown>, RegistryTicket<unknown> & RegistryTicketInput<unknown>> | undefined) => RegistryContext<RegistryTicketInput<unknown>, RegistryTicket<unknown> & RegistryTicketInput<unknown>>, providePaginationControls: (key: string, context: RegistryContext<RegistryTicketInput<unknown>, RegistryTicket<unknown> & RegistryTicketInput<unknown>>, app?: import("vue").App) => RegistryContext<RegistryTicketInput<unknown>, RegistryTicket<unknown> & RegistryTicketInput<unknown>>;
declare const usePaginationItems: (key: string, defaultValue?: RegistryContext<RegistryTicketInput<unknown>, RegistryTicket<unknown> & RegistryTicketInput<unknown>> | undefined) => RegistryContext<RegistryTicketInput<unknown>, RegistryTicket<unknown> & RegistryTicketInput<unknown>>, providePaginationItems: (key: string, context: RegistryContext<RegistryTicketInput<unknown>, RegistryTicket<unknown> & RegistryTicketInput<unknown>>, app?: import("vue").App) => RegistryContext<RegistryTicketInput<unknown>, RegistryTicket<unknown> & RegistryTicketInput<unknown>>;
interface PaginationRootProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Total number of items */
  size?: number;
  /**
   * Number of visible page buttons.
   * If undefined, auto-calculates based on container width.
   */
  totalVisible?: number;
  /** Number of items per page */
  itemsPerPage?: number;
  /** Ellipsis character */
  ellipsis?: string | false;
}
interface PaginationRootSlotProps {
  /** Current page (1-indexed) */
  page: number;
  /** Total number of items */
  size: number;
  /** Total number of pages */
  pages: number;
  /** Items per page */
  itemsPerPage: number;
  /** Visible page items for rendering */
  items: PaginationTicket[];
  /** Start index of items on current page (0-indexed) */
  pageStart: number;
  /** End index of items on current page (exclusive) */
  pageStop: number;
  /** Whether on first page */
  isFirst: boolean;
  /** Whether on last page */
  isLast: boolean;
  /** Go to first page */
  first: () => void;
  /** Go to last page */
  last: () => void;
  /** Go to next page */
  next: () => void;
  /** Go to previous page */
  prev: () => void;
  /** Go to specific page */
  select: (page: number) => void;
  /** Attributes to bind to the root element */
  attrs: {
    'aria-label': string;
    'role': 'navigation' | undefined;
  };
}
declare const _default$78: typeof __VLS_export$78;
declare const __VLS_export$78: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$19<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$19<(PaginationRootProps & {
    modelValue?: number;
  }) & {
    "onUpdate:modelValue"?: ((value: number) => any) | undefined;
    "onUpdate:model-value"?: ((value: T | T[]) => any) | undefined;
  }> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: PaginationRootSlotProps) => any;
  };
  emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: number) => void);
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$19<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Pagination/PaginationItem.vue.d.ts
interface PaginationItemProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Page number this item represents */
  value: number;
  /** Override disabled state */
  disabled?: boolean;
  /** Unique identifier for registration */
  id?: string;
}
interface PaginationItemSlotProps {
  /** Page number */
  page: number;
  /** Whether this page is currently selected */
  isSelected: boolean;
  /** Whether this item is disabled */
  isDisabled: boolean;
  /** Go to this page */
  select: () => void;
  /** Attributes to bind to the item element */
  attrs: {
    'aria-label': string;
    'aria-current': 'page' | undefined;
    'aria-disabled': boolean;
    'data-selected': true | undefined;
    'data-disabled': true | undefined;
    'disabled': boolean | undefined;
    'tabindex': number;
    'type': 'button' | undefined;
    'role': 'button' | undefined;
    'onClick': () => void;
    'onKeydown': ((e: KeyboardEvent) => void) | undefined;
  };
}
declare const _default$77: typeof __VLS_export$77;
declare const __VLS_export$77: __VLS_WithSlots$52<import("vue").DefineComponent<PaginationItemProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<PaginationItemProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: PaginationItemSlotProps) => any;
}>;
type __VLS_WithSlots$52<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Pagination/PaginationFirst.vue.d.ts
interface PaginationFirstProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Override disabled state */
  disabled?: boolean;
  /** Unique identifier for registration */
  id?: string;
}
interface PaginationFirstSlotProps {
  /** Whether button is disabled */
  isDisabled: boolean;
  /** Go to first page */
  first: () => void;
  /** Attributes to bind to the button element */
  attrs: {
    'aria-label': string;
    'aria-disabled': boolean;
    'data-disabled': true | undefined;
    'disabled': boolean | undefined;
    'tabindex': number;
    'type': 'button' | undefined;
    'role': 'button' | undefined;
    'onClick': () => void;
    'onKeydown': ((e: KeyboardEvent) => void) | undefined;
  };
}
declare const _default$76: typeof __VLS_export$76;
declare const __VLS_export$76: __VLS_WithSlots$51<import("vue").DefineComponent<PaginationFirstProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<PaginationFirstProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: PaginationFirstSlotProps) => any;
}>;
type __VLS_WithSlots$51<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Pagination/PaginationPrev.vue.d.ts
interface PaginationPrevProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Override disabled state */
  disabled?: boolean;
  /** Unique identifier for registration */
  id?: string;
}
interface PaginationPrevSlotProps {
  /** Whether button is disabled */
  isDisabled: boolean;
  /** Go to previous page */
  prev: () => void;
  /** Attributes to bind to the button element */
  attrs: {
    'aria-label': string;
    'aria-disabled': boolean;
    'data-disabled': true | undefined;
    'disabled': boolean | undefined;
    'tabindex': number;
    'type': 'button' | undefined;
    'role': 'button' | undefined;
    'onClick': () => void;
    'onKeydown': ((e: KeyboardEvent) => void) | undefined;
  };
}
declare const _default$75: typeof __VLS_export$75;
declare const __VLS_export$75: __VLS_WithSlots$50<import("vue").DefineComponent<PaginationPrevProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<PaginationPrevProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: PaginationPrevSlotProps) => any;
}>;
type __VLS_WithSlots$50<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Pagination/PaginationEllipsis.vue.d.ts
interface PaginationEllipsisProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Ellipsis character to display (overrides context) */
  ellipsis?: string;
  /** Unique identifier for registration */
  id?: string;
}
interface PaginationEllipsisSlotProps {
  /** Ellipsis character */
  ellipsis: string | false;
  /** Attributes to bind to the ellipsis element */
  attrs: {
    'aria-hidden': 'true';
  };
}
declare const _default$74: typeof __VLS_export$74;
declare const __VLS_export$74: __VLS_WithSlots$49<import("vue").DefineComponent<PaginationEllipsisProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<PaginationEllipsisProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: PaginationEllipsisSlotProps) => any;
}>;
type __VLS_WithSlots$49<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Pagination/PaginationNext.vue.d.ts
interface PaginationNextProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Override disabled state */
  disabled?: boolean;
  /** Unique identifier for registration */
  id?: string;
}
interface PaginationNextSlotProps {
  /** Whether button is disabled */
  isDisabled: boolean;
  /** Go to next page */
  next: () => void;
  /** Attributes to bind to the button element */
  attrs: {
    'aria-label': string;
    'aria-disabled': boolean;
    'data-disabled': true | undefined;
    'disabled': boolean | undefined;
    'tabindex': number;
    'type': 'button' | undefined;
    'role': 'button' | undefined;
    'onClick': () => void;
    'onKeydown': ((e: KeyboardEvent) => void) | undefined;
  };
}
declare const _default$73: typeof __VLS_export$73;
declare const __VLS_export$73: __VLS_WithSlots$48<import("vue").DefineComponent<PaginationNextProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<PaginationNextProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: PaginationNextSlotProps) => any;
}>;
type __VLS_WithSlots$48<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Pagination/PaginationLast.vue.d.ts
interface PaginationLastProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Override disabled state */
  disabled?: boolean;
  /** Unique identifier for registration */
  id?: string;
}
interface PaginationLastSlotProps {
  /** Whether button is disabled */
  isDisabled: boolean;
  /** Go to last page */
  last: () => void;
  /** Attributes to bind to the button element */
  attrs: {
    'aria-label': string;
    'aria-disabled': boolean;
    'data-disabled': true | undefined;
    'disabled': boolean | undefined;
    'tabindex': number;
    'type': 'button' | undefined;
    'role': 'button' | undefined;
    'onClick': () => void;
    'onKeydown': ((e: KeyboardEvent) => void) | undefined;
  };
}
declare const _default$72: typeof __VLS_export$72;
declare const __VLS_export$72: __VLS_WithSlots$47<import("vue").DefineComponent<PaginationLastProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<PaginationLastProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: PaginationLastSlotProps) => any;
}>;
type __VLS_WithSlots$47<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Pagination/PaginationStatus.vue.d.ts
interface PaginationStatusProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
}
interface PaginationStatusSlotProps {
  /** Current page (1-indexed) */
  page: number;
  /** Total number of pages */
  pages: number;
  /** Announcement text */
  text: string;
  /** Attributes to bind to the status element */
  attrs: {
    'aria-atomic': true;
    'aria-live': 'polite';
    'role': 'status';
  };
}
declare const _default$71: typeof __VLS_export$71;
declare const __VLS_export$71: __VLS_WithSlots$46<import("vue").DefineComponent<PaginationStatusProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<PaginationStatusProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: PaginationStatusSlotProps) => any;
}>;
type __VLS_WithSlots$46<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Pagination/index.d.ts
/**
 * Pagination component with sub-components for building pagination controls.
 *
 * @see https://0.vuetifyjs.com/components/semantic/pagination
 */
declare const Pagination: {
  /**
   * Root component for pagination controls.
   *
   * @see https://0.vuetifyjs.com/components/semantic/pagination
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { Pagination } from '@vuetify/v0'
   * </script>
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
  Root: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: number) => void);
    slots: {
      default: (props: PaginationRootSlotProps) => any;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      namespace?: string | undefined;
      size?: number | undefined;
      totalVisible?: number | undefined;
      itemsPerPage?: number | undefined;
      ellipsis?: string | false | undefined;
      as?: (DOMElement | null) | undefined;
      renderless?: boolean | undefined;
      modelValue?: number | undefined;
      "onUpdate:modelValue"?: ((value: number) => any) | undefined;
      "onUpdate:model-value"?: ((value: T | T[]) => any) | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: PaginationRootSlotProps) => any;
    };
    emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: number) => void);
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
  /**
   * Individual page button that navigates to a specific page number.
   *
   * @see https://0.vuetifyjs.com/components/semantic/pagination
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { Pagination } from '@vuetify/v0'
   * </script>
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
  Item: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<PaginationItemProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<PaginationItemProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<PaginationItemProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: PaginationItemSlotProps) => any;
    };
  });
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
   * </script>
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
  First: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<PaginationFirstProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<PaginationFirstProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<PaginationFirstProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: PaginationFirstSlotProps) => any;
    };
  });
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
   * </script>
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
  Prev: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<PaginationPrevProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<PaginationPrevProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<PaginationPrevProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: PaginationPrevSlotProps) => any;
    };
  });
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
   * </script>
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
  Ellipsis: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<PaginationEllipsisProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<PaginationEllipsisProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<PaginationEllipsisProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: PaginationEllipsisSlotProps) => any;
    };
  });
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
   * </script>
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
  Next: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<PaginationNextProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<PaginationNextProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<PaginationNextProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: PaginationNextSlotProps) => any;
    };
  });
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
   * </script>
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
  Last: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<PaginationLastProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<PaginationLastProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<PaginationLastProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: PaginationLastSlotProps) => any;
    };
  });
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
   * </script>
   *
   * <template>
   *   <Pagination.Root v-model="page" :size="100">
   *     <Pagination.Status class="sr-only" />
   *     <!-- other pagination items -->
   *   </Pagination.Root>
   * </template>
   * ```
   */
  Status: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<PaginationStatusProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<PaginationStatusProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<PaginationStatusProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: PaginationStatusSlotProps) => any;
    };
  });
};
//#endregion
//#region src/components/Popover/PopoverRoot.vue.d.ts
type PopoverContext = PopoverReturn;
interface PopoverRootProps extends AtomProps {
  /** Unique identifier for the popover (auto-generated if not provided) */
  id?: string;
  /** CSS position-area value for anchor positioning */
  positionArea?: string;
  /** CSS position-try-fallbacks value for overflow */
  positionTry?: string;
  /** Positioning engine. @default CSS anchor positioning (`V0PopoverAdapter`) */
  adapter?: PopoverAdapter;
}
interface PopoverRootSlotProps {
  /** Unique identifier */
  id: string;
  /** Whether the popover is currently open */
  isSelected: boolean;
  /** Toggle the popover open/closed state */
  toggle: () => void;
}
declare const usePopoverContext: () => PopoverReturn, providePopoverContext: (context: PopoverReturn, app?: import("vue").App) => PopoverReturn;
declare const _default$70: typeof __VLS_export$70;
declare const __VLS_export$70: __VLS_WithSlots$45<import("vue").DefineComponent<PopoverRootProps & {
  modelValue?: boolean;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
  "update:modelValue": (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<PopoverRootProps & {
  modelValue?: boolean;
}> & Readonly<{
  "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: PopoverRootSlotProps) => any;
}>;
type __VLS_WithSlots$45<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Popover/PopoverActivator.vue.d.ts
interface PopoverActivatorProps extends AtomProps {
  /** Target popover ID (defaults to parent PopoverRoot id) */
  target?: string;
}
interface PopoverActivatorSlotProps {
  /** Whether the popover is currently open */
  isOpen: boolean;
  /** Attributes to bind to the anchor element */
  attrs: {
    'popovertarget': string;
    'type': 'button' | undefined;
    'role': 'button' | undefined;
    'tabindex': number;
    'aria-expanded': boolean;
    'aria-controls': string;
    'data-open': true | undefined;
    'style': Record<string, string>;
    'onKeydown': ((e: KeyboardEvent) => void) | undefined;
  };
}
declare const _default$69: typeof __VLS_export$69;
declare const __VLS_export$69: __VLS_WithSlots$44<import("vue").DefineComponent<PopoverActivatorProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<PopoverActivatorProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: PopoverActivatorSlotProps) => any;
}>;
type __VLS_WithSlots$44<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Popover/PopoverContent.vue.d.ts
interface PopoverContentProps extends AtomProps {
  /** Unique identifier (defaults to parent PopoverRoot id) */
  id?: string;
  /** CSS position-area value for anchor positioning */
  positionArea?: string;
  /** CSS position-try value for fallback positioning */
  positionTry?: string;
}
interface PopoverContentEmits {
  beforetoggle: [e: ToggleEvent];
}
interface PopoverContentSlotProps {
  /** Whether the popover is currently open */
  isOpen: boolean;
  /** Attributes to bind to the content element */
  attrs: {
    id: string;
    popover: '';
    style: Record<string, string>;
    onBeforetoggle: (e: ToggleEvent) => void;
  };
}
declare const _default$68: typeof __VLS_export$68;
declare const __VLS_export$68: __VLS_WithSlots$43<import("vue").DefineComponent<PopoverContentProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
  beforetoggle: (e: ToggleEvent) => any;
}, string, import("vue").PublicProps, Readonly<PopoverContentProps> & Readonly<{
  onBeforetoggle?: ((e: ToggleEvent) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: PopoverContentSlotProps) => any;
}>;
type __VLS_WithSlots$43<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Popover/index.d.ts
/**
 * Popover component with sub-components for building popovers.
 *
 * @see https://0.vuetifyjs.com/components/disclosure/popover
 */
declare const Popover: {
  /**
   * Root component for popovers.
   *
   * @see https://0.vuetifyjs.com/components/disclosure/popover
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { Popover } from '@vuetify/v0'
   * </script>
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
  Root: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<PopoverRootProps & {
      modelValue?: boolean;
    }> & Readonly<{
      "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
      "update:modelValue": (value: boolean) => any;
    }, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<PopoverRootProps & {
      modelValue?: boolean;
    }> & Readonly<{
      "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    }>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<PopoverRootProps & {
    modelValue?: boolean;
  }> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
  }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => any;
  }, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: PopoverRootSlotProps) => any;
    };
  });
  /**
   * Activator component that opens the popover.
   *
   * @see https://0.vuetifyjs.com/components/disclosure/popover
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { Popover } from '@vuetify/v0'
   * </script>
   *
   * <template>
   *   <Popover.Activator>
   *     Click to toggle
   *   </Popover.Activator>
   * </template>
   * ```
   */
  Activator: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<PopoverActivatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<PopoverActivatorProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<PopoverActivatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: PopoverActivatorSlotProps) => any;
    };
  });
  /**
   * Component for the content section of a popover.
   *
   * @see https://0.vuetifyjs.com/components/disclosure/popover
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { Popover } from '@vuetify/v0'
   * </script>
   *
   * <template>
   *   <Popover.Content>
   *     Popover content goes here.
   *   </Popover.Content>
   * </template>
   * ```
   */
  Content: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<PopoverContentProps> & Readonly<{
      onBeforetoggle?: ((e: ToggleEvent) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
      beforetoggle: (e: ToggleEvent) => any;
    }, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<PopoverContentProps> & Readonly<{
      onBeforetoggle?: ((e: ToggleEvent) => any) | undefined;
    }>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<PopoverContentProps> & Readonly<{
    onBeforetoggle?: ((e: ToggleEvent) => any) | undefined;
  }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    beforetoggle: (e: ToggleEvent) => any;
  }, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: PopoverContentSlotProps) => any;
    };
  });
};
//#endregion
//#region src/components/Portal/Portal.vue.d.ts
interface PortalProps {
  /** Teleport target. `'top-layer'` mounts into the topmost open modal. @default 'body' */
  to?: Extensible<'top-layer'> | HTMLElement;
  /** Render inline instead of teleporting. @default false */
  disabled?: boolean;
  /** Block scrim close. @default false */
  blocking?: boolean;
  /** Whether a scrim/backdrop should back this portal. @default true */
  scrim?: boolean;
}
interface PortalSlotProps {
  /**
   * Calculated z-index from useStack.
   *
   * @remarks
   * Must be applied to a **positioned** element (`position: relative`, `absolute`,
   * `fixed`, or `sticky`) to create a stacking context. Applying it to a
   * `position: static` element has no effect.
   */
  zIndex: number;
  /** Close this portal (unselects from stack) */
  close: () => void;
}
declare const _default$67: typeof __VLS_export$67;
declare const __VLS_export$67: __VLS_WithSlots$42<import("vue").DefineComponent<PortalProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
  close: () => any;
}, string, import("vue").PublicProps, Readonly<PortalProps> & Readonly<{
  onClose?: (() => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: PortalSlotProps) => any;
}>;
type __VLS_WithSlots$42<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Presence/Presence.vue.d.ts
interface PresenceProps {
  /** Delay first mount until present is first true. @default false */
  lazy?: boolean;
  /** Auto-resolve LEAVING state next tick if done() not called. @default true */
  immediate?: boolean;
}
interface PresenceAttrs {
  /** Current lifecycle state for CSS selectors. */
  'data-state': PresenceState;
  /** Hidden when lazy content is not present. */
  'hidden'?: boolean;
}
interface PresenceSlotProps {
  /** Attributes to bind to the content element. */
  attrs: PresenceAttrs;
  /** Whether the content is logically present. */
  isPresent: boolean;
  /** Whether an exit is in progress. */
  isLeaving: boolean;
  /** Call when exit animation finishes. */
  done: () => void;
}
declare const _default$66: typeof __VLS_export$66;
declare const __VLS_export$66: __VLS_WithSlots$41<import("vue").DefineComponent<PresenceProps & {
  modelValue?: boolean;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
  "update:modelValue": (value: boolean) => any;
  enter: () => any;
  leave: () => any;
  "after-leave": () => any;
}, string, import("vue").PublicProps, Readonly<PresenceProps & {
  modelValue?: boolean;
}> & Readonly<{
  "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
  onEnter?: (() => any) | undefined;
  onLeave?: (() => any) | undefined;
  "onAfter-leave"?: (() => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: PresenceSlotProps) => any;
}>;
type __VLS_WithSlots$41<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Progress/ProgressRoot.vue.d.ts
interface ProgressRootContext extends ProgressContext {
  readonly id: string;
  readonly name?: string;
  readonly labelId: string;
  /** Whether a Progress.Label child is currently mounted */
  readonly hasLabel: ShallowRef<boolean>;
}
interface ProgressRootProps extends AtomProps {
  id?: string;
  /** Accessible label when no visible Progress.Label is used */
  ariaLabel?: string;
  modelValue?: number | number[];
  min?: number;
  max?: number;
  name?: string;
  namespace?: string;
}
interface ProgressRootSlotProps {
  id: string;
  total: number;
  percent: number;
  isIndeterminate: boolean;
  segments: readonly ProgressTicket[];
  attrs: {
    'role': 'progressbar';
    'aria-valuenow': number | undefined;
    'aria-valuemin': number;
    'aria-valuemax': number;
    'aria-valuetext': string | undefined;
    'aria-label': string | undefined;
    'aria-labelledby': string | undefined;
    'aria-busy': true | undefined;
    'data-state': 'determinate' | 'indeterminate';
    'data-complete': true | undefined;
  };
}
declare const useProgressRoot: (key: string, defaultValue?: ProgressRootContext | undefined) => ProgressRootContext, provideProgressRoot: (key: string, context: ProgressRootContext, app?: import("vue").App) => ProgressRootContext;
declare const _default$65: typeof __VLS_export$65;
declare const __VLS_export$65: __VLS_WithSlots$40<import("vue").DefineComponent<ProgressRootProps & {
  modelValue?: number | number[];
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
  "update:modelValue": (value: number | number[] | undefined) => any;
}, string, import("vue").PublicProps, Readonly<ProgressRootProps & {
  modelValue?: number | number[];
}> & Readonly<{
  "onUpdate:modelValue"?: ((value: number | number[] | undefined) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: ProgressRootSlotProps) => any;
}>;
type __VLS_WithSlots$40<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Progress/ProgressTrack.vue.d.ts
interface ProgressTrackProps extends AtomProps {
  /** Namespace for context injection from parent Progress.Root */
  namespace?: string;
}
interface ProgressTrackSlotProps {
  /** Pre-computed attributes for binding */
  attrs: {
    'data-state': 'determinate' | 'indeterminate';
  };
}
declare const _default$64: typeof __VLS_export$64;
declare const __VLS_export$64: __VLS_WithSlots$39<import("vue").DefineComponent<ProgressTrackProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ProgressTrackProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: ProgressTrackSlotProps) => any;
}>;
type __VLS_WithSlots$39<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Progress/ProgressFill.vue.d.ts
interface ProgressFillProps extends AtomProps {
  value?: number;
  namespace?: string;
}
interface ProgressFillSlotProps {
  value: number;
  percent: number;
  index: number;
  attrs: {
    'data-index': number;
    'data-state': 'determinate' | 'indeterminate';
    'style': {
      width: string;
    } | undefined;
  };
}
declare const _default$63: typeof __VLS_export$63;
declare const __VLS_export$63: __VLS_WithSlots$38<import("vue").DefineComponent<ProgressFillProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ProgressFillProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: ProgressFillSlotProps) => any;
}>;
type __VLS_WithSlots$38<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Progress/ProgressBuffer.vue.d.ts
interface ProgressBufferProps extends AtomProps {
  /** Buffer value */
  value?: number;
  /** Namespace for context injection from parent Progress.Root */
  namespace?: string;
}
interface ProgressBufferSlotProps {
  /** Clamped buffer value */
  value: number;
  /** Buffer as a percentage of the range */
  percent: number;
  /** Pre-computed attributes for binding */
  attrs: {
    'data-buffer': true;
    'data-state': 'determinate' | 'indeterminate';
    'style': {
      width: string;
    };
  };
}
declare const _default$62: typeof __VLS_export$62;
declare const __VLS_export$62: __VLS_WithSlots$37<import("vue").DefineComponent<ProgressBufferProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ProgressBufferProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: ProgressBufferSlotProps) => any;
}>;
type __VLS_WithSlots$37<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Progress/ProgressValue.vue.d.ts
interface ProgressValueProps extends AtomProps {
  /** Namespace for context injection from parent Progress.Root */
  namespace?: string;
}
interface ProgressValueSlotProps {
  /** Sum of all segment values */
  total: number;
  /** Overall progress as a percentage */
  percent: number;
  /** Whether the progress state is indeterminate */
  isIndeterminate: boolean;
  /** Pre-computed attributes for binding */
  attrs: Record<string, never>;
}
declare const _default$61: typeof __VLS_export$61;
declare const __VLS_export$61: __VLS_WithSlots$36<import("vue").DefineComponent<ProgressValueProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ProgressValueProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: ProgressValueSlotProps) => any;
}>;
type __VLS_WithSlots$36<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Progress/ProgressLabel.vue.d.ts
interface ProgressLabelProps extends AtomProps {
  namespace?: string;
}
interface ProgressLabelSlotProps {
  total: number;
  percent: number;
  isIndeterminate: boolean;
  attrs: {
    id: string;
  };
}
declare const _default$60: typeof __VLS_export$60;
declare const __VLS_export$60: __VLS_WithSlots$35<import("vue").DefineComponent<ProgressLabelProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ProgressLabelProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: ProgressLabelSlotProps) => any;
}>;
type __VLS_WithSlots$35<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Progress/ProgressHiddenInput.vue.d.ts
interface ProgressHiddenInputProps {
  /** Namespace for context injection from parent Progress.Root */
  namespace?: string;
}
declare const _default$59: typeof __VLS_export$59;
declare const __VLS_export$59: import("vue").DefineComponent<ProgressHiddenInputProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ProgressHiddenInputProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
//#endregion
//#region src/components/Progress/index.d.ts
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
 * </script>
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
declare const Progress: {
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
   * </script>
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
  Root: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<ProgressRootProps & {
      modelValue?: number | number[];
    }> & Readonly<{
      "onUpdate:modelValue"?: ((value: number | number[] | undefined) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
      "update:modelValue": (value: number | number[] | undefined) => any;
    }, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ProgressRootProps & {
      modelValue?: number | number[];
    }> & Readonly<{
      "onUpdate:modelValue"?: ((value: number | number[] | undefined) => any) | undefined;
    }>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<ProgressRootProps & {
    modelValue?: number | number[];
  }> & Readonly<{
    "onUpdate:modelValue"?: ((value: number | number[] | undefined) => any) | undefined;
  }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: number | number[] | undefined) => any;
  }, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: ProgressRootSlotProps) => any;
    };
  });
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
   * </script>
   *
   * <template>
   *   <Progress.Track>
   *     <Progress.Fill />
   *   </Progress.Track>
   * </template>
   * ```
   */
  Track: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<ProgressTrackProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ProgressTrackProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<ProgressTrackProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: ProgressTrackSlotProps) => any;
    };
  });
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
   * </script>
   *
   * <template>
   *   <Progress.Fill class="bg-blue-500 h-full transition-all" />
   * </template>
   * ```
   */
  Fill: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<ProgressFillProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ProgressFillProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<ProgressFillProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: ProgressFillSlotProps) => any;
    };
  });
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
   * </script>
   *
   * <template>
   *   <Progress.Track>
   *     <Progress.Buffer class="bg-blue-200 h-full" />
   *     <Progress.Fill class="bg-blue-500 h-full" />
   *   </Progress.Track>
   * </template>
   * ```
   */
  Buffer: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<ProgressBufferProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ProgressBufferProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<ProgressBufferProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: ProgressBufferSlotProps) => any;
    };
  });
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
   * </script>
   *
   * <template>
   *   <Progress.Value v-slot="{ percent }">
   *     {{ Math.round(percent) }}%
   *   </Progress.Value>
   * </template>
   * ```
   */
  Value: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<ProgressValueProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ProgressValueProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<ProgressValueProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: ProgressValueSlotProps) => any;
    };
  });
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
   * </script>
   *
   * <template>
   *   <Progress.Label>Loading...</Progress.Label>
   * </template>
   * ```
   */
  Label: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<ProgressLabelProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ProgressLabelProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<ProgressLabelProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: ProgressLabelSlotProps) => any;
    };
  });
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
   * </script>
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
  HiddenInput: import("vue").DefineComponent<ProgressHiddenInputProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ProgressHiddenInputProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
};
//#endregion
//#region src/components/Radio/RadioGroup.vue.d.ts
/** Ticket for radio items with element reference for focus management */
interface RadioTicket extends SingleTicket {
  /** Element reference for roving tabindex focus management */
  el?: MaybeRefOrGetter<Element | null | undefined>;
}
/** Activation mode alias for Radio component API */
type RadioActivation = Activation;
interface RadioGroupContext extends SingleContext<RadioTicket> {
  /** Form field name shared by all radios in the group */
  name?: string;
  /** Activation mode for the group */
  activation: Ref<RadioActivation>;
}
interface RadioGroupProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /**
   * Disables the entire radio group
   *
   * @example
   * ```vue
   * <template>
   *   <Radio.Group disabled>
   *     <Radio.Root value="a">Option A</Radio.Root>
   *   </Radio.Group>
   * </template>
   * ```
   */
  disabled?: boolean;
  /**
   * Auto-selects the first non-disabled item on mount.
   * Radio groups are inherently mandatory (selection can only be changed, not cleared),
   * so `mandatory="force"` is the only meaningful option.
   *
   * @example
   * ```vue
   * <template>
   *   <Radio.Group v-model="selected" mandatory="force">
   *     <Radio.Root value="small">Small</Radio.Root>
   *     <Radio.Root value="medium">Medium</Radio.Root>
   *   </Radio.Group>
   * </template>
   * ```
   */
  mandatory?: boolean | 'force';
  /**
   * Accessible name for the group
   *
   * @example
   * ```vue
   * <template>
   *   <Radio.Group label="Select size">
   *     <Radio.Root value="s">Small</Radio.Root>
   *     <Radio.Root value="m">Medium</Radio.Root>
   *   </Radio.Group>
   * </template>
   * ```
   */
  label?: string;
  /** ID of element that labels this group */
  ariaLabelledby?: string;
  /** ID of element that describes this group */
  ariaDescribedby?: string;
  /** Whether a selection is required before form submission */
  ariaRequired?: boolean;
  /**
   * Form field name - enables native form submission for all radios in group
   *
   * @example
   * ```vue
   * <template>
   *   <Radio.Group v-model="size" name="product_size">
   *     <Radio.Root value="small">Small</Radio.Root>
   *     <Radio.Root value="large">Large</Radio.Root>
   *   </Radio.Group>
   * </template>
   * ```
   */
  name?: string;
  /**
   * Activation mode controlling when selection occurs:
   * - `automatic` (default): Selection follows focus (arrow keys select)
   * - `manual`: Selection requires explicit Enter/Space key press
   *
   * Per WAI-ARIA APG, radio groups should have selection follow focus by default.
   * Use `manual` for toolbar radio groups or when deliberate selection is preferred.
   *
   * @example
   * ```vue
   * <template>
   *   <Radio.Group v-model="selected" activation="manual">
   *     <Radio.Root value="a">Option A</Radio.Root>
   *     <Radio.Root value="b">Option B</Radio.Root>
   *   </Radio.Group>
   * </template>
   * ```
   */
  activation?: RadioActivation;
}
interface RadioGroupSlotProps {
  /** Whether the radio group is disabled */
  isDisabled: boolean;
  /** Whether no items are currently selected */
  isNoneSelected: boolean;
  /** Current activation mode */
  activation: RadioActivation;
  /** Attributes to bind to the root element */
  attrs: {
    'role': 'radiogroup';
    'aria-label': string | undefined;
    'aria-labelledby': string | undefined;
    'aria-describedby': string | undefined;
    'aria-required': boolean | undefined;
  };
}
declare const useRadioGroup: (key: string, defaultValue?: RadioGroupContext | undefined) => RadioGroupContext, provideRadioGroup: (key: string, context: RadioGroupContext, app?: import("vue").App) => RadioGroupContext;
declare const _default$58: typeof __VLS_export$58;
declare const __VLS_export$58: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$18<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$18<(RadioGroupProps & {
    modelValue?: T;
  }) & {
    "onUpdate:modelValue"?: ((value: T | undefined) => any) | undefined;
    "onUpdate:model-value"?: ((value: T) => any) | undefined;
  }> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    /**
     * Default slot with group state and ARIA attributes
     *
     * @example
     * ```vue
     * <template>
     *   <Radio.Group v-slot="{ isNoneSelected, attrs }" renderless>
     *     <div v-bind="attrs">
     *       <p v-if="isNoneSelected">Please select an option</p>
     *       <Radio.Root value="a">Option A</Radio.Root>
     *     </div>
     *   </Radio.Group>
     * </template>
     * ```
     */
    default: (props: RadioGroupSlotProps) => any;
  };
  emit: ((evt: "update:model-value", value: T) => void) & ((event: "update:modelValue", value: T | undefined) => void);
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$18<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Radio/RadioHiddenInput.vue.d.ts
interface RadioHiddenInputProps {
  /** Namespace for context injection from parent Radio.Root */
  namespace?: string;
  /**
   * Form field name (defaults to context value from Radio.Group)
   *
   * @example
   * ```vue
   * <template>
   *   <Radio.Root value="a">
   *     <Radio.HiddenInput name="choice" />
   *     <Radio.Indicator />
   *   </Radio.Root>
   * </template>
   * ```
   */
  name?: string;
  /**
   * Submitted value when checked (defaults to context value or 'on').
   * Use to override the Radio.Root value for form submission.
   *
   * @example
   * ```vue
   * <template>
   *   <Radio.Root value="internal-id">
   *     <Radio.HiddenInput name="choice" value="user-friendly-value" />
   *   </Radio.Root>
   * </template>
   * ```
   */
  value?: string;
  /**
   * Associate with form by ID (for inputs outside the form element)
   *
   * @example
   * ```vue
   * <template>
   *   <Radio.Root value="a">
   *     <Radio.HiddenInput name="choice" form="external-form" />
   *   </Radio.Root>
   * </template>
   * ```
   */
  form?: string;
}
declare const _default$57: typeof __VLS_export$57;
declare const __VLS_export$57: import("vue").DefineComponent<RadioHiddenInputProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<RadioHiddenInputProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
//#endregion
//#region src/components/Radio/RadioRoot.vue.d.ts
/** Visual state of the radio for styling purposes */
type RadioState = 'checked' | 'unchecked';
interface RadioRootContext {
  /** Unique identifier */
  readonly id: ID;
  /** Optional display label */
  readonly label?: string;
  /** Value associated with this radio */
  readonly value: unknown;
  /** Form field name (triggers auto hidden input when provided) */
  readonly name?: string;
  /** Associate with form by ID */
  readonly form?: string;
  /** Whether this radio is currently checked */
  isChecked: Readonly<Ref<boolean>>;
  /** Whether this radio is disabled */
  isDisabled: Readonly<Ref<boolean>>;
  /** Check this radio */
  select: () => void;
}
interface RadioRootProps<V = unknown> extends AtomProps {
  /** Unique identifier (auto-generated if not provided) */
  id?: ID;
  /** Optional display label (passed through to slot) */
  label?: string;
  /**
   * Value associated with this radio for group selection and form submission
   *
   * @example
   * ```vue
   * <template>
   *   <Radio.Group v-model="size">
   *     <Radio.Root value="small">Small</Radio.Root>
   *     <Radio.Root value="large">Large</Radio.Root>
   *   </Radio.Group>
   * </template>
   * ```
   */
  value?: V;
  /** Form field name - triggers auto hidden input when provided */
  name?: string;
  /**
   * Associate with a form by ID (for radios outside the form element)
   *
   * @example
   * ```vue
   * <template>
   *   <form id="my-form">...</form>
   *   <Radio.Root value="a" form="my-form">Option</Radio.Root>
   * </template>
   * ```
   */
  form?: string;
  /**
   * Disables this radio (prevents selection and keyboard focus)
   *
   * @example
   * ```vue
   * <template>
   *   <Radio.Root value="premium" disabled>
   *     Premium (Coming soon)
   *   </Radio.Root>
   * </template>
   * ```
   */
  disabled?: MaybeRefOrGetter<boolean>;
  /** Namespace for context provision to children (Indicator, HiddenInput) */
  namespace?: string;
  /** Namespace for connecting to parent Radio.Group */
  groupNamespace?: string;
  /** ID of element that labels this radio */
  ariaLabelledby?: string;
  /** ID of element that describes this radio */
  ariaDescribedby?: string;
  /**
   * Marks the radio as invalid for form validation
   *
   * @example
   * ```vue
   * <template>
   *   <Radio.Root :aria-invalid="hasError" value="a">
   *     Option A
   *   </Radio.Root>
   * </template>
   * ```
   */
  ariaInvalid?: boolean;
}
interface RadioRootSlotProps<V = unknown> {
  /** Unique identifier */
  id: ID;
  /** Optional display label */
  label?: string;
  /** Value associated with this radio */
  value: V | undefined;
  /** Whether this radio is currently checked */
  isChecked: boolean;
  /** Whether this radio is disabled */
  isDisabled: boolean;
  /** Check this radio */
  select: () => void;
  /** Attributes to bind to the radio element */
  attrs: {
    'type': 'button' | undefined;
    'role': 'radio';
    'aria-checked': boolean;
    'aria-disabled': boolean;
    'aria-label': string | undefined;
    'aria-labelledby': string | undefined;
    'aria-describedby': string | undefined;
    'aria-invalid': boolean | undefined;
    'tabindex': 0 | -1;
    'data-state': RadioState;
    'data-disabled': true | undefined;
    'data-radio-id': ID;
    'onClick': () => void;
    'onKeydown': (e: KeyboardEvent) => void;
  };
}
declare const useRadioRoot: (key: string, defaultValue?: RadioRootContext | undefined) => RadioRootContext, provideRadioRoot: (key: string, context: RadioRootContext, app?: import("vue").App) => RadioRootContext;
declare const _default$56: typeof __VLS_export$56;
declare const __VLS_export$56: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$17<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$17<RadioRootProps<V>> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    /**
     * Default slot with radio state, actions, and ARIA attributes
     *
     * @example
     * ```vue
     * <template>
     *   <Radio.Root v-slot="{ isChecked, attrs }" value="a" renderless>
     *     <div v-bind="attrs">
     *       <span :class="{ 'font-bold': isChecked }">Option A</span>
     *     </div>
     *   </Radio.Root>
     * </template>
     * ```
     */
    default: (props: RadioRootSlotProps<V>) => any;
  };
  emit: {};
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$17<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Radio/RadioIndicator.vue.d.ts
interface RadioIndicatorProps extends AtomProps {
  /** Namespace for context injection from parent Radio.Root */
  namespace?: string;
}
interface RadioIndicatorSlotProps {
  /** Whether this radio is currently checked */
  isChecked: boolean;
  /** Attributes to bind to the indicator element */
  attrs: {
    'data-state': RadioState;
    'style': {
      visibility: 'visible' | 'hidden';
    };
  };
}
declare const _default$55: typeof __VLS_export$55;
declare const __VLS_export$55: __VLS_WithSlots$34<import("vue").DefineComponent<RadioIndicatorProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<RadioIndicatorProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  /**
   * Default slot for custom indicator content
   *
   * @example
   * ```vue
   * <template>
   *   <Radio.Indicator v-slot="{ isChecked }">
   *     <CheckIcon v-if="isChecked" />
   *   </Radio.Indicator>
   * </template>
   * ```
   */
  default: (props: RadioIndicatorSlotProps) => any;
}>;
type __VLS_WithSlots$34<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Radio/index.d.ts
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
 * </script>
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
declare const Radio: {
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
   * </script>
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
  Group: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: ((evt: "update:model-value", value: T) => void) & ((event: "update:modelValue", value: T | undefined) => void);
    slots: {
      default: (props: RadioGroupSlotProps) => any;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      namespace?: string | undefined;
      disabled?: boolean | undefined;
      mandatory?: boolean | "force" | undefined;
      label?: string | undefined;
      ariaLabelledby?: string | undefined;
      ariaDescribedby?: string | undefined;
      ariaRequired?: boolean | undefined;
      name?: string | undefined;
      activation?: RadioActivation | undefined;
      as?: (DOMElement | null) | undefined;
      renderless?: boolean | undefined;
      modelValue?: T | undefined;
      "onUpdate:modelValue"?: ((value: T | undefined) => any) | undefined;
      "onUpdate:model-value"?: ((value: T) => any) | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: RadioGroupSlotProps) => any;
    };
    emit: ((evt: "update:model-value", value: T) => void) & ((event: "update:modelValue", value: T | undefined) => void);
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
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
   * </script>
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
  HiddenInput: import("vue").DefineComponent<RadioHiddenInputProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<RadioHiddenInputProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
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
   * </script>
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
  Indicator: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<RadioIndicatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<RadioIndicatorProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<RadioIndicatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: RadioIndicatorSlotProps) => any;
    };
  });
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
   * </script>
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
  Root: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: {};
    slots: {
      default: (props: RadioRootSlotProps<V>) => any;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      id?: ID | undefined;
      label?: string | undefined;
      value?: V | undefined;
      name?: string | undefined;
      form?: string | undefined;
      disabled?: import("vue").MaybeRefOrGetter<boolean> | undefined;
      namespace?: string | undefined;
      groupNamespace?: string | undefined;
      ariaLabelledby?: string | undefined;
      ariaDescribedby?: string | undefined;
      ariaInvalid?: boolean | undefined;
      as?: (DOMElement | null) | undefined;
      renderless?: boolean | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: RadioRootSlotProps<V>) => any;
    };
    emit: {};
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
};
//#endregion
//#region src/components/Rating/RatingRoot.vue.d.ts
interface RatingRootContext extends RatingContext {
  /** Form field name */
  readonly name?: string;
  /** Hovered value (UI concern) */
  hoveredValue: ShallowRef<number | null>;
  /** Whether user is hovering */
  isHovering: Readonly<Ref<boolean>>;
  /** Whether interaction is disabled */
  isDisabled: Readonly<Ref<boolean>>;
  /** Whether rating is readonly */
  isReadonly: Readonly<Ref<boolean>>;
}
interface RatingRootProps extends AtomProps {
  /** Current rating */
  modelValue?: number;
  /** Total items (default: 5) */
  size?: number;
  /** Enable 0.5 increments */
  half?: boolean;
  /** Disable interaction */
  disabled?: MaybeRefOrGetter<boolean>;
  /** Show value, prevent changes */
  readonly?: MaybeRefOrGetter<boolean>;
  /** Accessible name for the slider */
  ariaLabel?: string;
  /** ID of element that labels this slider */
  ariaLabelledby?: string;
  /** Form field name — triggers hidden input */
  name?: string;
  /** Namespace for context provision */
  namespace?: string;
}
interface RatingRootSlotProps {
  /** Current rating value */
  value: number;
  /** Array of rating items */
  items: RatingItemDescriptor[];
  /** Whether user is hovering */
  isHovering: boolean;
  /** Whether rating is disabled */
  isDisabled: boolean;
  /** Whether rating is readonly */
  isReadonly: boolean;
  /** Pre-computed attributes for binding */
  attrs: {
    'role': 'slider';
    'tabindex': 0 | -1;
    'aria-valuenow': number;
    'aria-valuemin': 0;
    'aria-valuemax': number;
    'aria-valuetext': string;
    'aria-label': string | undefined;
    'aria-labelledby': string | undefined;
    'aria-disabled': boolean;
    'aria-readonly': true | undefined;
    'data-disabled': true | undefined;
    'data-readonly': true | undefined;
    'data-hovering': true | undefined;
    'onKeydown': (e: KeyboardEvent) => void;
    'onPointerleave': () => void;
  };
}
declare const useRatingRoot: (key: string, defaultValue?: RatingRootContext | undefined) => RatingRootContext, provideRatingRoot: (key: string, context: RatingRootContext, app?: import("vue").App) => RatingRootContext;
declare const _default$54: typeof __VLS_export$54;
declare const __VLS_export$54: __VLS_WithSlots$33<import("vue").DefineComponent<RatingRootProps & {
  modelValue?: number;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
  "update:modelValue": (value: number) => any;
}, string, import("vue").PublicProps, Readonly<RatingRootProps & {
  modelValue?: number;
}> & Readonly<{
  "onUpdate:modelValue"?: ((value: number) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: RatingRootSlotProps) => any;
}>;
type __VLS_WithSlots$33<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Rating/RatingItem.vue.d.ts
interface RatingItemProps extends AtomProps {
  /** 1-based position */
  index: number;
  /** Namespace for context injection from parent Rating.Root */
  namespace?: string;
}
interface RatingItemSlotProps {
  /** Fill state based on current or hovered value */
  state: RatingItemState;
  /** Whether item is within hover preview range */
  isHighlighted: boolean;
  /** Whether rating is disabled */
  isDisabled: boolean;
  /** Whether rating is readonly */
  isReadonly: boolean;
  /** Pre-computed attributes for binding */
  attrs: {
    'data-state': RatingItemState;
    'data-highlighted': true | undefined;
    'data-disabled': true | undefined;
    'data-readonly': true | undefined;
    'onPointermove': (e: PointerEvent) => void;
    'onClick': () => void;
  };
}
declare const _default$53: typeof __VLS_export$53;
declare const __VLS_export$53: __VLS_WithSlots$32<import("vue").DefineComponent<RatingItemProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<RatingItemProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: RatingItemSlotProps) => any;
}>;
type __VLS_WithSlots$32<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Rating/RatingHiddenInput.vue.d.ts
interface RatingHiddenInputProps {
  /** Namespace for context injection from parent Rating.Root */
  namespace?: string;
}
declare const _default$52: typeof __VLS_export$52;
declare const __VLS_export$52: import("vue").DefineComponent<RatingHiddenInputProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<RatingHiddenInputProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
//#endregion
//#region src/components/Rating/index.d.ts
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
 * </script>
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
declare const Rating: {
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
   * </script>
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
  Root: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<RatingRootProps & {
      modelValue?: number;
    }> & Readonly<{
      "onUpdate:modelValue"?: ((value: number) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
      "update:modelValue": (value: number) => any;
    }, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<RatingRootProps & {
      modelValue?: number;
    }> & Readonly<{
      "onUpdate:modelValue"?: ((value: number) => any) | undefined;
    }>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<RatingRootProps & {
    modelValue?: number;
  }> & Readonly<{
    "onUpdate:modelValue"?: ((value: number) => any) | undefined;
  }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: number) => any;
  }, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: RatingRootSlotProps) => any;
    };
  });
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
   * </script>
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
  Item: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<RatingItemProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<RatingItemProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<RatingItemProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: RatingItemSlotProps) => any;
    };
  });
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
   * </script>
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
  HiddenInput: import("vue").DefineComponent<RatingHiddenInputProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<RatingHiddenInputProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
};
//#endregion
//#region src/components/Scrim/Scrim.vue.d.ts
interface ScrimProps extends AtomProps {
  /**
   * Transition name for enter/leave animations
   *
   * @default 'fade'
   */
  transition?: string;
  /**
   * Whether to teleport the scrim to the body element
   *
   * @default true
   */
  teleport?: boolean;
  /**
   * Target selector or element for teleport
   *
   * @default 'body'
   */
  teleportTo?: string | HTMLElement;
}
interface ScrimSlotProps {
  /** The ticket for this scrim layer */
  ticket: StackTicket;
  /** Z-index for this scrim layer (one below the overlay) */
  zIndex: number;
  /** Whether this ticket's overlay blocks scrim dismissal */
  isBlocking: boolean;
  /** Dismiss this overlay */
  dismiss: () => void;
  /** Attributes to bind to the scrim element */
  attrs: {
    'aria-hidden': 'true';
    'style': {
      zIndex: number;
    };
    'onClick': () => void;
  };
}
declare const _default$51: typeof __VLS_export$51;
declare const __VLS_export$51: __VLS_WithSlots$31<import("vue").DefineComponent<ScrimProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ScrimProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: ScrimSlotProps) => any;
}>;
type __VLS_WithSlots$31<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Select/SelectRoot.vue.d.ts
interface SelectContext {
  /** Whether the dropdown is open */
  isOpen: Ref<boolean>;
  /** Whether the entire select is disabled */
  disabled: MaybeRefOrGetter<boolean>;
  /** Whether multiple selection is enabled */
  multiple: boolean;
  /** Root identifier */
  id: string;
  /** ID for the listbox element */
  listboxId: string;
  /** ID for the activator element */
  activatorId: string;
  /** Form field name */
  name: string | undefined;
  /** Associated form ID */
  form: string | undefined;
  /** Reference to the activator DOM element */
  activatorEl: Ref<HTMLElement | null>;
  /** Selection context for managing selected items */
  selection: SelectionContext;
  /** Virtual focus for keyboard navigation */
  virtualFocus: VirtualFocusReturn;
  /** Popover for dropdown positioning */
  popover: PopoverReturn;
  /** Open the dropdown */
  open: () => void;
  /** Close the dropdown */
  close: () => void;
  /** Toggle the dropdown */
  toggle: () => void;
  /** Select an item by ID, closing dropdown in single-select mode */
  select: (id: ID) => void;
  /** Raw model value for fallback display before items register. Carries ticket values (type-erased at the compound boundary) */
  modelValue: Ref<unknown>;
}
interface SelectRootProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Unique identifier (auto-generated if not provided) */
  id?: string;
  /** Form field name — auto-renders hidden input when provided */
  name?: string;
  /** Associate with a form by ID */
  form?: string;
  /** Disables the entire select */
  disabled?: boolean;
  /** Enable multi-selection mode */
  multiple?: boolean;
  /**
   * Controls mandatory selection behavior:
   * - false (default): No mandatory selection enforcement
   * - true: Prevents deselecting the last selected item
   * - `force`: Automatically selects the first non-disabled item
   */
  mandatory?: boolean | 'force';
  /** Positioning engine. @default CSS anchor positioning (`V0PopoverAdapter`) */
  adapter?: PopoverAdapter;
}
interface SelectRootSlotProps {
  /** Root identifier */
  id: string;
  /** Whether the dropdown is open */
  isOpen: boolean;
  /** Whether the select is disabled */
  isDisabled: boolean;
  /** Open the dropdown */
  open: () => void;
  /** Close the dropdown */
  close: () => void;
  /** Toggle the dropdown */
  toggle: () => void;
}
declare const useSelectContext: (key: string, defaultValue?: SelectContext | undefined) => SelectContext, provideSelectContext: (key: string, context: SelectContext, app?: import("vue").App) => SelectContext;
declare const _default$50: typeof __VLS_export$50;
declare const __VLS_export$50: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$16<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$16<(SelectRootProps & {
    modelValue?: T | T[];
  }) & {
    "onUpdate:modelValue"?: ((value: T | T[] | undefined) => any) | undefined;
    "onUpdate:model-value"?: ((value: T | T[]) => any) | undefined;
  }> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: SelectRootSlotProps) => any;
  };
  emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$16<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Select/SelectActivator.vue.d.ts
interface SelectActivatorProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Accessible label for the activator when no visible label is present */
  label?: string;
}
interface SelectActivatorSlotProps {
  /** Whether the dropdown is open */
  isOpen: boolean;
  /** Attributes to bind to the trigger element */
  attrs: {
    'id': string;
    'role': 'combobox';
    'type': 'button' | undefined;
    'aria-expanded': boolean;
    'aria-haspopup': 'listbox';
    'aria-controls': string;
    'aria-label': string | undefined;
    'aria-disabled': boolean;
    'disabled': true | undefined;
    'tabindex': 0 | undefined;
    'data-disabled': true | undefined;
    'data-open': true | undefined;
    'style': Record<string, string>;
    'onClick': () => void;
    'onKeydown': (e: KeyboardEvent) => void;
  };
}
declare const _default$49: typeof __VLS_export$49;
declare const __VLS_export$49: __VLS_WithSlots$30<import("vue").DefineComponent<SelectActivatorProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<SelectActivatorProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: SelectActivatorSlotProps) => any;
}>;
type __VLS_WithSlots$30<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Select/SelectValue.vue.d.ts
interface SelectValueProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
}
interface SelectValueSlotProps {
  /** The first selected item (ticket) — useful for single select */
  selectedItem: unknown | undefined;
  /** All selected items (tickets) — useful for multi select */
  selectedItems: unknown[];
  /** The first selected value — useful for single select */
  selectedValue: unknown | undefined;
  /** All selected values — useful for multi select */
  selectedValues: unknown[];
  /** Whether any value is selected */
  hasValue: boolean;
  /** Attributes to bind to the value element */
  attrs: Record<string, never>;
}
declare const _default$48: typeof __VLS_export$48;
declare const __VLS_export$48: __VLS_WithSlots$29<import("vue").DefineComponent<SelectValueProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<SelectValueProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: SelectValueSlotProps) => any;
}>;
type __VLS_WithSlots$29<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Select/SelectContent.vue.d.ts
interface SelectContentProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Render content immediately without waiting for first open */
  eager?: boolean;
}
interface SelectContentSlotProps {
  /** Whether the dropdown is open */
  isOpen: boolean;
  /** Attributes to bind to the content element */
  attrs: {
    'id': string;
    'popover': '';
    'role': 'listbox';
    'aria-labelledby': string;
    'aria-multiselectable': true | undefined;
    'tabindex': -1;
    'style': Record<string, string>;
  };
}
declare const _default$47: typeof __VLS_export$47;
declare const __VLS_export$47: __VLS_WithSlots$28<import("vue").DefineComponent<SelectContentProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<SelectContentProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: SelectContentSlotProps) => any;
}>;
type __VLS_WithSlots$28<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Select/SelectCue.vue.d.ts
interface SelectCueProps extends AtomProps {
  namespace?: string;
}
interface SelectCueSlotProps {
  isOpen: boolean;
  attrs: {
    'aria-hidden': true;
    'data-state': 'open' | 'closed';
  };
}
declare const _default$46: typeof __VLS_export$46;
declare const __VLS_export$46: __VLS_WithSlots$27<import("vue").DefineComponent<SelectCueProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<SelectCueProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: SelectCueSlotProps) => any;
}>;
type __VLS_WithSlots$27<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Select/SelectItem.vue.d.ts
interface SelectItemProps<V = unknown> extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Unique identifier (auto-generated if not provided) */
  id?: string;
  /** Value associated with this option */
  value?: V;
  /** Disables this specific option */
  disabled?: MaybeRefOrGetter<boolean>;
}
interface SelectItemSlotProps<V = unknown> {
  /** Value associated with this option */
  value: V | undefined;
  /** Whether this option is currently selected */
  isSelected: boolean;
  /** Whether this option is currently highlighted via virtual focus */
  isHighlighted: boolean;
  /** Whether this option is disabled */
  isDisabled: boolean;
  /** Select this option */
  select: () => void;
  /** Attributes to bind to the option element */
  attrs: {
    'id': string;
    'role': 'option';
    'aria-selected': boolean;
    'aria-disabled': boolean;
    'data-selected': true | undefined;
    'data-highlighted': '' | undefined;
    'data-disabled': true | undefined;
    'data-id': string;
    'onClick': () => void;
  };
}
declare const _default$45: typeof __VLS_export$45;
declare const __VLS_export$45: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$15<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$15<SelectItemProps<V>> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: SelectItemSlotProps<V>) => any;
  };
  emit: {};
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$15<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Select/SelectPlaceholder.vue.d.ts
interface SelectPlaceholderProps extends AtomProps {
  namespace?: string;
}
interface SelectPlaceholderSlotProps {
  hasValue: boolean;
}
declare const _default$44: typeof __VLS_export$44;
declare const __VLS_export$44: __VLS_WithSlots$26<import("vue").DefineComponent<SelectPlaceholderProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<SelectPlaceholderProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: SelectPlaceholderSlotProps) => any;
}>;
type __VLS_WithSlots$26<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Select/index.d.ts
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
 * </script>
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
declare const Select: {
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
   * </script>
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
  Root: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
    slots: {
      default: (props: SelectRootSlotProps) => any;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      namespace?: string | undefined;
      id?: string | undefined;
      name?: string | undefined;
      form?: string | undefined;
      disabled?: boolean | undefined;
      multiple?: boolean | undefined;
      mandatory?: boolean | "force" | undefined;
      adapter?: PopoverAdapter | undefined;
      as?: (DOMElement | null) | undefined;
      renderless?: boolean | undefined;
      modelValue?: (T | T[]) | undefined;
      "onUpdate:modelValue"?: ((value: T | T[] | undefined) => any) | undefined;
      "onUpdate:model-value"?: ((value: T | T[]) => any) | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: SelectRootSlotProps) => any;
    };
    emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
  /**
   * Activator button that opens the select dropdown.
   *
   * @see https://0.vuetifyjs.com/components/forms/select
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { Select } from '@vuetify/v0'
   * </script>
   *
   * <template>
   *   <Select.Activator>
   *     Click to open
   *   </Select.Activator>
   * </template>
   * ```
   */
  Activator: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<SelectActivatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<SelectActivatorProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<SelectActivatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: SelectActivatorSlotProps) => any;
    };
  });
  /**
   * Display component for the selected value. Slot-based — consumers provide rendering.
   *
   * @see https://0.vuetifyjs.com/components/forms/select
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { Select } from '@vuetify/v0'
   * </script>
   *
   * <template>
   *   <Select.Value v-slot="{ selectedValue }">
   *     {{ selectedValue }}
   *   </Select.Value>
   *   <Select.Placeholder>Pick one</Select.Placeholder>
   * </template>
   * ```
   */
  Value: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<SelectValueProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<SelectValueProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<SelectValueProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: SelectValueSlotProps) => any;
    };
  });
  /**
   * Dropdown content container using native popover API with CSS anchor positioning.
   *
   * @see https://0.vuetifyjs.com/components/forms/select
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { Select } from '@vuetify/v0'
   * </script>
   *
   * <template>
   *   <Select.Content>
   *     <Select.Item id="a" value="A">Option A</Select.Item>
   *     <Select.Item id="b" value="B">Option B</Select.Item>
   *   </Select.Content>
   * </template>
   * ```
   */
  Content: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<SelectContentProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<SelectContentProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<SelectContentProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: SelectContentSlotProps) => any;
    };
  });
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
  Cue: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<SelectCueProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<SelectCueProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<SelectCueProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: SelectCueSlotProps) => any;
    };
  });
  /**
   * Option item within the select dropdown. Registers with selection and virtual focus.
   *
   * @see https://0.vuetifyjs.com/components/forms/select
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { Select } from '@vuetify/v0'
   * </script>
   *
   * <template>
   *   <Select.Item id="apple" value="Apple" v-slot="{ isSelected }">
   *     Apple {{ isSelected ? '✓' : '' }}
   *   </Select.Item>
   * </template>
   * ```
   */
  Item: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: {};
    slots: {
      default: (props: SelectItemSlotProps<V>) => any;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      namespace?: string | undefined;
      id?: string | undefined;
      value?: V | undefined;
      disabled?: import("vue").MaybeRefOrGetter<boolean> | undefined;
      as?: (DOMElement | null) | undefined;
      renderless?: boolean | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: SelectItemSlotProps<V>) => any;
    };
    emit: {};
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
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
  Placeholder: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<SelectPlaceholderProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<SelectPlaceholderProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<SelectPlaceholderProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: SelectPlaceholderSlotProps) => any;
    };
  });
};
//#endregion
//#region src/components/Selection/SelectionRoot.vue.d.ts
interface SelectionRootProps {
  /** Namespace for dependency injection (must match SelectionItem namespace) */
  namespace?: string;
  /** Disables the entire selection instance */
  disabled?: boolean;
  /** Auto-select non-disabled items on registration */
  enroll?: boolean;
  /**
   * Controls mandatory selection behavior:
   * - false (default): No mandatory selection enforcement
   * - true: Prevents deselecting the last selected item
   * - `force`: Automatically selects the first non-disabled item on registration
   */
  mandatory?: boolean | 'force';
  /** Enable multi-selection mode (array v-model) */
  multiple?: boolean;
}
interface SelectionRootSlotProps {
  /** Whether the selection instance is disabled */
  isDisabled: boolean;
  /** Enable multi-selection mode (array v-model) */
  multiple: boolean;
  /** Select an item by ID */
  select: (id: ID) => void;
  /** Unselect an item by ID */
  unselect: (id: ID) => void;
  /** Toggle an item's selection state by ID */
  toggle: (id: ID) => void;
  /** Attributes to bind to the root element */
  attrs: {
    'aria-multiselectable': boolean;
  };
}
declare const useSelectionRoot: (key: string, defaultValue?: SelectionContext<SelectionTicket, SelectionTicket<SelectionTicket>> | undefined) => SelectionContext<SelectionTicket, SelectionTicket<SelectionTicket>>, provideSelectionRoot: (key: string, context: SelectionContext<SelectionTicket, SelectionTicket<SelectionTicket>>, app?: import("vue").App) => SelectionContext<SelectionTicket, SelectionTicket<SelectionTicket>>;
declare const _default$43: typeof __VLS_export$43;
declare const __VLS_export$43: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$14<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$14<(SelectionRootProps & {
    modelValue?: T | T[];
  }) & {
    "onUpdate:modelValue"?: ((value: T | T[] | undefined) => any) | undefined;
    "onUpdate:model-value"?: ((value: T | T[]) => any) | undefined;
  }> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: SelectionRootSlotProps) => any;
  };
  emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$14<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Selection/SelectionItem.vue.d.ts
interface SelectionItemProps<V = unknown> {
  /** Unique identifier (auto-generated if not provided) */
  id?: string;
  /** Optional display label (passed through to slot, not used in registration) */
  label?: string;
  /** Value associated with this item */
  value?: V;
  /** Disables this specific item */
  disabled?: MaybeRefOrGetter<boolean>;
  /** Namespace for dependency injection */
  namespace?: string;
}
interface SelectionItemSlotProps<V = unknown> {
  /** Unique identifier */
  id: string;
  /** Optional display label */
  label?: string;
  /** Value associated with this item */
  value: V | undefined;
  /** Whether this item is currently selected */
  isSelected: boolean;
  /** Whether this item is disabled */
  isDisabled: boolean;
  /** Select this item */
  select: () => void;
  /** Unselect this item */
  unselect: () => void;
  /** Toggle this item's selection state */
  toggle: () => void;
  /** Attributes to bind to the item element */
  attrs: {
    'role': 'option';
    'tabindex': 0 | -1;
    'aria-selected': boolean;
    'aria-disabled': boolean;
    'data-selected': true | undefined;
    'data-disabled': true | undefined;
    'onClick': () => void;
    'onKeydown': (e: KeyboardEvent) => void;
  };
}
declare const _default$42: typeof __VLS_export$42;
declare const __VLS_export$42: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$13<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$13<SelectionItemProps<V>> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: SelectionItemSlotProps<V>) => unknown;
  };
  emit: {};
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$13<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Selection/index.d.ts
/**
 * Selection component with sub-components for managing item selection state.
 *
 * @see https://0.vuetifyjs.com/components/providers/selection
 */
declare const Selection: {
  /**
   * Root component for selection contexts.
   *
   * @see https://0.vuetifyjs.com/components/providers/selection
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { Selection } from '@vuetify/v0'
   * </script>
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
  Root: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
    slots: {
      default: (props: SelectionRootSlotProps) => any;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      namespace?: string | undefined;
      disabled?: boolean | undefined;
      enroll?: boolean | undefined;
      mandatory?: boolean | "force" | undefined;
      multiple?: boolean | undefined;
      modelValue?: (T | T[]) | undefined;
      "onUpdate:modelValue"?: ((value: T | T[] | undefined) => any) | undefined;
      "onUpdate:model-value"?: ((value: T | T[]) => any) | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: SelectionRootSlotProps) => any;
    };
    emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
  /**
   * Item component for selection contexts.
   *
   * @see https://0.vuetifyjs.com/components/providers/selection
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { Selection } from '@vuetify/v0'
   * </script>
   *
   * <template>
   *   <Selection.Item value="a" v-slot="{ attrs }">
   *     <button v-bind="attrs">Option A</button>
   *   </Selection.Item>
   * </template>
   * ```
   */
  Item: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: {};
    slots: {
      default: (props: SelectionItemSlotProps<V>) => unknown;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      id?: string | undefined;
      label?: string | undefined;
      value?: V | undefined;
      disabled?: import("vue").MaybeRefOrGetter<boolean> | undefined;
      namespace?: string | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: SelectionItemSlotProps<V>) => unknown;
    };
    emit: {};
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
};
//#endregion
//#region src/components/Single/SingleRoot.vue.d.ts
interface SingleRootProps {
  /** Namespace for dependency injection (must match SingleItem namespace) */
  namespace?: string;
  /** Disables the entire single instance */
  disabled?: boolean;
  /** Auto-select non-disabled items on registration */
  enroll?: boolean;
  /**
   * Controls mandatory single behavior:
   * - false (default): No mandatory single enforcement
   * - true: Prevents deselecting the last selected item
   * - `force`: Automatically selects the first non-disabled item on registration
   */
  mandatory?: boolean | 'force';
}
interface SingleRootSlotProps {
  /** Whether the single instance is disabled */
  isDisabled: boolean;
  /** Select an item by ID */
  select: (id: ID) => void;
  /** Unselect an item by ID */
  unselect: (id: ID) => void;
  /** Toggle an item's single state by ID */
  toggle: (id: ID) => void;
  /** Attributes to bind to the root element */
  attrs: {
    'aria-multiselectable': false;
  };
}
declare const useSingleRoot: (key: string, defaultValue?: SingleContext<SingleTicket, SingleTicket<SingleTicket>> | undefined) => SingleContext<SingleTicket, SingleTicket<SingleTicket>>, provideSingleRoot: (key: string, context: SingleContext<SingleTicket, SingleTicket<SingleTicket>>, app?: import("vue").App) => SingleContext<SingleTicket, SingleTicket<SingleTicket>>;
declare const _default$41: typeof __VLS_export$41;
declare const __VLS_export$41: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$12<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$12<(SingleRootProps & {
    modelValue?: T | T[];
  }) & {
    "onUpdate:modelValue"?: ((value: T | T[] | undefined) => any) | undefined;
  }> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: SingleRootSlotProps) => any;
  };
  emit: (event: "update:modelValue", value: T | T[] | undefined) => void;
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$12<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Single/SingleItem.vue.d.ts
interface SingleItemProps<V = unknown> {
  /** Unique identifier (auto-generated if not provided) */
  id?: string;
  /** Optional display label (passed through to slot, not used in registration) */
  label?: string;
  /** Value associated with this item */
  value?: V;
  /** Disables this specific item */
  disabled?: MaybeRefOrGetter<boolean>;
  /** Namespace for dependency injection */
  namespace?: string;
}
interface SingleItemSlotProps<V = unknown> {
  /** Unique identifier */
  id: string;
  /** Optional display label */
  label?: string;
  /** Value associated with this item */
  value: V | undefined;
  /** Whether this item is currently selected */
  isSelected: boolean;
  /** Whether this item is disabled */
  isDisabled: boolean;
  /** Select this item */
  select: () => void;
  /** Unselect this item */
  unselect: () => void;
  /** Toggle this item's single state */
  toggle: () => void;
  /** Attributes to bind to the item element */
  attrs: {
    'role': 'option';
    'tabindex': 0 | -1;
    'aria-selected': boolean;
    'aria-disabled': boolean;
    'data-selected': true | undefined;
    'data-disabled': true | undefined;
    'onClick': () => void;
    'onKeydown': (e: KeyboardEvent) => void;
  };
}
declare const _default$40: typeof __VLS_export$40;
declare const __VLS_export$40: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$11<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$11<SingleItemProps<V>> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: SingleItemSlotProps<V>) => unknown;
  };
  emit: {};
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$11<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Single/index.d.ts
/**
 * Single component with sub-components for building single-selection interfaces.
 *
 * @see https://0.vuetifyjs.com/components/providers/single
 */
declare const Single: {
  /**
   * Root component for single-selection. Only one item can be selected at a time.
   *
   * @see https://0.vuetifyjs.com/components/providers/single
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { Single } from '@vuetify/v0'
   * </script>
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
  Root: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: (event: "update:modelValue", value: T | T[] | undefined) => void;
    slots: {
      default: (props: SingleRootSlotProps) => any;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      namespace?: string | undefined;
      disabled?: boolean | undefined;
      enroll?: boolean | undefined;
      mandatory?: boolean | "force" | undefined;
      modelValue?: (T | T[]) | undefined;
      "onUpdate:modelValue"?: ((value: T | T[] | undefined) => any) | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: SingleRootSlotProps) => any;
    };
    emit: (event: "update:modelValue", value: T | T[] | undefined) => void;
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
  /**
   * Component representing a selectable item within Single.Root.
   *
   * @see https://0.vuetifyjs.com/components/providers/single
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { Single } from '@vuetify/v0'
   * </script>
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
  Item: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: {};
    slots: {
      default: (props: SingleItemSlotProps<V>) => unknown;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      id?: string | undefined;
      label?: string | undefined;
      value?: V | undefined;
      disabled?: import("vue").MaybeRefOrGetter<boolean> | undefined;
      namespace?: string | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: SingleItemSlotProps<V>) => unknown;
    };
    emit: {};
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
};
//#endregion
//#region src/components/Slider/SliderRoot.vue.d.ts
interface SliderRootContext extends SliderContext {
  /** Unique identifier */
  readonly id: string;
  /** Form field name */
  readonly name?: string;
  /** Form association */
  readonly form?: string;
  /** Track which thumb is currently being dragged */
  dragging: Ref<number | null>;
  /** Track element ref for percent calculation */
  track: Ref<HTMLElement | null>;
  /** Start a drag interaction for a thumb */
  onDrag: (index: number, event: PointerEvent, thumbEl?: HTMLElement) => void;
}
interface SliderRootProps extends AtomProps {
  /** Unique identifier (auto-generated if not provided) */
  id?: string;
  /** Minimum value (default: 0) */
  min?: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Step increment (default: 1) */
  step?: number;
  /** Disables the slider */
  disabled?: MaybeRefOrGetter<boolean>;
  /** Readonly — focusable but not editable */
  readonly?: MaybeRefOrGetter<boolean>;
  /** Slider orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Flip the percent axis */
  inverted?: boolean;
  /** Minimum steps between adjacent thumbs (default: 0) */
  minStepsBetweenThumbs?: number;
  /** Allow thumbs to pass through each other (default: false) */
  crossover?: boolean;
  /** Form field name — triggers hidden inputs */
  name?: string;
  /** Associate with form by ID */
  form?: string;
  /** Accessible name for the group */
  label?: string;
  /** ID of element that labels this group */
  ariaLabelledby?: string;
  /** Namespace for context provision */
  namespace?: string;
}
interface SliderRootSlotProps {
  /** Unique identifier */
  id: string;
  /** All current values */
  values: number[];
  /** Minimum value */
  min: number;
  /** Maximum value */
  max: number;
  /** Whether the slider is disabled */
  isDisabled: boolean;
  /** Whether the slider is readonly */
  isReadonly: boolean;
  /** Slider orientation */
  orientation: 'horizontal' | 'vertical';
  /** Round a value to the nearest step, clamped to min/max */
  snap: (value: number) => number;
  /** Convert a value to a 0–100 percentage */
  fromValue: (value: number) => number;
  /** Convert a 0–100 percentage to a snapped value */
  fromPercent: (percent: number) => number;
  /** Set the value at a thumb index */
  set: (index: number, value: number) => void;
  /** Increment a thumb's value by step × multiplier */
  up: (index: number, multiplier?: number) => void;
  /** Decrement a thumb's value by step × multiplier */
  down: (index: number, multiplier?: number) => void;
  /** Set a thumb to the minimum value */
  floor: (index: number) => void;
  /** Set a thumb to the maximum value */
  ceil: (index: number) => void;
  /** Pre-computed attributes for binding */
  attrs: {
    'role': 'group';
    'aria-label': string | undefined;
    'aria-labelledby': string | undefined;
    'data-disabled': true | undefined;
    'data-readonly': true | undefined;
    'data-orientation': 'horizontal' | 'vertical';
  };
}
declare const useSliderRoot: (key: string, defaultValue?: SliderRootContext | undefined) => SliderRootContext, provideSliderRoot: (key: string, context: SliderRootContext, app?: import("vue").App) => SliderRootContext;
declare const _default$39: typeof __VLS_export$39;
declare const __VLS_export$39: __VLS_WithSlots$25<import("vue").DefineComponent<SliderRootProps & {
  modelValue?: number | number[];
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
  "update:modelValue": (value: number | number[]) => any;
  "update:model-value": (value: number | number[]) => any;
  start: (value: number | number[]) => any;
  end: (value: number | number[]) => any;
}, string, import("vue").PublicProps, Readonly<SliderRootProps & {
  modelValue?: number | number[];
}> & Readonly<{
  "onUpdate:modelValue"?: ((value: number | number[]) => any) | undefined;
  "onUpdate:model-value"?: ((value: number | number[]) => any) | undefined;
  onStart?: ((value: number | number[]) => any) | undefined;
  onEnd?: ((value: number | number[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: SliderRootSlotProps) => any;
}>;
type __VLS_WithSlots$25<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Slider/SliderTrack.vue.d.ts
interface SliderTrackProps extends AtomProps {
  /** Namespace for connecting to parent Slider.Root */
  namespace?: string;
}
interface SliderTrackSlotProps {
  /** Pre-computed attributes */
  attrs: {
    'data-disabled': true | undefined;
    'data-readonly': true | undefined;
    'data-orientation': 'horizontal' | 'vertical';
    'style': Record<string, string>;
    'onPointerdown': (e: PointerEvent) => void;
  };
}
declare const _default$38: typeof __VLS_export$38;
declare const __VLS_export$38: __VLS_WithSlots$24<import("vue").DefineComponent<SliderTrackProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<SliderTrackProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: SliderTrackSlotProps) => any;
}>;
type __VLS_WithSlots$24<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Slider/SliderRange.vue.d.ts
interface SliderRangeProps extends AtomProps {
  /** Namespace for connecting to parent Slider.Root */
  namespace?: string;
}
interface SliderRangeSlotProps {
  /** Start percentage (0-100) */
  start: number;
  /** End percentage (0-100) */
  end: number;
  /** Pre-computed attributes and style */
  attrs: {
    'data-disabled': true | undefined;
    'data-readonly': true | undefined;
    'data-orientation': 'horizontal' | 'vertical';
    'style': Record<string, string>;
  };
}
declare const _default$37: typeof __VLS_export$37;
declare const __VLS_export$37: __VLS_WithSlots$23<import("vue").DefineComponent<SliderRangeProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<SliderRangeProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: SliderRangeSlotProps) => any;
}>;
type __VLS_WithSlots$23<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Slider/SliderThumb.vue.d.ts
type SliderThumbState = 'dragging' | 'idle';
interface SliderThumbProps extends AtomProps {
  /** Namespace for connecting to parent Slider.Root */
  namespace?: string;
  /** Accessible label for this thumb */
  ariaLabel?: string;
  /** ID of element labelling this thumb */
  ariaLabelledby?: string;
  /** Custom aria-valuetext (for formatted display) */
  ariaValuetext?: string;
}
interface SliderThumbSlotProps {
  /** Thumb index in parent slider */
  index: number;
  /** Current value of this thumb */
  value: number;
  /** Current value as percentage (0-100) */
  percent: number;
  /** Whether this thumb is being dragged */
  isDragging: boolean;
  /** Pre-computed ARIA and data attributes */
  attrs: {
    'role': 'slider';
    'tabindex': 0 | -1;
    'aria-valuenow': number;
    'aria-valuemin': number;
    'aria-valuemax': number;
    'aria-valuetext': string | undefined;
    'aria-orientation': 'horizontal' | 'vertical';
    'aria-disabled': boolean;
    'aria-readonly': true | undefined;
    'aria-label': string | undefined;
    'aria-labelledby': string | undefined;
    'data-state': SliderThumbState;
    'data-disabled': true | undefined;
    'data-readonly': true | undefined;
    'style': Record<string, string>;
    'onKeydown': (e: KeyboardEvent) => void;
    'onPointerdown': (e: PointerEvent) => void;
  };
}
declare const _default$36: typeof __VLS_export$36;
declare const __VLS_export$36: __VLS_WithSlots$22<import("vue").DefineComponent<SliderThumbProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<SliderThumbProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: SliderThumbSlotProps) => any;
}>;
type __VLS_WithSlots$22<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Slider/SliderHiddenInput.vue.d.ts
interface SliderHiddenInputProps {
  /** Namespace for context injection from parent Slider.Root */
  namespace?: string;
  /** Thumb index to read value from */
  index?: number;
}
declare const _default$35: typeof __VLS_export$35;
declare const __VLS_export$35: import("vue").DefineComponent<SliderHiddenInputProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<SliderHiddenInputProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
//#endregion
//#region src/components/Slider/index.d.ts
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
 * </script>
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
declare const Slider: {
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
   * </script>
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
  Root: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<SliderRootProps & {
      modelValue?: number | number[];
    }> & Readonly<{
      "onUpdate:modelValue"?: ((value: number | number[]) => any) | undefined;
      "onUpdate:model-value"?: ((value: number | number[]) => any) | undefined;
      onStart?: ((value: number | number[]) => any) | undefined;
      onEnd?: ((value: number | number[]) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
      "update:modelValue": (value: number | number[]) => any;
      "update:model-value": (value: number | number[]) => any;
      start: (value: number | number[]) => any;
      end: (value: number | number[]) => any;
    }, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<SliderRootProps & {
      modelValue?: number | number[];
    }> & Readonly<{
      "onUpdate:modelValue"?: ((value: number | number[]) => any) | undefined;
      "onUpdate:model-value"?: ((value: number | number[]) => any) | undefined;
      onStart?: ((value: number | number[]) => any) | undefined;
      onEnd?: ((value: number | number[]) => any) | undefined;
    }>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<SliderRootProps & {
    modelValue?: number | number[];
  }> & Readonly<{
    "onUpdate:modelValue"?: ((value: number | number[]) => any) | undefined;
    "onUpdate:model-value"?: ((value: number | number[]) => any) | undefined;
    onStart?: ((value: number | number[]) => any) | undefined;
    onEnd?: ((value: number | number[]) => any) | undefined;
  }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: number | number[]) => any;
    "update:model-value": (value: number | number[]) => any;
    start: (value: number | number[]) => any;
    end: (value: number | number[]) => any;
  }, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: SliderRootSlotProps) => any;
    };
  });
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
  Track: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<SliderTrackProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<SliderTrackProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<SliderTrackProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: SliderTrackSlotProps) => any;
    };
  });
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
  Range: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<SliderRangeProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<SliderRangeProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<SliderRangeProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: SliderRangeSlotProps) => any;
    };
  });
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
  Thumb: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<SliderThumbProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<SliderThumbProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<SliderThumbProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: SliderThumbSlotProps) => any;
    };
  });
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
   * </script>
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
  HiddenInput: import("vue").DefineComponent<SliderHiddenInputProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<SliderHiddenInputProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
};
//#endregion
//#region src/components/Snackbar/SnackbarPortal.vue.d.ts
interface SnackbarPortalContext {
  /** Mirror a message into the persistent announcers. Urgent routes to the assertive/alert region. */
  announce: (message: string, urgent?: boolean) => void;
  /** Current polite (role="status") announcement text */
  polite: Readonly<ShallowRef<string>>;
  /** Current assertive (role="alert") announcement text */
  assertive: Readonly<ShallowRef<string>>;
}
interface SnackbarPortalProps extends AtomProps {
  /** Auto-render the Snackbar.Announcer live-region pair. Set false to omit it or place `<Snackbar.Announcer>` yourself. @default true */
  announcer?: boolean;
  /** Namespace for dependency injection. @default 'v0:notifications' */
  namespace?: string;
  /** Teleport target. `'top-layer'` mounts into the topmost open modal; `false` renders inline. @default 'top-layer' */
  teleport?: 'top-layer' | (string & {}) | false;
}
interface SnackbarPortalSlotProps {
  /** Calculated z-index from useStack */
  zIndex: number;
  /**
   * Attributes to bind to the portal element.
   *
   * @remarks
   * The style carries only `zIndex` so consumer positioning (classes or
   * styles like `absolute` / `fixed`) wins. In renderless mode the wrapper
   * you render must be positioned (non-`static`) for the z-index to take
   * effect — the automatic `position: relative` fallback only covers the
   * element rendered by the non-renderless Atom.
   */
  attrs: {
    style: {
      zIndex: number;
    };
  };
}
declare const _default$34: typeof __VLS_export$34;
declare const __VLS_export$34: __VLS_WithSlots$21<import("vue").DefineComponent<SnackbarPortalProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<SnackbarPortalProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: SnackbarPortalSlotProps) => any;
}>;
type __VLS_WithSlots$21<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Snackbar/SnackbarQueue.vue.d.ts
interface SnackbarQueueContext {
  dismiss: (id: ID) => void;
}
declare const useSnackbarQueueContext: (key: string, defaultValue?: SnackbarQueueContext | null | undefined) => SnackbarQueueContext | null, provideSnackbarQueueContext: (key: string, context: SnackbarQueueContext | null, app?: import("vue").App) => SnackbarQueueContext | null;
interface SnackbarQueueProps extends AtomProps {
  /** Which notifications instance to connect to. @default 'v0:notifications' */
  namespace?: string;
}
interface SnackbarQueueSlotProps {
  items: NotificationTicket[];
  attrs: {
    onMouseenter: () => void;
    onMouseleave: () => void;
    onFocusin: () => void;
    onFocusout: (e: FocusEvent) => void;
  };
}
declare const _default$33: typeof __VLS_export$33;
declare const __VLS_export$33: __VLS_WithSlots$20<import("vue").DefineComponent<SnackbarQueueProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<SnackbarQueueProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: SnackbarQueueSlotProps) => any;
}>;
type __VLS_WithSlots$20<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Snackbar/SnackbarRoot.vue.d.ts
interface SnackbarRootContext {
  id: ID;
  onDismiss: () => void;
}
declare const useSnackbarRootContext: (key: string, defaultValue?: SnackbarRootContext | undefined) => SnackbarRootContext, provideSnackbarRootContext: (key: string, context: SnackbarRootContext, app?: import("vue").App) => SnackbarRootContext;
interface SnackbarRootProps extends AtomProps {
  /** Namespace for dependency injection. @default 'v0:notifications' */
  namespace?: string;
  /** Unique identifier. Auto-generated if not provided. */
  id?: ID;
  /** When true, sets role="alert" for urgent messages; otherwise role="status". */
  urgent?: boolean;
}
interface SnackbarRootSlotProps {
  id: ID;
  attrs: {
    role: string;
  };
}
declare const _default$32: typeof __VLS_export$32;
declare const __VLS_export$32: __VLS_WithSlots$19<import("vue").DefineComponent<SnackbarRootProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
  dismiss: (id: ID) => any;
}, string, import("vue").PublicProps, Readonly<SnackbarRootProps> & Readonly<{
  onDismiss?: ((id: ID) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: SnackbarRootSlotProps) => any;
}>;
type __VLS_WithSlots$19<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Snackbar/SnackbarClose.vue.d.ts
interface SnackbarCloseProps extends AtomProps {
  /** Namespace for dependency injection. @default 'v0:notifications' */
  namespace?: string;
}
interface SnackbarCloseSlotProps {
  /** Attributes to bind to the close button element */
  attrs: {
    'type': 'button' | undefined;
    'role': 'button' | undefined;
    'tabindex': number;
    'aria-label': string;
    'onClick': () => void;
    'onKeydown': ((e: KeyboardEvent) => void) | undefined;
  };
}
declare const _default$31: typeof __VLS_export$31;
declare const __VLS_export$31: __VLS_WithSlots$18<import("vue").DefineComponent<SnackbarCloseProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<SnackbarCloseProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: SnackbarCloseSlotProps) => any;
}>;
type __VLS_WithSlots$18<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Snackbar/SnackbarAnnouncer.vue.d.ts
interface SnackbarAnnouncerProps {
  /** Namespace for context injection from parent Snackbar.Portal. @default 'v0:notifications' */
  namespace?: string;
}
declare const _default$30: typeof __VLS_export$30;
declare const __VLS_export$30: import("vue").DefineComponent<SnackbarAnnouncerProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<SnackbarAnnouncerProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
//#endregion
//#region src/components/Snackbar/SnackbarContent.vue.d.ts
type SnackbarContentProps = AtomProps;
declare const _default$29: typeof __VLS_export$29;
declare const __VLS_export$29: __VLS_WithSlots$17<import("vue").DefineComponent<AtomProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<AtomProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: () => any;
}>;
type __VLS_WithSlots$17<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Snackbar/index.d.ts
/**
 * Snackbar component with sub-components for building toast notifications.
 *
 * @see https://0.vuetifyjs.com/components/semantic/snackbar
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 *   import { Snackbar } from '@vuetify/v0'
 * </script>
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
declare const Snackbar: {
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
   * </script>
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
  Portal: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<SnackbarPortalProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<SnackbarPortalProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<SnackbarPortalProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: SnackbarPortalSlotProps) => any;
    };
  });
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
   * </script>
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
  Queue: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<SnackbarQueueProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<SnackbarQueueProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<SnackbarQueueProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: SnackbarQueueSlotProps) => any;
    };
  });
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
   * </script>
   *
   * <template>
   *   <Snackbar.Root :id="item.id">
   *     <Snackbar.Content>{{ item.subject }}</Snackbar.Content>
   *     <Snackbar.Close />
   *   </Snackbar.Root>
   * </template>
   * ```
   */
  Root: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<SnackbarRootProps> & Readonly<{
      onDismiss?: ((id: ID) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
      dismiss: (id: ID) => any;
    }, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<SnackbarRootProps> & Readonly<{
      onDismiss?: ((id: ID) => any) | undefined;
    }>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<SnackbarRootProps> & Readonly<{
    onDismiss?: ((id: ID) => any) | undefined;
  }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    dismiss: (id: ID) => any;
  }, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: SnackbarRootSlotProps) => any;
    };
  });
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
   * </script>
   *
   * <template>
   *   <Snackbar.Content>Changes saved</Snackbar.Content>
   * </template>
   * ```
   */
  Content: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<AtomProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<AtomProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<AtomProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: () => any;
    };
  });
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
   * </script>
   *
   * <template>
   *   <Snackbar.Close />
   * </template>
   * ```
   */
  Close: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<SnackbarCloseProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<SnackbarCloseProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<SnackbarCloseProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: SnackbarCloseSlotProps) => any;
    };
  });
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
   * </script>
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
  Announcer: import("vue").DefineComponent<SnackbarAnnouncerProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<SnackbarAnnouncerProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
};
//#endregion
//#region src/components/Step/StepRoot.vue.d.ts
interface StepRootProps {
  /** Namespace for dependency injection (must match StepItem namespace) */
  namespace?: string;
  /** Disables the entire step instance */
  disabled?: boolean;
  /** Auto-select non-disabled items on registration */
  enroll?: boolean;
  /**
   * Controls mandatory step behavior:
   * - false (default): No mandatory step enforcement
   * - true: Prevents deselecting the last selected item
   * - `force`: Automatically selects the first non-disabled item on registration
   */
  mandatory?: boolean | 'force';
}
interface StepRootSlotProps {
  /** Whether the step instance is disabled */
  isDisabled: boolean;
  /** Select the first item */
  first: () => void;
  /** Select the last item */
  last: () => void;
  /** Select the next item */
  next: () => void;
  /** Select the previous item */
  prev: () => void;
  /** Step forward or backward by a specific count */
  step: (count: number) => void;
  /** Select an item by ID */
  select: (id: ID) => void;
  /** Unselect an item by ID */
  unselect: (id: ID) => void;
  /** Toggle an item's step state by ID */
  toggle: (id: ID) => void;
  /** Attributes to bind to the root element */
  attrs: {
    'aria-multiselectable': false;
  };
}
declare const useStepRoot: (key: string, defaultValue?: StepContext<StepTicket, StepTicket<StepTicket>> | undefined) => StepContext<StepTicket, StepTicket<StepTicket>>, provideStepRoot: (key: string, context: StepContext<StepTicket, StepTicket<StepTicket>>, app?: import("vue").App) => StepContext<StepTicket, StepTicket<StepTicket>>;
declare const _default$28: typeof __VLS_export$28;
declare const __VLS_export$28: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$10<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$10<(StepRootProps & {
    modelValue?: T | T[];
  }) & {
    "onUpdate:modelValue"?: ((value: T | T[] | undefined) => any) | undefined;
  }> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: StepRootSlotProps) => any;
  };
  emit: (event: "update:modelValue", value: T | T[] | undefined) => void;
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$10<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Step/StepItem.vue.d.ts
interface StepItemProps<V = unknown> {
  /** Unique identifier (auto-generated if not provided) */
  id?: string;
  /** Optional display label (passed through to slot, not used in registration) */
  label?: string;
  /** Value associated with this item */
  value?: V;
  /** Disables this specific item */
  disabled?: MaybeRefOrGetter<boolean>;
  /** Namespace for dependency injection */
  namespace?: string;
}
interface StepItemSlotProps<V = unknown> {
  /** Unique identifier */
  id: string;
  /** Optional display label */
  label?: string;
  /** Value associated with this item */
  value: V | undefined;
  /** Whether this item is currently selected */
  isSelected: boolean;
  /** Whether this item is disabled */
  isDisabled: boolean;
  /** Select this item */
  select: () => void;
  /** Unselect this item */
  unselect: () => void;
  /** Toggle this item's step state */
  toggle: () => void;
  /** Attributes to bind to the item element */
  attrs: {
    'role': 'tab';
    'tabindex': 0 | -1;
    'aria-selected': boolean;
    'aria-disabled': boolean;
    'data-selected': true | undefined;
    'data-disabled': true | undefined;
    'onClick': () => void;
    'onKeydown': (e: KeyboardEvent) => void;
  };
}
declare const _default$27: typeof __VLS_export$27;
declare const __VLS_export$27: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$9<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$9<StepItemProps<V>> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: StepItemSlotProps<V>) => unknown;
  };
  emit: {};
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$9<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Step/index.d.ts
/**
 * Step component with sub-components for building stepper navigation.
 *
 * @see https://0.vuetifyjs.com/components/providers/step
 */
declare const Step: {
  /**
   * Root component for step navigation.
   *
   * @see https://0.vuetifyjs.com/components/providers/step
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { Step } from '@vuetify/v0'
   * </script>
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
  Root: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: (event: "update:modelValue", value: T | T[] | undefined) => void;
    slots: {
      default: (props: StepRootSlotProps) => any;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      namespace?: string | undefined;
      disabled?: boolean | undefined;
      enroll?: boolean | undefined;
      mandatory?: boolean | "force" | undefined;
      modelValue?: (T | T[]) | undefined;
      "onUpdate:modelValue"?: ((value: T | T[] | undefined) => any) | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: StepRootSlotProps) => any;
    };
    emit: (event: "update:modelValue", value: T | T[] | undefined) => void;
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
  /**
   * Component representing a single step item.
   *
   * @see https://0.vuetifyjs.com/components/providers/step
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { Step } from '@vuetify/v0'
   * </script>
   *
   * <template>
   *   <Step.Item value="account">
   *     Account Setup
   *   </Step.Item>
   * </template>
   * ```
   */
  Item: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: {};
    slots: {
      default: (props: StepItemSlotProps<V>) => unknown;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      id?: string | undefined;
      label?: string | undefined;
      value?: V | undefined;
      disabled?: import("vue").MaybeRefOrGetter<boolean> | undefined;
      namespace?: string | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: StepItemSlotProps<V>) => unknown;
    };
    emit: {};
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
};
//#endregion
//#region src/components/Switch/SwitchGroup.vue.d.ts
interface SwitchGroupProps extends AtomProps {
  /** Namespace for context provision to children */
  namespace?: string;
  /** Disables all switches in the group */
  disabled?: boolean;
  /** Auto-select items on registration */
  enroll?: boolean;
  /** Require at least one switch to be on. `'force'` prevents deselecting the last item */
  mandatory?: boolean | 'force';
  /** Accessible group label */
  label?: string;
  /** ID of element that labels this group */
  ariaLabelledby?: string;
  /** ID of element that describes this group */
  ariaDescribedby?: string;
}
interface SwitchGroupSlotProps {
  /** Whether the group is disabled */
  isDisabled: boolean;
  /** Whether no switches are on */
  isNoneSelected: boolean;
  /** Whether all switches are on */
  isAllSelected: boolean;
  /** Whether some but not all switches are on */
  isMixed: boolean;
  /** Turn on specific switches by ID */
  select: (id: ID | ID[]) => void;
  /** Turn off specific switches by ID */
  unselect: (id: ID | ID[]) => void;
  /** Toggle specific switches by ID */
  toggle: (id: ID | ID[]) => void;
  /** Turn on all switches */
  selectAll: () => void;
  /** Turn off all switches */
  unselectAll: () => void;
  /** Toggle all switches */
  toggleAll: () => void;
  /** Pre-computed ARIA attributes for the group element */
  attrs: {
    'role': 'group';
    'aria-label': string | undefined;
    'aria-labelledby': string | undefined;
    'aria-describedby': string | undefined;
  };
}
declare const useSwitchGroup: (key: string, defaultValue?: GroupContext<GroupTicket, GroupTicket<GroupTicket>> | undefined) => GroupContext<GroupTicket, GroupTicket<GroupTicket>>, provideSwitchGroup: (key: string, context: GroupContext<GroupTicket, GroupTicket<GroupTicket>>, app?: import("vue").App) => GroupContext<GroupTicket, GroupTicket<GroupTicket>>;
declare const _default$26: typeof __VLS_export$26;
declare const __VLS_export$26: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$8<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$8<(SwitchGroupProps & {
    modelValue?: T | T[];
  }) & {
    "onUpdate:modelValue"?: ((value: T | T[] | undefined) => any) | undefined;
    "onUpdate:model-value"?: ((value: T | T[]) => any) | undefined;
  }> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: SwitchGroupSlotProps) => any;
  };
  emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$8<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Switch/SwitchHiddenInput.vue.d.ts
interface SwitchHiddenInputProps {
  /** Namespace for connecting to parent Switch.Root */
  namespace?: string;
  /** Form field name (overrides Root's name) */
  name?: string;
  /** Form field value (overrides Root's value, defaults to 'on') */
  value?: string;
  /** Associate with form by ID (overrides Root's form) */
  form?: string;
}
declare const _default$25: typeof __VLS_export$25;
declare const __VLS_export$25: import("vue").DefineComponent<SwitchHiddenInputProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<SwitchHiddenInputProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
//#endregion
//#region src/components/Switch/SwitchRoot.vue.d.ts
/** Visual state of the switch for styling purposes */
type SwitchState = 'checked' | 'unchecked' | 'indeterminate';
interface SwitchRootContext<V = unknown> {
  /** Unique identifier */
  readonly id: ID;
  /** Optional display label */
  readonly label?: string;
  /** Value associated with this switch */
  readonly value: V | undefined;
  /** Form field name (triggers auto hidden input when provided) */
  readonly name?: string;
  /** Associate with form by ID */
  readonly form?: string;
  /** Whether this switch is currently on */
  isChecked: Readonly<Ref<boolean>>;
  /** Whether this switch is in a mixed/indeterminate state */
  isMixed: Readonly<Ref<boolean>>;
  /** Whether this switch is disabled */
  isDisabled: Readonly<Ref<boolean>>;
  /** Turn this switch on */
  select: () => void;
  /** Turn this switch off */
  unselect: () => void;
  /** Toggle this switch's state */
  toggle: () => void;
  /** Set this switch to mixed/indeterminate state (group mode only) */
  mix: () => void;
  /** Clear mixed/indeterminate state (group mode only) */
  unmix: () => void;
}
interface SwitchRootProps<V = unknown> extends AtomProps {
  /** Unique identifier (auto-generated if not provided) */
  id?: ID;
  /** Optional display label (passed through to slot) */
  label?: string;
  /** Value associated with this switch (used in group mode and form submission) */
  value?: V;
  /** Form field name - triggers auto hidden input when provided */
  name?: string;
  /** Associate with form by ID */
  form?: string;
  /** Disables this switch */
  disabled?: MaybeRefOrGetter<boolean>;
  /** Sets the indeterminate state */
  indeterminate?: MaybeRefOrGetter<boolean>;
  /** Namespace for context provision to children (Track, Thumb, HiddenInput) */
  namespace?: string;
  /** Namespace for connecting to parent Switch.Group */
  groupNamespace?: string;
  /** ID of element that labels this switch */
  ariaLabelledby?: string;
  /** ID of element that describes this switch */
  ariaDescribedby?: string;
  /** Whether the switch has an invalid value */
  ariaInvalid?: boolean;
}
interface SwitchRootSlotProps<V = unknown> {
  /** Unique identifier */
  id: ID;
  /** Optional display label */
  label?: string;
  /** Value associated with this switch */
  value: V | undefined;
  /** Whether this switch is currently on */
  isChecked: boolean;
  /** Whether this switch is in a mixed/indeterminate state */
  isMixed: boolean;
  /** Whether this switch is disabled */
  isDisabled: boolean;
  /** Turn this switch on */
  select: () => void;
  /** Turn this switch off */
  unselect: () => void;
  /** Toggle this switch's state */
  toggle: () => void;
  /** Set this switch to mixed/indeterminate state (group mode only) */
  mix: () => void;
  /** Clear mixed/indeterminate state (group mode only) */
  unmix: () => void;
  /** Pre-computed ARIA and data attributes for the root element */
  attrs: {
    'type': 'button' | undefined;
    'role': 'switch';
    'aria-checked': boolean;
    'aria-disabled': boolean;
    'aria-label': string | undefined;
    'aria-labelledby': string | undefined;
    'aria-describedby': string | undefined;
    'aria-invalid': boolean | undefined;
    'tabindex': 0 | undefined;
    'data-state': SwitchState;
    'data-disabled': true | undefined;
    'onClick': () => void;
    'onKeydown': (e: KeyboardEvent) => void;
  };
}
declare const useSwitchRoot: (key: string, defaultValue?: SwitchRootContext<unknown> | undefined) => SwitchRootContext<unknown>, provideSwitchRoot: (key: string, context: SwitchRootContext<unknown>, app?: import("vue").App) => SwitchRootContext<unknown>;
declare const _default$24: typeof __VLS_export$24;
declare const __VLS_export$24: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$7<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$7<(SwitchRootProps<V> & {
    modelValue?: boolean;
  }) & {
    "onUpdate:modelValue"?: ((value: boolean | undefined) => any) | undefined;
    "onUpdate:model-value"?: ((value: boolean) => any) | undefined;
  }> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: SwitchRootSlotProps<V>) => any;
  };
  emit: ((evt: "update:model-value", value: boolean) => void) & ((event: "update:modelValue", value: boolean | undefined) => void);
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$7<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Switch/SwitchSelectAll.vue.d.ts
interface SwitchSelectAllProps extends AtomProps {
  /** Accessible label for the select-all toggle */
  label?: string;
  /** Disables this toggle */
  disabled?: boolean;
  /** Namespace for context provision to children (Track, Thumb) */
  namespace?: string;
  /** Namespace for connecting to parent Switch.Group */
  groupNamespace?: string;
  /** ID of element that labels this toggle */
  ariaLabelledby?: string;
  /** ID of element that describes this toggle */
  ariaDescribedby?: string;
}
interface SwitchSelectAllSlotProps {
  /** Accessible label */
  label?: string;
  /** Whether all switches in the group are on */
  isAllSelected: boolean;
  /** Whether some but not all switches are on */
  isMixed: boolean;
  /** Whether this toggle is disabled */
  isDisabled: boolean;
  /** Turn on all switches in the group */
  selectAll: () => void;
  /** Turn off all switches in the group */
  unselectAll: () => void;
  /** Toggle all switches in the group */
  toggleAll: () => void;
  /** Pre-computed ARIA and data attributes for the root element */
  attrs: {
    'type': 'button' | undefined;
    'role': 'switch';
    'aria-checked': boolean;
    'aria-disabled': boolean;
    'aria-label': string | undefined;
    'aria-labelledby': string | undefined;
    'aria-describedby': string | undefined;
    'tabindex': 0 | undefined;
    'data-state': SwitchState;
    'data-disabled': true | undefined;
    'onClick': () => void;
    'onKeydown': (e: KeyboardEvent) => void;
  };
}
declare const _default$23: typeof __VLS_export$23;
declare const __VLS_export$23: __VLS_WithSlots$16<import("vue").DefineComponent<SwitchSelectAllProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<SwitchSelectAllProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: SwitchSelectAllSlotProps) => any;
}>;
type __VLS_WithSlots$16<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Switch/SwitchThumb.vue.d.ts
interface SwitchThumbProps extends AtomProps {
  /** Namespace for connecting to parent Switch.Root */
  namespace?: string;
}
interface SwitchThumbSlotProps {
  /** Whether the parent switch is on */
  isChecked: boolean;
  /** Whether the parent switch is in a mixed/indeterminate state */
  isMixed: boolean;
  /** Pre-computed data attributes for styling */
  attrs: {
    'aria-hidden': 'true';
    'data-state': SwitchState;
  };
}
declare const _default$22: typeof __VLS_export$22;
declare const __VLS_export$22: __VLS_WithSlots$15<import("vue").DefineComponent<SwitchThumbProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<SwitchThumbProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: SwitchThumbSlotProps) => any;
}>;
type __VLS_WithSlots$15<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Switch/SwitchTrack.vue.d.ts
interface SwitchTrackProps extends AtomProps {
  /** Namespace for connecting to parent Switch.Root */
  namespace?: string;
}
interface SwitchTrackSlotProps {
  /** Whether the parent switch is on */
  isChecked: boolean;
  /** Whether the parent switch is in a mixed/indeterminate state */
  isMixed: boolean;
  /** Pre-computed data attributes for styling */
  attrs: {
    'aria-hidden': 'true';
    'data-state': SwitchState;
  };
}
declare const _default$21: typeof __VLS_export$21;
declare const __VLS_export$21: __VLS_WithSlots$14<import("vue").DefineComponent<SwitchTrackProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<SwitchTrackProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: SwitchTrackSlotProps) => any;
}>;
type __VLS_WithSlots$14<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Switch/index.d.ts
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
 * </script>
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
declare const Switch: {
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
   * </script>
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
  Group: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
    slots: {
      default: (props: SwitchGroupSlotProps) => any;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      namespace?: string | undefined;
      disabled?: boolean | undefined;
      enroll?: boolean | undefined;
      mandatory?: boolean | "force" | undefined;
      label?: string | undefined;
      ariaLabelledby?: string | undefined;
      ariaDescribedby?: string | undefined;
      as?: (DOMElement | null) | undefined;
      renderless?: boolean | undefined;
      modelValue?: (T | T[]) | undefined;
      "onUpdate:modelValue"?: ((value: T | T[] | undefined) => any) | undefined;
      "onUpdate:model-value"?: ((value: T | T[]) => any) | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: SwitchGroupSlotProps) => any;
    };
    emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
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
   * </script>
   *
   * <template>
   *   <Switch.Root>
   *     <Switch.Track><Switch.Thumb /></Switch.Track>
   *     <Switch.HiddenInput name="notifications" value="on" />
   *   </Switch.Root>
   * </template>
   * ```
   */
  HiddenInput: import("vue").DefineComponent<SwitchHiddenInputProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<SwitchHiddenInputProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
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
   * </script>
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
  Root: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: ((evt: "update:model-value", value: boolean) => void) & ((event: "update:modelValue", value: boolean | undefined) => void);
    slots: {
      default: (props: SwitchRootSlotProps<V>) => any;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      id?: ID | undefined;
      label?: string | undefined;
      value?: V | undefined;
      name?: string | undefined;
      form?: string | undefined;
      disabled?: import("vue").MaybeRefOrGetter<boolean> | undefined;
      indeterminate?: import("vue").MaybeRefOrGetter<boolean> | undefined;
      namespace?: string | undefined;
      groupNamespace?: string | undefined;
      ariaLabelledby?: string | undefined;
      ariaDescribedby?: string | undefined;
      ariaInvalid?: boolean | undefined;
      as?: (DOMElement | null) | undefined;
      renderless?: boolean | undefined;
      modelValue?: boolean | undefined;
      "onUpdate:modelValue"?: ((value: boolean | undefined) => any) | undefined;
      "onUpdate:model-value"?: ((value: boolean) => any) | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: SwitchRootSlotProps<V>) => any;
    };
    emit: ((evt: "update:model-value", value: boolean) => void) & ((event: "update:modelValue", value: boolean | undefined) => void);
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
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
   * </script>
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
  SelectAll: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<SwitchSelectAllProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<SwitchSelectAllProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<SwitchSelectAllProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: SwitchSelectAllSlotProps) => any;
    };
  });
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
  Thumb: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<SwitchThumbProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<SwitchThumbProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<SwitchThumbProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: SwitchThumbSlotProps) => any;
    };
  });
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
  Track: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<SwitchTrackProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<SwitchTrackProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<SwitchTrackProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: SwitchTrackSlotProps) => any;
    };
  });
};
//#endregion
//#region src/components/Tabs/TabsRoot.vue.d.ts
type TabsOrientation = 'horizontal' | 'vertical';
/** Ticket for tab items with element reference for focus management */
interface TabsTicket extends StepTicket {
  /** Element reference for roving tabindex focus management */
  el?: MaybeRefOrGetter<Element | null | undefined>;
}
/** Activation mode alias for Tabs component API */
type TabsActivation = Activation;
interface TabsRootProps {
  /** Namespace for dependency injection (must match child namespace) */
  namespace?: string;
  /** Disables the entire tabs instance */
  disabled?: boolean;
  /** Auto-select non-disabled items on registration */
  enroll?: boolean;
  /**
   * Controls mandatory tab behavior:
   * - false: No mandatory tab enforcement
   * - true: Prevents deselecting the last selected item
   * - `force` (default): Automatically selects the first non-disabled tab
   */
  mandatory?: boolean | 'force';
  /** Whether arrow key navigation wraps around */
  circular?: boolean;
  /** Tab orientation for keyboard navigation */
  orientation?: TabsOrientation;
  /**
   * Activation mode:
   * - `automatic`: Tab activates on focus (arrow keys)
   * - `manual`: Tab activates on Enter/Space only
   */
  activation?: TabsActivation;
}
interface TabsRootSlotProps {
  /** Whether the tabs instance is disabled */
  isDisabled: boolean;
  /** Current orientation */
  orientation: TabsOrientation;
  /** Current activation mode */
  activation: TabsActivation;
  /** Select the first tab */
  first: () => void;
  /** Select the last tab */
  last: () => void;
  /** Select the next tab */
  next: () => void;
  /** Select the previous tab */
  prev: () => void;
  /** Step forward or backward by a specific count */
  step: (count: number) => void;
  /** Select a tab by ID */
  select: (id: ID) => void;
  /** Unselect a tab by ID */
  unselect: (id: ID) => void;
  /** Toggle a tab's selection state by ID */
  toggle: (id: ID) => void;
  /** Attributes to bind to the root element */
  attrs: {
    'aria-multiselectable': false;
  };
}
interface TabsContext extends StepContext<TabsTicket> {
  /** Tab orientation */
  orientation: Ref<TabsOrientation>;
  /** Activation mode */
  activation: Ref<TabsActivation>;
  /** Whether navigation wraps around */
  circular: Ref<boolean>;
  /** Root ID for generating tab/panel IDs */
  rootId: string;
}
declare const useTabsRoot: (key: string, defaultValue?: TabsContext | undefined) => TabsContext, provideTabsRoot: (key: string, context: TabsContext, app?: import("vue").App) => TabsContext;
declare const _default$20: typeof __VLS_export$20;
declare const __VLS_export$20: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$6<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$6<(TabsRootProps & {
    modelValue?: T | T[];
  }) & {
    "onUpdate:modelValue"?: ((value: T | T[] | undefined) => any) | undefined;
    "onUpdate:model-value"?: ((value: T | T[]) => any) | undefined;
  }> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: TabsRootSlotProps) => any;
  };
  emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$6<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Tabs/TabsList.vue.d.ts
interface TabsListProps extends AtomProps {
  /** Accessible label for the tablist */
  label?: string;
  /** Namespace for dependency injection */
  namespace?: string;
}
interface TabsListSlotProps {
  /** Current orientation */
  orientation: TabsOrientation;
  /** Whether the tabs instance is disabled */
  isDisabled: boolean;
  /** Attributes to bind to the tablist element */
  attrs: {
    'role': 'tablist';
    'aria-orientation': TabsOrientation;
    'aria-label': string | undefined;
    'aria-disabled': boolean;
    'data-disabled': true | undefined;
  };
}
declare const _default$19: typeof __VLS_export$19;
declare const __VLS_export$19: __VLS_WithSlots$13<import("vue").DefineComponent<TabsListProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<TabsListProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: TabsListSlotProps) => any;
}>;
type __VLS_WithSlots$13<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Tabs/TabsItem.vue.d.ts
interface TabsItemProps<V = unknown> extends AtomProps {
  /** Unique identifier (auto-generated if not provided) */
  id?: ID;
  /** Value associated with this tab (used to match with TabsPanel) */
  value?: V;
  /** Disables this specific tab */
  disabled?: MaybeRefOrGetter<boolean>;
  /** Namespace for dependency injection */
  namespace?: string;
  /** Accessible label for this tab */
  ariaLabel?: string;
  /** ID of element that labels this tab */
  ariaLabelledby?: string;
  /** ID of element that describes this tab */
  ariaDescribedby?: string;
  /** Focus target when renderless / `:as="null"`. Defaults to the Atom host. */
  el?: MaybeRefOrGetter<Element | null | undefined>;
}
interface TabsItemSlotProps {
  /** Unique identifier */
  id: string;
  /** Whether this tab is currently selected */
  isSelected: boolean;
  /** Whether this tab is disabled */
  isDisabled: boolean;
  /** Select this tab */
  select: () => void;
  /** Attributes to bind to the tab element */
  attrs: {
    'id': string;
    'role': 'tab';
    'tabindex': 0 | -1;
    'aria-selected': boolean;
    'aria-controls': string;
    'aria-disabled': boolean;
    'aria-label': string | undefined;
    'aria-labelledby': string | undefined;
    'aria-describedby': string | undefined;
    'data-selected': true | undefined;
    'data-disabled': true | undefined;
    'disabled': boolean | undefined;
    'type': 'button' | undefined;
    'onClick': () => void;
    'onKeydown': (e: KeyboardEvent) => void;
    'onFocus': () => void;
  };
}
declare const _default$18: typeof __VLS_export$18;
declare const __VLS_export$18: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$5<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$5<TabsItemProps<V>> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: TabsItemSlotProps) => any;
  };
  emit: {};
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$5<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Tabs/TabsPanel.vue.d.ts
interface TabsPanelProps<V = unknown> extends AtomProps {
  /** Value to match with corresponding TabsItem */
  value: V;
  /** Namespace for dependency injection */
  namespace?: string;
}
interface TabsPanelSlotProps {
  /** Whether this panel's tab is currently selected */
  isSelected: boolean;
  /** Attributes to bind to the panel element */
  attrs: {
    'id': string;
    'role': 'tabpanel';
    'aria-labelledby': string;
    'tabindex': 0 | -1;
    'hidden': boolean;
    'data-selected': true | undefined;
  };
}
declare const _default$17: typeof __VLS_export$17;
declare const __VLS_export$17: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$4<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$4<TabsPanelProps<V>> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: TabsPanelSlotProps) => any;
  };
  emit: {};
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$4<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Tabs/index.d.ts
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
 * </script>
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
declare const Tabs: {
  /**
   * Root component that provides tabs context.
   *
   * @see https://0.vuetifyjs.com/components/disclosure/tabs
   */
  Root: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
    slots: {
      default: (props: TabsRootSlotProps) => any;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      namespace?: string | undefined;
      disabled?: boolean | undefined;
      enroll?: boolean | undefined;
      mandatory?: boolean | "force" | undefined;
      circular?: boolean | undefined;
      orientation?: TabsOrientation | undefined;
      activation?: TabsActivation | undefined;
      modelValue?: (T | T[]) | undefined;
      "onUpdate:modelValue"?: ((value: T | T[] | undefined) => any) | undefined;
      "onUpdate:model-value"?: ((value: T | T[]) => any) | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: TabsRootSlotProps) => any;
    };
    emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
  /**
   * Container for tab triggers with tablist role.
   *
   * @see https://0.vuetifyjs.com/components/disclosure/tabs
   */
  List: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<TabsListProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<TabsListProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<TabsListProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: TabsListSlotProps) => any;
    };
  });
  /**
   * Individual tab trigger.
   *
   * @see https://0.vuetifyjs.com/components/disclosure/tabs
   */
  Item: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: {};
    slots: {
      default: (props: TabsItemSlotProps) => any;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      id?: ID | undefined;
      value?: V | undefined;
      disabled?: import("vue").MaybeRefOrGetter<boolean> | undefined;
      namespace?: string | undefined;
      ariaLabel?: string | undefined;
      ariaLabelledby?: string | undefined;
      ariaDescribedby?: string | undefined;
      el?: import("vue").MaybeRefOrGetter<Element | null | undefined>;
      as?: (DOMElement | null) | undefined;
      renderless?: boolean | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: TabsItemSlotProps) => any;
    };
    emit: {};
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
  /**
   * Content panel associated with a tab.
   *
   * @see https://0.vuetifyjs.com/components/disclosure/tabs
   */
  Panel: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: {};
    slots: {
      default: (props: TabsPanelSlotProps) => any;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      value: V;
      namespace?: string | undefined;
      as?: (DOMElement | null) | undefined;
      renderless?: boolean | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: TabsPanelSlotProps) => any;
    };
    emit: {};
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
};
//#endregion
//#region src/components/Theme/Theme.vue.d.ts
interface ThemeProps extends AtomProps {
  theme?: ID;
  namespace?: string;
}
interface ThemeSlotProps {
  attrs: Record<string, unknown>;
  theme: ID | null | undefined;
  isDark: boolean;
}
declare const _default$16: typeof __VLS_export$16;
declare const __VLS_export$16: __VLS_WithSlots$12<import("vue").DefineComponent<ThemeProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ThemeProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: ThemeSlotProps) => any;
}>;
type __VLS_WithSlots$12<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Toggle/ToggleGroup.vue.d.ts
type ToggleOrientation = 'horizontal' | 'vertical';
interface ToggleGroupContext<S extends SingleContext<SingleTicket> | GroupContext<GroupTicket> = SingleContext<SingleTicket> | GroupContext<GroupTicket>> {
  disabled: Ref<boolean>;
  orientation: Ref<ToggleOrientation>;
  selection: S;
}
interface ToggleGroupProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Disables the entire toggle group */
  disabled?: boolean;
  /** Allow multiple toggles active at once */
  multiple?: boolean;
  /** Prevent deselecting the last active toggle */
  mandatory?: boolean | 'force';
  /** Layout direction for ARIA */
  orientation?: ToggleOrientation;
  /** Accessible name for the group */
  label?: string;
  /** ID of element that labels this group */
  ariaLabelledby?: string;
  /** ID of element that describes this group */
  ariaDescribedby?: string;
}
interface ToggleGroupSlotProps {
  /** Whether the toggle group is disabled */
  isDisabled: boolean;
  /** Attributes to bind to the root element */
  attrs: {
    'role': 'group';
    'aria-label': string | undefined;
    'aria-labelledby': string | undefined;
    'aria-describedby': string | undefined;
    'aria-orientation': ToggleOrientation;
    'aria-disabled': boolean;
    'data-orientation': ToggleOrientation;
    'data-disabled': true | undefined;
  };
}
declare const useToggleGroup: (key: string, defaultValue?: ToggleGroupContext<SingleContext<SingleTicket, SingleTicket<SingleTicket>> | GroupContext<GroupTicket, GroupTicket<GroupTicket>>> | undefined) => ToggleGroupContext<SingleContext<SingleTicket, SingleTicket<SingleTicket>> | GroupContext<GroupTicket, GroupTicket<GroupTicket>>>, provideToggleGroup: (key: string, context: ToggleGroupContext<SingleContext<SingleTicket, SingleTicket<SingleTicket>> | GroupContext<GroupTicket, GroupTicket<GroupTicket>>>, app?: import("vue").App) => ToggleGroupContext<SingleContext<SingleTicket, SingleTicket<SingleTicket>> | GroupContext<GroupTicket, GroupTicket<GroupTicket>>>;
declare const _default$15: typeof __VLS_export$15;
declare const __VLS_export$15: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$3<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$3<(ToggleGroupProps & {
    modelValue?: T | T[];
  }) & {
    "onUpdate:modelValue"?: ((value: T | T[] | undefined) => any) | undefined;
    "onUpdate:model-value"?: ((value: T | T[]) => any) | undefined;
  }> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: ToggleGroupSlotProps) => any;
  };
  emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$3<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Toggle/ToggleIndicator.vue.d.ts
interface ToggleIndicatorProps extends AtomProps {
  /** Namespace for context injection from parent Toggle.Root */
  namespace?: string;
}
interface ToggleIndicatorSlotProps {
  /** Whether this toggle is currently pressed */
  isPressed: boolean;
  /** Attributes to bind to the indicator element */
  attrs: {
    'data-state': 'on' | 'off';
    'style': {
      visibility: 'visible' | 'hidden';
    };
  };
}
declare const _default$14: typeof __VLS_export$14;
declare const __VLS_export$14: __VLS_WithSlots$11<import("vue").DefineComponent<ToggleIndicatorProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ToggleIndicatorProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: ToggleIndicatorSlotProps) => any;
}>;
type __VLS_WithSlots$11<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Toggle/ToggleRoot.vue.d.ts
interface ToggleRootContext {
  /** Whether this toggle is currently pressed */
  isPressed: Readonly<Ref<boolean>>;
  /** Whether this toggle is disabled */
  isDisabled: Readonly<Ref<boolean>>;
  /** Toggle the pressed state */
  toggle: () => void;
}
interface ToggleRootProps<V = unknown> extends AtomProps {
  /** Unique identifier (auto-generated if not provided) */
  id?: ID;
  /** Selection key when inside a Toggle.Group */
  value?: V;
  /** Disables this toggle */
  disabled?: boolean;
  /** Namespace for context provision to children (Indicator) */
  namespace?: string;
  /** Namespace for connecting to parent Toggle.Group */
  groupNamespace?: string;
}
interface ToggleRootSlotProps {
  /** Whether this toggle is currently pressed */
  isPressed: boolean;
  /** Whether this toggle is disabled */
  isDisabled: boolean;
  /** Toggle the pressed state */
  toggle: () => void;
  /** Attributes to bind to the toggle element */
  attrs: {
    'type': 'button' | undefined;
    'role': 'button' | undefined;
    'aria-pressed': boolean;
    'aria-disabled': boolean | undefined;
    'disabled': boolean | undefined;
    'tabindex': 0 | -1;
    'data-state': 'on' | 'off';
    'data-disabled': true | undefined;
    'onClick': () => void;
    'onKeydown': ((e: KeyboardEvent) => void) | undefined;
  };
}
declare const useToggleRoot: (key: string, defaultValue?: ToggleRootContext | undefined) => ToggleRootContext, provideToggleRoot: (key: string, context: ToggleRootContext, app?: import("vue").App) => ToggleRootContext;
declare const _default$13: typeof __VLS_export$13;
declare const __VLS_export$13: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$2<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$2<(ToggleRootProps<V> & {
    modelValue?: boolean;
  }) & {
    "onUpdate:modelValue"?: ((value: boolean | undefined) => any) | undefined;
    "onUpdate:model-value"?: ((value: boolean) => any) | undefined;
  }> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: ToggleRootSlotProps) => any;
  };
  emit: ((evt: "update:model-value", value: boolean) => void) & ((event: "update:modelValue", value: boolean | undefined) => void);
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$2<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Toggle/index.d.ts
/**
 * Toggle component with sub-components for pressable on/off buttons.
 *
 * @see https://0.vuetifyjs.com/components/actions/toggle
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 *   import { Toggle } from '@vuetify/v0'
 * </script>
 *
 * <template>
 *   <Toggle.Root>
 *     <Toggle.Indicator>✓</Toggle.Indicator>
 *     Bold
 *   </Toggle.Root>
 * </template>
 * ```
 */
declare const Toggle: {
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
   * </script>
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
  Group: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
    slots: {
      default: (props: ToggleGroupSlotProps) => any;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      namespace?: string | undefined;
      disabled?: boolean | undefined;
      multiple?: boolean | undefined;
      mandatory?: boolean | "force" | undefined;
      orientation?: ToggleOrientation | undefined;
      label?: string | undefined;
      ariaLabelledby?: string | undefined;
      ariaDescribedby?: string | undefined;
      as?: (DOMElement | null) | undefined;
      renderless?: boolean | undefined;
      modelValue?: (T | T[]) | undefined;
      "onUpdate:modelValue"?: ((value: T | T[] | undefined) => any) | undefined;
      "onUpdate:model-value"?: ((value: T | T[]) => any) | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: ToggleGroupSlotProps) => any;
    };
    emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
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
   * </script>
   *
   * <template>
   *   <Toggle.Root>
   *     <Toggle.Indicator>✓</Toggle.Indicator>
   *   </Toggle.Root>
   * </template>
   * ```
   */
  Indicator: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<ToggleIndicatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ToggleIndicatorProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<ToggleIndicatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: ToggleIndicatorSlotProps) => any;
    };
  });
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
   * </script>
   *
   * <template>
   *   <Toggle.Root v-model="bold">Bold</Toggle.Root>
   * </template>
   * ```
   */
  Root: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: ((evt: "update:model-value", value: boolean) => void) & ((event: "update:modelValue", value: boolean | undefined) => void);
    slots: {
      default: (props: ToggleRootSlotProps) => any;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      id?: ID | undefined;
      value?: V | undefined;
      disabled?: boolean | undefined;
      namespace?: string | undefined;
      groupNamespace?: string | undefined;
      as?: (DOMElement | null) | undefined;
      renderless?: boolean | undefined;
      modelValue?: boolean | undefined;
      "onUpdate:modelValue"?: ((value: boolean | undefined) => any) | undefined;
      "onUpdate:model-value"?: ((value: boolean) => any) | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: ToggleRootSlotProps) => any;
    };
    emit: ((evt: "update:model-value", value: boolean) => void) & ((event: "update:modelValue", value: boolean | undefined) => void);
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
};
//#endregion
//#region src/components/Tooltip/TooltipRoot.vue.d.ts
type TooltipState = 'closed' | 'delayed-open' | 'instant-open';
interface TooltipRootProps extends AtomProps {
  /** Delay in ms before opening; falls back to the region delay when omitted */
  openDelay?: number;
  /** Delay in ms before closing; falls back to the region delay when omitted */
  closeDelay?: number;
  /** Whether the tooltip is disabled (also disabled when the region is) */
  disabled?: boolean;
  /** Whether the content stays open while hovered, allowing pointer interaction */
  interactive?: boolean;
  /** CSS anchor-positioning `position-area` for the content (default `top`) */
  positionArea?: string;
  /** CSS anchor-positioning `position-try` fallbacks (default `most-height top`) */
  positionTry?: string;
  /** Dependency-injection namespace (default `v0:tooltip`) */
  namespace?: string;
  /** Positioning engine. @default CSS anchor positioning (`V0PopoverAdapter`) */
  adapter?: PopoverAdapter;
}
interface TooltipRootSlotProps {
  /** Whether the tooltip is currently open */
  isOpen: boolean;
  /** Whether the tooltip is disabled */
  isDisabled: boolean;
}
interface TooltipRootContext {
  /** Unique popover id shared between anchor and content */
  id: string;
  /** Open state, writable via v-model */
  isOpen: ShallowRef<boolean>;
  /** Whether the tooltip is disabled */
  isDisabled: Readonly<Ref<boolean>>;
  /** Whether the content is interactive (hoverable) */
  isInteractive: Readonly<Ref<boolean>>;
  /**
   * Current visual state for CSS `data-state` styling. `delayed-open` marks
   * an open that waited the full open delay; `instant-open` marks one opened
   * immediately through the region skip-window (or focus) — consumers can
   * animate the two reveals differently.
   */
  dataState: Readonly<Ref<TooltipState>>;
  /**
   * Start the open transition. Passing `instant` (or a region skip-window hit)
   * opens immediately, bypassing the open delay.
   */
  open: (instant?: boolean) => void;
  /** Start the close transition */
  close: () => void;
  /** Cancel any pending open/close transition */
  cancel: () => void;
  /** Attributes to bind to the content element */
  contentAttrs: PopoverReturn['contentAttrs'];
  /** Styles to bind to the content element */
  contentStyles: PopoverReturn['contentStyles'];
  /** Styles to bind to the anchor element */
  anchorStyles: PopoverReturn['anchorStyles'];
  /** Attach the anchor element to the popover */
  attach: PopoverReturn['attach'];
  /** Register the activator/reference element with the positioning adapter */
  attachAnchor: PopoverReturn['attachAnchor'];
}
declare const useTooltipRoot: (key: string, defaultValue?: TooltipRootContext | undefined) => TooltipRootContext, provideTooltipRoot: (key: string, context: TooltipRootContext, app?: import("vue").App) => TooltipRootContext;
declare const _default$12: typeof __VLS_export$12;
declare const __VLS_export$12: __VLS_WithSlots$10<import("vue").DefineComponent<TooltipRootProps & {
  modelValue?: boolean;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
  "update:modelValue": (value: boolean) => any;
  "update:model-value": (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<TooltipRootProps & {
  modelValue?: boolean;
}> & Readonly<{
  "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
  "onUpdate:model-value"?: ((value: boolean) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: TooltipRootSlotProps) => any;
}>;
type __VLS_WithSlots$10<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Tooltip/TooltipActivator.vue.d.ts
interface TooltipActivatorProps extends AtomProps {
  namespace?: string;
}
interface TooltipActivatorSlotProps {
  isOpen: boolean;
  isDisabled: boolean;
  attrs: {
    'aria-describedby': string;
    'data-state': TooltipState;
    'aria-disabled': boolean | undefined;
    'disabled': boolean | undefined;
    'type': 'button' | undefined;
    'data-disabled': true | undefined;
    'onPointerenter': (e: PointerEvent) => void;
    'onPointerleave': (e: PointerEvent) => void;
    'onFocus': (e: FocusEvent) => void;
    'onBlur': (e: FocusEvent) => void;
    'onClick': () => void;
    'onKeydown': (e: KeyboardEvent) => void;
  };
  styles: Record<string, string>;
}
declare const _default$11: typeof __VLS_export$11;
declare const __VLS_export$11: __VLS_WithSlots$9<import("vue").DefineComponent<TooltipActivatorProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<TooltipActivatorProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: TooltipActivatorSlotProps) => any;
}>;
type __VLS_WithSlots$9<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Tooltip/TooltipContent.vue.d.ts
interface TooltipContentProps extends AtomProps {
  namespace?: string;
}
interface TooltipContentSlotProps {
  isOpen: boolean;
  isInteractive: boolean;
  attrs: {
    'id': string;
    'role': 'tooltip';
    'popover': '';
    'data-state': TooltipState;
    'data-interactive': true | undefined;
    'onPointerenter': (e: PointerEvent) => void;
    'onPointerleave': (e: PointerEvent) => void;
    'onKeydown': (e: KeyboardEvent) => void;
  };
  styles: Record<string, string>;
}
declare const _default$10: typeof __VLS_export$10;
declare const __VLS_export$10: __VLS_WithSlots$8<import("vue").DefineComponent<TooltipContentProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<TooltipContentProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: TooltipContentSlotProps) => any;
}>;
type __VLS_WithSlots$8<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Tooltip/index.d.ts
/**
 * Tooltip compound component.
 *
 * @see https://0.vuetifyjs.com/components/disclosure/tooltip
 *
 * @example
 * ```vue
 * <script lang="ts" setup>
 *   import { Tooltip } from '@vuetify/v0'
 * </script>
 *
 * <template>
 *   <Tooltip.Root>
 *     <Tooltip.Activator>Hover me</Tooltip.Activator>
 *     <Tooltip.Content>Helpful description</Tooltip.Content>
 *   </Tooltip.Root>
 * </template>
 * ```
 */
declare const Tooltip: {
  /**
   * Root of a single tooltip instance; coordinates delay, state, and anchoring.
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { Tooltip } from '@vuetify/v0'
   * </script>
   *
   * <template>
   *   <Tooltip.Root>
   *     <Tooltip.Activator>Hover me</Tooltip.Activator>
   *     <Tooltip.Content>Helpful description</Tooltip.Content>
   *   </Tooltip.Root>
   * </template>
   * ```
   */
  Root: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<TooltipRootProps & {
      modelValue?: boolean;
    }> & Readonly<{
      "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
      "onUpdate:model-value"?: ((value: boolean) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
      "update:modelValue": (value: boolean) => any;
      "update:model-value": (value: boolean) => any;
    }, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<TooltipRootProps & {
      modelValue?: boolean;
    }> & Readonly<{
      "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
      "onUpdate:model-value"?: ((value: boolean) => any) | undefined;
    }>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<TooltipRootProps & {
    modelValue?: boolean;
  }> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    "onUpdate:model-value"?: ((value: boolean) => any) | undefined;
  }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => any;
    "update:model-value": (value: boolean) => any;
  }, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: TooltipRootSlotProps) => any;
    };
  });
  /**
   * Trigger element that opens the tooltip on hover/focus.
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { Tooltip } from '@vuetify/v0'
   * </script>
   *
   * <template>
   *   <Tooltip.Activator>Hover me</Tooltip.Activator>
   * </template>
   * ```
   */
  Activator: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<TooltipActivatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<TooltipActivatorProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<TooltipActivatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: TooltipActivatorSlotProps) => any;
    };
  });
  /**
   * Floating content shown while the tooltip is open.
   *
   * @example
   * ```vue
   * <script lang="ts" setup>
   *   import { Tooltip } from '@vuetify/v0'
   * </script>
   *
   * <template>
   *   <Tooltip.Content>Helpful description</Tooltip.Content>
   * </template>
   * ```
   */
  Content: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<TooltipContentProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<TooltipContentProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<TooltipContentProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: TooltipContentSlotProps) => any;
    };
  });
};
//#endregion
//#region src/components/Treeview/types.d.ts
interface TreeviewActivatorProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
}
interface TreeviewActivatorSlotProps {
  /** Whether the parent item is expanded */
  isOpen: boolean;
  /** Whether the parent item is a leaf node (no children) */
  isLeaf: boolean;
  /** Whether the parent item is disabled */
  isDisabled: boolean;
  /** Toggle the parent item's open/closed state */
  flip: () => void;
  /** Attributes to bind to the activator element */
  attrs: {
    'role': 'button' | undefined;
    'tabindex': -1;
    'aria-disabled': boolean;
    'data-disabled': true | undefined;
    'data-open': true | undefined;
    'disabled': boolean | undefined;
    'type': 'button' | undefined;
    'onClick': () => void;
  };
}
interface TreeviewCheckboxProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
}
interface TreeviewCheckboxSlotProps {
  /** Whether the item is selected */
  isSelected: boolean;
  /** Whether the item is in a mixed/indeterminate state (some descendants selected) */
  isMixed: boolean;
  /** Whether the item is disabled */
  isDisabled: boolean;
  /** Toggle selection state */
  toggle: () => void;
  /** Select this item */
  select: () => void;
  /** Unselect this item */
  unselect: () => void;
  /** Attributes to bind to the checkbox element */
  attrs: {
    'role': 'checkbox';
    'aria-checked': boolean | 'mixed';
    'aria-disabled': boolean;
    'tabindex': -1;
    'data-selected': true | undefined;
    'data-disabled': true | undefined;
    'data-mixed': true | undefined;
    'onClick': () => void;
  };
}
interface TreeviewCueProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
}
interface TreeviewCueSlotProps {
  /** Whether the parent item is expanded */
  isOpen: boolean;
  /** Whether the parent item is a leaf node (no children) */
  isLeaf: boolean;
  /** Attributes to bind to the cue element */
  attrs: {
    'aria-hidden': true;
    'data-state': 'open' | 'closed';
    'style': {
      visibility: 'visible' | 'hidden';
    };
  };
}
interface TreeviewContentProps {
  /** Namespace for dependency injection */
  namespace?: string;
}
interface TreeviewContentSlotProps {
  /** Whether the parent item is expanded */
  isOpen: boolean;
}
interface TreeviewGroupProps extends AtomProps {}
interface TreeviewGroupSlotProps {
  /** Attributes to bind to the group element */
  attrs: {
    role: 'group';
  };
}
interface TreeviewIndicatorProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
}
interface TreeviewIndicatorSlotProps {
  /** Whether the item is selected */
  isSelected: boolean;
  /** Whether the item is in a mixed/indeterminate state */
  isMixed: boolean;
  /** Attributes to bind to the indicator element */
  attrs: {
    'aria-hidden': true;
    'data-state': 'checked' | 'unchecked' | 'indeterminate';
    'style': {
      visibility: 'visible' | 'hidden';
    };
  };
}
interface TreeviewItemProps<V = unknown> extends AtomProps {
  /** Unique identifier (auto-generated if not provided) */
  id?: ID;
  /**
   * Value associated with this item
   *
   * @example
   * ```vue
   * <template>
   *   <Treeview.Item value="settings">
   *     <Treeview.Activator>Settings</Treeview.Activator>
   *   </Treeview.Item>
   * </template>
   * ```
   */
  value?: V;
  /**
   * Disables this item
   *
   * @example
   * ```vue
   * <template>
   *   <Treeview.Item disabled>
   *     <Treeview.Activator>Locked</Treeview.Activator>
   *   </Treeview.Item>
   * </template>
   * ```
   */
  disabled?: MaybeRefOrGetter<boolean>;
  /** Namespace for dependency injection */
  namespace?: string;
}
interface TreeviewItemSlotProps<V = unknown> {
  /** Unique identifier of this item */
  id: ID;
  /** Value associated with this item */
  value: V | undefined;
  /** Whether this item is selected */
  isSelected: boolean;
  /** Whether this item is in a mixed/indeterminate state */
  isMixed: boolean;
  /** Whether this item is disabled */
  isDisabled: boolean;
  /** Whether this item is expanded */
  isOpen: boolean;
  /** Whether this item is active/highlighted */
  isActive: boolean;
  /** Whether this item is a leaf node (no children) */
  isLeaf: boolean;
  /** Depth level in the tree (0 = root) */
  depth: number;
  /** Select this item */
  select: () => void;
  /** Unselect this item */
  unselect: () => void;
  /** Toggle selection state */
  toggle: () => void;
  /** Toggle open/closed state */
  flip: () => void;
  /** Expand this item */
  open: () => void;
  /** Collapse this item */
  close: () => void;
  /** Activate/highlight this item */
  activate: () => void;
  /** Deactivate/unhighlight this item */
  deactivate: () => void;
  /** Attributes to bind to the item element */
  attrs: {
    'role': 'treeitem';
    'aria-disabled': boolean;
    'aria-expanded': boolean | undefined;
    'aria-level': number;
    'aria-posinset': number;
    'aria-current': 'true' | undefined;
    'aria-selected': boolean;
    'aria-setsize': number;
    'data-active': true | undefined;
    'data-disabled': true | undefined;
    'data-open': true | undefined;
    'data-selected': true | undefined;
    'tabindex': 0 | -1 | undefined;
    'style': {
      '--v0-treeview-depth': number;
    };
  };
}
interface TreeviewListProps extends AtomProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /** Whether multiple items can be selected (sets aria-multiselectable) */
  multiselectable?: boolean;
  /** Accessible label for the tree */
  label?: string;
}
interface TreeviewListSlotProps {
  /** Attributes to bind to the list element */
  attrs: {
    'role': 'tree';
    'aria-multiselectable': boolean;
    'aria-label': string | undefined;
    'onKeydown': (e: KeyboardEvent) => void;
    'onFocusin': (e: FocusEvent) => void;
  };
}
interface TreeviewSelectAllProps extends AtomProps {
  /**
   * Optional display label (passed through to slot and aria-label)
   *
   * @example
   * ```vue
   * <template>
   *   <Treeview.SelectAll label="Select all items" />
   * </template>
   * ```
   */
  label?: string;
  /** Disables this checkbox */
  disabled?: boolean;
  /** Namespace for dependency injection */
  namespace?: string;
}
interface TreeviewSelectAllSlotProps {
  /** Optional display label */
  label?: string;
  /** Whether all items are selected */
  isAllSelected: boolean;
  /** Whether some but not all items are selected */
  isMixed: boolean;
  /** Whether this checkbox is disabled */
  isDisabled: boolean;
  /** Select all items */
  selectAll: () => void;
  /** Unselect all items */
  unselectAll: () => void;
  /** Toggle between all selected and none selected */
  toggleAll: () => void;
  /** Attributes to bind to the select-all element */
  attrs: {
    'role': 'checkbox';
    'aria-checked': boolean | 'mixed';
    'aria-disabled': boolean;
    'aria-label': string | undefined;
    'tabindex': 0 | undefined;
    'data-state': 'checked' | 'unchecked' | 'indeterminate';
    'data-disabled': true | undefined;
    'onClick': () => void;
    'onKeydown': (e: KeyboardEvent) => void;
  };
}
interface TreeviewRootProps {
  /** Namespace for dependency injection */
  namespace?: string;
  /**
   * Disables the entire tree
   *
   * @example
   * ```vue
   * <template>
   *   <Treeview.Root disabled>
   *     <Treeview.List>
   *       <Treeview.Item>
   *         <Treeview.Activator>Disabled item</Treeview.Activator>
   *       </Treeview.Item>
   *     </Treeview.List>
   *   </Treeview.Root>
   * </template>
   * ```
   */
  disabled?: boolean;
  /**
   * Auto-select non-disabled items on registration
   *
   * @example
   * ```vue
   * <template>
   *   <Treeview.Root enroll multiple>
   *     <Treeview.List>
   *       <Treeview.Item value="a">A</Treeview.Item>
   *       <Treeview.Item value="b">B</Treeview.Item>
   *     </Treeview.List>
   *   </Treeview.Root>
   * </template>
   * ```
   */
  enroll?: boolean;
  /**
   * Prevents deselecting the last selected item
   *
   * @example
   * ```vue
   * <template>
   *   <Treeview.Root mandatory>
   *     <Treeview.List>
   *       <Treeview.Item value="a">Always one selected</Treeview.Item>
   *       <Treeview.Item value="b">Can't deselect last</Treeview.Item>
   *     </Treeview.List>
   *   </Treeview.Root>
   * </template>
   * ```
   */
  mandatory?: boolean | 'force';
  /**
   * Allows selecting multiple items
   *
   * @example
   * ```vue
   * <template>
   *   <Treeview.Root multiple>
   *     <Treeview.List>
   *       <Treeview.Item value="a">
   *         <Treeview.Checkbox />
   *         Option A
   *       </Treeview.Item>
   *       <Treeview.Item value="b">
   *         <Treeview.Checkbox />
   *         Option B
   *       </Treeview.Item>
   *     </Treeview.List>
   *   </Treeview.Root>
   * </template>
   * ```
   */
  multiple?: boolean;
  /**
   * Controls how nodes expand: 'multiple' (default) or 'single' (accordion)
   *
   * @example
   * ```vue
   * <template>
   *   <Treeview.Root open="single">
   *     <Treeview.List>
   *       <Treeview.Item>
   *         <Treeview.Activator>Only one open at a time</Treeview.Activator>
   *       </Treeview.Item>
   *     </Treeview.List>
   *   </Treeview.Root>
   * </template>
   * ```
   */
  open?: NestedOpenMode;
  /**
   * Auto-expand all nodes on registration
   *
   * @example
   * ```vue
   * <template>
   *   <Treeview.Root open-all>
   *     <Treeview.List>
   *       <Treeview.Item>
   *         <Treeview.Activator>Parent</Treeview.Activator>
   *         <Treeview.Content>
   *           <Treeview.Item>
   *             <Treeview.Activator>Child (visible on mount)</Treeview.Activator>
   *           </Treeview.Item>
   *         </Treeview.Content>
   *       </Treeview.Item>
   *     </Treeview.List>
   *   </Treeview.Root>
   * </template>
   * ```
   */
  openAll?: boolean;
  /**
   * Opening a node also opens all its ancestors
   *
   * @example
   * ```vue
   * <template>
   *   <Treeview.Root reveal>
   *     <Treeview.List>...</Treeview.List>
   *   </Treeview.Root>
   * </template>
   * ```
   */
  reveal?: boolean;
  /**
   * Controls how selection cascades: 'cascade' (default), 'independent', or 'leaf'
   *
   * @example
   * ```vue
   * <template>
   *   <!-- Parent selection selects all descendants -->
   *   <Treeview.Root selection="cascade" multiple>...</Treeview.Root>
   *
   *   <!-- Each node selected independently -->
   *   <Treeview.Root selection="independent" multiple>...</Treeview.Root>
   *
   *   <!-- Only leaf nodes can be selected -->
   *   <Treeview.Root selection="leaf" multiple>...</Treeview.Root>
   * </template>
   * ```
   */
  selection?: NestedSelectionMode;
  /**
   * Controls active/highlight mode: 'single' (default) or 'multiple'
   *
   * @example
   * ```vue
   * <template>
   *   <Treeview.Root active="multiple">
   *     <Treeview.List>...</Treeview.List>
   *   </Treeview.Root>
   * </template>
   * ```
   */
  active?: NestedActiveMode;
}
interface TreeviewRootSlotProps {
  /** Whether the tree is disabled */
  isDisabled: boolean;
  /** Whether no items are selected */
  isNoneSelected: boolean;
  /** Whether all items are selected */
  isAllSelected: boolean;
  /** Whether some but not all items are selected */
  isMixed: boolean;
  /** Select one or more items by ID */
  select: (id: ID | ID[]) => void;
  /** Unselect one or more items by ID */
  unselect: (id: ID | ID[]) => void;
  /** Toggle selection of one or more items by ID */
  toggle: (id: ID | ID[]) => void;
  /** Select all items */
  selectAll: () => void;
  /** Unselect all items */
  unselectAll: () => void;
  /** Expand all non-leaf nodes */
  expandAll: () => void;
  /** Collapse all nodes */
  collapseAll: () => void;
}
//#endregion
//#region src/components/Treeview/TreeviewActivator.vue.d.ts
type __VLS_Slots$6 = {
  default: (props: TreeviewActivatorSlotProps) => any;
};
declare const __VLS_base$6: import("vue").DefineComponent<TreeviewActivatorProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<TreeviewActivatorProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export$9: __VLS_WithSlots$7<typeof __VLS_base$6, __VLS_Slots$6>;
declare const _default$9: typeof __VLS_export$9;
type __VLS_WithSlots$7<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Treeview/TreeviewCheckbox.vue.d.ts
type __VLS_Slots$5 = {
  default: (props: TreeviewCheckboxSlotProps) => any;
};
declare const __VLS_base$5: import("vue").DefineComponent<TreeviewCheckboxProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<TreeviewCheckboxProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export$8: __VLS_WithSlots$6<typeof __VLS_base$5, __VLS_Slots$5>;
declare const _default$8: typeof __VLS_export$8;
type __VLS_WithSlots$6<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Treeview/TreeviewContent.vue.d.ts
type __VLS_Slots$4 = {
  default: (props: TreeviewContentSlotProps) => any;
};
declare const __VLS_base$4: import("vue").DefineComponent<TreeviewContentProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<TreeviewContentProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export$7: __VLS_WithSlots$5<typeof __VLS_base$4, __VLS_Slots$4>;
declare const _default$7: typeof __VLS_export$7;
type __VLS_WithSlots$5<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Treeview/TreeviewCue.vue.d.ts
type __VLS_Slots$3 = {
  default: (props: TreeviewCueSlotProps) => any;
};
declare const __VLS_base$3: import("vue").DefineComponent<TreeviewCueProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<TreeviewCueProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export$6: __VLS_WithSlots$4<typeof __VLS_base$3, __VLS_Slots$3>;
declare const _default$6: typeof __VLS_export$6;
type __VLS_WithSlots$4<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Treeview/TreeviewGroup.vue.d.ts
type __VLS_Slots$2 = {
  default: (props: TreeviewGroupSlotProps) => any;
};
declare const __VLS_base$2: import("vue").DefineComponent<TreeviewGroupProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<TreeviewGroupProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export$5: __VLS_WithSlots$3<typeof __VLS_base$2, __VLS_Slots$2>;
declare const _default$5: typeof __VLS_export$5;
type __VLS_WithSlots$3<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Treeview/TreeviewIndicator.vue.d.ts
type __VLS_Slots$1 = {
  default: (props: TreeviewIndicatorSlotProps) => any;
};
declare const __VLS_base$1: import("vue").DefineComponent<TreeviewIndicatorProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<TreeviewIndicatorProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export$4: __VLS_WithSlots$2<typeof __VLS_base$1, __VLS_Slots$1>;
declare const _default$4: typeof __VLS_export$4;
type __VLS_WithSlots$2<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Treeview/TreeviewItem.vue.d.ts
interface TreeviewItemContext {
  ticket: NestedTicket;
  isDisabled: Readonly<Ref<boolean>>;
  hasContent: Ref<boolean>;
}
declare const useTreeviewItem: (key: string, defaultValue?: TreeviewItemContext | null | undefined) => TreeviewItemContext | null, provideTreeviewItem: (key: string, context: TreeviewItemContext | null, app?: import("vue").App) => TreeviewItemContext | null;
declare const _default$3: typeof __VLS_export$3;
declare const __VLS_export$3: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal$1<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal$1<TreeviewItemProps<V>> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: TreeviewItemSlotProps<V>) => any;
  };
  emit: {};
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal$1<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Treeview/TreeviewList.vue.d.ts
type TreeviewListContext = RovingFocusReturn;
declare const useTreeviewList: (key: string, defaultValue?: RovingFocusReturn | null | undefined) => RovingFocusReturn | null, provideTreeviewList: (key: string, context: RovingFocusReturn | null, app?: import("vue").App) => RovingFocusReturn | null;
declare const _default$2: typeof __VLS_export$2;
declare const __VLS_export$2: __VLS_WithSlots$1<import("vue").DefineComponent<TreeviewListProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<TreeviewListProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
  default: (props: TreeviewListSlotProps) => any;
}>;
type __VLS_WithSlots$1<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Treeview/TreeviewRoot.vue.d.ts
type TreeviewRootContext = NestedContext<NestedTicket>;
declare const useTreeviewRoot: (key: string, defaultValue?: TreeviewRootContext | undefined) => TreeviewRootContext, provideTreeviewRoot: (key: string, context: TreeviewRootContext, app?: import("vue").App) => TreeviewRootContext;
declare const _default$1: typeof __VLS_export$1;
declare const __VLS_export$1: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: import("vue").PublicProps & __VLS_PrettifyLocal<(TreeviewRootProps & {
    modelValue?: T | T[];
  }) & {
    "onUpdate:modelValue"?: ((value: T | T[] | undefined) => any) | undefined;
    "onUpdate:model-value"?: ((value: T | T[]) => any) | undefined;
  }> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default: (props: TreeviewRootSlotProps) => any;
  };
  emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
}>) => import("vue").VNode & {
  __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
type __VLS_PrettifyLocal<T> = (T extends any ? { [K in keyof T]: T[K]; } : { [K in keyof T as K]: T[K]; }) & {};
//#endregion
//#region src/components/Treeview/TreeviewSelectAll.vue.d.ts
type __VLS_Slots = {
  default: (props: TreeviewSelectAllSlotProps) => any;
};
declare const __VLS_base: import("vue").DefineComponent<TreeviewSelectAllProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<TreeviewSelectAllProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/components/Treeview/index.d.ts
/**
 * Treeview component with sub-components for hierarchical data.
 *
 * @see https://0.vuetifyjs.com/components/disclosure/treeview
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 *   import { Treeview } from '@vuetify/v0'
 * </script>
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
declare const Treeview: {
  /**
   * Root component that creates and provides the nested context.
   *
   * @see https://0.vuetifyjs.com/components/disclosure/treeview
   *
   * @example
   * ```vue
   * <script setup lang="ts">
   *   import { Treeview } from '@vuetify/v0'
   * </script>
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
  Root: <T = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
    slots: {
      default: (props: TreeviewRootSlotProps) => any;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      namespace?: string | undefined;
      disabled?: boolean | undefined;
      enroll?: boolean | undefined;
      mandatory?: boolean | "force" | undefined;
      multiple?: boolean | undefined;
      open?: NestedOpenMode | undefined;
      openAll?: boolean | undefined;
      reveal?: boolean | undefined;
      selection?: NestedSelectionMode | undefined;
      active?: NestedActiveMode | undefined;
      modelValue?: (T | T[]) | undefined;
      "onUpdate:modelValue"?: ((value: T | T[] | undefined) => any) | undefined;
      "onUpdate:model-value"?: ((value: T | T[]) => any) | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: TreeviewRootSlotProps) => any;
    };
    emit: ((evt: "update:model-value", value: T | T[]) => void) & ((event: "update:modelValue", value: T | T[] | undefined) => void);
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
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
  List: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<TreeviewListProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<TreeviewListProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<TreeviewListProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: TreeviewListSlotProps) => any;
    };
  });
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
  Item: <V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
    emit: {};
    slots: {
      default: (props: TreeviewItemSlotProps<V>) => any;
    };
    attrs: any;
  }, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & {
      id?: ID | undefined;
      value?: V | undefined;
      disabled?: import("vue").MaybeRefOrGetter<boolean> | undefined;
      namespace?: string | undefined;
      as?: (DOMElement | null) | undefined;
      renderless?: boolean | undefined;
    } & (typeof globalThis extends {
      __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
      default: (props: TreeviewItemSlotProps<V>) => any;
    };
    emit: {};
  }>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
  };
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
  Activator: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<TreeviewActivatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<TreeviewActivatorProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<TreeviewActivatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: TreeviewActivatorSlotProps) => any;
    };
  });
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
  Content: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<TreeviewContentProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<TreeviewContentProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<TreeviewContentProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: TreeviewContentSlotProps) => any;
    };
  });
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
  Cue: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<TreeviewCueProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<TreeviewCueProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<TreeviewCueProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: TreeviewCueSlotProps) => any;
    };
  });
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
  Group: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<TreeviewGroupProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<TreeviewGroupProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<TreeviewGroupProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: TreeviewGroupSlotProps) => any;
    };
  });
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
  Checkbox: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<TreeviewCheckboxProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<TreeviewCheckboxProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<TreeviewCheckboxProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: TreeviewCheckboxSlotProps) => any;
    };
  });
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
  Indicator: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<TreeviewIndicatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<TreeviewIndicatorProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<TreeviewIndicatorProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: TreeviewIndicatorSlotProps) => any;
    };
  });
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
  SelectAll: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<TreeviewSelectAllProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<TreeviewSelectAllProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & import("vue").ComponentOptionsBase<Readonly<TreeviewSelectAllProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
      default: (props: TreeviewSelectAllSlotProps) => any;
    };
  });
};
//#endregion
export { useTooltipRoot as $, usePaginationRoot as $a, DataTableRootProps as $c, ButtonRootSlotProps as $d, AvatarGroupPriority as $f, _default$65 as $i, _default$131 as $l, SliderTrackSlotProps as $n, InputErrorProps as $o, provideAlertDialogContext as $p, Rating as $r, _default$105 as $s, _default$24 as $t, CheckboxSelectAllSlotProps as $u, TreeviewGroupSlotProps as A, PaginationNextProps as Aa, useDialogContext as Ac, CarouselNextSlotProps as Ad, _default$168 as Af, provideRadioGroup as Ai, DataGridEmptyProps as Al, provideSnackbarRootContext as An, NumberFieldIncrementSlotProps as Ao, AlertDialogCloseProps as Ap, SelectItemSlotProps as Ar, GroupRootSlotProps as As, TabsActivation as At, ComboboxRootProps as Au, TreeviewSelectAllSlotProps as B, PaginationFirstSlotProps as Ba, _default$115 as Bc, _default$157 as Bd, BreadcrumbsRootProps as Bf, _default$61 as Bi, provideDataGridRow as Bl, SnackbarPortalSlotProps as Bn, useNumberFieldRoot as Bo, AlertDialogTitleSlotProps as Bp, _default$48 as Br, _default$101 as Bs, SwitchTrackProps as Bt, CollapsibleCueSlotProps as Bu, TreeviewCheckboxProps as C, Pagination as Ca, DialogActivatorSlotProps as Cc, CarouselProgressSlotProps as Cd, BreadcrumbsActivatorSlotProps as Cf, _default$57 as Ci, SplitterPendingIntent as Cl, SnackbarCloseProps as Cn, NumberFieldScrubProps as Co, _default$178 as Cp, provideSelectionRoot as Cr, provideImageRoot as Cs, _default$17 as Ct, _default$138 as Cu, TreeviewCueProps as D, PaginationLastProps as Da, DialogRootSlotProps as Dc, CarouselIndicatorSlotProps as Dd, _default$167 as Df, RadioGroupSlotProps as Di, _default$124 as Dl, SnackbarRootProps as Dn, NumberFieldDecrementSlotProps as Do, AlertDialogActionProps as Dp, SelectPlaceholderSlotProps as Dr, GroupItemSlotProps as Ds, TabsListProps as Dt, ComboboxActivatorProps as Du, TreeviewContentSlotProps as E, _default$71 as Ea, DialogRootProps as Ec, CarouselIndicatorProps as Ed, BreadcrumbsEllipsisSlotProps as Ef, RadioGroupProps as Ei, SplitterRootSlotProps as El, SnackbarRootContext as En, NumberFieldDecrementProps as Eo, AlertDialogActionEvent as Ep, SelectPlaceholderProps as Er, GroupItemProps as Es, _default$18 as Et, _default$139 as Eu, TreeviewListProps as F, _default$74 as Fa, DataTableCellProps as Fc, CarouselItemProps as Fd, BreadcrumbsItemSlotProps as Ff, ProgressLabelProps as Fi, _default$126 as Fl, _default$33 as Fn, NumberFieldRootContext as Fo, _default$181 as Fp, SelectContentProps as Fr, FormSlotProps as Fs, TabsTicket as Ft, Collapsible as Fu, TooltipActivatorProps as G, PaginationRootProps as Ga, DataTableColumnSlotProps as Gc, CarouselRootSlotProps as Gd, BreadcrumbsRootContext as Gf, ProgressFillSlotProps as Gi, DataGridColumnProps as Gl, SliderThumbProps as Gn, InputRootContext as Go, _default$184 as Gp, SelectRootProps as Gr, ExpansionPanelActivatorSlotProps as Gs, _default$22 as Gt, CollapsibleContext as Gu, TooltipContentProps as H, PaginationItemProps as Ha, DataTableBodySlotProps as Hc, CarouselOrientation as Hd, _default$172 as Hf, ProgressBufferSlotProps as Hi, DataGridBodyProps as Hl, Slider as Hn, LocaleSlotProps as Ho, AlertDialogContentEmits as Hp, SelectActivatorSlotProps as Hr, ExpansionPanelCueSlotProps as Hs, _default$21 as Ht, CollapsibleActivatorProps as Hu, TreeviewListSlotProps as I, PaginationPrevProps as Ia, DataTableCellSlotProps as Ic, CarouselItemSlotProps as Id, _default$170 as If, ProgressLabelSlotProps as Ii, DataGridRowContext as Il, provideSnackbarQueueContext as In, NumberFieldRootProps as Io, AlertDialogDescriptionProps as Ip, SelectContentSlotProps as Ir, _default$100 as Is, _default$20 as It, CollapsibleContentProps as Iu, TooltipRootContext as J, providePaginationControls as Ja, DataTableHeaderSlotProps as Jc, provideCarouselRoot as Jd, Avatar as Jf, ProgressTrackSlotProps as Ji, DataGridHeaderProps as Jl, _default$36 as Jn, ValidateEvent as Jo, _default$185 as Jp, provideSelectContext as Jr, ExpansionPanelHeaderSlotProps as Js, _default$23 as Jt, _default$145 as Ju, TooltipActivatorSlotProps as K, PaginationRootSlotProps as Ka, _default$117 as Kc, CarouselTicket as Kd, BreadcrumbsTicket as Kf, _default$63 as Ki, DataGridColumnSlotProps as Kl, SliderThumbSlotProps as Kn, InputRootProps as Ko, AlertDialogActivatorProps as Kp, SelectRootSlotProps as Kr, _default$103 as Ks, SwitchSelectAllProps as Kt, CollapsibleRootProps as Ku, TreeviewRootProps as L, PaginationPrevSlotProps as La, _default$114 as Lc, _default$156 as Ld, BreadcrumbsListProps as Lf, _default$60 as Li, DataGridRowProps as Ll, useSnackbarQueueContext as Ln, NumberFieldRootSlotProps as Lo, AlertDialogDescriptionSlotProps as Lp, _default$47 as Lr, ExpansionPanel as Ls, provideTabsRoot as Lt, CollapsibleContentSlotProps as Lu, TreeviewIndicatorSlotProps as M, _default$73 as Ma, DataTableEmptyProps as Mc, CarouselPreviousProps as Md, BreadcrumbsPageSlotProps as Mf, Progress as Mi, _default$125 as Ml, SnackbarQueueContext as Mn, NumberFieldControlProps as Mo, _default$180 as Mp, SelectCueProps as Mr, provideGroupRoot as Ms, TabsOrientation as Mt, _default$141 as Mu, TreeviewItemProps as N, PaginationEllipsisProps as Na, DataTableEmptySlotProps as Nc, CarouselPreviousSlotProps as Nd, _default$169 as Nf, ProgressHiddenInputProps as Ni, DataGridCellProps as Nl, SnackbarQueueProps as Nn, NumberFieldControlSlotProps as No, AlertDialogCancelProps as Np, SelectCueSlotProps as Nr, useGroupRoot as Ns, TabsRootProps as Nt, provideComboboxContext as Nu, TreeviewCueSlotProps as O, PaginationLastSlotProps as Oa, _default$112 as Oc, _default$153 as Od, BreadcrumbsDividerProps as Of, RadioTicket as Oi, provideSplitterRoot as Ol, SnackbarRootSlotProps as On, _default$85 as Oo, AlertDialogActionSlotProps as Op, _default$44 as Or, _default$98 as Os, TabsListSlotProps as Ot, ComboboxActivatorSlotProps as Ou, TreeviewItemSlotProps as P, PaginationEllipsisSlotProps as Pa, _default$113 as Pc, _default$155 as Pd, BreadcrumbsItemProps as Pf, _default$59 as Pi, DataGridCellSlotProps as Pl, SnackbarQueueSlotProps as Pn, _default$87 as Po, AlertDialogCancelSlotProps as Pp, _default$46 as Pr, FormProps as Ps, TabsRootSlotProps as Pt, useComboboxContext as Pu, provideTooltipRoot as Q, usePaginationItems as Qa, _default$119 as Qc, ButtonRootProps as Qd, AvatarGroupContext as Qf, ProgressRootSlotProps as Qi, DataGridTableSlotProps as Ql, SliderTrackProps as Qn, useInputRoot as Qo, _default$186 as Qp, _default$51 as Qr, ExpansionPanelRootSlotProps as Qs, SwitchState as Qt, CheckboxSelectAllProps as Qu, TreeviewRootSlotProps as R, _default$75 as Ra, DataTableRowProps as Rc, CarouselViewportProps as Rd, BreadcrumbsListSlotProps as Rf, ProgressValueProps as Ri, DataGridRowSlotProps as Rl, SnackbarPortalContext as Rn, _default$88 as Ro, _default$182 as Rp, SelectValueProps as Rr, ExpansionPanelContentProps as Rs, useTabsRoot as Rt, _default$142 as Ru, TreeviewActivatorSlotProps as S, usePopoverContext as Sa, DialogActivatorProps as Sc, CarouselProgressProps as Sd, BreadcrumbsActivatorProps as Sf, RadioHiddenInputProps as Si, SplitterPanelTicket as Sl, _default$30 as Sn, _default$83 as So, AspectRatioSlotProps as Sp, _default$43 as Sr, _default$97 as Ss, TabsPanelSlotProps as St, ComboboxCueSlotProps as Su, TreeviewContentProps as T, PaginationStatusSlotProps as Ta, DialogContext as Tc, CarouselIndicatorItem as Td, BreadcrumbsEllipsisProps as Tf, RadioGroupContext as Ti, SplitterRootProps as Tl, _default$31 as Tn, _default$84 as To, AlertDialogActionEmits as Tp, Select as Tr, Group as Ts, TabsItemSlotProps as Tt, ComboboxControlSlotProps as Tu, TooltipContentSlotProps as U, PaginationItemSlotProps as Ua, _default$116 as Uc, CarouselPartTicket as Ud, provideBreadcrumbsRoot as Uf, _default$62 as Ui, DataGridBodySlotProps as Ul, SliderHiddenInputProps as Un, _default$89 as Uo, AlertDialogContentProps as Up, _default$49 as Ur, _default$102 as Us, SwitchThumbProps as Ut, CollapsibleActivatorSlotProps as Uu, Tooltip as V, _default$76 as Va, DataTableBodyProps as Vc, CarouselContext as Vd, BreadcrumbsRootSlotProps as Vf, ProgressBufferProps as Vi, useDataGridRow as Vl, _default$34 as Vn, LocaleProps as Vo, _default$183 as Vp, SelectActivatorProps as Vr, ExpansionPanelCueProps as Vs, SwitchTrackSlotProps as Vt, _default$143 as Vu, _default$10 as W, _default$77 as Wa, DataTableColumnProps as Wc, CarouselRootProps as Wd, useBreadcrumbsRoot as Wf, ProgressFillProps as Wi, _default$128 as Wl, _default$35 as Wn, Input as Wo, AlertDialogContentSlotProps as Wp, SelectContext as Wr, ExpansionPanelActivatorProps as Ws, SwitchThumbSlotProps as Wt, _default$144 as Wu, TooltipRootSlotProps as X, providePaginationRoot as Xa, DataTableTableProps as Xc, Button as Xd, AvatarIndicatorSlotProps as Xf, ProgressRootContext as Xi, _default$130 as Xl, SliderRangeSlotProps as Xn, _default$90 as Xo, AlertDialogRootProps as Xp, ScrimProps as Xr, ExpansionPanelRootContext as Xs, SwitchRootProps as Xt, useCollapsible as Xu, TooltipRootProps as Y, providePaginationItems as Ya, _default$118 as Yc, useCarouselRoot as Yd, AvatarIndicatorProps as Yf, _default$64 as Yi, DataGridHeaderSlotProps as Yl, SliderRangeProps as Yn, ValidateOn as Yo, AlertDialogContext as Yp, useSelectContext as Yr, _default$104 as Ys, SwitchRootContext as Yt, provideCollapsible as Yu, _default$12 as Z, usePaginationControls as Za, DataTableTableSlotProps as Zc, ButtonRootContext as Zd, _default$173 as Zf, ProgressRootProps as Zi, DataGridTableProps as Zl, _default$37 as Zn, provideInputRoot as Zo, AlertDialogRootSlotProps as Zp, ScrimSlotProps as Zr, ExpansionPanelRootProps as Zs, SwitchRootSlotProps as Zt, Checkbox as Zu, _default$6 as _, PopoverContext as _a, _default$109 as _c, useCheckboxGroup as _d, ButtonContentSlotProps as _f, RadioRootSlotProps as _i, _default$123 as _l, useStepRoot as _n, NumberFieldErrorProps as _o, AvatarTicket as _p, SelectionItemProps as _r, ImageImgSlotProps as _s, ThemeProps as _t, _default$136 as _u, provideTreeviewRoot as a, _default$66 as aa, _default$106 as ac, CheckboxRootProps as ad, _default$160 as af, RatingRootContext as ai, DataGridHandleProps as al, AlertTitleProps as am, SwitchGroupSlotProps as an, OverflowItemSlotProps as ao, provideAvatarGroup as ap, provideSliderRoot as ar, InputControlProps as as, provideToggleRoot as at, Combobox as au, _default$9 as b, _default$70 as ba, DialogContentSlotProps as bc, CarouselLiveRegionSlotProps as bd, BreadcrumbsLinkProps as bf, provideRadioRoot as bi, SplitterOrientation as bl, _default$29 as bn, NumberFieldDescriptionProps as bo, useAvatarRoot as bp, SelectionRootProps as br, ImageRootProps as bs, Tabs as bt, _default$137 as bu, _default$2 as c, _default$67 as ca, Dialog as cc, _default$148 as cd, _default$161 as cf, _default$54 as ci, _default$121 as cl, AlertRootProps as cm, useSwitchGroup as cn, OverflowRootSlotProps as co, AvatarFallbackSlotProps as cp, SingleItemProps as cr, Image as cs, ToggleIndicatorSlotProps as ct, _default$133 as cu, TreeviewItemContext as d, PopoverContentProps as da, _default$107 as dc, CheckboxHiddenInputProps as dd, ButtonGroupProps as df, Radio as di, SplitterHandleSlotProps as dl, _default$189 as dm, StepItemSlotProps as dn, useOverflowRoot as do, AvatarImageProps as dp, SingleRootProps as dr, _default$94 as ds, ToggleGroupProps as dt, _default$134 as du, provideProgressRoot as ea, provideExpansionPanelRoot as ec, _default$146 as ed, _default$159 as ef, RatingHiddenInputProps as ei, DataTableRootSlotProps as el, useAlertDialogContext as em, provideSwitchRoot as en, Overflow as eo, AvatarGroupProps as ep, _default$38 as er, InputErrorSlotProps as es, Toggle as et, DataGridRootProps as eu, _default$3 as f, PopoverContentSlotProps as fa, DialogDescriptionProps as fc, _default$149 as fd, ButtonGroupSlotProps as ff, RadioIndicatorProps as fi, SplitterHandleState as fl, AtomExpose as fm, _default$27 as fn, OverflowPriority as fo, AvatarImageSlotProps as fp, SingleRootSlotProps as fr, ImagePlaceholderProps as fs, ToggleGroupSlotProps as ft, ComboboxEmptyProps as fu, _default$5 as g, _default$69 as ga, DialogTitleSlotProps as gc, provideCheckboxGroup as gd, ButtonContentProps as gf, RadioRootProps as gi, SplitterPanelSlotProps as gl, provideStepRoot as gn, NumberField as go, AvatarRootSlotProps as gp, Selection as gr, ImageImgProps as gs, useToggleGroup as gt, ComboboxItemSlotProps as gu, _default$4 as h, PopoverActivatorSlotProps as ha, DialogTitleProps as hc, _default$150 as hd, useButtonGroup as hf, RadioRootContext as hi, SplitterPanelProps as hl, _default$190 as hm, _default$28 as hn, OverflowTicketInput as ho, AvatarRootProps as hp, useSingleRoot as hr, ImageImgEmits as hs, provideToggleGroup as ht, ComboboxItemProps as hu, _default$1 as i, PresenceSlotProps as ia, ExpansionPanelOptionsContext as ic, CheckboxRootContext as id, ButtonLoadingSlotProps as if, _default$53 as ii, DataGrid as il, _default$187 as im, SwitchGroupProps as in, OverflowItemProps as io, _default$174 as ip, _default$39 as ir, _default$92 as is, _default$13 as it, useDataGridRoot as iu, TreeviewIndicatorProps as j, PaginationNextSlotProps as ja, DataTable as jc, _default$154 as jd, BreadcrumbsPageProps as jf, useRadioGroup as ji, DataGridEmptySlotProps as jl, useSnackbarRootContext as jn, _default$86 as jo, AlertDialogCloseSlotProps as jp, _default$45 as jr, _default$99 as js, TabsContext as jt, ComboboxRootSlotProps as ju, TreeviewGroupProps as k, _default$72 as ka, provideDialogContext as kc, CarouselNextProps as kd, BreadcrumbsDividerSlotProps as kf, _default$58 as ki, useSplitterRoot as kl, _default$32 as kn, NumberFieldIncrementProps as ko, _default$179 as kp, SelectItemProps as kr, GroupRootProps as ks, _default$19 as kt, _default$140 as ku, provideTreeviewList as l, Popover as la, DialogCloseProps as lc, provideCheckboxRoot as ld, ButtonHiddenInputProps as lf, provideRatingRoot as li, Splitter as ll, AlertRootSlotAttrs as lm, Step as ln, _default$81 as lo, _default$175 as lp, SingleItemSlotProps as lr, ImageFallbackProps as ls, _default$14 as lt, ComboboxDescriptionProps as lu, useTreeviewItem as m, PopoverActivatorProps as ma, _default$108 as mc, CheckboxGroupSlotProps as md, provideButtonGroup as mf, _default$55 as mi, SplitterPanelExpose as ml, AtomSlots as mm, StepRootSlotProps as mn, OverflowTicket as mo, AvatarContext as mp, provideSingleRoot as mr, _default$95 as ms, _default$15 as mt, _default$135 as mu, _default as n, PresenceAttrs as na, ExpansionPanelGroupProps as nc, CheckboxIndicatorSlotProps as nd, useButtonRoot as nf, RatingItemProps as ni, provideDataTableRoot as nl, AlertDescriptionProps as nm, SwitchHiddenInputProps as nn, OverflowIndicatorSlotProps as no, AvatarGroupTicket as np, SliderRootProps as nr, InputDescriptionProps as ns, ToggleRootProps as nt, _default$132 as nu, useTreeviewRoot as o, PortalProps as oa, provideExpansionPanelGroup as oc, CheckboxRootSlotProps as od, ButtonIconProps as of, RatingRootProps as oi, DataGridHandleSlotProps as ol, AlertTitleSlotProps as om, _default$26 as on, _default$80 as oo, useAvatarGroup as op, useSliderRoot as or, InputControlSlotProps as os, useToggleRoot as ot, ComboboxErrorProps as ou, provideTreeviewItem as p, _default$68 as pa, DialogDescriptionSlotProps as pc, CheckboxGroupProps as pd, _default$163 as pf, RadioIndicatorSlotProps as pi, _default$122 as pl, AtomProps as pm, StepRootProps as pn, OverflowRootContext as po, _default$176 as pp, _default$41 as pr, ImagePlaceholderSlotProps as ps, ToggleOrientation as pt, ComboboxEmptySlotProps as pu, _default$11 as q, _default$78 as qa, DataTableHeaderProps as qc, _default$158 as qd, BreadcrumbsTicketType as qf, ProgressTrackProps as qi, _default$129 as ql, SliderThumbState as qn, InputRootSlotProps as qo, AlertDialogActivatorSlotProps as qp, _default$50 as qr, ExpansionPanelHeaderProps as qs, SwitchSelectAllSlotProps as qt, CollapsibleRootSlotProps as qu, TreeviewRootContext as r, PresenceProps as ra, ExpansionPanelGroupSlotProps as rc, _default$147 as rd, ButtonLoadingProps as rf, RatingItemSlotProps as ri, useDataTableRoot as rl, AlertDescriptionSlotProps as rm, _default$25 as rn, _default$79 as ro, AvatarGroupTicketInput as rp, SliderRootSlotProps as rr, InputDescriptionSlotProps as rs, ToggleRootSlotProps as rt, provideDataGridRoot as ru, TreeviewListContext as s, PortalSlotProps as sa, useExpansionPanelGroup as sc, CheckboxState as sd, ButtonIconSlotProps as sf, RatingRootSlotProps as si, DataGridHandleState as sl, _default$188 as sm, provideSwitchGroup as sn, OverflowRootProps as so, AvatarFallbackProps as sp, Single as sr, _default$93 as ss, ToggleIndicatorProps as st, ComboboxErrorSlotProps as su, Treeview as t, useProgressRoot as ta, useExpansionPanelRoot as tc, CheckboxIndicatorProps as td, provideButtonRoot as tf, _default$52 as ti, _default$120 as tl, Alert as tm, useSwitchRoot as tn, OverflowIndicatorProps as to, AvatarGroupSlotProps as tp, SliderRootContext as tr, _default$91 as ts, ToggleRootContext as tt, DataGridRootSlotProps as tu, useTreeviewList as u, PopoverContentEmits as ua, DialogCloseSlotProps as uc, useCheckboxRoot as ud, _default$162 as uf, useRatingRoot as ui, SplitterHandleProps as ul, AlertRootSlotProps as um, StepItemProps as un, provideOverflowRoot as uo, AvatarImageEmits as up, _default$40 as ur, ImageFallbackSlotProps as us, ToggleGroupContext as ut, ComboboxDescriptionSlotProps as uu, _default$7 as v, PopoverRootProps as va, DialogContentEmits as vc, Carousel as vd, _default$164 as vf, RadioState as vi, SplitterContext as vl, Snackbar as vn, NumberFieldErrorSlotProps as vo, _default$177 as vp, SelectionItemSlotProps as vr, _default$96 as vs, ThemeSlotProps as vt, ComboboxContentProps as vu, TreeviewCheckboxSlotProps as w, PaginationStatusProps as wa, _default$111 as wc, _default$152 as wd, _default$166 as wf, RadioActivation as wi, SplitterRootExpose as wl, SnackbarCloseSlotProps as wn, NumberFieldScrubSlotProps as wo, AlertDialog as wp, useSelectionRoot as wr, useImageRoot as ws, TabsItemProps as wt, ComboboxControlProps as wu, TreeviewActivatorProps as x, providePopoverContext as xa, _default$110 as xc, _default$151 as xd, _default$165 as xf, useRadioRoot as xi, SplitterPanelInput as xl, SnackbarAnnouncerProps as xn, NumberFieldDescriptionSlotProps as xo, AspectRatioProps as xp, SelectionRootSlotProps as xr, ImageRootSlotProps as xs, TabsPanelProps as xt, ComboboxCueProps as xu, _default$8 as y, PopoverRootSlotProps as ya, DialogContentProps as yc, CarouselLiveRegionProps as yd, Breadcrumbs as yf, _default$56 as yi, SplitterIntentMode as yl, SnackbarContentProps as yn, _default$82 as yo, provideAvatarRoot as yp, _default$42 as yr, ImageContext as ys, _default$16 as yt, ComboboxContentSlotProps as yu, TreeviewSelectAllProps as z, PaginationFirstProps as za, DataTableRowSlotProps as zc, CarouselViewportSlotProps as zd, _default$171 as zf, ProgressValueSlotProps as zi, _default$127 as zl, SnackbarPortalProps as zn, provideNumberFieldRoot as zo, AlertDialogTitleProps as zp, SelectValueSlotProps as zr, ExpansionPanelContentSlotProps as zs, Switch as zt, CollapsibleCueProps as zu };