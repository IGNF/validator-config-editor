import type { MaskEditResult, MaskResult, Segment } from './types.js';
export declare function maskSegmentsFrom(segments: readonly Segment[], text: string, startIndex?: number, caret?: number): MaskResult;
export declare function toMaskSource(input: string, noise: RegExp, caret?: number): {
    text: string;
    caret: number;
};
export declare function maskInput(segments: readonly Segment[], input: string, noise: RegExp, caret?: number, decorate?: (masked: MaskResult, raw: string) => string): MaskEditResult;
