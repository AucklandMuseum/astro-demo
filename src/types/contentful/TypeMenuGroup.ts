import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful/dist/contentful.browser.min.js";
import type { TypeMenuItemSkeleton } from "./TypeMenuItem";

export interface TypeMenuGroupFields {
    name: EntryFieldTypes.Symbol;
    title?: EntryFieldTypes.Symbol;
    secondaryTitle?: EntryFieldTypes.Symbol;
    menuGroups?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeMenuGroupSkeleton>>;
    menuItems?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeMenuItemSkeleton>>;
}

export type TypeMenuGroupSkeleton = EntrySkeletonType<TypeMenuGroupFields, "menuGroup">;
export type TypeMenuGroup<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeMenuGroupSkeleton, Modifiers, Locales>;
