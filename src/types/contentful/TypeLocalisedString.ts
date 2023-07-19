import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeLocalisedStringFields {
    name: EntryFieldTypes.Symbol;
    translatedText: EntryFieldTypes.Symbol;
}

export type TypeLocalisedStringSkeleton = EntrySkeletonType<TypeLocalisedStringFields, "localisedString">;
export type TypeLocalisedString<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeLocalisedStringSkeleton, Modifiers, Locales>;
