import { t as LoggerAdapter } from "./adapter-CHvvxw4c.mjs";
//#region src/composables/useLogger/adapters/consola.d.ts
declare class ConsolaLoggerAdapter extends LoggerAdapter {
  private consola;
  constructor(consolaInstance: LoggerAdapter | null | undefined);
  debug(message: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
  trace(message: string, ...args: unknown[]): void;
  fatal(message: string, ...args: unknown[]): void;
}
//#endregion
export { ConsolaLoggerAdapter as t };