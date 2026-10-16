import { t as IN_BROWSER } from "../globals-Bxw-y98v.mjs";
import * as Vue from "vue";
import { useId as useId$1 } from "vue";
//#region src/utilities/color.ts
/* #__NO_SIDE_EFFECTS__ */
function hexToRgb(hex) {
	const clean = hex.startsWith("#") ? hex.slice(1) : hex;
	if (clean.length === 3 || clean.length === 4) {
		const r = Number.parseInt(clean[0] + clean[0], 16);
		const g = Number.parseInt(clean[1] + clean[1], 16);
		const b = Number.parseInt(clean[2] + clean[2], 16);
		const a = clean.length === 4 ? Number.parseInt(clean[3] + clean[3], 16) : void 0;
		return /* @__PURE__ */ isUndefined(a) ? {
			r,
			g,
			b
		} : {
			r,
			g,
			b,
			a
		};
	}
	const r = Number.parseInt(clean.slice(0, 2), 16);
	const g = Number.parseInt(clean.slice(2, 4), 16);
	const b = Number.parseInt(clean.slice(4, 6), 16);
	const a = clean.length === 8 ? Number.parseInt(clean.slice(6, 8), 16) : void 0;
	return /* @__PURE__ */ isUndefined(a) ? {
		r,
		g,
		b
	} : {
		r,
		g,
		b,
		a
	};
}
/* #__NO_SIDE_EFFECTS__ */
function rgbToHex({ r, g, b, a }) {
	const hex = "#" + [
		r,
		g,
		b
	].map((c) => c.toString(16).padStart(2, "0")).join("");
	if (!/* @__PURE__ */ isUndefined(a)) return hex + a.toString(16).padStart(2, "0");
	return hex;
}
//#endregion
//#region src/utilities/apca.ts
const Rco = .2126729;
const Gco = .7151522;
const Bco = .072175;
const normBG = .56;
const normTXT = .57;
const revBG = .65;
const revTXT = .62;
const blkThrs = .022;
const blkClmp = 1.414;
const scaleBoW = 1.14;
const scaleWoB = 1.14;
const loBoWoffset = .027;
const loWoBoffset = .027;
const deltaYmin = 5e-4;
function linearize(channel) {
	const val = channel / 255;
	return val <= .04045 ? val / 12.92 : Math.pow((val + .055) / 1.055, 2.4);
}
function luminance(rgb) {
	return Rco * linearize(rgb.r) + Gco * linearize(rgb.g) + Bco * linearize(rgb.b);
}
function clamp$1(y) {
	return y > blkThrs ? y : y + Math.pow(blkThrs - y, blkClmp);
}
/* #__NO_SIDE_EFFECTS__ */
function apca(text, background) {
	const txtY = clamp$1(luminance(text));
	const bgY = clamp$1(luminance(background));
	if (Math.abs(bgY - txtY) < deltaYmin) return 0;
	let contrast;
	if (bgY > txtY) {
		contrast = (Math.pow(bgY, normBG) - Math.pow(txtY, normTXT)) * scaleBoW;
		return contrast < loBoWoffset ? 0 : (contrast - loBoWoffset) * 100;
	} else {
		contrast = (Math.pow(bgY, revBG) - Math.pow(txtY, revTXT)) * scaleWoB;
		return contrast > -.027 ? 0 : (contrast + loWoBoffset) * 100;
	}
}
const BLACK = {
	r: 0,
	g: 0,
	b: 0
};
const WHITE = {
	r: 255,
	g: 255,
	b: 255
};
/* #__NO_SIDE_EFFECTS__ */
function foreground(hex) {
	const rgb = /* @__PURE__ */ hexToRgb(hex);
	return Math.abs(/* @__PURE__ */ apca(BLACK, rgb)) > Math.abs(/* @__PURE__ */ apca(WHITE, rgb)) ? "#000000" : "#ffffff";
}
//#endregion
//#region src/utilities/diacritics.ts
const COMBINING_MARKS = /[\u0300-\u036F]/g;
const FINAL_SIGMA = /ς/g;
function lower(str) {
	return str.toLowerCase().replace(FINAL_SIGMA, "σ");
}
const SPECIAL_LETTERS = {
	ł: "l",
	ø: "o",
	đ: "d",
	ð: "d",
	þ: "th",
	ħ: "h",
	ŧ: "t",
	ŋ: "n",
	ß: "ss",
	æ: "ae",
	œ: "oe",
	ı: "i",
	Ł: "L",
	Ø: "O",
	Đ: "D",
	Ð: "D",
	Þ: "Th",
	Ħ: "H",
	Ŧ: "T",
	Ŋ: "N",
	ẞ: "Ss",
	Æ: "Ae",
	Œ: "Oe"
};
const SPECIAL_LETTER = /* @__PURE__ */ new RegExp(`[${Object.keys(SPECIAL_LETTERS).join("")}]`, "g");
function fold(str) {
	return str.normalize("NFD").replace(COMBINING_MARKS, "").replace(SPECIAL_LETTER, (char) => SPECIAL_LETTERS[char]);
}
function foldWithMap(str, ignoreCase, foldAccents) {
	let folded = "";
	const map = [];
	let index = 0;
	for (const char of str) {
		const raw = ignoreCase ? lower(char) : char;
		const chunk = foldAccents ? fold(raw) : raw;
		folded += chunk;
		for (let unit = 0; unit < chunk.length; unit++) map.push(index);
		index += char.length;
	}
	map.push(str.length);
	return {
		folded,
		map
	};
}
function collect(haystack, needle, matchAll) {
	const ranges = [];
	let index = haystack.indexOf(needle);
	while (index !== -1) {
		ranges.push([index, index + needle.length]);
		if (!matchAll) break;
		index = haystack.indexOf(needle, index + needle.length);
	}
	return ranges;
}
function remap(map, start, end) {
	const sourceStart = map[start];
	let sourceEnd = map[end];
	if (end > 0 && map[end] === map[end - 1]) {
		let index = end;
		const current = map[end];
		while (index < map.length && map[index] === current) index++;
		sourceEnd = map[index];
	}
	return [sourceStart, sourceEnd];
}
function project(ranges, map) {
	const projected = [];
	for (const [start, end] of ranges) {
		const span = remap(map, start, end);
		const last = projected.at(-1);
		if (!last || last[0] !== span[0] || last[1] !== span[1]) projected.push(span);
	}
	return projected;
}
function search(text, query, ignoreCase, foldQuery, foldTarget, matchAll) {
	const folded = foldQuery ? fold(query) : query;
	const needle = ignoreCase ? lower(folded) : folded;
	if (needle.length === 0) return [];
	if (!foldTarget) {
		if (!ignoreCase) return collect(text, needle, matchAll);
		const lowered = lower(text);
		if (lowered.length === text.length) return collect(lowered, needle, matchAll);
	}
	const { folded: haystack, map } = foldWithMap(text, ignoreCase, foldTarget);
	return project(collect(haystack, needle, matchAll), map);
}
function mergeRanges(a, b) {
	const combined = [...a, ...b].toSorted((x, y) => x[0] - y[0] || x[1] - y[1]);
	const merged = [];
	for (const range of combined) {
		const last = merged.at(-1);
		if (last && range[0] < last[1]) continue;
		merged.push(range);
	}
	return merged;
}
/**
* Finds `[start, end]` index pairs where `query` occurs in `text`, optionally
* folding accents on either side. Returned indices always address the original
* `text`, even when folding or case-conversion changed its length.
*
* Directional folding (`'query'` or `'target'`) only transforms one side, but
* a spelling that's already identical on both sides — accents and all — is
* merged in verbatim, so folding one side never hides a match the other side
* already has.
*
* @param text The string to search.
* @param query The term to look for. An empty query yields no ranges.
* @param options Optional `ignoreCase`, `ignoreAccents`, `matchAll`.
* @returns Ranges into `text`, where `end` is exclusive.
*
* @example
* ```ts
* import { findMatchRanges } from '@vuetify/v0'
*
* findMatchRanges('Zürich', 'zurich', { ignoreCase: true, ignoreAccents: true })
* // [[0, 6]]
*
* findMatchRanges('Łódź', 'Lo', { ignoreAccents: 'target' })
* // [[0, 2]]
*
* findMatchRanges('… Kraków …', 'Kraków', { ignoreAccents: 'query' })
* // [[2, 8]] — typing the exact accented name always finds itself
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function findMatchRanges(text, query, options = {}) {
	const { ignoreCase = false, ignoreAccents = false, matchAll = false } = options;
	const foldQuery = ignoreAccents === true || ignoreAccents === "query";
	const foldTarget = ignoreAccents === true || ignoreAccents === "target";
	if (foldQuery === foldTarget) return search(text, query, ignoreCase, foldQuery, foldTarget, matchAll);
	const merged = mergeRanges(search(text, query, ignoreCase, false, false, true), search(text, query, ignoreCase, foldQuery, foldTarget, true));
	return matchAll ? merged : merged.slice(0, 1);
}
//#endregion
//#region src/utilities/instance.ts
/**
* Vue 3.6+ exposes `currentInstance` for Vapor mode compatibility.
* `getCurrentInstance()` returns null in Vapor components by design,
* so we access `currentInstance` directly when available.
*
* Uses dynamic key to avoid bundler static analysis warnings.
*
* @see https://github.com/orgs/vuejs/discussions/13629
* @internal
*/
const INSTANCE_KEY = "currentInstance";
function getInstanceCompat() {
	const vueExports = Vue;
	if (INSTANCE_KEY in vueExports) return vueExports[INSTANCE_KEY];
	return Vue.getCurrentInstance();
}
/* #__NO_SIDE_EFFECTS__ */
function instanceExists() {
	return !/* @__PURE__ */ isNull(getInstanceCompat());
}
/* #__NO_SIDE_EFFECTS__ */
function instanceName() {
	return getInstanceCompat()?.type?.name;
}
//#endregion
//#region src/utilities/helpers.ts
/**
* @module utilities/helpers
*
* @remarks
* Collection of utility functions for type checking, object manipulation,
* and common transformations. All exports are tree-shakeable.
*/
/**
* Checks if a value is a function
*
* @param item The value to check
* @returns True if the value is a function
*
* @example
* ```ts
* isFunction(() => {})  // true
* isFunction('string')  // false
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function isFunction(item) {
	return typeof item === "function";
}
/**
* Checks if a value is a string
*
* @param item The value to check
* @returns True if the value is a string
*
* @example
* ```ts
* isString('hello')  // true
* isString(123)      // false
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function isString(item) {
	return typeof item === "string";
}
/**
* Checks if a value is a number
*
* @param item The value to check
* @returns True if the value is a number (including NaN)
*
* @example
* ```ts
* isNumber(123)       // true
* isNumber(NaN)       // true
* isNumber('123')     // false
* ```
*
* @see {@link isNaN} to check for NaN specifically
*/
/* #__NO_SIDE_EFFECTS__ */
function isNumber(item) {
	return typeof item === "number";
}
/**
* Checks if a value is a boolean
*
* @param item The value to check
* @returns True if the value is a boolean
*
* @example
* ```ts
* isBoolean(true)   // true
* isBoolean(false)  // true
* isBoolean(0)      // false
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function isBoolean(item) {
	return typeof item === "boolean";
}
/**
* Checks if a value is a plain object (excludes null and arrays)
*
* @param item The value to check
* @returns True if the value is a plain object
*
* @remarks
* Returns false for null and arrays, even though `typeof null === 'object'`
* and `typeof [] === 'object'` in JavaScript.
*
* `Record<string, any>` is load-bearing: TypeScript does not grant interfaces
* an implicit index signature, so `Record<string, unknown>` destroys known
* property types on interface-typed values and fails to subtract
* `Record<string, any>` members in the negative branch.
*
* @example
* ```ts
* isObject({})        // true
* isObject({ a: 1 })  // true
* isObject(null)      // false
* isObject([])        // false
* ```
*
* @see {@link isArray} to check for arrays
* @see {@link isNull} to check for null
*/
/* #__NO_SIDE_EFFECTS__ */
function isObject(item) {
	return typeof item === "object" && item !== null && !Array.isArray(item);
}
/**
* Checks if a value is a thenable (any object with a `.then` method).
* Duck-typed — matches both native Promises and any Promise-like.
*
* @param item The value to check
* @returns True if the value has a callable `then` property
*
* @example
* ```ts
* isThenable(Promise.resolve())     // true
* isThenable({ then: () => {} })    // true
* isThenable({})                    // false
* isThenable('string')              // false
* ```
*
* @remarks Use this when duck-typing async behavior — for example, rejecting
* a callback that returned a Promise-like when only synchronous returns are
* supported. If you specifically want native Promise instances, use
* `instanceof Promise` directly.
*/
/* #__NO_SIDE_EFFECTS__ */
function isThenable(item) {
	return /* @__PURE__ */ isObject(item) && "then" in item && /* @__PURE__ */ isFunction(item.then);
}
/**
* Checks if a value is an array
*
* @param item The value to check
* @returns True if the value is an array
*
* @example
* ```ts
* isArray([])        // true
* isArray([1, 2, 3]) // true
* isArray('string')  // false
* ```
*
* @remarks The guard keeps whichever array constituents the input already had —
* element types, tuple arity and `readonly` all survive, and the `else` branch
* drops exactly those constituents. Three branches, in order:
*
* 1. `0 extends (1 & T)` detects an `any` input and yields `T[]` (`any[]`),
*    matching `Array.isArray` so callback parameters stay contextually typed.
* 2. Nothing array-shaped to extract (an `unknown` value, say) falls back to
*    `unknown[]`, reproducing the previous narrowing so mutation and assignment
*    to `unknown[]` keep compiling.
* 3. Otherwise the array constituents of `T` pass through untouched.
*
* `NoInfer<T[]>` widens the parameter just enough for TypeScript to accept the
* first branch (a predicate must be assignable to its parameter's type) without
* letting an array argument capture the inference site.
*/
/* #__NO_SIDE_EFFECTS__ */
function isArray(item) {
	return Array.isArray(item);
}
/**
* Checks if a value is a DOM Element
*
* @param item The value to check
* @returns True if the value is a DOM Element
*
* @example
* ```ts
* isElement(document.body) // true
* isElement('string')      // false
* isElement(null)          // false
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function isElement(item) {
	return typeof Element !== "undefined" && item instanceof Element;
}
/**
* Resolve the deepest focused element, piercing open shadow roots.
*
* `document.activeElement` returns the shadow *host* when focus is inside an
* open shadow root — walk down through open roots so focus/keyboard logic
* resolves the real focused element (e.g. a control inside a custom element).
* Returns the same value as `document.activeElement` in light DOM, and `null`
* under SSR. Closed shadow roots can't be traversed.
*
* @example
* ```ts
* const active = getActiveElement()
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function getActiveElement() {
	if (!IN_BROWSER) return null;
	let active = document.activeElement;
	while (active?.shadowRoot?.activeElement) active = active.shadowRoot.activeElement;
	return active;
}
/**
* Checks if a value is null
*
* @param item The value to check
* @returns True if the value is null
*
* @example
* ```ts
* isNull(null)      // true
* isNull(undefined) // false
* ```
*
* @see {@link isUndefined} to check for undefined
* @see {@link isNullOrUndefined} to check for either
*/
/* #__NO_SIDE_EFFECTS__ */
function isNull(item) {
	return item === null;
}
/**
* Checks if a value is null or undefined
*
* @param item The value to check
* @returns True if the value is null or undefined
*
* @remarks
* Uses loose equality (`== null`) which matches both null and undefined.
*
* @example
* ```ts
* isNullOrUndefined(null)      // true
* isNullOrUndefined(undefined) // true
* isNullOrUndefined(0)         // false
* isNullOrUndefined('')        // false
* ```
*
* @see {@link isNull} to check for null only
* @see {@link isUndefined} to check for undefined only
*/
/* #__NO_SIDE_EFFECTS__ */
function isNullOrUndefined(item) {
	return item == null;
}
/**
* Checks if a value is undefined
*
* @param item The value to check
* @returns True if the value is undefined
*
* @example
* ```ts
* isUndefined(undefined) // true
* isUndefined(null)      // false
* ```
*
* @see {@link isNull} to check for null
* @see {@link isNullOrUndefined} to check for either
*/
/* #__NO_SIDE_EFFECTS__ */
function isUndefined(item) {
	return item === void 0;
}
/**
* Checks if a value is a primitive (string, number, or boolean)
*
* @param item The value to check
* @returns True if the value is a string, number, or boolean
*
* @example
* ```ts
* isPrimitive('hello') // true
* isPrimitive(123)     // true
* isPrimitive(true)    // true
* isPrimitive({})      // false
* isPrimitive(null)    // false
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function isPrimitive(item) {
	return typeof item === "string" || typeof item === "number" || typeof item === "boolean";
}
/**
* Checks if a value is a symbol
*
* @param item The value to check
* @returns True if the value is a symbol
*
* @example
* ```ts
* isSymbol(Symbol('test')) // true
* isSymbol('symbol')       // false
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function isSymbol(item) {
	return typeof item === "symbol";
}
/**
* Checks if a value is NaN (Not a Number)
*
* @param item The value to check
* @returns True if the value is NaN
*
* @remarks
* Uses `Number.isNaN()` which only returns true for the actual NaN value,
* unlike the global `isNaN()` which coerces the argument to a number first.
*
* @example
* ```ts
* isNaN(NaN)         // true
* isNaN(123)         // false
* isNaN('hello')     // false (unlike global isNaN)
* isNaN(undefined)   // false (unlike global isNaN)
* ```
*
* @see {@link isNumber} to check if a value is a number type
*/
/* #__NO_SIDE_EFFECTS__ */
function isNaN(item) {
	return /* @__PURE__ */ isNumber(item) && Number.isNaN(item);
}
const UNSAFE_KEYS = /* @__PURE__ */ new Set([
	"__proto__",
	"constructor",
	"prototype"
]);
function isPlainObject(value) {
	if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
	const proto = Object.getPrototypeOf(value);
	return proto === Object.prototype || proto === null;
}
/**
* Deeply merges source objects into a target object, returning a new object
*
* @param target The base object to merge into
* @param sources One or more source objects to merge from
* @returns A new merged object (inputs are not mutated)
*
* @remarks
* - Creates and returns a new object — inputs are never mutated
* - Nested objects are recursively merged
* - Arrays are replaced, not merged
* - Primitives from sources overwrite target values
*
* @example
* ```ts
* const target = { a: 1, b: { c: 2 } }
* const result = mergeDeep(target, { b: { d: 3 } })
* // result is { a: 1, b: { c: 2, d: 3 } }
* // target is unchanged
*
* // Multiple sources
* mergeDeep({}, { a: 1 }, { b: 2 }) // { a: 1, b: 2 }
*
* // Arrays are replaced
* mergeDeep({ arr: [1, 2] }, { arr: [3] }) // { arr: [3] }
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function mergeDeep(target, ...sources) {
	const out = {};
	for (const key in target) if (Object.hasOwn(target, key)) out[key] = target[key];
	for (const source of sources) {
		if (!/* @__PURE__ */ isObject(source)) continue;
		for (const key in source) {
			if (UNSAFE_KEYS.has(key)) continue;
			if (!Object.hasOwn(source, key)) continue;
			const sourceValue = source[key];
			if (/* @__PURE__ */ isUndefined(sourceValue)) continue;
			const targetValue = out[key];
			out[key] = isPlainObject(sourceValue) && isPlainObject(targetValue) ? /* @__PURE__ */ mergeDeep(targetValue, sourceValue) : sourceValue;
		}
	}
	return out;
}
let idCounter = 0;
/**
* Generates a unique ID, using Vue's useId when in component context
*
* @returns A unique string ID
*
* @remarks
* - In component setup/lifecycle: Uses Vue's `useId()` for SSR-safe hydration
* - Outside components: Falls back to sequential counter (`v0-0`, `v0-1`, ...)
* - Vapor mode compatible
* - IDs are sequential and predictable — intended for DOM `id`/ARIA wiring only.
*   Never use them as security tokens (CSRF tokens, session ids, capabilities).
*
* @example
* ```ts
* // In component setup - SSR safe
* const id = useId() // 'v:0', 'v:1', etc. (Vue's format)
*
* // Outside component - counter fallback
* const id = useId() // 'v0-0', 'v0-1', etc.
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function useId() {
	if (/* @__PURE__ */ instanceExists()) return useId$1();
	if (typeof (process.env.NODE_ENV !== "production") !== "undefined" && process.env.NODE_ENV !== "production" && !IN_BROWSER) console.warn("[v0 warn] useId() called outside component context during SSR. Provide explicit ID to avoid hydration mismatch.");
	return `v0-${idCounter++}`;
}
/**
* Clamps a value between a minimum and maximum
*
* @param value The value to clamp
* @param min The minimum value (default: 0)
* @param max The maximum value (default: 1)
* @returns The clamped value
*
* @example
* ```ts
* clamp(5, 0, 10)  // 5
* clamp(-5, 0, 10) // 0
* clamp(15, 0, 10) // 10
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function clamp(value, min = 0, max = 1) {
	if (!Number.isFinite(value)) return min;
	return Math.max(min, Math.min(max, value));
}
/**
* Creates an array of sequential numbers
*
* @param length The length of the array to create
* @param start The starting index (default: 0)
* @returns An array of sequential numbers
*
* @example
* ```ts
* range(3)     // [0, 1, 2]
* range(3, 1)  // [1, 2, 3]
* range(5, 10) // [10, 11, 12, 13, 14]
* range(0)     // []
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function range(length, start = 0) {
	return Array.from({ length }, (_, index) => start + index);
}
/**
* Parses a CSS pixel length into a number
*
* @param value The resolved CSS length, e.g. `getComputedStyle(el).marginLeft`
* @param fallback The value to return when `value` does not parse (default: 0)
* @returns The parsed number, or `fallback`
*
* @remarks
* Built for reading `getComputedStyle` output, where a length that does not
* apply resolves to `''` or `'auto'` rather than to a number. An unparseable
* length returns `fallback`; a length that legitimately parses to `0` returns
* `0`. That distinction is why this exists — `Number.parseFloat(v) || 0`
* collapses both cases onto `0`, which is only correct when the fallback is
* itself `0`.
*
* Only the leading number is read, matching `Number.parseFloat`, so any unit
* suffix is ignored. Values `getComputedStyle` never returns — percentages,
* `calc()` expressions, multi-value shorthands — are out of scope.
*
* @example
* ```ts
* pxToNumber('16px')          // 16
* pxToNumber('0px')           // 0
* pxToNumber('-4.5px')        // -4.5
* pxToNumber('auto')          // 0
* pxToNumber(undefined)       // 0
*
* // A non-zero fallback is the case `|| 0` cannot express
* pxToNumber('auto', 100)     // 100
* pxToNumber('0px', 100)      // 0
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function pxToNumber(value, fallback = 0) {
	if (!/* @__PURE__ */ isString(value)) return fallback;
	const parsed = Number.parseFloat(value);
	return /* @__PURE__ */ isNaN(parsed) ? fallback : parsed;
}
/**
* Resolves an iterable of IDs to their items via a getter,
* filtering out any that return undefined.
*
* @internal
*/
/* #__NO_SIDE_EFFECTS__ */
function resolveIds(ids, getter) {
	const result = [];
	for (const id of ids) {
		const item = getter(id);
		if (!/* @__PURE__ */ isUndefined(item)) result.push(item);
	}
	return result;
}
/**
* Extracts defined index values from an iterable of items.
*
* @internal
*/
/* #__NO_SIDE_EFFECTS__ */
function resolveIndexes(items) {
	const result = [];
	for (const item of items) {
		const index = item?.index;
		if (!/* @__PURE__ */ isUndefined(index)) result.push(index);
	}
	return result;
}
//#endregion
//#region src/utilities/errors.ts
/**
* @module utilities/errors
*
* @remarks
* Structured error class thrown by v0 internals. Pattern modeled on
* tRPC's `TRPCError` and Node's built-in `Error` codes — `code` is a
* top-level discriminant field on the error, *not* a payload nested
* inside `Error.cause`. `cause` stays reserved for wrapping the
* genuine upstream error so error trackers (Sentry's `LinkedErrors`,
* Datadog RUM, Rollbar) render the chain correctly.
*
* @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause
* @see https://nodejs.org/api/errors.html#nodejs-error-codes
* @see https://trpc.io/docs/server/error-handling
* @see https://docs.sentry.io/platforms/javascript/configuration/integrations/linkederrors/
*/
/**
* Structured error thrown by v0 internals.
*
* @remarks
* Carries a stable {@link V0ErrorCode} discriminant on `code` so
* consumers, devtools panels, and error trackers can identify the
* error without parsing the message string. Domain context lives in
* top-level fields per code (`key` for `V0_CONTEXT_MISSING`, `plugin`
* for `V0_PLUGIN_MISSING`), populated from a {@link V0ErrorDetails}
* argument and merged onto the instance at construction time.
*
* `cause` is forwarded to `Error`'s standard `ErrorOptions.cause` slot
* and is intended to carry a wrapped upstream error, not metadata.
*
* Prefer {@link isV0Error} over manual `instanceof` checks at the
* narrowing site — the guard intersects the instance type with the
* matching {@link V0ErrorDetails} arm, so per-code fields are typed.
*
* @example Author site
* ```ts
* throw new V0Error('Context not found.', { code: 'V0_CONTEXT_MISSING', key })
* ```
*
* @example Author site with upstream wrap
* ```ts
* try {
*   JSON.parse(raw)
* } catch (err) {
*   throw new V0Error('Failed to hydrate registry.', {
*     code: 'V0_CONTEXT_MISSING',
*     key: 'v0:registry',
*     cause: err,
*   })
* }
* ```
*
* @example Consumer site
* ```ts
* try {
*   useContext(myKey)
* } catch (err) {
*   if (isV0Error(err, 'V0_CONTEXT_MISSING')) {
*     console.log(err.key)
*   }
* }
* ```
*/
var V0Error = class extends Error {
	name = "V0Error";
	code;
	key;
	plugin;
	palette;
	seed;
	variant;
	adapter;
	prefix;
	constructor(message, details) {
		const { cause, ...rest } = details;
		super(message, /* @__PURE__ */ isUndefined(cause) ? void 0 : { cause });
		this.code = details.code;
		for (const [key, value] of Object.entries(rest)) {
			if (UNSAFE_KEYS.has(key)) continue;
			this[key] = value;
		}
	}
};
/**
* Type guard for v0-thrown errors.
*
* @param value The value to test.
* @param code Optional discriminant — narrow the result to a specific
*   {@link V0ErrorCode} so per-code fields become required.
*
* @remarks
* Without the optional `code` argument, the guard verifies the value
* is a {@link V0Error} instance. With the `code` argument, the guard
* also narrows the instance type to the intersection with the matching
* {@link V0ErrorDetails} arm — fields like `key` or `plugin` change
* from optional to required on the narrowed type.
*
* @example Narrow to any v0 error
* ```ts
* if (isV0Error(err)) {
*   console.log(err.code)
* }
* ```
*
* @example Narrow to a specific code
* ```ts
* if (isV0Error(err, 'V0_CONTEXT_MISSING')) {
*   console.log(err.key) // typed as string | symbol, not string | symbol | undefined
* }
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function isV0Error(value, code) {
	if (!(value instanceof V0Error)) return false;
	return /* @__PURE__ */ isUndefined(code) || value.code === code;
}
//#endregion
export { UNSAFE_KEYS, V0Error, apca, clamp, findMatchRanges, foreground, getActiveElement, hexToRgb, instanceExists, instanceName, isArray, isBoolean, isElement, isFunction, isNaN, isNull, isNullOrUndefined, isNumber, isObject, isPrimitive, isString, isSymbol, isThenable, isUndefined, isV0Error, mergeDeep, pxToNumber, range, resolveIds, resolveIndexes, rgbToHex, useId };
