import * as Contentful from "contentful";
import { TypeMenuItemFields } from "./TypeMenuItem";

/**
 * Fields type definition for content type 'TypeMenuGroup'
 * @name TypeMenuGroupFields
 * @type {TypeMenuGroupFields}
 * @memberof TypeMenuGroup
 */
export interface TypeMenuGroupFields {
    /**
     * Field type definition for field 'name' (Name)
     * @name Name
     * @localized false
     */
    name: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'title' (Title)
     * @name Title
     * @localized true
     */
    title?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'secondaryTitle' (Secondary Title)
     * @name Secondary Title
     * @localized true
     */
    secondaryTitle?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'menuGroups' (Menu Groups)
     * @name Menu Groups
     * @localized true
     */
    menuGroups?: Contentful.Entry<TypeMenuGroupFields>[];
    /**
     * Field type definition for field 'menuItems' (Menu Items)
     * @name Menu Items
     * @localized true
     */
    menuItems?: Contentful.Entry<TypeMenuItemFields>[];
}

/**
 * Entry type definition for content type 'menuGroup' (Menu Group)
 * @name TypeMenuGroup
 * @type {TypeMenuGroup}
 * @author Max Gilbert<mgilbert@aucklandmuseum.com>
 * @since 2023-02-02T03:17:53.987Z
 * @version 13
 * @link https://app.contentful.com/spaces/ocrj77v5idm0/environments/master/content_types/menuGroup
 */
export type TypeMenuGroup = Contentful.Entry<TypeMenuGroupFields>;
