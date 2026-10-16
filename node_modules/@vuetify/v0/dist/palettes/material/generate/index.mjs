import { V0Error } from "../../../utilities/index.mjs";
import { Hct, SchemeExpressive, SchemeFidelity, SchemeMonochrome, SchemeNeutral, SchemeTonalSpot, SchemeVibrant, argbFromHex, hexFromArgb } from "@material/material-color-utilities";
//#region src/palettes/material/generate/index.ts
const VARIANTS = {
	tonalSpot: SchemeTonalSpot,
	vibrant: SchemeVibrant,
	expressive: SchemeExpressive,
	fidelity: SchemeFidelity,
	monochrome: SchemeMonochrome,
	neutral: SchemeNeutral
};
const TONES = [
	0,
	4,
	6,
	10,
	12,
	17,
	20,
	22,
	24,
	25,
	30,
	35,
	40,
	50,
	60,
	70,
	80,
	87,
	90,
	92,
	94,
	95,
	96,
	98,
	99,
	100
];
const HEX_RE = /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
function extractTones(palette) {
	const tones = {};
	for (const tone of TONES) tones[tone] = hexFromArgb(palette.tone(tone));
	return tones;
}
function extractSchemeColors(scheme) {
	return {
		"primary": hexFromArgb(scheme.primary),
		"on-primary": hexFromArgb(scheme.onPrimary),
		"primary-container": hexFromArgb(scheme.primaryContainer),
		"on-primary-container": hexFromArgb(scheme.onPrimaryContainer),
		"secondary": hexFromArgb(scheme.secondary),
		"on-secondary": hexFromArgb(scheme.onSecondary),
		"secondary-container": hexFromArgb(scheme.secondaryContainer),
		"on-secondary-container": hexFromArgb(scheme.onSecondaryContainer),
		"tertiary": hexFromArgb(scheme.tertiary),
		"on-tertiary": hexFromArgb(scheme.onTertiary),
		"tertiary-container": hexFromArgb(scheme.tertiaryContainer),
		"on-tertiary-container": hexFromArgb(scheme.onTertiaryContainer),
		"error": hexFromArgb(scheme.error),
		"on-error": hexFromArgb(scheme.onError),
		"error-container": hexFromArgb(scheme.errorContainer),
		"on-error-container": hexFromArgb(scheme.onErrorContainer),
		"surface": hexFromArgb(scheme.surface),
		"on-surface": hexFromArgb(scheme.onSurface),
		"surface-variant": hexFromArgb(scheme.surfaceVariant),
		"on-surface-variant": hexFromArgb(scheme.onSurfaceVariant),
		"outline": hexFromArgb(scheme.outline),
		"outline-variant": hexFromArgb(scheme.outlineVariant),
		"background": hexFromArgb(scheme.background),
		"on-background": hexFromArgb(scheme.onBackground)
	};
}
/* #__NO_SIDE_EFFECTS__ */
function material(seed, options = {}) {
	if (!HEX_RE.test(seed)) throw new V0Error(`[@vuetify/v0] Invalid seed color: "${seed}". Expected a hex string (e.g., "#6750A4").`, {
		code: "V0_PALETTE_INVALID_SEED",
		palette: "material",
		seed
	});
	const { variant = "tonalSpot", contrast = 0 } = options;
	const hct = Hct.fromInt(argbFromHex(seed));
	const SchemeClass = VARIANTS[variant];
	if (!SchemeClass) throw new V0Error(`[@vuetify/v0] Unknown material variant: "${variant}"`, {
		code: "V0_PALETTE_UNKNOWN_VARIANT",
		palette: "material",
		variant
	});
	const light = new SchemeClass(hct, false, contrast);
	const dark = new SchemeClass(hct, true, contrast);
	return {
		palette: {
			primary: extractTones(light.primaryPalette),
			secondary: extractTones(light.secondaryPalette),
			tertiary: extractTones(light.tertiaryPalette),
			neutral: extractTones(light.neutralPalette),
			neutralVariant: extractTones(light.neutralVariantPalette),
			error: extractTones(light.errorPalette)
		},
		themes: {
			light: {
				dark: false,
				colors: extractSchemeColors(light)
			},
			dark: {
				dark: true,
				colors: extractSchemeColors(dark)
			}
		}
	};
}
//#endregion
export { material };
