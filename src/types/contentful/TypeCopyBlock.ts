import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful/dist/contentful.browser.min.js";

export interface TypeCopyBlockFields {
    name?: EntryFieldTypes.Symbol;
    contentStyle?: EntryFieldTypes.Symbol<"Large" | "Small" | "Standard">;
    content?: EntryFieldTypes.RichText;
}

export type TypeCopyBlockSkeleton = EntrySkeletonType<TypeCopyBlockFields, "copyBlock">;
export type TypeCopyBlock<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeCopyBlockSkeleton, Modifiers, Locales>;
