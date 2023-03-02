import * as Contentful from "contentful";
import { TypeCopyBlockFields } from "./TypeCopyBlock";
import { TypeImageMetadataFields } from "./TypeImageMetadata";
import { TypeTitleFields } from "./TypeTitle";
import { TypeWidgetImageWithCaptionFields } from "./TypeWidgetImageWithCaption";

/**
 * Fields type definition for content type 'TypeImageWithTrain'
 * @name TypeImageWithTrainFields
 * @type {TypeImageWithTrainFields}
 * @memberof TypeImageWithTrain
 */
export interface TypeImageWithTrainFields {
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
     * Field type definition for field 'contentBlocks' (Content Blocks)
     * @name Content Blocks
     * @localized true
     */
    contentBlocks?: Contentful.Entry<TypeCopyBlockFields | TypeTitleFields | TypeWidgetImageWithCaptionFields>[];
}

/**
 * Entry type definition for content type 'imageWithTrain' (Widget - Image with train)
 * @name TypeImageWithTrain
 * @type {TypeImageWithTrain}
 * @author Max Gilbert<mgilbert@aucklandmuseum.com>
 * @since 2023-02-13T01:35:39.640Z
 * @version 5
 * @link https://app.contentful.com/spaces/ocrj77v5idm0/environments/master/content_types/imageWithTrain
 */
export type TypeImageWithTrain = Contentful.Entry<TypeImageWithTrainFields>;
