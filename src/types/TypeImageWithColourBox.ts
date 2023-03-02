import * as Contentful from "contentful";
import { TypeCopyBlockFields } from "./TypeCopyBlock";
import { TypeImageMetadataFields } from "./TypeImageMetadata";
import { TypeTitleFields } from "./TypeTitle";
import { TypeWidgetImageWithCaptionFields } from "./TypeWidgetImageWithCaption";

export interface TypeImageWithColourBoxFields {
    name?: Contentful.EntryFields.Symbol;
    image: Contentful.Entry<TypeImageMetadataFields>;
    contentAlignment?: "Center" | "Left" | "Right";
    contentBackgroundColour?: Contentful.EntryFields.Object;
    contentBlocks?: Contentful.Entry<TypeCopyBlockFields | TypeTitleFields | TypeWidgetImageWithCaptionFields>[];
}

export type TypeImageWithColourBox = Contentful.Entry<TypeImageWithColourBoxFields>;
