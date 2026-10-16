export type { MaskEdit, MaskEditResult, MaskResult, Segment, SegmentParts, SeparatorSegment, ValueSegment, } from './types.js';
export { maskInput, maskSegmentsFrom, toMaskSource, } from './segmentedMask.js';
export { remainingHint } from './formatHint.js';
export { createSegmentedEdit, overtype } from './edit.js';
export { dateSegments } from './presets.js';
