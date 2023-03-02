import * as Contentful from "contentful";
import { TypeCopyBlockFields } from "./TypeCopyBlock";
import { TypeImageMetadataFields } from "./TypeImageMetadata";
import { TypeTitleFields } from "./TypeTitle";
import { TypeWidgetImageWithCaptionFields } from "./TypeWidgetImageWithCaption";

export interface TypeImageWithTrainFields {
    name?: Contentful.EntryFields.Symbol;
    image: Contentful.Entry<TypeImageMetadataFields>;
    contentBlocks?: Contentful.Entry<TypeCopyBlockFields | TypeTitleFields | TypeWidgetImageWithCaptionFields>[];
}

export type TypeImageWithTrain = Contentful.Entry<TypeImageWithTrainFields>;
