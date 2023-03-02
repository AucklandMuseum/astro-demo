import * as Contentful from "contentful";

export interface TypeImageMetadataFields {
    imageMedia: Contentful.Asset;
    imageTitle?: Contentful.EntryFields.Symbol;
    imageCaption?: Contentful.EntryFields.Symbol;
    imageCredit?: Contentful.EntryFields.Symbol;
    imageSource?: Contentful.EntryFields.Symbol;
    imageCopyright?: Contentful.EntryFields.Symbol;
    relatedLink?: Contentful.EntryFields.Symbol;
    imageExpiry?: Contentful.EntryFields.Date;
}

export type TypeImageMetadata = Contentful.Entry<TypeImageMetadataFields>;
