import * as Contentful from "contentful";
import { TypeScheduledHoursFields } from "./TypeScheduledHours";

export interface TypeEventItemFields {
    name?: Contentful.EntryFields.Symbol;
    startDate: Contentful.EntryFields.Date;
    endDate: Contentful.EntryFields.Date;
    repeatRule?: Contentful.EntryFields.Symbol;
    scheduledHours?: Contentful.Entry<TypeScheduledHoursFields>[];
}

export type TypeEventItem = Contentful.Entry<TypeEventItemFields>;
