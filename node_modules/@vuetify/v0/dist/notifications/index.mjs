import { t as IN_BROWSER } from "../globals-Bxw-y98v.mjs";
import { i as useNotifications, n as createNotificationsContext, r as createNotificationsPlugin, t as createNotifications } from "../useNotifications-B2Q_Iiks.mjs";
//#region src/composables/useNotifications/adapters/adapter.ts
var NotificationsAdapter = class {};
//#endregion
//#region src/composables/useNotifications/adapters/knock.ts
/**
* @module KnockNotificationsAdapter
*
* @remarks
* Knock adapter for useNotifications.
* Bridges a Knock feed instance with the notification system.
*
* Inbound: Maps real-time feed events to context.send()
* Outbound: Listens to notification:read and notification:archived
*           events and calls feed.markAsRead/markAsArchived
*
* @example
* ```ts
* import Knock from '@knocklabs/client'
* import { KnockNotificationsAdapter } from '#v0/composables/useNotifications/adapters/knock'
*
* const knock = new Knock(KNOCK_PUBLIC_API_KEY)
* knock.authenticate(userId)
* const feed = knock.feeds.initialize(KNOCK_FEED_CHANNEL_ID)
*
* app.use(createNotificationsPlugin({
*   adapter: new KnockNotificationsAdapter(feed),
* }))
* ```
*/
function noop$1() {}
function mapItem$1(item) {
	const subject = item.blocks?.find((b) => b.name === "subject")?.rendered;
	const body = item.blocks?.find((b) => b.name === "body")?.rendered;
	return {
		id: item.id,
		subject,
		body,
		data: item.data
	};
}
var KnockNotificationsAdapter = class extends NotificationsAdapter {
	feed;
	items = /* @__PURE__ */ new Map();
	context;
	onReceived;
	onPage;
	onRead;
	onArchived;
	constructor(feed) {
		super();
		this.feed = feed;
	}
	setup(context) {
		this.context = context;
		this.onReceived = (data) => {
			const payload = data;
			if (!payload?.items) return;
			for (const item of payload.items) {
				if (this.items.has(item.id)) continue;
				this.items.set(item.id, item);
				this.context.send(mapItem$1(item));
			}
		};
		this.onPage = (data) => {
			const payload = data;
			if (!payload?.items) return;
			for (const item of payload.items) {
				if (this.items.has(item.id)) continue;
				this.items.set(item.id, item);
				this.context.register(mapItem$1(item));
			}
		};
		this.feed.on("items.received.realtime", this.onReceived);
		this.feed.on("items.received.page", this.onPage);
		if (IN_BROWSER) {
			this.feed.listenForUpdates();
			this.feed.fetch().catch(noop$1);
		}
		this.onRead = (data) => {
			const item = this.items.get(String(data.id));
			if (item) this.feed.markAsRead(item).catch(noop$1);
		};
		this.onArchived = (data) => {
			const item = this.items.get(String(data.id));
			if (item) this.feed.markAsArchived(item).catch(noop$1);
		};
		this.context.on("notification:read", this.onRead);
		this.context.on("notification:archived", this.onArchived);
	}
	dispose() {
		if (!this.context) return;
		this.feed.off("items.received.realtime", this.onReceived);
		this.feed.off("items.received.page", this.onPage);
		this.context.off("notification:read", this.onRead);
		this.context.off("notification:archived", this.onArchived);
		this.items.clear();
		this.feed.teardown();
	}
};
//#endregion
//#region src/composables/useNotifications/adapters/novu.ts
/**
* @module NovuNotificationsAdapter
*
* @remarks
* Novu adapter for useNotifications.
* Bridges a Novu client instance with the notification system.
*
* Inbound: Seeds registry from novu.notifications.list() on setup,
*          then listens to notifications.notification_received for real-time updates.
* Outbound: Listens to notification lifecycle events and calls the Novu API
*           (read, unread, seen, archive, unarchive).
*
* @example
* ```ts
* import { Novu } from '@novu/js'
* import { NovuNotificationsAdapter } from '@vuetify/v0/notifications'
*
* const novu = new Novu({
*   subscriberId: userId,
*   applicationIdentifier: import.meta.env.VITE_NOVU_APP_ID,
* })
*
* app.use(createNotificationsPlugin({
*   adapter: new NovuNotificationsAdapter(novu),
* }))
* ```
*/
const DEFAULT_SEVERITY_MAP = {
	critical: "error",
	high: "error",
	medium: "warning",
	low: "info"
};
function defaultSeverity(s) {
	return DEFAULT_SEVERITY_MAP[s.toLowerCase()];
}
function noop() {}
function mapItem(item, resolveSeverity) {
	return {
		id: item.id,
		subject: item.subject,
		body: item.body,
		data: item.data,
		severity: item.severity ? resolveSeverity(item.severity) : void 0
	};
}
var NovuNotificationsAdapter = class extends NotificationsAdapter {
	novu;
	resolveSeverity;
	ids = /* @__PURE__ */ new Set();
	context;
	disposed = false;
	unsubscribers = [];
	onRead;
	onUnread;
	onSeen;
	onArchived;
	onUnarchived;
	constructor(novu, options = {}) {
		super();
		this.novu = novu;
		this.resolveSeverity = options.severity ?? defaultSeverity;
	}
	setup(context) {
		this.context = context;
		this.disposed = false;
		const unsub = this.novu.on("notifications.notification_received", (data) => {
			const item = data;
			if (this.disposed || !item?.id || this.ids.has(item.id)) return;
			this.ids.add(item.id);
			this.context.send(mapItem(item, this.resolveSeverity));
		});
		this.unsubscribers.push(unsub);
		if (IN_BROWSER) this.novu.notifications.list({ limit: 30 }).then(({ data }) => {
			if (this.disposed) return;
			for (const item of data?.notifications ?? []) {
				if (!item.id || this.ids.has(item.id)) continue;
				this.ids.add(item.id);
				this.context.register(mapItem(item, this.resolveSeverity));
			}
		}).catch(noop);
		this.onRead = (data) => {
			const id = String(data.id);
			if (this.ids.has(id)) this.novu.notifications.read({ notificationId: id }).catch(noop);
		};
		this.onUnread = (data) => {
			const id = String(data.id);
			if (this.ids.has(id)) this.novu.notifications.unread({ notificationId: id }).catch(noop);
		};
		this.onSeen = (data) => {
			const id = String(data.id);
			if (this.ids.has(id)) this.novu.notifications.seenAll({ notificationIds: [id] }).catch(noop);
		};
		this.onArchived = (data) => {
			const id = String(data.id);
			if (this.ids.has(id)) this.novu.notifications.archive({ notificationId: id }).catch(noop);
		};
		this.onUnarchived = (data) => {
			const id = String(data.id);
			if (this.ids.has(id)) this.novu.notifications.unarchive({ notificationId: id }).catch(noop);
		};
		this.context.on("notification:read", this.onRead);
		this.context.on("notification:unread", this.onUnread);
		this.context.on("notification:seen", this.onSeen);
		this.context.on("notification:archived", this.onArchived);
		this.context.on("notification:unarchived", this.onUnarchived);
	}
	dispose() {
		this.disposed = true;
		for (const unsub of this.unsubscribers) unsub();
		this.unsubscribers.length = 0;
		if (this.context) {
			/* v8 ignore next 5 -- handlers always assigned during setup; guards are defensive */
			if (this.onRead) this.context.off("notification:read", this.onRead);
			if (this.onUnread) this.context.off("notification:unread", this.onUnread);
			if (this.onSeen) this.context.off("notification:seen", this.onSeen);
			if (this.onArchived) this.context.off("notification:archived", this.onArchived);
			if (this.onUnarchived) this.context.off("notification:unarchived", this.onUnarchived);
		}
		this.ids.clear();
	}
};
//#endregion
export { KnockNotificationsAdapter, NotificationsAdapter, NovuNotificationsAdapter, createNotifications, createNotificationsContext, createNotificationsPlugin, useNotifications };
