import * as Contentful from "contentful";
import { TypeImageMetadataFields } from "./TypeImageMetadata";

/**
 * Fields type definition for content type 'TypeWidgetLinkimagebutton'
 * @name TypeWidgetLinkimagebuttonFields
 * @type {TypeWidgetLinkimagebuttonFields}
 * @memberof TypeWidgetLinkimagebutton
 */
export interface TypeWidgetLinkimagebuttonFields {
    /**
     * Field type definition for field 'name' (Name)
     * @name Name
     * @localized false
     */
    name?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'linkText' (Link Text)
     * @name Link Text
     * @localized false
     */
    linkText?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'linkSubtext' (Link Subtext)
     * @name Link Subtext
     * @localized false
     */
    linkSubtext?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'linkUrl' (Link URL)
     * @name Link URL
     * @localized false
     */
    linkUrl: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'linkTarget' (Link Target)
     * @name Link Target
     * @localized false
     */
    linkTarget?: "_blank" | "_self";
    /**
     * Field type definition for field 'linkType' (Link Type)
     * @name Link Type
     * @localized false
     */
    linkType?: "Button" | "Link";
    /**
     * Field type definition for field 'image' (Image)
     * @name Image
     * @localized false
     */
    image?: Contentful.Entry<TypeImageMetadataFields>;
}

/**
 * Entry type definition for content type 'widgetLinkimagebutton' (Widget - Link/Image/Button)
 * @name TypeWidgetLinkimagebutton
 * @type {TypeWidgetLinkimagebutton}
 * @author Max Gilbert<mgilbert@aucklandmuseum.com>
 * @since 2023-02-13T01:41:53.281Z
 * @version 9
 * @link https://app.contentful.com/spaces/ocrj77v5idm0/environments/master/content_types/widgetLinkimagebutton
 */
export type TypeWidgetLinkimagebutton = Contentful.Entry<TypeWidgetLinkimagebuttonFields>;
