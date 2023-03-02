import * as Contentful from "contentful";
import { TypeEventItemFields } from "./TypeEventItem";

/**
 * Fields type definition for content type 'TypeEventSeason'
 * @name TypeEventSeasonFields
 * @type {TypeEventSeasonFields}
 * @memberof TypeEventSeason
 */
export interface TypeEventSeasonFields {
    /**
     * Field type definition for field 'name' (Name)
     * @name Name
     * @localized false
     */
    name?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'slug' (Slug)
     * @name Slug
     * @localized false
     */
    slug?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'title' (Title)
     * @name Title
     * @localized false
     */
    title?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'startDate' (Start Date)
     * @name Start Date
     * @localized false
     */
    startDate?: Contentful.EntryFields.Date;
    /**
     * Field type definition for field 'endDate' (End Date)
     * @name End Date
     * @localized false
     */
    endDate?: Contentful.EntryFields.Date;
    /**
     * Field type definition for field 'relatedEventItems' (Related Event Items)
     * @name Related Event Items
     * @localized false
     */
    relatedEventItems?: Contentful.Entry<TypeEventItemFields | TypeEventSeasonFields>[];
}

/**
 * Entry type definition for content type 'eventSeason' (Event Season)
 * @name TypeEventSeason
 * @type {TypeEventSeason}
 * @author Max Gilbert<mgilbert@aucklandmuseum.com>
 * @since 2023-02-15T03:08:28.295Z
 * @version 15
 * @link https://app.contentful.com/spaces/ocrj77v5idm0/environments/master/content_types/eventSeason
 */
export type TypeEventSeason = Contentful.Entry<TypeEventSeasonFields>;
