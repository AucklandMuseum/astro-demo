import * as Contentful from "contentful";

/**
 * Fields type definition for content type 'TypeScheduledHours'
 * @name TypeScheduledHoursFields
 * @type {TypeScheduledHoursFields}
 * @memberof TypeScheduledHours
 */
export interface TypeScheduledHoursFields {
    /**
     * Field type definition for field 'name' (Name)
     * @name Name
     * @localized false
     */
    name?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'availableDays' (Available Day(s))
     * @name Available Day(s)
     * @localized false
     */
    availableDays?: ("RRule.FR" | "RRule.MO" | "RRule.SA" | "RRule.SU" | "RRule.TH" | "RRule.TU" | "RRule.WE")[];
    /**
     * Field type definition for field 'startHour' (Start hour)
     * @name Start hour
     * @localized false
     */
    startHour: Contentful.EntryFields.Integer;
    /**
     * Field type definition for field 'startMinutes' (Start minutes)
     * @name Start minutes
     * @localized false
     */
    startMinutes?: Contentful.EntryFields.Integer;
    /**
     * Field type definition for field 'endHour' (End hour)
     * @name End hour
     * @localized false
     */
    endHour?: Contentful.EntryFields.Integer;
    /**
     * Field type definition for field 'endMinutes' (End minutes)
     * @name End minutes
     * @localized false
     */
    endMinutes?: Contentful.EntryFields.Integer;
    /**
     * Field type definition for field 'duration' (Duration)
     * @name Duration
     * @localized false
     */
    duration?: Contentful.EntryFields.Integer;
    /**
     * Field type definition for field 'active' (Active?)
     * @name Active?
     * @localized false
     */
    active?: Contentful.EntryFields.Boolean;
}

/**
 * Entry type definition for content type 'scheduledHours' (Scheduled Hours)
 * @name TypeScheduledHours
 * @type {TypeScheduledHours}
 * @author Max Gilbert<mgilbert@aucklandmuseum.com>
 * @since 2023-02-13T23:26:44.060Z
 * @version 37
 * @link https://app.contentful.com/spaces/ocrj77v5idm0/environments/master/content_types/scheduledHours
 */
export type TypeScheduledHours = Contentful.Entry<TypeScheduledHoursFields>;
