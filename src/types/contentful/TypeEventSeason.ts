import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful/dist/contentful.browser.min.js";
import type { TypeEventItemSkeleton } from "./TypeEventItem";

export interface TypeEventSeasonFields {
    name?: EntryFieldTypes.Symbol;
    slug?: EntryFieldTypes.Symbol;
    title?: EntryFieldTypes.Symbol;
    startDate?: EntryFieldTypes.Date;
    endDate?: EntryFieldTypes.Date;
    relatedEventItems?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeEventItemSkeleton | TypeEventSeasonSkeleton>>;
}

export type TypeEventSeasonSkeleton = EntrySkeletonType<TypeEventSeasonFields, "eventSeason">;
export type TypeEventSeason<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeEventSeasonSkeleton, Modifiers, Locales>;
