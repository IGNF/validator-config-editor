import { a as ID, c as V0ErrorCode, l as V0ErrorDetails, r as DeepPartial } from "./index-XNZrgWCq.mjs";
//#region src/utilities/color.d.ts
interface RGB {
  r: number;
  g: number;
  b: number;
  a?: number;
}
declare function hexToRgb(hex: string): RGB;
declare function rgbToHex({ r, g, b, a }: RGB): string;
//#endregion
//#region src/utilities/apca.d.ts
declare function apca(text: RGB, background: RGB): number;
declare function foreground(hex: string): string;
//#endregion
//#region src/utilities/diacritics.d.ts
/**
 * @module utilities/diacritics
 *
 * @remarks
 * Accent-folding search primitives. Pure string transforms — no DOM, no state,
 * no reactivity. Powers the `ignoreAccents` option of `toHighlight` and any
 * filter that wants a plain query to reach accented text.
 */
/**
 * A `[start, end]` index pair where `end` is exclusive (matches
 * `String.prototype.slice` convention).
 *
 * @example
 * ```ts
 * import type { MatchRange } from '@vuetify/v0'
 *
 * const ranges: MatchRange[] = [[0, 5], [12, 17]]
 * ```
 */
type MatchRange = readonly [number, number];
/**
 * Which side of a comparison has its accents folded before matching.
 *
 * - `'query'` — folds the query, so typing `café` finds plain `cafe`
 * - `'target'` — folds the text, so typing `cafe` finds accented `café`
 * - `true` — both sides fold, so any accent variant matches any other
 * - `false` — neither folds, exact match only
 *
 * `'query'` and `'target'` fold only one side, but a spelling that already
 * agrees on both sides still matches verbatim — folding one side never
 * hides a match the other side already has. They still don't fold each
 * other's accents together, so `café` won't match `cafè` under either.
 */
type IgnoreAccents = boolean | 'query' | 'target';
interface FindMatchRangesOptions {
  ignoreCase?: boolean;
  ignoreAccents?: IgnoreAccents;
  matchAll?: boolean;
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
declare function findMatchRanges(text: string, query: string, options?: FindMatchRangesOptions): MatchRange[];
//#endregion
//#region src/utilities/errors.d.ts
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
declare class V0Error extends Error {
  name: string;
  readonly code: V0ErrorCode;
  readonly key?: string | symbol;
  readonly plugin?: string;
  readonly palette?: string;
  readonly seed?: string;
  readonly variant?: string;
  readonly adapter?: string;
  readonly prefix?: string;
  constructor(message: string, details: V0ErrorDetails & {
    cause?: unknown;
  });
}
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
declare function isV0Error<C extends V0ErrorCode>(value: unknown, code?: C): value is V0Error & Extract<V0ErrorDetails, {
  code: C;
}>;
//#endregion
//#region src/utilities/helpers.d.ts
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
declare function isFunction(item: unknown): item is Function;
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
declare function isString(item: unknown): item is string;
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
declare function isNumber(item: unknown): item is number;
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
declare function isBoolean(item: unknown): item is boolean;
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
declare function isObject(item: unknown): item is Record<string, any>;
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
declare function isThenable(item: unknown): item is {
  then: Function;
};
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
declare function isArray<T>(item: T | NoInfer<T[]>): item is 0 extends (1 & T) ? T[] : [Extract<T, readonly unknown[]>] extends [never] ? T & unknown[] : Extract<T, readonly unknown[]>;
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
declare function isElement(item: unknown): item is Element;
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
declare function getActiveElement(): Element | null;
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
declare function isNull(item: unknown): item is null;
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
declare function isNullOrUndefined(item: unknown): item is null | undefined;
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
declare function isUndefined(item: unknown): item is undefined;
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
declare function isPrimitive(item: unknown): item is string | number | boolean;
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
declare function isSymbol(item: unknown): item is symbol;
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
declare function isNaN(item: unknown): item is number;
declare const UNSAFE_KEYS: Set<string>;
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
declare function mergeDeep<T extends object>(target: T, ...sources: DeepPartial<T>[]): T;
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
declare function useId(): string;
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
declare function clamp(value: number, min?: number, max?: number): number;
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
declare function range(length: number, start?: number): number[];
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
declare function pxToNumber(value: string | undefined, fallback?: number): number;
/**
 * Resolves an iterable of IDs to their items via a getter,
 * filtering out any that return undefined.
 *
 * @internal
 */
declare function resolveIds<E>(ids: Iterable<ID>, getter: (id: ID) => E | undefined): E[];
/**
 * Extracts defined index values from an iterable of items.
 *
 * @internal
 */
declare function resolveIndexes(items: Iterable<{
  index?: number;
}>): number[];
//#endregion
//#region src/utilities/instance.d.ts
declare function instanceExists(): boolean;
declare function instanceName(): string | undefined;
//#endregion
export { MatchRange as A, resolveIds as C, isV0Error as D, V0Error as E, hexToRgb as F, rgbToHex as I, apca as M, foreground as N, FindMatchRangesOptions as O, RGB as P, range as S, useId as T, isSymbol as _, getActiveElement as a, mergeDeep as b, isElement as c, isNull as d, isNullOrUndefined as f, isString as g, isPrimitive as h, clamp as i, findMatchRanges as j, IgnoreAccents as k, isFunction as l, isObject as m, instanceName as n, isArray as o, isNumber as p, UNSAFE_KEYS as r, isBoolean as s, instanceExists as t, isNaN as u, isThenable as v, resolveIndexes as w, pxToNumber as x, isUndefined as y };