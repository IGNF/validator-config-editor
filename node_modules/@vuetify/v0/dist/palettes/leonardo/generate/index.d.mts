import { PaletteDefinition } from "../../index.mjs";
//#region src/palettes/leonardo/generate/index.d.ts
interface LeonardoGenerateOptions {
  ratios?: number[];
  colorSpace?: 'CAM02' | 'CAM02p' | 'HSL' | 'HSLuv' | 'HSV' | 'LAB' | 'LCH' | 'OKLAB' | 'OKLCH' | 'RGB';
}
declare function leonardo(seed: string, options?: LeonardoGenerateOptions): PaletteDefinition;
//#endregion
export { LeonardoGenerateOptions, leonardo };