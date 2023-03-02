import * as Contentful from "contentful";

/**
 * Fields type definition for content type 'TypeImageMetadata'
 * @name TypeImageMetadataFields
 * @type {TypeImageMetadataFields}
 * @memberof TypeImageMetadata
 */
export interface TypeImageMetadataFields {
    /**
     * Field type definition for field 'imageMedia' (Image Media)
     * @name Image Media
     * @localized false
     */
    imageMedia: Contentful.Asset;
    /**
     * Field type definition for field 'imageTitle' (Image Title)
     * @name Image Title
     * @localized true
     */
    imageTitle?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'imageCaption' (Image Caption)
     * @name Image Caption
     * @localized false
     */
    imageCaption?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'imageCredit' (Image Credit)
     * @name Image Credit
     * @localized false
     */
    imageCredit?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'imageSource' (Image Source)
     * @name Image Source
     * @localized false
     */
    imageSource?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'imageCopyright' (Image Copyright)
     * @name Image Copyright
     * @localized false
     */
    imageCopyright?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'relatedLink' (Related Link)
     * @name Related Link
     * @localized false
     */
    relatedLink?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'imageExpiry' (Image Expiry)
     * @name Image Expiry
     * @localized false
     */
    imageExpiry?: Contentful.EntryFields.Date;
}

/**
 * Entry type definition for content type 'imageMetadata' (Image with Metadata)
 * @name TypeImageMetadata
 * @type {TypeImageMetadata}
 * @author Max Gilbert<mgilbert@aucklandmuseum.com>
 * @since 2023-02-13T00:55:51.339Z
 * @version 7
 * @link https://app.contentful.com/spaces/ocrj77v5idm0/environments/master/content_types/imageMetadata
 */
export type TypeImageMetadata = Contentful.Entry<TypeImageMetadataFields>;
