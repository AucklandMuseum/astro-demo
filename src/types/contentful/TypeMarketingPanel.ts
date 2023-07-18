import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful/dist/contentful.browser.min.js";
import type { TypeCopyBlockSkeleton } from "./TypeCopyBlock";
import type { TypeImageMetadataSkeleton } from "./TypeImageMetadata";
import type { TypeTitleSkeleton } from "./TypeTitle";

export interface TypeMarketingPanelFields {
    name?: EntryFieldTypes.Symbol;
    size: EntryFieldTypes.Symbol<"Large" | "Medium" | "Section Listing" | "Small">;
    style: EntryFieldTypes.Symbol<"Dark" | "Light">;
    linkUrl?: EntryFieldTypes.Symbol;
    linkTarget: EntryFieldTypes.Symbol<"_blank" | "_self">;
    cta?: EntryFieldTypes.Symbol;
    contentAlignment: EntryFieldTypes.Symbol<"Left" | "Right">;
    imageMetadata?: EntryFieldTypes.EntryLink<TypeImageMetadataSkeleton>;
    content?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCopyBlockSkeleton | TypeTitleSkeleton>>;
}

export type TypeMarketingPanelSkeleton = EntrySkeletonType<TypeMarketingPanelFields, "marketingPanel">;
export type TypeMarketingPanel<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeMarketingPanelSkeleton, Modifiers, Locales>;
