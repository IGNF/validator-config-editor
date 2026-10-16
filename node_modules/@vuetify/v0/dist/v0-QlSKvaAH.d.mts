import { t as LoggerAdapter } from "./adapter-CHvvxw4c.mjs";
//#region src/composables/useLogger/adapters/v0.d.ts
/**
 * V0 logger adapter implementation
 *
 * This adapter provides console-based logging with proper formatting,
 * color coding, timestamps, and log level filtering for development
 * and production environments.
 */
declare class V0LoggerAdapter extends LoggerAdapter {
  private prefix;
  private colors;
  private timestamps;
  constructor(options?: {
    prefix?: string;
    colors?: boolean;
    timestamps?: boolean;
  });
  debug(message: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
  trace(message: string, ...args: unknown[]): void;
  fatal(message: string, ...args: unknown[]): void;
  private format;
  private timestamp;
  private style;
  private log;
}
//#endregion
export { V0LoggerAdapter as t };