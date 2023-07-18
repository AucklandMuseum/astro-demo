import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful/dist/contentful.browser.min.js";

export interface TypeImageMetadataFields {
    imageMedia: EntryFieldTypes.AssetLink;
    imageTitle?: EntryFieldTypes.Symbol;
    imageCaption?: EntryFieldTypes.Symbol;
    imageCredit?: EntryFieldTypes.Symbol;
    imageSource?: EntryFieldTypes.Symbol;
    imageCopyright?: EntryFieldTypes.Symbol;
    relatedLink?: EntryFieldTypes.Symbol;
    imageExpiry?: EntryFieldTypes.Date;
}

export type TypeImageMetadataSkeleton = EntrySkeletonType<TypeImageMetadataFields, "imageMetadata">;
export type TypeImageMetadata<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeImageMetadataSkeleton, Modifiers, Locales>;
