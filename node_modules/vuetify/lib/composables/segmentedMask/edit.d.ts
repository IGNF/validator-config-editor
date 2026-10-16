import type { MaybeRefOrGetter } from 'vue';
import type { MaskEdit } from './types.js';
export declare function overtype(text: string, start: number, typed: string, rtl?: boolean, moved?: boolean): {
    value: string;
    caret: number;
    wrote: number;
};
export declare function createSegmentedEdit(mask: MaskEdit, separator: MaybeRefOrGetter<string>, isRtl?: MaybeRefOrGetter<boolean>): {
    onBeforeinput: (e: InputEvent) => void;
    onInput: (e: InputEvent) => void;
    onKeydown: (e: KeyboardEvent) => void;
    text: import("vue").ShallowRef<string, string>;
};
