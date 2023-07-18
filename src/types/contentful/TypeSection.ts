import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful/dist/contentful.browser.min.js";
import type { TypeMenuItemSkeleton } from "./TypeMenuItem";
import type { TypePageSkeleton } from "./TypePage";

export interface TypeSectionFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    parentSiteSection?: EntryFieldTypes.EntryLink<TypeSectionSkeleton>;
    coreImage?: EntryFieldTypes.AssetLink;
    defaultPage?: EntryFieldTypes.EntryLink<TypePageSkeleton>;
    secondaryTitle?: EntryFieldTypes.Symbol;
    alternateTitle?: EntryFieldTypes.Symbol;
    logo?: EntryFieldTypes.AssetLink;
    menuList?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeMenuItemSkeleton>>;
    menuGallery?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeMenuItemSkeleton>>;
    metaTitle?: EntryFieldTypes.Symbol;
    metaDescription?: EntryFieldTypes.Text;
}

export type TypeSectionSkeleton = EntrySkeletonType<TypeSectionFields, "section">;
export type TypeSection<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeSectionSkeleton, Modifiers, Locales>;
