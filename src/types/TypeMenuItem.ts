import * as Contentful from "contentful";
import { TypePageFields } from "./TypePage";

/**
 * Fields type definition for content type 'TypeMenuItem'
 * @name TypeMenuItemFields
 * @type {TypeMenuItemFields}
 * @memberof TypeMenuItem
 */
export interface TypeMenuItemFields {
    /**
     * Field type definition for field 'title' (Title)
     * @name Title
     * @localized true
     */
    title: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'secondaryTitle' (Secondary Title)
     * @name Secondary Title
     * @localized true
     */
    secondaryTitle?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'newWindow' (New window?)
     * @name New window?
     * @localized false
     */
    newWindow?: Contentful.EntryFields.Boolean;
    /**
     * Field type definition for field 'externalLink' (External Link?)
     * @name External Link?
     * @localized false
     */
    externalLink: Contentful.EntryFields.Boolean;
    /**
     * Field type definition for field 'page' (Page)
     * @name Page
     * @localized false
     */
    page?: Contentful.Entry<TypePageFields>;
    /**
     * Field type definition for field 'url' (URL)
     * @name URL
     * @localized false
     */
    url?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'image' (Image)
     * @name Image
     * @localized false
     */
    image?: Contentful.Asset;
}

/**
 * Entry type definition for content type 'menuItem' (Menu Item)
 * @name TypeMenuItem
 * @type {TypeMenuItem}
 * @author Max Gilbert<mgilbert@aucklandmuseum.com>
 * @since 2023-02-02T02:43:23.264Z
 * @version 13
 * @link https://app.contentful.com/spaces/ocrj77v5idm0/environments/master/content_types/menuItem
 */
export type TypeMenuItem = Contentful.Entry<TypeMenuItemFields>;
