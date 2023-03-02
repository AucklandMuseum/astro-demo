import * as Contentful from "contentful";
import { TypeEventItemFields } from "./TypeEventItem";

export interface TypeEventSeasonFields {
    name?: Contentful.EntryFields.Symbol;
    slug?: Contentful.EntryFields.Symbol;
    title?: Contentful.EntryFields.Symbol;
    startDate?: Contentful.EntryFields.Date;
    endDate?: Contentful.EntryFields.Date;
    relatedEventItems?: Contentful.Entry<TypeEventItemFields | TypeEventSeasonFields>[];
}

export type TypeEventSeason = Contentful.Entry<TypeEventSeasonFields>;
