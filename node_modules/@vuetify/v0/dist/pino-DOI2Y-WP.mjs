import { V0Error, isObject } from "./utilities/index.mjs";
import { t as LoggerAdapter } from "./adapter-B5mEUP5W.mjs";
//#region src/composables/useLogger/adapters/pino.ts
var PinoLoggerAdapter = class extends LoggerAdapter {
	pino;
	constructor(pinoInstance) {
		super();
		if (!pinoInstance) throw new V0Error("Pino instance is required for PinoLoggerAdapter", {
			code: "V0_ADAPTER_INSTANCE_MISSING",
			adapter: "PinoLoggerAdapter"
		});
		this.pino = pinoInstance;
	}
	debug(message, ...args) {
		this.pino.debug(this.format(message, ...args));
	}
	info(message, ...args) {
		this.pino.info(this.format(message, ...args));
	}
	warn(message, ...args) {
		this.pino.warn(this.format(message, ...args));
	}
	error(message, ...args) {
		this.pino.error(this.format(message, ...args));
	}
	trace(message, ...args) {
		this.pino.trace(this.format(message, ...args));
	}
	fatal(message, ...args) {
		this.pino.fatal(this.format(message, ...args));
	}
	format(message, ...args) {
		if (args.length === 0) return { msg: message };
		if (args.length === 1 && /* @__PURE__ */ isObject(args[0])) return {
			...args[0],
			msg: message
		};
		return {
			msg: message,
			args
		};
	}
};
//#endregion
export { PinoLoggerAdapter as t };
