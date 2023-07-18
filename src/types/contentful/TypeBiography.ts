import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful/dist/contentful.browser.min.js";

export interface TypeBiographyFields {
    name: EntryFieldTypes.Symbol;
    firstName: EntryFieldTypes.Symbol;
    lastName?: EntryFieldTypes.Symbol;
    biography?: EntryFieldTypes.RichText;
    image: EntryFieldTypes.AssetLink;
}

export type TypeBiographySkeleton = EntrySkeletonType<TypeBiographyFields, "biography">;
export type TypeBiography<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeBiographySkeleton, Modifiers, Locales>;
