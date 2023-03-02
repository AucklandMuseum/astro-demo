import * as CFRichTextTypes from "@contentful/rich-text-types";
import * as Contentful from "contentful";

export interface TypeBiographyFields {
    name: Contentful.EntryFields.Symbol;
    firstName: Contentful.EntryFields.Symbol;
    lastName?: Contentful.EntryFields.Symbol;
    biography?: CFRichTextTypes.Block | CFRichTextTypes.Inline;
    image: Contentful.Asset;
}

export type TypeBiography = Contentful.Entry<TypeBiographyFields>;
