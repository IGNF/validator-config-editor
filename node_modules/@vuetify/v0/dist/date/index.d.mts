import { t as DateAdapter } from "../adapter-BC1VWu0H.mjs";
import { Temporal } from "@js-temporal/polyfill";
//#region src/composables/useDate/adapters/v0.d.ts
type PlainDateTime = Temporal.PlainDateTime;
declare class V0DateAdapter extends DateAdapter<PlainDateTime> {
  private _locale;
  private _firstDayOfWeek;
  private _minimalDays;
  /** Cache for Intl.DateTimeFormat instances, keyed by locale + options */
  private formatCache;
  /** Cache for Intl.NumberFormat instances, keyed by locale */
  private numberFormatCache;
  constructor(locale?: string);
  /** Current locale. Setting a new locale clears format caches. */
  get locale(): string;
  get firstDayOfWeek(): number;
  set locale(value: string);
  set firstDayOfWeek(value: number);
  /**
   * Create a date from various input types.
   *
   * @param value - Date value (PlainDateTime, PlainDate, ZonedDateTime, Date, ISO string, timestamp)
   * @returns PlainDateTime or null if invalid
   *
   * @remarks
   * **SSR Safety:** When called without arguments:
   * - Browser: Returns current time via `Temporal.Now.plainDateTimeISO()`
   * - Server: Returns epoch (1970-01-01T00:00:00) for deterministic rendering
   *
   * For SSR apps needing current time, pass `Date.now()` explicitly and handle
   * hydration via `<ClientOnly>` (Nuxt) or `v-if` + `onMounted` pattern.
   */
  date(value?: unknown): PlainDateTime | null;
  toJsDate(value: PlainDateTime): Date;
  parseISO(dateString: string): PlainDateTime;
  toISO(date: PlainDateTime): string;
  /**
   * Parses a date string into a PlainDateTime.
   *
   * **Known limitation**: The `format` parameter is currently ignored.
   * Temporal API doesn't provide built-in format parsing, and implementing
   * full format string parsing (e.g., 'MM/DD/YYYY') would require a
   * substantial custom parser. This method delegates to `date()` which
   * handles ISO 8601 strings and common formats.
   *
   * For custom format parsing, consider using a library like date-fns or
   * luxon with a custom adapter.
   *
   * @param value - The date string to parse
   * @param _format - Format hint (currently ignored)
   * @returns Parsed PlainDateTime or null if invalid
   */
  parse(value: string, _format: string): PlainDateTime | null;
  isValid(date: unknown): date is PlainDateTime;
  isNullish(value: PlainDateTime | null): value is null;
  getCurrentLocaleCode(): string;
  is12HourCycleInCurrentLocale(): boolean;
  format(date: PlainDateTime, formatString: string): string;
  formatByString(date: PlainDateTime, formatString: string): string;
  getFormatHelperText(format: string): string;
  formatNumber(numberToFormat: string): string;
  getMeridiemText(ampm: 'am' | 'pm'): string;
  startOfDay(date: PlainDateTime): PlainDateTime;
  endOfDay(date: PlainDateTime): PlainDateTime;
  startOfWeek(date: PlainDateTime): PlainDateTime;
  endOfWeek(date: PlainDateTime): PlainDateTime;
  startOfMonth(date: PlainDateTime): PlainDateTime;
  endOfMonth(date: PlainDateTime): PlainDateTime;
  startOfYear(date: PlainDateTime): PlainDateTime;
  endOfYear(date: PlainDateTime): PlainDateTime;
  addSeconds(date: PlainDateTime, amount: number): PlainDateTime;
  addMinutes(date: PlainDateTime, amount: number): PlainDateTime;
  addHours(date: PlainDateTime, amount: number): PlainDateTime;
  addDays(date: PlainDateTime, amount: number): PlainDateTime;
  addWeeks(date: PlainDateTime, amount: number): PlainDateTime;
  addMonths(date: PlainDateTime, amount: number): PlainDateTime;
  addYears(date: PlainDateTime, amount: number): PlainDateTime;
  isAfter(date: PlainDateTime, comparing: PlainDateTime): boolean;
  isAfterDay(date: PlainDateTime, comparing: PlainDateTime): boolean;
  isAfterMonth(date: PlainDateTime, comparing: PlainDateTime): boolean;
  isAfterYear(date: PlainDateTime, comparing: PlainDateTime): boolean;
  isBefore(date: PlainDateTime, comparing: PlainDateTime): boolean;
  isBeforeDay(date: PlainDateTime, comparing: PlainDateTime): boolean;
  isBeforeMonth(date: PlainDateTime, comparing: PlainDateTime): boolean;
  isBeforeYear(date: PlainDateTime, comparing: PlainDateTime): boolean;
  isEqual(date: PlainDateTime, comparing: PlainDateTime): boolean;
  isSameDay(date: PlainDateTime, comparing: PlainDateTime): boolean;
  isSameMonth(date: PlainDateTime, comparing: PlainDateTime): boolean;
  isSameYear(date: PlainDateTime, comparing: PlainDateTime): boolean;
  isSameHour(date: PlainDateTime, comparing: PlainDateTime): boolean;
  isWithinRange(date: PlainDateTime, [start, end]: [PlainDateTime, PlainDateTime]): boolean;
  getYear(date: PlainDateTime): number;
  getMonth(date: PlainDateTime): number;
  getDate(date: PlainDateTime): number;
  getHours(date: PlainDateTime): number;
  getMinutes(date: PlainDateTime): number;
  getSeconds(date: PlainDateTime): number;
  getDiff(date: PlainDateTime, comparing: PlainDateTime | string, unit?: string): number;
  getWeek(date: PlainDateTime, minimalDays?: number): number;
  getDaysInMonth(date: PlainDateTime): number;
  setYear(date: PlainDateTime, year: number): PlainDateTime;
  setMonth(date: PlainDateTime, month: number): PlainDateTime;
  setDate(date: PlainDateTime, day: number): PlainDateTime;
  setHours(date: PlainDateTime, hours: number): PlainDateTime;
  setMinutes(date: PlainDateTime, minutes: number): PlainDateTime;
  setSeconds(date: PlainDateTime, seconds: number): PlainDateTime;
  getWeekdays(format?: 'long' | 'short' | 'narrow'): string[];
  getWeekArray(date: PlainDateTime, fixedWeeks?: boolean): PlainDateTime[][];
  getMonthArray(date: PlainDateTime): PlainDateTime[];
  getYearRange(start: PlainDateTime, end: PlainDateTime): PlainDateTime[];
  getNextMonth(date: PlainDateTime): PlainDateTime;
  getPreviousMonth(date: PlainDateTime): PlainDateTime;
  mergeDateAndTime(date: PlainDateTime, time: PlainDateTime): PlainDateTime;
  /**
   * Gets a cached Intl.DateTimeFormat instance or creates one if not cached.
   * Cache is limited to MAX_CACHE_SIZE entries to prevent memory leaks.
   */
  private getFormatter;
  /**
   * Gets a cached Intl.NumberFormat instance or creates one if not cached.
   * Cache is limited to MAX_CACHE_SIZE entries to prevent memory leaks.
   */
  private getNumberFormatter;
}
//#endregion
export { V0DateAdapter };