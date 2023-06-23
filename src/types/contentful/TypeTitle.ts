import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeTitleFields {
    title: EntryFieldTypes.Symbol;
    subtitle?: EntryFieldTypes.Symbol;
    boldSubtitle?: EntryFieldTypes.Symbol;
}

export type TypeTitleSkeleton = EntrySkeletonType<TypeTitleFields, "title">;
export type TypeTitle<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeTitleSkeleton, Modifiers, Locales>;
