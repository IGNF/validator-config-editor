import type { InternalListItem } from '../VList/VList.js';
import type { SelectStrategyProp } from '../../composables/nested/nested.js';
interface TreeviewKeyboardProps {
    returnObject: boolean;
    activatable: boolean;
    selectable: boolean;
    selectStrategy: SelectStrategyProp | undefined;
    items: readonly InternalListItem[] | undefined;
}
export declare function useTreeviewKeyboard(props: TreeviewKeyboardProps, checkChildren: (item: InternalListItem) => void): {
    onKeydown: (e: KeyboardEvent, item: InternalListItem) => void;
};

