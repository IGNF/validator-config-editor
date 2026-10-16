import { PaletteDefinition } from "../../index.mjs";
//#region src/palettes/ant/generate/index.d.ts
interface AntGenerateOptions {
  background?: string;
}
declare function ant(seed: string, options?: AntGenerateOptions): PaletteDefinition;
//#endregion
export { AntGenerateOptions, ant };