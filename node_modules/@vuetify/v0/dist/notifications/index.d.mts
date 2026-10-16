import { an as NotificationsContext, cn as createNotifications, dn as useNotifications, en as NotificationInput, fn as NotificationsAdapter, in as NotificationsAdapterContext, ln as createNotificationsContext, nn as NotificationTicket, on as NotificationsOptions, rn as NotificationTicketInput, sn as NotificationsPluginOptions, tn as NotificationSeverity, un as createNotificationsPlugin } from "../index-Ct0Pmzpx.mjs";
//#region src/composables/useNotifications/adapters/knock.d.ts
/** Minimal Knock feed item shape. Uses type-only imports to avoid bundling the SDK. */
interface KnockFeedItem {
  [key: string]: unknown;
  id: string;
  data?: Record<string, unknown>;
  blocks?: Array<{
    type: string;
    name: string;
    content: string;
    rendered: string;
  }>;
  inserted_at?: string;
  read_at?: string | null;
  seen_at?: string | null;
  archived_at?: string | null;
}
/** Minimal Knock feed instance interface. */
interface KnockFeed {
  on: (event: string, handler: (data: unknown) => void) => void;
  off: (event: string, handler: (data: unknown) => void) => void;
  markAsRead: (item: KnockFeedItem) => Promise<unknown>;
  markAsArchived: (item: KnockFeedItem) => Promise<unknown>;
  fetch: (options?: Record<string, unknown>) => Promise<unknown>;
  teardown: () => void;
  listenForUpdates: () => void;
}
declare class KnockNotificationsAdapter extends NotificationsAdapter {
  private feed;
  private items;
  private context;
  private onReceived;
  private onPage;
  private onRead;
  private onArchived;
  constructor(feed: KnockFeed);
  setup(context: NotificationsAdapterContext): void;
  dispose(): void;
}
//#endregion
//#region src/composables/useNotifications/adapters/novu.d.ts
/** Minimal Novu notification shape. Uses type-only imports to avoid bundling the SDK. */
interface NovuNotification {
  [key: string]: unknown;
  id?: string;
  subject?: string;
  body?: string;
  data?: Record<string, unknown>;
  severity?: string;
  isRead?: boolean;
  isSeen?: boolean;
  isArchived?: boolean;
  createdAt?: string;
}
/** Minimal Novu client interface. */
interface NovuClient {
  notifications: {
    list: (opts?: Record<string, unknown>) => Promise<{
      data?: {
        notifications?: NovuNotification[];
      } | null;
    }>;
    read: (opts: {
      notificationId: string;
    }) => Promise<unknown>;
    unread: (opts: {
      notificationId: string;
    }) => Promise<unknown>;
    archive: (opts: {
      notificationId: string;
    }) => Promise<unknown>;
    unarchive: (opts: {
      notificationId: string;
    }) => Promise<unknown>;
    seenAll: (opts: {
      notificationIds: string[];
    }) => Promise<unknown>;
  };
  on: (event: string, handler: (data: unknown) => void) => () => void;
}
interface NovuAdapterOptions {
  /** Map a Novu severity string to a NotificationSeverity. Defaults to critical/high→error, medium→warning, low→info. */
  severity?: (novuSeverity: string) => NotificationSeverity | undefined;
}
declare class NovuNotificationsAdapter extends NotificationsAdapter {
  private novu;
  private resolveSeverity;
  private ids;
  private context;
  private disposed;
  private unsubscribers;
  private onRead;
  private onUnread;
  private onSeen;
  private onArchived;
  private onUnarchived;
  constructor(novu: NovuClient, options?: NovuAdapterOptions);
  setup(context: NotificationsAdapterContext): void;
  dispose(): void;
}
//#endregion
export { KnockFeed, KnockFeedItem, KnockNotificationsAdapter, NotificationInput, NotificationSeverity, NotificationTicket, NotificationTicketInput, NotificationsAdapter, NotificationsAdapterContext, NotificationsContext, NotificationsOptions, NotificationsPluginOptions, NovuAdapterOptions, NovuClient, NovuNotification, NovuNotificationsAdapter, createNotifications, createNotificationsContext, createNotificationsPlugin, useNotifications };