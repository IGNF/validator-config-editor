import { a as ID } from "../index-XNZrgWCq.mjs";
import { b as ThemeRecord } from "../index-Ct0Pmzpx.mjs";
import { r as TokenCollection } from "../index-Dlr9_rf1.mjs";
//#region src/palettes/index.d.ts
interface PaletteDefinition {
  palette: TokenCollection;
  themes: Record<ID, ThemeRecord>;
}
type PaletteGenerator<O = {}> = (seed: string, options?: O) => PaletteDefinition;
//#endregion
export { PaletteDefinition, PaletteGenerator };