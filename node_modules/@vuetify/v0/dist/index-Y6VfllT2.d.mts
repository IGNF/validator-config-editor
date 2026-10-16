import { a as ID, i as Extensible } from "./index-XNZrgWCq.mjs";
import { t as ContextTrinity } from "./index-ClUa0Bl7.mjs";
//#region src/composables/createRegistry/index.d.ts
/**
 * User-facing input shape for registry tickets.
 *
 * Extend this when defining custom ticket types passed to `register()` and `onboard()`.
 * The registry adds the computed fields (`index`, `valueIsIndex`) automatically — those
 * live on {@link RegistryTicket}, which is the output type returned by `get()` and `values()`.
 *
 * @template V The type of the ticket value.
 */
interface RegistryTicketInput<V = unknown> {
  /** The unique identifier. Optional — auto-generated if not provided. */
  id?: ID;
  /** The value associated with the ticket. If not provided, it defaults to the index. */
  value?: V;
}
interface RegistryTicket<V = unknown> {
  /** The unique identifier. Is randomly generated if not provided. */
  id: ID;
  /**
   * The index of the ticket in the registry.
   *
   * @remarks Automatically managed by the registry. Assigned at registration and updated during reindexing; a supplied index is ignored — use `move()` to position a ticket. It's not recommended to manually set this. When a removal defers its reindex — a tail-block removal, or a registry with no index-derived values — a ticket read via `values()`/`entries()` may carry a stale index until the next position-reading call (`register`/`upsert`/`browse`/`lookup`/`move`/`reorder`/`seek`) drains it. A mid-list `unregister`/`offboard` that shifts index-derived survivors reindexes eagerly, so those reads are already current.
   */
  index: number;
  /** The value associated with the ticket. If not provided, it defaults to the index. */
  value: V;
  /**
   * Whether the value is derived from index.
   *
   * @remarks Set to true when no explicit value is provided during registration. It's not recommended to manually set this.
   */
  valueIsIndex: boolean;
  /**
   * Remove this ticket from the collection that registered it.
   *
   * @remarks Equivalent to calling `unregister(ticket.id)` on that collection.
   * Wrapping registries (model, group, nested) rebind this so sugar hits their
   * cleanup, not only the base Map delete.
   */
  unregister: () => void;
}
/** Valid event names for registry operations */
type RegistryEventName = 'register:ticket' | 'unregister:ticket' | 'update:ticket' | 'clear:registry' | 'reindex:registry';
/** Maps event names to their payload types */
type RegistryEventMap<Z extends RegistryTicket> = {
  'register:ticket': Z;
  'unregister:ticket': Z;
  'update:ticket': Z;
  'clear:registry': undefined;
  'reindex:registry': undefined;
};
/**
 * Callback signature for registry event listeners.
 *
 * Resolves to a typed payload for known {@link RegistryEventName} keys, and
 * `(data: unknown) => void` for custom events.
 */
type RegistryEventCallback<Z extends RegistryTicket = RegistryTicket, K extends Extensible<RegistryEventName> = Extensible<RegistryEventName>> = K extends RegistryEventName ? (data: RegistryEventMap<Z>[K]) => void : (data: unknown) => void;
/** Resolves payload type: typed for known events, unknown for custom events */
type EventPayload<Z extends RegistryTicket, K extends string> = K extends RegistryEventName ? RegistryEventMap<Z>[K] : unknown;
interface RegistryContext<Z extends RegistryTicketInput = RegistryTicketInput, E extends RegistryTicket & Z = RegistryTicket & Z> {
  /**
   * The collection of tickets in the registry
   *
   * @template ID The type of the ticket ID.
   * @template E The type of the registry ticket.
   *
   * @remarks Read-only view of the internal collection. Use `register`, `unregister`, `upsert`, and `clear` methods to modify.
   */
  collection: ReadonlyMap<ID, E>;
  /**
   * Clear the entire registry
   *
   * @remarks Removes all tickets from the registry. This operation invalidates cached results from `keys()`, `values()`, and `entries()`.
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-registry
   *
   * @example
   * ```ts
   * import { createRegistry } from '@vuetify/v0'
   *
   * const registry = createRegistry()
   *
   * registry.register({ id: 'ticket-1' })
   * registry.register({ id: 'ticket-2' })
   *
   * console.log(registry.size) // 2
   *
   * registry.clear()
   *
   * console.log(registry.size) // 0
   * ```
   */
  clear: () => void;
  /**
   * Check if a ticket exists by ID
   *
   * @param id The ID of the ticket to check.
   * @remarks Calls `collection.has` internally.
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-registry
   *
   * @example
   * ```ts
   * import { createRegistry } from '@vuetify/v0'
   *
   * const registry = createRegistry()
   *
   * registry.register({ id: 'ticket-id' })
   *
   * const exists = registry.has('ticket-id') // true
   * ```
   */
  has: (id: ID) => boolean;
  /**
   * Get all registered IDs
   *
   * @remarks Calls `collection.keys` internally with caching. First call is O(n), subsequent calls are O(1) until cache invalidation.
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-registry
   *
   * @example
   * ```ts
   * import { createRegistry } from '@vuetify/v0'
   *
   * const registry = createRegistry()
   *
   * registry.register({ id: 'ticket-1' })
   * registry.register({ id: 'ticket-2' })
   *
   * const ids = registry.keys() // ['ticket-1', 'ticket-2']
   * ```
   */
  keys: () => readonly ID[];
  /**
   * Browse for an ID(s) by value
   *
   * @param value The value to browse for.
   * @remarks Returns an array of IDs that share the given value, or undefined if no match is found.
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-registry
   *
   * @example
   * ```ts
   * import { createRegistry } from '@vuetify/v0'
   *
   * const registry = createRegistry()
   *
   * registry.register({ id: 'ticket-1', value: 'common-value' })
   * registry.register({ id: 'ticket-2', value: 'common-value' })
   * registry.register({ id: 'ticket-3', value: 'unique-value' })
   *
   * const common = registry.browse('common-value') // ['ticket-1', 'ticket-2']
   * const unique = registry.browse('unique-value') // ['ticket-3']
   * ```
   */
  browse: (value: E['value']) => readonly ID[] | undefined;
  /**
   * Lookup a ticket by index number
   *
   * @param index The index number to lookup.
   * @remarks Maps do not support indexing by default, this method provides a way to retrieve an ID based on its index in the registry.
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-registry
   *
   * @example
   * ```ts
   * const registry = createRegistry()
   *
   * registry.register({ id: 'ticket-1' })
   * registry.register({ id: 'ticket-2' })
   *
   * const ticket1 = registry.lookup(0) // 'ticket-1'
   * const ticket2 = registry.lookup(1) // 'ticket-2'
   * ```
   */
  lookup: (index: number) => ID | undefined;
  /**
   * Get a ticket by ID
   *
   * @param id The ID of the ticket to retrieve.
   * @remarks Calls `collection.get` internally.
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-registry
   *
   * @example
   * ```ts
   * import { createRegistry } from '@vuetify/v0'
   *
   * const registry = createRegistry()
   *
   * registry.register({ id: 'ticket-id', value: 'some-value' })
   *
   * const ticket = registry.get('ticket-id') // { id: 'ticket-id', index: 0, value: 'some-value', ... }
   * ```
   */
  get: (id: ID) => E | undefined;
  /**
   * Update or insert a ticket by ID
   *
   * @param id The ID of the ticket to upsert.
   * @param ticket The partial ticket data to update or insert.
   * @param event Optional custom event name to emit alongside `update:ticket`. The patched ticket is dispatched as the event payload.
   * @remarks If the ticket exists, it will be updated in place — the ticket reference returned by `register()` remains valid and reactive (when `reactive: true`), and cached `keys()` / `values()` / `entries()` results stay valid (same refs, membership and order unchanged; iterating effects are not re-notified). If it doesn't exist, a new ticket will be created with the given ID and data, which invalidates the cached results.
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-registry
   *
   * @example
   * ```ts
   * import { createRegistry } from '@vuetify/v0'
   *
   * const registry = createRegistry({ events: true })
   *
   * // Insert a new ticket
   * const ticket = registry.upsert('ticket-id', { value: 'initial-value' })
   *
   * // Update the existing ticket
   * const patched = registry.upsert('ticket-id', { value: 'updated-value' })
   *
   * // Emit a custom event with the patched ticket as payload
   * registry.upsert('ticket-id', { value: 'final' }, 'ticket:final')
   * ```
   */
  upsert: (id: ID, ticket?: Partial<Z>, event?: string) => E;
  /**
   * Get all values of registered tickets
   *
   * @remarks Calls `collection.values` internally with caching. First call is O(n), subsequent calls are O(1) until cache invalidation.
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-registry
   *
   * @example
   * ```ts
   * import { createRegistry } from '@vuetify/v0'
   *
   * const registry = createRegistry()
   *
   * registry.register({ id: 'ticket-1', value: 'value-1' })
   * registry.register({ id: 'ticket-2', value: 'value-2' })
   *
   * const values = registry.values() // [{ id: 'ticket-1', ... }, { id: 'ticket-2', ... }]
   * ```
   */
  values: () => readonly E[];
  /**
   * Get all entries of registered tickets
   *
   * @remarks Calls `collection.entries` internally with caching. First call is O(n), subsequent calls are O(1) until cache invalidation.
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-registry
   *
   * @example
   * ```ts
   * import { createRegistry } from '@vuetify/v0'
   *
   * const registry = createRegistry()
   *
   * registry.register({ id: 'ticket-1', value: 'value-1' })
   * registry.register({ id: 'ticket-2', value: 'value-2' })
   *
   * const entries = registry.entries() // [['ticket-1', { id: 'ticket-1', ... }], ['ticket-2', { id: 'ticket-2', ... }]]
   * ```
   */
  entries: () => readonly [ID, E][];
  /**
   * Register a new ticket
   *
   * @param ticket The partial ticket data to register.
   * @remarks If no ID is provided, a unique ID will be generated automatically. If no value is provided, it defaults to the ticket's index. The index is always assigned by the registry — a supplied index is ignored; use `move()` to position a ticket. This operation invalidates cached results from `keys()`, `values()`, and `entries()`.
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-registry
   *
   * @example
   * ```ts
   * import { createRegistry } from '@vuetify/v0'
   *
   * const registry = createRegistry()
   *
   * const ticket = registry.register()
   *
   * console.log(ticket) // { id: 'generated-id', index: 0, value: 0, valueIsIndex: true }
   * ```
   */
  register: (ticket?: Partial<Z & RegistryTicket>) => E;
  /**
   * Unregister a ticket by ID
   *
   * @param id The ID of the ticket to unregister.
   * @remarks Removes the ticket from the registry and reindexes the remaining tickets. This operation invalidates cached results from `keys()`, `values()`, and `entries()`.
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-registry
   *
   * @example
   * ```ts
   * import { createRegistry } from '@vuetify/v0'
   *
   * const registry = createRegistry()
   *
   * registry.register({ id: 'ticket-id' })
   *
   * registry.unregister('ticket-id')
   * ```
   */
  unregister: (id: ID) => void;
  /**
   * Reset the index directory and update all tickets
   *
   * @remarks Rebuilds the internal index mapping and ensures all tickets have correct index values. This operation invalidates cached results from `keys()`, `values()`, and `entries()`.
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-registry
   *
   * @example
   * ```ts
   * import { createRegistry } from '@vuetify/v0'
   *
   * const registry = createRegistry()
   *
   * registry.register({ id: 'ticket-1' })
   * registry.register({ id: 'ticket-2' })
   *
   * // After some operations that may affect indexing
   * registry.reindex()
   * ```
   */
  reindex: () => void;
  /**
   * Move a ticket to a new index position
   *
   * @param id The ID of the ticket to move.
   * @param toIndex The target index position. Clamped to valid range.
   * @returns The moved ticket, or undefined if the ticket was not found.
   *
   * @remarks Rebuilds the internal collection order by removing and reinserting the entry at the target position. Triggers a full reindex after the move. This operation invalidates cached results from `keys()`, `values()`, and `entries()`.
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-registry
   *
   * @example
   * ```ts
   * import { createRegistry } from '@vuetify/v0'
   *
   * const registry = createRegistry()
   *
   * registry.onboard([
   *   { id: 'a', value: 'alpha' },
   *   { id: 'b', value: 'beta' },
   *   { id: 'c', value: 'gamma' },
   * ])
   *
   * // Move 'a' from index 0 to index 2
   * registry.move('a', 2)
   *
   * console.log(registry.keys()) // ['b', 'c', 'a']
   * ```
   */
  move: (id: ID, toIndex: number) => E | undefined;
  /**
   * Reorder the registry to match a canonical permutation of ids in one pass.
   *
   * @param ids A full permutation of the currently-registered ticket ids.
   *
   * @remarks
   * Bulk equivalent of calling `move` n times, but does the rebuild once
   * (O(n) total rather than O(n²)). Silently no-ops when `ids.length !== size`,
   * when any id is unknown, or when `ids` contains duplicates — caller is
   * responsible for validation and warnings. Emits `reindex:registry` once on
   * completion; does not emit per-ticket `update:ticket` events.
   *
   * @example
   * ```ts
   * const registry = createRegistry()
   * registry.onboard([{ id: 'a' }, { id: 'b' }, { id: 'c' }])
   *
   * registry.reorder(['c', 'a', 'b'])
   *
   * console.log(registry.keys()) // ['c', 'a', 'b']
   * ```
   */
  reorder: (ids: ID[]) => void;
  /**
   * Seek for a ticket based on direction and optional predicate
   *
   * @param direction The scan direction (`'first'` = forward, `'last'` = backward). Defaults to `'first'`.
   * @param from The index to start scanning from. With `'first'` the scan moves forward from `from`; with `'last'` the scan moves backward from `from`. Defaults to `0` for `'first'` and `size - 1` for `'last'`.
   * @param predicate An optional function to test each ticket. The first ticket reached in scan order that satisfies the predicate is returned.
   * @remarks This method allows for flexible searching within the registry, either from the start or end, and can filter tickets based on custom criteria.
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-registry
   *
   * @example
   * ```ts
   * import { createRegistry } from '@vuetify/v0'
   *
   * const registry = createRegistry()
   *
   * registry.register({ id: 'ticket-1', value: 'apple' })
   * registry.register({ id: 'ticket-2', value: 'banana' })
   * registry.register({ id: 'ticket-3', value: 'cherry' })
   *
   * // Seek the first ticket
   * const first = registry.seek('first')
   *
   * // Seek the last ticket
   * const last = registry.seek('last')
   *
   * // Seek the first ticket with value 'banana'
   * const banana = registry.seek('first', undefined, ticket => ticket.value === 'banana')
   *
   * // Seek from index 1 to find the next ticket with value starting with 'c'
   * const cherry = registry.seek('first', 1, ticket => (ticket.value as string).startsWith('c'))
   * ```
   */
  seek: (direction?: 'first' | 'last', from?: number, predicate?: (ticket: E) => boolean) => E | undefined;
  /**
   * Listen for registry events
   *
   * @param event The name of the event to listen for.
   * @param cb The callback function to invoke when the event is emitted.
   * @remarks Must be enabled via the `events` option when creating the registry.
   * Supported events:
   * - `register:ticket` - Emitted when a ticket is registered, receives the ticket as argument
   * - `unregister:ticket` - Emitted when a ticket is unregistered, receives the ticket as argument
   * - `update:ticket` - Emitted when a ticket is updated, receives the updated ticket as argument
   * - `clear:registry` - Emitted when the registry is cleared
   * - `reindex:registry` - Emitted when the registry is reindexed
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-registry
   *
   * @example
   * ```ts
   * import { createRegistry } from '@vuetify/v0'
   *
   * const registry = createRegistry({ events: true })
   *
   * registry.on('register:ticket', (ticket) => {
   *   console.log('Ticket registered:', ticket)
   * })
   *
   * registry.register({ id: 'ticket-id' }) // Console: Ticket registered: { id: 'ticket-id', ... }
   * ```
   */
  on: <K extends Extensible<RegistryEventName>>(event: K, cb: RegistryEventCallback<E, K>) => void;
  /**
   * Stop listening for registry events
   *
   * @param event The name of the event to stop listening for.
   * @param cb The callback function to remove.
   * @remarks Must be enabled via the `events` option when creating the registry.
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-registry
   *
   * @example
   * ```ts
   * import { onScopeDispose } from 'vue'
   * import { createRegistry } from '@vuetify/v0'
   *
   * const registry = createRegistry({ events: true })
   *
   * function onRegister(ticket) {
   *   console.log('Ticket registered:', ticket)
   * }
   *
   * registry.on('register:ticket', onRegister)
   *
   * registry.register({ id: 'ticket-id' }) // Console: Ticket registered: { id: 'ticket-id', ... }
   *
   * onScopeDispose(() => {
   *   registry.off('register:ticket', onRegister)
   * })
   * ```
   */
  off: <K extends Extensible<RegistryEventName>>(event: K, cb: RegistryEventCallback<E, K>) => void;
  /**
   * Emit an event with data
   *
   * @param event The name of the event to emit.
   * @param data The data to pass to event listeners.
   * @remarks Must be enabled via the `events` option when creating the registry.
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-registry
   *
   * @example
   * ```ts
   * import { createRegistry } from '@vuetify/v0'
   *
   * const registry = createRegistry({ events: true })
   *
   * registry.on('custom-event', (data) => {
   *   console.log('Custom event received:', data)
   * })
   *
   * registry.emit('custom-event', { message: 'Hello, World!' }) // Console: Custom event received: { message: 'Hello, World!' }
   * ```
   */
  emit: <K extends Extensible<RegistryEventName>>(event: K, data: EventPayload<E, K>) => void;
  /**
   * Clears the registry and removes all listeners
   *
   * @remarks Disposes of the registry by clearing all tickets and removing all event listeners.
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-registry
   *
   * @example
   * ```ts
   * import { onScopeDispose } from 'vue'
   * import { createRegistry } from '@vuetify/v0'
   *
   * const registry = createRegistry({ events: true })
   *
   * registry.register({ id: 'ticket-id' })
   *
   * onScopeDispose(() => {
   *   registry.dispose()
   * })
   * ```
   */
  dispose: () => void;
  /**
   * Onboard multiple tickets at once
   *
   * @param registrations An array of partial ticket data to register.
   * @remarks Registers multiple tickets in a single operation and returns the array of registered tickets.
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-registry
   *
   * @example
   * ```ts
   * import { createRegistry } from '@vuetify/v0'
   *
   * const registry = createRegistry()
   *
   * const tickets = registry.onboard([
   *   { id: 'ticket-1', value: 'value-1' },
   *   { id: 'ticket-2', value: 'value-2' },
   * ])
   *
   * console.log(tickets) // [{ id: 'ticket-1', ... }, { id: 'ticket-2', ... }]
   * ```
   */
  onboard: (registrations: Partial<Z & RegistryTicket>[]) => E[];
  /**
   * Offboard multiple tickets at once, returning the input shapes that were removed.
   *
   * @param ids An array of ticket IDs to unregister.
   * @returns An array of `Partial<Z>` — the inputs that were registered, with
   * registry-managed fields (`index`, `valueIsIndex`, `unregister`) stripped.
   * A user-supplied `id` is preserved so identity survives the transfer; an
   * auto-generated `id` is stripped so the receiving registry can assign a fresh
   * one. The `value` is stripped only when it was index-derived (`valueIsIndex`).
   * Order matches the input `ids` array. Missing ids are silently skipped — the
   * returned array may be shorter than `ids`.
   * @remarks Unregisters multiple tickets in a single compaction pass, reindexing
   * eagerly only when index-derived survivors shift. The inverse of `onboard`: onboard takes inputs and returns outputs;
   * offboard takes ids and returns the inputs back. Pair with `onboard` on a
   * different registry to move tickets across registries.
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-registry
   *
   * @example
   * ```ts
   * import { createRegistry } from '@vuetify/v0'
   *
   * const registry = createRegistry()
   *
   * registry.onboard([
   *   { id: 'ticket-1', value: 'value-1' },
   *   { id: 'ticket-2', value: 'value-2' },
   *   { id: 'ticket-3', value: 'value-3' },
   * ])
   *
   * const removed = registry.offboard(['ticket-1', 'ticket-3'])
   *
   * console.log(registry.size) // 1
   * console.log(removed) // [{ id: 'ticket-1', value: 'value-1' }, { id: 'ticket-3', value: 'value-3' }]
   *
   * // Move to another registry
   * const other = createRegistry()
   * other.onboard(removed)
   * ```
   */
  offboard: (ids: ID[]) => Partial<Z>[];
  /**
   * The number of tickets in the registry
   *
   * @remarks Reflects the current size of the internal ticket collection.
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-registry
   *
   * @example
   * ```ts
   * import { createRegistry } from '@vuetify/v0'
   *
   * const registry = createRegistry()
   *
   * registry.register({ id: 'ticket-1' })
   * registry.register({ id: 'ticket-2' })
   *
   * console.log(registry.size) // 2
   * ```
   */
  size: number;
  /**
   * Execute operations in a batch, deferring cache invalidation and event emission until complete
   *
   * @param fn The function containing batch operations.
   * @returns The return value of the batch function.
   * @remarks Useful for bulk operations like onboard(). Cache invalidation and events are deferred to the end of the batch instead of running after each operation.
   *
   * @see https://0.vuetifyjs.com/composables/registration/create-registry
   *
   * @example
   * ```ts
   * import { createRegistry } from '@vuetify/v0'
   *
   * const registry = createRegistry({ events: true })
   *
   * // Without batch: N invalidations + N events
   * // With batch: 1 invalidation + N events (after all registrations)
   * const tickets = registry.batch(() => {
   *   return [
   *     registry.register({ id: 'a' }),
   *     registry.register({ id: 'b' }),
   *     registry.register({ id: 'c' }),
   *   ]
   * })
   * ```
   */
  batch: <R>(fn: () => R) => R;
}
interface RegistryOptions {
  /**
   * Enable event emission for registry operations
   *
   * @default false
   * @remarks When enabled, the registry will emit events for operations like registration and unregistration. Listeners can be added using the `on` method.
   *
   * @example
   * ```ts
   * import { createRegistry } from '@vuetify/v0'
   *
   * const registry = createRegistry({ events: true })
   *
   * registry.on('register:ticket', (ticket) => {
   *   console.log('Ticket registered:', ticket)
   * })
   *
   * registry.register({ id: 'ticket-id' }) // Console: Ticket registered: { id: 'ticket-id', ... }
   * ```
   */
  events?: boolean;
  /**
   * Enable reactive behavior for registry operations
   *
   * @default false
   * @remarks When enabled, tickets and the backing collection are shallowReactive, and `keys()`, `values()`, and `entries()` register a single version dependency so effects and templates re-evaluate on structural mutation. Iteration results stay cached between mutations — reactive reads cost the same as non-reactive ones.
   *
   * @example
   * ```ts
   * import { createRegistry } from '@vuetify/v0'
   *
   * const registry = createRegistry({ reactive: true })
   *
   * registry.register({ id: 'ticket-id' })
   *
   * console.log(registry.size) // 1
   * ```
   */
  reactive?: boolean;
}
interface RegistryContextOptions extends RegistryOptions {
  namespace?: string;
}
/**
 * Creates a new registry instance.
 *
 * @param options The options for the registry instance.
 * @template Z The type of registry ticket that extends RegistryTicket. Use this to add custom properties to tickets.
 * @template E The type of registry context that extends RegistryContext<Z>. Use this when extending the registry with additional methods.
 * @returns A new registry instance.
 *
 * @see https://0.vuetifyjs.com/composables/registration/create-registry
 *
 * @example
 * ```ts
 * import { createRegistry } from '@vuetify/v0'
 *
 * const registry = createRegistry()
 *
 * const ticket1 = registry.register({ id: 'user-1', value: { name: 'John' } })
 * const ticket2 = registry.register({ id: 'user-2', value: { name: 'Jane' } })
 *
 * console.log(registry.size) // 2
 * console.log(registry.get('user-1')) // { id: 'user-1', index: 0, value: { name: 'John' }, ... }
 * ```
 */
declare function createRegistry<Z extends RegistryTicketInput = RegistryTicketInput, E extends RegistryTicket & Z = RegistryTicket & Z>(options?: RegistryOptions): RegistryContext<Z, E>;
/**
 * Creates a new registry context.
 *
 * @param options The options for the registry context, including `namespace` (defaults to `'v0:registry'`) and `events`.
 * @template Z The type of registry ticket that extends RegistryTicket. Use this to add custom properties to tickets.
 * @template E The type of registry context that extends RegistryContext<Z>. Use this when extending the registry with additional methods.
 * @returns A new registry context.
 *
 * @see https://0.vuetifyjs.com/composables/registration/create-registry
 *
 * @example
 * ```ts
 * import { createRegistryContext } from '@vuetify/v0'
 *
 * // With default namespace 'v0:registry'
 * export const [useItems, provideItems, items] = createRegistryContext()
 *
 * // Or with custom namespace
 * export const [useItems, provideItems, items] = createRegistryContext({ namespace: 'my-items' })
 *
 * // In a parent component:
 * provideItems()
 *
 * // In a child component:
 * const items = useItems()
 * items.register({ id: 'item-1', value: 'Value 1' })
 * ```
 */
declare function createRegistryContext<Z extends RegistryTicketInput = RegistryTicketInput, E extends RegistryTicket & Z = RegistryTicket & Z>(_options?: RegistryContextOptions): ContextTrinity<RegistryContext<Z, E>>;
/**
 * Uses an existing registry from context.
 *
 * @param namespace The namespace for the registry context. Defaults to `'v0:registry'`.
 * @template Z The type of registry ticket that extends RegistryTicket.
 * @template E The type of registry context that extends RegistryContext<Z>.
 * @returns The registry instance.
 *
 * @see https://0.vuetifyjs.com/composables/registration/create-registry
 *
 * @example
 * ```ts
 * import { useRegistry } from '@vuetify/v0'
 *
 * // In a child component (after provideRegistry was called by an ancestor):
 * const registry = useRegistry()
 *
 * registry.register({ id: 'item-1', value: 'Value 1' })
 * ```
 */
declare function useRegistry<Z extends RegistryTicketInput = RegistryTicketInput, E extends RegistryTicket & Z = RegistryTicket & Z>(namespace?: string): RegistryContext<Z, E>;
//#endregion
export { RegistryEventName as a, RegistryTicketInput as c, useRegistry as d, RegistryEventMap as i, createRegistry as l, RegistryContextOptions as n, RegistryOptions as o, RegistryEventCallback as r, RegistryTicket as s, RegistryContext as t, createRegistryContext as u };