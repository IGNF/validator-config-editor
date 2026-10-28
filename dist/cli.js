import { fileURLToPath } from "node:url";
import { cp, mkdir, readFile, readdir, realpath, rename, rm, stat, writeFile } from "node:fs/promises";
import { basename, dirname, extname, join, normalize, relative, resolve, sep } from "node:path";
import { createHash } from "node:crypto";
import { createServer } from "node:http";
import { spawn } from "node:child_process";
// \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod, mod.exports), cb = null), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var package_default = {
	name: "validator-config-editor",
	version: "0.2.0",
	description: "Validation et édition des configurations IGNF/validator (CLI vce)",
	license: "AGPL-3.0-or-later",
	repository: "github:IGNF/validator-config-editor",
	type: "module",
	bin: { "vce": "bin/vce.js" },
	files: ["bin", "dist"],
	engines: { "node": ">=22" },
	scripts: {
		"dev": "vite",
		"build": "npm run typecheck && npm run build:ui && npm run build:cli",
		"build:ui": "vite build",
		"build:cli": "vite build --config vite.cli.config.ts",
		"schemas": "tsx scripts/compile-schemas.ts",
		"typecheck": "vue-tsc --noEmit",
		"lint": "eslint .",
		"test": "vitest run",
		"test:coverage": "vitest run --coverage",
		"test:e2e": "playwright test",
		"build:pages": "vite build --mode pages"
	},
	devDependencies: {
		"@axe-core/playwright": "4.13.0",
		"@fontsource/fira-sans": "5.3.0",
		"@fontsource/open-sans": "5.3.0",
		"@mdi/js": "7.4.47",
		"@playwright/test": "1.63.0",
		"@types/node": "24.19.0",
		"@vitejs/plugin-vue": "6.0.9",
		"@vitest/coverage-v8": "5.0.3",
		"ajv": "8.20.0",
		"eslint": "10.11.0",
		"pinia": "4.0.3",
		"tsx": "4.23.15",
		"typescript": "5.9.3",
		"typescript-eslint": "8.71.0",
		"vite": "8.3.5",
		"vite-plugin-vuetify": "2.1.3",
		"vitest": "5.0.3",
		"vue": "3.5.43",
		"vue-tsc": "3.3.11",
		"vuetify": "4.2.3"
	}
};
// src/core/pointer.ts
function escapeSegment(segment) {
	return String(segment).replace(/~/g, "~0").replace(/\//g, "~1");
}
function pointer(...segments) {
	return segments.map((s) => "/" + escapeSegment(s)).join("");
}
function parsePointer(ptr) {
	if (ptr === "") return [];
	return ptr.slice(1).split("/").map((s) => s.replace(/~1/g, "/").replace(/~0/g, "~"));
}
function comparePointers(a, b) {
	const sa = parsePointer(a);
	const sb = parsePointer(b);
	for (let i = 0; i < Math.min(sa.length, sb.length); i++) {
		const x = sa[i];
		const y = sb[i];
		if (x === y) continue;
		const nx = /^\d+$/.test(x) ? Number(x) : NaN;
		const ny = /^\d+$/.test(y) ? Number(y) : NaN;
		if (!Number.isNaN(nx) && !Number.isNaN(ny)) return nx - ny;
		return x < y ? -1 : 1;
	}
	return sa.length - sb.length;
}
// src/core/validation/messages.ts
var s = (p, k) => String(p[k] ?? "");
var CATALOG = {
	"ERR-JSON-SYNTAX": {
		severity: "error",
		title: "Fichier JSON illisible",
		hint: "Corriger la syntaxe à la ligne indiquée (virgule, guillemet ou accolade manquant) dans un éditeur de texte.",
		message: (p) => `JSON invalide ligne ${s(p, "line")}, colonne ${s(p, "column")} : ${s(p, "detail")}`
	},
	"ERR-CSV-SYNTAX": {
		severity: "error",
		title: "Liste de codes illisible",
		hint: "Fermer le guillemet ouvert à la ligne indiquée.",
		message: (p) => `CSV invalide ligne ${s(p, "line")} : guillemet non fermé`
	},
	"ERR-CSV-HEADER": {
		severity: "error",
		title: "En-tête de liste de codes invalide",
		hint: "La première ligne doit donner un nom unique et non vide à chaque colonne.",
		message: (p) => `En-tête CSV invalide : ${s(p, "reason")}`
	},
	"ERR-VARIABLES-FORMAT": {
		severity: "error",
		title: "Dictionnaire des variables illisible",
		hint: "variables.json doit contenir un objet « variables » associant chaque nom de variable à une regex non vide.",
		message: () => "variables.json illisible ou mal formé : les regex sont affichées sans variable"
	},
	"ERR-VARIABLES-DUPLICATE": {
		severity: "error",
		title: "Deux variables pour la même regex",
		hint: "Chaque regex ne doit correspondre qu'à une variable, sinon l'affichage est ambigu : fusionner les deux variables ou changer l'une des regex.",
		message: (p) => `La variable ${s(p, "name")} a la même regex que ${s(p, "other")}`
	},
	"WARN-VARIABLES-OPT": {
		severity: "warning",
		title: "Variable mal nommée",
		hint: "Le suffixe _OPT marque une partie facultative, affichée en jaune : il est réservé aux regex de la forme (…)?. Le préfixe « _ » est réservé aux regex qui commencent par « _ ». Renommer la variable ou corriger sa regex.",
		message: (p) => ({
			suffix: `La variable ${s(p, "name")} a le suffixe _OPT sans regex facultative (…)?`,
			regex: `La variable ${s(p, "name")} a une regex facultative (…)? sans le suffixe _OPT`,
			prefix: `La variable ${s(p, "name")} a une regex qui commence par « _ » sans le préfixe « _ »`,
			noprefix: `La variable ${s(p, "name")} a le préfixe « _ » sans regex qui commence par « _ »`
		})[s(p, "kind")] ?? ""
	},
	"ERR-CSV-ROW-LENGTH": {
		severity: "error",
		title: "Ligne de liste de codes mal découpée",
		hint: "Une valeur contient sans doute une virgule : la mettre entre guillemets.",
		message: (p) => `Ligne ${s(p, "line")} : ${s(p, "count")} valeurs pour ${s(p, "expected")} colonnes`
	},
	"WARN-MODEL-NO-DOCUMENT": {
		severity: "warning",
		title: "Dossier sans modèle",
		hint: "Ajouter un files.json, ou retirer le dossier de la configuration.",
		message: () => "Dossier sans files.json"
	},
	"ERR-SCHEMA": {
		severity: "error",
		title: "Valeur non conforme au format",
		hint: "Corriger la propriété indiquée : valeur absente, de mauvais type ou hors des valeurs autorisées.",
		message: (p) => `${s(p, "at") || "/"} : ${s(p, "detail")}`
	},
	"WARN-MODEL-NAME": {
		severity: "warning",
		title: "Nom du modèle différent du dossier",
		hint: "Le validator n'impose rien, mais un nom identique au dossier évite les confusions.",
		message: (p) => `Le nom « ${s(p, "name")} » diffère du dossier « ${s(p, "folder")} »`
	},
	"ERR-TABLE-MODEL-MISSING": {
		severity: "error",
		title: "Modèle de table introuvable",
		hint: "Corriger le chemin du modèle de table, ou ajouter le fichier dans types/.",
		message: (p) => `Modèle de table « ${s(p, "ref")} » introuvable`
	},
	"ERR-CODE-DATA-MISSING": {
		severity: "error",
		title: "Fichier de liste de codes introuvable",
		hint: "Corriger le chemin du fichier, ou ajouter le CSV dans codes/.",
		message: (p) => `Liste de codes « ${s(p, "ref")} » introuvable`
	},
	"ERR-FK-SYNTAX": {
		severity: "error",
		title: "Clé étrangère illisible",
		hint: "Écrire la clé sous la forme (COLONNE) REFERENCES Liste(COLONNE).",
		message: (p) => `Clé étrangère illisible : « ${s(p, "fk")} »`
	},
	"ERR-FK-SOURCE-COLUMN": {
		severity: "error",
		title: "Clé étrangère sur une colonne inexistante",
		hint: "Corriger le nom de la colonne de la table dans la clé étrangère.",
		message: (p) => `Clé étrangère : colonne « ${s(p, "column")} » absente de la table`
	},
	"ERR-FK-TARGET-LIST": {
		severity: "error",
		title: "Liste de codes non déclarée",
		hint: "Déclarer la liste dans files.json (et ajouter son CSV), ou corriger son nom dans la clé étrangère.",
		message: (p) => `Clé étrangère : liste « ${s(p, "list")} » non déclarée dans files.json`
	},
	"ERR-FK-TARGET-COLUMN": {
		severity: "error",
		title: "Clé étrangère vers une colonne inexistante",
		hint: "Corriger le nom de la colonne de la liste de codes visée.",
		message: (p) => `Clé étrangère : colonne « ${s(p, "column")} » absente de ${s(p, "list")}`
	},
	"ERR-REFERENCE-TARGET": {
		severity: "error",
		title: "Référence vers une colonne inexistante",
		hint: "Écrire la référence sous la forme TABLE.COLONNE, avec une table et une colonne du modèle.",
		message: (p) => `Référence « ${s(p, "ref")} » : table ou colonne introuvable`
	},
	"ERR-ID-DUPLICATE": {
		severity: "error",
		title: "Identifiant en double",
		hint: "Donner un nouvel identifiant à l'un des deux objets.",
		message: (p) => `Identifiant ${s(p, "id")} déjà utilisé par ${s(p, "first")}`
	},
	"ERR-GPU-ID-MISSING": {
		severity: "error",
		title: "Identifiant manquant",
		hint: "L'import dans le GpU exige un identifiant pour chaque objet : en attribuer un.",
		message: (p) => `${s(p, "kind").replace(/^./, (c) => c.toUpperCase())} sans identifiant (obligatoire pour l'import dans le GpU)`
	},
	"WARN-CODE-NAME-FILE": {
		severity: "warning",
		title: "Nom de liste différent de son fichier",
		hint: "Le nom d'une liste de codes est celui de son fichier CSV (sans .csv) : renommer la liste, les clés étrangères qui la visent suivent.",
		message: (p) => `La liste « ${s(p, "name")} » ne porte pas le nom de son fichier (« ${s(p, "expected")} »)`
	},
	"WARN-UNREFERENCED-FILE": {
		severity: "warning",
		title: "Fichier non utilisé",
		hint: "Le validator ignore ce fichier : le déclarer dans files.json, ou le retirer s'il est obsolète.",
		message: () => "Fichier non référencé par files.json"
	}
};
// src/core/validation/problems.ts
function problem(code, model, file, pointer, params = {}) {
	const entry = CATALOG[code];
	const p = {
		code,
		severity: entry.severity,
		model,
		file,
		message: entry.message(params)
	};
	if (pointer !== void 0) p.pointer = pointer;
	if (/^ERR-(JSON|CSV)-/.test(code) && typeof params.line === "number") p.line = params.line;
	return p;
}
function compareProblems(a, b) {
	return (a.model ?? "").localeCompare(b.model ?? "") || a.file.localeCompare(b.file) || comparePointers(a.pointer ?? "", b.pointer ?? "") || a.code.localeCompare(b.code);
}
function countProblems(problems) {
	let errors = 0;
	for (const p of problems) if (p.severity === "error") errors++;
	return {
		errors,
		warnings: problems.length - errors
	};
}
// src/core/load/csv.ts
var fail = (error) => ({
	ok: false,
	errors: [error]
});
function records(text) {
	const out = [];
	let fields = [];
	let field = "";
	let quoted = false;
	let line = 1;
	let start = 1;
	let quoteStart = 0;
	const src = text.startsWith("﻿") ? text.slice(1) : text;
	for (let i = 0; i < src.length; i++) {
		const c = src[i];
		if (quoted) {
			if (c === "\"") {
				if (src[i + 1] === "\"") {
					field += "\"";
					i++;
				} else quoted = false;
			} else {
				if (c === "\n") line++;
				field += c;
			}
		} else if (c === "\"" && field === "") {
			quoted = true;
			quoteStart = line;
		} else if (c === ",") {
			fields.push(field);
			field = "";
		} else if (c === "\n" || c === "\r") {
			if (c === "\r" && src[i + 1] === "\n") i++;
			fields.push(field);
			out.push({
				fields,
				line: start
			});
			fields = [];
			field = "";
			line++;
			start = line;
		} else field += c;
	}
	if (quoted) return { unclosedAt: quoteStart };
	if (field !== "" || fields.length > 0) {
		fields.push(field);
		out.push({
			fields,
			line: start
		});
	}
	return out;
}
function parseCsv(text) {
	const recs = records(text);
	if (!Array.isArray(recs)) return fail({
		code: "ERR-CSV-SYNTAX",
		line: recs.unclosedAt,
		params: {}
	});
	const [first, ...rest] = recs.filter((r) => !(r.fields.length === 1 && r.fields[0] === ""));
	if (!first) return fail({
		code: "ERR-CSV-HEADER",
		line: 1,
		params: { reason: "en-tête absent" }
	});
	const header = first.fields;
	const seen = /* @__PURE__ */ new Set();
	for (const name of header) {
		if (name.trim() === "") return fail({
			code: "ERR-CSV-HEADER",
			line: first.line,
			params: { reason: "nom de colonne vide" }
		});
		if (seen.has(name)) return fail({
			code: "ERR-CSV-HEADER",
			line: first.line,
			params: { reason: `colonne « ${name} » dupliquée` }
		});
		seen.add(name);
	}
	const errors = rest.filter((r) => r.fields.length !== header.length).map((r) => ({
		code: "ERR-CSV-ROW-LENGTH",
		line: r.line,
		params: {
			count: r.fields.length,
			expected: header.length
		}
	}));
	return errors.length ? {
		ok: false,
		errors
	} : {
		ok: true,
		csv: {
			header,
			rows: rest.map((r) => r.fields)
		}
	};
}
// src/core/variables.ts
var VARIABLES_FILE = "variables.json";
var isObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
/** Lit le dictionnaire ; inutilisable (undefined) s'il est illisible, mal formé ou ambigu. */
function readVariables(file) {
	const entries = isObject(file.data) && isObject(file.data.variables) ? Object.entries(file.data.variables) : void 0;
	if (!entries || entries.length === 0 || entries.some(([, v]) => typeof v !== "string" || v === "")) return { problems: [problem("ERR-VARIABLES-FORMAT", null, file.path, void 0)] };
	const byRegex = /* @__PURE__ */ new Map();
	const problems = [];
	for (const [name, regex] of entries) {
		const other = byRegex.get(regex);
		if (other !== void 0) problems.push(problem("ERR-VARIABLES-DUPLICATE", null, file.path, pointer("variables", name), {
			name,
			other
		}));
		else byRegex.set(regex, name);
	}
	if (problems.length) return { problems };
	const variables = new Map(entries);
	for (const [name, regex] of variables) {
		const kind = isOptional(name) !== isOptionalRegex(regex) ? isOptional(name) ? "suffix" : "regex" : name.startsWith("_") !== startsWithUnderscore(regex) ? name.startsWith("_") ? "noprefix" : "prefix" : void 0;
		if (kind) problems.push(problem("WARN-VARIABLES-OPT", null, file.path, pointer("variables", name), {
			name,
			kind
		}));
	}
	const raw = isObject(file.data) ? file.data.aliases : void 0;
	const aliases = /* @__PURE__ */ new Map();
	if (raw !== void 0) {
		if (!(isObject(raw) && Object.values(raw).every((names) => isObject(names) && Object.entries(names).every(([v, alias]) => variables.has(v) && typeof alias === "string" && alias !== "")))) return { problems: [problem("ERR-VARIABLES-FORMAT", null, file.path, "/aliases")] };
		for (const [family, names] of Object.entries(raw)) aliases.set(family, new Map(Object.entries(names)));
	}
	return {
		variables,
		aliases,
		problems
	};
}
/** Variable facultative : nom du dictionnaire (pas l'alias) de suffixe _OPT, convention partagée avec le GpU. */
var isOptional = (name) => name.endsWith("_OPT");
/** Regex dont le texte reconnu commence par « _ » (groupes ouvrants ignorés), ex. (_[a-zA-Z])?. */
var startsWithUnderscore = (regex) => regex.replace(/^\(+/, "").startsWith("_");
/** Regex de la forme (…)? : un seul groupe, qui couvre toute la regex, suivi de « ? ». */
function isOptionalRegex(regex) {
	if (!regex.startsWith("(") || !regex.endsWith(")?")) return false;
	let depth = 0;
	let inClass = false;
	for (let i = 0; i < regex.length - 1; i++) {
		const c = regex[i];
		if (c === "\\") i++;
		else if (inClass) inClass = c !== "]";
		else if (c === "[") inClass = true;
		else if (c === "(") depth++;
		else if (c === ")" && --depth === 0) return i === regex.length - 2;
	}
	return false;
}
// src/core/load/json.ts
function lineColumn(text, offset) {
	const before = text.slice(0, offset);
	return {
		line: before.split("\n").length,
		column: offset - before.lastIndexOf("\n")
	};
}
var SyntaxErrorAt = class extends Error {
	offset;
	constructor(offset, detail) {
		super(detail);
		this.offset = offset;
	}
};
function locateError(text) {
	let i = 0;
	const ws = () => {
		while (i < text.length && " 	\n\r".includes(text[i])) i++;
	};
	const fail = (expected) => {
		if (i >= text.length) throw new SyntaxErrorAt(i, `fin de fichier inattendue (attendu : ${expected})`);
		throw new SyntaxErrorAt(i, `caractère « ${text[i]} » inattendu (attendu : ${expected})`);
	};
	const literal = (word) => {
		if (text.startsWith(word, i)) i += word.length;
		else fail("une valeur");
	};
	const string = () => {
		i++;
		while (i < text.length && text[i] !== "\"") {
			if (text[i] === "\\") {
				i++;
				if (text[i] === "u") {
					if (!/^[0-9a-fA-F]{4}$/.test(text.slice(i + 1, i + 5))) fail("un échappement \\uXXXX");
					i += 4;
				} else if (!"\"\\/bfnrt".includes(text[i] ?? "")) fail("un échappement valide");
			} else if (text.charCodeAt(i) < 32) fail("un caractère imprimable ou « \" »");
			i++;
		}
		if (i >= text.length) fail("« \" »");
		i++;
	};
	const number = () => {
		const m = /^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/.exec(text.slice(i));
		if (!m) fail("une valeur");
		i += m[0].length;
	};
	const value = () => {
		ws();
		const c = text[i];
		if (c === "{") {
			i++;
			ws();
			if (text[i] === "}") return void i++;
			for (;;) {
				ws();
				if (text[i] !== "\"") fail("« \" »");
				string();
				ws();
				if (text[i] !== ":") fail("« : »");
				i++;
				value();
				ws();
				if (text[i] === ",") i++;
				else if (text[i] === "}") return void i++;
				else fail("« , » ou « } »");
			}
		} else if (c === "[") {
			i++;
			ws();
			if (text[i] === "]") return void i++;
			for (;;) {
				value();
				ws();
				if (text[i] === ",") i++;
				else if (text[i] === "]") return void i++;
				else fail("« , » ou « ] »");
			}
		} else if (c === "\"") string();
		else if (c === "t") literal("true");
		else if (c === "f") literal("false");
		else if (c === "n") literal("null");
		else if (c === "-" || c !== void 0 && c >= "0" && c <= "9") number();
		else fail("une valeur");
	};
	try {
		value();
		ws();
		if (i < text.length) fail("fin de fichier");
	} catch (e) {
		if (e instanceof SyntaxErrorAt) return e;
		throw e;
	}
	return new SyntaxErrorAt(0, "JSON invalide");
}
function parseJson(text) {
	try {
		return {
			ok: true,
			value: JSON.parse(text)
		};
	} catch {
		const e = locateError(text);
		return {
			ok: false,
			...lineColumn(text, e.offset),
			detail: e.message
		};
	}
}
// src/core/load/project.ts
/** Lit une liste de codes : entrée du modèle (CSV absent si illisible) et problèmes de lecture. */
function readCsv(model, path, text) {
	const r = parseCsv(text);
	if (r.ok) return {
		entry: {
			path,
			csv: r.csv
		},
		problems: []
	};
	return {
		entry: { path },
		problems: r.errors.map((e) => problem(e.code, model, path, `/${e.line}`, {
			line: e.line,
			...e.params
		}))
	};
}
function emptyModel(name) {
	return {
		name,
		tables: /* @__PURE__ */ new Map(),
		csvs: /* @__PURE__ */ new Map(),
		files: []
	};
}
/**
* Charge tous les modèles d'une configuration : un modèle par dossier de premier niveau.
* À la racine, seul `variables.json` est lu (dictionnaire des variables, feature 010).
*/
async function loadProject(fs) {
	const all = await fs.listFiles();
	const paths = all.filter((p) => p.includes("/")).sort();
	const texts = await Promise.all(paths.map((p) => fs.readText(p)));
	const models = /* @__PURE__ */ new Map();
	const problems = [];
	paths.forEach((path, i) => {
		const text = texts[i];
		const name = path.slice(0, path.indexOf("/"));
		const rel = path.slice(name.length + 1);
		let model = models.get(name);
		if (!model) models.set(name, model = emptyModel(name));
		model.files.push(path);
		if (path.endsWith(".csv")) {
			const r = readCsv(name, path, text);
			model.csvs.set(path, r.entry);
			problems.push(...r.problems);
			return;
		}
		const isTable = rel.startsWith("types/") && rel.endsWith(".json");
		if (rel !== "files.json" && !isTable) return;
		const file = { path };
		const r = parseJson(text);
		if (r.ok) file.data = r.value;
		else problems.push(problem("ERR-JSON-SYNTAX", name, path, void 0, {
			line: r.line,
			column: r.column,
			detail: r.detail
		}));
		if (rel === "files.json") model.document = file;
		else model.tables.set(path, file);
	});
	const project = { models };
	if (all.includes("variables.json")) {
		const r = parseJson(await fs.readText(VARIABLES_FILE));
		project.variables = r.ok ? {
			path: VARIABLES_FILE,
			data: r.value
		} : { path: VARIABLES_FILE };
	}
	return {
		project,
		problems
	};
}
// src/core/schemas/generated/validate.js
var import_ucs2length = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function ucs2length(str) {
		const len = str.length;
		let length = 0;
		let pos = 0;
		let value;
		while (pos < len) {
			length++;
			value = str.charCodeAt(pos++);
			if (value >= 55296 && value <= 56319 && pos < len) {
				value = str.charCodeAt(pos);
				if ((value & 64512) === 56320) pos++;
			}
		}
		return length;
	}
	exports.default = ucs2length;
	ucs2length.code = "require(\"ajv/dist/runtime/ucs2length\").default";
})))(), 1);
var validateDocument = validate10;
var pattern0 = /* @__PURE__ */ new RegExp("^[0-9A-Za-z]{32}$", "u");
var func2 = import_ucs2length.default.default ?? import_ucs2length.default;
var schema13 = {
	"type": "object",
	"required": [
		"name",
		"type",
		"path"
	],
	"properties": {
		"id": { "$ref": "#/definitions/Id" },
		"name": {
			"type": "string",
			"minLength": 1
		},
		"title": { "type": "string" },
		"description": { "type": "string" },
		"type": { "enum": [
			"table",
			"multi_table",
			"pdf",
			"metadata",
			"directory"
		] },
		"path": { "type": "string" },
		"mandatory": { "enum": [
			"ERROR",
			"WARN",
			"OPTIONAL"
		] },
		"tableModel": {
			"type": "string",
			"minLength": 1
		},
		"tables": {
			"type": "array",
			"items": {
				"type": "object",
				"required": ["name"],
				"properties": {
					"name": { "type": "string" },
					"path": { "type": "string" },
					"tableModel": { "type": "string" }
				}
			}
		}
	}
};
function validate11(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
	let vErrors = null;
	let errors = 0;
	if (data && typeof data == "object" && !Array.isArray(data)) {
		if (data.name === void 0) {
			const err0 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "name" },
				message: "must have required property 'name'"
			};
			if (vErrors === null) vErrors = [err0];
			else vErrors.push(err0);
			errors++;
		}
		if (data.type === void 0) {
			const err1 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "type" },
				message: "must have required property 'type'"
			};
			if (vErrors === null) vErrors = [err1];
			else vErrors.push(err1);
			errors++;
		}
		if (data.path === void 0) {
			const err2 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "path" },
				message: "must have required property 'path'"
			};
			if (vErrors === null) vErrors = [err2];
			else vErrors.push(err2);
			errors++;
		}
		if (data.id !== void 0) {
			let data0 = data.id;
			if (typeof data0 === "string") {
				if (!pattern0.test(data0)) {
					const err3 = {
						instancePath: instancePath + "/id",
						schemaPath: "#/definitions/Id/pattern",
						keyword: "pattern",
						params: { pattern: "^[0-9A-Za-z]{32}$" },
						message: "must match pattern \"^[0-9A-Za-z]{32}$\""
					};
					if (vErrors === null) vErrors = [err3];
					else vErrors.push(err3);
					errors++;
				}
			} else {
				const err4 = {
					instancePath: instancePath + "/id",
					schemaPath: "#/definitions/Id/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err4];
				else vErrors.push(err4);
				errors++;
			}
		}
		if (data.name !== void 0) {
			let data1 = data.name;
			if (typeof data1 === "string") {
				if (func2(data1) < 1) {
					const err5 = {
						instancePath: instancePath + "/name",
						schemaPath: "#/properties/name/minLength",
						keyword: "minLength",
						params: { limit: 1 },
						message: "must NOT have fewer than 1 characters"
					};
					if (vErrors === null) vErrors = [err5];
					else vErrors.push(err5);
					errors++;
				}
			} else {
				const err6 = {
					instancePath: instancePath + "/name",
					schemaPath: "#/properties/name/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err6];
				else vErrors.push(err6);
				errors++;
			}
		}
		if (data.title !== void 0) {
			if (typeof data.title !== "string") {
				const err7 = {
					instancePath: instancePath + "/title",
					schemaPath: "#/properties/title/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err7];
				else vErrors.push(err7);
				errors++;
			}
		}
		if (data.description !== void 0) {
			if (typeof data.description !== "string") {
				const err8 = {
					instancePath: instancePath + "/description",
					schemaPath: "#/properties/description/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err8];
				else vErrors.push(err8);
				errors++;
			}
		}
		if (data.type !== void 0) {
			let data4 = data.type;
			if (!(data4 === "table" || data4 === "multi_table" || data4 === "pdf" || data4 === "metadata" || data4 === "directory")) {
				const err9 = {
					instancePath: instancePath + "/type",
					schemaPath: "#/properties/type/enum",
					keyword: "enum",
					params: { allowedValues: schema13.properties.type.enum },
					message: "must be equal to one of the allowed values"
				};
				if (vErrors === null) vErrors = [err9];
				else vErrors.push(err9);
				errors++;
			}
		}
		if (data.path !== void 0) {
			if (typeof data.path !== "string") {
				const err10 = {
					instancePath: instancePath + "/path",
					schemaPath: "#/properties/path/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err10];
				else vErrors.push(err10);
				errors++;
			}
		}
		if (data.mandatory !== void 0) {
			let data6 = data.mandatory;
			if (!(data6 === "ERROR" || data6 === "WARN" || data6 === "OPTIONAL")) {
				const err11 = {
					instancePath: instancePath + "/mandatory",
					schemaPath: "#/properties/mandatory/enum",
					keyword: "enum",
					params: { allowedValues: schema13.properties.mandatory.enum },
					message: "must be equal to one of the allowed values"
				};
				if (vErrors === null) vErrors = [err11];
				else vErrors.push(err11);
				errors++;
			}
		}
		if (data.tableModel !== void 0) {
			let data7 = data.tableModel;
			if (typeof data7 === "string") {
				if (func2(data7) < 1) {
					const err12 = {
						instancePath: instancePath + "/tableModel",
						schemaPath: "#/properties/tableModel/minLength",
						keyword: "minLength",
						params: { limit: 1 },
						message: "must NOT have fewer than 1 characters"
					};
					if (vErrors === null) vErrors = [err12];
					else vErrors.push(err12);
					errors++;
				}
			} else {
				const err13 = {
					instancePath: instancePath + "/tableModel",
					schemaPath: "#/properties/tableModel/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err13];
				else vErrors.push(err13);
				errors++;
			}
		}
		if (data.tables !== void 0) {
			let data8 = data.tables;
			if (Array.isArray(data8)) {
				const len0 = data8.length;
				for (let i0 = 0; i0 < len0; i0++) {
					let data9 = data8[i0];
					if (data9 && typeof data9 == "object" && !Array.isArray(data9)) {
						if (data9.name === void 0) {
							const err14 = {
								instancePath: instancePath + "/tables/" + i0,
								schemaPath: "#/properties/tables/items/required",
								keyword: "required",
								params: { missingProperty: "name" },
								message: "must have required property 'name'"
							};
							if (vErrors === null) vErrors = [err14];
							else vErrors.push(err14);
							errors++;
						}
						if (data9.name !== void 0) {
							if (typeof data9.name !== "string") {
								const err15 = {
									instancePath: instancePath + "/tables/" + i0 + "/name",
									schemaPath: "#/properties/tables/items/properties/name/type",
									keyword: "type",
									params: { type: "string" },
									message: "must be string"
								};
								if (vErrors === null) vErrors = [err15];
								else vErrors.push(err15);
								errors++;
							}
						}
						if (data9.path !== void 0) {
							if (typeof data9.path !== "string") {
								const err16 = {
									instancePath: instancePath + "/tables/" + i0 + "/path",
									schemaPath: "#/properties/tables/items/properties/path/type",
									keyword: "type",
									params: { type: "string" },
									message: "must be string"
								};
								if (vErrors === null) vErrors = [err16];
								else vErrors.push(err16);
								errors++;
							}
						}
						if (data9.tableModel !== void 0) {
							if (typeof data9.tableModel !== "string") {
								const err17 = {
									instancePath: instancePath + "/tables/" + i0 + "/tableModel",
									schemaPath: "#/properties/tables/items/properties/tableModel/type",
									keyword: "type",
									params: { type: "string" },
									message: "must be string"
								};
								if (vErrors === null) vErrors = [err17];
								else vErrors.push(err17);
								errors++;
							}
						}
					} else {
						const err18 = {
							instancePath: instancePath + "/tables/" + i0,
							schemaPath: "#/properties/tables/items/type",
							keyword: "type",
							params: { type: "object" },
							message: "must be object"
						};
						if (vErrors === null) vErrors = [err18];
						else vErrors.push(err18);
						errors++;
					}
				}
			} else {
				const err19 = {
					instancePath: instancePath + "/tables",
					schemaPath: "#/properties/tables/type",
					keyword: "type",
					params: { type: "array" },
					message: "must be array"
				};
				if (vErrors === null) vErrors = [err19];
				else vErrors.push(err19);
				errors++;
			}
		}
	} else {
		const err20 = {
			instancePath,
			schemaPath: "#/type",
			keyword: "type",
			params: { type: "object" },
			message: "must be object"
		};
		if (vErrors === null) vErrors = [err20];
		else vErrors.push(err20);
		errors++;
	}
	validate11.errors = vErrors;
	return errors === 0;
}
function validate13(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
	let vErrors = null;
	let errors = 0;
	if (data && typeof data == "object" && !Array.isArray(data)) {
		if (data.name === void 0) {
			const err0 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "name" },
				message: "must have required property 'name'"
			};
			if (vErrors === null) vErrors = [err0];
			else vErrors.push(err0);
			errors++;
		}
		if (data.data === void 0) {
			const err1 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "data" },
				message: "must have required property 'data'"
			};
			if (vErrors === null) vErrors = [err1];
			else vErrors.push(err1);
			errors++;
		}
		if (data.id !== void 0) {
			let data0 = data.id;
			if (typeof data0 === "string") {
				if (!pattern0.test(data0)) {
					const err2 = {
						instancePath: instancePath + "/id",
						schemaPath: "#/definitions/Id/pattern",
						keyword: "pattern",
						params: { pattern: "^[0-9A-Za-z]{32}$" },
						message: "must match pattern \"^[0-9A-Za-z]{32}$\""
					};
					if (vErrors === null) vErrors = [err2];
					else vErrors.push(err2);
					errors++;
				}
			} else {
				const err3 = {
					instancePath: instancePath + "/id",
					schemaPath: "#/definitions/Id/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err3];
				else vErrors.push(err3);
				errors++;
			}
		}
		if (data.name !== void 0) {
			let data1 = data.name;
			if (typeof data1 === "string") {
				if (func2(data1) < 1) {
					const err4 = {
						instancePath: instancePath + "/name",
						schemaPath: "#/properties/name/minLength",
						keyword: "minLength",
						params: { limit: 1 },
						message: "must NOT have fewer than 1 characters"
					};
					if (vErrors === null) vErrors = [err4];
					else vErrors.push(err4);
					errors++;
				}
			} else {
				const err5 = {
					instancePath: instancePath + "/name",
					schemaPath: "#/properties/name/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err5];
				else vErrors.push(err5);
				errors++;
			}
		}
		if (data.title !== void 0) {
			if (typeof data.title !== "string") {
				const err6 = {
					instancePath: instancePath + "/title",
					schemaPath: "#/properties/title/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err6];
				else vErrors.push(err6);
				errors++;
			}
		}
		if (data.data !== void 0) {
			let data3 = data.data;
			if (typeof data3 === "string") {
				if (func2(data3) < 1) {
					const err7 = {
						instancePath: instancePath + "/data",
						schemaPath: "#/properties/data/minLength",
						keyword: "minLength",
						params: { limit: 1 },
						message: "must NOT have fewer than 1 characters"
					};
					if (vErrors === null) vErrors = [err7];
					else vErrors.push(err7);
					errors++;
				}
			} else {
				const err8 = {
					instancePath: instancePath + "/data",
					schemaPath: "#/properties/data/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err8];
				else vErrors.push(err8);
				errors++;
			}
		}
	} else {
		const err9 = {
			instancePath,
			schemaPath: "#/type",
			keyword: "type",
			params: { type: "object" },
			message: "must be object"
		};
		if (vErrors === null) vErrors = [err9];
		else vErrors.push(err9);
		errors++;
	}
	validate13.errors = vErrors;
	return errors === 0;
}
function validate10(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
	let vErrors = null;
	let errors = 0;
	if (data && typeof data == "object" && !Array.isArray(data)) {
		if (data.name === void 0) {
			const err0 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "name" },
				message: "must have required property 'name'"
			};
			if (vErrors === null) vErrors = [err0];
			else vErrors.push(err0);
			errors++;
		}
		if (data.files === void 0) {
			const err1 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "files" },
				message: "must have required property 'files'"
			};
			if (vErrors === null) vErrors = [err1];
			else vErrors.push(err1);
			errors++;
		}
		if (data.id !== void 0) {
			let data0 = data.id;
			if (typeof data0 === "string") {
				if (!pattern0.test(data0)) {
					const err2 = {
						instancePath: instancePath + "/id",
						schemaPath: "#/definitions/Id/pattern",
						keyword: "pattern",
						params: { pattern: "^[0-9A-Za-z]{32}$" },
						message: "must match pattern \"^[0-9A-Za-z]{32}$\""
					};
					if (vErrors === null) vErrors = [err2];
					else vErrors.push(err2);
					errors++;
				}
			} else {
				const err3 = {
					instancePath: instancePath + "/id",
					schemaPath: "#/definitions/Id/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err3];
				else vErrors.push(err3);
				errors++;
			}
		}
		if (data.name !== void 0) {
			let data1 = data.name;
			if (typeof data1 === "string") {
				if (func2(data1) < 1) {
					const err4 = {
						instancePath: instancePath + "/name",
						schemaPath: "#/properties/name/minLength",
						keyword: "minLength",
						params: { limit: 1 },
						message: "must NOT have fewer than 1 characters"
					};
					if (vErrors === null) vErrors = [err4];
					else vErrors.push(err4);
					errors++;
				}
			} else {
				const err5 = {
					instancePath: instancePath + "/name",
					schemaPath: "#/properties/name/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err5];
				else vErrors.push(err5);
				errors++;
			}
		}
		if (data.title !== void 0) {
			if (typeof data.title !== "string") {
				const err6 = {
					instancePath: instancePath + "/title",
					schemaPath: "#/properties/title/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err6];
				else vErrors.push(err6);
				errors++;
			}
		}
		if (data.description !== void 0) {
			if (typeof data.description !== "string") {
				const err7 = {
					instancePath: instancePath + "/description",
					schemaPath: "#/properties/description/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err7];
				else vErrors.push(err7);
				errors++;
			}
		}
		if (data.files !== void 0) {
			let data4 = data.files;
			if (Array.isArray(data4)) {
				const len0 = data4.length;
				for (let i0 = 0; i0 < len0; i0++) if (!validate11(data4[i0], {
					instancePath: instancePath + "/files/" + i0,
					parentData: data4,
					parentDataProperty: i0,
					rootData
				})) {
					vErrors = vErrors === null ? validate11.errors : vErrors.concat(validate11.errors);
					errors = vErrors.length;
				}
			} else {
				const err8 = {
					instancePath: instancePath + "/files",
					schemaPath: "#/properties/files/type",
					keyword: "type",
					params: { type: "array" },
					message: "must be array"
				};
				if (vErrors === null) vErrors = [err8];
				else vErrors.push(err8);
				errors++;
			}
		}
		if (data.codes !== void 0) {
			let data6 = data.codes;
			if (Array.isArray(data6)) {
				const len1 = data6.length;
				for (let i1 = 0; i1 < len1; i1++) if (!validate13(data6[i1], {
					instancePath: instancePath + "/codes/" + i1,
					parentData: data6,
					parentDataProperty: i1,
					rootData
				})) {
					vErrors = vErrors === null ? validate13.errors : vErrors.concat(validate13.errors);
					errors = vErrors.length;
				}
			} else {
				const err9 = {
					instancePath: instancePath + "/codes",
					schemaPath: "#/properties/codes/type",
					keyword: "type",
					params: { type: "array" },
					message: "must be array"
				};
				if (vErrors === null) vErrors = [err9];
				else vErrors.push(err9);
				errors++;
			}
		}
		if (data.constraints !== void 0) {
			let data8 = data.constraints;
			if (data8 && typeof data8 == "object" && !Array.isArray(data8)) {
				if (data8.folderName !== void 0) {
					if (typeof data8.folderName !== "string") {
						const err10 = {
							instancePath: instancePath + "/constraints/folderName",
							schemaPath: "#/definitions/DocumentConstraints/properties/folderName/type",
							keyword: "type",
							params: { type: "string" },
							message: "must be string"
						};
						if (vErrors === null) vErrors = [err10];
						else vErrors.push(err10);
						errors++;
					}
				}
				if (data8.metadataSpecification !== void 0) {
					if (typeof data8.metadataSpecification !== "string") {
						const err11 = {
							instancePath: instancePath + "/constraints/metadataSpecification",
							schemaPath: "#/definitions/DocumentConstraints/properties/metadataSpecification/type",
							keyword: "type",
							params: { type: "string" },
							message: "must be string"
						};
						if (vErrors === null) vErrors = [err11];
						else vErrors.push(err11);
						errors++;
					}
				}
			} else {
				const err12 = {
					instancePath: instancePath + "/constraints",
					schemaPath: "#/definitions/DocumentConstraints/type",
					keyword: "type",
					params: { type: "object" },
					message: "must be object"
				};
				if (vErrors === null) vErrors = [err12];
				else vErrors.push(err12);
				errors++;
			}
		}
	} else {
		const err13 = {
			instancePath,
			schemaPath: "#/type",
			keyword: "type",
			params: { type: "object" },
			message: "must be object"
		};
		if (vErrors === null) vErrors = [err13];
		else vErrors.push(err13);
		errors++;
	}
	validate10.errors = vErrors;
	return errors === 0;
}
var validateTable = validate15;
var schema20 = {
	"type": "object",
	"required": ["name", "type"],
	"properties": {
		"id": { "$ref": "document#/definitions/Id" },
		"name": {
			"type": "string",
			"minLength": 1
		},
		"title": { "type": "string" },
		"description": { "type": "string" },
		"type": { "enum": [
			"Boolean",
			"Date",
			"Double",
			"Filename",
			"Geometry",
			"GeometryCollection",
			"Integer",
			"LineString",
			"MultiLineString",
			"MultiPoint",
			"MultiPolygon",
			"Path",
			"Point",
			"Polygon",
			"String",
			"Url"
		] },
		"constraints": { "$ref": "#/definitions/ColumnConstraints" }
	}
};
var schema22 = {
	"type": "object",
	"properties": {
		"required": { "type": "boolean" },
		"presenceRequired": { "type": "boolean" },
		"unique": { "type": "boolean" },
		"pattern": { "type": "string" },
		"minLength": {
			"type": "integer",
			"minimum": 0
		},
		"maxLength": {
			"type": "integer",
			"minimum": -1,
			"description": "-1 : pas de limite (ignoré par le validator)"
		},
		"enum": {
			"type": ["array", "null"],
			"items": { "type": [
				"string",
				"number",
				"boolean"
			] }
		},
		"reference": { "type": "string" }
	}
};
function validate16(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
	let vErrors = null;
	let errors = 0;
	if (data && typeof data == "object" && !Array.isArray(data)) {
		if (data.name === void 0) {
			const err0 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "name" },
				message: "must have required property 'name'"
			};
			if (vErrors === null) vErrors = [err0];
			else vErrors.push(err0);
			errors++;
		}
		if (data.type === void 0) {
			const err1 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "type" },
				message: "must have required property 'type'"
			};
			if (vErrors === null) vErrors = [err1];
			else vErrors.push(err1);
			errors++;
		}
		if (data.id !== void 0) {
			let data0 = data.id;
			if (typeof data0 === "string") {
				if (!pattern0.test(data0)) {
					const err2 = {
						instancePath: instancePath + "/id",
						schemaPath: "document#/definitions/Id/pattern",
						keyword: "pattern",
						params: { pattern: "^[0-9A-Za-z]{32}$" },
						message: "must match pattern \"^[0-9A-Za-z]{32}$\""
					};
					if (vErrors === null) vErrors = [err2];
					else vErrors.push(err2);
					errors++;
				}
			} else {
				const err3 = {
					instancePath: instancePath + "/id",
					schemaPath: "document#/definitions/Id/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err3];
				else vErrors.push(err3);
				errors++;
			}
		}
		if (data.name !== void 0) {
			let data1 = data.name;
			if (typeof data1 === "string") {
				if (func2(data1) < 1) {
					const err4 = {
						instancePath: instancePath + "/name",
						schemaPath: "#/properties/name/minLength",
						keyword: "minLength",
						params: { limit: 1 },
						message: "must NOT have fewer than 1 characters"
					};
					if (vErrors === null) vErrors = [err4];
					else vErrors.push(err4);
					errors++;
				}
			} else {
				const err5 = {
					instancePath: instancePath + "/name",
					schemaPath: "#/properties/name/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err5];
				else vErrors.push(err5);
				errors++;
			}
		}
		if (data.title !== void 0) {
			if (typeof data.title !== "string") {
				const err6 = {
					instancePath: instancePath + "/title",
					schemaPath: "#/properties/title/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err6];
				else vErrors.push(err6);
				errors++;
			}
		}
		if (data.description !== void 0) {
			if (typeof data.description !== "string") {
				const err7 = {
					instancePath: instancePath + "/description",
					schemaPath: "#/properties/description/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err7];
				else vErrors.push(err7);
				errors++;
			}
		}
		if (data.type !== void 0) {
			let data4 = data.type;
			if (!(data4 === "Boolean" || data4 === "Date" || data4 === "Double" || data4 === "Filename" || data4 === "Geometry" || data4 === "GeometryCollection" || data4 === "Integer" || data4 === "LineString" || data4 === "MultiLineString" || data4 === "MultiPoint" || data4 === "MultiPolygon" || data4 === "Path" || data4 === "Point" || data4 === "Polygon" || data4 === "String" || data4 === "Url")) {
				const err8 = {
					instancePath: instancePath + "/type",
					schemaPath: "#/properties/type/enum",
					keyword: "enum",
					params: { allowedValues: schema20.properties.type.enum },
					message: "must be equal to one of the allowed values"
				};
				if (vErrors === null) vErrors = [err8];
				else vErrors.push(err8);
				errors++;
			}
		}
		if (data.constraints !== void 0) {
			let data5 = data.constraints;
			if (data5 && typeof data5 == "object" && !Array.isArray(data5)) {
				if (data5.required !== void 0) {
					if (typeof data5.required !== "boolean") {
						const err9 = {
							instancePath: instancePath + "/constraints/required",
							schemaPath: "#/definitions/ColumnConstraints/properties/required/type",
							keyword: "type",
							params: { type: "boolean" },
							message: "must be boolean"
						};
						if (vErrors === null) vErrors = [err9];
						else vErrors.push(err9);
						errors++;
					}
				}
				if (data5.presenceRequired !== void 0) {
					if (typeof data5.presenceRequired !== "boolean") {
						const err10 = {
							instancePath: instancePath + "/constraints/presenceRequired",
							schemaPath: "#/definitions/ColumnConstraints/properties/presenceRequired/type",
							keyword: "type",
							params: { type: "boolean" },
							message: "must be boolean"
						};
						if (vErrors === null) vErrors = [err10];
						else vErrors.push(err10);
						errors++;
					}
				}
				if (data5.unique !== void 0) {
					if (typeof data5.unique !== "boolean") {
						const err11 = {
							instancePath: instancePath + "/constraints/unique",
							schemaPath: "#/definitions/ColumnConstraints/properties/unique/type",
							keyword: "type",
							params: { type: "boolean" },
							message: "must be boolean"
						};
						if (vErrors === null) vErrors = [err11];
						else vErrors.push(err11);
						errors++;
					}
				}
				if (data5.pattern !== void 0) {
					if (typeof data5.pattern !== "string") {
						const err12 = {
							instancePath: instancePath + "/constraints/pattern",
							schemaPath: "#/definitions/ColumnConstraints/properties/pattern/type",
							keyword: "type",
							params: { type: "string" },
							message: "must be string"
						};
						if (vErrors === null) vErrors = [err12];
						else vErrors.push(err12);
						errors++;
					}
				}
				if (data5.minLength !== void 0) {
					let data10 = data5.minLength;
					if (!(typeof data10 == "number" && !(data10 % 1) && !isNaN(data10) && isFinite(data10))) {
						const err13 = {
							instancePath: instancePath + "/constraints/minLength",
							schemaPath: "#/definitions/ColumnConstraints/properties/minLength/type",
							keyword: "type",
							params: { type: "integer" },
							message: "must be integer"
						};
						if (vErrors === null) vErrors = [err13];
						else vErrors.push(err13);
						errors++;
					}
					if (typeof data10 == "number" && isFinite(data10)) {
						if (data10 < 0 || isNaN(data10)) {
							const err14 = {
								instancePath: instancePath + "/constraints/minLength",
								schemaPath: "#/definitions/ColumnConstraints/properties/minLength/minimum",
								keyword: "minimum",
								params: {
									comparison: ">=",
									limit: 0
								},
								message: "must be >= 0"
							};
							if (vErrors === null) vErrors = [err14];
							else vErrors.push(err14);
							errors++;
						}
					}
				}
				if (data5.maxLength !== void 0) {
					let data11 = data5.maxLength;
					if (!(typeof data11 == "number" && !(data11 % 1) && !isNaN(data11) && isFinite(data11))) {
						const err15 = {
							instancePath: instancePath + "/constraints/maxLength",
							schemaPath: "#/definitions/ColumnConstraints/properties/maxLength/type",
							keyword: "type",
							params: { type: "integer" },
							message: "must be integer"
						};
						if (vErrors === null) vErrors = [err15];
						else vErrors.push(err15);
						errors++;
					}
					if (typeof data11 == "number" && isFinite(data11)) {
						if (data11 < -1 || isNaN(data11)) {
							const err16 = {
								instancePath: instancePath + "/constraints/maxLength",
								schemaPath: "#/definitions/ColumnConstraints/properties/maxLength/minimum",
								keyword: "minimum",
								params: {
									comparison: ">=",
									limit: -1
								},
								message: "must be >= -1"
							};
							if (vErrors === null) vErrors = [err16];
							else vErrors.push(err16);
							errors++;
						}
					}
				}
				if (data5.enum !== void 0) {
					let data12 = data5.enum;
					if (!Array.isArray(data12) && data12 !== null) {
						const err17 = {
							instancePath: instancePath + "/constraints/enum",
							schemaPath: "#/definitions/ColumnConstraints/properties/enum/type",
							keyword: "type",
							params: { type: schema22.properties.enum.type },
							message: "must be array,null"
						};
						if (vErrors === null) vErrors = [err17];
						else vErrors.push(err17);
						errors++;
					}
					if (Array.isArray(data12)) {
						const len0 = data12.length;
						for (let i0 = 0; i0 < len0; i0++) {
							let data13 = data12[i0];
							if (typeof data13 !== "string" && !(typeof data13 == "number" && isFinite(data13)) && typeof data13 !== "boolean") {
								const err18 = {
									instancePath: instancePath + "/constraints/enum/" + i0,
									schemaPath: "#/definitions/ColumnConstraints/properties/enum/items/type",
									keyword: "type",
									params: { type: schema22.properties.enum.items.type },
									message: "must be string,number,boolean"
								};
								if (vErrors === null) vErrors = [err18];
								else vErrors.push(err18);
								errors++;
							}
						}
					}
				}
				if (data5.reference !== void 0) {
					if (typeof data5.reference !== "string") {
						const err19 = {
							instancePath: instancePath + "/constraints/reference",
							schemaPath: "#/definitions/ColumnConstraints/properties/reference/type",
							keyword: "type",
							params: { type: "string" },
							message: "must be string"
						};
						if (vErrors === null) vErrors = [err19];
						else vErrors.push(err19);
						errors++;
					}
				}
			} else {
				const err20 = {
					instancePath: instancePath + "/constraints",
					schemaPath: "#/definitions/ColumnConstraints/type",
					keyword: "type",
					params: { type: "object" },
					message: "must be object"
				};
				if (vErrors === null) vErrors = [err20];
				else vErrors.push(err20);
				errors++;
			}
		}
	} else {
		const err21 = {
			instancePath,
			schemaPath: "#/type",
			keyword: "type",
			params: { type: "object" },
			message: "must be object"
		};
		if (vErrors === null) vErrors = [err21];
		else vErrors.push(err21);
		errors++;
	}
	validate16.errors = vErrors;
	return errors === 0;
}
function validate15(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
	let vErrors = null;
	let errors = 0;
	if (data && typeof data == "object" && !Array.isArray(data)) {
		if (data.name === void 0) {
			const err0 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "name" },
				message: "must have required property 'name'"
			};
			if (vErrors === null) vErrors = [err0];
			else vErrors.push(err0);
			errors++;
		}
		if (data.columns === void 0) {
			const err1 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "columns" },
				message: "must have required property 'columns'"
			};
			if (vErrors === null) vErrors = [err1];
			else vErrors.push(err1);
			errors++;
		}
		if (data.id !== void 0) {
			let data0 = data.id;
			if (typeof data0 === "string") {
				if (!pattern0.test(data0)) {
					const err2 = {
						instancePath: instancePath + "/id",
						schemaPath: "document#/definitions/Id/pattern",
						keyword: "pattern",
						params: { pattern: "^[0-9A-Za-z]{32}$" },
						message: "must match pattern \"^[0-9A-Za-z]{32}$\""
					};
					if (vErrors === null) vErrors = [err2];
					else vErrors.push(err2);
					errors++;
				}
			} else {
				const err3 = {
					instancePath: instancePath + "/id",
					schemaPath: "document#/definitions/Id/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err3];
				else vErrors.push(err3);
				errors++;
			}
		}
		if (data.name !== void 0) {
			let data1 = data.name;
			if (typeof data1 === "string") {
				if (func2(data1) < 1) {
					const err4 = {
						instancePath: instancePath + "/name",
						schemaPath: "#/properties/name/minLength",
						keyword: "minLength",
						params: { limit: 1 },
						message: "must NOT have fewer than 1 characters"
					};
					if (vErrors === null) vErrors = [err4];
					else vErrors.push(err4);
					errors++;
				}
			} else {
				const err5 = {
					instancePath: instancePath + "/name",
					schemaPath: "#/properties/name/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err5];
				else vErrors.push(err5);
				errors++;
			}
		}
		if (data.title !== void 0) {
			if (typeof data.title !== "string") {
				const err6 = {
					instancePath: instancePath + "/title",
					schemaPath: "#/properties/title/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err6];
				else vErrors.push(err6);
				errors++;
			}
		}
		if (data.description !== void 0) {
			if (typeof data.description !== "string") {
				const err7 = {
					instancePath: instancePath + "/description",
					schemaPath: "#/properties/description/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err7];
				else vErrors.push(err7);
				errors++;
			}
		}
		if (data.columns !== void 0) {
			let data4 = data.columns;
			if (Array.isArray(data4)) {
				const len0 = data4.length;
				for (let i0 = 0; i0 < len0; i0++) if (!validate16(data4[i0], {
					instancePath: instancePath + "/columns/" + i0,
					parentData: data4,
					parentDataProperty: i0,
					rootData
				})) {
					vErrors = vErrors === null ? validate16.errors : vErrors.concat(validate16.errors);
					errors = vErrors.length;
				}
			} else {
				const err8 = {
					instancePath: instancePath + "/columns",
					schemaPath: "#/properties/columns/type",
					keyword: "type",
					params: { type: "array" },
					message: "must be array"
				};
				if (vErrors === null) vErrors = [err8];
				else vErrors.push(err8);
				errors++;
			}
		}
		if (data.constraints !== void 0) {
			let data6 = data.constraints;
			if (data6 && typeof data6 == "object" && !Array.isArray(data6)) {
				if (data6.conditions !== void 0) {
					let data7 = data6.conditions;
					if (Array.isArray(data7)) {
						const len1 = data7.length;
						for (let i1 = 0; i1 < len1; i1++) if (typeof data7[i1] !== "string") {
							const err9 = {
								instancePath: instancePath + "/constraints/conditions/" + i1,
								schemaPath: "#/properties/constraints/properties/conditions/items/type",
								keyword: "type",
								params: { type: "string" },
								message: "must be string"
							};
							if (vErrors === null) vErrors = [err9];
							else vErrors.push(err9);
							errors++;
						}
					} else {
						const err10 = {
							instancePath: instancePath + "/constraints/conditions",
							schemaPath: "#/properties/constraints/properties/conditions/type",
							keyword: "type",
							params: { type: "array" },
							message: "must be array"
						};
						if (vErrors === null) vErrors = [err10];
						else vErrors.push(err10);
						errors++;
					}
				}
				if (data6.foreignKeys !== void 0) {
					let data9 = data6.foreignKeys;
					if (Array.isArray(data9)) {
						const len2 = data9.length;
						for (let i2 = 0; i2 < len2; i2++) if (typeof data9[i2] !== "string") {
							const err11 = {
								instancePath: instancePath + "/constraints/foreignKeys/" + i2,
								schemaPath: "#/properties/constraints/properties/foreignKeys/items/type",
								keyword: "type",
								params: { type: "string" },
								message: "must be string"
							};
							if (vErrors === null) vErrors = [err11];
							else vErrors.push(err11);
							errors++;
						}
					} else {
						const err12 = {
							instancePath: instancePath + "/constraints/foreignKeys",
							schemaPath: "#/properties/constraints/properties/foreignKeys/type",
							keyword: "type",
							params: { type: "array" },
							message: "must be array"
						};
						if (vErrors === null) vErrors = [err12];
						else vErrors.push(err12);
						errors++;
					}
				}
			} else {
				const err13 = {
					instancePath: instancePath + "/constraints",
					schemaPath: "#/properties/constraints/type",
					keyword: "type",
					params: { type: "object" },
					message: "must be object"
				};
				if (vErrors === null) vErrors = [err13];
				else vErrors.push(err13);
				errors++;
			}
		}
	} else {
		const err14 = {
			instancePath,
			schemaPath: "#/type",
			keyword: "type",
			params: { type: "object" },
			message: "must be object"
		};
		if (vErrors === null) vErrors = [err14];
		else vErrors.push(err14);
		errors++;
	}
	validate15.errors = vErrors;
	return errors === 0;
}
// src/core/model/paths.ts
var isUrl = (ref) => /^[a-z][a-z0-9+.-]*:/i.test(ref);
/** Résout un chemin relatif au dossier d'un modèle ; undefined s'il sort de la configuration. */
function resolvePath(model, ref) {
	const segments = [model];
	for (const s of ref.split("/")) {
		if (s === "" || s === ".") continue;
		if (s === "..") {
			if (segments.length === 0) return void 0;
			segments.pop();
		} else segments.push(s);
	}
	return segments.length > 0 ? segments.join("/") : void 0;
}
/**
* Modèle de table d'un fichier : `tableModel`, sinon `./types/<name>.json` (convention du
* validator). `undefined` pour `auto` ou une URL, qui ne désignent pas un fichier local.
*/
function tableModelRef(tableModel, name) {
	if (tableModel !== void 0 && (tableModel.toLowerCase() === "auto" || isUrl(tableModel))) return void 0;
	return tableModel ?? `./types/${name}.json`;
}
/** Nom d'une liste de codes d'après son fichier (feature 012, R5) : nom du CSV sans « .csv ». */
var listNameOf = (data) => (data.split("/").pop() ?? "").replace(/\.csv$/i, "");
// src/core/validation/foreign-key.ts
var SYNTAX = /^\((\w+(?:,\w+)*)\)REFERENCES *(\w+)\((\w+(?:,\w+)*)\)$/;
function parseForeignKey(text) {
	const compact = text.replace(/\s*([(),])\s*/g, "$1");
	const m = SYNTAX.exec(compact);
	if (!m) return void 0;
	const sourceColumns = m[1].split(",");
	const targetColumns = m[3].split(",");
	if (sourceColumns.length !== targetColumns.length) return void 0;
	return {
		sourceColumns,
		target: m[2],
		targetColumns
	};
}
// src/core/validation/refs.ts
var Checker = class {
	project;
	checked;
	out = [];
	files;
	constructor(project, checked) {
		this.project = project;
		this.checked = checked;
		this.files = new Set([...project.models.values()].flatMap((m) => m.files));
	}
	run() {
		for (const c of this.checked.values()) this.model(c);
		return this.out;
	}
	model(c) {
		const name = c.model.name;
		if (!c.model.document) this.out.push(problem("WARN-MODEL-NO-DOCUMENT", name, `${name}/`, void 0));
		const referenced = this.document(c);
		this.ids(c);
		for (const [path, table] of c.tables) this.table(c, path, table);
		if (c.document) for (const path of c.model.files) {
			const rel = path.slice(name.length + 1);
			if ((rel.startsWith("types/") && rel.endsWith(".json") || rel.startsWith("codes/") && rel.endsWith(".csv")) && !referenced.has(path)) this.out.push(problem("WARN-UNREFERENCED-FILE", name, path, void 0));
		}
	}
	document(c) {
		const referenced = /* @__PURE__ */ new Set();
		const doc = c.document;
		if (!doc) return referenced;
		const name = c.model.name;
		const file = `${name}/files.json`;
		if (doc.name !== name) this.out.push(problem("WARN-MODEL-NAME", name, file, "/name", {
			name: doc.name,
			folder: name
		}));
		const tableRef = (ref, tableName, at) => {
			const target = tableModelRef(ref, tableName);
			if (target === void 0) return;
			const path = resolvePath(name, target);
			if (path && this.files.has(path)) referenced.add(path);
			else this.out.push(problem("ERR-TABLE-MODEL-MISSING", name, file, ref !== void 0 ? `${at}/tableModel` : at, { ref: target }));
		};
		doc.files.forEach((f, i) => {
			if (f.type === "table") tableRef(f.tableModel, f.name, pointer("files", i));
			else if (f.type === "multi_table") f.tables?.forEach((t, j) => tableRef(t.tableModel, t.name, pointer("files", i, "tables", j)));
		});
		doc.codes?.forEach((code, i) => {
			if (isUrl(code.data)) return;
			if (code.name !== listNameOf(code.data)) this.out.push(problem("WARN-CODE-NAME-FILE", name, file, pointer("codes", i, "name"), {
				name: code.name,
				expected: listNameOf(code.data)
			}));
			const path = resolvePath(name, code.data);
			if (path && this.files.has(path)) referenced.add(path);
			else this.out.push(problem("ERR-CODE-DATA-MISSING", name, file, pointer("codes", i, "data"), { ref: code.data }));
		});
		return referenced;
	}
	ids(c) {
		const name = c.model.name;
		const unique = () => {
			const seen = /* @__PURE__ */ new Map();
			return (id, file, at) => {
				if (id === void 0) return;
				const first = seen.get(id);
				if (first) this.out.push(problem("ERR-ID-DUPLICATE", name, file, at, {
					id,
					first
				}));
				else seen.set(id, `${file.slice(name.length + 1)}#${at}`);
			};
		};
		const add = unique();
		const doc = c.document;
		if (doc) {
			const file = `${name}/files.json`;
			add(doc.id, file, "/id");
			doc.files.forEach((f, i) => add(f.id, file, pointer("files", i, "id")));
			doc.codes?.forEach((code, i) => add(code.id, file, pointer("codes", i, "id")));
		}
		for (const [path, t] of c.tables) {
			add(t.id, path, "/id");
			const addColumn = unique();
			t.columns.forEach((col, i) => addColumn(col.id, path, pointer("columns", i, "id")));
		}
	}
	table(c, path, table) {
		const name = c.model.name;
		const columns = new Set(table.columns.map((col) => col.name));
		const tablesByName = new Map([...c.tables.values()].map((t) => [t.name, t]));
		table.constraints?.foreignKeys?.forEach((text, i) => {
			const at = pointer("constraints", "foreignKeys", i);
			const fk = parseForeignKey(text);
			if (!fk) {
				this.out.push(problem("ERR-FK-SYNTAX", name, path, at, { fk: text }));
				return;
			}
			for (const column of fk.sourceColumns) if (!columns.has(column)) this.out.push(problem("ERR-FK-SOURCE-COLUMN", name, path, at, { column }));
			if (!c.document) return;
			const code = c.document.codes?.find((x) => x.name === fk.target);
			let targetColumns;
			if (code) {
				const csvPath = isUrl(code.data) ? void 0 : resolvePath(name, code.data);
				targetColumns = csvPath ? this.csvHeader(csvPath) : void 0;
			} else {
				const target = tablesByName.get(fk.target);
				if (!target) {
					this.out.push(problem("ERR-FK-TARGET-LIST", name, path, at, { list: fk.target }));
					return;
				}
				targetColumns = target.columns.map((col) => col.name);
			}
			if (!targetColumns) return;
			for (const column of fk.targetColumns) if (!targetColumns.includes(column)) this.out.push(problem("ERR-FK-TARGET-COLUMN", name, path, at, {
				column,
				list: fk.target
			}));
		});
		table.columns.forEach((col, i) => {
			const ref = col.constraints?.reference;
			if (ref === void 0) return;
			const dot = ref.indexOf(".");
			if (!(dot > 0 ? tablesByName.get(ref.slice(0, dot)) : void 0)?.columns.some((x) => x.name === ref.slice(dot + 1))) this.out.push(problem("ERR-REFERENCE-TARGET", name, path, pointer("columns", i, "constraints", "reference"), { ref }));
		});
	}
	csvHeader(path) {
		return this.project.models.get(path.slice(0, path.indexOf("/")))?.csvs.get(path)?.csv?.header;
	}
};
function crossReferences(project, checked) {
	return new Checker(project, checked).run();
}
// src/core/validation/schema.ts
function valueAt(data, ptr) {
	let v = data;
	for (const s of parsePointer(ptr)) v = v !== null && typeof v === "object" ? v[s] : void 0;
	return v;
}
function describe(e, data) {
	const p = e.params;
	switch (e.keyword) {
		case "required": return `propriété obligatoire « ${String(p.missingProperty)} » absente`;
		case "enum": return `valeur « ${String(valueAt(data, e.instancePath))} » non autorisée (attendu : ${p.allowedValues.join(", ")})`;
		case "type": return `type attendu : ${String(p.type)}`;
		case "pattern": return `valeur « ${String(valueAt(data, e.instancePath))} » non conforme au motif ${String(p.pattern)}`;
		case "minLength": return "valeur vide non autorisée";
		case "minimum": return `valeur minimale : ${String(p.limit)}`;
		case "additionalProperties": return `propriété « ${String(p.additionalProperty)} » non autorisée`;
		case "propertyNames": return `clé « ${String(p.propertyName)} » invalide (identifiant de 32 caractères alphanumériques attendu)`;
		default: return e.message ?? e.keyword;
	}
}
/** Valide `data` et convertit les erreurs du schéma en problèmes ERR-SCHEMA. */
function schemaProblems(validate, data, model, file) {
	if (validate(data)) return [];
	const out = [];
	const seen = /* @__PURE__ */ new Set();
	for (const e of validate.errors ?? []) {
		if ("propertyName" in e && e.keyword !== "propertyNames") continue;
		const at = e.keyword === "propertyNames" ? `${e.instancePath}/${escapeSegment(String(e.params.propertyName))}` : e.instancePath;
		const detail = describe(e, data);
		const key = `${at} ${detail}`;
		if (seen.has(key)) continue;
		seen.add(key);
		out.push(problem("ERR-SCHEMA", model, file, at, {
			at,
			detail
		}));
	}
	return out;
}
// src/core/validation/gpu-import.ts
function gpuImportProblems(checked) {
	const out = [];
	const seen = /* @__PURE__ */ new Map();
	const check = (kind, id, o, objectAt) => {
		if (id === void 0) {
			out.push(problem("ERR-GPU-ID-MISSING", o.model, o.file, objectAt, { kind }));
			return;
		}
		const first = seen.get(`${kind} ${id}`);
		if (!first) {
			seen.set(`${kind} ${id}`, o);
			return;
		}
		if (!(first.model === o.model && (kind !== "colonne" || first.file === o.file))) out.push(problem("ERR-ID-DUPLICATE", o.model, o.file, o.at, {
			id,
			first: `${first.file}#${first.at}`
		}));
	};
	for (const c of checked.values()) {
		const name = c.model.name;
		const doc = c.document;
		if (doc) {
			const file = `${name}/files.json`;
			check("modèle", doc.id, {
				model: name,
				file,
				at: "/id"
			}, "");
			doc.files.forEach((f, i) => check("fichier", f.id, {
				model: name,
				file,
				at: pointer("files", i, "id")
			}, pointer("files", i)));
			doc.codes?.forEach((code, i) => check("liste", code.id, {
				model: name,
				file,
				at: pointer("codes", i, "id")
			}, pointer("codes", i)));
			for (const f of doc.files) {
				if (f.type !== "table") continue;
				const ref = tableModelRef(f.tableModel, f.name);
				const path = ref === void 0 ? void 0 : resolvePath(name, ref);
				const table = path === void 0 ? void 0 : c.tables.get(path);
				if (!path || !table) continue;
				check("table", table.id, {
					model: name,
					file: path,
					at: "/id"
				}, "");
				table.columns.forEach((col, i) => check("colonne", col.id, {
					model: name,
					file: path,
					at: pointer("columns", i, "id")
				}, pointer("columns", i)));
			}
		}
	}
	return out;
}
// src/core/validation/validate.ts
/** Valide une configuration chargée : schémas puis références croisées. */
function validateProject(project) {
	const problems = [];
	const checked = /* @__PURE__ */ new Map();
	const check = (file, validate, model) => {
		if (!file || file.data === void 0) return void 0;
		const found = schemaProblems(validate, file.data, model, file.path);
		problems.push(...found);
		return found.length === 0 ? file.data : void 0;
	};
	for (const model of project.models.values()) {
		const c = {
			model,
			tables: /* @__PURE__ */ new Map()
		};
		const document = check(model.document, validateDocument, model.name);
		if (document) c.document = document;
		for (const [path, file] of model.tables) {
			const table = check(file, validateTable, model.name);
			if (table) c.tables.set(path, table);
		}
		checked.set(model.name, c);
	}
	const gpu = project.variables !== void 0;
	problems.push(...crossReferences(project, checked));
	if (gpu) problems.push(...readVariables(project.variables).problems, ...gpuImportProblems(checked));
	return {
		checked,
		problems
	};
}
/** Valide une configuration déjà chargée ; problèmes triés (contrat problem-codes). */
function checkLoaded(loaded) {
	const { checked, problems } = validateProject(loaded.project);
	return {
		project: loaded.project,
		checked,
		problems: [...loaded.problems, ...problems].sort(compareProblems)
	};
}
/** Charge et valide une configuration. */
async function checkConfig(fs) {
	return checkLoaded(await loadProject(fs));
}
function summarize(project, problems) {
	let tables = 0;
	let codeLists = 0;
	for (const m of project.models.values()) {
		tables += m.tables.size;
		codeLists += m.csvs.size;
	}
	return {
		models: project.models.size,
		tables,
		codeLists,
		...countProblems(problems)
	};
}
// src/cli/fs.ts
var isInside = (root, path) => path === root || path.startsWith(root + sep);
/**
* Lecture d'un dossier de configuration sur disque (plan R4, R6) : seuls les `*.json` et `*.csv`
* sont listés, et un lien symbolique qui sort du dossier est ignoré.
*/
var NodeConfigFs = class NodeConfigFs {
	root;
	constructor(root) {
		this.root = root;
	}
	/** `root` doit exister ; il est résolu en chemin réel. */
	static async open(root) {
		return new NodeConfigFs(await realpath(root));
	}
	async listFiles() {
		const out = [];
		const walk = async (dir) => {
			for (const entry of await readdir(dir, { withFileTypes: true })) {
				if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
				let path = join(dir, entry.name);
				let isDir = entry.isDirectory();
				if (entry.isSymbolicLink()) {
					const real = await realpath(path).catch(() => void 0);
					if (!real || !isInside(this.root, real)) continue;
					isDir = await readdir(real).then(() => true, () => false);
					path = join(dir, entry.name);
				}
				if (isDir) await walk(path);
				else if (/\.(json|csv)$/.test(entry.name)) out.push(relative(this.root, path).split(sep).join("/"));
			}
		};
		await walk(this.root);
		return out.sort();
	}
	/** Chemin réel d'un fichier existant de la configuration ; erreur s'il en sort. */
	async resolve(path) {
		const full = await realpath(join(this.root, ...path.split("/")));
		if (!isInside(this.root, full)) throw new Error(`Chemin hors de la configuration : ${path}`);
		return full;
	}
	async readText(path) {
		return readFile(await this.resolve(path), "utf8");
	}
	/**
	* Crée un fichier `<modèle>/codes/…` ou `<modèle>/types/…` dans un modèle existant (004, R3) ;
	* échoue si le fichier existe déjà.
	*/
	async createText(path, text) {
		const [model, folder, ...rest] = path.split("/");
		if (!model || folder !== "codes" && folder !== "types" || rest.length !== 1) throw new Error(`Création non autorisée : ${path}`);
		const modelDir = await this.resolve(model);
		const dir = join(modelDir, folder);
		await mkdir(dir, { recursive: true });
		if (!isInside(this.root, await realpath(dir))) throw new Error(`Chemin hors de la configuration : ${path}`);
		await writeFile(join(dir, rest[0]), text, {
			encoding: "utf8",
			flag: "wx"
		});
	}
	/** Remplace un fichier existant, de façon atomique (fichier temporaire puis renommage). */
	async writeText(path, text) {
		const full = await this.resolve(path);
		const tmp = join(dirname(full), `.${basename(full)}.vce-${process.pid}.tmp`);
		await writeFile(tmp, text, "utf8");
		await rename(tmp, full);
	}
};
// src/cli/check.ts
var plural$1 = (n, word) => `${n} ${word}${n > 1 ? "s" : ""}`;
function formatProblem(p) {
	return `${p.file}${p.pointer !== void 0 ? ":" + p.pointer : ""} ${p.code} ${p.message}`;
}
/** `vce check` (contrat cli.md) ; renvoie le code de sortie. */
async function runCheck(dir, options, out) {
	if (!await stat(dir).then((s) => s.isDirectory(), () => false)) {
		out.error(`Dossier introuvable : ${dir}`);
		return 2;
	}
	const fs = await NodeConfigFs.open(dir);
	const result = await checkConfig(fs);
	if (result.project.models.size === 0) {
		out.error(`Aucun modèle dans ${fs.root} : indiquer le dossier qui contient les modèles (ex. config/).`);
		return 2;
	}
	const summary = summarize(result.project, result.problems);
	if (options.format === "json") out.log(JSON.stringify({
		root: fs.root,
		summary,
		problems: result.problems
	}, null, 2));
	else {
		for (const p of result.problems) out.log(formatProblem(p));
		if (result.problems.length > 0) out.log("");
		out.log(`${plural$1(summary.models, "modèle")}, ${plural$1(summary.tables, "table")}, ${summary.codeLists} liste${summary.codeLists > 1 ? "s" : ""} de codes — ${plural$1(summary.errors, "erreur")}, ${plural$1(summary.warnings, "avertissement")}`);
	}
	const { errors, warnings } = countProblems(result.problems);
	return errors > 0 || options.strict && warnings > 0 ? 1 : 0;
}
// src/core/compare.ts
var FILE_FIELDS = [
	["type", (f) => f.type],
	["mandatory", (f) => f.mandatory ?? "WARN"],
	["path", (f) => f.path],
	["tableModel", (f) => f.tableModel]
];
var TABLE_FIELDS = [[
	"conditions",
	(t) => t.constraints?.conditions,
	true
], [
	"foreignKeys",
	(t) => t.constraints?.foreignKeys,
	true
]];
var COLUMN_FIELDS = [
	["description", (c) => c.description],
	["type", (c) => c.type],
	["minLength", (c) => c.constraints?.minLength],
	["maxLength", (c) => c.constraints?.maxLength],
	["required", (c) => c.constraints?.required],
	["presenceRequired", (c) => c.constraints?.presenceRequired],
	["unique", (c) => c.constraints?.unique],
	[
		"enum",
		(c) => c.constraints?.enum,
		true
	],
	["pattern", (c) => c.constraints?.pattern]
];
var DOCUMENT_FIELDS = [["folderName", (d) => d.constraints?.folderName], ["metadataSpecification", (d) => d.constraints?.metadataSpecification]];
var value$1 = (v) => v === void 0 ? null : v;
var sorted = (values) => [...values].sort((a, b) => a.localeCompare(b));
function compareFields(from, to, fields) {
	const changes = [];
	for (const [field, get, list] of fields) if (list) {
		const a = new Set((get(from) ?? []).map(String));
		const b = new Set((get(to) ?? []).map(String));
		const removed = sorted([...a].filter((x) => !b.has(x)));
		const added = sorted([...b].filter((x) => !a.has(x)));
		if (removed.length || added.length) changes.push({
			field,
			removed,
			added
		});
	} else {
		const [a, b] = [value$1(get(from)), value$1(get(to))];
		if (a !== b) changes.push({
			field,
			old: a,
			new: b
		});
	}
	return changes;
}
function byName(items) {
	const out = /* @__PURE__ */ new Map();
	for (const item of items) if (!out.has(item.name)) out.set(item.name, item);
	return out;
}
function compareItems(from, to, fields) {
	const [a, b] = [byName(from), byName(to)];
	return {
		added: sorted([...b.keys()].filter((n) => !a.has(n))),
		removed: sorted([...a.keys()].filter((n) => !b.has(n))),
		changed: sorted([...a.keys()].filter((n) => b.has(n))).map((name) => ({
			name,
			changes: compareFields(a.get(name), b.get(name), fields)
		})).filter((c) => c.changes.length > 0)
	};
}
var count = (s) => s.added.length + s.removed.length + s.changed.length;
/** Colonnes de rapprochement des lignes d'une liste : celles de la première clé étrangère qui la vise. */
function keyColumns(list, tables) {
	for (const side of tables) for (const table of side) for (const text of table.constraints?.foreignKeys ?? []) {
		const fk = parseForeignKey(text);
		if (fk?.target === list) return fk.targetColumns;
	}
}
/**
* Contenu de deux versions d'une liste (plan R5) : lignes rapprochées par la clé (colonnes de la clé
* étrangère, sinon la première colonne), sur les colonnes communes. Clés en double : rapprochement
* par ligne entière. `undefined` si rien ne change.
*/
function compareCsv(name, from, to, fkColumns) {
	const common = to.header.filter((c) => from.header.includes(c));
	const columns = {
		added: to.header.filter((c) => !from.header.includes(c)),
		removed: from.header.filter((c) => !to.header.includes(c))
	};
	const key = fkColumns?.every((c) => common.includes(c)) ? fkColumns : common.slice(0, 1);
	const project = (csv) => csv.rows.map((row) => common.map((c) => row[csv.header.indexOf(c)] ?? ""));
	const [ra, rb] = [project(from), project(to)];
	const keyOf = (row) => key.map((c) => row[common.indexOf(c)]).join(",");
	const unique = (rows) => new Set(rows.map(keyOf)).size === rows.length;
	const rows = {
		added: [],
		removed: [],
		changed: []
	};
	if (key.length && unique(ra) && unique(rb)) {
		const [ma, mb] = [new Map(ra.map((r) => [keyOf(r), r])), new Map(rb.map((r) => [keyOf(r), r]))];
		for (const [k, r] of mb) if (!ma.has(k)) rows.added.push(r.join(","));
		for (const [k, r] of ma) {
			const other = mb.get(k);
			if (!other) rows.removed.push(r.join(","));
			else {
				const changes = common.flatMap((c, i) => r[i] !== other[i] ? [{
					field: c,
					old: r[i],
					new: other[i]
				}] : []);
				if (changes.length) rows.changed.push({
					key: k,
					changes
				});
			}
		}
	} else {
		const remaining = /* @__PURE__ */ new Map();
		for (const r of ra.map((x) => x.join(","))) remaining.set(r, (remaining.get(r) ?? 0) + 1);
		for (const r of rb.map((x) => x.join(","))) {
			const n = remaining.get(r) ?? 0;
			if (n > 0) remaining.set(r, n - 1);
			else rows.added.push(r);
		}
		for (const [r, n] of remaining) for (let i = 0; i < n; i++) rows.removed.push(r);
	}
	rows.added = sorted(rows.added);
	rows.removed = sorted(rows.removed);
	rows.changed.sort((x, y) => x.key.localeCompare(y.key));
	return columns.added.length + columns.removed.length + rows.added.length + rows.removed.length + rows.changed.length ? {
		name,
		columns,
		rows
	} : void 0;
}
/** Compare le modèle `to` à la référence `from`, dans l'état courant de la configuration. */
function compareModels(result, from, to) {
	const unreadable = [];
	const side = (name) => {
		const checked = result.checked.get(name);
		const loaded = result.project.models.get(name);
		const relative = (path) => path.slice(name.length + 1);
		const skipped = /* @__PURE__ */ new Set();
		if (loaded?.document && !checked?.document) unreadable.push(loaded.document.path);
		for (const path of loaded?.tables.keys() ?? []) if (!checked?.tables.has(path)) {
			unreadable.push(path);
			skipped.add(relative(path));
		}
		const tables = [...checked?.tables ?? []].map(([path, table]) => ({
			path: relative(path),
			table
		}));
		return {
			document: checked?.document,
			tables,
			skipped
		};
	};
	const a = side(from);
	const b = side(to);
	const document = a.document && b.document ? compareFields(a.document, b.document, DOCUMENT_FIELDS) : [];
	const files = compareItems(a.document?.files ?? [], b.document?.files ?? [], FILE_FIELDS);
	const [ta, tb] = [byName(a.tables.filter((t) => !b.skipped.has(t.path)).map((t) => t.table)), byName(b.tables.filter((t) => !a.skipped.has(t.path)).map((t) => t.table))];
	const tables = {
		added: sorted([...tb.keys()].filter((n) => !ta.has(n))),
		removed: sorted([...ta.keys()].filter((n) => !tb.has(n))),
		changed: sorted([...ta.keys()].filter((n) => tb.has(n))).map((name) => {
			const [x, y] = [ta.get(name), tb.get(name)];
			return {
				name,
				changes: compareFields(x, y, TABLE_FIELDS),
				columns: compareItems(x.columns, y.columns, COLUMN_FIELDS)
			};
		}).filter((t) => t.changes.length > 0 || count(t.columns) > 0)
	};
	const [ca, cb] = [byName(a.document?.codes ?? []), byName(b.document?.codes ?? [])];
	const csv = (model, data) => {
		const path = resolvePath(model, data);
		const entry = path === void 0 ? void 0 : result.project.models.get(model)?.csvs.get(path);
		if (entry && !entry.csv) unreadable.push(entry.path);
		return entry?.csv;
	};
	const content = [];
	for (const name of sorted([...ca.keys()].filter((n) => cb.has(n)))) {
		const [x, y] = [csv(from, ca.get(name).data), csv(to, cb.get(name).data)];
		const diff = x && y && compareCsv(name, x, y, keyColumns(name, [b.tables.map((t) => t.table), a.tables.map((t) => t.table)]));
		if (diff) content.push(diff);
	}
	const codes = {
		added: sorted([...cb.keys()].filter((n) => !ca.has(n))),
		removed: sorted([...ca.keys()].filter((n) => !cb.has(n))),
		content
	};
	const total = document.length + count(files) + tables.added.length + tables.removed.length + tables.changed.reduce((n, t) => n + (t.changes.length > 0 ? 1 : 0) + count(t.columns), 0) + codes.added.length + codes.removed.length + content.reduce((n, c) => n + c.columns.added.length + c.columns.removed.length + c.rows.added.length + c.rows.removed.length + c.rows.changed.length, 0);
	return {
		from,
		to,
		document,
		files,
		tables,
		codes,
		unreadable: sorted(new Set(unreadable)),
		total
	};
}
// src/cli/compare.ts
var LABELS = {
	folderName: "nom du dossier",
	metadataSpecification: "spécification des métadonnées",
	type: "type",
	mandatory: "présence",
	path: "chemin",
	tableModel: "modèle de table",
	conditions: "conditions",
	foreignKeys: "clés étrangères",
	description: "description",
	minLength: "longueur minimale",
	maxLength: "longueur maximale",
	required: "valeur obligatoire",
	presenceRequired: "colonne obligatoire",
	unique: "unique",
	enum: "valeurs possibles",
	pattern: "motif"
};
var value = (v) => v === null || v === void 0 ? "(absent)" : typeof v === "boolean" ? v ? "Oui" : "Non" : String(v);
function change(c) {
	const label = LABELS[c.field] ?? c.field;
	if (c.removed || c.added) return `${label} : ${[...(c.removed ?? []).map((x) => `- ${x}`), ...(c.added ?? []).map((x) => `+ ${x}`)].join(" ; ")}`;
	return `${label} : ${value(c.old)} → ${value(c.new)}`;
}
function section(lines, title, s, prefix = "") {
	if (!s.added.length && !s.removed.length && !s.changed.length) return;
	if (title) lines.push(title);
	for (const n of s.added) lines.push(`  + ${prefix}${n}`);
	for (const n of s.removed) lines.push(`  - ${prefix}${n}`);
	for (const c of s.changed) lines.push(`  ~ ${prefix}${c.name} : ${c.changes.map(change).join(", ")}`);
}
/** Comparaison en texte : une section par type d'objet, « + », « - », « ~ », puis le total. */
function formatComparison(c) {
	const lines = [`Comparaison de ${c.from} à ${c.to}`];
	if (c.document.length) lines.push("Dossier", ...c.document.map((x) => `  ~ ${change(x)}`));
	section(lines, "Fichiers attendus", c.files);
	if (c.tables.added.length || c.tables.removed.length || c.tables.changed.length) {
		lines.push("Tables");
		for (const n of c.tables.added) lines.push(`  + ${n}`);
		for (const n of c.tables.removed) lines.push(`  - ${n}`);
		for (const t of c.tables.changed) {
			lines.push(`  ~ ${t.name}`, ...t.changes.map((x) => `      ${change(x)}`));
			const columns = [];
			section(columns, "", t.columns, "colonne ");
			lines.push(...columns.map((l) => `    ${l}`));
		}
	}
	section(lines, "Listes de codes", {
		...c.codes,
		changed: []
	});
	if (c.codes.content.length) {
		lines.push("Contenu des listes de codes");
		for (const l of c.codes.content) {
			lines.push(`  ~ ${l.name}`);
			for (const x of l.columns.added) lines.push(`      + colonne ${x}`);
			for (const x of l.columns.removed) lines.push(`      - colonne ${x}`);
			for (const x of l.rows.added) lines.push(`      + ${x}`);
			for (const x of l.rows.removed) lines.push(`      - ${x}`);
			for (const r of l.rows.changed) lines.push(`      ~ ${r.key} : ${r.changes.map((x) => `${x.field} : ${value(x.old)} → ${value(x.new)}`).join(", ")}`);
		}
	}
	if (c.unreadable.length) lines.push(`Illisibles, laissés de côté : ${c.unreadable.join(", ")}`);
	lines.push("", c.total === 0 ? "Aucune différence" : `${c.total} différence${c.total > 1 ? "s" : ""}`);
	return lines;
}
/** `vce compare` (contrat contracts/compare.md) ; renvoie le code de sortie. */
async function runCompare(reference, model, options, out) {
	const dirs = [resolve(reference), resolve(model)];
	for (const dir of dirs) {
		if (!await stat(dir).then((s) => s.isDirectory(), () => false)) {
			out.error(`Dossier introuvable : ${dir}`);
			return 2;
		}
		if (!await stat(resolve(dir, "files.json")).then((s) => s.isFile(), () => false)) {
			out.error(`Pas de files.json dans ${dir} : indiquer le dossier d'un modèle (ex. config/cnig_PLU_2024).`);
			return 2;
		}
	}
	const [from, to] = dirs.map((d) => basename(d));
	const [parentA, parentB] = dirs.map((d) => dirname(d));
	if (parentA !== parentB && from === to) {
		out.error(`Deux modèles de même nom (${from}) dans deux configurations : comparaison hors périmètre.`);
		return 2;
	}
	const results = await Promise.all([.../* @__PURE__ */ new Set([parentA, parentB])].map(async (p) => checkConfig(await NodeConfigFs.open(p))));
	const comparison = compareModels(results.length === 1 ? results[0] : {
		project: { models: new Map(results.flatMap((r) => [...r.project.models])) },
		checked: new Map(results.flatMap((r) => [...r.checked])),
		problems: results.flatMap((r) => r.problems)
	}, from, to);
	if (options.format === "json") out.log(JSON.stringify(comparison, null, 2));
	else for (const line of formatComparison(comparison)) out.log(line);
	return 0;
}
// src/cli/server.ts
var TYPES = {
	".html": "text/html; charset=utf-8",
	".js": "text/javascript; charset=utf-8",
	".css": "text/css; charset=utf-8",
	".svg": "image/svg+xml",
	".png": "image/png",
	".ico": "image/x-icon",
	".json": "application/json; charset=utf-8",
	".woff2": "font/woff2"
};
var SECURITY_HEADERS = {
	"Content-Security-Policy": "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:",
	"X-Content-Type-Options": "nosniff"
};
function send(res, status, body, type = "text/plain; charset=utf-8", extra = {}) {
	res.writeHead(status, {
		"Content-Type": type,
		...SECURITY_HEADERS,
		...extra
	});
	res.end(body);
}
/** Instantané de la configuration (contrat cli.md, GET /api/snapshot). */
async function snapshot(fs) {
	const paths = await fs.listFiles();
	const texts = await Promise.all(paths.map((p) => fs.readText(p)));
	return {
		root: fs.root,
		files: Object.fromEntries(paths.map((p, i) => [p, texts[i]]))
	};
}
var MAX_BODY = 10485760;
var sha256 = (text) => createHash("sha256").update(text, "utf8").digest("hex");
function readBody(req) {
	return new Promise((resolve, reject) => {
		const chunks = [];
		let size = 0;
		req.on("data", (c) => {
			size += c.length;
			if (size <= MAX_BODY) chunks.push(c);
		});
		req.on("end", () => resolve(size > MAX_BODY ? void 0 : Buffer.concat(chunks).toString("utf8")));
		req.on("error", reject);
	});
}
/** PUT /api/file (contrat source-et-ecriture, plan 002 R8). */
async function writeFileRequest(options, url, req, res) {
	const path = url.searchParams.get("path");
	const create = req.headers["if-none-match"] === "*";
	const expected = /^"?([0-9a-f]{64})"?$/.exec(req.headers["if-match"] ?? "")?.[1];
	if (!path || !expected && !create) return send(res, 400, "Paramètre path ou en-tête If-Match (ou If-None-Match: *) manquant");
	if (!/\.(json|csv)$/i.test(path) || path.split("/").some((s) => s === ".." || s === "" || s.startsWith("."))) return send(res, 403, "Fichier non modifiable");
	if (create) {
		if (await options.fs.readText(path).catch(() => void 0) !== void 0) return send(res, 412, "Le fichier existe déjà");
		const body = await readBody(req);
		if (body === void 0) return send(res, 413, "Fichier trop volumineux");
		try {
			await options.fs.createText(path, body);
		} catch (e) {
			const exists = e.code === "EEXIST";
			return send(res, exists ? 412 : 403, exists ? "Le fichier existe déjà" : "Création non autorisée");
		}
		res.writeHead(201, { ...SECURITY_HEADERS });
		return res.end();
	}
	const current = await options.fs.readText(path).catch(() => void 0);
	if (current === void 0) return send(res, 403, "Fichier inexistant ou hors de la configuration");
	if (sha256(current) !== expected) return send(res, 409, "Le fichier a été modifié sur disque depuis sa lecture");
	const body = await readBody(req);
	if (body === void 0) return send(res, 413, "Fichier trop volumineux");
	await options.fs.writeText(path, body);
	res.writeHead(204, { ...SECURITY_HEADERS });
	res.end();
}
function handler(options, port) {
	const uiRoot = normalize(options.uiDir + sep);
	return async (req, res) => {
		try {
			const host = req.headers.host;
			if (host !== `127.0.0.1:${port()}` && host !== `localhost:${port()}`) return send(res, 403, "Hôte refusé");
			const url = new URL(req.url ?? "/", "http://localhost");
			const path = decodeURIComponent(url.pathname);
			if (req.method === "PUT" && path === "/api/file") return await writeFileRequest(options, url, req, res);
			if (req.method !== "GET" && req.method !== "HEAD") return send(res, 405, "Méthode non autorisée", void 0, { Allow: "GET, HEAD" });
			if (path === "/api/snapshot") return send(res, 200, JSON.stringify(await snapshot(options.fs)), TYPES[".json"], { "Cache-Control": "no-store" });
			const file = normalize(join(uiRoot, path === "/" ? "index.html" : path));
			if (!file.startsWith(uiRoot)) return send(res, 404, "Introuvable");
			const body = await readFile(file).catch(() => void 0);
			if (!body) return send(res, 404, "Introuvable");
			return send(res, 200, body, TYPES[extname(file)] ?? "application/octet-stream");
		} catch (e) {
			return send(res, 500, `Erreur : ${e instanceof Error ? e.message : String(e)}`);
		}
	};
}
function listen(server, port) {
	return new Promise((resolve, reject) => {
		const onError = (e) => {
			server.off("listening", onListening);
			reject(e);
		};
		const onListening = () => {
			server.off("error", onError);
			const address = server.address();
			resolve(typeof address === "object" && address ? address.port : port);
		};
		server.once("error", onError);
		server.once("listening", onListening);
		server.listen(port, "127.0.0.1");
	});
}
/** Démarre le serveur sur 127.0.0.1 ; essaie les 10 ports suivants si le port est pris. */
async function startServer(options) {
	let actual = options.port;
	const server = createServer(handler(options, () => actual));
	const attempts = options.strictPort ? 1 : 10;
	for (let i = 0;; i++) try {
		actual = await listen(server, options.port + i);
		break;
	} catch (e) {
		if (e.code !== "EADDRINUSE" || i + 1 >= attempts) throw e;
	}
	return {
		url: `http://127.0.0.1:${actual}/`,
		port: actual,
		close: () => new Promise((resolve) => server.close(() => resolve()))
	};
}
// src/cli/site.ts
var MARKER = ".vce-site";
var plural = (n, word) => `${n} ${word}${n > 1 ? "s" : ""}`;
var exists = (path) => stat(path).then(() => true, () => false);
/**
* `vce site` (feature 013, plan R1) : site statique en lecture seule, copie de l'interface livrée,
* instantané `api/snapshot.json` et balise `vce-mode` ; renvoie le code de sortie.
*/
async function runSite(dir, output, options, out) {
	if (!await stat(dir).then((s) => s.isDirectory(), () => false)) {
		out.error(`Dossier introuvable : ${dir}`);
		return 2;
	}
	if (!await exists(join(options.uiDir, "index.html"))) {
		out.error(`Interface introuvable dans ${options.uiDir} : lancer « npm run build ».`);
		return 2;
	}
	const target = resolve(output);
	const rel = relative(resolve(dir), target);
	if (rel === "" || !rel.startsWith("..") && !rel.startsWith("/")) {
		out.error(`La sortie ${target} est dans la configuration : choisir un dossier en dehors.`);
		return 2;
	}
	if (await exists(target)) {
		const entries = await readdir(target);
		if (entries.length && !entries.includes(MARKER) && !options.force) {
			out.error(`${target} n'est pas vide et n'a pas été produit par vce site : relancer avec --force pour le remplacer.`);
			return 2;
		}
	}
	const fs = await NodeConfigFs.open(dir);
	const result = await checkConfig(fs);
	if (result.project.models.size === 0) {
		out.error(`Aucun modèle dans ${fs.root} : indiquer le dossier qui contient les modèles (ex. config/).`);
		return 2;
	}
	await rm(target, {
		recursive: true,
		force: true
	});
	await cp(options.uiDir, target, { recursive: true });
	const index = join(target, "index.html");
	const html = await readFile(index, "utf8");
	await writeFile(index, html.replace("<meta charset=\"UTF-8\" />", "<meta charset=\"UTF-8\" />\n    <meta name=\"vce-mode\" content=\"site\" />"));
	const snap = await snapshot(fs);
	await mkdir(join(target, "api"), { recursive: true });
	await writeFile(join(target, "api", "snapshot.json"), JSON.stringify({
		root: options.title ?? basename(fs.root),
		files: snap.files,
		version: package_default.version
	}));
	await writeFile(join(target, MARKER), `${package_default.version}\n`);
	await writeFile(join(target, ".nojekyll"), "");
	const s = summarize(result.project, result.problems);
	out.log(`${plural(s.models, "modèle")}, ${plural(s.tables, "table")}, ${s.codeLists} liste${s.codeLists > 1 ? "s" : ""} de codes — ${plural(s.errors, "erreur")}, ${plural(s.warnings, "avertissement")}`);
	out.log(`Site écrit dans ${target}`);
	return 0;
}
// src/cli/serve.ts
function openBrowser(url) {
	const [command, args] = process.platform === "darwin" ? ["open", [url]] : process.platform === "win32" ? ["cmd", [
		"/c",
		"start",
		"",
		url
	]] : ["xdg-open", [url]];
	spawn(command, args, {
		detached: true,
		stdio: "ignore"
	}).on("error", () => {}).unref();
}
/** `vce serve` (contrat cli.md) : code de sortie en cas d'échec, serveur démarré sinon. */
async function runServe(dir, options, out) {
	if (!await stat(dir).then((s) => s.isDirectory(), () => false)) {
		out.error(`Dossier introuvable : ${dir}`);
		return 2;
	}
	if (!await stat(join(options.uiDir, "index.html")).then(() => true, () => false)) {
		out.error(`Interface introuvable dans ${options.uiDir} : lancer « npm run build ».`);
		return 2;
	}
	const fs = await NodeConfigFs.open(dir);
	let server;
	try {
		server = await startServer({
			fs,
			uiDir: options.uiDir,
			port: options.port ?? 5174,
			strictPort: options.port !== void 0
		});
	} catch (e) {
		out.error(`Impossible de démarrer le serveur : ${e instanceof Error ? e.message : String(e)}`);
		return 2;
	}
	out.log(`Éditeur disponible sur ${server.url} (Ctrl+C pour arrêter)`);
	out.log(`Configuration : ${fs.root}`);
	if (options.open) openBrowser(server.url);
	return server;
}
// src/cli/main.ts
var HELP = `Usage :
  vce check <dossier> [--format text|json] [--strict]
  vce serve <dossier> [--port <n>] [--open]
  vce compare <référence> <modèle> [--format text|json]
  vce site <dossier> <sortie> [--title <titre>] [--force]
  vce --help | --version

<dossier> : dossier contenant les modèles (ex. config/).
<référence>, <modèle> : dossiers de modèle (ex. config/cnig_PLU_2022 config/cnig_PLU_2024).

check     valide tous les modèles ; code de sortie 0 sans erreur, 1 avec au moins une erreur
          (ou un avertissement avec --strict), 2 en cas d'usage incorrect.
serve     ouvre l'éditeur local sur http://127.0.0.1:<port>/ (5174 par défaut, ou le suivant
          libre) ; --open l'ouvre dans le navigateur.
compare   compare <modèle> à <référence> : dossier, fichiers attendus, tables, colonnes, listes
          de codes et leur contenu ; code de sortie 0, ou 2 en cas d'usage incorrect.
site      écrit dans <sortie> un site statique en lecture seule de la configuration (GitHub
          Pages…) ; --title remplace le nom du dossier ; --force remplace une sortie inconnue.`;
var console_ = {
	log: (l) => console.log(l),
	error: (l) => console.error(l)
};
function parseArgs(args, withValue) {
	const positional = [];
	const options = /* @__PURE__ */ new Map();
	for (let i = 0; i < args.length; i++) {
		const a = args[i];
		if (!a.startsWith("--")) {
			positional.push(a);
			continue;
		}
		if (withValue.includes(a)) {
			const v = args[++i];
			if (v === void 0) return `Valeur manquante pour ${a}`;
			options.set(a, v);
		} else options.set(a, true);
	}
	return {
		positional,
		options
	};
}
var UI_DIR = fileURLToPath(new URL("./ui/", import.meta.url));
/** Renvoie le code de sortie, ou le serveur démarré par `serve`. */
async function main(argv, out = console_, uiDir = UI_DIR) {
	const [command, ...rest] = argv;
	if (command === "--version" || command === "-v") {
		out.log(package_default.version);
		return 0;
	}
	if (command === "--help" || command === "-h") {
		out.log(HELP);
		return 0;
	}
	if (command === "check") {
		const parsed = parseArgs(rest, ["--format"]);
		if (typeof parsed === "string") return usage(out, parsed);
		const { positional, options } = parsed;
		const unknown = [...options.keys()].filter((o) => o !== "--format" && o !== "--strict");
		if (unknown.length > 0) return usage(out, `Option inconnue : ${unknown[0]}`);
		const format = options.get("--format") ?? "text";
		if (format !== "text" && format !== "json") return usage(out, `Format inconnu : ${String(format)} (text ou json)`);
		if (positional.length !== 1) return usage(out, "Indiquer un et un seul dossier");
		return runCheck(positional[0], {
			format,
			strict: options.has("--strict")
		}, out);
	}
	if (command === "serve") {
		const parsed = parseArgs(rest, ["--port"]);
		if (typeof parsed === "string") return usage(out, parsed);
		const { positional, options } = parsed;
		const unknown = [...options.keys()].filter((o) => o !== "--port" && o !== "--open");
		if (unknown.length > 0) return usage(out, `Option inconnue : ${unknown[0]}`);
		const portText = options.get("--port");
		const port = portText === void 0 ? void 0 : Number(portText);
		if (port !== void 0 && !(Number.isInteger(port) && port >= 0 && port < 65536)) return usage(out, `Port invalide : ${String(portText)}`);
		if (positional.length !== 1) return usage(out, "Indiquer un et un seul dossier");
		return runServe(positional[0], {
			port,
			open: options.has("--open"),
			uiDir
		}, out);
	}
	if (command === "compare") {
		const parsed = parseArgs(rest, ["--format"]);
		if (typeof parsed === "string") return usage(out, parsed);
		const { positional, options } = parsed;
		const unknown = [...options.keys()].filter((o) => o !== "--format");
		if (unknown.length > 0) return usage(out, `Option inconnue : ${unknown[0]}`);
		const format = options.get("--format") ?? "text";
		if (format !== "text" && format !== "json") return usage(out, `Format inconnu : ${String(format)} (text ou json)`);
		if (positional.length !== 2) return usage(out, "Indiquer deux dossiers de modèle : la référence, puis le modèle comparé");
		return runCompare(positional[0], positional[1], { format }, out);
	}
	if (command === "site") {
		const parsed = parseArgs(rest, ["--title"]);
		if (typeof parsed === "string") return usage(out, parsed);
		const { positional, options } = parsed;
		const unknown = [...options.keys()].filter((o) => o !== "--title" && o !== "--force");
		if (unknown.length > 0) return usage(out, `Option inconnue : ${unknown[0]}`);
		if (positional.length !== 2) return usage(out, "Indiquer le dossier de la configuration, puis le dossier du site");
		const title = options.get("--title");
		return runSite(positional[0], positional[1], {
			...typeof title === "string" && { title },
			force: options.has("--force"),
			uiDir
		}, out);
	}
	return usage(out, command ? `Commande inconnue : ${command}` : void 0);
}
function usage(out, message) {
	out.error(message ? `${message}\n\n${HELP}` : HELP);
	return 2;
}
// src/cli/index.ts
var result = await main(process.argv.slice(2));
if (typeof result === "number") process.exitCode = result;
export {};
