import * as Contentful from "contentful";
import { TypeCopyBlockFields } from "./TypeCopyBlock";
import { TypeImageMetadataFields } from "./TypeImageMetadata";
import { TypeTitleFields } from "./TypeTitle";
import { TypeWidgetImageWithCaptionFields } from "./TypeWidgetImageWithCaption";

/**
 * Fields type definition for content type 'TypeImageWithColourBox'
 * @name TypeImageWithColourBoxFields
 * @type {TypeImageWithColourBoxFields}
 * @memberof TypeImageWithColourBox
 */
export interface TypeImageWithColourBoxFields {
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
     * Field type definition for field 'contentAlignment' (Content Alignment)
     * @name Content Alignment
     * @localized false
     */
    contentAlignment?: "Center" | "Left" | "Right";
    /**
     * Field type definition for field 'contentBackgroundColour' (Content Background Colour)
     * @name Content Background Colour
     * @localized false
     */
    contentBackgroundColour?: Contentful.EntryFields.Object;
    /**
     * Field type definition for field 'contentBlocks' (Content Blocks)
     * @name Content Blocks
     * @localized true
     */
    contentBlocks?: Contentful.Entry<TypeCopyBlockFields | TypeTitleFields | TypeWidgetImageWithCaptionFields>[];
}

/**
 * Entry type definition for content type 'imageWithColourBox' (Widget - Image with colour box)
 * @name TypeImageWithColourBox
 * @type {TypeImageWithColourBox}
 * @author Max Gilbert<mgilbert@aucklandmuseum.com>
 * @since 2023-02-13T01:28:18.158Z
 * @version 9
 * @link https://app.contentful.com/spaces/ocrj77v5idm0/environments/master/content_types/imageWithColourBox
 */
export type TypeImageWithColourBox = Contentful.Entry<TypeImageWithColourBoxFields>;
