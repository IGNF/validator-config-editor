import type { Ref } from 'vue';
export interface DateFormatProps {
    inputFormat?: string;
    multiple?: boolean | 'range' | number | (string & {});
    placeholder?: string;
}
export declare const makeDateFormatProps: <Defaults extends {
    inputFormat?: unknown;
} = {}>(defaults?: Defaults | undefined) => {
    inputFormat: unknown extends Defaults["inputFormat"] ? {
        type: StringConstructor;
        validator: (v: string) => boolean;
    } : Omit<{
        type: StringConstructor;
        validator: (v: string) => boolean;
    }, "default" | "type"> & {
        type: import("vue").PropType<unknown extends Defaults["inputFormat"] ? string : string | Defaults["inputFormat"]>;
        default: unknown extends Defaults["inputFormat"] ? string : string | Defaults["inputFormat"];
    };
};
export declare function useDateFormat(props: DateFormatProps, locale: Ref<string>, isRtl: Ref<boolean>): {
    isValid: (text: string) => boolean;
    getHint: (text: string) => string;
    joinDates: (dates: string[]) => string;
    maskDate: (input: string, caret?: number, inPlace?: boolean) => {
        value: string;
        caret: number;
        width: number;
        gaps: boolean;
        hint: string;
        complete: boolean;
    };
    parseDate: (dateString: string) => unknown;
    formatDate: (value: unknown) => string;
    separator: Readonly<Ref<string, string>>;
    parserFormat: Readonly<Ref<string, string>>;
};
