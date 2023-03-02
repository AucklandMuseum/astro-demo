import * as Contentful from "contentful";
import { TypeCopyBlockFields } from "./TypeCopyBlock";
import { TypeImageMetadataFields } from "./TypeImageMetadata";
import { TypeTitleFields } from "./TypeTitle";

/**
 * Fields type definition for content type 'TypeMarketingPanel'
 * @name TypeMarketingPanelFields
 * @type {TypeMarketingPanelFields}
 * @memberof TypeMarketingPanel
 */
export interface TypeMarketingPanelFields {
    /**
     * Field type definition for field 'name' (Name)
     * @name Name
     * @localized false
     */
    name?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'size' (Size)
     * @name Size
     * @localized false
     */
    size: "Large" | "Medium" | "Section Listing" | "Small";
    /**
     * Field type definition for field 'style' (Style)
     * @name Style
     * @localized false
     */
    style: "Dark" | "Light";
    /**
     * Field type definition for field 'linkUrl' (Link URL)
     * @name Link URL
     * @localized false
     */
    linkUrl?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'linkTarget' (Link Target)
     * @name Link Target
     * @localized false
     */
    linkTarget: "_blank" | "_self";
    /**
     * Field type definition for field 'cta' (CTA)
     * @name CTA
     * @localized true
     */
    cta?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'contentAlignment' (Content Alignment)
     * @name Content Alignment
     * @localized false
     */
    contentAlignment: "Left" | "Right";
    /**
     * Field type definition for field 'imageMetadata' (Image with Metadata)
     * @name Image with Metadata
     * @localized true
     */
    imageMetadata?: Contentful.Entry<TypeImageMetadataFields>;
    /**
     * Field type definition for field 'content' (Content)
     * @name Content
     * @localized true
     */
    content?: Contentful.Entry<TypeCopyBlockFields | TypeTitleFields>[];
}

/**
 * Entry type definition for content type 'marketingPanel' (Widget - Marketing Panel)
 * @name TypeMarketingPanel
 * @type {TypeMarketingPanel}
 * @author Max Gilbert<mgilbert@aucklandmuseum.com>
 * @since 2023-02-08T02:19:06.009Z
 * @version 89
 * @link https://app.contentful.com/spaces/ocrj77v5idm0/environments/master/content_types/marketingPanel
 */
export type TypeMarketingPanel = Contentful.Entry<TypeMarketingPanelFields>;
