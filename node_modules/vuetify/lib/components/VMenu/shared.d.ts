import type { InjectionKey } from 'vue';
interface MenuProvide {
    rootOpenedByHover: () => boolean;
    register(uid: string, close: () => void): void;
    unregister(uid: string): void;
    closeParents(e?: MouseEvent): void;
}
export declare const VMenuSymbol: InjectionKey<MenuProvide | null>;

