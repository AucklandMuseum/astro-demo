import * as Contentful from "contentful";
import { TypeScheduledHoursFields } from "./TypeScheduledHours";

/**
 * Fields type definition for content type 'TypeEventItem'
 * @name TypeEventItemFields
 * @type {TypeEventItemFields}
 * @memberof TypeEventItem
 */
export interface TypeEventItemFields {
    /**
     * Field type definition for field 'name' (Name)
     * @name Name
     * @localized false
     */
    name?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'startDate' (Start Date)
     * @name Start Date
     * @localized false
     */
    startDate: Contentful.EntryFields.Date;
    /**
     * Field type definition for field 'endDate' (End Date)
     * @name End Date
     * @localized false
     */
    endDate: Contentful.EntryFields.Date;
    /**
     * Field type definition for field 'repeatRule' (Repeat Rule)
     * @name Repeat Rule
     * @localized false
     */
    repeatRule?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'scheduledHours' (Scheduled Hours)
     * @name Scheduled Hours
     * @localized false
     */
    scheduledHours?: Contentful.Entry<TypeScheduledHoursFields>[];
}

/**
 * Entry type definition for content type 'eventItem' (Event Item)
 * @name TypeEventItem
 * @type {TypeEventItem}
 * @author Max Gilbert<mgilbert@aucklandmuseum.com>
 * @since 2023-02-15T03:10:27.828Z
 * @version 9
 * @link https://app.contentful.com/spaces/ocrj77v5idm0/environments/master/content_types/eventItem
 */
export type TypeEventItem = Contentful.Entry<TypeEventItemFields>;
