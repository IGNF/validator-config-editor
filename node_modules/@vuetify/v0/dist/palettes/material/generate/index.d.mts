import { PaletteDefinition } from "../../index.mjs";
//#region src/palettes/material/generate/index.d.ts
interface MaterialGenerateOptions {
  variant?: 'tonalSpot' | 'vibrant' | 'expressive' | 'fidelity' | 'monochrome' | 'neutral';
  contrast?: number;
}
declare function material(seed: string, options?: MaterialGenerateOptions): PaletteDefinition;
//#endregion
export { MaterialGenerateOptions, material };