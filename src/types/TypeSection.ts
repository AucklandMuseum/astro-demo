import * as Contentful from "contentful";
import { TypeMenuItemFields } from "./TypeMenuItem";
import { TypePageFields } from "./TypePage";

export interface TypeSectionFields {
    title: Contentful.EntryFields.Symbol;
    slug: Contentful.EntryFields.Symbol;
    parentSiteSection?: Contentful.Entry<TypeSectionFields>;
    coreImage?: Contentful.Asset;
    defaultPage?: Contentful.Entry<TypePageFields>;
    secondaryTitle?: Contentful.EntryFields.Symbol;
    alternateTitle?: Contentful.EntryFields.Symbol;
    logo?: Contentful.Asset;
    menuList?: Contentful.Entry<TypeMenuItemFields>[];
    menuGallery?: Contentful.Entry<TypeMenuItemFields>[];
    metaTitle?: Contentful.EntryFields.Symbol;
    metaDescription?: Contentful.EntryFields.Text;
}

export type TypeSection = Contentful.Entry<TypeSectionFields>;
