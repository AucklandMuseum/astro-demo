import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful/dist/contentful.browser.min.js";
import type { TypeBiographySkeleton } from "./TypeBiography";
import type { TypeContentItemsSkeleton } from "./TypeContentItems";
import type { TypeSectionSkeleton } from "./TypeSection";
import type { TypeTagSkeleton } from "./TypeTag";

export interface TypePageFields {
    parentSiteSection: EntryFieldTypes.EntryLink<TypeSectionSkeleton>;
    title: EntryFieldTypes.Symbol;
    slug?: EntryFieldTypes.Symbol;
    behaviour: EntryFieldTypes.Symbol<"Article" | "Blog" | "Cenotaph" | "Event" | "Exhibition" | "Homepage" | "Listing" | "Standard" | "Tickets" | "Topic" | "What's On">;
    publishDate?: EntryFieldTypes.Date;
    isSearchable?: EntryFieldTypes.Boolean;
    alternateTitle?: EntryFieldTypes.Symbol;
    displaySummary?: EntryFieldTypes.RichText;
    contentSections?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeContentItemsSkeleton>>;
    coreImage?: EntryFieldTypes.AssetLink;
    facebookImage?: EntryFieldTypes.AssetLink;
    headerImage?: EntryFieldTypes.AssetLink;
    alternateUrls?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    redirect?: EntryFieldTypes.Symbol;
    metaTitle?: EntryFieldTypes.Symbol;
    metaDescription?: EntryFieldTypes.Text;
    authors?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeBiographySkeleton>>;
    tags?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeTagSkeleton>>;
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, "page">;
export type TypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypePageSkeleton, Modifiers, Locales>;
