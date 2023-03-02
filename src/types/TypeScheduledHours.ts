import * as Contentful from "contentful";

export interface TypeScheduledHoursFields {
    name?: Contentful.EntryFields.Symbol;
    availableDays?: ("RRule.FR" | "RRule.MO" | "RRule.SA" | "RRule.SU" | "RRule.TH" | "RRule.TU" | "RRule.WE")[];
    startHour: Contentful.EntryFields.Integer;
    startMinutes?: Contentful.EntryFields.Integer;
    endHour?: Contentful.EntryFields.Integer;
    endMinutes?: Contentful.EntryFields.Integer;
    duration?: Contentful.EntryFields.Integer;
    active?: Contentful.EntryFields.Boolean;
}

export type TypeScheduledHours = Contentful.Entry<TypeScheduledHoursFields>;
