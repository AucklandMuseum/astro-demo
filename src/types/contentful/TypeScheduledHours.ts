import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful/dist/contentful.browser.min.js";

export interface TypeScheduledHoursFields {
    name?: EntryFieldTypes.Symbol;
    availableDays?: EntryFieldTypes.Array<EntryFieldTypes.Symbol<"RRule.FR" | "RRule.MO" | "RRule.SA" | "RRule.SU" | "RRule.TH" | "RRule.TU" | "RRule.WE">>;
    startHour: EntryFieldTypes.Integer;
    startMinutes?: EntryFieldTypes.Integer;
    endHour?: EntryFieldTypes.Integer;
    endMinutes?: EntryFieldTypes.Integer;
    duration?: EntryFieldTypes.Integer;
    active?: EntryFieldTypes.Boolean;
}

export type TypeScheduledHoursSkeleton = EntrySkeletonType<TypeScheduledHoursFields, "scheduledHours">;
export type TypeScheduledHours<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeScheduledHoursSkeleton, Modifiers, Locales>;
