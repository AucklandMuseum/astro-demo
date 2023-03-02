import * as Contentful from "contentful";
import { TypePageFields } from "./TypePage";

export interface TypeMenuItemFields {
    title: Contentful.EntryFields.Symbol;
    secondaryTitle?: Contentful.EntryFields.Symbol;
    newWindow?: Contentful.EntryFields.Boolean;
    externalLink: Contentful.EntryFields.Boolean;
    page?: Contentful.Entry<TypePageFields>;
    url?: Contentful.EntryFields.Symbol;
    image?: Contentful.Asset;
}

export type TypeMenuItem = Contentful.Entry<TypeMenuItemFields>;
