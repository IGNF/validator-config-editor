import type { MaybeRefOrGetter, Ref } from 'vue';
import type { VMenu } from '../VMenu/index.js';
export interface SelectionMenuProps {
    menu: boolean;
    'onUpdate:menu': ((value: boolean) => void) | undefined;
    menuProps: VMenu['$props'] | undefined;
    multiple: boolean;
    openOnFocus: boolean;
}
export declare function useSelectionMenu(props: SelectionMenuProps, options: {
    vMenuRef: Ref<VMenu | undefined>;
    menuDisabled: MaybeRefOrGetter<boolean>;
    isFocused: Ref<boolean>;
}): {
    menu: import("vue").WritableComputedRef<boolean, boolean>;
    closeOnSelect: () => void;
};
