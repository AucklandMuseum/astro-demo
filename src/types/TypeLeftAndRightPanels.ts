import * as Contentful from "contentful";
import { TypeCopyBlockFields } from "./TypeCopyBlock";
import { TypeImageWithColourBoxFields } from "./TypeImageWithColourBox";
import { TypeImageWithTrainFields } from "./TypeImageWithTrain";
import { TypeMarketingPanelFields } from "./TypeMarketingPanel";
import { TypeTitleFields } from "./TypeTitle";
import { TypeWidgetImageWithCaptionFields } from "./TypeWidgetImageWithCaption";
import { TypeWidgetLinkimagebuttonFields } from "./TypeWidgetLinkimagebutton";
import { TypeWidgetYouTubeResponsiveFields } from "./TypeWidgetYouTubeResponsive";

/**
 * Fields type definition for content type 'TypeLeftAndRightPanels'
 * @name TypeLeftAndRightPanelsFields
 * @type {TypeLeftAndRightPanelsFields}
 * @memberof TypeLeftAndRightPanels
 */
export interface TypeLeftAndRightPanelsFields {
    /**
     * Field type definition for field 'name' (Name)
     * @name Name
     * @localized false
     */
    name?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'verticalAlignment' (Vertical Alignment)
     * @name Vertical Alignment
     * @localized false
     */
    verticalAlignment?: "Bottom" | "Middle" | "Top";
    /**
     * Field type definition for field 'leftPanelWidth' (Left Panel Width Percentage)
     * @name Left Panel Width Percentage
     * @localized false
     */
    leftPanelWidth?: "25" | "33" | "50" | "75";
    /**
     * Field type definition for field 'leftPanelAlignment' (Left Panel Alignment)
     * @name Left Panel Alignment
     * @localized false
     */
    leftPanelAlignment?: "Center" | "Left" | "Right";
    /**
     * Field type definition for field 'leftPanelBackground' (Left Panel Background)
     * @name Left Panel Background
     * @localized false
     */
    leftPanelBackground?: "Dark" | "Light" | "Standard";
    /**
     * Field type definition for field 'rightPanelAlignment' (Right Panel Alignment)
     * @name Right Panel Alignment
     * @localized false
     */
    rightPanelAlignment?: "Center" | "Left" | "Right";
    /**
     * Field type definition for field 'rightPanelBackground' (Right Panel Background)
     * @name Right Panel Background
     * @localized false
     */
    rightPanelBackground?: "Dark" | "Light" | "Standard";
    /**
     * Field type definition for field 'leftContentBlock' (Left Content Block)
     * @name Left Content Block
     * @localized true
     */
    leftContentBlock?: Contentful.Entry<TypeCopyBlockFields | TypeImageWithColourBoxFields | TypeImageWithTrainFields | TypeMarketingPanelFields | TypeTitleFields | TypeWidgetImageWithCaptionFields | TypeWidgetLinkimagebuttonFields | TypeWidgetYouTubeResponsiveFields>[];
    /**
     * Field type definition for field 'rightContentBlock' (Right Content Block)
     * @name Right Content Block
     * @localized true
     */
    rightContentBlock?: Contentful.Entry<TypeCopyBlockFields | TypeImageWithColourBoxFields | TypeImageWithTrainFields | TypeMarketingPanelFields | TypeTitleFields | TypeWidgetImageWithCaptionFields | TypeWidgetLinkimagebuttonFields | TypeWidgetYouTubeResponsiveFields>[];
}

/**
 * Entry type definition for content type 'leftAndRightPanels' (Layout - Left and Right Panels)
 * @name TypeLeftAndRightPanels
 * @type {TypeLeftAndRightPanels}
 * @author Max Gilbert<mgilbert@aucklandmuseum.com>
 * @since 2023-02-13T00:13:59.007Z
 * @version 25
 * @link https://app.contentful.com/spaces/ocrj77v5idm0/environments/master/content_types/leftAndRightPanels
 */
export type TypeLeftAndRightPanels = Contentful.Entry<TypeLeftAndRightPanelsFields>;
