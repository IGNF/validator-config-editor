import { V0Error } from "./utilities/index.mjs";
import { t as LoggerAdapter } from "./adapter-B5mEUP5W.mjs";
//#region src/composables/useLogger/adapters/consola.ts
var ConsolaLoggerAdapter = class extends LoggerAdapter {
	consola;
	constructor(consolaInstance) {
		super();
		if (!consolaInstance) throw new V0Error("Consola instance is required for ConsolaLoggerAdapter", {
			code: "V0_ADAPTER_INSTANCE_MISSING",
			adapter: "ConsolaLoggerAdapter"
		});
		this.consola = consolaInstance;
	}
	debug(message, ...args) {
		this.consola.debug(message, ...args);
	}
	info(message, ...args) {
		this.consola.info(message, ...args);
	}
	warn(message, ...args) {
		this.consola.warn(message, ...args);
	}
	error(message, ...args) {
		this.consola.error(message, ...args);
	}
	trace(message, ...args) {
		if (this.consola.trace) this.consola.trace(message, ...args);
		else this.consola.debug(message, ...args);
	}
	fatal(message, ...args) {
		if (this.consola.fatal) this.consola.fatal(message, ...args);
		else this.consola.error("[FATAL]", message, ...args);
	}
};
//#endregion
export { ConsolaLoggerAdapter as t };
