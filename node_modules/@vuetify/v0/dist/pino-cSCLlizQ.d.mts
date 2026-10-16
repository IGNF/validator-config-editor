import { t as LoggerAdapter } from "./adapter-CHvvxw4c.mjs";
//#region src/composables/useLogger/adapters/pino.d.ts
/**
 * Pino logger adapter implementation
 *
 * This adapter integrates with the Pino logging library,
 * providing high-performance structured logging optimized
 * for Node.js applications with minimal overhead.
 */
interface PinoInstance {
  debug: (obj: Record<string, unknown>) => void;
  info: (obj: Record<string, unknown>) => void;
  warn: (obj: Record<string, unknown>) => void;
  error: (obj: Record<string, unknown>) => void;
  trace: (obj: Record<string, unknown>) => void;
  fatal: (obj: Record<string, unknown>) => void;
}
declare class PinoLoggerAdapter extends LoggerAdapter {
  private pino;
  constructor(pinoInstance: PinoInstance | null | undefined);
  debug(message: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
  trace(message: string, ...args: unknown[]): void;
  fatal(message: string, ...args: unknown[]): void;
  private format;
}
//#endregion
export { PinoLoggerAdapter as n, PinoInstance as t };