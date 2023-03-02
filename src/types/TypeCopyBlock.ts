import * as CFRichTextTypes from "@contentful/rich-text-types";
import * as Contentful from "contentful";

export interface TypeCopyBlockFields {
    name?: Contentful.EntryFields.Symbol;
    content?: CFRichTextTypes.Block | CFRichTextTypes.Inline;
}

export type TypeCopyBlock = Contentful.Entry<TypeCopyBlockFields>;
