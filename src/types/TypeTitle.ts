import * as Contentful from "contentful";

export interface TypeTitleFields {
    title: Contentful.EntryFields.Symbol;
    subtitle?: Contentful.EntryFields.Symbol;
    boldSubtitle?: Contentful.EntryFields.Symbol;
}

export type TypeTitle = Contentful.Entry<TypeTitleFields>;
