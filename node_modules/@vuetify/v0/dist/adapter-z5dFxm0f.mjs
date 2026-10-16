//#region src/composables/useDate/weekinfo.ts
const FRI_REGIONS = "MV";
const SAT_REGIONS = "AF BH DJ DZ EG IQ IR JO KW LY OM QA SD SY";
const SUN_REGIONS = "AG AS BD BR BS BT BU BW BZ CA CO DM DO ET GT GU HK HN ID IL IN IS JM JP JT KE KH KR LA MH MI MM MO MT MX MZ NI NP NT PA PE PH PK PR PT PU PY PZ RH SA SG SV TH TT TW UM US VE VI WK WS YD YE ZA ZW";
const MD4_REGIONS = "AD AN AT AX BE BG CH CZ DE DK EE ES FI FJ FO FR GB GF GG GI GP GR HU IE IM IS IT JE LI LT LU MC MQ NL NO PL PT RE RU SE SJ SK SM VA";
const FW_DAYS = [
	"sun",
	"mon",
	"tue",
	"wed",
	"thu",
	"fri",
	"sat"
];
/** language[-script]-region tag parse for runtimes without Intl.Locale */
const REGION_PATTERN = /^[a-z]{2,8}(?:-[a-z]{4})?-([a-z]{2}|\d{3})(?:-|$)/i;
/** Explicit `-u-fw-` week-start keyword on the tag; always wins over region data */
function deriveFw(locale) {
	const match = /-fw-(sun|mon|tue|wed|thu|fri|sat)(?:-|$)/.exec(locale.toLowerCase());
	return match ? FW_DAYS.indexOf(match[1]) : void 0;
}
/**
* Resolve the region governing week data. A region declared on the tag wins
* (matching ICU, which honors even unknown declared regions like 'en-ZZ');
* bare tags resolve their likely region via maximize ('de' → 'DE',
* 'en' → 'US'), with the world region as the last resort.
*/
function deriveRegion(locale) {
	const declared = REGION_PATTERN.exec(locale)?.[1]?.toUpperCase();
	if (declared) return declared;
	try {
		return new Intl.Locale(locale).maximize().region ?? "001";
	} catch {
		return "001";
	}
}
/** CLDR firstDay lookup, already in v0's 0=Sun...6=Sat convention */
function deriveFirstDay(region) {
	if (SUN_REGIONS.includes(region)) return 0;
	if (SAT_REGIONS.includes(region)) return 6;
	if (FRI_REGIONS.includes(region)) return 5;
	return 1;
}
/** CLDR minimalDays lookup */
function deriveMinimalDays(region) {
	return MD4_REGIONS.includes(region) ? 4 : 1;
}
/**
* Derive week info for a locale from CLDR data.
*
* @param locale An Intl locale string (e.g. 'de-DE', 'en', 'ar-EG', 'en-u-fw-mon').
* @returns firstDay in v0's 0=Sun...6=Sat convention, plus minimalDays.
*/
/* #__NO_SIDE_EFFECTS__ */
function deriveWeekInfo(locale) {
	const region = deriveRegion(locale);
	return {
		firstDay: deriveFw(locale) ?? deriveFirstDay(region),
		minimalDays: deriveMinimalDays(region)
	};
}
//#endregion
//#region src/composables/useDate/adapters/adapter.ts
var DateAdapter = class {};
//#endregion
export { deriveWeekInfo as n, DateAdapter as t };
