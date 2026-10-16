import { t as IN_BROWSER } from "./globals-Bxw-y98v.mjs";
import { t as toArray } from "./toArray-DCZRopC6.mjs";
import { onScopeDispose, toValue, unref, watch } from "vue";
//#region src/composables/useEventListener/index.ts
/**
* @module useEventListener
*
* @see https://0.vuetifyjs.com/composables/system/use-event-listener
*
* @remarks
* Event listener composable with automatic cleanup on scope disposal.
*
* Key features:
* - Supports Window, Document, and HTMLElement targets
* - Reactive targets, events, and listeners
* - Event options support (capture, passive, once)
* - Automatic removeEventListener on unmount
* - Multiple overloads for type safety
*
* Perfect for safely managing event listeners in Vue components.
*
* @example
* ```ts
* import { useEventListener } from '@vuetify/v0'
*
* useEventListener(window, 'resize', () => {
*   console.log('window resized')
* })
* ```
*/
/**
* Attaches an event listener to a target.
*
* @param target The target to attach the event listener to.
* @param event The event to listen for.
* @param listener The event listener.
* @param options The event listener options.
* @returns A function to remove the event listener.
*
* @see https://0.vuetifyjs.com/composables/system/use-event-listener
*/
function useEventListener(target, event, listener, options) {
	const cleanups = [];
	function cleanup() {
		for (const fn of cleanups) fn();
		cleanups.length = 0;
	}
	function register(el, event, listener, options) {
		el.addEventListener(event, listener, options);
		return () => el.removeEventListener(event, listener, options);
	}
	const stopWatcher = watch(() => [
		toValue(target),
		toValue(event),
		unref(listener),
		toValue(options)
	], ([el, events, listeners, opts]) => {
		cleanup();
		if (!el) return;
		const eventList = /* @__PURE__ */ toArray(events);
		const listenerList = /* @__PURE__ */ toArray(listeners);
		for (const event of eventList) for (const listenerFn of listenerList) cleanups.push(register(el, event, listenerFn, opts));
	}, {
		immediate: true,
		flush: "post"
	});
	function stop() {
		stopWatcher();
		cleanup();
	}
	onScopeDispose(stop, true);
	return stop;
}
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
function useWindowEventListener(event, listener, options) {
	return IN_BROWSER ? useEventListener(window, event, listener, options) : () => {};
}
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
function useDocumentEventListener(event, listener, options) {
	return IN_BROWSER ? useEventListener(document, event, listener, options) : () => {};
}
//#endregion
export { useEventListener as n, useWindowEventListener as r, useDocumentEventListener as t };
