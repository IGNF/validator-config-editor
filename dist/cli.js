import { fileURLToPath } from "node:url";
import { readFile, readdir, realpath, stat } from "node:fs/promises";
import { extname, join, normalize, relative, sep } from "node:path";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
//#region \0rolldown/runtime.js
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
	version: "0.0.0",
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
		"test:e2e": "playwright test"
	},
	dependencies: {},
	devDependencies: {
		"@axe-core/playwright": "4.13.0",
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
		"vite": "8.3.1",
		"vite-plugin-vuetify": "2.1.3",
		"vitest": "5.0.3",
		"vue": "3.5.43",
		"vue-tsc": "3.3.11",
		"vuetify": "4.2.3"
	}
};
//#endregion
//#region src/core/pointer.ts
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
//#endregion
//#region src/core/validation/messages.ts
var s = (p, k) => String(p[k] ?? "");
var CATALOG = {
	"ERR-JSON-SYNTAX": {
		severity: "error",
		message: (p) => `JSON invalide ligne ${s(p, "line")}, colonne ${s(p, "column")} : ${s(p, "detail")}`
	},
	"ERR-CSV-SYNTAX": {
		severity: "error",
		message: (p) => `CSV invalide ligne ${s(p, "line")} : guillemet non fermé`
	},
	"ERR-CSV-HEADER": {
		severity: "error",
		message: (p) => `En-tête CSV invalide : ${s(p, "reason")}`
	},
	"ERR-CSV-ROW-LENGTH": {
		severity: "error",
		message: (p) => `Ligne ${s(p, "line")} : ${s(p, "count")} valeurs pour ${s(p, "expected")} colonnes`
	},
	"WARN-MODEL-NO-DOCUMENT": {
		severity: "warning",
		message: () => "Dossier sans files.json et non utilisé comme modèle parent"
	},
	"ERR-SCHEMA": {
		severity: "error",
		message: (p) => `${s(p, "at") || "/"} : ${s(p, "detail")}`
	},
	"WARN-MODEL-NAME": {
		severity: "warning",
		message: (p) => `Le nom « ${s(p, "name")} » diffère du dossier « ${s(p, "folder")} »`
	},
	"ERR-PARENT-MISSING": {
		severity: "error",
		message: (p) => `Modèle parent « ${s(p, "name")} » introuvable`
	},
	"ERR-TABLE-MODEL-MISSING": {
		severity: "error",
		message: (p) => `Modèle de table « ${s(p, "ref")} » introuvable`
	},
	"ERR-CODE-DATA-MISSING": {
		severity: "error",
		message: (p) => `Liste de codes « ${s(p, "ref")} » introuvable`
	},
	"ERR-FK-SYNTAX": {
		severity: "error",
		message: (p) => `Clé étrangère illisible : « ${s(p, "fk")} »`
	},
	"ERR-FK-SOURCE-COLUMN": {
		severity: "error",
		message: (p) => `Clé étrangère : colonne « ${s(p, "column")} » absente de la table`
	},
	"ERR-FK-TARGET-LIST": {
		severity: "error",
		message: (p) => `Clé étrangère : liste « ${s(p, "list")} » non déclarée dans files.json`
	},
	"ERR-FK-TARGET-COLUMN": {
		severity: "error",
		message: (p) => `Clé étrangère : colonne « ${s(p, "column")} » absente de ${s(p, "list")}`
	},
	"ERR-REFERENCE-TARGET": {
		severity: "error",
		message: (p) => `Référence « ${s(p, "ref")} » : table ou colonne introuvable`
	},
	"ERR-ID-DUPLICATE": {
		severity: "error",
		message: (p) => `Identifiant ${s(p, "id")} déjà utilisé par ${s(p, "first")}`
	},
	"WARN-GPU-ORPHAN-ID": {
		severity: "warning",
		message: (p) => `gpu.json : identifiant ${s(p, "id")} sans objet correspondant`
	},
	"WARN-UNREFERENCED-FILE": {
		severity: "warning",
		message: () => "Fichier non référencé par files.json"
	}
};
//#endregion
//#region src/core/validation/problems.ts
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
//#endregion
//#region src/core/load/csv.ts
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
	if (!Array.isArray(recs)) return {
		ok: false,
		code: "ERR-CSV-SYNTAX",
		line: recs.unclosedAt,
		params: {}
	};
	const [first, ...rest] = recs.filter((r) => !(r.fields.length === 1 && r.fields[0] === ""));
	if (!first) return {
		ok: false,
		code: "ERR-CSV-HEADER",
		line: 1,
		params: { reason: "en-tête absent" }
	};
	const header = first.fields;
	const seen = /* @__PURE__ */ new Set();
	for (const name of header) {
		if (name.trim() === "") return {
			ok: false,
			code: "ERR-CSV-HEADER",
			line: first.line,
			params: { reason: "nom de colonne vide" }
		};
		if (seen.has(name)) return {
			ok: false,
			code: "ERR-CSV-HEADER",
			line: first.line,
			params: { reason: `colonne « ${name} » dupliquée` }
		};
		seen.add(name);
	}
	for (const r of rest) if (r.fields.length !== header.length) return {
		ok: false,
		code: "ERR-CSV-ROW-LENGTH",
		line: r.line,
		params: {
			count: r.fields.length,
			expected: header.length
		}
	};
	return {
		ok: true,
		csv: {
			header,
			rows: rest.map((r) => r.fields)
		}
	};
}
//#endregion
//#region src/core/load/json.ts
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
//#endregion
//#region src/core/load/project.ts
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
* Les fichiers situés directement à la racine sont ignorés.
*/
async function loadProject(fs) {
	const paths = (await fs.listFiles()).filter((p) => p.includes("/")).sort();
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
			const r = parseCsv(text);
			if (r.ok) model.csvs.set(path, {
				path,
				csv: r.csv
			});
			else {
				model.csvs.set(path, { path });
				problems.push(problem(r.code, name, path, `/${r.line}`, {
					line: r.line,
					...r.params
				}));
			}
			return;
		}
		const isTable = rel.startsWith("types/") && rel.endsWith(".json");
		if (rel !== "files.json" && rel !== "gpu.json" && !isTable) return;
		const file = { path };
		const r = parseJson(text);
		if (r.ok) file.data = r.value;
		else problems.push(problem("ERR-JSON-SYNTAX", name, path, void 0, {
			line: r.line,
			column: r.column,
			detail: r.detail
		}));
		if (rel === "files.json") model.document = file;
		else if (rel === "gpu.json") model.gpu = file;
		else model.tables.set(path, file);
	});
	return {
		project: { models },
		problems
	};
}
//#endregion
//#region src/core/schemas/generated/validate.js
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
var schema15 = {
	"type": "object",
	"required": [
		"id",
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
function validate12(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
	let vErrors = null;
	let errors = 0;
	if (data && typeof data == "object" && !Array.isArray(data)) {
		if (data.id === void 0) {
			const err0 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "id" },
				message: "must have required property 'id'"
			};
			if (vErrors === null) vErrors = [err0];
			else vErrors.push(err0);
			errors++;
		}
		if (data.name === void 0) {
			const err1 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "name" },
				message: "must have required property 'name'"
			};
			if (vErrors === null) vErrors = [err1];
			else vErrors.push(err1);
			errors++;
		}
		if (data.type === void 0) {
			const err2 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "type" },
				message: "must have required property 'type'"
			};
			if (vErrors === null) vErrors = [err2];
			else vErrors.push(err2);
			errors++;
		}
		if (data.path === void 0) {
			const err3 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "path" },
				message: "must have required property 'path'"
			};
			if (vErrors === null) vErrors = [err3];
			else vErrors.push(err3);
			errors++;
		}
		if (data.id !== void 0) {
			let data0 = data.id;
			if (typeof data0 === "string") {
				if (!pattern0.test(data0)) {
					const err4 = {
						instancePath: instancePath + "/id",
						schemaPath: "#/definitions/Id/pattern",
						keyword: "pattern",
						params: { pattern: "^[0-9A-Za-z]{32}$" },
						message: "must match pattern \"^[0-9A-Za-z]{32}$\""
					};
					if (vErrors === null) vErrors = [err4];
					else vErrors.push(err4);
					errors++;
				}
			} else {
				const err5 = {
					instancePath: instancePath + "/id",
					schemaPath: "#/definitions/Id/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err5];
				else vErrors.push(err5);
				errors++;
			}
		}
		if (data.name !== void 0) {
			let data1 = data.name;
			if (typeof data1 === "string") {
				if (func2(data1) < 1) {
					const err6 = {
						instancePath: instancePath + "/name",
						schemaPath: "#/properties/name/minLength",
						keyword: "minLength",
						params: { limit: 1 },
						message: "must NOT have fewer than 1 characters"
					};
					if (vErrors === null) vErrors = [err6];
					else vErrors.push(err6);
					errors++;
				}
			} else {
				const err7 = {
					instancePath: instancePath + "/name",
					schemaPath: "#/properties/name/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err7];
				else vErrors.push(err7);
				errors++;
			}
		}
		if (data.title !== void 0) {
			if (typeof data.title !== "string") {
				const err8 = {
					instancePath: instancePath + "/title",
					schemaPath: "#/properties/title/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err8];
				else vErrors.push(err8);
				errors++;
			}
		}
		if (data.description !== void 0) {
			if (typeof data.description !== "string") {
				const err9 = {
					instancePath: instancePath + "/description",
					schemaPath: "#/properties/description/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err9];
				else vErrors.push(err9);
				errors++;
			}
		}
		if (data.type !== void 0) {
			let data4 = data.type;
			if (!(data4 === "table" || data4 === "multi_table" || data4 === "pdf" || data4 === "metadata" || data4 === "directory")) {
				const err10 = {
					instancePath: instancePath + "/type",
					schemaPath: "#/properties/type/enum",
					keyword: "enum",
					params: { allowedValues: schema15.properties.type.enum },
					message: "must be equal to one of the allowed values"
				};
				if (vErrors === null) vErrors = [err10];
				else vErrors.push(err10);
				errors++;
			}
		}
		if (data.path !== void 0) {
			if (typeof data.path !== "string") {
				const err11 = {
					instancePath: instancePath + "/path",
					schemaPath: "#/properties/path/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err11];
				else vErrors.push(err11);
				errors++;
			}
		}
		if (data.mandatory !== void 0) {
			let data6 = data.mandatory;
			if (!(data6 === "ERROR" || data6 === "WARN" || data6 === "OPTIONAL")) {
				const err12 = {
					instancePath: instancePath + "/mandatory",
					schemaPath: "#/properties/mandatory/enum",
					keyword: "enum",
					params: { allowedValues: schema15.properties.mandatory.enum },
					message: "must be equal to one of the allowed values"
				};
				if (vErrors === null) vErrors = [err12];
				else vErrors.push(err12);
				errors++;
			}
		}
		if (data.tableModel !== void 0) {
			let data7 = data.tableModel;
			if (typeof data7 === "string") {
				if (func2(data7) < 1) {
					const err13 = {
						instancePath: instancePath + "/tableModel",
						schemaPath: "#/properties/tableModel/minLength",
						keyword: "minLength",
						params: { limit: 1 },
						message: "must NOT have fewer than 1 characters"
					};
					if (vErrors === null) vErrors = [err13];
					else vErrors.push(err13);
					errors++;
				}
			} else {
				const err14 = {
					instancePath: instancePath + "/tableModel",
					schemaPath: "#/properties/tableModel/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err14];
				else vErrors.push(err14);
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
							const err15 = {
								instancePath: instancePath + "/tables/" + i0,
								schemaPath: "#/properties/tables/items/required",
								keyword: "required",
								params: { missingProperty: "name" },
								message: "must have required property 'name'"
							};
							if (vErrors === null) vErrors = [err15];
							else vErrors.push(err15);
							errors++;
						}
						if (data9.name !== void 0) {
							if (typeof data9.name !== "string") {
								const err16 = {
									instancePath: instancePath + "/tables/" + i0 + "/name",
									schemaPath: "#/properties/tables/items/properties/name/type",
									keyword: "type",
									params: { type: "string" },
									message: "must be string"
								};
								if (vErrors === null) vErrors = [err16];
								else vErrors.push(err16);
								errors++;
							}
						}
						if (data9.path !== void 0) {
							if (typeof data9.path !== "string") {
								const err17 = {
									instancePath: instancePath + "/tables/" + i0 + "/path",
									schemaPath: "#/properties/tables/items/properties/path/type",
									keyword: "type",
									params: { type: "string" },
									message: "must be string"
								};
								if (vErrors === null) vErrors = [err17];
								else vErrors.push(err17);
								errors++;
							}
						}
						if (data9.tableModel !== void 0) {
							if (typeof data9.tableModel !== "string") {
								const err18 = {
									instancePath: instancePath + "/tables/" + i0 + "/tableModel",
									schemaPath: "#/properties/tables/items/properties/tableModel/type",
									keyword: "type",
									params: { type: "string" },
									message: "must be string"
								};
								if (vErrors === null) vErrors = [err18];
								else vErrors.push(err18);
								errors++;
							}
						}
					} else {
						const err19 = {
							instancePath: instancePath + "/tables/" + i0,
							schemaPath: "#/properties/tables/items/type",
							keyword: "type",
							params: { type: "object" },
							message: "must be object"
						};
						if (vErrors === null) vErrors = [err19];
						else vErrors.push(err19);
						errors++;
					}
				}
			} else {
				const err20 = {
					instancePath: instancePath + "/tables",
					schemaPath: "#/properties/tables/type",
					keyword: "type",
					params: { type: "array" },
					message: "must be array"
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
	validate12.errors = vErrors;
	return errors === 0;
}
function validate14(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
	let vErrors = null;
	let errors = 0;
	if (data && typeof data == "object" && !Array.isArray(data)) {
		if (data.id === void 0) {
			const err0 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "id" },
				message: "must have required property 'id'"
			};
			if (vErrors === null) vErrors = [err0];
			else vErrors.push(err0);
			errors++;
		}
		if (data.name === void 0) {
			const err1 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "name" },
				message: "must have required property 'name'"
			};
			if (vErrors === null) vErrors = [err1];
			else vErrors.push(err1);
			errors++;
		}
		if (data.data === void 0) {
			const err2 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "data" },
				message: "must have required property 'data'"
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
		if (data.data !== void 0) {
			let data3 = data.data;
			if (typeof data3 === "string") {
				if (func2(data3) < 1) {
					const err8 = {
						instancePath: instancePath + "/data",
						schemaPath: "#/properties/data/minLength",
						keyword: "minLength",
						params: { limit: 1 },
						message: "must NOT have fewer than 1 characters"
					};
					if (vErrors === null) vErrors = [err8];
					else vErrors.push(err8);
					errors++;
				}
			} else {
				const err9 = {
					instancePath: instancePath + "/data",
					schemaPath: "#/properties/data/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string"
				};
				if (vErrors === null) vErrors = [err9];
				else vErrors.push(err9);
				errors++;
			}
		}
	} else {
		const err10 = {
			instancePath,
			schemaPath: "#/type",
			keyword: "type",
			params: { type: "object" },
			message: "must be object"
		};
		if (vErrors === null) vErrors = [err10];
		else vErrors.push(err10);
		errors++;
	}
	validate14.errors = vErrors;
	return errors === 0;
}
function validate11(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
	let vErrors = null;
	let errors = 0;
	if (data && typeof data == "object" && !Array.isArray(data)) {
		if (data.id === void 0) {
			const err0 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "id" },
				message: "must have required property 'id'"
			};
			if (vErrors === null) vErrors = [err0];
			else vErrors.push(err0);
			errors++;
		}
		if (data.name === void 0) {
			const err1 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "name" },
				message: "must have required property 'name'"
			};
			if (vErrors === null) vErrors = [err1];
			else vErrors.push(err1);
			errors++;
		}
		if (data.files === void 0) {
			const err2 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "files" },
				message: "must have required property 'files'"
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
		if (data.abstract !== void 0) {
			if (typeof data.abstract !== "boolean") {
				const err9 = {
					instancePath: instancePath + "/abstract",
					schemaPath: "#/properties/abstract/type",
					keyword: "type",
					params: { type: "boolean" },
					message: "must be boolean"
				};
				if (vErrors === null) vErrors = [err9];
				else vErrors.push(err9);
				errors++;
			}
		}
		if (data.files !== void 0) {
			let data5 = data.files;
			if (Array.isArray(data5)) {
				const len0 = data5.length;
				for (let i0 = 0; i0 < len0; i0++) if (!validate12(data5[i0], {
					instancePath: instancePath + "/files/" + i0,
					parentData: data5,
					parentDataProperty: i0,
					rootData
				})) {
					vErrors = vErrors === null ? validate12.errors : vErrors.concat(validate12.errors);
					errors = vErrors.length;
				}
			} else {
				const err10 = {
					instancePath: instancePath + "/files",
					schemaPath: "#/properties/files/type",
					keyword: "type",
					params: { type: "array" },
					message: "must be array"
				};
				if (vErrors === null) vErrors = [err10];
				else vErrors.push(err10);
				errors++;
			}
		}
		if (data.codes !== void 0) {
			let data7 = data.codes;
			if (Array.isArray(data7)) {
				const len1 = data7.length;
				for (let i1 = 0; i1 < len1; i1++) if (!validate14(data7[i1], {
					instancePath: instancePath + "/codes/" + i1,
					parentData: data7,
					parentDataProperty: i1,
					rootData
				})) {
					vErrors = vErrors === null ? validate14.errors : vErrors.concat(validate14.errors);
					errors = vErrors.length;
				}
			} else {
				const err11 = {
					instancePath: instancePath + "/codes",
					schemaPath: "#/properties/codes/type",
					keyword: "type",
					params: { type: "array" },
					message: "must be array"
				};
				if (vErrors === null) vErrors = [err11];
				else vErrors.push(err11);
				errors++;
			}
		}
		if (data.constraints !== void 0) {
			let data9 = data.constraints;
			if (data9 && typeof data9 == "object" && !Array.isArray(data9)) {
				if (data9.folderName !== void 0) {
					if (typeof data9.folderName !== "string") {
						const err12 = {
							instancePath: instancePath + "/constraints/folderName",
							schemaPath: "#/definitions/DocumentConstraints/properties/folderName/type",
							keyword: "type",
							params: { type: "string" },
							message: "must be string"
						};
						if (vErrors === null) vErrors = [err12];
						else vErrors.push(err12);
						errors++;
					}
				}
				if (data9.metadataSpecification !== void 0) {
					if (typeof data9.metadataSpecification !== "string") {
						const err13 = {
							instancePath: instancePath + "/constraints/metadataSpecification",
							schemaPath: "#/definitions/DocumentConstraints/properties/metadataSpecification/type",
							keyword: "type",
							params: { type: "string" },
							message: "must be string"
						};
						if (vErrors === null) vErrors = [err13];
						else vErrors.push(err13);
						errors++;
					}
				}
			} else {
				const err14 = {
					instancePath: instancePath + "/constraints",
					schemaPath: "#/definitions/DocumentConstraints/type",
					keyword: "type",
					params: { type: "object" },
					message: "must be object"
				};
				if (vErrors === null) vErrors = [err14];
				else vErrors.push(err14);
				errors++;
			}
		}
	} else {
		const err15 = {
			instancePath,
			schemaPath: "#/type",
			keyword: "type",
			params: { type: "object" },
			message: "must be object"
		};
		if (vErrors === null) vErrors = [err15];
		else vErrors.push(err15);
		errors++;
	}
	validate11.errors = vErrors;
	return errors === 0;
}
function validate10(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
	let vErrors = null;
	let errors = 0;
	if (data && typeof data == "object" && !Array.isArray(data)) {
		if (data.id === void 0) {
			const err0 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "id" },
				message: "must have required property 'id'"
			};
			if (vErrors === null) vErrors = [err0];
			else vErrors.push(err0);
			errors++;
		}
		if (data.name === void 0) {
			const err1 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "name" },
				message: "must have required property 'name'"
			};
			if (vErrors === null) vErrors = [err1];
			else vErrors.push(err1);
			errors++;
		}
		if (data.files === void 0) {
			const err2 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "files" },
				message: "must have required property 'files'"
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
		if (data.abstract !== void 0) {
			if (typeof data.abstract !== "boolean") {
				const err9 = {
					instancePath: instancePath + "/abstract",
					schemaPath: "#/properties/abstract/type",
					keyword: "type",
					params: { type: "boolean" },
					message: "must be boolean"
				};
				if (vErrors === null) vErrors = [err9];
				else vErrors.push(err9);
				errors++;
			}
		}
		if (data.parent !== void 0) {
			if (!validate11(data.parent, {
				instancePath: instancePath + "/parent",
				parentData: data,
				parentDataProperty: "parent",
				rootData
			})) {
				vErrors = vErrors === null ? validate11.errors : vErrors.concat(validate11.errors);
				errors = vErrors.length;
			}
		}
		if (data.files !== void 0) {
			let data6 = data.files;
			if (Array.isArray(data6)) {
				const len0 = data6.length;
				for (let i0 = 0; i0 < len0; i0++) if (!validate12(data6[i0], {
					instancePath: instancePath + "/files/" + i0,
					parentData: data6,
					parentDataProperty: i0,
					rootData
				})) {
					vErrors = vErrors === null ? validate12.errors : vErrors.concat(validate12.errors);
					errors = vErrors.length;
				}
			} else {
				const err10 = {
					instancePath: instancePath + "/files",
					schemaPath: "#/properties/files/type",
					keyword: "type",
					params: { type: "array" },
					message: "must be array"
				};
				if (vErrors === null) vErrors = [err10];
				else vErrors.push(err10);
				errors++;
			}
		}
		if (data.codes !== void 0) {
			let data8 = data.codes;
			if (Array.isArray(data8)) {
				const len1 = data8.length;
				for (let i1 = 0; i1 < len1; i1++) if (!validate14(data8[i1], {
					instancePath: instancePath + "/codes/" + i1,
					parentData: data8,
					parentDataProperty: i1,
					rootData
				})) {
					vErrors = vErrors === null ? validate14.errors : vErrors.concat(validate14.errors);
					errors = vErrors.length;
				}
			} else {
				const err11 = {
					instancePath: instancePath + "/codes",
					schemaPath: "#/properties/codes/type",
					keyword: "type",
					params: { type: "array" },
					message: "must be array"
				};
				if (vErrors === null) vErrors = [err11];
				else vErrors.push(err11);
				errors++;
			}
		}
		if (data.constraints !== void 0) {
			let data10 = data.constraints;
			if (data10 && typeof data10 == "object" && !Array.isArray(data10)) {
				if (data10.folderName !== void 0) {
					if (typeof data10.folderName !== "string") {
						const err12 = {
							instancePath: instancePath + "/constraints/folderName",
							schemaPath: "#/definitions/DocumentConstraints/properties/folderName/type",
							keyword: "type",
							params: { type: "string" },
							message: "must be string"
						};
						if (vErrors === null) vErrors = [err12];
						else vErrors.push(err12);
						errors++;
					}
				}
				if (data10.metadataSpecification !== void 0) {
					if (typeof data10.metadataSpecification !== "string") {
						const err13 = {
							instancePath: instancePath + "/constraints/metadataSpecification",
							schemaPath: "#/definitions/DocumentConstraints/properties/metadataSpecification/type",
							keyword: "type",
							params: { type: "string" },
							message: "must be string"
						};
						if (vErrors === null) vErrors = [err13];
						else vErrors.push(err13);
						errors++;
					}
				}
			} else {
				const err14 = {
					instancePath: instancePath + "/constraints",
					schemaPath: "#/definitions/DocumentConstraints/type",
					keyword: "type",
					params: { type: "object" },
					message: "must be object"
				};
				if (vErrors === null) vErrors = [err14];
				else vErrors.push(err14);
				errors++;
			}
		}
	} else {
		const err15 = {
			instancePath,
			schemaPath: "#/type",
			keyword: "type",
			params: { type: "object" },
			message: "must be object"
		};
		if (vErrors === null) vErrors = [err15];
		else vErrors.push(err15);
		errors++;
	}
	validate10.errors = vErrors;
	return errors === 0;
}
var validateTable = validate19;
var schema23 = {
	"type": "object",
	"required": [
		"id",
		"name",
		"type"
	],
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
var schema25 = {
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
			"items": { "type": "string" }
		},
		"reference": { "type": "string" }
	}
};
function validate20(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
	let vErrors = null;
	let errors = 0;
	if (data && typeof data == "object" && !Array.isArray(data)) {
		if (data.id === void 0) {
			const err0 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "id" },
				message: "must have required property 'id'"
			};
			if (vErrors === null) vErrors = [err0];
			else vErrors.push(err0);
			errors++;
		}
		if (data.name === void 0) {
			const err1 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "name" },
				message: "must have required property 'name'"
			};
			if (vErrors === null) vErrors = [err1];
			else vErrors.push(err1);
			errors++;
		}
		if (data.type === void 0) {
			const err2 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "type" },
				message: "must have required property 'type'"
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
						schemaPath: "document#/definitions/Id/pattern",
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
					schemaPath: "document#/definitions/Id/type",
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
			if (!(data4 === "Boolean" || data4 === "Date" || data4 === "Double" || data4 === "Filename" || data4 === "Geometry" || data4 === "GeometryCollection" || data4 === "Integer" || data4 === "LineString" || data4 === "MultiLineString" || data4 === "MultiPoint" || data4 === "MultiPolygon" || data4 === "Path" || data4 === "Point" || data4 === "Polygon" || data4 === "String" || data4 === "Url")) {
				const err9 = {
					instancePath: instancePath + "/type",
					schemaPath: "#/properties/type/enum",
					keyword: "enum",
					params: { allowedValues: schema23.properties.type.enum },
					message: "must be equal to one of the allowed values"
				};
				if (vErrors === null) vErrors = [err9];
				else vErrors.push(err9);
				errors++;
			}
		}
		if (data.constraints !== void 0) {
			let data5 = data.constraints;
			if (data5 && typeof data5 == "object" && !Array.isArray(data5)) {
				if (data5.required !== void 0) {
					if (typeof data5.required !== "boolean") {
						const err10 = {
							instancePath: instancePath + "/constraints/required",
							schemaPath: "#/definitions/ColumnConstraints/properties/required/type",
							keyword: "type",
							params: { type: "boolean" },
							message: "must be boolean"
						};
						if (vErrors === null) vErrors = [err10];
						else vErrors.push(err10);
						errors++;
					}
				}
				if (data5.presenceRequired !== void 0) {
					if (typeof data5.presenceRequired !== "boolean") {
						const err11 = {
							instancePath: instancePath + "/constraints/presenceRequired",
							schemaPath: "#/definitions/ColumnConstraints/properties/presenceRequired/type",
							keyword: "type",
							params: { type: "boolean" },
							message: "must be boolean"
						};
						if (vErrors === null) vErrors = [err11];
						else vErrors.push(err11);
						errors++;
					}
				}
				if (data5.unique !== void 0) {
					if (typeof data5.unique !== "boolean") {
						const err12 = {
							instancePath: instancePath + "/constraints/unique",
							schemaPath: "#/definitions/ColumnConstraints/properties/unique/type",
							keyword: "type",
							params: { type: "boolean" },
							message: "must be boolean"
						};
						if (vErrors === null) vErrors = [err12];
						else vErrors.push(err12);
						errors++;
					}
				}
				if (data5.pattern !== void 0) {
					if (typeof data5.pattern !== "string") {
						const err13 = {
							instancePath: instancePath + "/constraints/pattern",
							schemaPath: "#/definitions/ColumnConstraints/properties/pattern/type",
							keyword: "type",
							params: { type: "string" },
							message: "must be string"
						};
						if (vErrors === null) vErrors = [err13];
						else vErrors.push(err13);
						errors++;
					}
				}
				if (data5.minLength !== void 0) {
					let data10 = data5.minLength;
					if (!(typeof data10 == "number" && !(data10 % 1) && !isNaN(data10) && isFinite(data10))) {
						const err14 = {
							instancePath: instancePath + "/constraints/minLength",
							schemaPath: "#/definitions/ColumnConstraints/properties/minLength/type",
							keyword: "type",
							params: { type: "integer" },
							message: "must be integer"
						};
						if (vErrors === null) vErrors = [err14];
						else vErrors.push(err14);
						errors++;
					}
					if (typeof data10 == "number" && isFinite(data10)) {
						if (data10 < 0 || isNaN(data10)) {
							const err15 = {
								instancePath: instancePath + "/constraints/minLength",
								schemaPath: "#/definitions/ColumnConstraints/properties/minLength/minimum",
								keyword: "minimum",
								params: {
									comparison: ">=",
									limit: 0
								},
								message: "must be >= 0"
							};
							if (vErrors === null) vErrors = [err15];
							else vErrors.push(err15);
							errors++;
						}
					}
				}
				if (data5.maxLength !== void 0) {
					let data11 = data5.maxLength;
					if (!(typeof data11 == "number" && !(data11 % 1) && !isNaN(data11) && isFinite(data11))) {
						const err16 = {
							instancePath: instancePath + "/constraints/maxLength",
							schemaPath: "#/definitions/ColumnConstraints/properties/maxLength/type",
							keyword: "type",
							params: { type: "integer" },
							message: "must be integer"
						};
						if (vErrors === null) vErrors = [err16];
						else vErrors.push(err16);
						errors++;
					}
					if (typeof data11 == "number" && isFinite(data11)) {
						if (data11 < -1 || isNaN(data11)) {
							const err17 = {
								instancePath: instancePath + "/constraints/maxLength",
								schemaPath: "#/definitions/ColumnConstraints/properties/maxLength/minimum",
								keyword: "minimum",
								params: {
									comparison: ">=",
									limit: -1
								},
								message: "must be >= -1"
							};
							if (vErrors === null) vErrors = [err17];
							else vErrors.push(err17);
							errors++;
						}
					}
				}
				if (data5.enum !== void 0) {
					let data12 = data5.enum;
					if (!Array.isArray(data12) && data12 !== null) {
						const err18 = {
							instancePath: instancePath + "/constraints/enum",
							schemaPath: "#/definitions/ColumnConstraints/properties/enum/type",
							keyword: "type",
							params: { type: schema25.properties.enum.type },
							message: "must be array,null"
						};
						if (vErrors === null) vErrors = [err18];
						else vErrors.push(err18);
						errors++;
					}
					if (Array.isArray(data12)) {
						const len0 = data12.length;
						for (let i0 = 0; i0 < len0; i0++) if (typeof data12[i0] !== "string") {
							const err19 = {
								instancePath: instancePath + "/constraints/enum/" + i0,
								schemaPath: "#/definitions/ColumnConstraints/properties/enum/items/type",
								keyword: "type",
								params: { type: "string" },
								message: "must be string"
							};
							if (vErrors === null) vErrors = [err19];
							else vErrors.push(err19);
							errors++;
						}
					}
				}
				if (data5.reference !== void 0) {
					if (typeof data5.reference !== "string") {
						const err20 = {
							instancePath: instancePath + "/constraints/reference",
							schemaPath: "#/definitions/ColumnConstraints/properties/reference/type",
							keyword: "type",
							params: { type: "string" },
							message: "must be string"
						};
						if (vErrors === null) vErrors = [err20];
						else vErrors.push(err20);
						errors++;
					}
				}
			} else {
				const err21 = {
					instancePath: instancePath + "/constraints",
					schemaPath: "#/definitions/ColumnConstraints/type",
					keyword: "type",
					params: { type: "object" },
					message: "must be object"
				};
				if (vErrors === null) vErrors = [err21];
				else vErrors.push(err21);
				errors++;
			}
		}
	} else {
		const err22 = {
			instancePath,
			schemaPath: "#/type",
			keyword: "type",
			params: { type: "object" },
			message: "must be object"
		};
		if (vErrors === null) vErrors = [err22];
		else vErrors.push(err22);
		errors++;
	}
	validate20.errors = vErrors;
	return errors === 0;
}
function validate19(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
	let vErrors = null;
	let errors = 0;
	if (data && typeof data == "object" && !Array.isArray(data)) {
		if (data.id === void 0) {
			const err0 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "id" },
				message: "must have required property 'id'"
			};
			if (vErrors === null) vErrors = [err0];
			else vErrors.push(err0);
			errors++;
		}
		if (data.name === void 0) {
			const err1 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "name" },
				message: "must have required property 'name'"
			};
			if (vErrors === null) vErrors = [err1];
			else vErrors.push(err1);
			errors++;
		}
		if (data.columns === void 0) {
			const err2 = {
				instancePath,
				schemaPath: "#/required",
				keyword: "required",
				params: { missingProperty: "columns" },
				message: "must have required property 'columns'"
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
						schemaPath: "document#/definitions/Id/pattern",
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
					schemaPath: "document#/definitions/Id/type",
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
		if (data.columns !== void 0) {
			let data4 = data.columns;
			if (Array.isArray(data4)) {
				const len0 = data4.length;
				for (let i0 = 0; i0 < len0; i0++) if (!validate20(data4[i0], {
					instancePath: instancePath + "/columns/" + i0,
					parentData: data4,
					parentDataProperty: i0,
					rootData
				})) {
					vErrors = vErrors === null ? validate20.errors : vErrors.concat(validate20.errors);
					errors = vErrors.length;
				}
			} else {
				const err9 = {
					instancePath: instancePath + "/columns",
					schemaPath: "#/properties/columns/type",
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
			let data6 = data.constraints;
			if (data6 && typeof data6 == "object" && !Array.isArray(data6)) {
				if (data6.conditions !== void 0) {
					let data7 = data6.conditions;
					if (Array.isArray(data7)) {
						const len1 = data7.length;
						for (let i1 = 0; i1 < len1; i1++) if (typeof data7[i1] !== "string") {
							const err10 = {
								instancePath: instancePath + "/constraints/conditions/" + i1,
								schemaPath: "#/properties/constraints/properties/conditions/items/type",
								keyword: "type",
								params: { type: "string" },
								message: "must be string"
							};
							if (vErrors === null) vErrors = [err10];
							else vErrors.push(err10);
							errors++;
						}
					} else {
						const err11 = {
							instancePath: instancePath + "/constraints/conditions",
							schemaPath: "#/properties/constraints/properties/conditions/type",
							keyword: "type",
							params: { type: "array" },
							message: "must be array"
						};
						if (vErrors === null) vErrors = [err11];
						else vErrors.push(err11);
						errors++;
					}
				}
				if (data6.foreignKeys !== void 0) {
					let data9 = data6.foreignKeys;
					if (Array.isArray(data9)) {
						const len2 = data9.length;
						for (let i2 = 0; i2 < len2; i2++) if (typeof data9[i2] !== "string") {
							const err12 = {
								instancePath: instancePath + "/constraints/foreignKeys/" + i2,
								schemaPath: "#/properties/constraints/properties/foreignKeys/items/type",
								keyword: "type",
								params: { type: "string" },
								message: "must be string"
							};
							if (vErrors === null) vErrors = [err12];
							else vErrors.push(err12);
							errors++;
						}
					} else {
						const err13 = {
							instancePath: instancePath + "/constraints/foreignKeys",
							schemaPath: "#/properties/constraints/properties/foreignKeys/type",
							keyword: "type",
							params: { type: "array" },
							message: "must be array"
						};
						if (vErrors === null) vErrors = [err13];
						else vErrors.push(err13);
						errors++;
					}
				}
			} else {
				const err14 = {
					instancePath: instancePath + "/constraints",
					schemaPath: "#/properties/constraints/type",
					keyword: "type",
					params: { type: "object" },
					message: "must be object"
				};
				if (vErrors === null) vErrors = [err14];
				else vErrors.push(err14);
				errors++;
			}
		}
	} else {
		const err15 = {
			instancePath,
			schemaPath: "#/type",
			keyword: "type",
			params: { type: "object" },
			message: "must be object"
		};
		if (vErrors === null) vErrors = [err15];
		else vErrors.push(err15);
		errors++;
	}
	validate19.errors = vErrors;
	return errors === 0;
}
var validateGpu = validate22;
var schema27 = {
	"type": "object",
	"title": "Surcharges d'une table de la base GpU, indexées par identifiant d'objet",
	"propertyNames": { "$ref": "document#/definitions/Id" },
	"additionalProperties": {
		"type": "object",
		"additionalProperties": { "type": ["string", "null"] }
	}
};
function validate23(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
	let vErrors = null;
	let errors = 0;
	if (data && typeof data == "object" && !Array.isArray(data)) {
		for (const key0 in data) {
			const _errs1 = errors;
			if (typeof key0 === "string") {
				if (!pattern0.test(key0)) {
					const err0 = {
						instancePath,
						schemaPath: "document#/definitions/Id/pattern",
						keyword: "pattern",
						params: { pattern: "^[0-9A-Za-z]{32}$" },
						message: "must match pattern \"^[0-9A-Za-z]{32}$\"",
						propertyName: key0
					};
					if (vErrors === null) vErrors = [err0];
					else vErrors.push(err0);
					errors++;
				}
			} else {
				const err1 = {
					instancePath,
					schemaPath: "document#/definitions/Id/type",
					keyword: "type",
					params: { type: "string" },
					message: "must be string",
					propertyName: key0
				};
				if (vErrors === null) vErrors = [err1];
				else vErrors.push(err1);
				errors++;
			}
			if (!(_errs1 === errors)) {
				const err2 = {
					instancePath,
					schemaPath: "#/propertyNames",
					keyword: "propertyNames",
					params: { propertyName: key0 },
					message: "property name must be valid"
				};
				if (vErrors === null) vErrors = [err2];
				else vErrors.push(err2);
				errors++;
			}
		}
		for (const key1 in data) {
			let data0 = data[key1];
			if (data0 && typeof data0 == "object" && !Array.isArray(data0)) for (const key2 in data0) {
				let data1 = data0[key2];
				if (typeof data1 !== "string" && data1 !== null) {
					const err3 = {
						instancePath: instancePath + "/" + key1.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),
						schemaPath: "#/additionalProperties/additionalProperties/type",
						keyword: "type",
						params: { type: schema27.additionalProperties.additionalProperties.type },
						message: "must be string,null"
					};
					if (vErrors === null) vErrors = [err3];
					else vErrors.push(err3);
					errors++;
				}
			}
			else {
				const err4 = {
					instancePath: instancePath + "/" + key1.replace(/~/g, "~0").replace(/\//g, "~1"),
					schemaPath: "#/additionalProperties/type",
					keyword: "type",
					params: { type: "object" },
					message: "must be object"
				};
				if (vErrors === null) vErrors = [err4];
				else vErrors.push(err4);
				errors++;
			}
		}
	} else {
		const err5 = {
			instancePath,
			schemaPath: "#/type",
			keyword: "type",
			params: { type: "object" },
			message: "must be object"
		};
		if (vErrors === null) vErrors = [err5];
		else vErrors.push(err5);
		errors++;
	}
	validate23.errors = vErrors;
	return errors === 0;
}
function validate22(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
	let vErrors = null;
	let errors = 0;
	if (data && typeof data == "object" && !Array.isArray(data)) {
		for (const key0 in data) if (!(key0 === "validator_document_model" || key0 === "validator_file_model" || key0 === "validator_feature_type" || key0 === "validator_attribute_type" || key0 === "validator_static_table")) {
			const err0 = {
				instancePath,
				schemaPath: "#/additionalProperties",
				keyword: "additionalProperties",
				params: { additionalProperty: key0 },
				message: "must NOT have additional properties"
			};
			if (vErrors === null) vErrors = [err0];
			else vErrors.push(err0);
			errors++;
		}
		if (data.validator_document_model !== void 0) {
			if (!validate23(data.validator_document_model, {
				instancePath: instancePath + "/validator_document_model",
				parentData: data,
				parentDataProperty: "validator_document_model",
				rootData
			})) {
				vErrors = vErrors === null ? validate23.errors : vErrors.concat(validate23.errors);
				errors = vErrors.length;
			}
		}
		if (data.validator_file_model !== void 0) {
			if (!validate23(data.validator_file_model, {
				instancePath: instancePath + "/validator_file_model",
				parentData: data,
				parentDataProperty: "validator_file_model",
				rootData
			})) {
				vErrors = vErrors === null ? validate23.errors : vErrors.concat(validate23.errors);
				errors = vErrors.length;
			}
		}
		if (data.validator_feature_type !== void 0) {
			if (!validate23(data.validator_feature_type, {
				instancePath: instancePath + "/validator_feature_type",
				parentData: data,
				parentDataProperty: "validator_feature_type",
				rootData
			})) {
				vErrors = vErrors === null ? validate23.errors : vErrors.concat(validate23.errors);
				errors = vErrors.length;
			}
		}
		if (data.validator_attribute_type !== void 0) {
			if (!validate23(data.validator_attribute_type, {
				instancePath: instancePath + "/validator_attribute_type",
				parentData: data,
				parentDataProperty: "validator_attribute_type",
				rootData
			})) {
				vErrors = vErrors === null ? validate23.errors : vErrors.concat(validate23.errors);
				errors = vErrors.length;
			}
		}
		if (data.validator_static_table !== void 0) {
			if (!validate23(data.validator_static_table, {
				instancePath: instancePath + "/validator_static_table",
				parentData: data,
				parentDataProperty: "validator_static_table",
				rootData
			})) {
				vErrors = vErrors === null ? validate23.errors : vErrors.concat(validate23.errors);
				errors = vErrors.length;
			}
		}
	} else {
		const err1 = {
			instancePath,
			schemaPath: "#/type",
			keyword: "type",
			params: { type: "object" },
			message: "must be object"
		};
		if (vErrors === null) vErrors = [err1];
		else vErrors.push(err1);
		errors++;
	}
	validate22.errors = vErrors;
	return errors === 0;
}
//#endregion
//#region src/core/model/paths.ts
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
//#endregion
//#region src/core/validation/foreign-key.ts
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
//#endregion
//#region src/core/validation/refs.ts
function collectIds(data, into) {
	if (Array.isArray(data)) for (const v of data) collectIds(v, into);
	else if (data !== null && typeof data === "object") for (const [k, v] of Object.entries(data)) if (k === "id" && typeof v === "string") into.add(v);
	else collectIds(v, into);
	return into;
}
function gpuDefinitions(gpu) {
	const out = [];
	for (const section of Object.values(gpu ?? {})) for (const [id, entry] of Object.entries(section ?? {})) if ("name" in entry || "feature_type_id" in entry || "document_model_id" in entry) out.push(id);
	return out;
}
var Checker = class {
	project;
	checked;
	out = [];
	files;
	parentNames = /* @__PURE__ */ new Set();
	known = /* @__PURE__ */ new Map();
	constructor(project, checked) {
		this.project = project;
		this.checked = checked;
		this.files = new Set([...project.models.values()].flatMap((m) => m.files));
		for (const c of checked.values()) if (c.document?.parent) this.parentNames.add(c.document.parent.name);
	}
	run() {
		for (const c of this.checked.values()) this.model(c);
		return this.out;
	}
	model(c) {
		const name = c.model.name;
		if (!c.model.document && !this.parentNames.has(name)) this.out.push(problem("WARN-MODEL-NO-DOCUMENT", name, `${name}/`, void 0));
		const referenced = this.document(c);
		this.ids(c);
		for (const [path, table] of c.tables) this.table(c, path, table);
		if (c.document) for (const path of c.model.files) {
			const rel = path.slice(name.length + 1);
			if ((rel.startsWith("types/") && rel.endsWith(".json") || rel.startsWith("codes/") && rel.endsWith(".csv")) && !referenced.has(path)) this.out.push(problem("WARN-UNREFERENCED-FILE", name, path, void 0));
		}
		this.gpu(c);
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
		if (doc.parent && !this.project.models.has(doc.parent.name)) this.out.push(problem("ERR-PARENT-MISSING", name, file, "/parent/name", { name: doc.parent.name }));
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
	knownIds(name, visiting = /* @__PURE__ */ new Set()) {
		const cached = this.known.get(name);
		if (cached) return cached;
		const known = /* @__PURE__ */ new Set();
		const c = this.checked.get(name);
		if (!c || visiting.has(name)) return known;
		visiting.add(name);
		collectIds(c.model.document?.data, known);
		for (const t of c.model.tables.values()) collectIds(t.data, known);
		for (const id of gpuDefinitions(c.gpu)) known.add(id);
		if (c.document?.parent) for (const id of this.knownIds(c.document.parent.name, visiting)) known.add(id);
		if (!c.model.document) for (const child of this.checked.values()) {
			if (child.document?.parent?.name !== name) continue;
			collectIds(child.model.document?.data, known);
			for (const t of child.model.tables.values()) collectIds(t.data, known);
		}
		this.known.set(name, known);
		return known;
	}
	gpu(c) {
		if (!c.gpu) return;
		const name = c.model.name;
		const known = this.knownIds(name);
		for (const [section, entries] of Object.entries(c.gpu)) for (const id of Object.keys(entries ?? {})) if (!known.has(id)) this.out.push(problem("WARN-GPU-ORPHAN-ID", name, `${name}/gpu.json`, pointer(section, id), { id }));
	}
};
function crossReferences(project, checked) {
	return new Checker(project, checked).run();
}
//#endregion
//#region src/core/validation/schema.ts
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
//#endregion
//#region src/core/validation/validate.ts
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
		const gpu = check(model.gpu, validateGpu, model.name);
		if (gpu) c.gpu = gpu;
		checked.set(model.name, c);
	}
	problems.push(...crossReferences(project, checked));
	return {
		checked,
		problems
	};
}
/** Charge et valide une configuration ; problèmes triés (contrat problem-codes). */
async function checkConfig(fs) {
	const loaded = await loadProject(fs);
	const { checked, problems } = validateProject(loaded.project);
	return {
		project: loaded.project,
		checked,
		problems: [...loaded.problems, ...problems].sort(compareProblems)
	};
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
//#endregion
//#region src/cli/fs.ts
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
	async readText(path) {
		const full = await realpath(join(this.root, ...path.split("/")));
		if (!isInside(this.root, full)) throw new Error(`Chemin hors de la configuration : ${path}`);
		return readFile(full, "utf8");
	}
};
//#endregion
//#region src/cli/check.ts
var plural = (n, word) => `${n} ${word}${n > 1 ? "s" : ""}`;
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
		out.log(`${plural(summary.models, "modèle")}, ${plural(summary.tables, "table")}, ${summary.codeLists} liste${summary.codeLists > 1 ? "s" : ""} de codes — ${plural(summary.errors, "erreur")}, ${plural(summary.warnings, "avertissement")}`);
	}
	const { errors, warnings } = countProblems(result.problems);
	return errors > 0 || options.strict && warnings > 0 ? 1 : 0;
}
//#endregion
//#region src/cli/server.ts
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
function handler(options, port) {
	const uiRoot = normalize(options.uiDir + sep);
	return async (req, res) => {
		try {
			const host = req.headers.host;
			if (host !== `127.0.0.1:${port()}` && host !== `localhost:${port()}`) return send(res, 403, "Hôte refusé");
			if (req.method !== "GET" && req.method !== "HEAD") return send(res, 405, "Méthode non autorisée", void 0, { Allow: "GET, HEAD" });
			const path = decodeURIComponent(new URL(req.url ?? "/", "http://localhost").pathname);
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
//#endregion
//#region src/cli/serve.ts
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
//#endregion
//#region src/cli/main.ts
var HELP = `Usage :
  vce check <dossier> [--format text|json] [--strict]
  vce serve <dossier> [--port <n>] [--open]
  vce --help | --version

<dossier> : dossier contenant les modèles (ex. config/).

check     valide tous les modèles ; code de sortie 0 sans erreur, 1 avec au moins une erreur
          (ou un avertissement avec --strict), 2 en cas d'usage incorrect.
serve     ouvre l'éditeur local sur http://127.0.0.1:<port>/ (5174 par défaut, ou le suivant
          libre) ; --open l'ouvre dans le navigateur.`;
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
	return usage(out, command ? `Commande inconnue : ${command}` : void 0);
}
function usage(out, message) {
	out.error(message ? `${message}\n\n${HELP}` : HELP);
	return 2;
}
//#endregion
//#region src/cli/index.ts
var result = await main(process.argv.slice(2));
if (typeof result === "number") process.exitCode = result;
//#endregion
export {};
