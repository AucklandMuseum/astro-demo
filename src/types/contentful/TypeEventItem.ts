import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeScheduledHoursSkeleton } from "./TypeScheduledHours";

export interface TypeEventItemFields {
    name?: EntryFieldTypes.Symbol;
    startDate: EntryFieldTypes.Date;
    endDate: EntryFieldTypes.Date;
    repeatRule?: EntryFieldTypes.Symbol;
    scheduledHours?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeScheduledHoursSkeleton>>;
}

export type TypeEventItemSkeleton = EntrySkeletonType<TypeEventItemFields, "eventItem">;
export type TypeEventItem<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeEventItemSkeleton, Modifiers, Locales>;
