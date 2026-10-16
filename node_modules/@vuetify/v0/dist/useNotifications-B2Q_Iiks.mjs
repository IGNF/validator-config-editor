import { UNSAFE_KEYS, isNaN, isNull, isObject, isString, isUndefined, useId as useId$1 } from "./utilities/index.mjs";
import { i as useContext, t as createTrinity } from "./createTrinity-DJROWgXU.mjs";
import { n as createPluginContext } from "./createPlugin-YYkwbiUd.mjs";
import { t as createRegistry } from "./createRegistry-COW_AjH1.mjs";
import { t as useTimer } from "./useTimer-DxQCew2E.mjs";
import { onScopeDispose } from "vue";
//#region src/composables/createQueue/index.ts
/**
* @module createQueue
*
* @see https://0.vuetifyjs.com/composables/registration/create-queue
*
* @remarks
* A queue composable for managing time-based collections with:
* - Automatic timeout-based removal
* - Pause/resume functionality
* - FIFO (First In, First Out) ordering
* - Manual dismissal support
* - Queue progression management
*
* Built on top of createRegistry, the queue automatically manages timeouts for tickets,
* ensuring only the first ticket in the queue is active at any time. When a ticket
* expires or is removed, the next ticket in the queue automatically becomes active.
*
* @example
* ```ts
* import { createQueue } from '@vuetify/v0'
*
* const queue = createQueue()
* queue.register({ value: 'Notification 1', timeout: 3000 })
* queue.register({ value: 'Notification 2', timeout: 3000 })
* ```
*/
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
function createQueue(_options = {}) {
	const { timeout: _timeout = 3e3, ...options } = _options;
	const registry = createRegistry({
		...options,
		events: true
	});
	const timers = /* @__PURE__ */ new Map();
	function createTicketTimer(ticket) {
		if (/* @__PURE__ */ isUndefined(ticket.timeout) || ticket.timeout < 0 || ticket.isPaused) return;
		const timer = useTimer(() => {
			timers.delete(ticket.id);
			registry.unregister(ticket.id);
			resume();
		}, { duration: ticket.timeout });
		timers.set(ticket.id, timer);
		timer.start();
	}
	function stopTimer(id) {
		const timer = timers.get(id);
		if (timer) {
			timer.stop();
			timers.delete(id);
		}
	}
	function register(registration = {}) {
		const id = registration.id ?? /* @__PURE__ */ useId$1();
		const timeout = Object.hasOwn(registration, "timeout") ? registration.timeout : _timeout;
		const ticket = {
			...registration,
			id,
			timeout,
			isPaused: registry.size > 0,
			dismiss: () => unregister(id)
		};
		const registered = registry.register(ticket);
		createTicketTimer(registered);
		return registered;
	}
	function unregister(id) {
		const ticket = /* @__PURE__ */ isUndefined(id) ? registry.seek("first") : registry.get(id);
		if (!ticket) return void 0;
		const wasFirst = ticket.index === 0;
		stopTimer(ticket.id);
		registry.unregister(ticket.id);
		if (wasFirst) resume();
		return ticket;
	}
	function offboard(ids) {
		let hadFirst = false;
		for (const id of ids) {
			const ticket = registry.get(id);
			if (!ticket) continue;
			if (ticket.index === 0) hadFirst = true;
			stopTimer(ticket.id);
		}
		registry.offboard(ids);
		if (hadFirst) resume();
	}
	function pause() {
		const ticket = registry.seek("first");
		if (!ticket || ticket.isPaused) return void 0;
		timers.get(ticket.id)?.pause();
		return registry.upsert(ticket.id, { isPaused: true });
	}
	function resume() {
		const ticket = registry.seek("first");
		if (!ticket || ticket.index !== 0 || !ticket.isPaused) return void 0;
		const updated = registry.upsert(ticket.id, { isPaused: false });
		const timer = timers.get(updated.id);
		if (timer) timer.resume();
		else createTicketTimer(updated);
		return updated;
	}
	function clear() {
		for (const timer of timers.values()) timer.stop();
		timers.clear();
		registry.clear();
	}
	function dispose() {
		clear();
		registry.dispose();
	}
	onScopeDispose(dispose, true);
	function onboard(registrations) {
		return registry.batch(() => registrations.map((registration) => register(registration)));
	}
	return {
		...registry,
		register,
		unregister,
		onboard,
		offboard,
		pause,
		resume,
		clear,
		dispose,
		get size() {
			return registry.size;
		}
	};
}
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
function createQueueContext(_options = {}) {
	const { namespace = "v0:queue", ...options } = _options;
	const context = createQueue(options);
	return createTrinity(namespace, context);
}
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
* <\/script>
* ```
*/
function useQueue(namespace = "v0:queue") {
	return useContext(namespace);
}
//#endregion
//#region src/composables/useNotifications/index.ts
/**
* @module useNotifications
* @see https://0.vuetifyjs.com/composables/plugins/use-notifications
*
* @remarks
* Notification management composable built on createRegistry and createQueue.
* Registry stores the full notification lifecycle (permanent record).
* Queue manages the display surface (toasts) with FIFO ordering and auto-dismiss.
*
* Supports:
* - Push notifications with severity levels and configurable timeouts
* - State mutations: read, seen, archived, snoozed
* - Bulk operations: readAll, archiveAll, clear
* - Toast queue with pause/resume and auto-dismiss
* - Adapter integration via event system
* - Plugin installation via createNotificationsPlugin
*
* @example
* ```ts
* import { useNotifications } from '@vuetify/v0'
*
* const notifications = useNotifications()
* notifications.send({ subject: 'Saved', severity: 'success' })
* ```
*/
function createNotifications(_options = {}) {
	const { timeout = 3e3, ...options } = _options;
	const registry = createRegistry({
		...options,
		events: true,
		reactive: true
	});
	const queue = createQueue({
		timeout,
		events: true,
		reactive: true
	});
	registry.on("unregister:ticket", (ticket) => {
		if (queue.has(ticket.id)) queue.unregister(ticket.id);
	});
	/**
	* Build a full {@link NotificationTicket} from raw input
	*
	* @param input The notification input to hydrate.
	* @returns A partial ticket with timestamps, lifecycle methods, and an ID.
	* @internal Used by {@link send}, {@link register}, and {@link onboard}.
	*/
	function hydrate(input) {
		const id = input.id ?? /* @__PURE__ */ useId$1();
		const now = /* @__PURE__ */ new Date();
		return {
			...input,
			id,
			createdAt: now,
			readAt: null,
			seenAt: null,
			archivedAt: null,
			snoozedUntil: null,
			read: () => read(id),
			unread: () => unread(id),
			seen: () => seen(id),
			archive: () => archive(id),
			unarchive: () => unarchive(id),
			snooze: (until) => snooze(id, until),
			wake: () => wake(id),
			dismiss: () => queue.unregister(id)
		};
	}
	/**
	* Create a notification and enqueue it for toast display
	*
	* @param input The notification input to create.
	* @returns The hydrated notification ticket.
	* @remarks Hydrates the input with timestamps and lifecycle methods, registers
	* it in the registry, adds it to the display queue, and emits
	* `notification:received`. The ticket auto-dismisses after the configured
	* timeout unless paused.
	*
	* @see https://0.vuetifyjs.com/composables/plugins/use-notifications
	*
	* @example
	* ```ts
	* import { useNotifications } from '@vuetify/v0'
	*
	* const notifications = useNotifications()
	*
	* // Basic toast
	* notifications.send({ subject: 'Changes saved', severity: 'success' })
	*
	* // With custom timeout
	* const ticket = notifications.send({ subject: 'Connection lost', severity: 'error', timeout: 10000 })
	*
	* console.log(ticket.id)        // 'generated-id'
	* console.log(ticket.createdAt) // Date
	* console.log(ticket.readAt)    // null
	*
	* // Ticket convenience methods
	* ticket.read()    // marks as read
	* ticket.dismiss() // removes from toast queue, keeps in registry
	* ```
	*/
	function send(input) {
		const ticket = registry.register(hydrate(input));
		queue.register(/* @__PURE__ */ isUndefined(input.timeout) ? { id: ticket.id } : {
			id: ticket.id,
			timeout: input.timeout
		});
		registry.emit("notification:received", ticket);
		return ticket;
	}
	/**
	* Register a notification in the registry without adding it to the toast queue
	*
	* @param input The notification input to register.
	* @returns The hydrated notification ticket.
	* @remarks Overrides the base registry `register` to hydrate the input with
	* timestamps and lifecycle methods. Use for historical or pre-existing items
	* that should appear in an inbox but not pop up as toasts.
	*
	* @see https://0.vuetifyjs.com/composables/plugins/use-notifications
	*
	* @example
	* ```ts
	* import { useNotifications } from '@vuetify/v0'
	*
	* const notifications = useNotifications()
	*
	* // Register a historical item (appears in inbox, not as toast)
	* const ticket = notifications.register({ id: 'old-1', subject: 'Deployed v2.1' })
	*
	* console.log(ticket.createdAt) // Date
	* console.log(ticket.readAt)    // null
	*
	* // Lifecycle methods work the same as send()
	* ticket.read()
	* ticket.archive()
	* ```
	*/
	function register(input) {
		return registry.register(hydrate(input));
	}
	/**
	* Bulk version of {@link register}
	*
	* @param inputs Array of notification inputs to register.
	* @returns Array of hydrated notification tickets.
	* @remarks Registers multiple notifications into the registry without toast
	* display. Wraps all registrations in a single `registry.batch()` call so
	* reactive updates are deferred until the entire batch completes.
	*
	* @see https://0.vuetifyjs.com/composables/plugins/use-notifications
	*
	* @example
	* ```ts
	* import { useNotifications } from '@vuetify/v0'
	*
	* const notifications = useNotifications()
	*
	* // Load historical items on mount
	* const tickets = notifications.onboard([
	*   { id: 'n1', subject: 'Welcome to the team' },
	*   { id: 'n2', subject: 'Setup complete', severity: 'success' },
	* ])
	*
	* console.log(tickets.length)              // 2
	* console.log(notifications.queue.values()) // [] (no toasts)
	* console.log(notifications.values().length) // 2 (in registry)
	* ```
	*/
	function onboard(inputs) {
		return registry.batch(() => inputs.map((input) => register(input)));
	}
	/**
	* Mark a notification as read
	*
	* @param id The ID of the notification to mark as read.
	* @remarks Sets `readAt` to the current time and emits `notification:read`.
	* Adapters listen to this event for outbound sync.
	*
	* @see https://0.vuetifyjs.com/composables/plugins/use-notifications
	*
	* @example
	* ```ts
	* import { useNotifications } from '@vuetify/v0'
	*
	* const notifications = useNotifications()
	*
	* const ticket = notifications.send({ subject: 'New message' })
	*
	* notifications.read(ticket.id)
	* console.log(ticket.readAt) // Date
	*
	* // Or via ticket convenience method
	* ticket.read()
	* ```
	*/
	function read(id) {
		if (!registry.has(id)) return;
		registry.upsert(id, { readAt: /* @__PURE__ */ new Date() }, "notification:read");
	}
	/**
	* Mark a notification as unread
	*
	* @param id The ID of the notification to mark as unread.
	* @remarks Clears `readAt` and emits `notification:unread`.
	*
	* @see https://0.vuetifyjs.com/composables/plugins/use-notifications
	*
	* @example
	* ```ts
	* import { useNotifications } from '@vuetify/v0'
	*
	* const notifications = useNotifications()
	*
	* notifications.unread('notif-1')
	* ```
	*/
	function unread(id) {
		if (!registry.has(id)) return;
		registry.upsert(id, { readAt: null }, "notification:unread");
	}
	/**
	* Mark a notification as seen
	*
	* @param id The ID of the notification to mark as seen.
	* @remarks Sets `seenAt` to the current time and emits `notification:seen`.
	* Distinct from read — seen tracks whether the notification appeared in the
	* user's viewport, while read indicates the user actively engaged with it.
	*
	* @see https://0.vuetifyjs.com/composables/plugins/use-notifications
	*
	* @example
	* ```ts
	* import { useNotifications } from '@vuetify/v0'
	*
	* const notifications = useNotifications()
	*
	* // Mark as seen when visible in inbox viewport
	* notifications.seen('notif-1')
	* ```
	*/
	function seen(id) {
		if (!registry.has(id)) return;
		registry.upsert(id, { seenAt: /* @__PURE__ */ new Date() }, "notification:seen");
	}
	/**
	* Archive a notification
	*
	* @param id The ID of the notification to archive.
	* @remarks Sets `archivedAt` to the current time and emits `notification:archived`.
	*
	* @see https://0.vuetifyjs.com/composables/plugins/use-notifications
	*
	* @example
	* ```ts
	* import { useNotifications } from '@vuetify/v0'
	*
	* const notifications = useNotifications()
	*
	* notifications.archive('notif-1')
	* ```
	*/
	function archive(id) {
		if (!registry.has(id)) return;
		registry.upsert(id, { archivedAt: /* @__PURE__ */ new Date() }, "notification:archived");
	}
	/**
	* Restore an archived notification
	*
	* @param id The ID of the notification to unarchive.
	* @remarks Clears `archivedAt` and emits `notification:unarchived`.
	*
	* @see https://0.vuetifyjs.com/composables/plugins/use-notifications
	*
	* @example
	* ```ts
	* import { useNotifications } from '@vuetify/v0'
	*
	* const notifications = useNotifications()
	*
	* notifications.unarchive('notif-1')
	* ```
	*/
	function unarchive(id) {
		if (!registry.has(id)) return;
		registry.upsert(id, { archivedAt: null }, "notification:unarchived");
	}
	/**
	* Snooze a notification until a given time
	*
	* @param id The ID of the notification to snooze.
	* @param until The time at which the snooze expires.
	* @remarks Sets `snoozedUntil` and emits `notification:snoozed`. The composable
	* does not auto-wake — consumers are responsible for calling {@link wake} when
	* the snooze expires (e.g., via a timer or server push).
	*
	* @see https://0.vuetifyjs.com/composables/plugins/use-notifications
	*
	* @example
	* ```ts
	* import { useNotifications } from '@vuetify/v0'
	*
	* const notifications = useNotifications()
	*
	* const tomorrow = new Date(Date.now() + 86_400_000)
	* notifications.snooze('notif-1', tomorrow)
	* ```
	*/
	function snooze(id, until) {
		if (!registry.has(id)) return;
		registry.upsert(id, { snoozedUntil: until }, "notification:snoozed");
	}
	/**
	* Cancel a snooze
	*
	* @param id The ID of the notification to wake.
	* @remarks Clears `snoozedUntil` and emits `notification:unsnoozed`.
	*
	* @see https://0.vuetifyjs.com/composables/plugins/use-notifications
	*
	* @example
	* ```ts
	* import { useNotifications } from '@vuetify/v0'
	*
	* const notifications = useNotifications()
	*
	* notifications.wake('notif-1')
	* ```
	*/
	function wake(id) {
		if (!registry.has(id)) return;
		registry.upsert(id, { snoozedUntil: null }, "notification:unsnoozed");
	}
	/**
	* Mark all unread notifications as read
	*
	* @remarks Iterates all notifications and marks unread ones as read in a single
	* batch. Skips already-read notifications to preserve their original `readAt`
	* timestamp. Emits `notification:read` for each affected notification.
	*
	* @see https://0.vuetifyjs.com/composables/plugins/use-notifications
	*
	* @example
	* ```ts
	* import { useNotifications } from '@vuetify/v0'
	*
	* const notifications = useNotifications()
	*
	* notifications.send({ subject: 'Message 1' })
	* notifications.send({ subject: 'Message 2' })
	*
	* notifications.readAll()
	*
	* console.log(notifications.values().every(t => !isNull(t.readAt))) // true
	* ```
	*/
	function readAll() {
		const now = /* @__PURE__ */ new Date();
		registry.batch(() => {
			for (const ticket of registry.values()) if (/* @__PURE__ */ isNull(ticket.readAt)) registry.upsert(ticket.id, { readAt: now }, "notification:read");
		});
	}
	/**
	* Archive all unarchived notifications
	*
	* @remarks Iterates all notifications and archives unarchived ones in a single
	* batch. Skips already-archived notifications to preserve their original
	* `archivedAt` timestamp. Emits `notification:archived` for each affected notification.
	*
	* @see https://0.vuetifyjs.com/composables/plugins/use-notifications
	*
	* @example
	* ```ts
	* import { useNotifications } from '@vuetify/v0'
	*
	* const notifications = useNotifications()
	*
	* notifications.send({ subject: 'Alert 1' })
	* notifications.send({ subject: 'Alert 2' })
	*
	* notifications.archiveAll()
	*
	* console.log(notifications.values().every(t => !isNull(t.archivedAt))) // true
	* ```
	*/
	function archiveAll() {
		const now = /* @__PURE__ */ new Date();
		registry.batch(() => {
			for (const ticket of registry.values()) if (/* @__PURE__ */ isNull(ticket.archivedAt)) registry.upsert(ticket.id, { archivedAt: now }, "notification:archived");
		});
	}
	return {
		...registry,
		send,
		register,
		onboard,
		queue,
		read,
		unread,
		seen,
		archive,
		unarchive,
		snooze,
		wake,
		readAll,
		archiveAll,
		get size() {
			return registry.size;
		}
	};
}
function toDate(value) {
	if (!/* @__PURE__ */ isString(value)) return null;
	const date = new Date(value);
	return /* @__PURE__ */ isNaN(date.getTime()) ? null : date;
}
function snapshot(context) {
	const out = {};
	let count = 0;
	for (const ticket of context.values()) {
		if (UNSAFE_KEYS.has(String(ticket.id))) continue;
		const entry = {};
		if (!/* @__PURE__ */ isNull(ticket.readAt)) entry.readAt = ticket.readAt.toISOString();
		if (!/* @__PURE__ */ isNull(ticket.seenAt)) entry.seenAt = ticket.seenAt.toISOString();
		if (!/* @__PURE__ */ isNull(ticket.archivedAt)) entry.archivedAt = ticket.archivedAt.toISOString();
		if (!/* @__PURE__ */ isNull(ticket.snoozedUntil) && ticket.snoozedUntil.getTime() > Date.now()) entry.snoozedUntil = ticket.snoozedUntil.toISOString();
		if (Object.keys(entry).length === 0) continue;
		out[ticket.id] = entry;
		count++;
	}
	return count > 0 ? out : null;
}
function coerce(saved) {
	if (!/* @__PURE__ */ isObject(saved)) return null;
	const map = /* @__PURE__ */ new Map();
	for (const [id, entry] of Object.entries(saved)) {
		if (!/* @__PURE__ */ isObject(entry)) continue;
		const state = {};
		const readAt = toDate(entry.readAt);
		const seenAt = toDate(entry.seenAt);
		const archivedAt = toDate(entry.archivedAt);
		const snoozedUntil = toDate(entry.snoozedUntil);
		if (!/* @__PURE__ */ isNull(readAt)) state.readAt = readAt;
		if (!/* @__PURE__ */ isNull(seenAt)) state.seenAt = seenAt;
		if (!/* @__PURE__ */ isNull(archivedAt)) state.archivedAt = archivedAt;
		if (!/* @__PURE__ */ isNull(snoozedUntil) && snoozedUntil.getTime() > Date.now()) state.snoozedUntil = snoozedUntil;
		if (Object.keys(state).length > 0) map.set(id, state);
	}
	return map.size > 0 ? map : null;
}
function merge(context, map, ticket) {
	const state = map.get(ticket.id) ?? map.get(String(ticket.id));
	if (state) context.upsert(ticket.id, state);
}
function noop() {}
const EMPTY = [];
function createNotificationsFallback() {
	const stub = {
		id: "",
		index: 0,
		value: 0,
		valueIsIndex: true,
		createdAt: /* @__PURE__ */ new Date(0),
		readAt: null,
		seenAt: null,
		archivedAt: null,
		snoozedUntil: null,
		read: noop,
		unread: noop,
		seen: noop,
		archive: noop,
		unarchive: noop,
		snooze: noop,
		wake: noop,
		dismiss: noop,
		unregister: noop
	};
	return {
		collection: /* @__PURE__ */ new Map(),
		size: 0,
		send: () => stub,
		queue: {
			collection: /* @__PURE__ */ new Map(),
			size: 0,
			register: () => ({}),
			unregister: () => void 0,
			has: () => false,
			get: () => void 0,
			keys: () => EMPTY,
			values: () => EMPTY,
			entries: () => EMPTY,
			browse: () => void 0,
			lookup: () => void 0,
			upsert: () => ({}),
			seek: () => void 0,
			move: () => void 0,
			on: noop,
			off: noop,
			emit: noop,
			dispose: noop,
			clear: noop,
			reindex: noop,
			batch: (fn) => fn(),
			onboard: () => EMPTY,
			offboard: noop,
			pause: () => void 0,
			resume: () => void 0
		},
		read: noop,
		unread: noop,
		seen: noop,
		archive: noop,
		unarchive: noop,
		snooze: noop,
		wake: noop,
		readAll: noop,
		archiveAll: noop,
		clear: noop,
		has: () => false,
		get: () => void 0,
		keys: () => EMPTY,
		values: () => EMPTY,
		entries: () => EMPTY,
		browse: () => void 0,
		lookup: () => void 0,
		upsert: () => stub,
		register: () => stub,
		unregister: noop,
		reindex: noop,
		move: () => void 0,
		seek: () => void 0,
		on: noop,
		off: noop,
		emit: noop,
		dispose: noop,
		batch: (fn) => fn(),
		onboard: () => EMPTY,
		offboard: noop
	};
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
const [createNotificationsContext, createNotificationsPlugin, useNotifications] = createPluginContext("v0:notifications", (options) => createNotifications(options), {
	fallback: () => createNotificationsFallback(),
	persist: (context) => snapshot(context),
	restore: (context, saved) => {
		const map = coerce(saved);
		if (!map) return;
		for (const ticket of context.values()) merge(context, map, ticket);
		context.on("register:ticket", (ticket) => merge(context, map, ticket));
	},
	setup: (context, app, options) => {
		app.onUnmount(() => {
			context.dispose();
			context.queue.dispose();
		});
		const { adapter } = options;
		if (!adapter) return;
		adapter.setup({
			send: context.send,
			register: context.register,
			on: context.on,
			off: context.off
		});
		app.onUnmount(() => adapter.dispose?.());
	}
});
//#endregion
export { createQueue as a, useNotifications as i, createNotificationsContext as n, createQueueContext as o, createNotificationsPlugin as r, useQueue as s, createNotifications as t };
