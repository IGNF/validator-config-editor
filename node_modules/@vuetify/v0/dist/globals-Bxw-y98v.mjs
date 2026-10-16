//#region src/constants/globals.ts
const IN_BROWSER = typeof window !== "undefined";
const SUPPORTS_TOUCH = IN_BROWSER && ("ontouchstart" in window || window.navigator.maxTouchPoints > 0);
const SUPPORTS_MATCH_MEDIA = IN_BROWSER && "matchMedia" in window && typeof window.matchMedia === "function";
const SUPPORTS_OBSERVER = IN_BROWSER && "ResizeObserver" in window;
const SUPPORTS_INTERSECTION_OBSERVER = IN_BROWSER && "IntersectionObserver" in window;
const SUPPORTS_MUTATION_OBSERVER = IN_BROWSER && "MutationObserver" in window;
const version = "1.2.3";
/* v8 ignore next -- build-time constant, __DEV__ short-circuits in tests */
const __LOGGER_ENABLED__ = typeof (process.env.NODE_ENV !== "production") !== "undefined" && process.env.NODE_ENV !== "production" || typeof process.env.VITE_LOGGER_ENABLED !== "undefined" && process.env.VITE_LOGGER_ENABLED === "true";
//#endregion
export { SUPPORTS_OBSERVER as a, version as c, SUPPORTS_MUTATION_OBSERVER as i, SUPPORTS_INTERSECTION_OBSERVER as n, SUPPORTS_TOUCH as o, SUPPORTS_MATCH_MEDIA as r, __LOGGER_ENABLED__ as s, IN_BROWSER as t };
