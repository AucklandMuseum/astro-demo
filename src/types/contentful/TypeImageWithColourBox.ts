import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeCopyBlockSkeleton } from "./TypeCopyBlock";
import type { TypeImageMetadataSkeleton } from "./TypeImageMetadata";
import type { TypeTitleSkeleton } from "./TypeTitle";
import type { TypeWidgetImageWithCaptionSkeleton } from "./TypeWidgetImageWithCaption";

export interface TypeImageWithColourBoxFields {
    name?: EntryFieldTypes.Symbol;
    image: EntryFieldTypes.EntryLink<TypeImageMetadataSkeleton>;
    contentAlignment?: EntryFieldTypes.Symbol<"Center" | "Left" | "Right">;
    contentBackgroundColour?: EntryFieldTypes.Object;
    contentBlocks?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCopyBlockSkeleton | TypeTitleSkeleton | TypeWidgetImageWithCaptionSkeleton>>;
}

export type TypeImageWithColourBoxSkeleton = EntrySkeletonType<TypeImageWithColourBoxFields, "imageWithColourBox">;
export type TypeImageWithColourBox<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeImageWithColourBoxSkeleton, Modifiers, Locales>;
