import * as Contentful from "contentful";
import { TypeCopyBlockFields } from "./TypeCopyBlock";
import { TypeImageWithColourBoxFields } from "./TypeImageWithColourBox";
import { TypeImageWithTrainFields } from "./TypeImageWithTrain";
import { TypeMarketingPanelFields } from "./TypeMarketingPanel";
import { TypeTitleFields } from "./TypeTitle";
import { TypeWidgetImageWithCaptionFields } from "./TypeWidgetImageWithCaption";
import { TypeWidgetLinkimagebuttonFields } from "./TypeWidgetLinkimagebutton";
import { TypeWidgetYouTubeResponsiveFields } from "./TypeWidgetYouTubeResponsive";

export interface TypeLeftAndRightPanelsFields {
    name?: Contentful.EntryFields.Symbol;
    verticalAlignment?: "Bottom" | "Middle" | "Top";
    leftPanelWidth?: "25" | "33" | "50" | "75";
    leftPanelAlignment?: "Center" | "Left" | "Right";
    leftPanelBackground?: "Dark" | "Light" | "Standard";
    rightPanelAlignment?: "Center" | "Left" | "Right";
    rightPanelBackground?: "Dark" | "Light" | "Standard";
    leftContentBlock?: Contentful.Entry<TypeCopyBlockFields | TypeImageWithColourBoxFields | TypeImageWithTrainFields | TypeMarketingPanelFields | TypeTitleFields | TypeWidgetImageWithCaptionFields | TypeWidgetLinkimagebuttonFields | TypeWidgetYouTubeResponsiveFields>[];
    rightContentBlock?: Contentful.Entry<TypeCopyBlockFields | TypeImageWithColourBoxFields | TypeImageWithTrainFields | TypeMarketingPanelFields | TypeTitleFields | TypeWidgetImageWithCaptionFields | TypeWidgetLinkimagebuttonFields | TypeWidgetYouTubeResponsiveFields>[];
}

export type TypeLeftAndRightPanels = Contentful.Entry<TypeLeftAndRightPanelsFields>;
