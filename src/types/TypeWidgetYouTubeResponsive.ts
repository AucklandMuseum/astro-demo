import * as Contentful from "contentful";

/**
 * Fields type definition for content type 'TypeWidgetYouTubeResponsive'
 * @name TypeWidgetYouTubeResponsiveFields
 * @type {TypeWidgetYouTubeResponsiveFields}
 * @memberof TypeWidgetYouTubeResponsive
 */
export interface TypeWidgetYouTubeResponsiveFields {
    /**
     * Field type definition for field 'name' (Name)
     * @name Name
     * @localized false
     */
    name?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'videoUrl' (Video URL)
     * @name Video URL
     * @localized false
     */
    videoUrl?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'aspectRatio' (Aspect ratio)
     * @name Aspect ratio
     * @localized false
     */
    aspectRatio?: "Landscape 16:9" | "Landscape 4:3" | "Portait 16:9" | "TikTok/Shorts";
    /**
     * Field type definition for field 'width' (Width)
     * @name Width
     * @localized false
     */
    width?: 100 | 25 | 33 | 50;
    /**
     * Field type definition for field 'autoplay' (Autoplay)
     * @name Autoplay
     * @localized false
     */
    autoplay?: Contentful.EntryFields.Boolean;
    /**
     * Field type definition for field 'relatedVideos' (Related videos)
     * @name Related videos
     * @localized false
     */
    relatedVideos?: Contentful.EntryFields.Boolean;
}

/**
 * Entry type definition for content type 'widgetYouTubeResponsive' (Widget - YouTube Responsive)
 * @name TypeWidgetYouTubeResponsive
 * @type {TypeWidgetYouTubeResponsive}
 * @author Max Gilbert<mgilbert@aucklandmuseum.com>
 * @since 2023-02-13T01:53:45.261Z
 * @version 7
 * @link https://app.contentful.com/spaces/ocrj77v5idm0/environments/master/content_types/widgetYouTubeResponsive
 */
export type TypeWidgetYouTubeResponsive = Contentful.Entry<TypeWidgetYouTubeResponsiveFields>;
