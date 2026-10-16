/**
* Set of HTML elements that are self-closing (void elements)
* These elements cannot have children and don't need closing tags
*/
const SELF_CLOSING_TAGS = /* @__PURE__ */ new Set([
	"area",
	"base",
	"br",
	"col",
	"embed",
	"hr",
	"img",
	"input",
	"link",
	"meta",
	"source",
	"track",
	"wbr"
]);
/**
* Check if an element is self-closing
*/
/* #__NO_SIDE_EFFECTS__ */
function isSelfClosingTag(tag) {
	return SELF_CLOSING_TAGS.has(tag.toLowerCase());
}
//#endregion
export { isSelfClosingTag as n, SELF_CLOSING_TAGS as t };
