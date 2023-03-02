import * as CFRichTextTypes from "@contentful/rich-text-types";
import * as Contentful from "contentful";

/**
 * Fields type definition for content type 'TypeBiography'
 * @name TypeBiographyFields
 * @type {TypeBiographyFields}
 * @memberof TypeBiography
 */
export interface TypeBiographyFields {
    /**
     * Field type definition for field 'name' (Name)
     * @name Name
     * @localized false
     */
    name: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'firstName' (First Name)
     * @name First Name
     * @localized false
     */
    firstName: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'lastName' (Last Name)
     * @name Last Name
     * @localized false
     */
    lastName?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'biography' (Biography)
     * @name Biography
     * @localized true
     */
    biography?: CFRichTextTypes.Block | CFRichTextTypes.Inline;
    /**
     * Field type definition for field 'image' (Image)
     * @name Image
     * @localized false
     */
    image: Contentful.Asset;
}

/**
 * Entry type definition for content type 'biography' (Biography)
 * @name TypeBiography
 * @type {TypeBiography}
 * @author Max Gilbert<mgilbert@aucklandmuseum.com>
 * @since 2023-02-12T21:31:01.938Z
 * @version 3
 * @link https://app.contentful.com/spaces/ocrj77v5idm0/environments/master/content_types/biography
 */
export type TypeBiography = Contentful.Entry<TypeBiographyFields>;
