import * as Contentful from "contentful";
import { TypeMenuItemFields } from "./TypeMenuItem";
import { TypePageFields } from "./TypePage";

/**
 * Fields type definition for content type 'TypeSection'
 * @name TypeSectionFields
 * @type {TypeSectionFields}
 * @memberof TypeSection
 */
export interface TypeSectionFields {
    /**
     * Field type definition for field 'title' (Title)
     * @name Title
     * @localized true
     */
    title: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'slug' (Slug)
     * @name Slug
     * @localized false
     */
    slug: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'parentSiteSection' (Parent Site Section)
     * @name Parent Site Section
     * @localized false
     */
    parentSiteSection?: Contentful.Entry<TypeSectionFields>;
    /**
     * Field type definition for field 'coreImage' (Core Image)
     * @name Core Image
     * @localized false
     */
    coreImage?: Contentful.Asset;
    /**
     * Field type definition for field 'defaultPage' (Default Page)
     * @name Default Page
     * @localized false
     */
    defaultPage?: Contentful.Entry<TypePageFields>;
    /**
     * Field type definition for field 'secondaryTitle' (Secondary Title)
     * @name Secondary Title
     * @localized true
     */
    secondaryTitle?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'alternateTitle' (Alternate Title)
     * @name Alternate Title
     * @localized true
     */
    alternateTitle?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'logo' (Logo)
     * @name Logo
     * @localized true
     */
    logo?: Contentful.Asset;
    /**
     * Field type definition for field 'menuList' (Menu List)
     * @name Menu List
     * @localized true
     */
    menuList?: Contentful.Entry<TypeMenuItemFields>[];
    /**
     * Field type definition for field 'menuGallery' (Menu Gallery)
     * @name Menu Gallery
     * @localized true
     */
    menuGallery?: Contentful.Entry<TypeMenuItemFields>[];
    /**
     * Field type definition for field 'metaTitle' (Meta Title)
     * @name Meta Title
     * @localized false
     */
    metaTitle?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'metaDescription' (Meta Description)
     * @name Meta Description
     * @localized false
     */
    metaDescription?: Contentful.EntryFields.Text;
}

/**
 * Entry type definition for content type 'section' (Site Section)
 * @name TypeSection
 * @type {TypeSection}
 * @author Max Gilbert<mgilbert@aucklandmuseum.com>
 * @since 2023-02-02T00:17:53.847Z
 * @version 31
 * @link https://app.contentful.com/spaces/ocrj77v5idm0/environments/master/content_types/section
 */
export type TypeSection = Contentful.Entry<TypeSectionFields>;
