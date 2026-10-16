import { t as IN_BROWSER } from "./globals-Bxw-y98v.mjs";
import { isFunction } from "./utilities/index.mjs";
import { t as LoggerAdapter } from "./adapter-B5mEUP5W.mjs";
//#region src/composables/useLogger/adapters/v0.ts
/**
* V0 logger adapter implementation
*
* This adapter provides console-based logging with proper formatting,
* color coding, timestamps, and log level filtering for development
* and production environments.
*/
var V0LoggerAdapter = class extends LoggerAdapter {
	prefix;
	colors;
	timestamps;
	constructor(options = {}) {
		super();
		this.prefix = options.prefix || "v0";
		this.colors = options.colors !== false;
		this.timestamps = options.timestamps !== false;
	}
	debug(message, ...args) {
		this.log("debug", "debug", message, ...args);
	}
	info(message, ...args) {
		this.log("info", "info", message, ...args);
	}
	warn(message, ...args) {
		this.log("warn", "warn", message, ...args);
	}
	error(message, ...args) {
		this.log("error", "error", message, ...args);
	}
	trace(message, ...args) {
		this.log("trace", "trace", message, ...args);
	}
	fatal(message, ...args) {
		this.log("fatal", "error", message, ...args);
	}
	format(level, message, ...args) {
		return [[
			this.timestamps ? this.timestamp() : "",
			`[${this.prefix} ${level.toLowerCase()}]`,
			message
		].filter(Boolean).join(" "), ...args];
	}
	timestamp() {
		if (!IN_BROWSER) return (/* @__PURE__ */ new Date()).toISOString();
		/* v8 ignore next -- defensive fallback, toTimeString always returns valid format */
		return (/* @__PURE__ */ new Date()).toTimeString().split(" ")[0] ?? "";
	}
	style(level) {
		if (!this.colors || !IN_BROWSER) return "";
		/* v8 ignore next -- LogLevel union is exhaustive */
		return {
			trace: "color: #64748b",
			debug: "color: #3b82f6",
			info: "color: #10b981",
			warn: "color: #f59e0b",
			error: "color: #ef4444",
			fatal: "color: #dc2626; font-weight: bold",
			silent: ""
		}[level] || "";
	}
	log(level, method, message, ...args) {
		const [formattedMessage, ...restArgs] = this.format(level, message, ...args);
		const style = this.style(level);
		if (IN_BROWSER && style && /* @__PURE__ */ isFunction(console[method])) console[method](`%c${formattedMessage}`, style, ...restArgs);
		else if (/* @__PURE__ */ isFunction(console[method])) console[method](formattedMessage, ...restArgs);
	}
};
//#endregion
export { V0LoggerAdapter as t };
