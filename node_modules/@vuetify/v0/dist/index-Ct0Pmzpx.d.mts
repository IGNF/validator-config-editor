import { a as ID, i as Extensible, o as MaybeArray } from "./index-XNZrgWCq.mjs";
import { t as ContextTrinity } from "./index-ClUa0Bl7.mjs";
import { a as RegistryEventName, c as RegistryTicketInput, o as RegistryOptions, r as RegistryEventCallback, s as RegistryTicket, t as RegistryContext } from "./index-Y6VfllT2.mjs";
import { i as PopoverPlacement, n as PopoverAdapterContext, t as PopoverAdapter } from "./adapter-CbkRdMju.mjs";
import { _ as FilterMode } from "./adapter-BP7jNtvH.mjs";
import { _ as ColumnNode, c as DataTableOptions, n as DataTableColumnTicketInput, r as DataTableContext, t as DataTableColumnTicket } from "./index-DDwX_0Um.mjs";
import { c as TokenTicket, i as TokenContext, o as TokenOptions, r as TokenCollection } from "./index-Dlr9_rf1.mjs";
import { A as MatchRange, k as IgnoreAccents } from "./index-DMQv04YO.mjs";
import { t as DateAdapter } from "./adapter-BC1VWu0H.mjs";
import { n as FeaturesAdapterFlags, t as FeaturesAdapter } from "./adapter-w8SEWO2v.mjs";
import "./flagsmith-BA8q5LAx.mjs";
import "./launchdarkly-CWhPi3lZ.mjs";
import "./posthog-Bzaj2Jbd.mjs";
import { t as LocaleAdapter } from "./adapter-Bi799Zn7.mjs";
import "./index-h87SNntw.mjs";
import { t as LoggerAdapter } from "./adapter-CHvvxw4c.mjs";
import { n as StorageAdapter } from "./memory-DyA22X2q.mjs";
import { App, ComponentPublicInstance, ComputedRef, InjectionKey, MaybeRef, MaybeRefOrGetter, Reactive, Ref, ShallowReactive, ShallowRef, UnwrapNestedRefs, WatchSource, WritableComputedRef } from "vue";
//#region src/composables/createModel/index.d.ts
/**
 * Input type for model tickets - what users provide to register().
 *
 * @template V The type of the ticket value.
 */
interface ModelTicketInput<V = unknown> extends RegistryTicketInput<V> {
  /** Disabled state of the ticket (optional on input, defaults to false) */
  disabled?: MaybeRefOrGetter<boolean>;
}
/**
 * Output type for model tickets - what users receive from get().
 *
 * @template Z The input ticket type that extends ModelTicketInput.
 */
type ModelTicket<Z extends ModelTicketInput = ModelTicketInput> = RegistryTicket & Z & {
  /** Disabled state of the ticket (guaranteed to exist on output) */
  disabled: MaybeRefOrGetter<boolean>;
  /** Whether the ticket is currently selected */
  isSelected: Readonly<Ref<boolean, boolean>>;
};
/**
 * Context returned by createModel.
 *
 * @template Z The input ticket type (what users provide to register).
 * @template E The output ticket type (what users receive from get). Defaults to ModelTicket<Z>.
 */
interface ModelContext<Z extends ModelTicketInput = ModelTicketInput, E extends ModelTicket<Z> = ModelTicket<Z>> extends Omit<RegistryContext<Z, E>, 'register'> {
  /**
   * Set of currently selected ticket IDs
   *
   * @remarks Reactive via `shallowReactive(new Set())`. Mutating this Set directly is supported —
   * `selectedItems` and `selectedValues` will update accordingly. Ghost IDs (IDs not in the registry)
   * are silently filtered out by the computed properties.
   *
   * @example
   * ```ts
   * const model = createModel()
   * model.register({ id: 'a', value: 'Apple' })
   * console.log(model.selectedIds.has('a')) // true (enrolled on register)
   * ```
   */
  selectedIds: Reactive<Set<ID>>;
  /**
   * Computed Set of selected ticket instances
   *
   * @remarks Derived from `selectedIds`. Maps each ID to its ticket via `registry.get()` and
   * filters out any IDs that no longer exist in the registry.
   *
   * @example
   * ```ts
   * const model = createModel()
   * model.register({ id: 'a', value: 'Apple' })
   * model.select('a')
   * const items = Array.from(model.selectedItems.value)
   * console.log(items[0].id) // 'a'
   * ```
   */
  selectedItems: ComputedRef<Set<E>>;
  /**
   * Computed Set of selected ticket values
   *
   * @remarks Derived from `selectedItems`. Unwraps ref values via `toValue()` — if a ticket's
   * value is `ref('Apple')`, the Set contains `'Apple'`, not the Ref wrapper.
   *
   * @example
   * ```ts
   * import { shallowRef } from 'vue'
   * import { createModel } from '@vuetify/v0'
   *
   * const model = createModel()
   * model.register({ id: 'a', value: shallowRef('Apple') })
   * model.select('a')
   * console.log([...model.selectedValues.value]) // ['Apple']
   * ```
   */
  selectedValues: ComputedRef<Set<E['value'] extends Ref<infer U> ? U : E['value']>>;
  /**
   * Disabled state for the entire model instance
   *
   * @remarks When truthy, all selection operations (`select`, `unselect`, `toggle`) are silently
   * skipped. Accepts a static boolean, a ref, or a getter for reactive disabled state.
   *
   * @see https://0.vuetifyjs.com/composables/selection/create-model
   */
  disabled: MaybeRefOrGetter<boolean>;
  /**
   * Reset selection state without destroying the registry
   *
   * @remarks Clears `selectedIds` only — registered tickets are preserved.
   * Use `clear()` to destroy both selection state and the registry.
   *
   * @example
   * ```ts
   * const model = createModel()
   * model.register({ id: 'a', value: 'Apple' })
   * model.select('a')
   * model.reset()
   * console.log(model.size) // 1 (tickets preserved)
   * console.log(model.selectedIds.size) // 0
   * ```
   */
  reset: () => void;
  /**
   * Select a ticket by ID
   *
   * @param id The ID of the ticket to select.
   * @remarks When `multiple` is `false` (default), clears `selectedIds` before adding the new ID.
   * When `multiple` is `true`, accumulates without clearing.
   * No-op if the model instance is disabled, the ticket doesn't exist, or the ticket is disabled.
   *
   * @see https://0.vuetifyjs.com/composables/selection/create-model
   *
   * @example
   * ```ts
   * const model = createModel()
   * model.register({ id: 'a', value: 'Apple' })
   * model.register({ id: 'b', value: 'Banana' })
   * model.select('a')
   * model.select('b') // clears 'a', selects 'b'
   * console.log(model.selectedIds.size) // 1
   * ```
   */
  select: (id: ID) => void;
  /**
   * Unselect a ticket by ID
   *
   * @param id The ID of the ticket to unselect.
   * @remarks Removes the ID from `selectedIds`.
   * No-op if the model instance is disabled, the ticket doesn't exist, or the ticket is disabled.
   * Wholesale operations (`apply`, `reset`, `clear`) bypass this guard so disabled ids can always drain.
   *
   * @example
   * ```ts
   * model.select('a')
   * model.unselect('a')
   * console.log(model.selectedIds.size) // 0
   * ```
   */
  unselect: (id: ID) => void;
  /**
   * Toggle a ticket's selection state
   *
   * @param id The ID of the ticket to toggle.
   * @remarks Calls `select(id)` if not selected, `unselect(id)` if already selected.
   * No-op if the model instance is disabled or the ticket is disabled.
   *
   * @example
   * ```ts
   * model.toggle('a') // selects
   * model.toggle('a') // unselects
   * ```
   */
  toggle: (id: ID) => void;
  /**
   * Check if a ticket is currently selected
   *
   * @param id The ID of the ticket to check.
   * @returns `true` if the ID is in `selectedIds`.
   *
   * @example
   * ```ts
   * model.select('a')
   * console.log(model.selected('a')) // true
   * console.log(model.selected('b')) // false
   * ```
   */
  selected: (id: ID) => boolean;
  /**
   * Apply external values to the model
   *
   * @param values Array of values to apply. Only `values[0]` is used (single-value store).
   * @param options Optional. Accepted for interface compatibility with `createSelection`; ignored at this layer.
   * @remarks Used internally by `useProxyModel` to sync a ref with the model. Two paths:
   * 1. **Ref write**: Writes `values[0]` to any selected ticket whose value is a ref.
   *    The write is the application — the selection is kept and browse is skipped
   *    (the catalog indexes the ref object, not the unwrapped value). An `undefined`
   *    value leaves the ref untouched.
   * 2. **Browse resolution**: Otherwise clears `selectedIds`, resolves `values[0]`
   *    via `registry.browse()`, and selects the match.
   *
   * @see https://0.vuetifyjs.com/composables/selection/create-model
   *
   * @example
   * ```ts
   * import { shallowRef } from 'vue'
   * import { createModel } from '@vuetify/v0'
   *
   * const value = shallowRef('Apple')
   * const model = createModel()
   * model.register({ id: 'fruit', value }) // enrolled automatically
   *
   * model.apply(['Banana']) // value.value is now 'Banana'
   * ```
   */
  apply: (values: unknown[], options?: {
    multiple?: boolean;
  }) => void;
  /**
   * Register a new ticket
   *
   * @param registration Partial ticket data. ID is auto-generated if not provided. Disabled defaults to `false`.
   * @returns The registered ticket with `isSelected` computed ref attached.
   * @remarks Delegates to `registry.register()` after adding model-specific fields (`disabled`, `isSelected`).
   *
   * @see https://0.vuetifyjs.com/composables/selection/create-model
   *
   * @example
   * ```ts
   * import { shallowRef } from 'vue'
   * import { createModel } from '@vuetify/v0'
   *
   * const model = createModel()
   * const ticket = model.register({ id: 'fruit', value: shallowRef('Apple') })
   *
   * console.log(ticket.id) // 'fruit'
   * console.log(ticket.isSelected.value) // true (enrolled by default)
   * console.log(ticket.disabled) // false
   * ```
   */
  register: (registration?: Partial<Z>) => E;
  /**
   * Onboard multiple tickets at once
   *
   * @param registrations An array of partial ticket data to register.
   * @returns The registered tickets with model-specific fields attached.
   * @remarks Delegates to the model's `register` (not the registry's) so each ticket
   * receives `disabled` and `isSelected`. Runs inside `registry.batch()` for performance.
   */
  onboard: (registrations: Partial<Z>[]) => E[];
}
interface ModelOptions extends RegistryOptions {
  /**
   * Disabled state for the entire model instance
   *
   * @default false
   * @remarks When truthy, all selection operations are silently skipped. Accepts a static
   * boolean, a ref, or a getter for reactive disabled state.
   *
   * @example
   * ```ts
   * import { createModel } from '@vuetify/v0'
   *
   * // Static
   * const model = createModel({ disabled: true })
   *
   * // Reactive
   * const disabled = ref(false)
   * const model = createModel({ disabled })
   * ```
   */
  disabled?: MaybeRefOrGetter<boolean>;
  /**
   * Auto-select tickets on registration
   *
   * @default true
   * @remarks When truthy, newly registered tickets are automatically selected via `select()`,
   * subject to disabled guards (both instance-level and ticket-level). With single-value
   * semantics, only the most recently registered ticket remains active.
   *
   * `createSelection` overrides this to `false` and handles enrollment with its own
   * `multiple`-aware logic.
   */
  enroll?: MaybeRefOrGetter<boolean>;
  /**
   * Allow multiple tickets to be selected simultaneously
   *
   * @default false
   * @remarks When `true`, `select()` accumulates IDs instead of clearing before adding.
   * Used by createSlider where all thumbs must stay selected.
   */
  multiple?: MaybeRefOrGetter<boolean>;
}
/**
 * Creates a new model instance for storing a single value.
 *
 * @param options The options for the model instance.
 * @template Z The input ticket type. Extend {@link ModelTicketInput} to add custom properties.
 * @template E The output ticket type. Automatically includes `disabled` and `isSelected`.
 * @template R The context type. Defaults to {@link ModelContext}<Z, E>.
 * @returns A new model instance with selection tracking and disabled guards.
 *
 * @remarks
 * Extends createRegistry with value tracking via a reactive Set of selected IDs.
 * Provides the shared model-value concept used by both Selection and Slider.
 *
 * **Enrollment**: Tickets are auto-selected on registration by default (`enroll: true`).
 * With single-value semantics, only the most recently registered ticket is active.
 * Pass `enroll: false` to opt out. `createSelection` overrides this to `false`.
 *
 * **Apply bridge**: `useProxyModel` calls `apply()` to sync a ref with the model.
 * When the active ticket's value is a ref, `apply` writes to it directly. Otherwise,
 * it resolves via `registry.browse()`.
 *
 * @see https://0.vuetifyjs.com/composables/selection/create-model
 *
 * @example
 * ```ts
 * import { shallowRef } from 'vue'
 * import { createModel, useProxyModel } from '@vuetify/v0'
 *
 * const value = shallowRef('Apple')
 * const model = createModel({ events: true })
 *
 * model.register({ id: 'fruit', value })
 * useProxyModel(model, value)
 *
 * // value and model stay in sync bidirectionally
 * ```
 *
 * @example
 * ```ts
 * // Disabled model — all selection operations are no-ops
 * const model = createModel({ disabled: true })
 * model.register({ id: 'a', value: shallowRef('Apple') })
 * model.select('a') // no-op
 * ```
 */
declare function createModel<Z extends ModelTicketInput = ModelTicketInput, E extends ModelTicket<Z> = ModelTicket<Z>, R extends ModelContext<Z, E> = ModelContext<Z, E>>(_options?: ModelOptions): R;
//#endregion
//#region src/composables/createSelection/index.d.ts
/**
 * Input type for selection tickets - what users provide to register().
 * Custom ticket types should extend this interface.
 *
 * @template V The type of the ticket value.
 *
 * @example
 * ```ts
 * interface MyTicket extends SelectionTicketInput {
 *   label: string
 *   disabled?: boolean
 *   metadata?: Record<string, unknown>
 * }
 *
 * const selection = createSelection<MyTicket>()
 * selection.register({ label: 'Item 1' })
 * ```
 */
interface SelectionTicketInput<V = unknown> extends ModelTicketInput<V> {}
/**
 * Output type for selection tickets - what users receive from get().
 * Includes registry-added methods for self-selection.
 *
 * @template Z The input ticket type that extends SelectionTicketInput.
 *
 * @remarks
 * The following properties are automatically added by the registry:
 * - `disabled` - Defaults to `false` if not provided
 * - `isSelected` - Reactive boolean indicating selection state
 * - `select()` - Method to select this ticket
 * - `unselect()` - Method to unselect this ticket
 * - `toggle()` - Method to toggle selection state
 */
type SelectionTicket<Z extends SelectionTicketInput = SelectionTicketInput> = ModelTicket<Z> & {
  /** Select self */
  select: () => void;
  /** Unselect self */
  unselect: () => void;
  /** Toggle self on and off */
  toggle: () => void;
};
/**
 * Context returned by createSelection.
 *
 * @template Z The input ticket type (what users provide to register).
 * @template E The output ticket type (what users receive from get). Defaults to SelectionTicket<Z>.
 */
interface SelectionContext<Z extends SelectionTicketInput = SelectionTicketInput, E extends SelectionTicket<Z> = SelectionTicket<Z>> extends Omit<ModelContext<Z, E>, 'register'> {
  /** Whether the selection allows multiple selections */
  multiple: MaybeRefOrGetter<boolean>;
  /** Register a new ticket (accepts input type, returns output type) */
  register: (ticket?: Partial<Z>) => E;
  /** Onboard multiple tickets at once */
  onboard: (registrations: Partial<Z>[]) => E[];
  /** Mandate selected ID based on "mandatory" option */
  mandate: () => void;
  /** Seek for the first/last non-disabled ticket */
  seek: (direction?: 'first' | 'last', from?: number) => E | undefined;
}
interface SelectionOptions extends ModelOptions {
  /**
   * Controls mandatory selection behavior:
   * - `false` (default): No mandatory selection enforcement
   * - `true`: Prevents deselecting the last selected item
   * - `'force'`: Automatically selects the first non-disabled item on registration
   */
  mandatory?: MaybeRefOrGetter<boolean | 'force'>;
  /** When true, treats the selection as an array */
  multiple?: MaybeRefOrGetter<boolean>;
  /**
   * Auto-select tickets on registration
   *
   * @default false
   * @remarks Overrides createModel's default of `true`. When truthy, newly registered
   * items are automatically selected if not disabled. Respects `multiple` mode.
   */
  enroll?: MaybeRefOrGetter<boolean>;
}
interface SelectionContextOptions extends SelectionOptions {
  namespace?: string;
}
/**
 * Creates a new selection instance for managing multiple selected items.
 *
 * Extends `createModel` with multi-select, mandatory enforcement,
 * auto-enrollment, and ticket self-methods.
 * Supports disabled items, mandatory selection enforcement, and auto-enrollment.
 *
 * @param options The options for the selection instance.
 * @template Z The input ticket type - what users provide to register(). Extend SelectionTicketInput to add custom properties.
 * @template E The output ticket type - what users receive from get(). Automatically includes selection methods.
 * @template R The context type. Defaults to SelectionContext<Z, E>.
 * @returns A new selection instance with selection management methods.
 *
 * @remarks
 * **Key Features:**
 * - Multi-selection support (unlike `createSingle` which enforces single selection)
 * - Set-based `selectedIds` tracking for efficient lookups
 * - Computed `selectedItems` and `selectedValues` for reactive access
 * - Each ticket gets `isSelected`, `select()`, `unselect()`, and `toggle()` methods
 * - Disabled items cannot be selected
 * - Mandatory mode prevents deselecting the last item
 * - Force mode auto-selects first non-disabled item on registration
 * - Enroll option auto-selects all non-disabled items on registration
 *
 * **Inheritance Chain:**
 * `createRegistry` → `createModel` → `createSelection` → `createSingle`/`createGroup` → `createStep`
 *
 * @see https://0.vuetifyjs.com/composables/selection/create-selection
 *
 * @example
 * ```ts
 * import { createSelection } from '@vuetify/v0'
 *
 * // Basic usage
 * const selection = createSelection({ mandatory: true })
 *
 * selection.onboard([
 *   { id: 'item-1', value: 'Item 1' },
 *   { id: 'item-2', value: 'Item 2', disabled: true },
 *   { id: 'item-3', value: 'Item 3' },
 * ])
 *
 * selection.select('item-1')
 * selection.select('item-3')
 *
 * console.log(selection.selectedIds) // Set { 'item-1', 'item-3' }
 * console.log(Array.from(selection.selectedValues.value)) // ['Item 1', 'Item 3']
 * ```
 *
 * @example
 * ```ts
 * // With custom ticket type
 * interface MyTicket extends SelectionTicketInput {
 *   label: string
 *   icon?: string
 * }
 *
 * const tabs = createSelection<MyTicket>()
 *
 * tabs.register({ label: 'Home', icon: 'mdi-home' })
 * tabs.register({ label: 'Settings' })
 *
 * const ticket = tabs.get('...')
 * // ticket has: label, icon, isSelected, select(), unselect(), toggle()
 * ```
 */
declare function createSelection<Z extends SelectionTicketInput = SelectionTicketInput, E extends SelectionTicket<Z> = SelectionTicket<Z>, R extends SelectionContext<Z, E> = SelectionContext<Z, E>>(_options?: SelectionOptions): R;
/**
 * Creates a new selection context.
 *
 * @param options The options for the selection context.
 * @template Z The input ticket type - what users provide to register().
 * @template E The output ticket type - what users receive from get().
 * @template R The context type. Defaults to SelectionContext<Z, E>.
 * @returns A new selection context.
 *
 * @see https://0.vuetifyjs.com/composables/selection/create-selection
 *
 * @example
 * ```ts
 * import { createSelectionContext } from '@vuetify/v0'
 *
 * // With default namespace 'v0:selection'
 * export const [useCheckboxes, provideCheckboxes, checkboxes] = createSelectionContext()
 *
 * // Or with custom namespace
 * export const [useCheckboxes, provideCheckboxes, checkboxes] = createSelectionContext({ namespace: 'checkboxes' })
 *
 * // In a parent component:
 * provideCheckboxes()
 *
 * // In a child component:
 * const checkboxes = useCheckboxes()
 * checkboxes.select('checkbox-1')
 * ```
 *
 * @example
 * ```ts
 * // With custom ticket type
 * interface TabTicket extends SelectionTicketInput {
 *   label: string
 *   icon?: string
 * }
 *
 * export const [useTabs, provideTabs, tabs] = createSelectionContext<TabTicket>()
 * ```
 */
declare function createSelectionContext<Z extends SelectionTicketInput = SelectionTicketInput, E extends SelectionTicket<Z> = SelectionTicket<Z>, R extends SelectionContext<Z, E> = SelectionContext<Z, E>>(_options?: SelectionContextOptions): ContextTrinity<R>;
/**
 * Returns the current selection instance.
 *
 * @param namespace The namespace for the selection context. Defaults to `'v0:selection'`.
 * @template Z The input ticket type.
 * @template E The output ticket type.
 * @template R The context type.
 * @returns The current selection instance.
 *
 * @see https://0.vuetifyjs.com/composables/selection/create-selection
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 *   import { useSelection } from '@vuetify/v0'
 *
 *   const selection = useSelection()
 * </script>
 *
 * <template>
 *   <div>
 *     <p>Selected: {{ selection.selectedIds.size }}</p>
 *   </div>
 * </template>
 * ```
 */
declare function useSelection<Z extends SelectionTicketInput = SelectionTicketInput, E extends SelectionTicket<Z> = SelectionTicket<Z>, R extends SelectionContext<Z, E> = SelectionContext<Z, E>>(namespace?: string): R;
//#endregion
//#region src/composables/useImage/index.d.ts
type ImageStatus = 'idle' | 'loading' | 'loaded' | 'error';
interface UseImageOptions {
  /**
   * Image source URL. Changes trigger a reload.
   */
  src: MaybeRefOrGetter<string | undefined>;
  /**
   * Whether the image should load. When `false`, status stays `idle` and
   * `source` resolves to `undefined` so the browser does not start loading.
   * @default true
   */
  eager?: MaybeRefOrGetter<boolean>;
}
interface UseImageReturn {
  /**
   * Current loading state.
   */
  readonly status: Readonly<ShallowRef<ImageStatus>>;
  /**
   * Whether the image has not yet started loading (eager is false).
   */
  readonly isIdle: Readonly<Ref<boolean>>;
  /**
   * Whether the image is currently loading.
   */
  readonly isLoading: Readonly<Ref<boolean>>;
  /**
   * Whether the image has loaded successfully.
   */
  readonly isLoaded: Readonly<Ref<boolean>>;
  /**
   * Whether the image failed to load.
   */
  readonly isError: Readonly<Ref<boolean>>;
  /**
   * Gated source URL. Resolves to `undefined` while idle, otherwise the
   * current `src` value. Bind directly to the `<img>` `src` attribute.
   */
  readonly source: Readonly<Ref<string | undefined>>;
  /**
   * Bind to the `<img>` `load` event.
   */
  onLoad: (e?: Event) => void;
  /**
   * Bind to the `<img>` `error` event.
   */
  onError: (e?: Event) => void;
  /**
   * Reset status back to `loading` so the browser re-attempts the source.
   */
  retry: () => void;
}
/**
 * Tracks image loading state as a reactive state machine.
 *
 * @param options Configuration options
 * @returns Image context with state refs and event handlers
 *
 * @see https://0.vuetifyjs.com/composables/system/use-image
 *
 * @example
 * ```ts
 * import { toRef } from 'vue'
 * import { useImage } from '@vuetify/v0'
 *
 * const props = defineProps<{ src: string }>()
 *
 * const { source, isLoaded, onLoad, onError, retry } = useImage({
 *   src: toRef(() => props.src),
 * })
 * ```
 *
 * @example
 * Composed with `useIntersectionObserver` for lazy loading:
 * ```ts
 * const target = shallowRef<HTMLElement>()
 * const { isIntersecting } = useIntersectionObserver(target, () => {}, {
 *   once: true,
 *   rootMargin: '200px',
 * })
 *
 * const { source, onLoad, onError } = useImage({
 *   src: toRef(() => props.src),
 *   eager: isIntersecting,
 * })
 * ```
 */
declare function useImage(options: UseImageOptions): UseImageReturn;
//#endregion
//#region src/composables/createOverflow/index.d.ts
interface OverflowOptions {
  /**
   * Container element to track. Can be a ref, getter, or MaybeRefOrGetter.
   * When provided, useOverflow tracks this element's width automatically.
   * Also accepts Vue `useTemplateRef` — Vue 3.5.42 wraps that in a deep
   * `Readonly<Ref>` that is not assignable to `MaybeRefOrGetter`.
   */
  container?: MaybeRefOrGetter<Element | null | undefined> | {
    readonly value: unknown;
  };
  /** Gap between items in pixels */
  gap?: MaybeRefOrGetter<number>;
  /** Reserved space in pixels (for nav buttons, ellipsis, etc) */
  reserved?: MaybeRefOrGetter<number>;
  /**
   * Uniform item width in pixels. When provided, enables uniform mode
   * where capacity is calculated as available space / itemWidth.
   * Use this for same-width items like pagination buttons.
   */
  itemWidth?: MaybeRefOrGetter<number>;
  /**
   * Calculate capacity from end instead of start.
   * Useful for breadcrumbs where trailing items take priority.
   * Only affects variable mode (uniform mode capacity is direction-independent).
   */
  reverse?: MaybeRefOrGetter<boolean>;
}
interface OverflowContext {
  /** Container element ref */
  container: ShallowRef<Element | null | undefined>;
  /** Current container width */
  width: Readonly<ShallowRef<number>>;
  /** How many items fit in available space */
  capacity: ComputedRef<number>;
  /** Total width of all measured items */
  total: ComputedRef<number>;
  /** Whether items overflow the container */
  isOverflowing: Readonly<Ref<boolean>>;
  /**
   * Register an item's element for width measurement. Required for every
   * child in both modes — variable mode reads the measured widths for
   * capacity; uniform mode reads only the entry count for isOverflowing.
   * Pass `undefined` to unregister.
   */
  measure: (index: number, el: Element | undefined) => void;
  /** Clear all measurements */
  reset: () => void;
}
interface OverflowContextOptions extends OverflowOptions {
  /** Namespace for dependency injection */
  namespace?: string;
}
/**
 * Creates a new overflow context for computing how many items fit in a container.
 *
 * @param options Configuration options
 * @returns Overflow context with container ref, capacity, and measurement functions
 *
 * @example Variable-width mode (Breadcrumbs)
 * ```vue
 * <script lang="ts" setup>
 *   import { useTemplateRef } from 'vue'
 *   import { createOverflow } from '@vuetify/v0'
 *
 *   const containerRef = useTemplateRef('container')
 *   const overflow = createOverflow({
 *     container: containerRef,
 *     gap: 8,
 *     reserved: 40,
 *   })
 * </script>
 *
 * <template>
 *   <div ref="container">
 *     <span
 *       v-for="(item, i) in items.slice(0, overflow.capacity.value)"
 *       :key="i"
 *       :ref="el => overflow.measure(i, el)"
 *     >
 *       {{ item }}
 *     </span>
 *     <span v-if="overflow.isOverflowing.value">...</span>
 *   </div>
 * </template>
 * ```
 *
 * @example Uniform-width mode (Pagination)
 * ```ts
 * const overflow = createOverflow({
 *   container: () => atom.value?.element,
 *   itemWidth: buttonWidth,
 *   reserved: () => buttonWidth.value * 4,
 * })
 * ```
 */
declare function createOverflow<E extends OverflowContext = OverflowContext>(options?: OverflowOptions): E;
/**
 * Creates an overflow context with dependency injection support.
 *
 * @param options Configuration options including namespace
 * @template E The type of the overflow context
 * @returns Trinity tuple: [useOverflow, provideOverflow, defaultOverflow]
 *
 * @example
 * ```ts
 * // Create injectable context
 * const [useOverflow, provideOverflow, overflow] = createOverflowContext({
 *   namespace: 'my-overflow',
 *   gap: 8,
 *   reserved: 160,
 * })
 *
 * // In parent component
 * provideOverflow()
 *
 * // In child component
 * const overflow = useOverflow()
 * ```
 */
declare function createOverflowContext<E extends OverflowContext = OverflowContext>(_options?: OverflowContextOptions): ContextTrinity<E>;
/**
 * Returns the current overflow context from dependency injection.
 *
 * @param namespace The namespace for the overflow context. Defaults to `v0:overflow`.
 * @template E The type of the overflow context
 * @returns The current overflow context.
 *
 * @throws An error if the overflow context is not found and no default is provided.
 *
 * @example
 * ```vue
 * <script lang="ts" setup>
 *   import { useOverflow } from '@vuetify/v0'
 *
 *   // Inject overflow context provided by parent
 *   const overflow = useOverflow()
 * </script>
 *
 * <template>
 *   <div>
 *     <p>Capacity: {{ overflow.capacity.value }}</p>
 *   </div>
 * </template>
 * ```
 */
declare function useOverflow<E extends OverflowContext = OverflowContext>(namespace?: string): E;
//#endregion
//#region src/composables/createSingle/index.d.ts
/**
 * Input type for single selection tickets.
 * Extend this interface to add custom properties.
 */
interface SingleTicketInput<V = unknown> extends SelectionTicketInput<V> {}
/**
 * Output type for single selection tickets.
 * Includes all input properties plus selection methods.
 */
type SingleTicket<Z extends SingleTicketInput = SingleTicketInput> = SelectionTicket<Z>;
/**
 * Context returned by createSingle.
 *
 * @template Z The input ticket type.
 * @template E The output ticket type.
 */
interface SingleContext<Z extends SingleTicketInput = SingleTicketInput, E extends SingleTicket<Z> = SingleTicket<Z>> extends Omit<SelectionContext<Z, E>, 'register' | 'onboard'> {
  selectedId: Readonly<Ref<ID | undefined>>;
  selectedIndex: Readonly<Ref<number>>;
  selectedItem: Readonly<Ref<E | undefined>>;
  selectedValue: Readonly<Ref<E['value'] | undefined>>;
  /** Register a new ticket (accepts input type, returns output type) */
  register: (ticket?: Partial<Z>) => E;
  /** Onboard multiple tickets at once */
  onboard: (registrations: Partial<Z>[]) => E[];
}
interface SingleOptions extends SelectionOptions {}
interface SingleContextOptions extends SelectionContextOptions {}
/**
 * Creates a new single selection instance that enforces only one selected item at a time.
 *
 * Extends `createSelection` by automatically clearing previous selections when a new item is selected.
 * Adds computed singular properties: `selectedId`, `selectedItem`, `selectedIndex`, `selectedValue`.
 *
 * @param options The options for the single selection instance.
 * @template Z The input ticket type - what users provide to register().
 * @template E The output ticket type - what users receive from get().
 * @template R The context type.
 * @returns A new single selection instance with single-selection enforcement.
 *
 * @remarks
 * **Key Differences from `createSelection`:**
 * - Automatically clears `selectedIds` before selecting a new item (enforces single selection)
 * - Provides singular computed properties instead of plural sets
 * - Perfect for tabs, radio buttons, theme selectors, and other single-choice UI components
 *
 * **Computed Properties:**
 * - `selectedId`: The ID of the selected item (undefined if none selected)
 * - `selectedItem`: The selected ticket object (undefined if none selected)
 * - `selectedIndex`: The index of the selected item (-1 if none selected)
 * - `selectedValue`: The value of the selected item (undefined if none selected)
 *
 * **Inheritance Chain:**
 * `createRegistry` → `createSelection` → `createSingle` → `createStep`
 *
 * @see https://0.vuetifyjs.com/composables/selection/create-single
 *
 * @example
 * ```ts
 * import { createSingle } from '@vuetify/v0'
 *
 * const tabs = createSingle({ mandatory: true })
 *
 * tabs.onboard([
 *   { id: 'home', value: 'Home' },
 *   { id: 'about', value: 'About' },
 *   { id: 'contact', value: 'Contact' },
 * ])
 *
 * tabs.first() // Select first tab
 *
 * console.log(tabs.selectedId.value) // 'home'
 * console.log(tabs.selectedIndex.value) // 0
 *
 * tabs.select('about') // Switch to about tab
 * console.log(tabs.selectedId.value) // 'about'
 * console.log(tabs.selectedIds.size) // 1 (always enforces single selection)
 * ```
 *
 * @example
 * ```ts
 * // With custom ticket type
 * interface TabTicket extends SingleTicketInput {
 *   label: string
 *   icon?: string
 * }
 *
 * const tabs = createSingle<TabTicket>()
 * tabs.register({ label: 'Home', icon: 'mdi-home' })
 * ```
 */
declare function createSingle<Z extends SingleTicketInput = SingleTicketInput, E extends SingleTicket<Z> = SingleTicket<Z>, R extends SingleContext<Z, E> = SingleContext<Z, E>>(_options?: SingleOptions): R;
/**
 * Creates a new single selection context.
 *
 * @param options The options for the single selection context.
 * @template Z The input ticket type.
 * @template E The output ticket type.
 * @template R The context type.
 * @returns A new single selection context.
 *
 * @see https://0.vuetifyjs.com/composables/selection/create-single
 *
 * @example
 * ```ts
 * import { createSingleContext } from '@vuetify/v0'
 *
 * // With default namespace 'v0:single'
 * export const [useSingle, provideSingle, context] = createSingleContext()
 *
 * // In a parent component:
 * provideSingle()
 *
 * // In a child component:
 * const single = useSingle()
 * single.select('tab-1')
 * ```
 */
declare function createSingleContext<Z extends SingleTicketInput = SingleTicketInput, E extends SingleTicket<Z> = SingleTicket<Z>, R extends SingleContext<Z, E> = SingleContext<Z, E>>(_options?: SingleContextOptions): ContextTrinity<R>;
/**
 * Returns the current single selection instance.
 *
 * @param namespace The namespace for the single selection context. Defaults to `'v0:single'`.
 * @template Z The input ticket type.
 * @template E The output ticket type.
 * @template R The context type.
 * @returns The current single selection instance.
 *
 * @see https://0.vuetifyjs.com/composables/selection/create-single
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 *   import { useSingle } from '@vuetify/v0'
 *
 *   const tabs = useSingle()
 * </script>
 *
 * <template>
 *   <div>
 *     <p>Selected: {{ tabs.selectedId }}</p>
 *   </div>
 * </template>
 * ```
 */
declare function useSingle<Z extends SingleTicketInput = SingleTicketInput, E extends SingleTicket<Z> = SingleTicket<Z>, R extends SingleContext<Z, E> = SingleContext<Z, E>>(namespace?: string): R;
//#endregion
//#region src/composables/createBreadcrumbs/index.d.ts
/**
 * Input type for breadcrumb tickets.
 */
interface BreadcrumbTicketInput<V = unknown> extends SingleTicketInput<V> {
  /** Display text for the breadcrumb */
  text: string;
}
/**
 * Output type for breadcrumb tickets.
 */
type BreadcrumbTicket<Z extends BreadcrumbTicketInput = BreadcrumbTicketInput> = SingleTicket<Z>;
/**
 * Context returned by createBreadcrumbs.
 */
interface BreadcrumbsContext<Z extends BreadcrumbTicketInput = BreadcrumbTicketInput, E extends BreadcrumbTicket<Z> = BreadcrumbTicket<Z>> extends Omit<SingleContext<Z, E>, 'select'> {
  /** Number of items in the path */
  depth: Readonly<Ref<number>>;
  /** Whether at root level (depth <= 1) */
  isRoot: Readonly<Ref<boolean>>;
  /** Whether path is empty (depth === 0) */
  isEmpty: Readonly<Ref<boolean>>;
  /** Navigate to root (first item) */
  first: () => void;
  /** Navigate up one level (remove last item) */
  prev: () => void;
  /** Navigate to specific item by id (truncates path) */
  select: (id: ID) => void;
}
interface BreadcrumbsOptions extends SingleOptions {}
interface BreadcrumbsContextOptions extends SingleContextOptions {}
/**
 * Creates a breadcrumbs navigation model.
 *
 * @param options The options for the breadcrumbs instance.
 * @returns A breadcrumbs context with navigation methods.
 *
 * @example
 * ```ts
 * import { createBreadcrumbs } from '@vuetify/v0'
 *
 * const breadcrumbs = createBreadcrumbs()
 *
 * breadcrumbs.register({ text: 'Home' })
 * breadcrumbs.register({ text: 'Products' })
 * breadcrumbs.register({ text: 'Electronics' })
 *
 * // Navigate back
 * breadcrumbs.prev() // removes Electronics
 * breadcrumbs.first() // truncates to Home
 *
 * // Derived state
 * breadcrumbs.depth.value // 1
 * breadcrumbs.isRoot.value // true
 * ```
 */
declare function createBreadcrumbs<Z extends BreadcrumbTicketInput = BreadcrumbTicketInput, E extends BreadcrumbTicket<Z> = BreadcrumbTicket<Z>, R extends BreadcrumbsContext<Z, E> = BreadcrumbsContext<Z, E>>(options?: BreadcrumbsOptions): R;
/**
 * Creates a breadcrumbs context for dependency injection.
 *
 * @param options The options including namespace.
 * @returns A trinity: [useBreadcrumbs, provideBreadcrumbs, defaultContext]
 *
 * @example
 * ```ts
 * const [useBreadcrumbs, provideBreadcrumbs] = createBreadcrumbsContext()
 *
 * // Parent component
 * provideBreadcrumbs()
 *
 * // Child component
 * const breadcrumbs = useBreadcrumbs()
 * breadcrumbs.register({ text: 'Details' })
 * ```
 */
declare function createBreadcrumbsContext<Z extends BreadcrumbTicketInput = BreadcrumbTicketInput, E extends BreadcrumbTicket<Z> = BreadcrumbTicket<Z>, R extends BreadcrumbsContext<Z, E> = BreadcrumbsContext<Z, E>>(_options?: BreadcrumbsContextOptions): ContextTrinity<R>;
/**
 * Returns the current breadcrumbs instance from context.
 *
 * @param namespace The namespace. @default 'v0:breadcrumbs'
 * @returns The breadcrumbs context.
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 *   import { useBreadcrumbs } from '@vuetify/v0'
 *
 *   const breadcrumbs = useBreadcrumbs()
 * </script>
 *
 * <template>
 *   <nav>
 *     <template v-for="ticket in breadcrumbs.values()" :key="ticket.id">
 *       <a @click="breadcrumbs.select(ticket.id)">{{ ticket.text }}</a>
 *     </template>
 *   </nav>
 * </template>
 * ```
 */
declare function useBreadcrumbs<Z extends BreadcrumbTicketInput = BreadcrumbTicketInput, E extends BreadcrumbTicket<Z> = BreadcrumbTicket<Z>, R extends BreadcrumbsContext<Z, E> = BreadcrumbsContext<Z, E>>(namespace?: string): R;
//#endregion
//#region src/composables/createGroup/index.d.ts
/**
 * Input type for group tickets.
 * Extend this interface to add custom properties.
 */
interface GroupTicketInput<V = unknown> extends SelectionTicketInput<V> {
  /** Whether the ticket should start in mixed/indeterminate state */
  indeterminate?: MaybeRefOrGetter<boolean>;
}
/**
 * Output type for group tickets.
 * Includes all input properties plus selection and tri-state methods.
 */
type GroupTicket<Z extends GroupTicketInput = GroupTicketInput> = SelectionTicket<Z> & {
  /** Whether the ticket is in a mixed/indeterminate state */
  isMixed: Readonly<Ref<boolean>>;
  /** Set self to mixed/indeterminate state */
  mix: () => void;
  /** Clear mixed/indeterminate state from self */
  unmix: () => void;
};
/**
 * Context returned by createGroup.
 *
 * @template Z The input ticket type.
 * @template E The output ticket type.
 */
interface GroupContext<Z extends GroupTicketInput = GroupTicketInput, E extends GroupTicket<Z> = GroupTicket<Z>> extends Omit<SelectionContext<Z, E>, 'register' | 'onboard' | 'select' | 'unselect' | 'toggle'> {
  selectedIndexes: ComputedRef<Set<number>>;
  /** Select one or more Tickets by ID */
  select: (ids: ID | ID[]) => void;
  /** Unselect one or more Tickets by ID */
  unselect: (ids: ID | ID[]) => void;
  /** Toggle one or more Tickets ON and OFF by ID */
  toggle: (ids: ID | ID[]) => void;
  /** Set of mixed/indeterminate ticket IDs */
  mixedIds: Reactive<Set<ID>>;
  /** Set of mixed/indeterminate ticket instances */
  mixedItems: ComputedRef<Set<E>>;
  /** Set one or more Tickets to mixed/indeterminate state by ID */
  mix: (ids: ID | ID[]) => void;
  /** Clear mixed/indeterminate state from one or more Tickets by ID */
  unmix: (ids: ID | ID[]) => void;
  /** Check if a ticket is in mixed/indeterminate state by ID */
  mixed: (id: ID) => boolean;
  /** Whether no items are currently selected */
  isNoneSelected: Readonly<Ref<boolean>>;
  /** Whether all selectable (non-disabled) items are selected */
  isAllSelected: ComputedRef<boolean>;
  /** Whether some but not all selectable items are selected */
  isMixed: ComputedRef<boolean>;
  /** Select all selectable (non-disabled) items */
  selectAll: () => void;
  /** Unselect all items (respects mandatory option) */
  unselectAll: () => void;
  /** Toggle between all selected and none selected */
  toggleAll: () => void;
  /** Register a new ticket (accepts input type, returns output type) */
  register: (ticket?: Partial<Z>) => E;
  /** Onboard multiple tickets at once */
  onboard: (registrations: Partial<Z>[]) => E[];
}
interface GroupOptions extends SelectionOptions {}
interface GroupContextOptions extends SelectionContextOptions {}
/**
 * Creates a new group instance with batch selection and tri-state support.
 *
 * Extends `createSelection` to support selecting, unselecting, and toggling multiple items
 * at once by passing an array of IDs. Adds tri-state (mixed/indeterminate) support for
 * checkbox trees and similar use cases.
 *
 * @param options The options for the group instance.
 * @template Z The type of the group ticket.
 * @template E The type of the group context.
 * @returns A new group instance with batch selection and tri-state support.
 *
 * @remarks
 * **Key Differences from `createSelection`:**
 * - `select()` accepts `ID | ID[]` for batch operations
 * - `unselect()` accepts `ID | ID[]` for batch operations
 * - `toggle()` accepts `ID | ID[]` for batch operations
 * - Adds `selectedIndexes` computed Set for getting selected item indexes
 * - Adds tri-state support via `mix()`, `unmix()`, `mixed()`, `mixedIds`, `mixedItems`
 * - Perfect for checkbox trees, multi-select dropdowns, and bulk operations
 *
 * **Tri-State Support:**
 * - Items can be in one of three states: selected, mixed (indeterminate), or unselected
 * - `mix(id)` sets item to mixed state (clears selected if set)
 * - `unmix(id)` clears mixed state
 * - `select(id)` clears mixed state before selecting
 * - `toggle(id)` on a mixed item selects it (resolves the indeterminate state positively)
 * - Mixed state works on disabled items (it's a computed state, not user action)
 *
 * **Batch Operations:**
 * - Single ID: `group.select('item-1')`
 * - Array of IDs: `group.select(['item-1', 'item-2', 'item-3'])`
 * - Uses `toArray()` utility internally to normalize input
 * - Disabled items are automatically skipped in select operations
 * - Non-existent IDs are silently ignored
 *
 * **Inheritance Chain:**
 * `createRegistry` → `createSelection` → `createGroup`
 *
 * **Used By:**
 * - `createFeatures` for feature flag management with multiple selections
 *
 * @see https://0.vuetifyjs.com/composables/selection/create-group
 *
 * @example
 * ```ts
 * import { createGroup } from '@vuetify/v0'
 *
 * const checkboxes = createGroup()
 *
 * checkboxes.onboard([
 *   { id: 'option-a', value: 'Option A' },
 *   { id: 'option-b', value: 'Option B' },
 *   { id: 'option-c', value: 'Option C' },
 * ])
 *
 * // Select multiple items at once
 * checkboxes.select(['option-a', 'option-c'])
 *
 * console.log(checkboxes.selectedIds) // Set { 'option-a', 'option-c' }
 * console.log(Array.from(checkboxes.selectedIndexes.value)) // [0, 2]
 *
 * // Set item to mixed/indeterminate state
 * checkboxes.mix('option-a')
 * console.log(checkboxes.mixedIds) // Set { 'option-a' }
 * console.log(checkboxes.selectedIds) // Set { 'option-c' } (option-a removed)
 *
 * // Toggle a mixed item selects it
 * checkboxes.toggle('option-a')
 * console.log(checkboxes.selectedIds) // Set { 'option-a', 'option-c' }
 * console.log(checkboxes.mixedIds) // Set {} (cleared)
 * ```
 */
declare function createGroup<Z extends GroupTicketInput = GroupTicketInput, E extends GroupTicket<Z> = GroupTicket<Z>, R extends GroupContext<Z, E> = GroupContext<Z, E>>(_options?: GroupOptions): R;
/**
 * Creates a new group context.
 *
 * @param options The options for the group context.
 * @template Z The input ticket type.
 * @template E The output ticket type.
 * @template R The context type.
 * @returns A new group context.
 *
 * @see https://0.vuetifyjs.com/composables/selection/create-group
 *
 * @example
 * ```ts
 * import { createGroupContext } from '@vuetify/v0'
 *
 * // With default namespace 'v0:group'
 * export const [useMyGroup, provideMyGroup, myGroup] = createGroupContext()
 *
 * // Or with custom namespace
 * export const [useMyGroup, provideMyGroup, myGroup] = createGroupContext({ namespace: 'my-group' })
 *
 * // In a parent component:
 * provideMyGroup()
 *
 * // In a child component:
 * const group = useMyGroup()
 * ```
 */
declare function createGroupContext<Z extends GroupTicketInput = GroupTicketInput, E extends GroupTicket<Z> = GroupTicket<Z>, R extends GroupContext<Z, E> = GroupContext<Z, E>>(_options?: GroupContextOptions): ContextTrinity<R>;
/**
 * Returns the current group instance.
 *
 * @param namespace The namespace for the group context. Defaults to `'v0:group'`.
 * @template Z The input ticket type.
 * @template E The output ticket type.
 * @template R The context type.
 * @returns The current group instance.
 *
 * @see https://0.vuetifyjs.com/composables/selection/create-group
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 *   import { useGroup } from '@vuetify/v0'
 *
 *   const group = useGroup()
 * </script>
 *
 * <template>
 *   <div>
 *     <p>Selected: {{ group.selectedIds.size }}</p>
 *   </div>
 * </template>
 * ```
 */
declare function useGroup<Z extends GroupTicketInput = GroupTicketInput, E extends GroupTicket<Z> = GroupTicket<Z>, R extends GroupContext<Z, E> = GroupContext<Z, E>>(namespace?: string): R;
//#endregion
//#region src/composables/createStep/index.d.ts
/**
 * Input type for step tickets.
 * Extend this interface to add custom properties.
 */
interface StepTicketInput<V = unknown> extends SingleTicketInput<V> {}
/**
 * Output type for step tickets.
 * Includes all input properties plus selection methods.
 */
type StepTicket<Z extends StepTicketInput = StepTicketInput> = SingleTicket<Z>;
/**
 * Context returned by createStep.
 *
 * @template Z The input ticket type.
 * @template E The output ticket type.
 */
interface StepContext<Z extends StepTicketInput = StepTicketInput, E extends StepTicket<Z> = StepTicket<Z>> extends Omit<SingleContext<Z, E>, 'register' | 'onboard'> {
  /** Select the first Ticket in the collection */
  first: () => void;
  /** Select the last Ticket in the collection */
  last: () => void;
  /** Select the next Ticket based on current index */
  next: () => void;
  /** Select the previous Ticket based on current index */
  prev: () => void;
  /** Step through the collection by a given count */
  step: (count: number) => void;
  /** Register a new ticket (accepts input type, returns output type) */
  register: (ticket?: Partial<Z>) => E;
  /** Onboard multiple tickets at once */
  onboard: (registrations: Partial<Z>[]) => E[];
}
interface StepOptions extends SingleOptions {
  /**
   * Enable circular navigation (wrapping at boundaries).
   * - true: Navigation wraps around (carousel behavior)
   * - false: Navigation stops at boundaries (pagination behavior)
   * @default false
   */
  circular?: boolean;
}
interface StepContextOptions extends SingleContextOptions {
  /**
   * Enable circular navigation (wrapping at boundaries).
   * - true: Navigation wraps around (carousel behavior)
   * - false: Navigation stops at boundaries (pagination behavior)
   * @default false
   */
  circular?: boolean;
}
/**
 * Creates a new step instance with navigation through items.
 *
 * Extends `createSingle` with `first()`, `last()`, `next()`, `prev()`, and `step(count)` methods
 * for sequential navigation. Supports both circular (wrapping) and bounded (stopping at edges) modes.
 *
 * @param options The options for the step instance.
 * @template Z The type of the step ticket.
 * @template E The type of the step context.
 * @returns A new step instance with navigation methods.
 *
 * @remarks
 * **Key Features:**
 * - **Configurable Navigation**: `circular: true` for wrapping, `false` for bounded (default: false)
 * - **Disabled Item Skipping**: Automatically skips disabled items during navigation
 * - **Bidirectional**: Forward (`next`, positive `step`) and backward (`prev`, negative `step`)
 * - **Safe Edge Cases**: Handles empty registries and all-disabled scenarios gracefully
 *
 * **Navigation Methods:**
 * - `first()`: Select first non-disabled item
 * - `last()`: Select last non-disabled item
 * - `next()`: Move to next item (wraps if circular, stops at end if bounded)
 * - `prev()`: Move to previous item (wraps if circular, stops at start if bounded)
 * - `step(count)`: Move by `count` positions (negative for backward)
 *
 * **Circular Mode (`circular: true`):**
 * - Uses modulo arithmetic for wrapping: `((index % length) + length) % length`
 * - Works correctly with negative indexes and large step counts
 * - Perfect for carousels, theme switchers, infinite scrolling
 *
 * **Bounded Mode (`circular: false`, default):**
 * - Navigation stops at boundaries (no wrapping)
 * - `next()` on last item does nothing
 * - `prev()` on first item does nothing
 * - Perfect for pagination, wizards with explicit completion, forms
 *
 * **Inheritance Chain:**
 * `createRegistry` → `createSelection` → `createSingle` → `createStep`
 *
 * @see https://0.vuetifyjs.com/composables/selection/create-step
 *
 * @example
 * ```ts
 * import { createStep } from '@vuetify/v0'
 *
 * // Bounded navigation (default) - for pagination
 * const pagination = createStep({ circular: false })
 * pagination.onboard([
 *   { id: 'page-1', value: 1 },
 *   { id: 'page-2', value: 2 },
 *   { id: 'page-3', value: 3 },
 * ])
 * pagination.first() // Select page 1
 * pagination.prev() // Does nothing (already at first)
 * pagination.next() // Select page 2
 *
 * // Circular navigation - for carousels
 * const carousel = createStep({ circular: true })
 * carousel.onboard([
 *   { id: 'slide-1', value: 'First' },
 *   { id: 'slide-2', value: 'Second' },
 *   { id: 'slide-3', value: 'Third' },
 * ])
 * carousel.first()
 * carousel.prev() // Wraps to 'slide-3'
 * carousel.next() // Wraps to 'slide-1'
 * ```
 */
declare function createStep<Z extends StepTicketInput = StepTicketInput, E extends StepTicket<Z> = StepTicket<Z>, R extends StepContext<Z, E> = StepContext<Z, E>>(_options?: StepOptions): R;
/**
 * Creates a new step context.
 *
 * @param options The options for the step context.
 * @template Z The input ticket type.
 * @template E The output ticket type.
 * @template R The context type.
 * @returns A new step context.
 *
 * @see https://0.vuetifyjs.com/composables/selection/create-step
 *
 * @example
 * ```ts
 * import { createStepContext } from '@vuetify/v0'
 *
 * // With default namespace 'v0:step'
 * export const [useStep, provideStep, context] = createStepContext()
 *
 * // In a parent component:
 * provideStep()
 *
 * // In a child component:
 * const context = useStep()
 * context.next() // Progress to next step
 * ```
 */
declare function createStepContext<Z extends StepTicketInput = StepTicketInput, E extends StepTicket<Z> = StepTicket<Z>, R extends StepContext<Z, E> = StepContext<Z, E>>(_options?: StepContextOptions): ContextTrinity<R>;
/**
 * Returns the current step instance.
 *
 * @param namespace The namespace for the step context. Defaults to `'v0:step'`.
 * @template Z The input ticket type.
 * @template E The output ticket type.
 * @template R The context type.
 * @returns The current step instance.
 *
 * @see https://0.vuetifyjs.com/composables/selection/create-step
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 *   import { useStep } from '@vuetify/v0'
 *
 *   const wizard = useStep()
 * </script>
 *
 * <template>
 *   <div>
 *     <p>Current step: {{ wizard.selectedIndex }}</p>
 *     <button @click="wizard.next()">Next</button>
 *   </div>
 * </template>
 * ```
 */
declare function useStep<Z extends StepTicketInput = StepTicketInput, E extends StepTicket<Z> = StepTicket<Z>, R extends StepContext<Z, E> = StepContext<Z, E>>(namespace?: string): R;
//#endregion
//#region src/composables/createPlugin/index.d.ts
interface PluginOptions {
  namespace: string;
  provide: (app: App) => void;
  setup?: (app: App) => void;
}
interface Plugin {
  install: (app: App, ...options: unknown[]) => void;
}
/**
 * Creates a new Vue plugin.
 *
 * @param options The plugin options.
 * @returns A new Vue plugin.
 *
 * @see https://0.vuetifyjs.com/composables/foundation/create-plugin
 *
 * @example
 * ```ts
 * export const [useContext, provideContext] = createContext<MyContext>('my-plugin')
 *
 * const context = {}
 *
 * export const MyPlugin = createPlugin({
 *   namespace: 'my-plugin',
 *   provide: (app) => {
 *     provideContext(context, app)
 *   },
 *   setup: (app) => {
 *     // Optional setup logic
 *   },
 * })
 */
declare function createPlugin<Z extends Plugin = Plugin>(options: PluginOptions): Z;
interface PluginContextConfig<O, E> {
  /**
   * Optional plugin setup callback, called once per Vue app after context provision.
   * Use for adapter initialization, Vue app mixins, global side effects, etc.
   * Receives the plugin options (minus namespace) so adapters and targets are accessible.
   */
  setup?: (context: E, app: App, options: O) => void;
  /**
   * Optional fallback factory. When provided, the generated `useX` consumer uses the
   * defensive pattern: returns the fallback when called outside a component instance or
   * when the context is not found. Required for composables that may be consumed outside
   * component setup (e.g. useLogger, useLocale, useHydration).
   *
   * Receives the requested namespace so error messages can include it.
   */
  fallback?: (namespace: string) => E;
  /** Returns the value to persist. Called reactively inside a watch source. */
  persist?: (context: E) => unknown;
  /** Restores previously persisted state into the context. Called before setup. */
  restore?: (context: E, saved: unknown) => void;
}
/**
 * Creates the three standard functions for a plugin composable.
 *
 * @param defaultNamespace The default DI namespace string (e.g. `'v0:logger'`).
 * @param factory Function that creates the composable context instance from options.
 * @param config Optional setup callback and fallback factory.
 * @returns A readonly tuple: `[createXContext, createXPlugin, useX]`.
 *
 * @example
 * ```ts
 * // Simple — no setup or fallback
 * export const [createStorageContext, createStoragePlugin, useStorage] =
 *   createPluginContext('v0:storage', options => createStorage(options))
 *
 * // With fallback — safe outside component instances
 * export const [createLoggerContext, createLoggerPlugin, useLogger] =
 *   createPluginContext('v0:logger', options => createLogger(options), {
 *     fallback: ns => createFallbackLogger(ns),
 *     setup: (context) => {
 *       if (__DEV__ && IN_BROWSER) (window as Window & { __v0Logger__?: typeof context }).__v0Logger__ = context
 *     },
 *   })
 * ```
 */
declare function createPluginContext<O extends {
  namespace?: string;
  persist?: boolean;
} = Record<never, never>, E = unknown>(defaultNamespace: string, factory: (options: Omit<O, 'namespace' | 'persist'>) => E, config?: PluginContextConfig<Omit<O, 'namespace' | 'persist'>, E>): readonly [<_E extends E = E>(_options?: O) => ContextTrinity<_E>, (_options?: O) => Plugin, <_E extends E = E>(namespace?: string) => _E];
//#endregion
//#region src/composables/usePopover/adapters/v0.d.ts
/**
 * Default positioning adapter. Emits CSS anchor positioning
 * (`position-area` / `position-try-fallbacks`) - no JS measurement, no
 * runtime dependency, works with the native popover API's own layout.
 */
declare class V0PopoverAdapter extends PopoverAdapter {
  setup(context: PopoverAdapterContext): Readonly<Ref<Record<string, string>>>;
}
//#endregion
//#region src/composables/usePopover/adapters/placement.d.ts
/**
 * Best-effort normalization of a CSS `position-area` value into an
 * engine-neutral `{ side, align }` descriptor. Covers the common single- and
 * two-token forms (`'bottom'`, `'top span-left'`, `'bottom span-right'`,
 * logical `block-start`/`block-end`/`inline-start`/`inline-end`); anything
 * else falls back to `bottom`/`center`. `raw` always carries the original
 * value verbatim, so no expressiveness is lost even when the normalization
 * doesn't recognize it.
 */
declare function toPlacement(positionArea: string): PopoverPlacement;
//#endregion
//#region src/composables/usePopover/index.d.ts
interface PopoverOptions {
  /** Auto-generated if not provided */
  id?: string;
  /** CSS position-area value @default 'bottom' */
  positionArea?: MaybeRefOrGetter<string | undefined>;
  /** CSS position-try-fallbacks value @default 'most-width bottom' */
  positionTry?: MaybeRefOrGetter<string | undefined>;
  /** External ref for bidirectional open state (e.g., from defineModel) */
  isOpen?: Ref<boolean>;
  /** Delay in ms before opening the popover. @default 0 */
  openDelay?: MaybeRefOrGetter<number>;
  /** Delay in ms before closing the popover. @default 0 */
  closeDelay?: MaybeRefOrGetter<number>;
  /**
   * Positioning engine. Resolution: per-instance `adapter`, then the
   * `createPopoverPlugin` adapter, then `new V0PopoverAdapter()` (CSS
   * anchor positioning, zero runtime dependency).
   */
  adapter?: PopoverAdapter;
}
interface PopoverReturn {
  /** Whether the popover is open */
  isOpen: Ref<boolean>;
  /** Unique ID for the popover */
  id: string;
  /** Open the popover (respects openDelay) */
  open: () => void;
  /** Close the popover (respects closeDelay) */
  close: () => void;
  /** Toggle open/close */
  toggle: () => void;
  /** Cancel any pending open or close transition */
  cancel: () => void;
  /** Styles to spread on the activator element (anchor-name) */
  anchorStyles: Readonly<Ref<Record<string, string>>>;
  /** Attrs to spread on the content element (id, popover) */
  contentAttrs: Readonly<Ref<{
    id: string;
    popover: '';
  }>>;
  /**
   * Styles to spread on the content element. Owned by the active adapter —
   * CSS anchor declarations from `V0PopoverAdapter`, or whatever a custom
   * engine (e.g. Floating UI) returns. Not inherently CSS-anchor styles.
   */
  contentStyles: Readonly<Ref<Record<string, string>>>;
  /** Placement intent. Writable so Content can override Root. @default `'bottom'` */
  positionArea: Ref<string>;
  /** Fallback positioning. Writable so Content can override Root. @default `'most-width bottom'` */
  positionTry: Ref<string>;
  /** Attach to a content element — wires show/hide watch + toggle event sync */
  attach: (el: MaybeRefOrGetter<HTMLElement | null | undefined>) => void;
  /** Register the activator/reference element with the positioning adapter */
  attachAnchor: (el: MaybeRefOrGetter<Element | null | undefined>) => void;
}
interface PopoverPluginContext {
  /**
   * App-wide positioning adapter. `undefined` means each `usePopover()`
   * call falls through to `V0PopoverAdapter`.
   *
   * @example
   * ```ts
   * import { createPopoverPlugin } from '@vuetify/v0'
   * import { FloatingUIPopoverAdapter } from '@vuetify/v0/popover/adapters/floating-ui'
   *
   * app.use(createPopoverPlugin({ adapter: new FloatingUIPopoverAdapter() }))
   * ```
   */
  adapter: PopoverAdapter | undefined;
}
interface PopoverPluginContextOptions {
  /** Positioning engine used when a per-instance `adapter` is not passed. */
  adapter?: PopoverAdapter;
  namespace?: string;
}
interface PopoverPluginOptions extends PopoverPluginContextOptions {}
/**
 * Synthesized fallback used when `usePopover()` is called without
 * `app.use(createPopoverPlugin())`. Returns `{ adapter: undefined }` so
 * resolution falls through to `V0PopoverAdapter`.
 *
 * @example
 * ```ts
 * import { createPopoverFallback } from '@vuetify/v0'
 *
 * const plugin = createPopoverFallback()
 * plugin.adapter // undefined
 * ```
 */
declare function createPopoverFallback(): PopoverPluginContext;
/**
 * Creates a scoped popover plugin context (the first member of the plugin trinity).
 *
 * @example
 * ```ts
 * import { createPopoverContext } from '@vuetify/v0'
 * import { FloatingUIPopoverAdapter } from '@vuetify/v0/popover/adapters/floating-ui'
 *
 * export const [useAppPopover, provideAppPopover, appPopover] = createPopoverContext({
 *   namespace: 'app:popover',
 *   adapter: new FloatingUIPopoverAdapter(),
 * })
 * ```
 *
 * Plugin trinity for an app-wide popover positioning adapter.
 *
 * Namespace is `v0:popover`. Compound `Popover.Root` context lives at
 * `v0:popover:root` so the two do not collide. The generated consumer is
 * module-private; `usePopover()` consults it internally. Fallback is
 * `{ adapter: undefined }`, so zero-config matches today's `V0PopoverAdapter`
 * default.
 *
 * @example
 * ```ts
 * import { createPopoverPlugin } from '@vuetify/v0'
 * import { FloatingUIPopoverAdapter } from '@vuetify/v0/popover/adapters/floating-ui'
 *
 * app.use(createPopoverPlugin({ adapter: new FloatingUIPopoverAdapter() }))
 * ```
 */
declare const createPopoverContext: <_E extends PopoverPluginContext = PopoverPluginContext>(_options?: PopoverPluginOptions | undefined) => ContextTrinity<_E>, createPopoverPlugin: (_options?: PopoverPluginOptions | undefined) => Plugin;
declare function usePopover(options?: PopoverOptions): PopoverReturn;
//#endregion
//#region src/composables/createFocusTraversal/index.d.ts
interface TraversalItem {
  id: ID;
  disabled?: MaybeRefOrGetter<boolean>;
}
//#endregion
//#region src/composables/useVirtualFocus/index.d.ts
interface VirtualFocusItem extends TraversalItem {
  el?: MaybeRefOrGetter<HTMLElement | null | undefined>;
}
interface VirtualFocusOptions {
  /** Element that retains DOM focus and receives aria-activedescendant */
  control: MaybeRefOrGetter<HTMLElement | null | undefined>;
  /** Element to attach keydown listener to (defaults to control) */
  target?: MaybeRefOrGetter<HTMLElement | null | undefined>;
  /** Arrow key mapping. Ignored when `columns` is set (grid uses all 4 arrows). */
  orientation?: 'horizontal' | 'vertical' | 'both';
  circular?: boolean;
  /**
   * Column count for grid navigation. When set, items are treated as a 2D grid
   * in row-major order: Left/Right step +/-1, Up/Down step +/-columns,
   * Home/End go to row start/end, Ctrl+Home/End go to first/last overall.
   */
  columns?: MaybeRefOrGetter<number>;
  onHighlight?: (id: ID) => void;
}
interface VirtualFocusReturn {
  highlightedId: ShallowRef<ID | undefined>;
  highlight: (id: ID) => void;
  clear: () => void;
  next: () => void;
  prev: () => void;
  first: () => void;
  last: () => void;
  onKeydown: (e: KeyboardEvent) => void;
}
declare function useVirtualFocus(items: () => VirtualFocusItem[], options: VirtualFocusOptions): VirtualFocusReturn;
//#endregion
//#region src/composables/createCombobox/adapters/adapter.d.ts
interface ComboboxAdapterContext {
  /** Current search query */
  query: ShallowRef<string>;
  /** Registered selection tickets (the items source of truth) */
  items: Ref<SelectionTicket[]>;
}
interface ComboboxAdapterResult {
  /** Filtered item IDs that should be visible */
  filtered: Ref<Set<ID>>;
  /** Whether the adapter is loading (async adapters) */
  isLoading: ShallowRef<boolean>;
  /** Whether no items match the current query */
  isEmpty: Ref<boolean>;
}
declare abstract class ComboboxAdapter {
  abstract setup(context: ComboboxAdapterContext): ComboboxAdapterResult;
}
//#endregion
//#region src/composables/createCombobox/adapters/client.d.ts
interface ClientComboboxAdapterOptions {
  /** Filter matching mode */
  mode?: FilterMode;
  /** Object keys to match against (for object values) */
  keys?: MaybeRefOrGetter<readonly string[]>;
  /** Custom filter function — overrides default matching */
  filter?: (query: string, value: unknown) => boolean;
}
declare class ClientComboboxAdapter extends ComboboxAdapter {
  private options;
  constructor(options?: ClientComboboxAdapterOptions);
  setup(context: ComboboxAdapterContext): ComboboxAdapterResult;
}
//#endregion
//#region src/composables/createCombobox/adapters/server.d.ts
declare class ServerComboboxAdapter extends ComboboxAdapter {
  setup(context: ComboboxAdapterContext): ComboboxAdapterResult;
}
//#endregion
//#region src/composables/createCombobox/index.d.ts
interface ComboboxOptions {
  multiple?: MaybeRefOrGetter<boolean>;
  mandatory?: MaybeRefOrGetter<boolean>;
  disabled?: MaybeRefOrGetter<boolean>;
  strict?: MaybeRefOrGetter<boolean>;
  error?: MaybeRefOrGetter<boolean>;
  errorMessages?: MaybeRefOrGetter<MaybeArray<string> | undefined>;
  adapter?: ComboboxAdapter;
  /** Positioning engine for the dropdown. @default CSS anchor positioning (`V0PopoverAdapter`) */
  positionAdapter?: PopoverAdapter;
  displayValue?: (value: unknown) => string;
  id?: string;
  name?: string;
  form?: string;
}
interface ComboboxContext {
  selection: SelectionContext;
  popover: PopoverReturn;
  cursor: VirtualFocusReturn;
  query: ShallowRef<string>;
  display: Readonly<Ref<string>>;
  pristine: ShallowRef<boolean>;
  filtered: Ref<Set<ID>>;
  isEmpty: Ref<boolean>;
  isLoading: ShallowRef<boolean>;
  isOpen: ShallowRef<boolean>;
  id: string;
  inputId: string;
  listboxId: string;
  descriptionId: string;
  errorId: string;
  hasDescription: ShallowRef<boolean>;
  hasError: ShallowRef<boolean>;
  errors: Readonly<Ref<string[]>>;
  isValid: Readonly<Ref<boolean | null>>;
  inputEl: ShallowRef<HTMLElement | null>;
  multiple: boolean;
  strict: MaybeRefOrGetter<boolean>;
  disabled: MaybeRefOrGetter<boolean>;
  name: string | undefined;
  form: string | undefined;
  open: () => void;
  close: () => void;
  toggle: () => void;
  select: (id: ID) => void;
  clear: () => void;
}
/**
 * Creates a combobox context that orchestrates selection, popover, virtual
 * focus, and adapter-based filtering into a single coordinated state.
 *
 * @param options - Configuration for selection mode, filtering adapter, and behavior.
 * @returns A combobox context with all composed systems and action methods.
 *
 * @see https://0.vuetifyjs.com/composables/forms/create-combobox
 *
 * @example
 * ```ts
 * import { createCombobox } from '@vuetify/v0'
 *
 * const combobox = createCombobox({ strict: true })
 *
 * combobox.selection.register({ id: 'a', value: 'Apple' })
 * combobox.selection.register({ id: 'b', value: 'Banana' })
 *
 * combobox.open()
 * combobox.select('a') // query → 'Apple', dropdown closes
 * ```
 */
declare function createCombobox(options?: ComboboxOptions): ComboboxContext;
/**
 * Creates a combobox context with dependency injection support.
 *
 * @param options - Combobox options plus an optional namespace for DI.
 * @returns A context trinity: `[useCombobox, provideCombobox, defaultCombobox]`.
 *
 * @see https://0.vuetifyjs.com/composables/forms/create-combobox
 *
 * @example
 * ```ts
 * import { createComboboxContext } from '@vuetify/v0'
 *
 * const [useCombobox, provideCombobox, combobox] = createComboboxContext({
 *   namespace: 'my-combobox',
 *   strict: true,
 * })
 * ```
 */
declare function createComboboxContext(_options?: ComboboxOptions & {
  namespace?: string;
}): ContextTrinity<ComboboxContext>;
/**
 * Injects the current combobox context from a parent provider.
 *
 * @param namespace - DI namespace. Defaults to `'v0:combobox'`.
 * @returns The combobox context from the nearest provider.
 *
 * @see https://0.vuetifyjs.com/composables/forms/create-combobox
 *
 * @example
 * ```ts
 * import { useCombobox } from '@vuetify/v0'
 *
 * const combobox = useCombobox()
 * combobox.query.value = 'search term'
 * ```
 */
declare function useCombobox(namespace?: string): ComboboxContext;
//#endregion
//#region src/composables/createContext/index.d.ts
type ContextKey<Z> = InjectionKey<Z> | string;
interface CreateContextOptions {
  /** Optional suffix to append to the runtime key */
  suffix?: string;
}
/**
 * Injects a context provided by an ancestor component.
 *
 * @param key The key of the context to inject.
 * @param defaultValue Optional default value if context is not found.
 * @template Z The type of the context.
 * @returns The injected context.
 * @throws An error if the context is not found and no default is provided.
 *
 * @see https://vuejs.org/api/composition-api-dependency-injection.html#inject
 * @see https://0.vuetifyjs.com/composables/foundation/create-context
 *
 * @example
 * ```ts
 * // Without default value
 * const context = useContext<MyContext>('my-context')
 *
 * // With default value
 * const context = useContext<MyContext>('my-context', defaultContext)
 * ```
 */
declare function useContext<Z>(key: ContextKey<Z>, defaultValue?: Z): Z;
/**
 * Provides a context to all descendant components.
 *
 * @param key The key of the context to provide.
 * @param context The context to provide.
 * @param app Optional Vue app instance to provide the context at app level instead of component level.
 * @template Z The type of the context.
 * @returns The provided context.
 *
 * @remarks
 * When `app` parameter is provided, the context is made available to all components in the app.
 * When omitted, the context is provided at the current component level and available to descendants only.
 *
 * @see https://vuejs.org/api/composition-api-dependency-injection.html#provide
 * @see https://0.vuetifyjs.com/composables/foundation/create-context
 *
 * @example
 * ```ts
 * // Component-level provision
 * provideContext<MyContext>('my-context', context)
 *
 * // App-level provision (typically used in plugins)
 * const app = createApp()
 * provideContext<MyContext>('my-context', context, app)
 * ```
 */
declare function provideContext<Z>(key: ContextKey<Z>, context: Z, app?: App): Z;
/**
 * Creates a new context for providing and injecting data.
 *
 * Supports two modes:
 * - **Static key mode**: Pass a string/symbol key. The key is fixed at creation time.
 * - **Dynamic key mode**: Pass nothing or an options object. The key is provided at runtime.
 *
 * @template Z The type of the context.
 * @returns A tuple containing the `useContext` and `provideContext` functions.
 *
 * @see https://vuejs.org/api/composition-api-dependency-injection.html
 * @see https://0.vuetifyjs.com/composables/foundation/create-context
 *
 * @example
 * ```ts
 * // Static key mode - key fixed at creation
 * const [useContext, provideContext] = createContext<ThemeContext>('v0:theme')
 * provideContext(context)              // provides to 'v0:theme'
 * useContext()                         // injects from 'v0:theme'
 *
 * // Dynamic key mode - key provided at runtime
 * const [useContext, provideContext] = createContext<PanelContext>()
 * provideContext('v0:panel', context)  // provides to 'v0:panel'
 * useContext('v0:panel')               // injects from 'v0:panel'
 *
 * // Dynamic key with suffix - suffix appended to runtime key
 * const [useContext, provideContext] = createContext<ItemContext>({ suffix: 'item' })
 * provideContext('v0:panel', context)  // provides to 'v0:panel:item'
 * useContext('v0:panel')               // injects from 'v0:panel:item'
 * ```
 */
declare function createContext<Z>(key: ContextKey<Z>, defaultValue?: Z): readonly [() => Z, (context: Z, app?: App) => Z];
declare function createContext<Z>(options?: CreateContextOptions): readonly [(key: string, defaultValue?: Z) => Z, (key: string, context: Z, app?: App) => Z];
//#endregion
//#region src/composables/createDataGrid/editing.d.ts
interface EditableColumn<T = unknown> {
  readonly id: string;
  readonly editable?: boolean | ((item: T) => boolean);
  readonly validate?: (value: unknown, item?: T) => string | true;
}
/**
 * Minimal structural type of the row registry surface that
 * `createCellEditing` subscribes to for pruning stale state.
 *
 * Compatible with the registry returned by `createDataTable` / spread onto
 * `createDataGrid`. The `on` / `off` channel is needed — handlers subscribe at
 * setup and unsubscribe on scope dispose, so a registry that outlives the
 * editing instance does not accumulate listeners. The payload arrives as
 * `unknown` and is narrowed inside the handler.
 */
interface CellEditingRegistry {
  on: (event: string, listener: (data: unknown) => void) => void;
  off: (event: string, listener: (data: unknown) => void) => void;
}
interface CellEditingOptions<T = unknown> {
  /**
   * Editable columns, read reactively. Accepts a ref or getter so the column
   * set can change after construction — e.g. a grid that derives editables
   * from a live column registry. Resolved via `toValue` on every `edit` /
   * `commit`, so newly-onboarded editable columns are picked up without
   * re-creating the editing instance.
   */
  columns: MaybeRefOrGetter<readonly EditableColumn<T>[]>;
  onEdit?: (row: ID, column: string, value: unknown) => void;
  lookup?: (row: ID) => T | undefined;
  registry?: CellEditingRegistry;
}
interface ActiveCell {
  row: ID;
  column: string;
}
/**
 * Cell editing state and controls returned by {@link createCellEditing}.
 *
 * @example
 * ```ts
 * grid.editing.edit(1, 'email')
 * grid.editing.commit('x@y.z')
 *
 * grid.editing.active.value // { row: 1, column: 'email' } | null
 * grid.editing.error.value  // 'Invalid email' | null
 * grid.editing.dirty        // Map<ID, Map<string, unknown>> (ShallowReactive)
 * ```
 */
interface CellEditing {
  active: Readonly<ShallowRef<ActiveCell | null>>;
  edit: (row: ID, column: string) => void;
  commit: (value: unknown) => void;
  cancel: () => void;
  error: Readonly<ShallowRef<string | null>>;
  /**
   * Map of rows that have staged (uncommitted) cell values. The outer key
   * is the row id; the inner Map is column id → staged value. Empty
   * entries are not pre-created — consumers that want to stage a value
   * insert their own per-row Map (or use the dirty Map's `set`).
   *
   * `dirty` is a consumer-managed staging area for uncommitted values;
   * `commit(value)` commits its explicit `value` argument and merely deletes
   * the matching staged entry — it does not read or auto-flush staged values.
   */
  dirty: Readonly<ShallowReactive<Map<ID, Map<string, unknown>>>>;
}
//#endregion
//#region src/composables/createDataGrid/layout.d.ts
type PinPosition = 'left' | 'right' | false;
interface GridColumnDef extends ColumnNode {
  /** Width as a percentage (0–100). Unset columns share remaining space equally. */
  readonly size?: number;
  /** Minimum width as a percentage. @default 2 */
  readonly minSize?: number;
  /** Maximum width as a percentage. @default 100 */
  readonly maxSize?: number;
  /** Pin position. @default false */
  readonly pinned?: PinPosition;
  /** Allow resizing. @default true */
  readonly resizable?: boolean;
  /** Allow reordering. @default true */
  readonly reorderable?: boolean;
  readonly children?: readonly GridColumnDef[];
}
interface ResolvedColumn {
  id: string;
  index: number;
  /** Current size as a percentage */
  size: number;
  /** Distance from the column's pinning edge — left edge for left/scrollable, right edge for right. Apply directly as the CSS `left` / `right` value for sticky positioning. */
  offset: number;
  pinned: PinPosition;
  resizable: boolean;
  reorderable: boolean;
  minSize: number;
  maxSize: number;
  /** Whether the column is part of the render set. Always `true` for render-set entries; meaningful on `all`, where hidden columns surface as `false`. */
  visible: boolean;
}
interface PinnedRegion {
  left: ResolvedColumn[];
  scrollable: ResolvedColumn[];
  right: ResolvedColumn[];
}
interface ColumnLayout {
  /** Resolved columns for each pin region (hidden columns excluded) */
  pinned: Readonly<Ref<PinnedRegion>>;
  /** All visible resolved columns in display order (hidden columns excluded) */
  columns: Readonly<Ref<ResolvedColumn[]>>;
  /** Every column in display order, including hidden ones, each carrying a `visible` flag — for a column chooser. */
  all: Readonly<Ref<ResolvedColumn[]>>;
  /** Pin a column to a region (or unpin with false) */
  pin: (id: string, position: PinPosition) => void;
  /**
   * Resize a column by delta percentage within its pin region.
   * The neighbor to the right absorbs the inverse delta.
   * No-op for the last column in its region or non-resizable columns.
   */
  resize: (id: string, delta: number) => void;
  /**
   * Move a column from one display-order index to another. Indices address
   * the visible display set (matching `columns`), so hidden columns are not
   * counted. No-op if the resolved top-level group has `reorderable: false`.
   */
  reorder: (from: number, to: number) => void;
  /**
   * Replace visible-column sizes in registry (mount) order, not pin display order.
   * Hidden columns keep their sizes. Length must match the visible leaf count.
   */
  distribute: (sizes: number[]) => void;
  /** Show a previously hidden column */
  show: (id: string) => void;
  /** Hide a column — excludes it from the render set without redistributing */
  hide: (id: string) => void;
  /** Toggle a column's visibility */
  toggle: (id: string) => void;
  /** Restore initial sizes, order, and pins */
  reset: () => void;
}
//#endregion
//#region src/composables/createDataGrid/spanning.d.ts
interface SpanEntry {
  rowSpan: number;
  hidden: boolean;
}
/**
 * Options for {@link createRowSpanning}.
 *
 * @template T Row value type.
 *
 * @example
 * ```ts
 * const options: RowSpanningOptions<Holding> = {
 *   items: computed(() => grid.items.value),
 *   columns: ['group', 'ticker', 'value'],
 *   span: (item, column) => column === 'group' ? 3 : 1,
 * }
 * ```
 */
interface RowSpanningOptions<T = Record<string, unknown>> {
  items: Ref<readonly T[]> | ComputedRef<readonly T[]>;
  columns: MaybeRefOrGetter<readonly string[]>;
  /**
   * Projects the row key from its item and index. Takes precedence over
   * `itemKey` — the grid passes the registry ticket id so the span map shares
   * identity with the rest of the grid. Rows whose projected key is
   * `undefined` are skipped, since their spans can't be addressed.
   */
  key?: (item: T, index: number) => ID | undefined;
  /**
   * Property used to identify each row in the span map when `key` is absent.
   * Rows whose value for this key is `undefined` are skipped, since their
   * spans can't be addressed.
   */
  itemKey?: string;
  /**
   * Resolves the row span for a cell. Return a value < 1 (or `NaN`) to span a
   * single row. When absent, no spans are produced.
   */
  span?: (item: T, column: string) => number;
}
//#endregion
//#region src/composables/createDataGrid/index.d.ts
/**
 * Column registration shape for `createDataGrid`. Extends the data-table
 * column ticket input with grid-specific layout, editing, and spanning config.
 *
 * The extra fields ride on the column ticket — `createRegistry` preserves them
 * via `{ ...registration }` — so layout/editing/spanning read config straight
 * off the registered ticket. Nested `children` config rides inline on the
 * parent ticket, mirroring `DataTableColumnTicketInput`.
 *
 * @template T Row value type.
 *
 * @example
 * ```ts
 * const grid = createDataGrid<Product>()
 *
 * grid.columns.onboard([
 *   { id: 'name', sortable: true, size: 40, pinned: 'left' },
 *   { id: 'price', editable: true, validate: v => Number(v) >= 0 || 'must be positive' },
 * ])
 * ```
 */
interface DataGridColumnTicketInput<T extends object = object> extends DataTableColumnTicketInput<T> {
  /** Width as a percentage (0–100). Unset columns share remaining space equally. */
  size?: number;
  /** Minimum width as a percentage. @default 2 */
  minSize?: number;
  /** Maximum width as a percentage. @default 100 */
  maxSize?: number;
  /** Pin position. @default false */
  pinned?: PinPosition;
  /** Allow resizing. @default true */
  resizable?: boolean;
  /** Allow reordering. @default true */
  reorderable?: boolean;
  /** Whether cells in this column can be edited. A function gates per-row. */
  editable?: boolean | ((item: T) => boolean);
  /** Validate an edited value; return `true` to accept or a string error to reject. */
  validate?: (value: unknown, item?: T) => string | true;
  /** Row span for a cell in this column. */
  span?: (item: T) => number;
  /** Header-group children (recursive). Children are NOT separately registered. */
  children?: readonly DataGridColumnTicketInput<T>[];
}
/**
 * Output ticket returned by `grid.columns.register` / `grid.columns.onboard`.
 *
 * Combines the standard registry ticket fields (`index`, `valueIsIndex`,
 * `unregister`) with the column-shape fields from {@link DataGridColumnTicketInput}.
 *
 * @template T Row value type.
 */
type DataGridColumnTicket<T extends object = object> = DataTableColumnTicket<T> & DataGridColumnTicketInput<T>;
/**
 * Factory options for {@link createDataGrid}. Extends {@link DataTableOptions}
 * with cell-editing, row-spanning, and row-order-preservation config.
 *
 * @template T Row value type.
 *
 * @example
 * ```ts
 * const grid = createDataGrid<Product>({
 *   editing: { onEdit (row, column, value, item) { persist(item.id, column, value) } },
 *   rowSpanning: (item, column) => column === 'group' ? 3 : 1,
 *   preserveRowOrder: true,
 * })
 * ```
 */
interface DataGridOptions<T extends object> extends DataTableOptions<T> {
  editing?: {
    onEdit?: (row: ID, column: string, value: unknown, item: T) => void;
  };
  preserveRowOrder?: MaybeRefOrGetter<boolean>;
  rowSpanning?: (item: T, column: string) => number;
}
/**
 * The reactive grid instance returned by {@link createDataGrid}. Spreads the
 * inherited {@link DataTableContext} surface and adds `layout`, `rows`,
 * `editing`, `spans`, `orderedItems`, and `rank`. Does not override parent
 * `sortedItems` (PHILOSOPHY §2.6).
 *
 * @template T Row value type.
 *
 * @example
 * ```ts
 * const grid = createDataGrid<Product>()
 *
 * grid.layout.pin('name', 'left')
 * grid.rows.move(id, 0)
 * grid.editing.edit(1, 'email')
 * grid.spans.value.get(id)?.get('group')
 * grid.orderedItems.value
 * grid.rank(source)
 * ```
 */
interface DataGridContext<T extends object> extends DataTableContext<T> {
  /**
   * Column registry, widened to the grid column ticket shape. Covariant
   * override of the inherited {@link DataTableContext.columns} (PHILOSOPHY
   * §2.6): every grid-added column field (`size`, `pinned`, `editable`,
   * `validate`, `span`, `minSize`, `maxSize`, `resizable`, `reorderable`) is
   * optional, so the widened input still satisfies the base `register` /
   * `onboard` signatures and runtime behavior is unchanged.
   */
  columns: RegistryContext<DataGridColumnTicketInput<T>, DataGridColumnTicket<T>>;
  /**
   * Full filter+sort+row-order list before pagination. When row order is
   * not dirty this is `sortedItems`. Rank a source array with `rank()`
   * so `rows.move()` reorders the DOM.
   *
   * @example
   * ```ts
   * grid.rows.move(id, 0)
   * grid.orderedItems.value[0]
   * ```
   */
  orderedItems: Readonly<Ref<readonly T[]>>;
  /**
   * Rank a source array by `orderedItems`. v-for this so rows register;
   * missing ranks stay in source order. Ranks by `orderedItems` (not
   * `sortedItems`) so `rows.move()` is visible.
   *
   * @example
   * ```ts
   * grid.rows.move(id, 0)
   * grid.rank(source)[0]
   * ```
   */
  rank: <U extends object>(source: readonly U[]) => U[];
  layout: ColumnLayout;
  rows: {
    order: Readonly<Ref<ID[]>>;
    move: (id: ID, toIndex: number) => void;
    reset: () => void;
  };
  editing: CellEditing;
  spans: ComputedRef<Map<ID, Map<string, SpanEntry>>>;
}
interface DataGridContextOptions<T extends object> extends DataGridOptions<T> {
  namespace?: string;
}
/**
 * Creates a data grid instance with layout, editing, row ordering, and spanning
 * layered on top of the createDataTable pipeline.
 *
 * Rows live on the inherited registry surface — register them with
 * `grid.onboard(rows.map(value => ({ id: value.id, value })))` or
 * `grid.register({ id, value })`.
 *
 * @param options Data grid options
 * @returns Data grid context
 *
 * @example
 * ```ts
 * const grid = createDataGrid({ pagination: { page: 1 } })
 *
 * grid.columns.onboard([
 *   { id: 'name', sortable: true },
 *   { id: 'progress', editable: true, validate: v => Number(v) >= 0 || 'must be positive' },
 * ])
 *
 * grid.onboard(rows.map(value => ({ id: value.id, value })))
 * grid.layout.pin('name', 'left')
 * grid.rows.move(rowId, 0)
 * grid.editing.edit(row.id, 'progress')
 * ```
 */
declare function createDataGrid<T extends object>(_options?: DataGridOptions<T>): DataGridContext<T>;
/**
 * Creates a data grid context with dependency injection support.
 *
 * @param options Data grid context options including namespace
 * @returns A trinity tuple: [useDataGridContext, provideDataGridContext, defaultContext]
 *
 * @example
 * ```ts
 * const [useDataGrid, provideDataGrid, grid] = createDataGridContext({
 *   namespace: 'v0:projects',
 * })
 *
 * grid.columns.onboard(columns)
 * grid.onboard(rows.map(value => ({ id: value.id, value })))
 * provideDataGrid()
 * const ctx = useDataGrid()
 * ```
 */
declare function createDataGridContext<T extends object>(_options?: DataGridContextOptions<T>): ContextTrinity<DataGridContext<T>>;
/**
 * Returns the current data grid context from dependency injection.
 *
 * @param namespace The namespace for the data grid context. @default 'v0:data-grid'
 * @returns The current data grid context
 *
 * @example
 * ```ts
 * const grid = useDataGrid<Project>()
 *
 * grid.layout.pin('id', 'left')
 * grid.rows.reset()
 * ```
 */
declare function useDataGrid<T extends object>(namespace?: string): DataGridContext<T>;
//#endregion
//#region src/composables/useRules/adapters/standard.d.ts
/**
 * Minimal duck-typed interface matching the Standard Schema spec (v1).
 * No npm dependency — structurally compatible with Zod (v3.24+), Valibot, ArkType, and others.
 *
 * @see https://standardschema.dev/
 */
interface StandardSchemaIssue {
  readonly message: string;
  readonly path?: ReadonlyArray<PropertyKey | {
    readonly key: PropertyKey;
  }> | undefined;
}
interface StandardSchemaResult {
  readonly value?: unknown;
  readonly issues?: ReadonlyArray<StandardSchemaIssue> | undefined;
}
interface StandardSchemaV1 {
  readonly '~standard': {
    readonly version: 1;
    readonly vendor: string;
    readonly validate: (value: unknown) => StandardSchemaResult | Promise<StandardSchemaResult>;
  };
}
/**
 * Type guard for Standard Schema objects.
 * Checks for the `~standard` property that all conforming libraries expose.
 *
 * @param value The value to check.
 * @returns `true` if the value conforms to the Standard Schema interface.
 */
declare function isStandardSchema(value: unknown): value is StandardSchemaV1;
//#endregion
//#region src/composables/useRules/index.d.ts
/** A rule alias: a string name referencing a registered predicate. */
type RuleAlias = string;
/**
 * Input accepted by resolve(): alias strings, raw validation functions,
 * or Standard Schema objects (Zod v3.24+, Valibot, ArkType, etc.).
 */
type RuleInput = RuleAlias | FormValidationRule | StandardSchemaV1;
/** A map of alias names to predicate functions. */
interface RuleAliases {
  [name: string]: FormValidationRule;
}
interface RulesContext {
  /** Resolve aliases, functions, and Standard Schema objects to FormValidationRule[]. */
  resolve: (rules: RuleInput[]) => FormValidationRule[];
  /** The alias map (custom aliases registered via options). */
  aliases: RuleAliases;
}
interface RulesOptions {
  /** Custom aliases to register. Each alias is a predicate (FormValidationRule). */
  aliases?: Partial<RuleAliases>;
}
interface RulesContextOptions extends RulesOptions {
  namespace?: string;
}
/**
 * Creates a new rules instance.
 *
 * @param options The options for the rules instance.
 * @returns A new rules instance with resolve() and aliases.
 *
 * @see https://0.vuetifyjs.com/composables/plugins/use-rules
 *
 * @example
 * ```ts
 * import { createRules } from '@vuetify/v0'
 *
 * const rules = createRules({
 *   aliases: {
 *     required: (v) => !!v || false,
 *   },
 * })
 *
 * // Resolve alias strings to validation functions
 * const resolved = rules.resolve(['required'])
 * ```
 */
declare function createRules(_options?: RulesOptions): RulesContext;
/**
 * Creates a fallback rules instance for use outside component scope.
 * No locale lookup — `false` returns fall back to the alias name.
 *
 * @returns A standalone rules context with empty aliases.
 */
declare function createRulesFallback(): RulesContext;
declare const createRulesContext: <_E extends RulesContext = RulesContext>(_options?: RulesContextOptions | undefined) => ContextTrinity<_E>, createRulesPlugin: (_options?: RulesContextOptions | undefined) => Plugin, useRules: <_E extends RulesContext = RulesContext>(namespace?: string) => _E;
//#endregion
//#region src/composables/createValidation/index.d.ts
/**
 * Input type for validation tickets.
 * Each ticket represents a single validation rule.
 */
interface ValidationTicketInput extends GroupTicketInput<FormValidationRule> {}
/**
 * Output type for validation tickets.
 * Includes selection methods from GroupTicket for enabling/disabling rules.
 */
type ValidationTicket<Z extends ValidationTicketInput = ValidationTicketInput> = GroupTicket<Z>;
/**
 * Context for managing validation rules for a single input.
 *
 * @template Z The input ticket type.
 * @template E The output ticket type.
 */
interface ValidationContext<Z extends ValidationTicketInput = ValidationTicketInput, E extends ValidationTicket<Z> = ValidationTicket<Z>> extends Omit<GroupContext<Z, E>, 'register' | 'onboard' | 'reset'> {
  register: (rule: RuleInput | Partial<Z>) => E;
  onboard: (rules: (RuleInput | Partial<Z>)[]) => E[];
  /** Run validation against all active (selected) rules. */
  validate: (value?: unknown, silent?: boolean) => Promise<boolean>;
  /** Reset errors and validation state. Does not affect rule selection. */
  reset: () => void;
  /** Current validation error messages. */
  errors: ShallowRef<string[]>;
  /** Tri-state: null (not validated), true (valid), false (invalid). */
  isValid: ShallowRef<boolean | null>;
  /** Whether async validation is in progress. */
  isValidating: ShallowRef<boolean>;
}
interface ValidationOptions extends GroupOptions {
  /** Initial rules to register. */
  rules?: RuleInput[];
  /** Value source for validate() when called without arguments. */
  value?: MaybeRefOrGetter<unknown>;
  /**
   * Form injection key. Must match the parent Form's `namespace`.
   *
   * @default 'v0:form'
   *
   * @example
   * ```ts
   * createValidation({ formNamespace: 'v0:billing' })
   * ```
   */
  formNamespace?: string;
}
/**
 * Creates a per-input validation instance.
 *
 * Built on `createGroup` — each registered rule becomes a ticket that can be
 * enabled/disabled via selection methods (`select`, `unselect`, `toggle`).
 * Only selected (active) rules run during validation.
 *
 * @param options The options for the validation instance.
 * @returns A new validation context.
 *
 * @see https://0.vuetifyjs.com/composables/forms/create-validation
 *
 * @example
 * ```ts
 * import { createValidation } from '@vuetify/v0'
 *
 * const validation = createValidation({
 *   rules: [
 *     v => !!v || 'Required',
 *     v => /^.+@\S+\.\S+$/.test(String(v)) || 'Invalid email',
 *   ],
 * })
 *
 * await validation.validate('')
 *
 * console.log(validation.errors.value) // ['Required', 'Invalid email']
 *
 * validation.reset()
 * ```
 */
declare function createValidation(_options?: ValidationOptions): ValidationContext;
//#endregion
//#region src/composables/createForm/index.d.ts
type FormValidationResult = string | boolean | Promise<string | boolean>;
type FormValidationRule = (value: unknown) => FormValidationResult;
type FormValue = ValidationContext;
/**
 * User-facing input shape for form tickets.
 */
interface FormTicketInput extends RegistryTicketInput<FormValue> {}
/**
 * A registered validation in the form registry.
 *
 * @template Z The input ticket type that extends FormTicketInput.
 */
type FormTicket<Z extends FormTicketInput = FormTicketInput> = RegistryTicket<FormValue> & Z;
/**
 * Context for coordinating validation across multiple fields.
 *
 * @template Z The input ticket type.
 * @template E The output ticket type.
 */
interface FormContext<Z extends FormTicketInput = FormTicketInput, E extends FormTicket<Z> = FormTicket<Z>> extends Omit<RegistryContext<E>, 'register' | 'onboard'> {
  /** Register a validation context with the form. */
  register: (registration: Partial<Z> & {
    value: FormValue;
  }) => E;
  /** Submit: validate specific fields or all. */
  submit: (id?: ID | ID[]) => Promise<boolean>;
  /** Reset all registered validations. */
  reset: () => void;
  /** Whether the form is disabled. Components can read this to conditionally disable inputs. */
  disabled: MaybeRefOrGetter<boolean>;
  /** Whether the form is readonly. Components can read this to conditionally disable inputs. */
  readonly: MaybeRefOrGetter<boolean>;
  /** Aggregate: true if all validations valid, false if any invalid, null if any unvalidated. */
  isValid: ComputedRef<boolean | null>;
  /** Aggregate: true if any validation is in progress. */
  isValidating: ComputedRef<boolean>;
}
interface FormOptions extends RegistryOptions {
  /** Whether the form starts disabled. */
  disabled?: MaybeRefOrGetter<boolean>;
  /** Whether the form starts readonly. */
  readonly?: MaybeRefOrGetter<boolean>;
}
interface FormContextOptions extends FormOptions {
  namespace?: string;
}
/**
 * Creates a new form instance.
 *
 * A form is a pure registry of validation contexts. Validations register
 * themselves via `useForm()` injection. The form coordinates submit, reset,
 * and aggregate state across all registered validations.
 *
 * @param options The options for the form instance.
 * @returns A new form context.
 *
 * @see https://0.vuetifyjs.com/composables/forms/create-form
 *
 * @example
 * ```ts
 * import { createForm, createValidation } from '@vuetify/v0'
 * import { shallowRef } from 'vue'
 *
 * const form = createForm()
 *
 * // Each validation is one input — form is just the coordinator
 * const email = shallowRef('')
 * const validation = createValidation({
 *   value: email,
 *   rules: ['required', 'email'],
 * })
 *
 * form.register({ value: validation })
 *
 * await form.submit()
 * form.reset()
 * ```
 */
declare function createForm(_options?: FormOptions): FormContext;
/**
 * Creates a new form context using the Trinity pattern.
 *
 * @param options The options for the form context.
 * @returns A Trinity tuple: [useFormContext, provideFormContext, formContext]
 *
 * @see https://0.vuetifyjs.com/composables/forms/create-form
 *
 * @example
 * ```ts
 * import { createFormContext } from '@vuetify/v0'
 *
 * export const [useMyForm, provideMyForm, myForm] = createFormContext()
 * ```
 */
declare function createFormContext(_options?: FormContextOptions): ContextTrinity<FormContext>;
/**
 * Returns the current form instance.
 *
 * @param namespace The namespace for the form context. Defaults to `'v0:form'`.
 * @returns The current form instance, or undefined if not provided.
 *
 * @see https://0.vuetifyjs.com/composables/forms/create-form
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 *   import { useForm } from '@vuetify/v0'
 *
 *   const form = useForm()
 * </script>
 * ```
 */
declare function useForm<Z extends FormTicketInput = FormTicketInput, E extends FormTicket<Z> = FormTicket<Z>, R extends FormContext<Z, E> = FormContext<Z, E>>(namespace?: string): R | undefined;
//#endregion
//#region src/composables/createInput/index.d.ts
/** Visual state of the input for styling purposes. */
type InputState = 'pristine' | 'valid' | 'invalid';
interface InputOptions<T = string> {
  /** Value source — caller owns this ref. */
  value: Ref<T>;
  /** Unique identifier (auto-generated if omitted). */
  id?: ID;
  /** Display label. */
  label?: string;
  /** Form field name. */
  name?: string;
  /** Associate with form by ID. */
  form?: string;
  /**
   * Form injection key. Must match the parent Form's `namespace`.
   *
   * @default 'v0:form'
   */
  formNamespace?: string;
  /**
   * Whether required. When true, a presence rule is registered so Form
   * submit fails on empty values even with `novalidate`.
   */
  required?: boolean;
  /** Disabled state. */
  disabled?: MaybeRefOrGetter<boolean>;
  /** Readonly state. */
  readonly?: MaybeRefOrGetter<boolean>;
  /** Validation rules. */
  rules?: (FormValidationRule | RuleAlias | StandardSchemaV1)[];
  /** Manual error state override — forces invalid. */
  error?: MaybeRefOrGetter<boolean>;
  /** Manual error messages — merged with rule-based errors. */
  errorMessages?: MaybeRefOrGetter<MaybeArray<string> | undefined>;
  /** Predicate for "has content". */
  dirty?: (value: T) => boolean;
  /** Equality check for pristine tracking. @default === */
  equals?: (a: T, b: T) => boolean;
}
interface InputContext<T = string> {
  readonly id: ID;
  readonly label?: string;
  readonly name?: string;
  readonly form?: string;
  readonly required?: boolean;
  readonly descriptionId: string;
  readonly errorId: string;
  descriptions: RegistryContext;
  fieldErrors: RegistryContext;
  hasDescription: Readonly<Ref<boolean>>;
  hasError: Readonly<Ref<boolean>>;
  value: Ref<T>;
  isDirty: Readonly<Ref<boolean>>;
  isFocused: ShallowRef<boolean>;
  isDisabled: Readonly<Ref<boolean>>;
  isReadonly: Readonly<Ref<boolean>>;
  isPristine: Readonly<Ref<boolean>>;
  isTouched: ShallowRef<boolean>;
  errors: Readonly<Ref<string[]>>;
  isValid: Readonly<Ref<boolean | null>>;
  isValidating: Readonly<Ref<boolean>>;
  validate: () => Promise<boolean>;
  reset: () => void;
  state: Readonly<Ref<InputState>>;
}
declare function createInput<T = string>(options: InputOptions<T>): InputContext<T>;
//#endregion
//#region src/composables/createSortable/index.d.ts
/**
 * Input shape passed to `register` / `onboard`. Inherits all model fields.
 *
 * @template V Type of the per-ticket value.
 *
 * @example
 * ```ts
 * interface TaskTicket extends SortableTicketInput {
 *   value: { id: number; label: string }
 * }
 *
 * const sortable = createSortable<TaskTicket>()
 * sortable.register({ value: { id: 1, label: 'A' } })
 * ```
 */
type SortableTicketInput<V = unknown> = ModelTicketInput<V>;
/**
 * Output ticket returned by `register` / `onboard` / `get`.
 * Aliased to `ModelTicket<Z>` — sortable adds no per-ticket fields.
 *
 * @template Z The input ticket type (carries the value type V).
 */
type SortableTicket<Z extends SortableTicketInput = SortableTicketInput> = ModelTicket<Z>;
/**
 * Options accepted by `createSortable`.
 *
 * @example
 * ```ts
 * const sortable = createSortable({
 *   disabled: toRef(() => isReadOnlyMode.value),
 * })
 * ```
 */
interface SortableOptions extends Omit<ModelOptions, 'events'> {
  /**
   * Mutation gate. When truthy, `move` / `swap` / `reorder` silently no-op.
   *
   * @default false
   * @remarks Per-ticket `disabled` is honored at the `move` and `swap` call sites
   * for that ticket. `reorder` **bypasses** per-ticket `disabled` — it's a bulk
   * operation declaring the canonical order, and applying that order may relocate
   * disabled tickets. `register` / `onboard` / `unregister` are NEVER gated —
   * those are composition, not user-driven reorder.
   *
   * @example
   * ```ts
   * const sortable = createSortable({ disabled: toRef(() => isSaving.value) })
   * ```
   */
  disabled?: MaybeRefOrGetter<boolean>;
}
/**
 * Payload of the `move:ticket` event.
 *
 * @example
 * ```ts
 * sortable.on('move:ticket', ({ ticket, from, to }) => {
 *   console.log(ticket.id, from, to)
 * })
 * ```
 */
interface SortableMovePayload<E extends SortableTicket = SortableTicket> {
  ticket: E;
  from: number;
  to: number;
}
/**
 * Listener-binding signature for a sortable instance — a typed overload for
 * `move:ticket` plus the registry's generic event channel.
 *
 * @template E Output ticket type.
 */
type SortableEventListener<E extends SortableTicket = SortableTicket> = {
  (event: 'move:ticket', cb: (data: SortableMovePayload<E>) => void): void;
  <K extends Extensible<RegistryEventName>>(event: K, cb: RegistryEventCallback<E, K>): void;
};
/**
 * Public API of a sortable instance.
 *
 * @template Z Input ticket type.
 * @template E Output ticket type.
 */
interface SortableContext<Z extends SortableTicketInput = SortableTicketInput, E extends SortableTicket<Z> = SortableTicket<Z>> extends Omit<ModelContext<Z, E>, 'on' | 'off' | 'move'> {
  /**
   * Subscribe to the typed `move:ticket` event with a strongly-typed payload.
   *
   * @example
   * ```ts
   * sortable.on('move:ticket', ({ ticket, from, to }) => {
   *   console.log(ticket.id, from, to)
   * })
   * ```
   */
  on: SortableEventListener<E>;
  /**
   * Unsubscribe from a `move:ticket` listener. Must be called with the same callback reference used to subscribe.
   *
   * @example
   * ```ts
   * function onMove ({ ticket, from, to }: SortableMovePayload) {
   *   console.log(ticket.id, from, to)
   * }
   *
   * sortable.on('move:ticket', onMove)
   * // later...
   * sortable.off('move:ticket', onMove)
   * ```
   */
  off: SortableEventListener<E>;
  /**
   * Move a ticket to a target index. Other tickets shift to fill.
   * Emits `move:ticket` once when the index actually changes — a move whose
   * `toIndex` already equals the ticket's current index is a no-op.
   * No-ops when the root sortable is disabled or when the ticket is disabled.
   *
   * @param id Ticket id to move.
   * @param toIndex Target index (zero-based).
   * @returns The moved ticket, or `undefined` when the move was gated or the id is unknown.
   *
   * @example
   * ```ts
   * sortable.move(ticket.id, 2)
   * ```
   */
  move: (id: ID, toIndex: number) => E | undefined;
  /**
   * Swap two tickets' positions. Emits `move:ticket` twice — once per ticket.
   * No-ops when the root sortable is disabled or when either ticket is disabled.
   *
   * @param a Ticket id at one position.
   * @param b Ticket id at the other position.
   *
   * @example
   * ```ts
   * sortable.swap(a.id, b.id)
   * ```
   */
  swap: (a: ID, b: ID) => void;
  /**
   * Set the canonical order in one shot.
   *
   * @param ids Permutation of currently-registered ticket ids.
   *
   * @remarks
   * Validates `ids.length === registry.size` and that every id is unique and known.
   * Logs a warning via `useLogger()` and silently no-ops if any check fails — drag
   * handlers that race against concurrent unregisters won't crash.
   *
   * Honors root `disabled` (whole call no-ops). Per-ticket `disabled` is **ignored** —
   * `reorder` is a bulk operation declaring the canonical order, and applying that
   * order may move disabled tickets. If you want disabled tickets pinned, exclude
   * them from the ids you pass.
   *
   * @example
   * ```ts
   * sortable.reorder([c.id, a.id, b.id])
   * ```
   */
  reorder: (ids: ID[]) => void;
}
/**
 * Create an ordered-list state primitive.
 *
 * @param options Sortable options.
 * @returns A {@link SortableContext} that extends {@link ModelContext}.
 *
 * @example
 * ```ts
 * const sortable = createSortable<Todo>()
 * sortable.onboard(todos.value.map(value => ({ value })))
 * ```
 */
declare function createSortable<Z extends SortableTicketInput = SortableTicketInput, E extends SortableTicket<Z> = SortableTicket<Z>>(_options?: SortableOptions): SortableContext<Z, E>;
//#endregion
//#region src/composables/createKanban/index.d.ts
/**
 * Options accepted by `createKanban`.
 *
 * @example
 * ```ts
 * import { createKanban } from '@vuetify/v0'
 * import { shallowRef, toRef } from 'vue'
 *
 * const isReadOnly = shallowRef(false)
 * const kanban = createKanban({ disabled: toRef(() => isReadOnly.value) })
 * ```
 */
interface KanbanOptions extends Omit<SortableOptions, 'events'> {
  /**
   * Mutation gate. When truthy, `transfer` and column-level mutations no-op.
   *
   * @default false
   */
  disabled?: MaybeRefOrGetter<boolean>;
}
/**
 * Input shape for a column ticket. Parameterized over the per-column inner
 * ticket type so `accept` is typed against the caller's domain.
 *
 * @template ItemZ The inner ticket input type (extends `SortableTicketInput`).
 * @template V The column's own value type.
 *
 * @example
 * ```ts
 * import type { KanbanColumnTicketInput, SortableTicketInput } from '@vuetify/v0'
 *
 * interface CardTicket extends SortableTicketInput {
 *   value: { title: string }
 * }
 *
 * interface BoardColumn extends KanbanColumnTicketInput<CardTicket> {
 *   value: { title: string; color: string }
 * }
 * ```
 */
interface KanbanColumnTicketInput<ItemZ extends SortableTicketInput = SortableTicketInput, V = unknown> extends SortableTicketInput<V> {
  /**
   * Per-column mutation gate. When truthy, transfers into and out of this
   * column are blocked, and the column's inner `items` sortable is disabled
   * (move / swap / reorder no-op). Column-level operations on
   * `kanban.columns` are unaffected — those are gated by the kanban-level
   * `disabled`.
   *
   * @default false
   */
  disabled?: MaybeRefOrGetter<boolean>;
  /**
   * Predicate veto for incoming transfers. Synchronous boolean return:
   * `true` accepts; `false` rejects (silent no-op). Async predicates are
   * rejected at runtime with a warning.
   *
   * @param ticket The item being transferred (from the source column).
   * @param from The source column id.
   * @param toIndex The target index inside this destination column.
   *
   * @example
   * ```ts
   * const review = kanban.columns.register({
   *   value: { title: 'Review' },
   *   accept: (ticket, from) => from !== archiveColumn.id,
   * })
   * ```
   */
  accept?: (ticket: SortableTicket<ItemZ>, from: ID, toIndex: number) => boolean;
}
/**
 * Output ticket returned from `kanban.columns.register`. Extends `SortableTicket`
 * with the column's own inner sortable on `items`.
 *
 * @template ItemZ Inner ticket input type.
 * @template Z Column input type.
 *
 * @example
 * ```ts
 * import { createKanban } from '@vuetify/v0'
 *
 * const kanban = createKanban()
 * const todo = kanban.columns.register({ value: { title: 'Todo' } })
 * todo.items.register({ value: { title: 'Write spec' } })
 * console.log(todo.id, todo.value.title, todo.items.size)
 * ```
 */
type KanbanColumnTicket<ItemZ extends SortableTicketInput = SortableTicketInput, Z extends KanbanColumnTicketInput<ItemZ> = KanbanColumnTicketInput<ItemZ>> = SortableTicket<Z> & {
  items: SortableContext<ItemZ>;
};
/**
 * Payload of the `transfer:ticket` event on the kanban bus.
 *
 * @example
 * ```ts
 * import { createKanban } from '@vuetify/v0'
 *
 * const kanban = createKanban()
 *
 * kanban.on('transfer:ticket', ({ ticket, from, to, toIndex }) => {
 *   console.log(ticket.id, from, '→', to, '@', toIndex)
 * })
 * ```
 */
interface KanbanTransferPayload<ItemZ extends SortableTicketInput = SortableTicketInput> {
  ticket: SortableTicket<ItemZ>;
  from: ID;
  to: ID;
  fromIndex: number;
  toIndex: number;
}
/**
 * Listener signature for the kanban-level `transfer:ticket` event. Registry
 * events (`register:ticket`, `unregister:ticket`, etc.) live on the columns
 * registry — subscribe via `kanban.columns.on(...)` rather than `kanban.on(...)`.
 *
 * @example
 * ```ts
 * import { createKanban } from '@vuetify/v0'
 *
 * const kanban = createKanban()
 *
 * kanban.on('transfer:ticket', ({ ticket, from, to, toIndex }) => {
 *   console.log(ticket.id, from, '→', to, '@', toIndex)
 * })
 * ```
 */
type KanbanEventListener<ItemZ extends SortableTicketInput = SortableTicketInput> = (event: 'transfer:ticket', cb: (data: KanbanTransferPayload<ItemZ>) => void) => void;
/**
 * Public context returned by `createKanban`.
 *
 * @example
 * ```ts
 * import { createKanban } from '@vuetify/v0'
 * import type { KanbanColumnTicketInput, SortableTicketInput } from '@vuetify/v0'
 *
 * interface CardTicket extends SortableTicketInput {
 *   value: { title: string }
 * }
 *
 * interface BoardColumn extends KanbanColumnTicketInput<CardTicket> {
 *   value: { title: string }
 * }
 *
 * const kanban = createKanban<CardTicket, BoardColumn>()
 *
 * const [todo, done] = kanban.columns.onboard([
 *   { value: { title: 'Todo' } },
 *   { value: { title: 'Done' } },
 * ])
 *
 * const card = todo.items.register({ value: { title: 'Write spec' } })
 *
 * kanban.on('transfer:ticket', ({ ticket, from, to, toIndex }) => {
 *   console.log(`${ticket.id}: ${from} → ${to} @ ${toIndex}`)
 * })
 *
 * kanban.transfer(card.id, done.id, 0)
 * ```
 */
interface KanbanContext<ItemZ extends SortableTicketInput = SortableTicketInput, ColZ extends KanbanColumnTicketInput<ItemZ> = KanbanColumnTicketInput<ItemZ>> {
  /**
   * Column registry. Use this for column register / unregister / move / swap / reorder.
   *
   * @remarks
   * Unregistering a column disposes its `items` sortable — all of the column's
   * tickets are dropped and any subscribers attached to `column.items` are
   * cleared. The internal cleanup runs before consumer-registered
   * `unregister:ticket` handlers, so you cannot rescue items from inside that
   * callback. To preserve items, move them before calling `unregister`.
   *
   * `columns.dispose` is the board cascade — the same function as
   * `kanban.dispose()` — not a columns-only wipe.
   *
   * @example
   * ```ts
   * import { createKanban } from '@vuetify/v0'
   *
   * const kanban = createKanban<CardTicket, BoardColumn>()
   * const todo = kanban.columns.register({ value: { title: 'Todo' } })
   * todo.items.register({ value: { title: 'Write spec' } })
   * kanban.columns.move(todo.id, 1)
   * ```
   *
   * @example
   * ```ts
   * // Reflow items into a fallback column before disposing the source column.
   * for (const item of todo.items.values()) {
   *   trash.items.register({ id: item.id, value: item.value })
   * }
   * todo.unregister()
   * ```
   */
  columns: SortableContext<ColZ, KanbanColumnTicket<ItemZ, ColZ>>;
  /**
   * Move an item across columns. Same-column transfer (where `toColumnId`
   * matches the item's current column) collapses to `column.items.move` and
   * does not emit `transfer:ticket`.
   *
   * Returns the moved ticket, or `undefined` when gated (kanban / source / destination /
   * item disabled, destination.accept rejected, unknown id, duplicate destination id).
   *
   * @example
   * ```ts
   * import { createKanban } from '@vuetify/v0'
   *
   * const kanban = createKanban()
   * const [todo, done] = kanban.columns.onboard([{ value: 'Todo' }, { value: 'Done' }])
   * const card = todo.items.register({ value: 'Write spec' })
   *
   * const moved = kanban.transfer(card.id, done.id, 0)
   * if (moved) console.log('landed at', moved.index)
   *
   * // Returns undefined when gated by disabled, accept, or unknown ids:
   * kanban.transfer(card.id, 'no-such-column', 0) // → undefined
   * ```
   */
  transfer: (id: ID, toColumnId: ID, toIndex: number) => SortableTicket<ItemZ> | undefined;
  /**
   * Subscribe to the kanban-level `transfer:ticket` event, fired after each
   * successful cross-column move. Registry events (`register:ticket`,
   * `unregister:ticket`, `move:ticket`) live on the columns registry — use
   * `kanban.columns.on(...)` for those, or `column.items.on(...)` for
   * per-column intra-column reorder events.
   *
   * @example
   * ```ts
   * import { createKanban } from '@vuetify/v0'
   *
   * const kanban = createKanban()
   *
   * kanban.on('transfer:ticket', ({ ticket, from, to, fromIndex, toIndex }) => {
   *   console.log(ticket.id, from, '→', to, '@', toIndex)
   * })
   * ```
   */
  on: KanbanEventListener<ItemZ>;
  /**
   * Unsubscribe from the `transfer:ticket` event. Must be called with the same
   * callback reference used to subscribe.
   *
   * @example
   * ```ts
   * import { createKanban } from '@vuetify/v0'
   * import type { KanbanTransferPayload } from '@vuetify/v0'
   *
   * const kanban = createKanban<CardTicket>()
   *
   * function onTransfer (data: KanbanTransferPayload<CardTicket>) {
   *   console.log(data.ticket.id)
   * }
   *
   * kanban.on('transfer:ticket', onTransfer)
   * // later
   * kanban.off('transfer:ticket', onTransfer)
   * ```
   */
  off: KanbanEventListener<ItemZ>;
  /**
   * Tear down the entire board: every column's inner `items` sortable, the
   * internal id → column lookup, the `transfer:ticket` event bus, and the
   * columns registry itself. `kanban.columns.dispose` is the same function.
   * Repeatable — a later call after `columns.register` tears down the rebuilt
   * board the same way.
   *
   * @remarks
   * Registry `dispose()` clears listeners then `clear()`, and `clear()` never
   * emits `unregister:ticket`, so the per-column cleanup subscribed on that
   * event would not run. This method walks current columns and disposes each
   * inner sortable first, then re-binds that cleanup so a rebuilt board still
   * cascades on column unregister.
   *
   * @example
   * ```ts
   * import { createKanban } from '@vuetify/v0'
   *
   * const kanban = createKanban()
   * kanban.columns.register({ value: { title: 'Todo' } })
   * // later
   * kanban.dispose()
   * ```
   */
  dispose: () => void;
}
/**
 * Create a headless two-level sortable orchestrator.
 *
 * @param options Kanban options (currently only `disabled`).
 * @returns A {@link KanbanContext}.
 *
 * @example
 * ```ts
 * import { createKanban } from '@vuetify/v0'
 * import type { KanbanColumnTicketInput, SortableTicketInput } from '@vuetify/v0'
 *
 * interface CardTicket extends SortableTicketInput {
 *   value: { title: string }
 * }
 *
 * interface BoardColumn extends KanbanColumnTicketInput<CardTicket> {
 *   value: { title: string }
 * }
 *
 * const kanban = createKanban<CardTicket, BoardColumn>()
 *
 * const todo = kanban.columns.register({ value: { title: 'Todo' } })
 * const review = kanban.columns.register({
 *   value: { title: 'Review' },
 *   accept: card => card.value.title.length > 0,
 * })
 *
 * const spec = todo.items.register({ value: { title: 'Write spec' } })
 * kanban.transfer(spec.id, review.id, 0)
 * ```
 */
declare function createKanban<ItemZ extends SortableTicketInput = SortableTicketInput, ColZ extends KanbanColumnTicketInput<ItemZ> = KanbanColumnTicketInput<ItemZ>>(_options?: KanbanOptions): KanbanContext<ItemZ, ColZ>;
//#endregion
//#region src/composables/createNested/types.d.ts
/**
 * Input type for nested tickets - what users provide to register().
 * Extend this interface to add custom properties.
 *
 * @template V The type of the ticket value.
 */
interface NestedTicketInput<V = unknown> extends GroupTicketInput<V> {
  /** ID of the parent ticket, or undefined if this is a root item */
  parentId?: ID;
  /** Whether this ticket is initially active */
  active?: boolean;
  /** Reference to the DOM element for focus management */
  el?: MaybeRefOrGetter<Element | null | undefined>;
}
/**
 * Output type for nested tickets - what users receive from get().
 * Includes all input properties plus tree traversal and state methods.
 *
 * @template Z The input ticket type that extends NestedTicketInput.
 */
type NestedTicket<Z extends NestedTicketInput = NestedTicketInput> = GroupTicket<Z> & {
  /** ID of the parent ticket, or undefined if this is a root item. Static — set at registration time. */
  parentId: ID | undefined;
  /** Reference to the DOM element for focus management */
  el: MaybeRefOrGetter<Element | null | undefined> | undefined;
  /** Whether this ticket is currently open/expanded */
  isOpen: Readonly<Ref<boolean>>;
  /** Whether this ticket is currently active/highlighted */
  isActive: Readonly<Ref<boolean>>;
  /** Whether this ticket is a leaf node (has no children) */
  isLeaf: Readonly<Ref<boolean>>;
  /** Depth in tree (0 = root) */
  depth: Readonly<Ref<number>>;
  /** Open/expand this ticket */
  open: () => void;
  /** Close/collapse this ticket */
  close: () => void;
  /** Flip this ticket's open/closed state */
  flip: () => void;
  /** Reveal this ticket by opening all ancestors */
  reveal: () => void;
  /** Activate/highlight this ticket */
  activate: () => void;
  /** Deactivate/unhighlight this ticket */
  deactivate: () => void;
  /** Get path from root to self (includes self) */
  getPath: () => ID[];
  /** Get ancestors excluding self */
  getAncestors: () => ID[];
  /** Get all descendants */
  getDescendants: () => ID[];
  /** Check if this ticket is an ancestor of the given ID */
  isAncestorOf: (descendantId: ID) => boolean;
  /** Check if this ticket has the given ID as an ancestor */
  hasAncestor: (ancestorId: ID) => boolean;
  /** Get sibling IDs (including self) */
  siblings: () => ID[];
  /** Get 1-indexed position among siblings (for aria-posinset) */
  position: () => number;
};
/**
 * Registration input for nested items.
 * Allows inline children definition for easier tree construction.
 *
 * @template Z The input ticket type that extends NestedTicketInput.
 */
type NestedRegistration<Z extends NestedTicketInput = NestedTicketInput> = Partial<Z> & {
  /** Inline children to register with this item as parent */
  children?: NestedRegistration<Z>[];
};
/**
 * Context for managing nested/hierarchical item collections.
 *
 * @template Z The input ticket type.
 * @template E The output ticket type.
 *
 * @remarks
 * Extends GroupContext with parent-child relationship tracking, open/close state,
 * and hierarchical traversal methods. Perfect for tree structures, nested menus,
 * file explorers, and organizational charts.
 */
interface NestedContext<Z extends NestedTicketInput = NestedTicketInput, E extends NestedTicket<Z> = NestedTicket<Z>> extends Omit<GroupContext<Z, E>, 'register' | 'onboard' | 'offboard' | 'select' | 'unselect' | 'toggle'> {
  /** Map of parent IDs to arrays of child IDs. Use register/unregister to modify. */
  readonly children: ReadonlyMap<ID, readonly ID[]>;
  /** Map of child IDs to their parent ID (or undefined for roots). Use register/unregister to modify. */
  readonly parents: ReadonlyMap<ID, ID | undefined>;
  /** Reactive Set of opened/expanded item IDs. Use open/close/flip to modify. */
  readonly openedIds: Reactive<Set<ID>>;
  /** Computed Set of opened/expanded item instances */
  openedItems: ComputedRef<Set<E>>;
  /** Reactive Set of active/highlighted item IDs. Use activate/deactivate to modify. */
  readonly activeIds: Reactive<Set<ID>>;
  /** Computed Set of active/highlighted item instances */
  activeItems: ComputedRef<Set<E>>;
  /** Computed Set of active item indexes (position-based) */
  activeIndexes: ComputedRef<Set<number>>;
  /** Activate/highlight one or more items by ID */
  activate: (ids: ID | ID[]) => void;
  /** Deactivate/unhighlight one or more items by ID */
  deactivate: (ids: ID | ID[]) => void;
  /** Check if an item is active by ID */
  activated: (id: ID) => boolean;
  /** Deactivate all items */
  deactivateAll: () => void;
  /** Open/expand one or more items by ID */
  open: (ids: ID | ID[]) => void;
  /** Close/collapse one or more items by ID */
  close: (ids: ID | ID[]) => void;
  /** Flip one or more items' open/closed state by ID */
  flip: (ids: ID | ID[]) => void;
  /** Check if an item is open by ID */
  opened: (id: ID) => boolean;
  /** Open node(s) and their immediate non-leaf children */
  unfold: (ids: ID | ID[]) => void;
  /** Reveal node(s) by opening all ancestors (makes node visible without opening it) */
  reveal: (ids: ID | ID[]) => void;
  /** Fully expand node(s) and all their non-leaf descendants */
  expand: (ids: ID | ID[]) => void;
  /** Expand all non-leaf nodes */
  expandAll: () => void;
  /** Collapse all nodes */
  collapseAll: () => void;
  /** Convert tree to flat array with parentId references */
  toFlat: () => Array<{
    id: ID;
    parentId: ID | undefined;
    value: Z extends NestedTicketInput<infer V> ? V : unknown;
  }>;
  /** Get the path from root to the specified item (inclusive) */
  getPath: (id: ID) => ID[];
  /** Get all descendants of an item */
  getDescendants: (id: ID) => ID[];
  /** Get all ancestors of an item (excluding self) */
  getAncestors: (id: ID) => ID[];
  /** Check if an item is a leaf node */
  isLeaf: (id: ID) => boolean;
  /** Get the depth level of an item in the tree */
  getDepth: (id: ID) => number;
  /** Check if ancestorId is an ancestor of descendantId */
  isAncestorOf: (ancestorId: ID, descendantId: ID) => boolean;
  /** Check if id has ancestorId as an ancestor (semantic alias for isAncestorOf) */
  hasAncestor: (id: ID, ancestorId: ID) => boolean;
  /** Get sibling IDs (including self). For roots, returns all root IDs. */
  siblings: (id: ID) => ID[];
  /** Get 1-indexed position among siblings (for aria-posinset). Returns 0 if not found. */
  position: (id: ID) => number;
  /** Computed array of root items (items with no parent) */
  roots: ComputedRef<E[]>;
  /** Computed array of leaf items (items with no children) */
  leaves: ComputedRef<E[]>;
  /** Returns depth-first traversal of visible (open) nodes for keyboard navigation */
  visibleItems: () => E[];
  /** Whether multiple items can be selected */
  readonly multiple: boolean;
  /** Select item(s) and all descendants, updating ancestor mixed states */
  select: (ids: ID | ID[]) => void;
  /** Unselect item(s) and all descendants, updating ancestor mixed states */
  unselect: (ids: ID | ID[]) => void;
  /** Toggle selection with cascading behavior */
  toggle: (ids: ID | ID[]) => void;
  /** Register a node with optional inline children (accepts input type, returns output type) */
  register: (registration?: NestedRegistration<Z>) => E;
  /** Batch register nodes with optional inline children */
  onboard: (registrations: NestedRegistration<Z>[]) => E[];
  /** Unregister a node, optionally cascading to descendants */
  unregister: (id: ID, cascade?: boolean) => void;
  /** Offboard multiple nodes, optionally cascading */
  offboard: (ids: ID[], cascade?: boolean) => void;
  /** Clear all nodes and nested state (children, parents, openedIds) */
  clear: () => void;
}
/**
 * Open mode for nested items.
 * - `'multiple'` (default): Multiple nodes can be open simultaneously
 * - `'single'`: Only one node can be open at a time (accordion behavior)
 */
type NestedOpenMode = 'single' | 'multiple';
/**
 * Selection mode for nested items.
 * - `'cascade'` (default): Selecting a parent selects all descendants; ancestors show mixed state
 * - `'independent'`: Each node is selected independently, no cascading
 * - `'leaf'`: Only leaf nodes can be selected; selecting parent selects all leaf descendants
 */
type NestedSelectionMode = 'cascade' | 'independent' | 'leaf';
/**
 * Active mode for nested items.
 * - `'single'` (default): Only one item can be active at a time
 * - `'multiple'`: Multiple items can be active simultaneously
 */
type NestedActiveMode = 'single' | 'multiple';
/**
 * Options for creating a nested instance.
 */
interface NestedOptions extends GroupOptions {
  /**
   * Controls how nodes expand/collapse.
   * - `'multiple'` (default): Multiple nodes can be open simultaneously
   * - `'single'`: Only one node open at a time (accordion behavior)
   */
  open?: NestedOpenMode;
  /**
   * When true, parent nodes automatically open when children are registered.
   * Similar to `enroll` in selection composables but for open state.
   */
  openAll?: boolean;
  /**
   * When true, opening a node also opens all its ancestors.
   * Ensures the opened node is always visible in the tree.
   */
  reveal?: boolean;
  /**
   * Controls how selection cascades through the hierarchy.
   * - `'cascade'` (default): Selecting parent selects descendants; ancestors show mixed state
   * - `'independent'`: Each node selected independently
   * - `'leaf'`: Only leaf nodes selectable; parent selection selects leaf descendants
   */
  selection?: NestedSelectionMode;
  /**
   * Controls how many items can be active/highlighted simultaneously.
   * - `'single'` (default): Only one item active at a time
   * - `'multiple'`: Multiple items can be active simultaneously
   */
  active?: NestedActiveMode;
}
/**
 * Options for creating a nested context.
 */
interface NestedContextOptions extends GroupContextOptions {
  /**
   * Controls how nodes expand/collapse.
   * - `'multiple'` (default): Multiple nodes can be open simultaneously
   * - `'single'`: Only one node open at a time (accordion behavior)
   */
  open?: NestedOpenMode;
  /**
   * When true, parent nodes automatically open when children are registered.
   * Similar to `enroll` in selection composables but for open state.
   */
  openAll?: boolean;
  /**
   * When true, opening a node also opens all its ancestors.
   * Ensures the opened node is always visible in the tree.
   */
  reveal?: boolean;
  /**
   * Controls how selection cascades through the hierarchy.
   * - `'cascade'` (default): Selecting parent selects descendants; ancestors show mixed state
   * - `'independent'`: Each node selected independently
   * - `'leaf'`: Only leaf nodes selectable; parent selection selects leaf descendants
   */
  selection?: NestedSelectionMode;
  /**
   * Controls how many items can be active/highlighted simultaneously.
   * - `'single'` (default): Only one item active at a time
   * - `'multiple'`: Multiple items can be active simultaneously
   */
  active?: NestedActiveMode;
}
//#endregion
//#region src/composables/createNested/index.d.ts
/**
 * Creates a new nested tree instance with hierarchical management.
 *
 * Extends `createGroup` to support parent-child relationships, tree traversal,
 * and open/close state management. Perfect for tree views, nested navigation,
 * and hierarchical data structures.
 *
 * @param options The options for the nested instance.
 * @returns A new nested instance with tree management capabilities.
 *
 * @remarks
 * **Key Differences from `createGroup`:**
 * - `register()` accepts `parentId` for establishing parent-child relationships
 * - `unregister()` accepts optional `cascade` parameter for cascading deletions
 * - Adds tree traversal methods: `getPath()`, `getAncestors()`, `getDescendants()`
 * - Adds computed properties: `roots`, `leaves`, `isLeaf()`, `getDepth()`
 * - Adds open state management: `open()`, `close()`, `flip()`, `opened()`
 *
 * @see https://0.vuetifyjs.com/composables/selection/create-nested
 *
 * @example
 * ```ts
 * import { createNested } from '@vuetify/v0'
 *
 * const tree = createNested()
 *
 * const root = tree.register({ id: 'root', value: 'Root' })
 * const child1 = tree.register({ id: 'child-1', value: 'Child 1', parentId: 'root' })
 * const child2 = tree.register({ id: 'child-2', value: 'Child 2', parentId: 'root' })
 *
 * console.log(tree.getPath('child-1')) // ['root', 'child-1']
 * console.log(tree.getDescendants('root')) // ['child-1', 'child-2']
 * console.log(tree.isLeaf('child-2')) // true
 *
 * tree.open('root')
 * console.log(tree.opened('root')) // true
 * ```
 */
declare function createNested(_options?: NestedOptions): NestedContext;
/**
 * Creates a new nested context with provide/inject pattern.
 *
 * @param options The options for the nested context.
 * @returns A trinity tuple [useNested, provideNested, defaultNested]
 *
 * @see https://0.vuetifyjs.com/composables/selection/create-nested
 *
 * @example
 * ```ts
 * import { createNestedContext } from '@vuetify/v0'
 *
 * export const [useTree, provideTree, tree] = createNestedContext()
 *
 * // In parent: provideTree()
 * // In child: const tree = useTree()
 * ```
 */
declare function createNestedContext(_options?: NestedContextOptions): ContextTrinity<NestedContext>;
/**
 * Returns the current nested instance from context.
 *
 * @param namespace The namespace for the nested context. Defaults to `'v0:nested'`.
 * @returns The current nested instance.
 *
 * @see https://0.vuetifyjs.com/composables/selection/create-nested
 */
declare function useNested(namespace?: string): NestedContext;
//#endregion
//#region src/composables/createNumeric/index.d.ts
/**
 * @module createNumeric
 *
 * @see https://0.vuetifyjs.com/composables/forms/create-numeric
 *
 * @remarks
 * Pure numeric math primitive. No reactivity, no registry, no DOM events.
 * Provides clamp, snap, step, and percentage conversion for bounded numeric values.
 *
 * Used by createSlider, createNumberField, and other numeric composables.
 * Handles floating-point precision correction internally.
 *
 * @example
 * ```ts
 * import { createNumeric } from '@vuetify/v0'
 *
 * const numeric = createNumeric({ min: 0, max: 10, step: 1 })
 * console.log(numeric.snap(3.7)) // 4
 * console.log(numeric.fromValue(5)) // 50
 * ```
 */
interface NumericOptions {
  /** Minimum value. @default -Infinity */
  min?: number;
  /** Maximum value. @default Infinity */
  max?: number;
  /** Step increment for Arrow keys. @default 1 */
  step?: number;
  /** Large step for PageUp/PageDown. @default step * 10 */
  leap?: number;
  /** Circular wrapping (max+step → min). @default false */
  wrap?: boolean;
}
interface NumericContext {
  min: number;
  max: number;
  step: number;
  leap: number;
  wrap: boolean;
  snap: (value: number) => number;
  fromValue: (value: number) => number;
  fromPercent: (percent: number) => number;
  up: (value: number, multiplier?: number) => number;
  down: (value: number, multiplier?: number) => number;
  floor: () => number;
  ceil: () => number;
  canUp: (value: number) => boolean;
  canDown: (value: number) => boolean;
}
declare function createNumeric(options?: NumericOptions): NumericContext;
//#endregion
//#region src/composables/createNumberField/index.d.ts
interface NumberFieldOptions extends NumericOptions {
  /** Value source — defaults to ref(null). */
  value?: Ref<number | null>;
  /** BCP 47 locale tag. @default 'en-US' */
  locale?: string;
  /** Intl.NumberFormat options. */
  format?: Intl.NumberFormatOptions;
  /** Whether commit() clamps to min/max. @default true */
  clamp?: boolean;
  /**
   * When to write typed input into `value`. `'change'` (default) only
   * writes on `commit()` (blur/Enter). `'input'` also writes on every
   * keystroke via `write()`, without clamping or snapping — clamping
   * mid-type would jump a value like `1` to `min` before the user finishes
   * typing `15`. Clamping/snapping still happens on the next `commit()`.
   *
   * @default 'change'
   *
   * @example
   * ```ts
   * const field = createNumberField({ min: 10, max: 100, commitOn: 'input' })
   * field.write('1')
   * field.value.value // 1 — no jump to min while typing
   * ```
   */
  commitOn?: 'input' | 'change';
  /** Disabled state. */
  disabled?: MaybeRefOrGetter<boolean>;
  /** Readonly state. */
  readonly?: MaybeRefOrGetter<boolean>;
  /** Unique identifier. */
  id?: InputOptions<number | null>['id'];
  /** Display label. */
  label?: string;
  /** Form field name. */
  name?: string;
  /**
   * Form injection key. Must match the parent Form's `namespace`.
   *
   * @default 'v0:form'
   */
  formNamespace?: string;
  /**
   * Whether required. When true, a presence rule is registered so Form
   * submit fails on empty values even with `novalidate`.
   */
  required?: boolean;
  /** Validation rules. */
  rules?: InputOptions<number | null>['rules'];
  /** Manual error state override — forces invalid. */
  error?: InputOptions<number | null>['error'];
  /** Manual error messages — merged with rule-based errors. */
  errorMessages?: InputOptions<number | null>['errorMessages'];
}
interface NumberFieldContext {
  /** The numeric value (null when empty). */
  value: Ref<number | null>;
  /** Formatted display string (empty for null). */
  display: Readonly<Ref<string>>;
  /** Whether the value can be incremented. */
  canIncrement: Readonly<Ref<boolean>>;
  /** Whether the value can be decremented. */
  canDecrement: Readonly<Ref<boolean>>;
  /** The underlying numeric context. */
  numeric: NumericContext;
  /** The underlying input context. */
  input: InputContext<number | null>;
  /** Increment value by step * multiplier. */
  increment: (multiplier?: number) => void;
  /** Decrement value by step * multiplier. */
  decrement: (multiplier?: number) => void;
  /** Set value to min. */
  floor: () => void;
  /** Set value to max. */
  ceil: () => void;
  /** Format a number using Intl.NumberFormat. */
  formatValue: (value: number) => string;
  /** Parse locale-formatted text to a number or null. */
  parse: (text: string) => number | null;
  /** Snap and optionally clamp the current value. Pass `next` to avoid reading the stale model on the same tick as a write. */
  commit: (next?: number | null) => void;
  /** When typed input is written into `value` — see {@link NumberFieldOptions.commitOn}. */
  readonly commitOn: 'input' | 'change';
  /**
   * Parse `text` and write it straight into `value`, without clamping or
   * snapping. Used by `commitOn: 'input'` consumers to get per-keystroke
   * updates without the min/max jump `commit()` would cause mid-type.
   *
   * @example
   * ```ts
   * const field = createNumberField({ min: 10, max: 100 })
   * field.write('1')
   * field.value.value // 1 — clamped only on the next commit()
   * ```
   */
  write: (text: string) => void;
}
declare function createNumberField(options?: NumberFieldOptions): NumberFieldContext;
//#endregion
//#region src/composables/createOtp/index.d.ts
/**
 * Pattern presets — string literals compile to internal RegExps; arbitrary
 * RegExp values are applied per character.
 *
 * @example
 * ```ts
 * const otp = createOtp({ pattern: 'numeric' })
 * const hex = createOtp({ pattern: /^[0-9a-fA-F]$/ })
 * ```
 */
type OtpPattern = 'numeric' | 'alphanumeric' | 'alphabetic' | RegExp;
/**
 * Options accepted by `createOtp`.
 *
 * @example
 * ```ts
 * const otp = createOtp({
 *   length: 6,
 *   pattern: 'numeric',
 *   disabled: false,
 *   onComplete: async value => {
 *     const ok = await verify(value)
 *     return ok
 *   },
 * })
 * ```
 */
interface OtpOptions extends Omit<InputOptions<string>, 'value' | 'error' | 'errorMessages'> {
  /** Number of characters. @default 6 */
  length?: MaybeRefOrGetter<number>;
  /** Joined value source. @default shallowRef('') */
  value?: Ref<string>;
  /**
   * Per-character pattern. String presets compile to internal RegExps;
   * custom RegExp must match a single character.
   * @default 'numeric'
   */
  pattern?: MaybeRefOrGetter<OtpPattern>;
  /**
   * Fire when the joined value first reaches `length`. Decisional —
   * return / resolve `false` to reject (clears value, sets error).
   * A rejected Promise is treated as `false` and logs a warning.
   */
  onComplete?: (value: string) => boolean | void | PromiseLike<boolean | void>;
}
/**
 * Reactive context returned by `createOtp`. Consumers index into `value`
 * for per-character rendering and call the mutation helpers to drive state.
 *
 * @example
 * ```ts
 * const otp = createOtp({ length: 6 })
 *
 * otp.write(0, '4')
 * otp.distribute('12345', 1) // returns 5
 * otp.isComplete.value  // true
 * otp.clear()
 * ```
 */
interface OtpContext {
  /**
   * The joined OTP string. Use the mutation helpers (`write`, `distribute`,
   * `fill`, `clear`) to update. Writing through this ref directly is
   * intentionally prevented to preserve pattern, length, and lock invariants.
   */
  value: Readonly<Ref<string>>;
  /** Resolved character count from the `length` option. */
  length: Readonly<Ref<number>>;
  /**
   * The underlying `createInput` context — exposes ARIA IDs, validation
   * state, focus/touched, and the `validate` / `reset` methods.
   *
   * Note: `input.value` aliases `OtpContext.value` and is also readonly on
   * the public surface. Use the mutation helpers (`write`, `distribute`,
   * `fill`, `clear`) to update.
   */
  input: Omit<InputContext<string>, 'value'> & {
    value: Readonly<Ref<string>>;
  };
  /** True when `value` reaches `length` and every character matches `pattern`. */
  isComplete: Readonly<Ref<boolean>>;
  /**
   * True while an async `onComplete` is in flight. Mutation helpers no-op
   * during this window; consumers can render a spinner against this ref.
   */
  isValidating: Readonly<Ref<boolean>>;
  /**
   * Write a single character at `index`. Empty string clears trailing
   * characters from `index` onward. Out-of-range indices and characters
   * rejected by `pattern` are ignored. No-ops while locked.
   */
  write: (index: number, char: string) => void;
  /**
   * Splice pattern-accepted characters from `text` into `value` starting
   * at `index`. Returns the number of characters written. No-ops while
   * locked or when no characters pass the pattern.
   */
  distribute: (text: string, index?: number) => number;
  /** Clear `value` and rejection state. No-ops while locked. */
  clear: () => void;
  /**
   * Replace `value` with pattern-accepted characters from `text`, truncated
   * to `length`. Clears rejection state on deliberate empty input or any
   * accepted characters. No-ops while locked.
   */
  fill: (text: string) => void;
  /** Whether `char` is a single character matching the current `pattern`. */
  accepts: (char: string) => boolean;
}
declare function createOtp(_options?: OtpOptions): OtpContext;
//#endregion
//#region src/composables/createProgress/index.d.ts
type ProgressTicketInput = ModelTicketInput<ShallowRef<number>>;
type ProgressTicket = ModelTicket<ProgressTicketInput>;
interface ProgressOptions {
  value?: number;
  min?: number;
  max?: number;
}
interface ProgressContext extends ModelContext<ProgressTicketInput, ProgressTicket> {
  readonly min: number;
  readonly max: number;
  segments: ComputedRef<ProgressTicket[]>;
  total: Readonly<Ref<number>>;
  percent: Readonly<Ref<number>>;
  isIndeterminate: Readonly<Ref<boolean>>;
  fromValue: (value: number) => number;
}
interface ProgressContextOptions extends ProgressOptions {
  namespace?: string;
}
/**
 * Creates a progress instance with model-based segment tracking.
 *
 * @param options The options for the progress instance.
 * @returns A progress context with segment registration.
 *
 * @example
 * ```ts
 * import { createProgress } from '@vuetify/v0'
 *
 * const progress = createProgress({ max: 100 })
 * const segment = progress.register({ value: 50 })
 * progress.percent.value // 50
 * ```
 */
declare function createProgress(options?: ProgressOptions): ProgressContext;
/**
 * Creates a progress context for dependency injection.
 *
 * @param options The options including namespace.
 * @returns A trinity: [useProgress, provideProgress, defaultContext]
 */
declare function createProgressContext(_options?: ProgressContextOptions): ContextTrinity<ProgressContext>;
/**
 * Returns the current progress instance from context.
 *
 * @param namespace The namespace. @default 'v0:progress'
 * @returns The progress context.
 */
declare function useProgress(namespace?: string): ProgressContext;
//#endregion
//#region src/composables/createQueue/index.d.ts
/**
 * Input type for queue tickets - what users provide to register().
 * Extend this interface to add custom properties.
 *
 * @template V The type of the ticket value.
 */
interface QueueTicketInput<V = unknown> extends RegistryTicketInput<V> {
  /**
   * Timeout in milliseconds
   *
   * @remarks
   * - If `undefined`: Uses the default timeout from queue options (default: 3000ms)
   * - If `-1`: Ticket persists indefinitely until manually dismissed
   * - If a number: Ticket will be automatically removed after the specified milliseconds
   */
  timeout?: number;
}
/**
 * Output type for queue tickets - what users receive from get().
 * Includes all input properties plus queue state and methods.
 *
 * @template Z The input ticket type that extends QueueTicketInput.
 */
type QueueTicket<Z extends QueueTicketInput = QueueTicketInput> = RegistryTicket & Z & {
  /**
   * Timeout in milliseconds (resolved from input or default)
   */
  timeout?: number;
  /**
   * Whether the timeout is currently paused
   *
   * @remarks
   * - Set to `true` when the ticket is not the first in the queue or when manually paused
   * - When `true`, the timeout does not progress
   * - Automatically managed by the queue system
   */
  isPaused: boolean;
  /**
   * Convenience method to dismiss this ticket from the queue
   *
   * @remarks
   * Equivalent to calling `queue.unregister(ticket.id)`
   */
  dismiss: () => void;
};
/**
 * Context for managing queue collections with timeout support.
 *
 * @template Z The input ticket type.
 * @template E The output ticket type.
 */
interface QueueContext<Z extends QueueTicketInput = QueueTicketInput, E extends QueueTicket<Z> = QueueTicket<Z>> extends Omit<RegistryContext<E>, 'register' | 'unregister' | 'offboard'> {
  /**
   * Register a new ticket in the queue (accepts input type, returns output type)
   *
   * @param ticket The partial ticket data to register
   * @remarks
   * - If no ID is provided, a unique ID will be generated automatically
   * - If no timeout is provided, uses the default timeout from queue options (3000ms)
   * - First ticket in queue starts its timeout immediately
   * - Subsequent tickets are paused until they become first in queue
   * - Each ticket receives a `dismiss()` method for convenience
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-queue
   *
   * @example
   * ```ts
   * import { useQueue } from '@vuetify/v0'
   *
   * const queue = useQueue()
   *
   * // Register with default timeout (3000ms)
   * const ticket1 = queue.register({ value: 'First' })
   *
   * // Register with custom timeout
   * const ticket2 = queue.register({ value: 'Second', timeout: 5000 })
   *
   * // Register persistent ticket (must be manually dismissed)
   * const ticket3 = queue.register({ value: 'Persistent', timeout: -1 })
   * ```
   */
  register: (ticket?: Partial<Z>) => E;
  /**
   * Unregister a ticket from the queue
   *
   * @param id The ID of the ticket to unregister. If not provided, the first ticket in the queue will be unregistered.
   * @remarks
   * - Removes the ticket from the queue and clears its timeout
   * - If the removed ticket was first in queue, automatically resumes the next ticket
   * - Returns the unregistered ticket or `undefined` if not found
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-queue
   *
   * @example
   * ```ts
   * import { useQueue } from '@vuetify/v0'
   *
   * const queue = useQueue()
   *
   * const ticket1 = queue.register({ value: 'First' })
   * const ticket2 = queue.register({ value: 'Second' })
   *
   * // Unregister specific ticket
   * queue.unregister(ticket2.id)
   *
   * // Unregister first ticket in queue
   * const removed = queue.unregister()
   * console.log(removed?.value) // 'First'
   * ```
   */
  unregister: (id?: ID) => E | undefined;
  /**
   * Pause the timeout of the first ticket in the queue
   *
   * @remarks
   * - Pauses the timeout for the first ticket if it exists and is not already paused
   * - Returns the paused ticket or `undefined` if no pausable ticket exists
   * - The timeout will not progress while paused
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-queue
   *
   * @example
   * ```ts
   * import { useQueue } from '@vuetify/v0'
   *
   * const queue = useQueue({ timeout: 5000 })
   *
   * const ticket = queue.register({ value: 'Pausable ticket' })
   *
   * // Pause the first ticket's timeout
   * const paused = queue.pause()
   *
   * console.log(paused?.isPaused) // true
   * ```
   */
  pause: () => E | undefined;
  /**
   * Resume the timeout of the first paused ticket in the queue
   *
   * @remarks
   * - Resumes the timeout for the first ticket if it exists, is at index 0, and is currently paused
   * - Returns the resumed ticket or `undefined` if no resumable ticket exists
   * - The timeout will continue from its full duration (not from where it was paused)
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-queue
   *
   * @example
   * ```ts
   * import { useQueue } from '@vuetify/v0'
   *
   * const queue = useQueue({ timeout: 5000 })
   *
   * const ticket = queue.register({ value: 'Ticket' })
   * queue.pause()
   *
   * // Later, resume the paused ticket
   * const resumed = queue.resume()
   *
   * console.log(resumed?.isPaused) // false
   * ```
   */
  resume: () => E | undefined;
  /**
   * Clear the entire queue
   *
   * @remarks
   * - Removes all tickets from the queue
   * - Clears all active timeouts
   * - Resets the queue to an empty state
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-queue
   *
   * @example
   * ```ts
   * import { useQueue } from '@vuetify/v0'
   *
   * const queue = useQueue()
   *
   * queue.register({ value: 'First' })
   * queue.register({ value: 'Second' })
   *
   * console.log(queue.size) // 2
   *
   * queue.clear()
   *
   * console.log(queue.size) // 0
   * ```
   */
  clear: () => void;
  /**
   * Dispose of the queue and clean up resources
   *
   * @remarks
   * - Clears all tickets and timeouts
   * - Removes all event listeners
   * - Should be called when the queue is no longer needed
   * - Automatically called on scope disposal
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-queue
   *
   * @example
   * ```ts
   * import { onScopeDispose } from 'vue'
   * import { useQueue } from '@vuetify/v0'
   *
   * const queue = useQueue()
   *
   * queue.register({ value: 'Ticket' })
   *
   * onScopeDispose(() => {
   *   queue.dispose()
   * })
   * ```
   */
  dispose: () => void;
  /**
   * Batch unregister tickets from the queue
   */
  offboard: (ids: ID[]) => void;
}
interface QueueOptions extends RegistryOptions {
  /**
   * Default timeout in milliseconds for tickets without explicit timeout
   *
   * @default 3000
   * @remarks
   * - Applied to tickets that don't specify their own timeout
   * - Can be overridden per ticket during registration
   */
  timeout?: number;
}
interface QueueContextOptions extends QueueOptions {
  namespace?: string;
}
/**
 * Creates a new queue instance
 *
 * @param options The options for the queue instance
 * @returns A new queue instance
 *
 * @see https://0.vuetifyjs.com/composables/registration/create-queue
 *
 * @example
 * ```ts
 * import { createQueue } from '@vuetify/v0'
 *
 * const queue = createQueue()
 *
 * // Register an ticket with default timeout (3000ms)
 * const ticket1 = queue.register({ value: 'Ticket 1' })
 *
 * // Register an ticket with custom timeout
 * const ticket2 = queue.register({ value: 'Ticket 2', timeout: 5000 })
 *
 * // Register a persistent ticket that must be manually dismissed
 * const ticket3 = queue.register({ value: 'Ticket 3', timeout: -1 })
 *
 * // Dismiss an ticket using the convenience method
 * ticket3.dismiss()
 *
 * console.log(queue.size) // 2
 * ```
 */
declare function createQueue(_options?: QueueOptions): QueueContext;
/**
 * Creates a new queue context.
 *
 * @param options The options for the queue context.
 * @returns A new queue context.
 *
 * @see https://0.vuetifyjs.com/composables/registration/create-queue
 *
 * @example
 * ```ts
 * import { createQueueContext } from '@vuetify/v0'
 *
 * export const [useQueue, provideQueue, context] = createQueueContext({
 *   timeout: 5000,
 * })
 * ```
 */
declare function createQueueContext(_options?: QueueContextOptions): ContextTrinity<QueueContext>;
/**
 * Returns the current queue instance.
 *
 * @param namespace The namespace for the queue context. Defaults to `'v0:queue'`.
 * @returns The current queue instance.
 *
 * @see https://0.vuetifyjs.com/composables/registration/create-queue
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 *   import { useQueue } from '@vuetify/v0'
 *
 *   const queue = useQueue()
 * </script>
 * ```
 */
declare function useQueue(namespace?: string): QueueContext;
//#endregion
//#region src/composables/createRating/index.d.ts
type RatingItemState = 'full' | 'half' | 'empty';
interface RatingItemDescriptor {
  /** 1-based position */
  value: number;
  /** Derived visual state */
  state: RatingItemState;
}
interface RatingContext {
  /** Current rating, clamped to 0–size */
  value: WritableComputedRef<number>;
  /** Total items */
  size: number;
  /** Whether half-steps are enabled */
  half: boolean;
  /** Array of items with computed state */
  items: ComputedRef<RatingItemDescriptor[]>;
  /** Whether value is at minimum (0) */
  isFirst: Readonly<Ref<boolean>>;
  /** Whether value is at maximum (size) */
  isLast: Readonly<Ref<boolean>>;
  /** Set rating to specific value */
  select: (value: number) => void;
  /** Increment by step (1 or 0.5) */
  next: () => void;
  /** Decrement by step (1 or 0.5) */
  prev: () => void;
  /** Set to 0 */
  first: () => void;
  /** Set to size */
  last: () => void;
}
interface RatingOptions {
  /** Initial value or ref for v-model. @default 0 */
  value?: number | ShallowRef<number>;
  /** Total items. @default 5 */
  size?: MaybeRefOrGetter<number>;
  /** Enable 0.5 step increments. @default false */
  half?: MaybeRefOrGetter<boolean>;
}
interface RatingContextOptions extends RatingOptions {
  /** Namespace for dependency injection */
  namespace?: string;
}
/**
 * Creates a rating instance.
 *
 * @param options The options for the rating instance.
 * @returns A rating context with navigation methods.
 *
 * @example
 * ```ts
 * import { createRating } from '@vuetify/v0'
 *
 * // Basic usage
 * const rating = createRating()
 * rating.select(3)
 * rating.items.value // [{ value: 1, state: 'full' }, ...]
 *
 * // With v-model (pass a ref)
 * const value = shallowRef(0)
 * const rating = createRating({ value })
 * ```
 */
declare function createRating<R extends RatingContext = RatingContext>(_options?: RatingOptions): R;
/**
 * Creates a rating context for dependency injection.
 *
 * @param options The options including namespace.
 * @returns A trinity: [useRating, provideRating, defaultContext]
 *
 * @example
 * ```ts
 * const [useRating, provideRatingContext] = createRatingContext({ size: 5 })
 *
 * // Parent component
 * provideRatingContext()
 *
 * // Child component
 * const rating = useRating()
 * rating.select(4)
 * ```
 */
declare function createRatingContext<R extends RatingContext = RatingContext>(_options?: RatingContextOptions): ContextTrinity<R>;
/**
 * Returns the current rating instance from context.
 *
 * @param namespace The namespace. @default 'v0:rating'
 * @returns The rating context.
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 *   import { useRating } from '@vuetify/v0'
 *
 *   const rating = useRating()
 * </script>
 *
 * <template>
 *   <button @click="rating.prev()" :disabled="rating.isFirst.value">-</button>
 *   <span>{{ rating.value.value }} / {{ rating.size }}</span>
 *   <button @click="rating.next()" :disabled="rating.isLast.value">+</button>
 * </template>
 * ```
 */
declare function useRating<R extends RatingContext = RatingContext>(namespace?: string): R;
//#endregion
//#region src/composables/createSlider/index.d.ts
interface SliderTicketInput extends ModelTicketInput<ShallowRef<number>> {
  value: ShallowRef<number>;
}
type SliderTicket = ModelTicket<SliderTicketInput>;
/**
 * Configuration options for createSlider.
 *
 * @see https://0.vuetifyjs.com/composables/forms/create-slider
 */
interface SliderOptions {
  /**
   * Minimum value.
   * @default 0
   */
  min?: number;
  /**
   * Maximum value.
   * @default 100
   */
  max?: number;
  /**
   * Step increment. Values are snapped to the nearest multiple of `step` above `min`.
   *
   * @remarks Use decimal steps for fine-grained control (e.g., `0.1` for a media scrubber).
   * A step of `0` disables snapping — values are only clamped to min/max.
   *
   * @default 1
   */
  step?: number;
  /**
   * Whether the slider is disabled.
   *
   * @remarks Accepts a reactive getter or ref. When disabled, all thumb operations (`set`, `up`, `down`) are no-ops.
   */
  disabled?: MaybeRefOrGetter<boolean>;
  /**
   * Whether the slider is readonly (focusable but not editable).
   *
   * @remarks Thumbs can receive focus for accessibility, but `set`, `up`, `down`, `floor`, and `ceil` are no-ops.
   */
  readonly?: MaybeRefOrGetter<boolean>;
  /**
   * Slider orientation.
   *
   * @remarks Affects `fromValue` and `fromPercent` axis mapping in Slider components.
   * When using createSlider standalone, orientation is informational only.
   */
  orientation?: MaybeRefOrGetter<'horizontal' | 'vertical'>;
  /**
   * Flip the percent axis.
   *
   * @remarks When `true`, `fromValue(min)` returns `100` and `fromValue(max)` returns `0`.
   * Useful for vertical sliders where the visual bottom is the minimum.
   */
  inverted?: MaybeRefOrGetter<boolean>;
  /**
   * Minimum steps required between adjacent thumbs.
   *
   * @remarks Enforced by `set` and `apply`. The gap in value units is `minStepsBetweenThumbs * step`.
   *
   * @default 0
   *
   * @example
   * ```ts
   * const slider = createSlider({ step: 5, minStepsBetweenThumbs: 2 })
   * // Thumbs must be at least 10 units apart (2 × 5)
   * ```
   */
  minStepsBetweenThumbs?: number;
  /**
   * Allow thumbs to pass through each other.
   *
   * @remarks When `false` (default), `set` constrains values so thumbs maintain their order.
   * When `true`, thumbs can freely overlap and swap positions.
   *
   * @default false
   */
  crossover?: boolean;
  /**
   * Range mode — expects two thumbs.
   *
   * @remarks Informational flag used by Slider components to adjust track/range rendering.
   * Does not enforce the number of registered thumbs.
   *
   * @default false
   */
  range?: boolean;
}
/**
 * Context returned by {@link createSlider}.
 *
 * @remarks
 * Extends `createModel` with slider-specific math and thumb operations.
 *
 * **Inheritance chain:**
 * `createRegistry` → `createModel` → `createSlider`
 *
 * **Ticket-per-thumb model:**
 * Each thumb is a model ticket whose value is a `shallowRef<number>`.
 * `values` is derived from the ordered tickets, not a standalone ref.
 * Register/unregister thumbs to add/remove values dynamically.
 *
 * @see https://0.vuetifyjs.com/composables/forms/create-slider
 * @see {@link createModel} for the base model API (collection, selectedIds, etc.)
 */
interface SliderContext extends Omit<ModelContext<SliderTicketInput, SliderTicket>, 'values' | 'selectedValues' | 'apply' | 'disabled' | 'register'> {
  /**
   * Ordered thumb values derived from model tickets.
   *
   * @remarks Reactive — updates when any thumb's `shallowRef<number>` changes.
   * Order matches ticket registration order (sorted by index).
   *
   * @example
   * ```ts
   * const slider = createSlider()
   * slider.register({ value: 25 })
   * slider.register({ value: 75 })
   * console.log(slider.values.value) // [25, 75]
   * ```
   */
  values: ComputedRef<number[]>;
  /**
   * Alias for `values` — provides useProxyModel compatibility.
   *
   * @remarks Returns an array (not a Set) to preserve duplicate values across thumbs.
   *
   * @see {@link values}
   */
  selectedValues: ComputedRef<number[]>;
  /**
   * Apply external values — snaps, constrains, and writes to ticket refs.
   *
   * @param values Array of raw values (coerced to numbers).
   * @param options Options object (reserved for useProxyModel compatibility).
   *
   * @remarks
   * If no thumbs are registered yet, values are stored as pending and
   * consumed as thumbs register. Each value is snapped to step and
   * constrained by `minStepsBetweenThumbs`.
   *
   * @example
   * ```ts
   * const slider = createSlider({ step: 10 })
   * slider.register({ value: 0 })
   * slider.register({ value: 0 })
   * slider.apply([33, 67]) // values: [30, 70]
   * ```
   */
  apply: (values: unknown[], options?: {
    multiple?: boolean;
  }) => void;
  /** Whether disabled. Reactive ref derived from the `disabled` option. */
  disabled: Readonly<Ref<boolean>>;
  /** Whether readonly. Reactive ref derived from the `readonly` option. */
  readonly: Readonly<Ref<boolean>>;
  /** Slider orientation. Reactive ref derived from the `orientation` option. */
  orientation: Readonly<Ref<'horizontal' | 'vertical'>>;
  /** Whether inverted. Reactive ref derived from the `inverted` option. */
  inverted: Readonly<Ref<boolean>>;
  /** Minimum value. */
  min: number;
  /** Maximum value. */
  max: number;
  /** Step increment. */
  step: number;
  /** Minimum steps required between adjacent thumbs. */
  minStepsBetweenThumbs: number;
  /** Whether thumbs can cross each other. */
  crossover: boolean;
  /** Whether this is a range slider. */
  range: boolean;
  /**
   * Register a new thumb and return its ticket.
   *
   * @param input Starting value as a number or `{ value }` object. Defaults to `min`.
   *
   * @remarks
   * The thumb is automatically selected in the model (all thumbs stay selected).
   * If `apply` was called before any thumbs registered, the pending value at this
   * thumb's index is used instead of the provided value.
   *
   * @see {@link unregister}
   *
   * @example
   * ```ts
   * const slider = createSlider({ min: 0, max: 100 })
   * const thumb = slider.register({ value: 50 })
   * console.log(thumb.index) // 0
   * console.log(slider.values.value) // [50]
   * ```
   */
  register: (input?: number | {
    value: number;
  }) => SliderTicket;
  /**
   * Unregister a thumb by ticket ID.
   *
   * @param id The ticket ID returned from `register()`.
   *
   * @see {@link register}
   *
   * @example
   * ```ts
   * const slider = createSlider()
   * const thumb = slider.register({ value: 50 })
   * slider.unregister(thumb.id) // values: []
   * ```
   */
  unregister: (id: ID) => void;
  /**
   * Round a value to the nearest step, clamped to min/max.
   *
   * @param value Raw value to snap.
   * @returns Snapped value.
   *
   * @remarks Pure function — does not modify slider state.
   * When `step` is `0`, only clamps without snapping.
   *
   * @example
   * ```ts
   * const slider = createSlider({ min: 0, max: 100, step: 5 })
   * slider.snap(47) // 45
   * slider.snap(48) // 50
   * slider.snap(-5) // 0  (clamped)
   * ```
   */
  snap: (value: number) => number;
  /**
   * Convert a value to a 0–100 percentage.
   *
   * @param value The slider value to convert.
   * @returns Percentage between 0 and 100.
   *
   * @remarks Pure function. Respects `inverted` — when inverted,
   * `fromValue(min)` returns `100` and `fromValue(max)` returns `0`.
   *
   * @see {@link fromPercent} for the inverse operation.
   *
   * @example
   * ```ts
   * const slider = createSlider({ min: 0, max: 200 })
   * slider.fromValue(100) // 50
   * slider.fromValue(0)   // 0
   * slider.fromValue(200) // 100
   * ```
   */
  fromValue: (value: number) => number;
  /**
   * Convert a 0–100 percentage to a snapped value.
   *
   * @param percent Percentage between 0 and 100.
   * @returns Snapped slider value.
   *
   * @remarks Pure function. Respects `inverted`. The returned value
   * is snapped to the nearest step and clamped to min/max.
   *
   * @see {@link fromValue} for the inverse operation.
   *
   * @example
   * ```ts
   * const slider = createSlider({ min: 0, max: 100, step: 10 })
   * slider.fromPercent(33) // 30
   * slider.fromPercent(50) // 50
   * ```
   */
  fromPercent: (percent: number) => number;
  /**
   * Set the value at a thumb index with step snapping and neighbor constraints.
   *
   * @param index Zero-based thumb index.
   * @param value Raw value to set.
   *
   * @remarks
   * No-op when `disabled` or `readonly` is `true`. The value is snapped to step, clamped to min/max,
   * and constrained by adjacent thumbs when `crossover` is `false`.
   *
   * @see {@link up} and {@link down} for relative adjustments.
   *
   * @example
   * ```ts
   * const slider = createSlider({ min: 0, max: 100, step: 5 })
   * slider.register({ value: 50 })
   * slider.set(0, 73) // values: [75] (snapped)
   * ```
   */
  set: (index: number, value: number) => void;
  /**
   * Increment a thumb's value by `step × multiplier`.
   *
   * @param index Zero-based thumb index.
   * @param multiplier Number of steps to increment. Defaults to `1`.
   *
   * @see {@link down} for the inverse. {@link set} for absolute positioning.
   *
   * @example
   * ```ts
   * const slider = createSlider({ min: 0, max: 100, step: 5 })
   * slider.register({ value: 50 })
   * slider.up(0)     // values: [55]
   * slider.up(0, 3)  // values: [70]
   * ```
   */
  up: (index: number, multiplier?: number) => void;
  /**
   * Decrement a thumb's value by `step × multiplier`.
   *
   * @param index Zero-based thumb index.
   * @param multiplier Number of steps to decrement. Defaults to `1`.
   *
   * @see {@link up} for the inverse. {@link set} for absolute positioning.
   *
   * @example
   * ```ts
   * const slider = createSlider({ min: 0, max: 100, step: 5 })
   * slider.register({ value: 50 })
   * slider.down(0)     // values: [45]
   * slider.down(0, 3)  // values: [30]
   * ```
   */
  down: (index: number, multiplier?: number) => void;
  /**
   * Set a thumb to the minimum value.
   *
   * @param index Zero-based thumb index.
   *
   * @see {@link ceil} for the inverse.
   *
   * @example
   * ```ts
   * const slider = createSlider({ min: 10, max: 90 })
   * slider.register({ value: 50 })
   * slider.floor(0) // values: [10]
   * ```
   */
  floor: (index: number) => void;
  /**
   * Set a thumb to the maximum value.
   *
   * @param index Zero-based thumb index.
   *
   * @see {@link floor} for the inverse.
   *
   * @example
   * ```ts
   * const slider = createSlider({ min: 10, max: 90 })
   * slider.register({ value: 50 })
   * slider.ceil(0) // values: [90]
   * ```
   */
  ceil: (index: number) => void;
}
/**
 * Creates slider state with value math, step snapping, and multi-thumb support.
 *
 * Extends createModel for useProxyModel compatibility. Each thumb is a model
 * ticket with a shallowRef<number> value. Values are derived from the ordered
 * tickets, enabling proper registration/unregistration lifecycle.
 *
 * @param options Slider configuration.
 * @returns Slider context with values, math functions, and thumb operations.
 *
 * @see https://0.vuetifyjs.com/composables/forms/create-slider
 * @see {@link createModel} for the base model composable.
 *
 * @example Single thumb
 * ```ts
 * import { createSlider } from '@vuetify/v0'
 *
 * const slider = createSlider({ min: 0, max: 100, step: 5 })
 * const ticket = slider.register({ value: 50 })
 * slider.up(0)           // values: [55]
 * slider.fromValue(50)   // 50
 * ```
 *
 * @example Range slider
 * ```ts
 * import { createSlider } from '@vuetify/v0'
 *
 * const slider = createSlider({ min: 0, max: 100, step: 1, range: true })
 * slider.register({ value: 25 })
 * slider.register({ value: 75 })
 * slider.set(0, 30)      // values: [30, 75]
 * slider.set(1, 60)      // values: [30, 60]
 * ```
 *
 * @example Custom pointer interaction (media scrubber)
 * ```ts
 * import { createSlider } from '@vuetify/v0'
 *
 * const slider = createSlider({ min: 0, max: 217, step: 0.1 })
 * slider.register({ value: 0 })
 *
 * // pointer → fromPercent → set → fromValue → UI
 * const percent = (clientX - rect.left) / rect.width * 100
 * slider.set(0, slider.fromPercent(percent))
 * const position = slider.fromValue(slider.values.value[0])
 * ```
 */
declare function createSlider(options?: SliderOptions): SliderContext;
//#endregion
//#region src/composables/createTimeline/index.d.ts
interface TimelineContext<Z extends TimelineTicket> extends RegistryContext<Z> {
  /**
   * Removes the last registered ticket and stores it for redo
   *
   * @returns The removed ticket, or undefined if there are no tickets to undo.
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-timeline
   *
   * @example
   * ```ts
   * import { useTimeline } from '@vuetify/v0'
   *
   * const timeline = useTimeline()
   *
   * timeline.register({ id: 'one' })
   * timeline.register({ id: 'two' })
   *
   * console.log(timeline.values()) // [{ id: 'one' }, { id: 'two' }]
   *
   * timeline.undo()
   * console.log(timeline.values()) // [{ id: 'one' }]
   * ```
   */
  undo: () => Z | undefined;
  /**
   * Restores the last undone ticket
   *
   * @returns The restored ticket, or undefined if there are no tickets to redo.
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-timeline
   *
   * @example
   * ```ts
   * import { useTimeline } from '@vuetify/v0'
   *
   * const timeline = useTimeline()
   *
   * timeline.register({ id: 'one' })
   * timeline.register({ id: 'two' })
   *
   * console.log(timeline.values()) // [{ id: 'one' }, { id: 'two' }]
   *
   * timeline.undo()
   * console.log(timeline.values()) // [{ id: 'one' }]
   *
   * timeline.redo()
   * console.log(timeline.values()) // [{ id: 'one' }, { id: 'two' }]
   * ```
   */
  redo: () => Z | undefined;
}
interface TimelineTicket<V = unknown> extends RegistryTicket<V> {}
interface TimelineOptions extends RegistryOptions {
  /**
   * The maximum size of the timeline.
   *
   * @default 10
   */
  size?: number;
}
interface TimelineContextOptions extends TimelineOptions {
  namespace?: string;
}
/**
 * Creates a new timeline instance.
 *
 * @param options The options for the timeline instance.
 * @template Z The type of the timeline ticket.
 * @template E The type of the timeline context.
 * @returns A new timeline instance.
 *
 * @see https://0.vuetifyjs.com/composables/registration/create-timeline
 *
 * @example
 * ```ts
 * import { useTimeline } from '@vuetify/v0'
 *
 * const timeline = useTimeline({ size: 3 })
 *
 * timeline.onboard([{ id: 'one' }, { id: 'two' }, { id: 'three' }])
 *
 * console.log(timeline.values()) // [{ id: 'one' }, { id: 'two' }, { id: 'three' }]
 *
 * timeline.undo()
 * console.log(timeline.values()) // [{ id: 'one' }, { id: 'two' }]
 *
 * timeline.redo()
 * console.log(timeline.values()) // [{ id: 'one' }, { id: 'two' }, { id: 'three' }]
 * ```
 */
declare function createTimeline<Z extends TimelineTicket = TimelineTicket, E extends TimelineContext<Z> = TimelineContext<Z>>(_options?: TimelineOptions): E;
/**
 * Creates a new timeline context.
 *
 * @param options The options for the timeline context.
 * @template Z The type of the timeline ticket.
 * @template E The type of the timeline context.
 * @returns A new timeline context.
 *
 * @see https://0.vuetifyjs.com/composables/registration/create-timeline
 *
 * @example
 * ```ts
 * import { createTimelineContext } from '@vuetify/v0'
 *
 * // With default namespace 'v0:timeline'
 * export const [useTimeline, provideTimeline, context] = createTimelineContext({ size: 5 })
 *
 * context.register({ id: 'example' })
 *
 * // In a parent component
 * provideTimeline()
 *
 * // In a child component
 * const timeline = useTimeline()
 *
 * console.log(timeline.values()) // [{ id: 'example' }]
 * ```
 */
declare function createTimelineContext<Z extends TimelineTicket = TimelineTicket, E extends TimelineContext<Z> = TimelineContext<Z>>(_options?: TimelineContextOptions): ContextTrinity<E>;
/**
 * Returns the current timeline instance.
 *
 * @param namespace The namespace for the timeline context. Defaults to `'v0:timeline'`.
 * @returns The current timeline instance.
 *
 * @see https://0.vuetifyjs.com/composables/registration/create-timeline
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 *   import { useTimeline } from '@vuetify/v0'
 *
 *   const timeline = useTimeline()
 * </script>
 * ```
 */
declare function useTimeline<Z extends TimelineTicket = TimelineTicket, E extends TimelineContext<Z> = TimelineContext<Z>>(namespace?: string): E;
//#endregion
//#region src/composables/createVirtual/index.d.ts
type VirtualDirection = 'forward' | 'reverse';
type VirtualState = 'loading' | 'empty' | 'error' | 'ok';
type VirtualAnchor = 'auto' | 'start' | 'end' | ((items: readonly unknown[]) => number | string);
interface ScrollToOptions {
  /**
   * The behavior of the scroll animation.
   */
  behavior?: 'auto' | 'smooth' | 'instant';
  /**
   * The alignment of the scroll position.
   */
  block?: 'start' | 'center' | 'end' | 'nearest';
  /**
   * The offset of the scroll position.
   */
  offset?: number;
}
interface VirtualOptions {
  /**
   * The height of the item.
   */
  itemHeight?: number | string | null;
  /**
   * The height of the container.
   */
  height?: number | string;
  /**
   * The number of extra items to render.
   */
  overscan?: number;
  /**
   * The direction of the scrolling.
   */
  direction?: VirtualDirection;
  /**
   * The anchor of the scrolling.
   */
  anchor?: VirtualAnchor;
  /**
   * Whether to smooth the anchor position.
   */
  anchorSmooth?: boolean;
  /**
   * The callback to call when the start is reached.
   */
  onStartReached?: (distance: number) => void | Promise<void>;
  /**
   * The callback to call when the end is reached.
   */
  onEndReached?: (distance: number) => void | Promise<void>;
  /**
   * The threshold for the start.
   */
  startThreshold?: number;
  /**
   * The threshold for the end.
   */
  endThreshold?: number;
  /**
   * Whether to enable momentum scrolling.
   */
  momentum?: boolean;
  /**
   * Whether to enable elastic scrolling.
   */
  elastic?: boolean;
}
interface VirtualItem<T = unknown> {
  raw: T;
  index: number;
}
interface VirtualContext<T = unknown> {
  /**
   * The element that is being virtualized.
   *
   * @example
   * ```vue
   * <script setup lang="ts">
   *   import { createVirtual } from '@vuetify/v0'
   *
   *   const virtual = createVirtual(items)
   *   const { element } = virtual
   * </script>
   *
   * <template>
   *   <div ref="element">
   *     <div v-for="item in items" :key="item.index">
   *       {{ item.raw }}
   *     </div>
   *   </div>
   * </template>
   */
  element: Ref<HTMLElement | undefined>;
  /**
   * The items that are being virtualized.
   *
   * @example
   * ```vue
   * <script setup lang="ts">
   *   import { createVirtual } from '@vuetify/v0'
   *
   *   const virtual = createVirtual(items)
   *   const { items } = virtual
   * </script>
   *
   * <template>
   *   <div v-for="item in items" :key="item.index">
   *     {{ item.raw }}
   *   </div>
   * </template>
   * ```
   */
  items: ComputedRef<VirtualItem<T>[]>;
  /**
   * The offset of the virtualized items.
   *
   * @example
   * ```vue
   * <script setup lang="ts">
   *   import { createVirtual } from '@vuetify/v0'
   *
   *   const virtual = createVirtual(items)
   *   const { offset } = virtual
   * </script>
   *
   * <template>
   *   <div :style="{ height: `${offset}px` }" />
   * </template>
   * ```
   */
  offset: Readonly<ShallowRef<number>>;
  /**
   * The size of the virtualized items.
   *
   * @example
   * ```vue
   * <script setup lang="ts">
   *   import { createVirtual } from '@vuetify/v0'
   *
   *   const virtual = createVirtual(items)
   *   const { size } = virtual
   * </script>
   *
   * <template>
   *   <div :style="{ height: `${size}px` }" />
   * </template>
   * ```
   */
  size: Readonly<ShallowRef<number>>;
  /**
   * The state of the virtualized items.
   *
   * @example
   * ```vue
   * <script setup lang="ts">
   *   import { createVirtual } from '@vuetify/v0'
   *
   *   const virtual = createVirtual(items)
   *   const { state } = virtual
   * </script>
   *
   * <template>
   *   <div v-if="state === 'loading'">Loading...</div>
   *   <div v-else-if="state === 'empty'">No items</div>
   *   <div v-else-if="state === 'error'">Error</div>
   *   <div v-else>Items</div>
   * </template>
   * ```
   */
  state: ShallowRef<VirtualState>;
  /**
   * Scroll to an item by index.
   *
   * @example
   * ```vue
   * <script setup lang="ts">
   *   import { createVirtual } from '@vuetify/v0'
   *
   *   const virtual = createVirtual(items)
   *   const { scrollTo } = virtual
   * </script>
   *
   * <template>
   *   <button @click="scrollTo(0)">Scroll to top</button>
   *   <button @click="scrollTo(items.length - 1)">Scroll to bottom</button>
   * </template>
   * ```
   */
  scrollTo: (index: number, options?: ScrollToOptions) => void;
  /**
   * The scroll event handler.
   *
   * @example
   * ```vue
   * <script setup lang="ts">
   *   import { createVirtual } from '@vuetify/v0'
   *
   *   const virtual = createVirtual(items)
   *   const { element, scroll } = virtual
   * </script>
   *
   * <template>
   *   <div ref="element" @scroll="scroll">
   *     <div v-for="item in items" :key="item.index">
   *       {{ item.raw }}
   *     </div>
   *   </div>
   * </template>
   * ```
   */
  scroll: () => void;
  /**
   * The scrollend event handler.
   *
   * @example
   * ```vue
   * <script setup lang="ts">
   *   import { createVirtual } from '@vuetify/v0'
   *
   *   const virtual = createVirtual(items)
   *   const { scroll, scrollend } = virtual
   * </script>
   *
   * <template>
   *   <div ref="element" @scroll="scroll" @scrollend="scrollend">
   *     <div v-for="item in items" :key="item.index">
   *       {{ item.raw }}
   *     </div>
   *   </div>
   * </template>
   * ```
   */
  scrollend: () => void;
  /**
   * Resize an item by index.
   *
   * @example
   * ```vue
   * <script setup lang="ts">
   *   import { createVirtual } from '@vuetify/v0'
   *
   *   const virtual = createVirtual(items)
   *   const { resize } = virtual
   * </script>
   *
   * <template>
   *   <button @click="resize(0, 100)">Resize first item</button>
   * </template>
   * ```
   */
  resize: (index: number, height: number) => void;
  /**
   * Reset the virtualized items.
   *
   * @example
   * ```vue
   * <script setup lang="ts">
   *   import { createVirtual } from '@vuetify/v0'
   *
   *   const virtual = createVirtual(items)
   *   const { reset } = virtual
   * </script>
   *
   * <template>
   *   <button @click="reset">Reset</button>
   *   <div v-for="item in items" :key="item.index">
   *     {{ item.raw }}
   *   </div>
   * </template>
   * ```
   */
  reset: () => void;
}
interface VirtualContextOptions extends VirtualOptions {
  /** Namespace for dependency injection */
  namespace?: string;
}
declare function createVirtual<T = unknown>(items: Ref<readonly T[]>, _options?: VirtualOptions): VirtualContext<T>;
/**
 * Creates a virtual scrolling context with dependency injection support.
 *
 * @param items Reactive array of items to virtualize
 * @param options Configuration options including namespace
 * @template T The type of the items
 * @returns Trinity tuple: [useVirtual, provideVirtual, defaultVirtual]
 *
 * @see https://0.vuetifyjs.com/composables/data/create-virtual
 *
 * @example
 * ```ts
 * // Create injectable context
 * const [useVirtual, provideVirtual, virtual] = createVirtualContext(items, {
 *   namespace: 'my-virtual',
 *   overscan: 10,
 * })
 *
 * // In parent component
 * provideVirtual()
 *
 * // In child component
 * const virtual = useVirtual()
 * ```
 */
declare function createVirtualContext<T = unknown>(items: Ref<readonly T[]>, _options?: VirtualContextOptions): ContextTrinity<VirtualContext<T>>;
/**
 * Returns the current virtual context from dependency injection.
 *
 * @param namespace The namespace for the virtual context. Defaults to `v0:virtual`.
 * @template T The type of the items
 * @returns The current virtual context.
 *
 * @throws An error if the virtual context is not found and no default is provided.
 *
 * @see https://0.vuetifyjs.com/composables/data/create-virtual
 *
 * @example
 * ```vue
 * <script lang="ts" setup>
 *   import { createVirtual } from '@vuetify/v0'
 *
 *   // Inject virtual context provided by parent
 *   const virtual = useVirtual()
 * </script>
 *
 * <template>
 *   <div>
 *     <p>Visible items: {{ virtual.items.value.length }}</p>
 *   </div>
 * </template>
 * ```
 */
declare function useVirtual<T = unknown>(namespace?: string): VirtualContext<T>;
//#endregion
//#region src/composables/toArray/index.d.ts
/**
 * @module toArray
 *
 * @see https://0.vuetifyjs.com/composables/transformers/to-array
 *
 * @remarks
 * Utility function to normalize single values and arrays into arrays.
 *
 * Converts single values into single-element arrays, passes arrays through unchanged,
 * and handles null/undefined by returning empty arrays. Perfect for functions that
 * accept both single values and arrays as input (e.g., ID | ID[]).
 *
 * @example
 * ```ts
 * import { toArray } from '@vuetify/v0'
 *
 * toArray('hello') // ['hello']
 * toArray(['a', 'b']) // ['a', 'b']
 * toArray(null) // []
 * ```
 */
/**
 * Converts a value to an array.
 *
 * @param value The value to convert.
 * @template Z The type of the value.
 * @returns The converted array.
 *
 * @see https://0.vuetifyjs.com/composables/transformers/to-array
 *
 * @example
 * ```ts
 * import { toArray } from '@vuetify/v0'
 *
 * const value = 'Example Value'
 * const valueAsArray = toArray(value)
 *
 * console.log(valueAsArray) // ['Example Value']
 * ```
 */
declare function toArray<Z>(value: Z | Z[]): Z[];
//#endregion
//#region src/composables/toElement/index.d.ts
type MaybeElementValue = HTMLElement | SVGElement | ComponentPublicInstance | Element | null | undefined;
/**
 * A flexible element ref type that accepts refs, getters, or raw values
 * containing DOM elements or Vue component instances.
 *
 * @remarks
 * Defined structurally (using `{ readonly value: T }`) instead of Vue's
 * nominal `Ref<T>` to avoid type mismatches when consumers use a
 * different Vue version than the library.
 * Use {@link toElement} to resolve the actual DOM element.
 */
type MaybeElementRef = {
  readonly value: MaybeElementValue;
} | (() => MaybeElementValue) | MaybeElementValue;
/**
 * Resolves a {@link MaybeElementRef} to a DOM Element or undefined.
 *
 * Handles:
 * - `Ref<Element>`, `ShallowRef<HTMLElement>`, getter functions
 * - Vue component instances (extracts `$el`)
 * - Raw DOM elements (pass-through)
 * - null/undefined (returns undefined)
 *
 * @param target The element ref, getter, or raw value to resolve
 * @returns The resolved DOM Element, or undefined if not available
 *
 * @see https://0.vuetifyjs.com/composables/transformers/to-element
 *
 * @example
 * ```ts
 * import { toElement } from '@vuetify/v0'
 *
 * const el = shallowRef<HTMLElement | null>(null)
 * toElement(el) // HTMLElement | undefined
 *
 * const component = ref<ComponentPublicInstance>()
 * toElement(component) // Element | undefined (from $el)
 * ```
 */
declare function toElement(target: MaybeElementRef): Element | undefined;
//#endregion
//#region src/composables/toHighlight/index.d.ts
/**
 * A contiguous chunk of source text, flagged as matched or unmatched.
 *
 * @example
 * ```ts
 * import type { HighlightChunk } from '@vuetify/v0'
 *
 * const chunk: HighlightChunk = { text: 'Hello', match: true }
 * ```
 */
interface HighlightChunk {
  text: string;
  match: boolean;
}
/**
 * Optional configuration for {@link toHighlight}.
 *
 * @example
 * ```ts
 * import { toHighlight } from '@vuetify/v0'
 *
 * const chunks = toHighlight('Hello World', 'WORLD', {
 *   ignoreCase: true,
 *   matchAll: true,
 * })
 * ```
 */
interface ToHighlightOptions {
  /**
   * Pre-computed `[start, end]` index pairs.
   * When non-empty, takes priority over `query`. `matchAll` is ignored.
   * Caller-supplied ranges are sorted and merged before chunking, so
   * unsorted or overlapping input is handled gracefully.
   */
  matches?: MaybeRefOrGetter<readonly MatchRange[] | undefined>;
  /**
   * Highlight every occurrence (`true`) or only the first per term (`false`, default).
   * Ignored when `matches` is provided.
   */
  matchAll?: MaybeRefOrGetter<boolean>;
  /** Case-insensitive matching. Default `false`. */
  ignoreCase?: MaybeRefOrGetter<boolean>;
  /**
   * Folds accents before matching. `'query'` folds only the search term,
   * `'target'` only the text, `true` both sides. Default `false`.
   */
  ignoreAccents?: MaybeRefOrGetter<IgnoreAccents>;
}
/**
 * Splits text into matched and unmatched chunks.
 *
 * Pure transformer — returns a plain array. Wrap the call in `computed()` for
 * reactive recomputation.
 *
 * Priority: `options.matches` (when non-empty) → `query` → no-match fallback.
 *
 * @param text The source string to split.
 * @param query One or more search terms. Empty strings are ignored. Case sensitivity controlled by `options.ignoreCase`.
 * @param options Optional `matches`, `matchAll`, `ignoreCase`, `ignoreAccents`.
 * @returns A `HighlightChunk[]` array.
 *
 * @see https://0.vuetifyjs.com/composables/transformers/to-highlight
 *
 * @example
 * ```ts
 * import { computed, shallowRef } from 'vue'
 * import { toHighlight } from '@vuetify/v0'
 *
 * const query = shallowRef('World')
 * const chunks = computed(() => toHighlight('Hello World', query))
 *
 * console.log(chunks.value)
 * // [{ text: 'Hello ', match: false }, { text: 'World', match: true }]
 * ```
 */
declare function toHighlight(text: MaybeRefOrGetter<string>, query?: MaybeRefOrGetter<string | string[] | undefined>, options?: ToHighlightOptions): HighlightChunk[];
//#endregion
//#region src/composables/toReactive/index.d.ts
/**
 * Converts a `MaybeRef` to a `UnwrapNestedRefs`.
 *
 * @param objectRef The object to convert.
 * @template Z The type of the object.
 * @returns The converted object.
 *
 * @see https://0.vuetifyjs.com/composables/transformers/to-reactive
 *
 * @example
 * ```ts
 * import { ref } from 'vue'
 * import { toReactive } from '@vuetify/v0'
 *
 * const state = ref({ name: 'John', age: 30 })
 * const rstate = toReactive(state)
 *
 * console.log(rstate.name) // John
 * ```
 */
declare function toReactive<Z extends object>(objectRef: MaybeRef<Z>): UnwrapNestedRefs<Z>;
//#endregion
//#region src/composables/useBreakpoints/index.d.ts
type BreakpointName = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
interface BreakpointsContext {
  breakpoints: Readonly<Record<BreakpointName, number>>;
  mobileBreakpoint: BreakpointName | number;
  name: Readonly<ShallowRef<BreakpointName>>;
  width: Readonly<ShallowRef<number>>;
  height: Readonly<ShallowRef<number>>;
  isMobile: Readonly<ShallowRef<boolean>>;
  xs: Readonly<ShallowRef<boolean>>;
  sm: Readonly<ShallowRef<boolean>>;
  md: Readonly<ShallowRef<boolean>>;
  lg: Readonly<ShallowRef<boolean>>;
  xl: Readonly<ShallowRef<boolean>>;
  xxl: Readonly<ShallowRef<boolean>>;
  smAndUp: Readonly<ShallowRef<boolean>>;
  mdAndUp: Readonly<ShallowRef<boolean>>;
  lgAndUp: Readonly<ShallowRef<boolean>>;
  xlAndUp: Readonly<ShallowRef<boolean>>;
  smAndDown: Readonly<ShallowRef<boolean>>;
  mdAndDown: Readonly<ShallowRef<boolean>>;
  lgAndDown: Readonly<ShallowRef<boolean>>;
  xlAndDown: Readonly<ShallowRef<boolean>>;
  ssr: boolean;
  update: () => void;
}
interface BreakpointsOptions {
  namespace?: string;
  mobileBreakpoint?: BreakpointName | number;
  breakpoints?: Partial<Record<BreakpointName, number>>;
  ssr?: {
    clientWidth: number;
    clientHeight?: number;
  };
}
interface BreakpointsPluginOptions extends BreakpointsOptions {}
interface BreakpointsContextOptions extends BreakpointsOptions {}
/**
 * Creates a new breakpoints instance.
 *
 * @param options The options for the breakpoints instance.
 * @returns A new breakpoints instance.
 *
 * @see https://0.vuetifyjs.com/composables/plugins/use-breakpoints
 *
 * @example
 * ```ts
 * import { createBreakpoints } from '@vuetify/v0'
 *
 * const breakpoints = createBreakpoints({
 *   namespace: 'v0:breakpoints',
 *   mobileBreakpoint: 'md',
 *   breakpoints: {
 *     xs: 0,
 *     sm: 600,
 *     md: 840,
 *     lg: 1145,
 *     xl: 1545,
 *     xxl: 2138,
 *   },
 * })
 * ```
 */
declare function createBreakpoints(_options?: BreakpointsOptions): BreakpointsContext;
declare const createBreakpointsContext: <_E extends BreakpointsContext = BreakpointsContext>(_options?: BreakpointsContextOptions | undefined) => ContextTrinity<_E>, createBreakpointsPlugin: (_options?: BreakpointsContextOptions | undefined) => Plugin, useBreakpoints: <_E extends BreakpointsContext = BreakpointsContext>(namespace?: string) => _E;
//#endregion
//#region src/composables/useClickOutside/index.d.ts
type ClickOutsideElement = HTMLElement | null | undefined;
type ClickOutsideTarget = MaybeRefOrGetter<ClickOutsideElement>;
type ClickOutsideIgnoreTarget = ClickOutsideTarget | string;
interface UseClickOutsideOptions {
  /**
   * Use capture phase for event listeners.
   * Ensures detection works even when inner elements call stopPropagation.
   * @default true
   */
  capture?: boolean;
  /**
   * Touch movement threshold in pixels.
   * If finger moves more than this distance, it's treated as a scroll, not a tap.
   * Only applies to touch interactions.
   * @default 30
   */
  touchScrollThreshold?: number;
  /**
   * Detect focus moving to iframes as an outside click.
   * Useful when iframes are outside the target elements.
   * @default false
   */
  detectIframe?: boolean;
  /**
   * Elements to ignore when detecting outside clicks.
   * Accepts element refs, getters, or CSS selector strings.
   * Clicks on these elements (or their descendants) won't trigger the handler.
   *
   * Note: CSS selectors cannot match across Shadow DOM boundaries due to
   * browser limitations. Use element refs instead when ignoring shadow hosts.
   */
  ignore?: MaybeRefOrGetter<ClickOutsideIgnoreTarget[]>;
  /**
   * Use bounding rect instead of DOM containment to detect outside clicks.
   * When true, checks if click coordinates are outside the element's bounding box.
   * Useful for native <dialog> elements where backdrop clicks have the dialog as target.
   * @default false
   */
  bounds?: boolean;
}
interface UseClickOutsideReturn {
  /**
   * Whether the listener is currently active
   */
  readonly isActive: Readonly<Ref<boolean>>;
  /**
   * Whether the listener is currently paused
   */
  readonly isPaused: Readonly<Ref<boolean>>;
  /**
   * Pause listening (stops detection but keeps state)
   */
  pause: () => void;
  /**
   * Resume listening
   */
  resume: () => void;
  /**
   * Stop listening and clean up
   */
  stop: () => void;
}
/**
 * Detects clicks outside of the specified element(s).
 *
 * Uses two-phase detection (pointerdown → pointerup) to prevent false positives
 * when users drag from inside to outside an element.
 *
 * @param target Element ref(s) to detect clicks outside of. Accepts a single ref/getter or array of refs/getters.
 * @param handler Callback invoked when a click outside is detected.
 * @param options Configuration options.
 * @returns An object with methods to control the listener.
 *
 * @see https://0.vuetifyjs.com/composables/system/use-click-outside
 *
 * @example Native element ref
 * ```ts
 * const menuRef = useTemplateRef<HTMLElement>('menu')
 *
 * useClickOutside(menuRef, () => { isOpen.value = false })
 * ```
 *
 * @example Component ref (e.g., Atom)
 * ```ts
 * const atomRef = useTemplateRef<AtomExpose>('atom')
 *
 * // Pass the exposed element TemplateRef via getter
 * useClickOutside(
 *   () => atomRef.value?.element,
 *   () => { isOpen.value = false }
 * )
 * ```
 *
 * @example Multiple targets
 * ```ts
 * const popoverRef = useTemplateRef<AtomExpose>('popover')
 * const anchorRef = useTemplateRef<HTMLElement>('anchor')
 *
 * useClickOutside(
 *   [() => popoverRef.value?.element, anchorRef],
 *   () => { isOpen.value = false }
 * )
 * ```
 *
 * @example Ignoring elements (CSS selectors or refs)
 * ```ts
 * useClickOutside(
 *  () => navRef.value?.element,
 *  () => { isOpen.value = false },
 *  { ignore: ['[data-app-bar]'] }
 * )
 * ```
 *
 * @example Native dialog with bounds detection
 * ```ts
 * // For native <dialog> elements, use bounds mode to detect backdrop clicks
 * const dialogRef = useTemplateRef<HTMLDialogElement>('dialog')
 *
 * useClickOutside(
 *   dialogRef,
 *   () => { dialogRef.value?.close() },
 *   { bounds: true }
 * )
 * ```
 */
declare function useClickOutside(target: MaybeArray<ClickOutsideTarget>, handler: (event: PointerEvent | FocusEvent) => void, options?: UseClickOutsideOptions): UseClickOutsideReturn;
//#endregion
//#region src/composables/useDate/index.d.ts
interface DateContext<Z> {
  /** The date adapter instance */
  adapter: DateAdapter<Z>;
  /** Current locale (reactive, synced with useLocale if available) */
  locale: ComputedRef<string | undefined>;
  /** First day of week, derived from locale or explicit override */
  firstDayOfWeek: ComputedRef<number>;
}
/** Options for date composables */
interface DateOptions<Z> {
  /**
   * Date adapter instance.
   *
   * @example
   * ```ts
   * import { V0DateAdapter } from '@vuetify/v0/date'
   * createDate({ adapter: new V0DateAdapter() })
   * ```
   */
  adapter: DateAdapter<Z>;
  /** Locale for formatting (defaults to useLocale's selected locale or 'en-US') */
  locale?: string;
  /** Short locale codes mapped to full Intl locale strings (e.g., { en: 'en-US' }) */
  locales?: Record<string, string>;
  /** First day of week override. 0=Sun, 1=Mon, ... 6=Sat. Derived from locale if not set. */
  firstDayOfWeek?: number;
}
/** Context options with namespace */
interface DateContextOptions<Z> extends DateOptions<Z> {
  namespace?: string;
}
/** Plugin options */
interface DatePluginOptions<Z> extends DateContextOptions<Z> {}
/**
 * Creates a new date context.
 *
 * @param options Adapter and locale configuration.
 * @template Z The date type used by the adapter.
 * @template E The date context type.
 * @returns A date context.
 *
 * @see https://0.vuetifyjs.com/composables/plugins/use-date
 *
 * @example
 * ```ts
 * import { V0DateAdapter } from '@vuetify/v0/date'
 *
 * const { adapter } = createDate({ adapter: new V0DateAdapter() })
 * const today = adapter.date()
 *
 * // With locale options
 * const { adapter } = createDate({
 *   adapter: new V0DateAdapter(),
 *   locale: 'de-DE',
 * })
 * ```
 */
declare function createDate<Z, E extends DateContext<Z> = DateContext<Z>>(options: DateOptions<Z>): E;
/**
 * Creates a new date context trinity.
 *
 * @param options Adapter, locale, and namespace configuration.
 * @template Z The date type used by the adapter.
 * @template E The date context type.
 * @returns A trinity [useContext, provideContext, defaultContext].
 *
 * @see https://0.vuetifyjs.com/composables/plugins/use-date
 *
 * @example
 * ```ts
 * import { V0DateAdapter } from '@vuetify/v0/date'
 *
 * const [useAppDate, provideAppDate] = createDateContext({
 *   adapter: new V0DateAdapter(),
 *   namespace: 'app:date',
 * })
 * ```
 */
declare function createDateContext<Z, E extends DateContext<Z> = DateContext<Z>>(_options: DateContextOptions<Z>): ContextTrinity<E>;
/**
 * Creates a new date plugin.
 *
 * @param options Adapter, locale, and namespace configuration.
 * @template Z The date type used by the adapter.
 * @template E The date context type.
 * @returns A Vue plugin.
 *
 * @see https://0.vuetifyjs.com/composables/plugins/use-date
 *
 * @example
 * ```ts
 * import { V0DateAdapter } from '@vuetify/v0/date'
 *
 * const app = createApp(App)
 * app.use(createDatePlugin({ adapter: new V0DateAdapter() }))
 *
 * // With locale options
 * app.use(createDatePlugin({
 *   adapter: new V0DateAdapter(),
 *   locale: 'de-DE',
 * }))
 * ```
 */
declare function createDatePlugin<Z, E extends DateContext<Z> = DateContext<Z>>(_options: DatePluginOptions<Z>): Plugin;
/**
 * Returns the current date context.
 *
 * Requires `createDatePlugin` to be installed with an adapter.
 *
 * @param namespace The namespace to look up (defaults to 'v0:date').
 * @template Z The date type used by the adapter.
 * @template E The date context type.
 * @returns The current date context.
 * @throws If called outside a component or without a date plugin installed.
 *
 * @see https://0.vuetifyjs.com/composables/plugins/use-date
 *
 * @example
 * ```ts
 * // main.ts
 * import { V0DateAdapter } from '@vuetify/v0/date'
 * import { createDatePlugin } from '@vuetify/v0'
 *
 * app.use(createDatePlugin({ adapter: new V0DateAdapter() }))
 * ```
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { useDate } from '@vuetify/v0'
 *
 * const { adapter, locale } = useDate()
 * const today = adapter.date()
 * </script>
 * ```
 */
declare function useDate<Z, E extends DateContext<Z> = DateContext<Z>>(namespace?: string): E;
//#endregion
//#region src/composables/useDelay/index.d.ts
interface UseDelayOptions {
  /**
   * Delay in milliseconds before the opening transition fires.
   *
   * @example
   * ```ts
   * useDelay(undefined, { openDelay: 300 })
   * useDelay(undefined, { openDelay: () => isFocus.value ? 0 : 500 })
   * ```
   */
  openDelay?: MaybeRefOrGetter<number>;
  /**
   * Delay in milliseconds before the closing transition fires.
   *
   * @example
   * ```ts
   * useDelay(undefined, { closeDelay: 200 })
   * ```
   */
  closeDelay?: MaybeRefOrGetter<number>;
}
/**
 * Per-call options for `start()`.
 *
 * @example
 * ```ts
 * delay.start(false, { minDelay: 500 })
 * ```
 */
interface UseDelayStartOptions {
  /** Minimum delay floor in ms; max(configuredDelay, minDelay) wins. */
  minDelay?: number;
}
/**
 * The reactive controls and state surface returned by `useDelay`.
 *
 * @example
 * ```ts
 * const { start, stop, pause, resume, isActive, isOpening } = useDelay(
 *   undefined,
 *   { openDelay: 300, closeDelay: 200 },
 * )
 *
 * start(true)
 * ```
 */
interface UseDelayReturn {
  /**
   * Start a delay in the given direction. Restarts if already running. Resolves
   * with `isOpening` once the delay elapses. If `start()` is called again before
   * the previous resolves, the previous promise resolves with the new direction.
   *
   * @example
   * ```ts
   * const delay = useDelay(undefined, { openDelay: 300, closeDelay: 200 })
   * await delay.start(true)                    // resolves true after 300ms
   * await delay.start(false, { minDelay: 500 }) // resolves false after max(200, 500)
   * ```
   */
  start: (isOpening: boolean, options?: UseDelayStartOptions) => Promise<boolean>;
  /**
   * Cancel any pending delay and reset state. Resolves the pending promise with the current direction.
   *
   * @example
   * ```ts
   * delay.stop()
   * ```
   */
  stop: () => void;
  /**
   * Pause the in-flight delay, preserving remaining time. No-op if not running.
   *
   * @example
   * ```ts
   * delay.pause()
   * ```
   */
  pause: () => void;
  /**
   * Resume from where pause left off. No-op if not paused.
   *
   * @example
   * ```ts
   * delay.resume()
   * ```
   */
  resume: () => void;
  /**
   * Whether a delay is currently pending (started, not stopped).
   */
  isActive: Readonly<Ref<boolean>>;
  /**
   * Whether the pending delay is currently paused.
   */
  isPaused: Readonly<Ref<boolean>>;
  /**
   * Milliseconds remaining until the pending transition fires.
   */
  remaining: Readonly<Ref<number>>;
  /**
   * Direction of the pending transition (`true` = opening, `false` = closing).
   */
  isOpening: Readonly<Ref<boolean>>;
}
/**
 * Schedule open and close transitions with configurable delays.
 *
 * Composes `useTimer` for the lifecycle (`start` / `stop` / `pause` / `resume` plus
 * reactive `isActive`, `isPaused`, `remaining`) and adds direction tracking
 * (`isOpening`) and promise-based resolution.
 *
 * @param callback Optional callback invoked once a started delay elapses; receives the resolved direction.
 * @param options Reactive delay settings.
 * @returns Lifecycle controls and reactive state.
 *
 * @see https://0.vuetifyjs.com/composables/system/use-delay
 *
 * @example
 * ```ts
 * const delay = useDelay(isOpening => isVisible.value = isOpening, {
 *   openDelay: 300,
 *   closeDelay: 200,
 * })
 *
 * delay.start(true)
 * delay.start(false, { minDelay: 500 })
 * delay.pause()
 * delay.resume()
 * delay.stop()
 * ```
 */
declare function useDelay(callback?: (isOpening: boolean) => void, options?: UseDelayOptions): UseDelayReturn;
//#endregion
//#region src/composables/useDragDrop/adapters/adapter.d.ts
interface DragDropAdapterEmit<Z extends DragType = DragType> {
  start: (source: DraggableTicket<Z>, origin: {
    x: number;
    y: number;
  }, via: DragVia) => void;
  move: (point: {
    x: number;
    y: number;
  }) => void;
  drop: () => void;
  cancel: () => void;
}
interface DragDropAdapterContext<Z extends DragType = DragType> extends DragDropContext<Z> {
  emit: DragDropAdapterEmit<Z>;
}
/**
 * Abstract base class for useDragDrop adapters. Provides a `cleanup` slot, a
 * `dispose()` lifecycle, and a `locate()` helper that walks the DOM to find the
 * draggable ticket whose `el` ancestors a given event target.
 *
 * @example
 * ```ts
 * import { DragDropAdapter, type DragDropAdapterContext } from '@vuetify/v0'
 *
 * class MyAdapter extends DragDropAdapter {
 *   setup (context: DragDropAdapterContext) {
 *     const stop = useEventListener(document, 'mousedown', event => {
 *       const ticket = this.locate(event.target, context)
 *       if (ticket) context.emit.start(ticket, { x: event.clientX, y: event.clientY }, 'pointer')
 *     })
 *     this.cleanup = () => stop()
 *   }
 * }
 * ```
 */
declare abstract class DragDropAdapter<Z extends DragType = DragType> {
  protected cleanup: (() => void) | null;
  dispose(): void;
  protected locate(target: EventTarget | Element | null, context: DragDropAdapterContext<Z>): DraggableTicket<Z> | null;
  abstract setup(context: DragDropAdapterContext<Z>): void;
}
//#endregion
//#region src/composables/useDragDrop/adapters/pointer.d.ts
interface PointerAdapterOptions {
  /** Drag-activation distance in px (default 0 — start on pointerdown). */
  threshold?: number;
}
/**
 * Default pointer adapter. Wires `pointerdown` / `pointermove` / `pointerup` /
 * `pointercancel` on the document and converts them into drag lifecycle calls.
 *
 * @example
 * ```ts
 * import { PointerAdapter, useDragDrop } from '@vuetify/v0'
 *
 * useDragDrop({ adapters: [new PointerAdapter({ threshold: 10 })] })
 * ```
 */
declare class PointerAdapter<Z extends DragType = DragType> extends DragDropAdapter<Z> {
  private threshold;
  constructor(options?: PointerAdapterOptions);
  setup(context: DragDropAdapterContext<Z>): void;
}
//#endregion
//#region src/composables/useDragDrop/adapters/keyboard.d.ts
interface KeyboardAdapterOptions {
  /** Activation keys (default [' ', 'Enter']). */
  activate?: string[];
  /** Step size in px for arrow-key moves (default 16). */
  step?: number;
}
/**
 * Default keyboard adapter. Listens for `keydown` on the document; activation
 * keys start/drop drags, arrow keys nudge the drag point, Escape cancels.
 *
 * @example
 * ```ts
 * import { KeyboardAdapter, useDragDrop } from '@vuetify/v0'
 *
 * useDragDrop({ adapters: [new KeyboardAdapter({ activate: ['x'], step: 32 })] })
 * ```
 */
declare class KeyboardAdapter<Z extends DragType = DragType> extends DragDropAdapter<Z> {
  private activate;
  private step;
  constructor(options?: KeyboardAdapterOptions);
  setup(context: DragDropAdapterContext<Z>): void;
}
//#endregion
//#region src/composables/useDragDrop/index.d.ts
/**
 * Layout axis a drop zone resolves indices along.
 */
type Orientation = 'vertical' | 'horizontal';
/**
 * `MaybeRefOrGetter<T>` plus Vue 3.5.42 `useTemplateRef` / `shallowReadonly`
 * results. Those wrap in a deep `Readonly<Ref<T>>` that is not assignable
 * to `Ref<T>`.
 */
type MaybeReadonlyRefOrGetter<T> = MaybeRefOrGetter<T> | {
  readonly value: unknown;
};
/**
 * Discriminated payload describing what is being dragged. Consumers extend
 * this with concrete `type` literals plus a matching `value`.
 *
 * @example
 * ```ts
 * import type { DragType } from '@vuetify/v0'
 *
 * type Cards =
 *   | { type: 'card', value: Card }
 *   | { type: 'column', value: Column }
 * // Cards extends DragType — distributive over the union.
 * ```
 */
interface DragType {
  type: string;
  value: unknown;
}
/**
 * Resolved drop slot inside an oriented zone. Surfaced via {@link DropPosition}
 * so consumers can render a between-children indicator against the resolved
 * child rect.
 *
 * @example
 * ```ts
 * import { useDragDrop } from '@vuetify/v0'
 *
 * const dnd = useDragDrop<{ type: 'card', value: Card }>()
 * const zone = dnd.zones.register({ el, accept: ['card'], orientation: 'vertical' })
 *
 * const indicator = zone.indicator.value
 * if (indicator) {
 *   const y = indicator.edge === 'before'
 *     ? indicator.rect.top
 *     : indicator.rect.bottom
 *   const x = indicator.rect.left
 *   const width = indicator.rect.width
 *   // Render a 2px bar at (x, y) with `width` to mark drop slot `indicator.index`.
 * }
 * ```
 */
interface DropIndicator {
  index: number;
  edge: 'before' | 'after';
  rect: DOMRect;
}
/**
 * Position passed to drop hooks. `index` is populated for oriented zones;
 * unoriented zones receive only the pointer location. `indicator` is absent
 * when no slot was proposed: an empty zone resolves `index` to `0`, a drop on
 * a slot flanking the drag's own position resolves to that position (a stay).
 *
 * @example
 * ```ts
 * import { useDragDrop } from '@vuetify/v0'
 *
 * const dnd = useDragDrop<{ type: 'card', value: Card }>()
 *
 * dnd.zones.register({
 *   el,
 *   accept: ['card'],
 *   orientation: 'vertical',
 *   onDrop: (drag, position) => {
 *     const target = position.index ?? items.length
 *     items.splice(target, 0, drag.value)
 *   },
 * })
 * ```
 */
interface DropPosition {
  pointer: {
    x: number;
    y: number;
  };
  index?: number;
  indicator?: DropIndicator;
}
/**
 * Source modality for an active drag. Adapters declare their own value via
 * the `Extensible<...>` escape hatch (e.g., 'touch', 'gamepad').
 */
type DragVia = Extensible<'pointer' | 'keyboard'>;
/**
 * Active drag state. Distributive over `Z` so that narrowing `drag.type` also
 * narrows `drag.value` when `Z` is a discriminated union.
 *
 * @example
 * ```ts
 * import { useDragDrop } from '@vuetify/v0'
 *
 * type Cards = { type: 'card', value: Card } | { type: 'column', value: Column }
 *
 * const dnd = useDragDrop<Cards>()
 *
 * dnd.zones.register({
 *   el,
 *   onEnter: drag => {
 *     if (drag.type === 'card') drag.value.title // narrowed to Card
 *   },
 * })
 * ```
 */
type ActiveDrag<Z extends DragType = DragType> = Z extends DragType ? {
  id: ID;
  type: Z['type'];
  value: Z['value'];
  origin: {
    x: number;
    y: number;
  };
  current: {
    x: number;
    y: number;
  };
  delta: {
    x: number;
    y: number;
  };
  over: ID | null;
  willAccept: boolean;
  via: DragVia;
} : never;
/**
 * Input shape for a draggable. Distributive over `Z` so unions narrow.
 *
 * @example
 * ```ts
 * import { useDragDrop } from '@vuetify/v0'
 *
 * const dnd = useDragDrop<{ type: 'card', value: Card }>()
 *
 * dnd.draggables.register({
 *   el: cardRef,
 *   type: 'card',
 *   value: card,
 *   onBeforeStart: drag => !drag.value.locked,
 * })
 * ```
 */
type DraggableTicketInput<Z extends DragType = DragType> = Z extends DragType ? RegistryTicketInput & {
  type: Z['type'];
  value: Z['value'];
  el: MaybeReadonlyRefOrGetter<HTMLElement | null>;
  disabled?: MaybeReadonlyRefOrGetter<boolean>;
  onBeforeStart?: (drag: ActiveDrag<Z>) => boolean | void;
  onMove?: (drag: ActiveDrag<Z>) => void;
  onCancel?: (drag: ActiveDrag<Z>, reason: 'cancel' | 'reject') => void;
} : never;
/**
 * Output shape for a draggable. Distributive over `Z` so `ticket.type`
 * narrowing carries `ticket.value` to the matching union member.
 *
 * @example
 * ```ts
 * import { useDragDrop } from '@vuetify/v0'
 *
 * const dnd = useDragDrop<{ type: 'card', value: Card }>()
 *
 * const ticket = dnd.draggables.register({ el, type: 'card', value: card })
 *
 * ticket.isDragging.value // boolean
 * ticket.value           // Card
 * ```
 */
type DraggableTicket<Z extends DragType = DragType> = Z extends DragType ? RegistryTicket & {
  type: Z['type'];
  value: Z['value'];
  el: Readonly<Ref<HTMLElement | null>>;
  isDragging: Readonly<Ref<boolean>>;
} : never;
/**
 * Input shape for a drop zone.
 *
 * @example
 * ```ts
 * import { useDragDrop } from '@vuetify/v0'
 *
 * const dnd = useDragDrop<{ type: 'card', value: Card }>()
 *
 * dnd.zones.register({
 *   el: listRef,
 *   accept: ['card'],
 *   orientation: 'vertical',
 *   onDrop: (drag, position) => items.splice(position.index ?? 0, 0, drag.value),
 * })
 * ```
 */
interface DropZoneTicketInput<Z extends DragType = DragType> extends RegistryTicketInput {
  el: MaybeReadonlyRefOrGetter<HTMLElement | null>;
  /** Allowed drag types or a synchronous predicate. Async predicates (Promise / thenable returns) are rejected with a warning — `accept` must return synchronously. */
  accept?: Z['type'][] | ((drag: ActiveDrag<Z>) => boolean);
  orientation?: Orientation;
  disabled?: MaybeReadonlyRefOrGetter<boolean>;
  onEnter?: (drag: ActiveDrag<Z>) => void;
  onLeave?: (drag: ActiveDrag<Z>) => void;
  onBeforeDrop?: (drag: ActiveDrag<Z>, position: DropPosition) => boolean | void;
  onDrop?: (drag: ActiveDrag<Z>, position: DropPosition) => void;
}
/**
 * Output shape for a drop zone.
 *
 * @example
 * ```ts
 * import { useDragDrop } from '@vuetify/v0'
 *
 * const dnd = useDragDrop<{ type: 'card', value: Card }>()
 *
 * const zone = dnd.zones.register({ el, accept: ['card'] })
 *
 * zone.isOver.value      // boolean
 * zone.willAccept.value  // boolean
 * zone.indicator.value   // DropIndicator | null
 * ```
 */
interface DropZoneTicket extends RegistryTicket {
  el: Readonly<Ref<HTMLElement | null>>;
  isOver: Readonly<Ref<boolean>>;
  willAccept: Readonly<Ref<boolean>>;
  indicator: Readonly<Ref<DropIndicator | null>>;
}
/**
 * Plugin signature. Receives the public context, optionally returns a
 * disposer that runs on scope teardown.
 *
 * @example
 * ```ts
 * import { useDragDrop } from '@vuetify/v0'
 * import type { DragDropPlugin } from '@vuetify/v0'
 *
 * const logDrops: DragDropPlugin = context => {
 *   const off = context.zones.on('register:ticket', ticket => console.log('zone', ticket.id))
 *   return () => off()
 * }
 *
 * const dnd = useDragDrop({ plugins: [logDrops] })
 * ```
 */
type DragDropPlugin<Z extends DragType = DragType> = (context: DragDropContext<Z>) => (() => void) | void;
/**
 * Options accepted by {@link useDragDrop}.
 *
 * @example
 * ```ts
 * import { useDragDrop, PointerAdapter } from '@vuetify/v0'
 *
 * const dnd = useDragDrop({
 *   adapters: [new PointerAdapter()],
 *   onDrop: (drag, position) => console.log('drop', drag, position),
 * })
 * ```
 */
interface DragDropOptions<Z extends DragType = DragType> {
  adapters?: DragDropAdapter<Z>[];
  plugins?: DragDropPlugin<Z>[];
  onBeforeStart?: (drag: ActiveDrag<Z>) => boolean | void;
  onMove?: (drag: ActiveDrag<Z>) => void;
  onBeforeDrop?: (drag: ActiveDrag<Z>, position: DropPosition) => boolean | void;
  onDrop?: (drag: ActiveDrag<Z>, position: DropPosition) => void;
  onCancel?: (drag: ActiveDrag<Z>, reason: 'cancel' | 'reject') => void;
}
/**
 * Registry context for draggable tickets, returned as `dnd.draggables`
 * from {@link useDragDrop}.
 *
 * @example
 * ```ts
 * import { useDragDrop } from '@vuetify/v0'
 *
 * const dnd = useDragDrop<{ type: 'card', value: Card }>()
 *
 * const ticket = dnd.draggables.register({ el, type: 'card', value: card })
 * ```
 */
interface DraggablesContext<Z extends DragType = DragType> extends Omit<RegistryContext<DraggableTicketInput<Z>, DraggableTicketInput<Z> & DraggableTicket<Z>>, 'register'> {
  register: (registration: DraggableTicketInput<Z>) => DraggableTicket<Z>;
}
/**
 * Registry context for drop zones, returned as `dnd.zones`
 * from {@link useDragDrop}.
 *
 * @example
 * ```ts
 * import { useDragDrop } from '@vuetify/v0'
 *
 * const dnd = useDragDrop<{ type: 'card', value: Card }>()
 *
 * const zone = dnd.zones.register({ el, accept: ['card'] })
 * ```
 */
interface ZonesContext<Z extends DragType = DragType> extends Omit<RegistryContext<DropZoneTicketInput<Z>, DropZoneTicketInput<Z> & DropZoneTicket>, 'register'> {
  register: (registration: DropZoneTicketInput<Z>) => DropZoneTicket;
}
/**
 * Public context returned by {@link useDragDrop}.
 *
 * @example
 * ```ts
 * import { useDragDrop } from '@vuetify/v0'
 *
 * const dnd = useDragDrop<{ type: 'card', value: Card }>()
 *
 * dnd.active.value     // ActiveDrag<{ type: 'card', value: Card }> | null
 * dnd.isDragging.value // boolean
 * dnd.cancel()         // programmatic cancel
 * ```
 */
interface DragDropContext<Z extends DragType = DragType> {
  draggables: DraggablesContext<Z>;
  zones: ZonesContext<Z>;
  active: Readonly<ShallowRef<ActiveDrag<Z> | null>>;
  isDragging: Readonly<Ref<boolean>>;
  cancel: () => void;
}
/**
 * Create a headless drag-and-drop context.
 *
 * @param options - Adapters, plugins, and lifecycle hooks. All optional.
 * @returns A `DragDropContext<Z>` exposing `draggables` / `zones` registries,
 *   the `active` drag, the `isDragging` boolean, and a programmatic `cancel()`.
 *
 * @see https://0.vuetifyjs.com/composables/system/use-drag-drop
 *
 * @example
 * ```ts
 * import { useDragDrop } from '@vuetify/v0'
 * import { useTemplateRef } from 'vue'
 *
 * const dnd = useDragDrop<{ type: 'card', value: string }>()
 *
 * const draggable = useTemplateRef<HTMLElement>('draggable')
 * const dropzone = useTemplateRef<HTMLElement>('dropzone')
 *
 * dnd.draggables.register({ el: draggable, type: 'card', value: 'card-1' })
 * dnd.zones.register({
 *   el: dropzone,
 *   accept: ['card'],
 *   onDrop: (drag, position) => console.log(drag.value, position.index),
 * })
 * ```
 */
declare function useDragDrop<Z extends DragType = DragType>(options?: DragDropOptions<Z>): DragDropContext<Z>;
//#endregion
//#region src/composables/useEventListener/index.d.ts
type CleanupFunction = () => void;
type EventHandler<E = Event> = (event: E) => void;
/**
 * Attaches an event listener to the window.
 *
 * @param target The window object.
 * @param event The event to listen for.
 * @param listener The event listener.
 * @param options The event listener options.
 * @template E The event type.
 * @returns A function to remove the event listener.
 *
 * @see https://0.vuetifyjs.com/composables/system/use-event-listener
 */
declare function useEventListener<E extends keyof WindowEventMap>(target: Window, event: MaybeRefOrGetter<MaybeArray<E>>, listener: MaybeRef<MaybeArray<(this: Window, event: WindowEventMap[E]) => void>>, options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>): CleanupFunction;
/**
 * Attaches an event listener to the document.
 *
 * @param target The document object.
 * @param event The event to listen for.
 * @param listener The event listener.
 * @param options The event listener options.
 * @template E The event type.
 * @returns A function to remove the event listener.
 *
 * @see https://0.vuetifyjs.com/composables/system/use-event-listener
 */
declare function useEventListener<E extends keyof DocumentEventMap>(target: Document, event: MaybeRefOrGetter<MaybeArray<E>>, listener: MaybeRef<MaybeArray<(this: Document, event: DocumentEventMap[E]) => void>>, options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>): CleanupFunction;
/**
 * Attaches an event listener to an HTML element.
 *
 * @param target The HTML element.
 * @param event The event to listen for.
 * @param listener The event listener.
 * @param options The event listener options.
 * @template E The event type.
 * @returns A function to remove the event listener.
 *
 * @see https://0.vuetifyjs.com/composables/system/use-event-listener
 */
declare function useEventListener<E extends keyof HTMLElementEventMap>(target: MaybeRefOrGetter<HTMLElement | null | undefined>, event: MaybeRefOrGetter<MaybeArray<E>>, listener: MaybeRef<MaybeArray<(this: HTMLElement, event: HTMLElementEventMap[E]) => void>>, options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>): CleanupFunction;
/**
 * Attaches an event listener to an event target.
 *
 * @param target The event target.
 * @param event The event to listen for.
 * @param listener The event listener.
 * @param options The event listener options.
 * @template EventType The event type.
 * @returns A function to remove the event listener.
 *
 * @see https://0.vuetifyjs.com/composables/system/use-event-listener
 */
declare function useEventListener<EventType = Event>(target: MaybeRefOrGetter<EventTarget | null | undefined>, event: MaybeRefOrGetter<MaybeArray<string>>, listener: MaybeRef<MaybeArray<EventHandler<EventType>>>, options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>): CleanupFunction;
/**
 * Attaches an event listener to the window.
 *
 * @param event The event to listen for.
 * @param listener The event listener.
 * @param options The event listener options.
 * @template E The event type.
 * @returns A function to remove the event listener.
 *
 * @see https://0.vuetifyjs.com/composables/system/use-event-listener
 */
declare function useWindowEventListener<E extends keyof WindowEventMap>(event: MaybeRefOrGetter<MaybeArray<E>>, listener: MaybeRef<MaybeArray<(this: Window, event: WindowEventMap[E]) => void>>, options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>): CleanupFunction;
/**
 * Attaches an event listener to the document.
 *
 * @param event The event to listen for.
 * @param listener The event listener.
 * @param options The event listener options.
 * @template E The event type.
 * @returns A function to remove the event listener.
 *
 * @see https://0.vuetifyjs.com/composables/system/use-event-listener
 */
declare function useDocumentEventListener<E extends keyof DocumentEventMap>(event: MaybeRefOrGetter<MaybeArray<E>>, listener: MaybeRef<MaybeArray<(this: Document, event: DocumentEventMap[E]) => void>>, options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>): CleanupFunction;
//#endregion
//#region src/composables/useFeatures/index.d.ts
/**
 * Input type for feature tickets - what users provide to register().
 */
interface FeatureTicketInput extends GroupTicketInput {}
/**
 * Output type for feature tickets - what users receive from get().
 */
type FeatureTicket<Z extends FeatureTicketInput = FeatureTicketInput> = GroupTicket<Z>;
interface FeatureContext<Z extends FeatureTicketInput = FeatureTicketInput, E extends FeatureTicket<Z> = FeatureTicket<Z>> extends Omit<GroupContext<Z, E>, 'register'> {
  /**
   * Get the variation value of a feature, or a fallback if not set.
   *
   * @param id The feature ID.
   * @param fallback The fallback value if the feature has no variation.
   *
   * @example
   * ```ts
   * const features = useFeatures()
   * features.variation('search', 'v1') // 'v2' or the fallback
   * ```
   */
  variation: (id: ID, fallback?: unknown) => unknown;
  /**
   * Sync feature flags from an external source.
   *
   * @param flags The flags to sync, typically from an adapter.
   *
   * @remarks This updates existing flags and registers new ones.
   * Use this when adapter flags change to update the registry.
   *
   * @example
   * ```ts
   * features.sync({
   *   checkout: true,
   *   search: { $value: true, $variation: 'v2' },
   * })
   * ```
   */
  sync: (flags: FeaturesAdapterFlags) => void;
  /**
   * Register a feature (accepts input type, returns output type).
   *
   * @example
   * ```ts
   * features.register({ id: 'beta', value: false })
   * ```
   */
  register: (registration?: Partial<Z>) => E;
  /**
   * Bulk-register multiple features in a single batch.
   *
   * @example
   * ```ts
   * features.onboard([
   *   { id: 'beta', value: false },
   *   { id: 'search', value: { $value: true, $variation: 'v2' } },
   * ])
   * ```
   */
  onboard: (registrations: Partial<Z>[]) => E[];
  /**
   * Restore every registered flag to its registration default and clear all
   * recorded user intent (with `persist`, the stored overrides are cleared).
   *
   * @remarks Flags disabled after boot stay unselected until re-enabled —
   * selection ops are guarded on disabled tickets.
   *
   * @example
   * ```ts
   * const features = useFeatures()
   * features.toggle('beta')
   * features.reset() // 'beta' back to its registered default
   * ```
   */
  reset: () => void;
}
interface FeatureOptions extends RegistryOptions {
  /**
   * Static feature flags to register.
   */
  features?: Record<ID, boolean | TokenCollection>;
}
interface FeatureContextOptions extends FeatureOptions {
  namespace?: string;
}
interface FeaturePluginOptions extends FeatureContextOptions {
  /**
   * Feature flag adapter for external services.
   *
   * @remarks Adapters provide dynamic flag values from external services.
   */
  adapter?: MaybeArray<FeaturesAdapter>;
  /**
   * Persist the user's feature-flag overrides to storage and restore them on load.
   *
   * @remarks Persists a delta of user-toggled flags relative to each flag's
   * registration default, shaped `{ enabled: ID[], disabled: ID[] }` — flags
   * the user never touched are not stored and keep following code defaults.
   * Toggling a flag back to its registration default drops it from the delta.
   * The storage key is the plugin namespace with the `v0:` prefix stripped
   * (`features`).
   *
   * On load the delta is applied only to its listed ids; flags that register
   * later (adapter or runtime registrations) receive their saved override at
   * registration time. Entries whose flag is not registered are skipped and
   * pruned from the next persist write. Restored overrides win over an
   * adapter's first snapshot; later adapter updates still overlay live remote
   * state.
   *
   * User intent is recorded through the context's `select` / `unselect` /
   * `toggle` methods; ticket self-methods (`ticket.toggle()`) and the bulk
   * `selectAll` / `unselectAll` / `toggleAll` operations bypass intent
   * tracking — their changes are not persisted and revert to defaults on
   * reload. Toggles on disabled flags no-op and record nothing. `reset()`
   * restores registration defaults in-session and clears the stored delta.
   *
   * @default false
   */
  persist?: boolean;
}
/**
 * Creates a new features instance.
 *
 * @param options The options for the features instance.
 * @returns A new features instance.
 *
 * @see https://0.vuetifyjs.com/composables/plugins/use-features
 *
 * @example
 * ```ts
 * import { createFeatures } from '@vuetify/v0'
 *
 * const features = createFeatures({
 *   features: {
 *     'dark-mode': true,
 *     'theme-color': { $variation: 'blue' },
 *   },
 * })
 * ```
 */
declare function createFeatures(_options?: FeatureOptions): FeatureContext;
declare const createFeaturesContext: <_E extends FeatureContext<FeatureTicketInput, FeatureTicket<FeatureTicketInput>> = FeatureContext<FeatureTicketInput, FeatureTicket<FeatureTicketInput>>>(_options?: FeaturePluginOptions | undefined) => ContextTrinity<_E>, createFeaturesPlugin: (_options?: FeaturePluginOptions | undefined) => Plugin, useFeatures: <_E extends FeatureContext<FeatureTicketInput, FeatureTicket<FeatureTicketInput>> = FeatureContext<FeatureTicketInput, FeatureTicket<FeatureTicketInput>>>(namespace?: string) => _E;
//#endregion
//#region src/composables/useHotkey/index.d.ts
interface UseHotkeyOptions {
  /**
   * The keyboard event type to listen for.
   * @default 'keydown'
   */
  event?: MaybeRefOrGetter<'keydown' | 'keyup'>;
  /**
   * Whether to trigger the callback when an input element is focused.
   * @default false
   */
  inputs?: MaybeRefOrGetter<boolean>;
  /**
   * Whether to prevent the default browser action.
   * @default true
   */
  preventDefault?: MaybeRefOrGetter<boolean>;
  /**
   * Whether to stop event propagation.
   * @default false
   */
  stopPropagation?: MaybeRefOrGetter<boolean>;
  /**
   * Timeout in ms before a key sequence resets.
   * @default 1000
   */
  sequenceTimeout?: MaybeRefOrGetter<number>;
}
interface UseHotkeyReturn {
  /**
   * Whether the hotkey listener is currently active (listening for keys).
   * False when paused, when keys is undefined, or in SSR.
   */
  readonly isActive: Readonly<Ref<boolean>>;
  /**
   * Whether the hotkey listener is currently paused.
   */
  readonly isPaused: Readonly<Ref<boolean>>;
  /**
   * Pause listening (removes listener but keeps configuration).
   */
  pause: () => void;
  /**
   * Resume listening after pause.
   */
  resume: () => void;
  /**
   * Stop listening and clean up (removes listener).
   */
  stop: () => void;
}
/**
 * Platform context for testing platform-specific behavior.
 * @internal
 */
interface PlatformContext {
  isMac: boolean;
}
/**
 * A composable that listens for hotkey combinations and sequences.
 *
 * @param keys - The hotkey string (e.g., 'ctrl+k', 'g-h')
 * @param callback - The function to call when the hotkey is triggered
 * @param options - Configuration options
 * @returns An object with state refs and control methods
 *
 * @see https://0.vuetifyjs.com/composables/system/use-hotkey
 *
 * @example
 * ```ts
 * import { useHotkey } from '@vuetify/v0'
 *
 * // Simple combination
 * const { isActive, pause, resume } = useHotkey('ctrl+k', () => {
 *   console.log('Command palette opened')
 * })
 *
 * // Key sequence (GitHub-style)
 * useHotkey('g-h', () => console.log('Go home'))
 *
 * // With options
 * useHotkey('escape', closeModal, { inputs: true })
 *
 * // Pause/resume control
 * pause()  // Temporarily disable
 * resume() // Re-enable
 * ```
 */
declare function useHotkey(keys: MaybeRefOrGetter<string | undefined>, callback: (e: KeyboardEvent) => void, options?: UseHotkeyOptions, _platform?: PlatformContext): UseHotkeyReturn;
//#endregion
//#region src/composables/useHydration/index.d.ts
interface HydrationContext {
  /** True when root component has mounted (hydration complete) */
  isHydrated: Readonly<ShallowRef<boolean>>;
  /** True after first tick post-hydration (safe for animations after state restoration) */
  isSettled: Readonly<ShallowRef<boolean>>;
  /** Mark hydration as complete */
  hydrate: () => void;
  /** Mark as settled (called automatically after nextTick post-hydration) */
  settle: () => void;
}
interface HydrationOptions {}
interface HydrationContextOptions extends HydrationOptions {
  namespace?: string;
}
interface HydrationPluginOptions extends HydrationContextOptions {}
/**
 * Creates a new hydration instance.
 *
 * @returns A new hydration instance.
 *
 * @see https://0.vuetifyjs.com/composables/plugins/use-hydration
 *
 * @example
 * ```ts
 * import { createHydration } from '@vuetify/v0'
 *
 * const hydration = createHydration()
 * console.log(hydration.isHydrated.value) // false
 * hydration.hydrate()
 * console.log(hydration.isHydrated.value) // true
 * ```
 */
declare function createHydration<E extends HydrationContext = HydrationContext>(): E;
declare function createFallbackHydration<E extends HydrationContext = HydrationContext>(): E;
/**
 * Creates a new hydration context trinity.
 *
 * @param options Options for creating the hydration context.
 * @template E The type of the hydration context.
 * @returns A new hydration context trinity.
 *
 * @see https://0.vuetifyjs.com/composables/plugins/use-hydration
 *
 * @example
 * ```ts
 * import { createHydrationContext } from '@vuetify/v0'
 *
 * export const [useHydrationContext, provideHydrationContext, context] = createHydrationContext({
 *   namespace: 'app:hydration',
 * })
 * ```
 */
declare const createHydrationContext: <_E extends HydrationContext = HydrationContext>(_options?: HydrationContextOptions | undefined) => ContextTrinity<_E>, createHydrationPlugin: (_options?: HydrationContextOptions | undefined) => Plugin, useHydration: <_E extends HydrationContext = HydrationContext>(namespace?: string) => _E;
//#endregion
//#region src/composables/createObserver/index.d.ts
interface ObserverReturn {
  /**
   * Whether the observer is currently active (created and observing)
   */
  readonly isActive: Readonly<Ref<boolean>>;
  /**
   * Whether the observer is currently paused
   */
  readonly isPaused: Readonly<Ref<boolean>>;
  /**
   * Pause observation (disconnects observer but keeps it alive)
   */
  pause: () => void;
  /**
   * Resume observation
   */
  resume: () => void;
  /**
   * Stop observation and clean up (destroys observer)
   */
  stop: () => void;
}
//#endregion
//#region src/composables/useIntersectionObserver/index.d.ts
interface IntersectionObserverEntry {
  boundingClientRect: DOMRectReadOnly;
  intersectionRatio: number;
  intersectionRect: DOMRectReadOnly;
  isIntersecting: boolean;
  rootBounds: DOMRectReadOnly | null;
  target: Element;
  time: number;
}
interface IntersectionObserverOptions {
  immediate?: boolean;
  once?: boolean;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}
interface UseIntersectionObserverReturn extends ObserverReturn {
  /**
   * Whether the target element is currently intersecting with the viewport
   */
  readonly isIntersecting: Readonly<Ref<boolean>>;
}
/**
 * A composable that uses the Intersection Observer API to detect when an element
 * is visible in the viewport.
 *
 * @param target The element to observe.
 * @param callback The callback to execute when the element's intersection changes.
 * @param options The options for the Intersection Observer.
 * @returns An object with methods to control the observer.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
 * @see https://0.vuetifyjs.com/composables/system/use-intersection-observer
 *
 * @example
 * ```ts
 * import { ref } from 'vue'
 * import { useIntersectionObserver } from '@vuetify/v0'
 *
 * const target = ref<HTMLElement>()
 * const isVisible = ref(false)
 *
 * const { isIntersecting, pause, resume } = useIntersectionObserver(
 *   target,
 *   (entries) => {
 *     const entry = entries[0]
 *     if (entry) {
 *       isVisible.value = entry.isIntersecting
 *       console.log('Element is visible:', entry.isIntersecting)
 *     }
 *   },
 *   { threshold: 0.5 }
 * )
 *
 * // Pause observation
 * pause()
 *
 * // Resume observation
 * resume()
 * ```
 */
declare function useIntersectionObserver(target: MaybeElementRef, callback: (entries: IntersectionObserverEntry[]) => void, options?: IntersectionObserverOptions): UseIntersectionObserverReturn;
interface UseElementIntersectionReturn extends UseIntersectionObserverReturn {
  /**
   * The intersection ratio (0.0 to 1.0) indicating how much of the element is visible
   */
  readonly intersectionRatio: Readonly<Ref<number>>;
}
/**
 * A convenience composable that uses the Intersection Observer API to detect
 * when an element is visible in the viewport.
 *
 * @param target The element to observe.
 * @param options The options for the Intersection Observer.
 * @returns An object with the intersection state.
 *
 * @see https://0.vuetifyjs.com/composables/system/use-intersection-observer
 *
 * @example
 * ```ts
 * import { ref } from 'vue'
 * import { useElementIntersection } from '@vuetify/v0'
 *
 * const myElement = ref<HTMLElement>()
 * const { isIntersecting, intersectionRatio } = useElementIntersection(myElement, {
 *   threshold: 0.5
 * })
 *
 * // Use in template to conditionally render or animate
 * watchEffect(() => {
 *   if (isIntersecting.value) {
 *     console.log('Element is visible!', intersectionRatio.value)
 *   }
 * })
 * ```
 */
declare function useElementIntersection(target: MaybeElementRef, options?: IntersectionObserverOptions): UseElementIntersectionReturn;
//#endregion
//#region src/composables/useLazy/index.d.ts
interface LazyOptions {
  /**
   * When true, content renders immediately without waiting for activation.
   * @default false
   */
  eager?: MaybeRefOrGetter<boolean>;
  /**
   * Delay in milliseconds before activation. Prevents flash on quick
   * hover-throughs by requiring the active state to persist for this
   * duration before booting content.
   * @default 0
   */
  delay?: number;
}
interface LazyContext {
  /**
   * Whether the lazy content has been activated at least once.
   */
  readonly isBooted: Readonly<ShallowRef<boolean>>;
  /**
   * Whether content should be rendered.
   * True when: isBooted OR eager OR active
   */
  readonly hasContent: Readonly<Ref<boolean>>;
  /**
   * Reset booted state. Call on leave transition if not eager.
   */
  reset: () => void;
  /**
   * Transition callback for after-leave. Resets if not eager.
   */
  onAfterLeave: () => void;
}
/**
 * Deferred content rendering for performance optimization.
 *
 * @param active Reactive boolean controlling activation state
 * @param options Configuration options
 * @returns Lazy context with state refs and control functions
 *
 * @see https://0.vuetifyjs.com/composables/system/use-lazy
 *
 * @example
 * ```ts
 * import { ref } from 'vue'
 * import { useLazy } from '@vuetify/v0'
 *
 * const isOpen = ref(false)
 * const { hasContent, onAfterLeave } = useLazy(isOpen)
 *
 * // In template:
 * // <Transition @after-leave="onAfterLeave">
 * //   <div v-if="isOpen">
 * //     <template v-if="hasContent">
 * //       <!-- Heavy content here -->
 * //     </template>
 * //   </div>
 * // </Transition>
 * ```
 *
 * @example
 * Eager mode (render immediately):
 * ```ts
 * const { hasContent } = useLazy(isOpen, { eager: true })
 * // hasContent.value is always true
 * ```
 *
 * @example
 * With reactive eager prop:
 * ```ts
 * const props = defineProps<{ eager: boolean }>()
 * const { hasContent } = useLazy(isOpen, {
 *   eager: toRef(() => props.eager),
 * })
 * ```
 */
declare function useLazy(active: MaybeRefOrGetter<boolean>, options?: LazyOptions): LazyContext;
//#endregion
//#region src/composables/useLocale/index.d.ts
type LocaleRecord = TokenCollection;
/**
 * Input type for locale tickets - what users provide to register().
 */
interface LocaleTicketInput extends SingleTicketInput {
  messages?: LocaleRecord;
}
/**
 * Output type for locale tickets - what users receive from get().
 */
type LocaleTicket<Z extends LocaleTicketInput = LocaleTicketInput> = SingleTicket<Z>;
interface LocaleContext<Z extends LocaleTicketInput = LocaleTicketInput, E extends LocaleTicket<Z> = LocaleTicket<Z>> extends Omit<SingleContext<Z, E>, 'register'> {
  /**
   * Translate a message key with optional parameters.
   *
   * @param key - The message key to look up
   * @param params - Optional named params object, followed by positional params
   * @returns The translated and interpolated message
   *
   * @example
   * ```ts
   * // Simple key lookup
   * locale.t('hello') // Returns message for 'hello' or 'hello' if not found
   *
   * // With named parameters
   * locale.t('greeting', { name: 'World' }) // 'Hello {name}' → 'Hello World'
   *
   * // With positional parameters
   * locale.t('sum', 1, 2, 3) // 'Sum: {0} + {1} = {2}' → 'Sum: 1 + 2 = 3'
   * ```
   */
  t: (key: string, ...params: unknown[]) => string;
  /**
   * Translate a message key only if it exists, otherwise return `undefined`.
   *
   * Unlike {@link t}, `ti` ("translate if exists") never echoes the raw key on a
   * miss. This lets components supply their own inline English default with the
   * nullish-coalescing operator instead of relying on bundled fallback messages.
   *
   * @param key - The message key to look up
   * @param params - Optional named params object, followed by positional params
   * @returns The translated and interpolated message, or `undefined` if missing
   *
   * @example
   * ```ts
   * // Falls back to an inline default when the key is not translated
   * locale.ti('Pagination.next') ?? 'Next page'
   * ```
   */
  ti: (key: string, ...params: unknown[]) => string | undefined;
  n: (value: number) => string;
  /**
   * Register a locale with optional messages.
   *
   * When `messages` is provided, flattens them to dot-notation tokens
   * and onboards them into the token registry before registering the
   * locale for selection.
   *
   * @example
   * ```ts
   * const locale = createLocale({ messages: { en }, default: 'en' })
   *
   * // Lazy-load Dutch at runtime
   * const nl = await import('./locales/nl')
   * locale.register({ id: 'nl', messages: nl.default })
   * locale.select('nl')
   * ```
   */
  register: (registration?: Partial<Z>) => E;
}
interface LocaleOptions<Z extends LocaleRecord = LocaleRecord> extends SingleOptions {
  adapter?: LocaleAdapter;
  default?: ID;
  fallback?: ID;
  messages?: Record<ID, Z>;
}
interface LocaleContextOptions extends LocaleOptions {
  namespace?: string;
}
interface LocalePluginOptions extends LocaleContextOptions {
  persist?: boolean;
}
/**
 * Creates a new locale instance.
 *
 * @param options The options for the locale instance.
 * @returns A new locale instance.
 *
 * @see https://0.vuetifyjs.com/composables/plugins/use-locale
 */
declare function createLocale(_options?: LocaleOptions): LocaleContext;
declare function createLocaleFallback(): LocaleContext;
declare const createLocaleContext: <_E extends LocaleContext<LocaleTicketInput, LocaleTicket<LocaleTicketInput>> = LocaleContext<LocaleTicketInput, LocaleTicket<LocaleTicketInput>>>(_options?: LocalePluginOptions | undefined) => ContextTrinity<_E>, createLocalePlugin: (_options?: LocalePluginOptions | undefined) => Plugin, useLocale: <_E extends LocaleContext<LocaleTicketInput, LocaleTicket<LocaleTicketInput>> = LocaleContext<LocaleTicketInput, LocaleTicket<LocaleTicketInput>>>(namespace?: string) => _E;
//#endregion
//#region src/composables/useLogger/types.d.ts
type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'silent';
//#endregion
//#region src/composables/useLogger/index.d.ts
interface LoggerContext {
  debug: (message: string, ...args: unknown[]) => void;
  info: (message: string, ...args: unknown[]) => void;
  warn: (message: string, ...args: unknown[]) => void;
  error: (message: string, ...args: unknown[]) => void;
  trace: (message: string, ...args: unknown[]) => void;
  fatal: (message: string, ...args: unknown[]) => void;
  level: (level: LogLevel) => void;
  current: () => LogLevel;
  enabled: () => boolean;
  enable: () => void;
  disable: () => void;
}
interface LoggerOptions {
  adapter?: LoggerAdapter;
  level?: LogLevel;
  prefix?: string;
  enabled?: boolean;
}
interface LoggerContextOptions extends LoggerOptions {
  namespace?: string;
}
interface LoggerPluginOptions extends LoggerContextOptions {}
/**
 * Creates a new logger instance.
 *
 * @param options The options for the logger instance.
 * @returns A new logger instance.
 *
 * @see https://0.vuetifyjs.com/composables/plugins/use-logger
 *
 * @example
 * ```ts
 * import { createLogger } from '@vuetify/v0'
 *
 * const logger = createLogger({
 *   level: 'debug',
 *   prefix: '[MyApp]',
 * })
 *
 * logger.info('This is an info message')
 * logger.debug('This is a debug message')
 * logger.error('This is an error message')
 * logger.level('debug')
 * logger.debug('This debug message will now be logged')
 * ```
 */
declare function createLogger(options?: LoggerOptions): LoggerContext;
/**
 * Creates a new logger context.
 *
 * @param options The options for the logger context.
 * @template E The type of the logger context.
 * @returns A new logger context.
 *
 * @see https://0.vuetifyjs.com/composables/plugins/use-logger
 *
 * @example
 * ```ts
 * import { createLoggerContext } from '@vuetify/v0'
 *
 * export const [useAppLogger, provideAppLogger, appLogger] = createLoggerContext({
 *   namespace: 'app:logger',
 *   level: 'debug',
 * })
 * ```
 */
declare const createLoggerContext: <_E extends LoggerContext = LoggerContext>(_options?: LoggerContextOptions | undefined) => ContextTrinity<_E>, createLoggerPlugin: (_options?: LoggerContextOptions | undefined) => Plugin;
/**
 * Consumes the application logger provided by `createLoggerPlugin`.
 *
 * Call with no argument to use the configured logger as-is. Pass a scope key to get a
 * logger that prefixes every message with a `[scope]` segment after the plugin prefix —
 * useful for telling apart output from composables that share the app-level logger. A
 * scoped logger shares the underlying logger's level, enabled state, and adapter; only
 * the message prefix differs. A blank scope is treated as no scope.
 *
 * @param scope Optional per-caller scope key prefixed onto every message.
 * @returns The application logger, or a scoped wrapper around it.
 *
 * @see https://0.vuetifyjs.com/composables/plugins/use-logger
 *
 * @example
 * ```ts
 * import { useLogger } from '@vuetify/v0'
 *
 * const logger = useLogger('createKanban')
 *
 * logger.warn('drop rejected')
 * // → [v0 warn] [createKanban] drop rejected
 * ```
 */
declare function useLogger(scope?: string): LoggerContext;
//#endregion
//#region src/composables/useMediaQuery/index.d.ts
interface MediaQueryContext {
  /** Whether the media query currently matches */
  readonly matches: Readonly<ShallowRef<boolean>>;
  /** The current media query string */
  readonly query: Readonly<Ref<string>>;
  /** The underlying MediaQueryList (null on server) */
  readonly mediaQueryList: Readonly<ShallowRef<MediaQueryList | null>>;
  /** Stop listening and clean up */
  stop: () => void;
}
/**
 * Reactive media query matching.
 *
 * @param query CSS media query string (reactive).
 * @returns The media query context.
 *
 * @see https://0.vuetifyjs.com/composables/system/use-media-query
 *
 * @example
 * ```ts
 * // Static query
 * const { matches } = useMediaQuery('(prefers-color-scheme: dark)')
 *
 * // Dynamic query
 * const minWidth = ref(768)
 * const { matches } = useMediaQuery(() => `(min-width: ${minWidth.value}px)`)
 *
 * // Manual cleanup
 * const { matches, stop } = useMediaQuery('(hover: hover)')
 * stop() // Remove listener early
 * ```
 */
declare function useMediaQuery(query: MaybeRefOrGetter<string>): MediaQueryContext;
/**
 * Check if the user prefers dark color scheme.
 *
 * @returns The media query context.
 *
 * @example
 * ```ts
 * const { matches: prefersDark } = usePrefersDark()
 * ```
 */
declare function usePrefersDark(): MediaQueryContext;
/**
 * Check if the user prefers reduced motion.
 *
 * @returns The media query context.
 *
 * @example
 * ```ts
 * const { matches: prefersReducedMotion } = usePrefersReducedMotion()
 * ```
 */
declare function usePrefersReducedMotion(): MediaQueryContext;
/**
 * Check if the user prefers more contrast.
 *
 * @returns The media query context.
 *
 * @example
 * ```ts
 * const { matches: prefersContrast } = usePrefersContrast()
 * ```
 */
declare function usePrefersContrast(): MediaQueryContext;
//#endregion
//#region src/composables/useMutationObserver/index.d.ts
interface ObservableNodeList {
  readonly length: number;
  item: (index: number) => Node | null;
  forEach: (callback: (node: Node, index: number, list: ObservableNodeList) => void) => void;
  [Symbol.iterator]: () => Iterator<Node>;
}
interface MutationObserverRecord {
  type: 'attributes' | 'childList' | 'characterData';
  target: Node;
  addedNodes: ObservableNodeList;
  removedNodes: ObservableNodeList;
  previousSibling: Node | null;
  nextSibling: Node | null;
  attributeName: string | null;
  attributeNamespace: string | null;
  oldValue: string | null;
}
interface UseMutationObserverOptions {
  immediate?: boolean;
  once?: boolean;
  childList?: boolean;
  attributes?: boolean;
  characterData?: boolean;
  subtree?: boolean;
  attributeOldValue?: boolean;
  characterDataOldValue?: boolean;
  attributeFilter?: string[];
}
interface UseMutationObserverReturn extends ObserverReturn {}
/**
 * A composable that uses the Mutation Observer API to detect changes in the DOM.
 *
 * @param target The element to observe.
 * @param callback The callback to execute when a mutation is observed.
 * @param options The options for the Mutation Observer.
 * @returns An object with methods to control the observer.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
 * @see https://0.vuetifyjs.com/composables/system/use-mutation-observer
 *
 * @example
 * ```ts
 * import { ref } from 'vue'
 * import { useMutationObserver } from '@vuetify/v0'
 *
 * const container = ref<HTMLElement>()
 *
 * const { pause, resume, isPaused } = useMutationObserver(
 *   container,
 *   (mutations) => {
 *     mutations.forEach((mutation) => {
 *       if (mutation.type === 'childList') {
 *         console.log('Children changed:', mutation.addedNodes, mutation.removedNodes)
 *       } else if (mutation.type === 'attributes') {
 *         console.log('Attribute changed:', mutation.attributeName)
 *       }
 *     })
 *   },
 *   {
 *     childList: true,
 *     attributes: true,
 *     subtree: true
 *   }
 * )
 *
 * // Pause observation
 * pause()
 *
 * // Resume observation
 * resume()
 * ```
 */
declare function useMutationObserver(target: MaybeElementRef, callback: (entries: MutationObserverRecord[]) => void, options?: UseMutationObserverOptions): UseMutationObserverReturn;
//#endregion
//#region src/composables/useNotifications/adapters/adapter.d.ts
declare abstract class NotificationsAdapter<Z extends NotificationTicketInput = NotificationTicketInput, E extends NotificationTicket<Z> = NotificationTicket<Z>> {
  /** Called once when the plugin installs. Wire inbound/outbound sync here. */
  abstract setup(context: NotificationsAdapterContext<Z, E>): void;
  /** Called on app unmount. Tear down listeners and connections. */
  dispose?(): void;
}
//#endregion
//#region src/composables/useNotifications/index.d.ts
/** Notification urgency level. Maps to ARIA roles: `'error'`/`'warning'` → `role="alert"`, `'info'`/`'success'` → `role="status"`. Extensible — custom values like `'critical'` are allowed with autocomplete for defaults. */
type NotificationSeverity = Extensible<'info' | 'warning' | 'error' | 'success'>;
/** @deprecated Renamed to `NotificationTicketInput` (FooTicketInput/FooTicket pair rule); will be removed at 1.0.0 final. */
type NotificationInput = NotificationTicketInput;
/** Input shape for creating a notification via {@link send} or {@link register}. */
interface NotificationTicketInput extends RegistryTicketInput {
  /** Notification headline. */
  subject?: string;
  /** Extended message body. */
  body?: string;
  /** Urgency level for styling and ARIA role selection. */
  severity?: NotificationSeverity;
  /** Arbitrary payload for routing, filtering, or rendering. */
  data?: Record<string, unknown>;
  /** Auto-dismiss duration in ms. Overrides the global default. `undefined` uses the global timeout. */
  timeout?: number;
}
/**
 * Hydrated notification with lifecycle state and convenience methods.
 * Returned by {@link send}, {@link register}, and {@link onboard}.
 */
type NotificationTicket<Z extends NotificationTicketInput = NotificationTicketInput> = RegistryTicket & Z & {
  /** When the notification was created. */
  createdAt: Date;
  /** When the notification was marked as read, or `null` if unread. */
  readAt: Date | null;
  /** When the notification was seen in the viewport, or `null` if unseen. */
  seenAt: Date | null;
  /** When the notification was archived, or `null` if active. */
  archivedAt: Date | null;
  /** Snooze expiry, or `null` if not snoozed. */
  snoozedUntil: Date | null;
  /** Mark as read. Sets `readAt` to now. */
  read: () => void;
  /** Mark as unread. Clears `readAt`. */
  unread: () => void;
  /** Mark as seen. Sets `seenAt` to now. */
  seen: () => void;
  /** Archive. Sets `archivedAt` to now. */
  archive: () => void;
  /** Restore from archive. Clears `archivedAt`. */
  unarchive: () => void;
  /** Snooze until the given time. */
  snooze: (until: Date) => void;
  /** Cancel snooze. Clears `snoozedUntil`. */
  wake: () => void;
  /** Remove from the display queue only. Registry entry is preserved for inbox/history. Use `ticket.unregister()` for full removal. */
  dismiss: () => void;
};
/**
 * Context passed to adapter `setup()`. Provides methods for inbound
 * notification creation and event subscription for outbound sync.
 */
interface NotificationsAdapterContext<Z extends NotificationTicketInput = NotificationTicketInput, E extends NotificationTicket<Z> = NotificationTicket<Z>> {
  /** Create a notification and enqueue for toast display. Use for real-time inbound items. */
  send: (input: Z) => E;
  /** Create a notification in registry only (no toast). Use for initial/historical items. */
  register: (input: Z) => E;
  /** Subscribe to notification lifecycle events (e.g., `'notification:read'`). The handler receives the affected {@link NotificationTicket}. */
  on: (event: string, handler: (data: unknown) => void) => void;
  /** Unsubscribe from a lifecycle event. */
  off: (event: string, handler: (data: unknown) => void) => void;
}
/** Options for {@link createNotifications}. */
interface NotificationsOptions extends RegistryOptions {
  /** Default auto-dismiss timeout in ms for the toast queue. @default 3000 */
  timeout?: number;
}
/** Full notification context returned by {@link createNotifications} and {@link useNotifications}. */
interface NotificationsContext<Z extends NotificationTicketInput = NotificationTicketInput, E extends NotificationTicket<Z> = NotificationTicket<Z>> extends RegistryContext<E> {
  /** Create a notification and enqueue for toast display. */
  send: (input: Z) => E;
  /** The toast display queue. Access `queue.values()`, `queue.pause()`, `queue.resume()`. */
  queue: QueueContext;
  /** Mark as read. Emits `notification:read`. */
  read: (id: ID) => void;
  /** Mark as unread. Emits `notification:unread`. */
  unread: (id: ID) => void;
  /** Mark as seen. Emits `notification:seen`. */
  seen: (id: ID) => void;
  /** Archive. Emits `notification:archived`. */
  archive: (id: ID) => void;
  /** Restore from archive. Emits `notification:unarchived`. */
  unarchive: (id: ID) => void;
  /** Snooze until the given time. Emits `notification:snoozed`. */
  snooze: (id: ID, until: Date) => void;
  /** Cancel snooze. Emits `notification:unsnoozed`. */
  wake: (id: ID) => void;
  /** Mark all unread notifications as read. */
  readAll: () => void;
  /** Archive all unarchived notifications. */
  archiveAll: () => void;
}
declare function createNotifications(_options?: NotificationsOptions): NotificationsContext;
interface NotificationsPluginOptions extends NotificationsOptions {
  namespace?: string;
  adapter?: NotificationsAdapter;
  /**
   * Persist notification interaction state to storage and restore it on load.
   *
   * @remarks Stores only interaction state — a map of notification id to its
   * `readAt` / `seenAt` / `archivedAt` / `snoozedUntil` timestamps (ISO
   * strings, non-null fields only). Notification content is never stored:
   * notifications are always created by code or an adapter, and the saved
   * state merges onto them as they register — at restore time or any time
   * later. Expired snoozes are dropped on restore, and entries whose
   * notification never re-registers are pruned from the next persist write.
   * The storage key is the plugin namespace with the `v0:` prefix stripped
   * (`notifications`).
   *
   * Requires stable notification `id`s to associate state across reloads.
   *
   * @default false
   */
  persist?: boolean;
}
/**
 * Notification management with registry, event system, and optional adapters.
 *
 * @see https://0.vuetifyjs.com/composables/plugins/use-notifications
 *
 * @example
 * ```ts
 * import { createNotificationsPlugin, useNotifications } from '@vuetify/v0'
 *
 * // Install as plugin
 * app.use(createNotificationsPlugin())
 *
 * // Use in components
 * const notifications = useNotifications()
 * notifications.send({ subject: 'Saved', severity: 'success' })
 * ```
 */
declare const createNotificationsContext: <_E extends NotificationsContext<NotificationTicketInput, NotificationTicket<NotificationTicketInput>> = NotificationsContext<NotificationTicketInput, NotificationTicket<NotificationTicketInput>>>(_options?: NotificationsPluginOptions | undefined) => ContextTrinity<_E>, createNotificationsPlugin: (_options?: NotificationsPluginOptions | undefined) => Plugin, useNotifications: <_E extends NotificationsContext<NotificationTicketInput, NotificationTicket<NotificationTicketInput>> = NotificationsContext<NotificationTicketInput, NotificationTicket<NotificationTicketInput>>>(namespace?: string) => _E;
//#endregion
//#region src/composables/usePermissions/adapters/adapter.d.ts
declare abstract class PermissionsAdapter {
  abstract can<Z extends PermissionTicket = PermissionTicket>(role: ID, action: string, subject: string, context: Record<string, unknown>, permissions: PermissionContext<Z>): boolean;
}
//#endregion
//#region src/composables/usePermissions/adapters/v0.d.ts
declare class V0PermissionsAdapter extends PermissionsAdapter {
  constructor();
  can<Z extends PermissionTicket = PermissionTicket>(role: ID, action: string, subject: string, context: Record<string, unknown>, permissions: PermissionContext<Z>): boolean;
}
//#endregion
//#region src/composables/usePermissions/index.d.ts
interface PermissionTicket extends TokenTicket<boolean | ((context: Record<string, unknown>) => boolean)> {}
interface PermissionContext<Z extends PermissionTicket = PermissionTicket> extends TokenContext<Z> {
  can: (id: ID, action: string, subject: string, context?: Record<string, unknown>) => boolean;
}
interface PermissionOptions extends TokenOptions {
  adapter?: PermissionsAdapter;
  permissions?: Record<ID, [string | string[], string | string[], (boolean | ((context: Record<string, unknown>) => boolean))?][]>;
}
interface PermissionContextOptions extends PermissionOptions {
  namespace?: string;
}
interface PermissionPluginOptions extends PermissionContextOptions {}
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
declare function createPermissions(_options?: PermissionOptions): PermissionContext;
declare const createPermissionsContext: <_E extends PermissionContext<PermissionTicket> = PermissionContext<PermissionTicket>>(_options?: PermissionContextOptions | undefined) => ContextTrinity<_E>, createPermissionsPlugin: (_options?: PermissionContextOptions | undefined) => Plugin, usePermissions: <_E extends PermissionContext<PermissionTicket> = PermissionContext<PermissionTicket>>(namespace?: string) => _E;
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
//#region src/composables/usePresence/index.d.ts
type PresenceState = 'unmounted' | 'mounted' | 'present' | 'leaving';
interface UsePresenceOptions {
  /** Drive visibility. */
  present: MaybeRefOrGetter<boolean>;
  /** Delay first mount until present is first true. @default false */
  lazy?: boolean;
  /** Auto-resolve LEAVING state next tick if done() not called. @default true */
  immediate?: boolean;
}
interface UsePresenceReturn {
  /** Current lifecycle state. */
  readonly state: Readonly<ShallowRef<PresenceState>>;
  /** Should the element be in the DOM? */
  readonly isMounted: Readonly<Ref<boolean>>;
  /** Is it logically present? */
  readonly isPresent: Readonly<Ref<boolean>>;
  /** Is an exit in progress? */
  readonly isLeaving: Readonly<Ref<boolean>>;
  /** Call when exit animation finishes. */
  done: () => void;
}
/**
 * Animation-agnostic mount lifecycle management.
 *
 * @param options Configuration for presence behavior
 * @returns Reactive state refs and a `done` callback for exit animation control
 *
 * @see https://0.vuetifyjs.com/composables/system/use-presence
 *
 * @example
 * Basic usage:
 * ```ts
 * import { ref } from 'vue'
 * import { usePresence } from '@vuetify/v0'
 *
 * const isOpen = ref(false)
 * const { isMounted, state, done } = usePresence({ present: isOpen })
 *
 * // In template:
 * // <div v-if="isMounted" :data-state="state" @animationend="done">
 * //   Content
 * // </div>
 * ```
 *
 * @example
 * Lazy mount (defer until first activation):
 * ```ts
 * const { isMounted } = usePresence({ present: isOpen, lazy: true })
 * // isMounted stays false until isOpen is first true
 * ```
 *
 * @example
 * Manual exit control (for JS-driven animations):
 * ```ts
 * const { isLeaving, done } = usePresence({
 *   present: isOpen,
 *   immediate: false,
 * })
 * // Stays in 'leaving' state until done() is called
 * ```
 */
declare function usePresence(options: UsePresenceOptions): UsePresenceReturn;
//#endregion
//#region src/composables/useProxyModel/index.d.ts
interface ProxyModelOptions {
  multiple?: MaybeRefOrGetter<boolean>;
  transformIn?: (val: unknown) => unknown;
  transformOut?: (val: unknown) => unknown;
}
/**
 * Minimal interface for useProxyModel's context parameter.
 * Both ModelContext (Set-based) and SliderContext (Array-based) satisfy this.
 */
interface ProxyModelTarget {
  selectedValues: {
    readonly value: Iterable<unknown>;
  };
  apply: (values: unknown[], options?: {
    multiple?: boolean;
  }) => void;
  select?: (id: string | number) => void;
  browse?: (value: never) => readonly ID[] | undefined;
  multiple?: MaybeRefOrGetter<boolean>;
  on?: (event: string, cb: (data: unknown) => void) => void;
  off?: (event: string, cb: (data: unknown) => void) => void;
}
/**
 * Syncs a ref with a model context bidirectionally.
 *
 * @param context The model context to bind to.
 * @param model The ref to sync.
 * @param options The options for the proxy model.
 * @returns A function to stop the sync.
 *
 * @see https://0.vuetifyjs.com/composables/reactivity/use-proxy-model
 *
 * @example
 * ```ts
 * import { createSelection, useProxyModel } from '@vuetify/v0'
 *
 * const model = ref()
 * const registry = createSelection({ events: true })
 * registry.onboard([
 *   { id: 'item-1', value: 'Item 1' },
 *   { id: 'item-2', value: 'Item 2' },
 * ])
 *
 * const stop = useProxyModel(registry, model)
 * ```
 */
declare function useProxyModel(context: ProxyModelTarget, model: Ref<unknown>, options?: ProxyModelOptions): () => void;
//#endregion
//#region src/composables/useProxyRegistry/index.d.ts
interface ProxyRegistryOptions {
  deep?: boolean;
}
interface ProxyRegistryContext<Z extends RegistryTicket = RegistryTicket> {
  keys: readonly ID[];
  values: readonly Z[];
  entries: readonly [ID, Z][];
  size: number;
}
/**
 * Creates a proxy registry that provides reactive objects for registry data.
 *
 * @param registry The registry instance to proxy.
 * @param options The options for the proxy registry.
 * @template Z The input ticket type (what users provide to register).
 * @template E The output ticket type (what users receive from get/values).
 * @returns A proxy registry with reactive objects.
 *
 * @see https://0.vuetifyjs.com/composables/reactivity/use-proxy-registry
 *
 * @example
 * ```ts
 * import { createRegistry, useProxyRegistry } from '@vuetify/v0'
 *
 * const registry = createRegistry({ events: true })
 * const proxy = useProxyRegistry(registry)
 *
 * registry.register({ value: 'Item 1' })
 * console.log(proxy.size) // 1
 * ```
 */
declare function useProxyRegistry<Z extends RegistryTicketInput = RegistryTicketInput, E extends RegistryTicket & Z = RegistryTicket & Z>(registry: RegistryContext<Z, E>, options?: ProxyRegistryOptions): ProxyRegistryContext<E>;
//#endregion
//#region src/composables/useRaf/index.d.ts
interface UseRafReturn {
  /** Request animation frame (cancels pending) */
  (): void;
  /** Cancel pending animation frame */
  cancel: () => void;
  /** Whether an animation frame is pending */
  readonly isActive: Readonly<Ref<boolean>>;
}
/**
 * Scope-disposed safe requestAnimationFrame.
 *
 * @param callback Function to call on animation frame.
 * @returns Callable that requests frame (canceling pending), with cancel method.
 *
 * @see https://0.vuetifyjs.com/composables/system/use-raf
 *
 * @example
 * ```ts
 * // Basic usage
 * const update = useRaf((timestamp) => {
 *   // Runs on next animation frame
 * })
 *
 * update() // Request frame
 * update() // Cancels previous, requests new (deduplicated)
 *
 * // Manual cancel
 * update.cancel()
 *
 * // Check if pending
 * if (update.isActive.value) { ... }
 * ```
 */
declare function useRaf(callback: (timestamp: DOMHighResTimeStamp) => void): UseRafReturn;
//#endregion
//#region src/composables/useReducedMotion/adapters/adapter.d.ts
interface ReducedMotionAdapterSetupContext {
  selectedMode: Readonly<ShallowRef<ReducedMotionMode>>;
  isReduced: Readonly<Ref<boolean>>;
}
declare abstract class ReducedMotionAdapter {
  /**
   * Teardown for any side-effects started in `setup`. The plugin registers this on
   * `app.onUnmount`, so adapter effects are cleaned up even though `setup` runs
   * outside an effect scope (where `onScopeDispose` would silently no-op). It is
   * read lazily at app unmount, so adapters may assign it at any point during or
   * after `setup`.
   */
  dispose?: () => void;
  abstract setup<T extends ReducedMotionAdapterSetupContext>(app: App, context: T): void;
}
//#endregion
//#region src/composables/useReducedMotion/adapters/v0.d.ts
/**
 * Default reduced-motion adapter. In the browser it writes
 * `document.body.dataset.reducedMotion`; on the server it renders the same
 * attribute through `@unhead` so the value is present in the initial HTML.
 */
declare class V0ReducedMotionAdapter extends ReducedMotionAdapter {
  setup<T extends ReducedMotionAdapterSetupContext>(app: App, context: T): void;
}
//#endregion
//#region src/composables/useReducedMotion/index.d.ts
type ReducedMotionMode = 'system' | 'always' | 'never';
interface ReducedMotionContext {
  /** The active mode. `'system'` defers to the OS media query. Change it with `select`. */
  readonly selectedMode: Readonly<ShallowRef<ReducedMotionMode>>;
  /** `true` when motion should be minimized, considering the active `selectedMode`. */
  readonly isReduced: Readonly<Ref<boolean>>;
  /**
   * Set the active mode.
   *
   * @example
   * ```ts
   * motion.select('always')
   * ```
   */
  select: (mode: ReducedMotionMode) => void;
  /**
   * Stop the OS media-query subscription. Affects every consumer of this context;
   * `isReduced` keeps honoring explicit `always`/`never` modes but stops tracking
   * the OS in `system` mode.
   *
   * @example
   * ```ts
   * motion.dispose()
   * ```
   */
  dispose: () => void;
}
interface ReducedMotionOptions {
  /**
   * Initial mode.
   * - `'system'` (default) — follow `prefers-reduced-motion`
   * - `'always'` — always reduce, overrides OS setting
   * - `'never'` — never reduce, overrides OS setting
   */
  mode?: ReducedMotionMode;
  /** Adapter for framework-specific side-effects. Defaults to `V0ReducedMotionAdapter`. */
  adapter?: ReducedMotionAdapter;
}
interface ReducedMotionContextOptions extends ReducedMotionOptions {
  namespace?: string;
}
interface ReducedMotionPluginOptions extends ReducedMotionContextOptions {
  persist?: boolean;
}
/**
 * Creates a standalone reduced-motion context.
 *
 * @param options Initial options.
 * @returns A `ReducedMotionContext`.
 *
 * @see https://0.vuetifyjs.com/composables/plugins/use-reduced-motion
 *
 * @example
 * ```ts
 * import { createReducedMotion } from '@vuetify/v0'
 *
 * const motion = createReducedMotion({ mode: 'system' })
 *
 * console.log(motion.isReduced.value) // true | false
 * motion.select('always')
 * ```
 */
declare function createReducedMotion(options?: ReducedMotionOptions): ReducedMotionContext;
declare const createReducedMotionContext: <_E extends ReducedMotionContext = ReducedMotionContext>(_options?: ReducedMotionPluginOptions | undefined) => ContextTrinity<_E>, createReducedMotionPlugin: (_options?: ReducedMotionPluginOptions | undefined) => Plugin, useReducedMotion: <_E extends ReducedMotionContext = ReducedMotionContext>(namespace?: string) => _E;
//#endregion
//#region src/composables/useResizeObserver/index.d.ts
/**
 * A reported size change for an observed element.
 *
 * `contentRect` always describes the content box, regardless of the `box`
 * option. Read `borderBoxSize` when padding and borders should be included —
 * both arrays are populated on every entry, so `box` selects which box model
 * triggers a callback, not which measurements are available.
 *
 * @example
 * ```ts
 * useResizeObserver(el, ([entry]) => {
 *   entry.contentRect.height        // content box, excludes padding + border
 *   entry.contentBoxSize[0].blockSize   // same value, writing-mode relative
 *   entry.borderBoxSize[0].blockSize    // includes padding + border
 * }, { box: 'border-box' })
 * ```
 */
interface ResizeObserverEntry {
  contentRect: {
    width: number;
    height: number;
    top: number;
    left: number;
  };
  /**
   * The element's border box — content plus padding plus border — in
   * writing-mode-relative `inlineSize` / `blockSize` terms.
   *
   * Unlike `getBoundingClientRect()`, this is a layout measurement and is not
   * scaled by CSS transforms. The array mirrors the native API: one entry per
   * box fragment, so single-fragment elements report `borderBoxSize[0]`.
   */
  borderBoxSize: readonly ResizeObserverSize[];
  /**
   * The element's content box — excluding padding and border — in
   * writing-mode-relative `inlineSize` / `blockSize` terms.
   *
   * Carries the same measurement as `contentRect`, expressed on the logical
   * axes. The array mirrors the native API: one entry per box fragment.
   */
  contentBoxSize: readonly ResizeObserverSize[];
  target: Element;
}
interface ResizeObserverOptions {
  immediate?: boolean;
  once?: boolean;
  box?: 'content-box' | 'border-box';
}
interface UseResizeObserverReturn extends ObserverReturn {}
/**
 * A composable that uses the Resize Observer API to detect when an element's
 * size changes.
 *
 * @param target The element to observe.
 * @param callback The callback to execute when the element's size changes.
 * @param options The options for the Resize Observer.
 * @returns An object with methods to control the observer.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
 * @see https://0.vuetifyjs.com/composables/system/use-resize-observer
 *
 * @example
 * ```ts
 * import { ref } from 'vue'
 * import { useResizeObserver } from '@vuetify/v0'
 *
 * const el = ref<HTMLElement>()
 * const width = ref(0)
 * const height = ref(0)
 *
 * const { pause, resume, isPaused } = useResizeObserver(
 *   el,
 *   (entries) => {
 *     const entry = entries[0]
 *     if (entry) {
 *       width.value = entry.contentRect.width
 *       height.value = entry.contentRect.height
 *       console.log('Size changed:', width.value, 'x', height.value)
 *     }
 *   },
 *   { immediate: true }
 * )
 *
 * // Pause observation
 * pause()
 *
 * // Resume observation
 * resume()
 * ```
 *
 * @example
 * Measuring the border box — padding and borders included:
 *
 * ```ts
 * useResizeObserver(el, ([entry]) => {
 *   height.value = entry.borderBoxSize[0].blockSize
 * }, { box: 'border-box' })
 * ```
 */
declare function useResizeObserver(target: MaybeElementRef, callback: (entries: ResizeObserverEntry[]) => void, options?: ResizeObserverOptions): UseResizeObserverReturn;
interface UseElementSizeReturn extends UseResizeObserverReturn {
  /**
   * The width of the element in pixels
   */
  readonly width: Readonly<Ref<number>>;
  /**
   * The height of the element in pixels
   */
  readonly height: Readonly<Ref<number>>;
}
/**
 * A convenience composable that uses the Resize Observer API to track an
 * element's size.
 *
 * @param target The element to observe.
 * @returns An object with the element's width and height.
 *
 * @see https://0.vuetifyjs.com/composables/system/use-resize-observer
 *
 * @example
 * ```ts
 * import { ref, watchEffect } from 'vue'
 * import { useElementSize } from '@vuetify/v0'
 *
 * const box = ref<HTMLElement>()
 * const { width, height } = useElementSize(box)
 *
 * // Width and height are reactive refs
 * watchEffect(() => {
 *   console.log('Box size:', width.value, 'x', height.value)
 * })
 * ```
 */
declare function useElementSize(target: MaybeElementRef): UseElementSizeReturn;
//#endregion
//#region src/composables/useRovingFocus/index.d.ts
interface RovingItem extends TraversalItem {
  el?: MaybeRefOrGetter<Element | null | undefined>;
}
interface RovingFocusOptions {
  target?: MaybeRefOrGetter<HTMLElement | null | undefined>;
  /** Arrow key mapping. Ignored when `columns` is set (grid uses all 4 arrows). */
  orientation?: 'horizontal' | 'vertical' | 'both';
  circular?: boolean;
  /**
   * Column count for grid navigation. When set, items are treated as a 2D grid
   * in row-major order: Left/Right step ±1, Up/Down step ±columns,
   * Home/End go to row start/end, Ctrl+Home/End go to first/last overall.
   */
  columns?: MaybeRefOrGetter<number>;
  onFocus?: (id: ID) => void;
}
interface RovingFocusReturn {
  focusedId: ShallowRef<ID | undefined>;
  isTabbable: (id: ID) => boolean;
  focus: (id: ID) => void;
  next: () => void;
  prev: () => void;
  first: () => void;
  last: () => void;
  onKeydown: (e: KeyboardEvent) => void;
}
declare function useRovingFocus(items: () => RovingItem[], options?: RovingFocusOptions): RovingFocusReturn;
//#endregion
//#region src/composables/useRtl/adapters/adapter.d.ts
interface RtlAdapterSetupContext {
  isRtl: Ref<boolean>;
  toggle: () => void;
}
declare abstract class RtlAdapter {
  /**
   * Teardown registered by `setup`. Called once via `app.onUnmount` on the
   * plugin path and available as a reachable handle on standalone paths.
   */
  dispose?: () => void;
  abstract setup<T extends RtlAdapterSetupContext>(app: App, context: T, target?: string | HTMLElement | null): void;
}
//#endregion
//#region src/composables/useRtl/adapters/v0.d.ts
declare class V0RtlAdapter extends RtlAdapter {
  setup<T extends RtlAdapterSetupContext>(app: App, context: T, target?: string | HTMLElement | null): void;
}
//#endregion
//#region src/composables/useRtl/index.d.ts
interface RtlContext {
  /** Writable ref — true = RTL, false = LTR */
  isRtl: Ref<boolean>;
  /** Convenience method to flip direction */
  toggle: () => void;
  /**
   * Release adapter resources (watch teardown, unhead entry).
   * Called automatically on `app.unmount` when using the plugin path.
   * Call manually when using a standalone context (`createRtlContext`).
   */
  dispose: () => void;
}
interface RtlOptions {
  /** Initial direction. Defaults to false (LTR). */
  default?: boolean;
  /** Adapter for framework-specific side-effects. */
  adapter?: RtlAdapter;
  /** Target element or selector for dir attribute. Defaults to documentElement. */
  target?: string | HTMLElement | null;
}
interface RtlContextOptions extends RtlOptions {
  namespace?: string;
}
interface RtlPluginOptions extends RtlContextOptions {
  persist?: boolean;
}
/**
 * Creates a new RTL direction instance.
 *
 * @param options The options for the RTL instance.
 * @returns A new RTL context with reactive direction state.
 *
 * @see https://0.vuetifyjs.com/composables/plugins/use-rtl
 */
declare function createRtl(options?: RtlOptions): RtlContext;
declare function createRtlFallback(): RtlContext;
declare const createRtlContext: <_E extends RtlContext = RtlContext>(_options?: RtlPluginOptions | undefined) => ContextTrinity<_E>, createRtlPlugin: (_options?: RtlPluginOptions | undefined) => Plugin, useRtl: <_E extends RtlContext = RtlContext>(namespace?: string) => _E;
//#endregion
//#region src/composables/useStack/index.d.ts
/**
 * Input type for stack tickets - what users provide to register().
 */
interface StackTicketInput extends SelectionTicketInput {
  /**
   * Callback invoked when the overlay should be dismissed
   *
   * @remarks Called by `ticket.dismiss()` or when scrim is clicked.
   * Typically sets isActive to false.
   */
  onDismiss?: () => void;
  /**
   * Whether this overlay blocks scrim dismissal
   *
   * @default false
   * @remarks When true, clicking the scrim will not dismiss this overlay.
   * Use for critical dialogs requiring explicit user action.
   */
  blocking?: MaybeRefOrGetter<boolean>;
  /**
   * Whether this overlay should be backed by a scrim/backdrop
   *
   * @default true
   * @remarks When false, the overlay still participates in z-index stacking
   * but `Scrim` skips rendering a backdrop for it. Use for non-modal overlays
   * (snackbars, toasts, tooltips) that need layering without dimming.
   */
  scrim?: MaybeRefOrGetter<boolean>;
  /**
   * The overlay's DOM element.
   *
   * @remarks When set, the stack can expose this element as a top-layer teleport
   * target via {@link StackContext.topElement}. Native modal dialogs pass their
   * `<dialog>` element so non-modal overlays (snackbars) can teleport into them.
   *
   * @example
   * ```ts
   * stack.register({ el: () => dialogRef.value?.element })
   * ```
   */
  el?: MaybeRefOrGetter<Element | null | undefined>;
}
/**
 * Output type for stack tickets - what users receive from register().
 */
type StackTicket<Z extends StackTicketInput = StackTicketInput> = SelectionTicket<Z> & {
  /**
   * Callback invoked when the overlay should be dismissed
   */
  onDismiss?: () => void;
  /**
   * Whether this overlay blocks scrim dismissal
   */
  blocking: Readonly<Ref<boolean>>;
  /**
   * Whether this overlay is backed by a scrim/backdrop
   */
  scrim: Readonly<Ref<boolean>>;
  /** The overlay's DOM element, if provided at registration. */
  el?: MaybeRefOrGetter<Element | null | undefined>;
  /**
   * The calculated z-index for this overlay
   *
   * @remarks Automatically calculated based on selection order.
   * First selected overlay gets baseZIndex, each subsequent adds increment.
   */
  zIndex: ComputedRef<number>;
  /**
   * Whether this overlay is the topmost in the global stack
   *
   * @remarks Useful for determining which overlay should handle
   * global keyboard events (e.g., Escape key).
   */
  globalTop: ComputedRef<boolean>;
  /**
   * Dismiss this overlay
   *
   * @remarks If blocking is false, calls onDismiss callback and unselects.
   * If blocking is true, does nothing.
   */
  dismiss: () => void;
};
/**
 * Context returned by createStack.
 */
interface StackContext<Z extends StackTicketInput = StackTicketInput, E extends StackTicket<Z> = StackTicket<Z>> extends Omit<SelectionContext<Z, E>, 'register'> {
  /**
   * Whether any overlays are selected (active)
   *
   * @remarks Reactive boolean for conditional scrim rendering.
   */
  isActive: Readonly<Ref<boolean>>;
  /**
   * The topmost selected overlay ticket
   *
   * @remarks Access to the current top overlay for inspection.
   */
  top: Readonly<Ref<E | undefined>>;
  /**
   * Z-index for the scrim (one below top overlay)
   *
   * @remarks Position scrim behind the topmost overlay but above all others.
   */
  scrimZIndex: Readonly<Ref<number>>;
  /**
   * Whether the topmost overlay blocks scrim clicks
   *
   * @remarks When true, the topmost overlay has `blocking: true`
   * and scrim clicks should be ignored.
   */
  isBlocking: Readonly<Ref<boolean>>;
  /**
   * App-wide default teleport target, as set via `createStackPlugin({ default: … })`.
   * Portal reads this when no per-component `to` prop is given.
   */
  default: Readonly<Ref<Extensible<'top-layer'> | HTMLElement | undefined>>;
  /**
   * Element of the topmost selected modal overlay that has a resolvable DOM
   * element (a top-layer `<dialog>`), or `null`.
   *
   * @remarks Overlays that must appear above a modal (snackbars, tooltips)
   * teleport into this element so they share its top-layer context and remain
   * interactive. Non-modal (`scrim: false`) tickets are never returned, so a
   * non-modal overlay never resolves to itself.
   *
   * **One-tick window.** When a modal mounts already-open (`modelValue=true`),
   * the ticket's `select()` fires synchronously in the `immediate: true` watch
   * before the content ref resolves, so `topElement` is `null` for one tick.
   * Consumers that read `topElement` reactively (e.g. `Portal` resolving its
   * teleport target) see the correct element on the next tick after the
   * modal's DOM node mounts.
   *
   * @example
   * ```ts
   * const to = toRef(() => stack.topElement.value ?? 'body')
   * ```
   */
  topElement: Readonly<Ref<Element | null>>;
  /**
   * Register an overlay ticket
   *
   * @param input Partial ticket data
   * @returns Stack ticket with z-index and top tracking
   *
   * @remarks When called within component setup, the ticket is automatically
   * unregistered when the component unmounts.
   */
  register: (input?: Partial<Z>) => E;
}
interface StackOptions extends SelectionOptions {
  /**
   * Base z-index when stack is empty
   *
   * @default 2000
   * @remarks First overlay receives this z-index.
   */
  baseZIndex?: number;
  /**
   * Z-index increment between overlays
   *
   * @default 10
   * @remarks Gap between overlay z-indexes allows room for
   * overlay-internal elements (dropdowns, tooltips within dialogs).
   */
  increment?: number;
  /**
   * App-wide default teleport target for all Portals.
   *
   * @remarks When set, every Portal that has no explicit `to` prop inherits
   * this target. A per-component `to` prop always takes precedence.
   * `'top-layer'` resolves to the topmost open modal element (a `<dialog>`),
   * falling back to `'body'` when no modal is active.
   *
   * @example
   * ```ts
   * app.use(createStackPlugin({ default: 'top-layer' }))
   * ```
   */
  default?: Extensible<'top-layer'> | HTMLElement;
}
interface StackContextOptions extends StackOptions {
  namespace?: string;
}
interface StackPluginOptions extends StackContextOptions {}
/**
 * Creates a new stack instance for managing overlay z-indexes.
 *
 * @param options Configuration options
 * @returns Stack context with registry methods and scrim helpers
 *
 * @see https://0.vuetifyjs.com/composables/plugins/use-stack
 *
 * @example
 * ```ts
 * import { createStack } from '@vuetify/v0'
 *
 * const stack = createStack({ baseZIndex: 1000 })
 *
 * const ticket = stack.register({
 *   onDismiss: () => console.log('dismissed'),
 *   blocking: false,
 * })
 *
 * ticket.select()  // Activate overlay
 * console.log(ticket.zIndex.value)  // 1000
 *
 * ticket.unselect()  // Deactivate overlay
 * ```
 */
declare function createStack(_options?: StackOptions): StackContext;
/**
 * Creates a stack context trinity for provide/inject usage.
 *
 * @param options Configuration options including namespace
 * @returns Trinity of [useStackContext, provideStackContext, context]
 *
 * @see https://0.vuetifyjs.com/composables/plugins/use-stack
 *
 * @example
 * ```ts
 * import { createStackContext } from '@vuetify/v0'
 *
 * const [useMyStack, provideMyStack, myStack] = createStackContext({
 *   namespace: 'my:stack',
 *   baseZIndex: 3000,
 * })
 *
 * // In parent component:
 * provideMyStack()
 *
 * // In child component:
 * const stack = useMyStack()
 * ```
 */
declare function createStackContext(_options?: StackContextOptions): ContextTrinity<StackContext>;
/**
 * Creates a Vue plugin to provide stack context at app level.
 *
 * @param options Configuration options
 * @returns Vue plugin instance
 *
 * @see https://0.vuetifyjs.com/composables/plugins/use-stack
 *
 * @example
 * ```ts
 * import { createApp } from 'vue'
 * import { createStackPlugin } from '@vuetify/v0'
 *
 * const app = createApp(App)
 * app.use(createStackPlugin({ baseZIndex: 2000 }))
 * app.mount('#app')
 * ```
 */
declare function createStackPlugin(_options?: StackPluginOptions): Plugin;
/**
 * Returns the current stack context.
 *
 * @param namespace The namespace for the stack context. Defaults to 'v0:stack'.
 * @returns The stack context instance
 *
 * @remarks Falls back to an internal shared instance if no provider exists.
 * For SSR safety, use createStackPlugin to provide isolated context per app.
 *
 * Tickets registered within component setup are automatically unregistered
 * when the component is unmounted.
 *
 * @see https://0.vuetifyjs.com/composables/plugins/use-stack
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 *   import { shallowRef, watch } from 'vue'
 *   import { useStack } from '@vuetify/v0'
 *
 *   const stack = useStack()
 *   const isOpen = shallowRef(false)
 *
 *   // Ticket is auto-cleaned up when component unmounts
 *   const ticket = stack.register({
 *     onDismiss: () => { isOpen.value = false },
 *   })
 *
 *   // Sync selection state with isOpen
 *   watch(isOpen, v => v ? ticket.select() : ticket.unselect())
 * </script>
 *
 * <template>
 *   <button @click="isOpen = true">Open</button>
 *   <div v-if="isOpen" :style="{ zIndex: ticket.zIndex.value }">
 *     <p>Dialog content</p>
 *     <button @click="ticket.dismiss()">Close</button>
 *   </div>
 * </template>
 * ```
 */
declare function useStack(namespace?: string): StackContext;
//#endregion
//#region src/composables/useStorage/index.d.ts
interface StorageContext {
  /** Check if a key exists in storage */
  has: (key: string) => boolean;
  /** Get a reactive ref for a storage key */
  get: <T>(key: string, defaultValue?: T) => Ref<T>;
  /** Set a value for a storage key */
  set: <T>(key: string, value: T) => void;
  /** Remove a key accessed through this storage instance. Keys persisted by a previous session but never read here are not removed. */
  remove: (key: string) => void;
  /** Clear keys accessed through this storage instance. Keys persisted by a previous session but never read here are not removed. */
  clear: () => void;
}
interface StorageOptions {
  /** The storage adapter to use. Defaults to localStorage in browser, MemoryStorageAdapter otherwise */
  adapter?: StorageAdapter;
  /** The prefix to use for all storage keys. Defaults to 'v0:' */
  prefix?: string;
  /** Custom serializer for reading and writing values. Defaults to JSON.parse/stringify */
  serializer?: {
    read: (value: string) => unknown;
    write: (value: unknown) => string;
  };
  /** Time-to-live in milliseconds. When set, expired entries return the default value on `get()` and `set()` automatically timestamps entries. */
  ttl?: number;
}
interface StorageContextOptions extends StorageOptions {
  /** The namespace for the storage context. Defaults to `v0:storage` */
  namespace?: string;
}
interface StoragePluginOptions extends StorageContextOptions {}
/**
 * Creates a new storage instance.
 *
 * @param options The options for the storage instance.
 * @template E The type of the storage context.
 * @returns A new storage instance.
 *
 * @see https://0.vuetifyjs.com/composables/plugins/use-storage
 *
 * @example
 * ```ts
 * import { createStorage } from '@vuetify/v0'
 *
 * const storage = createStorage()
 *
 * storage.set('username', 'MyUsername')
 *
 * const username = storage.get('username')
 *
 * console.log(username.value) // MyUsername
 *
 * storage.clear()
 * ```
 */
declare function createStorage<E extends StorageContext>(options?: StorageOptions): E;
declare const createStorageContext: <_E extends StorageContext = StorageContext>(_options?: StorageContextOptions | undefined) => ContextTrinity<_E>, createStoragePlugin: (_options?: StorageContextOptions | undefined) => Plugin, useStorage: <_E extends StorageContext = StorageContext>(namespace?: string) => _E;
//#endregion
//#region src/composables/useTheme/adapters/adapter.d.ts
interface ThemeAdapterSetupContext {
  colors: ComputedRef<Record<string, Colors>>;
  selectedId: Ref<ID | null | undefined>;
  isDark: Readonly<Ref<boolean>>;
}
declare abstract class ThemeAdapter {
  /** CSS ident for theme ids, color keys, and the adapter prefix. */
  static readonly SAFE_IDENT: RegExp;
  /** Rejected inside theme color values before they are written to a stylesheet. */
  static readonly UNSAFE_CSS: RegExp;
  stylesheetId: string;
  prefix: string;
  rgb: boolean;
  /**
   * Teardown registered by `setup`. Called once via `app.onUnmount` on the
   * plugin path and available as a reachable handle on standalone paths.
   */
  dispose?: () => void;
  constructor(prefix: string);
  generate(colors: Record<string, Colors>, isDark?: boolean): string;
  private decompose;
  abstract setup<T extends ThemeAdapterSetupContext>(app: App, context: T, target?: string | HTMLElement | null): void;
  abstract update(colors: Record<string, Colors>, isDark?: boolean): void;
}
//#endregion
//#region src/composables/useTheme/adapters/v0.d.ts
interface Vuetify0ThemeOptions {
  cspNonce?: string;
  stylesheetId?: string;
  prefix?: string;
}
/**
 * Theme adapter that injects CSS custom properties via adoptedStyleSheets.
 * Best for SPAs where SSR hydration is not a concern.
 */
declare class V0StyleSheetThemeAdapter extends ThemeAdapter {
  cspNonce?: string;
  sheet?: CSSStyleSheet;
  constructor(options?: Vuetify0ThemeOptions);
  setup<T extends ThemeAdapterSetupContext>(app: App, context: T, target?: string | HTMLElement | null): void;
  update(colors: Record<ID, Colors>, isDark?: boolean): void;
  upsert(styles: string): void;
  private detach;
}
//#endregion
//#region src/composables/useTheme/adapters/unhead.d.ts
interface V0UnheadThemeOptions {
  cspNonce?: string;
  stylesheetId?: string;
  prefix?: string;
}
/**
 * Theme adapter that manages CSS custom properties via @unhead.
 * Best for SSR/SSG — the same <style> tag is rendered on the server
 * and patched on the client, eliminating hydration flash.
 *
 * Requires @unhead/vue to be installed in the app.
 */
declare class V0UnheadThemeAdapter extends ThemeAdapter {
  private entry?;
  private cspNonce?;
  constructor(options?: V0UnheadThemeOptions);
  setup<T extends ThemeAdapterSetupContext>(app: App, context: T, target?: string | HTMLElement | null): void;
  update(colors: Record<ID, Colors>, isDark?: boolean): void;
}
//#endregion
//#region src/composables/useTheme/index.d.ts
type Colors = {
  [key: string]: string;
};
type ThemeColors = {
  [key: string]: Colors | string;
};
type ThemeRecord = {
  dark?: boolean;
  lazy?: boolean;
  colors: ThemeColors;
};
/**
 * Input type for theme tickets - what users provide to register().
 * Extend this interface to add custom properties.
 */
interface ThemeTicketInput extends SingleTicketInput<ThemeColors> {
  /**
   * Theme color definitions. When provided to `register()`, these are
   * onboarded as flat tokens for alias resolution and stored as the
   * ticket value.
   */
  colors?: ThemeColors;
  /**
   * Indicates whether the theme is dark or light.
   *
   * @remarks Defaults to `false` (light theme).
   */
  dark?: boolean;
  /**
   * Indicates whether the theme should be loaded lazily.
   *
   * @remarks Defaults to `false`.
   */
  lazy?: boolean;
}
/**
 * Output type for theme tickets - what users receive from get().
 * Includes all input properties plus guaranteed dark/lazy values.
 *
 * @template Z The input ticket type that extends ThemeTicketInput.
 */
type ThemeTicket<Z extends ThemeTicketInput = ThemeTicketInput> = SingleTicket<Z> & {
  /**
   * Indicates whether the theme is dark or light.
   *
   * @remarks Defaults to `false` (light theme).
   */
  dark: boolean;
  /**
   * Indicates whether the theme should be loaded lazily.
   *
   * @remarks Defaults to `false`.
   */
  lazy: boolean;
};
/**
 * Context for managing theme collections.
 *
 * @template Z The input ticket type.
 * @template E The output ticket type.
 */
interface ThemeContext<Z extends ThemeTicketInput = ThemeTicketInput, E extends ThemeTicket<Z> = ThemeTicket<Z>> extends Omit<SingleContext<Z, E>, 'register'> {
  /**
   * A computed reference to the resolved colors of all registered themes.
   *
   * @remarks Returns a record keyed by theme ID. Each value contains the theme's colors
   * with any token aliases resolved to their actual values. Lazy themes are excluded
   * unless they are currently selected.
   *
   * @see https://0.vuetifyjs.com/composables/plugins/use-theme
   *
   * @example
   * ```ts
   * import { useTheme } from '@vuetify/v0'
   *
   * const theme = useTheme()
   *
   * console.log(theme.colors.value)
   * ```
   */
  colors: ComputedRef<Record<string, Colors>>;
  /**
   * A ref indicating whether the current theme is dark.
   *
   * @remarks Returns `true` if the current theme has `dark: true`, otherwise `false`.
   *
   * @see https://0.vuetifyjs.com/composables/plugins/use-theme
   *
   * @example
   * ```ts
   * import { useTheme } from '@vuetify/v0'
   *
   * const theme = useTheme()
   *
   * console.log(theme.isDark.value) // true or false
   * ```
   */
  isDark: Readonly<Ref<boolean>>;
  /**
   * Cycles through the provided themes in order.
   *
   * @param themes An array of theme IDs to cycle through. Defaults to all registered themes.
   *
   * @see https://0.vuetifyjs.com/composables/plugins/use-theme
   *
   * @example
   * ```ts
   * import { useTheme } from '@vuetify/v0'
   *
   * const theme = useTheme()
   *
   * theme.cycle(['light', 'dark'])
   * ```
   */
  cycle: (themes?: ID[]) => void;
  /**
   * `true` while the configured `system` pair is driving selection.
   * Becomes `false` after an explicit `select`.
   *
   * @example
   * ```ts
   * const theme = useTheme()
   * console.log(theme.isSystem.value)
   * ```
   */
  isSystem: Readonly<Ref<boolean>>;
  /**
   * Return to following the `system` pair. Without `system`, re-selects `default`.
   *
   * @example
   * ```ts
   * const theme = useTheme()
   * theme.select('dark')
   * theme.reset()
   * ```
   */
  reset: () => void;
  /**
   * Register a theme with optional colors.
   *
   * When `colors` is provided, onboards them as flat tokens for
   * alias resolution and stores them as the ticket value.
   *
   * @example
   * ```ts
   * const theme = createTheme({ themes: { light, dark }, default: 'light' })
   *
   * // Register a custom theme at runtime
   * theme.register({ id: 'custom', dark: true, colors: { primary: '#ff5722' } })
   * theme.select('custom')
   * ```
   */
  register: (registration?: Partial<Z>) => E;
  /** Bulk-register multiple themes in a single batch. */
  onboard: (registrations: Partial<Z>[]) => E[];
  /**
   * Release adapter resources (watchers, stylesheet, unhead entries).
   * Called automatically on `app.unmount` when using the plugin path.
   * Call manually when using a standalone context (`createThemeContext`).
   */
  dispose: () => void;
}
interface ThemeSystemPair {
  light: ID;
  dark: ID;
}
interface ThemeOptions<Z extends ThemeRecord = ThemeRecord> extends RegistryOptions {
  /**
   * The theme adapter to use.
   *
   * @remarks Defaults to `V0StyleSheetThemeAdapter`.
   */
  adapter?: ThemeAdapter;
  /**
   * The default theme ID to select on initialization.
   *
   * @remarks Used on the server and when `system` is omitted or invalid.
   */
  default?: ID;
  /**
   * Follow `prefers-color-scheme` using these registered theme ids until
   * the user calls `select`. Both ids must already be in `themes`.
   *
   * @example
   * ```ts
   * app.use(
   *   createThemePlugin({
   *     system: { light: 'light', dark: 'dark' },
   *     persist: true,
   *     themes: {
   *       light: { colors: { primary: '#3b82f6' } },
   *       dark: { dark: true, colors: { primary: '#675496' } },
   *     },
   *   }),
   * )
   * ```
   */
  system?: ThemeSystemPair;
  /**
   * Automatically generate `on-*` foreground colors for each theme color
   * using APCA contrast analysis.
   *
   * @remarks Defaults to `false`.
   */
  foreground?: boolean;
  /**
   * A collection of tokens to use for resolving theme colors.
   */
  palette?: TokenCollection;
  /**
   * Output CSS variable values as decomposed RGB channels (`R, G, B`)
   * instead of hex strings.
   *
   * @remarks Defaults to `false`.
   */
  rgb?: boolean;
  /**
   * A record of themes to register.
   */
  themes?: Record<ID, Z>;
  /**
   * The target element or selector to apply theme classes to.
   *
   * @remarks If `null`, no classes will be applied.
   */
  target?: string | HTMLElement | null;
}
interface ThemeContextOptions extends ThemeOptions {
  namespace?: string;
}
interface ThemePluginOptions extends ThemeContextOptions {
  persist?: boolean;
}
/**
 * Creates a new theme instance.
 *
 * @param options The options for the theme instance.
 * @returns A new theme instance.
 *
 * @see https://0.vuetifyjs.com/composables/plugins/use-theme
 *
 * @example
 * ```ts
 * import { createTheme } from '@vuetify/v0'
 *
 * const theme = createTheme({
 *   default: 'light',
 *   themes: {
 *     light: {
 *       dark: false,
 *       colors: {
 *         primary: '#3b82f6',
 *       },
 *     },
 *     dark: {
 *       dark: true,
 *       colors: {
 *         primary: '#675496',
 *       },
 *     },
 *   },
 * })
 * ```
 */
declare function createTheme(_options?: ThemeOptions): ThemeContext;
declare const createThemeContext: <_E extends ThemeContext<ThemeTicketInput, ThemeTicket<ThemeTicketInput>> = ThemeContext<ThemeTicketInput, ThemeTicket<ThemeTicketInput>>>(_options?: ThemePluginOptions | undefined) => ContextTrinity<_E>, createThemePlugin: (_options?: ThemePluginOptions | undefined) => Plugin, useTheme: <_E extends ThemeContext<ThemeTicketInput, ThemeTicket<ThemeTicketInput>> = ThemeContext<ThemeTicketInput, ThemeTicket<ThemeTicketInput>>>(namespace?: string) => _E;
//#endregion
//#region src/composables/useTimer/index.d.ts
interface TimerOptions {
  /**
   * Duration in milliseconds. Accepts a plain number, ref, or getter — the
   * value is read fresh each time `start()` is invoked, so reactive sources
   * can change between runs without recreating the timer.
   *
   * @default 1000
   *
   * @example
   * ```ts
   * useTimer(handler, { duration: 5000 })
   * useTimer(handler, { duration: () => isFast.value ? 100 : 1000 })
   * ```
   */
  duration?: MaybeRefOrGetter<number>;
  /**
   * Whether the timer repeats after firing.
   * @default false
   */
  repeat?: boolean;
}
interface TimerContext {
  /** Start the timer. Restarts if already running. */
  start: () => void;
  /** Stop the timer and reset remaining to full duration. */
  stop: () => void;
  /** Pause the timer, preserving remaining time. No-op if not running. */
  pause: () => void;
  /** Resume from where pause left off. No-op if not paused. */
  resume: () => void;
  /** Milliseconds left until next fire. */
  remaining: ShallowRef<number>;
  /** Whether the timer is currently active (started and not stopped). */
  isActive: ShallowRef<boolean>;
  /** Whether the timer is currently paused. */
  isPaused: ShallowRef<boolean>;
}
/**
 * Creates a reactive timer with pause/resume support.
 *
 * @param handler Callback invoked when the timer fires.
 * @param options Timer configuration.
 * @returns Timer controls and reactive state.
 *
 * @see https://0.vuetifyjs.com/composables/system/use-timer
 *
 * @example
 * ```ts
 * const timer = useTimer(() => console.log('fired'), { duration: 5000 })
 *
 * timer.start()
 * timer.pause()
 * timer.resume()
 * timer.stop()
 *
 * // Reactive duration — re-read on each start()
 * const duration = shallowRef(1000)
 * const reactive = useTimer(handler, { duration })
 * duration.value = 2000
 * reactive.start() // fires after 2000ms
 * ```
 */
declare function useTimer(handler: () => void, options?: TimerOptions): TimerContext;
//#endregion
//#region src/composables/useToggleScope/index.d.ts
interface ToggleScopeControls {
  /**
   * Whether the scope is currently active (created and running)
   */
  readonly isActive: Readonly<Ref<boolean>>;
  /**
   * Stop the scope (destroys and cleans up all effects)
   */
  stop: () => void;
  /**
   * Start the scope (creates and runs effects)
   */
  start: () => void;
  /**
   * Reset the scope (stops and immediately restarts)
   */
  reset: () => void;
}
/**
 * Conditionally manages an effect scope based on a reactive boolean source.
 *
 * @param source A reactive boolean value or getter that controls the scope lifecycle
 * @param fn The function to run within the effect scope. Can optionally receive controls for manual scope management.
 * @returns Controls object with isActive state and start/stop/reset methods
 *
 * @see https://vuejs.org/api/reactivity-advanced.html#effectscope
 * @see https://0.vuetifyjs.com/composables/system/use-toggle-scope
 *
 * @example
 * ```ts
 * import { ref } from 'vue'
 * import { useToggleScope } from '@vuetify/v0'
 *
 * const isEnabled = ref(false)
 *
 * const { isActive } = useToggleScope(isEnabled, () => {
 *   // This code runs when isEnabled becomes true
 *   const unwatch = watch(someRef, () => {
 *     console.log('Watching...')
 *   })
 *
 *   // Cleanup happens automatically when isEnabled becomes false
 * })
 *
 * // Toggle the scope on/off
 * isEnabled.value = true  // Starts the scope
 * console.log(isActive.value) // true
 * isEnabled.value = false // Stops and cleans up
 * console.log(isActive.value) // false
 * ```
 *
 * @example
 * With manual controls:
 * ```ts
 * const isEnabled = ref(true)
 *
 * useToggleScope(isEnabled, (controls) => {
 *   // Access controls inside the scope
 *   console.log('Active:', controls.isActive.value)
 *
 *   // Manually reset the scope if needed
 *   someEvent.on('reset', () => controls.reset())
 * })
 * ```
 */
declare function useToggleScope(source: WatchSource<boolean>, fn: (() => void) | ((controls: ToggleScopeControls) => void)): ToggleScopeControls;
//#endregion
//#region src/composables/useTooltip/index.d.ts
/**
 * Options accepted by the tooltip factory.
 *
 * @example
 * ```ts
 * import { createTooltipPlugin } from '@vuetify/v0'
 *
 * app.use(createTooltipPlugin({ openDelay: 500, closeDelay: 100 }))
 * ```
 */
interface TooltipOptions {
  /** Default open delay in ms. @default 700 */
  openDelay?: MaybeRefOrGetter<number>;
  /** Default close delay in ms. @default 150 */
  closeDelay?: MaybeRefOrGetter<number>;
  /** Window in ms after a tooltip closes during which the next open is instant. @default 300 */
  skipDelay?: MaybeRefOrGetter<number>;
  /** Disable all tooltips in this region. @default false */
  disabled?: MaybeRefOrGetter<boolean>;
  /**
   * Positioning adapter for tooltip surfaces in this region. Tooltip-only —
   * Popover / Select / Combobox never see this value. Per-instance `adapter`
   * on `Tooltip.Root` still wins.
   */
  adapter?: PopoverAdapter;
}
interface TooltipContext {
  /**
   * Reactive open delay in ms.
   *
   * @example
   * ```ts
   * const tooltip = useTooltip()
   * console.log(tooltip.openDelay.value)
   * ```
   */
  openDelay: Readonly<Ref<number>>;
  /**
   * Reactive close delay in ms.
   *
   * @example
   * ```ts
   * const tooltip = useTooltip()
   * console.log(tooltip.closeDelay.value)
   * ```
   */
  closeDelay: Readonly<Ref<number>>;
  /**
   * Reactive skip-window length in ms.
   *
   * @example
   * ```ts
   * const tooltip = useTooltip()
   * console.log(tooltip.skipDelay.value)
   * ```
   */
  skipDelay: Readonly<Ref<number>>;
  /**
   * Reactive disabled flag for the region.
   *
   * @example
   * ```ts
   * const tooltip = useTooltip()
   * if (tooltip.disabled.value) return
   * ```
   */
  disabled: Readonly<Ref<boolean>>;
  /**
   * True when at least one tooltip is currently open in this region.
   *
   * @example
   * ```ts
   * const tooltip = useTooltip()
   * watch(tooltip.isAnyOpen, open => console.log(open))
   * ```
   */
  isAnyOpen: Readonly<Ref<boolean>>;
  /**
   * Returns true when the next opening tooltip should skip its open delay.
   *
   * @remarks
   * The skip rule is two-pronged: skip when another tooltip is already open
   * in the region, or skip when the previous tooltip closed within the
   * `skipDelay` window.
   *
   * @example
   * ```ts
   * const tooltip = useTooltip()
   * const delay = tooltip.shouldSkipOpenDelay() ? 0 : tooltip.openDelay.value
   * ```
   */
  shouldSkipOpenDelay: () => boolean;
  /**
   * Register an open tooltip with the region.
   *
   * @example
   * ```ts
   * const tooltip = useTooltip()
   * const ticket = tooltip.register({ id: 'tooltip:1' })
   * ```
   */
  register: (input?: Partial<RegistryTicketInput>) => RegistryTicket;
  /**
   * Unregister a tooltip and stamp the close timestamp.
   *
   * @example
   * ```ts
   * const tooltip = useTooltip()
   * tooltip.unregister(ticket.id)
   * ```
   */
  unregister: (id: ID) => void;
  /**
   * Region positioning adapter, or `undefined` to fall through to the
   * popover plugin / `V0PopoverAdapter`.
   *
   * @example
   * ```ts
   * const tooltip = useTooltip()
   * tooltip.adapter
   * ```
   */
  adapter: PopoverAdapter | undefined;
}
interface TooltipContextOptions extends TooltipOptions {
  namespace?: string;
}
interface TooltipPluginOptions extends TooltipContextOptions {}
/**
 * Synthesized fallback used when `useTooltip()` is called without
 * `app.use(createTooltipPlugin())`. Returns a fresh context with the
 * documented defaults — `<Tooltip.Root>` keeps working but warmup
 * coordination is per-instance instead of region-wide.
 *
 * @example
 * ```ts
 * import { createTooltipFallback } from '@vuetify/v0'
 *
 * const tooltip = createTooltipFallback()
 * console.log(tooltip.openDelay.value) // 700
 * ```
 */
declare function createTooltipFallback(): TooltipContext;
declare const createTooltipContext: <_E extends TooltipContext = TooltipContext>(_options?: TooltipPluginOptions | undefined) => ContextTrinity<_E>, createTooltipPlugin: (_options?: TooltipPluginOptions | undefined) => Plugin, useTooltip: <_E extends TooltipContext = TooltipContext>(namespace?: string) => _E;
//#endregion
export { RtlOptions as $, SortableEventListener as $a, RatingContext as $i, HydrationContext as $n, ActiveCell as $o, useDelay as $r, createGroup as $s, PermissionsAdapter as $t, V0StyleSheetThemeAdapter as A, NumericContext as Aa, SelectionOptions as Ac, ScrollToOptions as Ai, useLogger as An, RulesOptions as Ao, DragDropPlugin as Ar, createPopoverFallback as As, ReducedMotionAdapterSetupContext as At, useStorage as B, NestedOptions as Ba, createModel as Bc, useVirtual as Bi, createLocaleContext as Bn, DataGridContext as Bo, Orientation as Br, StepContext as Bs, UsePresenceOptions as Bt, ThemeTicketInput as C, OtpContext as Ca, useOverflow as Cc, toReactive as Ci, LoggerContext as Cn, ValidationTicketInput as Co, EventHandler as Cr, useVirtualFocus as Cs, ReducedMotionPluginOptions as Ct, useTheme as D, NumberFieldContext as Da, useImage as Dc, MaybeElementRef as Di, createLogger as Dn, RuleInput as Do, ActiveDrag as Dr, PopoverPluginOptions as Ds, useReducedMotion as Dt, createThemePlugin as E, createOtp as Ea, UseImageReturn as Ec, toHighlight as Ei, LoggerPluginOptions as En, RuleAliases as Eo, useWindowEventListener as Er, PopoverPluginContextOptions as Es, createReducedMotionPlugin as Et, StorageOptions as F, useNested as Fa, useSelection as Fc, VirtualItem as Fi, LocalePluginOptions as Fn, useRules as Fo, DraggablesContext as Fr, Plugin as Fs, useProxyRegistry as Ft, StackTicket as G, KanbanColumnTicket as Ga, createTimeline as Gi, LazyOptions as Gn, useDataGrid as Go, PointerAdapter as Gr, createStep as Gs, PermissionOptions as Gt, StackContextOptions as H, NestedSelectionMode as Ha, TimelineContextOptions as Hi, createLocalePlugin as Hn, DataGridOptions as Ho, useDragDrop as Hr, StepOptions as Hs, usePresence as Ht, StoragePluginOptions as I, NestedActiveMode as Ia, ModelContext as Ic, VirtualOptions as Ii, LocaleRecord as In, StandardSchemaV1 as Io, DropIndicator as Ir, PluginContextConfig as Is, ProxyModelOptions as It, createStackContext as J, KanbanEventListener as Ja, SliderContext as Ji, IntersectionObserverOptions as Jn, ColumnLayout as Jo, DragDropAdapterContext as Jr, GroupContext as Js, createPermissions as Jt, StackTicketInput as K, KanbanColumnTicketInput as Ka, createTimelineContext as Ki, useLazy as Kn, RowSpanningOptions as Ko, PointerAdapterOptions as Kr, createStepContext as Ks, PermissionPluginOptions as Kt, createStorage as L, NestedContext as La, ModelOptions as Lc, VirtualState as Li, LocaleTicket as Ln, isStandardSchema as Lo, DropPosition as Lr, PluginOptions as Ls, ProxyModelTarget as Lt, ThemeAdapter as M, createNumeric as Ma, SelectionTicketInput as Mc, VirtualContext as Mi, LocaleContext as Mn, createRulesContext as Mo, DragVia as Mr, usePopover as Ms, useRaf as Mt, StorageContext as N, createNested as Na, createSelection as Nc, VirtualContextOptions as Ni, LocaleContextOptions as Nn, createRulesFallback as No, DraggableTicket as Nr, toPlacement as Ns, ProxyRegistryContext as Nt, V0UnheadThemeAdapter as O, NumberFieldOptions as Oa, SelectionContext as Oc, toElement as Oi, createLoggerContext as On, RulesContext as Oo, DragDropContext as Or, PopoverReturn as Os, V0ReducedMotionAdapter as Ot, StorageContextOptions as P, createNestedContext as Pa, createSelectionContext as Pc, VirtualDirection as Pi, LocaleOptions as Pn, createRulesPlugin as Po, DraggableTicketInput as Pr, V0PopoverAdapter as Ps, ProxyRegistryOptions as Pt, RtlContextOptions as Q, SortableContext as Qa, createSlider as Qi, useIntersectionObserver as Qn, ResolvedColumn as Qo, UseDelayStartOptions as Qr, GroupTicketInput as Qs, V0PermissionsAdapter as Qt, createStorageContext as R, NestedContextOptions as Ra, ModelTicket as Rc, createVirtual as Ri, LocaleTicketInput as Rn, DataGridColumnTicket as Ro, DropZoneTicket as Rr, createPlugin as Rs, useProxyModel as Rt, ThemeTicket as S, useProgress as Sa, createOverflowContext as Sc, useBreakpoints as Si, usePrefersReducedMotion as Sn, ValidationTicket as So, CleanupFunction as Sr, VirtualFocusReturn as Ss, ReducedMotionOptions as St, createThemeContext as T, OtpPattern as Ta, UseImageOptions as Tc, ToHighlightOptions as Ti, LoggerOptions as Tn, RuleAlias as To, useEventListener as Tr, PopoverPluginContext as Ts, createReducedMotionContext as Tt, StackOptions as U, NestedTicket as Ua, TimelineOptions as Ui, useLocale as Un, createDataGrid as Uo, KeyboardAdapter as Ur, StepTicket as Us, PermissionContext as Ut, StackContext as V, NestedRegistration as Va, TimelineContext as Vi, createLocaleFallback as Vn, DataGridContextOptions as Vo, ZonesContext as Vr, StepContextOptions as Vs, UsePresenceReturn as Vt, StackPluginOptions as W, NestedTicketInput as Wa, TimelineTicket as Wi, LazyContext as Wn, createDataGridContext as Wo, KeyboardAdapterOptions as Wr, StepTicketInput as Ws, PermissionContextOptions as Wt, useStack as X, KanbanTransferPayload as Xa, SliderTicket as Xi, UseIntersectionObserverReturn as Xn, PinPosition as Xo, UseDelayOptions as Xr, GroupOptions as Xs, createPermissionsPlugin as Xt, createStackPlugin as Y, KanbanOptions as Ya, SliderOptions as Yi, UseElementIntersectionReturn as Yn, GridColumnDef as Yo, DragDropAdapterEmit as Yr, GroupContextOptions as Ys, createPermissionsContext as Yt, RtlContext as Z, createKanban as Za, SliderTicketInput as Zi, useElementIntersection as Zn, PinnedRegion as Zo, UseDelayReturn as Zr, GroupTicket as Zs, usePermissions as Zt, ThemeContextOptions as _, ProgressOptions as _a, useSingle as _c, BreakpointsOptions as _i, useMutationObserver as _n, createForm as _o, FeatureTicketInput as _r, ComboboxAdapter as _s, useElementSize as _t, createTooltipContext as a, createRatingContext as aa, BreadcrumbsContextOptions as ac, createDateContext as ai, NotificationsContext as an, InputContext as ao, createHydrationContext as ar, CreateContextOptions as as, useRtl as at, ThemeRecord as b, createProgress as ba, OverflowOptions as bc, createBreakpointsContext as bi, usePrefersContrast as bn, ValidationContext as bo, createFeaturesPlugin as br, VirtualFocusItem as bs, ReducedMotionContextOptions as bt, useTooltip as c, QueueContextOptions as ca, createBreadcrumbsContext as cc, ClickOutsideElement as ci, createNotifications as cn, createInput as co, PlatformContext as cr, useContext as cs, RtlAdapterSetupContext as ct, TimerContext as d, QueueTicketInput as da, SingleContextOptions as dc, UseClickOutsideOptions as di, useNotifications as dn, FormOptions as do, useHotkey as dr, createCombobox as ds, RovingItem as dt, RatingContextOptions as ea, createGroupContext as ec, DateContext as ei, NotificationInput as en, SortableMovePayload as eo, HydrationContextOptions as er, CellEditing as es, RtlPluginOptions as et, TimerOptions as f, createQueue as fa, SingleOptions as fc, UseClickOutsideReturn as fi, NotificationsAdapter as fn, FormTicket as fo, FeatureContext as fr, createComboboxContext as fs, useRovingFocus as ft, ThemeContext as g, ProgressContextOptions as ga, createSingleContext as gc, BreakpointsContextOptions as gi, UseMutationObserverReturn as gn, FormValue as go, FeatureTicket as gr, ClientComboboxAdapterOptions as gs, UseResizeObserverReturn as gt, ThemeColors as h, ProgressContext as ha, createSingle as hc, BreakpointsContext as hi, UseMutationObserverOptions as hn, FormValidationRule as ho, FeaturePluginOptions as hr, ClientComboboxAdapter as hs, UseElementSizeReturn as ht, TooltipPluginOptions as i, createRating as ia, BreadcrumbsContext as ic, createDate as ii, NotificationsAdapterContext as in, createSortable as io, createHydration as ir, ContextKey as is, createRtlPlugin as it, Vuetify0ThemeOptions as j, NumericOptions as ja, SelectionTicket as jc, VirtualAnchor as ji, LogLevel as jn, createRules as jo, DragType as jr, createPopoverPlugin as js, UseRafReturn as jt, V0UnheadThemeOptions as k, createNumberField as ka, SelectionContextOptions as kc, toArray as ki, createLoggerPlugin as kn, RulesContextOptions as ko, DragDropOptions as kr, createPopoverContext as ks, ReducedMotionAdapter as kt, ToggleScopeControls as l, QueueOptions as la, useBreadcrumbs as lc, ClickOutsideIgnoreTarget as li, createNotificationsContext as ln, FormContext as lo, UseHotkeyOptions as lr, ComboboxContext as ls, RovingFocusOptions as lt, Colors as m, useQueue as ma, SingleTicketInput as mc, BreakpointName as mi, ObservableNodeList as mn, FormValidationResult as mo, FeatureOptions as mr, ServerComboboxAdapter as ms, ResizeObserverOptions as mt, TooltipContextOptions as n, RatingItemState as na, BreadcrumbTicket as nc, DateOptions as ni, NotificationTicket as nn, SortableTicket as no, HydrationPluginOptions as nr, CellEditingRegistry as ns, createRtlContext as nt, createTooltipFallback as o, useRating as oa, BreadcrumbsOptions as oc, createDatePlugin as oi, NotificationsOptions as on, InputOptions as oo, createHydrationPlugin as or, createContext as os, V0RtlAdapter as ot, useTimer as p, createQueueContext as pa, SingleTicket as pc, useClickOutside as pi, MutationObserverRecord as pn, FormTicketInput as po, FeatureContextOptions as pr, useCombobox as ps, ResizeObserverEntry as pt, createStack as q, KanbanContext as qa, useTimeline as qi, IntersectionObserverEntry as qn, SpanEntry as qo, DragDropAdapter as qr, useStep as qs, PermissionTicket as qt, TooltipOptions as r, RatingOptions as ra, BreadcrumbTicketInput as rc, DatePluginOptions as ri, NotificationTicketInput as rn, SortableTicketInput as ro, createFallbackHydration as rr, EditableColumn as rs, createRtlFallback as rt, createTooltipPlugin as s, QueueContext as sa, createBreadcrumbs as sc, useDate as si, NotificationsPluginOptions as sn, InputState as so, useHydration as sr, provideContext as ss, RtlAdapter as st, TooltipContext as t, RatingItemDescriptor as ta, useGroup as tc, DateContextOptions as ti, NotificationSeverity as tn, SortableOptions as to, HydrationOptions as tr, CellEditingOptions as ts, createRtl as tt, useToggleScope as u, QueueTicket as ua, SingleContext as uc, ClickOutsideTarget as ui, createNotificationsPlugin as un, FormContextOptions as uo, UseHotkeyReturn as ur, ComboboxOptions as us, RovingFocusReturn as ut, ThemeOptions as v, ProgressTicket as va, OverflowContext as vc, BreakpointsPluginOptions as vi, MediaQueryContext as vn, createFormContext as vo, createFeatures as vr, ComboboxAdapterContext as vs, useResizeObserver as vt, createTheme as w, OtpOptions as wa, ImageStatus as wc, HighlightChunk as wi, LoggerContextOptions as wn, createValidation as wo, useDocumentEventListener as wr, PopoverOptions as ws, createReducedMotion as wt, ThemeSystemPair as x, createProgressContext as xa, createOverflow as xc, createBreakpointsPlugin as xi, usePrefersDark as xn, ValidationOptions as xo, useFeatures as xr, VirtualFocusOptions as xs, ReducedMotionMode as xt, ThemePluginOptions as y, ProgressTicketInput as ya, OverflowContextOptions as yc, createBreakpoints as yi, useMediaQuery as yn, useForm as yo, createFeaturesContext as yr, ComboboxAdapterResult as ys, ReducedMotionContext as yt, createStoragePlugin as z, NestedOpenMode as za, ModelTicketInput as zc, createVirtualContext as zi, createLocale as zn, DataGridColumnTicketInput as zo, DropZoneTicketInput as zr, createPluginContext as zs, PresenceState as zt };