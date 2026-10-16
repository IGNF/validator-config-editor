//#region src/composables/useStorage/adapters/adapter.ts
var StorageAdapter = class {
	get length() {
		return 0;
	}
	key(_index) {
		return null;
	}
};
//#endregion
//#region src/composables/useStorage/adapters/memory.ts
/**
* In-memory storage adapter that extends the StorageAdapter abstract class.
* This adapter provides temporary storage that persists only for the current
* session and is useful for testing or when persistent storage is not available.
*/
var MemoryStorageAdapter = class extends StorageAdapter {
	store = /* @__PURE__ */ new Map();
	get length() {
		return this.store.size;
	}
	getItem(key) {
		return this.store.get(key) ?? null;
	}
	setItem(key, value) {
		this.store.set(key, value);
	}
	removeItem(key) {
		this.store.delete(key);
	}
	key(index) {
		return String(Array.from(this.store.keys())[index] ?? "");
	}
};
//#endregion
export { StorageAdapter as n, MemoryStorageAdapter as t };
