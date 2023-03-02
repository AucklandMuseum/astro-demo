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

export interface TypeContentSectionFields {
    name: Contentful.EntryFields.Symbol;
    sectionWidth: ("Fullwidth" | "Standard")[];
    sectionStyle: ("Dark" | "Light" | "Standard")[];
    contentWidth: ("Fullwidth" | "Narrow" | "Standard")[];
    contentAlignment: ("Center" | "Left" | "Right")[];
    content?: Contentful.Entry<TypeCopyBlockFields | TypeImageWithColourBoxFields | TypeImageWithTrainFields | TypeLeftAndRightPanelsFields | TypeMarketingPanelFields | TypeTitleFields | TypeWidgetImageWithCaptionFields | TypeWidgetLinkimagebuttonFields | TypeWidgetYouTubeResponsiveFields>[];
}

export type TypeContentSection = Contentful.Entry<TypeContentSectionFields>;
