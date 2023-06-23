import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypePageSkeleton } from "./TypePage";

export interface TypeMenuItemFields {
    title: EntryFieldTypes.Symbol;
    secondaryTitle?: EntryFieldTypes.Symbol;
    newWindow?: EntryFieldTypes.Boolean;
    externalLink: EntryFieldTypes.Boolean;
    page?: EntryFieldTypes.EntryLink<TypePageSkeleton>;
    url?: EntryFieldTypes.Symbol;
    image?: EntryFieldTypes.AssetLink;
}

export type TypeMenuItemSkeleton = EntrySkeletonType<TypeMenuItemFields, "menuItem">;
export type TypeMenuItem<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeMenuItemSkeleton, Modifiers, Locales>;
