import type { MaybeRefOrGetter, Ref } from 'vue';
import type { VList } from '../VList/index.js';
import type { VTextField } from '../VTextField/index.js';
import type { VVirtualScroll } from '../VVirtualScroll/index.js';
import type { ListItem } from '../../composables/list-items.js';
import type { ScrollToPosition } from '../../composables/virtual.js';
export declare function useScrolling(listRef: Ref<VList | undefined>, textFieldRef: Ref<VTextField | undefined>, virtualScrollRef: Ref<VVirtualScroll | undefined>, displayItems: MaybeRefOrGetter<readonly ListItem[]>, options?: {
    selectedIndex?: () => number;
    headerEl?: () => HTMLElement | undefined;
    menuContentEl?: () => HTMLElement | undefined;
    noAutoScroll?: MaybeRefOrGetter<boolean>;
}): {
    listEvents: Record<string, Function>;
    focusItem: (index: number, scroll?: boolean, position?: ScrollToPosition) => Promise<boolean>;
    focusFirstItem: () => Promise<void>;
    focusLastItem: () => Promise<void>;
    focusFromActivator: (step: 1 | -1, landOnSelected?: boolean) => Promise<void | boolean>;
    onActivatorKeydown: (e: KeyboardEvent, menu: Ref<boolean>) => boolean;
    setPendingFocus: (step: 1 | -1 | null) => void;
    flushPendingFocus: () => boolean;
};
