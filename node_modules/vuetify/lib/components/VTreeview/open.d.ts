import type { MaybeRefOrGetter, Ref } from 'vue';
import type { ListItem } from '../../composables/list-items.js';
import type { EventProp } from '../../util/index.js';
type GetPath = (id: unknown) => unknown[];
interface OpenProps {
    opened: unknown[];
    'onUpdate:opened': EventProp | undefined;
    openAll: boolean;
    returnObject: boolean;
    search: string | undefined;
}
export declare function useOpened(props: OpenProps, items: Ref<ListItem[]>, filteredItems: Ref<ListItem[]>, getPath: MaybeRefOrGetter<GetPath | undefined>): Ref<readonly unknown[], readonly unknown[]> & {
    readonly externalValue: unknown[];
};

