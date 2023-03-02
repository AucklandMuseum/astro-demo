import * as CFRichTextTypes from "@contentful/rich-text-types";
import * as Contentful from "contentful";
import { TypeBiographyFields } from "./TypeBiography";
import { TypeContentSectionFields } from "./TypeContentSection";
import { TypeSectionFields } from "./TypeSection";

export interface TypePageFields {
    parentSiteSection?: Contentful.Entry<TypeSectionFields>;
    title: Contentful.EntryFields.Symbol;
    slug?: Contentful.EntryFields.Symbol;
    behaviour: "Article" | "Blog" | "Cenotaph" | "Event" | "Exhibition" | "Homepage" | "Listing" | "Standard" | "Tickets" | "Topic" | "What's On";
    publishDate?: Contentful.EntryFields.Date;
    isSearchable?: Contentful.EntryFields.Boolean;
    alternateTitle?: Contentful.EntryFields.Symbol;
    displaySummary?: CFRichTextTypes.Block | CFRichTextTypes.Inline;
    contentSections?: Contentful.Entry<TypeContentSectionFields>[];
    coreImage?: Contentful.Asset;
    facebookImage?: Contentful.Asset;
    headerImage?: Contentful.Asset;
    alternateUrls?: Contentful.EntryFields.Symbol[];
    redirect?: Contentful.EntryFields.Symbol;
    metaDescription?: Contentful.EntryFields.Text;
    metaTitle?: Contentful.EntryFields.Symbol;
    authors?: Contentful.Entry<TypeBiographyFields>[];
    cloudimage?: Contentful.EntryFields.Object;
}

export type TypePage = Contentful.Entry<TypePageFields>;
