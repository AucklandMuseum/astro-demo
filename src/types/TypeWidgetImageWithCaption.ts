import * as Contentful from "contentful";
import { TypeImageMetadataFields } from "./TypeImageMetadata";

/**
 * Fields type definition for content type 'TypeWidgetImageWithCaption'
 * @name TypeWidgetImageWithCaptionFields
 * @type {TypeWidgetImageWithCaptionFields}
 * @memberof TypeWidgetImageWithCaption
 */
export interface TypeWidgetImageWithCaptionFields {
    /**
     * Field type definition for field 'name' (Name)
     * @name Name
     * @localized false
     */
    name?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'image' (Image)
     * @name Image
     * @localized true
     */
    image: Contentful.Entry<TypeImageMetadataFields>;
    /**
     * Field type definition for field 'imageWidth' (Image Width)
     * @name Image Width
     * @localized false
     */
    imageWidth?: "100" | "25" | "33" | "50";
    /**
     * Field type definition for field 'imageAlignment' (Image Alignment)
     * @name Image Alignment
     * @localized false
     */
    imageAlignment?: "Center" | "Left" | "Right";
}

/**
 * Entry type definition for content type 'widgetImageWithCaption' (Widget - Image with caption)
 * @name TypeWidgetImageWithCaption
 * @type {TypeWidgetImageWithCaption}
 * @author Max Gilbert<mgilbert@aucklandmuseum.com>
 * @since 2023-02-13T01:18:05.926Z
 * @version 3
 * @link https://app.contentful.com/spaces/ocrj77v5idm0/environments/master/content_types/widgetImageWithCaption
 */
export type TypeWidgetImageWithCaption = Contentful.Entry<TypeWidgetImageWithCaptionFields>;
