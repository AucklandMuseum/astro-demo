import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeCopyBlockSkeleton } from "./TypeCopyBlock";
import type { TypeImageMetadataSkeleton } from "./TypeImageMetadata";
import type { TypeTitleSkeleton } from "./TypeTitle";
import type { TypeWidgetImageWithCaptionSkeleton } from "./TypeWidgetImageWithCaption";

export interface TypeImageWithTrainFields {
    name?: EntryFieldTypes.Symbol;
    image: EntryFieldTypes.EntryLink<TypeImageMetadataSkeleton>;
    contentBlocks?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCopyBlockSkeleton | TypeTitleSkeleton | TypeWidgetImageWithCaptionSkeleton>>;
}

export type TypeImageWithTrainSkeleton = EntrySkeletonType<TypeImageWithTrainFields, "imageWithTrain">;
export type TypeImageWithTrain<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeImageWithTrainSkeleton, Modifiers, Locales>;
