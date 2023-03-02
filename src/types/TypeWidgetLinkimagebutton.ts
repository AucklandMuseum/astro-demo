import * as Contentful from "contentful";
import { TypeImageMetadataFields } from "./TypeImageMetadata";

export interface TypeWidgetLinkimagebuttonFields {
    name?: Contentful.EntryFields.Symbol;
    linkText?: Contentful.EntryFields.Symbol;
    linkSubtext?: Contentful.EntryFields.Symbol;
    linkUrl: Contentful.EntryFields.Symbol;
    linkTarget?: "_blank" | "_self";
    linkType?: "Button" | "Link";
    image?: Contentful.Entry<TypeImageMetadataFields>;
}

export type TypeWidgetLinkimagebutton = Contentful.Entry<TypeWidgetLinkimagebuttonFields>;
