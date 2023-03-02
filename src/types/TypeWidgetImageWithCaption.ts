import * as Contentful from "contentful";
import { TypeImageMetadataFields } from "./TypeImageMetadata";

export interface TypeWidgetImageWithCaptionFields {
    name?: Contentful.EntryFields.Symbol;
    image: Contentful.Entry<TypeImageMetadataFields>;
    imageWidth?: "100" | "25" | "33" | "50";
    imageAlignment?: "Center" | "Left" | "Right";
}

export type TypeWidgetImageWithCaption = Contentful.Entry<TypeWidgetImageWithCaptionFields>;
