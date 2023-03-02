import * as Contentful from "contentful";
import { TypeCopyBlockFields } from "./TypeCopyBlock";
import { TypeImageWithColourBoxFields } from "./TypeImageWithColourBox";
import { TypeImageWithTrainFields } from "./TypeImageWithTrain";
import { TypeLeftAndRightPanelsFields } from "./TypeLeftAndRightPanels";
import { TypeMarketingPanelFields } from "./TypeMarketingPanel";
import { TypeTitleFields } from "./TypeTitle";
import { TypeWidgetImageWithCaptionFields } from "./TypeWidgetImageWithCaption";
import { TypeWidgetLinkimagebuttonFields } from "./TypeWidgetLinkimagebutton";
import { TypeWidgetYouTubeResponsiveFields } from "./TypeWidgetYouTubeResponsive";

/**
 * Fields type definition for content type 'TypeContentSection'
 * @name TypeContentSectionFields
 * @type {TypeContentSectionFields}
 * @memberof TypeContentSection
 */
export interface TypeContentSectionFields {
    /**
     * Field type definition for field 'name' (Name)
     * @name Name
     * @localized false
     */
    name: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'sectionWidth' (Section Width)
     * @name Section Width
     * @localized false
     */
    sectionWidth: ("Fullwidth" | "Standard")[];
    /**
     * Field type definition for field 'sectionStyle' (Section Style)
     * @name Section Style
     * @localized false
     */
    sectionStyle: ("Dark" | "Light" | "Standard")[];
    /**
     * Field type definition for field 'contentWidth' (Content Width)
     * @name Content Width
     * @localized false
     */
    contentWidth: ("Fullwidth" | "Narrow" | "Standard")[];
    /**
     * Field type definition for field 'contentAlignment' (Content Alignment)
     * @name Content Alignment
     * @localized false
     */
    contentAlignment: ("Center" | "Left" | "Right")[];
    /**
     * Field type definition for field 'content' (Content Blocks)
     * @name Content Blocks
     * @localized true
     */
    content?: Contentful.Entry<TypeCopyBlockFields | TypeImageWithColourBoxFields | TypeImageWithTrainFields | TypeLeftAndRightPanelsFields | TypeMarketingPanelFields | TypeTitleFields | TypeWidgetImageWithCaptionFields | TypeWidgetLinkimagebuttonFields | TypeWidgetYouTubeResponsiveFields>[];
}

/**
 * Entry type definition for content type 'contentSection' (Layout - Content Section)
 * @name TypeContentSection
 * @type {TypeContentSection}
 * @author Max Gilbert<mgilbert@aucklandmuseum.com>
 * @since 2023-02-08T01:35:35.394Z
 * @version 55
 * @link https://app.contentful.com/spaces/ocrj77v5idm0/environments/master/content_types/contentSection
 */
export type TypeContentSection = Contentful.Entry<TypeContentSectionFields>;
