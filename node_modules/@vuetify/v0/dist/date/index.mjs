import { t as IN_BROWSER } from "../globals-Bxw-y98v.mjs";
import { isNull, isNullOrUndefined, isNumber, isString } from "../utilities/index.mjs";
import { n as deriveWeekInfo, t as DateAdapter } from "../adapter-z5dFxm0f.mjs";
import { Temporal } from "@js-temporal/polyfill";
//#region src/composables/useDate/adapters/v0.ts
/**
* @module V0DateAdapter
*
* @remarks
* Default DateAdapter for v0, built on the Temporal API.
* Uses Temporal.PlainDateTime as the primary date type.
*
* Implements the full date-io IUtils interface for industry compatibility.
*
* Uses the runtime's native Temporal implementation when present, falling back
* to the @js-temporal/polyfill optional peer. The polyfill import is static, so
* runtimes without native Temporal must have the peer installed to load this
* module.
*
* @see https://tc39.es/proposal-temporal/docs/
* @see https://github.com/dmtrKovalenko/date-io
*/
/** Resolved Temporal implementation — native when the runtime provides it, polyfill otherwise. */
const Temporal$1 = globalThis.Temporal ?? Temporal;
/** Single regex for token replacement in formatByString */
const FORMAT_TOKEN_REGEX = /YYYY|YY|MMMM|MMM|MM|M|dddd|ddd|DD|D|HH|H|hh|h|mm|m|ss|s|A|a/g;
/** Maximum cache size to prevent memory leaks */
const MAX_CACHE_SIZE = 50;
var V0DateAdapter = class extends DateAdapter {
	_locale;
	_firstDayOfWeek = 0;
	_minimalDays = 1;
	/** Cache for Intl.DateTimeFormat instances, keyed by locale + options */
	formatCache = /* @__PURE__ */ new Map();
	/** Cache for Intl.NumberFormat instances, keyed by locale */
	numberFormatCache = /* @__PURE__ */ new Map();
	constructor(locale = "en-US") {
		super();
		this._locale = locale;
		const info = /* @__PURE__ */ deriveWeekInfo(locale);
		this._firstDayOfWeek = info.firstDay;
		this._minimalDays = info.minimalDays;
	}
	/** Current locale. Setting a new locale clears format caches. */
	get locale() {
		return this._locale;
	}
	get firstDayOfWeek() {
		return this._firstDayOfWeek;
	}
	set locale(value) {
		if (this._locale !== value) {
			this._locale = value;
			const info = /* @__PURE__ */ deriveWeekInfo(value);
			this._firstDayOfWeek = info.firstDay;
			this._minimalDays = info.minimalDays;
			this.formatCache.clear();
			this.numberFormatCache.clear();
		}
	}
	set firstDayOfWeek(value) {
		this._firstDayOfWeek = value;
	}
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
	date(value) {
		if (/* @__PURE__ */ isNullOrUndefined(value)) return IN_BROWSER ? Temporal$1.Now.plainDateTimeISO() : Temporal$1.PlainDateTime.from({
			year: 1970,
			month: 1,
			day: 1,
			hour: 0,
			minute: 0,
			second: 0
		});
		if (value instanceof Temporal$1.PlainDateTime) return value;
		if (value instanceof Temporal$1.PlainDate) return value.toPlainDateTime();
		if (value instanceof Temporal$1.ZonedDateTime) return value.toPlainDateTime();
		if (value instanceof Date) return Temporal$1.PlainDateTime.from({
			year: value.getFullYear(),
			month: value.getMonth() + 1,
			day: value.getDate(),
			hour: value.getHours(),
			minute: value.getMinutes(),
			second: value.getSeconds(),
			millisecond: value.getMilliseconds()
		});
		if (/* @__PURE__ */ isString(value)) try {
			return Temporal$1.PlainDateTime.from(value);
		} catch {
			try {
				return this.parseISO(value);
			} catch {
				return null;
			}
		}
		if (/* @__PURE__ */ isNumber(value)) {
			const date = new Date(value);
			return Temporal$1.PlainDateTime.from({
				year: date.getFullYear(),
				month: date.getMonth() + 1,
				day: date.getDate(),
				hour: date.getHours(),
				minute: date.getMinutes(),
				second: date.getSeconds(),
				millisecond: date.getMilliseconds()
			});
		}
		return null;
	}
	toJsDate(value) {
		return new Date(value.year, value.month - 1, value.day, value.hour, value.minute, value.second, value.millisecond);
	}
	parseISO(dateString) {
		if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return Temporal$1.PlainDate.from(dateString).toPlainDateTime();
		if (dateString.includes("Z") || /[+-]\d{2}:\d{2}$/.test(dateString)) return Temporal$1.Instant.from(dateString).toZonedDateTimeISO("UTC").toPlainDateTime();
		return Temporal$1.PlainDateTime.from(dateString);
	}
	toISO(date) {
		return date.toPlainDate().toString();
	}
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
	parse(value, _format) {
		try {
			return this.date(value);
		} catch {
			return null;
		}
	}
	isValid(date) {
		if (/* @__PURE__ */ isNullOrUndefined(date)) return false;
		if (date instanceof Temporal$1.PlainDateTime) return true;
		if (date instanceof Temporal$1.PlainDate) return true;
		if (date instanceof Temporal$1.ZonedDateTime) return true;
		if (date instanceof Date) return !Number.isNaN(date.getTime());
		if (/* @__PURE__ */ isString(date)) try {
			Temporal$1.PlainDateTime.from(date);
			return true;
		} catch {
			try {
				Temporal$1.PlainDate.from(date);
				return true;
			} catch {
				return false;
			}
		}
		return false;
	}
	isNullish(value) {
		return /* @__PURE__ */ isNullOrUndefined(value);
	}
	getCurrentLocaleCode() {
		return this.locale;
	}
	is12HourCycleInCurrentLocale() {
		return new Intl.DateTimeFormat(this.locale, { hour: "numeric" }).resolvedOptions().hour12 ?? false;
	}
	format(date, formatString) {
		const jsDate = this.toJsDate(date);
		const options = {
			fullDate: { dateStyle: "full" },
			fullDateWithWeekday: {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric"
			},
			normalDate: { dateStyle: "medium" },
			shortDate: { dateStyle: "short" },
			year: { year: "numeric" },
			month: { month: "long" },
			monthShort: { month: "short" },
			monthAndYear: {
				year: "numeric",
				month: "long"
			},
			monthAndDate: {
				month: "long",
				day: "numeric"
			},
			weekday: { weekday: "long" },
			weekdayShort: { weekday: "short" },
			dayOfMonth: { day: "numeric" },
			hours12h: {
				hour: "numeric",
				hour12: true
			},
			hours24h: {
				hour: "numeric",
				hour12: false
			},
			minutes: { minute: "numeric" },
			seconds: { second: "numeric" },
			fullTime: { timeStyle: "short" },
			fullTime12h: {
				hour: "numeric",
				minute: "numeric",
				hour12: true
			},
			fullTime24h: {
				hour: "numeric",
				minute: "numeric",
				hour12: false
			},
			fullDateTime: {
				dateStyle: "full",
				timeStyle: "short"
			},
			fullDateTime12h: {
				year: "numeric",
				month: "long",
				day: "numeric",
				weekday: "long",
				hour: "numeric",
				minute: "numeric",
				hour12: true
			},
			fullDateTime24h: {
				year: "numeric",
				month: "long",
				day: "numeric",
				weekday: "long",
				hour: "numeric",
				minute: "numeric",
				hour12: false
			},
			keyboardDate: {
				year: "numeric",
				month: "2-digit",
				day: "2-digit"
			},
			keyboardDateTime: {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "numeric",
				minute: "numeric"
			},
			keyboardDateTime12h: {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "numeric",
				minute: "numeric",
				hour12: true
			},
			keyboardDateTime24h: {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "numeric",
				minute: "numeric",
				hour12: false
			}
		}[formatString];
		if (options) return this.getFormatter(options).format(jsDate);
		return this.getFormatter({}).format(jsDate);
	}
	formatByString(date, formatString) {
		const jsDate = this.toJsDate(date);
		const getTokenValue = (token) => {
			switch (token) {
				case "YYYY": return String(date.year);
				case "YY": return String(date.year).slice(-2);
				case "MM": return String(date.month).padStart(2, "0");
				case "M": return String(date.month);
				case "DD": return String(date.day).padStart(2, "0");
				case "D": return String(date.day);
				case "HH": return String(date.hour).padStart(2, "0");
				case "H": return String(date.hour);
				case "hh": return String(date.hour % 12 || 12).padStart(2, "0");
				case "h": return String(date.hour % 12 || 12);
				case "mm": return String(date.minute).padStart(2, "0");
				case "m": return String(date.minute);
				case "ss": return String(date.second).padStart(2, "0");
				case "s": return String(date.second);
				case "A": return date.hour < 12 ? "AM" : "PM";
				case "a": return date.hour < 12 ? "am" : "pm";
				case "MMMM": return this.getFormatter({ month: "long" }).format(jsDate);
				case "MMM": return this.getFormatter({ month: "short" }).format(jsDate);
				case "dddd": return this.getFormatter({ weekday: "long" }).format(jsDate);
				case "ddd": return this.getFormatter({ weekday: "short" }).format(jsDate);
				default: return token;
			}
		};
		return formatString.replace(FORMAT_TOKEN_REGEX, (match) => getTokenValue(match));
	}
	getFormatHelperText(format) {
		return {
			keyboardDate: "mm/dd/yyyy",
			keyboardDateTime: "mm/dd/yyyy hh:mm",
			keyboardDateTime12h: "mm/dd/yyyy hh:mm am/pm",
			keyboardDateTime24h: "mm/dd/yyyy hh:mm"
		}[format] ?? format.replace(/YYYY/g, "yyyy").replace(/MM/g, "mm").replace(/DD/g, "dd").replace(/HH/g, "hh");
	}
	formatNumber(numberToFormat) {
		return this.getNumberFormatter().format(Number(numberToFormat));
	}
	getMeridiemText(ampm) {
		const date = ampm === "am" ? new Date(2020, 0, 1, 9, 0) : new Date(2020, 0, 1, 15, 0);
		const match = this.getFormatter({
			hour: "numeric",
			hour12: true
		}).format(date).match(/[ap]m|午前|午後|上午|下午/i);
		return match ? match[0] : ampm.toUpperCase();
	}
	startOfDay(date) {
		return date.with({
			hour: 0,
			minute: 0,
			second: 0,
			millisecond: 0,
			microsecond: 0,
			nanosecond: 0
		});
	}
	endOfDay(date) {
		return date.with({
			hour: 23,
			minute: 59,
			second: 59,
			millisecond: 999,
			microsecond: 999,
			nanosecond: 999
		});
	}
	startOfWeek(date) {
		const diff = (date.dayOfWeek % 7 - this.firstDayOfWeek + 7) % 7;
		return this.startOfDay(date.subtract({ days: diff }));
	}
	endOfWeek(date) {
		const start = this.startOfWeek(date);
		return this.endOfDay(start.add({ days: 6 }));
	}
	startOfMonth(date) {
		return this.startOfDay(date.with({ day: 1 }));
	}
	endOfMonth(date) {
		return this.endOfDay(date.with({ day: date.daysInMonth }));
	}
	startOfYear(date) {
		return this.startOfDay(date.with({
			month: 1,
			day: 1
		}));
	}
	endOfYear(date) {
		return this.endOfDay(date.with({
			month: 12,
			day: 31
		}));
	}
	addSeconds(date, amount) {
		return date.add({ seconds: amount });
	}
	addMinutes(date, amount) {
		return date.add({ minutes: amount });
	}
	addHours(date, amount) {
		return date.add({ hours: amount });
	}
	addDays(date, amount) {
		return date.add({ days: amount });
	}
	addWeeks(date, amount) {
		return date.add({ weeks: amount });
	}
	addMonths(date, amount) {
		return date.add({ months: amount });
	}
	addYears(date, amount) {
		return date.add({ years: amount });
	}
	isAfter(date, comparing) {
		return Temporal$1.PlainDateTime.compare(date, comparing) > 0;
	}
	isAfterDay(date, comparing) {
		return Temporal$1.PlainDate.compare(date.toPlainDate(), comparing.toPlainDate()) > 0;
	}
	isAfterMonth(date, comparing) {
		if (date.year !== comparing.year) return date.year > comparing.year;
		return date.month > comparing.month;
	}
	isAfterYear(date, comparing) {
		return date.year > comparing.year;
	}
	isBefore(date, comparing) {
		return Temporal$1.PlainDateTime.compare(date, comparing) < 0;
	}
	isBeforeDay(date, comparing) {
		return Temporal$1.PlainDate.compare(date.toPlainDate(), comparing.toPlainDate()) < 0;
	}
	isBeforeMonth(date, comparing) {
		if (date.year !== comparing.year) return date.year < comparing.year;
		return date.month < comparing.month;
	}
	isBeforeYear(date, comparing) {
		return date.year < comparing.year;
	}
	isEqual(date, comparing) {
		return Temporal$1.PlainDateTime.compare(date, comparing) === 0;
	}
	isSameDay(date, comparing) {
		return Temporal$1.PlainDate.compare(date.toPlainDate(), comparing.toPlainDate()) === 0;
	}
	isSameMonth(date, comparing) {
		return date.year === comparing.year && date.month === comparing.month;
	}
	isSameYear(date, comparing) {
		return date.year === comparing.year;
	}
	isSameHour(date, comparing) {
		return date.year === comparing.year && date.month === comparing.month && date.day === comparing.day && date.hour === comparing.hour;
	}
	isWithinRange(date, [start, end]) {
		return Temporal$1.PlainDateTime.compare(date, start) >= 0 && Temporal$1.PlainDateTime.compare(date, end) <= 0;
	}
	getYear(date) {
		return date.year;
	}
	getMonth(date) {
		return date.month - 1;
	}
	getDate(date) {
		return date.day;
	}
	getHours(date) {
		return date.hour;
	}
	getMinutes(date) {
		return date.minute;
	}
	getSeconds(date) {
		return date.second;
	}
	getDiff(date, comparing, unit) {
		const unitKey = unit ?? "days";
		const comp = /* @__PURE__ */ isString(comparing) ? this.date(comparing) : comparing;
		if (/* @__PURE__ */ isNull(comp)) return 0;
		const duration = date.since(comp, { largestUnit: unitKey });
		switch (unitKey) {
			case "years": return duration.years;
			case "months": return duration.months;
			case "weeks": return duration.weeks;
			case "days": return duration.days;
			case "hours": return duration.hours;
			case "minutes": return duration.minutes;
			case "seconds": return duration.seconds;
			default: return duration.days;
		}
	}
	getWeek(date, minimalDays) {
		const md = minimalDays ?? this._minimalDays;
		const currentWeekStart = this.startOfWeek(date);
		const currentWeekEnd = this.addDays(currentWeekStart, 6);
		let year = this.getYear(currentWeekStart);
		if (year < this.getYear(currentWeekEnd)) {
			const nextYearStart = new Temporal$1.PlainDateTime(year + 1, 1, 1);
			if (7 - this.getDiff(nextYearStart, this.startOfWeek(nextYearStart), "days") >= md) year++;
		}
		const yearStart = new Temporal$1.PlainDateTime(year, 1, 1);
		const firstWeekSize = 7 - this.getDiff(yearStart, this.startOfWeek(yearStart), "days");
		const weekOneStart = firstWeekSize >= md ? yearStart.add({ days: firstWeekSize }).add({ weeks: -1 }) : yearStart.add({ days: firstWeekSize });
		return 1 + this.getDiff(currentWeekStart, weekOneStart, "weeks");
	}
	getDaysInMonth(date) {
		return date.daysInMonth;
	}
	setYear(date, year) {
		return date.with({ year });
	}
	setMonth(date, month) {
		return date.with({ month: month + 1 });
	}
	setDate(date, day) {
		return date.with({ day });
	}
	setHours(date, hours) {
		return date.with({ hour: hours });
	}
	setMinutes(date, minutes) {
		return date.with({ minute: minutes });
	}
	setSeconds(date, seconds) {
		return date.with({ second: seconds });
	}
	getWeekdays(format = "narrow") {
		const weekdays = [];
		const refDate = Temporal$1.PlainDate.from("2015-01-04");
		const formatter = this.getFormatter({ weekday: format });
		for (let i = 0; i < 7; i++) {
			const day = refDate.add({ days: (i + this.firstDayOfWeek) % 7 });
			const jsDate = new Date(day.year, day.month - 1, day.day);
			weekdays.push(formatter.format(jsDate));
		}
		return weekdays;
	}
	getWeekArray(date, fixedWeeks = false) {
		const weeks = [];
		const monthStart = this.startOfMonth(date);
		const monthEnd = this.endOfMonth(date);
		let current = this.startOfWeek(monthStart);
		const end = this.endOfWeek(monthEnd);
		while (Temporal$1.PlainDateTime.compare(current, end) <= 0 || fixedWeeks && weeks.length < 6) {
			const week = [];
			for (let i = 0; i < 7; i++) {
				week.push(current);
				current = current.add({ days: 1 });
			}
			weeks.push(week);
		}
		return weeks;
	}
	getMonthArray(date) {
		const year = date.year;
		const months = [];
		for (let month = 1; month <= 12; month++) months.push(Temporal$1.PlainDateTime.from({
			year,
			month,
			day: 1
		}));
		return months;
	}
	getYearRange(start, end) {
		const years = [];
		let current = start.year;
		while (current <= end.year) {
			years.push(Temporal$1.PlainDateTime.from({
				year: current,
				month: 1,
				day: 1
			}));
			current++;
		}
		return years;
	}
	getNextMonth(date) {
		return this.startOfMonth(date.add({ months: 1 }));
	}
	getPreviousMonth(date) {
		return this.startOfMonth(date.subtract({ months: 1 }));
	}
	mergeDateAndTime(date, time) {
		return date.with({
			hour: time.hour,
			minute: time.minute,
			second: time.second,
			millisecond: time.millisecond
		});
	}
	/**
	* Gets a cached Intl.DateTimeFormat instance or creates one if not cached.
	* Cache is limited to MAX_CACHE_SIZE entries to prevent memory leaks.
	*/
	getFormatter(options) {
		const key = `${this.locale}:${JSON.stringify(options)}`;
		let formatter = this.formatCache.get(key);
		if (!formatter) {
			/* v8 ignore next 4 -- cache-eviction only triggers past MAX_CACHE_SIZE; not exercised through public API */
			if (this.formatCache.size >= MAX_CACHE_SIZE) {
				const firstKey = this.formatCache.keys().next().value;
				if (firstKey) this.formatCache.delete(firstKey);
			}
			formatter = new Intl.DateTimeFormat(this.locale, options);
			this.formatCache.set(key, formatter);
		}
		return formatter;
	}
	/**
	* Gets a cached Intl.NumberFormat instance or creates one if not cached.
	* Cache is limited to MAX_CACHE_SIZE entries to prevent memory leaks.
	*/
	getNumberFormatter() {
		let formatter = this.numberFormatCache.get(this.locale);
		if (!formatter) {
			/* v8 ignore next 4 -- cache-eviction only triggers past MAX_CACHE_SIZE; not exercised through public API */
			if (this.numberFormatCache.size >= MAX_CACHE_SIZE) {
				const firstKey = this.numberFormatCache.keys().next().value;
				if (firstKey) this.numberFormatCache.delete(firstKey);
			}
			formatter = new Intl.NumberFormat(this.locale);
			this.numberFormatCache.set(this.locale, formatter);
		}
		return formatter;
	}
};
//#endregion
export { V0DateAdapter };
