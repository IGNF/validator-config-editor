import type { MaybeRefOrGetter, Ref } from 'vue';
/** Close once focus has landed somewhere outside the field and its menu. */
export declare function closeWhenFocusLeaves(menu: Ref<boolean>, ...els: (Element | null | undefined)[]): void;
export declare function useOpenOnFocus(menu: Ref<boolean>, isFocused: Ref<boolean>, enabled: MaybeRefOrGetter<boolean>): void;
