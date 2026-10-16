import type { MaybeRefOrGetter } from 'vue';
import type { ListItem } from '../../composables/list-items.js';
export declare function useAutofill(items: MaybeRefOrGetter<readonly ListItem[]>, select: (item: ListItem) => void): {
    autofill: (text: string) => void;
    resetAutofill: () => void;
};
