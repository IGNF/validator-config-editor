//#region src/constants/globals.d.ts
declare const IN_BROWSER: boolean;
declare const SUPPORTS_TOUCH: boolean;
declare const SUPPORTS_MATCH_MEDIA: boolean;
declare const SUPPORTS_OBSERVER: boolean;
declare const SUPPORTS_INTERSECTION_OBSERVER: boolean;
declare const SUPPORTS_MUTATION_OBSERVER: boolean;
declare const version: any;
declare const __LOGGER_ENABLED__: any;
//#endregion
//#region src/constants/htmlElements.d.ts
declare const selfClosingTags: ["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"];
/**
 * Set of HTML elements that are self-closing (void elements)
 * These elements cannot have children and don't need closing tags
 */
declare const SELF_CLOSING_TAGS: Set<"area" | "base" | "br" | "col" | "embed" | "hr" | "img" | "input" | "link" | "meta" | "source" | "track" | "wbr">;
/**
 * Check if an element is self-closing
 */
declare function isSelfClosingTag(tag: keyof HTMLElementTagNameMap): boolean;
/**
 * Type for all valid HTML element names
 */
type HTMLElementName = keyof HTMLElementTagNameMap;
/**
 * Type for self-closing HTML elements
 */
type SelfClosingElement = (typeof selfClosingTags)[number];
//#endregion
export { IN_BROWSER as a, SUPPORTS_MUTATION_OBSERVER as c, __LOGGER_ENABLED__ as d, version as f, isSelfClosingTag as i, SUPPORTS_OBSERVER as l, SELF_CLOSING_TAGS as n, SUPPORTS_INTERSECTION_OBSERVER as o, SelfClosingElement as r, SUPPORTS_MATCH_MEDIA as s, HTMLElementName as t, SUPPORTS_TOUCH as u };