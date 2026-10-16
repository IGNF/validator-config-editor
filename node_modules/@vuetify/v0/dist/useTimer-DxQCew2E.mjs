import { t as IN_BROWSER } from "./globals-Bxw-y98v.mjs";
import { isUndefined } from "./utilities/index.mjs";
import { onScopeDispose, shallowRef, toValue } from "vue";
//#region src/composables/useTimer/index.ts
/**
* @module useTimer
*
* @see https://0.vuetifyjs.com/composables/system/use-timer
*
* @remarks
* A reactive timer composable with pause/resume support.
*
* Key features:
* - Start/stop/pause/resume controls
* - Reactive remaining time tracking
* - Reactive `duration` via `MaybeRefOrGetter` — read fresh on each `start()`
* - One-shot (default) or repeating mode
* - Automatic cleanup on scope disposal
* - SSR-safe
*
* @example
* ```ts
* import { useTimer } from '@vuetify/v0'
*
* const timer = useTimer(() => console.log('fired'), { duration: 5000 })
* timer.start()
* ```
*/
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
function useTimer(handler, options = {}) {
	const { duration = 1e3, repeat = false } = options;
	function resolveDuration() {
		return toValue(duration);
	}
	const remaining = shallowRef(resolveDuration());
	const isActive = shallowRef(false);
	const isPaused = shallowRef(false);
	let timeoutId;
	let trackingId;
	let startedAt = 0;
	let budget = remaining.value;
	function clearTimer() {
		if (!/* @__PURE__ */ isUndefined(timeoutId)) {
			globalThis.clearTimeout(timeoutId);
			timeoutId = void 0;
		}
	}
	function startTracking() {
		stopTracking();
		if (!IN_BROWSER) return;
		trackingId = globalThis.setInterval(() => {
			if (!isActive.value || isPaused.value) return;
			const elapsed = Date.now() - startedAt;
			remaining.value = Math.max(0, budget - elapsed);
		}, 100);
	}
	function stopTracking() {
		if (!/* @__PURE__ */ isUndefined(trackingId)) {
			globalThis.clearInterval(trackingId);
			trackingId = void 0;
		}
	}
	function fire() {
		clearTimer();
		stopTracking();
		handler();
		if (repeat) begin(resolveDuration());
		else {
			isActive.value = false;
			remaining.value = 0;
		}
	}
	function begin(ms) {
		clearTimer();
		stopTracking();
		budget = ms;
		startedAt = Date.now();
		remaining.value = ms;
		isActive.value = true;
		isPaused.value = false;
		timeoutId = globalThis.setTimeout(fire, ms);
		startTracking();
	}
	function start() {
		const ms = resolveDuration();
		if (ms < 0) return;
		begin(ms);
	}
	function stop() {
		clearTimer();
		stopTracking();
		isActive.value = false;
		isPaused.value = false;
		remaining.value = resolveDuration();
	}
	function pause() {
		if (!isActive.value || isPaused.value) return;
		const elapsed = Date.now() - startedAt;
		budget = Math.max(0, budget - elapsed);
		remaining.value = budget;
		clearTimer();
		stopTracking();
		isPaused.value = true;
	}
	function resume() {
		if (!isPaused.value) return;
		isPaused.value = false;
		startedAt = Date.now();
		timeoutId = globalThis.setTimeout(fire, budget);
		startTracking();
	}
	onScopeDispose(() => {
		clearTimer();
		stopTracking();
	}, true);
	return {
		start,
		stop,
		pause,
		resume,
		remaining,
		isActive,
		isPaused
	};
}
//#endregion
export { useTimer as t };
