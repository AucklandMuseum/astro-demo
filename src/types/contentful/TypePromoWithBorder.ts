import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeCopyBlockSkeleton } from "./TypeCopyBlock";
import type { TypeImageMetadataSkeleton } from "./TypeImageMetadata";
import type { TypeTitleSkeleton } from "./TypeTitle";
import type { TypeWidgetLinkimagebuttonSkeleton } from "./TypeWidgetLinkimagebutton";

export interface TypePromoWithBorderFields {
    name?: EntryFieldTypes.Symbol;
    content?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCopyBlockSkeleton | TypeTitleSkeleton | TypeWidgetLinkimagebuttonSkeleton>>;
    image?: EntryFieldTypes.EntryLink<TypeImageMetadataSkeleton>;
    imagePosition?: EntryFieldTypes.Symbol<"Bottom" | "Top">;
    borderColor?: EntryFieldTypes.Object;
    applyColorToTitle?: EntryFieldTypes.Boolean;
}

export type TypePromoWithBorderSkeleton = EntrySkeletonType<TypePromoWithBorderFields, "promoWithBorder">;
export type TypePromoWithBorder<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypePromoWithBorderSkeleton, Modifiers, Locales>;
