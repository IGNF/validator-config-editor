import { s as __LOGGER_ENABLED__, t as IN_BROWSER } from "./globals-Bxw-y98v.mjs";
import { isUndefined } from "./utilities/index.mjs";
import { n as createPluginContext } from "./createPlugin-YYkwbiUd.mjs";
import { t as V0LoggerAdapter } from "./v0-CLrKU-7h.mjs";
//#region src/composables/useLogger/index.ts
/**
* @module useLogger
*
* @see https://0.vuetifyjs.com/composables/plugins/use-logger
*
* @remarks
* Logging composable with adapter pattern supporting console, consola, and pino.
*
* Key features:
* - Multiple log levels (trace, debug, info, warn, error, fatal)
* - Adapter pattern for console/consola/pino integration
* - Enable/disable logging
* - Fallback logger for undefined loggers
* - Context logging support
*
* Uses adapter pattern to abstract logging implementation.
*
* @example
* ```ts
* import { useLogger } from '@vuetify/v0'
*
* const logger = useLogger()
* logger.info('hello')
* logger.warn('careful')
* ```
*/
/**
* Creates a new logger instance.
*
* @param options The options for the logger instance.
* @returns A new logger instance.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-logger
*
* @example
* ```ts
* import { createLogger } from '@vuetify/v0'
*
* const logger = createLogger({
*   level: 'debug',
*   prefix: '[MyApp]',
* })
*
* logger.info('This is an info message')
* logger.debug('This is a debug message')
* logger.error('This is an error message')
* logger.level('debug')
* logger.debug('This debug message will now be logged')
* ```
*/
function createLogger(options = {}) {
	const { adapter = new V0LoggerAdapter({ prefix: options.prefix }), level: initialLevel = "info", enabled: initialEnabled = __LOGGER_ENABLED__ } = options;
	let currentLevel = initialLevel;
	let isEnabled = initialEnabled;
	function value(level) {
		return {
			trace: 0,
			debug: 1,
			info: 2,
			warn: 3,
			error: 4,
			fatal: 5,
			silent: 6
		}[level] ?? 2;
	}
	function can(level) {
		if (!isEnabled) return false;
		return value(level) >= value(currentLevel);
	}
	function format(message) {
		return message;
	}
	function debug(message, ...args) {
		if (can("debug")) adapter.debug(format(message), ...args);
	}
	function info(message, ...args) {
		if (can("info")) adapter.info(format(message), ...args);
	}
	function warn(message, ...args) {
		if (can("warn")) adapter.warn(format(message), ...args);
	}
	function error(message, ...args) {
		if (can("error")) adapter.error(format(message), ...args);
	}
	function trace(message, ...args) {
		if (can("trace")) adapter.trace?.(format(message), ...args);
	}
	function fatal(message, ...args) {
		if (can("fatal")) adapter.fatal?.(format(message), ...args);
	}
	function level(newLevel) {
		currentLevel = newLevel;
	}
	function current() {
		return currentLevel;
	}
	function enabled() {
		return isEnabled;
	}
	function enable() {
		isEnabled = true;
	}
	function disable() {
		isEnabled = false;
	}
	return {
		debug,
		info,
		warn,
		error,
		trace,
		fatal,
		level,
		current,
		enabled,
		enable,
		disable
	};
}
const NAMESPACE = "v0:logger";
function createFallbackLogger(namespace = NAMESPACE) {
	function format(message, type) {
		return `[${namespace} ${type}] ${message}`;
	}
	return {
		debug: (message, ...args) => console.debug(format(message, "debug"), ...args),
		info: (message, ...args) => console.info(format(message, "info"), ...args),
		warn: (message, ...args) => console.warn(format(message, "warn"), ...args),
		error: (message, ...args) => console.error(format(message, "error"), ...args),
		trace: (message, ...args) => console.trace(format(message, "trace"), ...args),
		fatal: (message, ...args) => console.error(format(message, "fatal"), ...args),
		level: () => {},
		current: () => "info",
		enabled: () => true,
		enable: () => {},
		disable: () => {}
	};
}
/**
* Creates a new logger context.
*
* @param options The options for the logger context.
* @template E The type of the logger context.
* @returns A new logger context.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-logger
*
* @example
* ```ts
* import { createLoggerContext } from '@vuetify/v0'
*
* export const [useAppLogger, provideAppLogger, appLogger] = createLoggerContext({
*   namespace: 'app:logger',
*   level: 'debug',
* })
* ```
*/
const [createLoggerContext, createLoggerPlugin, useLoggerContext] = createPluginContext(NAMESPACE, (options) => createLogger(options), {
	fallback: (ns) => createFallbackLogger(ns),
	setup: (context, _app, _options) => {
		if (typeof (process.env.NODE_ENV !== "production") !== "undefined" && process.env.NODE_ENV !== "production" && IN_BROWSER) window.__v0Logger__ = context;
	}
});
function createScopedLogger(logger, scope) {
	const tag = `[${scope}]`;
	function wrap(method) {
		return (message, ...args) => method(`${tag} ${message}`, ...args);
	}
	return {
		...logger,
		debug: wrap(logger.debug),
		info: wrap(logger.info),
		warn: wrap(logger.warn),
		error: wrap(logger.error),
		trace: wrap(logger.trace),
		fatal: wrap(logger.fatal)
	};
}
/**
* Consumes the application logger provided by `createLoggerPlugin`.
*
* Call with no argument to use the configured logger as-is. Pass a scope key to get a
* logger that prefixes every message with a `[scope]` segment after the plugin prefix —
* useful for telling apart output from composables that share the app-level logger. A
* scoped logger shares the underlying logger's level, enabled state, and adapter; only
* the message prefix differs. A blank scope is treated as no scope.
*
* @param scope Optional per-caller scope key prefixed onto every message.
* @returns The application logger, or a scoped wrapper around it.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-logger
*
* @example
* ```ts
* import { useLogger } from '@vuetify/v0'
*
* const logger = useLogger('createKanban')
*
* logger.warn('drop rejected')
* // → [v0 warn] [createKanban] drop rejected
* ```
*/
function useLogger(scope) {
	const logger = useLoggerContext();
	return /* @__PURE__ */ isUndefined(scope) || !scope.trim() ? logger : createScopedLogger(logger, scope);
}
//#endregion
export { useLogger as i, createLoggerContext as n, createLoggerPlugin as r, createLogger as t };
