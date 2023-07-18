import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful/dist/contentful.browser.min.js";
import type { TypeImageMetadataSkeleton } from "./TypeImageMetadata";

export interface TypeWidgetImageWithCaptionFields {
    name?: EntryFieldTypes.Symbol;
    image: EntryFieldTypes.EntryLink<TypeImageMetadataSkeleton>;
    imageWidth?: EntryFieldTypes.Symbol<"100" | "25" | "33" | "50">;
    imageAlignment?: EntryFieldTypes.Symbol<"Center" | "Left" | "Right">;
}

export type TypeWidgetImageWithCaptionSkeleton = EntrySkeletonType<TypeWidgetImageWithCaptionFields, "widgetImageWithCaption">;
export type TypeWidgetImageWithCaption<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeWidgetImageWithCaptionSkeleton, Modifiers, Locales>;
