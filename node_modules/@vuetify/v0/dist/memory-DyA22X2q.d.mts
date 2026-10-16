//#region src/composables/useStorage/adapters/adapter.d.ts
declare abstract class StorageAdapter {
  get length(): number;
  key(_index: number): string | null;
  abstract getItem(key: string): string | null;
  abstract setItem(key: string, value: string): void;
  abstract removeItem(key: string): void;
}
//#endregion
//#region src/composables/useStorage/adapters/memory.d.ts
/**
 * In-memory storage adapter that extends the StorageAdapter abstract class.
 * This adapter provides temporary storage that persists only for the current
 * session and is useful for testing or when persistent storage is not available.
 */
declare class MemoryStorageAdapter extends StorageAdapter {
  private store;
  get length(): number;
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  key(index: number): string;
}
//#endregion
export { StorageAdapter as n, MemoryStorageAdapter as t };