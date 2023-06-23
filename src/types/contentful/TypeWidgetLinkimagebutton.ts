import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeImageMetadataSkeleton } from "./TypeImageMetadata";

export interface TypeWidgetLinkimagebuttonFields {
    name?: EntryFieldTypes.Symbol;
    linkText?: EntryFieldTypes.Symbol;
    linkSubtext?: EntryFieldTypes.Symbol;
    linkUrl: EntryFieldTypes.Symbol;
    linkTarget?: EntryFieldTypes.Symbol<"_blank" | "_self">;
    linkType?: EntryFieldTypes.Symbol<"Button" | "Link">;
    image?: EntryFieldTypes.EntryLink<TypeImageMetadataSkeleton>;
}

export type TypeWidgetLinkimagebuttonSkeleton = EntrySkeletonType<TypeWidgetLinkimagebuttonFields, "widgetLinkimagebutton">;
export type TypeWidgetLinkimagebutton<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeWidgetLinkimagebuttonSkeleton, Modifiers, Locales>;
