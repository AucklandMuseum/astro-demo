import * as Contentful from "contentful";
import { TypeCopyBlockFields } from "./TypeCopyBlock";
import { TypeImageMetadataFields } from "./TypeImageMetadata";
import { TypeTitleFields } from "./TypeTitle";

export interface TypeMarketingPanelFields {
    name?: Contentful.EntryFields.Symbol;
    size: "Large" | "Medium" | "Section Listing" | "Small";
    style: "Dark" | "Light";
    linkUrl?: Contentful.EntryFields.Symbol;
    linkTarget: "_blank" | "_self";
    cta?: Contentful.EntryFields.Symbol;
    contentAlignment: "Left" | "Right";
    imageMetadata?: Contentful.Entry<TypeImageMetadataFields>;
    content?: Contentful.Entry<TypeCopyBlockFields | TypeTitleFields>[];
}

export type TypeMarketingPanel = Contentful.Entry<TypeMarketingPanelFields>;
