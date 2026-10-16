// Utilities
import { camelize, capitalize, Comment, Fragment, isProxy, isReactive, isRef, isVNode, reactive, shallowRef, toRaw, toRef, unref, watchEffect } from 'vue';
import { consoleError } from "./console.js";
import { IN_BROWSER } from "./globals.js"; // Types
import { isBoolean, isFunction, isNull, isNullOrUndefined, isNumber, isString, isUndefined } from "./v0.js";
export function getNestedValue(obj, path, fallback) {
  const last = path.length - 1;
  if (last < 0) return isUndefined(obj) ? fallback : obj;
  for (let i = 0; i < last; i++) {
    if (isNullOrUndefined(obj)) {
      return fallback;
    }
    obj = obj[path[i]];
  }
  if (isNullOrUndefined(obj)) return fallback;
  return obj[path[last]] === undefined ? fallback : obj[path[last]];
}
export function getObjectValueByPath(obj, path, fallback) {
  // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
  if (isNullOrUndefined(obj) || !path || !isString(path)) return fallback;
  if (!isUndefined(obj[path])) return obj[path];
  path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  path = path.replace(/^\./, ''); // strip a leading dot
  return getNestedValue(obj, path.split('.'), fallback);
}
export function getPropertyFromItem(item, property, fallback) {
  if (property === true) return isUndefined(item) ? fallback : item;
  if (isNullOrUndefined(property) || isBoolean(property)) return fallback;
  if (item !== Object(item)) {
    if (!isFunction(property)) return fallback;
    const value = property(item, fallback);
    return typeof value === 'undefined' ? fallback : value;
  }
  if (isString(property)) return getObjectValueByPath(item, property, fallback);
  if (Array.isArray(property)) return getNestedValue(item, property, fallback);
  if (!isFunction(property)) return fallback;
  const value = property(item, fallback);
  return typeof value === 'undefined' ? fallback : value;
}
export function getZIndex(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return 0;
  const index = Number(window.getComputedStyle(el).getPropertyValue('z-index'));
  if (!index) return getZIndex(el.parentNode);
  return index;
}
export function isPercentage(value) {
  return isString(value) && value.endsWith('%');
}
export function resolveSize(value, spanSize = 0) {
  return isPercentage(value) ? parseFloat(value) / 100 * spanSize : parseFloat(String(value)) || 0;
}
export function convertToUnit(str, unit = 'px') {
  if (isNullOrUndefined(str) || str === '') {
    return undefined;
  }
  const num = Number(str);
  if (isNaN(num)) {
    return String(str);
  } else if (!isFinite(num)) {
    return undefined;
  } else {
    return `${num}${unit}`;
  }
}
export function isPlainObject(obj) {
  let proto;
  return !!obj && typeof obj === 'object' && ((proto = Object.getPrototypeOf(obj)) === Object.prototype || !proto);
}
export function refElement(obj) {
  if (obj && '$el' in obj) {
    const el = obj.$el;
    if (el?.nodeType === Node.TEXT_NODE) {
      // Multi-root component, use the first element
      return el.nextElementSibling;
    }
    return el;
  }
  return obj;
}

// KeyboardEvent.keyCode aliases
export const keyCodes = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34,
  shift: 16
});
export const keyValues = Object.freeze({
  enter: 'Enter',
  tab: 'Tab',
  delete: 'Delete',
  esc: 'Escape',
  space: 'Space',
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  end: 'End',
  home: 'Home',
  del: 'Delete',
  backspace: 'Backspace',
  insert: 'Insert',
  pageup: 'PageUp',
  pagedown: 'PageDown',
  shift: 'Shift'
});
export function keys(o) {
  return Object.keys(o);
}
export function has(obj, key) {
  return key.every(k => obj.hasOwnProperty(k));
}
// Array of keys
export function pick(obj, paths) {
  const found = {};
  for (const key of paths) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      found[key] = obj[key];
    }
  }
  return found;
}

// Array of keys

// Array of keys or RegExp to test keys against

export function pickWithRest(obj, paths, exclude) {
  const found = Object.create(null);
  const rest = Object.create(null);
  for (const key in obj) {
    if (paths.some(path => path instanceof RegExp ? path.test(key) : path === key) && !exclude?.some(path => path === key)) {
      found[key] = obj[key];
    } else {
      rest[key] = obj[key];
    }
  }
  return [found, rest];
}
export function omit(obj, exclude) {
  const clone = {
    ...obj
  };
  exclude.forEach(prop => delete clone[prop]);
  return clone;
}
const onRE = /^on[^a-z]/;
export const isOn = key => onRE.test(key);
const bubblingEvents = ['onAfterscriptexecute', 'onAnimationcancel', 'onAnimationend', 'onAnimationiteration', 'onAnimationstart', 'onAuxclick', 'onBeforeinput', 'onBeforescriptexecute', 'onChange', 'onClick', 'onCompositionend', 'onCompositionstart', 'onCompositionupdate', 'onContextmenu', 'onCopy', 'onCut', 'onDblclick', 'onFocusin', 'onFocusout', 'onFullscreenchange', 'onFullscreenerror', 'onGesturechange', 'onGestureend', 'onGesturestart', 'onGotpointercapture', 'onInput', 'onKeydown', 'onKeypress', 'onKeyup', 'onLostpointercapture', 'onMousedown', 'onMousemove', 'onMouseout', 'onMouseover', 'onMouseup', 'onMousewheel', 'onPaste', 'onPointercancel', 'onPointerdown', 'onPointerenter', 'onPointerleave', 'onPointermove', 'onPointerout', 'onPointerover', 'onPointerup', 'onReset', 'onSelect', 'onSubmit', 'onTouchcancel', 'onTouchend', 'onTouchmove', 'onTouchstart', 'onTransitioncancel', 'onTransitionend', 'onTransitionrun', 'onTransitionstart', 'onWheel'];
const compositionIgnoreKeys = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', 'Enter', 'Escape', 'Tab', ' '];
export function isComposingIgnoreKey(e) {
  return e.isComposing && compositionIgnoreKeys.includes(e.key);
}

/**
 * Filter attributes that should be applied to
 * the root element of an input component. Remaining
 * attributes should be passed to the <input> element inside.
 */
export function filterInputAttrs(attrs) {
  const [events, props] = pickWithRest(attrs, [onRE]);
  const inputEvents = omit(events, bubblingEvents);
  const [rootAttrs, inputAttrs] = pickWithRest(props, ['class', 'style', 'id', 'inert', /^data-/]);
  Object.assign(rootAttrs, events);
  Object.assign(inputAttrs, inputEvents);
  return [rootAttrs, inputAttrs];
}

/**
 * Returns the set difference of B and A, i.e. the set of elements in B but not in A
 */
export function arrayDiff(a, b) {
  const diff = [];
  for (let i = 0; i < b.length; i++) {
    if (!a.includes(b[i])) diff.push(b[i]);
  }
  return diff;
}
export function wrapInArray(v) {
  return isNullOrUndefined(v) ? [] : Array.isArray(v) ? v : [v];
}
export function defaultFilter(value, search, item) {
  return !isNullOrUndefined(value) && !isNullOrUndefined(search) && !isBoolean(value) && value.toString().toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1;
}
export function debounce(fn, delay) {
  let timeoutId = 0;
  const wrap = (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), unref(delay));
  };
  wrap.clear = () => {
    clearTimeout(timeoutId);
  };
  wrap.immediate = fn;
  return wrap;
}
export function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}
export function getDecimals(value) {
  const trimmedStr = value.toString().trim();
  return trimmedStr.includes('.') ? trimmedStr.length - trimmedStr.indexOf('.') - 1 : 0;
}
export function padEnd(str, length, char = '0') {
  return str + char.repeat(Math.max(0, length - str.length));
}
export function padStart(str, length, char = '0') {
  return char.repeat(Math.max(0, length - str.length)) + str;
}
export function chunk(str, size = 1) {
  const chunked = [];
  let index = 0;
  while (index < str.length) {
    chunked.push(str.substr(index, size));
    index += size;
  }
  return chunked;
}
export function chunkArray(array, size = 1) {
  return Array.from({
    length: Math.ceil(array.length / size)
  }, (v, i) => array.slice(i * size, i * size + size));
}
export function humanReadableFileSize(bytes, base = 1000) {
  if (bytes < base) {
    return `${bytes} B`;
  }
  const prefix = base === 1024 ? ['Ki', 'Mi', 'Gi'] : ['k', 'M', 'G'];
  let unit = -1;
  while (Math.abs(bytes) >= base && unit < prefix.length - 1) {
    bytes /= base;
    ++unit;
  }
  return `${bytes.toFixed(1)} ${prefix[unit]}B`;
}
export function mergeDeep(source = {}, target = {}, arrayFn, targetCondition) {
  const out = {};
  for (const key in source) {
    out[key] = source[key];
  }
  for (const key in target) {
    const targetProperty = target[key];
    if (targetCondition && !targetCondition(key, targetProperty)) {
      continue;
    }
    const sourceProperty = source[key];

    // Only continue deep merging if
    // both properties are plain objects
    if (isPlainObject(sourceProperty) && isPlainObject(targetProperty)) {
      out[key] = mergeDeep(sourceProperty, targetProperty, arrayFn, targetCondition);
      continue;
    }
    if (arrayFn && Array.isArray(sourceProperty) && Array.isArray(targetProperty)) {
      out[key] = arrayFn(sourceProperty, targetProperty);
      continue;
    }
    out[key] = targetProperty;
  }
  return out;
}
export function flattenFragments(nodes) {
  return nodes.map(node => {
    if (node.type === Fragment) {
      return flattenFragments(node.children);
    } else {
      return node;
    }
  }).flat();
}
export function toKebabCase(str = '') {
  if (toKebabCase.cache.has(str)) return toKebabCase.cache.get(str);
  const kebab = str.replace(/[^a-z]/gi, '-').replace(/\B([A-Z])/g, '-$1').toLowerCase();
  toKebabCase.cache.set(str, kebab);
  return kebab;
}
toKebabCase.cache = new Map();
export function findChildrenWithProvide(key, vnode) {
  if (!vnode || typeof vnode !== 'object') return [];
  if (Array.isArray(vnode)) {
    return vnode.map(child => findChildrenWithProvide(key, child)).flat(1);
  } else if (vnode.suspense) {
    return findChildrenWithProvide(key, vnode.ssContent);
  } else if (Array.isArray(vnode.children)) {
    return vnode.children.map(child => findChildrenWithProvide(key, child)).flat(1);
  } else if (vnode.component) {
    if (Object.getOwnPropertyDescriptor(vnode.component.provides, key)) {
      return [vnode.component];
    } else if (vnode.component.subTree) {
      return findChildrenWithProvide(key, vnode.component.subTree).flat(1);
    }
  }
  return [];
}
export class CircularBuffer {
  #arr = [];
  #pointer = 0;
  constructor(size) {
    this.size = size;
  }
  get isFull() {
    return this.#arr.length === this.size;
  }
  push(val) {
    this.#arr[this.#pointer] = val;
    this.#pointer = (this.#pointer + 1) % this.size;
  }
  values() {
    return this.#arr.slice(this.#pointer).concat(this.#arr.slice(0, this.#pointer));
  }
  clear() {
    this.#arr.length = 0;
    this.#pointer = 0;
  }
}
export function getEventCoordinates(e) {
  if ('touches' in e) {
    return {
      clientX: e.touches[0].clientX,
      clientY: e.touches[0].clientY
    };
  }
  return {
    clientX: e.clientX,
    clientY: e.clientY
  };
}

// Only allow a single return type

/**
 * Convert a computed ref to a record of refs.
 * The getter function must always return an object with the same keys.
 */

export function destructComputed(getter) {
  const refs = reactive({});
  watchEffect(() => {
    const base = getter();
    for (const key in base) {
      refs[key] = base[key];
    }
  }, {
    flush: 'sync'
  });
  const obj = {};
  for (const key in refs) {
    obj[key] = toRef(() => refs[key]);
  }
  return obj;
}

/** Array.includes but value can be any type */
export function includes(arr, val) {
  return arr.includes(val);
}
export function eventName(propName) {
  return propName[2].toLowerCase() + propName.slice(3);
}

// TODO: this should be an array but vue's types don't accept arrays: vuejs/core#8025

export const EventProp = () => [Function, Array];
export function hasEvent(props, name) {
  name = 'on' + capitalize(name);
  return !!(props[name] || props[`${name}Once`] || props[`${name}Capture`] || props[`${name}OnceCapture`] || props[`${name}CaptureOnce`]);
}
export function callEvent(handler, ...args) {
  if (Array.isArray(handler)) {
    for (const h of handler) {
      h(...args);
    }
  } else if (isFunction(handler)) {
    handler(...args);
  }
}
export function focusableChildren(el, filterByTabIndex = true) {
  const targets = ['button', '[href]', 'input:not([type="hidden"])', 'select', 'textarea', 'details:not(:has(> summary))', 'details > summary', '[tabindex]', '[contenteditable]:not([contenteditable="false"])', 'audio[controls]', 'video[controls]'].map(s => `${s}${filterByTabIndex ? ':not([tabindex="-1"])' : ''}:not([disabled], [inert])`).join(', ');
  let elements;
  try {
    elements = [...el.querySelectorAll(targets)];
  } catch (err) {
    consoleError(String(err));
    return [];
  }
  return elements.filter(x => !x.closest('[inert]')) // does not have inert parent
  .filter(x => !!x.offsetParent || x.getClientRects().length > 0) // is rendered
  .filter(x => !x.parentElement?.closest('details:not([open])') || x.tagName === 'SUMMARY' && x.parentElement?.tagName === 'DETAILS');
}
export function getActiveElement() {
  let active = document.activeElement;
  while (active?.shadowRoot?.activeElement) {
    active = active.shadowRoot.activeElement;
  }
  return active;
}
export function getNextElement(elements, location, condition) {
  let _el;
  let idx = elements.indexOf(getActiveElement());
  if (idx < 0) {
    const focusTarget = location === 'prev' ? elements.at(-1) : elements[0];
    const focusTargetRole = focusTarget?.getAttribute('role') ?? '';
    if (['option', 'listbox'].includes(focusTargetRole)) {
      idx = elements.findIndex(el => el.getAttribute('role') === 'option' && el.getAttribute('aria-selected') === 'true');
    }
  }
  const inc = location === 'next' ? 1 : -1;
  do {
    idx += inc;
    _el = elements[idx];
  } while ((!_el || !_el.offsetParent || !(condition?.(_el) ?? true)) && idx < elements.length && idx >= 0);
  return _el;
}
export function focusChild(el, location, options) {
  const focusable = focusableChildren(el);
  if (isNullOrUndefined(location)) {
    const active = getActiveElement();
    if (el === active || !el.contains(active)) {
      focusable[0]?.focus(options);
    }
  } else if (location === 'first') {
    focusable[0]?.focus(options);
  } else if (location === 'last') {
    focusable.at(-1)?.focus(options);
  } else if (isNumber(location)) {
    focusable[location]?.focus(options);
  } else {
    const _el = getNextElement(focusable, location);
    if (_el) _el.focus(options);else focusChild(el, location === 'next' ? 'first' : 'last', options);
  }
}
export function isEmpty(val) {
  return isNull(val) || isUndefined(val) || isString(val) && val.trim() === '';
}
export function noop() {}

/** Returns null if the selector is not supported or we can't check */
export function matchesSelector(el, selector) {
  const supportsSelector = IN_BROWSER && typeof CSS !== 'undefined' && typeof CSS.supports !== 'undefined' && CSS.supports(`selector(${selector})`);
  if (!supportsSelector) return null;
  try {
    return !!el && el.matches(selector);
  } catch (err) {
    return null;
  }
}
export function isAutofill(e) {
  return !e.isTrusted || !!matchesSelector(e.target, ':autofill') || !!matchesSelector(e.target, ':-webkit-autofill');
}
export function ensureValidVNode(vnodes) {
  return vnodes.some(child => {
    if (!isVNode(child)) return true;
    if (child.type === Comment) return false;
    return child.type !== Fragment || ensureValidVNode(child.children);
  }) ? vnodes : null;
}
export function renderSlot(slot, props, fallback) {
  // TODO: check if slot returns elements: #18308
  return slot?.(props) ?? fallback?.(props);
}
export function defer(timeout, cb) {
  if (!IN_BROWSER || timeout === 0) {
    cb();
    return () => {};
  }
  const timeoutId = window.setTimeout(cb, timeout);
  return () => window.clearTimeout(timeoutId);
}
export function templateRef() {
  const el = shallowRef();
  const fn = target => {
    el.value = target;
  };
  Object.defineProperty(fn, 'value', {
    enumerable: true,
    get: () => el.value,
    set: val => el.value = val
  });
  Object.defineProperty(fn, 'el', {
    enumerable: true,
    get: () => refElement(el.value)
  });
  return fn;
}
export function checkPrintable(e) {
  const isPrintableChar = e.key.length === 1;
  const noModifier = !e.ctrlKey && !e.metaKey && !e.altKey;
  return isPrintableChar && noModifier;
}
export function isPrimitive(value) {
  return isString(value) || isNumber(value) || isBoolean(value) || typeof value === 'bigint';
}
export function escapeForRegex(sign) {
  return '\\^$*+?.()|{}[]'.includes(sign) ? `\\${sign}` : sign;
}
export function normalizeMinusSign(text) {
  return text.replace(/−/g, '-');
}
export function extractNumber(text, decimalDigitsLimit, decimalSeparator) {
  const onlyValidCharacters = new RegExp(`[\\d\\-${escapeForRegex(decimalSeparator)}]`);
  const cleanText = normalizeMinusSign(text).split('').filter(x => onlyValidCharacters.test(x)).filter((x, i, all) => i === 0 && /[-]/.test(x) ||
  // sign allowed at the start
  x === decimalSeparator && i === all.indexOf(x) ||
  // decimal separator allowed only once
  /\d/.test(x)).join('');
  if (decimalDigitsLimit === 0) {
    return cleanText.split(decimalSeparator)[0];
  }
  const decimalPart = new RegExp(`${escapeForRegex(decimalSeparator)}\\d`);
  if (isNumber(decimalDigitsLimit) && decimalPart.test(cleanText)) {
    const parts = cleanText.split(decimalSeparator);
    return [parts[0], parts[1].substring(0, decimalDigitsLimit)].join(decimalSeparator);
  }
  return cleanText;
}
export function camelizeProps(props) {
  const out = {};
  for (const prop in props) {
    out[camelize(prop)] = props[prop];
  }
  return out;
}
export function onlyDefinedProps(props) {
  const booleanAttributes = ['checked', 'disabled'];
  return Object.fromEntries(Object.entries(props).filter(([key, v]) => booleanAttributes.includes(key) ? !!v : !isUndefined(v)));
}
export function deepToRaw(value) {
  const objectIterator = input => {
    if (Array.isArray(input)) {
      return input.map(item => objectIterator(item));
    }
    if (isRef(input) || isReactive(input) || isProxy(input)) {
      return objectIterator(toRaw(input));
    }
    if (isPlainObject(input)) {
      return Object.keys(input).reduce((acc, key) => {
        acc[key] = objectIterator(input[key]);
        return acc;
      }, {});
    }
    return input;
  };
  return objectIterator(value);
}
//# sourceMappingURL=helpers.js.map